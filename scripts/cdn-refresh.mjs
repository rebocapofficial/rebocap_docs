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

function commonParams(action) {
  const accessKeyId = process.env.ALI_ACCESS_KEY_ID;
  const accessKeySecret = process.env.ALI_ACCESS_KEY_SECRET;
  if (!accessKeyId || !accessKeySecret) {
    throw new Error("Missing ALI_ACCESS_KEY_ID or ALI_ACCESS_KEY_SECRET env vars.");
  }

  return {
    Action: action,
    Format: "JSON",
    Version: "2018-01-15",
    AccessKeyId: accessKeyId,
    SignatureMethod: "HMAC-SHA1",
    SignatureVersion: "1.0",
    SignatureNonce: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    Timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
  };
}

function toSignedUrl(params) {
  params.Signature = sign(process.env.ALI_ACCESS_KEY_SECRET, "GET", params);
  const query = Object.keys(params)
    .map((key) => `${percentEncode(key)}=${percentEncode(params[key])}`)
    .join("&");
  return `https://dcdn.aliyuncs.com/?${query}`;
}

async function callDcdnApi(params) {
  const response = await fetch(toSignedUrl(params), { signal: AbortSignal.timeout(30_000) });
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(`DCDN API returned non-JSON data (HTTP ${response.status}).`);
  }
  if (!response.ok || data.Code) {
    throw new Error(`DCDN API request failed (HTTP ${response.status}, ${data.Code ?? "unknown"}): ${data.Message ?? "no message"}`);
  }
  return data;
}

async function refreshDcdn(urls, type = "File") {
  // Join URLs with newline as required by Alibaba Cloud API
  const objectPath = urls.join("\n");

  const params = {
    ...commonParams("RefreshDcdnObjectCaches"),
    ObjectPath: objectPath,
    ObjectType: type, // "File" for specific URLs, "Directory" for directory refresh
  };
  if (type === "Directory") params.Force = "true";

  console.log(`Refreshing ${urls.length} URL(s), type=${type}...`);
  const data = await callDcdnApi(params);
  if (!data.RefreshTaskId) throw new Error("DCDN API response did not include RefreshTaskId.");
  console.log(`CDN refresh submitted. TaskId: ${data.RefreshTaskId}`);
  return data.RefreshTaskId;
}

async function describeTasks(taskIds) {
  const params = { ...commonParams("DescribeDcdnRefreshTaskById"), TaskId: taskIds.join(",") };
  const data = await callDcdnApi(params);
  const tasks = data.Tasks ?? [];
  if (!tasks.length) throw new Error("DCDN returned no matching refresh tasks.");
  for (const task of tasks) {
    console.log(`${task.TaskId}: ${task.Status} (${task.Process ?? "unknown"})${task.Description ? ` — ${task.Description}` : ""}`);
  }
  if (tasks.some((task) => ["Failed", "Timeout", "Canceled"].includes(task.Status))) {
    throw new Error("At least one DCDN refresh task did not complete successfully.");
  }
  return tasks;
}

// ─── Main ────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Usage: node cdn-refresh.mjs [--dir] <url1> <url2> ... | --status <task-id[,task-id...]> ");
  process.exit(1);
}

try {
  if (args[0] === "--status") {
    const taskIds = (args[1] ?? "").split(",").filter(Boolean);
    if (!taskIds.length || taskIds.length > 10) throw new Error("Provide between 1 and 10 comma-separated task IDs.");
    await describeTasks(taskIds);
  } else {
    let type = "File";
    let urls = args;
    if (args[0] === "--dir") {
      type = "Directory";
      urls = args.slice(1);
    }
    if (!urls.length) throw new Error("Provide at least one URL to refresh.");
    console.log(`URLs to refresh (${type}):`);
    urls.forEach((url) => console.log(`  ${url}`));
    await refreshDcdn(urls, type);
  }
} catch (error) {
  console.error(`CDN refresh failed: ${error.message}`);
  process.exitCode = 1;
}
