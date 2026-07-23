---
sidebar_position: 5
title: "新手入门与快速指南"
---

# 新手入门与快速指南

欢迎使用 Rebocap！如果您是第一次收到并使用 Rebocap 追踪器，建议根据您所购买的设备套装选择对应的全流程开箱使用教程。

---

## 🚀 1. 按套装快速开始

请根据您持有的设备套装选择对应的教程，教程将包含包裹检查、绑带佩戴、软件与固件更新、设备校准及进入 SteamVR 的完整流程：

<div style="display: flex; gap: 16px; flex-wrap: wrap; margin: 20px 0;">
  <a href="/zh-Hans/docs/rebocap-tutorials/6-set-unboxing" style="flex: 1; min-width: 260px; padding: 16px 20px; border: 1px solid var(--ifm-color-primary-light); border-radius: 8px; text-decoration: none; background-color: var(--ifm-card-background-color, #f8f9fa);">
    <h3 style="margin: 0 0 8px 0; color: var(--ifm-color-primary);">📦 6 点套装开箱到使用</h3>
    <p style="margin: 0; font-size: 0.9em; color: var(--ifm-font-color-base);">包含：包裹检查、绑带佩戴、软件固件、陀螺仪与磁场校准、进入 SteamVR 等完整步骤。</p>
  </a>

  <a href="/zh-Hans/docs/rebocap-tutorials/15-set-unboxing" style="flex: 1; min-width: 260px; padding: 16px 20px; border: 1px solid var(--ifm-color-primary-light); border-radius: 8px; text-decoration: none; background-color: var(--ifm-card-background-color, #f8f9fa);">
    <h3 style="margin: 0 0 8px 0; color: var(--ifm-color-primary);">📦 15 点套装开箱到使用</h3>
    <p style="margin: 0; font-size: 0.9em; color: var(--ifm-font-color-base);">包含：快拆与宽绑带安装、全身体位佩戴、软件固件、校准图鉴及深度设置。</p>
  </a>
</div>

---

## ⚠️ 2. 核心注意事项（磁场校准）

- 磁场校准是保证空间追踪精度的核心关键步骤。建议在**首次充电完成后**，或**更换使用房间环境后**及时进行磁场校准。
- 详细校准操作与注意事项请参阅：👉 **[磁场环境 QA / 磁场校准图鉴](../QA/magnet)**

:::danger 磁场校准注意事项
- 磁场校准必须熟练掌握，注意事项非常重要。若未按照规范操作，可能会导致校准结果偏差。
- 磁场校准可以随时反复重新校准，若遇到姿态漂移可优先尝试重新磁校准。
:::

---

## 🎮 3. 外部软件与游戏连接

完成基础校准后，您可以将动作数据输出至以下软件与游戏：

- **SteamVR / VRChat**：请查阅全新编制的 👉 **[SteamVR 操作指南](../rebocap-tutorials/steamvr_guide)**（包含 SteamVR 边界配置、节点显示与隐藏、常见连接排查）。
- **3D 动画与第三方插件**：如需接入 Blender、Unity、UE 或 Vtuber 软件，请查看 👉 **[直连插件与应用接入](../plugins/plugins)**。

---

## 📺 4. 视频教程与社区支持

视频教程为辅助学习选项，文字版教程包含更详细的问题排查与细节说明。

:::info 首次使用视频教程
以下是与社区成员合作创建的首次使用教程视频，建议打开声音完整观看一遍后再上手操作：

[首次使用教程视频 (Bilibili)](https://www.bilibili.com/video/BV1vb66Y2EeD)
<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=113758953276032&bvid=BV1vb66Y2EeD&cid=27665304028&p=1&autoplay=0&muted=0&danmaku=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 100%; height: 400px; margin-top: 10px;"></iframe>
:::

:::danger 常见排查与效果优化提示
如果需要获得更好的动作捕捉效果或遇到使用疑问，请确保阅读文字版详细教程：
- 脚底追踪器的穿戴方向与松紧度对接地防滑影响很大；
- 强磁干扰环境下建议了解是否需要开启抗磁；
- 未穿戴足部追踪器时，可了解是否需要打开 AI 引擎自动预测姿态；
- 更多疑难解答可随时到 [社区提问与交流](../README#community)。
:::

---

### 📂 单项教程快速回顾
如需单独查阅特定基础模块，可访问以下单项说明：
- [硬件与配件检查](hardware_check)
- [绑带使用与佩戴介绍](instroction_for_straps)
- [软件下载与安装说明](software_install)
- [基础连接指南](connect_and_use)