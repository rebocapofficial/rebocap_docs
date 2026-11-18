---
sidebar_position: 1
title: "Description de l'interface SDK"
---
# Description de l'interface SDK
Actuellement, la DLL expose un total de 8 ports, et chaque SDK est un wrapper autour de l'interface DLL. Vous pouvez vous référer au fichier d'en-tête `include/rebocap_ws_sdk/rebocap_ws_sdk.h` dans le SDK cpp pour plus de détails.

Le type de valeur de sortie du SDK est un quaternion, qui prend en charge de multiples sorties d'espace de coordonnées [système de coordonnées droitier OpenGL par défaut, Blender, Unity, UE], avec l'unité de déplacement étant en mètres.

Le SDK Python n'a pas encore intégré l'interface `rebocap_ws_sdk_calculate_foot_vertex`.

### Description de l'interface
* rebocap_ws_sdk_new
```
    Crée une instance de SDK. Les paramètres comprennent :
    1. Espace de coordonnées, les espaces spécifiques pris en charge peuvent être trouvés dans chaque SDK, non détaillés ici.
    2. S'il faut utiliser le système de coordonnées global. Passer 0 utilisera le système de coordonnées local, qui est relatif au système de coordonnées de l'os parent. Toutes les rotations sont relatives à la rotation T-pose. Si vous n'êtes pas sûr de la rotation, vous pouvez vous référer au code source de Blender, Unity et UE, où la rotation d'Unity est relativement plus facile à comprendre.
    
    Valeur de retour :
    Renvoie un pointeur vers l'instance d'objet SDK.
```

* rebocap_ws_sdk_release
```
Libère l'objet d'instance SDK. Le paramètre passé est le pointeur d'instance.
```
* rebocap_ws_sdk_open
```
Ouvre le client WebSocket et se connecte au port WebSocket. Pour l'utilisation spécifique et les descriptions des valeurs de retour, veuillez vous référer au code du SDK.
```
* rebocap_ws_sdk_close
```
Ferme le client WebSocket et se déconnecte. Pour une utilisation spécifique, voir le SDK.
```
* rebocap_ws_sdk_set_pose_msg_callback
```
Enregistre un rappel de message. Ici, les données ne seront transmises par le WebSocket qu'une fois que l'utilisateur aura effectué la calibration de l'action. La fréquence d'images est de 60 images par seconde. Pour l'utilisation spécifique, voir le code du SDK. 
Veuillez vous référer aux noms des 24 os pour l'ordre des articulations.
```
* rebocap_ws_sdk_set_exception_close_callback
```
Enregistre un rappel pour la fermeture anormale du WebSocket. Pour l'utilisation spécifique, voir le code du SDK.
```
* rebocap_ws_sdk_get_last_msg
```
Outre la forme de rappel, vous pouvez également obtenir directement le dernier message d'action ici. Le format des données est cohérent avec le rappel.
```
* rebocap_ws_sdk_calculate_foot_vertex
```
    Cette interface est principalement utilisée pour enregistrer les points de contact du pied et du squelette corporel dans Rebocap. 
    Vous devez transmettre les données du squelette corporel (les positions de chaque articulation, dans le même ordre que la séquence SMPL). 
    Si vous souhaitez que la DLL calcule automatiquement les positions des points de contact, vous devez transmettre le mesh du pied. Vous pouvez également transmettre les informations de position des points de contact du pied (3 points à l'avant et à l'arrière pour chaque pied, soit 12 points au total), auquel cas la DLL ne calculera pas automatiquement mais utilisera les valeurs transmises. 
    Notez que l'unité ici est le mètre, les coordonnées sont des coordonnées globales, et vous devez utiliser le système de coordonnées OpenGL. Sinon, vous devez transmettre les paramètres de conversion. Pour l'utilisation spécifique, veuillez vous référer à la démo Unity et à l'utilisation du plugin UE.
    
    Cette interface est relativement complexe. Les utilisateurs doivent avoir des capacités de développement suffisantes ou être capables de comprendre pleinement le code de la démo Unity ou du plugin UE. La version Python n'expose pas cette interface. Si nécessaire, vous pouvez encapsuler l'interface Python à partir du SDK CPP ou de la DLL d'origine.
    
    La plupart des utilisateurs peuvent télécharger des modèles VRM sur le client Rebocap pour le développement de plugins, afin d'obtenir le même effet. Pour comprendre les points de contact du pied, vous pouvez vous référer à la documentation d'intégration de Blender sur l'exportation de squelettes.
```

### Noms des 24 os
Les noms standard Mixamo et SMPL correspondants sont les suivants, totalisant 24 os. Pour référence, l'os à l'index 0 correspond aux hanches, qui est le nœud de la taille.
Parmi eux, les articulations correspondant aux orteils et aux doigts gauches et droits n'ont pas de nœuds de tracker correspondants, donc la rotation locale de sortie est de 0. Si vous utilisez la rotation globale, les valeurs de rotation de sortie seront cohérentes avec le nœud parent.

- Noms correspondants de Mixamo
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
- Noms correspondants standard SMPL
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


# Téléchargement du SDK

## Windows

### SDK Python
> CPython 3.6 – 3.14 64 bits · nécessite Microsoft Visual C++ 2015–2022 x64

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="/img/files/Rebocap_Windows_x64_Python_v3.zip" download="Rebocap_Windows_x64_Python_v3.zip">
<span class="os-switch-download-main">Télécharger le SDK Python v3</span>
<span class="os-switch-download-meta">Python 3.6 – 3.14 · x64</span>
<span class="os-switch-download-date">Date de mise à jour : 2026.11.18</span>
</a>
</div>

<details class="plain-details sdk-history"><summary>Versions précédentes</summary>
<div style="margin-top: 10px;">
<p><strong>SDK Python v2</strong> (compatible avec python3.6~python3.12) : <a href="/img/files/rebocap_ws_sdk_python_v2.zip" download="rebocap_python_sdk_v2.zip">télécharger</a></p>
<p>correction du blocage de <code>get_last_msg</code> ; ajout de toutes les versions de python</p>
</div>
</details>

### SDK C#
> Windows x64 · exemple .NET Framework 4.8 · nécessite Microsoft Visual C++ 2015–2022 x64

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="/img/files/Rebocap_Windows_x64_CSharp_v3.zip" download="Rebocap_Windows_x64_CSharp_v3.zip">
<span class="os-switch-download-main">Télécharger le SDK C# v3</span>
<span class="os-switch-download-meta">C# · .NET Framework 4.8</span>
<span class="os-switch-download-date">Date de mise à jour : 2026.11.18</span>
</a>
</div>

<details class="plain-details sdk-history"><summary>Versions précédentes</summary>
<div style="margin-top: 10px;">
<p><strong>SDK C# v2</strong> (avec démo Unity) : <a href="/img/files/csharp_sdk_with_demo_v2.zip" download="rebocap_csharp_sdk_v2.zip">télécharger</a></p>
<p>correction du blocage de <code>get_last_msg</code></p>
</div>
</details>

### SDK CPP
> Windows x64 · C++17 · nécessite Microsoft Visual C++ 2015–2022 x64

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="/img/files/Rebocap_Windows_x64_CPP_v3.zip" download="Rebocap_Windows_x64_CPP_v3.zip">
<span class="os-switch-download-main">Télécharger le SDK CPP v3</span>
<span class="os-switch-download-meta">C++ · C++17 · x64</span>
<span class="os-switch-download-date">Date de mise à jour : 2026.11.18</span>
</a>
</div>

## Linux

### SDK Python (Linux)
> Linux x86-64 · CPython 3.6 – 3.14 · compilé sur Ubuntu 22.04, nécessite GLIBC 2.34+ et GLIBCXX 3.4.29+

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="/img/files/Rebocap_Linux_x86_64_Python.tar.gz" download="Rebocap_Linux_x86_64_Python.tar.gz">
<span class="os-switch-download-main">Télécharger le SDK Python (Linux)</span>
<span class="os-switch-download-meta">Python 3.6 – 3.14 · Ubuntu 22.04+</span>
<span class="os-switch-download-date">Date de mise à jour : 2026.11.18</span>
</a>
</div>

### SDK CPP (Linux)
> Linux x86-64 · C++17 · compilé sur Ubuntu 22.04, nécessite GLIBC 2.34+ et GLIBCXX 3.4.29+

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="/img/files/Rebocap_Linux_x86_64_CPP.tar.gz" download="Rebocap_Linux_x86_64_CPP.tar.gz">
<span class="os-switch-download-main">Télécharger le SDK CPP (Linux)</span>
<span class="os-switch-download-meta">C++ · C++17 · Ubuntu 22.04+</span>
<span class="os-switch-download-date">Date de mise à jour : 2026.11.18</span>
</a>
</div>

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
