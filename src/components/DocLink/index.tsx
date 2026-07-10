import React from 'react';
import Link from '@docusaurus/Link';

interface DocLinkProps {
  document: string;
  label: string;
  hash?: string;
}

export default function DocLink({ document, label, hash }: DocLinkProps) {
  let linkPath = document;
  
  // 处理 TinaCMS 保存的带有扩展名和目录的原始路径
  // 转换为 Docusaurus 的路由路径
  if (linkPath) {
    // 处理英文原版 (docs/)
    if (linkPath.startsWith('docs/')) {
      linkPath = '/' + linkPath.replace(/\.mdx?$/, '');
    } 
    // 处理多语言版 (i18n/语言/docusaurus-plugin-content-docs/current/...)
    else if (linkPath.includes('docusaurus-plugin-content-docs/current/')) {
      const parts = linkPath.split('docusaurus-plugin-content-docs/current/');
      if (parts.length > 1) {
        // 因为 Docusaurus 会根据当前语言环境自动处理跳转，通常基础路径仍为 /docs/
        linkPath = '/docs/' + parts[1].replace(/\.mdx?$/, '');
      }
    }
  }

  // 拼接锚点
  const finalTarget = `${linkPath}${hash ? (hash.startsWith('#') ? hash : `#${hash}`) : ''}`;

  return (
    <Link to={finalTarget}>
      {label}
    </Link>
  );
}