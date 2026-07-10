#!/bin/bash
# Source this to enable the local HTTP proxy for the current shell.
#
# Usage:
#   source scripts/proxy/proxy-on.sh
#
# After sourcing:
#   - git clone / pull from GitHub will use the proxy
#   - curl / wget to GitHub will use the proxy
#   - npm install will use the proxy
#
# To disable:
#   unset https_proxy http_proxy

PROXY_PORT="${PROXY_PORT:-10809}"
PROXY_URL="http://127.0.0.1:${PROXY_PORT}"

# Check if proxy is actually running
if ! curl -s --max-time 2 -x "$PROXY_URL" https://github.com > /dev/null 2>&1; then
  echo "[WARN] Proxy not responding at $PROXY_URL" >&2
  echo "       Start it: sudo systemctl start xray-proxy" >&2
fi

export https_proxy="$PROXY_URL"
export http_proxy="$PROXY_URL"
export HTTPS_PROXY="$PROXY_URL"
export HTTP_PROXY="$PROXY_URL"

# git over proxy (only for GitHub)
git config --global http.https://github.com.proxy "$PROXY_URL" 2>/dev/null || true

echo "[OK] Proxy ON — https_proxy=$PROXY_URL"
echo "     Test:  curl -I https://github.com"
