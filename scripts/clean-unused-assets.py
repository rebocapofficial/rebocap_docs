#!/usr/bin/env python3
"""
Scan static assets and remove any files NOT referenced in markdown/docs.

Usage:
    # Dry-run (report only, no deletions):
    python scripts/clean-unused-assets.py --dry-run

    # Actually delete unused files:
    python scripts/clean-unused-assets.py
"""

from __future__ import annotations

import os
import re
import sys
import argparse
from pathlib import Path
from typing import List

PROJECT_ROOT = Path(__file__).resolve().parent.parent
STATIC_DIR = PROJECT_ROOT / "static"

# Directories to search for references
SEARCH_DIRS = [
    PROJECT_ROOT / "docs",
    PROJECT_ROOT / "i18n",
]

# Additional files to search for references
EXTRA_SEARCH_FILES = [
    PROJECT_ROOT / "docusaurus.config.ts",
    PROJECT_ROOT / "sidebars.ts",
    PROJECT_ROOT / "sidebars.en.ts",
    PROJECT_ROOT / "sidebars.ja.ts",
    PROJECT_ROOT / "sidebars.zh-Hans.ts",
    PROJECT_ROOT / "sidebars.zh-Hant.ts",
    PROJECT_ROOT / "src",
]

# Files that are ALWAYS kept (site essentials, never deleted)
PROTECTED_FILES = {
    "favicon.ico",
    "robots.txt",
    "logo_w.svg",
    "logo_w_white.svg",
    "website.css",
}

# Directories to skip entirely
SKIP_DIRS = {
    "admin",  # TinaCMS admin (kept for now)
}


def collect_static_files() -> list[Path]:
    """Return all files under static/ (relative to PROJECT_ROOT)."""
    files = []
    for root, dirs, filenames in os.walk(STATIC_DIR):
        # Skip protected directories
        rel_dir = os.path.relpath(root, STATIC_DIR)
        dir_parts = Path(rel_dir).parts
        if any(part in SKIP_DIRS for part in dir_parts):
            continue

        for fn in filenames:
            full = Path(root) / fn
            files.append(full)
    return files


def build_search_corpus() -> str:
    """Concatenate all searchable content into one big string."""
    chunks = []

    # All markdown files
    for search_dir in SEARCH_DIRS:
        if not search_dir.exists():
            continue
        for root, _dirs, filenames in os.walk(search_dir):
            for fn in filenames:
                if fn.endswith((".md", ".mdx", ".ts", ".tsx", ".js", ".jsx")):
                    try:
                        content = (Path(root) / fn).read_text(encoding="utf-8", errors="ignore")
                        chunks.append(content)
                    except Exception:
                        pass

    # Extra config / source files
    for path in EXTRA_SEARCH_FILES:
        p = Path(path)
        if p.is_file():
            try:
                chunks.append(p.read_text(encoding="utf-8", errors="ignore"))
            except Exception:
                pass
        elif p.is_dir():
            for root, _dirs, filenames in os.walk(p):
                for fn in filenames:
                    if fn.endswith((".ts", ".tsx", ".js", ".jsx", ".css", ".json")):
                        try:
                            chunks.append((Path(root) / fn).read_text(encoding="utf-8", errors="ignore"))
                        except Exception:
                            pass

    return "\n".join(chunks)


def extract_search_terms(filepath: Path) -> list[str]:
    """Extract possible reference terms from a static file path.

    Returns a list of strings to search for in the corpus.
    Handles:
      - Exact basename: "connect-en.gif"
      - Name without locale suffix: "connect.gif"
      - Name without extension: "connect-en"
      - Parent-dir relative paths: "img/connect-en.gif"
      - i18n fallback: "connect.gif" → "connect-en.gif" references it via fallback
    """
    rel = filepath.relative_to(STATIC_DIR)
    basename = filepath.name
    name_no_ext = filepath.stem  # e.g. "connect-en"
    parent_rel = str(rel).replace("\\", "/")  # e.g. "img/connect-en.gif"

    terms = [
        basename,           # connect-en.gif
        name_no_ext,        # connect-en
        parent_rel,         # img/connect-en.gif
    ]

    # For i18n files (ending with -en, -jp), also check the base variant
    # e.g. "connect-en.gif" → also search for "connect.gif"
    for locale_suffix in ("-en", "-jp", "-cn", "-zh"):
        if name_no_ext.endswith(locale_suffix):
            base_name = name_no_ext[: -len(locale_suffix)]
            ext = filepath.suffix
            terms.append(base_name + ext)       # connect.gif
            terms.append(base_name)              # connect
            # Also add parent-relative base
            base_rel = str(rel).replace("\\", "/").replace(name_no_ext + ext, base_name + ext)
            terms.append(base_rel)
            break

    return terms


def is_protected(filepath: Path) -> bool:
    """Check if a file should never be deleted."""
    if filepath.name in PROTECTED_FILES:
        return True

    rel = str(filepath.relative_to(STATIC_DIR)).replace("\\", "/")
    # Always keep logo files
    if "logo" in filepath.name.lower() and filepath.suffix in (".svg", ".png"):
        return True

    return False


def main():
    parser = argparse.ArgumentParser(description="Clean unused static assets")
    parser.add_argument("--dry-run", action="store_true", help="Report only, do not delete")
    args = parser.parse_args()

    print("=" * 60)
    print("Unused Static Assets Scanner")
    print("=" * 60)
    print()

    # Collect all static files
    all_files = collect_static_files()
    print(f"[1/4] Found {len(all_files)} files in static/")

    # Build search corpus
    corpus = build_search_corpus()
    print(f"[2/4] Built search corpus ({len(corpus):,} chars)")

    # Check each file
    unused = []
    used = []
    protected = []

    for filepath in sorted(all_files):
        if is_protected(filepath):
            protected.append(filepath)
            continue

        terms = extract_search_terms(filepath)

        # Search for any term in the corpus
        found = False
        for term in terms:
            if term in corpus:
                found = True
                break

        if found:
            used.append(filepath)
        else:
            unused.append(filepath)

    print(f"[3/4] Results:")
    print(f"      Protected (kept):  {len(protected):4d}")
    print(f"      Referenced (kept): {len(used):4d}")
    print(f"      Unreferenced:      {len(unused):4d}")
    print()

    if not unused:
        print("No unreferenced files found.  Nothing to clean.")
        return

    # Show what would be deleted
    print("─" * 60)
    print("Unreferenced files (will be deleted):")
    print("─" * 60)
    total_size = 0
    for f in unused:
        size = f.stat().st_size
        total_size += size
        rel = f.relative_to(PROJECT_ROOT)
        size_kb = size / 1024
        size_str = f"{size_kb:.1f} KB" if size_kb >= 1 else f"{size} B"
        print(f"  {rel}  ({size_str})")
    print()
    print(f"  Total: {len(unused)} files, {total_size / 1024 / 1024:.2f} MB")
    print()

    if args.dry_run:
        print("[DRY RUN] No files deleted.  Run without --dry-run to delete.")
        return

    # Confirm and delete
    print("─" * 60)
    confirm = input(f"Delete {len(unused)} unreferenced files? [y/N]: ").strip().lower()
    if confirm != "y":
        print("Cancelled.")
        return

    print()
    print("[4/4] Deleting...")
    deleted = 0
    for f in unused:
        try:
            f.unlink()
            print(f"  DELETED: {f.relative_to(PROJECT_ROOT)}")
            deleted += 1
        except Exception as e:
            print(f"  ERROR: {f.relative_to(PROJECT_ROOT)} — {e}")

    # Clean up empty directories
    print()
    print("Cleaning empty directories...")
    for root, dirs, _files in os.walk(STATIC_DIR, topdown=False):
        for d in dirs:
            full = Path(root) / d
            try:
                if not any(full.iterdir()):
                    full.rmdir()
                    print(f"  REMOVED dir: {full.relative_to(PROJECT_ROOT)}")
            except Exception:
                pass

    print()
    print(f"Done.  Deleted {deleted} files.")


if __name__ == "__main__":
    main()
