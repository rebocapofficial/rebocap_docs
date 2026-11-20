import React from 'react';
import {createRoot, type Root} from 'react-dom/client';
import {getVideoGuide} from './registry';
import VideoGuideUI from './VideoGuideUI';

/**
 * VideoGuide 挂载器
 * ------------------------------------------------------------------
 * 扫描页面里的 [data-video-guide="<id>"]，按注册表取数据，把时间轴与
 * 步骤卡片以 React 根挂到该元素的末尾（video 标签保持不动，仍由
 * rehype 插件负责封面 / 按需加载 / 宽高比）。
 *
 * 无 JS 时：只剩原生 video，可正常播放 —— 渐进增强。
 */
const mounted = new Map<HTMLElement, Root>();

function scan(): void {
  // 页面切换后清理已脱离文档的实例
  mounted.forEach((root, el) => {
    if (!el.isConnected) {
      try {
        root.unmount();
      } catch {
        /* 忽略重复卸载 */
      }
      mounted.delete(el);
    }
  });

  document.querySelectorAll<HTMLElement>('[data-video-guide]').forEach((el) => {
    if (mounted.has(el)) return;
    // Docusaurus 会把当前语言写在 <html lang>：en / zh-Hans / zh-Hant / ja / es / fr / ko / ru
    const locale = document.documentElement.lang || 'en';
    const data = getVideoGuide(el.dataset.videoGuide, locale);
    if (!data) {
      // 数据没注册：静默降级，只控制台提示，不影响页面
      console.warn('[VideoGuide] 未找到数据，跳过：', el.dataset.videoGuide);
      return;
    }
    const host = document.createElement('div');
    host.className = 'vg-host';
    el.appendChild(host);
    el.classList.add('vg', 'is-ready');
    el.dataset.vgReady = 'true';

    const root = createRoot(host);
    root.render(<VideoGuideUI rootEl={el} data={data} locale={locale} />);
    mounted.set(el, root);
  });
}

export function installVideoGuides(): () => void {
  scan();
  const observer = new MutationObserver(() => scan());
  observer.observe(document.body, {childList: true, subtree: true});
  return () => {
    observer.disconnect();
    mounted.forEach((root) => {
      try {
        root.unmount();
      } catch {
        /* 忽略 */
      }
    });
    mounted.clear();
  };
}

export {getVideoGuide} from './registry';
export type {VideoGuideData, VideoGuideChapter, VideoGuideStep} from './types';
