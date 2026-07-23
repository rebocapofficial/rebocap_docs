const fs = require('fs');
const path = require('path');

const targetFiles = [
  {
    path: path.resolve(__dirname, '../docs/rebocap-tutorials/6-set-unboxing.mdx'),
    isI18n: false,
    locale: 'en'
  },
  {
    path: path.resolve(__dirname, '../docs/rebocap-tutorials/15-set-unboxing.mdx'),
    isI18n: false,
    locale: 'en'
  },
  {
    path: path.resolve(__dirname, '../i18n/zh-Hans/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'),
    isI18n: true,
    locale: 'zh-Hans'
  },
  {
    path: path.resolve(__dirname, '../i18n/zh-Hans/docusaurus-plugin-content-docs/current/rebocap-tutorials/15-set-unboxing.mdx'),
    isI18n: true,
    locale: 'zh-Hans'
  },
  {
    path: path.resolve(__dirname, '../i18n/ja/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'),
    isI18n: true,
    locale: 'ja'
  },
  {
    path: path.resolve(__dirname, '../i18n/zh-Hant/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'),
    isI18n: true,
    locale: 'zh-Hant'
  }
];

targetFiles.forEach(fileObj => {
  const filePath = fileObj.path;
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Remove the JS import of video if it exists (like import TrackerNormal from ...)
  content = content.replace(/^import\s+TrackerNormal\s+from\s+['"][^'"]+['"];?\s*$/gm, '');

  // 1. Convert HTML img tags containing Webpack require back to standard Markdown images (wrapped in blank lines)
  const requireImgRegex = /<img[^>]+src={require\('@site\/static\/img\/([^\']+?)'\)\.default\}[^>]*?>/gi;
  content = content.replace(requireImgRegex, (match, p1) => {
    const relPath = fileObj.isI18n 
      ? `../../../../../static/img/${p1}` 
      : `../../static/img/${p1}`;
    return `\n\n![${path.basename(p1, path.extname(p1))}]( ${relPath} )\n\n`;
  });

  // 2. Convert standard markdown images that use absolute /img/ path to relative static path
  const absMarkdownImgRegex = /!\[(.*?)\]\(\/img\/([^)]+?)\)/gi;
  content = content.replace(absMarkdownImgRegex, (match, alt, p2) => {
    const relPath = fileObj.isI18n 
      ? `../../../../../static/img/${p2}` 
      : `../../static/img/${p2}`;
    return `![${alt}](${relPath})`;
  });

  // 3. Fix the video tag src attribute
  const videoSrc = fileObj.isI18n ? `/${fileObj.locale}/img/tracker_normal.mp4` : '/img/tracker_normal.mp4';
  
  // Match the entire video tag block (either standard or JSX video tag)
  const videoBlockRegex = /<video[\s\S]*?>[\s\S]*?<\/video>|<video[\s\S]*?\/>/gi;
  content = content.replace(videoBlockRegex, () => {
    return `<video id="video" controls loop preload="metadata" width="60%">
    <source id="mp4" src="${videoSrc}" type="video/mp4" />
  </video>`;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Successfully converted assets in file: ${filePath}`);
});
