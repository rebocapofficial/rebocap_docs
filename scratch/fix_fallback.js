const fs = require('fs');
const path = require('path');

const files = [
  'i18n/zh-Hans/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx',
  'i18n/ja/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx',
  'i18n/zh-Hant/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'
];

files.forEach(file => {
  const filePath = path.resolve(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace require('').default with (require('').default || require(''))
    content = content.replace(/require\('([^']+)'\)\.default/g, "(require('$1').default || require('$1'))");
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Successfully added fallback for require syntax in ${file}!`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
