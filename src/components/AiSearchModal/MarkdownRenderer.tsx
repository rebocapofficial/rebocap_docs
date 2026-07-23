import React from 'react';

export function parseMarkdown(text: string): React.ReactNode[] {
  if (!text) return [];

  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let listBuffer: { type: 'ul' | 'ol'; items: string[] } | null = null;

  const flushList = (keyPrefix: string) => {
    if (!listBuffer) return;
    const { type, items } = listBuffer;
    const ListTag = type === 'ul' ? 'ul' : 'ol';
    elements.push(
      <ListTag key={`${keyPrefix}-list`} style={{ paddingLeft: '1.4rem', margin: '0.4rem 0 0.8rem 0' }}>
        {items.map((item, idx) => (
          <li key={idx} style={{ marginBottom: '0.4rem' }}>
            {renderInlineMarkdown(item)}
          </li>
        ))}
      </ListTag>
    );
    listBuffer = null;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // 1. Ignore raw container HTML tags like <video...>, </video>, <div>, </div>, <br />
    if (trimmed.match(/^<\/?(video|div|p|br|details|summary)\b[^>]*\/?>$/i)) {
      return;
    }

    // 2. Check Video Source / HTML Video tag
    const videoSrcMatch = trimmed.match(/<source[^>]+src=["']([^"']+)["']/i) || trimmed.match(/<video[^>]+src=["']([^"']+)["']/i);
    if (videoSrcMatch) {
      flushList(`line-${index}`);
      const rawUrl = videoSrcMatch[1];
      const normalizedUrl = resolveImgUrl(rawUrl.replace(/(\.\.\/)+/g, ''));
      elements.push(
        <div key={index} style={{ margin: '0.8rem 0', textAlign: 'center' }}>
          <video
            controls
            loop
            preload="metadata"
            style={{
              maxWidth: '85%',
              maxHeight: '320px',
              borderRadius: '8px',
              border: '1px solid var(--ifm-color-emphasis-200, #e2e8f0)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              display: 'block',
              margin: '0 auto',
            }}
          >
            <source src={normalizedUrl} type="video/mp4" />
            您的浏览器不支持视频播放。
          </video>
          <span style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)', display: 'block', marginTop: '0.35rem' }}>
            🎬 视频演示
          </span>
        </div>
      );
      return;
    }

    // 3. Check Standalone Image line: ![alt](url)
    const standaloneImgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (standaloneImgMatch) {
      flushList(`line-${index}`);
      elements.push(
        <div key={index} style={{ margin: '0.75rem 0', textAlign: 'center' }}>
          <img
            src={resolveImgUrl(standaloneImgMatch[2])}
            alt={standaloneImgMatch[1] || '文档图示'}
            style={{
              maxWidth: '100%',
              maxHeight: '360px',
              borderRadius: '8px',
              border: '1px solid var(--ifm-color-emphasis-200, #e2e8f0)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              objectFit: 'contain',
              display: 'block',
              margin: '0 auto',
            }}
          />
          {standaloneImgMatch[1] && (
            <span style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)', display: 'block', marginTop: '0.35rem' }}>
              📷 {standaloneImgMatch[1]}
            </span>
          )}
        </div>
      );
      return;
    }

    // 4. Check Headings
    if (trimmed.startsWith('### ')) {
      flushList(`line-${index}`);
      elements.push(
        <h4 key={index} style={{ margin: '1.1rem 0 0.5rem 0', color: 'var(--ifm-color-primary, #6366f1)', fontSize: '1.05rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {renderInlineMarkdown(trimmed.slice(4))}
        </h4>
      );
      return;
    }
    if (trimmed.startsWith('## ')) {
      flushList(`line-${index}`);
      elements.push(
        <h3 key={index} style={{ margin: '1.3rem 0 0.6rem 0', color: 'var(--ifm-color-primary, #6366f1)', fontSize: '1.15rem', fontWeight: 700, borderBottom: '1px solid var(--ifm-color-emphasis-200)', paddingBottom: '0.3rem' }}>
          {renderInlineMarkdown(trimmed.slice(2))}
        </h3>
      );
      return;
    }
    if (trimmed.startsWith('# ')) {
      flushList(`line-${index}`);
      elements.push(
        <h2 key={index} style={{ margin: '1.5rem 0 0.75rem 0', color: 'var(--ifm-color-primary, #6366f1)', fontSize: '1.25rem', fontWeight: 700 }}>
          {renderInlineMarkdown(trimmed.slice(2))}
        </h2>
      );
      return;
    }

    // 5. Check Unordered List (* or -)
    const ulMatch = line.match(/^(\s*)[*-]\s+(.+)/);
    if (ulMatch) {
      const content = ulMatch[2];
      if (!listBuffer || listBuffer.type !== 'ul') {
        flushList(`line-${index}`);
        listBuffer = { type: 'ul', items: [] };
      }
      listBuffer.items.push(content);
      return;
    }

    // 6. Check Ordered List (1. 2.)
    const olMatch = line.match(/^(\s*)\d+\.\s+(.+)/);
    if (olMatch) {
      const content = olMatch[2];
      if (!listBuffer || listBuffer.type !== 'ol') {
        flushList(`line-${index}`);
        listBuffer = { type: 'ol', items: [] };
      }
      listBuffer.items.push(content);
      return;
    }

    // 7. Check Blockquote (> text)
    if (trimmed.startsWith('> ')) {
      flushList(`line-${index}`);
      elements.push(
        <blockquote
          key={index}
          style={{
            margin: '0.6rem 0',
            padding: '0.6rem 1rem',
            borderLeft: '4px solid #6366f1',
            background: 'rgba(99, 102, 241, 0.08)',
            borderRadius: '0 8px 8px 0',
            fontSize: '0.9rem',
          }}
        >
          {renderInlineMarkdown(trimmed.slice(2))}
        </blockquote>
      );
      return;
    }

    // 8. Normal text paragraph or empty line
    flushList(`line-${index}`);
    if (trimmed.length > 0) {
      elements.push(
        <p key={index} style={{ margin: '0 0 0.65rem 0', lineHeight: '1.7' }}>
          {renderInlineMarkdown(trimmed)}
        </p>
      );
    }
  });

  flushList('final');
  return elements;
}

function resolveImgUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) return url;
  return `/${url.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '')}`;
}

function renderInlineMarkdown(text: string): React.ReactNode[] {
  // Clean raw HTML inline tags like <strong...>, <span>, <div>, <br> before rendering
  let cleanText = text
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<span[^>]*>(.*?)<\/span>/gi, '$1')
    .replace(/<a\s+id=["'][^"']+["']\s*><\/a>/gi, '')
    .replace(/<br\s*\/?>/gi, ' ');

  const tokens = cleanText.split(/(!\[.*?\]\(.*?\)|`.*?`|\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
  return tokens.map((part, i) => {
    // Inline Image
    const imgMatch = part.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      return (
        <img
          key={i}
          src={resolveImgUrl(imgMatch[2])}
          alt={imgMatch[1] || '图示'}
          style={{
            maxHeight: '180px',
            maxWidth: '100%',
            borderRadius: '6px',
            verticalAlign: 'middle',
            margin: '0.25rem 0.4rem',
            border: '1px solid #e2e8f0',
          }}
        />
      );
    }
    // Bold
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return <strong key={i} style={{ fontWeight: 650 }}>{part.slice(2, -2)}</strong>;
    }
    // Code
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={i}
          style={{
            background: 'rgba(99, 102, 241, 0.12)',
            color: '#6366f1',
            padding: '0.15rem 0.4rem',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '0.88em',
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    // Link
    const linkMatch = part.match(/^\[(.+?)\]\((.+?)\)$/);
    if (linkMatch) {
      return (
        <a key={i} href={linkMatch[2]} target="_blank" rel="noreferrer" style={{ color: '#6366f1', textDecoration: 'underline', fontWeight: 500 }}>
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

export default function MarkdownRenderer({ content }: { content: string }): React.ReactNode {
  return <div>{parseMarkdown(content)}</div>;
}
