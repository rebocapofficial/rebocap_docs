---
sidebar_position: 3
title: "UE Plugin Download"
---
# UE Plugin Download

Below are the download links. For UE source code development, you can compile it yourself. Currently, the plugin is only applicable to the `UE5` version.

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin.zip">ue plugin source</a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_51_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_52.zip">ue 5.1 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_52_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_52.zip">ue 5.2 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_53_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_53.zip">ue 5.3 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_54_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_54.zip">ue 5.4 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_55_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_55.zip">ue 5.5 plugin prebuild </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_56_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_56.zip">ue 5.6 plugin prebuild </a>


# UE Usage Instructions

1. **Create a new project in UE**

   Both Blueprint and C++ projects are acceptable. If you need to further develop the plugin, you need to create a `C++` project, import the character (the default pose of the character must be `T-Pose`, not `A-Pose`, otherwise the arm performance will be abnormal), then open the project folder, create a new folder `Plugins folder`, and then place `rebocap_unreal_engine_plugin` into `Plugins`. For example, if you create a `testV3` project, the overall directory structure is as follows:

    <div align="center">
    <img src="/img/ue_plugin/ue1.png" alt="pic_left" width="80%" />
    </div>

2. **Reopen UE and it will automatically compile [the source code is released, so it should be compatible with all versions]**

    > When further developing and debugging the plugin, you can use Rider to directly open `[name].uproject` for development and easy debugging.
    > 
    > You can use Rider to compile and check for compilation errors. If you use UE to automatically compile and errors occur, please check `Saved/Logs/[name].Log`. The `Log` output by `UE` generally has Chinese encoding issues, and you may need to adjust the system encoding to `UTF-8` to view it properly.

3. **Skeleton Binding Steps**

    - Click on the character asset Skeleton Mesh, right-click to create a new animation blueprint, and double-click to edit the animation blueprint. [If unclear, it is recommended to watch the video]
    - Right-click to search for `Rebocap`, select `Rebocap Body Pose` and create a node, and connect the small person on the right side of the node to the `Result` of the output pose.
    - In the lower left corner of the blueprint editing page, click the plus sign to create a new variable. The variable type needs to be searched, search for `Rebocap`, select `RebocapMapData`, class reference, then drag the variable into the node `RetargetAsset` just created in the blueprint, and a variable node will be automatically generated. Then click the compile button in the upper left corner.
    - Click on the newly created variable node, then in the default value on the right, click the plus sign to create a new `Map` asset, which will automatically jump to a new page. On the new page, the user needs to fill in the skeleton mapping themselves. Note, it is recommended to fill in all 24 nodes, you can fill in according to the skeleton names of `Avatar`.
         > Skeleton names can be automatically selected by clicking the first light blue skeleton person in the top bar of the blueprint page to view the corresponding points of each skeleton. The 24 nodes in `Rebocap` are standard human skeleton points, and the skeleton names in `Rebocap` are named after the starting point of the skeleton bone. For example, in `VRM`, the bone named `LeftUpperLeg` starts at the hip, so in `Rebocap` it is named `L_Hip`, the starting point of `LeftFoot` is the ankle, so the corresponding name is `L_Ankle`, and `L_Foot` in `Rebocap` corresponds to the toe area. In the UE naming system, it is generally called `ball`.
         >
      > `L Collar` the skeleton of the left shoulder
      > 
      > `L Shoulder` the skeleton of the left upper arm
      > 
      > `L Elbow` the skeleton of the left lower arm
      > 
      > `L Wrist` the skeleton of the left hand palm
      > 
      > `L Hand` the skeleton of the left middle finger [will not drive]
      > 
      > If there are many skeletons, you can choose appropriate skeletons for mapping. For example, if there are 6 spines, you can choose three of them alternately.
      
   - Return to the previously opened blueprint page (the selected skeleton mapping needs to be saved and compiled to take effect), and set the value of the variable node to the newly created `Map` asset.
   - Compile again and check for `Warnings`. Generally, there should only be 3 `Warnings`. If there is an error in a skeleton `map`, a `warning` will indicate that a certain bone was not found.
   - Close the animation blueprint editing window, click on the top menu `Window->Virtual Production->Live Link`, then select `Source->Rebocap Source->conn` [`port` is the port number, if the broadcast port number in `Rebocap` is changed, it needs to be modified here]. If the `Rebocap` client is open, `connect` will be in the `ok` state; otherwise, it will be in the `bad` state. Additionally, the user will only start broadcasting data after motion calibration.

   <div align="center">
   <img src="/img/ue_plugin/ue2.png" alt="pic_left" width="80%" />
   <img src="/img/ue_plugin/ue3.png" alt="pic_left" width="80%" />
   </div>

4. **Code Description**

   The main motion control related code is in `Source\rebocap\Private\rebocap_pose_node.cpp`, while other peripheral related code includes `dll` calls and `livelink`. The `Init_Foot_Vertices_And_SkeletalData` function is used to obtain the default skeletal position and `vert` points of the character, calculating six points on the soles of both feet for ground contact [6 points for each foot]. Since this is automatically calculated, it may not be precise enough; users can find the six points on the soles of their feet and pass them in for potentially greater accuracy.
   
   PS: Larger foot sizes may cause the character to bounce up and down. For an extreme example, if a character has 2-meter-long feet but is only 2 meters tall, when they tiptoe and land, if they need to keep their toes touching the ground, the character will definitely bob up and down.

5. **Packaging Instructions**

   - Developers
      > For developers who need to package, you can download the latest version of the plugin (previous versions cannot run after packaging). The `runtime` mode has added `Livelink` connection management. You can refer to the `ConnectLiveLink` and `DisconnectLiveLink` methods in the `Plugins/rebocap_unreal_engine_plugin/Source/rebocap_runtime/Private/RebocapLivelinkManagerDemoWidget.cpp` file for implementation. If you need to disable the plugin's built-in UI, you can modify `Plugins/rebocap_unreal_engine_plugin/Source/rebocap_runtime/rebocap_runtime.Build.cs`, comment out the macro definition `USE_REBOCAP_LIVELINK_MANAGER_DEMO`, and compile it yourself. Developers who place the plugin in their own projects are advised to add UI management for `livelink` connections themselves.
   - Blueprint Users
      Blueprint nodes have been added for managing `Livelink`, with node names: `Connect to Rebocap Livelink Source`, `Disconnect to Rebocap Livelink Source`
      <img src="/img/ue_plugin/ue4.png" alt="pic_left" width="80%" />

**Note**:
1. If you are using the `livelink` connection in the `Editor`, it may cause the `livelink` channel to be occupied, resulting in a failure to connect successfully in `game` mode. It is recommended to restart the `Editor` and try again.
2. For `runtime` mode (i.e., `standalone or game mode`, which is running after packaging), since a method to obtain mesh vertices in `runtime` mode has not yet been found, the automatic skeletal registration does not include the soles after packaging, and the performance of the soles will be slightly worse than in `Editor` mode. This issue will be addressed in the future.


### Video Operation Demonstration
There is no sound here, as a temporary use, more will be added later.

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/ue_plugin/ue_user_guide.mp4" type="video/mp4" />
</video>
</div>

### Meta Human (or default Apose character) modified to TPose (APose to TPose conversion)

> Note: The A-pose must match the official standard; otherwise, it is recommended to manually adjust the angles yourself. Convert the Apose to a temporary Tpose angle file and save it. For specific details, refer to the tutorial inside the compressed file below.

<a href="/img/files/metahuman_change_tpose.zip" target="_blank" download="ue_ht_tpose.zip">Download</a>


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>