#!/usr/bin/env python3
"""
Migration script: HonKit/GitBook → Docusaurus + TinaCMS

Converts the rebocap_doc HonKit project to a Docusaurus project at
D:\python\rebocap_doc_new, transforming GitBook-specific syntax to
Docusaurus-compatible markdown along the way.

Usage:
    python migrate.py

Requirements:
    Python 3.7+
    Source project at: D:\python\rebocap_doc
"""

import os
import re
import json
import shutil
from pathlib import Path
from typing import Dict, List, Optional, Tuple

# ── Paths ──────────────────────────────────────────────────────────────────
SOURCE = Path(r"D:\python\rebocap_doc")
TARGET = Path(r"D:\python\rebocap_doc_new")
SOURCE_DOC = SOURCE / "doc"
SOURCE_IMG = SOURCE_DOC / "img"
TARGET_STATIC_IMG = TARGET / "static" / "img"

# Locale mapping: HonKit folder → Docusaurus locale code
LOCALE_MAP = {
    "en_US": "en",
    "zh_cn": "zh-Hans",
    "ja_JP": "ja",
    "zh_TW": "zh-Hant",
}

# Default locale
DEFAULT_LOCALE = "en"

# Directories to exclude from migration
EXCLUDE_DIRS = {"_book", "node_modules", ".git"}


# ── Syntax Transformers ───────────────────────────────────────────────────

def transform_accordion(content: str) -> str:
    """
    Convert GitBook accordion syntax to HTML <details> elements.

    Input format:
      %accordion%Title text%accordion%
      ... content ...
      %/accordion%

    Output format:
      <details>
      <summary>Title text</summary>
      ... content ...
      </details>
    """
    # Step 1: %accordion%TITLE%accordion% → <details><summary>TITLE</summary>
    def replace_opening(match):
        title = match.group(1).strip()
        return f"<details>\n<summary>{title}</summary>\n"

    content = re.sub(
        r'%accordion%\s*(.*?)\s*%accordion%',
        replace_opening,
        content,
        flags=re.DOTALL,
    )

    # Step 2: %/accordion% → </details>
    content = content.replace("%/accordion%", "\n</details>")

    return content


def transform_callouts(content: str) -> str:
    """
    Convert GitBook alert-style blockquotes to Docusaurus admonitions.

    Patterns found in source:
      > **[info] Title**        → :::info Title
      > **[warning] Title**     → :::warning Title
      > **[danger] Title**      → :::danger Title
      > **[note] Title**        → :::note Title

    Handles multi-line blockquotes with > continuation lines by processing
    line-by-line for reliability across varied formatting.
    """
    alert_map = {
        "info": "info",
        "warning": "warning",
        "danger": "danger",
        "error": "danger",
        "success": "tip",
        "note": "note",
        "tip": "tip",
    }

    # Pattern to detect a callout opener line:  [spaces]> **[type] Title**
    # Allow leading whitespace for indented blockquotes within lists
    opener_pattern = re.compile(
        r'^\s*>\s*\*\*\[(info|warning|danger|error|success|note|tip)\]\s*(.*?)\*\*\s*$',
        re.IGNORECASE,
    )
    # Pattern for blockquote continuation: [spaces]> ...content...
    continuation_pattern = re.compile(r'^\s*>\s*(.*)$')

    lines = content.split("\n")
    result = []
    i = 0

    while i < len(lines):
        line = lines[i]
        opener_match = opener_pattern.match(line)

        if opener_match:
            alert_type = opener_match.group(1).lower()
            title = opener_match.group(2).strip() if opener_match.group(2) else ""
            docusaurus_type = alert_map.get(alert_type, "info")

            # Collect continuation blockquote lines
            continuation = []
            i += 1
            while i < len(lines):
                cont_match = continuation_pattern.match(lines[i])
                if cont_match is not None:
                    cont_content = cont_match.group(1)
                    continuation.append(cont_content)
                    i += 1
                else:
                    # Stop at the first non-blockquote line
                    break

            # Trim trailing empty lines from continuation
            while continuation and continuation[-1] == "":
                continuation.pop()

            # Output the admonition
            title_str = f" {title}" if title else ""
            result.append(f":::{docusaurus_type}{title_str}")
            result.append("")
            if continuation:
                result.extend(continuation)
                result.append("")
            result.append(":::")
            result.append("")
            continue

        result.append(line)
        i += 1

    return "\n".join(result)


def transform_image_paths(content: str, depth_from_root: int) -> str:
    """
    Convert relative image paths like '../../img/foo.png' or
    '../../../img/foo.png' to '/img/foo.png' (absolute from site root).

    Also handles HTML src attributes.
    """
    # Markdown image: ![alt](../../img/...)
    # How many '../' does the path have? We replace all with /img/
    def replace_md_img(match):
        alt = match.group(1)
        path = match.group(2)
        # Count ../ and strip them
        filename = re.sub(r'^(\.\./)+img/', '', path)
        # Remove also just 'img/' prefix if present (for files at language root)
        filename = re.sub(r'^img/', '', filename)
        return f"![{alt}](/img/{filename})"

    content = re.sub(
        r'!\[([^\]]*)\]\(((?:\.\./)*img/[^)]+)\)',
        replace_md_img,
        content,
    )

    # HTML img src: src="../../../img/..."
    def replace_html_img(match):
        prefix = match.group(1)  # src="
        path = match.group(2)
        suffix = match.group(3)  # "...
        filename = re.sub(r'^(\.\./)*img/', '', path)
        return f'{prefix}/img/{filename}{suffix}'

    content = re.sub(
        r'(src=")((?:\.\./)*img/[^"]+)(")',
        replace_html_img,
        content,
    )

    # HTML href to img files (for download links)
    def replace_html_href(match):
        prefix = match.group(1)
        path = match.group(2)
        suffix = match.group(3)
        filename = re.sub(r'^(\.\./)*img/', '', path)
        return f'{prefix}/img/{filename}{suffix}'

    content = re.sub(
        r'(href=")((?:\.\./)*img/[^"]+)(")',
        replace_html_href,
        content,
    )

    # xlink:href to img
    def replace_xlink(match):
        prefix = match.group(1)
        path = match.group(2)
        suffix = match.group(3)
        filename = re.sub(r'^(\.\./)*img/', '', path)
        return f'{prefix}/img/{filename}{suffix}'

    content = re.sub(
        r'(xlink:href=")((?:\.\./)*img/[^"]+)(")',
        replace_xlink,
        content,
    )

    return content


def transform_html_links(content: str) -> str:
    """
    Convert markdown links to Docusaurus-compatible format:
    - Strip .html and .md extensions
    - Fix root README.md → index (renamed for routeBasePath: '/')
    - Remove empty links: [text]() → text
    """
    # First, remove empty links: [text]() → text
    content = re.sub(r'\[([^\]]+)\]\(\s*\)', r'\1', content)

    def replace_link(match):
        text = match.group(1)
        path = match.group(2)
        anchor = match.group(3) or ""

        # Don't transform external URLs
        if path.startswith("http://") or path.startswith("https://"):
            return match.group(0)

        # Strip .html and .md extensions
        path = re.sub(r'\.(html|md)$', '', path)

        return f"[{text}]({path}{anchor})"

    content = re.sub(
        r'\[([^\]]+)\]\(([^)#]+)(#[^)]*)?\)',
        replace_link,
        content,
    )

    return content


def transform_heading_anchors(content: str) -> str:
    """
    Convert GitBook heading anchors to explicit HTML anchors.

    GitBook:  ## Title {#custom_id}
    Docusaurus (format: 'md'): doesn't support {#id} syntax.
    Fix:      <a id="custom_id"></a>\n\n## Title
    """
    def replace_heading(match):
        hashes = match.group(1)   # e.g., "##"
        title = match.group(2).strip()  # e.g., "Audio initialization failed"
        anchor = match.group(3)   # e.g., "audio"
        return f'<a id="{anchor}"></a>\n\n{hashes} {title}'

    # Match: ## Title text {#anchor-name}
    # The anchor name can contain letters, digits, underscores, hyphens
    pattern = re.compile(
        r'^(#{1,6})\s+(.+?)\s*\{#([a-zA-Z0-9_-]+)\}\s*$',
        re.MULTILINE,
    )
    content = pattern.sub(replace_heading, content)

    return content


def fix_html_for_mdx(content: str) -> str:
    """
    Fix HTML tags for Docusaurus/React SSR compatibility.

    Docusaurus renders markdown HTML through React's rehype-react,
    which requires:
    1. Self-closing void elements (<img />, <br />, <source />)
    2. No `style="..."` string attributes (React expects style objects)

    This function strips style attributes (styling should use CSS classes)
    and ensures void elements are self-closing.
    """
    # Strip style="..." attributes (React SSR can't handle string styles)
    content = re.sub(
        r'\s+style="[^"]*"',
        '',
        content,
    )

    # Self-closing HTML tags
    void_elements = ['img', 'br', 'hr', 'input', 'source', 'area', 'base',
                     'col', 'embed', 'link', 'meta', 'param', 'track', 'wbr']

    for tag in void_elements:
        # Fix <tag> → <tag />
        pattern = re.compile(rf'<{tag}>', re.IGNORECASE)
        content = pattern.sub(rf'<{tag} />', content)

        # Fix <tag attrs> → <tag attrs /> (if not already self-closed)
        def replace_tag(match):
            full = match.group(0)
            if '/>' in full or ' />' in full:
                return full
            # Match last > that isn't preceded by /
            return re.sub(r'(?<!/)>$', ' />', full, count=1)

        pattern = re.compile(
            rf'<{tag}(\s[^>]*?)>',
            re.IGNORECASE,
        )
        content = pattern.sub(replace_tag, content)

    return content


def transform_markdown(content: str, depth_from_root: int = 2) -> str:
    """Apply all markdown transformations."""
    content = transform_accordion(content)
    content = transform_callouts(content)
    content = transform_heading_anchors(content)
    content = transform_image_paths(content, depth_from_root)
    content = transform_html_links(content)
    content = fix_html_for_mdx(content)
    return content


# ── SUMMARY.md Parser ─────────────────────────────────────────────────────

def parse_summary(summary_path: Path) -> List[Dict]:
    """
    Parse a GitBook SUMMARY.md into a structured Docusaurus sidebar definition.

    Structure:
      ### Category Name          → category with items
      * [Title](path.md)        → doc or category (if it has nested children)
        * [SubTitle](sub.md)    → nested item under parent

    Items with nested children become categories with a link property.
    """
    if not summary_path.exists():
        return []

    with open(summary_path, "r", encoding="utf-8") as f:
        content = f.read()

    lines = content.strip().split("\n")

    # First pass: collect raw items with their indent levels
    raw_items = []  # [(indent, is_header, label, link_or_None)]

    for line in lines:
        stripped = line.strip()
        if not stripped or stripped.startswith("# Summary"):
            continue

        header_match = re.match(r'^(\s*)###\s+(.+)', line)
        list_match = re.match(r'^(\s*)\*\s+\[([^\]]+)\]\(([^)]+)\)', line)

        if header_match:
            indent = len(header_match.group(1))
            raw_items.append((indent, True, header_match.group(2).strip(), None))
        elif list_match:
            indent = len(list_match.group(1))
            title = list_match.group(2).strip()
            link = list_match.group(3).strip()

            # Normalize: strip .md extension and #fragments
            # e.g., "README.md#navigation_directory" → "README"
            doc_id = link
            if "#" in doc_id:
                doc_id = doc_id.split("#")[0]
            if doc_id.endswith(".md"):
                doc_id = doc_id[:-3]
            elif ".md#" in link:  # already handled above, but safety
                doc_id = doc_id.replace(".md", "")

            raw_items.append((indent, False, title, doc_id))

    # Second pass: build the tree
    # We maintain a stack of (indent, node) where node is a dict
    sidebar_items = []
    # The node stack represents ancestors. Each entry is (indent, node_dict)
    node_stack: List[Tuple[int, Dict]] = []

    current_category = None  # The current top-level category

    for indent, is_header, label, link in raw_items:
        if is_header:
            # Start a new top-level category
            current_category = {
                "type": "category",
                "label": label,
                "collapsed": False,
                "items": [],
            }
            sidebar_items.append(current_category)
            node_stack = []
            continue

        # This is a list/doc item
        # Determine if this is a leaf or a potential parent
        # We'll create a basic doc item, and upgrade it to category
        # if subsequent items are indented under it
        node = {
            "type": "doc",
            "id": link,
            "label": label,
        }

        # Find parent based on indentation
        while node_stack and node_stack[-1][0] >= indent:
            node_stack.pop()

        if node_stack:
            # This is nested under a previous item
            parent_indent, parent_node = node_stack[-1]
            # Upgrade parent to category if it's still a doc
            if parent_node["type"] == "doc":
                parent_node["type"] = "category"
                parent_node["link"] = {
                    "type": "doc",
                    "id": parent_node["id"],
                }
                del parent_node["id"]
                parent_node["collapsed"] = True
                parent_node["items"] = []
            # Ensure parent has items list
            if "items" not in parent_node:
                parent_node["items"] = []
            parent_node["items"].append(node)
        elif current_category is not None:
            # Top-level item in the current category
            current_category["items"].append(node)
        else:
            # No category header encountered yet
            sidebar_items.append(node)

        # Push this node to the stack for potential children
        node_stack.append((indent, node))

    return sidebar_items


# ── Directory & File Helpers ──────────────────────────────────────────────

def ensure_dir(path: Path):
    """Create directory if it doesn't exist."""
    path.mkdir(parents=True, exist_ok=True)


def copy_markdown_files(src_dir: Path, dst_dir: Path, depth_from_root: int,
                        is_default_locale: bool = False):
    """
    Recursively copy .md files from src_dir to dst_dir,
    applying syntax transformations.
    """
    if not src_dir.exists():
        return

    ensure_dir(dst_dir)

    for item in src_dir.iterdir():
        if item.name in EXCLUDE_DIRS:
            continue
        if item.name.startswith("."):
            continue

        if item.is_dir():
            copy_markdown_files(item, dst_dir / item.name, depth_from_root + 1,
                                is_default_locale=is_default_locale)
        elif item.name == "SUMMARY.md":
            # Skip — Docusaurus uses sidebars.ts instead
            pass
        elif item.suffix == ".md":
            with open(item, "r", encoding="utf-8") as f:
                content = f.read()

            transformed = transform_markdown(content, depth_from_root)

            out_path = dst_dir / item.name
            with open(out_path, "w", encoding="utf-8") as f:
                f.write(transformed)

            print(f"  ✓ {out_path.relative_to(TARGET)}")
        else:
            # Copy non-md files as-is (e.g., images within content dirs)
            out_path = dst_dir / item.name
            shutil.copy2(item, out_path)


# ── Config Generators ─────────────────────────────────────────────────────

def generate_docusaurus_config():
    """Generate docusaurus.config.ts with multi-instance docs for i18n."""
    config = f'''import {{ themes as prismThemes }} from 'prism-react-renderer';
import type {{ Config }} from '@docusaurus/types';

const config: Config = {{
  title: 'Rebocap Documentation',
  tagline: 'Rebocap Product Documentation',
  favicon: 'img/favicon.ico',
  url: 'https://doc.rebocap.com',
  baseUrl: '/',
  organizationName: 'rebocap',
  projectName: 'rebocap-doc',

  onBrokenLinks: 'ignore',
  onBrokenAnchors: 'ignore',

  markdown: {{
    format: 'md',
    mermaid: true,
  }},

  // Multi-instance docs plugins (no Docusaurus i18n — more reliable)
  presets: [
    [
      'classic',
      {{
        docs: {{
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.en.ts',
          editUrl: 'https://github.com/rebocap/rebocap-doc/tree/main/',
          showLastUpdateTime: false,
        }},
        blog: false,
        theme: {{
          customCss: './src/css/custom.css',
        }},
        sitemap: {{
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**', '/search/**'],
        }},
      }},
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {{
        id: 'zh-Hans',
        path: 'i18n/zh-Hans/docusaurus-plugin-content-docs/current',
        routeBasePath: 'zh-Hans/docs',
        sidebarPath: './sidebars.zh-Hans.ts',
        showLastUpdateTime: false,
      }},
    ],
    [
      '@docusaurus/plugin-content-docs',
      {{
        id: 'ja',
        path: 'i18n/ja/docusaurus-plugin-content-docs/current',
        routeBasePath: 'ja/docs',
        sidebarPath: './sidebars.ja.ts',
        showLastUpdateTime: false,
      }},
    ],
    [
      '@docusaurus/plugin-content-docs',
      {{
        id: 'zh-Hant',
        path: 'i18n/zh-Hant/docusaurus-plugin-content-docs/current',
        routeBasePath: 'zh-Hant/docs',
        sidebarPath: './sidebars.zh-Hant.ts',
        showLastUpdateTime: false,
      }},
    ],
    require.resolve('docusaurus-plugin-image-zoom'),
  ],

  themeConfig: {{
    image: 'img/logo_w_white.svg',
    navbar: {{
      logo: {{
        alt: 'REBOCAP',
        src: 'img/logo_w_white.svg',
      }},
      items: [
        {{
          type: 'search',
          position: 'right',
        }},
        {{
          type: 'dropdown',
          label: '🌐 Language',
          position: 'right',
          items: [
            {{ label: 'English', to: '/docs/' }},
            {{ label: '简体中文', to: '/zh-Hans/docs/' }},
            {{ label: '日本語', to: '/ja/docs/' }},
            {{ label: '繁體中文', to: '/zh-Hant/docs/' }},
          ],
        }},
        {{
          to: 'https://store.rebocap.site',
          label: 'Online Store',
          position: 'right',
        }},
        {{
          to: 'https://forum.rebocap.site',
          label: 'Forum',
          position: 'right',
        }},
        {{
          to: 'https://www.rebocap.com',
          label: 'Official Site',
          position: 'right',
        }},
      ],
    }},
    footer: {{
      style: 'dark',
      copyright: `Copyright © ${{new Date().getFullYear()}} rebocap official. Built with Docusaurus.`,
    }},
    prism: {{
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['csharp', 'cpp', 'python'],
    }},
    zoom: {{
      selector: '.markdown :not(em) > img',
    }},
  }},
}};

export default config;
'''
    return config


def generate_sidebars(summary_path: Path) -> str:
    """
    Generate sidebars.ts from the English SUMMARY.md.

    Docusaurus sidebars use the format:
    {
      docsSidebar: [
        { type: 'category', label: '...', items: [...] },
        { type: 'doc', id: '...', label: '...' },
      ],
    }
    """
    items = parse_summary(summary_path)

    def format_item(item, indent=4):
        """Recursively format a sidebar item as TypeScript."""
        spaces = " " * indent
        next_spaces = " " * (indent + 4)

        if item["type"] == "category":
            children = item.get("items", [])
            link = item.get("link")
            collapsed = item.get("collapsed", False)

            lines = [f'{spaces}{{']
            lines.append(f'{next_spaces}type: "category",')
            lines.append(f'{next_spaces}label: "{item["label"]}",')
            if link:
                # Category that is also a clickable link
                doc_id = link["type"] == "doc" and link.get("id", "")
                if doc_id:
                    lines.append(f'{next_spaces}link: {{ type: "doc", id: "{doc_id}" }},')
            lines.append(f'{next_spaces}collapsed: {str(collapsed).lower()},')
            lines.append(f'{next_spaces}items: [')
            for child in children:
                lines.append(format_item(child, indent + 8))
            lines.append(f'{next_spaces}],')
            lines.append(f'{spaces}}},')
            return "\n".join(lines)
        elif item["type"] == "doc":
            return f'{spaces}{{ type: "doc", id: "{item["id"]}", label: "{item["label"]}" }},'
        return ""

    sidebar_items = "\n".join(format_item(it) for it in items)

    sidebar_ts = f'''import type {{ SidebarsConfig }} from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {{
  docsSidebar: [
{sidebar_items}
  ],
}};

export default sidebars;
'''
    return sidebar_ts


def generate_tina_config():
    """Generate TinaCMS configuration."""
    tina_config = '''import { defineConfig } from "tinacms";

// Define your collections
export default defineConfig({
  // TinaCMS uses local content files
  localContentPath: "..",

  // Build configuration
  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },

  // Media configuration
  media: {
    tina: {
      mediaRoot: "img",
      publicFolder: "static",
    },
  },

  // Content collections
  schema: {
    collections: [
      {
        name: "doc_en",
        label: "Docs (English)",
        path: "docs",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "doc_zh_hans",
        label: "Docs (简体中文)",
        path: "i18n/zh-Hans/docusaurus-plugin-content-docs/current",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "doc_ja",
        label: "Docs (日本語)",
        path: "i18n/ja/docusaurus-plugin-content-docs/current",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "doc_zh_hant",
        label: "Docs (繁體中文)",
        path: "i18n/zh-Hant/docusaurus-plugin-content-docs/current",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
'''
    return tina_config


def generate_package_json():
    """Generate package.json with Docusaurus and TinaCMS dependencies."""
    pkg = {
        "name": "rebocap-doc",
        "version": "1.0.0",
        "private": True,
        "scripts": {
            "docusaurus": "docusaurus",
            "start": "docusaurus start",
            "build": "docusaurus build && npx pagefind --site build",
            "swizzle": "docusaurus swizzle",
            "deploy": "docusaurus deploy",
            "clear": "docusaurus clear",
            "serve": "docusaurus serve",
            "write-translations": "docusaurus write-translations",
            "write-heading-ids": "docusaurus write-heading-ids",
            "typecheck": "tsc",
            "tina-dev": "tinacms dev -c \"docusaurus start\"",
            "tina-build": "tinacms build && docusaurus build",
        },
        "dependencies": {
            "@docusaurus/core": "^3.6.0",
            "@docusaurus/preset-classic": "^3.6.0",
            "@mdx-js/react": "^3.0.0",
            "clsx": "^2.0.0",
            "docusaurus-plugin-image-zoom": "^2.0.0",
            "pagefind": "^1.5.2",
            "prism-react-renderer": "^2.4.0",
            "react": "^18.3.0",
            "react-dom": "^18.3.0",
        },
        "devDependencies": {
            "@docusaurus/module-type-aliases": "^3.6.0",
            "@docusaurus/tsconfig": "^3.6.0",
            "@docusaurus/types": "^3.6.0",
            "tinacms": "^2.2.0",
            "@tinacms/cli": "^1.6.0",
            "typescript": "^5.5.0",
        },
        "browserslist": {
            "production": [
                ">0.5%",
                "not dead",
                "not op_mini all",
            ],
            "development": [
                "last 3 chrome version",
                "last 3 firefox version",
                "last 5 safari version",
            ],
        },
        "engines": {
            "node": ">=18.0",
        },
    }
    return json.dumps(pkg, indent=2) + "\n"


def generate_custom_css():
    """Generate custom CSS with multi-language optimized fonts."""
    css = '''/**
 * Rebocap Documentation — Custom Styles
 * Multi-language optimized font stack + theme overrides.
 */

:root {
  --ifm-font-family-base:
    'Inter', '-apple-system', 'BlinkMacSystemFont',
    'Segoe UI', 'Roboto',
    'PingFang SC', 'PingFang TC', 'Hiragino Sans GB',
    'Hiragino Sans', 'Hiragino Kaku Gothic ProN',
    'Microsoft YaHei', 'Microsoft JhengHei', 'Yu Gothic',
    'Meiryo', 'Malgun Gothic',
    'Noto Sans SC', 'Noto Sans TC', 'Noto Sans JP',
    'Helvetica Neue', 'Arial', sans-serif;

  --ifm-font-family-monospace:
    'Cascadia Code', 'SF Mono', 'Fira Code', 'Fira Mono',
    'Roboto Mono', 'Menlo', 'Monaco', 'Consolas',
    'Liberation Mono', 'Courier New', monospace;

  --ifm-font-size-base: 16px;
  --ifm-line-height-base: 1.7;

  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
  --ifm-color-primary-light: #33925d;
  --ifm-color-primary-lighter: #359962;
  --ifm-color-primary-lightest: #3cad6e;
  --ifm-code-font-size: 93%;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);
}

[data-theme='dark'] {
  --ifm-color-primary: #25c2a0;
  --ifm-color-primary-dark: #21af90;
  --ifm-color-primary-darker: #1fa588;
  --ifm-color-primary-darkest: #1a8870;
  --ifm-color-primary-light: #29d5b0;
  --ifm-color-primary-lighter: #32d8b4;
  --ifm-color-primary-lightest: #4fddbf;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.3);
}

.markdown h1 { font-size: 2rem; font-weight: 700; }
.markdown h2 { font-size: 1.5rem; font-weight: 600; }
.markdown h3 { font-size: 1.2rem; font-weight: 600; }
.markdown p, .markdown li { font-size: 1rem; line-height: 1.8; }

.image-mapper-shape { fill: rgba(0, 0, 0, 0.6); }
.image-mapper-shape:hover { fill: rgba(0, 0, 0, 0.1); }
g:hover .image-mapper-shape { stroke: red; stroke-width: 4; }
.image-text { font-family: Verdana, sans-serif; font-size: 22px; fill: rgba(0, 0, 0, 0); }
g:hover .image-text { fill: greenyellow; }
g { background: #00000000; }

.markdown details {
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: var(--ifm-global-radius);
  padding: 1rem;
  margin-bottom: 1rem;
}
.markdown details summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--ifm-color-primary);
}
.markdown details[open] summary { margin-bottom: 0.75rem; }

.markdown img + em {
  display: block;
  text-align: center;
  font-size: 0.9rem;
  color: var(--ifm-color-emphasis-600);
}

.markdown table {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}

.navbar__logo img { height: 2rem; }
'''
    return css


def generate_tsconfig():
    """Generate tsconfig.json."""
    tsconfig = {
        "extends": "@docusaurus/tsconfig",
        "compilerOptions": {
            "baseUrl": ".",
        },
    }
    return json.dumps(tsconfig, indent=2) + "\n"


def generate_gitignore():
    """Generate .gitignore."""
    return """# Dependencies
node_modules/

# Production
build/
_output/

# Generated Docusaurus files
.docusaurus/
.cache-loader/

# TinaCMS
tina/__generated__/

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.idea/
.vscode/
*.swp
*.swo
"""


def generate_babel_config():
    """Generate babel.config.js."""
    return """module.exports = {
  presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
};
"""


def generate_landing_page():
    """Generate a landing page with browser language detection."""
    return r'''import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

function detectLanguagePath(): string {
  try {
    const lang = navigator.language || "en";
    if (lang.startsWith("ja")) return "/ja/docs/";
    if (lang.startsWith("zh")) {
      if (lang.includes("TW") || lang.includes("HK") || lang.includes("Hant")) {
        return "/zh-Hant/docs/";
      }
      return "/zh-Hans/docs/";
    }
    return "/docs/";
  } catch {
    return "/docs/";
  }
}

function RedirectHandler(): JSX.Element {
  React.useEffect(() => {
    window.location.replace(detectLanguagePath());
  }, []);
  return null;
}

export default function Home(): JSX.Element {
  return (
    <BrowserOnly fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>}>
      {() => <RedirectHandler />}
    </BrowserOnly>
  );
}
'''


# ── Main Migration ────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("Rebocap HonKit → Docusaurus Migration")
    print("=" * 60)
    print(f"Source: {SOURCE}")
    print(f"Target: {TARGET}")
    print()

    # ── 0. Clean up stale files from previous migration runs ──────────
    for d in [
        TARGET / "docs",
        TARGET / "i18n" / "zh-Hans" / "docusaurus-plugin-content-docs" / "current",
        TARGET / "i18n" / "ja" / "docusaurus-plugin-content-docs" / "current",
        TARGET / "i18n" / "zh-Hant" / "docusaurus-plugin-content-docs" / "current",
    ]:
        stale_index = d / "index.md"
        if stale_index.exists():
            stale_index.unlink()
            print(f"  🧹 Removed stale {stale_index.relative_to(TARGET)}")

    # ── 1. Create target directory structure ──────────────────────────
    print("📁 Creating directory structure...")
    dirs = [
        TARGET / "docs",
        TARGET / "static" / "img",
        TARGET / "src" / "css",
        TARGET / "src" / "pages",
        TARGET / "src" / "components" / "HomepageFeatures",
        TARGET / "tina",
        TARGET / "i18n" / "zh-Hans" / "docusaurus-plugin-content-docs" / "current",
        TARGET / "i18n" / "ja" / "docusaurus-plugin-content-docs" / "current",
        TARGET / "i18n" / "zh-Hant" / "docusaurus-plugin-content-docs" / "current",
    ]
    for d in dirs:
        ensure_dir(d)
        print(f"  ✓ {d.relative_to(TARGET)}")

    # ── 2. Migrate markdown for each locale ──────────────────────────
    print("\n📝 Migrating markdown files...")
    for honkit_locale, docusaurus_locale in LOCALE_MAP.items():
        src = SOURCE_DOC / honkit_locale
        if not src.exists():
            print(f"  ⚠ Source locale dir not found: {src}")
            continue

        is_default = (docusaurus_locale == DEFAULT_LOCALE)
        if is_default:
            dst = TARGET / "docs"
        else:
            dst = TARGET / "i18n" / docusaurus_locale / "docusaurus-plugin-content-docs" / "current"

        print(f"\n  Locale: {honkit_locale} → {docusaurus_locale}")
        print(f"    From: {src}")
        print(f"    To:   {dst}")

        # Copy markdown with transformations
        copy_markdown_files(src, dst, depth_from_root=0, is_default_locale=is_default)

    # ── 3. Copy static assets ───────────────────────────────────────
    print("\n🖼️  Copying static assets (img/)...")
    if SOURCE_IMG.exists():
        total_copied = 0
        total_skipped = 0
        for item in SOURCE_IMG.iterdir():
            if item.name in EXCLUDE_DIRS or item.name.startswith("."):
                continue
            if item.name == "css":
                # Copy CSS separately
                css_dst = TARGET_STATIC_IMG / "css"
                ensure_dir(css_dst)
                for css_file in item.iterdir():
                    if css_file.is_file():
                        shutil.copy2(css_file, css_dst / css_file.name)
                        total_copied += 1
            elif item.is_dir():
                # Use copytree with dirs_exist_ok
                dst_subdir = TARGET_STATIC_IMG / item.name
                if dst_subdir.exists():
                    shutil.rmtree(dst_subdir)
                shutil.copytree(item, dst_subdir)
                # Count files
                for _ in dst_subdir.rglob("*"):
                    if _.is_file():
                        total_copied += 1
            else:
                shutil.copy2(item, TARGET_STATIC_IMG / item.name)
                total_copied += 1
        print(f"  ✓ Copied ~{total_copied} files to {TARGET_STATIC_IMG.relative_to(TARGET)}")

    # Also copy root-level img if any
    root_img = SOURCE_DOC.parent / "img"  # Some repos put img at root
    if root_img.exists() and root_img != SOURCE_IMG:
        for item in root_img.iterdir():
            if item.name not in EXCLUDE_DIRS:
                dst_path = TARGET_STATIC_IMG / item.name
                if item.is_file() and not dst_path.exists():
                    shutil.copy2(item, dst_path)

    # ── 4. Generate configuration files ────────────────────────────
    print("\n⚙️  Generating configuration files...")

    # docusaurus.config.ts
    config_path = TARGET / "docusaurus.config.ts"
    with open(config_path, "w", encoding="utf-8") as f:
        f.write(generate_docusaurus_config())
    print(f"  ✓ docusaurus.config.ts")

    # sidebars — one per language, built from each locale's SUMMARY.md
    sidebar_locales = {
        "en": "en_US",
        "zh-Hans": "zh_cn",
        "ja": "ja_JP",
        "zh-Hant": "zh_TW",
    }
    for sidebar_id, honkit_locale in sidebar_locales.items():
        summary_path = SOURCE_DOC / honkit_locale / "SUMMARY.md"
        if summary_path.exists():
            sidebar_file = TARGET / f"sidebars.{sidebar_id}.ts"
            with open(sidebar_file, "w", encoding="utf-8") as f:
                f.write(generate_sidebars(summary_path))
            print(f"  ✓ sidebars.{sidebar_id}.ts (from {honkit_locale}/SUMMARY.md)")

    # package.json
    pkg_path = TARGET / "package.json"
    with open(pkg_path, "w", encoding="utf-8") as f:
        f.write(generate_package_json())
    print(f"  ✓ package.json")

    # tsconfig.json
    tsconfig_path = TARGET / "tsconfig.json"
    with open(tsconfig_path, "w", encoding="utf-8") as f:
        f.write(generate_tsconfig())
    print(f"  ✓ tsconfig.json")

    # babel.config.js
    babel_path = TARGET / "babel.config.js"
    with open(babel_path, "w", encoding="utf-8") as f:
        f.write(generate_babel_config())
    print(f"  ✓ babel.config.js")

    # .gitignore
    gitignore_path = TARGET / ".gitignore"
    with open(gitignore_path, "w", encoding="utf-8") as f:
        f.write(generate_gitignore())
    print(f"  ✓ .gitignore")

    # src/css/custom.css
    css_path = TARGET / "src" / "css" / "custom.css"
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(generate_custom_css())
    print(f"  ✓ src/css/custom.css")

    # src/pages/index.tsx
    landing = generate_landing_page()
    index_path = TARGET / "src" / "pages" / "index.tsx"
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(landing)
    print(f"  ✓ src/pages/index.tsx")

    # tina/config.ts
    tina_config_path = TARGET / "tina" / "config.ts"
    with open(tina_config_path, "w", encoding="utf-8") as f:
        f.write(generate_tina_config())
    print(f"  ✓ tina/config.ts")

    # ── 5. Summary ──────────────────────────────────────────────────
    print("\n" + "=" * 60)
    print("✅ Migration complete!")
    print("=" * 60)
    print(f"\nOutput: {TARGET}")
    print("\nNext steps:")
    print("  1. cd D:\\python\\rebocap_doc_new")
    print("  2. npm install")
    print("  3. npx docusaurus start")
    print("     (or for TinaCMS: npm run tina-dev)")
    print()


if __name__ == "__main__":
    main()
