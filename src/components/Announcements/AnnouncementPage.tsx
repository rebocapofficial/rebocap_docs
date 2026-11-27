import React, {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import {useAnnouncementData} from './useAnnouncements';
import {markRead} from './storage';
import type {Announcement, AnnouncementType} from './types';

type Filter = 'all' | AnnouncementType;

const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/** 日期是主信息，统一用 ISO 日期（2026-11-28），不用序号 */
const dateLabel = (iso: string): string => iso.slice(0, 10);

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/**
 * 公告总览：作为 /docs/announcements/ 的正文渲染，构建期就是静态 HTML（可被搜索、可分享）
 */
export default function AnnouncementPage(): JSX.Element | null {
  const data = useAnnouncementData();
  const [filter, setFilter] = useState<Filter>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const items: Announcement[] = data?.items ?? [];

  // 进到公告页就把当前列表标记为已读；支持 #ann-<id> 深链
  useEffect(() => {
    if (!items.length) return;
    markRead(items.map((item) => item.id));

    const hash = decodeURIComponent(window.location.hash.replace(/^#ann-/, ''));
    if (hash && items.some((item) => item.id === hash)) {
      setOpenId(hash);
    }
  }, [items]);

  if (!data) return null;

  const visible = filter === 'all' ? items : items.filter((item) => item.type === filter);

  const groups = new Map<string, Announcement[]>();
  visible.forEach((item) => {
    const key = item.publishAt.slice(0, 7);
    const bucket = groups.get(key);
    if (bucket) bucket.push(item);
    else groups.set(key, [item]);
  });

  const counts: Record<Filter, number> = {
    all: items.length,
    version: items.filter((item) => item.type === 'version').length,
    notice: items.filter((item) => item.type === 'notice').length,
    maintenance: items.filter((item) => item.type === 'maintenance').length,
    event: items.filter((item) => item.type === 'event').length,
  };

  const filters: Filter[] = ['all', 'version', 'notice', 'maintenance', 'event'];

  const monthLabel = (key: string): string => {
    const [year, month] = key.split('-');
    return data.ui.monthFormat.replace('{y}', year).replace('{m}', String(Number(month)));
  };

  return (
    <div className="ann-page">
      <div className="ann-chips" role="tablist" aria-label={data.ui.pill}>
        {filters
          .filter((key) => key === 'all' || counts[key] > 0)
          .map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              className="ann-chip"
              onClick={() => setFilter(key)}
            >
              {data.ui[key]}
              <span className="ann-chip__num">{counts[key]}</span>
            </button>
          ))}
      </div>

      {visible.length === 0 && <p className="ann-empty">{data.ui.empty}</p>}

      {Array.from(groups.entries()).map(([monthKey, group]) => (
        <section key={monthKey} className="ann-group">
          <h2 className="ann-month">{monthLabel(monthKey)}</h2>

          {group.map((item) => {
            const open = openId === item.id;
            return (
              <article key={item.id} id={`ann-${item.id}`} className={`ann-item${open ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="ann-item__head"
                  aria-expanded={open}
                  aria-controls={`ann-body-${item.id}`}
                  onClick={() => setOpenId(open ? null : item.id)}
                >
                  <span className="ann-item__date">{dateLabel(item.publishAt)}</span>

                  <span className="ann-item__main">
                    <span className="ann-item__meta">
                      <span className="ann-item__inline-date">{dateLabel(item.publishAt)}</span>
                      <span className={`ann-badge ann-badge--${item.type}`}>{data.ui[item.type]}</span>
                    </span>
                    <span className="ann-item__title">{item.title}</span>
                    <span className="ann-item__sum">{item.summary}</span>
                  </span>

                  <span className="ann-item__chev" aria-hidden="true">
                    <Chevron />
                  </span>
                </button>

                {open && (
                  <div className="ann-item__body" id={`ann-body-${item.id}`}>
                    <ul>
                      {item.body.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                    <Link className="ann-item__go" to={item.link.href}>
                      {item.link.label}
                      <Arrow />
                    </Link>
                  </div>
                )}
              </article>
            );
          })}
        </section>
      ))}
    </div>
  );
}
