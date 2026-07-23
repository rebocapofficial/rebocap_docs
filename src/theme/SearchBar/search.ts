declare global {
  interface Window {
    PagefindUI?: new (opts: Record<string, unknown>) => void;
  }
}

let loaded = false;

async function ensurePagefind(): Promise<boolean> {
  if (typeof window !== "undefined" && window.PagefindUI) {
    loaded = true;
    return true;
  }

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
    script.onload = () => {
      const isOk = typeof window.PagefindUI === "function";
      loaded = isOk;
      resolve(isOk);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

let container: HTMLDivElement | null = null;
let backdrop: HTMLDivElement | null = null;

export async function openSearch(): Promise<void> {
  const isPagefindAvailable = await ensurePagefind();

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
      "background:var(--ifm-card-background-color, #fff);" +
      "color:var(--ifm-font-color-base, #1c1e21);" +
      "border-radius:12px;" +
      "box-shadow:0 8px 40px rgba(0,0,0,0.18);" +
      "padding:1.5rem;overflow-y:auto;";

    const target = document.createElement("div");
    target.id = "pagefind-search-target";
    container.appendChild(target);
    document.body.appendChild(container);

    if (isPagefindAvailable && window.PagefindUI) {
      new window.PagefindUI({
        element: "#pagefind-search-target",
        showImages: false,
        showSubResults: true,
        resetStyles: true,
      });
    } else {
      target.innerHTML = `
        <div style="padding: 0.5rem 0.25rem; line-height: 1.6;">
          <h4 style="margin: 0 0 0.5rem 0; color: #6366f1; display: flex; align-items: center; gap: 0.4rem;">
            💡 本地开发模式提示
          </h4>
          <p style="margin: 0 0 0.75rem 0; font-size: 0.9rem; opacity: 0.85;">
            传统 Pagefind 关键词静态索引需要在打包生成发布版本时自动构建（运行 <code>npm run build</code> 后生效）。
          </p>
          <div style="padding: 0.75rem 1rem; border-radius: 8px; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.25); font-size: 0.9rem;">
            ✨ <strong>请直接点击导航栏的【AI 智搜】按钮</strong>，即可实时体验基于 DeepSeek 大模型的智能文档问答！
          </div>
        </div>
      `;
    }
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
