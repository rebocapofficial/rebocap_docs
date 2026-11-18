---
sidebar_position: 1
title: "SDK インターフェース説明"
---
<span id="sdk-インターフェース説明" class="legacy-anchor-alias" aria-hidden="true"></span>

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

<span id="sdk-ダウンロード" class="legacy-anchor-alias" aria-hidden="true"></span>

# SDK ダウンロード

## Windows

### python SDK
> 64bit CPython 3.6～3.14 · Microsoft Visual C++ 2015–2022 x64 ランタイムが必要

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="/img/files/Rebocap_Windows_x64_Python_v3.zip" download="Rebocap_Windows_x64_Python_v3.zip">
<span class="os-switch-download-main">Python SDK v3 をダウンロード</span>
<span class="os-switch-download-meta">Python 3.6 – 3.14 · x64</span>
<span class="os-switch-download-date">更新日：2026.11.18</span>
</a>
</div>

<details class="plain-details sdk-history"><summary>旧バージョン</summary>
<div style="margin-top: 10px;">
<p><strong>Python SDK v2</strong>（python3.6~python3.12対応）：<a href="/img/files/rebocap_ws_sdk_python_v2.zip" download="rebocap_python_sdk_v2.zip">ダウンロード</a></p>
<p><code>get_last_msg</code> によるデッドロック問題を修正；すべての python バージョンに対応</p>
</div>
</details>

### C# SDK
> Windows x64 · .NET Framework 4.8 サンプル · Microsoft Visual C++ 2015–2022 x64 ランタイムが必要

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="/img/files/Rebocap_Windows_x64_CSharp_v3.zip" download="Rebocap_Windows_x64_CSharp_v3.zip">
<span class="os-switch-download-main">C# SDK v3 をダウンロード</span>
<span class="os-switch-download-meta">C# · .NET Framework 4.8</span>
<span class="os-switch-download-date">更新日：2026.11.18</span>
</a>
</div>

<details class="plain-details sdk-history"><summary>旧バージョン</summary>
<div style="margin-top: 10px;">
<p><strong>C# SDK v2</strong>（Unity サンプル付き）：<a href="/img/files/csharp_sdk_with_demo_v2.zip" download="rebocap_csharp_sdk_v2.zip">ダウンロード</a></p>
<p><code>get_last_msg</code> によるデッドロック問題を修正</p>
</div>
</details>

### CPP SDK
> Windows x64 · C++17 · Microsoft Visual C++ 2015–2022 x64 ランタイムが必要

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="/img/files/Rebocap_Windows_x64_CPP_v3.zip" download="Rebocap_Windows_x64_CPP_v3.zip">
<span class="os-switch-download-main">CPP SDK v3 をダウンロード</span>
<span class="os-switch-download-meta">C++ · C++17 · x64</span>
<span class="os-switch-download-date">更新日：2026.11.18</span>
</a>
</div>

## Linux

### Python SDK（Linux）
> Linux x86-64 · CPython 3.6～3.14 · Ubuntu 22.04 でビルド、GLIBC 2.34+ と GLIBCXX 3.4.29+ が必要

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="/img/files/Rebocap_Linux_x86_64_Python.tar.gz" download="Rebocap_Linux_x86_64_Python.tar.gz">
<span class="os-switch-download-main">Linux Python SDK をダウンロード</span>
<span class="os-switch-download-meta">Python 3.6 – 3.14 · Ubuntu 22.04+</span>
<span class="os-switch-download-date">更新日：2026.11.18</span>
</a>
</div>

### CPP SDK（Linux）
> Linux x86-64 · C++17 · Ubuntu 22.04 でビルド、GLIBC 2.34+ と GLIBCXX 3.4.29+ が必要

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="/img/files/Rebocap_Linux_x86_64_CPP.tar.gz" download="Rebocap_Linux_x86_64_CPP.tar.gz">
<span class="os-switch-download-main">Linux CPP SDK をダウンロード</span>
<span class="os-switch-download-meta">C++ · C++17 · Ubuntu 22.04+</span>
<span class="os-switch-download-date">更新日：2026.11.18</span>
</a>
</div>

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
