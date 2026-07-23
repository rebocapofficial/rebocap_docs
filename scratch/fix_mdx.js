const fs = require('fs');
const path = require('path');

const files = [
  'i18n/zh-Hans/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx',
  'i18n/ja/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx',
  'i18n/zh-Hant/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'
];

files.forEach(file => {
  const filePath = path.resolve(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 1. Replace relative image paths with absolute paths
  content = content.replace(/\.\.\/\.\.\/\.\.\/img\//g, '/img/');
  
  // 2. Fix JSX styles & remove leading spaces for Section 2 and Section 3
  // Let's replace the outer structures:
  // Section 2 structure:
  content = content.replace(/<div style=\{\{\s*display:\s*'flex'[\s\S]*?\}\}>/g, '<div style="display: flex; flex-direction: row; gap: 30px; flex-wrap: wrap; align-items: flex-start; margin: 20px 0;">');
  content = content.replace(/<div style=\{\{\s*flex:\s*'1'[\s\S]*?\}\}>/g, '<div style="flex: 1; min-width: 280px; text-align: center;">');
  content = content.replace(/<img\s+src="([^"]+)"\s+alt="Straps"\s+style=\{\{\s*maxWidth:\s*'100%'[\s\S]*?\}\}\s*\/>/g, '<img src="$1" alt="Straps" style="max-width: 100%; height: auto; border-radius: 8px;" />');
  content = content.replace(/<div style=\{\{\s*flex:\s*'1\.5'[\s\S]*?\}\}>/g, '<div style="flex: 1.5; min-width: 320px; color: #2b2b2b; font-size: 1.05em; line-height: 1.8;">');
  content = content.replace(/<strong style=\{\{\s*fontSize:\s*'1\.2em'[\s\S]*?\}\}>/g, '<strong style="font-size: 1.2em; color: #1e3a8a;">');
  
  // Section 3 structure:
  content = content.replace(/<div style=\{\{\s*display:\s*'flex'[\s\S]*?\}\}>\s*<div style=\{\{\s*flex:\s*'1\.2'[\s\S]*?\}\}>/g, '<div style="display: flex; flex-direction: row; gap: 30px; flex-wrap: wrap; align-items: flex-start; margin: 20px 0;">\n<div style="flex: 1.2; min-width: 300px; text-align: center;">');
  content = content.replace(/<img\s+src="([^"]+)"\s+alt="Wear Body"\s+style=\{\{\s*maxWidth:\s*'90%'[\s\S]*?\}\}\s*\/>/g, '<img src="$1" alt="Wear Body" style="max-width: 90%; height: auto; border-radius: 8px;" />');
  content = content.replace(/<div style=\{\{\s*flex:\s*'1\.5'[\s\S]*?\}\}>\s*<!-- 步骤 1 -->/g, '<div style="flex: 1.5; min-width: 320px; color: #2b2b2b; font-size: 1.05em; line-height: 1.7;">\n<!-- 步骤 1 -->');
  content = content.replace(/<div style=\{\{\s*marginBottom:\s*'20px'\s*\}\}>/g, '<div style="margin-bottom: 20px;">');
  content = content.replace(/<strong style=\{\{\s*fontSize:\s*'1\.15em'[\s\S]*?\}\}>/g, '<strong style="font-size: 1.15em; color: #1e3a8a;">');
  content = content.replace(/<span style=\{\{\s*fontSize:\s*'0\.9em'[\s\S]*?\}\}>/g, '<span style="font-size: 0.9em; color: #ef4444;">');
  content = content.replace(/<details style=\{\{\s*marginTop:\s*'8px'[\s\S]*?\}\}>/g, '<details style="margin-top: 8px; padding: 6px 12px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">');
  content = content.replace(/<summary style=\{\{\s*cursor:\s*'pointer'[\s\S]*?\}\}>/g, '<summary style="cursor: pointer; font-weight: 600; color: #475569;">');
  content = content.replace(/<div style=\{\{\s*padding:\s*'8px 0 0 10px'\s*\}\}>/g, '<div style="padding: 8px 0 0 10px;">');
  content = content.replace(/<img\s+src="([^"]+)"\s+alt="Tracker ID Location"\s+style=\{\{\s*maxWidth:\s*'100%'[\s\S]*?\}\}\s*\/>/g, '<img src="$1" alt="Tracker ID Location" style="max-width: 100%; border-radius: 4px; margin-bottom: 8px;" />');
  content = content.replace(/<div style=\{\{\s*marginBottom:\s*'10px'\s*\}\}>/g, '<div style="margin-bottom: 10px;">');

  // 3. Remove leading space indentation for lines inside HTML components
  // To avoid markdown list block generation, remove indentation of HTML divs and images
  let lines = content.split('\n');
  lines = lines.map(line => {
    // If the line starts with spaces and has HTML or bullet point lists, clean up leading indentation
    if (line.trim().startsWith('<div') || line.trim().startsWith('</div') || line.trim().startsWith('<img') || line.trim().startsWith('<strong') || line.trim().startsWith('</strong') || line.trim().startsWith('<span') || line.trim().startsWith('</span') || line.trim().startsWith('<details') || line.trim().startsWith('</details') || line.trim().startsWith('<summary') || line.trim().startsWith('</summary') || line.trim().startsWith('- ')) {
      return line.trim();
    }
    // Also left-align plain text inside the divs to prevent it from becoming code blocks
    if (line.startsWith('      ') || line.startsWith('    ') || line.startsWith('  ')) {
      // If it's not inside a markdown code block itself:
      if (!line.trim().startsWith('release_') && !line.trim().startsWith('V01') && !line.trim().startsWith('V02')) {
        return line.trim();
      }
    }
    return line;
  });
  content = lines.join('\n');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Successfully fixed file: ${file}`);
});
