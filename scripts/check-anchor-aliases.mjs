// Read-only checks: compatibility anchors must come from MD/MDX source so
// server HTML and the client React tree contain exactly the same elements.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {load} from 'cheerio';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function checkHtmlIntegrity(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) checkHtmlIntegrity(file);
    else if (entry.name.endsWith('.html')) {
      const html = fs.readFileSync(file, 'utf8');
      if (html.includes('\0')) throw new Error(`NUL character in generated HTML: ${file}`);
      if (html.includes('data-legacy-anchor-generated')) throw new Error(`Post-build DOM injection found in ${file}`);
    }
  }
}
checkHtmlIntegrity(path.join(root, 'build'));
const historical = JSON.parse(fs.readFileSync(path.join(root, 'scripts/legacy-anchor-aliases.json'), 'utf8'));
const migrated = JSON.parse(fs.readFileSync(path.join(root, 'scripts/compiled-anchor-aliases.json'), 'utf8'));
const expected = new Map();
for (const [page, aliases] of Object.entries(historical)) expected.set(page, new Set(aliases.map(a => a.id)));
for (const {page, aliases} of Object.values(migrated)) {
  const ids = expected.get(page) || new Set();
  for (const {id} of aliases) ids.add(id);
  expected.set(page, ids);
}
let count = 0;
for (const [page, ids] of expected) {
  const $ = load(fs.readFileSync(path.join(root, 'build', page), 'utf8'));
  const occurrences = new Map();
  for (const el of $('[id]').toArray()) {
    const id = $(el).attr('id');
    occurrences.set(id, (occurrences.get(id) || 0) + 1);
  }
  for (const id of ids) {
    if (occurrences.get(id) !== 1) throw new Error(`${page}#${id}: expected exactly one anchor, found ${occurrences.get(id) || 0}`);
    count++;
  }
  if ($('[data-legacy-anchor-generated]').length) throw new Error(`Post-build DOM injection found in ${page}`);
}
console.log(`Verified ${count} compatibility anchors across ${expected.size} pages (read-only).`);
