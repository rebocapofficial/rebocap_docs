import fs from 'node:fs';
import path from 'node:path';

/**
 * 公告数据插件
 *
 * - 数据源：仓库根目录 `announcements/<locale>.json`（运营直接改这里）
 * - 构建期按当前 locale 挑文件，缺项回退英文
 * - 过滤已过期条目，置顶优先、其余按发布时间倒序
 * - 通过 globalData 暴露给客户端组件，页面可以 SSG，不必运行时请求
 */

const FALLBACK = 'en';

function readLocaleFile(dir: string, locale: string): any {
  const file = path.join(dir, `${locale}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export default function announcementsPlugin(): any {
  return {
    name: 'announcements-plugin',

    async loadContent() {
      // 开发模式下 DOCUSAURUS_CURRENT_LOCALE 可能是字符串 "undefined"（未传 --locale 时）
      const raw = process.env.DOCUSAURUS_CURRENT_LOCALE;
      const locale = !raw || raw === 'undefined' || raw === 'null' ? FALLBACK : raw;
      const dir = path.join(__dirname, '../../announcements');

      const base = readLocaleFile(dir, FALLBACK);
      if (!base) throw new Error('[announcements] announcements/en.json is missing');

      let localized = base;
      if (locale !== FALLBACK) {
        const found = readLocaleFile(dir, locale);
        if (found) localized = found;
        else console.warn(`[announcements] ${locale}.json missing, falling back to en`);
      }

      const byId = new Map<string, any>((localized.items || []).map((item: any) => [item.id, item]));
      const now = Date.now();

      const items = (base.items || [])
        .map((item: any) => ({ ...item, ...(byId.get(item.id) || {}) }))
        .filter((item: any) => !item.expireAt || Date.parse(item.expireAt) > now)
        .sort((a: any, b: any) => {
          if (Boolean(a.pinned) !== Boolean(b.pinned)) return a.pinned ? -1 : 1;
          return Date.parse(b.publishAt) - Date.parse(a.publishAt);
        });

      return {
        locale,
        ui: { ...base.ui, ...(localized.ui || {}) },
        pageHref: locale === FALLBACK ? '/docs/announcements/' : `/${locale}/docs/announcements/`,
        items,
      };
    },

    async contentLoaded({ content, actions }: any) {
      actions.setGlobalData(content);
    },
  };
}
