---
sidebar_position: 1
title: "是否支持Mac以及Linux"
---
## 是否支持Mac以及Linux
> 当前阶段不支持，linux未来也不支持，mac可能支持

## 是否支持一体机
> 未来计划支持 quest & pico，具体看 设备对 USB 接收器（即专用的信号接收器）的支持程度

<a id="audio"></a>

## 音频初始化失败
> 检查音频设备驱动问题

<a id="poor_signal"></a>

## 信号质量较差怎么处理
> 首先检查[信号强度](../ui_help_doc/info#hardware_detail)，确保接收器以及跟踪器附近没有其它较强信号干扰或者屏蔽，比如接收器不要放置再机箱背部，另外接收器附近不要有U盘等。
> 
> 其次确保 `CPU` 负载不要太高，或者`CPU`本身处于省电模式，尽量保障 `CPU` 负载在 70% 以内，同时排除 `CPU` 主频太低问题，例如笔记本散热不佳，可能导致主频低于 `2.5GHz`。

<a id="not_static"></a>

## 校准时未检测到人物静止
> 一般情况下，我们保持 `Apose` 会存在前后一定幅度的前后晃动，请尽量控制，另外，校准细则请[参考这里](../tutorial/connect_and_use#pose_calibration)。

<a id="send_failed"></a>

## 提示发送校准数据失败
> 确保信号强度没有问题的情况下，优先检查 `USB` 接收器驱动，这种一般情况下是由于 `USB` 驱动问题导致，具体方案[请看这里](../tutorial/connect_and_use#how_to_solve_cannot_connect)

<a id="need_calibrate_gyro"></a>

## 提示部分节点陀螺仪可能需要校准
> 这个信息主要用于提示，因为人物没有静止，也会导致检测陀螺仪（跟踪器上的角速度传感器）静止信息有误。核心是检查跟踪器放置在地面绝对静止时，观测陀螺仪的数据，除了个别异常值，大部分时候处于 0.3 以内属于正常，否则建议校准，6轴模式建议每次使用前校准陀螺仪，具体校准方法请[查看这里](../ui_help_doc/control/config#gyro_calibrate)。

<a id="vr_height"></a>

## VR模式下，校准提示的身高和个人身高不相符
> Rebocap 设备本身并不具备测量身高能力，身高测量完全读取的是头显给出的数据，具体请[查看这里](../ui_help_doc/control/connect#vrpannel)。

<a id="port_open_failed"></a>

## 广播端口启动失败
> 端口被占用，或者上一个 `rebocap` 实例存在进程残留，确保 `rebocap` 只会开启一个，并且任务管理器中只存在一个 `rebocap` 进程。

<a id="connect_failed"></a>

## 连接器连接异常
1. 排除端口被占用，具体请确保 `rebocap` 客户端实例只开启一个，并且没有其它软件占用这个端口。

2. 驱动异常，具体[请查看这里](../tutorial/connect_and_use#how_to_solve_cannot_connect)

<a id="steamvr_connect"></a>

## SteamVR 无法连接
> 请[查看这里](../third_party_software_access/steamvr/README#vr_cannot_connect)

## 骨架调节无效
> 请[查看这里](../ui_help_doc/control/skeleton_setting#skeleton_not_valid)

<a id="firmware_version"></a>

## 提示固件版本需要更新
> 请[查看这里](../ui_help_doc/control/config#firmware_update)，直接更新固件即可

<a id="cal_exception"></a>

## 校准异常
- 考虑穿戴模式不符合要求，[请查看这里](../tutorial/instroction_for_straps#followmode)
- 考虑底层驱动异常，需要回滚驱动后，重新插拔接收器，[请查看这里](../tutorial/connect_and_use#how_to_solve_cannot_connect)（具体方法需要展开折叠部分查看）

<a id="error_puts_on"></a>

## 穿戴不符合要求
- 确保穿戴的点位在UI左上角图中人物对应的部位被点亮
- 确保替换功能没有启用，具体启用和关闭方法，[请查看这里](../ui_help_doc/remap#trackerreplace)
- 确保佩戴模式符合要求，[请查看这里](../tutorial/instroction_for_straps#followmode)

<a id="height_error"></a>

## 头显高度异常
- 如果检测高度低于10cm，那么很有可能是steamvr驱动测异常，可能存在 unicode 系统名称，也就是非英文系统名称导致，后续会修复，目前的解决方案可以通过修改安装位置尝试解决（[请看这里](../third_party_software_access/steamvr/#other_notes)），如果依然无法解决这个问题，[请论坛联系](https://forum.rebocap.site)，我们会有专门技术人员协助处理。
- 如果是头显高度和自身不匹配，可以首先[查看这里](../ui_help_doc/control/connect#vr_pannel)，也可以看下论坛的帖子
  - [中文版本](https://forum.rebocap.site/t/rebocap/52/1)
  - [英文版本](https://forum.rebocap.site/t/how-to-solve-the-abnormal-height-detection-in-rebocap/53/1)
  - [日文版本](https://forum.rebocap.site/t/rebocap/54)

## 抖动问题
  - 磁场相关抖动，可以[修改抗磁等级](../ui_help_doc/control/config#update_reject_mag_and_strenth)为12，然后修改为[抗磁模式](../ui_help_doc/control/connect#calibrate)
  - 肩膀抖动或者闪烁，需要更新到最新版本
  - 腰部跳跃落地后震荡，建议排除绑带问题，放置跟踪器没有紧贴到腰部，或者购买宽绑带，或者采用复杂绑法，并且不使用快拆，降低跟踪器相对绑带的重心。

<a id="freq_change_note"></a>

## 通信频道修改问题
- 通信频道可以在默认频道和频道1来回切换，但是切换过程中，只有连接的跟踪器的频道才会切换，如果没有连接跟踪器直接切换频道，那么只会切换接收器的通信频道，导致通信频道不匹配，需要切换回去才能连接
- 如果发生通信频道切换错误，可以重新尝试切换直到匹配即可
- 如果发现有无法连接的，也可以尝试来回切换频道看是否能够连接成功
- 如果依然没有切换成功，可以使用物理重置通信频道的功能，使用充电盒子即可重置通信频道，[具体见这里](../ui_help_doc/control/config#change_channel)，同时在软件中点击重置频道（如果无法点击，则接收器已经是默认频道）。

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
