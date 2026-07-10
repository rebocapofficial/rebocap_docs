#!/bin/bash
# ============================================================
#  Rebocap Doc — Auto Deploy Script (for CentOS server)
#
#  Does:
#    1. git fetch + pull (skip if no new commits)
#    2. npm ci (only if package.json changed)
#    3. docusaurus build → staging dir
#    4. pagefind index
#    5. rsync to nginx serving directory
#    6. Alibaba DCDN cache refresh (only changed HTML, prod only)
#
#  Usage:
#    ./scripts/deploy.sh                # check git, deploy if new
#    ./scripts/deploy.sh --force        # skip git check, rebuild
#    ./scripts/deploy.sh --dev          # skip CDN refresh (for testing)
#
#  Cron (polling) — run every 5 min:
#    */5 * * * * bash /opt/rebocap_docs/scripts/deploy.sh >> /var/log/rebocap-deploy.log 2>&1
#
#  Env:
#    DEPLOY_MODE=dev   — same as --dev, skip CDN refresh
# ============================================================
set -euo pipefail

FORCE=false
SKIP_CDN=false

for arg in "$@"; do
  case "$arg" in
    --force) FORCE=true ;;
    --dev)   SKIP_CDN=true ;;
  esac
done

PROJECT_DIR="${PROJECT_DIR:-/opt/rebocap_docs}"
STAGING_DIR="$PROJECT_DIR/build_staging"
# nginx serves from here — can be on a different disk / partition
OUTPUT_DIR="${OUTPUT_DIR:-/data/wwwroot/default/rebocap_doc_new}"
PREV_MANIFEST="$PROJECT_DIR/.deploy-prev-manifest.txt"
NEW_MANIFEST="$PROJECT_DIR/.deploy-new-manifest.txt"
PROXY_PORT="${PROXY_PORT:-10809}"

# Source secret env vars if .env exists
if [ -f "$PROJECT_DIR/.env" ]; then
  set -a; source "$PROJECT_DIR/.env"; set +a
fi

# DEPLOY_MODE env var → --dev behavior
if [ "${DEPLOY_MODE:-}" = "dev" ]; then
  SKIP_CDN=true
fi

DCDN_DOMAIN="${DCDN_DOMAIN:-doc.rebocap.com}"

cd "$PROJECT_DIR"
log() { echo "[$(date '+%H:%M:%S')] $*"; }

# ─── Proxy (for GitHub access) ──────────────────────────────
PROXY_URL="http://127.0.0.1:${PROXY_PORT}"

if curl -s --max-time 2 -x "$PROXY_URL" https://github.com > /dev/null 2>&1; then
  export https_proxy="$PROXY_URL"
  export http_proxy="$PROXY_URL"
  log "Using proxy $PROXY_URL for GitHub access"
else
  log "Proxy not available — connecting directly"
fi

log "=== Deploy start ==="

# ═══════════════════════════════════════════════════════════
# Step 1 — Git pull (stash local changes to avoid conflicts)
# ═══════════════════════════════════════════════════════════
STASHED=false
if ! git diff --quiet || ! git diff --cached --quiet; then
  git stash push -m "auto-deploy-stash-$(date +%s)" 2>&1
  STASHED=true
  log "Local changes stashed before pull"
fi

if [ "$FORCE" = false ]; then
  git fetch origin main 2>&1
  LOCAL=$(git rev-parse HEAD)
  REMOTE=$(git rev-parse origin/main)

  if [ "$LOCAL" = "$REMOTE" ] && [ "$STASHED" = false ]; then
    log "No new commits — skipping build"
    exit 0
  fi
  log "New commits: ${LOCAL:0:7} → ${REMOTE:0:7}"
fi

git checkout main
git pull origin main

if [ "$STASHED" = true ]; then
  if git stash pop 2>&1; then
    log "Restored local changes"
  else
    log "Stash conflicts — keeping pulled version"
    git checkout --theirs . 2>/dev/null || true
    git stash drop 2>/dev/null || true
  fi
fi

# ═══════════════════════════════════════════════════════════
# Step 2 — Dependencies
# ═══════════════════════════════════════════════════════════
npm ci --prefer-offline 2>&1 | tail -3

# ═══════════════════════════════════════════════════════════
# Step 3 — Save previous manifest (for CDN diff)
# ═══════════════════════════════════════════════════════════
if [ -d "$OUTPUT_DIR" ]; then
  find "$OUTPUT_DIR" -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' \) \
    | sed "s|^$OUTPUT_DIR/||" | sort > "$PREV_MANIFEST"
else
  :> "$PREV_MANIFEST"
fi

# ═══════════════════════════════════════════════════════════
# Step 4 — Build
# ═══════════════════════════════════════════════════════════
log "Building Docusaurus..."
rm -rf "$STAGING_DIR"

npx docusaurus build --out-dir "$STAGING_DIR" 2>&1 | tail -5
log "Docusaurus build OK"

log "Running pagefind..."
npx pagefind --site "$STAGING_DIR" 2>&1 | tail -3 || log "(pagefind skipped or done)"

# ═══════════════════════════════════════════════════════════
# Step 5 — Publish to nginx serving directory
# ═══════════════════════════════════════════════════════════
find "$STAGING_DIR" -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' \) \
  | sed "s|^$STAGING_DIR/||" | sort > "$NEW_MANIFEST"

mkdir -p "$OUTPUT_DIR"
rsync -a --delete "$STAGING_DIR"/ "$OUTPUT_DIR"/
rm -rf "$STAGING_DIR"
log "Published to $OUTPUT_DIR"

# ═══════════════════════════════════════════════════════════
# Step 6 — Alibaba DCDN refresh (prod only)
# ═══════════════════════════════════════════════════════════
if [ "$SKIP_CDN" = true ]; then
  log "Dev mode — skipping CDN refresh"
elif [ -n "${ALI_ACCESS_KEY_ID:-}" ] && [ -n "${ALI_ACCESS_KEY_SECRET:-}" ]; then

  CHANGED=$(comm -13 "$PREV_MANIFEST" "$NEW_MANIFEST" 2>/dev/null | grep '\.html$' || true)

  URLS=""
  COUNT=0
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    url_path="/${f%/index.html}"
    [ "$url_path" = "/index.html" ] && url_path="/"
    URLS="$URLS https://$DCDN_DOMAIN$url_path"
    COUNT=$((COUNT + 1))
  done <<< "$CHANGED"

  if [ "$COUNT" -gt 0 ]; then
    log "Refreshing CDN for $COUNT changed HTML files..."
    URLS="https://$DCDN_DOMAIN/ https://$DCDN_DOMAIN/docs/ $URLS"
    node "$PROJECT_DIR/scripts/cdn-refresh.mjs" $URLS 2>&1 || log "CDN refresh failed (non-fatal)"
  else
    log "No HTML changes, skipping CDN refresh"
  fi

else
  log "Skipping CDN refresh (ALI_ACCESS_KEY_ID not set)"
fi

log "=== Deploy complete ==="
