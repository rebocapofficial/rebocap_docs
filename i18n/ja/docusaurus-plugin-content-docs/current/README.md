---
sidebar_position: 1
title: "ナビゲーションディレクトリ"
---


<div>Rebocap 使用ドキュメント</div>

## <p>特別声明</p>
<p>翻訳部分は中国語に基づき `chatgpt` で翻訳されています。ご不明点がございましたら、フォーラムまたはコミュニティでご連絡ください。 不適切な表現があれば修正いたします！</p>

> 注意：ソフトウェアはオンライン状態で使用する必要があります。オフラインで使用したい場合は、スマホのテザリングを利用し、ソフトウェアを起動してから30秒後にネットワークを切断してください（ログを確認し、ネットワーク認証が成功したことが表示されたら、ネットワークを切断してかまいません）。

#### コミュニティリンク
- 中国語コミュニティ：https://qm.qq.com/q/vFCgxkkjuM
- 英語およびその他言語のコミュニティ：
  1. discord1：https://discord.com/invite/YKFXTfVe7K
  2. discord2：https://discord.com/invite/rCpbcUaPVc

## チュートリアル
初めて使用する際は、必ずチュートリアルディレクトリ内のすべての内容を確認してください。ドキュメントには、発生する可能性のある突発的な状況や使用上のいくつかのテクニックについて言及されています。ビデオチュートリアルは補助的なものとしてご覧ください。
- [開封チェックとハードウェア紹介](tutorial/hardware_check)
- [ストラップの使用紹介](tutorial/instroction_for_straps)
- [ソフトウェアのダウンロードとインストール](tutorial/software_install)
- [接続と使用](tutorial/connect_and_use)
- [ビデオチュートリアル](tutorial/README#video_tutorial)

## UI セクション機能紹介
画像の対応する領域をクリックすると、対応するセクションの機能紹介にジャンプします。
<div>
<svg  width = "60%"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2560 1368">
<style>
.image-mapper-shape {
    fill: rgba(0, 0, 0, 0.6);
}
.image-mapper-shape:hover {
    fill: rgba(0, 0, 0, 0.1);
}
g:hover .image-mapper-shape {
    stroke: red;
    stroke-width: 4;
}
.image-text {
    font-family: Verdana;
    font-size: 22px;
    fill: rgba(0, 0, 0, 0);
}

g:hover .image-text {
    fill: greenyellow;
}
g {
background: #00000000;
}
</style>

<image xlink:href="/img/rebocap_ui-jp.png"></image>
<a xlink:href="ui_help_doc/remap.html" target="---" xlink:title="remap">
<g>
<rect x="16" y="45" width="523" height="683" class="image-mapper-shape" data-index="1"></rect>
</g>
</a>

<a xlink:href="ui_help_doc/view.html" target="---" xlink:title="3d_view">
<g>
<rect x="562" y="45" width="1982" height="795" class="image-mapper-shape" data-index="2"></rect>
</g>
</a>

<a xlink:href="ui_help_doc/info.html" target="---" xlink:title="info">
<g>
<rect x="16" y="738" width="522" height="618" class="image-mapper-shape" data-index="2"></rect>
</g>
</a>

<a xlink:href="ui_help_doc/control" target="---" xlink:title="control">
<g>
<rect x="561" y="851" width="1986" height="498" class="image-mapper-shape" data-index="2"></rect>
</g>
</a>

</svg>
</div>

<a id="navigation_directory"></a>

# ナビゲーションディレクトリ
### Rebocap チュートリアル
* [使用チュートリアル](tutorial/README)
  * [開封チェック](tutorial/hardware_check)
  * [ストラップの使用紹介](tutorial/instroction_for_straps)
  * [ソフトウェアのダウンロードとインストール](tutorial/software_install)
  * [接続と使用](tutorial/connect_and_use)
  * [ビデオチュートリアル](tutorial/README#video_tutorial)


### ヘルプマニュアル
* [UI ヘルプドキュメント](ui_help_doc/README)
  * [コントロールエリア](ui_help_doc/control/README)
    * [接続](ui_help_doc/control/connect)
    * [モーションキャプチャパラメータ](ui_help_doc/control/cap_param)
    * [スケルトン設定](ui_help_doc/control/skeleton_setting)
    * [設定](ui_help_doc/control/config)
  * [ハードウェア情報リスト](ui_help_doc/info)
  * [ハードウェア接続プレビュー](ui_help_doc/remap)
  * [3Dプレビューエリア](ui_help_doc/view)

### よくある質問
* [よくある質問](QA/README)
* [磁場の問題まとめ](QA/magnet)

### ソフトウェア接続
* [その他のソフトウェア接続](third_party_software_access/README)
* [SteamVR プロトコル接続](third_party_software_access/steamvr/README)
  * [VRChat 接続](third_party_software_access/steamvr/vrchat)
* [VMC プロトコル接続](third_party_software_access/VMC/README)
  * [warudo 接続](third_party_software_access/VMC/warudo)

### その他
* [プラグイン](plugins/plugins)
  * [Blender](plugins/blender)
  * [UE](plugins/ue)
  * [Unity](plugins/unity)
* [SDK](SDK/README)
* [製品認証](product_certification/README)

