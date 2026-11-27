import useGlobalData from '@docusaurus/useGlobalData';
import type {AnnouncementData} from './types';

/**
 * 读取构建期注入的公告数据（按当前 locale 已解析好）。
 *
 * Docusaurus 会把插件的 globalData 包一层 `default`（和内置 docs 插件一致），
 * 这里两种形状都兼容，避免升级后静默取到 undefined。
 */
export function useAnnouncementData(): AnnouncementData | null {
  const globalData = useGlobalData() as Record<string, any>;
  const entry = globalData['announcements-plugin'];
  const data = entry?.default ?? entry;
  if (!data || !Array.isArray(data.items)) return null;
  return data as AnnouncementData;
}
