/**
 * 公告状态的本地存储：只用 localStorage + sessionStorage。
 * 不发请求、不设 cookie、不含任何用户标识。
 */

const KEY_READ = 'rebocap.announce.read';
const KEY_DISMISS = 'rebocap.announce.dismissDate';
const KEY_SESSION = 'rebocap.announce.cardShown';

const hasWindow = () => typeof window !== 'undefined';

/** 已读 id 列表（最多保留最近 200 条，避免无限膨胀） */
export function readReadIds(): string[] {
  if (!hasWindow()) return [];
  try {
    const raw = window.localStorage.getItem(KEY_READ);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function markRead(ids: string[]): void {
  if (!hasWindow() || !ids.length) return;
  try {
    const next = Array.from(new Set([...readReadIds(), ...ids])).slice(-200);
    window.localStorage.setItem(KEY_READ, JSON.stringify(next));
  } catch {
    /* 无痕模式 / 被企业策略禁用：静默降级 */
  }
}

/** 以北京时间划分「今天」，避免用户时区导致「今日不再提示」错位 */
export function todayKey(): string {
  return new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10);
}

export function isDismissedToday(): boolean {
  if (!hasWindow()) return false;
  try {
    return window.localStorage.getItem(KEY_DISMISS) === todayKey();
  } catch {
    return false;
  }
}

export function dismissToday(): void {
  if (!hasWindow()) return;
  try {
    window.localStorage.setItem(KEY_DISMISS, todayKey());
  } catch {
    /* ignore */
  }
}

/** 本次会话是否已经提示过（刷新不重复弹，关标签页即清） */
export function cardShownThisSession(): boolean {
  if (!hasWindow()) return false;
  try {
    return window.sessionStorage.getItem(KEY_SESSION) === '1';
  } catch {
    return false;
  }
}

export function markCardShown(): void {
  if (!hasWindow()) return;
  try {
    window.sessionStorage.setItem(KEY_SESSION, '1');
  } catch {
    /* ignore */
  }
}
