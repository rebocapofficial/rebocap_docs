---
sidebar_position: 1
title: "Tips"
---

# Tips
Reading this page without going through the tutorial is meaningless, [please read the tutorial first](../tutorial/README)!!!!

<a id="vmc_instroction"></a>

# VMC Usage
The VMC protocol is very simple to use. After calibration, you can enable the VMC protocol, [see details here](../../ui_help_doc/control/connect#cal_pc_panel), and then configure the reception in other software. VMC is a universal motion capture protocol, [see details here](https://protocol.vmc.info/english.html).

If you are a streamer and are unsure whether your software supports `rebocap`, please check if your software supports the VMC protocol. If your software does not support it, you can contact the developer to use our provided [SDK](../../SDK/README) for integration, or directly use our provided [plugins](../../plugins/plugins) for integration.

:::info Notes for VMC Protocol Users


VMC protocol users are strongly advised to upload the skeleton. If it's a VRM model, you can directly upload the skeleton to rebocap, [here is the skeleton upload introduction](../../ui_help_doc/control/skeleton_setting#skeleton_import). For other format users, you can use the [Blender plugin to export the skeleton](../../plugins/blender#skeleton_export). The exported file is a JSON file and can be manually modified.

If you are unclear about how to do either, you need to know the height of your virtual character's skeleton and adjust the VMC scale setting. Set it so that the height in rebocap * vmc_scale = current virtual character height, but this effect is generally not ideal.

:::


### How to Integrate into Other Software
Generally, you can directly open the VMC configuration. Please refer to the documentation of other software for details.

1. Given that some streamers using `warudo` are not familiar with warudo itself, here is an example using `warudo`, [see here](warudo)


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>