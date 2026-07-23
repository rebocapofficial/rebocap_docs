---
sidebar_position: 5
title: "新手入門與快速指南"
---

# 新手入門與快速指南

歡迎使用 Rebocap！如果您是第一次收到並使用 Rebocap 追蹤器，建議根據您所購買的設備套裝選擇對應的全流程開箱使用教學。

---

## 🚀 1. 按套裝快速開始

請根據您持有的設備套裝選擇對應的教學，教學將包含包裹檢查、綁帶佩戴、軟體與韌體更新、設備校準及進入 SteamVR 的完整流程：

<div style="display: flex; gap: 16px; flex-wrap: wrap; margin: 20px 0;">
  <a href="/zh-Hant/docs/rebocap-tutorials/6-set-unboxing" style="flex: 1; min-width: 260px; padding: 16px 20px; border: 1px solid var(--ifm-color-primary-light); border-radius: 8px; text-decoration: none; background-color: var(--ifm-card-background-color, #f8f9fa);">
    <h3 style="margin: 0 0 8px 0; color: var(--ifm-color-primary);">📦 6 點套裝開箱到使用</h3>
    <p style="margin: 0; font-size: 0.9em; color: var(--ifm-font-color-base);">包含：包裹檢查、綁帶佩戴、軟體韌體、陀螺儀與磁場校準、進入 SteamVR 等完整步驟。</p>
  </a>

  <a href="/zh-Hant/docs/rebocap-tutorials/15-set-unboxing" style="flex: 1; min-width: 260px; padding: 16px 20px; border: 1px solid var(--ifm-color-primary-light); border-radius: 8px; text-decoration: none; background-color: var(--ifm-card-background-color, #f8f9fa);">
    <h3 style="margin: 0 0 8px 0; color: var(--ifm-color-primary);">📦 15 點套裝開箱到使用</h3>
    <p style="margin: 0; font-size: 0.9em; color: var(--ifm-font-color-base);">包含：快拆與寬綁帶安裝、全身體位佩戴、軟體韌體、校準圖鑑及深度設定。</p>
  </a>
</div>

---

## ⚠️ 2. 核心注意事項（磁場校準）

- 磁場校準是保證空間追蹤精度的核心關鍵步驟。建議在**首次充電完成後**，或**更換使用房間環境後**及時進行磁場校準。
- 詳細校準操作與注意事項請參閱：👉 **[磁場環境 QA / 磁場校準圖鑑](../QA/magnet)**

:::danger 磁場校準注意事項
- 磁場校準必須熟練掌握，注意事項非常重要。若未按照規範操作，可能會導致校準結果偏差。
- 磁場校準可以隨時反覆重新校準，若遇到姿態漂移可優先嘗試重新磁校準。
:::

---

## 🎮 3. 外部軟體與遊戲連接

完成基礎校準後，您可以將動作數據輸出至以下軟體與遊戲：

- **SteamVR / VRChat**：請查閱全新編製的 👉 **[SteamVR 操作指南](../rebocap-tutorials/steamvr_guide)**（包含 SteamVR 邊界配置、節點顯示與隱藏、常見連接排查）。
- **3D 動畫與第三方外掛程式**：如需接入 Blender、Unity、UE 或 Vtuber 軟體，請查看 👉 **[直連外掛程式與應用接入](../plugins/plugins)**。

---

## 📺 4. 影片教學與社區支援

影片教學為輔助學習選項，文字版教學包含更詳細的問題排查與細節說明。

:::info 首次使用影片教學
以下是與社區成員合作創建的首次使用教學影片，建議打開聲音完整觀看一遍後再上手操作：

[首次使用教學影片 (Bilibili)](https://www.bilibili.com/video/BV1vb66Y2EeD)
<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=113758953276032&bvid=BV1vb66Y2EeD&cid=27665304028&p=1&autoplay=0&muted=0&danmaku=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 100%; height: 400px; margin-top: 10px;"></iframe>
:::

:::danger 常見排查與效果優化提示
如果需要獲得更好的動作捕捉效果或遇到使用疑問，請確保閱讀文字版詳細教學：
- 腳底追蹤器的穿戴方向與鬆緊度對接地防滑影響很大；
- 強磁干擾環境下建議了解是否需要開啟抗磁；
- 未穿戴足部追蹤器時，可了解是否需要打開 AI 引擎自動預測姿態；
- 更多疑難解答可隨時到 [社區提問與交流](../README#community)。
:::

---

### 📂 單項教學快速回顧
如需單獨查閱特定基礎模組，可訪問以下單項說明：
- [硬體與配件檢查](hardware_check)
- [綁帶使用與佩戴介紹](instroction_for_straps)
- [軟體下載與安裝說明](software_install)
- [基礎連接指南](connect_and_use)