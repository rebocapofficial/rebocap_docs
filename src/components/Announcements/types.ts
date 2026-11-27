export type AnnouncementType = 'version' | 'notice' | 'maintenance' | 'event';
export type AnnouncementLevel = 'normal' | 'important' | 'critical';

export interface AnnouncementLink {
  label: string;
  href: string;
}

export interface Announcement {
  id: string;
  type: AnnouncementType;
  level: AnnouncementLevel;
  /** 补录的历史条目：进列表，但不计入未读红点、不触发浮卡 */
  backfill?: boolean;
  pinned?: boolean;
  publishAt: string;
  expireAt?: string | null;
  title: string;
  summary: string;
  body: string[];
  link: AnnouncementLink;
}

export interface AnnouncementUi {
  all: string;
  version: string;
  notice: string;
  maintenance: string;
  event: string;
  empty: string;
  close: string;
  details: string;
  pill: string;
  /** 月份标题模板，例如 "{y} 年 {m} 月"，避免用 Intl 造成 SSR/CSR 不一致 */
  monthFormat: string;
}

export interface AnnouncementData {
  locale: string;
  ui: AnnouncementUi;
  pageHref: string;
  items: Announcement[];
}

/** 徽章配色：走 Infima 变量，暗色模式自动适配 */
export const TYPE_VAR: Record<AnnouncementType, string> = {
  version: '--ann-color-version',
  notice: '--ann-color-notice',
  maintenance: '--ann-color-maintenance',
  event: '--ann-color-event',
};
