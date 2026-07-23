const fs = require('fs');
const path = require('path');

const targets = [
  {
    path: path.resolve(__dirname, '../i18n/zh-Hans/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'),
    targetText: '- <span style="background-color: #e9e3ff; color: #000000; padding: 0px 6px; border-radius: 4px; display: inline-block;">粘上魔术贴后，向两侧拉扯一下，使钩面完全嵌入毛面，防止脱落。</span>',
    btnText: '更多绑带的安装指南 → 📖'
  },
  {
    path: path.resolve(__dirname, '../i18n/zh-Hant/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'),
    targetText: '- <span style="background-color: #e9e3ff; color: #000000; padding: 0px 6px; border-radius: 4px; display: inline-block;">黏上魔術貼後，向兩側拉扯一下，使鉤面完全嵌入毛面，防止脫落。</span>',
    btnText: '更多綁帶的安裝指南 → 📖'
  },
  {
    path: path.resolve(__dirname, '../i18n/ja/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'),
    targetText: '- <span style="background-color: #e9e3ff; color: #000000; padding: 0px 6px; border-radius: 4px; display: inline-block;">ベルクロを取り付けた後、左右に引っ張ってフック面をループ面にしっかりと噛み合わせ、脱落を防ぎます。</span>',
    btnText: 'ストラップの詳しい取り付けガイドはこちら → 📖'
  },
  {
    path: path.resolve(__dirname, '../docs/rebocap-tutorials/6-set-unboxing.mdx'),
    targetText: '- <span style="background-color: #e9e3ff; color: #000000; padding: 0px 6px; border-radius: 4px; display: inline-block;">After attaching Velcro, pull sideways to embed hooks into plush, avoid falling off.</span>',
    btnText: 'More Strap Installation Guides → 📖'
  }
];

targets.forEach(item => {
  const filePath = item.path;
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Create the HTML button string
  const btnHtml = `\n\n<div style="margin-top: 20px; margin-bottom: 10px;">
  <a href="../tutorial/instroction_for_straps" class="button button--primary" style="text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 1.0rem; padding: 6px 18px;">
    ${item.btnText}
  </a>
</div>`;

  // Check if button is already added to prevent duplicates
  if (content.includes('instroction_for_straps')) {
    console.log(`Button already present in: ${filePath}`);
    return;
  }

  // Replace targetText with targetText + btnHtml
  if (content.includes(item.targetText)) {
    content = content.replace(item.targetText, item.targetText + btnHtml);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Successfully added button to: ${filePath}`);
  } else {
    console.warn(`Target text not found in: ${filePath}`);
  }
});
