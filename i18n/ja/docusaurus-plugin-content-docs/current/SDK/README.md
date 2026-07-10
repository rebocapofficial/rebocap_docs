---
sidebar_position: 1
title: "SDK インターフェース説明"
---
# SDK インターフェース説明
現在、DLL全体で外部に8つのポートを公開しており、各SDKはDLLインターフェースのラッパーです。cpp sdkの `include/rebocap_ws_sdk/rebocap_ws_sdk.h` ヘッダーファイルを参照してください。

SDKの出力値の型は四元数で、複数の座標空間出力をサポートしています【デフォルトのopengl右手座標系、blender、unity、ue】。出力の移動単位はメートルです。

現在、pythonは `rebocap_ws_sdk_calculate_foot_vertex` インターフェースに接続されていません。

### インターフェース説明

* rebocap_ws_sdk_new
```cpp
    SDKインスタンスを作成します。渡すパラメータは以下の通りです：
    
    1. 座標系の空間。具体的なサポート空間は各SDKで確認できますので、ここでは詳述しません。
    2. グローバル座標系を使用するかどうか。0を渡すとローカル座標系を使用します。ローカル座標系は親ボーンに対する座標系であり、すべての回転はTポーズに対する回転です。回転について不明な点があれば、Blender、Unity、及びUEのソースコードを参照してください。その中でもUnityの回転は比較的理解しやすいです。
    
    戻り値：
    SDKオブジェクトインスタンスのポインタを返します。
```

* rebocap_ws_sdk_release
```
SDKインスタンスオブジェクトを解放し、パラメータとしてインスタンスポインタを渡します。
```
* rebocap_ws_sdk_open
```
websocketクライアントを開き、websocketポートに接続します。具体的な使用法と戻り値の説明はsdkコードを参照してください。
```
* rebocap_ws_sdk_close
```
websocketクライアントを閉じ、接続を切断します。具体的な使用法はsdkを参照してください。
```
* rebocap_ws_sdk_set_pose_msg_callback
```
メッセージコールバックを登録します。ここではユーザーが動作キャリブレーションを行った後にのみ、websocketからデータが出力されます。フレームレートは毎秒60フレームです。具体的な使用法はsdkコードを参照してください。
関節の順序は24個の骨格名称を参照してください。
```
* rebocap_ws_sdk_set_exception_close_callback
```
websocketの異常終了コールバックを登録します。具体的な使用法はsdkコードを参照してください。
```
* rebocap_ws_sdk_get_last_msg
```
コールバック形式以外にも、ここで最後の動作メッセージを直接取得することができます。データ形式はコールバックと一致しています。
```
* rebocap_ws_sdk_calculate_foot_vertex
```
    このインターフェースは、主に足底の接触点および身体のボーンをReboCapに登録するために使用されます。身体のボーンデータ（各関節の位置、具体的な順序はSMPLの順序と一致する必要があります）を渡す必要があります。
    
    接触点の位置をDLLが自動的に計算する必要がある場合は、足底のメッシュを渡す必要があります。また、足底の接触点の位置情報（各足の前後に3つの点、合計12点）を自分で渡すこともできます。この場合、DLLは自動計算を行わず、渡された値を使用します。
    
    注意点として、ここでの単位はメートルであり、座標はグローバル座標です。また、OpenGL座標系を使用する必要があります。そうでない場合は変換パラメータを渡す必要があります。具体的な使い方については、UnityデモやUEプラグインの使用を参照してください。
    
    このインターフェースは比較的複雑ですので、十分な開発能力を持っているか、Unityデモのコードを完全に理解できるか、UEプラグインのコードを完全に理解できるユーザーが使用してください。Pythonバージョンではこのインターフェースは公開されていませんので、必要な場合は自分でC++ SDKや元のDLLからPythonインターフェースをラップしてください。
    
    ほとんどのユーザーは、プラグインを開発する際に自分でVRMモデルをReboCapクライアントにアップロードすることができます。効果は同じです。足底の接触点の理解については、Blenderの接続に関する骨格のエクスポート説明を参考にしてください。
```

### 24個の骨格名称
mixamoとsmplの規格名称に対応しており、合計24個の骨格があります。以下を参照してください。例えば、0番目のインデックスの骨格はお尻で、腰部ノードに対応しています。
左右の足の指、左右の手の指に対応する関節は対応するトラッカーノードがないため、local回転は0を出力します。global回転を使用する場合、出力される回転値は親ノードと一致します。

- mixamoに対応する名称
```python
joints_mixamo = [
        "mixamorig:Hips",
        "mixamorig:LeftUpLeg",
        "mixamorig:RightUpLeg",
        "mixamorig:Spine",
        "mixamorig:LeftLeg",
        "mixamorig:RightLeg",
        "mixamorig:Spine1",
        "mixamorig:LeftFoot",
        "mixamorig:RightFoot",
        "mixamorig:Spine2",
        "mixamorig:LeftToeBase",
        "mixamorig:RightToeBase",
        "mixamorig:Neck",
        "mixamorig:LeftShoulder",
        "mixamorig:RightShoulder",
        "mixamorig:Head",
        "mixamorig:LeftArm",
        "mixamorig:RightArm",
        "mixamorig:LeftForeArm",
        "mixamorig:RightForeArm",
        "mixamorig:LeftHand",
        "mixamorig:RightHand",
        "mixamorig:LeftHandIndex1",
        "mixamorig:RightHandIndex1"
]
```
- smpl規格に対応する名称
```python
joints_smpl = [
    "Pelvis",
    "L_Hip",
    "R_Hip",
    "Spine1",
    "L_Knee",
    "R_Knee",
    "Spine2",
    "L_Ankle",
    "R_Ankle",
    "Spine3",
    "L_Foot",
    "R_Foot",
    "Neck",
    "L_Collar",
    "R_Collar",
    "Head",
    "L_Shoulder",
    "R_Shoulder",
    "L_Elbow",
    "R_Elbow",
    "L_Wrist",
    "R_Wrist",
    "L_Hand",
    "R_Hand"
]
```

# SDK ダウンロード
### python SDK
> python3.6~python3.12に適用

<a href="/img/files/rebocap_ws_sdk_python_v2.zip" target="_blank" download="rebocap_python_sdk_v2.zip">download python sdk v2</a>

python sdk v2 更新内容：
> `get_last_msg`インターフェースによるデッドロック問題を修正
> すべての`python`バージョンを追加

### C# SDK
> 詳細はダウンロードファイル内のREADME.mdを参照してください。
> 
> 使用法については、Unityプロジェクトを参照できます。

<a href="/img/files/csharp_sdk_with_demo_v2.zip" target="_blank" download="rebocap_csharp_sdk_v2.zip">download csharp sdk v2</a>

c# sdk v2 更新内容：
> `get_last_msg`インターフェースによるデッドロック問題を修正


### CPP SDK
> 詳細はダウンロードファイル内のREADME.mdを参照してください。
> 
> 使用法については、UEプロジェクトを参照できます。

<a href="/img/files/rebocap_cpp_sdk_v03.zip" target="_blank" download="rebocap_cpp_sdk_v3.zip">download cpp sdk v3</a>

c++ sdk v3 更新内容：
> `get_last_msg`インターフェースによるデッドロック問題を修正


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>