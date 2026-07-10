---
sidebar_position: 3
title: "Sensor Overview"
---

# Sensor Overview

As shown in the figure below, a green color indicates that the sensor is connected to the corresponding joint, while gray indicates that it is not connected. The left side of the image represents the left side of the human body; for example, in the image below, the sensor on the left foot is not connected, and the sensor on the right lower leg is also not connected.

![img.png](/img/2d_view.png)

<a id="tracker_replace"></a>

## Sensor Replacement Function
Here, you can drag and drop sensor points to reorganize the sensors.

:::warning After replacement, if not activated, it will lead to calibration failure


Many users accidentally drag the sensors, for example, dragging the left hand to the left upper leg, but if the left hand is not activated during calibration, it will prompt a calibration failure because the left upper leg is not activated!!! 
After dragging, the replaced points will not be effective regardless of whether they are activated or not.

:::


### Drag-and-Drop Demo
> Click and hold the left mouse button on a node, then drag it to the target position.
<div>
<video id="video" controls autoplay loop preload="metadata" width="35%">
      <source id="mp4" src="/img/remap_config.mp4" type="video/mp4" />
</video>
</div>


### Points that can replace other body parts
   * Left Hand   (Node 13)
   * Right Hand   (Node 14)
   * Left Lower Arm (Node 11)
   * Right Lower Arm (Node 12)


### Parts that can be replaced
   All


### Special Function
   * Replace with shoulder position
    > If you want the shoulder area to be more flexible, you can replace it with the shoulder position, but it has higher requirements for the straps, which need to be resolved independently.


### Replacement Example
As shown in the figure below, all four points of the left and right hands have been replaced, replacing the following parts:
* Left Shoulder
* Right Shoulder
* Left Lower Leg
  > The left lower leg was not activated after replacement, so a calibration failure will occur!!!
* Right Lower Leg

![img.png](/img/2d_view_replace.png)


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>