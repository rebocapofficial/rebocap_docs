---
sidebar_position: 1
title: "是否支持Mac以及Linux"
---
## 是否支持Mac以及Linux
> 當前階段不支持，linux未來也不支持，mac可能支持

## 是否支持一體機
> 未來計劃支持 quest & pico，具體看  設備對 USB 接收器（即專用的信號接收器）的支持程度

<a id="audio"></a>

## 音頻初始化失敗
> 檢查音頻設備驅動問題

<a id="poor_signal"></a>

## 信號質量較差怎麼處理
> 首先檢查[信號強度](../ui_help_doc/info#hardware_detail)，確保接收器以及跟踪器附近沒有其它較強信號干擾或者屏蔽，比如接收器不要放置再機箱背部，另外接收器附近不要有U盤等。
> 
> 其次確保 `CPU` 負載不要太高，或者`CPU`本身處於省電模式，儘量保障 `CPU` 負載在 70% 以內，同時排除 `CPU` 主頻太低問題，例如筆記本散熱不佳，可能導致主頻低於 `2.5GHz`。

<a id="not_static"></a>

## 校準時未檢測到人物靜止
> 一般情況下，我們保持 `Apose` 會存在前後一定幅度的前後晃動，請儘量控制，另外，校準細則請[參考這裡](../tutorial/connect_and_use#pose_calibration)。

<a id="send_failed"></a>

## 提示發送校準數據失敗
> 確保信號強度沒有問題的情況下，優先檢查 `USB` 接收器驅動，這種一般情況下是由於 `USB` 驅動問題導致，具體方案[請看這裡](../tutorial/connect_and_use#how_to_solve_cannot_connect)

<a id="need_calibrate_gyro"></a>

## 提示部分節點陀螺儀可能需要校準
> 這個信息主要用於提示，因為人物沒有靜止，也會導致檢測陀螺儀（跟踪器上的角速度傳感器）靜止信息有誤。核心是檢查跟踪器放置在地面絕對靜止時，觀測陀螺儀的數據，除了個別異常值，大部分時候處於 0.3 以內屬於正常，否則建議校準，6軸模式建議每次使用前校準陀螺儀，具體校準方法請[查看這裡](../ui_help_doc/control/config#gyro_calibrate)。

<a id="vr_height"></a>

## VR模式下，校準提示的身高和個人身高不相符
> Rebocap 設備本身並不具備測量身高能力，身高測量完全讀取的是頭顯給出的數據，具體請[查看這裡](../ui_help_doc/control/connect#vrpannel)。

<a id="port_open_failed"></a>

## 廣播端口啟動失敗
> 端口被佔用，或者上一个 `rebocap` 實例存在進程殘留，確保 `rebocap` 只會開啟一個，並且任務管理器中只存在一個 `rebocap` 進程。

<a id="connect_failed"></a>

## 連接器連接異常
1. 排除端口被佔用，具體請確保 `rebocap` 客戶端實例只開啟一個，並且沒有其它軟件佔用這個端口。

2. 驅動異常，具體[請查看這裡](../tutorial/connect_and_use#how_to_solve_cannot_connect)

<a id="steamvr_connect"></a>

## SteamVR 無法連接
> 請[查看這裡](../third_party_software_access/steamvr/README#vr_cannot_connect)

## 骨架調節無效
> 請[查看這裡](../ui_help_doc/control/skeleton_setting#skeleton_not_valid)

<a id="firmware_version"></a>

## 提示固件版本需要更新
> 請[查看這裡](../ui_help_doc/control/config#firmware_update)，直接更新固件即可

<a id="cal_exception"></a>

## 校準異常
- 考慮穿戴模式不符合要求，[請查看這裡](../tutorial/instroction_for_straps#followmode)
- 考慮底層驅動異常，需要回滾驅動後，重新插拔接收器，[請查看這裡](../tutorial/connect_and_use#how_to_solve_cannot_connect)（具體方法需要展開折疊部分查看）

<a id="error_puts_on"></a>

## 穿戴不符合要求
- 確保穿戴的點位在UI左上角圖中人物對應的部位被點亮
- 確保替換功能沒有啟用，具體啟用和關閉方法，[請查看這裡](../ui_help_doc/remap#trackerreplace)
- 確保佩戴模式符合要求，[請查看這裡](../tutorial/instroction_for_straps#followmode)


<a id="height_error"></a>

## 頭顯高度異常
- 如果檢測高度低於10cm，那麼很有可能是steamvr驅動測異常，可能存在 unicode 系統名稱，也就是非英文系統名稱導致，後續會修復，目前的解決方案可以通過修改安裝位置嘗試解決（[請看這裡](../third_party_software_access/steamvr/#other_notes)），如果依然無法解決這個問題，[請論壇聯繫](https://forum.rebocap.site)，我們會有專門技術人員協助處理。
- 如果是頭顯高度和自身不匹配，可以首先[查看這裡](../ui_help_doc/control/connect#vr_pannel)，也可以看下論壇的帖子
  - [中文版本](https://forum.rebocap.site/t/rebocap/52/1)
  - [英文版本](https://forum.rebocap.site/t/how-to-solve-the-abnormal-height-detection-in-rebocap/53/1)
  - [日文版本](https://forum.rebocap.site/t/rebocap/54)

## 抖動問題
  - 磁場相關抖動，可以[修改抗磁等級](../ui_help_doc/control/config#update_reject_mag_and_strenth)為12，然後修改為[抗磁模式](../ui_help_doc/control/connect#calibrate)
  - 肩膀抖動或者閃爍，需要更新到最新版本
  - 腰部跳躍落地後震盪，建議排除綁帶問題，放置跟蹤器沒有緊貼到腰部，或者購買寬綁帶，或者採用複雜綁法，並且不使用快拆，降低跟蹤器相對綁帶的重心。

<a id="freq_change_note"></a>

## 通信頻道修改問題
- 通信頻道可以在默認頻道和頻道1來回切換，但是切換過程中，只有連接的跟蹤器的頻道才會切換，如果沒有連接跟蹤器直接切換頻道，那麼只會切換接收器的通信頻道，導致通信頻道不匹配，需要切換回去才能連接
- 如果發生通信頻道切換錯誤，可以重新嘗試切換直到匹配即可
- 如果發現有無法連接的，也可以嘗試來回切換頻道看是否能夠連接成功
- 如果依然沒有切換成功，可以使用物理重置通信頻道的功能，使用充電盒子即可重置通信頻道，[具體見這裡](../ui_help_doc/control/config#change_channel)，同時在軟體中點擊重置頻道（如果無法點擊，則接收器已經是預設頻道）。


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>