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
  # 净化失败命令里的 " 与 \，否则下方 JSON 载荷会被破坏、告警本身丢失
  _fail_cmd=${BASH_COMMAND//\"/}
  _fail_cmd=${_fail_cmd//\\/}
  notify_feishu "failure" "脚本异常退出 (exit code=$code)：第 ${LINENO} 行 → ${_fail_cmd}。请检查服务器日志。ssh 执行: journalctl -u rebocap-deploy --no-pager -n 80"
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

# ─── Disk guard & pre-build cleanup (D + C) ─────────────────
# 目的：磁盘写满时 git 只会抛 "fatal: ..." 并以 128 退出，告警里看不出是磁盘问题。
#       这里在写入磁盘之前显式检查，并在构建前清掉无上限增长的构建缓存。
# 边界：只删缓存与异常中止遗留的半成品，不碰 git 工作树、不碰线上目录 $OUTPUT_DIR。

du_mb() {
  local p="$1" v
  v="$(du -sm "$p" 2>/dev/null | awk '{print $1}')" || v="?"
  printf '%s' "${v:-?}"
}

disk_avail_mb() {
  local p="$1"
  { df -Pm "$p" 2>/dev/null || true; } | awk 'NR==2 {print $4}' | tr -dc '0-9'
}

require_disk() {
  local need_mb="$1" path="$2" purpose="$3" avail
  avail="$(disk_avail_mb "$path")"
  if [ -z "$avail" ]; then
    log "WARN: 无法读取 $path 的可用空间，跳过磁盘预检"
    return 0
  fi
  log "Disk: ${path} 可用 ${avail} MB（${purpose} 需 >= ${need_mb} MB）"
  if [ "$avail" -lt "$need_mb" ]; then
    LAST_ERROR="sent"
    notify_feishu "failure" "${purpose}：磁盘空间不足。${path} 仅剩 ${avail} MB，至少需要 ${need_mb} MB。已中止，未改动任何文件。"
    exit 1
  fi
}

cleanup_before_build() {
  local before after cache_mb left_mb
  before="$(disk_avail_mb "$PROJECT_DIR")"

  # webpack / TinaCMS 构建缓存：无上限增长，`npx docusaurus clear` 不会清它
  if [ -d node_modules/.cache ]; then
    cache_mb="$(du_mb node_modules/.cache)"
    log "Cleanup: 删除构建缓存 node_modules/.cache (${cache_mb} MB)"
    rm -rf node_modules/.cache
  fi

  # 上一次异常中止遗留的产物（线上目录不受影响）
  for d in "$STAGING_DIR" build; do
    if [ -e "$d" ]; then
      left_mb="$(du_mb "$d")"
      log "Cleanup: 删除遗留产物 ${d} (${left_mb} MB)"
      rm -rf "$d"
    fi
  done

  after="$(disk_avail_mb "$PROJECT_DIR")"
  log "Cleanup 完成：可用空间 ${before} MB → ${after} MB"
}

# ─── git fetch：重试 + 直连兜底 + 把 git 原始报错送进告警 ───────────
# 背景：fetch 失败只会得到 "exit code=128"，看不出是代理、网络还是凭证。
# 这里把 git 的 stderr 原文截取后写进日志与飞书，并在代理失败时改试直连。
git_fetch_with_retry() {
  local attempt rc err safe
  for attempt in 1 2; do
    err="$(git fetch origin 2>&1)" && rc=0 || rc=$?
    if [ "$rc" -eq 0 ]; then
      log "git fetch OK（第 ${attempt} 次尝试）"
      return 0
    fi
    log "git fetch 失败（第 ${attempt} 次，rc=${rc}）：${err}"
    if [ "$attempt" -eq 1 ]; then
      sleep 10
    fi
  done

  if [ -n "${https_proxy:-}" ] || [ -n "${http_proxy:-}" ]; then
    log "代理方式失败，改试直连（清空 https_proxy/http_proxy）..."
    if err="$(https_proxy= http_proxy= git fetch origin 2>&1)"; then
      log "直连 git fetch OK"
      return 0
    fi
    log "直连也失败：${err}"
  fi

  safe="${err//\"/}"
  safe="${safe//\\/}"
  LAST_ERROR="sent"
  notify_feishu "failure" "git fetch 失败，服务器无法访问 GitHub：${safe:0:200}"
  return 1
}

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

# D-1：git 同步前的最低空间检查。磁盘写满时 git 会以 128 退出，先把原因讲清楚。
require_disk "${GIT_MIN_FREE_MB:-512}" "$PROJECT_DIR" "git 同步"

# ═══════════════════════════════════════════════════════════
# Step 1 — Sync with remote (deploy server must match remote exactly)
# ═══════════════════════════════════════════════════════════
# 失败时不再抛裸 128，由函数把 git 原文写进日志与飞书
git_fetch_with_retry || exit 1

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

# D-2 + C：先清理缓存与遗留产物腾出空间，再按构建真实需求预检。
# 顺序不可颠倒：磁盘将满时若先要求 7 GB 才清理，会「因没有空间而无法腾空间」。
cleanup_before_build
require_disk "${BUILD_MIN_FREE_MB:-7000}" "$PROJECT_DIR" "Docusaurus 全量构建"

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
# ═══════════════════════════════════════════════════════════
# Step 4 — Build
# ═══════════════════════════════════════════════════════════
# 核心修改：使用原生构建，保障跨语言路由，同时限制内存
log "Building Docusaurus natively (all locales)..."
log "Clearing Docusaurus cache..."
npx docusaurus clear

# 移除画蛇添足的 for 循环，让 Docusaurus 原生一口气按顺序编译
# 这样不仅能恢复完美的语言菜单，还能恢复根目录的自动跳转
NODE_OPTIONS="--max-old-space-size=1536" npx docusaurus build 2>&1

if [ ${PIPESTATUS[0]} -ne 0 ]; then
    log "Docusaurus native build FAILED!"
    LAST_ERROR="sent"
    notify_feishu "failure" "Docusaurus 原生全量编译失败，请检查日志。"
    exit 1
fi

# 构建成功后，将 build 产物移动到暂存区
log "Checking source-rendered legacy heading aliases and internal page links..."
"$NODE_BIN" "$PROJECT_DIR/scripts/check-sidebars.mjs"
"$NODE_BIN" "$PROJECT_DIR/scripts/check-anchor-aliases.mjs"
"$NODE_BIN" "$PROJECT_DIR/scripts/check-media-layout.mjs"
"$NODE_BIN" "$PROJECT_DIR/scripts/check-internal-links.mjs"
rm -rf "$STAGING_DIR"
mv build "$STAGING_DIR"

# [SLIM SCRIPT] Real-Time Garbage Collection: Deduplicate identical assets using symlinks
# 原生编译会将英文放在根目录，其他语言放在子目录
# 核心修复：采用文件级精准比对，保留小语种专属图片，只软链接完全相同的冗余文件
LOCALES="zh-Hans zh-Hant ja es fr ko ru"
for loc in $LOCALES; do
  for asset in img admin; do
    if [ -d "$STAGING_DIR/$loc/$asset" ]; then
      find "$STAGING_DIR/$loc/$asset" -type f | while read -r file; do
        rel_path="${file#$STAGING_DIR/$loc/}"
        root_file="$STAGING_DIR/$rel_path"
        if [ -f "$root_file" ]; then
          size_loc=$(stat -c%s "$file")
          size_root=$(stat -c%s "$root_file")
          if [ "$size_loc" -eq "$size_root" ]; then
            rm -f "$file"
            dir_count=$(echo "$rel_path" | grep -o "/" | wc -l)
            up_str=""
            for i in $(seq 1 $((dir_count + 1))); do
              up_str="../$up_str"
            done
            ln -s "${up_str}${rel_path}" "$file"
          fi
        fi
      done
      log "Slim: Deduplicated identical files in $loc/$asset"
    fi
  done
done
log "Docusaurus sequential build OK"

# ── 2. Pagefind 内存保护 ──────────────────────────────────────────────
log "Running pagefind..."
# 核心修改：pagefind 同样极其消耗内存和 CPU，限制其并发线程数为 1（默认是全核心跑满，会卡死单核服务器）
npx pagefind --site "$STAGING_DIR" 2>&1

# ═══════════════════════════════════════════════════════════
# Step 5 — Publish to nginx serving directory
# ═══════════════════════════════════════════════════════════
CHANGED_FILES=$("$NODE_BIN" "$PROJECT_DIR/scripts/changed-web-files.mjs" "$OUTPUT_DIR" "$STAGING_DIR")

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
  URLS=()
  COUNT=0
  if [ -n "$CHANGED_FILES" ]; then
    URLS+=("https://$DCDN_DOMAIN/" "https://$DCDN_DOMAIN/docs/")
  fi
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    if [ "$f" = "index.html" ]; then
      url_path="/"
    elif [[ "$f" = */index.html ]]; then
      url_path="/${f%index.html}"
    else
      url_path="/$f"
    fi
    URLS+=("https://$DCDN_DOMAIN$url_path")
    COUNT=$((COUNT + 1))
    if [ "${#URLS[@]}" -ge 100 ]; then
      "$NODE_BIN" "$PROJECT_DIR/scripts/cdn-refresh.mjs" "${URLS[@]}"
      URLS=()
    fi
  done <<< "$CHANGED_FILES"

  if [ "$COUNT" -gt 0 ]; then
    log "Refreshing CDN for $COUNT changed HTML/JS/CSS files..."
    if [ "${#URLS[@]}" -gt 0 ]; then
      "$NODE_BIN" "$PROJECT_DIR/scripts/cdn-refresh.mjs" "${URLS[@]}"
    fi
  else
    log "No HTML/JS/CSS changes, skipping CDN refresh"
  fi

else
  log "Production mode requires Alibaba DCDN credentials; refusing to report a successful deployment"
  exit 1
fi

log "=== Deploy complete ==="
notify_feishu "success" "部署完成。新 commits: ${REMOTE_COMMIT_FOR_MSG:-?} ，站点已更新 → ${DCDN_DOMAIN}"
