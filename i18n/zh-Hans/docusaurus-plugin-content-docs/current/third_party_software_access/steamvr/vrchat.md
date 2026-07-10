---
sidebar_position: 2
title: "VRChat 基本设置"
---

**阅读本教程之前，请务必[仔细阅读 SteamVR 的接入](README)！！！如果steamVR上 rebocap 的跟踪器图标都没有点亮过，本教程没有任何意义！！！**

# VRChat 基本设置

### vrchat 基础设置介绍
打开基础设置请按照下述步骤： 按手柄的 Y 按钮召唤菜单->点击齿轮图标->往下滑动到 `Tracking & IK`，如图所示
<div align="center">
 <img src="/img/vrchat_setting1.png" alt="left" width="49.5%" />
 <img src="/img/vrchat_simple_setting.png" alt="left" width="45%" />
 </div>

基础 IK 设置介绍关键点介绍：
1. 调节 VRChat 中的身高

    > 用户真实身高，这里填写和 Rebocap 中测量一致的身高即可，而不应该填写你的真实身高！因为所有的跟踪器都是按照 Rebocap 测量的高度来模拟的
    > 
    > Rebocap 测量身高是头显身高 * 1.05，关于身高测量错误[请查看这里](../../ui_help_doc/control/connect#vr_pannel)。
    > 
    > 如果你的头显测量的高度始终和自身不一致（指的是超过自身身高±5cm），那么可以关闭[VR面板](../../ui_help_doc/control/connect#vr_pannel)中的自动身高测量，在骨架页面调节身高即可。以最终显示的高度为准！然后在VRChat中，将身高设置为 Rebocap 中最终显示的身高。
    > **注意，这个解决方案并不是最好的**，因为如果头显本身测量身高不对，那么头显在空间中的位移量也是不正确的，比如头显真实向下移动一米，可能头显给出的移动数据只有0.6米，导致最终跟踪效果变差！

查看 Rebocap 测量身高方法：打开日志即可看到历史消息（如果你关闭自动身高，这里将不会显示！）
<div align="center">
 <img src="/img/rebocap_vr_height.png" alt="left" width="30%" />
 </div>

2. 调节 VRChat 测量模式

    > 刚使用VRChat全身动捕的用户，统一使用 `Height` 模式！对 VRChat IK 熟悉的用户，可以考虑使用 Arm 模式，配合 Arm

3. 是否允许全身追踪

    > 必须允许，如图中状态是开启

4. IK 锁定模式
  > 这个可以自行调节查看不同效果，如果不清楚，可以使用 LockHip 或者 LockHead，效果会有比较大的出入，特别是在坐下或者躺下的姿态会存在出入

### vrchat 高级 IK 设置介绍
打开基础设置请按照以下步骤： 按手柄的 Y 按钮召唤菜单->点击world，出现大的设置面板->点击齿轮图标->选择左侧 `Tracking & IK`，如图所示
<div align="center">
 <img src="/img/vrchat_advanced_setting.png" alt="left" width="24%" />
 <img src="/img/vrchat_advanced_setting2.png" alt="left" width="24%" />
 <img src="/img/vrchat_advanced_setting3.png" alt="left" width="24%" />
 <img src="/img/vrchat_advanced_setting4.png" alt="left" width="24%" />
 </div>

特别说明：刚使用VRChat全身动捕的用户，除了图中标注的，其它全部使用默认设置！！！可以参考截图

图中标注的4个设置介绍：
1. 是否使用传统 IK 开关！
    > 不建议开启，默认使用 IK 2.0，使用传统 IK 会带来其它问题，比如腰部下陷到屁股中
2. 手臂身高比例
    > **只有设置 测量模式 为 Arm，这里的选项才会有效**！用于熟悉 VRChat IK 用户使用，不熟悉不建议使用，如果使用有问题，可以和其它用户交流，官方不在这个点上做任何技术支持！
    > 
    > 一般情况下，设置为Arm模式，可以调节这里的比例，让腿部表现更自然，具体方法是，打开 VRChat 中的校准模式，看到跟踪器点位以后，通过比例，让脚上跟踪器的点位在脚背附近即可。

:::danger 提示


如果用户发现点位少了，很可能是陷入到地板下边了！可以抬脚看下！

:::

3. 是否显示跟踪器校准范围
    > 也就是那个绿色的范围球
4. 切换跟踪器显示模型
    > 如果需要切换为十字架，按照图中设置的 `axis` 即可，可以自行切换查看

<a id="calibration_in_vrc"></a>

### 如何在VRChat中进行校准
前述基础设置完成后，按照如下流程：
1. 按左手柄Y按钮打开设置面板
2. 点击面板中的小人图标（前提是 steamVR 中虚拟跟踪器已经被激活了，否则这里的图标和下图不一致，不清楚请查看 [SteamVR接入](README)）
    > ![全身校准按钮](/img/vrchat_calibrate.png)
3. 调节站姿，摆出Tpose，让脚背的跟踪器点位在脚背附近，如果打开了绿色的范围球，让范围球尽量小点（对IK非常熟悉的用户，可以自行调节）
    > 如果发现脚背在地板下边，这个往往是 VRChat 的Bug导致，VRChat对地面识别存在问题，比如你将手柄放置在现实中的地板，VRChat中手柄的位置可能在地板下边（如果悬空也是同理）。
    > 
    > 目前没有很好的办法解决，可以重启VRChat，也可以校准以后，使用 `ovr advanced setting` 调节地面高度，一定要在动作校准以后再调节！！！
4. 保持T-pose，如果全身对齐了，两只手同时扣下扳机按键（扳机按键指的是食指常驻区域按键），即可完成 VRChat 中的校准！

  <div>
  <video id="video" controls preload="metadata" width="100%">
        <source id="mp4" src="/img/vrc_calibrate.mp4" type="video/mp4" />
  </video>
  </div>


# VRChat 遇到问题诊断步骤
> 非细节问题，细节问题一般特指：腿在某个状态下无法伸直等，这些和VRC以及骨架设置相关性比较高。后续会补充说明。
> 
> 这里主要解决歪了，或者整体错乱问题。
> 
> 细节问题以后会给出一些文档说明，目前可以咨询资深群友

- 查看3D预览界面是否正常
- 查看SteamVR默认界面中的跟踪器是否正常
    > 具体[请查看这里](README#how_to_solve_tracker_slant)
- 检查 VRC 关键设置是否和上述教程一致

### 为什么VRC中人物手臂无法伸直
- 和模型骨架与自身骨架不匹配导致，如果模型骨架的手臂偏短，就比较容易伸直，核心是骨骼比例和现实人物不一致导致。
  > 高级玩家可以自行尝试使用 Arm 模式，然后修改 `arm vs height ratio`。
  > 
  > 这里举个极端例子方便玩家理解，比如虚拟人物的手臂有3米，人物本身的高度只有1.7米，现实中人物双臂正常下垂的位置在腰这里，但是 VRChat 必须要尊重现实中手部的位置，那么只能将虚拟人物的手臂弯曲一定的角度了。

### 为什么我校准的时候，人物的双脚在地板下边
> 这里在 [如何在VRChat中进行校准](#calibration_in_vrc) 的第三点已经有说明

### 为什么我的双腿无法伸直
> 这里和虚拟人物骨骼比例和现实中出入比较大有关，一般使用和自身一致的人物骨架，然后在rebocap中也调节为这个骨架效果最好。
> 
> 另外，也可以使用一点校准的小技巧缓解这个问题，比如将 VRChat 中的身高设置比rebocap中测量的低一点点，腿在坐姿模式下更容易伸直。
> 
> 这里针对的是非跳舞用户，跳舞用户，依然建议按照 rebocap 测量身高设置。

### 为什么坐下以后双脚会交叉
1. 排除裤裆拉扯影响
2. 更改大腿跟踪器位置，查看不同位置的效果
3. 如果仍有问题，请[调节补偿](../../ui_help_doc/control/cap_param#up_leg_com)（优先调节大腿补偿），根据3D预览中效果调节即可！
4. 动作校准期间，双脚间距离更近一些
5. 在 VRChat 校准期间，双脚间距离更近一点

关于1、2两个点，具体描述请仔细[阅读教程部分](../../tutorial/instroction_for_straps#tracker_position_recomendation)

### 怎么提升稳定性
1. 绑带使用[复杂绑定方法](../../tutorial/instroction_for_straps#quick_fix_complex_install)，或者使用购买宽绑带
2. 脚底传感器处理比较重要，[请查看这里](../../tutorial/instroction_for_straps#tracker_position_on_body)
3. 跳舞用户，特别是激烈的热舞，建议找到磁场环境相对较好，关闭抗磁模式使用


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>