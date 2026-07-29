import React, { useState } from 'react';

export default function MediaCarousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  if (!items || items.length === 0) return <div style={{color: 'red', border: '2px solid red', padding: '20px'}}>ERROR: items is empty or undefined. Type: {typeof items}. Value: {JSON.stringify(items)}</div>;

  const currentItem = items[currentIndex];
  const isVideo = currentItem.endsWith('.mp4') || currentItem.endsWith('.webm');

  return (
    <div style={{ position: 'relative', width: '100%', margin: '0 auto', overflow: 'hidden', borderRadius: '8px', border: '1px solid #ddd' }}>
      <div style={{ position: 'relative', width: '100%', paddingBottom: '75%', backgroundColor: '#000' }}>
        {isVideo ? (
          <video
            key={currentItem}
            src={currentItem}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
            autoPlay
            loop
            muted
            playsInline
            controls
          />
        ) : (
          <img
            src={currentItem}
            alt={`Slide ${currentIndex}`}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
          />
        )}
      </div>

      {items.length > 1 && (
        <>
          <div 
            onClick={goToPrevious}
            style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              fontSize: '24px',
              color: '#fff',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1,
              cursor: 'pointer',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none'
            }}
          >
            &#10094;
          </div>
          <div 
            onClick={goToNext}
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              fontSize: '24px',
              color: '#fff',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1,
              cursor: 'pointer',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none'
            }}
          >
            &#10095;
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', bottom: '10px', width: '100%' }}>
            {items.map((_, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                style={{
                  margin: '0 5px',
                  cursor: 'pointer',
                  fontSize: '20px',
                  color: currentIndex === slideIndex ? '#007bff' : 'rgba(255,255,255,0.7)',
                  textShadow: '0px 0px 3px rgba(0,0,0,0.8)'
                }}
              >
                &#9679;
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
