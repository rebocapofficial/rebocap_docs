---
sidebar_position: 2
title: "Hardware List Information"
---

# Hardware List Information
The hardware list information is used for global preview.
- First Column
  > Part Name
- Second Column
  > Part Number, corresponds to the number on the label behind the sensor
- Third Column
  > Battery Level, the percentage can only be used as a reference; it is derived from voltage conversion. However, voltage measurement is not a professional A/D sampling measurement, so there is some error and it is not an absolute percentage. It should be based on actual usage time.
- Fourth Column
  > This refers to communication quality, for example, what percentage of the 120 frame rate data was successfully received in the last 2 seconds. **Not signal strength!** Signal strength can be viewed in the tracker details, measured in `dbm`. Generally, >-70dbm is considered good signal quality; for example, -30 dbm is a very strong signal.
- Fifth Column
  > Absolute value of the magnetic field, measured in uT. A consistent magnetic field is generally displayed in green. If some values are very high or very low, it will be displayed in red. For details on how to assess the magnetic field, please refer to Magnetic Field Detection and Diagnosis

![img.png](/img/hardware_list_info-en.png)

<a id="hardware_detail"></a>

# Hardware Details
Click on an item in the list to view detailed hardware information.

<a id="close_single_tracker"></a>

### Power Off Individually
  > You can click the power off button to turn off this tracker individually.

<a id="detail_information"></a>

### Other Information
- Battery Level
  > Specific battery percentage, this is only for rough reference; actual usage time should be considered.
- Communication Quality
  > What percentage of the 120 frame rate data was successfully received in the last 2 seconds, not signal strength! Signal strength can be viewed in the tracker details, measured in `dbm`. Generally, >-70dbm is considered good signal quality; for example, -30 dbm is a very strong signal.
- Received Signal
  > The signal strength received by the receiver from the sensor; >-70 dbm is considered good signal quality.
- Passive Signal
  > The signal strength received by the sensor from the receiver; >-70 dbm is considered good signal quality.
- Relative Magnetic Field
  > This is the relative size compared to the space and time of the A-Pose during calibration. A relative size consistently within 1.1 is generally considered a good magnetic field environment. In a good magnetic field environment, the application of anti-magnetic algorithms is more effective. For specific magnetic field determination and calibration, please see here
- Acceleration
  > Acceleration after three-axis calibration, normalized to the current gravitational acceleration.
- Gyroscope
  > Gyroscope after three-axis calibration. If the tracker is completely stationary and the value here is more than 0.2 away from zero, it is recommended to perform Gyroscope Calibration

![img.png](/img/hardware_detail-en.png)


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>