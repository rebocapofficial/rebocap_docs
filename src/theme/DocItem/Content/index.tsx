import React from 'react';
import {useLocation} from '@docusaurus/router';
import Content from '@theme-original/DocItem/Content';
import AnnouncementPage from '@site/src/components/Announcements/AnnouncementPage';
import AnnouncementTicker from '@site/src/components/Announcements/AnnouncementTicker';

/**
 * 文档内容包装器，承担两件事：
 * 1. 文档首页（/docs/，含各语言前缀）顶部放公告条
 * 2. 公告总览页（/docs/announcements/）正文之后追加公告列表
 *
 * 为什么不直接在 MDX 里 import 组件：本仓库 `docusaurus.config.ts` 设了
 * `markdown.format: 'md'`，它对所有文件（包括 .mdx）生效，import 会被当成普通段落。
 */
export default function DocItemContent(props: any): JSX.Element {
  const {pathname} = useLocation();
  const isAnnouncementsPage = /\/docs\/announcements\/?$/.test(pathname);
  const isDocsHome = /\/docs\/?$/.test(pathname);

  return (
    <>
      {isDocsHome && !isAnnouncementsPage && <AnnouncementTicker />}
      <Content {...props} />
      {isAnnouncementsPage && <AnnouncementPage />}
    </>
  );
}
