/**
 * VideoGuide 数据契约
 * ------------------------------------------------------------------
 * 一个视频 = 一份数据：章节（大时间轴色块）+ 步骤（随动图文卡片）。
 * 单位统一为「秒」，与 <video>.currentTime 一致。
 * 数据只描述内容与时间，不描述样式；样式见 video-guide.css。
 */

export type VideoGuideChapter = {
  /** 稳定 id，用于步骤引用与 DOM 标记 */
  id: string;
  /** 时间轴上显示的章节名，尽量 4–8 个字 */
  title: string;
  /** 起止秒数，左闭右开 */
  start: number;
  end: number;
};

export type VideoGuideStep = {
  /** 步骤 id，建议 01、02… 便于对照图文 */
  id: string;
  /** 所属章节；留空表示不属于任何章节 */
  chapterId?: string;
  start: number;
  end: number;
  /** 卡片标题 */
  title: string;
  /** 卡片配图，站点绝对路径（/img/...） */
  image?: string;
  /** 卡片正文，允许 `code` 与 **加粗** 这类行内语法由上游自行处理成字符串 */
  text?: string;
};

export type VideoGuideData = {
  /** 可选：模块标题，暂未在 UI 中展示 */
  title?: string;
  chapters: VideoGuideChapter[];
  steps: VideoGuideStep[];
  options?: {
    /**
     * below：卡片在视频下方（默认）
     * side：桌面端卡片在右侧（预留，MVP 未实现）
     */
    layout?: 'below' | 'side';
    /** true：全部步骤都渲染，仅高亮当前步；false：只渲染当前步 */
    showAllSteps?: boolean;
  };
};
