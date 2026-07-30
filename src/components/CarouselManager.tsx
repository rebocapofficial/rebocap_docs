import React, { useEffect } from 'react';

export default function CarouselManager() {
  useEffect(() => {
    function initCarousels() {
      const carousels = document.querySelectorAll('.html-carousel:not(.auto-initialized)');
      
      carousels.forEach(carousel => {
        carousel.classList.add('auto-initialized');
        let lastTime = performance.now();
        let timeElapsed = 0;
        let timeTarget = 10000;
        
        function getActiveIndex() {
          const inputs = Array.from(carousel.querySelectorAll('input[type="radio"]'));
          if(inputs.length === 0) return 0;
          let idx = inputs.findIndex(i => i.checked);
          return idx === -1 ? 0 : idx;
        }
        
        function updateProgress() {
          let percentage = Math.min(100, (timeElapsed / timeTarget) * 100);
          
          const activeIndex = getActiveIndex();
          const slideElement = carousel.querySelector('.slide' + (activeIndex + 1));
          if(slideElement) {
            const video = slideElement.querySelector('video');
            if(video && !video.paused && video.duration) {
                percentage = Math.min(100, (video.currentTime / video.duration) * 100);
            }
          }

          carousel.style.setProperty('--carousel-progress', percentage + '%');
          carousel.style.setProperty('--carousel-progress-decimal', (percentage / 100).toFixed(4));
        }

        function checkVideoState() {
          const activeIndex = getActiveIndex();
          const slideElement = carousel.querySelector('.slide' + (activeIndex + 1));
          if(slideElement) {
            const video = slideElement.querySelector('video');
            if(video) {
              if(!video.paused && !video.ended) return true; 
            }
          }
          return false;
        }

        function handleVideoAutoplay() {
          const activeIndex = getActiveIndex();
          const slides = carousel.querySelectorAll('.html-carousel-slide');
          slides.forEach((slide, index) => {
            const video = slide.querySelector('video');
            if (video) {
              if (index === activeIndex) {
                video.muted = true;
                if (video.readyState > 0) {
                    video.currentTime = 0;
                }
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => console.warn('Autoplay prevented:', e));
                }
              } else {
                video.pause();
              }
            }
          });
        }
        
        function checkZoomState() {
           const zoomOverlay = document.querySelector('.medium-zoom-overlay');
           if(zoomOverlay && window.getComputedStyle(zoomOverlay).opacity !== '0' && window.getComputedStyle(zoomOverlay).display !== 'none') return true;
           const customOverlay = document.querySelector('div[style*="z-index: 9999"]');
           if(customOverlay && window.getComputedStyle(customOverlay).opacity !== '0' && window.getComputedStyle(customOverlay).display !== 'none') return true;
           if(document.fullscreenElement) return true;
           return false;
        }

        carousel.addEventListener('change', (e) => {
          if(e.target.type === 'radio') {
            timeElapsed = 0;
            updateProgress();
            handleVideoAutoplay();
          }
        });

        let isHovered = false;
        carousel.addEventListener('mouseenter', () => isHovered = true);
        carousel.addEventListener('mouseleave', () => isHovered = false);
        
        // Use capture phase for media events to survive React hydration
        carousel.addEventListener('play', (e) => {
            if (e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'video') {
                timeElapsed = 0; 
                updateProgress();
            }
        }, true);
        
        carousel.addEventListener('ended', (e) => {
            if (e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'video') {
                timeElapsed = 0; // Start the 10s countdown from 0 after video ends
                updateProgress();
            }
        }, true);

        let rafId;
        function tick(now) {
          if (!document.body.contains(carousel)) return;
          const delta = now - lastTime;
          lastTime = now;
          
          if (!checkZoomState() && !checkVideoState() && !isHovered) {
             timeElapsed += delta;
             if (timeElapsed >= timeTarget) {
               timeElapsed = 0;
               const inputs = Array.from(carousel.querySelectorAll('input[type="radio"]'));
               if (inputs.length > 0) {
                   let nextIndex = (getActiveIndex() + 1) % inputs.length;
                   inputs[nextIndex].checked = true;
                   inputs[nextIndex].dispatchEvent(new Event('change', { bubbles: true }));
               }
             }
             updateProgress();
          } else {
             if (checkVideoState()) {
                 timeElapsed = 0;
                 updateProgress();
             }
          }
          rafId = requestAnimationFrame(tick);
        }
        
        updateProgress();
        handleVideoAutoplay();
        rafId = requestAnimationFrame(tick);
        
        carousel._cleanup = () => {
           cancelAnimationFrame(rafId);
        };
      });
    }

    initCarousels();
    const observer = new MutationObserver(initCarousels);
    observer.observe(document.body, { childList: true, subtree: true });
    const intervalId = setInterval(initCarousels, 1000);

    return () => {
      observer.disconnect();
      clearInterval(intervalId);
      document.querySelectorAll('.html-carousel').forEach(c => {
         if (c._cleanup) c._cleanup();
         c.classList.remove('auto-initialized');
      });
    };
  }, []);

  return null;
}