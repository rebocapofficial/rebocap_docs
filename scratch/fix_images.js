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
    
    // Replace HTML img src with require style
    // e.g. <img src="/img/unboxing/straps_25.png" ... /> -> <img src={require('@site/static/img/unboxing/straps_25.png').default} ... />
    content = content.replace(/<img\s+src="\/img\/([^"]+)"/g, "<img src={require('@site/static/img/$1').default}");
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Successfully updated ${file} image imports!`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
