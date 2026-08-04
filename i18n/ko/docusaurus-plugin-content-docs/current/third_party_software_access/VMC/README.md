---
sidebar_position: 1
title: "팁"
---

# 팁
튜토리얼을 읽지 않고 이 페이지를 읽는 것은 의미가 없습니다. [먼저 튜토리얼을 읽어주세요](../tutorial/README)!!!!

<a id="vmc_instroction"></a>

# VMC 사용
VMC 프로토콜은 사용하기가 매우 간단합니다. 캘리브레이션 후 VMC 프로토콜을 활성화할 수 있으며, [자세한 내용은 여기를 참조하세요](../../ui_help_doc/control/connect#cal_pc_panel), 그런 다음 다른 소프트웨어에서 수신을 구성합니다. VMC는 범용 모션 캡처 프로토콜입니다. [자세한 내용은 여기를 참조하세요](https://protocol.vmc.info/english.html).

스트리머이고 소프트웨어가 `rebocap`을 지원하는지 확실하지 않은 경우 소프트웨어가 VMC 프로토콜을 지원하는지 확인하세요. 소프트웨어에서 이를 지원하지 않는 경우 개발자에게 문의하여 제공된 [SDK](../../SDK/README)를 연동에 사용하거나, 제공된 [플러그인](../../plugins/plugins)을 연동에 직접 사용할 수 있습니다.

:::info VMC 프로토콜 사용자를 위한 참고 사항


VMC 프로토콜 사용자는 골격을 업로드하는 것이 좋습니다. VRM 모델인 경우 골격을 rebocap에 직접 업로드할 수 있습니다. [여기에 골격 업로드 소개가 있습니다](../../ui_help_doc/control/skeleton_setting#skeleton_import). 기타 형식 사용자의 경우 [Blender 플러그인을 사용하여 골격을 내보낼 수 있습니다](../../plugins/blender#skeleton_export). 내보낸 파일은 JSON 파일이며 수동으로 수정할 수 있습니다.

둘 중 하나를 수행하는 방법이 확실하지 않은 경우 가상 캐릭터 골격의 키를 알고 VMC 배율 설정을 조정해야 합니다. rebocap의 키 * vmc_scale = 현재 가상 캐릭터 키가 되도록 설정하지만, 일반적으로 이 효과는 이상적이지 않습니다.

:::


### 다른 소프트웨어와 연동하는 방법
일반적으로 VMC 구성을 직접 열 수 있습니다. 자세한 내용은 다른 소프트웨어의 설명서를 참조하세요.

1. `warudo`를 사용하는 일부 스트리머가 warudo 자체에 익숙하지 않다는 점을 감안하여, `warudo`를 사용한 예는 다음과 같습니다. [여기를 참조하세요](warudo)


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>