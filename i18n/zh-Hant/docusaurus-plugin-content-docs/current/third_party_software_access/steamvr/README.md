---
sidebar_position: 1
title: "提示"
---

# 提示
沒有閱讀教程的情況下，閱讀這個本頁面沒有任何意義，[請首先閱讀教程](../tutorial/README)！！！！

# SteamVR 接入步驟
1. 首次使用，打開軟體後請務必重啟 SteamVr，VR面板左上角綠色指示燈亮起則表示 VR 接入成功。[無法接入請看這裡](#vr_cannot_connect)
2. 至少穿戴8個點位，然後點擊動作校準，其中，校準Apose期間，頭顯必須正確佩戴【特別是快速滴滴滴響起】，具體[校準流程請參考這裡](../../tutorial/connect_and_use#pose_calibration)
    > 大腿、小腿、腰部、胸部屬於必須佩戴，腳底如果不佩戴，只能使用 [跟隨模式](../../ui_help_doc/control/connect#vr_pannel)！
3. 正常校準以後，請到 SteamVR 默認界面查看跟踪器，請務必關閉 SteamVR Home，否則無法查看跟踪器！
    > 這裡建議，出現任何問題，都優先切換到 SteamVR 默認界面查看跟踪器位置是否符合預期，其它軟體中例如 VRC 因為存在IK介入，和很多配置有關，不是原始跟踪器的位置。
   - 如何關閉SteamVR Home 以及更改為白色背景請看這裡
      <div align="center">
       <img src="/img/steamvr_shutdown_home1.png" alt="left" width="17%" />
       <img src="/img/steamvr_shutdown_home2.png" alt="left" width="36%" />
       <img src="/img/steamvr_shutdown_home3.png" alt="left" width="36%" />
       </div>

4. 佩戴頭顯後查看跟踪器位置是否符合預期
    > 這裡可以打開 诊断功能，複製出一組跟踪器查看更方便

5. 如果遇到錯誤，或者跟踪器消失等問題，可以重啟，建議重啟 rebocap 客戶端和 SteamVR。
    > 也非常推薦到論壇中反饋！可能是 steamvr 問題，也可能是 rebocap 的問題。如果是 rebocap 問題，我們會盡量查找問題並更新！

6. 如果 VR 校準提示的高度差異過大，[請看這裡](../../ui_help_doc/control/connect#vr_pannel)

下面是SteamVR中的接入示例，頭部節點震動嚴重是由於頭顯定位輸出數據抖動導致！
  <div>
  <video id="video" controls preload="metadata" width="100%">
        <source id="mp4" src="/img/steamvr_example.mp4" type="video/mp4" />
  </video>
  </div>


<a id="how_to_solve_tracker_slant"></a>

### 跟踪器歪了怎麼辦
如果在3D預覽中人物都是正常的，但是跟踪器相對於自身是歪的，那麼很有可能有以下三個原因：
- 沒有關閉一體機安全區域，並且本人在安全邊界附近或者安全邊界外
  > 90% 以上用戶的困擾來自於這個點
- 活動太頻繁，導致發生偏移，原則上會自動回正，全身靜止1~2S 即可
:::danger 腳底綁帶


如果腳底使用綁帶，非常容易發生偏移，[具體請看這裡](../../tutorial/instroction_for_straps#tracker_position_on_body)

:::

- 使用 `ovr advanced setting` 修改了航向角，建議重置為0
- 空間坐標轉換無法讀取，[請查看這裡](#other_notes)

如果 3D 預覽就歪了，那麼請按照下述診斷：
- 很有可能是發生了磁偏，或者磁場環境本身就差，如果是第一次使用，或者後續使用偶發遇到的，建議先進行磁場校準，[具體校準方法見這裡](../../ui_help_doc/control/config#magnet_calibrate)
- 排除綁帶歪了，排除跟踪器個別跟踪器沒電關機或者意外關機
- 如果是交叉腿或其他腿部問題，請仔細閱讀教程中 [綁帶部分](../../tutorial/instroction_for_straps) 以及 [動作校準部分](../../tutorial/connect_and_use#pose_calibration)。
- 如果還是無法解決，請排除磁場干擾，強烈建議將[這篇文章讀完](../../QA/magnet)。

<a id="vr_cannot_connect"></a>

# VR 無法連接
`VR` 驅動會自動靜默安裝，安裝到 `steamvr` 目錄下，如果發現 `VR` 面板中的左上角圖標沒有變綠，可以按照以下步驟處理。

1. 檢查 `steamvr` 是否啟動
2. 檢查 `rebocap` 接收器是否已經插入並且處於[已連接狀態](../../ui_help_doc/control/connect#status)
3. 檢查 `steamvr` 中 `rebocap` 插件是否被屏蔽。同時，這裡可以檢查 `rebocap` 插件是否已經安裝
   
   <div align="center">
    <img src="/img/steamvr_mask1.png" alt="left" width="8%" />
    <img src="/img/steamvr_mask2.png" alt="left" width="27%" />
    <img src="/img/steamvr_mask3.png" alt="left" width="27%" />
    <img src="/img/steamvr_mask4.png" alt="left" width="27%" />
    </div>
   
4. 如果第三步驟中 `steamvr` 插件未安裝，那麼請按照下述步驟手動複製安裝
- 找到 `steamvr` 安裝目錄，默認安裝位置為 `C:\Program Files (x86)\Steam\steamapps\common\SteamVR`，插件位置在 `steamvr` 目錄下的 `driver` 目錄
  > 如果您自行修改了 `SteamVR` 安裝位置，請自行查找
- 將 `rebocap_driver` 複製到 `steamvr` 插件目錄下，`rebocap_driver` 的目錄在 `rebocap` 安裝目錄的 `data` 目錄下，如左圖所示，最終解壓後的路徑如右圖所示。
   <div align="center">
    <img src="/img/steamvr_plugin0.png" alt="left" width="45%" />
    <img src="/img/steamvr_plugin.png" alt="left" width="50%" />
    </div>

<a id="other_notes"></a>

### 其它注意事項
:::info 使用非英文系統名稱的用戶注意！！！


如果您系統使用的是非英文名稱，可能會導致`steamvr`中的坐標變換無法獲取，導致最終位置錯誤，人物在 steamvr 中懸空或者掉入地板，這個時候，系統往往在開機的時候會提示如下：rebocap steamvr 插件異常，無法找到空間坐標系。這個時候，只能將 steamvr安裝到如下兩個目錄中的一個方可識別：

`C:\Program Files (x86)\Steam\steamapps\common\SteamVR`

`D:\Steam\steamapps\common\SteamVR`

:::



<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>