---
sidebar_position: 4
title: "連接指南"
sidebar_label: "連接指南"
---

# 連接指南
1. 點亮要連接的追蹤器
   > 支援的追蹤器組合模式見 [上一個章節](instroction_for_straps#follow_mode)
2. 將接收器插入電腦USB接口中
3. 打開 Rebocap 軟體點擊連接

![連接接收器](/img/connect.gif)

<a id="how_to_solve_cannot_connect"></a>

### 無法連接原因及解決方案
<details>
<summary>點擊這裡展開，查看無法連接或者發送數據失敗具體原因</summary>


* USB接口有問題，比如部分用戶的電腦USB接口積灰，容易導致連接不穩定。
> 更換 USB 插口嘗試，或者重新插拔
* 已經啟動了一個 `Rebocap` 客戶端，導致端口被佔用，或者其它程式佔用了端口
> 現象是 `連接` 按鈕可以點擊，但是連接失敗，這個時候需要確保其它 `Rebocap` 客戶端完全關閉，建議重新插拔接收器，同時在任務管理器中查找其它 `Rebocap` 進程，如果可以找到強制結束
* 確保串口正常，沒有安裝其它模擬串口軟體，部分用戶安裝模擬串口設備以後，將會導致驅動失效
> 例如安裝了 `com0com` 驅動，需要卸載驅動，然後重新插拔接收器。
* 確保驅動沒有被更換，這裡可以按照下圖所示操作來回滾接收器串口驅動，如果還不能連接，拔掉接收器重新插入。
  >   連接後無法校準，並且無法修改RGB燈顏色，也可以嘗試回滾驅動

    ![回滾接收器驅動](/img/rollback_driver.gif)


</details>

### 連接後信號弱或者信號不穩定
* 如果使用台式機，請不要將接收器放置在機箱後邊
* 接收器旁邊儘量保持5cm以上空曠區域，比如不要在接收器旁邊插入U盤，如果可以，嘗試延長線也許對信號有一定幫助


# 校準
穿戴請參考下圖，具體佩戴位置因人而異，原理及細節描述請參考[上一章節](instroction_for_straps#tracker_position_recomendation)

:::info 首次使用務必測試15點


如果測試效果不佳，可能有以下原因
1. 磁場問題，具體解決方案請[參考這裡](../QA/magnet)
2. 陀螺儀可能需要校準，請[參考這裡](../ui_help_doc/control/config#gyrocalibrate)
3. 穿戴拉扯問題，請[仔細閱讀並參考這裡](instroction_for_straps#tracker_position_on_body)

:::


<a id="pose_calibration"></a>

### 動作校準
點擊軟體介面中的 動作校準 按鈕，動作校準參考如下圖，軟體中也有對應的圖片提示，其中要點和動作規範務必全部閱讀。

- **校準要點**
  * 點擊動作校準以後，立即進入A-Pose姿態保持靜止
    > 系統會在點擊2秒後開始檢測人物是否處於靜止，注意控制前後晃動幅度，盡最大可能降低晃動，用於完成各個傳感器初始化。檢測時長為10秒，只要檢測到最近2秒內處於靜止，會立即進入校準程序。
  * 每個動作在快速滴滴聲期間，系統會錄製對應姿態數據
    > 快速滴滴聲期間務必保持靜止，建議切換動作在快速滴滴聲響完後1秒再開始切換
  * 切換動作後請務必保持靜止，等待快速滴滴響起，切換過程建議在2秒內完成
  * 切換動作過程一定不能移動雙腳
    > 雙腳在校準期間一定嚴格保持靜止，不要有任何移動。

- **動作規範**
  * **A-Pose**
    
    雙腿垂直向下，儘量平行，雙腳之間保持一拳左右間距，雙手繃緊垂直向下，不要彎曲，手心朝向自身，停止脊背，目視正前方
    > 這裡如果大家覺得校準以後雙腳閉合，虛擬人物雙腳交叉了，那麼在校準的時候減小雙腳間距
    > 
    > 如果覺得校準以後雙腳閉合，虛擬人物雙腳間距太大，那麼可以在校準的時候增加雙腳間距
  * **T-Pose**
    
    雙腿和A-Pose保持一致，雙手保持向外展開，務必和肩部同寬，且兩隻手在一條直線上，手掌向下
  * **S-Pose**
    
    雙腿向正前方微微彎曲約30度即可，不用過度彎曲，雙手保持向前，和上半身垂直，高度平行與肩部，且兩個手臂平行
    > 如果手臂沒有佩戴追蹤器，則手臂的動作可以忽略
  * **B-Pose**
    
    上半身向前彎曲30度即可，手部動作不用管
    > B-Pose全稱為 Blend-Pose，主要用於校準腰部、胸部、頭部的追蹤器的航向角。



下圖從左往右依次是：`APose`  `TPose`  `SPose`  `BPose`
<div align="center">
<img src="/img/apose.png" alt="left" width="22%" />
<img src="/img/tpose.png" alt="left" width="22%" />
<img src="/img/spose.png" alt="left" width="22%" />
<img src="/img/bpose.png" alt="left" width="22%" />
</div>


<a id="third_party"></a>

# 軟體接入
### SteamVr 接入 [請看這裡](../third_party_software_access/steamvr/README)
- VRChat 接入 [請看這裡](../third_party_software_access/steamvr/vrchat)
- 社群接入教程 [https://kdocs.cn/l/crsa6MIP1mOd](https://kdocs.cn/l/crsa6MIP1mOd)，若無法連結訪問請<a href="/img/files/RebocapVRchat指南-中文.pdf"  target="_blank" download="RebocapVRchat指南-中文.pdf">下載PDF檔案</a>查看（離線檔案更新可能不及時）


### VMC 協議用戶接入 [請看這裡](../third_party_software_access/VMC/README)
- warudo 接入 [請看這裡](../third_party_software_access/VMC/warudo)

### 抖音直播伴侶接取 [請看這裡影片](https://www.bilibili.com/video/BV1fPbwzbEak)

### 雲端鏡虛擬直播 存取 [請看這裡影片](https://www.bilibili.com/video/BV1z7hFzfEw6)

# 必須了解項
為了避免使用中遇到的各種問題（比如跟蹤器莫名其妙歪了等問題），也為了您有更好的動捕體驗，請務必閱讀下述說明。

### 硬體校準
- [磁場校準](../ui_help_doc/control/config#magnetcalibrate)
- [陀螺儀校準](../ui_help_doc/control/config#gyrocalibrate)

### 軟體上動捕配置項怎麼設置
- 關於磁場部分配置，請閱讀[磁場相關說明](../QA/magnet)
- 其它配置，可以點擊每個配置面板右上角問號圖標

### 綁帶怎麼綁定最好
如果跳過[上一章節](instroction_for_straps)閱讀，還請在空閒時間閱讀，或者遇到問題以後務必詳細閱讀

:::info 重要點再次強調


這裡再次強調，腳底的跟蹤器綁定方式很關鍵，盡量不要用綁帶，防止跟蹤器因為綁帶和地面摩擦導致影響整體動捕效果，具體請看上一章節說明。

:::

