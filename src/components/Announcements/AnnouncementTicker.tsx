import React, {useEffect, useMemo, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {useAnnouncementData} from './useAnnouncements';

/**
 * 文档首页（文档导航）顶部的公告条：
 * 取排序最前的 5 条（数据已按置顶 + 发布时间倒序），一条一屏，
 * 显示日期 + 类型标签 + 标题，自动来回滚动（到底反向），悬停暂停。
 *
 * 底部进度条沿用 SteamVR 大页轮播（.html-carousel-progress-bar）的观感：
 * 3px、两端渐隐、主色填充。
 */

const MAX_ITEMS = 5;
const DWELL = 8000; // 每条停留时间（只作用于公告条，同时驱动进度条动画）

const Megaphone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m3 11 18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </svg>
);

export default function AnnouncementTicker(): JSX.Element | null {
  const data = useAnnouncementData();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // 暂停时冻结进度：记下剩余时间，恢复后继续走完这一段
  const remainingRef = useRef(DWELL);
  const deadlineRef = useRef(0);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const items = useMemo(() => {
    if (!data) return [];
    return data.items.slice(0, MAX_ITEMS);
  }, [data]);

  useEffect(() => {
    if (reducedMotion || items.length < 2) return undefined;

    if (paused) {
      if (deadlineRef.current) {
        remainingRef.current = Math.max(400, deadlineRef.current - Date.now());
      }
      return undefined;
    }

    deadlineRef.current = Date.now() + remainingRef.current;
    const timer = window.setTimeout(() => {
      remainingRef.current = DWELL;
      let next = index + direction;
      if (next > items.length - 1) {
        setDirection(-1);
        next = items.length - 2;
      } else if (next < 0) {
        setDirection(1);
        next = 1;
      }
      setIndex(next);
    }, remainingRef.current);

    return () => window.clearTimeout(timer);
  }, [index, direction, paused, reducedMotion, items.length]);

  if (!data || !items.length) return null;

  return (
    <aside
      className={`ann-ticker${paused ? ' is-paused' : ''}`}
      style={{'--ann-dwell': `${DWELL}ms`} as React.CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label={data.ui.pill}
    >
      <Link className="ann-ticker__link" to={data.pageHref}>
        <span className="ann-ticker__label">
          <Megaphone />
          {data.ui.pill}
        </span>

        <span className="ann-ticker__viewport">
          <span
            className={`ann-ticker__track${reducedMotion ? ' is-static' : ''}`}
            style={{transform: `translateY(-${index * 100}%)`}}
          >
            {items.map((item) => (
              <span className="ann-ticker__item" key={item.id}>
                <span className="ann-ticker__date">{item.publishAt.slice(0, 10)}</span>
                <span className={`ann-badge ann-badge--${item.type} ann-ticker__badge`}>
                  {data.ui[item.type]}
                </span>
                <span className="ann-ticker__title">{item.title}</span>
              </span>
            ))}
          </span>
        </span>

        <span className="ann-ticker__more" aria-hidden="true">
          →
        </span>
      </Link>

      {items.length > 1 && (
        <span className="ann-ticker__progress" key={index} aria-hidden="true" />
      )}
    </aside>
  );
}
