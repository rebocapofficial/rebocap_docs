---
sidebar_position: 9
---

# SteamVR 操作指南

這裡將推薦一些 SteamVR 的設定，以及一些常見問題。


## VR 頭顯 / 串流軟體操作建議
### VR 頭顯的設定

<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![steamvr_windows](/img/steamvr_guide/steamvr_windows.jpg)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong> - 盡量使用 steamvr 的桌面視窗去操控 rebocap 軟體。</strong><br />
一些 vr 頭顯返回到內置系統的介面會停止/休眠 steamvr 的數據，<br />
(Virtual Desktop 不受該問題影響，但要避免 quest 系統休眠)<br />
以及返回 steamvr 時重置頭顯的方向，
這會在 steamvr 中出現 rebocap 的身體方向錯位或校準時記錄錯誤的方向。
<details className="plain-details"><summary>詳情</summary>
·················<br />

</details>

</div>
</div>






- Quest、Pico 這類一體機頭顯的安全範圍需要畫到比實際房間大一圈，<br />
避免觸發安全邊界時導致 steamvr 端的頭顯數據中斷

- 如果走動/蹲起時頭顯固定在原地，說明 vr 頭顯系統內的定位系統未開啟。<br />
（quest 系統需要打開遊玩邊界，pico 系統打開 [定位追蹤]）




### Virtual Desktop 
<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![vd_settings](/img/steamvr_guide/vd_settings.jpg)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong>有 2 個選項建議關閉：</strong>
<br />

> <strong>1 - Center to play space</strong><br />
 在雙擊左手 home 鍵返回 VD 的電腦桌面時，steamvr 空間中的頭顯向後旋轉 180°<br />
可能會導致 rebocap 在校準時記錄錯誤的朝向。



> <strong>2 - Emulate SteamVR vive trackers</strong><br />
 這個功能把 quest 系統的 AI 全身追蹤點傳入 steamvr 中，但在 vrchat 中出現追蹤點重疊，搶奪控制權。<br />
 如果想只啟用他局部指定的追蹤點，可以使用外掛程式來調整。<br />
 🌐 [外掛程式的 github](https://github.com/DenTechs/Virtual_Desktop_Body_Tracking_Configurator)


</div>
</div>




### SteamVR
- 關閉 steamvr 的邊界<br />
預設邊界會限制追蹤點的最大移動範圍，像空氣牆一樣。<br />
如果 VR 頭顯錯誤定位在 2.4 米高度，可能在躺下後抬腿時呈現追蹤器無法超過頭顯的高度，<br />
因為 SteamVR 預設的天花板高度為 2.4 米，而追蹤點無法穿過天花板。

- 提前重置 vr 頭顯的角度<br />
按住 '右手控制器 home 鍵' 讓 VR 頭顯重置系統方向，<br />
這會讓 steamvr 虛擬地平線箭頭重置到你視線的前方，在意外丟失方向後可以利用該功能重新對正座標系。

- 打開遊戲後彈出提示<br />
隨意選擇背景中的一個社群配置，<br />
激活後在下一次啟動就不會出現了。

## 無法連接 SteamVR
檢查以下內容：

<strong> 1 - 在開啟 SteamVR 的狀態點擊校準。</strong><br />
不啟動 SteamVR，rebocap 無法知道系統裡是否有 VR。

<strong> 2 - 查看 SteamVR 驅動程式。</strong><br />
打開 rebocap 的 [日誌視窗] 記錄，每次開啟 rebocap 時會自動檢查。
如有需要，可以在 [配置] 頁面中強制安裝。

<strong> 3 - 檢查 SteamVR 的附加元件。</strong><br />
如果 Steamvr 出現意外崩潰，往往會強制關閉所有附加元件。<br />
重新開啟 rebocap 的載入後需要重啟 SteamVR。






## SteamVR 追蹤點的顯示和隱藏




<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![steamvr_windows](/img/steamvr_guide/v01_off_1-cnt.png)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong> 追蹤點的顯示和隱藏</strong><br />
 在軟體 [ 配置 SteamVR 輸出節點 ] 裡控制追蹤點的顯示和隱藏，<br />
 無需在 SteamVR 的管理選單中操作。<br />

 <details className="plain-details"><summary>註</summary>
追蹤器不是直連 SteamVR，物理追蹤器操縱骨架系統，從骨架系統上創建對應的追蹤點輸入到 SteamVR 中，<br />
也就是說沒有對應的追蹤器，依然可以向 SteamVR 提供追蹤點。

</details>


</div>
</div>

## 設定了追蹤點的部位但遊戲無法識別到腳和腰

- 一些遊戲使用 openVR 環境來識別追蹤，但目前 rebocap Release 所帶的驅動程式會處於無法識別的 BUG，即便 steamvr 中修改了對應的設定也無法識別。


該 BUG 等待工作組後續修復。
