---
sidebar_position: 1
title: "Mac 및 Linux 지원 여부"
---
## Mac 및 Linux 지원 여부
> 현재 지원되지 않으며, Linux는 향후에도 지원되지 않을 예정입니다. Mac은 향후 지원될 수 있습니다.

## 스탠드얼론 기기 지원 여부
> 향후 Quest 및 Pico 지원 계획이 있으며, 이는 기기의 USB 수신기(즉, 전용 신호 수신기) 지원 여부에 따라 달라집니다.

<a id="audio"></a>

## 오디오 초기화 실패
> 오디오 장치 드라이버 문제를 확인하세요.

<a id="poor_signal"></a>

## 신호 품질이 좋지 않을 때의 대처법
> 첫째, [신호 강도](../ui_help_doc/info#hardware_detail)를 확인하여 수신기와 트래커 근처에 강한 신호 간섭이나 장애물이 없는지 확인합니다. 수신기를 섀시 뒷면에 배치하지 않거나 수신기 근처에 USB 드라이브를 피하는 등의 조치를 취하세요.
>
> 둘째, `CPU` 부하가 너무 높지 않은지 또는 `CPU`가 절전 모드에 있지 않은지 확인하세요. `CPU` 부하를 70% 이내로 유지하고, 노트북 쿨링 불량으로 인해 주파수가 `2.5GHz` 미만으로 떨어지는 등의 낮은 `CPU` 주파수 문제를 배제하세요.

<a id="not_static"></a>

## 캘리브레이션 중 사람이 정지된 것으로 감지되지 않음
> 일반적으로 `Apose`를 유지하면 앞뒤로 약간 흔들릴 수 있습니다. 제어해 보시기 바랍니다. 자세한 캘리브레이션 지침은 [여기에서 확인하세요](../tutorial/connect_and_use#pose_calibration).

<a id="send_failed"></a>

## 캘리브레이션 데이터 전송 실패
> 신호 강도에 문제가 없는지 확인하고 먼저 `USB` 수신기 드라이버를 확인하세요. 이는 일반적으로 `USB` 드라이버 문제로 인해 발생합니다. 구체적인 해결 방법은 [여기를 참조하세요](../tutorial/connect_and_use#how_to_solve_cannot_connect).

<a id="need_calibrate_gyro"></a>

## 일부 노드 자이로스코프 캘리브레이션 필요
> 이 정보는 주로 프롬프트입니다. 사람이 정지하지 않아도 자이로스코프(트래커의 각속도 센서) 정지 정보가 잘못 감지될 수 있기 때문입니다. 중요한 것은 트래커를 바닥에 완전히 정지된 상태로 놓았을 때 자이로스코프 데이터를 확인하는 것입니다. 몇 가지 예외를 제외하고 대부분의 경우 0.3 이내의 값은 정상입니다. 그렇지 않으면 캘리브레이션을 권장합니다. 6축 모드에서는 매번 사용하기 전에 자이로스코프를 캘리브레이션하는 것이 좋습니다. 구체적인 캘리브레이션 방법은 [여기를 참조하세요](../ui_help_doc/control/config#gyro_calibrate).

<a id="vr_height"></a>

## VR 모드에서 캘리브레이션 중 표시된 키가 개인의 키와 일치하지 않음
> Rebocap 장치 자체에는 키를 측정하는 기능이 없습니다. 키 측정은 전적으로 헤드셋에서 제공하는 데이터를 기반으로 합니다. 자세한 내용은 [여기를 참조하세요](../ui_help_doc/control/connect#vrpannel).

<a id="port_open_failed"></a>

## 브로드캐스트 포트 시작 실패
> 포트가 사용 중이거나 이전 `rebocap` 인스턴스에 잔여 프로세스가 있습니다. 하나의 `rebocap`만 실행 중이고 작업 관리자에 하나의 `rebocap` 프로세스만 있는지 확인하세요.

<a id="connect_failed"></a>

## 커넥터 연결 이상
1. 포트 점유 문제 배제. 구체적으로, 단 하나의 `rebocap` 클라이언트 인스턴스만 실행 중이며 다른 소프트웨어가 포트를 점유하고 있지 않은지 확인하세요.

2. 드라이버 이상. 자세한 내용은 [여기를 참조하세요](../tutorial/connect_and_use#how_to_solve_cannot_connect).

<a id="steamvr_connect"></a>

## SteamVR에 연결할 수 없음
> [여기를 참조하세요](../third_party_software_access/steamvr/README#vr_cannot_connect).

## 골격 조정이 적용되지 않음
> [여기를 참조하세요](../ui_help_doc/control/skeleton_setting#skeleton_not_valid).

<a id="firmware_version"></a>

## 펌웨어 버전 업데이트 필요
> 펌웨어를 직접 업데이트하려면 [여기를 참조하세요](../ui_help_doc/control/config#firmware_update).

<a id="cal_exception"></a>

## 캘리브레이션 예외
- 착용 모드가 요구 사항을 충족하지 않는 경우, [여기를 참조하세요](../tutorial/instroction_for_straps#followmode).
- 드라이버 롤백 및 수신기 재연결이 필요한 기본 드라이버 이상 고려, [여기를 참조하세요](../tutorial/connect_and_use#how_to_solve_cannot_connect) (구체적인 방법은 확장 섹션에서 확인해야 함).

<a id="error_puts_on"></a>

## 착용이 요구 사항을 충족하지 않음
- UI 왼쪽 상단 다이어그램에서 사람의 해당 부위에 착용 지점이 켜져 있는지 확인하세요.
- 교체 기능이 활성화되어 있지 않은지 확인하세요. 구체적인 활성화 및 비활성화 방법은 [여기를 참조하세요](../ui_help_doc/remap#trackerreplace).
- 착용 모드가 요구 사항을 충족하는지 확인하세요, [여기를 참조하세요](../tutorial/instroction_for_straps#followmode).

<a id="height_error"></a>

## 헤드셋 키 이상
- 감지된 키가 10cm 미만인 경우, 유니코드 시스템 이름(즉, 영어가 아닌 시스템 이름)으로 인해 SteamVR 드라이버에 이상이 발생했을 가능성이 높습니다. 이는 향후 수정될 예정입니다. 현재로서는 설치 위치를 변경하여 이 문제를 해결해 볼 수 있습니다([여기 참조](../third_party_software_access/steamvr/#other_notes)). 문제가 지속되면 [포럼에 문의](https://forum.rebocap.site)해 주시면 기술 지원팀에서 도와드리겠습니다.
- 헤드셋 키가 본인의 키와 일치하지 않는 경우, 먼저 [여기에서 확인](../ui_help_doc/control/connect#vr_pannel)하거나 포럼 게시물을 볼 수 있습니다:
  - [중국어 버전](https://forum.rebocap.site/t/rebocap/52/1)
  - [영어 버전](https://forum.rebocap.site/t/how-to-solve-the-abnormal-height-detection-in-rebocap/53/1)
  - [일본어 버전](https://forum.rebocap.site/t/rebocap/54)

## 지터 문제
  - 자기장 관련 지터의 경우, [내자성 수준을 변경](../ui_help_doc/control/config#update_reject_mag_and_strenth)하여 12로 설정한 다음 [내자성 모드](../ui_help_doc/control/connect#calibrate)로 전환할 수 있습니다.
  - 어깨 지터 또는 깜박임은 최신 버전으로 업데이트해야 합니다.
  - 점프 및 착지 후 허리 진동의 경우 스트랩 문제를 배제하고, 트래커가 허리에 너무 단단히 부착되어 있지 않은지 확인하거나, 더 넓은 스트랩을 구입하거나 복잡한 결합 방법을 사용하고 스트랩에 대한 트래커의 무게 중심을 낮추기 위해 빠른 해제를 피하는 것이 좋습니다.

<a id="freq_change_note"></a>

## 통신 채널 수정 문제
- 통신 채널은 기본 채널과 채널 1 사이를 오갈 수 있습니다. 그러나 전환 과정에서는 연결된 트래커의 채널만 전환됩니다. 연결된 트래커 없이 채널을 전환하면 수신기의 통신 채널만 변경되어 통신 채널 불일치가 발생합니다. 다시 연결하려면 채널을 다시 전환해야 합니다.
- 통신 채널 전환 오류가 발생하면 일치할 때까지 다시 전환해 보세요.
- 연결할 수 없는 경우, 성공적으로 연결할 수 있는지 채널을 앞뒤로 전환해 볼 수도 있습니다.
- 여전히 성공적으로 전환할 수 없는 경우, 물리적 초기화 통신 채널 기능을 사용할 수 있습니다. 충전 박스를 사용하여 통신 채널을 초기화할 수 있습니다, [자세한 내용은 여기를 참조하세요](../ui_help_doc/control/config#change_channel). 또한 소프트웨어에서 채널 초기화를 클릭하세요(클릭할 수 없는 경우 수신기는 이미 기본 채널로 설정되어 있습니다).


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>