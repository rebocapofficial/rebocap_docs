---
sidebar_position: 3
title: "UE 插件下載"
---
# UE 插件下載

以下是下載連結，UE查看源代碼開發，可自行編譯，目前插件只適用於 `UE5` 版本。

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin.zip">ue plugin source</a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_51_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_52.zip">ue 5.1 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_52_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_52.zip">ue 5.2 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_53_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_53.zip">ue 5.3 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_54_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_54.zip">ue 5.4 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_55_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_55.zip">ue 5.5 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_56_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_56.zip">ue 5.6 plugin prebuild </a>

# UE 使用說明

1. **在UE中新建工程**

   藍圖或者c++工程均可，如果需要二次開發插件，需要建立`c++`項目，導入人物（人物的默認姿態必須是`T-Pose`，不可是`A-Pose`，否則手臂表現將會異常），然後打開工程所在文件夾，新建文件夾 `Plugins 文件夾`，然後將`rebocap_unreal_engine_plugin`放入到`Plugins`中，例如新建 `testV3`工程，那麼整體目錄結構如下：

    <div align="center">
    <img src="/img/ue_plugin/ue1.png" alt="pic_left" width="80%" />
    </div>

2. **重新打開UE將會自動編譯【釋放的是源碼，因此應該兼容所有版本】**

    > 二次開發和調試插件時，可以使用Rider直接打開 `[name].uproject` 即可開發和輕鬆調試。
    > 
    > 可以使用Rider編譯，查看編譯錯誤。如果使用UE自動編譯，出現錯誤請查看`Saved/Logs/[name].Log`，`UE`輸出的`Log`一般會存在中文編碼問題，可能需要調節系統編碼為`UTF-8`才能正常查看。

3. **骨骼綁定步驟**

    - 點擊人物資產 骨骼網格體 【英文版本是: `Skeleton Mesh`】，右鍵新建動畫藍圖，雙擊編輯動畫藍圖。【不清楚的地方建議結合視頻觀看】
    - 右鍵搜索 `Rebocap`，選擇 `Rebocap Body Pose`並創建節點，並將節點的右側小人連接到輸出姿態的`Result`中
    - 在藍圖編輯頁面左下角的變量這裡點擊加號新建變量，變量類型需要搜索，搜索 `Rebocap`，選擇 `RebocapMapData`，類引用，然後將變量拖入到藍圖中剛剛創建的節點 `RetargetAsset` 中，會自動產生一個變量節點。然後點擊左上角的 編譯按鈕
    - 單擊剛剛新建的變量節點，然後在右側的默認值中，點擊加號，新建一個`Map`資產，會自動跳轉到一個新的頁面，在新的頁面中，需要用戶自行填寫骨骼映射。注意，建議24個節點都填寫，大家可以根據`Avatar`的骨骼名稱，來進行填寫。
         > 骨骼名稱可以在藍圖頁面點擊上方一欄中第一個淺藍色的骨架小人，可以自動選擇骨骼，查看每個骨骼對應的點位。`Rebocap`中24個節點的點位就是標準的人體骨骼點位，這裡`Rebocap`中骨骼的名稱是以骨骼骨頭起點命名。比如`VRM`中，命名為 `LeftUpperLeg`的骨頭，起點是屁股那裡，所以在`Rebocap`中的命名就是`L_Hip`，`LeftFoot`的起點是腳踝，所以對應的命名是`L_Ankle`，`Rebocap`中`L_Foot`對應的是腳趾那裡。在UE的命名體系中一般稱為 `ball`。
         >
      > `L Collar` 左肩的骨骼
      > 
      > `L Shoulder` 左邊上臂的骨骼
      > 
      > `L Elbow`  左邊下臂的骨骼
      > 
      > `L Wrist` 左手手掌的骨骼
      > 
      > `L Hand` 左手中指的骨骼【不會驅動】
      > 
      > 如果骨骼較多，可以選擇適當的骨骼進行映射，比如脊柱如果有6根，那麼可以錯開挑選其中的三根。
      
   - 回到剛剛的藍圖頁面（已經選好的骨骼映射需要保存並且編譯才會生效），選擇變量節點的值為剛剛新建的 `Map` 資產。
   - 再次編譯，查看`Warning`，一般`Warning`只會有3個，如果某個骨骼`map`填寫錯誤，會報`warning`提示某根骨骼沒有找到
   - 關閉動畫藍圖編輯窗口，點擊頂部 `窗口->虛擬製片->Live Link`，然後選擇 `源->Rebocap Source->conn`  【`port`是端口號，如果`Rebocap`中的廣播端口號改了這裡需要修改】，如果`Rebocap`客戶端打開，`connect`是 `ok` 狀態，否則是 `bad` 狀態。另外，使用者只有進行動作校準以後才會開始廣播數據。
   
    <div align="center">
    <img src="/img/ue_plugin/ue2.png" alt="pic_left" width="80%" />
    <img src="/img/ue_plugin/ue3.png" alt="pic_left" width="80%" />
    </div>

4. **代碼說明**

   主要動作控制相關代碼在`Source\rebocap\Private\rebocap_pose_node.cpp`中，其它屬於周邊相關代碼例如`dll`調用和`livelink`。其中，`Init_Foot_Vertices_And_SkeletalData` 函數用於獲取人物的默認骨架位置以及 `vert` 點位，計算雙腳腳底用於地面接觸的6個點【每隻腳6個】，由於是自動計算可能不夠精確，用戶可以自行找到腳底的6個點位傳參進去可能會更精確。

   PS：腳低尺寸較大的可能會導致人物上下震盪，舉一個極端的例子，比如2米的大長腳，人物也只有2米，踮腳然後落地，如果需要保持腳尖接觸地面，肯定人物就會上下起伏。

5. **打包說明**

   - 開發者
      > 對於需要打包的開發者，可以下載最新版本的插件（以前版本打包後無法運行），在`runtime`模式下增加了`Livelink`連接管理，可以參考 `Plugins/rebocap_unreal_engine_plugin/Source/rebocap_runtime/Private/RebocapLivelinkManagerDemoWidget.cpp` 文件中 `ConnectLiveLink` 和 `DisconnectLiveLink` 方法自行實現，如果需要關閉插件自帶UI，可以修改 `Plugins/rebocap_unreal_engine_plugin/Source/rebocap_runtime/rebocap_runtime.Build.cs`，註釋掉 `USE_REBOCAP_LIVELINK_MANAGER_DEMO` 這裡的宏定義後自己編譯即可。建議將插件放入自己工程的開發者，請自行增加UI管理 `livelink` 的連接。
   - 藍圖使用者
      增加了藍圖節點用於管理 `Livelink`，節點名稱分別是：`Connect to Rebocap Livelink Source`, `Disconnect to Rebocap Livelink Source`
      <img src="/img/ue_plugin/ue4.png" alt="pic_left" width="80%" />

**注意**:
1. 如果你在 `Editor` 中使用 `livelink` 連接，可能會導致 `livelink` 通道佔用導致 `game` 模式下無法連接成功，建議重啟 `Editor` 後嘗試。
2. 對於`runtime`模式（`standalone or game mode`，也就是打包後運行)，由於暫時還沒有找到`runtime`模式下獲取 mesh 頂點的方法，因此打包以後，自動骨骼註冊不包含腳底，腳底的表現會比 `Editor` 模式下差一點點，未來會解決這個問題。

### 視頻操作演示
這裡沒有聲音，作為臨時使用，後續會更像

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/ue_plugin/ue_user_guide.mp4" type="video/mp4" />
</video>
</div>

### Meta Human（或者預設 Apose 人物）修改為 TPose（APose 轉 TPose

> 注意，A-pose 必須要和官方的一致才可以，否則建議自行手動修改角度，將 Apose 處理為 Tpose 臨時角度文件保存，具體參考下邊壓縮包內教程。

<a href="/img/files/metahuman_change_tpose.zip" target="_blank" download="ue_ht_tpose.zip">下載</a>



<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>