---
sidebar_position: 4
title: "Unity 데모 패키지 다운로드"
---

# Unity 데모 패키지 다운로드

Unity 플러그인은 주로 개발자를 위한 것입니다. 개발자는 2차 개발을 위해 특정 코드를 확인할 수 있습니다. 아래는 다운로드 링크입니다.

<a href="/img/files/rebocap_unity_sdk_v4.unitypackage" target="_blank" download="rebocap_unity_sdk_v4.unitypackage">rebocap unity sdk v4</a>


unity sdk v4 변경 사항
> 특정 경우의 애니메이션 결함 수정, FBX 임포트의 뼈대 지원

unity sdk v3 변경 사항
> il2cpp 백엔드 모드에서 패키징 및 실행 오류가 발생하던 버그 수정

:::info 참고: 먼저 `VRM` 패키지를 설치해야 합니다: [`UniVRM`](https://github.com/vrm-c/UniVRM/releases/tag/v0.117.0)

:::



# Unity 전환 VRM 모델 캐릭터 예제

rebocap_unity_sdk.unitypackage를 빈 프로젝트로 드래그하고, `RebocapSdk` 디렉터리의 DemoScene을 연 다음, 새로운 VRM을 씬으로 드래그합니다. VRM 오브젝트를 `Terrain` 오브젝트 아래로 드래그하고, `Drive Demo` 스크립트의 Animator 변수를 바인딩합니다.

씬을 실행한 후, `Connect` 버튼을 클릭합니다. 그러면 자동으로 `Rebocap` 클라이언트에 연결되고 뼈대가 자동으로 등록됩니다. 모션 출력 전에 모션 캘리브레이션이 필요하다는 점에 유의하세요.

:::info 참고


데모 프로젝트의 캐릭터 바인딩은 표준 `Humanoid` 뼈대를 따르는 VRM을 사용합니다. 원칙적으로 `Humanoid` 표준을 따르는 모든 뼈대는 직접 드래그하여 교체할 수 있습니다.

:::


### 비디오 작업 캐릭터 교체 예제

다음은 이전 클라이언트 버전의 화면 녹화입니다 (임시 확인용이며, 나중에 교체될 예정입니다). 새 버전도 기본적으로 동일합니다. 연결을 클릭한 후, 뼈대가 `Rebocap` 클라이언트에 성공적으로 임포트되었는지 확인하세요.

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/unity_replace_vrm.mp4" type="video/mp4" />
</video>
</div>


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>