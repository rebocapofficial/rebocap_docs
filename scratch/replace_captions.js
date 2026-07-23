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
      
      // Regex to find: <div style="font-size: 0.95em; color: #4b2bbd; line-height: 1.6;">
      // and replace with: <div class="tutorial-step-caption">
      const regex = /<div style="font-size:\s*0\.95em;\s*color:\s*#4b2bbd;\s*line-height:\s*1\.6;?">/gi;
      let updated = content.replace(regex, '<div class="tutorial-step-caption">');
      
      if (updated !== content) {
        fs.writeFileSync(filePath, updated, 'utf-8');
        console.log(`Updated caption classes in: ${filePath}`);
      }
    }
  });
});
