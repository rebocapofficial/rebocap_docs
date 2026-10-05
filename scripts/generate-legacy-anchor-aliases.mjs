import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoDir = path.resolve(scriptDir, "..");
const oldBuildDir = path.resolve(process.argv[2] ?? "D:/python/rebocap_doc/build_output");
const newBuildDir = path.resolve(process.argv[3] ?? path.join(repoDir, "build"));
const outputPath = path.join(scriptDir, "legacy-anchor-aliases.json");
const headingOverridesPath = path.join(scriptDir, "legacy-anchor-heading-overrides.json");
const headingOverrides = JSON.parse(fs.readFileSync(headingOverridesPath, "utf8"));

const locales = [
  { old: "en_US", current: "en" },
  { old: "zh_cn", current: "zh-Hans" },
  { old: "zh_TW", current: "zh-Hant" },
  { old: "ja_JP", current: "ja" },
];
const specialRoutes = new Map([
  ["plugins/plugins", "plugins"],
]);
const discardedLegacyRoutes = new Set(["reborn_access"]);
const headingSelector = "h1,h2,h3,h4,h5,h6";

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}

function headingText(element, $) {
  return $(element).text().replace(/[\u200b-\u200f\ufeff]/g, "").replace(/\s+/g, " ").trim().normalize("NFKC");
}

function headingKey(element, $) {
  return `${element.tagName}|${headingText(element, $)}`;
}

function oldRouteForHtml(filePath, oldLocaleDir) {
  let route = path.relative(oldLocaleDir, filePath).replace(/\\/g, "/");
  route = route.replace(/\/(?:index|README)\.html$/i, "").replace(/^(?:index|README)\.html$/i, "");
  if (/\.html$/i.test(route)) route = route.replace(/\.html$/i, "");
  route = route.replace(/^\/+|\/+$/g, "");
  return specialRoutes.get(route) ?? route;
}

function currentPageForRoute(route, locale) {
  const docsRoot = path.join(newBuildDir, ...(locale === "en" ? [] : [locale]), "docs");
  const candidates = route
    ? [path.join(docsRoot, route, "index.html"), path.join(docsRoot, `${route}.html`)]
    : [path.join(docsRoot, "index.html")];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

if (!fs.existsSync(oldBuildDir) || !fs.existsSync(newBuildDir)) {
  throw new Error(`Missing build directory. old=${oldBuildDir}, new=${newBuildDir}`);
}

const aliasesByPage = {};
const missingPages = [];
const unmatchedHeadings = [];
let comparedPages = 0;

for (const locale of locales) {
  const oldLocaleDir = path.join(oldBuildDir, locale.old);
  for (const oldFile of listFiles(oldLocaleDir).filter((file) => file.toLowerCase().endsWith(".html"))) {
    const route = oldRouteForHtml(oldFile, oldLocaleDir);
    if ([...discardedLegacyRoutes].some((discarded) => route === discarded || route.startsWith(`${discarded}/`))) continue;
    const legacyPageKey = `${locale.old}/${path.relative(oldLocaleDir, oldFile).replace(/\\/g, "/")}`;
    const newFile = currentPageForRoute(route, locale.current);
    if (!newFile) {
      missingPages.push(legacyPageKey);
      continue;
    }

    comparedPages += 1;
    const old$ = load(fs.readFileSync(oldFile, "utf8"));
    const new$ = load(fs.readFileSync(newFile, "utf8"));
    const currentIds = new Set(new$(`[id]`).toArray()
      .filter((element) => !new$(element).attr("data-legacy-anchor-generated"))
      .map((element) => new$(element).attr("id")));
    const newHeadings = new$(headingSelector).toArray();
    const byKey = new Map();
    for (const heading of newHeadings) {
      const key = headingKey(heading, new$);
      byKey.set(key, [...(byKey.get(key) ?? []), heading]);
    }

    const oldOccurrences = new Map();
    for (const heading of old$(headingSelector).toArray()) {
      const id = old$(heading).attr("id");
      if (!id || currentIds.has(id)) continue;

      const key = headingKey(heading, old$);
      const occurrence = oldOccurrences.get(key) ?? 0;
      oldOccurrences.set(key, occurrence + 1);
      const matchingHeadings = byKey.get(key) ?? [];
      let targetHeading = matchingHeadings[Math.min(occurrence, matchingHeadings.length - 1)];
      if (!targetHeading) {
        const override = headingOverrides[legacyPageKey]?.[id];
        if (override) {
          const overrideKey = `${override.tag}|${override.text.replace(/[\u200b-\u200f\ufeff]/g, "").replace(/\s+/g, " ").trim().normalize("NFKC")}`;
          const overrideHeadings = byKey.get(overrideKey) ?? [];
          targetHeading = overrideHeadings[override.occurrence ?? 0];
        }
      }
      if (!targetHeading) {
        unmatchedHeadings.push({
          page: legacyPageKey,
          id,
          tag: heading.tagName,
          text: headingText(heading, old$),
          currentHeadings: newHeadings.map((candidate) => `${candidate.tagName}#${new$(candidate).attr("id") ?? ""}: ${headingText(candidate, new$)}`),
        });
        continue;
      }

      const relativePage = path.relative(newBuildDir, newFile).replace(/\\/g, "/");
      aliasesByPage[relativePage] ??= [];
      const targetKey = headingKey(targetHeading, new$);
      const targetOccurrence = (byKey.get(targetKey) ?? []).indexOf(targetHeading);
      aliasesByPage[relativePage].push({
        id,
        tag: targetHeading.tagName,
        text: headingText(targetHeading, new$),
        occurrence: targetOccurrence,
      });
      currentIds.add(id);
    }
  }
}

for (const entries of Object.values(aliasesByPage)) {
  entries.sort((a, b) => a.id.localeCompare(b.id));
}
fs.writeFileSync(outputPath, `${JSON.stringify(aliasesByPage, null, 2)}\n`, "utf8");

console.log(`Compared ${comparedPages} matching legacy pages; generated ${Object.values(aliasesByPage).reduce((sum, entries) => sum + entries.length, 0)} heading aliases in ${Object.keys(aliasesByPage).length} pages.`);
if (missingPages.length) {
  console.warn(`${missingPages.length} legacy page(s) have no matching page route:`);
  for (const page of missingPages) console.warn(`  ${page}`);
}
if (unmatchedHeadings.length) {
  console.warn(`${unmatchedHeadings.length} old heading anchor(s) could not be matched by heading text:`);
  const reportedPages = new Set();
  for (const heading of unmatchedHeadings) {
    console.warn(`  ${heading.page}#${heading.id} [${heading.tag}: ${heading.text}]`);
    if (!reportedPages.has(heading.page)) {
      reportedPages.add(heading.page);
      console.warn(`    current headings: ${heading.currentHeadings.join(" | ")}`);
    }
  }
}
