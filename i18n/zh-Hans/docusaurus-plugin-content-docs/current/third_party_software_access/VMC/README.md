---
sidebar_position: 1
title: "提示"
---

# 提示
没有阅读教程的情况下，阅读这个本页面没有任何意义，[请首先阅读教程](../tutorial/README)！！！！


<a id="vmc_instroction"></a>

# VMC 使用
vmc 协议使用非常简单，校准以后打开 vmc 协议即可，[具体见这里](../../ui_help_doc/control/connect#cal_pc_panel)，然后在其它软件中配置接收。VMC是一个通用动作捕捉协议，[具体请查看这里](https://protocol.vmc.info/english.html)

如果你是主播，不清楚你使用的软件是否可以支持 `rebocap`，那么请查看你的软件是否支持 vmc 协议。当然，如果你的软件不支持，可以联系开发者使用我们提供的 [SDK](../../SDK/README) 接入，或者直接使用我们提供的[插件](../../plugins/plugins)接入。

:::info VMC 协议用户使用注意事项


VMC协议用户，强烈建议上传骨架，如果是VRM模型，可以直接上传骨架到 rebocap 中，[这里是上传骨架介绍](../../ui_help_doc/control/skeleton_setting#skeleton_import)，如果是其它格式用户，可以使用 [blender 插件导出骨架](../../plugins/blender#skeleton_export)，导出的文件是 json 文件，可以手动修改。

如果这两个都不清楚怎么做，你需要知道你的虚拟人物骨架高度，调节 VMC 的 scale 设置，设置为 rebocap 中的身高 * vmc_scale = 目前虚拟人物身高，但是这个效果一般不太理想。

:::


### 在其它软件中怎么接入
一般直接打开 vmc 配置即可，具体请查看其它软件的文档说明。

1. 鉴于部分使用 `warudo` 的主播对 warudo 本身不了解，这里以`warudo`为例子，[请看这里](warudo)



<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>