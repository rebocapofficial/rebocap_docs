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

FEISHU_WEBHOOK="${FEISHU_WEBHOOK:-}"

# ─── Feishu notification ────────────────────────────────────
# Last error message (updated by inline failure handlers)
LAST_ERROR=""

notify_feishu() {
  local type="$1"    # "success" or "failure"
  local detail="$2"

  local emoji
  if [ "$type" = "success" ]; then
    emoji="✅"
  else
    emoji="❌"
  fi

  local msg="文档后台服务 ${emoji} ${type}：${detail}"

  curl -so /dev/null -X POST "$FEISHU_WEBHOOK" \
    -H "Content-Type: application/json" \
    -d "$(printf '{"msg_type":"text","content":{"text":"%s"}}' "$msg")" \
    2>/dev/null || true
}

# Trap unexpected errors
trap 'code=$?; if [ $code -ne 0 ] && [ "$LAST_ERROR" != "sent" ]; then
  notify_feishu "failure" "脚本异常退出 (exit code=$code)，请检查服务器日志。ssh 执行: journalctl -u rebocap-deploy --no-pager -n 80"
fi; exit $code' ERR

FORCE=false
SKIP_CDN=false

for arg in "$@"; do
  case "$arg" in
    --force) FORCE=true ;;
    --dev)   SKIP_CDN=true ;;
  esac
done

PROJECT_DIR="${PROJECT_DIR:-/opt/rebocap_docs}"
STAGING_DIR="$PROJECT_DIR/../build"
# nginx serves from here — can be on a different disk / partition
OUTPUT_DIR="${OUTPUT_DIR:-/data/wwwroot/doc.hamer.xin}"
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

# Auto-detect node binary and fix PATH (systemd has minimal PATH)
NODE_BIN="${NODE_BIN:-$(command -v node || echo /usr/local/node/bin/node)}"
NODE_DIR="$(dirname "$NODE_BIN")"
export PATH="$NODE_DIR:$PATH"


cd "$PROJECT_DIR"
log() { echo "[$(date '+%H:%M:%S')] $*"; }

# ─── Proxy (for GitHub access) ──────────────────────────────
PROXY_URL="http://127.0.0.1:${PROXY_PORT}"

if curl -so /dev/null -L --max-time 5 -x "$PROXY_URL" https://github.com; then
  export https_proxy="$PROXY_URL"
  export http_proxy="$PROXY_URL"
  log "Using proxy $PROXY_URL for GitHub access"
else
  log "Proxy not available — connecting directly"
fi

log "=== Deploy start ==="

# ═══════════════════════════════════════════════════════════
# Step 1 — Sync with remote (deploy server must match remote exactly)
# ═══════════════════════════════════════════════════════════
git fetch origin 2>&1

if [ "$FORCE" = false ]; then
  LOCAL=$(git rev-parse HEAD)
  REMOTE=$(git rev-parse origin/main)

  if [ "$LOCAL" = "$REMOTE" ]; then
    log "No new commits — skipping build"
    exit 0
  fi
  log "New commits: ${LOCAL:0:7} → ${REMOTE:0:7}"
  REMOTE_COMMIT_FOR_MSG="${REMOTE:0:7}"
fi

# Abort any in-progress merge, discard ALL local changes, force-sync to remote
git merge --abort 2>/dev/null || true
git checkout main
git reset --hard origin/main
log "Synced to origin/main (${REMOTE_COMMIT_FOR_MSG:-forced})"

# ═══════════════════════════════════════════════════════════
# Step 2 — Dependencies
# ═══════════════════════════════════════════════════════════
# npm ci --prefer-offline 2>&1 | tail -3

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
# 核心修改：分批串行编译，彻底绕过内存溢出 (OOM) 限制
log "Building Docusaurus sequentially (Low Memory Mode)..."
rm -rf "$STAGING_DIR"
mkdir -p "$STAGING_DIR"

LOCALES="en zh-Hans zh-Hant ja es fr ko ru"
for loc in $LOCALES; do
  log "Building locale: $loc"
  if [ "$loc" = "en" ]; then
    OUT_DIR="$STAGING_DIR"
  else
    OUT_DIR="$STAGING_DIR/$loc"
  fi
  
  NODE_OPTIONS="--max-old-space-size=1536" npx docusaurus build --locale "$loc" --out-dir "$OUT_DIR" 2>&1
  
  if [ ${PIPESTATUS[0]} -ne 0 ]; then
      log "Docusaurus build FAILED on locale $loc!"
      LAST_ERROR="sent"
      notify_feishu "failure" "Docusaurus 编译失败 ($loc)，请检查日志。"
      exit 1
  fi

  # [SLIM SCRIPT] Real-Time Garbage Collection: Deduplicate identical assets using symlinks
  if [ "$loc" != "en" ]; then
    for asset in img assets js admin; do
      if [ -d "$OUT_DIR/$asset" ]; then
        rm -rf "$OUT_DIR/$asset"
        ln -s "../$asset" "$OUT_DIR/$asset"
      fi
    done
    log "Slim: Replaced redundant assets for $loc with symlinks to root"
  fi
done
log "Docusaurus sequential build OK"

# ── 2. Pagefind 内存保护 ──────────────────────────────────────────────
log "Running pagefind..."
# 核心修改：pagefind 同样极其消耗内存和 CPU，限制其并发线程数为 1（默认是全核心跑满，会卡死单核服务器）
npx pagefind --site "$STAGING_DIR" 2>&1

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
    $NODE_BIN "$PROJECT_DIR/scripts/cdn-refresh.mjs" $URLS 2>&1 || log "CDN refresh failed (non-fatal)"
  else
    log "No HTML changes, skipping CDN refresh"
  fi

else
  log "Skipping CDN refresh (ALI_ACCESS_KEY_ID not set)"
fi

log "=== Deploy complete ==="
notify_feishu "success" "部署完成。新 commits: ${REMOTE_COMMIT_FOR_MSG:-?} ，站点已更新 → ${DCDN_DOMAIN}"
