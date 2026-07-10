---
sidebar_position: 3
title: "UE プラグインのダウンロード"
---
# UE プラグインのダウンロード

以下はダウンロードリンクです。UEのソースコードを確認して開発し、自分でコンパイルすることができます。現在、プラグインは `UE5` バージョンにのみ対応しています。

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin.zip">ue plugin source</a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_51_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_52.zip">ue 5.1 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_52_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_52.zip">ue 5.2 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_53_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_53.zip">ue 5.3 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_54_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_54.zip">ue 5.4 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_55_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_55.zip">ue 5.5 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_56_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_56.zip">ue 5.6 plugin prebuild </a>


# UE 使用説明

1. **UEで新しいプロジェクトを作成**

   ブループリントまたはc++プロジェクトのどちらでも可能です。プラグインを二次開発する場合は、`c++`プロジェクトを作成し、キャラクターをインポートします（キャラクターのデフォルトポーズは`T-Pose`でなければならず、`A-Pose`ではないこと。そうでないと腕の動きが異常になります）。その後、プロジェクトのフォルダを開き、新しいフォルダ `Plugins フォルダ` を作成し、`rebocap_unreal_engine_plugin`を`Plugins`に入れます。例えば、新しい `testV3`プロジェクトを作成した場合、全体のディレクトリ構造は以下のようになります：

    <div align="center">
    <img src="/img/ue_plugin/ue1.png" alt="pic_left" width="80%" />
    </div>

2. **UEを再度開くと自動的にコンパイルされます【ソースコードがリリースされているため、すべてのバージョンに対応しているはずです】**

    > プラグインを二次開発およびデバッグする際は、Riderを使用して `[name].uproject` を直接開くことで開発および簡単にデバッグできます。
    > 
    > Riderを使用してコンパイルし、コンパイルエラーを確認できます。UEの自動コンパイルを使用してエラーが発生した場合は、`Saved/Logs/[name].Log`を確認してください。`UE`の出力する`Log`には一般的に日本語のエンコード問題が存在するため、システムのエンコードを`UTF-8`に調整する必要があるかもしれません。

3. **スケルトンのバインディング手順**

    - キャラクターアセットのスケルトンメッシュ【英語版では: `Skeleton Mesh`】をクリックし、右クリックして新しいアニメーションブループリントを作成し、アニメーションブループリントをダブルクリックして編集します。【不明な点はビデオと併せて確認することをお勧めします】
    - 右クリックして `Rebocap` を検索し、`Rebocap Body Pose` を選択してノードを作成し、ノードの右側の小人を出力ポーズの`Result`に接続します。
    - ブループリント編集ページの左下の変数のところでプラスボタンをクリックして新しい変数を作成し、変数タイプを検索して `Rebocap` を選択し、`RebocapMapData` をクラス参照として選択します。次に変数をブループリントにドラッグして、先ほど作成したノード `RetargetAsset` に入れると、自動的に変数ノードが生成されます。その後、左上のコンパイルボタンをクリックします。
    - 先ほど新しく作成した変数ノードをクリックし、右側のデフォルト値でプラスボタンをクリックして新しい`Map`アセットを作成します。自動的に新しいページに移動し、新しいページでユーザーがスケルトンマッピングを自分で入力する必要があります。注意として、24個のノードすべてを入力することをお勧めします。`Avatar`のスケルトン名に基づいて入力してください。
         > スケルトン名はブループリントページの上部の一番左の水色のスケルトン小人をクリックすると自動的にスケルトンを選択し、各スケルトンに対応するポイントを確認できます。`Rebocap`の24個のノードのポイントは標準の人体スケルトンポイントであり、ここでの`Rebocap`のスケルトン名はスケルトンボーンの始点で命名されています。例えば、`VRM`では、`LeftUpperLeg`と命名されたボーンの始点はお尻のところなので、`Rebocap`での命名は`L_Hip`、`LeftFoot`の始点は足首なので、対応する命名は`L_Ankle`、`Rebocap`での`L_Foot`は足の指のところに対応しています。UEの命名体系では一般的に `ball` と呼ばれます。
         >
      > `L Collar` 左肩のスケルトン
      > 
      > `L Shoulder` 左上腕のスケルトン
      > 
      > `L Elbow`  左前腕のスケルトン
      > 
      > `L Wrist` 左手の手のひらのスケルトン
      > 
      > `L Hand` 左手の中指のスケルトン【駆動しません】
      > 
      > スケルトンが多い場合は、適切なスケルトンを選択してマッピングすることができます。例えば、脊柱が6本ある場合は、その中の3本を選んでマッピングすることができます。
      
    - 先ほどのブループリントページに戻ります（選択したスケルトンマッピングは保存してコンパイルしないと有効になりません）、変数ノードの値を先ほど新しく作成した `Map` アセットに設定します。
    - 再度コンパイルし、`Warning` を確認します。通常、`Warning` は3つしか表示されません。もしスケルトンの `map` に誤りがある場合、特定のスケルトンが見つからないという `warning` が表示されます。
    - アニメーションブループリントエディタウィンドウを閉じ、上部の `ウィンドウ->バーチャルプロダクション->Live Link` をクリックし、次に `ソース->Rebocap Source->conn` を選択します【`port` はポート番号です。`Rebocap` のブロードキャストポート番号を変更した場合、ここも変更する必要があります】。`Rebocap` クライアントが開いている場合、`connect` は `ok` 状態になります。そうでない場合は `bad` 状態です。また、ユーザーは動作キャリブレーションを行った後にデータのブロードキャストを開始します。
      
     <div align="center">
     <img src="/img/ue_plugin/ue2.png" alt="pic_left" width="80%" />
     <img src="/img/ue_plugin/ue3.png" alt="pic_left" width="80%" />
     </div>

4. **コード説明**

   主な動作制御関連のコードは`Source\rebocap\Private\rebocap_pose_node.cpp`にあり、その他は周辺関連コードで、例えば`dll`の呼び出しや`livelink`です。その中で、`Init_Foot_Vertices_And_SkeletalData`関数はキャラクターのデフォルトの骨格位置と`vert`ポイントを取得し、地面接触用の両足の6つのポイント【各足6つ】を計算します。自動計算のため精度が不足する可能性があるので、ユーザーは自分で足底の6つのポイントを見つけてパラメータを渡すと、より正確になるかもしれません。

   PS：足底のサイズが大きいとキャラクターが上下に揺れる可能性があります。極端な例を挙げると、例えば2メートルの長い足で、キャラクターも2メートルの場合、つま先立ちしてから着地すると、つま先が地面に接触し続ける必要があるため、キャラクターが上下に揺れることになります。

5. **パッケージング説明**

   - 開発者
      > パッケージングが必要な開発者は、最新バージョンのプラグインをダウンロードできます（以前のバージョンではパッケージング後に実行できません）。`runtime`モードで`Livelink`接続管理が追加されており、`Plugins/rebocap_unreal_engine_plugin/Source/rebocap_runtime/Private/RebocapLivelinkManagerDemoWidget.cpp`ファイルの`ConnectLiveLink`と`DisconnectLiveLink`メソッドを参考にして自分で実装できます。プラグインのUIを無効にしたい場合は、`Plugins/rebocap_unreal_engine_plugin/Source/rebocap_runtime/rebocap_runtime.Build.cs`を変更し、`USE_REBOCAP_LIVELINK_MANAGER_DEMO`のマクロ定義をコメントアウトして自分でコンパイルしてください。プラグインを自分のプロジェクトに追加する開発者は、`livelink`の接続を管理するUIを自分で追加してください。
   - ブループリントユーザー
      `Livelink`を管理するためのブループリントノードが追加されました。ノード名はそれぞれ：`Connect to Rebocap Livelink Source`, `Disconnect to Rebocap Livelink Source`
      <img src="/img/ue_plugin/ue4.png" alt="pic_left" width="80%" />

**注意**:
1. `Editor`で`livelink`接続を使用する場合、`livelink`チャネルが占有され、`game`モードで接続できない可能性があります。`Editor`を再起動してから試してください。
2. `runtime`モード（`standalone or game mode`、つまりパッケージング後の実行）では、`runtime`モードでメッシュの頂点を取得する方法がまだ見つかっていないため、パッケージング後、自動骨格登録には足底が含まれず、足底のパフォーマンスは`Editor`モードより少し劣ります。将来的にこの問題を解決する予定です。

### 動画操作デモ
ここには音声はありませんが、一時的に使用するためのもので、後でより良いものにします。

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/ue_plugin/ue_user_guide.mp4" type="video/mp4" />
</video>
</div>


### Meta Human（またはデフォルトの Apose キャラクター）を TPose に変更（APose から TPose への変換

> 注意：A-pose は公式のものと一致している必要があります。それ以外の場合は、手動で角度を調整し、Apose を Tpose の一時的な角度ファイルとして保存することをお勧めします。詳細は以下の圧縮ファイル内のチュートリアルを参照してください。

<a href="/img/files/metahuman_change_tpose.zip" target="_blank" download="ue_ht_tpose.zip">ダウンロード</a>


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>