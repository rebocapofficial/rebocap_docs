const fs = require('fs');
const path = require('path');

const targets = [
  // 1. Traditional Chinese
  {
    path: path.resolve(__dirname, '../i18n/zh-Hant/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'),
    startMark: '<!-- 第一组：围度数据 -->',
    endMark: '<!-- 第五组：底部小图与文字上下排版 -->',
    replacement: `<!-- 第一组：圍度數據 -->
<div style="margin-bottom: 25px;">
<strong>胸部/腰部:</strong> 100 cm<br />
<strong>大腿:</strong> 60 cm<br />
<strong>小腿:</strong> 40 cm
</div>

<!-- 第四组：身体差异性调整 -->
<div style="margin-bottom: 25px;">
<strong>身體差異性調整：</strong><br />
請參考圖片中所示的穿戴位置，<br />
推薦 胸部/腰部追蹤器放置在後背，<br />
腿部追蹤器可以放置在側面。
</div>

<!-- 第三组：避开区域提示 -->
<div style="margin-bottom: 25px;">
<strong>提示：</strong><br />
保持追蹤器按鍵朝上。<br />
<br />
請勿將腰部追蹤器放置在肚臍處以防被擠壓，<br />
腿部追蹤器應避開肌肉隆起成斜坡的區域。<br />
請勿將大腿追蹤器放得太靠近膝蓋。<br />
</div>

`
  },
  // 2. Japanese
  {
    path: path.resolve(__dirname, '../i18n/ja/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'),
    startMark: '<!-- 第一组：围度数据 -->',
    endMark: '<!-- 第五组：底部小图与文字上下排版 -->',
    replacement: `<!-- 第一组：围度数据 -->
<div style="margin-bottom: 25px;">
<strong>胸部/腰部:</strong> 100 cm<br />
<strong>大腿:</strong> 60 cm<br />
<strong>小腿:</strong> 40 cm
</div>

<!-- 第四组：身体差异性调整 -->
<div style="margin-bottom: 25px;">
<strong>身体の個人差による調整：</strong><br />
画像に示されている装着位置を参考にしてください。<br />
胸部/腰部のトラッカーは背中に配置することをお勧めします。<br />
脚のトラッカーは側面に配置することも可能です。
</div>

<!-- 第三组：避开区域提示 -->
<div style="margin-bottom: 25px;">
<strong>ヒント：</strong><br />
トラッカーのボタンが上を向くようにしてください。<br />
<br />
圧迫を防ぐため、腰のトラッカーはおへその位置に配置しないでください。<br />
脚のトラッカーは、筋肉が膨らんで傾斜している領域を避けて配置してください。<br />
大腿部のトラッカーを膝に近づけすぎないでください。<br />
</div>

`
  },
  // 3. English
  {
    path: path.resolve(__dirname, '../docs/rebocap-tutorials/6-set-unboxing.mdx'),
    startMark: '<!-- 第一组：围度数据 -->',
    endMark: '<!-- 第五组：底部小图与文字上下排版 -->',
    replacement: `<!-- 第一组：围度数据 -->
<div style="margin-bottom: 25px;">
<strong>Chest/Waist:</strong> 100 cm<br />
<strong>Upper leg:</strong> 60 cm<br />
<strong>Lower leg:</strong> 40 cm
</div>

<!-- 第四组：身体差异性调整 -->
<div style="margin-bottom: 25px;">
<strong>Body differences:</strong><br />
Please refer to the wearing positions shown in the image,<br />
Recommend placing chest/waist tracker on the back,<br />
Leg tracker can be placed on the side.
</div>

<!-- 第三组：避开区域提示 -->
<div style="margin-bottom: 25px;">
<strong>Tips:</strong><br />
Keep tracker buttons facing upward.<br />
<br />
Do not place waist tracker at the navel to avoid pressure,<br />
Avoid bulging skin areas for leg trackers.<br />
Don't place the thigh tracker too close to the knee.<br />
</div>

`
  }
];

targets.forEach(item => {
  const filePath = item.path;
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const startIndex = content.indexOf(item.startMark);
  const endIndex = content.indexOf(item.endMark);
  
  if (startIndex === -1 || endIndex === -1) {
    console.warn(`Marks not found in: ${filePath}`);
    return;
  }
  
  const before = content.substring(0, startIndex);
  const after = content.substring(endIndex);
  
  const newContent = before + item.replacement + after;
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`Successfully synced wear section in: ${filePath}`);
});
