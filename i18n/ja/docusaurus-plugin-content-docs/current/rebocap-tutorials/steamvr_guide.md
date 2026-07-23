---
sidebar_position: 9
---

# SteamVR 操作ガイド

ここでは、推奨するSteamVRの設定およびよくある質問について説明します。


## VRヘッドセット / ストリーミングソフトの操作推奨
### VRヘッドセットの設定

<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![steamvr_windows](/img/steamvr_guide/steamvr_windows.jpg)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong> - できるだけSteamVRのデスクトップウィンドウからRebocapソフトウェアを操作してください。</strong><br />
一部のVRヘッドセットでは、内蔵システム画面に戻るとSteamVRのデータが停止/スリープ状態になります。<br />
(Virtual Desktopはこの問題の影響を受けませんが、Questシステムのスリープを回避してください)<br />
また、SteamVRに戻る際にヘッドセットの向きがリセットされ、
SteamVR内でRebocapの体の向きがずれたり、キャリブレーション時に誤った向きが記録される原因となります。
<details className="plain-details"><summary>詳細</summary>
·················<br />

</details>

</div>
</div>






- QuestやPicoなどの一体型VRヘッドセットのプレイエリア（安全境界）は、実際の部屋よりもひと回り大きく設定してください。<br />
境界線が作動した際にSteamVR側のヘッドセット追跡データが中断されるのを防ぐためです。

- 歩行やかがみ込みを行った際にヘッドセットの位置が固定されたままの場合は、VRヘッドセットシステム内の位置トラッキング機能が有効になっていません。<br />
（Questシステムではプレイ境界線を有効にし、Picoシステムでは[位置トラッキング]を有効にしてください）




### Virtual Desktop 
<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![vd_settings](/img/steamvr_guide/vd_settings.jpg)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong>以下の2つのオプションをオフにすることを推奨します：</strong>
<br />

> <strong>1 - Center to play space</strong><br />
 左コントローラーのHomeボタンをダブルクリックしてVDのデスクトップに戻る際、SteamVR空間内のヘッドセットが後方に180°回転し、<br />
Rebocapのキャリブレーション時に誤った向きが記録される可能性があります。



> <strong>2 - Emulate SteamVR vive trackers</strong><br />
 この機能はQuestシステムのAI全身トラッキング点をSteamVRに送信しますが、VRChat内でトラッキング点が重複し制御権が競合します。<br />
 指定した一部のトラッキング点のみを有効にしたい場合は、プラグインを使用して調整できます。<br />
 🌐 [プラグインのGitHub](https://github.com/DenTechs/Virtual_Desktop_Body_Tracking_Configurator)


</div>
</div>




### SteamVR
- SteamVRの境界線を無効化する<br />
デフォルトの境界線は、透明な壁のようにトラッキング点の最大移動範囲を制限します。<br />
VRヘッドセットが誤って2.4mの高さに位置調整された場合、横になって足を上げた際にトラッカーがヘッドセット的高さを超えられなくなることがあります。<br />
SteamVRのデフォルトの天井高が2.4mであり、トラッキング点が天井を通過できないためです。

- あらかじめVRヘッドセットの角度をリセットする<br />
「右コントローラーのHomeボタン」を長押ししてVRヘッドセットのシステム方向をリセットすると、<br />
SteamVRの仮想水平線の矢印が視線の正面にリセットされます。不意に向きがずれた場合に、この機能を使って座標系を再調整できます。

- 起動時にポップアップ通知が表示される場合<br />
背景にあるコミュニティ構成のいずれかを適当に選択してください。<br />
一度有効化すれば、次回起動時からは表示されなくなります。

## SteamVRに接続できない場合
以下の項目を確認してください：

<strong> 1 - SteamVRが起動している状態でキャリブレーションをクリックする。</strong><br />
SteamVRが起動していないと、Rebocapはシステム内にVRが存在するかを検出できません。

<strong> 2 - SteamVRドライバーを確認する。</strong><br />
Rebocapの[ログウィンドウ]記録を開いて確認してください。Rebocap起動時に自動的にチェックされます。
必要に応じて、[設定]ページから手動で強制インストールが可能です。

<strong> 3 - SteamVRのアドオンを確認する。</strong><br />
SteamVRが予期せずクラッシュした場合、全アドオンが強制的に無効化されることがあります。<br />
Rebocapのアドオンを再有効化した後は、SteamVRの再起動が必要です。






## SteamVRトラッキング点の表示と非表示




<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![steamvr_windows](/img/steamvr_guide/v01_off_1-ja.png)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong> トラッキング点の表示と非表示</strong><br />
 ソフトウェアの [ SteamVR 出力ノード設定 ] でトラッキング点の表示/非表示を制御できます。<br />
 SteamVRの管理メニューで操作する必要はありません。<br />

 <details className="plain-details"><summary>注</summary>
トラッカーはSteamVRに直接接続されているわけではありません。物理トラッカーが骨格システムを制御し、骨格システム上で作成された対応するトラッキング点をSteamVRに入力します。<br />
つまり、物理トラッカーが存在しない部位であっても、SteamVRにトラッキング点を提供することが可能です。

</details>


</div>
</div>

## トラッキング部位を設定したのにゲーム側で足や腰が認識されない場合

- 一部のゲームはOpenVR環境を使用してトラッキングを認識しますが、現在Rebocap Releaseに同梱されているドライバーには認識不能になるバグがあり、SteamVR側で設定を変更しても認識されません。


このバグは開発チームによる今後のアプデでの修正待ちとなっています。
