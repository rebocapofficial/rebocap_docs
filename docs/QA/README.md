---
sidebar_position: 1
title: "Does it support Mac and Linux"
---
## Does it support Mac and Linux
> Currently not supported, Linux will not be supported in the future, Mac might be supported

## Does it support standalone devices
> Future plans to support Quest & Pico, depending on the device's support for USB receivers (i.e., dedicated signal receivers)

<a id="audio"></a>

## Audio initialization failed
> Check for audio device driver issues

<a id="poor_signal"></a>

## How to deal with poor signal quality
> First, check the [signal strength](../ui_help_doc/info#hardware_detail) to ensure there are no strong signal interferences or obstructions near the receiver and tracker, such as not placing the receiver at the back of the chassis, and avoiding USB drives near the receiver.
>
> Secondly, ensure the `CPU` load is not too high, or that the `CPU` is not in power-saving mode. Try to keep the `CPU` load within 70%, and rule out issues of low `CPU` frequency, such as poor laptop cooling, which may cause the frequency to drop below `2.5GHz`.

<a id="not_static"></a>

## Person not detected as stationary during calibration
> Generally, maintaining `Apose` may involve some back-and-forth swaying. Please try to control it. For detailed calibration instructions, please [refer here](../tutorial/connect_and_use#pose_calibration).

<a id="send_failed"></a>

## Failed to send calibration data
> Ensure there are no issues with signal strength, and first check the `USB` receiver driver. This is usually caused by `USB` driver issues. For specific solutions, [please see here](../tutorial/connect_and_use#how_to_solve_cannot_connect).

<a id="need_calibrate_gyro"></a>

## Some node gyroscopes may need calibration
> This information is mainly a prompt, as the person not being stationary can also lead to incorrect detection of gyroscope (angular velocity sensor on the tracker) stationary information. The key is to check the gyroscope data when the tracker is placed absolutely still on the ground. Apart from a few outliers, most of the time, values within 0.3 are normal. Otherwise, calibration is recommended. In 6-axis mode, it is recommended to calibrate the gyroscope before each use. For specific calibration methods, please [see here](../ui_help_doc/control/config#gyro_calibrate).

<a id="vr_height"></a>

## In VR mode, the height prompted during calibration does not match personal height
> The Rebocap device itself does not have the capability to measure height. Height measurement is entirely based on the data provided by the headset. For details, please [see here](../ui_help_doc/control/connect#vrpannel).

<a id="port_open_failed"></a>

## Broadcast port startup failed
> The port is occupied, or there is a residual process from a previous `rebocap` instance. Ensure that only one `rebocap` is running, and that there is only one `rebocap` process in the task manager.

<a id="connect_failed"></a>

## Connector connection abnormal
1. Eliminate port occupation. Specifically, ensure that only one `rebocap` client instance is running, and no other software is occupying the port.

2. Driver anomaly. For details, [please see here](../tutorial/connect_and_use#how_to_solve_cannot_connect).

<a id="steamvr_connect"></a>

## SteamVR cannot connect
> Please [see here](../third_party_software_access/steamvr/README#vr_cannot_connect).

## Skeleton adjustment ineffective
> Please [see here](../ui_help_doc/control/skeleton_setting#skeleton_not_valid).

<a id="firmware_version"></a>

## Firmware version needs updating
> Please [see here](../ui_help_doc/control/config#firmware_update) to update the firmware directly.

<a id="cal_exception"></a>

## Calibration exception
- Consider that the wearing mode does not meet the requirements, [please see here](../tutorial/instroction_for_straps#followmode).
- Consider underlying driver anomalies, requiring a rollback of the driver and re-plugging the receiver, [please see here](../tutorial/connect_and_use#how_to_solve_cannot_connect) (specific methods need to be viewed in the expanded section).

<a id="error_puts_on"></a>

## Wearing does not meet requirements
- Ensure that the worn points are lit up on the corresponding parts of the person in the UI's top-left corner diagram.
- Ensure that the replacement function is not enabled. For specific enabling and disabling methods, [please see here](../ui_help_doc/remap#trackerreplace).
- Ensure that the wearing mode meets the requirements, [please see here](../tutorial/instroction_for_straps#followmode).

<a id="height_error"></a>

## Headset Height Abnormality
- If the detected height is below 10cm, it is likely due to an anomaly in the SteamVR driver, possibly caused by a Unicode system name, meaning a non-English system name. This will be fixed in the future. Currently, you can try to resolve this issue by changing the installation location ([refer here](../third_party_software_access/steamvr/#other_notes)). If the problem persists, [contact the forum](https://forum.rebocap.site), and our technical staff will assist you.
- If the headset height does not match your own, you can first [check here](../ui_help_doc/control/connect#vr_pannel), or you can look at the forum posts:
  - [Chinese Version](https://forum.rebocap.site/t/rebocap/52/1)
  - [English Version](https://forum.rebocap.site/t/how-to-solve-the-abnormal-height-detection-in-rebocap/53/1)
  - [Japanese Version](https://forum.rebocap.site/t/rebocap/54)

## Jitter Issues
  - For magnetic field-related jitter, you can [change the anti-magnetic level](../ui_help_doc/control/config#update_reject_mag_and_strenth) to 12, then switch to [anti-magnetic mode](../ui_help_doc/control/connect#calibrate).
  - Shoulder jitter or flickering requires updating to the latest version.
  - For waist oscillation after jumping and landing, it is recommended to rule out strap issues, ensure the tracker is not tightly attached to the waist, or purchase a wide strap, or use a complex binding method, and avoid quick release to lower the tracker's center of gravity relative to the strap.

<a id="freq_change_note"></a>

## Communication Channel Modification Issues
- The communication channel can switch back and forth between the default channel and channel 1. However, during the switching process, only the channel of the connected tracker will switch. If you switch channels without a connected tracker, only the receiver's communication channel will change, leading to a mismatch in communication channels. You will need to switch back to connect.
- If a communication channel switching error occurs, you can try switching again until they match.
- If you find that you are unable to connect, you can also try switching channels back and forth to see if you can connect successfully.
- If you still cannot switch successfully, you can use the physical reset communication channel feature. You can reset the communication channel using the charging box, [see here for details](../ui_help_doc/control/config#change_channel). Additionally, click the reset channel in the software (if it cannot be clicked, the receiver is already set to the default channel).


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>