---
sidebar_position: 5
title: "Getting Started & Quick Guide"
---

# Getting Started & Quick Guide

Welcome to Rebocap! If you are receiving and using Rebocap trackers for the first time, we recommend choosing the step-by-step unboxing and setup guide corresponding to your tracker set.

---

## 🚀 1. Quick Start by Set

Please select the tutorial corresponding to your equipment set. The guides cover the complete process including package inspection, strap wearing, software & firmware updates, calibration, and connecting to SteamVR:

<div style="display: flex; gap: 16px; flex-wrap: wrap; margin: 20px 0;">
  <a href="/docs/rebocap-tutorials/6-set-unboxing" style="flex: 1; min-width: 260px; padding: 16px 20px; border: 1px solid var(--ifm-color-primary-light); border-radius: 8px; text-decoration: none; background-color: var(--ifm-card-background-color, #f8f9fa);">
    <h3 style="margin: 0 0 8px 0; color: var(--ifm-color-primary);">📦 6-Tracker Set: Unboxing to Use</h3>
    <p style="margin: 0; font-size: 0.9em; color: var(--ifm-font-color-base);">Includes package inspection, strap setup, software/firmware, gyroscope/magnetic calibration, and SteamVR setup.</p>
  </a>

  <a href="/docs/rebocap-tutorials/15-set-unboxing" style="flex: 1; min-width: 260px; padding: 16px 20px; border: 1px solid var(--ifm-color-primary-light); border-radius: 8px; text-decoration: none; background-color: var(--ifm-card-background-color, #f8f9fa);">
    <h3 style="margin: 0 0 8px 0; color: var(--ifm-color-primary);">📦 15-Tracker Set: Unboxing to Use</h3>
    <p style="margin: 0; font-size: 0.9em; color: var(--ifm-font-color-base);">Includes quick-release & wide strap installation, full-body placement, software/firmware, calibration guide, and advanced settings.</p>
  </a>
</div>

---

## ⚠️ 2. Important Notice (Magnetic Field Calibration)

- Magnetic field calibration is crucial to ensure spatial tracking accuracy. It is recommended to perform magnetic calibration **after the first charge**, or whenever you **move to a new room environment**.
- For detailed calibration instructions and precautions, see: 👉 **[Magnetic Field QA & Calibration Guide](../QA/magnet)**

:::danger Magnetic Field Calibration Precautions
- Magnetic field calibration must be mastered, and the precautions are very important. If precautions are not followed, calibration accuracy will be compromised.
- Magnetic field calibration can be performed repeatedly at any time. If you experience drift, try re-calibrating the magnetic field first.
:::

---

## 🎮 3. Connecting to External Software & Games

After completing initial calibration, you can stream motion data to external software and games:

- **SteamVR / VRChat**: Please refer to the newly created 👉 **[SteamVR Guide](../rebocap-tutorials/steamvr_guide)** (covers SteamVR boundary settings, node visibility, and connection troubleshooting).
- **3D Animation & Direct Plugins**: If connecting to Blender, Unity, UE, or Vtuber software, see 👉 **[Direct Plugins & App Integration](../plugins/plugins)**.

---

## 📺 4. Video Tutorial & Community Support

Video tutorials are supplementary options; the text documentation provides more detailed troubleshooting and explanations.

:::info First-Use Video Tutorial
Below is the first-use tutorial video created in collaboration with community members. It is recommended to turn on sound and watch it completely before operating:

[First-Use Tutorial Video (Bilibili)](https://www.bilibili.com/video/BV1vb66Y2EeD)
<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=113758953276032&bvid=BV1vb66Y2EeD&cid=27665304028&p=1&autoplay=0&muted=0&danmaku=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 100%; height: 400px; margin-top: 10px;"></iframe>
:::

:::danger Troubleshooting & Performance Tips
For optimal motion capture performance or if you encounter issues, please make sure to read the detailed text tutorial:
- Foot tracker orientation and strap tightness significantly impact floor contact and anti-slip performance;
- In environments with strong magnetic interference, check whether anti-magnetic mode needs to be enabled;
- When foot trackers are not worn, check whether to enable the AI Engine for automatic pose prediction;
- For more questions, feel free to ask in the [Community & Support](../README#community).
:::

---

### 📂 Quick Review of Individual Topics
If you need to consult specific basic modules separately:
- [Hardware & Accessories Check](hardware_check)
- [Strap Usage & Wearing Guide](instroction_for_straps)
- [Software Download & Installation](software_install)
- [Basic Connection Guide](connect_and_use)