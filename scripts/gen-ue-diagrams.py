# -*- coding: utf-8 -*-
"""Generate localized versions of the two UE node-reference diagrams.

Output: static/img/ue_plugin/nodes/i18n/<lang>/{pipeline,bone_map}.png

Design mirrors the original hand-made PNGs (same canvas, palette, layout), but
text is drawn from LANG tables so every locale gets a native-language chart.

Usage:
    python scripts/gen-ue-diagrams.py            # all languages
    python scripts/gen-ue-diagrams.py en ja      # selected languages
"""
from __future__ import annotations

import math
import os
import sys
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_BASE = os.path.join(ROOT, "static", "img", "ue_plugin", "nodes", "i18n")

# ---------- palette (sampled from the originals) ----------
BG = (247, 249, 248)
INK = (26, 32, 30)
MUTED = (96, 108, 102)
BORDER = (203, 212, 207)
GREEN = (63, 127, 92)
CHIP = (231, 240, 234)
DASH = (150, 162, 156)
STICK = (168, 180, 173)

# bone-map accent colours
C_ROOT = (58, 125, 99)
C_LARM = (47, 111, 174)
C_RARM = (176, 106, 31)
C_LLEG = (122, 79, 163)
C_RLEG = (160, 48, 80)

FONTS = {
    "zh": (r"C:\Windows\Fonts\msyh.ttc", r"C:\Windows\Fonts\msyhbd.ttc"),
    "ja": (r"C:\Windows\Fonts\YuGothR.ttc", r"C:\Windows\Fonts\YuGothB.ttc"),
    "ko": (r"C:\Windows\Fonts\malgun.ttf", r"C:\Windows\Fonts\malgunbd.ttf"),
    "latin": (r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\segoeuib.ttf"),
}

LANG_FONT = {
    "en": "latin", "es": "latin", "fr": "latin", "ru": "latin",
    "zh-Hans": "zh", "zh-Hant": "zh",
    "ja": "ja", "ko": "ko",
}


def font(kind: str, size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    regular, heavy = FONTS[kind]
    path = heavy if bold else regular
    return ImageFont.truetype(path, size)


# ---------------------------------------------------------------- strings
# Only the labels that actually appear inside the pictures are translated.
# Node names, pin names and bone identifiers stay English on purpose.
PIPELINE = {
    "en": dict(
        title="Rebocap \u2192 UE data flow",
        subtitle="The control panel or Blueprint nodes open the connection; the animation node reads LiveLink frames for 24 bones and drives the character.",
        b1=("Rebocap App", "Capture side \u00b7 WebSocket service"),
        b2=("Rebocap Source", "Built-in LiveLink source"),
        b3=("A-Pose to T-Pose", "Optional \u00b7 convert A-Pose first"),
        b4=("Rebocap Body Pose", "Drives 24 bones"),
        b5=("Output Pose", "Anim Blueprint output"),
        panel=("Control Panel / Blueprint", "Connect \u00b7 Disconnect \u00b7 Diagnostics"),
        map=("Rebocap Map Data", "Mapping asset \u00b7 24 bones \u2192 skeleton"),
        a_ws="WS :7690", a_ll="LiveLink", a_chain="Chain", a_drive="Drive",
        a_conn="Connect / disconnect", a_retarget="Retarget Asset",
        note="Both nodes share one mapping asset",
        footer="On failure the port falls back to 7690 after ~4.5 s; a manual disconnect is not auto-reconnected by the animation nodes (V3).",
    ),
    "zh-Hans": dict(
        title="Rebocap \u2192 UE 数据流",
        subtitle="控制面板或蓝图节点负责建立连接；动画节点按 24 骨读取 LiveLink 帧并驱动角色。",
        b1=("Rebocap 上位机", "动捕端 \u00b7 WebSocket 服务"),
        b2=("Rebocap Source", "插件内置 LiveLink Source"),
        b3=("A-Pose to T-Pose", "可选 \u00b7 A-Pose 先转 T-Pose"),
        b4=("Rebocap Body Pose", "24 骨驱动"),
        b5=("Output Pose", "动画蓝图输出"),
        panel=("控制面板 / 蓝图", "连接 \u00b7 断开 \u00b7 诊断"),
        map=("Rebocap Map Data", "映射资产 \u00b7 24 骨对应角色骨骼"),
        a_ws="WS :7690", a_ll="LiveLink 帧", a_chain="串联", a_drive="驱动",
        a_conn="建立 / 断开连接", a_retarget="Retarget Asset",
        note="两个节点共用同一份映射资产",
        footer="连接失败会在约 4.5 秒内自动回退 7690；用户主动断开后不会被动画节点自动重连（V3 行为）。",
    ),
    "zh-Hant": dict(
        title="Rebocap \u2192 UE 資料流",
        subtitle="控制面板或藍圖節點負責建立連線；動畫節點依 24 根骨骼讀取 LiveLink 影格並驅動角色。",
        b1=("Rebocap 上位機", "動捕端 \u00b7 WebSocket 服務"),
        b2=("Rebocap Source", "外掛內建 LiveLink Source"),
        b3=("A-Pose to T-Pose", "選用 \u00b7 A-Pose 先轉 T-Pose"),
        b4=("Rebocap Body Pose", "驅動 24 根骨骼"),
        b5=("Output Pose", "動畫藍圖輸出"),
        panel=("控制面板 / 藍圖", "連線 \u00b7 斷線 \u00b7 診斷"),
        map=("Rebocap Map Data", "映射資產 \u00b7 24 骨對應角色骨骼"),
        a_ws="WS :7690", a_ll="LiveLink 影格", a_chain="串接", a_drive="驅動",
        a_conn="建立 / 斷開連線", a_retarget="Retarget Asset",
        note="兩個節點共用同一份映射資產",
        footer="連線失敗時約 4.5 秒內會自動回退 7690；使用者主動斷線後不會被動畫節點自動重連（V3 行為）。",
    ),
    "ja": dict(
        title="Rebocap \u2192 UE データフロー",
        subtitle="接続はコントロールパネルまたはブループリントノードが担当し、アニメーションノードが 24 ボーンの LiveLink フレームを読んでキャラクターを駆動します。",
        b1=("Rebocap アプリ", "モーション側 \u00b7 WebSocket サービス"),
        b2=("Rebocap Source", "プラグイン内蔵 LiveLink ソース"),
        b3=("A-Pose to T-Pose", "任意 \u00b7 A-Pose を先に変換"),
        b4=("Rebocap Body Pose", "24 ボーンを駆動"),
        b5=("Output Pose", "アニメーションブループリント出力"),
        panel=("コントロールパネル / ブループリント", "接続 \u00b7 切断 \u00b7 診断"),
        map=("Rebocap Map Data", "マッピングアセット \u00b7 24 ボーン対応"),
        a_ws="WS :7690", a_ll="LiveLink", a_chain="直列", a_drive="駆動",
        a_conn="接続 / 切断", a_retarget="Retarget Asset",
        note="2 つのノードで 1 つのマッピングアセットを共有",
        footer="接続に失敗すると約 4.5 秒で 7690 に戻ります。手動で切断した場合はアニメーションノードが自動再接続しません（V3 の仕様）。",
    ),
    "es": dict(
        title="Flujo de datos Rebocap \u2192 UE",
        subtitle="El panel de control o los nodos de Blueprint abren la conexi\u00f3n; el nodo de animaci\u00f3n lee fotogramas LiveLink de 24 huesos y mueve el personaje.",
        b1=("App de Rebocap", "Lado de captura \u00b7 servicio WebSocket"),
        b2=("Rebocap Source", "Origen LiveLink integrado"),
        b3=("A-Pose to T-Pose", "Opcional \u00b7 convertir A-Pose antes"),
        b4=("Rebocap Body Pose", "Mueve 24 huesos"),
        b5=("Output Pose", "Salida del Blueprint de animaci\u00f3n"),
        panel=("Panel de control / Blueprint", "Conectar \u00b7 Desconectar \u00b7 Diagn\u00f3stico"),
        map=("Rebocap Map Data", "Activo de mapeo \u00b7 24 huesos \u2192 esqueleto"),
        a_ws="WS :7690", a_ll="LiveLink", a_chain="En cadena", a_drive="Mueve",
        a_conn="Conectar / desconectar", a_retarget="Retarget Asset",
        note="Ambos nodos comparten el mismo activo de mapeo",
        footer="Si falla la conexi\u00f3n, el puerto vuelve a 7690 en unos 4,5 s; una desconexi\u00f3n manual no se reconecta autom\u00e1ticamente (V3).",
    ),
    "fr": dict(
        title="Flux de donn\u00e9es Rebocap \u2192 UE",
        subtitle="Le panneau de contr\u00f4le ou les n\u0153uds Blueprint \u00e9tablissent la connexion ; le n\u0153ud d\u2019animation lit les images LiveLink des 24 os et pilote le personnage.",
        b1=("Application Rebocap", "C\u00f4t\u00e9 capture \u00b7 service WebSocket"),
        b2=("Rebocap Source", "Source LiveLink int\u00e9gr\u00e9e"),
        b3=("A-Pose to T-Pose", "Optionnel \u00b7 convertir d\u2019abord"),
        b4=("Rebocap Body Pose", "Pilote 24 os"),
        b5=("Output Pose", "Sortie du Blueprint d\u2019animation"),
        panel=("Panneau de contr\u00f4le / Blueprint", "Connexion \u00b7 D\u00e9connexion \u00b7 Diagnostic"),
        map=("Rebocap Map Data", "Asset de mapping \u00b7 24 os \u2192 squelette"),
        a_ws="WS :7690", a_ll="LiveLink", a_chain="En s\u00e9rie", a_drive="Pilote",
        a_conn="Connexion / d\u00e9connexion", a_retarget="Retarget Asset",
        note="Les deux n\u0153uds partagent le m\u00eame asset de mapping",
        footer="En cas d\u2019\u00e9chec, le port revient \u00e0 7690 en ~4,5 s ; une d\u00e9connexion manuelle n\u2019est pas reconnect\u00e9e automatiquement (V3).",
    ),
    "ko": dict(
        title="Rebocap \u2192 UE \ub370\uc774\ud130 \ud750\ub984",
        subtitle="\uc5f0\uacb0\uc740 \ucee8\ud2b8\ub864 \ud328\ub110 \ub610\ub294 \ube14\ub8e8\ud504\ub9b0\ud2b8 \ub178\ub4dc\uac00 \ub2f4\ub2f9\ud558\uace0, \uc560\ub2c8\uba54\uc774\uc158 \ub178\ub4dc\uac00 24\uac1c \ubcf8\uc758 LiveLink \ud504\ub808\uc784\uc744 \uc77d\uc5b4 \uce90\ub9ad\ud130\ub97c \uad6c\ub3d9\ud569\ub2c8\ub2e4.",
        b1=("Rebocap \uc571", "\ubaa8\uc158 \uce90\ucc98 \ucd95 \u00b7 WebSocket \uc11c\ube44\uc2a4"),
        b2=("Rebocap Source", "\ud50c\ub7ec\uadf8\uc778 \ub0b4\uc7a5 LiveLink \uc18c\uc2a4"),
        b3=("A-Pose to T-Pose", "\uc120\ud0dd \u00b7 A-Pose\ub97c \uba3c\uc800 \ubcc0\ud658"),
        b4=("Rebocap Body Pose", "24\uac1c \ubcf8 \uad6c\ub3d9"),
        b5=("Output Pose", "\uc560\ub2c8\uba54\uc774\uc158 \ube14\ub8e8\ud504\ub9b0\ud2b8 \ucd9c\ub825"),
        panel=("\ucee8\ud2b8\ub864 \ud328\ub110 / \ube14\ub8e8\ud504\ub9b0\ud2b8", "\uc5f0\uacb0 \u00b7 \ud574\uc81c \u00b7 \uc9c4\ub2e8"),
        map=("Rebocap Map Data", "\ub9e4\ud551 \uc5d0\uc14b \u00b7 24\ubcf8 \u2192 \uc2a4\ucf08\ub808\ud1a4"),
        a_ws="WS :7690", a_ll="LiveLink \ud504\ub808\uc784", a_chain="\uc9c1\ub82c", a_drive="\uad6c\ub3d9",
        a_conn="\uc5f0\uacb0 / \ud574\uc81c", a_retarget="Retarget Asset",
        note="\ub450 \ub178\ub4dc\uac00 \ud558\ub098\uc758 \ub9e4\ud551 \uc5d0\uc14b\uc744 \uacf5\uc720\ud569\ub2c8\ub2e4",
        footer="\uc5f0\uacb0\uc5d0 \uc2e4\ud328\ud558\uba74 \uc57d 4.5\ucd08 \ud6c4 7690\uc73c\ub85c \ub3cc\uc544\uac11\ub2c8\ub2e4. \uc0ac\uc6a9\uc790\uac00 \uc9c1\uc811 \ud574\uc81c\ud55c \uacbd\uc6b0 \uc560\ub2c8\uba54\uc774\uc158 \ub178\ub4dc\uac00 \uc790\ub3d9\uc73c\ub85c \uc7ac\uc5f0\uacb0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4(V3).",
    ),
    "ru": dict(
        title="\u041f\u043e\u0442\u043e\u043a \u0434\u0430\u043d\u043d\u044b\u0445 Rebocap \u2192 UE",
        subtitle="\u0421\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u0435 \u043e\u0442\u043a\u0440\u044b\u0432\u0430\u0435\u0442 \u043f\u0430\u043d\u0435\u043b\u044c \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u0438\u043b\u0438 \u043d\u043e\u0434\u044b Blueprint; \u0430\u043d\u0438\u043c\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u0439 \u043d\u043e\u0434 \u0447\u0438\u0442\u0430\u0435\u0442 \u043a\u0430\u0434\u0440\u044b LiveLink \u0434\u043b\u044f 24 \u043a\u043e\u0441\u0442\u0435\u0439 \u0438 \u0434\u0432\u0438\u0433\u0430\u0435\u0442 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0435\u043c.",
        b1=("\u041f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 Rebocap", "\u0417\u0430\u0445\u0432\u0430\u0442 \u00b7 \u0441\u043b\u0443\u0436\u0431\u0430 WebSocket"),
        b2=("Rebocap Source", "\u0412\u0441\u0442\u0440\u043e\u0435\u043d\u043d\u044b\u0439 \u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a LiveLink"),
        b3=("A-Pose to T-Pose", "\u041e\u043f\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e \u00b7 \u0441\u043d\u0430\u0447\u0430\u043b\u0430 A-Pose"),
        b4=("Rebocap Body Pose", "\u0414\u0432\u0438\u0436\u0435\u043d\u0438\u0435 24 \u043a\u043e\u0441\u0442\u0435\u0439"),
        b5=("Output Pose", "\u0412\u044b\u0445\u043e\u0434 \u0430\u043d\u0438\u043c\u0430\u0446\u0438\u043e\u043d\u043d\u043e\u0433\u043e Blueprint"),
        panel=("\u041f\u0430\u043d\u0435\u043b\u044c / Blueprint", "\u0421\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u0435 \u00b7 \u0420\u0430\u0437\u0440\u044b\u0432 \u00b7 \u0414\u0438\u0430\u0433\u043d\u043e\u0441\u0442\u0438\u043a\u0430"),
        map=("Rebocap Map Data", "\u0410\u0441\u0441\u0435\u0442 \u043c\u0430\u043f\u043f\u0438\u043d\u0433\u0430 \u00b7 24 \u043a\u043e\u0441\u0442\u0438 \u2192 \u0441\u043a\u0435\u043b\u0435\u0442"),
        a_ws="WS :7690", a_ll="\u041a\u0430\u0434\u0440\u044b LiveLink", a_chain="\u0426\u0435\u043f\u043e\u0447\u043a\u0430", a_drive="\u0414\u0432\u0438\u0436\u0435\u043d\u0438\u0435",
        a_conn="\u0421\u043e\u0435\u0434\u0438\u043d\u0438\u0442\u044c / \u0440\u0430\u0437\u043e\u0440\u0432\u0430\u0442\u044c", a_retarget="Retarget Asset",
        note="\u041e\u0431\u0430 \u043d\u043e\u0434\u0430 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u044e\u0442 \u043e\u0434\u0438\u043d \u0430\u0441\u0441\u0435\u0442 \u043c\u0430\u043f\u043f\u0438\u043d\u0433\u0430",
        footer="\u041f\u0440\u0438 \u043d\u0435\u0443\u0434\u0430\u0447\u0435 \u043f\u043e\u0440\u0442 \u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044f \u043a 7690 \u043f\u0440\u0438\u043c\u0435\u0440\u043d\u043e \u0447\u0435\u0440\u0435\u0437 4,5 \u0441; \u0440\u0443\u0447\u043d\u043e\u0439 \u0440\u0430\u0437\u0440\u044b\u0432 \u043d\u0435 \u043f\u0435\u0440\u0435\u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0430\u0435\u0442\u0441\u044f \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438 (V3).",
    ),
}

BONE = {
    "en": dict(
        title="Rebocap 24-bone groups",
        subtitle="Five groups, 24 nodes; fill in the matching character bone for each one in Map Data.",
        count="6 bones:", count4="4 bones:", count5="5 bones:",
        note_title="Names follow the bone start point:",
        n1="L_Hip = start of the left thigh (hip)",
        n2="L_Ankle = left ankle, L_Foot = sole / toes",
        n3="L_Hand = middle-finger root (not driven on every rig)",
    ),
    "zh-Hans": dict(
        title="Rebocap 24 骨分组",
        subtitle="五个分组共 24 个节点；Map Data 中逐个填写对应的角色骨骼名。",
        count="6 个：", count4="4 个：", count5="5 个：",
        note_title="命名以骨骼起点为准：",
        n1="L_Hip = 左大腿起点（胯部）",
        n2="L_Ankle = 左脚踝，L_Foot = 脚掌/脚趾",
        n3="L_Hand = 中指根部（部分骨架不驱动）",
    ),
    "zh-Hant": dict(
        title="Rebocap 24 骨分組",
        subtitle="五個分組共 24 個節點；Map Data 中逐一填入對應的角色骨骼名稱。",
        count="6 個：", count4="4 個：", count5="5 個：",
        note_title="命名以骨骼起點為準：",
        n1="L_Hip = 左大腿起點（胯部）",
        n2="L_Ankle = 左腳踝，L_Foot = 腳掌/腳趾",
        n3="L_Hand = 中指根部（部分骨架不驅動）",
    ),
    "ja": dict(
        title="Rebocap 24 ボーンのグループ",
        subtitle="5 グループ・全 24 ノード。Map Data で対応するキャラクターのボーン名を入力します。",
        count="6 個：", count4="4 個：", count5="5 個：",
        note_title="名前はボーンの始点基準：",
        n1="L_Hip = 左もも付け根（股関節）",
        n2="L_Ankle = 左足首、L_Foot = 足裏／つま先",
        n3="L_Hand = 中指の付け根（骨格によっては駆動しません）",
    ),
    "es": dict(
        title="24 huesos de Rebocap en cinco grupos",
        subtitle="Cinco grupos y 24 nodos; en Map Data se rellena el hueso del personaje que corresponde a cada uno.",
        count="6 huesos:", count4="4 huesos:", count5="5 huesos:",
        note_title="Los nombres siguen el punto de inicio del hueso:",
        n1="L_Hip = inicio del muslo izquierdo (cadera)",
        n2="L_Ankle = tobillo izquierdo, L_Foot = planta / dedos",
        n3="L_Hand = raíz del dedo medio (no se mueve en todos los esqueletos)",
    ),
    "fr": dict(
        title="Les 24 os de Rebocap en cinq groupes",
        subtitle="Cinq groupes, 24 n\u0153uds ; dans Map Data, indiquez l\u2019os du personnage correspondant \u00e0 chacun.",
        count="6 os :", count4="4 os :", count5="5 os :",
        note_title="Les noms suivent le point de d\u00e9part de l\u2019os :",
        n1="L_Hip = d\u00e9part de la cuisse gauche (hanche)",
        n2="L_Ankle = cheville gauche, L_Foot = plante / orteils",
        n3="L_Hand = racine du majeur (non pilot\u00e9 sur certains squelettes)",
    ),
    "ko": dict(
        title="Rebocap 24\ubcf8 \uadf8\ub8f9",
        subtitle="5\uac1c \uadf8\ub8f9, \ucd1d 24\uac1c \ub178\ub4dc. Map Data\uc5d0\uc11c \ud574\ub2f9 \uce90\ub9ad\ud130 \ubcf8 \uc774\ub984\uc744 \ud558\ub098\uc529 \uc785\ub825\ud569\ub2c8\ub2e4.",
        count="6\uac1c:", count4="4\uac1c:", count5="5\uac1c:",
        note_title="\uc774\ub984\uc740 \ubcf8\uc758 \uc2dc\uc791\uc810 \uae30\uc900:",
        n1="L_Hip = \uc67c\ucabd \ub108\uc801\ub2e4\ub9ac \uc2dc\uc791(\uace0\uad00\uc808)",
        n2="L_Ankle = \uc67c\ucabd \ubc1c\ubaa9, L_Foot = \ubc1c\ubc14\ub2e5/\ubc1c\uac00\ub77d",
        n3="L_Hand = \uc911\uc9c0 \ub8e8\ud2b8(\uc77c\ubd80 \uc2a4\ucf08\ub808\ud1a4\uc740 \uad6c\ub3d9 \uc548 \ud568)",
    ),
    "ru": dict(
        title="24 \u043a\u043e\u0441\u0442\u0438 Rebocap: \u043f\u044f\u0442\u044c \u0433\u0440\u0443\u043f\u043f",
        subtitle="\u041f\u044f\u0442\u044c \u0433\u0440\u0443\u043f\u043f, 24 \u043d\u043e\u0434\u0430; \u0432 Map Data \u0434\u043b\u044f \u043a\u0430\u0436\u0434\u043e\u0433\u043e \u0443\u043a\u0430\u0436\u0438\u0442\u0435 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044e\u0449\u0443\u044e \u043a\u043e\u0441\u0442\u044c \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0430.",
        count="6 \u043a\u043e\u0441\u0442\u0435\u0439:", count4="4 \u043a\u043e\u0441\u0442\u0438:", count5="5 \u043a\u043e\u0441\u0442\u0435\u0439:",
        note_title="\u0418\u043c\u0435\u043d\u0430 \u043e\u0442\u0441\u0447\u0438\u0442\u044b\u0432\u0430\u044e\u0442\u0441\u044f \u043e\u0442 \u043d\u0430\u0447\u0430\u043b\u0430 \u043a\u043e\u0441\u0442\u0438:",
        n1="L_Hip = \u043d\u0430\u0447\u0430\u043b\u043e \u043b\u0435\u0432\u043e\u0433\u043e \u0431\u0435\u0434\u0440\u0430 (\u0442\u0430\u0437)",
        n2="L_Ankle = \u043b\u0435\u0432\u044b\u0439 \u0433\u043e\u043b\u0435\u043d\u043e\u0441\u0442\u043e\u043f, L_Foot = \u0441\u0442\u043e\u043f\u0430 / \u043f\u0430\u043b\u044c\u0446\u044b",
        n3="L_Hand = \u043e\u0441\u043d\u043e\u0432\u0430\u043d\u0438\u0435 \u0441\u0440\u0435\u0434\u043d\u0435\u0433\u043e \u043f\u0430\u043b\u044c\u0446\u0430 (\u0432 \u043d\u0435\u043a\u043e\u0442\u043e\u0440\u044b\u0445 \u0441\u043a\u0435\u043b\u0435\u0442\u0430\u0445 \u043d\u0435 \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u0442\u0441\u044f)",
    ),
}


# ---------------------------------------------------------------- helpers
def text(d: ImageDraw.ImageDraw, xy, s, f: ImageFont.FreeTypeFont, fill=INK, anchor="la"):
    d.text(xy, s, font=f, fill=fill, anchor=anchor)


def arrow(d: ImageDraw.ImageDraw, x1, y1, x2, y2, color=GREEN, width=3, head=9):
    d.line([(x1, y1), (x2, y2)], fill=color, width=width)
    import math
    ang = math.atan2(y2 - y1, x2 - x1)
    pts = [
        (x2, y2),
        (x2 - head * math.cos(ang - 0.42), y2 - head * math.sin(ang - 0.42)),
        (x2 - head * math.cos(ang + 0.42), y2 - head * math.sin(ang + 0.42)),
    ]
    d.polygon(pts, fill=color)


def dashed_line(d: ImageDraw.ImageDraw, p1, p2, color=DASH, width=3, dash=10, gap=8):
    import math
    x1, y1 = p1
    x2, y2 = p2
    length = math.hypot(x2 - x1, y2 - y1)
    if length == 0:
        return
    ux, uy = (x2 - x1) / length, (y2 - y1) / length
    pos = 0.0
    while pos < length:
        end = min(pos + dash, length)
        d.line([(x1 + ux * pos, y1 + uy * pos), (x1 + ux * end, y1 + uy * end)], fill=color, width=width)
        pos += dash + gap


def box(d: ImageDraw.ImageDraw, rect, radius=14, fill=(255, 255, 255), outline=BORDER, width=2):
    d.rounded_rectangle(rect, radius=radius, fill=fill, outline=outline, width=width)


def fit_text(d, s, f, max_w):
    if d.textlength(s, font=f) <= max_w:
        return s
    words = s.split(" ")
    out = ""
    for w in words:
        trial = (out + " " + w).strip()
        if d.textlength(trial, font=f) <= max_w:
            out = trial
        else:
            break
    return out if out else s


def wrap_lines(d, s, f, max_w, max_lines=2):
    words = s.split(" ")
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if d.textlength(trial, font=f) <= max_w or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
            if len(lines) == max_lines - 1:
                break
    if cur and len(lines) < max_lines:
        rest_started = False
        lines.append(cur)
    return lines[:max_lines]


# ---------------------------------------------------------------- pipeline
def draw_pipeline(lang: str) -> Image.Image:
    S = PIPELINE[lang]
    kind = LANG_FONT[lang]
    W, H = 1900, 600
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)

    text(d, (40, 24), S["title"], font(kind, 40, True))
    text(d, (40, 84), S["subtitle"], font(kind, 20), MUTED)

    top_y0, top_h = 164, 152
    margin, gap = 40, 92
    box_w = (W - margin * 2 - gap * 4) // 5
    xs = [margin + i * (box_w + gap) for i in range(5)]
    items = [S["b1"], S["b2"], S["b3"], S["b4"], S["b5"]]

    for x, (name, sub) in zip(xs, items):
        box(d, (x, top_y0, x + box_w, top_y0 + top_h))
        cx = x + box_w // 2
        name_lines = wrap_lines(d, name, font(kind, 25, True), box_w - 24, 2)
        y = top_y0 + (36 if len(name_lines) == 1 else 26)
        for ln in name_lines:
            text(d, (cx, y), ln, font(kind, 25, True), anchor="mm")
            y += 32
        sub_lines = wrap_lines(d, sub, font(kind, 17), box_w - 22, 2)
        y = top_y0 + (96 if len(name_lines) == 1 else 100)
        for ln in sub_lines:
            text(d, (cx, y), ln, font(kind, 17), MUTED, anchor="mm")
            y += 24

    mid = top_y0 + top_h // 2
    labels = [S["a_ws"], S["a_ll"], S["a_chain"], S["a_drive"]]
    for i in range(4):
        x1 = xs[i] + box_w
        x2 = xs[i + 1]
        arrow(d, x1 + 4, mid, x2 - 6, mid)
        text(d, ((x1 + x2) // 2, mid + 22), labels[i], font(kind, 15), GREEN, anchor="mm")

    # bottom row
    by0, bh = 400, 116
    box(d, (xs[0], by0, xs[0] + box_w, by0 + bh))
    cx = xs[0] + box_w // 2
    panel_lines = wrap_lines(d, S["panel"][0], font(kind, 22, True), box_w - 22, 2)
    y = by0 + 28
    for ln in panel_lines:
        text(d, (cx, y), ln, font(kind, 22, True), anchor="mm")
        y += 28
    psub_lines = wrap_lines(d, S["panel"][1], font(kind, 16), box_w - 22, 2)
    y += 10
    for ln in psub_lines:
        text(d, (cx, y), ln, font(kind, 16), MUTED, anchor="mm")
        y += 22

    box(d, (xs[1], by0, xs[1] + box_w, by0 + bh))
    cx2 = xs[1] + box_w // 2
    text(d, (cx2, by0 + 40), S["map"][0], font(kind, 22, True), anchor="mm")
    map_lines = wrap_lines(d, S["map"][1], font(kind, 16), box_w - 22, 2)
    y = by0 + 84
    for ln in map_lines:
        text(d, (cx2, y), ln, font(kind, 16), MUTED, anchor="mm")
        y += 22

    # dashed connectors
    x_panel = xs[0] + box_w // 2
    dashed_line(d, (x_panel, by0 - 6), (x_panel, top_y0 + top_h + 12))
    arrow(d, x_panel, top_y0 + top_h + 12, x_panel, top_y0 + top_h + 4, color=DASH, width=3, head=8)
    text(d, (x_panel + 16, (by0 + top_y0 + top_h) // 2), S["a_conn"], font(kind, 15), MUTED)

    x_map_end = xs[1] + box_w - 10
    x_target = xs[3] + 30
    y_target = top_y0 + top_h - 6
    y_src = by0 + 40
    ang = math.atan2(y_target - y_src, x_target - x_map_end)
    dashed_line(d, (x_map_end, y_src), (x_target - 12 * math.cos(ang), y_target - 12 * math.sin(ang)))
    head = 8
    d.polygon([
        (x_target, y_target),
        (x_target - head * math.cos(ang - 0.45), y_target - head * math.sin(ang - 0.45)),
        (x_target - head * math.cos(ang + 0.45), y_target - head * math.sin(ang + 0.45)),
    ], fill=DASH)
    text(d, (xs[1] + box_w + 20, by0 - 16), S["a_retarget"], font(kind, 15), MUTED)
    text(d, (xs[2], by0 + bh + 18), S["note"], font(kind, 15), MUTED)

    text(d, (40, 566), S["footer"], font(kind, 17), MUTED)
    return im


# ------------------------------------------------------------- bone map
BONES = [
    # (x, y, group)
    (352, 200, "root"),   # head
    (352, 283, "root"),   # spine3/neck
    (352, 344, "root"),
    (352, 404, "root"),
    (352, 448, "root"),   # pelvis
    (262, 383, "larm"),
    (205, 424, "larm"),
    (148, 466, "larm"),
    (100, 540, "larm"),
    (60, 596, "larm"),
    (428, 383, "rarm"),
    (486, 424, "rarm"),
    (543, 466, "rarm"),
    (590, 540, "rarm"),
    (630, 596, "rarm"),
    (312, 520, "lleg"),
    (300, 700, "lleg"),
    (288, 872, "lleg"),
    (224, 960, "lleg"),
    (392, 520, "rleg"),
    (404, 700, "rleg"),
    (416, 872, "rleg"),
    (480, 960, "rleg"),
]
BONE_STROKE = [
    ((352, 240), (352, 448)), ((352, 448), (312, 520)), ((352, 448), (392, 520)),
    ((352, 383), (262, 383)), ((352, 383), (428, 383)),
    ((262, 383), (205, 424)), ((205, 424), (148, 466)), ((148, 466), (100, 540)), ((100, 540), (60, 596)),
    ((428, 383), (486, 424)), ((486, 424), (543, 466)), ((543, 466), (590, 540)), ((590, 540), (630, 596)),
    ((312, 520), (300, 700)), ((300, 700), (288, 872)), ((288, 872), (224, 960)),
    ((392, 520), (404, 700)), ((404, 700), (416, 872)), ((416, 872), (480, 960)),
]
GROUP_COLOR = {"root": C_ROOT, "larm": C_LARM, "rarm": C_RARM, "lleg": C_LLEG, "rleg": C_RLEG}


def draw_bone_map(lang: str) -> Image.Image:
    S = BONE[lang]
    kind = LANG_FONT[lang]
    W, H = 1200, 1020
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)

    text(d, (30, 26), S["title"], font(kind, 34, True))
    text(d, (30, 80), S["subtitle"], font(kind, 18), MUTED)

    # head circle
    d.ellipse([(300, 132), (404, 236)], outline=STICK, width=10)
    for (x1, y1), (x2, y2) in BONE_STROKE:
        d.line([(x1, y1), (x2, y2)], fill=STICK, width=10, joint="curve")
    for x, y, g in BONES:
        r = 13
        d.ellipse([(x - r, y - r), (x + r, y + r)], fill=GROUP_COLOR[g])

    # legend
    lx, ly = 690, 150
    rows = [
        ("Root / Spine / Head", "pelvis \u00b7 spine1 \u00b7 spine2", "spine3 \u00b7 neck \u00b7 head", S["count"], C_ROOT),
        ("Left Arm", "l_collar \u00b7 l_shoulder \u00b7 l_elbow", "l_wrist \u00b7 l_hand", S["count5"], C_LARM),
        ("Right Arm", "r_collar \u00b7 r_shoulder \u00b7 r_elbow", "r_wrist \u00b7 r_hand", S["count5"], C_RARM),
        ("Left Leg", "l_hip \u00b7 l_knee \u00b7 l_ankle \u00b7 l_foot", None, S["count4"], C_LLEG),
        ("Right Leg", "r_hip \u00b7 r_knee \u00b7 r_ankle \u00b7 r_foot", None, S["count4"], C_RLEG),
    ]
    y = ly
    for name, line1, line2, count, color in rows:
        d.rounded_rectangle([(lx, y), (lx + 20, y + 20)], radius=5, fill=color)
        text(d, (lx + 34, y - 4), name, font(kind, 23, True))
        text(d, (lx + 34, y + 32), count + " " + line1, font(kind, 17), MUTED)
        if line2:
            text(d, (lx + 34, y + 58), line2, font(kind, 17), MUTED)
            y += 108
        else:
            y += 84

    ty = y + 40
    text(d, (lx, ty), S["note_title"], font(kind, 22, True))
    nf = font(kind, 16)
    max_w = W - lx - 24
    yy = ty + 42
    for key in ("n1", "n2", "n3"):
        for ln in wrap_lines(d, S[key], nf, max_w, 2):
            text(d, (lx, yy), ln, nf, MUTED)
            yy += 24
        yy += 6
    return im


# ---------------------------------------------------------------- main
def main(argv):
    langs = argv[1:] or ["en", "zh-Hant", "ja", "es", "fr", "ko", "ru"]
    for lang in langs:
        if lang not in PIPELINE or lang not in BONE:
            print("skip unknown language:", lang)
            continue
        out_dir = os.path.join(OUT_BASE, lang)
        os.makedirs(out_dir, exist_ok=True)
        p1 = os.path.join(out_dir, "pipeline.png")
        p2 = os.path.join(out_dir, "bone_map.png")
        draw_pipeline(lang).save(p1, optimize=True)
        draw_bone_map(lang).save(p2, optimize=True)
        print(f"{lang:<8} -> {os.path.relpath(p1, ROOT)} , {os.path.relpath(p2, ROOT)}")


if __name__ == "__main__":
    main(sys.argv)
