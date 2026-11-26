---
sidebar_position: 1
title: "SDK Interface Description"
---
<span id="sdk-interface-description" class="legacy-anchor-alias" aria-hidden="true"></span>

# SDK Interface Description
Currently, the DLL exposes a total of 8 ports, and each SDK is a wrapper around the DLL interface. You can refer to the `include/rebocap_ws_sdk/rebocap_ws_sdk.h` header file in the cpp SDK for details.

The output value type of the SDK is a quaternion, which supports multiple coordinate space outputs [default OpenGL right-handed coordinate system, Blender, Unity, UE], with the displacement unit being meters.

The Python SDK has not yet integrated the `rebocap_ws_sdk_calculate_foot_vertex` interface.

### Interface Description
* rebocap_ws_sdk_new
```
    Creates an SDK instance. The parameters include:
    1. Coordinate space, specific supported spaces can be found in each SDK, not elaborated here.
    2. Whether to use the global coordinate system. Passing 0 will use the local coordinate system, which is relative to the parent bone's coordinate system. All rotations are relative to the T-pose rotation. If you are unclear about the rotation, you can refer to the source code of Blender, Unity, and UE, where Unity's rotation is relatively easier to understand.
    
    Return value:
    Returns a pointer to the SDK object instance.
```

* rebocap_ws_sdk_release
```
Releases the SDK instance object. The parameter passed is the instance pointer.
```
* rebocap_ws_sdk_open
```
Opens the WebSocket client and connects to the WebSocket port. For specific usage and return value descriptions, please refer to the SDK code.
```
* rebocap_ws_sdk_close
```
Closes the WebSocket client and disconnects. For specific usage, see the SDK.
```
* rebocap_ws_sdk_set_pose_msg_callback
```
Registers a message callback. Here, data will only be output from the WebSocket after the user performs action calibration. The frame rate is 60 frames per second. For specific usage, see the SDK code. 
Please refer to the names of the 24 bones for joint order.
```
* rebocap_ws_sdk_set_exception_close_callback
```
Registers a callback for abnormal WebSocket closure. For specific usage, see the SDK code.
```
* rebocap_ws_sdk_get_last_msg
```
In addition to the callback form, you can also directly obtain the last action message here. The data format is consistent with the callback.
```
* rebocap_ws_sdk_calculate_foot_vertex
```
    This interface is mainly used to register the contact points of the foot and the body skeleton into Rebocap. 
    You need to pass in the body skeleton data (the positions of each joint, in the same order as the SMPL sequence). 
    If you need the DLL to automatically calculate the contact point positions, you need to pass in the foot mesh. You can also pass in the foot contact point position information (3 points in front and back for each foot, totaling 12 points), in which case the DLL will not automatically calculate but will use the passed values. 
    Note that the unit here is meters, the coordinates are global coordinates, and you need to use the OpenGL coordinate system. If not, you need to pass in conversion parameters. For specific usage, please refer to the Unity demo and the UE plugin usage.
    
    This interface is relatively complex. Users should have sufficient development capabilities or be able to fully understand the code in the Unity demo or the UE plugin code. The Python version does not expose this interface. If needed, you can encapsulate the Python interface from the CPP SDK or the original DLL.
    
    Most users can upload VRM models to the Rebocap client for plugin development, achieving the same effect. For understanding the foot contact points, you can refer to the Blender integration documentation on exporting skeletons.
```

### 24 Bone Names
The corresponding Mixamo and SMPL standard names are as follows, totaling 24 bones. For reference, the bone at index 0 corresponds to the hips, which is the waist node.
Among them, the joints corresponding to the left and right toes and fingers do not have corresponding tracker nodes, so the output local rotation is 0. If using global rotation, the output rotation values will be consistent with the parent node.

- Mixamo Corresponding Names
```python
joints_mixamo = [
        "mixamorig:Hips",
        "mixamorig:LeftUpLeg",
        "mixamorig:RightUpLeg",
        "mixamorig:Spine",
        "mixamorig:LeftLeg",
        "mixamorig:RightLeg",
        "mixamorig:Spine1",
        "mixamorig:LeftFoot",
        "mixamorig:RightFoot",
        "mixamorig:Spine2",
        "mixamorig:LeftToeBase",
        "mixamorig:RightToeBase",
        "mixamorig:Neck",
        "mixamorig:LeftShoulder",
        "mixamorig:RightShoulder",
        "mixamorig:Head",
        "mixamorig:LeftArm",
        "mixamorig:RightArm",
        "mixamorig:LeftForeArm",
        "mixamorig:RightForeArm",
        "mixamorig:LeftHand",
        "mixamorig:RightHand",
        "mixamorig:LeftHandIndex1",
        "mixamorig:RightHandIndex1"
]
```
- SMPL Standard Corresponding Names
```python
joints_smpl = [
    "Pelvis",
    "L_Hip",
    "R_Hip",
    "Spine1",
    "L_Knee",
    "R_Knee",
    "Spine2",
    "L_Ankle",
    "R_Ankle",
    "Spine3",
    "L_Foot",
    "R_Foot",
    "Neck",
    "L_Collar",
    "R_Collar",
    "Head",
    "L_Shoulder",
    "R_Shoulder",
    "L_Elbow",
    "R_Elbow",
    "L_Wrist",
    "R_Wrist",
    "L_Hand",
    "R_Hand"
]
```


<span id="sdk-download" class="legacy-anchor-alias" aria-hidden="true"></span>

# SDK Download

## Windows

### Python SDK
> 64-bit CPython 3.6 – 3.14 · requires the Microsoft Visual C++ 2015–2022 x64 runtime

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="https://doc.rebocap.com/img/files/Rebocap_Windows_x64_Python_v3.zip" download="Rebocap_Windows_x64_Python_v3.zip">
<span class="os-switch-download-main">Download Python SDK v3</span>
<span class="os-switch-download-meta">Python 3.6 – 3.14 · x64</span>
<span class="os-switch-download-date">Updated: 2026.11.18</span>
</a>
</div>

<details class="plain-details sdk-history"><summary>Previous versions</summary>
<div style="margin-top: 10px;">
<p><strong>Python SDK v2</strong> (compatible with python3.6~python3.12): <a href="https://doc.rebocap.com/img/files/rebocap_ws_sdk_python_v2.zip" download="rebocap_python_sdk_v2.zip">download</a></p>
<p>get_last_msg deadlock fixed; support for all <code>python</code> versions added</p>
</div>
</details>

### C# SDK
> Windows x64 · .NET Framework 4.8 example · requires the Microsoft Visual C++ 2015–2022 x64 runtime

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="https://doc.rebocap.com/img/files/Rebocap_Windows_x64_CSharp_v3.zip" download="Rebocap_Windows_x64_CSharp_v3.zip">
<span class="os-switch-download-main">Download C# SDK v3</span>
<span class="os-switch-download-meta">C# · .NET Framework 4.8</span>
<span class="os-switch-download-date">Updated: 2026.11.18</span>
</a>
</div>

<details class="plain-details sdk-history"><summary>Previous versions</summary>
<div style="margin-top: 10px;">
<p><strong>C# SDK v2</strong> (with Unity demo): <a href="https://doc.rebocap.com/img/files/csharp_sdk_with_demo_v2.zip" download="rebocap_csharp_sdk_v2.zip">download</a></p>
<p>get_last_msg deadlock fixed</p>
</div>
</details>

### CPP SDK
> Windows x64 · C++17 · requires the Microsoft Visual C++ 2015–2022 x64 runtime

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="https://doc.rebocap.com/img/files/Rebocap_Windows_x64_CPP_v3.zip" download="Rebocap_Windows_x64_CPP_v3.zip">
<span class="os-switch-download-main">Download CPP SDK v3</span>
<span class="os-switch-download-meta">C++ · C++17 · x64</span>
<span class="os-switch-download-date">Updated: 2026.11.18</span>
</a>
</div>

## Linux

### Python SDK (Linux)
> Linux x86-64 · CPython 3.6 – 3.14 · built on Ubuntu 22.04, requires GLIBC 2.34+ and GLIBCXX 3.4.29+

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="https://doc.rebocap.com/img/files/Rebocap_Linux_x86_64_Python.tar.gz" download="Rebocap_Linux_x86_64_Python.tar.gz">
<span class="os-switch-download-main">Download Python SDK (Linux)</span>
<span class="os-switch-download-meta">Python 3.6 – 3.14 · Ubuntu 22.04+</span>
<span class="os-switch-download-date">Updated: 2026.11.18</span>
</a>
</div>

### CPP SDK (Linux)
> Linux x86-64 · C++17 · built on Ubuntu 22.04, requires GLIBC 2.34+ and GLIBCXX 3.4.29+

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="https://doc.rebocap.com/img/files/Rebocap_Linux_x86_64_CPP.tar.gz" download="Rebocap_Linux_x86_64_CPP.tar.gz">
<span class="os-switch-download-main">Download CPP SDK (Linux)</span>
<span class="os-switch-download-meta">C++ · C++17 · Ubuntu 22.04+</span>
<span class="os-switch-download-date">Updated: 2026.11.18</span>
</a>
</div>

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
