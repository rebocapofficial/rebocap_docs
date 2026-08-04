---
sidebar_position: 1
title: "팁"
---

# 팁
튜토리얼을 읽지 않고 이 페이지를 읽는 것은 의미가 없습니다. [먼저 튜토리얼을 읽어주세요](../tutorial/README)!!!!

# SteamVR 연동 단계
1. 처음 사용하는 경우 소프트웨어를 연 후 SteamVR을 반드시 다시 시작해 주세요. VR 패널의 왼쪽 상단에 있는 녹색 표시등은 VR 연동이 성공했음을 나타냅니다. [연결할 수 없는 경우 여기를 참조하세요](#vr_cannot_connect)
2. 최소 8개의 트래킹 포인트를 착용한 후 액션 캘리브레이션을 클릭합니다. Apose 캘리브레이션 중에 헤드셋을 올바르게 착용해야 합니다 [특히 빠른 신호음이 울릴 때]. 구체적인 [캘리브레이션 절차는 여기를 참조하세요](../../tutorial/connect_and_use#pose_calibration)
    > 허벅지, 종아리, 허리, 가슴은 반드시 착용해야 합니다. 발바닥을 착용하지 않으면 [팔로우 모드](../../ui_help_doc/control/connect#vr_pannel)만 사용할 수 있습니다!
3. 정상적인 캘리브레이션 후 기본 SteamVR 인터페이스에서 트래커를 확인하세요. SteamVR Home을 반드시 꺼야 합니다. 그렇지 않으면 트래커를 볼 수 없습니다!
    > 여기에서 문제가 발생하면 먼저 기본 SteamVR 인터페이스로 전환하여 트래커 위치가 예상과 일치하는지 확인하는 것이 좋습니다. VRC와 같은 다른 소프트웨어에서는 IK 개입과 많은 구성으로 인해 원래 트래커 위치를 나타내지 않습니다.
   - SteamVR Home을 끄고 흰색 배경으로 변경하는 방법은 여기를 참조하세요
      <div align="center">
       <img src="/img/steamvr_shutdown_home2-en.png" alt="left" width="39%" />
       <img src="/img/steamvr_shutdown_home3-en.png" alt="left" width="39%" />
       </div>

4. 헤드셋을 착용한 후 트래커 위치가 예상과 일치하는지 확인하세요
    > 여기에서 진단 기능을 열어 보기 쉽도록 트래커 세트를 복사할 수 있습니다.

5. 트래커가 사라지는 등의 오류나 문제가 발생하면 다시 시작할 수 있습니다. rebocap 클라이언트와 SteamVR을 다시 시작하는 것이 좋습니다.
    > 포럼에 피드백을 제공하는 것도 적극 권장합니다! SteamVR 문제이거나 rebocap 문제일 수 있습니다. rebocap 문제인 경우 원인을 파악하고 업데이트하도록 노력하겠습니다!

6. VR 캘리브레이션으로 표시된 높이 차이가 너무 큰 경우, [여기를 참조하세요](../../ui_help_doc/control/connect#vr_pannel)

아래는 SteamVR의 연동 예입니다. 머리 노드의 심한 진동은 헤드셋 포지셔닝 출력 데이터의 지터로 인해 발생합니다!
  <div>
  <video id="video" controls preload="metadata" width="100%">
        <source id="mp4" src="/img/steamvr_example.mp4" type="video/mp4" />
  </video>
  </div>


<a id="how_to_solve_tracker_slant"></a>

### 트래커가 기울어진 경우 수행할 작업
3D 미리보기에서는 캐릭터가 정상으로 보이지만 트래커가 자신에 비해 기울어져 있는 경우 세 가지 원인일 가능성이 높습니다:
- 올인원 기기의 안전 영역이 꺼져 있지 않으며 사용자가 안전 경계 근처에 있거나 벗어났습니다.
  > 사용자 문제의 90% 이상이 이 지점에서 발생합니다.
- 과도한 움직임으로 인해 변위가 발생합니다. 원칙적으로는 자동으로 수정됩니다. 1~2초 동안 가만히 있으면 충분합니다.
:::danger 발 스트랩


발바닥에 스트랩을 사용하는 경우 변위가 발생할 가능성이 높습니다. [자세한 내용은 여기를 참조하세요](../../tutorial/instroction_for_straps#tracker_position_on_body)

:::

- `ovr advanced setting`에서 방향 각도를 수정했습니다. 0으로 재설정하는 것이 좋습니다.
- 공간 좌표 변환을 읽을 수 없습니다. [여기를 참조하세요](#other_notes)

3D 미리보기가 이미 기울어져 있는 경우 아래 진단을 따르세요:
- 자기 편차가 발생했거나 자기장 환경이 좋지 않을 가능성이 높습니다. 처음 사용하거나 이후 사용에서 간혹 발생하는 문제인 경우 먼저 자기장 캘리브레이션을 수행하는 것이 좋습니다. [구체적인 캘리브레이션 방법은 여기를 참조하세요](../../ui_help_doc/control/config#magnet_calibrate)
- 스트랩이 비스듬히 기울어질 가능성을 배제하고 개별 트래커의 배터리가 방전되었거나 예기치 않게 종료되지 않았는지 확인하세요.
- 다리를 꼬거나 기타 다리 문제와 같은 문제가 있는 경우 튜토리얼의 [스트랩 섹션](../../tutorial/instroction_for_straps)과 [액션 캘리브레이션 섹션](../../tutorial/connect_and_use#pose_calibration)을 주의 깊게 읽어보세요.
- 그래도 문제를 해결할 수 없다면 자기장 간섭을 배제하고 [이 기사](../../QA/magnet)를 철저히 읽는 것을 강력히 권장합니다.

<a id="vr_cannot_connect"></a>

# VR에 연결할 수 없음
`VR` 드라이버는 `steamvr` 디렉토리에 자동으로 조용히 설치됩니다. `VR` 패널 왼쪽 상단의 아이콘이 녹색으로 변하지 않는 것을 발견하면 다음 단계에 따라 문제를 해결할 수 있습니다.

1. `steamvr`이 실행 중인지 확인하세요.
2. `rebocap` 수신기가 꽂혀 있고 [연결된 상태](../../ui_help_doc/control/connect#status)인지 확인하세요.
3. `steamvr`의 `rebocap` 플러그인이 차단되었는지 확인하세요. 동시에 `rebocap` 플러그인이 설치되어 있는지 확인할 수 있습니다.

   <div align="center">
    <img src="/img/steamvr_mask1-en.png" alt="left" width="9%" />
    <img src="/img/steamvr_mask2-en.png" alt="left" width="29%" />
    <img src="/img/steamvr_mask3-en.png" alt="left" width="29%" />
    </div>

4. 세 번째 단계에서 `steamvr` 플러그인이 설치되지 않은 경우 다음과 같이 수동으로 복사하여 설치하세요:
- `steamvr` 설치 디렉토리를 찾습니다. 기본 설치 위치는 `C:\Program Files (x86)\Steam\steamapps\common\SteamVR`이며 플러그인 위치는 `steamvr` 디렉토리 아래의 `driver` 디렉토리에 있습니다.
  > `SteamVR` 설치 위치를 변경한 경우 직접 찾아보세요.
- `rebocap_driver`를 `steamvr` 플러그인 디렉토리에 복사합니다. `rebocap_driver` 디렉토리는 왼쪽 이미지와 같이 `rebocap` 설치 디렉토리의 `data` 디렉토리에 있습니다. 최종 추출 경로는 오른쪽 이미지와 같습니다.
   <div align="center">
    <img src="/img/steamvr_plugin0.png" alt="left" width="45%" />
    <img src="/img/steamvr_plugin.png" alt="left" width="50%" />
    </div>

<a id="other_notes"></a>

### 기타 주의 사항
:::info 영어가 아닌 시스템 이름을 사용하는 사용자를 위한 주의 사항!!!


시스템에서 영어가 아닌 이름을 사용하는 경우 `steamvr`에서 공간 좌표 변환에 액세스할 수 없어 최종 위치가 잘못되어 캐릭터가 steamvr에서 떠다니거나 바닥에 떨어질 수 있습니다. 이 때 시작 시 시스템에서 다음과 같은 메시지를 표시하는 경우가 많습니다: rebocap steamvr 플러그인 예외, 공간 좌표계를 찾을 수 없습니다. 이 경우 다음 두 디렉토리 중 하나에 설치된 경우에만 steamvr을 인식할 수 있습니다:

`C:\Program Files (x86)\Steam\steamapps\common\SteamVR`

`D:\Steam\steamapps\common\SteamVR`

:::



<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>