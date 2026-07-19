---
sidebar_position: 3
title: "軟體下載"
---
<!-- ==================== 旗帜 A：Install software 开始 ==================== -->
<div style="border-left: 6px solid #88b49c; padding-left: 20px; margin-top: 10px; margin-bottom: 20px;">

## 下載 {#software-download-toc}
<h2 class="tutorial-heading-flag" style="background: #88b49c; margin-top: 0; display: inline-block;">下載</h2>

目前為 Release 版本，點擊下方 `下載連結` <br />
 Beta 版本為公開測試版本，應對磁場干擾明顯的區域效果更好，但是尚未大規模驗證。



**正式版本** -  [下載 Rebocap V01](/img/files/rebocap_release_v01.exe)


**Beta版本** - [下載 Rebocap V02 Beta02](/img/files/rebocap_release_v02_beta02.exe)







- 版本選擇：\
  V01 - 適合磁場穩定的環境，適用於跳舞。<br />
  V02 Beta02 - 默認開關針對6追蹤器套裝優化，並採用全新算法可以主動判斷強干擾源，甚至在彈簧床上保持朝向。


- 推薦安裝在非系統碟（不要裝在 C 碟）。



<!-- ==================== 折叠页 开始 ==================== -->

<details>
<summary> 查看軟體對應支持的固件版本。</summary>
   &emsp;&emsp; 部分固件版本有重大算法變更，與舊版軟體不相容。 <br /> 


   &emsp;&emsp; 當切換回舊版軟體時，需要相應地降級固件。<br /> 

   &emsp;&emsp;&emsp; release_v01 - ◼️tracker : V6 / V7  ,  📡receiver : V6 / V7 <br /> 

   &emsp;&emsp;&emsp; release_v02 beta02 - ◼️tracker : V15  ,  📡receiver : V6 / V7 <br /> 

   &emsp;&emsp;&emsp; (未公開) release_v02 beta02.1 - ◼️tracker : V16  ,  📡receiver : V6 / V7 / V8 <br /> 

</details>
<!-- ==================== 折叠页 结束 ==================== -->






<!-- ==================== 折叠页 开始 ==================== -->
<details>
<summary>如果在VR模式使用 V01 版本，需要更改以下設置。</summary>

<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![v01_off_1](../../../../../static/img/unboxing/expand/v01_off_1-cnt.png)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong>1 - 關閉額外顯示的追蹤點。</strong><br />
打開 [配置'SteamVR'輸出節點] → 關閉 [左/右上臂]
<details className="plain-details"><summary>詳情</summary>
軟體原計畫使用[關節自動隱藏]功能自動隱藏未使用的追蹤點，<br />
後發現該功能無法自動檢查，在V02 Beta02軟體中已修復。
</details>

</div>
</div>

<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![v01_off_2](../../../../../static/img/unboxing/expand/v01_off_2-cnt.png)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong>2 - 關閉會錯誤卡在全局工作的功能。</strong><br />
→ [運動參數] → 關閉 [縱向 IK & 橫向 IK]
<details className="plain-details"><summary>詳情</summary>
該功能原定為[防止腳滑]模組裡的子功能，<br />
但會意外處於全局工作狀態，在V02 Beta02軟體中已修復。

</details>
</div>
</div>

</details>
<!-- ==================== 折叠页 结束 ==================== -->





</div>
<!-- ==================== 旗帜 A：Install software 结束 ==================== -->







注意事項：
> 當前軟體僅支援**Windows 10**及以上系統版本。<br>
> 軟體必須在聯網狀態下使用，如果希望離線使用，請使用手機熱點網絡，開啟軟體30秒以後再斷開網絡即可。<br>
（在[日誌視窗]中只要顯示網絡校驗成功，即可斷開網絡）

## 軟體安裝
1. 雙擊 rebocap_release_v01.exe（當前版本為 rebocap_release_v01.exe）
2. 按照下圖所示進行安裝
3. 打開 rebocap 軟體  
   * 從開始選單開啟  
   * 從桌面捷徑開啟  

![安裝步驟](/img/setup_steps.gif)

## 軟體更新說明

### 更新日誌

#### 2026-02-04 更新: rebocap Release V02 Beta02
1. 更新韌體至 v15，優化抗磁與 6 軸演算法，抗磁穩定性提升，6 軸穩定性提升  
   > 動態情況下，例如持續跳舞且磁場環境不佳時，仍與 6 軸性能接近。新韌體在磁場良好時，動態跳舞基本能持續回正（舊韌體需依賴中間存在靜止狀態才能回正）。
2. 新增延遲自動關機功能，需要升級新的接收器韌體。
3. 航向校準重構，同時新增 PC 航向校準 功能：  
   > 注意：進行 PC 航向校準時，需全身 A-pose，小臂與手掌抬起向前更佳，或直接做 S-Pose 亦可，或坐著將雙手伸向正前方亦可。
4. 軟體意外閃退後，於 5 分鐘內重新開啟，會自動套用上次校準結果，無需再次動作校準。
5. 航向校準時，會重置磁場（直接重置為相對磁場 1.0），若躺在床上，將以校準時刻作為初始磁場進行回正。
6. 解除磁場校準限制，簡易磁場校準（畫 8 字）預設可點擊顯示  
   > 預設限制 8 個感測器同時校準；若在 data 目錄新增檔案：`data/__no_limit_max_nodes__`，即可取消校準數量限制。
7. 修復躺下後腳底運動可能導致角色骨架分離的 bug。

其它更新：
1. 軟體頂部顯示版本號
2. 修復自動隱藏關機感測器功能無效的 bug
3. 關閉腳底防滑模式時，腳底可深入地面以下，並移除 IK
4. 解決拔掉接收器後角色姿態凍結的 bug
5. 骨架設定新增 VR 側向偏移（部分模型的頭顯掛載點不在眉心，而是在側邊，可依實際情況調整）

#### 2025-12-03 更新: rebocap Release V01
**VR 部分：**
1. 新增原地行走功能，可於原地踏步時模擬搖桿穩定緩慢向前推進，詳情請閱讀說明文件（進階功能）
2. 新增 VR 虛擬地面高度，-100 cm ~ 100 cm 範圍調整（進階功能）
3. 新增替換控制器功能，開啟後將以手掌追蹤器替換手柄控制器的位置與姿態，詳情請閱讀說明文件（進階功能）
4. 升級 SteamVR 外掛，並嘗試修復追蹤器被識別為控制器的現象
5. 修復 VR 模式匯入骨架時，腳底定位點錯誤問題（主要影響 IK 計算），導致角色腳底以及整體被拉低
6. 航向回正後，將主動觸發 自動回正功能
7. 新增自動隱藏關閉的節點開關，開啟後會自動隱藏已關機的節點
8. 恢復 VR 的 胸腰跟隨頭顯功能

**PC 部分：**
1. 動作校準演算法更新，降低 T-pose 手臂姿勢要求，解決部分使用者雙手臂不對稱問題
2. 新增手臂 IK，合掌 IK 盡量減少合掌時手臂交叉問題，A-pose IK 用於解決虛擬角色肩膀過窄、手臂下垂時嚴重穿模問題
3. 新增 MMD 動作匯出，以及 PMX 模型匯入。注意，VMD 動作無 IK，需要自行移除 IK 約束
4. 修復動畫幀率跳轉，最大 999 的 bug

**通用部分：**
1. UI 更新，依功能進行分區，並優化部分名詞翻譯，功能描述更人性化
2. 新增進階設定開關，以及設定匯出、設定載入、還原預設設定功能
3. 移除靜止判定失敗導致無法校準的問題
4. 新增自動連線功能，現在無需手動點擊連線按鈕
5. 新增接收器韌體升級，解決 CPU 高負載丟包問題（特別是 AMD CPU）
6. 追蹤器升級至 v07 韌體，整體更穩定
7. 新增可選取部分節點進行六軸功能（進階功能）
8. 修復個別陀螺儀校準後不歸零的 bug

**其他：**
1. 增加啟動畫面，避免長時間後台等待
2. 加強 3D 視窗穩定性
3. 驗證伺服器增加到三個（中國、香港和美國），只要其中一個驗證伺服器通過就驗證成功。
4. 修復校準時偶發資料傳送失敗的bug（實際上是傳送成功了）
5. 預設骨架修改為社群推薦的預設骨架，以及其他預設參數修改
6. 六軸開關開啟關閉增加重新校準提示
7. 修復六軸側偏補償問題


### TODO（排名不分先後，這裡只介紹大的更新點）

- 優化 IK 效果
- 優化軟體穩定性
- VR 3 點模式支援
- PC 全身 6 點模式支援
- 文件增加其他語言（後續文件穩定之後再增加）


### 歷史版本
> **請注意，preview05以前的版本不支援 2025-11-29 號以後的新版本硬體，新版本硬體請下載最新 Release 版本 或者 Beta 版本**
