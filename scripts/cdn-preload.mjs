/**
 * Submit exact file URLs for preloading into Alibaba Cloud DCDN.
 *
 * Usage:
 *   node scripts/cdn-preload.mjs https://doc.rebocap.com/assets/example.js
 *
 * Preload only accepts file URLs, in batches of at most 100. The account's
 * default daily quota is 1,000 URLs, so this command refuses larger batches.
 */

import { createHmac } from "crypto";

const MAX_URLS_PER_REQUEST = 100;
const MAX_URLS_PER_DAY = 1000;

function percentEncode(value) {
  return encodeURIComponent(value)
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A")
    .replace(/\+/g, "%20");
}

function sign(secret, method, params) {
  const canonicalizedQuery = Object.keys(params)
    .sort()
    .map((key) => `${percentEncode(key)}=${percentEncode(params[key])}`)
    .join("&");

  const stringToSign = `${method}&${percentEncode("/")}&${percentEncode(canonicalizedQuery)}`;
  return createHmac("sha1", `${secret}&`).update(stringToSign).digest("base64");
}

function commonParams() {
  const accessKeyId = process.env.ALI_ACCESS_KEY_ID;
  const accessKeySecret = process.env.ALI_ACCESS_KEY_SECRET;
  if (!accessKeyId || !accessKeySecret) {
    throw new Error("Missing ALI_ACCESS_KEY_ID or ALI_ACCESS_KEY_SECRET env vars.");
  }

  return {
    Action: "PreloadDcdnObjectCaches",
    Format: "JSON",
    Version: "2018-01-15",
    AccessKeyId: accessKeyId,
    SignatureMethod: "HMAC-SHA1",
    SignatureVersion: "1.0",
    SignatureNonce: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    Timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
  };
}

async function preloadBatch(urls) {
  const params = {
    ...commonParams(),
    ObjectPath: urls.join("\n"),
  };
  params.Signature = sign(process.env.ALI_ACCESS_KEY_SECRET, "POST", params);

  const body = new URLSearchParams(params);
  const response = await fetch("https://dcdn.aliyuncs.com/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    signal: AbortSignal.timeout(30_000),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(`DCDN API returned non-JSON data (HTTP ${response.status}).`);
  }
  if (!response.ok || data.Code) {
    throw new Error(
      `DCDN preload failed (HTTP ${response.status}, ${data.Code ?? "unknown"}): ${data.Message ?? "no message"}`,
    );
  }
  if (!data.PreloadTaskId) {
    throw new Error("DCDN API response did not include PreloadTaskId.");
  }

  console.log(`Preload submitted for ${urls.length} URL(s). TaskId: ${data.PreloadTaskId}`);
  return data.PreloadTaskId;
}

const urls = [...new Set(process.argv.slice(2))];

try {
  if (!urls.length) {
    throw new Error("Provide one or more exact file URLs to preload.");
  }
  if (urls.length > MAX_URLS_PER_DAY) {
    throw new Error(`Refusing ${urls.length} URLs: the default daily quota is ${MAX_URLS_PER_DAY}.`);
  }

  for (const value of urls) {
    let url;
    try {
      url = new URL(value);
    } catch {
      throw new Error(`Invalid URL: ${value}`);
    }
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error(`Expected an HTTP(S) URL: ${value}`);
    }
    if (url.hash || url.pathname.endsWith("/")) {
      throw new Error(`Preload requires an exact file URL without a fragment or trailing slash: ${value}`);
    }
    if (value.length > 1024) {
      throw new Error(`URL exceeds Alibaba DCDN's 1,024-character limit: ${value}`);
    }
  }

  console.log(`Preloading ${urls.length} URL(s) in batches of up to ${MAX_URLS_PER_REQUEST}...`);
  for (let index = 0; index < urls.length; index += MAX_URLS_PER_REQUEST) {
    await preloadBatch(urls.slice(index, index + MAX_URLS_PER_REQUEST));
  }
} catch (error) {
  console.error(`DCDN preload failed: ${error.message}`);
  process.exitCode = 1;
}
