// Called only from a user play/zoom action. No source URL is attached at mount.
const posters: Record<string, {poster: string; width: number; height: number}> = require('../../scripts/video-posters.json');

export function videoPoster(src: string): string | undefined {
  try { return posters[decodeURIComponent(new URL(src, 'https://doc.rebocap.com').pathname)]?.poster; }
  catch { return undefined; }
}

export function loadVideo(video: HTMLVideoElement) {
  if (video.dataset.videoLoaded) return;
  for (const element of [video, ...Array.from(video.querySelectorAll('source'))]) {
    const src = element.getAttribute('data-video-src');
    if (src) element.setAttribute('src', src);
  }
  video.dataset.videoLoaded = 'true';
  video.load();
  video.closest('.video-zoom-wrapper')?.querySelector('.video-load-button')?.remove();
}
