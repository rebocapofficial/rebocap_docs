---
sidebar_position: 1
title: "Tips"
---

# Tips
Reading this page without going through the tutorial is meaningless. [Please read the tutorial first](../tutorial/README)!!!!

# SteamVR Integration Steps
1. For first-time use, please be sure to restart SteamVR after opening the software. A green indicator light in the upper left corner of the VR panel indicates successful VR integration. [If you cannot connect, please see here](#vr_cannot_connect)
2. Wear at least 8 tracking points, then click on action calibration. During the calibration of Apose, the headset must be worn correctly [especially when the quick beeping sound occurs]. For specific [calibration procedures, please refer here](../../tutorial/connect_and_use#pose_calibration)
    > The thigh, calf, waist, and chest must be worn. If the soles of the feet are not worn, only [follow mode](../../ui_help_doc/control/connect#vr_pannel) can be used!
3. After normal calibration, please check the tracker on the default SteamVR interface. Be sure to turn off SteamVR Home; otherwise, you will not be able to view the tracker!
    > Here it is recommended that if any issues arise, first switch to the default SteamVR interface to check if the tracker position meets expectations. In other software, such as VRC, due to IK intervention and many configurations, it does not represent the original tracker position.
   - For how to turn off SteamVR Home and change to a white background, please see here
      <div align="center">
       <img src="/img/steamvr_shutdown_home2-en.png" alt="left" width="39%" />
       <img src="/img/steamvr_shutdown_home3-en.png" alt="left" width="39%" />
       </div>

4. After wearing the headset, check if the tracker position meets expectations
    > Here you can open the diagnostic function to copy a set of trackers for easier viewing.

5. If you encounter errors or issues such as the tracker disappearing, you can restart. It is recommended to restart the rebocap client and SteamVR.
    > It is also highly recommended to provide feedback in the forum! It may be a SteamVR issue or a rebocap issue. If it is a rebocap issue, we will try to find the problem and update!

6. If the height difference indicated by the VR calibration is too large, [please see here](../../ui_help_doc/control/connect#vr_pannel)

Below is an integration example in SteamVR. The severe vibration of the head node is caused by jitter in the headset positioning output data!
  <div>
  <video id="video" controls preload="metadata" width="100%">
        <source id="mp4" src="/img/steamvr_example.mp4" type="video/mp4" />
  </video>
  </div>


<a id="how_to_solve_tracker_slant"></a>

### What to do if the tracker is slanted
If the character appears normal in the 3D preview, but the tracker is slanted relative to itself, there are likely three reasons:
- The all-in-one machine's safety area is not turned off, and the user is near or outside the safety boundary.
  > Over 90% of users' troubles come from this point.
- Excessive movement causes displacement. In principle, it will automatically correct itself; remaining still for 1-2 seconds is sufficient.
:::danger Foot strap


If using a strap on the soles of the feet, displacement is very likely to occur. [For specifics, please see here](../../tutorial/instroction_for_straps#tracker_position_on_body)

:::

- The `ovr advanced setting` has modified the heading angle; it is recommended to reset it to 0.
- The spatial coordinate transformation cannot be read. [Please see here](#other_notes)

If the 3D preview is already slanted, please follow the diagnostics below:
- It is likely that magnetic deviation has occurred, or the magnetic field environment is poor. If this is the first use or an occasional issue in subsequent uses, it is recommended to perform magnetic field calibration first. [For specific calibration methods, see here](../../ui_help_doc/control/config#magnet_calibrate)
- Exclude the possibility of the strap being slanted and check if any individual trackers are out of battery or have shut down unexpectedly.
- If there are issues such as crossed legs or other leg problems, please carefully read the [strap section](../../tutorial/instroction_for_straps) and the [action calibration section](../../tutorial/connect_and_use#pose_calibration) in the tutorial.
- If the issue still cannot be resolved, please rule out magnetic field interference and strongly recommend reading [this article](../../QA/magnet) thoroughly.

<a id="vr_cannot_connect"></a>

# VR Cannot Connect
The `VR` driver will be automatically and silently installed in the `steamvr` directory. If you notice that the icon in the upper left corner of the `VR` panel does not turn green, you can follow these steps to troubleshoot.

1. Check if `steamvr` is running.
2. Check if the `rebocap` receiver is plugged in and in a [connected state](../../ui_help_doc/control/connect#status).
3. Check if the `rebocap` plugin in `steamvr` is blocked. At the same time, you can check if the `rebocap` plugin is installed.

   <div align="center">
    <img src="/img/steamvr_mask1-en.png" alt="left" width="9%" />
    <img src="/img/steamvr_mask2-en.png" alt="left" width="29%" />
    <img src="/img/steamvr_mask3-en.png" alt="left" width="29%" />
    </div>

4. If the `steamvr` plugin is not installed in the third step, please manually copy and install it as follows:
- Locate the `steamvr` installation directory, the default installation location is `C:\Program Files (x86)\Steam\steamapps\common\SteamVR`, and the plugin location is in the `driver` directory under the `steamvr` directory.
  > If you have changed the `SteamVR` installation location, please find it yourself.
- Copy `rebocap_driver` to the `steamvr` plugin directory. The `rebocap_driver` directory is in the `data` directory of the `rebocap` installation directory, as shown in the left image. The final extracted path is shown in the right image.
   <div align="center">
    <img src="/img/steamvr_plugin0.png" alt="left" width="45%" />
    <img src="/img/steamvr_plugin.png" alt="left" width="50%" />
    </div>

<a id="other_notes"></a>

### Other Notes
:::info Attention for Users with Non-English System Names!!!


If your system uses a non-English name, it may cause the coordinate transformation in `steamvr` to be inaccessible, resulting in incorrect final positions, with the character floating or falling into the floor in steamvr. At this time, the system often prompts the following at startup: rebocap steamvr plugin exception, unable to find spatial coordinate system. In this case, steamvr can only be recognized if installed in one of the following two directories:

`C:\Program Files (x86)\Steam\steamapps\common\SteamVR`

`D:\Steam\steamapps\common\SteamVR`

:::



<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>