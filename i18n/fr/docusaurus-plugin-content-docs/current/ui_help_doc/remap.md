---
sidebar_position: 3
title: "Aperçu des capteurs"
---

# Aperçu des capteurs

Comme le montre la figure ci-dessous, une couleur verte indique que le capteur est connecté à l'articulation correspondante, tandis que le gris indique qu'il n'est pas connecté. Le côté gauche de l'image représente le côté gauche du corps humain ; par exemple, dans l'image ci-dessous, le capteur sur le pied gauche n'est pas connecté, et le capteur sur le bas de la jambe droite n'est pas connecté non plus.

![img.png](../../../../../static/img/2d_view.png)

<a id="tracker_replace"></a>

## Fonction de remplacement de capteur
Ici, vous pouvez glisser-déposer des points de capteur pour réorganiser les capteurs.

:::warning Après le remplacement, s'il n'est pas activé, cela entraînera l'échec de la calibration


De nombreux utilisateurs font glisser accidentellement les capteurs, par exemple en faisant glisser la main gauche vers le haut de la jambe gauche, mais si la main gauche n'est pas activée lors de la calibration, cela déclenchera un échec de la calibration car le haut de la jambe gauche n'est pas activé !!! 
Après le glissement, les points remplacés ne seront pas effectifs, qu'ils soient activés ou non.

:::


### Démo de glisser-déposer
> Cliquez et maintenez le bouton gauche de la souris enfoncé sur un nœud, puis faites-le glisser vers la position cible.
<div>
<video id="video" controls autoplay loop preload="metadata" width="35%">
      <source id="mp4" src="/img/remap_config.mp4" type="video/mp4" />
</video>
</div>


### Points qui peuvent remplacer d'autres parties du corps
   * Main gauche (Nœud 13)
   * Main droite (Nœud 14)
   * Avant-bras gauche (Nœud 11)
   * Avant-bras droit (Nœud 12)


### Pièces pouvant être remplacées
   Toutes


### Fonction spéciale
   * Remplacer par la position de l'épaule
    > Si vous voulez que la zone des épaules soit plus flexible, vous pouvez la remplacer par la position de l'épaule, mais cela impose des exigences plus élevées aux sangles, qui doivent être résolues indépendamment.


### Exemple de remplacement
Comme le montre la figure ci-dessous, les quatre points des mains gauche et droite ont été remplacés, remplaçant les parties suivantes :
* Épaule gauche
* Épaule droite
* Bas de la jambe gauche
  > Le bas de la jambe gauche n'a pas été activé après le remplacement, un échec de calibration se produira donc !!!
* Bas de la jambe droite

![img.png](../../../../../static/img/2d_view_replace.png)


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>