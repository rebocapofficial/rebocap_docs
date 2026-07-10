---
sidebar_position: 4
title: "Unity Demo Package Download"
---

# Unity Demo Package Download

The Unity plugin is primarily intended for developers. Developers can view the specific code for secondary development. Below is the download link.

<a href="/img/files/rebocap_unity_sdk_v4.unitypackage" target="_blank" download="rebocap_unity_sdk_v4.unitypackage">rebocap unity sdk v4</a>


unity sdk v4 changelog
> Fixed animation glitches in certain cases, supports bones from FBX imports

unity sdk v3 changelog
> Fixed the bug where packaging and running errors occurred in il2cpp backend mode

:::info Note: You must install `VRM` package first: [`UniVRM`](https://github.com/vrm-c/UniVRM/releases/tag/v0.117.0)

:::



# Unity Switch VRM Model Character Example

Drag the rebocap_unity_sdk.unitypackage into an empty project, open the DemoScene in the `RebocapSdk` directory, then drag a new VRM into the scene. Drag the VRM object under the `Terrain` object, and bind the Animator variable of the `Drive Demo` script.

After running the scene, click the `Connect` button. It will automatically connect to the `Rebocap` client and automatically register the skeleton. Note that motion calibration is required before motion output.

:::info Note


The character binding in the Demo project uses VRM, following the standard `Humanoid` skeleton. In principle, all skeletons following the `Humanoid` standard can be directly dragged and replaced.

:::


### Video Operation Character Replacement Example

Here is a screen recording of the old client version (for temporary viewing, will be replaced later). The new version is basically the same. After clicking connect, check if the skeleton has been successfully imported into the `Rebocap` client.

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/unity_replace_vrm.mp4" type="video/mp4" />
</video>
</div>


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>