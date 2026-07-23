const fs = require('fs');
const path = require('path');

const targets = [
  // 1. English
  {
    path: path.resolve(__dirname, '../docs/rebocap-tutorials/6-set-unboxing.mdx'),
    findBlock: `- The trackers are updated wirelessly 📶 — no USB cable is needed.<br /> \n🚫 Do not update the tracker and receiver at the same time.<br /> \n\n\n- If the update fails, need restart the tracker and click update again.<br /> \n&emsp;&emsp;🟩Green – fast blink: Tracker working normally<br /> \n&emsp;&emsp;🟩Green – slow blink: Tracker waiting for receiver signal<br /> \n&emsp;&emsp;🟦Blue: Tracker is receiving firmware data<br /> \n&emsp;&emsp;🟨Yellow: Update failed (manually press the 🔘 button to restart, then retry the update)<br /> \n&emsp;&emsp;⬜White: Update successful (usually auto‑restarts after 10s; if not, restart manually)<br /> \n\n\n- Open the log window to see each tracker actual firmware version <br /> \n(the log window is located under "Connect & Power Off" in the software).`,
    replaceBlock: `- Open the log window to see each tracker actual firmware version <br /> \n(the log window is located under "Connect & Power Off" in the software).\n\n\n- The trackers are updated wirelessly 📶 — no USB cable is needed.<br /> \n🚫 Do not update the tracker and receiver at the same time.<br /> \n\n\n- If the update fails, need restart the tracker and click update again.<br /> \n&emsp;&emsp;🟩Green – fast blink: Tracker working normally<br /> \n&emsp;&emsp;🟩Green – slow blink: Tracker waiting for receiver signal<br /> \n&emsp;&emsp;🟦Blue: Tracker is receiving firmware data<br /> \n&emsp;&emsp;🟨Yellow: Update failed (manually press the 🔘 button to restart, then retry the update)<br /> \n&emsp;&emsp;⬜White: Update successful (usually auto‑restarts after 10s; if not, restart manually)<br />`
  },
  // 2. Japanese
  {
    path: path.resolve(__dirname, '../i18n/ja/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'),
    findBlock: `- トラッカーはワイヤレス 📶 で更新されます。USBケーブルは不要です。<br /> \n🚫 トラッカーとレシーバーを同時に更新しないでください。<br /> \n\n\n- 更新が失敗した場合は、トラッカーを再起動して再度更新をクリックする必要があります。<br /> \n&emsp;&emsp;🟩緑灯 – 高速点滅：トラッカーは正常に動作しています<br /> \n&emsp;&emsp;🟩緑灯 – 低速点滅：トラッカーはレシーバーの信号を待っています<br /> \n&emsp;&emsp;🟦青灯：トラッカーはファームウェアデータを受信しています<br /> \n&emsp;&emsp;🟨黄灯：更新失敗（手動で 🔘 ボタンを押して再起動し、更新を再試行してください）<br /> \n&emsp;&emsp;⬜白灯：更新成功（通常10秒後に自動的に再起動します。自動再起動しない場合は手動で再起動してください）<br /> \n\n\n- ログウィンドウを開いて、各トラッカーの実際のファームウェアバージョンを確認します <br /> \n（ログウィンドウは、ソフトウェアの「接続と电源オフ」の下にあります）。`,
    replaceBlock: `- ログウィンドウを開いて、各トラッカーの実際のファームウェアバージョンを確認します <br /> \n（ログウィンドウは、ソフトウェアの「接続と电源オフ」の下にあります）。\n\n\n- トラッカーはワイヤレス 📶 で更新されます。USBケーブルは不要です。<br /> \n🚫 トラッカーとレシーバーを同時に更新しないでください。<br /> \n\n\n- 更新が失敗した場合は、トラッカーを再起動して再度更新をクリックする必要があります。<br /> \n&emsp;&emsp;🟩緑灯 – 高速点滅：トラッカーは正常に動作しています<br /> \n&emsp;&emsp;🟩緑灯 – 低速点滅：トラッカーはレシーバーの信号を待っています<br /> \n&emsp;&emsp;🟦青灯：トラッカーはファームウェアデータを受信しています<br /> \n&emsp;&emsp;🟨黄灯：更新失敗（手動で 🔘 ボタンを押して再起動し、更新を再試行してください）<br /> \n&emsp;&emsp;⬜白灯：更新成功（通常10秒後に自動的に再起動します。自動再起動しない場合は手動で再起動してください）<br />`
  },
  // 3. Traditional Chinese
  {
    path: path.resolve(__dirname, '../i18n/zh-Hant/docusaurus-plugin-content-docs/current/rebocap-tutorials/6-set-unboxing.mdx'),
    findBlock: `- 追蹤器是透過無線 📶 進行更新的 — 無需使用 USB 數據線。<br /> \n🚫 請勿同時更新追蹤器和接收器。<br /> \n\n\n- 如果更新失敗，需要重啟追蹤器並再次點擊更新。<br /> \n&emsp;&emsp;🟩綠燈 – 快閃：追蹤器工作正常<br /> \n&emsp;&emsp;🟩綠燈 – 慢閃：追蹤器正在等待接收器訊號<br /> \n&emsp;&emsp;🟦藍燈：追蹤器正在接收韌體數據<br /> \n&emsp;&emsp;🟨黃燈：更新失敗（手動按下 🔘 按鈕重啟，然後重新更新）<br /> \n&emsp;&emsp;⬜白色：更新成功（通常在 10s 後自動重啟，如果無法自動重啟需要手動重啟）<br /> \n\n\n- 打開日誌視窗以查看每個追蹤器的實際韌體版本 <br /> \n（日誌視窗位於軟體中的“連接與關機”下方）。`,
    replaceBlock: `- 打開日誌視窗以查看每個追蹤器的實際韌體版本 <br /> \n（日誌視窗位於軟體中的“連接與關機”下方）。\n\n\n- 追蹤器是透過無線 📶 進行更新的 — 無需使用 USB 數據線。<br /> \n🚫 請勿同時更新追蹤器和接收器。<br /> \n\n\n- 如果更新失敗，需要重啟追蹤器並再次點擊更新。<br /> \n&emsp;&emsp;🟩綠燈 – 快閃：追蹤器工作正常<br /> \n&emsp;&emsp;🟩綠燈 – 慢閃：追蹤器正在等待接收器訊號<br /> \n&emsp;&emsp;🟦藍燈：追蹤器正在接收韌體數據<br /> \n&emsp;&emsp;🟨黃燈：更新失敗（手動按下 🔘 按鈕重啟，然後重新更新）<br /> \n&emsp;&emsp;⬜白色：更新成功（通常在 10s 後自動重啟，如果無法自動重啟需要手動重啟）<br />`
  }
];

targets.forEach(item => {
  const filePath = item.path;
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Normalize line endings to avoid search mismatch (\r\n vs \n)
  content = content.replace(/\r\n/g, '\n');
  const targetFind = item.findBlock.replace(/\r\n/g, '\n');
  const targetReplace = item.replaceBlock.replace(/\r\n/g, '\n');
  
  if (content.includes(targetFind)) {
    content = content.replace(targetFind, targetReplace);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Successfully moved firmware note in: ${filePath}`);
  } else {
    // Try matching with different newlines just in case
    console.warn(`Could not find the target text block in: ${filePath}`);
  }
});
