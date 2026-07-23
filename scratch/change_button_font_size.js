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
  
  // Replace font-size: 1.5rem; with font-size: 1.0rem;
  content = content.replace(/font-size:\s*1\.5rem;/g, 'font-size: 1.0rem;');
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Successfully updated button font size to 1.0rem in: ${filePath}`);
});
