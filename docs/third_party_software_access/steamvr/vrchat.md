---
sidebar_position: 2
title: "VRChat Basic Settings"
---

**Before reading this tutorial, please make sure to [carefully read the SteamVR integration](README)!!! If the rebocap tracker icon on SteamVR has never lit up, this tutorial is meaningless!!!**

# VRChat Basic Settings

### Introduction to VRChat Basic Settings
To open the basic settings, follow these steps: Press the Y button on the controller to summon the menu -> click the gear icon -> scroll down to `Tracking & IK`, as shown in the figure
<div align="center">
 <img src="/img/vrchat_setting1.png" alt="left" width="49.5%" />
 <img src="/img/vrchat_simple_setting.png" alt="left" width="45%" />
 </div>

Key points of the basic IK settings introduction:
1. Adjust the height in VRChat

    > User's real height, fill in the height measured in Rebocap here, not your actual height! Because all trackers are simulated according to the height measured by Rebocap.
    > 
    > Rebocap measures height as headset height * 1.05, for height measurement errors [refer here](../../ui_help_doc/control/connect#vr_pannel).
    > 
    > If the height measured by your headset is always inconsistent with your own (meaning it exceeds your height by ±5cm), you can turn off the automatic height measurement in the [VR panel](../../ui_help_doc/control/connect#vr_pannel) and adjust the height on the skeleton page. The final displayed height is the standard! Then in VRChat, set the height to the final displayed height in Rebocap.
    > **Note, this solution is not the best**, because if the headset itself measures the height incorrectly, then the displacement of the headset in space is also incorrect. For example, if the headset actually moves down one meter, the movement data provided by the headset may only be 0.6 meters, resulting in poor tracking performance!

View Rebocap height measurement method: Open the log to see historical messages (if you turn off automatic height, it will not be displayed here!)
<div align="center">
 <img src="/img/rebocap_vr_height-en.png" alt="left" width="30%" />
 </div>

2. Adjust VRChat measurement mode

    > Users new to VRChat full-body motion capture should uniformly use the `Height` mode! Users familiar with VRChat IK can consider using Arm mode, in conjunction with Arm

3. Whether to allow full-body tracking

    > Must be allowed, as shown in the figure, the status is on

4. IK lock mode
  > This can be adjusted to see different effects. If unsure, you can use LockHip or LockHead. There will be significant differences, especially in sitting or lying down postures.

### Introduction to VRChat Advanced IK Settings
To open the basic settings, follow these steps: Press the Y button on the controller to summon the menu -> click world, a large settings panel appears -> click the gear icon -> select `Tracking & IK` on the left, as shown in the figure
<div align="center">
 <img src="/img/vrchat_advanced_setting.png" alt="left" width="24%" />
 <img src="/img/vrchat_advanced_setting2.png" alt="left" width="24%" />
 <img src="/img/vrchat_advanced_setting3.png" alt="left" width="24%" />
 <img src="/img/vrchat_advanced_setting4.png" alt="left" width="24%" />
 </div>

Special note: Users new to VRChat full-body motion capture, except for those marked in the figure, should use all default settings!!! You can refer to the screenshots

Introduction to the 4 settings marked in the figure:
1. Whether to use the traditional IK switch!
    > Not recommended to turn on, default to use IK 2.0, using traditional IK will bring other issues, such as the waist sinking into the buttocks
2. Arm height ratio
    > **This option is only effective when the measurement mode is set to Arm**! For users familiar with VRChat IK, not recommended for unfamiliar users. If there are issues, you can communicate with other users, the official does not provide technical support on this point!
    > 
    > Generally, when set to Arm mode, you can adjust the ratio here to make the leg performance more natural. The specific method is to open the calibration mode in VRChat, see the tracker points, and adjust the ratio so that the tracker points on the feet are near the instep.
   
:::danger Tip


If users find that there are fewer tracking points, it is likely that they have fallen below the floor! Try lifting your feet to check!

:::


3. Whether to display the tracker calibration range
    > That is, the green range sphere.

4. Switch tracker display model
    > If you need to switch to a cross, set the `axis` as shown in the image, and you can switch and view it yourself.

<a id="calibration_in_vrc"></a>

### How to Calibrate in VRChat
After completing the basic settings mentioned above, follow the steps below:
1. Press the Y button on the left controller to open the settings panel.
2. Click the little person icon on the panel (provided that the virtual tracker in SteamVR has been activated; otherwise, the icon here will not match the one in the image below. If unclear, please refer to [SteamVR Integration](README)).
    > ![Full Body Calibration Button](/img/vrchat_calibrate.png)
3. Adjust your standing posture and strike a T-pose, ensuring that the tracking point on the top of your foot is near the top of your foot. If the green range sphere is open, try to make the sphere as small as possible (users familiar with IK can adjust it themselves).
    > If you find that the top of your foot is below the floor, this is often caused by a bug in VRChat. VRChat has issues with ground recognition; for example, if you place the controller on the real floor, the position of the controller in VRChat may be below the floor (the same applies if it is floating).
    > 
    > Currently, there is no good way to solve this. You can restart VRChat or, after calibration, use `ovr advanced settings` to adjust the ground height. Make sure to adjust it only after the motion calibration!!!
4. Maintain the T-pose. If your entire body is aligned, press the trigger buttons on both hands simultaneously (the trigger button refers to the button in the index finger's resting area) to complete the calibration in VRChat!

  <div>
  <video id="video" controls preload="metadata" width="100%">
        <source id="mp4" src="/img/vrc_calibrate.mp4" type="video/mp4" />
  </video>
  </div>

# VRChat Troubleshooting Steps
> Non-detail issues generally refer to specific problems, such as legs not being able to straighten in certain states, which are highly related to VRC and skeleton settings. Further explanations will be provided later.
> 
> This section mainly addresses issues of misalignment or overall chaos.
> 
> Detailed issues will be documented later; for now, you can consult experienced group members.

- Check if the 3D preview interface is normal.
- Check if the tracker in the default SteamVR interface is normal.
    > For specifics, [please refer here](README#how_to_solve_tracker_slant).
- Check if the key settings in VRC are consistent with the tutorial above.

### Why Can't the Character's Arms Straighten in VRC?
- This is caused by a mismatch between the model's skeleton and the user's skeleton. If the model's arm is too short, it is easier to straighten. The core issue is that the bone proportions do not match those of a real person.
  > Advanced users can try using Arm mode and then modify the `arm vs height ratio`.
  > 
  > Here’s an extreme example for players to understand: if the virtual character's arm is 3 meters long, but the character's height is only 1.7 meters, the normal resting position of a person's arms in reality is at the waist. However, VRChat must respect the real hand position, so the virtual character's arms can only be bent at a certain angle.

### Why Are My Character's Feet Below the Floor During Calibration?
> This has already been explained in the third point of [How to Calibrate in VRChat](#calibration_in_vrc).

### Why Can't My Legs Straighten?
> This is related to the significant difference in the virtual character's bone proportions compared to reality. Generally, using a character skeleton that matches your own and adjusting it in rebocap yields the best results.
> 
> Additionally, you can use a calibration trick to alleviate this issue, such as setting the height in VRChat slightly lower than what was measured in rebocap. This makes it easier for the legs to straighten in a sitting position.
> 
> This is aimed at non-dancing users; for dancing users, it is still recommended to set the height according to the measurements in rebocap.

### Why Do My Feet Cross When I Sit Down?
1. Exclude the influence of pants pulling.
2. Change the position of the thigh tracker and observe the effects of different positions.
3. If there are still issues, please [adjust compensation](../../ui_help_doc/control/cap_param#up_leg_com) (prioritize adjusting thigh compensation) based on the effects observed in the 3D preview!
4. During motion calibration, keep the distance between your feet closer together.
5. During calibration in VRChat, keep the distance between your feet a bit closer.

For points 1 and 2, please carefully [read the tutorial section](../../tutorial/instroction_for_straps#tracker_position_recomendation).

### How to Improve Stability
1. Use [complex binding methods](../../tutorial/instroction_for_straps#quick_fix_complex_install) for straps, or purchase wider straps.
2. The foot sensors are crucial; [please refer here](../../tutorial/instroction_for_straps#tracker_position_on_body).
3. For dancing users, especially during intense dancing, it is recommended to find an environment with a relatively good magnetic field and turn off the anti-magnetic mode.


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>