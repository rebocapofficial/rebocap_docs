---
sidebar_position: 2
title: "VRChat 基本設定"
---

**閱讀本教程之前，請務必[仔細閱讀 SteamVR 的接入](README)！！！如果steamVR上 rebocap 的跟踪器圖標都沒有點亮過，本教程沒有任何意義！！！**

# VRChat 基本設定

### vrchat 基礎設定介紹
打開基礎設定請按照下述步驟： 按手柄的 Y 按鈕召喚菜單->點擊齒輪圖標->往下滑動到 `Tracking & IK`，如圖所示
<div align="center">
 <img src="/img/vrchat_setting1.png" alt="left" width="49.5%" />
 <img src="/img/vrchat_simple_setting.png" alt="left" width="45%" />
 </div>

基礎 IK 設定介紹關鍵點介紹：
1. 調節 VRChat 中的身高

    > 使用者真實身高，這裡填寫和 Rebocap 中測量一致的身高即可，而不應該填寫你的真實身高！因為所有的跟踪器都是按照 Rebocap 測量的高度來模擬的
    > 
    > Rebocap 測量身高是頭顯身高 * 1.05，關於身高測量錯誤[請查看這裡](../../ui_help_doc/control/connect#vr_pannel)。
    > 
    > 如果你的頭顯測量的高度始終和自身不一致（指的是超過自身身高±5cm），那麼可以關閉[VR面板](../../ui_help_doc/control/connect#vr_pannel)中的自動身高測量，在骨架頁面調節身高即可。以最終顯示的高度為準！然後在VRChat中，將身高設置為 Rebocap 中最終顯示的身高。
    > **注意，這個解決方案並不是最好的**，因為如果頭顯本身測量身高不對，那麼頭顯在空間中的位移量也是不正確的，比如頭顯真實向下移動一米，可能頭顯給出的移動數據只有0.6米，導致最終跟踪效果變差！

查看 Rebocap 測量身高方法：打開日誌即可看到歷史消息（如果你關閉自動身高，這裡將不會顯示！）
<div align="center">
 <img src="/img/rebocap_vr_height.png" alt="left" width="30%" />
 </div>

2. 調節 VRChat 測量模式

    > 剛使用VRChat全身動捕的使用者，統一使用 `Height` 模式！對 VRChat IK 熟悉的使用者，可以考慮使用 Arm 模式，配合 Arm

3. 是否允許全身追蹤

    > 必須允許，如圖中狀態是開啟

4. IK 鎖定模式
  > 這個可以自行調節查看不同效果，如果不清楚，可以使用 LockHip 或者 LockHead，效果會有比較大的出入，特別是在坐下或者躺下的姿態會存在出入

### vrchat 高級 IK 設定介紹
打開基礎設定請按照以下步驟： 按手柄的 Y 按鈕召喚菜單->點擊world，出現大的設定面板->點擊齒輪圖標->選擇左側 `Tracking & IK`，如圖所示
<div align="center">
 <img src="/img/vrchat_advanced_setting.png" alt="left" width="24%" />
 <img src="/img/vrchat_advanced_setting2.png" alt="left" width="24%" />
 <img src="/img/vrchat_advanced_setting3.png" alt="left" width="24%" />
 <img src="/img/vrchat_advanced_setting4.png" alt="left" width="24%" />
 </div>

特別說明：剛使用VRChat全身動捕的使用者，除了圖中標註的，其它全部使用默認設定！！！可以參考截圖

圖中標註的4個設定介紹：
1. 是否使用傳統 IK 開關！
    > 不建議開啟，默認使用 IK 2.0，使用傳統 IK 會帶來其它問題，比如腰部下陷到屁股中
2. 手臂身高比例
    > **只有設定 測量模式 為 Arm，這裡的選項才會有效**！用於熟悉 VRChat IK 使用者使用，不熟悉不建議使用，如果使用有問題，可以和其它使用者交流，官方不在這個點上做任何技術支持！
    > 
    > 一般情況下，設定為Arm模式，可以調節這裡的比例，讓腿部表現更自然，具體方法是，打開 VRChat 中的校準模式，看到跟踪器點位以後，通過比例，讓腳上跟踪器的點位在腳背附近即可。


:::danger 提示


如果使用者發現點位少了，很可能是陷入到地板下邊了！可以抬腳看下！

:::


3. 是否顯示追蹤器校準範圍
    > 也就是那個綠色的範圍球

4. 切換追蹤器顯示模型
    > 如果需要切換為十字架，按照圖中設置的 `axis` 即可，可以自行切換查看

<a id="calibration_in_vrc"></a>

### 如何在VRChat中進行校準
前述基礎設置完成後，按照如下流程：
1. 按左手柄Y按鈕打開設置面板
2. 點擊面板中的小人圖標（前提是 steamVR 中虛擬追蹤器已經被激活了，否則這裡的圖標和下圖不一致，不清楚請查看 [SteamVR接入](README)）
    > ![全身校準按鈕](/img/vrchat_calibrate.png)
3. 調節站姿，擺出Tpose，讓腳背的追蹤器點位在腳背附近，如果打開了綠色的範圍球，讓範圍球儘量小點（對IK非常熟悉的使用者，可以自行調節）
    > 如果發現腳背在地板下邊，這個往往是 VRChat 的Bug導致，VRChat對地面識別存在問題，比如你將手柄放置在現實中的地板，VRChat中手柄的位置可能在地板下邊（如果懸空也是同理）。
    > 
    > 目前沒有很好的辦法解決，可以重啟VRChat，也可以校準以後，使用 `ovr advanced setting` 調節地面高度，一定要在動作校準以後再調節！！！
4. 保持T-pose，如果全身對齊了，兩隻手同時扣下扳機按鍵（扳機按鍵指的是食指常駐區域按鍵），即可完成 VRChat 中的校準！

  <div>
  <video id="video" controls preload="metadata" width="100%">
        <source id="mp4" src="/img/vrc_calibrate.mp4" type="video/mp4" />
  </video>
  </div>


# VRChat 遇到問題診斷步驟
> 非細節問題，細節問題一般特指：腿在某個狀態下無法伸直等，這些和VRC以及骨架設置相關性比較高。後續會補充說明。
> 
> 這裡主要解決歪了，或者整體錯亂問題。
> 
> 細節問題以後會給出一些文檔說明，目前可以諮詢資深群友

- 查看3D預覽界面是否正常
- 查看SteamVR預設界面中的追蹤器是否正常
    > 具體[請查看這裡](README#how_to_solve_tracker_slant)
- 檢查 VRC 關鍵設置是否和上述教程一致

### 為什麼VRC中人物手臂無法伸直
- 和模型骨架與自身骨架不匹配導致，如果模型骨架的手臂偏短，就比較容易伸直，核心是骨骼比例和現實人物不一致導致。
  > 高級玩家可以自行嘗試使用 Arm 模式，然後修改 `arm vs height ratio`。
  > 
  > 這裡舉個極端例子方便玩家理解，比如虛擬人物的手臂有3米，人物本身的高度只有1.7米，現實中人物雙臂正常下垂的位置在腰這裡，但是 VRChat 必須要尊重現實中手部的位置，那麼只能將虛擬人物的手臂彎曲一定的角度了。

### 為什麼我校準的時候，人物的雙腳在地板下邊
> 這裡在 [如何在VRChat中進行校準](#calibration_in_vrc) 的第三點已經有說明

### 為什麼我的雙腿無法伸直
> 這裡和虛擬人物骨骼比例和現實中出入比較大有關，一般使用和自身一致的人物骨架，然後在rebocap中也調節為這個骨架效果最好。
> 
> 另外，也可以使用一點校準的小技巧緩解這個問題，比如將 VRChat 中的身高設置比rebocap中測量的低一點點，腿在坐姿模式下更容易伸直。
> 
> 這裡針對的是非跳舞使用者，跳舞使用者，依然建議按照 rebocap 測量身高設置。

### 為什麼坐下以後雙腳會交叉
1. 排除褲襠拉扯影響
2. 更改大腿追蹤器位置，查看不同位置的效果
3. 如果仍有問題，請[調節補償](../../ui_help_doc/control/cap_param#up_leg_com)（優先調節大腿補償），根據3D預覽中效果調節即可！
4. 動作校準期間，雙腳間距離更近一些
5. 在 VRChat 校準期間，雙腳間距離更近一點

關於1、2兩個點，具體描述請仔細[閱讀教程部分](../../tutorial/instroction_for_straps#tracker_position_recomendation)

### 怎麼提升穩定性
1. 綁帶使用[複雜綁定方法](../../tutorial/instroction_for_straps#quick_fix_complex_install)，或者使用購買寬綁帶
2. 腳底傳感器處理比較重要，[請查看這裡](../../tutorial/instroction_for_straps#tracker_position_on_body)
3. 跳舞使用者，特別是激烈的熱舞，建議找到磁場環境相對較好，關閉抗磁模式使用



<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>