import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";

const repoDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const buildDir = path.join(repoDir, "build");
const legacyLocales = new Map([
  ["en_us", ""],
  ["zh_cn", "zh-Hans"],
  ["zh_tw", "zh-Hant"],
  ["ja_jp", "ja"],
]);
const specialRoutes = new Map([
  ["plugins/plugins", "plugins"],
]);
const assetExtensions = new Set([
  ".7z", ".apk", ".avif", ".bin", ".css", ".csv", ".eot", ".gif", ".glb", ".gltf", ".gz",
  ".ico", ".jpeg", ".jpg", ".js", ".json", ".m4v", ".map", ".md", ".mov", ".mp3", ".mp4",
  ".otf", ".pdf", ".png", ".rar", ".svg", ".tar", ".ttf", ".txt", ".wasm", ".webm", ".webp",
  ".woff", ".woff2", ".xlsx", ".zip",
]);

function listHtmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? listHtmlFiles(fullPath) : (entry.isFile() && entry.name.endsWith(".html") ? [fullPath] : []);
  });
}

function routeForBuildFile(filePath) {
  let relative = path.relative(buildDir, filePath).replace(/\\/g, "/");
  relative = relative.replace(/\/index\.html$/i, "/").replace(/^index\.html$/i, "");
  if (relative && !relative.startsWith("/")) relative = `/${relative}`;
  return relative || "/";
}

function decodePath(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizeLegacyPage(pathname) {
  const match = pathname.match(/^\/(en_us|zh_cn|zh_tw|ja_jp)(?=\/|$)/i);
  if (!match) return pathname;

  const localeKey = match[1].toLowerCase();
  const localePrefix = legacyLocales.get(localeKey);
  let oldRoute = pathname.slice(match[0].length).replace(/^\/+/, "").replace(/\/+$/, "");
  oldRoute = oldRoute.replace(/\/(?:index|README)\.html$/i, "").replace(/^(?:index|README)\.html$/i, "");
  if (/\.html$/i.test(oldRoute)) oldRoute = oldRoute.replace(/\.html$/i, "");
  oldRoute = oldRoute.replace(/^\/+|\/+$/g, "");
  oldRoute = specialRoutes.get(oldRoute) ?? oldRoute;
  const prefix = localePrefix ? `/${localePrefix}/docs` : "/docs";
  return oldRoute ? `${prefix}/${oldRoute}/` : `${prefix}/`;
}

function pageFileForPath(pathname) {
  const decoded = decodePath(pathname);
  const relative = decoded.replace(/^\/+/, "");
  const directoryPage = path.join(buildDir, relative, "index.html");
  if (fs.existsSync(directoryPage)) return directoryPage;
  const exactFile = path.join(buildDir, relative);
  if (fs.existsSync(exactFile) && exactFile.endsWith(".html")) return exactFile;
  const htmlFile = path.join(buildDir, `${relative}.html`);
  if (fs.existsSync(htmlFile)) return htmlFile;
  return undefined;
}

function editDistance(left, right) {
  const a = [...left];
  const b = [...right];
  const rows = Array.from({ length: a.length + 1 }, (_, index) => [index]);
  for (let column = 0; column <= b.length; column += 1) rows[0][column] = column;
  for (let row = 1; row <= a.length; row += 1) {
    for (let column = 1; column <= b.length; column += 1) {
      rows[row][column] = Math.min(
        rows[row - 1][column] + 1,
        rows[row][column - 1] + 1,
        rows[row - 1][column - 1] + (a[row - 1] === b[column - 1] ? 0 : 1),
      );
    }
  }
  return rows[a.length][b.length];
}

if (!fs.existsSync(buildDir)) throw new Error(`Build directory does not exist: ${buildDir}`);
const pages = listHtmlFiles(buildDir).filter((file) => !path.relative(buildDir, file).startsWith(`pagefind${path.sep}`));
const parsedPages = new Map();
for (const file of pages) {
  const $ = load(fs.readFileSync(file, "utf8"));
  parsedPages.set(file, { $, ids: new Set($("[id]").map((_, element) => $(element).attr("id")).get()) });
}

const broken = [];
let pageLinks = 0;
let checked = 0;
for (const sourceFile of pages) {
  const { $ } = parsedPages.get(sourceFile);
  const sourceUrl = new URL(routeForBuildFile(sourceFile), "https://doc.rebocap.com");
  for (const anchor of $("a[href]").toArray()) {
    const rawHref = $(anchor).attr("href").trim();
    let targetUrl;
    try {
      targetUrl = new URL(rawHref, sourceUrl);
    } catch {
      continue;
    }
    if (!["https:", "http:"].includes(targetUrl.protocol)) continue;
    if (!["doc.rebocap.com", "doc.hamer.xin"].includes(targetUrl.hostname.toLowerCase())) continue;

    let targetPath = decodePath(targetUrl.pathname);
    targetPath = normalizeLegacyPage(targetPath);
    const extension = path.extname(targetPath).toLowerCase();
    if (extension && extension !== ".html") {
      if (assetExtensions.has(extension)) continue;
      continue;
    }

    pageLinks += 1;
    checked += 1;
    const targetFile = pageFileForPath(targetPath);
    if (!targetFile) {
      broken.push({ source: path.relative(buildDir, sourceFile).replace(/\\/g, "/"), href: rawHref, reason: "page missing" });
      continue;
    }

    if (!targetUrl.hash) continue;
    const targetId = decodePath(targetUrl.hash.slice(1));
    const parsedTarget = parsedPages.get(targetFile) ?? (() => {
      const target$ = load(fs.readFileSync(targetFile, "utf8"));
      return { $, ids: new Set(target$("[id]").map((_, element) => target$(element).attr("id")).get()) };
    })();
    parsedPages.set(targetFile, parsedTarget);
    if (!parsedTarget.ids.has(targetId)) {
      const nearby = [...parsedTarget.ids]
        .map((id) => ({ id, distance: editDistance(targetId, id) }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3)
        .filter((candidate) => candidate.distance <= Math.max(2, Math.floor(targetId.length * 0.2)))
        .map((candidate) => `${candidate.id} (${candidate.distance})`);
      broken.push({ source: path.relative(buildDir, sourceFile).replace(/\\/g, "/"), href: rawHref, reason: `anchor #${targetId} missing`, nearby });
    }
  }
}

console.log(`Checked ${checked} same-site document links across ${pages.length} HTML pages.`);
if (broken.length) {
  console.error(`Found ${broken.length} broken document link(s):`);
  for (const entry of broken.slice(0, 200)) {
    console.error(`  ${entry.source}: ${entry.href} (${entry.reason})${entry.nearby?.length ? `; similar IDs: ${entry.nearby.join(", ")}` : ""}`);
  }
  if (broken.length > 200) console.error(`  ... ${broken.length - 200} more`);
  process.exitCode = 1;
} else {
  console.log("All checked document pages and heading anchors resolve.");
}
