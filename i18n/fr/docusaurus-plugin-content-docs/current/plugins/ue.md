---
sidebar_position: 3
title: "Téléchargement du Plugin UE"
---
# Téléchargement du Plugin UE

Ci-dessous se trouvent les liens de téléchargement. Pour le développement du code source UE, vous pouvez le compiler vous-même. Actuellement, le plugin n'est applicable qu'à la version `UE5`.

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin.zip">code source du plugin ue</a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_51_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_52.zip">pré-construction du plugin ue 5.1 </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_52_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_52.zip">pré-construction du plugin ue 5.2 </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_53_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_53.zip">pré-construction du plugin ue 5.3 </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_54_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_54.zip">pré-construction du plugin ue 5.4 </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_55_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_55.zip">pré-construction du plugin ue 5.5 </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_56_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_56.zip">pré-construction du plugin ue 5.6 </a>


# Instructions d'Utilisation de UE

1. **Créer un nouveau projet dans UE**

   Les projets Blueprint et C++ sont acceptables. Si vous avez besoin de développer davantage le plugin, vous devez créer un projet `C++`, importer le personnage (la pose par défaut du personnage doit être `T-Pose`, pas `A-Pose`, sinon les performances du bras seront anormales), puis ouvrir le dossier du projet, créer un nouveau dossier `Plugins`, puis placer `rebocap_unreal_engine_plugin` dans `Plugins`. Par exemple, si vous créez un projet `testV3`, la structure globale des répertoires est la suivante :

    <div align="center">
    <img src="/img/ue_plugin/ue1.png" alt="pic_left" width="80%" />
    </div>

2. **Rouvrir UE et il compilera automatiquement [le code source est publié, il devrait donc être compatible avec toutes les versions]**

    > Lors du développement et du débogage ultérieurs du plugin, vous pouvez utiliser Rider pour ouvrir directement `[nom].uproject` pour le développement et un débogage facile.
    > 
    > Vous pouvez utiliser Rider pour compiler et vérifier les erreurs de compilation. Si vous utilisez UE pour compiler automatiquement et que des erreurs se produisent, veuillez vérifier `Saved/Logs/[nom].Log`. Le `Log` généré par `UE` a généralement des problèmes d'encodage en chinois, et vous devrez peut-être ajuster l'encodage du système en `UTF-8` pour le visualiser correctement.

3. **Étapes de Liaison du Squelette**

    - Cliquez sur le composant personnage Skeleton Mesh, faites un clic droit pour créer un nouveau plan d'animation (animation blueprint), et double-cliquez pour éditer le plan d'animation. [Si ce n'est pas clair, il est recommandé de regarder la vidéo]
    - Faites un clic droit pour rechercher `Rebocap`, sélectionnez `Rebocap Body Pose` et créez un nœud, et connectez le petit personnage sur le côté droit du nœud au `Result` de la pose de sortie.
    - Dans le coin inférieur gauche de la page d'édition du plan, cliquez sur le signe plus pour créer une nouvelle variable. Le type de variable doit être recherché, recherchez `Rebocap`, sélectionnez `RebocapMapData`, référence de classe, puis faites glisser la variable dans le nœud `RetargetAsset` qui vient d'être créé dans le plan, et un nœud de variable sera automatiquement généré. Cliquez ensuite sur le bouton de compilation dans le coin supérieur gauche.
    - Cliquez sur le nœud de variable nouvellement créé, puis dans la valeur par défaut sur la droite, cliquez sur le signe plus pour créer un nouvel actif `Map`, qui passera automatiquement à une nouvelle page. Sur la nouvelle page, l'utilisateur doit remplir lui-même le mappage du squelette. Remarque : il est recommandé de remplir les 24 nœuds, vous pouvez remplir selon les noms de squelette de `Avatar`.
         > Les noms de squelettes peuvent être sélectionnés automatiquement en cliquant sur la première personne squelette bleu clair dans la barre supérieure de la page du plan pour voir les points correspondants de chaque squelette. Les 24 nœuds de `Rebocap` sont des points de squelette humain standard, et les noms de squelette dans `Rebocap` sont nommés d'après le point de départ de l'os du squelette. Par exemple, dans `VRM`, l'os nommé `LeftUpperLeg` commence à la hanche, donc dans `Rebocap` il est nommé `L_Hip`, le point de départ de `LeftFoot` est la cheville, donc le nom correspondant est `L_Ankle`, et `L_Foot` dans `Rebocap` correspond à la zone des orteils. Dans le système de nommage de l'UE, on l'appelle généralement `ball`.
         >
      > `L Collar` le squelette de l'épaule gauche
      > 
      > `L Shoulder` le squelette du bras supérieur gauche
      > 
      > `L Elbow` le squelette du bras inférieur gauche
      > 
      > `L Wrist` le squelette de la paume de la main gauche
      > 
      > `L Hand` le squelette du majeur gauche [ne sera pas piloté]
      > 
      > S'il y a de nombreux squelettes, vous pouvez choisir des squelettes appropriés pour le mappage. Par exemple, s'il y a 6 colonnes vertébrales, vous pouvez en choisir trois alternativement.
      
   - Retournez à la page de plan précédemment ouverte (le mappage de squelette sélectionné doit être enregistré et compilé pour prendre effet), et définissez la valeur du nœud de variable sur le nouvel actif `Map` créé.
   - Compilez à nouveau et vérifiez les `Warnings`. En général, il ne devrait y avoir que 3 `Warnings`. S'il y a une erreur dans un `map` de squelette, un `warning` indiquera qu'un certain os n'a pas été trouvé.
   - Fermez la fenêtre d'édition du plan d'animation, cliquez sur le menu supérieur `Window->Virtual Production->Live Link`, puis sélectionnez `Source->Rebocap Source->conn` [`port` est le numéro de port, si le numéro de port de diffusion dans `Rebocap` est modifié, il doit être modifié ici]. Si le client `Rebocap` est ouvert, `connect` sera à l'état `ok` ; sinon, il sera à l'état `bad`. De plus, l'utilisateur ne commencera à diffuser des données qu'après la calibration du mouvement.

   <div align="center">
   <img src="/img/ue_plugin/ue2.png" alt="pic_left" width="80%" />
   <img src="/img/ue_plugin/ue3.png" alt="pic_left" width="80%" />
   </div>

4. **Description du Code**

   Le code principal lié au contrôle du mouvement se trouve dans `Source\rebocap\Private\rebocap_pose_node.cpp`, tandis que d'autres codes périphériques liés incluent les appels `dll` et `livelink`. La fonction `Init_Foot_Vertices_And_SkeletalData` est utilisée pour obtenir la position par défaut du squelette et les points `vert` du personnage, calculant six points sur la plante des deux pieds pour le contact avec le sol [6 points pour chaque pied]. Comme cela est calculé automatiquement, cela peut ne pas être assez précis ; les utilisateurs peuvent trouver les six points sur la plante de leurs pieds et les transmettre pour potentiellement plus de précision.
   
   PS : Des pointures de pieds plus grandes peuvent faire rebondir le personnage de haut en bas. Pour un exemple extrême, si un personnage a des pieds de 2 mètres de long mais ne mesure que 2 mètres de haut, lorsqu'il marche sur la pointe des pieds et atterrit, s'il doit garder ses orteils en contact avec le sol, le personnage va certainement osciller de haut en bas.

5. **Instructions d'Empaquetage**

   - Développeurs
      > Pour les développeurs qui doivent empaqueter, vous pouvez télécharger la dernière version du plugin (les versions précédentes ne peuvent pas s'exécuter après l'empaquetage). Le mode `runtime` a ajouté la gestion de la connexion `Livelink`. Vous pouvez vous référer aux méthodes `ConnectLiveLink` et `DisconnectLiveLink` dans le fichier `Plugins/rebocap_unreal_engine_plugin/Source/rebocap_runtime/Private/RebocapLivelinkManagerDemoWidget.cpp` pour la mise en œuvre. Si vous devez désactiver l'interface utilisateur intégrée du plugin, vous pouvez modifier `Plugins/rebocap_unreal_engine_plugin/Source/rebocap_runtime/rebocap_runtime.Build.cs`, commenter la définition de macro `USE_REBOCAP_LIVELINK_MANAGER_DEMO`, et compiler vous-même. Il est conseillé aux développeurs qui placent le plugin dans leurs propres projets d'ajouter eux-mêmes la gestion de l'interface utilisateur pour les connexions `livelink`.
   - Utilisateurs de Blueprint
      Des nœuds de Blueprint ont été ajoutés pour gérer `Livelink`, avec des noms de nœuds : `Connect to Rebocap Livelink Source`, `Disconnect to Rebocap Livelink Source`
      <img src="/img/ue_plugin/ue4.png" alt="pic_left" width="80%" />

**Remarque** :
1. Si vous utilisez la connexion `livelink` dans `Editor`, cela peut entraîner l'occupation du canal `livelink`, entraînant un échec de connexion réussie en mode `game`. Il est recommandé de redémarrer `Editor` et d'essayer à nouveau.
2. Pour le mode `runtime` (c'est-à-dire `standalone ou game mode`, qui s'exécute après l'empaquetage), étant donné qu'une méthode pour obtenir des sommets de maillage (mesh) en mode `runtime` n'a pas encore été trouvée, l'enregistrement squelettique automatique n'inclut pas les semelles après l'empaquetage, et les performances des semelles seront légèrement pires qu'en mode `Editor`. Ce problème sera résolu à l'avenir.


### Démonstration d'Opération Vidéo
Il n'y a pas de son ici, pour un usage temporaire, plus seront ajoutés plus tard.

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/ue_plugin/ue_user_guide.mp4" type="video/mp4" />
</video>
</div>

### Meta Human (ou personnage Apose par défaut) modifié en TPose (conversion APose en TPose)

> Remarque : La pose en A doit correspondre à la norme officielle ; sinon, il est recommandé d'ajuster manuellement les angles vous-même. Convertissez l'Apose en un fichier d'angle Tpose temporaire et enregistrez-le. Pour des détails spécifiques, référez-vous au tutoriel à l'intérieur du fichier compressé ci-dessous.

<a href="/img/files/metahuman_change_tpose.zip" target="_blank" download="ue_ht_tpose.zip">Télécharger</a>


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>