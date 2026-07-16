import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';

// ============================================================
//  Locale-aware UI strings for navbar, footer, and metadata.
//  Docusaurus sets DOCUSAURUS_CURRENT_LOCALE during build
//  (one build per locale).  Fallback to English.
// ============================================================
const locale = process.env.DOCUSAURUS_CURRENT_LOCALE || 'en';

const UI: Record<string, {
  title: string;
  tagline: string;
  onlineStore: string;
  forum: string;
  officialSite: string;
  copyright: (year: number) => string;
}> = {
  en: {
    title: 'Rebocap Documentation',
    tagline: 'Rebocap Product Documentation',
    onlineStore: 'Online Store',
    forum: 'Forum',
    officialSite: 'Official Site',
    copyright: (y) => `Copyright © ${y} rebocap official. Built with Docusaurus.`,
  },
  'zh-Hans': {
    title: 'Rebocap 文档',
    tagline: 'Rebocap 产品文档',
    onlineStore: '在线商店',
    forum: '论坛',
    officialSite: '官方网站',
    copyright: (y) => `Copyright © ${y} rebocap official. Built with Docusaurus.`,
  },
  ja: {
    title: 'Rebocap ドキュメント',
    tagline: 'Rebocap 製品ドキュメント',
    onlineStore: 'オンラインストア',
    forum: 'フォーラム',
    officialSite: '公式サイト',
    copyright: (y) => `Copyright © ${y} rebocap official. Built with Docusaurus.`,
  },
  'zh-Hant': {
    title: 'Rebocap 文件',
    tagline: 'Rebocap 產品文件',
    onlineStore: '線上商店',
    forum: '論壇',
    officialSite: '官方網站',
    copyright: (y) => `Copyright © ${y} rebocap official. Built with Docusaurus.`,
  },
};

const t = UI[locale] || UI.en;

const config: Config = {
  title: t.title,
  tagline: t.tagline,
  favicon: 'img/favicon.ico',
  url: 'https://doc.rebocap.com',
  baseUrl: '/',
  organizationName: 'rebocap',
  projectName: 'rebocap-doc',

  onBrokenLinks: 'ignore',
  onBrokenAnchors: 'ignore',

  // ============================================================
  //  Standard Docusaurus i18n.
  //  Locale-prefixed routes are handled automatically:
  //    /docs/           → English (default)
  //    /zh-Hans/docs/   → 简体中文
  //    /ja/docs/        → 日本語
  //    /zh-Hant/docs/   → 繁體中文
  // ============================================================
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans', 'ja', 'zh-Hant'],
    localeConfigs: {
      en: { label: 'English', direction: 'ltr' },
      'zh-Hans': { label: '简体中文', direction: 'ltr' },
      ja: { label: '日本語', direction: 'ltr' },
      'zh-Hant': { label: '繁體中文', direction: 'ltr' },
    },
  },

  markdown: {
    format: 'md',
    mermaid: true,
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          // Locale-aware sidebar — uses DOCUSAURUS_CURRENT_LOCALE
          // env var to select the right language at build time.
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/rebocapofficial/rebocap_docs/tree/main/',
          showLastUpdateTime: true,
          numberPrefixParser: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**', '/search/**'],
        },
      },
    ],
  ],

  plugins: [
    require.resolve('docusaurus-plugin-image-zoom'),
  ],

  themeConfig: {
    image: 'img/logo_w_white.svg',
    navbar: {
      logo: {
        alt: 'REBOCAP',
        src: 'img/logo_w_white.svg',
      },
      items: [
        {
          type: 'search',
          position: 'right',
        },
        // Built-in locale dropdown — auto-computes the same-page
        // URL in the selected language.
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          to: 'https://store.rebocap.site',
          label: t.onlineStore,
          position: 'right',
        },
        {
          to: 'https://forum.rebocap.site',
          label: t.forum,
          position: 'right',
        },
        {
          to: 'https://www.rebocap.com',
          label: t.officialSite,
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: t.copyright(new Date().getFullYear()),
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['csharp', 'cpp', 'python'],
    },
    zoom: {
      selector: '.markdown :not(em) > img:not(.zoomable-image-trigger)',
    },
  },
};

export default config;
