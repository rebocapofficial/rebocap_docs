---
sidebar_position: 4
title: "Unity Demo 包下载"
---

# Unity Demo 包下载

Unity 插件主要面向开发者使用，开发者可以查看具体代码二次开发，下边是下载地址。

<a href="/img/files/rebocap_unity_sdk_v4.unitypackage" target="_blank" download="rebocap_unity_sdk_v4.unitypackage">rebocap unity sdk v4</a>

unity sdk v4 更新日志
> 修复部分情况下动画异常bug，支持 fbx 导入的骨骼

unity sdk v3 更新日志
> 修复 il2cpp backend 模式下，无法打包以及打包后运行报错的bug

:::info 提示：必须安装`VRM`插件: [`UniVRM`](https://github.com/vrm-c/UniVRM/releases/tag/v0.117.0)

:::


# Unity 切换 VRM 模型人物示例

rebocap_unity_sdk.unitypackage 拖拽到空的工程中，打开 `RebocapSdk` 目录中的 DemoScene，然后拖拽新的 VRM 到场景中，将该 VRM 对象拖拽到 `Terrain` 对象下，绑定的 `Drive Demo` 脚本的 Animator 变量即可。

运行场景后，点击 `Connect` 按钮，会自动连接到 `Rebocap` 客户端并自动注册骨骼。注意，需要动作校准以后才会输出动作。

:::info 提示


Demo 工程中人物绑定用的是VRM，走的是标准的 `Humanoid` 骨骼，原则上所有遵循 `Humanoid` 骨骼均可直接拖拽替换。

:::


### 视频操作替换人物示例

这里是老的客户端版本录屏（临时查看使用，以后会替换），新的基本一致，点击连接以后，检查骨骼是否成功导入到 `Rebocap` 客户端中。

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/unity_replace_vrm.mp4" type="video/mp4" />
</video>
</div>

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>