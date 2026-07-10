---
sidebar_position: 2
title: "How to Identify Whether the Magnetic Field Environment is Good"
---

# How to Identify Whether the Magnetic Field Environment is Good
For motion capture devices, the core consideration is the consistency of the magnetic field direction (specifically the heading), which refers to the direction parallel to the ground, i.e., the east, south, west, and north directions.

Sometimes, there may be minimal magnetic interference, but it can still have a slight angular effect on the direction. There may also be individual areas with strong interference that do not affect the compass direction, such as when the magnetic field direction of the interference source is perpendicular to the ground or coincides with the Earth's magnetic field direction.

Therefore, all measurements should be based on direction, while the strength of the magnetic field serves as an auxiliary judgment tool. Additionally, the Earth's magnetic field strength varies in different dimensions; the closer you are to the poles, the stronger the magnetic field, and the closer you are to the equator, the weaker the magnetic field. Thus, if you see references to magnetic field strength in videos by certain bloggers, they are generally not very meaningful, as you may have a significant latitude difference from them. For example, the magnetic field strength in Beijing, China, is about 55uT, while in Shenzhen, China, it is about 35uT. Furthermore, the magnetic field is also influenced by geographical factors, so magnetic field strength information is generally for reference only. **The magnetic field strength in different regions is not comparable; only the magnetic field strength within the same room is comparable!**

### Sources of Magnetic Field Interference
|    Interference Source     |                                              Interference Level                                               |
|:--------------------------:|:----------------------------------------------------------------------------------------------------------------:|
|          Magnet            |                                             Extremely strong, do not approach                                             |
|          Iron Objects      |                               Related to size; the larger the object, the stronger the interference. For example, if using iron screws on a table, stay about 30cm away.                               |
|        304 Stainless Steel |                       Generally non-magnetic, but may have some interference due to manufacturing processes, and it is related to size, about 1/5 of the interference level of iron objects.                        |
|        Wireless Charging    |                                        Strong interference near the coil, especially during charging.                                        |
|          Computer          |                                           Significant interference near the speakers.                                            |
|          Mobile Phone      |                                           Significant interference near the phone's speaker.                                           |
|          Router            |                                       **Basically no interference unless there are weighted iron blocks.**                                        |
|          Mouse             |                                       **Basically no interference unless there are weighted iron blocks.**                                        |
|          VR Controller      |                                           Generally has interference within 30cm.                                            |
|          Headset           |                             Generally, there is no interference if you stay 30-40cm away, except for some specific headset devices, such as pico4pro.                              |
|  Near 220V Household Cables |                                            There will be interference when the current is large.                                            |
|          Speaker           |                                           Significant interference, try to stay away!                                            |
|        Head-mounted Headset |                                           Significant interference, try to stay away!                                            |
|        Bluetooth Headset    |                                     Bluetooth does not interfere with the magnetic field, but the headset's microphone may have interference!                                      |
|        Wooden Table        |                                     There will be noticeable interference if iron screws are used at the joints; no interference in other areas.                                     |
|        Power Strip         |                                         Depends on the current size; larger current means greater interference.                                         |
|        Microwave Oven      |                                     Extremely high interference; after being turned on, there is significant interference over a wide area!                                      |
|        Water Heater        |                                       Contains iron elements in the metal; generally, there is interference within 1 meter.                                        |
|          Wall              |                                  If it is a reinforced concrete load-bearing wall or column, there is significant interference within 0.5 meters.                                   |
|          Floor             | Most floors have some interference (wooden floors only have a surface layer; the inner layer still has a steel structure).<br/>There is some interference near the floor surface, depending on the steel material; some floors have basically no interference above 10cm height, while others may require more than 60cm or even 100cm. |

The above information is for reference only! Please refer to actual measurements!

<a id="use_phsical_compass"></a>

### Measuring with a Physical Compass
Use a physical compass to conduct multi-point measurements, check the magnetic field direction, and verify the consistency of the compass needle direction. It is recommended to place the physical compass on a large rectangular cardboard box to ensure the compass's directional consistency as much as possible. By reading the degree difference of the compass needle, you can assess the quality of the magnetic field environment.

A good magnetic field environment will have consistent directions at all points. If only the magnetic field direction near the floor at a height of 10~20cm is inconsistent, while other directions are consistent, the magnetic field environment can still be considered good. (Our software has directional constraints on the ankles, so it can be immune to magnetic interference on the foot sensors).

However, if the direction of the thigh height and waist magnetic sensors are inconsistent, it can easily lead to a small angle of self-rotation at the waist when sitting down, commonly referred to as tilting. (This refers to not using anti-magnetic algorithms and not in 6-axis working mode).

**Generally, we consider a direction difference within 5 degrees to indicate good magnetic field consistency, depending on the user's sensitivity to the direction of their virtual skeleton.**

### Measuring with an Electronic Compass
> This section only introduces using a mobile phone compass for measurement

A mobile phone compass is relatively less accurate compared to a physical compass and also requires calibration. It is also recommended to place the phone on a large rectangular cardboard box to prevent changing the phone's direction and affecting the readings. For specific measurements and results, please refer to [Measuring with a Physical Compass](#use_phsical_compass).

:::danger Precautions for Using a Mobile Phone Compass


The compass in a mobile app only adopts magnetic sensor data when first opened; subsequently, it uses the gyroscope to maintain compass operation. Therefore, any magnetic interference will cause the compass to always point in one direction.

The correct measurement method is to kill the compass process after measuring each point, then reopen the compass app!

:::


### Measuring with a Mobile Sensor Recording App
It is recommended to download the phyphox app for measurement. Here is the [Chinese version Android download](../../img/files/base.apk).
You can also download it from the [official website](https://phyphox.org/download/).

After installing the app, open it and follow the instructions below to start recording. Then move around to record the three-axis magnetic field strength at various locations. **Ensure the phone's direction always points in one direction!!!** You can place it on a large square cardboard box to more easily ensure the phone's directional consistency.

<div align="center">
<img src="/img/mag_app1-en.jpg" alt="left" width="30%" />
<img src="/img/mag_app2-en.jpg" alt="left" width="30%" />
</div>

If the result shows three flat curves (ensure the phone was translated between positions, a flat curve at a single point is meaningless), it indicates a good magnetic field environment. Otherwise, carefully diagnose the magnetic field direction. It is recommended to measure at different heights simultaneously.

:::info Tip


This type of continuous three-axis magnetic field recording is greatly influenced by personal movement. The orientation can easily change during movement, and any directional change will cause peaks. Therefore, this method is generally not recommended. Some users may frequently change their orientation during measurement, making the results even less reliable!!!

:::


### Measuring with Rebocap Sensors

After magnetic field calibration, Rebocap sensors have higher measurement accuracy than various smartphones. Therefore, if you have Rebocap equipment, use Rebocap sensors for measurement. You can place one of the sensors in the charging box with the charging contacts facing up, then select a node to view the 3D rotation of that node.

Be sure to turn off the anti-magnetic mode; otherwise, the measurement results will be invalid!!!

Then check the consistency of the cube box direction at each point. If all are consistent, it indicates a good magnetic field environment. If inconsistent, when using non-anti-magnetic mode, the virtual body skeleton will have deviations near the corresponding measurement points.

Additionally, we can use Rebocap sensors calibrated for magnetic fields to measure magnetic field strength ([see here to determine if calibration is needed](#detect_need_magnet_calibrate)), measuring the interference level of different sources. [Calibrated Rebocap sensors have higher magnetic field strength measurement accuracy than using a phone].

<a id="detect_need_magnet_calibrate"></a>

# How to Determine if Magnetic Field Calibration is Needed
### Overall Qualitative Check
If already worn and activated, you can check the magnetic field strength in the [hardware information list](../ui_help_doc/info). Generally, consistent overall strength will appear all green, while those exceeding the average range significantly will appear yellow or even red. Therefore, pay special attention to yellow and red nodes for [single node detection](#single_node_magnet_check).

However, there is a situation where interference sources in certain areas are indeed large, which can be tested again away from the interference source.

Another way to judge is that the magnetic field strength of the left and right trackers at the same height should be consistent. From the ground to the head, the change in magnetic field strength is generally consistent. For example, both feet are around 35, calves around 39, thighs around 45, and chest and waist around 46. This is generally due to environmental factors rather than magnetic field deviation.

以上判定方法均是定性判断，是否需要校准，具体[refer here](#single_node_magnet_check)。

<a id="single_node_magnet_check"></a>

### Single Node Detection
Open the node to check the magnetic field strength, then find a point in space, point a, move to point a, press the sensor switch to restart, and slowly rotate around point a along three axes while observing the magnetic field strength changes. For example, we can stop for 1 second with each of the 6 faces facing up to check the magnetic field strength. If the magnetic field strength is completely consistent, calibration is not needed; otherwise, calibration is required.

We can also check the relative magnetic field strength. If the variation range is within 0.1, generally, recalibration is not needed. However, if you are unsure, you can perform magnetic field calibration to see if the consistency improves after calibration.

:::info Principle Explanation


If there is a magnetic field offset, the magnetic field strength will be inconsistent when the sensor is in different directions. For example, suppose the x-axis has an offset of 15uT. If the magnetic field direction is aligned with the x-axis, the magnetic field strength is 45uT. When the magnetic field is in the same direction as the positive x-axis, the measured value is 60uT, and in the opposite direction, it is 30uT. Without offset, the measurement result will be 45uT.

However, the magnetic field strength in our room will always have some interference. The magnetic field in a specific room often shows small fluctuations, so a variation of about 1~3uT during measurement is normal. The average value should be observed.

:::


:::warning Tip


The detected spatial point must be far from interference sources, preferably half a meter away from the computer, and rotate around a point in space.

:::


# How to Choose Anti-Magnetic Mode

```mind:height=350,width:100%,title=抗磁模式选择,color
- **Magnetic Field Environment**
	- **Consistent Magnetic Field Environments**
		- **Dancing**
			- Turn off anti-magnetic mode, magnetic strength above 10, avoid using 6-axis.
		- **Slow-Paced Dancing**
			- Use anti-magnetic mode, magnetic strength 12, avoid using 6-axis.
		- **Normal Socializing and Sleep**
			- Use anti-magnetic mode, magnetic strength 12, avoid using 6-axis.
	- **Interference in Some Areas (e.g., Flooring)**
		- **Dancing**
			- Turn off anti-magnetic mode, magnetic strength above 10 (some nodes may shift in certain positions).
			- Use anti-magnetic mode, magnetic strength 12 (not suitable for continuous use; recommend pausing for a few seconds after 1-3 minutes).
			- 6-axis mode: Recalibration needed after extended use.
		- **Slow-Paced Dancing**
			- Use anti-magnetic mode, magnetic strength 12, avoid using 6-axis.
		- **Normal Socializing and Sleep**
			- Use anti-magnetic mode, magnetic strength 12, avoid using 6-axis.
	- **Limited Magnetic Field Environment (e.g., Spring Beds or Rooms Near Transformers)**
		- **Sleeping**
			- Anti-magnetic mode, then use 6-axis.
		- **Dancing and Slow-Paced Dancing**
			- 6-axis mode: Recalibration needed after extended use.
		- **Regular Socializing**
			- Reduce movement and other activities; recalibration can usually be delayed.
```

```mind:height=350,width:100%,title=Selection of Anti-Magnetic Mode,color
- **Magnetic Field Environment**
    - **Consistent Magnetic Field Environment**
        - **Dance**
            - Turn off anti-magnetic mode, set magnetic force to 10 or above, do not use 6-axis.
        - **Slow Dance**
            - Use anti-magnetic mode, set magnetic force to 12, do not use 6-axis.
        - **Normal Socializing and Sleeping**
            - Use anti-magnetic mode, set magnetic force to 12, do not use 6-axis.
    - **Interference in Some Areas (e.g., Spring Bed)**
        - **Dance**
            - Turn off anti-magnetic mode, set magnetic force to 10 or above (some nodes may shift at specific positions).
            - Use anti-magnetic mode, set magnetic force to 12 (not suitable for continuous use, recommend a few seconds break every 1-3 minutes).
            - 6-axis mode: Recalibration is needed after prolonged use.
        - **Slow Dance**
            - Use anti-magnetic mode, set magnetic force to 12, do not use 6-axis.
        - **Normal Socializing and Sleeping**
            - Use anti-magnetic mode, set magnetic force to 12, do not use 6-axis.
    - **Limited Magnetic Field Environment (e.g., Room Near Spring Bed or Transformer)**
        - **Sleeping**
            - Use anti-magnetic mode, then use 6-axis.
        - **Dance and Slow Dance**
            - 6-axis mode: Recalibration is needed after prolonged use.
        - **Normal Socializing**
            - Reduce movement and other activities, usually can delay recalibration.
```

# Other Common Issues

- After sleeping, the chest or waist is completely twisted
  > If using 6-axis mode, this is due to long-term drift. If the node is moved away from the chest to avoid fluctuations caused by breathing, our algorithm can suppress gyroscope drift.
  > 
  > If using anti-magnetic mode, if the [relative magnetic field size](../ui_help_doc/info#hardware_detail) is not around 1.0 for a long time after lying down, essentially the sensor is also working in 6-axis mode.

- Using anti-magnetic mode, there is still slight bending in the waist when sitting down
  > In anti-magnetic mode, the choice between using 6-axis or magnetometer is mainly based on magnetic field strength. If the magnetic field strength is consistent, but there is slight angular deviation when standing and sitting, the anti-magnetic algorithm cannot recognize it, so there will still be small angular deviations. Consider using 6-axis mode without the magnetometer to solve this issue.
  >
  > The anti-magnetic algorithm mainly addresses poor magnetic fields at certain points, but in most areas and during most usage times, the magnetic field environment is good. For example, when the handle is close to the sensor or temporarily moved in front of the computer, the anti-magnetic effect is very noticeable. However, for small angular magnetic field errors and consistent magnetic field strength, the anti-magnetic algorithm currently cannot achieve good recognition. Please wait for updates.



<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>