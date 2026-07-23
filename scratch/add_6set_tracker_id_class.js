const fs = require('fs');
const path = require('path');

const filePaths = [
  path.resolve(__dirname, '../docs/rebocap-tutorials/6-set-unboxing.mdx'),
  path.resolve(__dirname, '../i18n/zh-Hans/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'),
  path.resolve(__dirname, '../i18n/ja/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'),
  path.resolve(__dirname, '../i18n/zh-Hant/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx')
];

filePaths.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Find <div style="margin-top: 30px;"> right before tracker_id image and replace it with class wrapper
  // We can search for <div style="margin-top: 30px;"> followed by blank lines and the markdown image
  const targetPattern = /<div style="margin-top: 30px;">(\s*?\n\s*?!\n*?\[tracker_id)/g;
  
  // A simpler way: replace the exact block of HTML wrapping tracker_id
  content = content.replace(/<div style="margin-top: 30px;">(\s*?\n\s*?!\[tracker_id\])/g, '<div class="tracker-id-img-container" style="margin-top: 30px;">$1');
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Successfully added tracker-id-img-container class to: ${filePath}`);
});
