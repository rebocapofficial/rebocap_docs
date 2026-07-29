import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import DocLink from '@site/src/components/DocLink';
import MediaCarousel from '@site/src/components/MediaCarousel';
import SteamVRCarousel from '@site/src/components/SteamVRCarousel';
import SteamVRSection1 from '@site/src/components/SteamVRSection1';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the custom DocLink component so it can be used anywhere without importing
  DocLink,
  MediaCarousel,
  SteamVRCarousel,
  SteamVRSection1,
};