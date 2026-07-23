const fs = require('fs');
const path = require('path');

const files = [
  {
    path: path.resolve(__dirname, '../docs/rebocap-tutorials/6-set-unboxing.mdx'),
    src: '/img/kuaichai_normal.mp4'
  },
  {
    path: path.resolve(__dirname, '../i18n/zh-Hans/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'),
    src: '/zh-Hans/img/kuaichai_normal.mp4'
  },
  {
    path: path.resolve(__dirname, '../i18n/ja/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'),
    src: '/ja/img/kuaichai_normal.mp4'
  },
  {
    path: path.resolve(__dirname, '../i18n/zh-Hant/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'),
    src: '/zh-Hant/img/kuaichai_normal.mp4'
  }
];

files.forEach(fileObj => {
  const filePath = fileObj.path;
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace tracker_normal.mp4 with kuaichai_normal.mp4 in the src attribute of video source tags
  content = content.replace(/tracker_normal\.mp4/g, 'kuaichai_normal.mp4');
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Successfully updated video index in: ${filePath}`);
});
