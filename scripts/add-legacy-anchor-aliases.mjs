import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoDir = path.resolve(scriptDir, "..");
const buildDir = path.join(repoDir, "build");
const aliasPath = path.join(scriptDir, "legacy-anchor-aliases.json");
const aliasesByPage = JSON.parse(fs.readFileSync(aliasPath, "utf8"));
const canonicalOrigin = "https://doc.rebocap.com";

function normalizeText(text) {
  return text.replace(/[\u200b-\u200f\ufeff]/g, "").replace(/\s+/g, " ").trim().normalize("NFKC");
}

function escapeAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function listHtmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? listHtmlFiles(fullPath) : (entry.isFile() && entry.name.endsWith(".html") ? [fullPath] : []);
  });
}

function pageUrlForBuildFile(filePath) {
  const relative = path.relative(buildDir, filePath).replace(/\\/g, "/");
  const route = relative.replace(/\/index\.html$/i, "/").replace(/^index\.html$/i, "/");
  return new URL(route.startsWith("/") ? route : `/${route}`, canonicalOrigin);
}

function pageFileForPath(pathname) {
  let decoded = pathname;
  try { decoded = decodeURIComponent(pathname); } catch { /* Keep the URL form if malformed. */ }
  const relative = decoded.replace(/^\/+/, "");
  const directoryPage = path.join(buildDir, relative, "index.html");
  if (fs.existsSync(directoryPage)) return directoryPage;
  const exactFile = path.join(buildDir, relative);
  if (fs.existsSync(exactFile) && exactFile.endsWith(".html")) return exactFile;
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

let inserted = 0;
for (const [relativePage, aliases] of Object.entries(aliasesByPage)) {
  const filePath = path.join(buildDir, relativePage);
  if (!fs.existsSync(filePath)) throw new Error(`Alias target page is missing from build: ${relativePage}`);

  const $ = load(fs.readFileSync(filePath, "utf8"));
  const ids = new Set($("[id]").map((_, element) => $(element).attr("id")).get());
  const headings = $("h1,h2,h3,h4,h5,h6").toArray();

  for (const alias of aliases) {
    if (ids.has(alias.id)) continue;
    const matching = headings.filter((heading) =>
      heading.tagName === alias.tag && normalizeText($(heading).text()) === normalizeText(alias.text),
    );
    const target = matching[alias.occurrence];
    if (!target) throw new Error(`Cannot place legacy anchor #${alias.id} in ${relativePage}`);
    const aliasNode = $(`<span id="${escapeAttribute(alias.id)}" class="legacy-anchor-alias" data-legacy-anchor-generated="true" aria-hidden="true"></span>`);
    $(target).before(aliasNode);
    ids.add(alias.id);
    inserted += 1;
  }

  fs.writeFileSync(filePath, $.html(), "utf8");
}

console.log(`Inserted ${inserted} legacy heading anchor aliases across ${Object.keys(aliasesByPage).length} pages.`);

let repaired = 0;
for (const filePath of listHtmlFiles(buildDir)) {
  const $ = load(fs.readFileSync(filePath, "utf8"));
  const sourceUrl = pageUrlForBuildFile(filePath);
  const ids = new Set($("[id]").map((_, element) => $(element).attr("id")).get());
  const headings = $("h1,h2,h3,h4,h5,h6").toArray();
  let changed = false;

  for (const link of $("a[href]").toArray()) {
    const href = $(link).attr("href").trim();
    let targetUrl;
    try { targetUrl = new URL(href, sourceUrl); } catch { continue; }
    if (targetUrl.origin !== sourceUrl.origin || targetUrl.pathname !== sourceUrl.pathname || !targetUrl.hash) continue;

    let missingId;
    try { missingId = decodeURIComponent(targetUrl.hash.slice(1)); } catch { missingId = targetUrl.hash.slice(1); }
    if (!missingId || ids.has(missingId)) continue;

    const ranked = headings
      .filter((heading) => $(heading).attr("id"))
      .map((heading) => ({ heading, distance: editDistance(missingId, $(heading).attr("id")) }))
      .sort((a, b) => a.distance - b.distance);
    const nearest = ranked[0];
    const tied = ranked[1]?.distance === nearest?.distance;
    if (!nearest || nearest.distance > 2 || tied) continue;

    const aliasNode = $(`<span id="${escapeAttribute(missingId)}" class="legacy-anchor-alias" data-legacy-anchor-generated="true" aria-hidden="true"></span>`);
    $(nearest.heading).before(aliasNode);
    ids.add(missingId);
    changed = true;
    repaired += 1;
  }

  if (changed) fs.writeFileSync(filePath, $.html(), "utf8");
}
console.log(`Added ${repaired} local fragment aliases for headings with a unique one- or two-character slug difference.`);
