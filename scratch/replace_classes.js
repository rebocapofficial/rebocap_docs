const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const targetDirs = [
  path.resolve(__dirname, '../docs'),
  path.resolve(__dirname, '../i18n')
];

targetDirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  walkDir(dir, filePath => {
    if (filePath.endsWith('.mdx') || filePath.endsWith('.md')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // 1. Replace the body text styling: color #3b26b3
      const bodyRegex = /style="([^"]*?)color:\s*#3b26b3;\s*font-size:\s*1\.[015]*em;\s*line-height:\s*1\.[78];?\s*([^"]*?)"/gi;
      let updated = content.replace(bodyRegex, (match, p1, p2) => {
        let cleanStyle = (p1 + p2).trim().replace(/;+/g, ';').replace(/^;+|;+$/g, '');
        let styleAttr = cleanStyle ? `style="${cleanStyle}"` : '';
        return `${styleAttr} class="tutorial-step-text"`;
      });
      
      // 2. Replace the title text styling: color #1e3a8a
      // Example: <strong style="font-size: 1.15em; color: #1e3a8a;"> or <strong style="color: #1e3a8a; font-size: 1.15em;">
      const titleRegex = /style="([^"]*?)color:\s*#1e3a8a;?\s*([^"]*?)"/gi;
      updated = updated.replace(titleRegex, (match, p1, p2) => {
        let cleanStyle = (p1 + p2).trim().replace(/;+/g, ';').replace(/^;+|;+$/g, '');
        let styleAttr = cleanStyle ? `style="${cleanStyle}"` : '';
        return `${styleAttr} class="tutorial-step-title"`;
      });
      
      if (updated !== content) {
        fs.writeFileSync(filePath, updated, 'utf-8');
        console.log(`Updated classes in: ${filePath}`);
      }
    }
  });
});
