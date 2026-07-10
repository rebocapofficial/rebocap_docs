import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import DocLink from '@site/src/components/DocLink';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the custom DocLink component so it can be used anywhere without importing
  DocLink,
};