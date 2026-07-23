---
sidebar_position: 9
---

# SteamVR Guide

Here are some recommended settings for SteamVR and solutions to common issues.


## VR Headset / Streaming Software Recommendations
### VR Headset Settings

<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![steamvr_windows](/img/steamvr_guide/steamvr_windows.jpg)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong> - Try to use SteamVR's desktop window to control the Rebocap software.</strong><br />
The built-in system menu overlay on some VR headsets may pause/sleep SteamVR data,<br />
(Virtual Desktop is not affected by this, but avoid Quest system sleep)<br />
and returning to SteamVR resets the headset orientation,
which can cause Rebocap's body orientation to misalign in SteamVR or record an incorrect direction during calibration.
<details className="plain-details"><summary>Details</summary>
·················<br />

</details>

</div>
</div>






- For standalone headsets like Quest or Pico, draw the play boundary slightly larger than your actual room size<br />
to prevent triggering boundary popups that disrupt headset tracking data in SteamVR.

- If the headset remains fixed in place when walking or crouching, it indicates that positional tracking is disabled in the VR headset system.<br />
(Enable Play Boundary on Quest system; enable [Positional Tracking] on Pico system)




### Virtual Desktop 
<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![vd_settings](/img/steamvr_guide/vd_settings.jpg)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong>2 options are recommended to be disabled:</strong>
<br />

> <strong>1 - Center to play space</strong><br />
 When double-clicking the left controller Home button to return to VD desktop, the headset in SteamVR space rotates 180° backward,<br />
which may cause Rebocap to record an incorrect orientation during calibration.



> <strong>2 - Emulate SteamVR vive trackers</strong><br />
 This feature passes Quest system's AI body tracking points into SteamVR, but causes tracking point overlaps and conflicts in VRChat.<br />
 If you only want to enable specific custom tracking points, you can use a plugin to configure it.<br />
 🌐 [Plugin GitHub Repository](https://github.com/DenTechs/Virtual_Desktop_Body_Tracking_Configurator)


</div>
</div>




### SteamVR
- Disable SteamVR boundaries<br />
Default boundaries limit the maximum movement range of tracking points like an invisible wall.<br />
If the VR headset misaligns at 2.4m height, trackers may appear unable to exceed headset height when lying down and lifting legs,<br />
because SteamVR's default ceiling height is 2.4m, and tracking points cannot pass through the ceiling.

- Recenter VR headset orientation in advance<br />
Press and hold the 'Right Controller Home Button' to reset VR headset system orientation,<br />
which resets the SteamVR virtual horizon arrow to face straight ahead. If orientation is accidentally lost, use this feature to realign the coordinate system.

- Prompt popup when launching games<br />
Select any community binding configuration in the background,<br />
and after activating it, the prompt will no longer appear on subsequent launches.

## Unable to Connect to SteamVR
Please check the following items:

<strong> 1 - Click Calibration while SteamVR is running.</strong><br />
If SteamVR is not running, Rebocap cannot detect whether VR exists in the system.

<strong> 2 - Check SteamVR Drivers.</strong><br />
Open Rebocap's [Log Window] records, which automatically check upon launching Rebocap.
If needed, you can force install drivers in the [Settings] page.

<strong> 3 - Check SteamVR Add-ons.</strong><br />
If SteamVR crashes unexpectedly, it often forcibly disables all add-ons.<br />
Re-enabling Rebocap add-ons requires restarting SteamVR.






## Showing and Hiding SteamVR Tracking Points




<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![steamvr_windows](/img/steamvr_guide/v01_off_1-en.png)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong> Showing and Hiding Tracking Points</strong><br />
 Control tracking point visibility in the software under [ Configure SteamVR Output Nodes ],<br />
 without needing to operate in SteamVR's management menu.<br />

 <details className="plain-details"><summary>Note</summary>
Trackers do not connect directly to SteamVR. Physical trackers control the skeleton system, which creates corresponding tracking points and feeds them into SteamVR.<br />
This means tracking points can still be provided to SteamVR even without a physical tracker on that body part.

</details>


</div>
</div>

## Tracking Points Set but Game Fails to Recognize Feet and Waist

- Some games use OpenVR environment to identify tracking, but the driver included with current Rebocap Release has a bug causing unrecognized trackers, which cannot be recognized even if modified in SteamVR settings.


This bug is pending fix by the team in future updates.
