---
sidebar_position: 4
title: "Unity Demo 包下載"
---

# Unity Demo 包下載

Unity 插件主要面向開發者使用，開發者可以查看具體代碼二次開發，下邊是下載地址。

<a href="/img/files/rebocap_unity_sdk_v4.unitypackage" target="_blank" download="rebocap_unity_sdk_v4.unitypackage">rebocap unity sdk v4</a>

unity sdk v4 更新日誌
> 修復部分情況下動畫異常bug，支援FBX導入的骨骼

unity sdk v3 更新日誌
> 修復 il2cpp backend 模式下，無法打包以及打包後運行報錯的bug

:::info 提示：必须安装`VRM`插件: [`UniVRM`](https://github.com/vrm-c/UniVRM/releases/tag/v0.117.0)

:::


# Unity 切換 VRM 模型人物示例

rebocap_unity_sdk.unitypackage 拖拽到空的工程中，打開 `RebocapSdk` 目錄中的 DemoScene，然後拖拽新的 VRM 到場景中，將該 VRM 對象拖拽到 `Terrain` 對象下，綁定的 `Drive Demo` 腳本的 Animator 變量即可。

運行場景後，點擊 `Connect` 按鈕，會自動連接到 `Rebocap` 客戶端並自動註冊骨骼。注意，需要動作校準以後才會輸出動作。

:::info 提示


Demo 工程中人物綁定用的是VRM，走的是標準的 `Humanoid` 骨骼，原則上所有遵循 `Humanoid` 骨骼均可直接拖拽替換。

:::


### 視頻操作替換人物示例

這裡是老的客戶端版本錄屏（臨時查看使用，以後會替換），新的基本一致，點擊連接以後，檢查骨骼是否成功導入到 `Rebocap` 客戶端中。

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/unity_replace_vrm.mp4" type="video/mp4" />
</video>
</div>


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>