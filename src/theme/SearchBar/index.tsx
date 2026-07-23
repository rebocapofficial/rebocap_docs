import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import AiSearchModal from "@site/src/components/AiSearchModal";

// Locale-aware search label — Docusaurus does NOT inject locale into
// swizzled components, so we detect it from the URL path at render time.
function detectLocale(): string {
  const path = window.location.pathname;
  if (path.startsWith("/ja/")) return "ja";
  if (path.startsWith("/zh-Hans/")) return "zh-Hans";
  if (path.startsWith("/zh-Hant/")) return "zh-Hant";
  return "en";
}

const SEARCH_LABEL: Record<string, string> = {
  en: "Search",
  "zh-Hans": "搜索",
  ja: "検索",
  "zh-Hant": "搜尋",
};

const AI_SEARCH_LABEL: Record<string, string> = {
  en: "AI Search",
  "zh-Hans": "AI 搜索",
  ja: "AI 検索",
  "zh-Hant": "AI 搜尋",
};

const ARIA_SEARCH_LABEL: Record<string, string> = {
  en: "Search docs",
  "zh-Hans": "搜索文档",
  ja: "ドキュメントを検索",
  "zh-Hant": "搜尋文件",
};

function SearchButton(): React.ReactNode {
  const [locale, setLocale] = React.useState("en");
  const [isAiOpen, setIsAiOpen] = React.useState(false);

  React.useEffect(() => {
    setLocale(detectLocale());
  }, []);

  const handleClick = React.useCallback(() => {
    // Dynamic import to avoid hydration issues
    import("./search").then((m) => m.openSearch());
  }, []);

  // Register keyboard shortcut
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        import("./search").then((m) => m.openSearch());
      }
      if (e.key === "Escape") {
        import("./search").then((m) => m.closeSearch());
        setIsAiOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* AI Smart Search Button */}
      <button
        type="button"
        onClick={() => setIsAiOpen(true)}
        className="navbar__link clean-btn"
        style={{
          background: "none",
          border: "1px solid var(--ifm-color-emphasis-300)",
          borderRadius: "1.5rem",
          padding: "0.25rem 0.75rem",
          color: "var(--ifm-color-emphasis-600)",
          cursor: "pointer",
          fontSize: "0.875rem",
          marginRight: "0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          height: "2rem",
        }}
      >
        <span>{AI_SEARCH_LABEL[locale] || AI_SEARCH_LABEL.en}</span>
      </button>

      {/* Classic Pagefind Search Button */}
      <button
        type="button"
        onClick={handleClick}
        className="navbar__link clean-btn"
        aria-label={ARIA_SEARCH_LABEL[locale] || ARIA_SEARCH_LABEL.en}
        style={{
          background: "none",
          border: "1px solid var(--ifm-color-emphasis-300)",
          borderRadius: "1.5rem",
          padding: "0.25rem 0.75rem",
          color: "var(--ifm-color-emphasis-600)",
          cursor: "pointer",
          fontSize: "0.875rem",
          marginRight: "0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          height: "2rem",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span className="hide-on-mobile" style={{ marginRight: "0.5rem" }}>{SEARCH_LABEL[locale] || SEARCH_LABEL.en}</span>
        <kbd className="hide-on-mobile" style={{
          border: "1px solid var(--ifm-color-emphasis-400)",
          borderRadius: "3px", padding: "0 0.25rem",
          fontSize: "0.65rem", opacity: 0.5, lineHeight: "1.4",
        }}>/</kbd>
      </button>

      {/* AI Search Modal */}
      <AiSearchModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}

// SSR-safe fallback (renders empty div that matches client button wrapper)
function SearchBarFallback(): React.ReactNode {
  return <div style={{ display: "inline-flex", alignItems: "center", marginRight: "0.5rem" }} />;
}

export default function SearchBar(): React.ReactNode {
  return (
    <BrowserOnly fallback={<SearchBarFallback />}>
      {() => <SearchButton />}
    </BrowserOnly>
  );
}

