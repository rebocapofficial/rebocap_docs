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
    // Keep the Docusaurus development server on its default-locale route.
    // A production build served locally should still exercise language detection.
    if (
      process.env.NODE_ENV === "development" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1")
    ) {
      return "/docs/";
    }

    const preferredLanguages = [
      ...(navigator.languages || []),
      navigator.language,
    ].filter((language): language is string => Boolean(language));
    const localeRoutes: Record<string, string> = {
      en: "/docs/",
      es: "/es/docs/",
      fr: "/fr/docs/",
      ja: "/ja/docs/",
      ko: "/ko/docs/",
      ru: "/ru/docs/",
    };

    for (const language of preferredLanguages) {
      const subtags = language.replace(/_/g, "-").toLowerCase().split("-");
      const [languageCode, ...regionAndScript] = subtags;

      if (languageCode === "zh") {
        const isTraditional = regionAndScript.some(
          (subtag) => subtag === "hant" || ["tw", "hk", "mo"].includes(subtag),
        );
        return isTraditional ? "/zh-Hant/docs/" : "/zh-Hans/docs/";
      }

      if (localeRoutes[languageCode]) {
        return localeRoutes[languageCode];
      }
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
