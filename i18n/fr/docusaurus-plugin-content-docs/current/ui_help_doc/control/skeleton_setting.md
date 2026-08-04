---
sidebar_position: 3
title: "Ajustement manuel du squelette"
---

<a id="manual_skeleton"></a>

# Ajustement manuel du squelette
L'ajustement manuel du squelette s'adresse principalement aux utilisateurs qui ont des exigences plus élevées en matière d'effets, dans le but de faire en sorte que le squelette corresponde étroitement à leur propre corps pour de meilleurs résultats globaux (en particulier pour les utilisateurs de PC).

Dans les scénarios PC, si vous visualisez directement l'effet de prévisualisation, l'ajustement à votre taille corporelle réelle donne de meilleurs résultats. En cas d'utilisation dans d'autres logiciels, il est recommandé de télécharger le squelette. Si le squelette réel téléchargé correspond étroitement au vôtre, l'effet sera meilleur.

Dans les scénarios VR, en particulier pour les utilisateurs qui dansent, l'ajustement du squelette pour qu'il corresponde à votre propre corps donne de meilleurs résultats. Dans d'autres situations, comme le désir de ressembler à votre propre posture dans des poses assises ou statiques, un squelette cible plus proche est préférable, mais l'effet dynamique peut relativement se détériorer ! L'état optimal est lorsque le squelette du personnage virtuel et le squelette de la personne réelle sont cohérents !

### Impact d'un squelette incohérent avec le vôtre
Par exemple : Si le squelette qui pilote le personnage a des bras visiblement plus longs, en supposant que les mains du personnage virtuel atteignent la position du genou, alors lorsque les paumes de la personne réelle sont jointes, si le personnage virtuel doit maintenir la même posture que la personne réelle, les positions des paumes gauche et droite se chevaucheront considérablement.

Pour les utilisateurs VR, si le squelette est incohérent avec le leur, plus l'amplitude des mouvements est grande et plus la durée est longue, plus il est facile de dévier. Un exemple extrême est si la hauteur de la jambe du personnage VR occupe les 9/10 de tout le corps, et que le squelette de ce personnage est téléchargé dans rebocap, alors pour empêcher les pieds de glisser et que la hauteur du personnage reste cohérente avec la réalité, si la personne réelle fait un pas de 60 cm vers la droite, le personnage virtuel pourrait faire un pas de plus de 100 cm (le squelette virtuel est beaucoup plus long que la personne réelle). Si la VR utilise le squelette de la personne réelle, mais que VRChat utilise ce personnage aux longues jambes, le problème est que l'angle de mouvement des jambes du personnage virtuel est beaucoup plus petit que l'angle de mouvement des jambes de la personne réelle. En VR, le positionnement repose sur la position du tracker pour déduire les angles des articulations.

### VR Auto Height
Effectif uniquement en mode VR, [cliquez ici pour voir la fonction spécifique](./connect#vr_auto_height)

### Comment ajuster le squelette

<img src="/img/skeleton_adjust-en.png" alt="Manual Skeleton Adjustment Panel" />

- **Ajustement clé du squelette du torse**

1. Pour les utilisateurs qui ne souhaitent pas ajuster soigneusement le squelette, le squelette par défaut est un squelette humain standard avec des dimensions moyennes. Ajustez le curseur marqué `1` dans la figure ci-dessous, qui est le rapport d'échelle de hauteur. Vous pouvez utiliser les boutons gauche et droit pour un réglage fin, et l'effet global ne sera pas trop mauvais (les proportions de chaque articulation ne changeront pas en conséquence).
2. Pour les utilisateurs qui souhaitent ajuster le squelette pour qu'il corresponde au leur, vous pouvez vous référer à la figure ci-dessous et l'ajuster de bas en haut. Le côté droit montre les positions clés des nœuds du squelette du personnage. Vous pouvez ajuster de bas en haut en fonction des hauteurs de nœuds calculées. Vous pouvez utiliser un mètre ruban pour mesurer la hauteur de chaque articulation par rapport au corps en position debout et ajuster les longueurs de squelette 2~8 en fonction des informations de hauteur.

   > <img src="/img/skeleton_position-en.png" alt="Torso Adjustment" />
    
3. Pour les utilisateurs VR, si vous souhaitez ajuster le squelette pour qu'il corresponde à la réalité, vous pouvez vous référer au point 2 ci-dessus pour l'ajustement. Si vous souhaitez vous ajuster plus près du personnage virtuel (n'activez pas le mode VRC), chaque point virtuel se trouve à la hauteur moyenne du squelette. Ajustez en fonction de ces informations. Bien sûr, vous pouvez également télécharger un squelette de modèle vous-même [bien qu'il n'y ait actuellement aucune capacité de réglage fin basée sur les squelettes téléchargés].

- **Autres ajustements du squelette**

   D'autres ajustements du squelette n'affecteront pas la hauteur. Reportez-vous principalement à la signification littérale sur le côté gauche de chaque ajustement. Il y a trois points à noter :
    * Marqué comme `9`, la profondeur du casque VR, l'ajustement doit être basé sur le port du casque. Le meilleur état est lorsque la poitrine bouge le moins en hochant la tête.
    * Marqué comme `11`, l'espacement des jambes, cela fait référence à l'espacement des articulations de la racine de la jambe supérieure. Si le personnage maintient un angle de 90 degrés avec le sol, cela peut être considéré comme l'espacement médian des jambes à ce moment.
    * Marqué comme `12`, la longueur du pied, il est recommandé que la longueur du pied soit plus petite que la réalité car l'articulation de l'orteil se pliera en réalité, mais actuellement rebocap n'a pas cette articulation, il est donc généralement recommandé de mesurer la distance du pli au talon.

<a id="skeleton_not_valid"></a>

### L'ajustement manuel du squelette n'a aucun effet
> Veuillez vérifier si l'importation de squelette a été appliquée.

<a id="skeleton_import"></a>

# Importation de squelette
<img src="/img/skeleton_import-en.png" alt="Skeleton Import Panel" />

### Quand utiliser l'importation de squelette

Pour les utilisateurs utilisant le protocole VMC et les utilisateurs de Blender, il est recommandé d'utiliser l'importation de squelette. Pour les utilisateurs de Reborn, Unity et UE, le SDK enregistrera automatiquement le squelette et, généralement, aucune importation secondaire n'est nécessaire.

Pour les utilisateurs VR, si vous voulez ressembler davantage au personnage virtuel cible dans un état statique sans tenir compte des effets dynamiques, vous pouvez utiliser l'importation de squelette. (Bien sûr, si le squelette actuel du personnage est proche du vôtre, vous pouvez également l'importer et l'effet dynamique sera relativement meilleur). En VR, l'importation d'un squelette mettra à l'échelle l'ensemble du squelette en fonction de la hauteur.

### Avantages de l'importation de squelette

Les utilisateurs non-VR qui importent des squelettes ne connaîtront pas de glissement de pied, mais si le squelette importé diffère trop du leur, cela peut facilement conduire à un changement de jambe non naturel pendant la marche.

### Comment importer des squelettes
Actuellement, deux formats sont pris en charge pour l'importation : une importation de personnage au format général `VRM` et un fichier de format de squelette `.rebo_skeleton` exporté de Blender. Pour les autres formats, veuillez les importer vous-même dans Blender, puis utiliser le plugin Blender rebocap pour exporter. Pour une utilisation spécifique du plugin Blender, [veuillez vous référer ici](../../plugins/blender).

### Analyse des informations de squelette d'importation

Analyser en fonction de la longueur de chaque articulation. Il est important de noter que la hauteur totale du modèle est estimée en multipliant la hauteur du nœud du cou (qui peut généralement être considérée comme la hauteur de l'épaule) par un coefficient.

Si vous importez un squelette .rebo_skeleton, vous recevrez peut-être un message : Les données du pied ne sont pas configurées, les informations sur le pied du modèle standard seront utilisées. Voici une introduction et une explication du principe :
> Les données de pied sont principalement utilisées pour détecter les points de positionnement du pied (des points spécifiques peuvent être trouvés dans la documentation d'exportation du plugin Blender). Par exemple, si vous marchez sur la pointe des pieds, un point d'orteil virtuel ici sera utilisé pour contacter le sol. Si vous téléchargez un personnage, il est préférable d'utiliser la position d'orteil en mesh du personnage téléchargé ; sinon, cela peut amener les orteils à être suspendus ou sous le sol. Cependant, cet impact est généralement faible. Si la proportion de la longueur du pied du personnage varie considérablement et que vous souhaitez une meilleure performance du pied, vous pouvez ajuster ces points en détail lors de l'exportation depuis Blender.


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>