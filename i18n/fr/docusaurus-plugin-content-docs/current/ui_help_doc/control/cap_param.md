---
sidebar_position: 2
title: "Compensation de la Jambe Supérieure"
---

<a id="up_leg_com"></a>

# Compensation de la Jambe Supérieure
<img src="/img/cap_param_up_leg-en.png" alt="Upper Leg Compensation Panel" />

1. **Appliquer la Compensation**

    Activez la fonction de compensation. Cette compensation est principalement utilisée pour compenser les déformations causées par des changements de forme du corps ou par la traction des sangles.

2. **Calcul Automatique Lors de la Calibration**

    Calcule en fonction de la déformation pendant la pose en S (S-Pose). Pour de meilleurs résultats, il est recommandé d'ajuster après s'être assis et d'utiliser l'ajustement manuel. En raison des changements de position de port ou de la force inégale causée par le frottement de la sangle, les résultats de la calibration automatique peuvent varier à chaque fois.

3. **Compensation Latérale**

   * Cette compensation est principalement utilisée pour compenser l'inclinaison latérale causée par les changements de forme du corps lors de la position assise ou couchée. Elle ne compense pas les problèmes causés par les champs magnétiques. Les problèmes causés par les changements de forme du corps sont généralement symétriques, et cette compensation s'applique à la fois à la jambe supérieure gauche et droite.
   * Pour un ajustement manuel, vous pouvez vous asseoir et ouvrir la fenêtre d'aperçu 3D pour ajuster. Il n'est pas recommandé de régler en regardant votre tracker en VR.
   * Certains décalages peuvent être causés par les champs magnétiques, veuillez vous référer ici.

:::info Remarque !!!


Il est recommandé aux utilisateurs de trouver la meilleure position de fixation avant d'ajuster la compensation. Plus la valeur de compensation est faible, mieux c'est. Lors du test des positions de fixation, il est recommandé de ne pas porter de pantalons longs et de tester avec la sangle directement contre la peau (si certaines personnes sont allergiques à la surface de la sangle, un mouchoir peut être placé en dessous). D'après les retours actuels, certaines personnes trouvent de meilleurs résultats lorsqu'elle est placée sur le côté extérieur des jambes, tandis que d'autres trouvent de meilleurs résultats lorsqu'elle est placée directement au-dessus des genoux. Veuillez vous référer aux résultats des tests finaux !

Désactivez la compensation, puis testez complètement la meilleure position de fixation avant d'activer le mécanisme de compensation pour de meilleurs résultats.

:::


4. **Compensation de la Hauteur**

   - Principalement utilisée pour compenser les différences de hauteur des jambes en position assise, par exemple lorsque la jambe gauche est plus haute que la jambe droite. Pour de meilleurs résultats, il est recommandé d'ajuster manuellement après s'être assis jusqu'à ce que les deux pieds soient à la même hauteur.
   - Il y a deux raisons aux différences de hauteur des jambes :
     * Lors de la calibration en A-pose, les angles des deux jambes sont incohérents (les différences de longueur des jambes gauche et droite peuvent facilement causer cela), comme lorsque le genou gauche est poussé vers l'arrière tandis que le genou droit est légèrement en avant, conduisant à des différences de hauteur des jambes.
     * Des différences significatives dans la distribution musculaire entre les deux jambes peuvent également provoquer des différences de hauteur des jambes.

5. **Compensation de Rotation**

   - Le mécanisme de compensation de rotation est similaire à la compensation de hauteur, sauf que la compensation de hauteur est utilisée pour égaliser les jambes à la même valeur, tandis que la compensation de rotation applique le même angle aux deux jambes.
   - Compensez après vous être assis. Plus la valeur de compensation est élevée, plus la position des hanches du personnage sera haute.
      > Pourquoi cette compensation est nécessaire : Principalement parce que les tissus du corps humain présentent une certaine fluidité et sont facilement affectés par la gravité, en particulier lorsqu'ils sont portés à l'avant. L'alignement relatif entre le capteur et le squelette peut changer. Par exemple, après s'être assis, la jambe supérieure est parallèle au sol, et la hanche et le genou sont à la même hauteur. Cependant, si vous observez attentivement le personnage virtuel, vous constaterez peut-être que la hanche du personnage virtuel est plus basse que le genou du personnage virtuel. À ce stade, vous pouvez ajuster la valeur de compensation pour maintenir la cohérence avec la réalité.

6. **Plage Linéaire**
   
   La logique de calcul de la compensation. Par exemple, si la valeur de compensation est de 10 et la plage linéaire est réglée sur 25 degrés, alors lorsque la cuisse est légèrement pliée par rapport à la pose en A, et que l'angle de flexion est de 12,5 degrés, la valeur de compensation donnée est de 5. Si l'angle de flexion est de 25 degrés, la valeur de compensation donnée est de 10. Si l'angle de flexion est de 90 degrés, la valeur de compensation reste 10. Dans la plupart des cas, la plage linéaire est de 25 à 45 degrés. Vous pouvez l'ajuster en fonction de votre situation.

7. **Angle par Défaut de la Jambe Supérieure**
   
   Ceci modifie principalement l'angle entre la jambe supérieure de la personne réelle et le sol pendant la calibration. La valeur par défaut est verticalement vers le bas avec un angle de 0. Cette fonction est pratique pour les utilisateurs ayant des jambes légèrement en forme de X ou en forme de O ou ceux qui préfèrent une plus grande distance entre les jambes lors de la calibration.

   Plus la valeur est grande, plus les jambes du personnage virtuel seront écartées. Notez que cela est différent de la compensation latérale ; cet ajustement prendra également effet en position debout. Pour la jambe inférieure, par expérience, ajustez à la moitié de la valeur de la jambe supérieure.

<a id="lower_leg_com"></a>

# Compensation de la Jambe Inférieure
La fonction est la même que la compensation de la jambe supérieure. Pour une utilisation spécifique, reportez-vous à la compensation de la jambe supérieure. Cependant, notez que lorsque vous êtes assis, l'angle de déviation de la jambe inférieure par rapport à la pose en A est très faible, la compensation n'est donc généralement pas nécessaire en position assise. Vous pouvez vérifier l'effet de la compensation lorsque la jambe inférieure se plie vers l'arrière ou lorsque vous êtes allongé.

<img src="/img/cap_param_down_leg-en.png" alt="Lower Leg Compensation Panel" />

<a id="other_com"></a>

# IK, Épaule et Autres Compensations
### Paramètres IK

L'IK actuel est principalement utilisé pour recalculer les jambes, améliorant la stabilité des jambes et augmentant ainsi la stabilité globale.

<img src="/img/cap_param_ik-en.png" alt="Shoulder and Other Compensation Panel" />

1. **Commutateur IK Vertical**

   Lorsqu'il est activé, il minimisera les secousses verticales du personnage, bien que cela ne puisse pas être complètement évité à l'heure actuelle. Une optimisation hors ligne future pourrait résoudre ce problème.

2. **Commutateur IK Horizontal**

   Lorsqu'il est activé, si les pieds du personnage restent immobiles et qu'il y a un mouvement angulaire dans les jambes et la taille, les pieds du personnage virtuel essaieront de rester immobiles simultanément. Sinon, en raison de squelettes différents, seul un pied peut rester immobile tandis que l'autre bouge légèrement.

3. **Poids IK**

   Plus le poids IK est élevé, plus la force d'intervention de l'IK est grande. Des valeurs inférieures ont tendance à maintenir les angles d'origine, et la vitesse des incréments d'angle d'ajustement IK sera plus lente. Vous pouvez comparer l'effet avec l'IK désactivé.

4. **Angle de Flexion de la Jambe**
   
   L'augmentation du degré de flexion des jambes étend la plage de résolution de l'IK, ce qui améliore la stabilité globale. Cependant, la position par défaut des jambes sera pliée, généralement ajustée à environ 3~4.

5. **Flexibilité de la Taille**

   Plus la valeur est grande, plus le mouvement de la taille sera flexible, mais il peut différer des mouvements de la vie réelle. Ajustez en conséquence.

### Paramètres de Contrainte des Bras

<img src="/img/cap_param_ik_arm-en.png" alt="手臂约束参数" />

1. Contrainte de Pose en A

   Principalement utilisée pour empêcher les bras en pose en A de s'approcher trop près du corps. Ceci est conçu pour les streamers, car de nombreux modèles de streamers ont des épaules très étroites, et si les bras virtuels correspondent exactement aux bras réels, un chevauchement (clipping) évident se produira. Vous pouvez ajuster la plage de contrainte des bras en fonction du marqueur `3` dans l'image ; plus la valeur est élevée, plus les bras restent éloignés du corps.

2. Contrainte d'Applaudissement

   Principalement utilisée pour ajuster le croisement des mains lors d'applaudissements. Parce que de nombreux personnages virtuels ont des bras très longs, les mains du personnage virtuel se croiseront inévitablement lorsqu'une personne réelle applaudit. Ce paramètre permet d'atténuer, sans toutefois l'éliminer entièrement, ce problème. Vous pouvez ajuster la valeur de `4` en fonction de votre situation réelle ; plus la valeur est élevée, plus la distance entre les paumes est grande. Cela ne prend effet que lorsque les paumes sont dans la plage de la largeur des épaules.

### Liaison de l'Épaule

La compensation de liaison de l'épaule est principalement utilisée pour la compensation lorsqu'il n'y a pas de points d'épaule. Elle compense automatiquement la rotation de l'os de l'épaule en fonction de l'angle de rotation du bras supérieur, rendant les épaules moins rigides. Cependant, des actions spécifiques comme hausser les épaules ne peuvent pas être compensées.

<img src="/img/cap_param_shoulder_link-en.png" alt="Shoulder and Other Compensation Panel" />

1. S'il faut activer la compensation de liaison de l'épaule
2. Valeur de compensation de la liaison de haut en bas, c'est-à-dire la compensation de la liaison lorsque le bras est baissé et levé, avec une direction de compensation constante
3. Valeur de compensation de la liaison avant et arrière, c'est-à-dire la compensation de la liaison lorsque le bras est déplacé vers l'avant et vers l'arrière, avec une direction de compensation constante
4. Plage de compensation linéaire, similaire à la plage de compensation linéaire de la jambe supérieure. En général, régler la plage de compensation de l'épaule sur 70 à 90 degrés est plus approprié. Vous pouvez l'ajuster en fonction de votre situation réelle.

### Sensibilité de l'Épaule de la Pièce de Remplacement

Cette section est principalement utilisée pour la compensation de la sensibilité lors du remplacement de la position de l'avant-bras ou de la main à l'épaule. En raison des sangles, le capteur sur l'épaule ne peut souvent pas suivre pleinement le mouvement de l'épaule, ce qui entraîne un certain déplacement et une représentation d'angle moins prononcée. Par conséquent, la sensibilité est augmentée pour compenser les différences causées par les sangles. Si vous utilisez une combinaison moulante et que le capteur d'épaule est entièrement attaché, réglez la sensibilité sur 1.0.

La logique de calcul spécifique est : Valeur de rotation appliquée = Valeur de rotation détectée * Sensibilité

<img src="/img/cap_param_shoulder_sensitive-en.png" alt="Shoulder Sensitivity" />


### Autres

Utilisé pour contraindre des rotations anormales

<img src="/img/cap_param_other-en.png" alt="Other Constraints" />


1. **Contrainte d'Inclinaison de la Poitrine et de la Taille**
   
   Ceci est principalement utilisé pour corriger les problèmes d'inclinaison du personnage causés par un désalignement de la sangle. Elle est efficace en position debout et corrige automatiquement. Cependant, si le personnage est assis avec une inclinaison, elle peut également corriger, entraînant une inclinaison lorsque le personnage se tient droit. Notez que plier la taille n'est pas considéré comme une inclinaison ; l'inclinaison fait référence à se pencher sur les côtés du corps.

   La correction est un processus graduel en temps réel qui nécessite un certain temps et ne se produit que lorsque l'on est immobile.

2. **Contrainte d'Inclinaison de la Tête**

   Similaire à la contrainte d'inclinaison de la poitrine et de la taille, considérant que la tête s'incline souvent naturellement, ce qui peut conduire à un comportement de correction incorrect, il n'est pas recommandé de l'activer.

3. **Contrainte de la Cheville**

   Ceci contraint principalement la rotation de la cheville. Généralement, la cheville n'a qu'un seul degré de liberté par rapport à la jambe inférieure, les deux autres degrés de liberté étant plus petits. Considérant que les conditions de champ magnétique près du sol sont souvent mauvaises pour la plupart des utilisateurs, la contrainte de la cheville est activée par défaut pour limiter de force les deux autres directions. Si l'environnement du champ magnétique près du sol de l'utilisateur est bon, comme à l'extérieur sur la terre, la contrainte de la cheville peut être désactivée pour plus de liberté.

4. **Correction de la Poitrine VR**

   La correction de la poitrine diffère de la contrainte d'inclinaison de la poitrine et de la taille, car elle s'applique uniquement en mode `VR`. Elle est efficace lorsque le haut du corps est droit, couché à plat, ou sur le ventre (non efficace lorsqu'on est allongé sur le côté). Elle ajuste l'angle de lacet (yaw) pour forcer la poitrine à se redresser, ce qui peut entraîner une légère rotation de la poitrine. En position debout, elle ajuste l'auto-rotation, et en position couchée, elle ajuste l'inclinaison gauche-droite. Elle n'est recommandée que pour une utilisation avec 6 axes ou pour dormir sur un matelas à ressorts.


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>