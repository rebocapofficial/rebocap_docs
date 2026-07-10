---
sidebar_position: 1
title: "提示"
---

# 提示
没有阅读教程的情况下，阅读这个本页面没有任何意义，[请首先阅读教程](../tutorial/README)！！！！

# SteamVR 接入步骤
1. 首次使用，打开软件后请务必重启 SteamVr，VR面板左上角绿色指示灯亮起则表示 VR 接入成功。[无法接入请看这里](#vr_cannot_connect)
2. 至少穿戴8个点位，然后点击动作校准，其中，校准Apose期间，头显必须正确佩戴【特别是快速滴滴滴响起】，具体[校准流程请参考这里](../../tutorial/connect_and_use#pose_calibration)
    > 大腿、小腿、腰部、胸部属于必须佩戴，脚底如果不佩戴，只能使用 [跟随模式](../../ui_help_doc/control/connect#vr_pannel)！
3. 正常校准以后，请到 SteamVR 默认界面查看跟踪器，请务必关闭 SteamVR Home，否则无法查看跟踪器！
    > 这里建议，出现任何问题，都优先切换到 SteamVR 默认界面查看跟踪器位置是否符合预期，其它软件中例如 VRC 因为存在IK介入，和很多配置有关，不是原始跟踪器的位置。
   - 如何关闭SteamVR Home 以及更改为白色背景请看这里
      <div align="center">
       <img src="/img/steamvr_shutdown_home1.png" alt="left" width="17%" />
       <img src="/img/steamvr_shutdown_home2.png" alt="left" width="36%" />
       <img src="/img/steamvr_shutdown_home3.png" alt="left" width="36%" />
       </div>

4. 佩戴头显后查看跟踪器位置是否符合预期
    > 这里可以打开 诊断功能，复制出一组跟踪器查看更方便

5. 如果遇到错误，或者跟踪器消失等问题，可以重启，建议重启 rebocap 客户端和 SteamVR。
    > 也非常推荐到论坛中反馈！可能是 steamvr 问题，也可能是 rebocap 的问题。如果是 rebocap 问题，我们会尽量查找问题并更新！

6. 如果 VR 校准提示的高度差异过大，[请看这里](../../ui_help_doc/control/connect#vr_pannel)

下面是SteamVR中的接入示例，头部节点震动严重是由于头显定位输出数据抖动导致！
  <div>
  <video id="video" controls preload="metadata" width="100%">
        <source id="mp4" src="/img/steamvr_example.mp4" type="video/mp4" />
  </video>
  </div>


<a id="how_to_solve_tracker_slant"></a>

### 跟踪器歪了怎么办
如果在3D预览中人物都是正常的，但是跟踪器相对于自身是歪的，那么很有可能有以下三个原因：
- 没有关闭一体机安全区域，并且本人在安全边界附近或者安全边界外
  > 90% 以上用户的困扰来自于这个点
- 活动太频繁，导致发生偏移，原则上会自动回正，全身静止1~2S 即可
:::danger 脚底绑带


如果脚底使用绑带，非常容易发生偏移，[具体请看这里](../../tutorial/instroction_for_straps#tracker_position_on_body)

:::

- 使用 `ovr advanced setting` 修改了航向角，建议重置为0
- 空间坐标转换无法读取，[请查看这里](#other_notes)

如果 3D 预览就歪了，那么请按照下述诊断：
- 很有可能是发生了磁偏，或者磁场环境本身就差，如果是第一次使用，或者后续使用偶发遇到的，建议先进行磁场校准，[具体校准方法见这里](../../ui_help_doc/control/config#magnet_calibrate)
- 排除绑带歪了，排除跟踪器个别跟踪器没电关机或者意外关机
- 如果是交叉腿或其他腿部问题，请仔细阅读教程中 [绑带部分](../../tutorial/instroction_for_straps) 以及 [动作校准部分](../../tutorial/connect_and_use#pose_calibration)。
- 如果还是无法解决，请排除磁场干扰，强烈建议将[这篇文章读完](../../QA/magnet)。



<a id="vr_cannot_connect"></a>

# VR 无法连接
`VR` 驱动会自动静默安装，安装到 `steamvr` 目录下，如果发现 `VR` 面板中的左上角图标没有变绿，可以按照以下步骤处理。

1. 检查 `steamvr` 是否启动
2. 检查 `rebocap` 接收器是否已经插入并且处于[已连接状态](../../ui_help_doc/control/connect#status)
3. 检查 `steamvr` 中 `rebocap` 插件是否被屏蔽。同时，这里可以检查 `rebocap` 插件是否已经安装
   
   <div align="center">
    <img src="/img/steamvr_mask1.png" alt="left" width="8%" />
    <img src="/img/steamvr_mask2.png" alt="left" width="27%" />
    <img src="/img/steamvr_mask3.png" alt="left" width="27%" />
    <img src="/img/steamvr_mask4.png" alt="left" width="27%" />
    </div>
   
4. 如果第三步骤中 `steamvr` 插件未安装，那么请按照下述步骤手动复制安装
- 找到 `steamvr` 安装目录，默认安装位置为 `C:\Program Files (x86)\Steam\steamapps\common\SteamVR`，插件位置在 `steamvr` 目录下的 `driver` 目录
  > 如果您自行修改了 `SteamVR` 安装位置，请自行查找
- 将 `rebocap_driver` 复制到 `steamvr` 插件目录下，`rebocap_driver` 的目录在 `rebocap` 安装目录的 `data` 目录下，如左图所示，最终解压后的路径如右图所示。
   <div align="center">
    <img src="/img/steamvr_plugin0.png" alt="left" width="45%" />
    <img src="/img/steamvr_plugin.png" alt="left" width="50%" />
    </div>

<a id="other_notes"></a>

### 其它注意事项
:::info 使用非英文系统名称的用户注意！！！


如果您系统使用的是非英文名称，可能会导致`steamvr`中的坐标变换无法获取，导致最终位置错误，人物在 steamvr 中悬空或者掉入地板，这个时候，系统往往在开机的时候会提示如下：rebocap steamvr 插件异常，无法找到空间坐标系。这个时候，只能将 steamvr安装到如下两个目录中的一个方可识别：

`C:\Program Files (x86)\Steam\steamapps\common\SteamVR`

`D:\Steam\steamapps\common\SteamVR`

:::



<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>