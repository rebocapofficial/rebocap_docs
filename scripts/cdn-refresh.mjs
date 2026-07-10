/**
 * Alibaba Cloud DCDN Cache Refresh
 *
 * Calls RefreshDcdnObjectCaches API to purge CDN cache for given URLs.
 * Uses Alibaba Cloud Signature V1 (HMAC-SHA1).
 *
 * ENV vars required:
 *   ALI_ACCESS_KEY_ID       — Alibaba Cloud RAM AccessKey
 *   ALI_ACCESS_KEY_SECRET   — Alibaba Cloud RAM AccessKey Secret
 *
 * Usage:
 *   node scripts/cdn-refresh.mjs https://doc.rebocap.com/ https://doc.rebocap.com/docs/
 *   node scripts/cdn-refresh.mjs --dir https://doc.rebocap.com/docs/
 */

import { createHmac } from "crypto";
import { URL } from "url";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function percentEncode(str) {
  return encodeURIComponent(str)
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A")
    .replace(/\+/g, "%20");
}

/** Generate Alibaba Cloud API Signature (V1). */
function sign(secret, method, params) {
  const canonicalizedQuery = Object.keys(params)
    .sort()
    .map((k) => `${percentEncode(k)}=${percentEncode(params[k])}`)
    .join("&");

  const stringToSign = `${method}&${percentEncode("/")}&${percentEncode(canonicalizedQuery)}`;
  return createHmac("sha1", `${secret}&`).update(stringToSign).digest("base64");
}

async function refreshDcdn(urls, type = "File") {
  const accessKeyId = process.env.ALI_ACCESS_KEY_ID;
  const accessKeySecret = process.env.ALI_ACCESS_KEY_SECRET;

  if (!accessKeyId || !accessKeySecret) {
    console.error("Missing ALI_ACCESS_KEY_ID or ALI_ACCESS_KEY_SECRET env vars.");
    process.exit(1);
  }

  // Join URLs with newline as required by Alibaba Cloud API
  const objectPath = urls.join("\n");

  const params = {
    Action: "RefreshDcdnObjectCaches",
    Format: "JSON",
    Version: "2018-01-15",
    AccessKeyId: accessKeyId,
    SignatureMethod: "HMAC-SHA1",
    SignatureVersion: "1.0",
    SignatureNonce: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    Timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
    ObjectPath: objectPath,
    ObjectType: type, // "File" for specific URLs, "Directory" for directory refresh
  };

  params.Signature = sign(accessKeySecret, "GET", params);

  const query = Object.keys(params)
    .map((k) => `${percentEncode(k)}=${percentEncode(params[k])}`)
    .join("&");

  const url = `https://dcdn.aliyuncs.com/?${query}`;

  console.log(`Refreshing ${urls.length} URL(s), type=${type}...`);

  const res = await fetch(url);
  const data = await res.json();

  if (data.RefreshTaskId) {
    console.log(`CDN refresh submitted. TaskId: ${data.RefreshTaskId}`);
  } else {
    console.error("CDN refresh API error:", JSON.stringify(data, null, 2));
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Usage: node cdn-refresh.mjs [--dir] <url1> <url2> ...");
  process.exit(1);
}

let type = "File";
let urls = args;

if (args[0] === "--dir") {
  type = "Directory";
  urls = args.slice(1);
}

console.log(`URLs to refresh (${type}):`);
urls.forEach((u) => console.log(`  ${u}`));

await refreshDcdn(urls, type);
