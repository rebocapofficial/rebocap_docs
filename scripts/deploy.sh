#!/bin/bash
# ============================================================
#  Rebocap Doc — Auto Deploy Script (for CentOS server)
#
#  Does:
#    1. git fetch + pull (skip if no new commits)
#    2. npm ci (only if package.json changed)
#    3. docusaurus build → staging dir
#    4. pagefind index
#    5. atomic switch to production
#    6. Alibaba DCDN cache refresh (only changed HTML)
#
#  Usage:
#    ./scripts/deploy.sh                # check git, deploy if new
#    ./scripts/deploy.sh --force        # skip git check, rebuild
#
#  Cron (polling) — run every 5 min:
#    */5 * * * * bash /opt/rebocap-doc/scripts/deploy.sh >> /var/log/rebocap-deploy.log 2>&1
# ============================================================
set -euo pipefail

PROJECT_DIR="${PROJECT_DIR:-/opt/rebocap-doc}"
STAGING_DIR="$PROJECT_DIR/build_staging"
LIVE_DIR="$PROJECT_DIR/build"
PREV_MANIFEST="$PROJECT_DIR/.deploy-prev-manifest.txt"
NEW_MANIFEST="$PROJECT_DIR/.deploy-new-manifest.txt"

# Source secret env vars if .env exists (WEBHOOK_SECRET, ALI_*)
if [ -f "$PROJECT_DIR/.env" ]; then
  set -a; source "$PROJECT_DIR/.env"; set +a
fi

DCDN_DOMAIN="${DCDN_DOMAIN:-doc.rebocap.com}"

cd "$PROJECT_DIR"

log() { echo "[$(date '+%H:%M:%S')] $*"; }

log "=== Deploy start ==="

# ═══════════════════════════════════════════════════════════
# Step 1 — Git pull
# ═══════════════════════════════════════════════════════════
if [ "${1:-}" != "--force" ]; then
  git fetch origin main 2>&1
  LOCAL=$(git rev-parse HEAD)
  REMOTE=$(git rev-parse origin/main)

  if [ "$LOCAL" = "$REMOTE" ]; then
    log "No new commits — skipping build"
    exit 0
  fi
  log "New commits: ${LOCAL:0:7} → ${REMOTE:0:7}"
fi

git checkout main
git pull origin main

# ═══════════════════════════════════════════════════════════
# Step 2 — Dependencies (only if package.json changed)
# ═══════════════════════════════════════════════════════════
LOCK_HASH=""
if [ -f "package-lock.json" ]; then
  LOCK_HASH=$(sha256sum package-lock.json | cut -d' ' -f1)
fi

npm ci --prefer-offline 2>&1 | tail -3

# ═══════════════════════════════════════════════════════════
# Step 3 — Save previous manifest (for CDN diff)
# ═══════════════════════════════════════════════════════════
if [ -d "$LIVE_DIR" ]; then
  find "$LIVE_DIR" -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' \) \
    | sed "s|^$LIVE_DIR/||" | sort > "$PREV_MANIFEST"
else
  :> "$PREV_MANIFEST"
fi

# ═══════════════════════════════════════════════════════════
# Step 4 — Build to staging
# ═══════════════════════════════════════════════════════════
log "Building Docusaurus..."
rm -rf "$STAGING_DIR"

npx docusaurus build --out-dir "$STAGING_DIR" 2>&1 | tail -5
log "Docusaurus build OK"

# pagefind search index (runs on staging)
log "Running pagefind..."
npx pagefind --site "$STAGING_DIR" 2>&1 | tail -3 || log "(pagefind skipped or done)"

# ═══════════════════════════════════════════════════════════
# Step 5 — Atomic switch to production
# ═══════════════════════════════════════════════════════════
find "$STAGING_DIR" -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' \) \
  | sed "s|^$STAGING_DIR/||" | sort > "$NEW_MANIFEST"

# Rsync staging → live (fast, only copies changed files)
if [ -d "$LIVE_DIR" ]; then
  rsync -a --delete "$STAGING_DIR"/ "$LIVE_DIR"/
  rm -rf "$STAGING_DIR"
else
  mv "$STAGING_DIR" "$LIVE_DIR"
fi

log "Build switched to production"

# ═══════════════════════════════════════════════════════════
# Step 6 — Alibaba DCDN refresh
# ═══════════════════════════════════════════════════════════
if [ -n "${ALI_ACCESS_KEY_ID:-}" ] && [ -n "${ALI_ACCESS_KEY_SECRET:-}" ]; then

  # Find changed HTML files only
  CHANGED=$(comm -13 "$PREV_MANIFEST" "$NEW_MANIFEST" 2>/dev/null | grep '\.html$' || true)

  URLS=""
  COUNT=0
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    # "docs/QA/index.html" → "/docs/QA"
    url_path="/${f%/index.html}"
    [ "$url_path" = "/index.html" ] && url_path="/"
    URLS="$URLS https://$DCDN_DOMAIN$url_path"
    COUNT=$((COUNT + 1))
  done <<< "$CHANGED"

  if [ "$COUNT" -gt 0 ]; then
    log "Refreshing CDN for $COUNT changed HTML files..."
    # Also always refresh root + docs root
    URLS="https://$DCDN_DOMAIN/ https://$DCDN_DOMAIN/docs/ $URLS"
    node "$PROJECT_DIR/scripts/cdn-refresh.mjs" $URLS 2>&1 || log "CDN refresh failed (non-fatal)"
  else
    log "No HTML changes, skipping CDN refresh"
  fi

elif [ -n "${ALI_ACCESS_KEY_ID:-}" ]; then
  :
else
  log "Skipping CDN refresh (ALI_ACCESS_KEY_ID not set)"
fi

# Clean up old staging dirs (older than 1 day)
find "$PROJECT_DIR" -maxdepth 1 -name 'build_staging*' -mtime +1 -exec rm -rf {} + 2>/dev/null || true

log "=== Deploy complete ==="
