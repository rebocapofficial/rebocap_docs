---
sidebar_position: 1
title: "导航目录"
---

<div>Rebocap 使用文档</div>


## <p>特别声明</p>
<p>翻译部分基于中文使用 `chatgpt` 翻译，如有任何疑问，请在论坛或者社区反馈，我们会修正不恰当描述！</p>

> 注意：软件必须在联网状态下使用，如果希望离线使用，请使用手机热点网络，开启软件30秒以后再断开网络即可（可以查看日志，只要日志显示网络校验成功，即可断开网络）。

<a id="community"></a>

#### 社区链接
- 中文社区：https://qm.qq.com/q/vFCgxkkjuM
- 英文或其它语言社区：
  1. discord1：https://discord.com/invite/YKFXTfVe7K
  2. discord2：https://discord.com/invite/rCpbcUaPVc

## 教程
首次使用请务必查看教程目录下所有内容，文档中关于可能出现的突发情况或者使用上的一些技巧均有提及，视频教程只能作为辅助教程查看。
- [开箱检查及硬件介绍](tutorial/hardware_check)
- [绑带使用介绍](tutorial/instroction_for_straps)
- [软件下载安装](tutorial/software_install)
- [连接和使用](tutorial/connect_and_use)
- [视频教程](tutorial/README#video_tutorial)


## UI 分区功能介绍
点击图片对应区域即可跳转到对应的区块功能介绍
<div>
<svg  width = "60%"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2560 1368">
<style>
.image-mapper-shape {
    fill: rgba(0, 0, 0, 0.6);
}
.image-mapper-shape:hover {
    fill: rgba(0, 0, 0, 0.1);
}
g:hover .image-mapper-shape {
    stroke: red;
    stroke-width: 4;
}
.image-text {
    font-family: Verdana;
    font-size: 22px;
    fill: rgba(0, 0, 0, 0);
}

g:hover .image-text {
    fill: greenyellow;
}
g {
background: #00000000;
}
</style>

<image xlink:href="/img/rebocap_ui.png"></image>
<a xlink:href="ui_help_doc/remap.html" target="---" xlink:title="remap">
<g>
<rect x="16" y="45" width="523" height="683" class="image-mapper-shape" data-index="1"></rect>
</g>
</a>

<a xlink:href="ui_help_doc/view.html" target="---" xlink:title="3d_view">
<g>
<rect x="562" y="45" width="1982" height="795" class="image-mapper-shape" data-index="2"></rect>
</g>
</a>

<a xlink:href="ui_help_doc/info.html" target="---" xlink:title="info">
<g>
<rect x="16" y="738" width="522" height="618" class="image-mapper-shape" data-index="2"></rect>
</g>
</a>

<a xlink:href="ui_help_doc/control" target="---" xlink:title="control">
<g>
<rect x="561" y="851" width="1986" height="498" class="image-mapper-shape" data-index="2"></rect>
</g>
</a>

</svg>
</div>


<a id="navigation_directory"></a>

# 导航目录
### Rebocap 教程
* [使用教程](tutorial/README)
  * [开箱检查](tutorial/hardware_check)
  * [绑带使用介绍](tutorial/instroction_for_straps)
  * [软件下载安装](tutorial/software_install)
  * [连接和使用](tutorial/connect_and_use)
  * [视频教程](tutorial/README#video_tutorial)

### 帮助手册
* [UI 帮助文档](ui_help_doc/README)
  * [控制区](ui_help_doc/control/README)
    * [连接](ui_help_doc/control/connect)
    * [动捕参数](ui_help_doc/control/cap_param)
    * [骨架设置](ui_help_doc/control/skeleton_setting)
    * [配置](ui_help_doc/control/config)
  * [硬件信息列表](ui_help_doc/info)
  * [硬件连接预览](ui_help_doc/remap)
  * [3D预览区](ui_help_doc/view)

### 常见问题
* [常见问题](QA/README)
* [磁场问题总结](QA/magnet)

### 软件接入
* [其它软件接入](third_party_software_access/README)
* [SteamVR 协议接入](third_party_software_access/steamvr/README)
  * [VRChat 接入](third_party_software_access/steamvr/vrchat)
* [VMC 协议接入](third_party_software_access/VMC/README)
  * [warudo 接入](third_party_software_access/VMC/warudo)

### 其它
* [插件](plugins/plugins)
  * [Blender](plugins/blender)
  * [UE](plugins/ue)
  * [Unity](plugins/unity)
* [SDK](SDK/README)
* [产品认证](product_certification/README)
