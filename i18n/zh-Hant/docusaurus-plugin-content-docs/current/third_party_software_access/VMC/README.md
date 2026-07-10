---
sidebar_position: 1
title: "提示"
---

# 提示
沒有閱讀教程的情況下，閱讀這個本頁面沒有任何意義，[請首先閱讀教程](../tutorial/README)！！！！


<a id="vmc_instroction"></a>

# VMC 使用
vmc 協議使用非常簡單，校準以後打開 vmc 協議即可，[具體見這裡](../../ui_help_doc/control/connect#cal_pc_panel)，然後在其它軟體中配置接收。VMC是一個通用動作捕捉協議，[具體請查看這裡](https://protocol.vmc.info/english.html)

如果你是主播，不清楚你使用的軟體是否可以支持 `rebocap`，那麼請查看你的軟體是否支持 vmc 協議。當然，如果你的軟體不支持，可以聯繫開發者使用我們提供的 [SDK](../../SDK/README) 接入，或者直接使用我們提供的[插件](../../plugins/plugins)接入。

:::info VMC 協議用戶使用注意事項


VMC協議用戶，強烈建議上傳骨架，如果是VRM模型，可以直接上傳骨架到 rebocap 中，[這裡是上傳骨架介紹](../../ui_help_doc/control/skeleton_setting#skeleton_import)，如果是其它格式用戶，可以使用 [blender 插件導出骨架](../../plugins/blender#skeleton_export)，導出的文件是 json 文件，可以手動修改。

如果這兩個都不清楚怎麼做，你需要知道你的虛擬人物骨架高度，調節 VMC 的 scale 設置，設置為 rebocap 中的身高 * vmc_scale = 目前虛擬人物身高，但是這個效果一般不太理想。

:::


### 在其它軟體中怎麼接入
一般直接打開 vmc 配置即可，具體請查看其它軟體的文檔說明。

1. 鑒於部分使用 `warudo` 的主播對 warudo 本身不了解，這裡以`warudo`為例子，[請看這裡](warudo)


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>