/**
 * GitHub Webhook Server — listens for push events, triggers deploy.
 *
 * Run:  node scripts/webhook-server.mjs
 * Env:  WEBHOOK_SECRET  — GitHub webhook secret (required)
 *       WEBHOOK_PORT    — listen port (default 9000)
 *       FEISHU_WEBHOOK  — Feishu bot webhook URL (optional)
 *
 * GitHub webhook settings:
 *   Payload URL:  http://<your-server>:9000/webhook
 *   Content type: application/json
 *   Secret:       <same as WEBHOOK_SECRET>
 *   Events:       Just the push event
 */

import { createServer } from "http";
import { createHmac, timingSafeEqual } from "crypto";
import { execSync } from "child_process";

const PORT = parseInt(process.env.WEBHOOK_PORT || "9000", 10);
const SECRET = process.env.WEBHOOK_SECRET;
const FEISHU_WEBHOOK = process.env.FEISHU_WEBHOOK || "";
const DEPLOY_SCRIPT = "bash scripts/deploy.sh";

if (!SECRET) {
  console.error("FATAL: WEBHOOK_SECRET env var is required.");
  process.exit(1);
}

// ─── Feishu notification ─────────────────────────────────────────────────────

function notifyFeishu(title, detail) {
  if (!FEISHU_WEBHOOK) return;
  const emoji = title === "success" ? "✅" : "❌";
  const msg = `文档后台服务 ${emoji} ${title}：${detail}`;

  fetch(FEISHU_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ msg_type: "text", content: { text: msg } }),
  }).catch(() => {});
}

// ─── Signature verification ──────────────────────────────────────────────────

function verifySignature(payload, signature) {
  if (!signature) return false;
  const expected = "sha256=" + createHmac("sha256", SECRET).update(payload).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}

// ─── Run deploy in background ────────────────────────────────────────────────

function runDeploy() {
  console.log(`[${new Date().toISOString()}] Triggering deploy...`);
  try {
    execSync(DEPLOY_SCRIPT, {
      stdio: "inherit",
      timeout: 10 * 60 * 1000, // 10 min timeout
    });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Deploy FAILED:`, err.message);
    notifyFeishu("failure", `Webhook 触发的部署执行失败: ${err.message.slice(0, 200)}`);
  }
}

// ─── HTTP Server ─────────────────────────────────────────────────────────────

const server = createServer((req, res) => {
  // Health check
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
    return;
  }

  // Webhook endpoint
  if (req.method === "POST" && req.url === "/webhook") {
    const signature = req.headers["x-hub-signature-256"];
    const event = req.headers["x-github-event"];

    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      // Verify signature
      if (!verifySignature(body, signature)) {
        console.log(`[${new Date().toISOString()}] Invalid signature — rejected`);
        notifyFeishu("failure", "GitHub Webhook 签名验证失败，请检查 WEBHOOK_SECRET 是否一致");
        res.writeHead(401);
        res.end("Invalid signature");
        return;
      }

      // Only handle push events
      if (event !== "push") {
        res.writeHead(200);
        res.end(`Ignored event: ${event}`);
        return;
      }

      try {
        const payload = JSON.parse(body);
        const ref = payload.ref || "";
        const branch = ref.replace("refs/heads/", "");

        console.log(`[${new Date().toISOString()}] Push to ${branch} by ${payload.pusher?.name || "unknown"}`);

        if (branch !== "main") {
          res.writeHead(200);
          res.end(`Ignored branch: ${branch}`);
          return;
        }

        // Respond to GitHub immediately, run deploy async
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "deploy_started" }));

        // Detached deploy — won't block response
        runDeploy();
      } catch (err) {
        console.error("Error processing webhook:", err.message);
        notifyFeishu("failure", `GitHub Webhook 解析失败: ${err.message.slice(0, 200)}`);
        if (!res.headersSent) {
          res.writeHead(400);
          res.end("Bad request");
        }
      }
    });
    return;
  }

  // 404
  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`Webhook server listening on :${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Webhook URL:  http://<server>:${PORT}/webhook`);
});
