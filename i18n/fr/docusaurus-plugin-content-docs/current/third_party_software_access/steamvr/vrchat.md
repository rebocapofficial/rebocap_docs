---
sidebar_position: 2
title: "Paramètres de base VRChat"
---

**Avant de lire ce tutoriel, assurez-vous de [lire attentivement l'intégration SteamVR](README) !!! Si l'icône du tracker rebocap sur SteamVR ne s'est jamais allumée, ce tutoriel est inutile !!!**

# Paramètres de base VRChat

### Introduction aux paramètres de base de VRChat
Pour ouvrir les paramètres de base, suivez ces étapes : Appuyez sur le bouton Y de la manette pour invoquer le menu -> cliquez sur l'icône d'engrenage -> faites défiler jusqu'à `Tracking & IK`, comme indiqué sur l'image
<div align="center">
 <img src="/img/vrchat_setting1.png" alt="left" width="49.5%" />
 <img src="/img/vrchat_simple_setting.png" alt="left" width="45%" />
 </div>

Points clés de l'introduction aux paramètres IK de base :
1. Ajuster la hauteur dans VRChat

    > Hauteur réelle de l'utilisateur, indiquez ici la hauteur mesurée dans Rebocap, pas votre hauteur réelle ! Parce que tous les trackers sont simulés en fonction de la hauteur mesurée par Rebocap.
    > 
    > Rebocap mesure la hauteur comme la hauteur du casque * 1,05, pour les erreurs de mesure de la hauteur [référez-vous ici](../../ui_help_doc/control/connect#vr_pannel).
    > 
    > Si la hauteur mesurée par votre casque est toujours incohérente avec la vôtre (c'est-à-dire qu'elle dépasse votre hauteur de ±5 cm), vous pouvez désactiver la mesure automatique de la hauteur dans le [panneau VR](../../ui_help_doc/control/connect#vr_pannel) et ajuster la hauteur sur la page du squelette. La hauteur affichée finale est la norme ! Ensuite, dans VRChat, réglez la hauteur sur la hauteur finale affichée dans Rebocap.
    > **Attention, cette solution n'est pas la meilleure**, car si le casque lui-même mesure la hauteur de manière incorrecte, le déplacement du casque dans l'espace est également incorrect. Par exemple, si le casque se déplace réellement d'un mètre vers le bas, les données de mouvement fournies par le casque peuvent n'être que de 0,6 mètre, ce qui entraîne de mauvaises performances de suivi !

Méthode de mesure de la hauteur de Rebocap : ouvrez le journal pour voir les messages historiques (si vous désactivez la hauteur automatique, elle ne sera pas affichée ici !)
<div align="center">
 <img src="/img/rebocap_vr_height-en.png" alt="left" width="30%" />
 </div>

2. Ajuster le mode de mesure de VRChat

    > Les utilisateurs qui découvrent la capture de mouvement intégrale de VRChat doivent uniformément utiliser le mode `Height` (Hauteur) ! Les utilisateurs familiers avec l'IK de VRChat peuvent envisager d'utiliser le mode Arm (Bras), en conjonction avec Arm

3. S'il faut autoriser le suivi du corps entier

    > Doit être autorisé, comme le montre la figure, le statut est activé (on)

4. Mode de verrouillage IK
  > Ceci peut être ajusté pour voir différents effets. Si vous n'êtes pas sûr, vous pouvez utiliser LockHip ou LockHead. Il y aura des différences significatives, en particulier en position assise ou couchée.

### Introduction aux paramètres IK avancés de VRChat
Pour ouvrir les paramètres de base, suivez ces étapes : Appuyez sur le bouton Y de la manette pour appeler le menu -> cliquez sur le monde (world), un grand panneau de paramètres apparaît -> cliquez sur l'icône d'engrenage -> sélectionnez `Tracking & IK` sur la gauche, comme le montre la figure
<div align="center">
 <img src="/img/vrchat_advanced_setting.png" alt="left" width="24%" />
 <img src="/img/vrchat_advanced_setting2.png" alt="left" width="24%" />
 <img src="/img/vrchat_advanced_setting3.png" alt="left" width="24%" />
 <img src="/img/vrchat_advanced_setting4.png" alt="left" width="24%" />
 </div>

Note spéciale : Les utilisateurs qui découvrent la capture de mouvement du corps entier dans VRChat, à l'exception de ceux marqués sur l'image, doivent utiliser tous les paramètres par défaut !!! Vous pouvez vous référer aux captures d'écran

Introduction aux 4 paramètres marqués sur l'image :
1. Faut-il utiliser le commutateur IK traditionnel !
    > Il n'est pas recommandé de l'activer, utiliser l'IK 2.0 par défaut, l'utilisation de l'IK traditionnel entraînera d'autres problèmes, tels que l'enfoncement de la taille dans les fesses
2. Rapport de hauteur des bras
    > **Cette option n'est effective que lorsque le mode de mesure est réglé sur Arm (Bras)** ! Pour les utilisateurs familiers avec l'IK de VRChat, non recommandé pour les utilisateurs non familiers. S'il y a des problèmes, vous pouvez communiquer avec d'autres utilisateurs, l'officiel ne fournit pas de support technique sur ce point !
    > 
    > Généralement, lorsqu'il est défini sur le mode Arm, vous pouvez ajuster le ratio ici pour rendre la performance des jambes plus naturelle. La méthode spécifique consiste à ouvrir le mode de calibration dans VRChat, voir les points de suivi et ajuster le ratio de sorte que les points de suivi sur les pieds soient près du cou-de-pied.
   
:::danger Conseil


Si les utilisateurs constatent qu'il y a moins de points de suivi, il est probable qu'ils soient tombés sous le sol ! Essayez de lever les pieds pour vérifier !

:::


3. S'il faut afficher la plage de calibration du tracker
    > C'est-à-dire la sphère de plage verte.

4. Changer le modèle d'affichage du tracker
    > Si vous devez passer à une croix, réglez l'`axis` (axe) comme indiqué dans l'image, et vous pourrez basculer et le visualiser vous-même.

<a id="calibration_in_vrc"></a>

### Comment calibrer dans VRChat
Après avoir terminé les paramètres de base mentionnés ci-dessus, suivez les étapes ci-dessous :
1. Appuyez sur le bouton Y de la manette gauche pour ouvrir le panneau des paramètres.
2. Cliquez sur l'icône de petit bonhomme sur le panneau (à condition que le tracker virtuel dans SteamVR ait été activé ; sinon, l'icône ici ne correspondra pas à celle de l'image ci-dessous. Si ce n'est pas clair, veuillez vous référer à [Intégration SteamVR](README)).
    > ![Bouton de calibration du corps entier](../../../../../../static/img/vrchat_calibrate.png)
3. Ajustez votre posture debout et prenez une pose en T (T-pose), en vous assurant que le point de suivi sur le dessus de votre pied est près du dessus de votre pied. Si la sphère de plage verte est ouverte, essayez de rendre la sphère aussi petite que possible (les utilisateurs familiers avec l'IK peuvent l'ajuster eux-mêmes).
    > Si vous trouvez que le dessus de votre pied est sous le sol, cela est souvent dû à un bug de VRChat. VRChat a des problèmes de reconnaissance du sol ; par exemple, si vous placez la manette sur le sol réel, la position de la manette dans VRChat peut se trouver sous le sol (il en va de même si elle flotte).
    > 
    > Actuellement, il n'y a pas de bonne façon de résoudre cela. Vous pouvez redémarrer VRChat ou, après calibration, utiliser les `ovr advanced settings` (paramètres avancés ovr) pour ajuster la hauteur du sol. Assurez-vous de l'ajuster uniquement après la calibration de mouvement !!!
4. Maintenez la pose en T. Si l'ensemble de votre corps est aligné, appuyez simultanément sur les boutons de déclenchement (gâchettes) des deux mains (le bouton de déclenchement fait référence au bouton dans la zone de repos de l'index) pour terminer la calibration dans VRChat !

  <div>
  <video id="video" controls preload="metadata" width="100%">
        <source id="mp4" src="/img/vrc_calibrate.mp4" type="video/mp4" />
  </video>
  </div>

# Étapes de dépannage de VRChat
> Les problèmes non détaillés font généralement référence à des problèmes spécifiques, tels que l'impossibilité de redresser les jambes dans certains états, qui sont fortement liés aux paramètres de VRC et du squelette. D'autres explications seront fournies ultérieurement.
> 
> Cette section traite principalement des problèmes de désalignement ou de chaos général.
> 
> Des problèmes détaillés seront documentés plus tard ; pour l'instant, vous pouvez consulter les membres expérimentés du groupe.

- Vérifiez si l'interface d'aperçu 3D est normale.
- Vérifiez si le tracker dans l'interface SteamVR par défaut est normal.
    > Pour plus de détails, [veuillez vous référer ici](README#how_to_solve_tracker_slant).
- Vérifiez si les paramètres clés dans VRC sont conformes au tutoriel ci-dessus.

### Pourquoi les bras du personnage ne peuvent-ils pas se tendre dans VRC ?
- Cela est dû à une inadéquation entre le squelette du modèle et le squelette de l'utilisateur. Si le bras du modèle est trop court, il est plus facile de le tendre. Le problème central est que les proportions des os ne correspondent pas à celles d'une personne réelle.
  > Les utilisateurs avancés peuvent essayer d'utiliser le mode Arm (Bras), puis de modifier le `arm vs height ratio` (rapport bras/hauteur).
  > 
  > Voici un exemple extrême pour que les joueurs comprennent : si le bras du personnage virtuel fait 3 mètres de long, mais que la hauteur du personnage n'est que de 1,7 mètre, la position de repos normale des bras d'une personne en réalité se trouve à la taille. Cependant, VRChat doit respecter la position réelle de la main, de sorte que les bras du personnage virtuel ne peuvent être pliés qu'à un certain angle.

### Pourquoi les pieds de mon personnage sont-ils sous le sol pendant la calibration ?
> Cela a déjà été expliqué dans le troisième point de [Comment calibrer dans VRChat](#calibration_in_vrc).

### Pourquoi mes jambes ne peuvent-elles pas se tendre ?
> Ceci est lié à la différence significative des proportions osseuses du personnage virtuel par rapport à la réalité. Généralement, l'utilisation d'un squelette de personnage qui correspond au vôtre et son ajustement dans rebocap donne les meilleurs résultats.
> 
> De plus, vous pouvez utiliser une astuce de calibration pour atténuer ce problème, par exemple en réglant la hauteur dans VRChat légèrement inférieure à celle mesurée dans rebocap. Cela permet de redresser plus facilement les jambes en position assise.
> 
> Ceci s'adresse aux utilisateurs qui ne dansent pas ; pour les utilisateurs qui dansent, il est toujours recommandé de régler la hauteur en fonction des mesures dans rebocap.

### Pourquoi mes pieds se croisent-ils quand je m'assieds ?
1. Exclure l'influence de la traction du pantalon.
2. Changez la position du tracker de la cuisse et observez les effets de différentes positions.
3. S'il y a toujours des problèmes, veuillez [ajuster la compensation](../../ui_help_doc/control/cap_param#up_leg_com) (donnez la priorité à l'ajustement de la compensation des cuisses) en fonction des effets observés dans l'aperçu 3D !
4. Lors de la calibration du mouvement, gardez la distance entre vos pieds plus rapprochée.
5. Lors de la calibration dans VRChat, gardez la distance entre vos pieds un peu plus proche.

Pour les points 1 et 2, veuillez [lire attentivement la section du tutoriel](../../tutorial/instroction_for_straps#tracker_position_recomendation).

### Comment améliorer la stabilité
1. Utilisez [des méthodes d'attache complexes](../../tutorial/instroction_for_straps#quick_fix_complex_install) pour les sangles, ou achetez des sangles plus larges.
2. Les capteurs de pied sont cruciaux ; [veuillez vous référer ici](../../tutorial/instroction_for_straps#tracker_position_on_body).
3. Pour les utilisateurs qui dansent, en particulier lors d'une danse intense, il est recommandé de trouver un environnement avec un champ magnétique relativement bon et de désactiver le mode anti-magnétique.


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>