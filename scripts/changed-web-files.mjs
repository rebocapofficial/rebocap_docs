import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const [oldDir, newDir] = process.argv.slice(2).map((dir) => path.resolve(dir));
if (!oldDir || !newDir) {
  console.error("Usage: node changed-web-files.mjs <old-output-dir> <new-output-dir>");
  process.exit(2);
}

const relevantFile = /\.(?:html|js|css)$/i;

function collectFiles(root) {
  const files = new Map();
  if (!fs.existsSync(root)) return files;
  const visit = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(fullPath);
      } else if (entry.isFile() && relevantFile.test(entry.name)) {
        const relative = path.relative(root, fullPath).replace(/\\/g, "/");
        const hash = crypto.createHash("sha256").update(fs.readFileSync(fullPath)).digest("hex");
        files.set(relative, hash);
      }
    }
  };
  visit(root);
  return files;
}

const previous = collectFiles(oldDir);
const current = collectFiles(newDir);
const changed = [...new Set([...previous.keys(), ...current.keys()])]
  .filter((file) => previous.get(file) !== current.get(file))
  .sort();

for (const file of changed) console.log(file);
console.error(`Detected ${changed.length} changed, added, or removed HTML/JS/CSS files.`);
