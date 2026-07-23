const fs = require('fs');
const path = require('path');

const targets = [
  'i18n/zh-Hans/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx',
  'i18n/ja/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx',
  'i18n/zh-Hant/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'
];

targets.forEach(target => {
  const targetPath = path.resolve(__dirname, '..', target);
  if (fs.existsSync(targetPath)) {
    let content = fs.readFileSync(targetPath, 'utf-8');
    // Revert the absolute root-relative path '/img/' inside HTML tags back to the relative path '../../img/'
    // e.g. <img src="/img/unboxing/..." /> -> <img src="../../img/unboxing/..." />
    let updatedContent = content.replace(/src="\/img\//g, 'src="../../img/');
    fs.writeFileSync(targetPath, updatedContent, 'utf-8');
    console.log(`Reverted HTML image paths to relative '../../img/' in: ${target}`);
  }
});
