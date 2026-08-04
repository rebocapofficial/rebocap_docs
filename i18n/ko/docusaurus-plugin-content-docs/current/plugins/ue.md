---
sidebar_position: 3
title: "UE 플러그인 다운로드"
---
# UE 플러그인 다운로드

아래는 다운로드 링크입니다. UE 소스 코드 개발을 위해 직접 컴파일할 수 있습니다. 현재 플러그인은 `UE5` 버전에만 적용 가능합니다.

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin.zip">ue 플러그인 소스</a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_51_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_52.zip">ue 5.1 플러그인 사전 빌드 </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_52_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_52.zip">ue 5.2 플러그인 사전 빌드 </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_53_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_53.zip">ue 5.3 플러그인 사전 빌드 </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_54_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_54.zip">ue 5.4 플러그인 사전 빌드 </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_55_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_55.zip">ue 5.5 플러그인 사전 빌드 </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_56_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_56.zip">ue 5.6 플러그인 사전 빌드 </a>


# UE 사용 설명서

1. **UE에서 새 프로젝트 생성**

   블루프린트와 C++ 프로젝트 모두 가능합니다. 플러그인을 더 개발해야 하는 경우 `C++` 프로젝트를 생성하고 캐릭터를 임포트해야 합니다 (캐릭터의 기본 포즈는 `T-Pose`여야 하며 `A-Pose`일 경우 팔 동작이 비정상적으로 나타날 수 있습니다). 그런 다음 프로젝트 폴더를 열고 `Plugins` 폴더를 새로 만든 다음, `rebocap_unreal_engine_plugin`을 `Plugins`에 넣으세요. 예를 들어, `testV3` 프로젝트를 생성한 경우의 전체 디렉토리 구조는 다음과 같습니다:

    <div align="center">
    <img src="/img/ue_plugin/ue1.png" alt="pic_left" width="80%" />
    </div>

2. **UE를 다시 열면 자동으로 컴파일됩니다 [소스 코드가 공개되어 있으므로 모든 버전과 호환되어야 함]**

    > 플러그인을 추가로 개발하고 디버깅할 때 Rider를 사용하여 `[name].uproject`를 직접 열어 개발하고 쉽게 디버깅할 수 있습니다.
    > 
    > Rider를 사용하여 컴파일하고 오류가 있는지 확인할 수 있습니다. UE를 사용하여 자동 컴파일하고 오류가 발생하는 경우 `Saved/Logs/[name].Log`를 확인하세요. `UE`에서 출력된 `Log`는 일반적으로 중국어 인코딩 문제를 가질 수 있으므로, 제대로 보기 위해 시스템 인코딩을 `UTF-8`로 조정해야 할 수도 있습니다.

3. **뼈대 바인딩 단계**

    - 캐릭터 에셋 Skeleton Mesh를 클릭하고, 마우스 우클릭하여 새 애니메이션 블루프린트를 생성한 후, 두 번 클릭하여 애니메이션 블루프린트를 편집합니다. [불확실한 경우 비디오 시청을 권장합니다]
    - 우클릭하여 `Rebocap`을 검색하고, `Rebocap Body Pose`를 선택하여 노드를 생성한 후, 노드 오른쪽에 있는 작은 사람 모양을 출력 포즈의 `Result`에 연결합니다.
    - 블루프린트 편집 페이지 왼쪽 하단에서 더하기 기호를 클릭하여 새 변수를 생성합니다. 변수 유형은 `Rebocap`을 검색하여 `RebocapMapData` 클래스 참조를 선택해야 합니다. 그런 다음, 방금 생성한 노드의 `RetargetAsset` 부분으로 변수를 드래그하면 변수 노드가 자동으로 생성됩니다. 그런 다음 왼쪽 상단의 컴파일 버튼을 클릭합니다.
    - 새로 생성된 변수 노드를 클릭한 다음 오른쪽의 기본값 부분에서 더하기 기호를 클릭하여 새 `Map` 에셋을 생성하면 새 페이지로 자동으로 넘어갑니다. 새 페이지에서는 사용자가 직접 뼈대 매핑을 채워야 합니다. 주의: 모든 24개 노드를 채우는 것을 권장하며 `Avatar`의 뼈대 이름에 따라 기입할 수 있습니다.
         > 블루프린트 페이지 상단 표시줄에 있는 첫 번째 옅은 파란색 해골 사람을 클릭하면 뼈대 이름을 자동으로 확인할 수 있습니다. `Rebocap`의 24개 노드는 인체 표준 뼈대이며 `Rebocap`의 뼈대 이름은 뼈대의 시작점을 기준으로 명명됩니다. 예를 들어 `VRM`에서 `LeftUpperLeg`라는 뼈는 엉덩이에서 시작하므로 `Rebocap`에서는 `L_Hip`으로, `LeftFoot`의 시작점은 발목이므로 `L_Ankle`에 해당하며 `Rebocap`의 `L_Foot`은 발가락 부위에 해당합니다. UE 명명 체계에서는 일반적으로 `ball`이라고 합니다.
         >
      > `L Collar` 왼쪽 어깨 뼈대
      > 
      > `L Shoulder` 왼쪽 위팔 뼈대
      > 
      > `L Elbow` 왼쪽 아래팔 뼈대
      > 
      > `L Wrist` 왼쪽 손바닥 뼈대
      > 
      > `L Hand` 왼쪽 중지 뼈대 [구동되지 않음]
      > 
      > 뼈가 많은 경우 매핑에 적합한 뼈대를 선택할 수 있습니다. 예를 들어 6개의 척추 뼈가 있는 경우 번갈아 가며 3개를 선택할 수 있습니다.
      
   - 이전에 연 블루프린트 페이지로 돌아가서 (선택된 뼈대 매핑은 적용하려면 저장하고 컴파일해야 함) 변수 노드의 값을 새로 만든 `Map` 에셋으로 설정합니다.
   - 다시 컴파일하고 `Warnings`를 확인하세요. 일반적으로 3개의 `Warnings`만 있어야 합니다. 뼈대 `map`에 오류가 있는 경우 특정 뼈를 찾을 수 없음을 나타내는 `warning`이 뜹니다.
   - 애니메이션 블루프린트 편집 창을 닫고 상단 메뉴 `Window->Virtual Production->Live Link`를 클릭한 다음 `Source->Rebocap Source->conn`을 선택합니다 [`port`는 포트 번호이며, `Rebocap`에서 브로드캐스트 포트 번호가 변경된 경우 여기서도 수정해야 합니다]. `Rebocap` 클라이언트가 열려 있으면 `connect` 상태가 `ok`로 표시되고 그렇지 않으면 `bad` 상태가 됩니다. 또한, 사용자는 모션 캘리브레이션을 진행해야만 데이터 브로드캐스트가 시작됩니다.

   <div align="center">
   <img src="/img/ue_plugin/ue2.png" alt="pic_left" width="80%" />
   <img src="/img/ue_plugin/ue3.png" alt="pic_left" width="80%" />
   </div>

4. **코드 설명**

   주요 모션 제어 관련 코드는 `Source\rebocap\Private\rebocap_pose_node.cpp`에 있으며, 다른 주변 관련 코드는 `dll` 호출과 `livelink`를 포함합니다. `Init_Foot_Vertices_And_SkeletalData` 함수는 캐릭터의 기본 골격 위치 및 `vert` 정점들을 가져와서 바닥과 접촉할 두 발의 6개 점을 계산하는 데 사용됩니다 [각 발당 6개 지점]. 이는 자동으로 계산되므로 정확도가 떨어질 수 있습니다; 사용자가 직접 자신의 발바닥의 6개 지점을 찾아서 전달하면 더 큰 정확도를 얻을 수 있습니다.
   
   PS: 발 크기가 클 경우 캐릭터가 위아래로 튈 수 있습니다. 예를 들어 발이 2미터인데 키도 2미터인 극단적인 경우에 까치발로 착지할 때 발가락이 땅에 닿아야 한다면 캐릭터는 위아래로 심하게 움직일 것입니다.

5. **패키징 설명**

   - 개발자
      > 패키징을 해야 하는 개발자의 경우 최신 버전의 플러그인을 다운로드하세요 (이전 버전은 패키징 후 실행되지 않습니다). `runtime` 모드에 `Livelink` 연결 관리가 추가되었습니다. 구현을 위해 `Plugins/rebocap_unreal_engine_plugin/Source/rebocap_runtime/Private/RebocapLivelinkManagerDemoWidget.cpp` 파일의 `ConnectLiveLink` 및 `DisconnectLiveLink` 메서드를 참조할 수 있습니다. 플러그인의 내장 UI를 비활성화하려면 `Plugins/rebocap_unreal_engine_plugin/Source/rebocap_runtime/rebocap_runtime.Build.cs`를 수정하여 매크로 정의 `USE_REBOCAP_LIVELINK_MANAGER_DEMO`를 주석 처리하고 직접 컴파일하세요. 자체 프로젝트에 플러그인을 배치하는 개발자는 `livelink` 연결에 대한 UI 관리를 직접 추가하는 것이 좋습니다.
   - 블루프린트 사용자
      `Livelink`를 관리할 수 있는 블루프린트 노드가 추가되었습니다. 노드 이름: `Connect to Rebocap Livelink Source`, `Disconnect to Rebocap Livelink Source`
      <img src="/img/ue_plugin/ue4.png" alt="pic_left" width="80%" />

**참고**:
1. `Editor`에서 `livelink` 연결을 사용 중이라면 채널이 점유되어 `game` 모드에서 연결에 실패할 수 있습니다. `Editor`를 재시작하고 다시 시도하는 것이 권장됩니다.
2. `runtime` 모드(패키징 후 실행되는 `standalone 또는 game 모드`)의 경우, 아직 이 모드에서 메쉬 정점을 얻는 방법이 발견되지 않아 패키징 후의 자동 골격 등록에는 밑창이 포함되지 않으며 성능이 `Editor` 모드에 비해 다소 떨어질 수 있습니다. 이 문제는 향후 해결될 예정입니다.


### 비디오 작업 데모
소리가 없으며 임시로 제공되는 것입니다. 나중에 더 추가될 예정입니다.

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/ue_plugin/ue_user_guide.mp4" type="video/mp4" />
</video>
</div>

### Meta Human (또는 기본 Apose 캐릭터)를 TPose로 수정 (APose를 TPose로 변환)

> 참고: A-pose는 공식 표준과 일치해야 하며 그렇지 않은 경우 직접 각도를 수동으로 조정하는 것을 권장합니다. Apose를 임시 Tpose 각도 파일로 변환하여 저장합니다. 자세한 내용은 아래 압축 파일의 튜토리얼을 참조하십시오.

<a href="/img/files/metahuman_change_tpose.zip" target="_blank" download="ue_ht_tpose.zip">다운로드</a>


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>