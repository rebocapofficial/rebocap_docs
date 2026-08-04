---
sidebar_position: 2
title: "Téléchargement du Plugin Blender"
---
# Téléchargement du Plugin Blender

Cliquez sur le lien ci-dessous pour télécharger directement :
- **Blender Plugin Beta 9**
<a href="/img/files/rebocap_blender_plugin_v9.zip" target="_blank" download="rebocap_blender_plugin_v9.zip">blender avec python 3.6~3.12</a>
Notes de mise à jour :
- Compatible avec Blender 4.4 et supérieur
- Correction d'un bug de résidus de processus dans le plugin rebocap
- Correction du bug d'exportation du squelette pour stabiliser les pieds dans des scénarios de pilotage en temps réel.
- Prise en charge de toutes les versions de Python 3, par exemple, il peut prendre en charge Blender 4.1
- Prise en charge de la liaison directe du squelette Mixamo
- Correction d'un bug avec les pilotes de modèles fbx
- Correction d'un bug avec l'axe d'enregistrement d'animation
- Ajout de la fonction de sélection d'adsorption d'os


# Vidéo Tutoriel Blender
Remarque : Il n'y a pas de son ici.

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/for_blender_install/blender_usage.mp4" type="video/mp4" />
</video>
</div>

# Installation du Plugin Blender

Étapes d'installation :
Ouvrez `Edit->Preference`, sélectionnez `Add-ons` dans le panneau contextuel, cliquez sur `Install` à droite, sélectionnez le fichier téléchargé `rebocap_blender_plugin.zip`, puis cliquez sur Install Add-on pour installer. Après l'installation, vous devez cocher pour l'activer. Entrez rebocap comme indiqué sur la figure, et cochez le plugin pour l'installer avec succès.

<div align="center">
    <img src="/img/for_blender_install/blender_1.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_2.png" alt="pic_right" width="45%" />
</div>

Après une installation réussie, le menu de plugin correspondant devrait apparaître sur le côté droit, comme indiqué sur la figure.
    > Remarque : si vous ne voyez pas le menu, il y a une petite flèche pointant vers la gauche sur laquelle vous pouvez cliquer pour le voir.

<div align="center">
    <img src="/img/for_blender_install/blender_3.png" alt="pic_left" width="25%" />
</div>

:::info Que faire si l'installation échoue


Si certains utilisateurs échouent à installer, veuillez trouver l'emplacement d'installation d'origine du plugin Blender et extraire directement `rebocap_blender_plugin.zip` dans le répertoire d'installation de blender. L'emplacement d'installation par défaut du plugin est `C:\Users\<votre_nom_utilisateur>\AppData\Roaming\Blender Foundation\Blender\<numéro_de_version>\scripts\addons`, où `votre_nom_utilisateur` est votre nom d'utilisateur, et `numéro_de_version` est le numéro de version de Blender que vous avez installé.

:::


![Diagramme de l'emplacement d'installation de Blender](../../../../../static/img/for_blender_install/blender_23.png)

# Liaison du Squelette
1. Liaison automatique du squelette VRM
2. Si vous utilisez la spécification de squelette Mixamo avec FBX, la liaison automatique peut être réalisée en mode direct, ce qui signifie qu'en mode direct, tous les avatars Mixamo peuvent être contrôlés.
  > Cependant, les 12 points fixes sur la plante des pieds doivent être sélectionnés manuellement (cela peut être ignoré si les exigences en matière d'effets sur les pieds ne sont pas élevées).

:::danger Rappel !!!


Vous devez ouvrir le client rebocap et calibrer le mouvement avant de cliquer sur `connect`, sinon vous devrez peut-être redémarrer blender pour continuer la capture de mouvement en temps réel.

Le squelette du personnage lié est entraîné par le nœud de la hanche (hip). Si le nœud de la hanche n'est pas l'os racine (root bone), ou si le nœud de la hanche ne peut pas être déplacé (certains squelettes associent de force la hanche à la racine, et le déplacement local de la hanche ne peut pas être modifié), alors les fesses du personnage peuvent rester en place.

:::


Astuces : Pour mettre à l'échelle les fbx en mètres, veuillez vous référer à la position dans la figure ci-dessous et changer `scale` à 0.01
<div align="center">
    <img src="/img/for_blender_install/fbx_change_meter.png" alt="pic_left" width="25%" />
</div>

### Activer le Mode Développeur
Ouvrez `Edit->Preference`, sélectionnez `Interface` à gauche, puis cochez `Developer Extras`

<div align="center">
    <img src="/img/for_blender_install/blender_4.png" alt="pic_left" width="45%" />
</div>

### Importer le Personnage

En prenant un personnage au format `VRM` comme exemple, téléchargez le plugin VRM [ici](https://github.com/saturday06/VRM-Addon-for-Blender/releases/download/2_20_24/VRM_Addon_for_Blender-2_20_24.zip).

Pour les personnages au format FBX, il est recommandé d'utiliser le plugin [`better fbx`](https://blendermarket.com/products/better-fbx-importer--exporter) pour l'importation.

<div align="center">
    <img src="/img/for_blender_install/blender_5.png" alt="pic_left" width="45%" />
</div>

### Sélectionner le Personnage Cible dans le Plugin

Après l'importation, ouvrez `REBOCAP_CONNECTION`, sélectionnez `Armature` sur la droite [l'option `Drive Type` n'apparaîtra pas si elle n'est pas sélectionnée], puis choisissez `retarget` dans le menu `REBOCAP_CONNECTION`, et sélectionnez ce personnage comme `Source`. Vous pouvez faire glisser directement `Armature` dans la case `Source`.

<div align="center">
    <img src="/img/for_blender_install/blender_6.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_7.png" alt="pic_left" width="45%" />
</div>

Après avoir sélectionné Source, le menu suivant apparaîtra :

<div align="center">
    <img src="/img/for_blender_install/blender_8.png" alt="pic_left" width="45%" />
</div>

### Liaison des Os

Chaque os doit être mis en correspondance avec l'os correspondant sur le personnage cible. [Seules les parties anglaises sont fournies ici, veuillez traduire si ce n'est pas clair]

Pelvis est le bassin (fesses), Spine est l'os au-dessus des fesses, Chest a deux sections, certains personnages n'ont qu'une seule section de Chest, auquel cas vous pouvez lier à l'une ou l'autre section. Si le personnage cible a deux os, choisissez celui qui est le plus proche de Chest. Les quatre os de la Leg (jambe) doivent être liés, Toe (orteil) est facultatif.

Pour les personnages au format VRM, vous pouvez cliquer directement sur Auto Detect après l'importation, et cela se remplira automatiquement. D'autres formats nécessitent que les utilisateurs trouvent manuellement les noms d'os correspondants et les sélectionnent.

<div align="center">
    <img src="/img/for_blender_install/blender_9.png" alt="pic_left" width="80%" />
</div>

### Obtenir l'ID de Sommet de la Semelle de Chaussure

Cette étape est un peu plus compliquée et peut être ignorée si vous n'êtes pas trop préoccupé par l'effet. L'objectif principal est d'obtenir la limite de la semelle de la chaussure afin que le personnage marche le long de la limite. Cependant, si les chaussures sont trop grandes, cela peut provoquer des vibrations verticales lors du changement de pied.

1. La première étape consiste à activer le mode développeur, ce qui a été mentionné au début du document.

2. Passez en mode Object, puis désélectionnez Bone (os), et cliquez sur le pied du personnage pour sélectionner Mesh (maillage).

    <div align="center">
    <img src="/img/for_blender_install/blender_10.png" alt="pic_left" width="80%" />
    </div>
    <div align="center">
    <img src="/img/for_blender_install/blender_11.png" alt="pic_left" width="80%" />
    </div>

3. Cliquez pour sélectionner le personnage, assurez-vous que la partie chaussure est sélectionnée, puis passez en EditMode.

    <div align="center">
    <img src="/img/for_blender_install/blender_12.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_13.png" alt="pic_left" width="45%" />
    </div>
    <div align="center">
    <img src="/img/for_blender_install/blender_14.png" alt="pic_left" width="80%" />
    </div>


4. Ouvrez Indices, ce qui diffère entre Blender 3.6 et Blender 4.0.

    <div align="center">
    <img src="/img/for_blender_install/blender_15.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_16.png" alt="pic_left" width="45%" />
    </div>

5. Sélectionnez les sommets et enregistrez les valeurs correspondantes.

    Un total de 12 sommets doit être enregistré : la gauche, le centre et la droite de l'avant-pied de chaque pied, et la gauche, le centre et la droite du talon. Notez qu'il s'agit de la direction gauche et droite du personnage lui-même. Lors de la recherche, vous pouvez placer le dos du personnage vers vous pour une identification plus facile.

    Lors de la sélection des points, comme vous devez sélectionner le maillage (Mesh), le menu de droite ne sera pas visible pendant la sélection. Vous devez l'enregistrer vous-même dans l'ordre de la gauche, du centre et de la droite de l'avant-pied, et de la gauche, du centre et de la droite du talon.

    Voici quelques opérations de base dans Blender :
    > shift + clic molette de la souris pour faire glisser
   > 
    > ctrl + clic molette de la souris pour zoomer
   > 
    > clic molette de la souris pour changer de vue

6. Après l'enregistrement, passez du mode `Edit` au mode `Object`, sélectionnez `Armature`, puis remplissez les identifiants des pieds (foot IDs).

    <div align="center">
    <img src="/img/for_blender_install/blender_21.png" alt="pic_left" width="80%" />
    </div>

#### Explication de l'Exemple pour la Liaison des ID de Sommet de la Semelle
Par exemple, les trois sommets de l'avant-pied gauche du personnage ci-dessous sont :
8863 8860 8862

 <div align="center">
 <img src="/img/for_blender_install/blender_17.png" alt="pic_left" width="60%" />
 </div>
 <div align="center">
 <img src="/img/for_blender_install/blender_18.png" alt="pic_left" width="32%" />
 <img src="/img/for_blender_install/blender_19.png" alt="pic_left" width="32%" />
 <img src="/img/for_blender_install/blender_20.png" alt="pic_left" width="32%" />
 </div>


<a id="skeleton_export"></a>

# Exportation du Squelette
Une fois tous les os clés liés, un bouton de sauvegarde des os apparaîtra. Cliquez sur exporter et choisissez un emplacement pour enregistrer.

 <div align="center">
 <img src="/img/for_blender_install/blender_22.png" alt="pic_left" width="60%" />
 </div>

Ensuite, importez-le dans Rebocap, [référez-vous ici](../ui_help_doc/control/skeleton_setting#skeleton_import)


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>