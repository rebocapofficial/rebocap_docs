---
sidebar_position: 3
title: "UE 插件下载"
---
# UE 插件下载

以下是下载连接，UE查看源代码开发，可自行编译，目前插件只适用于 `UE5` 版本。

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin.zip">ue plugin source</a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_51_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_52.zip">ue 5.1 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_52_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_52.zip">ue 5.2 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_53_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_53.zip">ue 5.3 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_54_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_54.zip">ue 5.4 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_55_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_55.zip">ue 5.5 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_56_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_56.zip">ue 5.6 plugin prebuild </a>

# UE 使用说明

1. **在UE中新建工程**

   蓝图或者c++工程均可，如果需要二次开发插件，需要建立`c++`项目，导入人物（人物的默认姿态必须是`T-Pose`，不可是`A-Pose`，否则手臂表现将会异常），然后打开工程所在文件夹，新建文件夹 `Plugins 文件夹`，然后将`rebocap_unreal_engine_plugin`放入到`Plugins`中，例如新建 `testV3`工程，那么整体目录结构如下：

    <div align="center">
    <img src="/img/ue_plugin/ue1.png" alt="pic_left" width="80%" />
    </div>

2. **重新打开UE将会自动编译【释放的是源码，因此应该兼容所有版本】**

    > 二次开发和调试插件时，可以使用Rider直接打开 `[name].uproject` 即可开发和轻松调试。
    > 
    > 可以使用Rider编译，查看编译错误。如果使用UE自动编译，出现错误请查看`Saved/Logs/[name].Log`，`UE`输出的`Log`一般会存在中文编码问题，可能需要调节系统编码为`UTF-8`才能正常查看。

3. **骨骼绑定步骤**

    - 点击人物资产 骨骼网格体 【英文版本是: `Skeleton Mesh`】，右键新建动画蓝图，双击编辑动画蓝图。【不清楚的地方建议结合视频观看】
    - 右键搜索 `Rebocap`，选择 `Rebocap Body Pose`并创建节点，并将节点的右侧小人连接到输出姿态的`Result`中
    - 在蓝图编辑页面左下角的变量这里点击加号新建变量，变量类型需要搜索，搜索 `Rebocap`，选择 `RebocapMapData`，类引用，然后将变量拖入到蓝图中刚刚创建的节点 `RetargetAsset` 中，会自动产生一个变量节点。然后点击左上角的 编译按钮
    - 单击刚刚新建的变量节点，然后在右侧的默认值中，点击加号，新建一个`Map`资产，会自动跳转到一个新的页面，在新的页面中，需要用户自行填写骨骼映射。注意，建议24个节点都填写，大家可以根据`Avatar`的骨骼名称，来进行填写。
         > 骨骼名称可以在蓝图页面点击上方一栏中第一个浅蓝色的骨架小人，可以自动选择骨骼，查看每个骨骼对应的点位。`Rebocap`中24个节点的点位就是标准的人体骨骼点位，这里`Rebocap`中骨骼的名称是以骨骼骨头起点命名。比如`VRM`中，命名为 `LeftUpperLeg`的骨头，起点是屁股那里，所以在`Rebocap`中的命名就是`L_Hip`，`LeftFoot`的起点是脚踝，所以对应的命名是`L_Ankle`，`Rebocap`中`L_Foot`对应的是脚趾那里。在UE的命名体系中一般称为 `ball`。
         >
      > `L Collar` 左肩的骨骼
      > 
      > `L Shoulder` 左边上臂的骨骼
      > 
      > `L Elbow`  左边下臂的骨骼
      > 
      > `L Wrist` 左手手掌的骨骼
      > 
      > `L Hand` 左手中指的骨骼【不会驱动】
      > 
      > 如果骨骼较多，可以选择适当的骨骼进行映射，比如脊柱如果有6根，那么可以错开挑选其中的三根。

    - 回到刚刚的蓝图页面（已经选好的骨骼映射需要保存并且编译才会生效），选择变量节点的值为刚刚新建的 `Map` 资产。
    - 再次编译，查看`Warning`，一般`Warning`只会有3个，如果某个骨骼`map`填写错误，会报`warning`提示某根骨骼没有找到
    - 关闭动画蓝图编辑窗口，点击顶部 `窗口->虚拟制片->Live Link`，然后选择 `源->Rebocap Source->conn`  【`port`是端口号，如果`Rebocap`中的广播端口号改了这里需要修改】，如果`Rebocap`客户端打开，`connect`是 `ok` 状态，否则是 `bad` 状态。另外，用户只有进行动作校准以后才会开始广播数据。
      
     <div align="center">
     <img src="/img/ue_plugin/ue2.png" alt="pic_left" width="80%" />
     <img src="/img/ue_plugin/ue3.png" alt="pic_left" width="80%" />
     </div>

4. **代码说明**

   主要动作控制相关代码在`Source\rebocap\Private\rebocap_pose_node.cpp`中，其它属于外围相关代码例如`dll`调用和`livelink`。其中，`Init_Foot_Vertices_And_SkeletalData` 函数用于获取人物的默认骨架位置以及 `vert` 点位，计算双脚脚底用于地面接触的6个点【每只脚6个】，由于是自动计算可能不够精确，用户可以自行找到脚底的6个点位传参进去可能会更精确。
   
   PS：脚低尺寸较大的可能会导致人物上下震荡，举一个极端的例子，比如2米的大长脚，人物也只有2米，踮脚然后落地，如果需要保持脚尖接触地面，肯定人物就会上下起伏。

5. **打包说明**

   - 开发者
      > 对于需要打包的开发者，可以下载最新版本的插件（以前版本打包后无法运行），在`runtime`模式下增加了`Livelink`连接管理，可以参考 `Plugins/rebocap_unreal_engine_plugin/Source/rebocap_runtime/Private/RebocapLivelinkManagerDemoWidget.cpp` 文件中 `ConnectLiveLink` 和 `DisconnectLiveLink` 方法自行实现，如果需要关闭插件自带UI，可以修改 `Plugins/rebocap_unreal_engine_plugin/Source/rebocap_runtime/rebocap_runtime.Build.cs`，注释掉 `USE_REBOCAP_LIVELINK_MANAGER_DEMO` 这里的宏定义后自己编译即可。建议将插件放入自己工程的开发者，请自行增加UI管理 `livelink` 的连接。
   - 蓝图使用者
      增加了蓝图节点用于管理 `Livelink`，节点名称分别是：`Connect to Rebocap Livelink Source`, `Disconnect to Rebocap Livelink Source`
      <img src="/img/ue_plugin/ue4.png" alt="pic_left" width="80%" />

**注意**:
1. 如果你在 `Editor` 中使用 `livelink` 连接，可能会导致 `livelink` 通道占用导致 `game` 模式下无法连接成功，建议重启 `Editor` 后尝试。
2. 对于`runtime`模式（`standalone or game mode`，也就是打包后运行) ，由于暂时还没有找到`runtime`模式下获取 mesh 顶点的方法，因此打包以后，自动骨骼注册不包含脚底，脚底的表现会比 `Editor` 模式下差一点点，未来会解决这个问题。

### 视频操作演示
这里没有声音，作为临时使用，后续会更像

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/ue_plugin/ue_user_guide.mp4" type="video/mp4" />
</video>
</div>


### Meta Human (或者默认 Apose 人物）修改为 TPose（ APose 转 TPose

> 注意，A-pose 必须要和官方的一致才可以，否则建议自行手动修改角度，将 Apose 处理为 Tpose 临时角度文件保存，具体参考下边压缩包内教程。

<a href="/img/files/metahuman_change_tpose.zip" target="_blank" download="ue_ht_tpose.zip">下载</a>

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>