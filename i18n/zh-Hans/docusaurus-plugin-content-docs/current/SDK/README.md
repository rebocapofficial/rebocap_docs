---
sidebar_position: 1
title: "SDK 接口说明"
---
# SDK 接口说明
目前DLL整体对外暴露8个端口，各个SDK是对DLL接口的封装，可自行查看 cpp sdk中的 `include/rebocap_ws_sdk/rebocap_ws_sdk.h` 头文件查看。

SDK 输出的数值类型为四元数，可以支持多种坐标空间输出【默认的 opengl右手坐标系、blender、unity、ue】，输出的位移单位是 米。

其中python暂未接入 `rebocap_ws_sdk_calculate_foot_vertex` 接口

### 接口说明

* rebocap_ws_sdk_new
```cpp
    创建 sdk 实例，传入参数包括
    1. 坐标系空间，具体支持空间可在各个sdk中找到，这里不赘述。
    2. 是否使用全局坐标系，传入0则使用局部坐标系，局部坐标系是相对于父骨骼的坐标系，所有的旋转均是相对于 tpose 的旋转，如对旋转不清楚，可参考 blender、unity、以及ue的源码，其中unity的旋转相对更容易理解。
    
    返回值：
    返回 sdk 对象实例指针
```

* rebocap_ws_sdk_release
```
释放 sdk 实例对象，传输参数为 实例指针
```
* rebocap_ws_sdk_open
```
开启websocket client，连接到 websocket 端口，具体用法和返回值说明请查看 sdk 代码
```
* rebocap_ws_sdk_close
```
关闭websocket client，并断开连接，具体用法见sdk
```
* rebocap_ws_sdk_set_pose_msg_callback
```
注册消息回调，这里只有用户进行动作校准以后，websocket才会有数据吐出，帧率为 60帧每秒，具体用法见 sdk 代码
关节顺序请参考24个骨骼名称
```
* rebocap_ws_sdk_set_exception_close_callback
```
websocket 异常关闭回调注册，具体用法见 sdk 代码
```
* rebocap_ws_sdk_get_last_msg
```
除了回调的形式，这里也可以直接获取最后一条动作消息，数据格式和回调保持一致。
```
* rebocap_ws_sdk_calculate_foot_vertex
```
    这个接口主要用于注册脚底的接触点以及身体骨架到rebocap中
    需要传入身体骨架数据（各个关节点的位置，具体顺序和smpl顺序保持一致）
    如果需要dll自动计算接触点位置，那么需要传入脚底mesh，也可以自行传入脚底接触点位置信息（每只脚前后3个点位，共计12个点位），那么dll将不会自动计算而是采用传入数值
    注意，这里的单位是米，坐标是全局坐标，另外需要采用 opengl 坐标系，如果不是需要传入转换参数，具体用法请参考 unity demo 以及 ue 插件的使用
    
    这个接口相对比较复杂，请具备足够开发能力或者能够完全理解 unity demo中的代码或者能够完全理解 UE 插件代码用户使用，python版本不暴露这个接口，如有需要，可以自行从 cpp sdk 中或者原始 dll 中，封装 python 接口即可。
    
    大部分用户，开发插件可以自行上传 vrm 模型到 rebocap 客户端中，效果一样。对于脚底接触点位的理解，可以参考 blender 接入中，导出骨架的说明。
```

### 24个骨骼名称
对应 mixamo 和 smpl 规范名称如下，共计24个骨骼，参考如下，比如第0号下标骨骼即为屁股，也就是对应腰部节点。
其中，左右脚趾、左右手指对应的关节由于没有对应跟踪器节点，因此输出 local 旋转为0，如果采用 global 旋转，那么输出的旋转值和父节点保持一致。

- mixamo对应的名称
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
- smpl 规范对应的名称为
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

# SDK 下载
### python SDK
> 适用于 python3.6~python3.12

<a href="/img/files/rebocap_ws_sdk_python_v2.zip" target="_blank" download="rebocap_python_sdk_v2.zip">download python sdk v2</a>

python sdk v2 更新内容：
> 修复`get_last_msg`接口造成的死锁问题
> 增加所有`python`版本

### C# SDK
> 具体请查看下载文件中的 README.md
> 
> 用法上，可以参考 Unity 项目

<a href="/img/files/csharp_sdk_with_demo_v2.zip" target="_blank" download="rebocap_csharp_sdk_v2.zip">download csharp sdk v2</a>

c# sdk v2 更新内容：
> 修复`get_last_msg`接口造成的死锁问题


### CPP SDK
> 具体请查看下载文件中的 README.md
> 
> 用法上，可以参考 UE 项目

<a href="/img/files/rebocap_cpp_sdk_v03.zip" target="_blank" download="rebocap_cpp_sdk_v3.zip">download cpp sdk v3</a>

c++ sdk v3 更新内容：
> 修复`get_last_msg`接口造成的死锁问题
