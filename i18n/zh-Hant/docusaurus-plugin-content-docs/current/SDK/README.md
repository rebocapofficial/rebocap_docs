---
sidebar_position: 1
title: "SDK 接口說明"
---
<span id="sdk-接口說明" class="legacy-anchor-alias" aria-hidden="true"></span>

# SDK 接口說明
目前 DLL 對外提供 8 個介面，各個 SDK 是對 DLL 介面的封裝，具體請查看 cpp sdk 中的 `include/rebocap_ws_sdk/rebocap_ws_sdk.h` 標頭檔。

SDK 輸出的數值類型為四元數，可以支持多種坐標空間輸出【默認的 opengl右手坐標系、blender、unity、ue】，輸出的位移單位是 米。

其中python暫未接入 `rebocap_ws_sdk_calculate_foot_vertex` 接口

### 接口說明

* rebocap_ws_sdk_new
```cpp
    創建 sdk 實例，傳入參數包括
    1. 坐標系空間，具體支持空間可在各個sdk中找到，這裡不贅述。
    2. 是否使用全局坐標系，傳入0則使用局部坐標系，局部坐標系是相對於父骨骼的坐標系，所有的旋轉均是相對於 tpose 的旋轉，如對旋轉不清楚，可參考 blender、unity、以及ue的源碼，其中unity的旋轉相對更容易理解。
    
    返回值：
    返回 sdk 對象實例指針
```

* rebocap_ws_sdk_release
```
釋放 sdk 實例對象，傳輸參數為 實例指針
```
* rebocap_ws_sdk_open
```
開啟websocket client，連接到 websocket 端口，具體用法和返回值說明請查看 sdk 代碼
```
* rebocap_ws_sdk_close
```
關閉websocket client，並斷開連接，具體用法見sdk
```
* rebocap_ws_sdk_set_pose_msg_callback
```
註冊消息回調，這裡只有用戶進行動作校準以後，websocket才會有數據吐出，幀率為 60幀每秒，具體用法見 sdk 代碼
關節順序請參考24個骨骼名稱
```
* rebocap_ws_sdk_set_exception_close_callback
```
websocket 異常關閉回調註冊，具體用法見 sdk 代碼
```
* rebocap_ws_sdk_get_last_msg
```
除了回調的形式，這裡也可以直接獲取最後一條動作消息，數據格式和回調保持一致。
```
* rebocap_ws_sdk_calculate_foot_vertex
```
    這個接口主要用於註冊腳底的接觸點以及身體骨架到rebocap中
    需要傳入身體骨架數據（各個關節點的位置，具體順序和smpl順序保持一致）
    如果需要dll自動計算接觸點位置，那麼需要傳入腳底mesh，也可以自行傳入腳底接觸點位置信息（每隻腳前後3個點位，共計12個點位），那麼dll將不會自動計算而是採用傳入數值
    注意，這裡的單位是米，坐標是全局坐標，另外需要採用 opengl 坐標系，如果不是需要傳入轉換參數，具體用法請參考 unity demo 以及 ue 插件的使用
    
    這個接口相對比較複雜，請具備足夠開發能力或者能夠完全理解 unity demo中的代碼或者能夠完全理解 UE 插件代碼用戶使用，python版本不暴露這個接口，如有需要，可以自行從 cpp sdk 中或者原始 dll 中，封裝 python 接口即可。
    
    大部分用戶，開發插件可以自行上傳 vrm 模型到 rebocap 客戶端中，效果一樣。對於腳底接觸點位的理解，可以參考 blender 接入中，導出骨架的說明。
```

### 24個骨骼名稱
對應 mixamo 和 smpl 規範名稱如下，共計24個骨骼，參考如下，比如第0號下標骨骼即為屁股，也就是對應腰部節點。
其中，左右腳趾、左右手指對應的關節由於沒有對應跟蹤器節點，因此輸出 local 旋轉為0，如果採用 global 旋轉，那麼輸出的旋轉值和父節點保持一致。

- mixamo對應的名稱
```python
joints_mixamo = [
        "mixamorig:Hips",
        "mixamorig:LeftUpLeg",
        "mixamorig:RightUpLeg",
        "mixamorig:Spine",
        "mixamorig:LeftLeg",
        "mixamorig:RightLeg",
        "mixamorig:Spine1",
        "mixamorig:LeftFoot",
        "mixamorig:RightFoot",
        "mixamorig:Spine2",
        "mixamorig:LeftToeBase",
        "mixamorig:RightToeBase",
        "mixamorig:Neck",
        "mixamorig:LeftShoulder",
        "mixamorig:RightShoulder",
        "mixamorig:Head",
        "mixamorig:LeftArm",
        "mixamorig:RightArm",
        "mixamorig:LeftForeArm",
        "mixamorig:RightForeArm",
        "mixamorig:LeftHand",
        "mixamorig:RightHand",
        "mixamorig:LeftHandIndex1",
        "mixamorig:RightHandIndex1"
]
```
- smpl 規範對應的名稱為
```python
joints_smpl = [
    "Pelvis",
    "L_Hip",
    "R_Hip",
    "Spine1",
    "L_Knee",
    "R_Knee",
    "Spine2",
    "L_Ankle",
    "R_Ankle",
    "Spine3",
    "L_Foot",
    "R_Foot",
    "Neck",
    "L_Collar",
    "R_Collar",
    "Head",
    "L_Shoulder",
    "R_Shoulder",
    "L_Elbow",
    "R_Elbow",
    "L_Wrist",
    "R_Wrist",
    "L_Hand",
    "R_Hand"
]
```

<span id="sdk-下載" class="legacy-anchor-alias" aria-hidden="true"></span>

# SDK 下載

## Windows

### python SDK
> 64 位元 CPython 3.6～3.14 · 需安裝 Microsoft Visual C++ 2015–2022 x64 執行階段

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="https://doc.rebocap.com/img/files/Rebocap_Windows_x64_Python_v3.zip" download="Rebocap_Windows_x64_Python_v3.zip">
<span class="os-switch-download-main">下載 Python SDK v3</span>
<span class="os-switch-download-meta">Python 3.6 – 3.14 · x64</span>
<span class="os-switch-download-date">更新時間：2026.11.18</span>
</a>
</div>

<details class="plain-details sdk-history"><summary>歷史版本</summary>
<div style="margin-top: 10px;">
<p><strong>Python SDK v2</strong>（兼容 python3.6~python3.12）：<a href="https://doc.rebocap.com/img/files/rebocap_ws_sdk_python_v2.zip" download="rebocap_python_sdk_v2.zip">下載</a></p>
<p>修復 <code>get_last_msg</code> 介面造成的死鎖問題；增加所有 python 版本</p>
</div>
</details>

### C# SDK
> Windows x64 · .NET Framework 4.8 範例 · 需安裝 Microsoft Visual C++ 2015–2022 x64 執行階段

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="https://doc.rebocap.com/img/files/Rebocap_Windows_x64_CSharp_v3.zip" download="Rebocap_Windows_x64_CSharp_v3.zip">
<span class="os-switch-download-main">下載 C# SDK v3</span>
<span class="os-switch-download-meta">C# · .NET Framework 4.8</span>
<span class="os-switch-download-date">更新時間：2026.11.18</span>
</a>
</div>

<details class="plain-details sdk-history"><summary>歷史版本</summary>
<div style="margin-top: 10px;">
<p><strong>C# SDK v2</strong>（含 Unity 範例）：<a href="https://doc.rebocap.com/img/files/csharp_sdk_with_demo_v2.zip" download="rebocap_csharp_sdk_v2.zip">下載</a></p>
<p>修復 <code>get_last_msg</code> 介面造成的死鎖問題</p>
</div>
</details>

### CPP SDK
> Windows x64 · C++17 · 需安裝 Microsoft Visual C++ 2015–2022 x64 執行階段

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="https://doc.rebocap.com/img/files/Rebocap_Windows_x64_CPP_v3.zip" download="Rebocap_Windows_x64_CPP_v3.zip">
<span class="os-switch-download-main">下載 CPP SDK v3</span>
<span class="os-switch-download-meta">C++ · C++17 · x64</span>
<span class="os-switch-download-date">更新時間：2026.11.18</span>
</a>
</div>

## Linux

### Python SDK（Linux）
> Linux x86-64 · CPython 3.6～3.14 · 基於 Ubuntu 22.04 建置，需 GLIBC 2.34+ 與 GLIBCXX 3.4.29+

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="https://doc.rebocap.com/img/files/Rebocap_Linux_x86_64_Python.tar.gz" download="Rebocap_Linux_x86_64_Python.tar.gz">
<span class="os-switch-download-main">下載 Linux Python SDK</span>
<span class="os-switch-download-meta">Python 3.6 – 3.14 · Ubuntu 22.04+</span>
<span class="os-switch-download-date">更新時間：2026.11.18</span>
</a>
</div>

### CPP SDK（Linux）
> Linux x86-64 · C++17 · 基於 Ubuntu 22.04 建置，需 GLIBC 2.34+ 與 GLIBCXX 3.4.29+

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="https://doc.rebocap.com/img/files/Rebocap_Linux_x86_64_CPP.tar.gz" download="Rebocap_Linux_x86_64_CPP.tar.gz">
<span class="os-switch-download-main">下載 Linux CPP SDK</span>
<span class="os-switch-download-meta">C++ · C++17 · Ubuntu 22.04+</span>
<span class="os-switch-download-date">更新時間：2026.11.18</span>
</a>
</div>

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
