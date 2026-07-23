---
sidebar_position: 9
---

# SteamVR 操作指南

这里将推荐一些SteamVR的设置，以及一些常见问题。


## VR头显 / 串流软件操作建议
### VR头显的设定

<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![steamvr_windows](/img/steamvr_guide/steamvr_windows.jpg)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong> - 尽量使用steamvr的桌面窗口去操控rebocap软件。</strong><br />
一些vr头显的返回到内置系统的界面会停止/休眠steamvr的数据，<br />
(Virtual Desktop不受该问题影响，但要避免quest系统休眠)<br />
以及返回steamvr时重置头显的方向,
这会在steamvr中出现rebocap的身体方向错位或校准时候记录错误的方向。
<details className="plain-details"><summary>详情</summary>
·················<br />

</details>

</div>
</div>






- Quest、Pico这类一体机头显的安全范围需要画到比实际房间大一圈，<br />
避免触发安全边界时导致steamvr端的头显数据中断

- 如果走动/蹲起时头显固定在原地，说明vr头显系统内的定位系统未开启。<br />
（quest系统需要打开游玩边界，pico系统打开[定位追踪]）




### Virtual Desktop 
<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![vd_settings](/img/steamvr_guide/vd_settings.jpg)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong>有2个选项建议关闭：</strong>
<br />

> <strong>1 - Center to play space</strong><br />
 在双击左手home键返回VD的电脑桌面时，steamvr空间中的头显向后旋转180°<br />
可能会导致rebocap在校准时记录错误的朝向。



>  <strong>2 - Emulate SteamVR vive trackers</strong><br />
 这个功能把quest系统的AI全身追踪点传入steamvr中，但在vrchat中出现追踪点重叠，抢夺控制权。<br />
 如果想只启用他局部指定的追踪点，可以使用插件来调整。<br />
🌐 [插件的github](https://github.com/DenTechs/Virtual_Desktop_Body_Tracking_Configurator)


</div>
</div>




### SteamVR
- 关闭steamvr的边界<br />
默认边界会限制追踪点的最大移动范围，像空气墙一样。<br />
如果VR头显错误定位在2.4米高度，可能在躺下后抬腿时呈现追踪器无法超过头显的高度，<br />
因为SteamVR默认的天花板高度为2.4米，而追踪点无法穿过天花板。

- 提前重置vr头显的角度<br />
按住'右手控制器home键'让VR头显重置系统方向，<br />
这会让steamvr虚拟地平线箭头重置到你视线的前方，在意外丢失方向后可以利用该功能重新对正坐标系 。

- 打开游戏后弹出提示<br />
随意选择背景中的一个社区配置，<br />
激活后在下一次启动就不会出现了 。

## 无法连接SteamVR
检查以下内容

<strong> 1 - 在开启SteamVR的状态点击校准。</strong><br />
不启动SteamVR，rebocap无法知道系统里是否有VR。

<strong> 2 - 查看SteamVR驱动。</strong><br />
打开rebocap的[日志窗口]记录，每次开启rebocap时候会自动检查。
如有需要，可以在[配置]页面中强制安装

<strong> 3 - 检查SteamVR的加载项。</strong><br />
如果Steamvr出现意外崩溃，往往会强制关闭所有加载项。<br />
重新开启rebocap的加载后需要重启SteamVR。






## SteamVR追踪点的显示和隐藏




<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![steamvr_windows](/img/steamvr_guide/v01_off_1-cns.png)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong> 追踪点的显示和隐藏</strong><br />
 在软件[ 配置 SteamVR 输出节点 ]里控制追踪点的显示和隐藏，<br />
 无需在SteamVR的管理菜单中操作。<br />

 <details className="plain-details"><summary>注</summary>
追踪器不是直连SteamVR，物理追踪器操纵骨架系统，从骨架系统上创建对应的追踪点输入到SteamVR中,<br />
也就是说没有对应的追踪器，依然可以向SteamVR提供追踪点。

</details>


</div>
</div>

## 设定了追踪点的部位但游戏无法识别到脚和腰

- 一些游戏使用openVR环境来识别追踪，但目前rebocap Release所带的驱动会处于无法别识别的BUG，即便steamvr中修改了对应的设置也无法识别


该BUG等待修复等待工作组后续修复

