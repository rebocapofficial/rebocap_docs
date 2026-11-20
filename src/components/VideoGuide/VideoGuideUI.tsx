import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {loadVideo} from '@site/src/components/onDemandVideo';
import type {VideoGuideChapter, VideoGuideData, VideoGuideStep} from './types';

type Props = {
  /** 页面里的 [data-video-guide] 宿主（.vg），video 在里面 */
  rootEl: HTMLElement;
  data: VideoGuideData;
  /** 当前站点语言（html[lang]）：用于界面文案（aria-label / 跳转按钮） */
  locale?: string;
};

type Labels = {
  progress: string;
  jumpTo: (t: string) => string;
  reconnecting: string;
  netFailed: string;
};

const LABELS: Record<string, Labels> = {
  'zh-Hans': {
    progress: '视频进度',
    jumpTo: (t) => `跳到 ${t}`,
    reconnecting: '正在重新连接…',
    netFailed: '网络中断，点视频上的播放键重试',
  },
  'zh-Hant': {
    progress: '影片進度',
    jumpTo: (t) => `跳至 ${t}`,
    reconnecting: '正在重新連線…',
    netFailed: '網路中斷，請點影片上的播放鍵重試',
  },
  en: {
    progress: 'Video progress',
    jumpTo: (t) => `Jump to ${t}`,
    reconnecting: 'Reconnecting…',
    netFailed: 'Connection lost — press play on the video to retry',
  },
  ja: {
    progress: '動画の再生位置',
    jumpTo: (t) => `${t} へ移動`,
    reconnecting: '再接続中…',
    netFailed: '通信が切れました。動画の再生ボタンで再試行してください',
  },
  es: {
    progress: 'Progreso del vídeo',
    jumpTo: (t) => `Ir a ${t}`,
    reconnecting: 'Reconectando…',
    netFailed: 'Se perdió la conexión: pulsa reproducir en el vídeo para reintentar',
  },
  fr: {
    progress: 'Progression de la vidéo',
    jumpTo: (t) => `Aller à ${t}`,
    reconnecting: 'Reconnexion…',
    netFailed: 'Connexion perdue — appuyez sur lecture dans la vidéo pour réessayer',
  },
  ko: {
    progress: '영상 재생 위치',
    jumpTo: (t) => `${t}(으)로 이동`,
    reconnecting: '다시 연결 중…',
    netFailed: '연결이 끊겼습니다. 영상의 재생 버튼으로 다시 시도하세요',
  },
  ru: {
    progress: 'Ход видео',
    jumpTo: (t) => `Перейти к ${t}`,
    reconnecting: 'Переподключение…',
    netFailed: 'Связь прервана — нажмите воспроизведение на видео, чтобы повторить',
  },
};

const SEEK_STEP = 5; // 键盘左右键步长（秒）

function fmt(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

function findIndexByTime<T extends {start: number; end: number}>(list: T[], t: number): number {
  for (let i = 0; i < list.length; i += 1) {
    if (t >= list[i].start && t < list[i].end) return i;
  }
  // 落在空隙里：沿用上一段，避免卡片闪空
  let last = -1;
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].start <= t) last = i;
  }
  return last;
}

export default function VideoGuideUI({rootEl, data, locale}: Props): JSX.Element {
  const labels = LABELS[locale ?? 'en'] ?? LABELS.en;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const wasPlayingRef = useRef(false);
  const movedRef = useRef(false);
  const startXRef = useRef(0);
  const draggingRef = useRef(false);
  const pendingSeekRef = useRef<number | null>(null);
  /** 最后一段正常播放到的位置：网络中断重连后从这里续播 */
  const lastGoodTimeRef = useRef(0);
  /** 用户是否希望继续播放（断线重连后据此恢复） */
  const wantPlayRef = useRef(false);
  const recoverCountRef = useRef(0);
  /** 由绑定 effect 注入，供 seekTo 在媒体已报错时触发重连 */
  const recoverRef = useRef<(target: number, autoplay: boolean) => void>(() => {});

  const fallbackDuration = data.chapters.length
    ? data.chapters[data.chapters.length - 1].end
    : data.steps.length
      ? data.steps[data.steps.length - 1].end
      : 0;

  const [duration, setDuration] = useState(fallbackDuration);
  const [time, setTime] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState(0);
  const [netState, setNetState] = useState<'ok' | 'recovering' | 'failed'>('ok');

  /* ---------------- 视频绑定 ---------------- */
  useEffect(() => {
    const video = rootEl.querySelector('video');
    if (!video) return undefined;
    videoRef.current = video;
    video.classList.add('vg-video');

    const markActive = () => {
      const pending = pendingSeekRef.current;
      if (pending !== null && Math.abs(video.currentTime - pending) > 1) return;
      if (pending !== null) pendingSeekRef.current = null;
      const d = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : fallbackDuration;
      setDuration(d);
      const t = video.currentTime;
      if (!video.error) lastGoodTimeRef.current = t;
      setTime(t);
      const ci = findIndexByTime(data.chapters, t);
      const si = findIndexByTime(data.steps, t);
      if (ci >= 0) setActiveChapter((prev) => (prev === ci ? prev : ci));
      if (si >= 0) setActiveStep((prev) => (prev === si ? prev : si));
    };

    const onPlay = () => {
      wantPlayRef.current = true;
      setPlaying(true);
      rootEl.classList.add('is-playing');
    };
    const onPause = () => {
      // 拖动时间轴时的暂停是临时的，不算用户“想暂停”
      if (!draggingRef.current) wantPlayRef.current = false;
      setPlaying(false);
      rootEl.classList.remove('is-playing');
    };
    const onPlaying = () => {
      recoverCountRef.current = 0;
      setNetState('ok');
    };
    const onMeta = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) setDuration(video.duration);
      markActive();
    };

    /**
     * 网络视频（Range 请求）偶发中断时，媒体元素会报 MEDIA_ERR_NETWORK 并掉回 0 秒。
     * 这里重新挂一次源、回到原位续播，最多重试 3 次，仍失败则提示用户手动重试。
     */
    const recover = (target: number, autoplay: boolean) => {
      if (!video.error) return;
      if (recoverCountRef.current >= 3) {
        setNetState('failed');
        return;
      }
      recoverCountRef.current += 1;
      setNetState('recovering');
      const resume = Math.max(0, Number.isFinite(target) ? target : 0);
      const onReady = () => {
        try {
          video.currentTime = resume;
        } catch {
          /* 忽略：下一轮 loadedmetadata 还会再试 */
        }
        if (autoplay) video.play().catch(() => {});
        setNetState('ok');
      };
      video.addEventListener('loadedmetadata', onReady, {once: true});
      // 强制重新加载：loadVideo 只在首次生效，这里先清标记再走同一套逻辑
      delete video.dataset.videoLoaded;
      loadVideo(video);
    };
    recoverRef.current = recover;

    const onError = () => {
      if (!video.error) return;
      recover(pendingSeekRef.current ?? lastGoodTimeRef.current, wantPlayRef.current);
    };

    /** 重试次数用尽后，点视频或播放键再给一次机会 */
    const onVideoClick = () => {
      if (!video.error) return;
      recoverCountRef.current = 0;
      recover(lastGoodTimeRef.current, true);
    };

    video.addEventListener('timeupdate', markActive);
    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('durationchange', onMeta);
    video.addEventListener('play', onPlay);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('pause', onPause);
    video.addEventListener('error', onError);
    video.addEventListener('click', onVideoClick);
    markActive();

    return () => {
      video.removeEventListener('timeupdate', markActive);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('durationchange', onMeta);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('error', onError);
      video.removeEventListener('click', onVideoClick);
      recoverRef.current = () => {};
    };
  }, [rootEl, data, fallbackDuration]);

  /* ---------------- 状态类 ---------------- */
  useEffect(() => {
    rootEl.classList.toggle('is-dragging', dragging);
    rootEl.classList.toggle('is-playing', playing);
  }, [rootEl, dragging, playing]);

  /* ---------------- 外观：固定刻度风格 ---------------- */
  useEffect(() => {
    rootEl.classList.add('vg--skin-b');
    rootEl.classList.remove('vg--skin-a', 'vg--skin-c');
    delete rootEl.dataset.vgSkin;
    delete rootEl.dataset.vgSkinTest;
  }, [rootEl]);

  /* ---------------- 跳转 ---------------- */
  const seekTo = useCallback(
    (target: number) => {
      const video = videoRef.current;
      if (!video) return;
      // 媒体已因网络错误停住：先重连再定位，否则 currentTime 赋值会被忽略
      if (video.error) {
        recoverRef.current(target, true);
        return;
      }
      loadVideo(video);
      pendingSeekRef.current = target;
      const apply = () => {
        const max = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : duration;
        const next = Math.max(0, Math.min(target, Math.max(0, max - 0.1)));
        try {
          video.currentTime = next;
        } catch {
          /* 元数据未就绪时忽略，loadedmetadata 后会有一次 markActive */
        }
        setTime(next);
      };
      if (video.readyState >= 1) apply();
      else video.addEventListener('loadedmetadata', apply, {once: true});
      video.addEventListener(
        'seeked',
        () => {
          pendingSeekRef.current = null;
        },
        {once: true},
      );
    },
    [duration],
  );

  const ratioFromEvent = useCallback((clientX: number) => {
    const el = timelineRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return 0;
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  }, []);

  const beginDrag = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const video = videoRef.current;
      if (!video) return;
      loadVideo(video);
      wasPlayingRef.current = !video.paused;
      movedRef.current = false;
      startXRef.current = e.clientX;
      video.pause();
      draggingRef.current = true;
      setDragging(true);
      const r = ratioFromEvent(e.clientX);
      setPreview(r * duration);
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [duration, ratioFromEvent],
  );

  const moveDrag = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      if (Math.abs(e.clientX - startXRef.current) > 4) movedRef.current = true;
      setPreview(ratioFromEvent(e.clientX) * duration);
    },
    [dragging, duration, ratioFromEvent],
  );

  const endDrag = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      // 点击与拖动都按秒自由定位，不再吸附到段落
      const target = ratioFromEvent(e.clientX) * duration;
      setDragging(false);
      setTime(target);
      const ci = findIndexByTime(data.chapters, target);
      const si2 = findIndexByTime(data.steps, target);
      if (ci >= 0) setActiveChapter(ci);
      if (si2 >= 0) setActiveStep(si2);
      seekTo(target);
      if (wasPlayingRef.current) {
        const video = videoRef.current;
        window.setTimeout(() => video?.play().catch(() => {}), 60);
      }
    },
    [dragging, duration, ratioFromEvent, seekTo],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const video = videoRef.current;
      if (!video) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        seekTo(video.currentTime - SEEK_STEP);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        seekTo(video.currentTime + SEEK_STEP);
      } else if (e.key === 'Home') {
        e.preventDefault();
        seekTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        seekTo(duration);
      } else if (e.key === ' ') {
        e.preventDefault();
        if (video.paused) video.play().catch(() => {});
        else video.pause();
      }
    },
    [duration, seekTo],
  );

  /* ---------------- 渲染 ---------------- */
  const safeDuration = duration > 0 ? duration : 1;
  const posPct = Math.max(0, Math.min(100, (time / safeDuration) * 100));
  const previewPct = Math.max(0, Math.min(100, (preview / safeDuration) * 100));

  const chapter: VideoGuideChapter | undefined = data.chapters[activeChapter];
  const step: VideoGuideStep | undefined = data.steps[activeStep];

  const timelineStyle = useMemo(
    () => ({['--pos' as string]: `${dragging ? previewPct : posPct}%`}) as React.CSSProperties,
    [dragging, previewPct, posPct],
  );

  return (
    <>
      <div
        ref={timelineRef}
        className="vg-timeline"
        role="slider"
        tabIndex={0}
        aria-label={labels.progress}
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(dragging ? preview : time)}
        aria-valuetext={`${chapter ? chapter.title : ''} ${fmt(dragging ? preview : time)}`}
        onPointerDown={beginDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
      >
        <div className="vg-chapters">
          {data.chapters.map((c, i) => (
            <span
              key={c.id}
              className={`vg-chapter${i === activeChapter ? ' is-active' : ''}${
                ((c.end - c.start) / safeDuration) * 100 < 7 ? ' is-narrow' : ''
              }`}
              style={{['--w' as string]: `${((c.end - c.start) / safeDuration) * 100}%`} as React.CSSProperties}
            >
              <span className="vg-chapter-label" title={c.title}>{c.title}</span>
            </span>
          ))}
        </div>
        <div className="vg-ticks" aria-hidden="true">
          {data.steps.filter((s) => s.start > 0.01).map((s) => (
            <span
              key={`tick-${s.id}`}
              className="vg-tick"
              style={{['--p' as string]: `${(s.start / safeDuration) * 100}%`} as React.CSSProperties}
            />
          ))}
        </div>
        <div
          className="vg-playhead"
          style={{['--pos' as string]: `${dragging ? previewPct : posPct}%`} as React.CSSProperties}
        />
        <div className="vg-bubble" style={timelineStyle}>
          {fmt(dragging ? preview : time)}
        </div>
      </div>

      <div className="vg-steps" aria-live="polite">
        <div
          className="vg-steps-track"
          style={{['--i' as string]: activeStep} as React.CSSProperties}
        >
        {data.steps.map((s, i) => (
          <article
            key={s.id}
            className={`vg-step${i === activeStep ? ' is-active' : ''}`}
            aria-hidden={i !== activeStep}
            onClick={() => seekTo(s.start)}
          >
            {s.image ? (
              <div className="vg-step-media">
                <img src={s.image} alt={s.title} loading="lazy" />
              </div>
            ) : null}
            <div className="vg-step-body">
              {s.chapterId
                ? data.chapters.find((c) => c.id === s.chapterId)?.title && (
                    <p className="vg-step-kicker">{data.chapters.find((c) => c.id === s.chapterId)?.title}</p>
                  )
                : null}
              <h3 className="vg-step-title">{s.title}</h3>
              {s.text ? <p className="vg-step-text">{s.text}</p> : null}
              <button
                type="button"
                className="vg-step-time"
                tabIndex={i === activeStep ? 0 : -1}
                onClick={(e) => {
                  e.stopPropagation();
                  seekTo(s.start);
                }}
              >
                {labels.jumpTo(fmt(s.start))}
              </button>
            </div>
          </article>
        ))}
        </div>
      </div>
      {/* 断线重连提示：默认隐藏，网络出错时由 CSS 显示 */}
      <span
        className={`vg-net${netState === 'ok' ? '' : ` is-${netState}`}`}
        role="status"
        aria-live="polite"
      >
        {netState === 'recovering' ? labels.reconnecting : null}
        {netState === 'failed' ? labels.netFailed : null}
      </span>
      {/* 供调试/无障碍读取的当前时间，视觉隐藏由 CSS 控制 */}
      <span className="vg-status" aria-hidden="true">
        {fmt(time)} / {fmt(duration)}
        {step ? ` · ${step.title}` : ''}
      </span>
    </>
  );
}
