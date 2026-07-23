const fs = require('fs');
const path = require('path');

// Explicit list of files that we are allowed to modify.
// We must NOT touch any other files in the repository.
const targetFiles = [
  path.resolve(__dirname, '../docs/rebocap-tutorials/6-set-unboxing.mdx'),
  path.resolve(__dirname, '../docs/rebocap-tutorials/15-set-unboxing.mdx'),
  path.resolve(__dirname, '../i18n/zh-Hans/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'),
  path.resolve(__dirname, '../i18n/zh-Hans/docusaurus-plugin-content-docs/current/rebocap-tutorials/15-set-unboxing.mdx'),
  path.resolve(__dirname, '../i18n/ja/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'),
  path.resolve(__dirname, '../i18n/zh-Hant/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx')
];

targetFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Regex to match src="../../img/..." or src="/img/..." in HTML img and source tags
    // It supports any number of relative directory jumps, e.g. ../../ or absolute /
    // Matches both image and video extensions (png, jpg, jpeg, mp4, etc.)
    const assetRegex = /src="(?:\.\.\/)*img\/([^"]+?)"/gi;
    
    let updated = content.replace(assetRegex, (match, p1) => {
      return `src={require('@site/static/img/${p1}').default}`;
    });
    
    // Also match absolute paths starting with /img/
    const absoluteAssetRegex = /src="\/img\/([^"]+?)"/gi;
    updated = updated.replace(absoluteAssetRegex, (match, p1) => {
      return `src={require('@site/static/img/${p1}').default}`;
    });

    if (updated !== content) {
      fs.writeFileSync(filePath, updated, 'utf-8');
      console.log(`Converted static assets to Webpack require in allowed file: ${filePath}`);
    }
  } else {
    console.warn(`File does not exist: ${filePath}`);
  }
});
