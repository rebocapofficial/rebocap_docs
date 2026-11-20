import type {VideoGuideData} from '@site/src/components/VideoGuide/types';
import {ueV3ByLocale} from '@site/src/data/video-guides/ue-v3';

/**
 * 视频教程注册表
 * ------------------------------------------------------------------
 * 页面里写 <div class="video-guide" data-video-guide="ue-v3"> 即可挂载；
 * 新增一个视频 = 新建 data 文件 + 在下面加一行。
 *
 * 数据按语言分：每条记录是一个 locale -> VideoGuideData 的映射，
 * 找不到对应语言时回退 en，再回退到第一个可用语言。
 */
export const videoGuides: Record<string, Record<string, VideoGuideData>> = {
  'ue-v3': ueV3ByLocale,
};

export function getVideoGuide(
  id: string | undefined | null,
  locale?: string,
): VideoGuideData | undefined {
  if (!id) return undefined;
  const entry = videoGuides[id];
  if (!entry) return undefined;
  if (locale && entry[locale]) return entry[locale];
  return entry.en ?? Object.values(entry)[0];
}
