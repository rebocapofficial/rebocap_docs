import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {useAnnouncementData} from './useAnnouncements';
import {
  cardShownThisSession,
  isDismissedToday,
  markCardShown,
  readReadIds,
} from './storage';
import type {Announcement} from './types';

/** 首屏稳定后再出现，别跟 LCP 抢资源 */
const SHOW_DELAY = 800;
/** 出现后多久自动收成胶囊 */
const CARD_TIMEOUT = 12000;

const Megaphone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m3 11 18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </svg>
);

const Close = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/**
 * 挂在 Root 里；SSR 阶段不渲染任何东西（避免读 localStorage 造成 hydration mismatch）
 */
export default function AnnouncementRoot(): JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <AnnouncementLayer />;
}

function AnnouncementLayer(): JSX.Element | null {
  const data = useAnnouncementData();
  const [phase, setPhase] = useState<'hidden' | 'card' | 'pill'>('hidden');
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  const unread: Announcement[] = useMemo(() => {
    if (!data) return [];
    const read = new Set(readReadIds());
    return (data.items ?? []).filter((item) => !item.backfill && !read.has(item.id));
  }, [data]);

  const stopTimer = useCallback(() => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timer.current = window.setTimeout(() => setPhase('pill'), CARD_TIMEOUT);
  }, [stopTimer]);

  // 只有「不在公告页 + 有未读 + 今天没点过不再提示 + 本次会话没出现过」才出现
  useEffect(() => {
    if (!data || !unread.length) return;
    const normalized = (path: string) => path.replace(/\/+$/, '');
    if (normalized(window.location.pathname) === normalized(data.pageHref)) return;
    if (isDismissedToday() || cardShownThisSession()) return;

    const show = window.setTimeout(() => {
      markCardShown();
      setPhase('card');
    }, SHOW_DELAY);
    return () => window.clearTimeout(show);
  }, [data, unread.length]);

  useEffect(() => {
    if (phase !== 'card') return undefined;
    startTimer();
    return stopTimer;
  }, [phase, index, startTimer, stopTimer]);

  if (!data || !unread.length) return null;

  const item = unread[Math.min(index, unread.length - 1)];

  return (
    <>
      {phase === 'card' && (
        <aside
          className="ann-card"
          aria-label={data.ui.pill}
          onMouseEnter={stopTimer}
          onMouseLeave={() => startTimer()}
        >
          <span className="ann-card__accent" aria-hidden="true" />

          <div className="ann-card__meta">
            <span className="ann-card__date">{item.publishAt.slice(0, 10)}</span>
            <span className={`ann-badge ann-badge--${item.type}`}>{data.ui[item.type]}</span>
            <span className="ann-new">NEW</span>
          </div>

          <h3 className="ann-card__title">
            {/* 拉伸链接：点卡片任意位置都进公告页，但 ✕ 和分页点仍然可点 */}
            <Link className="ann-card__link" to={data.pageHref}>
              {item.title}
            </Link>
          </h3>
          <p className="ann-card__sum">{item.summary}</p>

          <div className="ann-card__foot">
            {unread.length > 1 && (
              <div className="ann-card__dots">
                {unread.map((it, i) => (
                  <button
                    key={it.id}
                    type="button"
                    className={`ann-card__dot${i === index ? ' is-active' : ''}`}
                    aria-label={`${i + 1} / ${unread.length}`}
                    aria-current={i === index}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setIndex(i);
                    }}
                  />
                ))}
              </div>
            )}
            <span className="ann-card__go">
              {data.ui.details}
              <Arrow />
            </span>
          </div>

          <button
            type="button"
            className="ann-card__close"
            aria-label={data.ui.close}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setPhase('pill');
            }}
          >
            <Close />
          </button>

          <span className="ann-card__progress" aria-hidden="true" />
        </aside>
      )}

      {phase === 'pill' && (
        <button type="button" className="ann-pill" onClick={() => setPhase('card')}>
          <span className="ann-pill__icon" aria-hidden="true">
            <Megaphone />
          </span>
          <span>{data.ui.pill}</span>
          <span className="ann-pill__num">{unread.length}</span>
        </button>
      )}
    </>
  );
}
