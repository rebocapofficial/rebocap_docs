import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

const LOADING_TEXT: Record<string, string> = {
  en: "Loading...",
  "zh-Hans": "加载中...",
  ja: "読み込み中...",
  "zh-Hant": "載入中...",
};

function detectLanguagePath(): string {
  try {
    const lang = navigator.language || "en";
    if (lang.startsWith("ja")) return "/ja/docs/";
    if (lang.startsWith("zh")) {
      if (lang.includes("TW") || lang.includes("HK") || lang.includes("Hant")) {
        return "/zh-Hant/docs/";
      }
      return "/zh-Hans/docs/";
    }
    return "/docs/";
  } catch {
    return "/docs/";
  }
}

function RedirectHandler(): JSX.Element {
  React.useEffect(() => {
    window.location.replace(detectLanguagePath());
  }, []);
  return null;
}

export default function Home(): JSX.Element {
  return (
    <BrowserOnly fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>{LOADING_TEXT.en}</div>}>
      {() => <RedirectHandler />}
    </BrowserOnly>
  );
}
