declare global {
  interface Window {
    PagefindUI?: new (opts: Record<string, unknown>) => void;
  }
}

let loaded = false;

async function ensurePagefind(): Promise<void> {
  if (loaded) return;
  if (window.PagefindUI) { loaded = true; return; }

  return new Promise((resolve) => {
    if (!document.querySelector('link[href*="pagefind-ui"]')) {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "/pagefind/pagefind-ui.css";
      document.head.appendChild(css);
    }
    const script = document.createElement("script");
    script.src = "/pagefind/pagefind-ui.js";
    script.async = true;
    script.onload = () => { loaded = true; resolve(); };
    document.head.appendChild(script);
  });
}

let container: HTMLDivElement | null = null;
let backdrop: HTMLDivElement | null = null;

export async function openSearch(): Promise<void> {
  await ensurePagefind();

  if (!container) {
    // Thin dark backdrop (click to close)
    backdrop = document.createElement("div");
    backdrop.id = "pagefind-backdrop";
    backdrop.style.cssText =
      "display:none;position:fixed;inset:0;z-index:1000;" +
      "background:rgba(0,0,0,0.2);";
    backdrop.addEventListener("click", closeSearch);
    document.body.appendChild(backdrop);

    // Floating panel
    container = document.createElement("div");
    container.id = "pagefind-search-panel";
    container.style.cssText =
      "display:none;position:fixed;top:4rem;left:50%;" +
      "transform:translateX(-50%);z-index:1001;" +
      "width:min(680px,92vw);max-height:70vh;" +
      "background:#fff;border-radius:12px;" +
      "box-shadow:0 8px 40px rgba(0,0,0,0.18);" +
      "padding:1.5rem;overflow-y:auto;";

    const target = document.createElement("div");
    target.id = "pagefind-search-target";
    container.appendChild(target);
    document.body.appendChild(container);

    new window.PagefindUI!({
      element: "#pagefind-search-target",
      showImages: false,
      showSubResults: true,
      resetStyles: true,
    });
  }

  backdrop!.style.display = "block";
  container.style.display = "block";
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    const input = container?.querySelector("input");
    input?.focus();
  }, 150);
}

export function closeSearch(): void {
  if (backdrop) backdrop.style.display = "none";
  if (container) container.style.display = "none";
  document.body.style.overflow = "";
}
