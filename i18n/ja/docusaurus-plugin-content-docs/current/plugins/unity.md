---
sidebar_position: 4
title: "Unity デモパッケージのダウンロード"
---

# Unity デモパッケージのダウンロード

Unity プラグインは主に開発者向けで、開発者は具体的なコードを確認して二次開発を行うことができます。以下はダウンロードリンクです。

<a href="/img/files/rebocap_unity_sdk_v4.unitypackage" target="_blank" download="rebocap_unity_sdk_v4.unitypackage">rebocap unity sdk v4</a>

unity sdk v4 更新ログ
> 特定状況下でのアニメーション異常を修正、FBXインポートの骨格をサポート

unity sdk v3 更新ログ
> il2cpp backend モードで、パッケージ化できないおよびパッケージ化後にエラーが発生するバグを修正

:::info 注意: 最初に `VRM` パッケージをインストールする必要があります: [`UniVRM`](https://github.com/vrm-c/UniVRM/releases/tag/v0.117.0)

:::


# Unity VRM モデルキャラクター切り替えの例

rebocap_unity_sdk.unitypackage を空のプロジェクトにドラッグし、`RebocapSdk` ディレクトリ内の DemoScene を開き、新しい VRM をシーンにドラッグします。その VRM オブジェクトを `Terrain` オブジェクトの下にドラッグし、バインドされた `Drive Demo` スクリプトの Animator 変数を設定します。

シーンを実行した後、`Connect` ボタンをクリックすると、自動的に `Rebocap` クライアントに接続され、骨格が自動登録されます。注意：動作を出力するには、動作キャリブレーションが必要です。

:::info ヒント


デモプロジェクトで使用されているキャラクターバインディングは VRM で、標準の `Humanoid` 骨格を使用しています。原則として、`Humanoid` 骨格に従うすべてのものは直接ドラッグして置き換えることができます。

:::


### ビデオ操作でキャラクターを置き換える例

ここでは古いクライアントバージョンの録画（仮に使用、後で置き換え予定）を示しています。新しいものは基本的に同じです。接続をクリックした後、骨格が `Rebocap` クライアントに正常にインポートされたかどうかを確認します。

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/unity_replace_vrm.mp4" type="video/mp4" />
</video>
</div>


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>