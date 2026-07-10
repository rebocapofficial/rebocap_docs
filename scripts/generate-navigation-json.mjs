/**
 * Generate Dhub navigation.json from the current docs/ structure.
 *
 * Reads _category_.json for labels, sidebar_position for ordering,
 * and produces a navigation.json that Dhub's visual editor can import.
 *
 * Node types:
 *   tab     — top-level container (one per docs route)
 *   folder  — collapsible category (_category_.json collapsed: true)
 *   group   — non-collapsible section heading (_category_.json collapsed: false)
 *   page    — reference to a doc file
 *   link    — external URL
 *   divider — horizontal rule separator
 *
 * Run:  node scripts/generate-navigation-json.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DOCS = join(ROOT, 'docs');

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readJson(filePath) {
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

/** Read sidebar_position from a .md file's frontmatter, or return 99. */
function readPosition(filePath) {
  if (!existsSync(filePath)) return 99;
  const raw = readFileSync(filePath, 'utf-8');
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return 99;
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^sidebar_position:\s*(\d+)/);
    if (kv) return parseInt(kv[1], 10);
  }
  return 99;
}

/** Read title from a .md file's frontmatter. */
function readTitle(filePath) {
  if (!existsSync(filePath)) return basename(filePath, '.md');
  const raw = readFileSync(filePath, 'utf-8');
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) {
    // Try markdown heading
    const h = raw.match(/^#\s+(.+)/m);
    return h ? h[1] : basename(filePath, '.md');
  }
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^title:\s*(.+)/);
    if (kv) return kv[1].trim().replace(/^['"]|['"]$/g, '');
  }
  return basename(filePath, '.md');
}

// ─── Build navigation tree ───────────────────────────────────────────────────

/**
 * Recursively build navigation children from a directory.
 * Returns an array of Dhub navigation nodes.
 */
function buildChildren(dir, depth = 0) {
  const entries = [];

  // Separate directories and files
  const dirs = [];
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      dirs.push({ name: entry.name, path: full });
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      files.push({ name: entry.name, path: full });
    }
  }

  // Process directories (each becomes a folder or group)
  for (const d of dirs) {
    const cat = readJson(join(d.path, '_category_.json'));
    const label = cat?.label || d.name;
    const collapsed = cat?.collapsed !== false; // default collapsed: true
    const nodeType = collapsed ? 'folder' : 'group';

    const children = buildChildren(d.path, depth + 1);

    if (children.length > 0) {
      const node = {
        label,
        type: nodeType,
        children: sortNodes(children, d.path),
      };
      // Add position for ordering
      if (cat?.position) node._position = cat.position;
      entries.push(node);
    }
  }

  // Process files (each becomes a page)
  for (const f of files) {
    const relPath = relative(DOCS, f.path).replace(/\\/g, '/');
    const pos = readPosition(f.path);
    const title = readTitle(f.path);

    entries.push({
      label: title,
      type: 'page',
      path: `docs/${relPath}`,
      _position: pos,
    });
  }

  return entries;
}

function sortNodes(nodes, dirPath) {
  return nodes.sort((a, b) => {
    const pa = a._position ?? 99;
    const pb = b._position ?? 99;
    if (pa !== pb) return pa - pb;
    return (a.label || '').localeCompare(b.label || '');
  });
}

/** Ensure labels are globally unique to avoid Docusaurus translation key conflicts. */
function dedupeLabelsGlobal(nodes, seen = new Map()) {
  for (const node of nodes) {
    const key = `${node.type}:${node.label}`;
    if (seen.has(key)) {
      const count = seen.get(key);
      seen.set(key, count + 1);
      if (node.type === 'page' && node.path) {
        // Use parent directory name as suffix to disambiguate
        const segments = node.path.split('/');
        const parentDir = segments.length > 2 ? segments[segments.length - 2] : '';
        if (parentDir) {
          node.label = `${node.label} (${parentDir})`;
        }
      }
    } else {
      seen.set(key, 1);
    }
    if (node.children) {
      dedupeLabelsGlobal(node.children, seen);
    }
  }
}

/** Strip internal _position before serializing. */
function cleanNode(node) {
  const { _position, children, ...rest } = node;
  const cleaned = { ...rest };
  if (children) cleaned.children = children.map(cleanNode);
  return cleaned;
}

// ─── Main ────────────────────────────────────────────────────────────────────

console.log('Building navigation.json from docs/ structure...\n');

const children = sortNodes(buildChildren(DOCS), DOCS);
dedupeLabelsGlobal(children);

const navigation = [
  {
    label: 'Docs',
    type: 'tab',
    path: 'docs',
    children: children.map(cleanNode),
  },
];

const outPath = join(ROOT, 'navigation.json');
writeFileSync(outPath, JSON.stringify(navigation, null, 2) + '\n');
console.log(`Wrote navigation.json (${JSON.stringify(navigation).length} bytes)`);

// Print structure summary
function printTree(nodes, indent = '') {
  for (const node of nodes) {
    const icon = node.type === 'folder' ? '📁' : node.type === 'group' ? '📂' : node.type === 'page' ? '📄' : node.type === 'link' ? '🔗' : '➖';
    const path = node.path || node.url || '';
    console.log(`  ${indent}${icon} ${node.label}${path ? ' → ' + path : ''}`);
    if (node.children) printTree(node.children, indent + '  ');
  }
}
console.log('\nStructure:');
printTree(navigation);
console.log('\nDone. Import this project into Dhub to use the visual navigation editor.');
