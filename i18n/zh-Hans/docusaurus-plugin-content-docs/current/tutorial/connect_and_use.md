---
sidebar_position: 4
title: "连接"
---

# 连接
1. 点亮要连接的跟踪器
   > 支持的跟踪器组合模式见 [上一个章节](instroction_for_straps#follow_mode)
2. 将接收器插入电脑USB接口中
3. 打开 Rebocap 软件点击连接

![连接接收器](/img/connect.gif)

<a id="how_to_solve_cannot_connect"></a>

### 无法连接原因及解决方案
<details>
<summary>点击这里展开，查看无法连接或者发送数据失败具体原因</summary>


* USB接口有问题，比如部分用户的电脑USB接口积灰，容易导致连接不稳定。
> 更换 USB 插口尝试，或者重新插拔
* 已经启动了一个 `Rebocap` 客户端，导致端口被占用，或者其它程序占用了端口
> 现象是 `连接` 按钮可以点击，但是连接失败，这个时候需要确保其它 `Rebocap` 客户端完全关闭，建议重新插拔接收器，同时在任务管理器中查找其它 `Rebocap` 进程，如果可以找到强制结束
* 确保串口正常，没有安装其它模拟串口软件，部分用户安装模拟串口设备以后，将会导致驱动失效
> 例如安装了 `com0com` 驱动，需要卸载驱动，然后重新插拔接收器。
* 确保驱动没有被更换，这里可以按照下图所示操作来回滚接收器串口驱动，如果还不能连接，拔掉接收器重新插入。
  >   连接后无法校准，并且无法修改RGB灯颜色，也可以尝试回滚驱动

    ![回滚接收器驱动](/img/rollback_driver.gif)


</details>

### 连接后信号弱或者信号不稳定
* 如果使用台式机，请不要将接收器放置在机箱后边
* 接收器旁边尽量保持5cm以上空旷区域，比如不要在接收器旁边插入U盘，如果可以，尝试延长线也许对信号有一定帮助


# 校准
穿戴请参考下图，具体佩戴位置因人而异，原理及细节描述请参考[上一章节](instroction_for_straps#tracker_position_recomendation)

:::info 首次使用务必测试15点


如果测试效果不佳，可能有以下原因
1. 磁场问题，具体解决方案请[参考这里](../QA/magnet)
2. 陀螺仪可能需要校准，请[参考这里](../ui_help_doc/control/config#gyrocalibrate)
3. 穿戴拉扯问题，请[仔细阅读并参考这里](instroction_for_straps#tracker_position_on_body)

:::


<a id="pose_calibration"></a>

### 动作校准
点击软件界面中的 动作校准 按钮，动作校准参考如下图，软件中也有对应的图片提示，其中要点和动作规范务必全部阅读。

- **校准要点**
  * 点击动作校准以后，立即进入A-Pose姿态保持静止
    > 系统会在点击2秒后开始检测人物是否处于静止，注意控制前后晃动幅度，尽最大可能降低晃动，用于完成各个传感器初始化。检测时长为10秒，只要检测到最近2秒内处于静止，会立即进入校准程序。
  * 每个动作在快速滴滴声期间，系统会录制对应姿态数据
    > 快速滴滴声期间务必保持静止，建议切换动作在快速滴滴声响完后1秒再开始切换
  * 切换动作后请务必保持静止，等待快速滴滴响起，切换过程建议在2秒内完成
  * 切换动作过程一定不能移动双脚
    > 双脚在校准期间一定严格保持静止，不要有任何移动。

- **动作规范**
  * **A-Pose**
    
    双腿垂直向下，尽量平行，双脚之间保持一拳左右间距，双手绷紧垂直向下，不要弯曲，手心朝向自身，停止脊背，目视正前方
    > 这里如果大家觉得校准以后双脚闭合，虚拟人物双脚交叉了，那么在校准的时候减小双脚间距
    > 
    > 如果觉得校准以后双脚闭合，虚拟人物双脚间距太大，那么可以在校准的时候增加双脚间距
  * **T-Pose**
    
    双腿和A-Pose保持一致，双手保持向外展开，务必和肩部同宽，且两只手在一条直线上，手掌向下
  * **S-Pose**
    
    双腿向正前方微微弯曲约30度即可，不用过度弯曲，双手保持向前，和上半身垂直，高度平行与肩部，且两个手臂平行
    > 如果手臂没有佩戴跟踪器，则手臂的动作可以忽略
  * **B-Pose**
    
    上半身向前弯曲30度即可，手部动作不用管
    > B-Pose全称为 Blend-Pose，主要用于校准腰部、胸部、头部的跟踪器的航向角。


下图从左往右依次是：`APose`  `TPose`  `SPose`  `BPose`
<div align="center">
<img src="/img/apose.png" alt="left" width="22%" />
<img src="/img/tpose.png" alt="left" width="22%" />
<img src="/img/spose.png" alt="left" width="22%" />
<img src="/img/bpose.png" alt="left" width="22%" />
</div>


<a id="third_party"></a>

# 软件接入
### SteamVr 接入 [请看这里](../third_party_software_access/steamvr/README)
- VRChat 接入 [请看这里](../third_party_software_access/steamvr/vrchat)
- 社区接入教程 [https://kdocs.cn/l/crsa6MIP1mOd](https://kdocs.cn/l/crsa6MIP1mOd)，如果无法链接访问请<a href="/img/files/RebocapVRchat指南-中文.pdf"  target="_blank" download="RebocapVRchat指南-中文.pdf">下载PDF文件</a>查看（离线文件更新可能不及时）

### VMC 协议用户接入 [请看这里](../third_party_software_access/VMC/README)
- warudo 接入 [请看这里](../third_party_software_access/VMC/warudo) 或者 [查看这里视频](https://www.bilibili.com/video/BV1xyhFz3E9v)

### 抖音直播伴侣接入 [请看这里视频](https://www.bilibili.com/video/BV1fPbwzbEak)

### 云镜虚拟直播 接入 [请看这里视频](https://www.bilibili.com/video/BV1z7hFzfEw6)


# 必须了解项
为了避免使用中遇到的各种问题（比如跟踪器莫名其妙歪了等问题），也为了您有更好的动捕体验，请务必阅读下述说明。

### 硬件校准
- [磁场校准](../ui_help_doc/control/config#magnetcalibrate)
- [陀螺仪校准](../ui_help_doc/control/config#gyrocalibrate)

### 软件上动捕配置项怎么设置
- 关于磁场部分配置，请阅读[磁场相关说明](../QA/magnet)
- 其它配置，可以点击每个配置面板右上角问号图标

### 绑带怎么绑定最好
如果跳过[上一章节](instroction_for_straps)阅读，还请在空闲时间阅读，或者遇到问题以后务必详细阅读

:::info 重要点再次强调


这里再次强调，脚底的跟踪器绑定方式很关键，尽量不要用绑带，防止跟踪器因为绑带和地面摩擦导致影响整体动捕效果，具体请看上一章节说明。

:::


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>