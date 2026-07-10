#!/bin/bash
# ============================================================
#  Install Xray as a local HTTP proxy (standalone — can be
#  copied anywhere and run independently).
#
#  This downloads Xray-core and creates a client config that
#  connects to your VLESS server, exposing a local HTTP proxy
#  on 127.0.0.1:10809.
#
#  Nothing is written to the current directory.  Config goes
#  to /usr/local/etc/xray/, binary to /usr/local/xray/.
#
#  Usage (copy this one file to any CentOS server):
#
#    export VLESS_ADDRESS=172.104.67.112
#    export VLESS_PORT=12450
#    export VLESS_UUID=futaray
#    sudo -E bash setup-xray.sh
#
#    # Or interactively (will prompt for each value):
#    sudo bash setup-xray.sh
# ============================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ARCH="linux-64"
XRAY_ZIP="Xray-${ARCH}.zip"
XRAY_URL="https://github.com/XTLS/Xray-core/releases/latest/download/${XRAY_ZIP}"

INSTALL_DIR="/usr/local/xray"
CONF_DIR="/usr/local/etc/xray"
LOG_DIR="/var/log/xray"
PROXY_PORT="${PROXY_PORT:-10809}"

echo "=== Xray Local Proxy Setup ==="

# ─── VLESS credentials ──────────────────────────────────────
if [ -z "${VLESS_ADDRESS:-}" ]; then
  echo ""
  echo "VLESS server details (not saved to any git-tracked file):"
  read -rp "  Server address: " VLESS_ADDRESS
  read -rp "  Server port [12450]: " vp; VLESS_PORT="${vp:-12450}"
  read -rp "  UUID: " VLESS_UUID
fi

VLESS_PORT="${VLESS_PORT:-12450}"

if [ -z "${VLESS_ADDRESS:-}" ] || [ -z "${VLESS_UUID:-}" ]; then
  echo "ERROR: VLESS_ADDRESS and VLESS_UUID are required."
  echo ""
  echo "Usage:"
  echo "  export VLESS_ADDRESS=1.2.3.4"
  echo "  export VLESS_PORT=12450"
  echo "  export VLESS_UUID=your-uuid"
  echo "  sudo -E bash setup-xray.sh"
  exit 1
fi

# ─── Install Xray (local file first, then download) ───────────
mkdir -p "$INSTALL_DIR" "$CONF_DIR" "$LOG_DIR"

if [ ! -f "$INSTALL_DIR/xray" ]; then
  # Prefer local zip if placed alongside this script
  if [ -f "$SCRIPT_DIR/$XRAY_ZIP" ]; then
    echo "Using local $XRAY_ZIP"
    unzip -o "$SCRIPT_DIR/$XRAY_ZIP" -d "$INSTALL_DIR"
  elif [ -f "/tmp/$XRAY_ZIP" ]; then
    echo "Using /tmp/$XRAY_ZIP"
    unzip -o "/tmp/$XRAY_ZIP" -d "$INSTALL_DIR"
  else
    echo "Downloading Xray..."
    curl -fsSLO "$XRAY_URL" || {
      echo "ERROR: Download failed.  Put $XRAY_ZIP alongside this script and re-run."
      exit 1
    }
    unzip -o "$XRAY_ZIP" -d "$INSTALL_DIR"
    rm -f "$XRAY_ZIP"
  fi
  chmod +x "$INSTALL_DIR/xray"
fi
echo "Xray: $INSTALL_DIR/xray ($($INSTALL_DIR/xray version 2>&1 | head -1))"

# ─── Generate config (self-contained, no external template) ───
CONFIG_FILE="$CONF_DIR/config.json"

cat > "$CONFIG_FILE" << EOF
{
  "log": {
    "loglevel": "warning",
    "access": "/var/log/xray/access.log",
    "error": "/var/log/xray/error.log"
  },
  "inbounds": [{
    "port": ${PROXY_PORT},
    "listen": "127.0.0.1",
    "protocol": "http",
    "tag": "http-in",
    "settings": {
      "timeout": 300,
      "allowTransparent": false
    }
  }],
  "outbounds": [{
    "protocol": "vless",
    "tag": "proxy",
    "settings": {
      "vnext": [{
        "address": "${VLESS_ADDRESS}",
        "port": ${VLESS_PORT},
        "users": [{
          "id": "${VLESS_UUID}",
          "encryption": "none"
        }]
      }]
    },
    "streamSettings": {
      "network": "tcp",
      "security": "none",
      "tcpSettings": {
        "header": { "type": "none" }
      }
    }
  }, {
    "protocol": "freedom",
    "tag": "direct",
    "settings": {}
  }],
  "routing": {
    "rules": [{
      "type": "field",
      "inboundTag": ["http-in"],
      "outboundTag": "proxy"
    }]
  }
}
EOF

chmod 600 "$CONFIG_FILE"
echo "Config written: $CONFIG_FILE"

# ─── Validate config ─────────────────────────────────────────
echo -n "Validating... "
if "$INSTALL_DIR/xray" -test -config "$CONFIG_FILE" > /dev/null 2>&1; then
  echo "OK"
else
  echo "FAILED"
  "$INSTALL_DIR/xray" -test -config "$CONFIG_FILE" 2>&1
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

sleep 2
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
  echo "Check: journalctl -u xray-proxy -n 20"
  exit 1
fi
