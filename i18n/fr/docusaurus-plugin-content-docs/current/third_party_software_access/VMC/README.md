---
sidebar_position: 1
title: "Conseils"
---

# Conseils
Lire cette page sans parcourir le tutoriel n'a pas de sens, [veuillez d'abord lire le tutoriel](../tutorial/README) !!!!

<a id="vmc_instroction"></a>

# Utilisation de VMC
Le protocole VMC est très simple à utiliser. Après la calibration, vous pouvez activer le protocole VMC, [voir les détails ici](../../ui_help_doc/control/connect#cal_pc_panel), puis configurer la réception dans d'autres logiciels. VMC est un protocole de capture de mouvement universel, [voir les détails ici](https://protocol.vmc.info/english.html).

Si vous êtes un streamer et que vous ne savez pas si votre logiciel prend en charge `rebocap`, veuillez vérifier si votre logiciel prend en charge le protocole VMC. Si votre logiciel ne le prend pas en charge, vous pouvez contacter le développeur pour utiliser notre [SDK](../../SDK/README) fourni pour l'intégration, ou utiliser directement nos [plugins](../../plugins/plugins) fournis pour l'intégration.

:::info Notes pour les utilisateurs du protocole VMC


Il est fortement conseillé aux utilisateurs du protocole VMC de télécharger le squelette. S'il s'agit d'un modèle VRM, vous pouvez télécharger directement le squelette sur rebocap, [voici l'introduction au téléchargement du squelette](../../ui_help_doc/control/skeleton_setting#skeleton_import). Pour les utilisateurs d'autres formats, vous pouvez utiliser le [plugin Blender pour exporter le squelette](../../plugins/blender#skeleton_export). Le fichier exporté est un fichier JSON et peut être modifié manuellement.

Si vous ne savez pas comment faire l'un ou l'autre, vous devez connaître la hauteur du squelette de votre personnage virtuel et ajuster le paramètre d'échelle (scale) VMC. Réglez-le de sorte que la hauteur dans rebocap * vmc_scale = hauteur actuelle du personnage virtuel, mais cet effet n'est généralement pas idéal.

:::


### Comment s'intégrer dans d'autres logiciels
Généralement, vous pouvez directement ouvrir la configuration VMC. Veuillez vous référer à la documentation d'autres logiciels pour plus de détails.

1. Étant donné que certains streamers utilisant `warudo` ne connaissent pas bien warudo lui-même, voici un exemple utilisant `warudo`, [voir ici](warudo)


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>