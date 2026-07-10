---
sidebar_position: 2
title: "Blender 插件下载"
---
# Blender 插件下载

点击下边链接可直接下载：
- **Blender Plugin Beta 9**
<a href="/img/files/rebocap_blender_plugin_v9.zip" target="_blank" download="rebocap_blender_plugin_v9.zip">blender with python 3.6~3.12</a>
更新说明: 
- 兼容 Blender4.4 及以上版本
- 修复 rebocap 插件进程残留 bug
- 修复骨架导出 BUG，导致实时驱动的情况下，脚底不稳定。
- 支持所有 python 3的版本，比如可以支持 blender 4.1
- 支持 `Mixamo` 骨架直接，可以自动绑定
- 修复 fbx 模型驱动的 bug
- 修复动画录制轴向 bug
- 增加骨骼吸附选取功能


# Blender 教程视频
注意：视频没有声音！

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/for_blender_install/blender_usage.mp4" type="video/mp4" />
</video>
</div>


# Blender 插件安装

安装步骤：
依次打开  `Edit->Preference`，弹出面板选择 `Add-ons`，右边点击 `Install` 选择刚刚下载的  `rebocap_blender_plugin.zip`，然后点击 Install Add-on安装。安装完成以后，需要勾选生效，如图输入 rebocap，然后勾选上插件就安装成功了。

<div align="center">
    <img src="/img/for_blender_install/blender_1.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_2.png" alt="pic_right" width="45%" />
</div>

安装成功以后，右侧应该会出现对应的插件菜单，如图。
    > 注意，如果没看到菜单，有一个小的指向左侧的展开箭头点一下就能看到了。

<div align="center">
    <img src="/img/for_blender_install/blender_3.png" alt="pic_left" width="25%" />
</div>

:::info 安装失败怎么处理


如果部分用户安装失败，请找到 Blender 插件原始安装位置，将 `rebocap_blender_plugin.zip` 直接解压到 blender 安装目录即可。插件默认安装位置 `C:\Users\<your_username>\AppData\Roaming\Blender Foundation\Blender\<version_number>\scripts\addons`，其中`your_username`是您的用户名，`version_number`是您安装的Blender的版本号。

:::


![Blender安装位置示意图](/img/for_blender_install/blender_23.png)


# 骨骼绑定
1. VRM 骨骼自动绑定
2. FBX如果使用 `Mixamo` 骨骼规范，采用 `direct` 模式可以自动绑定，即 `direct` 模式下，可以驱动所有 `Mixamo` 的 `avatar`
   > 但是脚底的12个固定点位需要手动选择（如果对脚底效果要求不高，可以忽略）。

:::danger 提醒！！！


必须在rebocap客户端打开以后，并且动作校准以后再点击 `connect`，否则可能需要重启 blender 才能继续实时动作捕捉。

绑定的人物骨骼是驱动的 hip 节点，如果 hip 节点不是根骨个，或者无法移动 hip 节点（部分骨架强行将 hip 和 root 关联，并且hip的local位移无法改变），那么可能人物的屁股始终在原地。

:::


Tips：fbx 缩放到 米 为单位请参考下图位置，将 `scale` 修改为 0.01
<div align="center">
    <img src="/img/for_blender_install/fbx_change_meter.png" alt="pic_left" width="25%" />
</div>


### 打开开发者模式
依次打开 `Edit->Preference`，选择左侧的 `Interface`，然后勾选 `Developer Extras`

<div align="center">
    <img src="/img/for_blender_install/blender_4.png" alt="pic_left" width="45%" />
</div>

### 导入人物

以下以 `VRM` 格式人物为例，VRM 插件下载地址 [请看这里](https://github.com/saturday06/VRM-Addon-for-Blender/releases/download/2_20_24/VRM_Addon_for_Blender-2_20_24.zip)

FBX 格式人物推荐使用 [`better fbx`](https://blendermarket.com/products/better-fbx-importer--exporter) 插件导入。

<div align="center">
    <img src="/img/for_blender_install/blender_5.png" alt="pic_left" width="45%" />
</div>

### 插件中选择目标人物

导入以后，我们打开 `REBOCAP_CONNECTION`，选中右侧 `Armature`【不选中不会出现 `Drive Type`选择项】，然后在`REBOCAP_CONNECTION`菜单中选择 `retarget`，然后`Source`选择这个人物，可以直接把 `Armature` 拖拉进 `Source` 框中。

<div align="center">
    <img src="/img/for_blender_install/blender_6.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_7.png" alt="pic_left" width="45%" />
</div>

Source选择以后，会出现以下菜单:

<div align="center">
    <img src="/img/for_blender_install/blender_8.png" alt="pic_left" width="45%" />
</div>

### 骨骼绑定

其中每根骨骼需要选择目标人物身上对应的骨骼。【这里只有英文部分，如不清楚，请自行翻译】

Pelvis是屁股，Spine是屁股上边的一节骨骼，Chest有两节，部分人物Chest只有一节，那么绑定其中一节即可【任意一节都行】，如果目标人物有两根骨骼，选择靠近Chest的那根骨骼。Leg 的 四根骨骼都必须要绑定，Toe是可选项。

对于VRM格式人物，导入以后可以直接点击 Auto Detect，会自动填充的，其它格式需要用户自行查找骨骼对应名称然后选择即可。

<div align="center">
    <img src="/img/for_blender_install/blender_9.png" alt="pic_left" width="80%" />
</div>

### 获取鞋底的顶点 ID

这一步比较麻烦一些，对效果无过分追求的可以忽略，主要是获取鞋底的边界，这样子人物走动会沿着边界走，但是如果鞋子太大，容易导致双脚切换时发生上下震动现象。

1. 第一步是打开开发者模式，这个在文档开头已经提到了。

2. 调节为Object Mode，然后取消Bone选择，鼠标点击到人物的脚上选择Mesh。

    <div align="center">
    <img src="/img/for_blender_install/blender_10.png" alt="pic_left" width="80%" />
    </div>
    <div align="center">
    <img src="/img/for_blender_install/blender_11.png" alt="pic_left" width="80%" />
    </div>

3. 点击选择人物，一定要看到鞋子部分被选中了，然后切换成EditMode。

    <div align="center">
    <img src="/img/for_blender_install/blender_12.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_13.png" alt="pic_left" width="45%" />
    </div>
    <div align="center">
    <img src="/img/for_blender_install/blender_14.png" alt="pic_left" width="80%" />
    </div>

4. 打开Indices，这个在Blender3.6和Blender4.0中有所不同

    <div align="center">
    <img src="/img/for_blender_install/blender_15.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_16.png" alt="pic_left" width="45%" />
    </div>

5. 选择顶点，并记录对应的数值。

    总共需要记录12个顶点，每只脚的前脚掌 左中右，  脚后跟的左中右。注意，这个是人物自身的左右方向，查找的时候可以把人物背部朝向自己容易辨认一些。

    在选择点位期间，由于是需要选择 Mesh，因此选择期间是看不到右侧的菜单的。需要自行记录下来，顺序是  前脚掌 左中右，  脚后跟的左中右。

    这里提一下Blender的基本操作
    > shift+鼠标滚轮按下去 是拖动
   > 
    > ctrl+鼠标滚轮按下去是  缩放操作
   > 
    > 鼠标滚轮按下去是 改变视角

6. 记录完成以后，从 `Edit` 模式切换回 `Object` 模式，选中 `Armature`，然后填充上脚的ID即可。

    <div align="center">
    <img src="/img/for_blender_install/blender_21.png" alt="pic_left" width="80%" />
    </div>

#### 获取鞋底的顶点 ID 绑定举例说明
比如，下边这个人物的左边前脚掌三个分别是：
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

# 骨架导出
关键骨骼都绑定以后，会出现 save bone按钮，点击导出后选择位置保存即可。

 <div align="center">
 <img src="/img/for_blender_install/blender_22.png" alt="pic_left" width="60%" />
 </div>

然后在Rebocap中导入，[请查看这里](../ui_help_doc/control/skeleton_setting#skeleton_import)

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>