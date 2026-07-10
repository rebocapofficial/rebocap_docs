#!/bin/bash
# ============================================================
#  Install & configure Xray as a local HTTP proxy.
#
#  This downloads Xray-core and creates a client config that
#  connects to your VLESS server, exposing a local HTTP proxy
#  on 127.0.0.1:10809.
#
#
#  Then run:
#    sudo -E bash scripts/proxy/setup-xray.sh
#
#  (The -E flag preserves env vars for sudo.)
# ============================================================
set -euo pipefail

ARCH="linux-64"
XRAY_VERSION="v25.5.7"
XRAY_ZIP="Xray-${ARCH}.zip"
XRAY_URL="https://github.com/XTLS/Xray-core/releases/download/${XRAY_VERSION}/${XRAY_ZIP}"

INSTALL_DIR="/usr/local/xray"
CONF_DIR="/usr/local/etc/xray"
LOG_DIR="/var/log/xray"
PROXY_PORT="${PROXY_PORT:-10809}"

echo "=== Installing Xray-core ${XRAY_VERSION} ==="

# ─── VLESS credentials ──────────────────────────────────────
# Read from env vars (passed via sudo -E or .env file)
if [ -z "${VLESS_ADDRESS:-}" ]; then
  echo ""
  echo "Enter your VLESS server details (these are NOT saved in any git-tracked file):"
  read -rp "  Server address: " VLESS_ADDRESS
  read -rp "  Server port [12450]: " vp; VLESS_PORT="${vp:-12450}"
  read -rp "  UUID: " VLESS_UUID
fi

VLESS_PORT="${VLESS_PORT:-12450}"

if [ -z "${VLESS_ADDRESS:-}" ] || [ -z "${VLESS_UUID:-}" ]; then
  echo "ERROR: VLESS_ADDRESS and VLESS_UUID are required."
  echo "Usage:"
  echo "  export VLESS_ADDRESS=your-server-ip"
  echo "  export VLESS_PORT=your-server-port"
  echo "  export VLESS_UUID=your-uuid"
  echo "  sudo -E bash scripts/proxy/setup-xray.sh"
  exit 1
fi

# ─── Download & install Xray ─────────────────────────────────
mkdir -p "$INSTALL_DIR" "$CONF_DIR" "$LOG_DIR"

if [ ! -f "$INSTALL_DIR/xray" ]; then
  cd /tmp
  echo "Downloading Xray..."
  curl -fsSLO "$XRAY_URL" || {
    echo "ERROR: Cannot download Xray from GitHub."
    echo "If GitHub is blocked, download manually and place xray binary at $INSTALL_DIR/xray"
    exit 1
  }
  unzip -o "$XRAY_ZIP" -d "$INSTALL_DIR"
  rm -f "$XRAY_ZIP"
  chmod +x "$INSTALL_DIR/xray"
fi
echo "Xray: $INSTALL_DIR/xray ($($INSTALL_DIR/xray version | head -1))"

# ─── Generate config from template ───────────────────────────
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TEMPLATE="$SCRIPT_DIR/xray-config.example.json"
CONFIG_FILE="$CONF_DIR/config.json"

# Use jq if available, otherwise sed
if command -v jq &>/dev/null; then
  jq \
    --arg addr "$VLESS_ADDRESS" \
    --arg port "$VLESS_PORT" \
    --arg uuid "$VLESS_UUID" \
    --argjson proxyPort "$PROXY_PORT" \
    '.inbounds[0].port = $proxyPort |
     .outbounds[0].settings.vnext[0].address = $addr |
     .outbounds[0].settings.vnext[0].port = ($port | tonumber) |
     .outbounds[0].settings.vnext[0].users[0].id = $uuid' \
    "$TEMPLATE" > "$CONFIG_FILE"
  echo "Config generated with jq → $CONFIG_FILE"
else
  # Fallback: sed subst
  sed \
    -e "s/YOUR_SERVER_IP/$VLESS_ADDRESS/" \
    -e "s/\"port\": 12450/\"port\": $VLESS_PORT/" \
    -e "s/YOUR_VLESS_UUID/$VLESS_UUID/" \
    -e "s/\"port\": 10809/\"port\": $PROXY_PORT/" \
    "$TEMPLATE" > "$CONFIG_FILE"
  echo "Config generated with sed → $CONFIG_FILE"
fi

# Never leave real config in the git repo
rm -f "$SCRIPT_DIR/xray-config.json"

chmod 600 "$CONFIG_FILE"

# ─── Validate config ─────────────────────────────────────────
echo "Validating config..."
if "$INSTALL_DIR/xray" -test -config "$CONFIG_FILE" 2>&1; then
  echo "Config OK"
else
  echo "ERROR: Config validation failed"
  exit 1
fi

# ─── systemd service ─────────────────────────────────────────
cat > /etc/systemd/system/xray-proxy.service << 'SVC'
[Unit]
Description=Xray Local Proxy (HTTP → VLESS)
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/xray/xray run -config /usr/local/etc/xray/config.json
Restart=on-failure
RestartSec=5
User=root
LimitNOFILE=65536
AmbientCapabilities=CAP_NET_BIND_SERVICE

[Install]
WantedBy=multi-user.target
SVC

systemctl daemon-reload
systemctl enable xray-proxy
systemctl restart xray-proxy

sleep 1
if systemctl is-active --quiet xray-proxy; then
  echo ""
  echo "========================================"
  echo "  Xray proxy RUNNING"
  echo "  HTTP proxy: 127.0.0.1:${PROXY_PORT}"
  echo "========================================"
  echo ""
  echo "Test:  curl -x http://127.0.0.1:${PROXY_PORT} https://github.com"
else
  echo "ERROR: Service failed to start."
  echo "Check logs: journalctl -u xray-proxy -n 20"
  exit 1
fi
