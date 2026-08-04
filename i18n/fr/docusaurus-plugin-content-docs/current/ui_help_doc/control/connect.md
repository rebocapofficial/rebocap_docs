---
sidebar_position: 1
title: "Panneau de Statut"
---
Le panneau est divisé en quatre sous-panneaux. Le panneau `PC VR` s'affiche en fonction de la sélection :

- Statut
> Utilisé pour connecter le récepteur et afficher l'état de connexion du récepteur.

- Calibration Générale
> Utilisé pour la calibration du mouvement et la configuration des paramètres clés lors de la calibration du mouvement.

- PC
> Utilisé pour la configuration des paramètres communs et le contrôle dans la capture de mouvement générale sur PC.

- VR
> Utilisé pour la configuration des paramètres communs et le contrôle dans la capture de mouvement avec SteamVR.

<a id="status"></a>

# Panneau de Statut
<img src="/img/connect_status-en.png" alt="Status Panel" />

1. Affichage du Statut

    Indique le statut de la connexion ; l'icône est verte lorsque la connexion est établie.

2. Bouton Connecter

    La police est grise lorsqu'il n'est pas possible de se connecter, indiquant que le récepteur n'est pas inséré. La police est blanche lorsqu'il est possible de se connecter. Si vous rencontrez des problèmes de connexion, [veuillez vous référer ici](../../tutorial/connect_and_use#how_to_solve_cannot_connect).

3. Bouton Arrêt

    Cliquez pour éteindre tout. Pour éteindre un capteur spécifique, ouvrez les détails du capteur pour l'éteindre ([voir ici](../info#close_single_tracker)), ou placez-le dans la boîte de charge pour l'éteindre ([voir ici](../../tutorial/hardware_check#hardware_button_instroction)).

4. Commutateur de Mode de Capture de Mouvement, basculez en fonction de votre scénario d'utilisation

    Seuls les utilisateurs de SteamVR doivent passer en mode VR. Pour les scénarios classiques tels que l'enregistrement d'animations ou la diffusion en direct non VR, passez en mode PC. Notez que si vous passez en mode VR et que la VR n'est pas connectée, cela repassera automatiquement en mode PC.

    Si la VR ne peut pas se connecter, [veuillez vous référer ici](../../third_party_software_access/steamvr/README#vr_cannot_connect).

5. Commutateur de Journal

    En mode de prévisualisation 3D, le commutateur est disponible. Les journaux ne sont pas affichés par défaut. L'icône sur la droite efface les journaux. Si [la prévisualisation 3D est fermée](../view#how_to_close_3d_preview), les journaux sont affichés par défaut et ne peuvent pas être fermés.

6. Bouton de Document d'Aide

7. Commutateur de Paramètres Avancés  
   Une fois activé, toutes les fonctions avancées seront affichées, y compris : opérations d'exportation et d'importation de configuration, remplacement des capteurs de pied par des capteurs d'épaule, fonctionnalité de double tap sur le capteur, sortie des capacités du tracker virtuel SteamVR côté `PC`, modification du canal de communication, puissance de transmission du signal, réglage de la résistance magnétique, etc. **Avant d'utiliser ces fonctionnalités, assurez-vous de lire la documentation d'aide correspondante !!!**

8. Exporter, Sauvegarder, et Restaurer les Paramètres par Défaut pour Toutes les Configurations  
   Fonction avancée, procédez avec prudence. Il est recommandé de sauvegarder les paramètres actuels avant d'utiliser cette fonction !  

<a id="calibrate"></a>

# Panneau de Calibration Générale
<img src="/img/connect_calibrate-en.png" alt="Calibration Panel" />

1. **Bouton de Calibration**
   
   La calibration générale nécessite de prendre trois poses : Pose en A (A-Pose), Pose en S (S-Pose), Pose en T (T-Pose). Pour des détails sur les bases du mouvement et la calibration, [veuillez vous référer ici](../../tutorial/connect_and_use#pose_calibration).
   
   Si la calibration échoue, les raisons possibles incluent :
    * Le port n'est pas conforme au mode de port, [veuillez vous référer ici](../../tutorial/instroction_for_straps#follow_mode).
    * Remplacement accidentel de points, [veuillez vous référer ici](../remap#tracker_replace).
    * Problèmes de pilote USB, [veuillez vous référer ici](../../tutorial/connect_and_use#how_to_solve_cannot_connect).

2. **Bouton de Calibration Avancée**

   Par rapport au bouton de calibration, cela ajoute la Pose en B (B-Pose), principalement pour la calibration de l'angle de lacet (yaw) de la tête, de la poitrine et des nœuds de la taille. Les autres fonctions sont identiques à `Calibration`.

3. **Commutateur de Mode Six-Axes**

   Si l'environnement magnétique de l'utilisateur est mauvais, le mode six-axes peut être activé. Avant d'activer le mode six-axes, il est recommandé de calibrer le gyroscope. Le mode six-axes signifie ne pas utiliser les données du capteur magnétomètre, évitant ainsi d'être affecté par un environnement magnétique, mais il peut provoquer une dérive du gyroscope, se manifestant par un écart de l'angle de lacet lors de longues périodes d'utilisation.
   
   ### Manifestation de l'Écart de l'Angle de Lacet (Inclinaison de l'Angle de Lacet) {#head_angle_slant_behavior}
      
      * S'incliner en position debout, comme pour la poitrine, entraîne une auto-rotation.
      * S'incliner vers l'avant entraîne une flexion vers l'avant sur le côté au lieu d'être droit devant.
      * En étant couché, si les jambes sont alignées avec le corps, l'inclinaison signifie que les jambes forment un angle horizontal avec le corps, comme les deux jambes inclinées vers la droite.
   
   Pour l'identification de l'environnement magnétique, [veuillez vous référer ici](../../QA/magnet).

4. **Commutateur de Mode Anti-Magnétique**

   - Pour les situations où des points individuels dans l'environnement du champ magnétique sont mauvais, le mode anti-magnétique peut être activé.
   - Si vous voulez que le capteur suive plus rapidement lorsque le corps balance légèrement, le mode anti-magnétique peut être activé.
     > Par exemple, en cas de balancement gauche et droit, le mode anti-magnétique suivra plus rapidement que le mode non anti-magnétique. Le mode non anti-magnétique suit plus lentement sous un léger balancement mais n'est pas affecté de manière significative sous un balancement important.
   
:::info Quand désactiver le mode anti-magnétique


* Pour les utilisateurs qui dansent vigoureusement, il est recommandé de désactiver le mode anti-magnétique et de ne pas utiliser le mode 6 axes. Il est conseillé aux utilisateurs de danse de performer dans un bon environnement magnétique.

&emsp;&emsp;&emsp;&emsp;Bien sûr, à l'avenir, nous pourrions également publier une version professionnelle du capteur avec de meilleures performances gyroscopiques, intégrant potentiellement un mode de danse vigoureuse sans utiliser de magnétomètre. Restez à l'écoute.
* Si le champ magnétique global est très chaotique, comme à proximité de transformateurs, ou si la pièce a de grands haut-parleurs et que la plage de radiation du champ magnétique est large, ou utilisé sur un lit à ressorts en fer, il est recommandé d'activer le mode 6 axes.

:::


   L'état du commutateur anti-magnétique est mémorisé par le tracker, ce qui signifie qu'à chaque fois qu'il est activé et désactivé, le résultat est stocké dans le tracker, et non dans la configuration du logiciel.

5. **Commutateur de Filtre**

   Utilisé pour lisser les secousses de mouvement. Il est généralement recommandé de l'activer. Si vous trouvez qu'une certaine partie tremble toujours, vérifiez les éléments suivants :
      * Tout d'abord, vérifiez si le port provoque des secousses, comme le tracker suspendu
      * Vérifiez le niveau anti-magnétique, généralement recommandé à 12. Si des secousses se produisent, ajustez à 12 et testez à nouveau. Pour l'ajustement, [veuillez vous référer ici](config#update_reject_mag_and_strenth)

6. **Commutateur de Calibration Symétrique**

   Ce commutateur n'est efficace que pendant la calibration, principalement pour éliminer les erreurs de mesure de l'angle de lacet magnétique (la mesure de l'angle de lacet magnétique est basée sur des actions de calibration, qui présentent des erreurs, et le champ magnétique lui-même fluctue, causant des erreurs de mesure). Il est généralement recommandé de l'activer [le mode 6 axes le désactivera automatiquement]. Sa fonction spécifique est de moyenner les angles de lacet des trackers gauche et droit à la même position horizontale lors de la calibration. Par exemple, si la direction actuelle en position debout de la jambe supérieure gauche mesure un angle de lacet de 10 degrés et que la jambe supérieure droite mesure 20 degrés, une moyenne de 15 degrés sera utilisée.

   Ce n'est que lorsque les deux jambes sont à la même hauteur horizontale et qu'il y a une différence significative dans la direction du cap du champ magnétique qu'il doit être désactivé. De manière générale, s'il y a une grande différence de champ magnétique à la même hauteur, cela indique un mauvais environnement magnétique, et il est recommandé d'utiliser 6 axes.
   
   Pour l'identification de l'environnement magnétique, [veuillez vous référer ici](../../QA/magnet)

7. **Bouton de Réinitialisation**
   
   Réinitialise les paramètres du panneau actuel aux paramètres par défaut ! Les fonctions des panneaux suivants sont identiques et ne seront pas répétées !

8. **Bouton de Document d'Aide**

9. **IK au Sol (Ground IK)**
   > Utilisé pour ajuster le déséquilibre des deux pieds, par exemple lorsqu'on s'assoit, un pied est au sol et l'autre est à 2 cm du sol. Il peut également atténuer le problème d'oscillation verticale lors du processus de basculement des pieds.

10. **Remplacer les Pieds par les Épaules**
   > Paramètre avancé, une fois activé, les pieds seront automatiquement remplacés par les épaules, le pied gauche correspondant à l'épaule gauche et le pied droit à l'épaule droite. Après l'avoir activé, vous devez activer le `Moteur IA`.

11. **Configurer quels points à six axes activent la fonctionnalité six-axes**
   > En mode six axes par défaut, tous les points ont la fonctionnalité six axes activée. Si vous décochez un point, ce point utilisera le mode non-six-axes.

<a id="cal_pc_panel"></a>

# Panneau PC
Ces paramètres n'affectent pas les utilisateurs en mode VR, donc les utilisateurs VR peuvent ignorer cette section.

<img src="/img/connect_pc.png" alt="PC Panel" />

1. **Mise en Tampon de Trame (Frame Buffering)**

   Par défaut, le mode PC conserve deux trames en mémoire tampon (~34 ms). La mise en tampon améliore la stabilité — par exemple, cela peut réduire la dérive. Si vous ne capturez que le haut du corps, vous pouvez la désactiver pour un suivi plus en temps réel. La mise en tampon de trame est désactivée automatiquement lorsque le `Moteur IA` est activé.

2. **Mode Miroir**

   Miroir gauche-droite, utile pour les streamers ; fonctionne comme un miroir, retournant l'image horizontalement.

3. **Moteur IA**
   > Après activation, le déplacement global du personnage et le contact des pieds sont décidés par un modèle `IA` au lieu des algorithmes traditionnels et des heuristiques.
   > La version PC du moteur IA fournit deux modèles : l'un nécessitant des capteurs sur les deux pieds (`avec pied` / `with foot`) et l'autre fonctionnant sans capteurs sur les pieds (`sans pied` / `no foot`).
   > Si vous sélectionnez le modèle `avec pied` alors qu'aucun capteur de pied n'est présent, il repassera automatiquement à `sans pied`, tandis que le modèle `sans pied` fonctionne même lorsque les capteurs de pied sont disponibles.

4. **Position, Orientation, et Pose**

   - L'origine de la capture de mouvement inertielle peut dériver avec le temps. Vous pouvez réinitialiser l'origine (c'est-à-dire la position initiale) directement et aussi définir un intervalle de réinitialisation automatique. Le défaut est de 0 minutes, signifiant aucune réinitialisation automatique. Si vous le définissez sur `n` minutes, le déplacement du personnage sera réinitialisé toutes les `n` minutes.
   
   - Vous pouvez verrouiller le mouvement du personnage dans le plan horizontal et/ou son mouvement sur l'axe vertical. Les streamers ont souvent besoin de ces deux fonctionnalités.
   
   - Vous pouvez ajuster manuellement la position de référence et la direction de face du personnage. Le défaut est l'origine. C'est utile pour l'animation ou la diffusion — par exemple, si la pièce d'un streamer est trop petite pour faire face à l'écran en `T-Pose`, il peut d'abord calibrer puis changer d'orientation.
   - La position est dans l'ordre `x y z` utilisant un système de coordonnées main droite, représentant le déplacement global. L'axe `x` positif pointe vers la droite de l'écran, le `y` positif pointe vers le haut, et le `z` positif pointe hors de l'écran vers l'utilisateur. La valeur maximale est de 99,9 m. L'angle représente la direction de face du personnage.
   
   - Le gel de la Pose (Pose Freeze) est conçu pour les streamers qui doivent maintenir une pose fixe pour gérer des tâches diverses ou éviter d'exposer leur vraie posture. Une fois activée, la pose est figée au moment où vous actionnez le commutateur ; la désactiver restaure la capture de mouvement en temps réel.

5. **Sortie Protocole Externe**

   **Sortie VMC**
   Les utilisateurs du protocole VMC en auront besoin. Si une application tierce se connecte via VMC, activez la sortie VMC.
   - Vous pouvez modifier le numéro de port après avoir désactivé la sortie, puis l'activer à nouveau.
   - La mise à l'échelle VMC sert principalement à adapter les squelettes. Si le squelette piloté dans rebocap ne correspond pas au squelette cible, vous pourriez observer des pieds qui glissent, des pieds flottants, ou des pieds en dessous du sol. Ajuster l'échelle ici peut atténuer cela. Cependant, si vous utilisez un modèle VRM, nous recommandons fortement de télécharger le modèle VRM et de garder cette valeur à 1.0. Si vous utilisez d'autres modèles et souhaitez de meilleurs résultats, nous suggérons également de télécharger le squelette — le squelette peut être exporté via le plugin Blender ; pour plus de détails, veuillez consulter [Utilisation du Plugin Blender](../../plugins/blender#skeleton_export).

   **Sortie VR** (Avancé)
   > Lorsqu'elle est activée et que SteamVR est connecté, les trackers virtuels sont automatiquement envoyés à SteamVR. Si vous devez modifier les nœuds de sortie des trackers, basculez temporairement vers le panneau `VR`, ajustez les paramètres de sortie VR, puis revenez. Les positions émises ici sont les points de suivi sur le squelette virtuel actuel et ne sont pas affectées par le casque HMD.
   > La communauté a fourni des instructions pour utiliser SteamVR sans casque HMD. L'équipe officielle n'assume aucune responsabilité quant aux conséquences. Disponible en chinois uniquement ; veuillez utiliser la fonction de traduction de votre navigateur pour d'autres langues : https://forum.rebocap.site/t/vmt-rebocap/240

6. **Enregistrement et Lecture Hors Ligne**
   
   **Enregistrement**
   > Flux de travail de base : Démarrer l'enregistrement → Arrêter l'enregistrement → Exporter le mouvement. Trois formats peuvent être exportés ici : fbx, bvh, et dae. Le support de l'animation `MMD` est prévu pour l'avenir.
   > Parmi eux, fbx6 est l'ancien format FBX ; de nombreux programmes modernes ne le supportent plus.
   > 
   > Le squelette FBX exporté est compatible avec `Mixamo` et peut être importé directement dans `Blender` et d'autres logiciels 3D. Le mouvement de la racine (root motion) et l'ajout d'une `T-Pose` sont optionnels. Par défaut, la capture de mouvement déplace le nœud de la hanche ; avec le mouvement de la racine activé, c'est le nœud racine qui bouge à la place. Si vous souhaitez que l'animation commence avec la `T-Pose` par défaut, activez cette option.
   > 
   > Si vous devez créer des animations avec le FBX, assurez-vous d'utiliser les données de rotation plutôt que les directions d'os absolues contenues dans le FBX exporté. Nous inviterons par la suite des membres de la communauté à enregistrer des tutoriels sur l'utilisation des données mocap pour faire des animations.

   **Lecture Hors Ligne**
   > Objectif : Charger et lire des fichiers d'enregistrement bruts `.rebo_anim` exportés hors ligne
   > Utilisation : Cliquez sur Charger Hors Ligne (Offline Load), sélectionnez le fichier d'enregistrement brut, et la lecture commence automatiquement. Il se comporte de la même manière que le mode en ligne. Avant le chargement, vous pouvez changer de squelette utilisateur, choisir d'utiliser l'`IK` ou non, d'activer ou non le `Moteur IA`, etc., et les changements prennent effet immédiatement.
   > La vitesse de lecture est réglable, mais cela changera le taux de trames de sortie du SDK ; il n'y a actuellement pas de stratégie de rééchantillonnage ou d'interpolation. Vous pouvez mettre en pause, lire, boucler, etc. Après la fin du clip, l'étiquette du bouton de l'état de lecture n'est pas mise à jour — appuyez deux fois sur le bouton de lecture pour rejouer.
   > Les enregistrements sont à 60 fps, vous pouvez donc calculer le numéro de trame cible par durée — par exemple, pour sauter à 10,5 s, sautez à la trame 630. Modifier le numéro de trame effectue une recherche immédiate.

:::info Utilisation des données par défaut officielles

Si les utilisateurs veulent savoir si leur propre logiciel peut être pris en charge, ou veulent simplement vérifier l'effet, ils peuvent utiliser les données hors ligne. Au stade actuel, les données hors ligne sont une vidéo de danse ; il est recommandé de télécharger le squelette à l'avance, de basculer sur le `Moteur IA`, d'utiliser le mode `avec pied` (with foot), et d'activer l'`IK au sol` (Ground IK).
Puisque le performeur portait le tracker sur l'estomac au lieu de la hanche pendant l'enregistrement, il est recommandé que dans les paramètres de capture de mouvement, sous les réglages `IK`, la flexibilité de la taille soit réglée sur 1,3, le poids IK sur 1,4, et la flexion des jambes sur environ 3,5.

:::


7. **Calibration à Double-Frappe – Poitrine**
    
    Une fois cette option activée, frapper deux fois sur le capteur peut déclencher la fonction. La double-frappe sur le capteur de la poitrine est utilisée pour réinitialiser l'origine.
    
    Remarque : Double-frappe signifie tapoter sur le capteur lui-même, pas appuyer deux fois sur le bouton du capteur ! Ne pas appuyer accidentellement sur le bouton ! L'intervalle entre les frappes ne doit pas dépasser 0,45 s et ne pas être inférieur à 0,2 s, et vous devez frapper avec une certaine force.

8. **Calibration à Double-Frappe – Taille**

   Une fois cette option activée, frapper deux fois sur le capteur peut déclencher la fonction. La double-frappe sur le capteur de la poitrine réinitialise l'origine, tandis que la double-frappe sur le capteur de la taille déclenche la Calibration de Mouvement.



<a id="vr_pannel"></a>

# Panneau VR
<img src="/img/connect_vr.png" alt="VR Panel" />

1. **Indicateur de l'état de connexion SteamVR**

   Si la connexion réussit, l'indicateur devient vert ; sinon il n'est pas connecté. Si la connexion échoue, veuillez vous référer à [ici](../../third_party_software_access/steamvr/README#vr_cannot_connect).

2. **Réinitialisation du Lacet (Yaw reset)**

   Lors d'une réinitialisation du lacet, assurez-vous que tout le corps n'a pas d'angle latéral ; tournez uniquement autour de l'axe latéral du corps. Par exemple, debout, restez en pose en A ; accroupi, gardez les genoux pointant droit devant ; allongé, gardez le corps en ligne droite. **À l'heure actuelle, la calibration du lacet ne prend pas effet sur les bras** ; la prise en charge des bras sera envisagée plus tard.

   Cette fonction est principalement utilisée pour recalibrer lorsque le lacet dérive. Pour la manifestation de la dérive de lacet, voir [ici](#head_angle_slant_behavior). Si vous observez toujours une dérive après la calibration, veuillez considérer les trois facteurs suivants :
      * La sangle elle-même est inclinée.
      * **La limite de la barrière de protection (guardian) n'a pas été désactivée** — désactivez la barrière de protection du casque autonome.
      * Un outil tel que VRC Toolkit a été utilisé pour modifier l'angle de lacet ; réinitialisez-le à 0.

   Le commutateur de "Saut rapide" (Quick skip) ici est principalement utilisé pour réduire le temps nécessaire à la calibration du lacet. Lorsqu'il est désactivé, une invite de compte à rebours s'affiche ; lorsqu'il est activé, aucun compte à rebours n'est affiché.

3. **Informations de position du casque**

   Affiche la position du casque en centimètres. La deuxième valeur est la hauteur, et la valeur la plus à droite est l'angle d'inclinaison (pitch) du casque.

4. **Empêcher le glissement du pied**

   Lorsque l'option d'empêcher le glissement des pieds est désactivée, le suivi du corps est entièrement dirigé par la position du casque, donc les pieds ne resteront pas fixés au sol ; le glissement des pieds est par conséquent inévitable en mode par défaut, bien que le fait de garder le squelette virtuel cohérent avec le corps réel puisse l'atténuer.

   De plus, lorsque la hauteur du pied de l'avatar est supérieure à environ 20 cm, le calcul interne bascule automatiquement vers le mode par défaut. Lorsque cette option est activée, les semelles sont collées au sol de force, ce qui produit des résultats plus naturels pour les mouvements non rapides, et est généralement recommandé pour tout, sauf pour une danse intense.

5. **IK de collision au sol**

   > Utilisé pour corriger le déséquilibre des pieds — par exemple, après s'être assis, un pied est sur le sol tandis que l'autre est à 2 cm au-dessus du sol — et pour réduire l'oscillation verticale lorsque les pieds changent de points de contact.
   
6. **Recentrage Automatique**

   Le recentrage automatique est déclenché lorsque l'utilisateur reste complètement immobile pendant environ 1 s. Le "Seuil de recentrage" se réfère à la distance entre la posture actuelle et la posture "en mode suivi" (c'est-à-dire dirigée entièrement par le casque). Lorsque la distance de tout tracker virtuel dépasse le seuil, le recentrage est déclenché. Par conséquent, si le seuil est défini très bas, le recentrage se produira fréquemment, et vous observerez de petits décalages de tracker instantanés.

   Après le recentrage, les trackers se fixent immédiatement aux positions définies par le mode de suivi. Si le résultat semble toujours erroné, passez en mode de suivi pour vérifier ; la cause peut être un angle de lacet incorrect ou une sangle inclinée.

7. **Poitrine | Taille Suivre le Casque**

    Par défaut, si l'option anti-glissement des pieds est activée, les positions de tous les nœuds sont déterminées conjointement par le casque et la plante des pieds. Après l'activation de ce commutateur, les positions des nœuds de la poitrine et de la taille sont déterminées uniquement par la position du casque.

8. **Trackers Virtuels**
   
   Contrôle quels trackers virtuels sont affichés ; vous pouvez les configurer selon vos besoins. Par exemple, les trackers de bras sont activés par défaut ; vous pouvez cliquer ici pour les désactiver. Si le mode VRC est activé, les trackers de jambe supérieure et de jambe inférieure sont fusionnés et placés au niveau du genou. Les joueurs peuvent décider de l'activer ou non en fonction de leurs propres besoins. Activer le mode VRC ne donne pas nécessairement de meilleurs résultats dans VRC ; cette option déplace principalement les trackers virtuels vers des emplacements qui correspondent mieux aux points de calcul de l'IK dans VRC, mais l'effet final dépend de nombreux facteurs, comme la correspondance entre le squelette virtuel et la personne réelle.

9. **Masquer automatiquement lors de l'arrêt**

   Masque automatiquement les capteurs qui ne sont pas en cours d'utilisation. Il existe un cas particulier : si la fonction "Fusionner les nœuds des jambes" est activée, les capteurs des pieds sont exemptés de masquage.

10. **Fusionner les nœuds des jambes**

   Fusionne les trackers virtuels de la jambe supérieure et de la jambe inférieure au niveau de l'articulation du genou. C'est également le placement de tracker recommandé par défaut dans VRC, mais cela ne produit pas nécessairement de meilleurs résultats à l'intérieur de VRC !

11. **Diagnostics de positionnement**

   Cette fonction aide à évaluer les performances de positionnement des trackers. Lorsqu'elle est activée, elle duplique un nouvel ensemble de trackers virtuels directement en face de vous ; l'unité de distance est en centimètres, et la distance peut être ajustée avec le curseur. Pour voir les trackers virtuels, il est recommandé de passer à l'environnement SteamVR par défaut ! Dans les logiciels tiers tels que Reborn ou VRC, les trackers virtuels ne sont généralement pas visibles, sauf si un mode spécial est utilisé.

12. **Hauteur du Sol Virtuel**

   Principalement utilisé pour résoudre le problème où, lorsqu'on monte sur des plates-formes plus hautes que le niveau du sol (par exemple, après avoir mis l'appareil) ou qu'on descend sur des plates-formes plus basses que le niveau du sol, le sol virtuel est toujours calculé selon la hauteur initiale du sol, ce qui entraîne de mauvais effets. Dans d'autres cas, vous pouvez également ajuster cette valeur en fonction des besoins réels. Par exemple, certains joueurs peuvent définir la hauteur du sol virtuel légèrement au-dessus du sol réel (environ 3 à 5 cm), donnant au solveur IK plus d'espace et produisant un meilleur effet global.

13. **Moteur IA**

   Après l'activation du Moteur IA, le suivi en 5 points est pris en charge : deux trackers sur les chevilles (recommandé environ 5 cm au-dessus de l'articulation de la cheville), deux trackers sur les cuisses, et un tracker sur la taille. C'est la configuration minimale requise. D'autres trackers peuvent être portés en fonction des besoins réels. Si certains trackers ne sont pas portés, le modèle d'IA prédira l'orientation des nœuds de la plante des pieds et de la poitrine.

14. **Bascule des Fonctionnalités "Locomotion sur place et Remplacement de Position"**

    Ces deux fonctionnalités sont implémentées dans le plugin rebocap en interceptant les signaux internes des contrôleurs de SteamVR. Elles n'ont aucun impact sur les outils de streaming officiels tels que `steam link` et `pico connect`, mais pour le streaming VD (VirtualDesktop), elles empêcheront VD de passer du mode contrôleur au mode de suivi des doigts. Chaque fois que cette bascule est activée ou désactivée, vous devez redémarrer SteamVR pour qu'elle prenne effet.  
    > Si cette fonction est désactivée, vous ne pourrez pas utiliser les fonctions de Locomotion sur Place ou de Remplacement de Position de Contrôleur.

15. **Zone de Configuration de la Locomotion sur Place**

    Cette fonctionnalité nécessite que la bascule "Locomotion sur place et Remplacement de Position" ci-dessus soit activée. Pendant la locomotion sur place, le plugin intercepte les données du joystick du contrôleur (vous pouvez choisir le joystick gauche ou droit) et simule l'entrée du joystick par des pas sur place, permettant au personnage dans le jeu de marcher par des pas sur place. Cela peut réduire considérablement le mal des transports causé par la locomotion via joystick (cela offre un certain niveau de tromperie corticale). Pendant le piétinement sur place, la direction de marche par défaut est tout droit ; le joystick correspondant contrôle toujours la direction de marche — par ex., vous pouvez marcher à reculons. La vitesse de pas peut être ajustée via le multiplicateur de mouvement, et votre propre vitesse de pas angulaire affecte directement la vitesse d'avancement.  
    > Par défaut, une fois que la fonction de locomotion sur place est activée, le joystick sur le contrôleur correspondant devient inactif. Cependant, nous avons ajouté un commutateur qui restaure la fonctionnalité du joystick lorsqu'aucun pas sur place n'est détecté, ce qui peut augmenter le risque de mal des transports.

16. **Calibrer l'Angle de Lacet du Bras**

    Lorsqu'elle est activée, si les nœuds des bras sont actifs, appuyer sur le bouton de calibration du lacet corrigera également l'angle de lacet des bras. Lors de la calibration, nous recommandons de placer vos bras symétriquement et naturellement le long du corps (à un angle d'environ 10 à 25 degrés de la poitrine). N'hésitez pas à expérimenter le placement de vos bras pour trouver la position de calibration qui semble la meilleure.

17. **Remplacer la Position du Contrôleur**

    Cette fonctionnalité nécessite également que la bascule "Locomotion sur place et Remplacement de Position" soit activée. Une fois activée, et avec les deux nœuds de sortie manuels activés, les points des trackers rebocap remplaceront les points de sortie des contrôleurs. Les contrôleurs doivent rester connectés pendant ce processus. Le but principal est de résoudre la perte de suivi lorsque les contrôleurs entrent dans les angles morts visuels du casque.  
    > Remarque : Pour certains contrôleurs, l'angle de lancer de rayon n'est pas aligné avec la direction du contrôleur. Dans ce cas, vous devez éditer `data/replace_controller_angle.txt` pour compenser. Par exemple, les contrôleurs `pico` nécessitent une valeur de 25 (faisant tourner le rayon vers l'avant de 25 degrés). Ajustez ceci en fonction de la direction du contrôleur en pose en T (T-pose). Après chaque modification, désactivez puis réactivez cette fonctionnalité pour que le changement prenne effet.

18. **Double-frappe Poitrine (Fonctionnalité Avancée)**

    Lorsqu'elle est activée, frapper deux fois sur le capteur de poitrine déclenche la fonction de Calibration du Lacet (Yaw).  

    Remarque : Double-frappe signifie tapoter le capteur lui-même, pas appuyer deux fois sur le bouton du capteur ! N'appuyez pas sur le bouton par erreur ! L'intervalle maximal entre les frappes est de 0,45 s et le minimum est de 0,2 s, et une certaine force est requise. Pendant le sommeil, une activation accidentelle peut se produire ; il est recommandé de désactiver cette fonctionnalité à ce moment-là.

19. **Double-frappe Taille (Fonctionnalité Avancée)**

    L'utilisation est la même que pour la Double-frappe Poitrine. Taper deux fois déclenche la fonction de Calibration de Mouvement.

<a id="vr_auto_height"></a>

##### Hauteur Auto VR
   Cette option a été déplacée vers la section Squelette et est activée par défaut. La Hauteur Auto déduit la hauteur de l'utilisateur de la hauteur du HMD. Cependant, la mesure de la hauteur du HMD est facilement affectée par l'environnement de l'utilisateur et la précision de mesure du HMD lui-même. La formule actuelle est : `hauteur = casque * 1.05`.

   En d'autres termes, regarder en haut ou en bas pendant la calibration affectera la mesure de la hauteur. En général, essayez de maintenir l'erreur de mesure à ±3 cm près. Si l'erreur est importante, envisagez de calibrer la distance entre le HMD et le sol.

:::danger Explication de l'Erreur de Mesure


De grandes erreurs de mesure de hauteur n'ont rien à voir avec l'appareil rebocap ou le logiciel rebocap lui-même. Rebocap lit simplement la hauteur signalée par le HMD et la multiplie par 1,05 pour estimer la taille de l'utilisateur. Si l'erreur est importante, elle est généralement causée par l'erreur de mesure de hauteur du HMD !!!

Les erreurs de mesure du HMD peuvent généralement être résolues en calibrant la hauteur du sol. Si l'erreur est toujours significative, cela est probablement dû à des facteurs environnementaux (les casques autonomes dépendent généralement de l'environnement capturé par leurs caméras pour la mesure). Trouver une zone relativement ouverte dans la pièce peut atténuer le problème.

:::


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>