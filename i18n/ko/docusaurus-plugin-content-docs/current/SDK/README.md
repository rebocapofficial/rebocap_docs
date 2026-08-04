---
sidebar_position: 1
title: "SDK 인터페이스 설명"
---
# SDK 인터페이스 설명
현재 DLL은 총 8개의 포트를 노출하며, 각 SDK는 DLL 인터페이스를 래핑합니다. 자세한 내용은 cpp SDK의 `include/rebocap_ws_sdk/rebocap_ws_sdk.h` 헤더 파일을 참조하세요.

SDK의 출력 값 유형은 쿼터니언이며 다중 좌표 공간 출력[기본 OpenGL 오른손 좌표계, Blender, Unity, UE]을 지원하며, 변위 단위는 미터입니다.

Python SDK는 아직 `rebocap_ws_sdk_calculate_foot_vertex` 인터페이스를 통합하지 않았습니다.

### 인터페이스 설명
* rebocap_ws_sdk_new
```
    SDK 인스턴스를 생성합니다. 매개변수는 다음과 같습니다:
    1. 좌표 공간, 특정 지원되는 공간은 각 SDK에서 찾을 수 있으며 여기서 자세히 설명하지 않습니다.
    2. 전역 좌표계를 사용할지 여부. 0을 전달하면 로컬 좌표계를 사용하며, 이는 부모 뼈의 좌표계에 상대적입니다. 모든 회전은 T-pose 회전에 상대적입니다. 회전에 대해 명확하지 않은 경우 Blender, Unity 및 UE의 소스 코드를 참조할 수 있으며, Unity의 회전이 비교적 이해하기 쉽습니다.
    
    반환 값:
    SDK 객체 인스턴스에 대한 포인터를 반환합니다.
```

* rebocap_ws_sdk_release
```
SDK 인스턴스 객체를 해제합니다. 전달되는 매개변수는 인스턴스 포인터입니다.
```
* rebocap_ws_sdk_open
```
WebSocket 클라이언트를 열고 WebSocket 포트에 연결합니다. 구체적인 사용법 및 반환 값 설명은 SDK 코드를 참조하세요.
```
* rebocap_ws_sdk_close
```
WebSocket 클라이언트를 닫고 연결을 끊습니다. 구체적인 사용법은 SDK를 참조하세요.
```
* rebocap_ws_sdk_set_pose_msg_callback
```
메시지 콜백을 등록합니다. 여기서 데이터는 사용자가 액션 캘리브레이션을 수행한 후에만 WebSocket에서 출력됩니다. 프레임 속도는 초당 60프레임입니다. 구체적인 사용법은 SDK 코드를 참조하세요. 
관절 순서는 24개 뼈의 이름을 참조하세요.
```
* rebocap_ws_sdk_set_exception_close_callback
```
비정상적인 WebSocket 종료에 대한 콜백을 등록합니다. 구체적인 사용법은 SDK 코드를 참조하세요.
```
* rebocap_ws_sdk_get_last_msg
```
콜백 형태 외에도, 여기서 직접 마지막 액션 메시지를 얻을 수도 있습니다. 데이터 형식은 콜백과 일치합니다.
```
* rebocap_ws_sdk_calculate_foot_vertex
```
    이 인터페이스는 주로 발과 몸 골격의 접촉점을 Rebocap에 등록하는 데 사용됩니다. 
    몸 골격 데이터(각 관절의 위치, SMPL 시퀀스와 동일한 순서)를 전달해야 합니다. 
    DLL이 접촉점 위치를 자동으로 계산하도록 하려면 발 메쉬를 전달해야 합니다. 발 접촉점 위치 정보(각 발의 앞뒤 3개 지점, 총 12개 지점)를 전달할 수도 있으며, 이 경우 DLL은 자동으로 계산하지 않고 전달된 값을 사용합니다. 
    여기서 단위는 미터이고 좌표는 전역 좌표이며 OpenGL 좌표계를 사용해야 합니다. 그렇지 않은 경우 변환 매개변수를 전달해야 합니다. 구체적인 사용법은 Unity 데모 및 UE 플러그인 사용법을 참조하세요.
    
    이 인터페이스는 비교적 복잡합니다. 사용자는 충분한 개발 능력을 갖추거나 Unity 데모 또는 UE 플러그인 코드의 코드를 완전히 이해할 수 있어야 합니다. Python 버전은 이 인터페이스를 노출하지 않습니다. 필요한 경우 CPP SDK 또는 원본 DLL에서 Python 인터페이스를 캡슐화할 수 있습니다.
    
    대부분의 사용자는 플러그인 개발을 위해 VRM 모델을 Rebocap 클라이언트에 업로드하여 동일한 효과를 얻을 수 있습니다. 발 접촉점에 대한 이해는 골격 내보내기에 관한 Blender 통합 설명서를 참조할 수 있습니다.
```

### 24개 뼈 이름
해당 Mixamo 및 SMPL 표준 이름은 다음과 같으며 총 24개의 뼈가 있습니다. 참고로 인덱스 0의 뼈는 엉덩이에 해당하며, 이는 허리 노드입니다.
그 중 왼쪽과 오른쪽 발가락 및 손가락에 해당하는 관절은 해당하는 트래커 노드가 없으므로 출력 로컬 회전은 0입니다. 전역 회전을 사용하는 경우 출력 회전 값은 부모 노드와 일치합니다.

- Mixamo 해당 이름
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
- SMPL 표준 해당 이름
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


# SDK 다운로드
### Python SDK
> python3.6~python3.12와 호환

<a href="/img/files/rebocap_ws_sdk_python_v2.zip" target="_blank" download="rebocap_python_sdk_v2.zip">python sdk v2 다운로드</a>

Python sdk v2 업데이트 내용:
> `get_last_msg` 인터페이스로 인해 발생한 교착 상태 문제 수정
> 모든 `python` 버전에 대한 지원 추가

### C# SDK
> 다운로드한 파일의 README.md를 참조하세요
> 
> 사용법은 Unity 프로젝트를 참조할 수 있습니다

<a href="/img/files/csharp_sdk_with_demo_v2.zip" target="_blank" download="rebocap_csharp_sdk_v2.zip">csharp sdk v2 다운로드</a>

C# sdk v2 업데이트 내용:
> `get_last_msg` 인터페이스로 인해 발생한 교착 상태 문제 수정


### CPP SDK
> 다운로드한 파일의 README.md를 참조하세요
> 
> 사용법은 UE 프로젝트를 참조할 수 있습니다

<a href="/img/files/rebocap_cpp_sdk_v03.zip" target="_blank" download="rebocap_cpp_sdk_v3.zip">cpp sdk v3 다운로드</a>

C++ sdk v3 업데이트 내용:
> `get_last_msg` 인터페이스로 인해 발생한 교착 상태 문제 수정


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>