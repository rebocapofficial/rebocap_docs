---
sidebar_position: 4
title: "Configuration du Matériel"
---
<a id="hardware_config"></a>

# Configuration du Matériel
<img src="/img/config_hardware-en.png" alt="Hardware Configuration Panel" />

<a id="firmware_update"></a>

### 1. Mise à jour du Firmware
- Version Actuelle : Le numéro de version du premier tracker allumé. Si les versions sont incohérentes, le journal affichera des informations de version de tracker différentes pendant la calibration. Si vous avez acheté avant décembre 2023 et que vous n'avez pas mis à jour le firmware, le numéro de version ici peut prêter à confusion.
- Version Disponible : Récupère le numéro de la version disponible depuis le serveur pour prévenir les problèmes avec des versions spécifiques après leur sortie, permettant aux utilisateurs de revenir en arrière. Actuellement, la version `preview` ne dispose que de la version `v4`. Cliquer sur l'icône d'actualisation à droite lancera une nouvelle récupération.
- Mettre à Jour le Firmware
    > Mettez à jour le firmware vers la version sélectionnée. Assurez-vous que les trackers connectés ont suffisamment de batterie et sont tous connectés avec succès, avec un signal à 100 % en bas à gauche (les fluctuations de qualité du signal pendant le processus de mise à jour sont normales). L'affichage de la progression de la mise à jour se trouve ci-dessous. Une fois la mise à jour terminée, toutes les lumières deviendront blanches. Si une erreur de mise à jour se produit ou si la lumière RGB n'est pas blanche après la mise à jour, vous pouvez effectuer la mise à jour à nouveau. Après la mise à jour, vous devez redémarrer le tracker pour qu'elle prenne effet. Vous pouvez redémarrer en appuyant sur le bouton du tracker ou en éteignant et en rallumant le tracker.

:::info Les mises à jour du firmware peuvent être répétées, mais il n'est pas recommandé de continuer la mise à jour si elle a déjà été effectuée avec succès.

:::


<a id="firmware_update"></a>

### 2. Mise à jour du Firmware du Récepteur
- La méthode de mise à jour et la description sont telles que mentionnées ci-dessus.

### 3. Calibration du Tracker

<a id="gyro_calibrate"></a>

#### Calibration du Gyroscope
La calibration du gyroscope est relativement simple. Après avoir allumé le tracker, placez-le de manière stationnaire sur le sol pour le calibrer. Notez qu'il doit être absolument immobile, sans vibration, par exemple en l'éloignant des boîtiers d'ordinateurs de bureau (vibrations causées par les ventilateurs du boîtier).

:::info En général, les gyroscopes ne nécessitent pas de calibration répétée. S'il y a une différence de température importante, une calibration peut être nécessaire. Il est également recommandé de calibrer lors de l'utilisation de 6 axes.

:::


<a id="magnet_calibrate"></a>

#### Calibration du Champ Magnétique
La calibration du champ magnétique est relativement fastidieuse et prend du temps. **Cependant, il est essentiel de comprendre la calibration du champ magnétique !!!!!!**

:::info Pourquoi la Calibration du Champ Magnétique est Nécessaire


L'autonomie de la batterie se dégradera avec l'utilisation, ce qui entraînera des modifications des éléments internes de la batterie. Pendant la charge, un très petit nombre de composants peuvent transporter des traces d'éléments en fer, ce qui peut également provoquer une magnétisation. Par conséquent, le champ magnétique du circuit imprimé PCB lui-même peut changer. La calibration du champ magnétique est principalement utilisée pour éliminer le champ magnétique porté par le capteur lui-même, ce qui est appelé déviation magnétique dans le document.

:::


:::info Comment Déterminer s'il y a une Déviation Magnétique (c'est-à-dire, quand la Calibration du Champ Magnétique est Nécessaire)


Vous pouvez faire pivoter le capteur en un point fixe de l'espace sur six côtés et observer la magnitude de la valeur du champ magnétique du capteur. Si la différence se situe dans une plage de 2 uT, la déviation magnétique est généralement faible, ou [la différence relative du champ magnétique est inférieure à 0,1](../info#detail_information).

**Le point de pivotement choisi doit être éloigné de toutes les sources de champs magnétiques, telles que les bracelets magnétiques, les téléphones, les ordinateurs, les casques d'écoute, les casques VR, les métaux magnétiques, etc.**

:::


Comment calibrer le champ magnétique :
  - Placez le tracker dans la boîte de chargement, **de manière intercalée, avec les contacts de charge vers le haut**. Les contacts de charge désignent les trois points métalliques jaunes sur le tracker (c'est-à-dire que le sens de placement est opposé à celui lors du chargement).
    > Un maximum de **8** peuvent être placés à la fois, et ils doivent être placés **à intervalles**, avec les **contacts de charge vers le haut**, sinon le champ magnétique porté par la boîte sera calibré dans le tracker !!!
  - Ne le placez pas sur la table pendant la calibration. **Il est recommandé de calibrer en un point fixe dans l'air**, c'est-à-dire essayez de faire pivoter la boîte de chargement autour d'un point fixe de l'espace.
    > Notez que même les tables en bois ont souvent des vis ou des clous en fer.
  - Un total de 6 côtés. Après avoir cliqué sur la calibration du champ magnétique, veillez à faire pivoter la boîte en suivant les instructions textuelles, en essayant de tourner à une vitesse uniforme. Un total de 6 côtés, avec un temps de rotation pour chaque côté d'environ 6 secondes, et environ 1 seconde pour le changement de côté. Veillez à terminer dans le délai imparti, sinon l'effet de calibration en sera affecté.
    > Dans les cas extrêmes, si seulement 3 côtés sont pivotés dans le délai imparti, l'effet global se détériorera après la calibration. Vous pouvez vous référer à la section "Comment Déterminer s'il y a une Déviation Magnétique" ci-dessus pour vérifier les résultats de la calibration.

Vous trouverez ci-dessous une vidéo de calibration que vous pouvez visualiser à l'avance. La rotation ne fait pas la distinction entre le sens horaire et anti-horaire.
<div>
<video id="video" controls preload="metadata" width="45%">
      <source id="mp4" src="/img/mag_calibrate.mp4" type="video/mp4" />
</video>
</div>

:::info Voici une vidéo de démonstration réalisée en collaboration avec des membres de la communauté. Il est recommandé de la regarder en entier pour la première calibration du champ magnétique.


[Vidéo de Démonstration de la Calibration du Champ Magnétique](https://www.youtube.com/watch?v=JXry5wZhmtc)
<iframe src="https://www.youtube.com/embed/JXry5wZhmtc" title="Rebocap Magnetic  Calibration" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

:::



<a id="change_channel"></a>

### 4. Modification du Canal de Communication
- La plupart des utilisateurs n'ont pas besoin d'utiliser ceci, car le canal de communication par défaut est suffisant pour la majorité des gens. Cela répond principalement au besoin de certains utilisateurs d'utiliser deux ensembles d'appareils simultanément dans le même espace.
    > Pour ceux ayant des exigences plus élevées, une version commerciale du logiciel sera lancée à l'avenir, ciblant principalement les entreprises et les radiodiffuseurs multiples interagissant sur la même scène. Outre les canaux de communication gratuits, elle prend en charge jusqu'à 10 appareils dans le même espace. S'il y a des besoins de personnalisation plus élevés, vous pouvez également nous contacter directement par e-mail.

- Description de la Fonction
  - Le bouton gauche est le bouton de réinitialisation du canal, qui est le canal de communication par défaut d'usine. Le côté droit offre des canaux gratuits sélectionnables, et des changements fréquents de canal ne sont pas recommandés.
  - Il est recommandé de connecter tous les capteurs avant de modifier le canal ; sinon, les trackers dont le canal n'a pas été modifié ne pourront pas correspondre au récepteur.
  - Si la correspondance échoue et que vous ne savez pas comment vous connecter, vous pouvez utiliser la boîte de chargement pour réinitialiser le canal du tracker. Le canal du récepteur peut être réinitialisé à l'aide du bouton gauche de réinitialisation du canal (si le récepteur est déjà sur le canal par défaut, le bouton gauche ne sera pas cliquable).

- Méthode pour Réinitialiser le Canal avec la Boîte de Chargement
  > Placez le tracker dans la boîte de chargement, en gardant la direction conforme à celle de la charge, puis cliquez sur le bouton de la boîte de chargement pour allumer tous les trackers. Maintenez enfoncé le bouton de la boîte de chargement pendant 8 secondes, puis relâchez. Lorsque la lumière bleue du tracker clignote, maintenez à nouveau enfoncé pendant 8 secondes et relâchez. Une lumière verte clignotante signifie que le tracker dans la boîte de chargement a réinitialisé avec succès le canal de communication.

- Si seul le récepteur ne peut pas se connecter, [veuillez vous référer ici](../../tutorial/connect_and_use#how_to_solve_cannot_connect)

### 5. Mise à jour de la Couleur RGB du Tracker
Mettre à jour la couleur `RGB` sur le tracker. Si vous souhaitez que différents trackers aient des couleurs différentes, vous pouvez les allumer un par un et les mettre à jour. L'icône de gauche est un exemple de couleur, mais en raison des différences entre les couleurs de l'écran RGB et les couleurs réelles de la lumière, c'est la couleur de la lumière RGB finale qui prévaut.


:::warning Rappel de la Consommation d'Énergie


Plus la valeur RGB est élevée, plus la lumière est vive et plus la consommation d'énergie est rapide. Plus il y a de lumières, plus la consommation d'énergie est rapide !!! Par exemple, la lumière blanche est la plus vive et consomme l'énergie le plus rapidement, ce qui se traduit par la durée de vie de la batterie la plus courte.

:::


<a id="update_reject_mag_and_strenth"></a>

### 6. Mise à jour de la Résistance Magnétique du Tracker et de la Puissance d'Émission du Signal
- La résistance magnétique est généralement recommandée d'être réglée sur 12 et de ne pas être modifiée (la plage de valeurs est de 1 à 12). D'autres valeurs peuvent causer une forte instabilité du tracker.
- La plage réglable pour la puissance d'émission est de 1 à 18, où 18 correspond à 9.1 dbm et 1 correspond à -8 dbm. À 18, la puissance d'émission est plus élevée. De manière générale, un réglage sur 1 affectera la distance de communication, mais la durée de vie de la batterie correspondante peut être prolongée de 1 à 2 heures.

<a id="system_config"></a>

# Panneau de Configuration du Système
<img src="/img/config_software-en.png" alt="System Configuration Panel" />

### 1. Diagnostic de l'Enregistrement des Données
Utilisé pour fournir des retours aux développeurs de `rebocap` avec les données chiffrées originales des actions, aidant les développeurs à diagnostiquer les problèmes sur la base des actions enregistrées et à améliorer la qualité de la capture de mouvement. Par défaut, le système commencera automatiquement à enregistrer les données après la calibration de l'action, mais elles ne seront pas sauvegardées. Les utilisateurs peuvent cliquer pour démarrer l'enregistrement, puis cliquer pour l'arrêter ; les données seront automatiquement sauvegardées dans le répertoire `<rebocap_install_dir>/data/record_data/`.

### 2. Sélection de la Langue du Système
Sélectionnez la langue ; le système choisira automatiquement la langue locale. Si elle n'est pas prise en charge, l'anglais peut être utilisé par défaut.

Remarque : Actuellement, d'autres langues sont automatiquement traduites du chinois. S'il y a des questions, des commentaires pour des améliorations peuvent être fournis sur le forum.

### 3. Couleurs du Thème
La version actuelle prend en charge les thèmes noir et blanc, le thème blanc étant toujours en cours d'amélioration, et d'autres améliorations sont prévues.

### 4. Touches de Raccourci du Système
Facilite aux utilisateurs la liaison de touches de raccourci. Actuellement, cela ne prend en charge que les opérations sous VR, avec des fonctionnalités d'enregistrement à ajouter à l'avenir.

Après avoir cliqué, il suffit d'entrer la touche de raccourci sur le clavier pour la lier. Notez qu'elle ne peut commencer que par l'une des quatre touches de fonction suivantes : `win, ctrl, shift, alt`, et prend en charge un maximum de deux combinaisons de touches de fonction, qui doivent être associées à un caractère régulier, comme `a~z`.

<a id="websocket_broadcast"></a>

### 5. Diffusion WebSocket
Tous les SDKs, plugins, etc., utilisent la diffusion WebSocket de `rebocap`. Si vous souhaitez modifier le numéro de port, vous pouvez fermer la diffusion, la modifier, puis la rouvrir.

:::danger Port Occupé


Si le port par défaut 7690 est occupé, le port ici s'incrémentera automatiquement de 1. Si vous constatez que le plugin ne peut pas se connecter, vérifiez si le numéro de port ici a changé !!!

:::


### 6. Commutateur de Rendu 3D
Utilisé pour activer ou désactiver la fenêtre de prévisualisation 3D. La désactiver peut économiser des performances mais n'est pas pratique pour le débogage de la capture de mouvement.

### 7. Commutateur d'Utilisation de la Barre de Titre du Système
L'utilisation de la barre de titre du système peut entraîner une incohérence de style global, mais les performances seront généralement légèrement meilleures.

### 8. Mise à Jour du Logiciel
Fonction réservée, fonctionnalité de mise à jour à chaud non terminée.


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>