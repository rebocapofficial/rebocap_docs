---
sidebar_position: 2
title: "Blender 插件下載"
---

# Blender 插件下載

點擊下邊鏈接可直接下載：
- **Blender Plugin Beta 9**
<a href="/img/files/rebocap_blender_plugin_v9.zip" target="_blank" download="rebocap_blender_plugin_v9.zip">blender with python 3.6~3.12</a>
> 更新說明：
> -相容於 Blender 4.4 及以上版本
> -修復 rebocap 插件進程殘留 bug
> -修復骨架導出 BUG，解決實時驅動情況下腳底不穩定的問題。
> -支持所有 Python 3 的版本，例如可以支持 Blender 4.1
> -支持 Mixamo 骨架直接，可以自動綁定
> -修復 FBX 模型驅動的 bug
> -修復動畫錄製軸向 bug
> -增加骨骼吸附選取功能


# Blender 教程视频
注意：视频没有声音！

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/for_blender_install/blender_usage.mp4" type="video/mp4" />
</video>
</div>

# Blender 插件安裝

安裝步驟：
依次打開  `Edit->Preference`，彈出面板選擇 `Add-ons`，右邊點擊 `Install` 選擇剛剛下載的  `rebocap_blender_plugin.zip`，然後點擊 Install Add-on安裝。安裝完成以後，需要勾選生效，如圖輸入 rebocap，然後勾選上插件就安裝成功了。

<div align="center">
    <img src="/img/for_blender_install/blender_1.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_2.png" alt="pic_right" width="45%" />
</div>

安裝成功以後，右側應該會出現對應的插件菜單，如圖。
    > 注意，如果沒看到菜單，有一個小的指向左側的展開箭頭點一下就能看到了。

<div align="center">
    <img src="/img/for_blender_install/blender_3.png" alt="pic_left" width="25%" />
</div>

:::info 安裝失敗怎麼處理


如果部分用戶安裝失敗，請找到 Blender 插件原始安裝位置，將 `rebocap_blender_plugin.zip` 直接解壓到 blender 安裝目錄即可。插件默認安裝位置 `C:\Users\<your_username>\AppData\Roaming\Blender Foundation\Blender\<version_number>\scripts\addons`，其中`your_username`是您的用戶名，`version_number`是您安裝的Blender的版本號。

:::


![Blender安裝位置示意圖](/img/for_blender_install/blender_23.png)


# 骨骼綁定
1. VRM 骨骼自动绑定
2. FBX 如果使用 Mixamo 骨骼规范，采用 direct 模式可以自动绑定，即 direct 模式下，可以驱动所有 Mixamo 的 avatar。
  > 但是脚底的12个固定点位需要手动选择（如果对脚底效果要求不高，可以忽略）。

:::danger 提醒！！！


必須在rebocap客戶端打開以後，並且動作校準以後再點擊 `connect`，否則可能需要重啟 blender 才能繼續實時動作捕捉。

綁定的人物骨骼是驅動的 hip 節點，如果 hip 節點不是根骨個，或者無法移動 hip 節點（部分骨架強行將 hip 和 root 關聯，並且hip的local位移無法改變），那麼可能人物的屁股始終在原地。

:::


Tips：fbx 縮放到 米 為單位請參考下圖位置，將 `scale` 修改為 0.01
<div align="center">
    <img src="/img/for_blender_install/fbx_change_meter.png" alt="pic_left" width="25%" />
</div>

### 打開開發者模式
依次打開 `Edit->Preference`，選擇左側的 `Interface`，然後勾選 `Developer Extras`

<div align="center">
    <img src="/img/for_blender_install/blender_4.png" alt="pic_left" width="45%" />
</div>

### 導入人物

以下以 `VRM` 格式人物為例，VRM 插件下載地址 [請看這裡](https://github.com/saturday06/VRM-Addon-for-Blender/releases/download/2_20_24/VRM_Addon_for_Blender-2_20_24.zip)

FBX 格式人物推薦使用 [`better fbx`](https://blendermarket.com/products/better-fbx-importer--exporter) 插件導入。

<div align="center">
    <img src="/img/for_blender_install/blender_5.png" alt="pic_left" width="45%" />
</div>

### 插件中選擇目標人物

導入以後，我們打開 `REBOCAP_CONNECTION`，選中右側 `Armature`【不選中不會出現 `Drive Type`選擇項】，然後在`REBOCAP_CONNECTION`菜單中選擇 `retarget`，然後`Source`選擇這個人物，可以直接把 `Armature` 拖拉進 `Source` 框中。

<div align="center">
    <img src="/img/for_blender_install/blender_6.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_7.png" alt="pic_left" width="45%" />
</div>

Source選擇以後，會出現以下菜單:

<div align="center">
    <img src="/img/for_blender_install/blender_8.png" alt="pic_left" width="45%" />
</div>

### 骨骼綁定

其中每根骨骼需要選擇目標人物身上對應的骨骼。【這裡只有英文部分，如不清楚，請自行翻譯】

Pelvis是屁股，Spine是屁股上邊的一節骨骼，Chest有兩節，部分人物Chest只有一節，那麼綁定其中一節即可【任意一節都行】，如果目標人物有兩根骨骼，選擇靠近Chest的那根骨骼。Leg 的 四根骨骼都必須要綁定，Toe是可選項。

對於VRM格式人物，導入以後可以直接點擊 Auto Detect，會自動填充的，其它格式需要用戶自行查找骨骼對應名稱然後選擇即可。

<div align="center">
    <img src="/img/for_blender_install/blender_9.png" alt="pic_left" width="80%" />
</div>

### 獲取鞋底的頂點 ID

這一步比較麻煩一些，對效果無過分追求的可以忽略，主要是獲取鞋底的邊界，這樣子人物走動會沿著邊界走，但是如果鞋子太大，容易導致雙腳切換時發生上下震動現象。

1. 第一步是打開開發者模式，這個在文檔開頭已經提到了。

2. 調節為Object Mode，然後取消Bone選擇，鼠標點擊到人物的腳上選擇Mesh。

    <div align="center">
    <img src="/img/for_blender_install/blender_10.png" alt="pic_left" width="80%" />
    </div>
    <div align="center">
    <img src="/img/for_blender_install/blender_11.png" alt="pic_left" width="80%" />
    </div>

3. 點擊選擇人物，一定要看到鞋子部分被選中了，然後切換成EditMode。

    <div align="center">
    <img src="/img/for_blender_install/blender_12.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_13.png" alt="pic_left" width="45%" />
    </div>
    <div align="center">
    <img src="/img/for_blender_install/blender_14.png" alt="pic_left" width="80%" />
    </div>

4. 打開Indices，這個在Blender3.6和Blender4.0中有所不同

    <div align="center">
    <img src="/img/for_blender_install/blender_15.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_16.png" alt="pic_left" width="45%" />
    </div>

5. 選擇頂點，並記錄對應的數值。

    總共需要記錄12個頂點，每隻腳的前腳掌 左中右，  腳後跟的左中右。注意，這個是人物自身的左右方向，查找的時候可以把人物背部朝向自己容易辨認一些。

    在選擇點位期間，由於是需要選擇 Mesh，因此選擇期間是看不到右側的菜單的。需要自行記錄下來，順序是  前腳掌 左中右，  腳後跟的左中右。

    這裡提一下Blender的基本操作
    > shift+鼠標滾輪按下去 是拖動
   > 
    > ctrl+鼠標滾輪按下去是  縮放操作
   > 
    > 鼠標滾輪按下去是 改變視角

6. 記錄完成以後，從 `Edit` 模式切換回 `Object` 模式，選中 `Armature`，然後填充上腳的ID即可。

    <div align="center">
    <img src="/img/for_blender_install/blender_21.png" alt="pic_left" width="80%" />
    </div>

#### 獲取鞋底的頂點 ID 綁定舉例說明
比如，下邊這個人物的左邊前腳掌三個分別是：
8863   8860   8862

 <div align="center">
 <img src="/img/for_blender_install/blender_17.png" alt="pic_left" width="60%" />
 </div>
 <div align="center">
 <img src="/img/for_blender_install/blender_18.png" alt="pic_left" width="32%" />
 <img src="/img/for_blender_install/blender_19.png" alt="pic_left" width="32%" />
 <img src="/img/for_blender_install/blender_20.png" alt="pic_left" width="32%" />
 </div>


<a id="skeleton_export"></a>

# 骨架導出
關鍵骨骼都綁定以後，會出現 save bone按鈕，點擊導出後選擇位置保存即可。

 <div align="center">
 <img src="/img/for_blender_install/blender_22.png" alt="pic_left" width="60%" />
 </div>

然後在Rebocap中導入，[請查看這裡](../ui_help_doc/control/skeleton_setting#skeleton_import)



<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>