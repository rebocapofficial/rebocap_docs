import React, { useEffect, useState } from "react";
import OriginalRoot from "@theme-original/Root";
import type RootType from "@theme/Root";
import type { WrapperProps } from "@docusaurus/types";

function BackToTop(): JSX.Element {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        background: "var(--ifm-color-primary)",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s, transform 0.3s",
        zIndex: 1000,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      ↑
    </button>
  );
}

type Props = WrapperProps<typeof RootType>;

export default function RootWrapper({ children }: Props): JSX.Element {
  useEffect(() => {
    const handleZoomClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('img') as HTMLImageElement | null;
      if (
        target &&
        !target.closest('a') &&
        (target.closest('.markdown') || target.classList.contains('zoomable-image-trigger'))
      ) {
        e.stopPropagation();
        e.preventDefault();

        if (document.getElementById('custom-zoom-overlay')) {
          return;
        }

        const overlay = document.createElement('div');
        overlay.id = 'custom-zoom-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '999999';
        overlay.style.cursor = 'zoom-out';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1)';
        
        const img = document.createElement('img');
        img.src = target.src;
        img.style.maxWidth = '92%';
        img.style.maxHeight = '92%';
        img.style.objectFit = 'contain';
        img.style.boxShadow = '0 20px 50px rgba(0,0,0,0.7)';
        img.style.borderRadius = '12px';
        img.style.transform = 'scale(0.92)';
        img.style.transition = 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)';
        
        overlay.appendChild(img);

        const closeOverlay = () => {
          overlay.style.opacity = '0';
          img.style.transform = 'scale(0.92)';
          setTimeout(() => {
            if (overlay.parentNode) {
              document.body.removeChild(overlay);
            }
          }, 220);
          document.removeEventListener('keydown', handleKeyDown, true);
        };

        const handleKeyDown = (keyEvent: KeyboardEvent) => {
          if (keyEvent.key === 'Escape') {
            keyEvent.stopPropagation();
            keyEvent.preventDefault();
            closeOverlay();
          }
        };

        overlay.onclick = (clickEvent) => {
          clickEvent.stopPropagation();
          clickEvent.preventDefault();
          closeOverlay();
        };

        document.addEventListener('keydown', handleKeyDown, true);
        document.body.appendChild(overlay);

        // Force reflow
        overlay.offsetWidth;
        overlay.style.opacity = '1';
        img.style.transform = 'scale(1)';
      }
    };

    const openVideoZoom = (targetVideo: HTMLVideoElement) => {
      if (document.getElementById('custom-zoom-overlay')) {
        return;
      }

      const overlay = document.createElement('div');
      overlay.id = 'custom-zoom-overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100vw';
      overlay.style.height = '100vh';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = '999999';
      overlay.style.cursor = 'zoom-out';
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1)';

      const videoContainer = document.createElement('div');
      videoContainer.style.maxWidth = '92%';
      videoContainer.style.maxHeight = '92%';
      videoContainer.style.width = '82vw';
      videoContainer.style.display = 'flex';
      videoContainer.style.alignItems = 'center';
      videoContainer.style.justifyContent = 'center';
      videoContainer.style.boxShadow = '0 20px 50px rgba(0,0,0,0.7)';
      videoContainer.style.borderRadius = '12px';
      videoContainer.style.overflow = 'hidden';
      videoContainer.style.transform = 'scale(0.92)';
      videoContainer.style.transition = 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)';
      videoContainer.style.cursor = 'default';
      videoContainer.style.backgroundColor = '#000';

      videoContainer.onclick = (clickEvent) => {
        clickEvent.stopPropagation();
      };

      const zoomedVideo = document.createElement('video');
      if (targetVideo.src) {
        zoomedVideo.src = targetVideo.src;
      } else {
        Array.from(targetVideo.querySelectorAll('source')).forEach((srcEl) => {
          const clone = srcEl.cloneNode(true) as HTMLSourceElement;
          zoomedVideo.appendChild(clone);
        });
      }
      zoomedVideo.controls = true;
      zoomedVideo.autoplay = true;
      zoomedVideo.loop = targetVideo.loop;
      zoomedVideo.style.width = '100%';
      zoomedVideo.style.maxHeight = '86vh';
      zoomedVideo.style.display = 'block';

      zoomedVideo.currentTime = targetVideo.currentTime || 0;
      const wasPaused = targetVideo.paused;
      targetVideo.pause();

      videoContainer.appendChild(zoomedVideo);
      overlay.appendChild(videoContainer);

      const closeOverlay = () => {
        overlay.style.opacity = '0';
        videoContainer.style.transform = 'scale(0.92)';
        setTimeout(() => {
          try {
            targetVideo.currentTime = zoomedVideo.currentTime;
            if (!wasPaused && !zoomedVideo.paused) {
              targetVideo.play().catch(() => {});
            }
          } catch (err) {}
          zoomedVideo.pause();
          if (overlay.parentNode) {
            document.body.removeChild(overlay);
          }
        }, 220);
        document.removeEventListener('keydown', handleKeyDown, true);
      };

      const handleKeyDown = (keyEvent: KeyboardEvent) => {
        if (keyEvent.key === 'Escape') {
          keyEvent.stopPropagation();
          keyEvent.preventDefault();
          closeOverlay();
        }
      };

      overlay.onclick = (clickEvent) => {
        clickEvent.stopPropagation();
        clickEvent.preventDefault();
        closeOverlay();
      };

      document.addEventListener('keydown', handleKeyDown, true);
      document.body.appendChild(overlay);

      overlay.offsetWidth;
      overlay.style.opacity = '1';
      videoContainer.style.transform = 'scale(1)';

      zoomedVideo.play().catch(() => {});
    };

    const injectVideoEnhancements = () => {
      const videos = document.querySelectorAll('.markdown video');
      videos.forEach((video) => {
        const videoEl = video as HTMLVideoElement;
        if (
          videoEl.dataset.hasInbrowserZoom ||
          videoEl.closest('#custom-zoom-overlay') ||
          videoEl.closest('.video-zoom-wrapper')
        ) {
          return;
        }
        videoEl.dataset.hasInbrowserZoom = 'true';

        videoEl.addEventListener('dblclick', (e) => {
          e.stopPropagation();
          e.preventDefault();
          openVideoZoom(videoEl);
        });

        const parent = videoEl.parentNode;
        if (parent) {
          const originalWidthAttr = videoEl.getAttribute('width');
          const originalStyleWidth = videoEl.style.width;

          const wrapper = document.createElement('div');
          wrapper.className = 'video-zoom-wrapper';
          wrapper.style.position = 'relative';
          wrapper.style.maxWidth = '100%';

          if (originalWidthAttr) {
            wrapper.style.width =
              originalWidthAttr.includes('%') || originalWidthAttr.includes('px')
                ? originalWidthAttr
                : `${originalWidthAttr}px`;
            wrapper.style.display =
              originalWidthAttr === '100%' || originalWidthAttr === '100' ? 'block' : 'inline-block';
          } else if (originalStyleWidth) {
            wrapper.style.width = originalStyleWidth;
            wrapper.style.display = originalStyleWidth === '100%' ? 'block' : 'inline-block';
          } else {
            wrapper.style.width = '100%';
            wrapper.style.display = 'block';
          }

          const btn = document.createElement('button');
          btn.className = 'video-inbrowser-zoom-btn';
          btn.innerHTML = '⛶ 网页内沉浸放大';
          btn.title = '在当前浏览器的范围/窗口内沉浸放大视频 (也可直接双击视频画面放大)';
          btn.style.position = 'absolute';
          btn.style.top = '12px';
          btn.style.right = '12px';
          btn.style.zIndex = '20';
          btn.style.pointerEvents = 'none';
          btn.style.display = 'inline-flex';
          btn.style.alignItems = 'center';
          btn.style.gap = '5px';
          btn.style.padding = '6px 14px';
          btn.style.background = 'rgba(0, 0, 0, 0.72)';
          btn.style.backdropFilter = 'blur(8px)';
          btn.style.color = '#fff';
          btn.style.border = '1px solid rgba(255, 255, 255, 0.35)';
          btn.style.borderRadius = '20px';
          btn.style.fontSize = '13px';
          btn.style.fontWeight = '500';
          btn.style.cursor = 'pointer';
          btn.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.4)';
          btn.style.opacity = '0';
          btn.style.transform = 'translateY(-6px) scale(0.96)';
          btn.style.transition =
            'opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease, border-color 0.2s ease';
          btn.style.userSelect = 'none';

          wrapper.onmouseenter = () => {
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
            btn.style.transform = 'translateY(0) scale(1)';
          };
          wrapper.onmouseleave = () => {
            btn.style.opacity = '0';
            btn.style.pointerEvents = 'none';
            btn.style.transform = 'translateY(-6px) scale(0.96)';
          };

          btn.onmouseenter = () => {
            btn.style.background = 'rgba(0, 0, 0, 0.92)';
            btn.style.borderColor = 'rgba(255, 255, 255, 0.85)';
            btn.style.transform = 'translateY(0) scale(1.05)';
          };
          btn.onmouseleave = () => {
            btn.style.background = 'rgba(0, 0, 0, 0.72)';
            btn.style.borderColor = 'rgba(255, 255, 255, 0.35)';
            btn.style.transform = 'translateY(0) scale(1)';
          };

          btn.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            openVideoZoom(videoEl);
          };

          parent.insertBefore(wrapper, videoEl);
          wrapper.appendChild(videoEl);
          wrapper.appendChild(btn);

          videoEl.style.width = '100%';
          videoEl.style.height = 'auto';
          videoEl.style.display = 'block';
        }
      });
    };

    document.addEventListener('click', handleZoomClick, true);
    injectVideoEnhancements();
    const observer = new MutationObserver(() => {
      injectVideoEnhancements();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('click', handleZoomClick, true);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <OriginalRoot>{children}</OriginalRoot>
      <BackToTop />
    </>
  );
}
