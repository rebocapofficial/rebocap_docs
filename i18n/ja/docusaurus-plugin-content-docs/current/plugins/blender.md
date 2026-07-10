---
sidebar_position: 2
title: "Blender プラグインダウンロード"
---
# Blender プラグインダウンロード

下のリンクをクリックすると直接ダウンロードできます：
- **Blender Plugin Beta 9**
<a href="/img/files/rebocap_blender_plugin_v9.zip" target="_blank" download="rebocap_blender_plugin_v9.zip">blender with python 3.6~3.12</a>
更新情報：
- Blender 4.4 以降に対応
- rebocapプラグインのプロセス残留バグを修正
- 骨格のエクスポートバグを修正し、リアルタイムドライバーの状況で足元の不安定さを解消します。
- すべての Python 3 のバージョンをサポートし、例えば Blender 4.1 をサポートできるようになりました
- Mixamo スケルトンの直接サポート、自動バインディング可能
- fbx モデルのドライバーに関するバグを修正
- アニメーション録画の軸に関するバグを修正
- 骨吸着選択機能を追加

# Blenderチュートリアルビデオ
注記： 本動画は音声がございません。

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/for_blender_install/blender_usage.mp4" type="video/mp4" />
</video>
</div>


# Blender プラグインインストール

インストール手順：
順に `Edit->Preference` を開き、ポップアップパネルで `Add-ons` を選択し、右側の `Install` をクリックして、先ほどダウンロードした `rebocap_blender_plugin.zip` を選択し、次に Install Add-on をクリックしてインストールします。インストールが完了したら、有効にするためにチェックを入れる必要があります。図のように「rebocap」と入力し、プラグインにチェックを入れればインストール成功です。

<div align="center">
    <img src="/img/for_blender_install/blender_1.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_2.png" alt="pic_right" width="45%" />
</div>

インストールが成功した後、右側に対応するプラグインメニューが表示されるはずです。図のように。
    > 注意：メニューが見えない場合は、左側を指す小さな展開矢印をクリックすると表示されます。

<div align="center">
    <img src="/img/for_blender_install/blender_3.png" alt="pic_left" width="25%" />
</div>

:::info インストール失敗時の対処法


一部のユーザーがインストールに失敗した場合は、Blender プラグインの元のインストール位置を見つけ、`rebocap_blender_plugin.zip` を直接 Blender インストールディレクトリに解凍してください。プラグインのデフォルトインストール位置は `C:\Users\<your_username>\AppData\Roaming\Blender Foundation\Blender\<version_number>\scripts\addons` です。ここで `your_username` はあなたのユーザー名、`version_number` はインストールした Blender のバージョン番号です。

:::


![Blenderインストール位置示意図](/img/for_blender_install/blender_23.png)


# ボーンバインディング
1. VRM スケルトンの自動バインディング
2. FBX で Mixamo スケルトン規格を使用する場合、direct モードを使用すると自動バインディングが可能です。つまり、direct モードでは、すべての Mixamo アバターを駆動できます。
   > ただし、足底の12個の固定ポイントは手動で選択する必要があります（足底の効果要件が高くない場合は無視できます）。

:::danger 注意！！！


必ず rebocap クライアントを開いた後、動作キャリブレーションを行ってから `connect` をクリックしてください。そうしないと、Blender を再起動しないとリアルタイムモーションキャプチャを続行できない場合があります。

バインドされるキャラクターのボーンはドライブされるヒップノードです。ヒップノードがルートボーンでない場合、またはヒップノードを移動できない場合（一部のスケルトンは強制的にヒップとルートを関連付け、ヒップのローカル移動を変更できない）、キャラクターの尻が常に元の位置に留まる可能性があります。

:::


ヒント：FBX をメートル単位にスケールするには、下の図の位置を参照し、`scale` を 0.01 に変更してください。
<div align="center">
    <img src="/img/for_blender_install/fbx_change_meter.png" alt="pic_left" width="25%" />
</div>


### 開発者モードを開く
順に `Edit->Preference` を開き、左側の `Interface` を選択し、次に `Developer Extras` にチェックを入れます。

<div align="center">
    <img src="/img/for_blender_install/blender_4.png" alt="pic_left" width="45%" />
</div>


### キャラクターのインポート {/*examples*/}

以下は `VRM` フォーマットのキャラクターを例にします。VRM プラグインのダウンロードリンクは [こちらを参照](https://github.com/saturday06/VRM-Addon-for-Blender/releases/download/2_20_24/VRM_Addon_for_Blender-2_20_24.zip)してください。

FBX フォーマットのキャラクターには、[`better fbx`](https://blendermarket.com/products/better-fbx-importer--exporter) プラグインを使用することをお勧めします。

<div align="center">
    <img src="/img/for_blender_install/blender_5.png" alt="pic_left" width="45%" />
</div>

### プラグインでターゲットキャラクターを選択 {/*examples*/}

インポート後、`REBOCAP_CONNECTION` を開き、右側の `Armature` を選択します【選択しないと `Drive Type` オプションが表示されません】。その後、`REBOCAP_CONNECTION` メニューで `retarget` を選択し、`Source` にこのキャラクターを選択します。`Armature` を `Source` ボックスに直接ドラッグすることもできます。

<div align="center">
    <img src="/img/for_blender_install/blender_6.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_7.png" alt="pic_left" width="45%" />
</div>

`Source` を選択すると、以下のメニューが表示されます:

<div align="center">
    <img src="/img/for_blender_install/blender_8.png" alt="pic_left" width="45%" />
</div>

### ボーンのバインド {/*examples*/}

各ボーンはターゲットキャラクターの対応するボーンを選択する必要があります。【ここには英語の部分のみが含まれています。わからない場合は自分で翻訳してください】

Pelvisは骨盤、Spineは骨盤の上の部分、Chestは2つのセクションがありますが、一部のキャラクターではChestが1つしかない場合があります。その場合はどちらか1つをバインドすれば問題ありません【どちらでも構いません】。ターゲットキャラクターに2本のボーンがある場合は、Chestに近い方のボーンを選択します。Leg の4本のボーンはすべてバインドする必要がありますが、Toeはオプションです。

VRMフォーマットのキャラクターの場合、インポート後にAuto Detectをクリックすると自動的に入力されます。他のフォーマットの場合は、ユーザーがボーンの対応する名前を探して選択する必要があります。

<div align="center">
    <img src="/img/for_blender_install/blender_9.png" alt="pic_left" width="80%" />
</div>

### 靴底の頂点IDを取得 {/*examples*/}

このステップは少し面倒ですが、効果をあまり追求しない場合は無視しても構いません。主に靴底の境界を取得するためのもので、キャラクターが境界に沿って歩くようになります。ただし、靴が大きすぎると、両足の切り替え時に上下の振動が発生しやすくなります。

1. 最初のステップは開発者モードを開くことです。これはドキュメントの冒頭で既に述べています。

2. Object Modeに調整し、Boneの選択を解除して、マウスでキャラクターの足をクリックしてMeshを選択します。

    <div align="center">
    <img src="/img/for_blender_install/blender_10.png" alt="pic_left" width="80%" />
    </div>
    <div align="center">
    <img src="/img/for_blender_install/blender_11.png" alt="pic_left" width="80%" />
    </div>

3. キャラクターを選択し、靴の部分が選択されていることを確認してから、EditModeに切り替えます。

    <div align="center">
    <img src="/img/for_blender_install/blender_12.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_13.png" alt="pic_left" width="45%" />
    </div>
    <div align="center">
    <img src="/img/for_blender_install/blender_14.png" alt="pic_left" width="80%" />
    </div>

4. インデックスを開く、これはBlender3.6とBlender4.0で異なります

    <div align="center">
    <img src="/img/for_blender_install/blender_15.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_16.png" alt="pic_left" width="45%" />
    </div>

5. 頂点を選択し、対応する数値を記録します。

    合計で12個の頂点を記録する必要があります。各足の前足の左中右、足のかかとの左中右です。注意してください、これは人物自身の左右方向です。探すときは、人物の背中を自分の方に向けると認識しやすくなります。

    ポイントを選択している間、Meshを選択する必要があるため、選択中は右側のメニューが見えません。自分で記録する必要があります。順序は前足の左中右、足のかかとの左中右です。

    ここでBlenderの基本操作について触れておきます
    > shift+マウスホイールを押し込むとドラッグ
   > 
    > ctrl+マウスホイールを押し込むとズーム操作
   > 
    > マウスホイールを押し込むと視点を変更

6. 記録が完了したら、`Edit`モードから`Object`モードに切り替え、`Armature`を選択し、足のIDを入力します。

    <div align="center">
    <img src="/img/for_blender_install/blender_21.png" alt="pic_left" width="80%" />
    </div>

#### 靴底の頂点IDバインディングの例
例えば、下の人物の左側前足の3つはそれぞれ：
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

# 骨格のエクスポート
重要な骨格がバインドされた後、save boneボタンが表示されます。クリックしてエクスポートし、保存先を選択します。

 <div align="center">
 <img src="/img/for_blender_install/blender_22.png" alt="pic_left" width="60%" />
 </div>

その後、Rebocapにインポートします。[こちらを参照してください](../ui_help_doc/control/skeleton_setting#skeleton_import)


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>