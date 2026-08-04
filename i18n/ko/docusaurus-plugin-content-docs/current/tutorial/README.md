---
sidebar_position: 5
title: "시작하기 & 퀵 가이드"
---

# 시작하기 & 퀵 가이드

Rebocap에 오신 것을 환영합니다! 처음으로 Rebocap 트래커를 받고 사용하시는 경우, 해당하는 트래커 세트의 단계별 언박싱 및 설정 가이드를 선택하여 확인하는 것을 권장합니다.

---

## 🚀 1. 세트별 빠른 시작

가지고 계신 장비 세트에 해당하는 튜토리얼을 선택하세요. 가이드는 패키지 점검, 스트랩 착용, 소프트웨어 및 펌웨어 업데이트, 보정, SteamVR 연결 등을 포함한 전체 프로세스를 다룹니다:

<div style="display: flex; gap: 16px; flex-wrap: wrap; margin: 20px 0;">
  <a href="/docs/rebocap-tutorials/6-set-unboxing" style="flex: 1; min-width: 260px; padding: 16px 20px; border: 1px solid var(--ifm-color-primary-light); border-radius: 8px; text-decoration: none; background-color: var(--ifm-card-background-color, #f8f9fa);">
    <h3 style="margin: 0 0 8px 0; color: var(--ifm-color-primary);">📦 6-트래커 세트: 언박싱부터 사용까지</h3>
    <p style="margin: 0; font-size: 0.9em; color: var(--ifm-font-color-base);">패키지 검사, 스트랩 설정, 소프트웨어/펌웨어, 자이로스코프/자기장 보정, SteamVR 설정이 포함되어 있습니다.</p>
  </a>

  <a href="/docs/rebocap-tutorials/15-set-unboxing" style="flex: 1; min-width: 260px; padding: 16px 20px; border: 1px solid var(--ifm-color-primary-light); border-radius: 8px; text-decoration: none; background-color: var(--ifm-card-background-color, #f8f9fa);">
    <h3 style="margin: 0 0 8px 0; color: var(--ifm-color-primary);">📦 15-트래커 세트: 언박싱부터 사용까지</h3>
    <p style="margin: 0; font-size: 0.9em; color: var(--ifm-font-color-base);">퀵 릴리즈 및 넓은 스트랩 설치, 전신 위치 배치, 소프트웨어/펌웨어, 보정 가이드 및 고급 설정이 포함되어 있습니다.</p>
  </a>
</div>

---

## ⚠️ 2. 중요 안내 (자기장 보정)

- 공간 추적의 정확성을 보장하기 위해 자기장 보정이 매우 중요합니다. **첫 충전 후** 또는 **새로운 실내 환경으로 이동할 때마다** 자기장 보정을 수행하는 것이 좋습니다.
- 자세한 보정 지침 및 주의 사항은 다음을 참조하세요: 👉 **[자기장 QA 및 보정 가이드](../QA/magnet)**

:::danger 자기장 보정 시 주의 사항
- 자기장 보정은 반드시 숙지해야 하며 주의 사항이 매우 중요합니다. 주의 사항을 따르지 않으면 보정 정확도가 떨어질 수 있습니다.
- 자기장 보정은 언제든지 반복적으로 수행할 수 있습니다. 드리프트 현상이 발생하면 먼저 자기장을 다시 보정해 보세요.
:::

---

## 🎮 3. 외부 소프트웨어 및 게임 연결

초기 보정을 완료한 후, 모션 데이터를 외부 소프트웨어와 게임에 스트리밍할 수 있습니다:

- **SteamVR / VRChat**: 새로 생성된 👉 **[SteamVR 가이드](../rebocap-tutorials/steamvr_guide)**를 참조하세요(SteamVR 경계 설정, 노드 가시성 및 연결 문제 해결에 대한 내용 포함).
- **3D 애니메이션 및 다이렉트 플러그인**: Blender, Unity, UE 또는 Vtuber 소프트웨어에 연결하는 경우 👉 **[다이렉트 플러그인 및 앱 연동](../plugins/plugins)**을 참조하세요.

---

## 📺 4. 비디오 튜토리얼 및 커뮤니티 지원

비디오 튜토리얼은 추가 옵션일 뿐이며, 텍스트 문서가 더 자세한 문제 해결 및 설명을 제공합니다.

:::info 첫 사용 비디오 튜토리얼
아래는 커뮤니티 회원과 협력하여 만든 첫 사용 튜토리얼 비디오입니다. 소리를 켜고 작동하기 전에 끝까지 시청하는 것을 권장합니다:

[첫 사용 튜토리얼 비디오 (Bilibili)](https://www.bilibili.com/video/BV1vb66Y2EeD)
<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=113758953276032&bvid=BV1vb66Y2EeD&cid=27665304028&p=1&autoplay=0&muted=0&danmaku=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 100%; height: 400px; margin-top: 10px;"></iframe>
:::

:::danger 문제 해결 및 성능 팁
최적의 모션 캡처 성능을 위해 또는 문제가 발생하는 경우 자세한 텍스트 튜토리얼을 반드시 읽으십시오:
- 발 트래커 방향과 스트랩 조임 정도는 바닥 접촉 및 미끄럼 방지 성능에 큰 영향을 미칩니다.
- 강한 자기 간섭이 있는 환경에서는 내자기장(anti-magnetic) 모드를 활성화해야 하는지 확인하세요.
- 발 트래커를 착용하지 않은 경우 AI Engine을 활성화하여 자동 포즈 예측을 사용할지 확인하세요.
- 더 궁금한 점이 있으면 주저하지 말고 [커뮤니티 및 지원](../README#community)에서 질문해 주세요.
:::

---

### 📂 개별 주제 빠른 검토
특정 기본 모듈을 별도로 참조해야 하는 경우:
- [하드웨어 및 액세서리 점검](hardware_check)
- [스트랩 사용 및 착용 가이드](instroction_for_straps)
- [소프트웨어 다운로드 및 설치](software_install)
- [기본 연결 가이드](connect_and_use)