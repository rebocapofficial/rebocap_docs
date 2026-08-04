---
sidebar_position: 1
title: "Conseils"
---

# Conseils
Lire cette page sans parcourir le tutoriel n'a pas de sens. [Veuillez lire le tutoriel d'abord](../tutorial/README) !!!!

# Étapes d'intégration SteamVR
1. Pour la première utilisation, veuillez vous assurer de redémarrer SteamVR après avoir ouvert le logiciel. Un voyant vert dans le coin supérieur gauche du panneau VR indique une intégration VR réussie. [Si vous ne pouvez pas vous connecter, veuillez voir ici](#vr_cannot_connect)
2. Portez au moins 8 points de suivi, puis cliquez sur la calibration d'action. Lors de la calibration de Apose, le casque doit être porté correctement [surtout lorsque le son de bip rapide se produit]. Pour les procédures de calibration spécifiques, [veuillez vous référer ici](../../tutorial/connect_and_use#pose_calibration)
    > La cuisse, le mollet, la taille et la poitrine doivent être portés. Si les plantes des pieds ne sont pas portées, seul le [mode de suivi](../../ui_help_doc/control/connect#vr_pannel) peut être utilisé !
3. Après une calibration normale, veuillez vérifier le tracker sur l'interface par défaut de SteamVR. Assurez-vous de désactiver SteamVR Home ; sinon, vous ne pourrez pas visualiser le tracker !
    > Ici, il est recommandé que si des problèmes surviennent, passez d'abord à l'interface SteamVR par défaut pour vérifier si la position du tracker correspond aux attentes. Dans d'autres logiciels, tels que VRC, en raison de l'intervention de l'IK et de nombreuses configurations, il ne représente pas la position d'origine du tracker.
   - Pour savoir comment désactiver SteamVR Home et passer à un fond blanc, veuillez voir ici
      <div align="center">
       <img src="/img/steamvr_shutdown_home2-en.png" alt="left" width="39%" />
       <img src="/img/steamvr_shutdown_home3-en.png" alt="left" width="39%" />
       </div>

4. Après avoir porté le casque, vérifiez si la position du tracker correspond aux attentes
    > Ici, vous pouvez ouvrir la fonction de diagnostic pour copier un ensemble de trackers pour une visualisation plus facile.

5. Si vous rencontrez des erreurs ou des problèmes tels que la disparition du tracker, vous pouvez redémarrer. Il est recommandé de redémarrer le client rebocap et SteamVR.
    > Il est également fortement recommandé de fournir des commentaires dans le forum ! Il peut s'agir d'un problème SteamVR ou d'un problème rebocap. Si c'est un problème rebocap, nous essaierons de trouver le problème et de le mettre à jour !

6. Si la différence de hauteur indiquée par la calibration VR est trop importante, [veuillez voir ici](../../ui_help_doc/control/connect#vr_pannel)

Ci-dessous, un exemple d'intégration dans SteamVR. La forte vibration du nœud de la tête est causée par une gigue dans les données de sortie de positionnement du casque !
  <div>
  <video id="video" controls preload="metadata" width="100%">
        <source id="mp4" src="/img/steamvr_example.mp4" type="video/mp4" />
  </video>
  </div>


<a id="how_to_solve_tracker_slant"></a>

### Que faire si le tracker est incliné
Si le personnage semble normal dans l'aperçu 3D, mais que le tracker est incliné par rapport à lui-même, il y a probablement trois raisons :
- La zone de sécurité de la machine tout-en-un n'est pas désactivée, et l'utilisateur se trouve près ou en dehors de la limite de sécurité.
  > Plus de 90 % des problèmes des utilisateurs viennent de ce point.
- Un mouvement excessif provoque un déplacement. En principe, il se corrigera automatiquement ; rester immobile pendant 1 à 2 secondes suffit.
:::danger Sangle de pied


Si vous utilisez une sangle sur la plante des pieds, il est très probable qu'un déplacement se produise. [Pour les détails, veuillez voir ici](../../tutorial/instroction_for_straps#tracker_position_on_body)

:::

- Le paramètre `ovr advanced setting` a modifié l'angle de cap ; il est recommandé de le réinitialiser à 0.
- La transformation des coordonnées spatiales ne peut pas être lue. [Veuillez voir ici](#other_notes)

Si l'aperçu 3D est déjà incliné, veuillez suivre les diagnostics ci-dessous :
- Il est probable qu'une déviation magnétique se soit produite, ou que l'environnement du champ magnétique soit médiocre. S'il s'agit de la première utilisation ou d'un problème occasionnel lors d'utilisations ultérieures, il est recommandé d'effectuer d'abord une calibration du champ magnétique. [Pour les méthodes de calibration spécifiques, voir ici](../../ui_help_doc/control/config#magnet_calibrate)
- Exclure la possibilité que la sangle soit inclinée et vérifier si des trackers individuels sont déchargés ou se sont arrêtés de manière inattendue.
- S'il y a des problèmes tels que des jambes croisées ou d'autres problèmes de jambes, veuillez lire attentivement la [section sur la sangle](../../tutorial/instroction_for_straps) et la [section sur la calibration d'action](../../tutorial/connect_and_use#pose_calibration) dans le tutoriel.
- Si le problème ne peut toujours pas être résolu, veuillez exclure les interférences du champ magnétique et nous recommandons vivement de lire attentivement [cet article](../../QA/magnet).

<a id="vr_cannot_connect"></a>

# La VR ne peut pas se connecter
Le pilote `VR` sera automatiquement et silencieusement installé dans le répertoire `steamvr`. Si vous remarquez que l'icône dans le coin supérieur gauche du panneau `VR` ne devient pas verte, vous pouvez suivre ces étapes pour résoudre le problème.

1. Vérifiez si `steamvr` est en cours d'exécution.
2. Vérifiez si le récepteur `rebocap` est branché et dans un [état connecté](../../ui_help_doc/control/connect#status).
3. Vérifiez si le plugin `rebocap` dans `steamvr` est bloqué. En même temps, vous pouvez vérifier si le plugin `rebocap` est installé.

   <div align="center">
    <img src="/img/steamvr_mask1-en.png" alt="left" width="9%" />
    <img src="/img/steamvr_mask2-en.png" alt="left" width="29%" />
    <img src="/img/steamvr_mask3-en.png" alt="left" width="29%" />
    </div>

4. Si le plugin `steamvr` n'est pas installé à la troisième étape, veuillez le copier et l'installer manuellement comme suit :
- Localisez le répertoire d'installation de `steamvr`, l'emplacement d'installation par défaut est `C:\Program Files (x86)\Steam\steamapps\common\SteamVR`, et l'emplacement du plugin se trouve dans le répertoire `driver` sous le répertoire `steamvr`.
  > Si vous avez modifié l'emplacement d'installation de `SteamVR`, veuillez le trouver vous-même.
- Copiez `rebocap_driver` dans le répertoire des plugins `steamvr`. Le répertoire `rebocap_driver` se trouve dans le répertoire `data` du répertoire d'installation `rebocap`, comme indiqué dans l'image de gauche. Le chemin extrait final est indiqué dans l'image de droite.
   <div align="center">
    <img src="/img/steamvr_plugin0.png" alt="left" width="45%" />
    <img src="/img/steamvr_plugin.png" alt="left" width="50%" />
    </div>

<a id="other_notes"></a>

### Autres remarques
:::info Attention pour les utilisateurs avec des noms de système non anglais !!!


Si votre système utilise un nom non anglais, cela peut empêcher l'accès à la transformation de coordonnées dans `steamvr`, ce qui entraîne des positions finales incorrectes, le personnage flottant ou tombant dans le sol dans steamvr. À ce stade, le système demande souvent ce qui suit au démarrage : exception du plugin rebocap steamvr, impossible de trouver le système de coordonnées spatiales. Dans ce cas, steamvr ne peut être reconnu que s'il est installé dans l'un des deux répertoires suivants :

`C:\Program Files (x86)\Steam\steamapps\common\SteamVR`

`D:\Steam\steamapps\common\SteamVR`

:::



<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>