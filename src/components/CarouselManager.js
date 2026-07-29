import React, { useEffect } from 'react';

export default function CarouselManager() {
  useEffect(() => {
    if (window.carouselObserverSetup) return;
    window.carouselObserverSetup = true;

    function initCarousels() {
      const carousels = document.querySelectorAll('.html-carousel:not(.auto-initialized)');
      
      carousels.forEach(carousel => {
        carousel.classList.add('auto-initialized');
        let lastTime = performance.now();
        let timeElapsed = 0;
        let timeTarget = 10000;
        
        const inputs = Array.from(carousel.querySelectorAll('input[type="radio"]'));
        if(inputs.length === 0) return;
        
        function getActiveIndex() {
          let idx = inputs.findIndex(i => i.checked);
          return idx === -1 ? 0 : idx;
        }
        
        function updateProgress() {
          const percentage = Math.min(100, (timeElapsed / timeTarget) * 100);
          carousel.style.setProperty('--carousel-progress', percentage + '%');
        }

        function checkVideoState() {
          const activeIndex = getActiveIndex();
          const slideElement = carousel.querySelector('.slide' + (activeIndex + 1));
          if(slideElement) {
            const video = slideElement.querySelector('video');
            if(video) {
              if(!video.paused && !video.ended) {
                return true; 
              }
            }
          }
          return false;
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
          }
        });

        let isHovered = false;
        carousel.addEventListener('mouseenter', () => isHovered = true);
        carousel.addEventListener('mouseleave', () => isHovered = false);
        
        const videos = carousel.querySelectorAll('video');
        videos.forEach(v => {
           v.addEventListener('play', () => { timeElapsed = 0; updateProgress(); });
        });

        function tick(now) {
          if (!document.body.contains(carousel)) return;

          const delta = now - lastTime;
          lastTime = now;
          
          if (!checkZoomState() && !checkVideoState() && !isHovered) {
             timeElapsed += delta;
             
             if (timeElapsed >= timeTarget) {
               timeElapsed = 0;
               let nextIndex = (getActiveIndex() + 1) % inputs.length;
               inputs[nextIndex].checked = true;
               inputs[nextIndex].dispatchEvent(new Event('change', { bubbles: true }));
             }
             updateProgress();
          } else {
             if (checkVideoState()) {
                 timeElapsed = 0;
                 updateProgress();
             }
          }
          requestAnimationFrame(tick);
        }
        
        requestAnimationFrame(tick);
      });
    }

    const observer = new MutationObserver(() => {
       initCarousels();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(initCarousels, 100);
  }, []);

  return null;
}