---
sidebar_position: 1
title: "ヒント"
---

# ヒント
チュートリアルを読まずにこのページを読むことには意味がありません。[まずはチュートリアルをお読みください](../tutorial/README)！！！！ 

# SteamVR 接続手順
1. 初めて使用する場合は、ソフトウェアを開いた後、必ず SteamVR を再起動してください。VR パネルの左上隅の緑色のインジケーターが点灯していれば、VR 接続が成功したことを示します。[接続できない場合はここを参照してください](#vr_cannot_connect)
2. 少なくとも 8 つのポイントを装着し、その後アクションキャリブレーションをクリックします。この際、Apose のキャリブレーション中は、ヘッドセットを正しく装着する必要があります【特に速いビープ音が鳴る場合】。具体的な[キャリブレーション手順についてはここを参照してください](../../tutorial/connect_and_use#pose_calibration)
    > 太もも、ふくらはぎ、腰、胸は必ず装着する必要があります。足裏を装着しない場合は、[フォローモード](../../ui_help_doc/control/connect#vr_pannel)のみ使用可能です！
3. 正常にキャリブレーションが完了したら、SteamVR のデフォルト画面でトラッカーを確認してください。必ず SteamVR Home を閉じてください。そうしないとトラッカーを確認できません！
    > ここでは、何か問題が発生した場合は、まず SteamVR のデフォルト画面に切り替えてトラッカーの位置が期待通りかどうかを確認することをお勧めします。他のソフトウェア、例えば VRC では IK の介入があり、多くの設定に依存しているため、元のトラッカーの位置ではありません。
   - SteamVR Home を閉じて白い背景に変更する方法についてはここを参照してください
      <div align="center">
       <img src="/img/steamvr_shutdown_home2-jp.png" alt="left" width="39%" />
       <img src="/img/steamvr_shutdown_home3-jp.png" alt="left" width="39%" />
       </div>

4. ヘッドセットを装着した後、トラッカーの位置が期待通りかどうかを確認します
    > ここでは診断機能を開いて、トラッカーの一組をコピーすると便利です

5. エラーが発生したり、トラッカーが消えたりする問題が発生した場合は、再起動をお勧めします。rebocap クライアントと SteamVR の再起動をお勧めします。
    > フォーラムでフィードバックを送ることも非常にお勧めします！これは SteamVR の問題である可能性もあり、rebocap の問題である可能性もあります。もし rebocap の問題であれば、私たちは問題をできるだけ早く特定し、更新します！

6. VR キャリブレーションでの高さの差が大きすぎる場合は、[こちらを参照してください](../../ui_help_doc/control/connect#vr_pannel)

以下は SteamVR での接続例です。頭部ノードの振動が激しいのは、ヘッドセットの位置出力データの揺れによるものです！
  <div>
  <video id="video" controls preload="metadata" width="100%">
        <source id="mp4" src="/img/steamvr_example.mp4" type="video/mp4" />
  </video>
  </div>


<a id="how_to_solve_tracker_slant"></a>

### トラッカーが傾いている場合はどうするか
3D プレビューでキャラクターが正常であるが、トラッカーが自身に対して傾いている場合、以下の 3 つの原因が考えられます：
- 一体型機器の安全区域が閉じられておらず、本人が安全境界の近くまたは外にいる
  > 90% 以上のユーザーの悩みはこの点から来ています
- 動きが頻繁すぎて偏移が発生し、原則として自動で元に戻ります。全身を静止させて 1～2 秒待つだけです
:::danger 足裏のストラップ


足裏にストラップを使用している場合、非常に偏移が発生しやすいです。[具体的にはこちらを参照してください](../../tutorial/instroction_for_straps#tracker_position_on_body)

:::

- `ovr advanced setting` で航向角を変更した場合、0 にリセットすることをお勧めします
- 空間座標変換が読み取れない場合は、[こちらを参照してください](#other_notes)

もし 3D プレビュー自体が傾いている場合は、以下の診断に従ってください：
- 磁気偏差が発生したか、磁場環境自体が悪い可能性があります。初めて使用する場合や、その後の使用で偶発的に遭遇した場合は、まず磁場キャリブレーションを行うことをお勧めします。[具体的なキャリブレーション方法についてはここを参照してください](../../ui_help_doc/control/config#magnet_calibrate)
- ストラップが傾いていることを除外し、トラッカーの一部が電池切れや意図しないシャットダウンをしていないことを確認します
- 足を組んでいる場合や他の脚部の問題がある場合は、チュートリアルの[ストラップ部分](../../tutorial/instroction_for_straps)および[アクションキャリブレーション部分](../../tutorial/connect_and_use#pose_calibration)を注意深くお読みください。
- それでも解決できない場合は、磁場干渉を除外し、[この記事を最後まで読むことを強くお勧めします](../../QA/magnet)。

<a id="vr_cannot_connect"></a>

# VR 接続できない
`VR` ドライバは自動的にサイレントインストールされ、`steamvr` ディレクトリにインストールされます。もし `VR` パネルの左上のアイコンが緑色に変わらない場合は、以下の手順に従ってください。

1. `steamvr` が起動しているか確認する
2. `rebocap` レシーバーが挿入され、[接続状態](../../ui_help_doc/control/connect#status)にあるか確認する
3. `steamvr` 内で `rebocap` プラグインがブロックされていないか確認します。また、ここで `rebocap` プラグインがインストールされているか確認できます。
   
   <div align="center">
    <img src="/img/steamvr_mask1-jp.png" alt="left" width="9%" />
    <img src="/img/steamvr_mask2-jp.png" alt="left" width="29%" />
    <img src="/img/steamvr_mask3-jp.png" alt="left" width="29%" />
    </div>
   
4. 第三のステップで `steamvr` プラグインがインストールされていない場合は、以下の手順で手動でコピーインストールしてください。
- `steamvr` のインストールディレクトリを見つけます。デフォルトのインストール場所は `C:\Program Files (x86)\Steam\steamapps\common\SteamVR` で、プラグインの場所は `steamvr` ディレクトリ内の `driver` ディレクトリにあります。
  > `SteamVR` のインストール場所を変更した場合は、自分で探してください。
- `rebocap_driver` を `steamvr` プラグインディレクトリにコピーします。`rebocap_driver` のディレクトリは `rebocap` インストールディレクトリの `data` ディレクトリにあり、左図のように、最終的に解凍されたパスは右図のようになります。
   <div align="center">
    <img src="/img/steamvr_plugin0.png" alt="left" width="45%" />
    <img src="/img/steamvr_plugin.png" alt="left" width="50%" />
    </div>

<a id="other_notes"></a>

### その他の注意事項
:::info 英語以外のシステム名を使用しているユーザーへの注意！！！


システムが英語以外の名前を使用している場合、`steamvr` 内の座標変換が取得できず、最終的な位置が誤って、キャラクターが steamvr 内で浮いたり床に落ちたりする可能性があります。この場合、システムは起動時に次のように警告することがあります：rebocap steamvr プラグインが異常で、空間座標系が見つかりません。この場合、steamvr を以下の2つのディレクトリのいずれかにインストールする必要があります：

`C:\Program Files (x86)\Steam\steamapps\common\SteamVR`

`D:\Steam\steamapps\common\SteamVR`

:::




<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>