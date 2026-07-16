import React, { useState } from 'react';

interface ZoomableImageProps {
  src: string;
  alt?: string;
}

export default function ZoomableImage({ src, alt }: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="zoomable-image-trigger"
        style={{ cursor: 'zoom-in', maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <div
          className="zoomable-image-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            cursor: 'zoom-out',
            animation: 'fadeIn 0.2s ease-out',
          }}
          onClick={() => setIsOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              borderRadius: '8px',
              animation: 'zoomIn 0.2s ease-out',
            }}
          />
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes zoomIn {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
