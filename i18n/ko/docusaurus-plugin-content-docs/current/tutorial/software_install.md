---
sidebar_position: 3
title: "소프트웨어 다운로드"
---
<!-- ==================== Flag A: Install software Start ==================== -->
<div style="border-left: 6px solid #88b49c; padding-left: 20px; margin-top: 10px; margin-bottom: 20px;">

## 다운로드 {#software-download-toc}
<h2 class="tutorial-heading-flag" style="background: #88b49c; margin-top: 0; display: inline-block;">다운로드</h2>

현재 사용 가능한 버전은 `Release`입니다. 아래의 다운로드 링크를 클릭하세요.<br />
`Beta` 버전은 공개 테스트 빌드로, 자기 간섭이 심한 영역에서는 더 잘 작동하지만 아직 광범위하게 검증되지는 않았습니다.



**안정화 버전 (Stable Release)** -  [Rebocap V01 다운로드](https://doc.rebocap.com/img/files/rebocap_release_v01.exe)


**베타 버전 (Beta Version)** - [Rebocap V02 Beta02 다운로드](https://doc.rebocap.com/img/files/rebocap_release_v02_beta02.exe)







- 버전 선택:\
  V01 - 자기장이 안정적인 환경에 적합하며, 춤을 출 때 권장합니다.<br />
  V02 Beta02 - 기본 설정은 6-트래커 세트에 최적화되어 있으며, 강한 간섭 소스를 적극적으로 식별하는 새로운 알고리즘을 사용하여 트램펄린 위에서도 방향을 유지합니다.


- 시스템 드라이브가 아닌 다른 드라이브에 설치하는 것을 권장합니다 (C 드라이브에 설치하지 마세요).



<!-- ==================== Details Start ==================== -->

<details>
<summary> 지원되는 펌웨어 버전 및 작동 지침을 확인하세요.</summary>
   &emsp;&emsp; 일부 펌웨어 버전은 알고리즘의 주요 변경 사항이 있어 이전 소프트웨어 버전과 호환되지 않습니다. <br /> 


   &emsp;&emsp; 이전 소프트웨어 버전으로 다시 전환할 때는 펌웨어도 그에 맞게 다운그레이드해야 합니다.<br /> 

   &emsp;&emsp;&emsp; release_v01 - ◼️트래커 : V6 / V7  ,  📡리시버 : V6 / V7 <br /> 

   &emsp;&emsp;&emsp; release_v02 beta02 - ◼️트래커 : V15  ,  📡리시버 : V6 / V7 <br /> 

   &emsp;&emsp;&emsp; (미공개) release_v02 beta02.1 - ◼️트래커 : V16  ,  📡리시버 : V6 / V7 / V8 <br /> 



<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

<video autoPlay loop muted playsInline width="100%" src="/img/softawre_install/show_version_log.mp4"></video>

</div>
<div style="flex: 1.5; min-width: 250px;">

**펌웨어 작동 지침**<br />
- 로그 창을 열어 각 트래커의 실제 펌웨어 버전을 확인하세요 <br /> 
(로그 창은 소프트웨어의 "연결 & 전원 끄기(Connect & Power Off)" 아래에 있습니다).

</div>
</div>

<br/>

- 트래커는 무선(📶)으로 업데이트됩니다 — USB 케이블이 필요하지 않습니다.<br /> 
🚫 트래커와 리시버를 동시에 업데이트하지 마세요.<br /> 


- 업데이트가 실패하면 트래커를 다시 시작하고 업데이트를 다시 클릭해야 합니다.<br /> 
&emsp;&emsp;🟩녹색 – 빠르게 깜박임: 트래커가 정상적으로 작동 중<br /> 
&emsp;&emsp;🟩녹색 – 느리게 깜박임: 트래커가 리시버 신호를 기다리는 중<br /> 
&emsp;&emsp;🟦파란색: 트래커가 펌웨어 데이터를 수신 중<br /> 
&emsp;&emsp;🟨노란색: 업데이트 실패 (🔘 버튼을 수동으로 눌러 다시 시작한 후 업데이트를 다시 시도하세요)<br /> 
&emsp;&emsp;⬜흰색: 업데이트 성공 (일반적으로 10초 후 자동 재시작; 그렇지 않으면 수동으로 다시 시작)<br />

- 📡리시버 업데이트가 완료되면 USB를 뽑았다가 다시 꽂고 소프트웨어를 🔄재시작하세요.

</details>
<!-- ==================== Details End ==================== -->






<!-- ==================== Details Start ==================== -->
<details>
<summary>VR 모드에서 V01 버전을 사용하는 경우 다음 설정을 변경해야 합니다.</summary>

<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![v01_off_1](../../../../../static/img/unboxing/expand/v01_off_1-en.png)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong>1 - 상완 트래커가 없는 경우, 수동으로 추가 트래킹 포인트를 꺼주세요.</strong><br />
[Configure 'SteamVR' output nodes]를 열고 → [Left/Right Upper Arm] 끄기
<details className="plain-details"><summary>세부 정보</summary>
소프트웨어는 원래 [Auto-hide joints(관절 자동 숨김)] 기능을 사용하여 사용되지 않는 트래킹 포인트를 자동으로 숨기려고 했지만,<br />
이 기능이 자동으로 확인할 수 없는 것으로 확인되었습니다. 이 문제는 V02 Beta02 소프트웨어에서 수정되었습니다.
</details>





</div>
</div>

<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![v01_off_2](../../../../../static/img/unboxing/expand/v01_off_2-en.png)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong>2 - 전역(global)에서 오작동을 유발할 수 있는 기능을 끕니다.</strong><br />
→ [Motion Parameters] → [Vertical IK & Horizontal IK] 끄기
<details className="plain-details"><summary>세부 정보</summary>
이 기능은 원래 [Anti-slip(미끄럼 방지)] 모듈의 하위 기능이었지만,<br />
예기치 않게 전역에서 활성 상태로 유지되는 문제가 있었습니다. 이 문제는 V02 Beta02 소프트웨어에서 수정되었습니다.

</details>
</div>
</div>

</details>
<!-- ==================== Details End ==================== -->





</div>
<!-- ==================== Flag A: Install software End ==================== -->







참고:
> 소프트웨어는 현재 **Windows 10** 이상만 지원합니다.<br>
> 이 소프트웨어는 인터넷에 연결된 상태에서 사용해야 합니다. 오프라인으로 사용하고 싶다면 모바일 핫스팟으로 연결한 뒤 소프트웨어를 시작하고 30초 기다렸다가 네트워크 연결을 해제하세요.<br>
([로그 창(Log window)]에 네트워크 인증이 성공했다고 표시되면 네트워크 연결을 해제할 수 있습니다)

## 소프트웨어 설치
1. rebocap_release_v01.exe를 두 번 클릭합니다. (현재 버전은 rebocap_release_v01.exe입니다)
2. 아래 그림의 단계에 따라 설치합니다.
3. Rebocap 소프트웨어를 엽니다.
   * 시작 메뉴에서 열기
   * 바탕 화면 바로가기를 통해 열기

![설치 단계](../../../../../static/img/setup_steps-en.gif)

## 소프트웨어 업데이트 노트

### 변경 로그

#### 2026-02-04 업데이트: Rebocap Release V02 Beta02
1. 펌웨어를 v15로 업데이트, 내자기장 및 6축 알고리즘 최적화, 내자기장 안정성 개선, 6축 안정성 향상
   > 자기장 환경이 열악한 곳에서 지속적으로 춤을 추는 등 동적인 조건에서도 6축 모드에 가까운 성능을 발휘합니다. 새로운 펌웨어를 사용하면 자기장이 양호하기만 하다면 역동적인 춤도 지속적으로 보정될 수 있습니다(이전 펌웨어는 보정을 위해 간헐적인 정적 순간에 의존했습니다).
2. 자동 종료 지연 기능 추가, 리시버 펌웨어 업그레이드 필요.
3. 헤딩(heading) 보정 재작업 및 PC 헤딩 보정 기능 추가:
   > 참고: PC 헤딩 보정을 수행할 때는 전신 A-pose를 사용합니다. 팔뚝을 올리고 손바닥을 앞으로 하는 것이 더 효과적입니다. 또는 S-Pose를 직접 수행하거나 앉은 상태에서 팔을 앞으로 곧게 뻗어도 됩니다.
4. 소프트웨어가 예기치 않게 충돌(crash)하고 5분 내에 다시 열리는 경우 이전 보정 결과가 자동으로 적용되므로 다시 보정할 필요가 없습니다.
5. 헤딩 보정 중에는 자기장이 재설정됩니다(상대적 자기장 1.0으로 직접 재설정). 즉, 침대에 누워 있는 경우 보정 순간의 자기장을 초기 기준으로 사용하여 보정합니다.
6. 자기장 보정에 대한 제한 제거; 단순 자기장 보정(8자 그리기)이 이제 기본적으로 클릭 가능해집니다.
   > 기본적으로 보정은 한 번에 8개의 센서로 제한됩니다. data 디렉터리에 `data/__no_limit_max_nodes__` 파일을 추가하면 이 제한이 제거됩니다.
7. 누운 후 발을 움직이면 캐릭터의 골격이 갈라질 수 있는 버그 수정.

기타 업데이트:
1. 소프트웨어 제목 표시줄에 이제 버전 번호가 표시됩니다.
2. 전원이 꺼진 센서를 자동 숨김하는 기능이 적용되지 않던 버그 수정.
3. 발 미끄럼 방지(anti-slip) 모드가 비활성화되면 발이 지면 아래로 내려갈 수 있으며 IK가 제거되었습니다.
4. 리시버를 뽑은 후 아바타 자세가 멈추는 버그 해결.
5. 골격 설정에 VR 측면 오프셋 추가(HMD 마운트 지점이 이마 중앙에 있지 않고 측면으로 약간 치우친 모델의 경우 필요에 따라 조정 가능).


#### 2025-12-03 업데이트: Rebocap Release V01
**VR 부문:**
1. 제자리 걷기 기능 추가: 제자리에서 발을 구를 때 조이스틱이 안정적이고 천천히 앞으로 이동하도록 시뮬레이션합니다. 자세한 내용은 도움말 문서를 참조하세요(고급 기능).
2. VR 가상 지면 높이 조정 추가, 범위 -100 cm ~ 100 cm (고급 기능).
3. 컨트롤러 교체 기능 추가: 이 기능을 활성화하면 손 트래커가 컨트롤러의 위치와 방향을 대체합니다. 자세한 내용은 도움말 문서를 참조하세요(고급 기능).
4. SteamVR 플러그인을 업그레이드하고 트래커가 컨트롤러로 인식되는 문제 수정 시도.
5. VR 모드에서 골격을 임포트할 때 아바타의 발과 몸 전체가 가라앉는 잘못된 발 로케이터 문제 수정(주로 IK 계산에 영향).
6. 헤딩 리셋(heading reset) 후 자동 중앙 정렬(Auto Re-center) 기능이 능동적으로 트리거됩니다.
7. 전원이 꺼진 노드를 자동 숨기는 스위치 추가; 이 기능을 활성화하면 전원이 꺼진 노드가 자동으로 숨겨집니다.
8. VR 가슴/허리가 HMD를 따라가는 기능 복원.

**PC 부문:**
1. 모션 보정 알고리즘 업데이트: T-pose 팔 자세 요구 사항 완화, 일부 사용자의 비대칭 팔 문제 해결.
2. 팔 IK 추가. 깍지 낀 손 IK(Clasped-Hands IK)는 손을 모을 때 팔이 교차되는 것을 최소화하고, A-Pose IK는 아바타의 어깨가 너무 좁고 팔이 수직일 때 심각하게 클리핑되는 현상을 해결합니다.
3. MMD 모션 내보내기 및 PMX 모델 임포트 추가. 단, VMD 모션에는 IK가 포함되어 있지 않으므로 IK 제약 조건을 수동으로 제거해야 합니다.
4. 애니메이션 프레임 속도 점프가 999로 제한되던 버그 수정.

**일반:**
1. UI 업데이트: 기능별로 재구성하고 일부 용어 번역을 개선하며 기능 설명을 보다 사용자 친화적으로 수정.
2. 고급 설정(Advanced Settings) 토글 및 설정 내보내기/가져오기, 기본값 복원(Restore Defaults) 기능 추가.
3. 정지 상태 감지 실패로 인해 보정을 진행할 수 없던 문제 제거.
4. 자동 연결 기능 추가; 더 이상 수동으로 연결 버튼을 클릭할 필요가 없습니다.
5. 높은 CPU 로드 및 패킷 손실 문제(특히 AMD CPU의 경우)를 해결하기 위한 리시버 펌웨어 업그레이드 추가.
6. 전반적인 안정성 향상을 위해 트래커를 v07 펌웨어로 업그레이드.
7. 6축 모드를 위한 특정 노드를 선택할 수 있는 기능 추가 (고급 기능).
8. 보정 후 일부 자이로스코프가 0으로 돌아가지 않던 버그 수정.

**기타:**
1. 배경에서 오래 대기하는 것을 방지하기 위해 시작 스플래시 화면(splash screen) 추가.
2. 3D 창 안정성 향상.
3. 인증 서버를 3개(중국, 홍콩, 미국)로 늘림; 어느 하나의 서버라도 통과하면 인증 성공.
4. 보정 중에 데이터가 전송되지 않는 것처럼 보이는 가끔 발생하는 버그 수정(실제로는 성공적으로 전송되었음).
5. 기본 골격을 커뮤니티 권장 기본 골격으로 변경하고 기타 기본 매개변수 수정.
6. 6축 스위치를 켜거나 끌 때 재보정 프롬프트 추가.
7. 6축 측면 기울기 보상 문제 수정.


### TODO (순서 무관, 여기서는 주요 업데이트 사항만 나열)

- IK 성능 최적화  
- 소프트웨어 안정성 개선  
- VR 3포인트 모드 지원  
- PC 전신 6포인트 모드 지원  
- 다른 언어로 된 문서 추가 (문서가 안정화되면 추가될 예정)  


### 과거 버전
> **참고: preview05 이전 버전은 2025-11-29 이후에 출시된 새로운 하드웨어를 지원하지 않습니다. 새로운 하드웨어의 경우 최신 Release 버전 또는 Beta 버전을 다운로드하십시오.**
