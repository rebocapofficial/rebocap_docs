import React from 'react';
import MediaCarousel from './MediaCarousel';

export default function SteamVRCarousel() {
  const items = [
    '/img/steamvr_guide/steamvr_windows.jpg',
    '/img/steamvr_guide/steamvr_windows.jpg',
    '/img/steamvr_guide/test_video.mp4'
  ];
  return <MediaCarousel items={items} />;
}