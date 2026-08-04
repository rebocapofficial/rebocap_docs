---
sidebar_position: 4
title: "Guide de connexion"
sidebar_label: "Guide de connexion"
---

# Guide de connexion
1. Allumez le tracker que vous souhaitez connecter
   > Les modes de combinaison de trackers pris en charge peuvent être trouvés dans le [chapitre précédent](instroction_for_straps#follow_mode)
2. Insérez le récepteur dans le port USB de l'ordinateur
3. Ouvrez le logiciel Rebocap et cliquez sur connecter

![Connecter le récepteur](../../../../../static/img/connect-en.gif)

<a id="how_to_solve_cannot_connect"></a>

### Raisons de l'échec de connexion et solutions
<details>
<summary>Cliquez ici pour développer et voir les raisons spécifiques de l'échec de la connexion ou de l'échec de la transmission de données</summary>


* Il peut y avoir un problème avec le port USB, par exemple, les ports USB des ordinateurs de certains utilisateurs accumulent de la poussière, ce qui peut entraîner des connexions instables.
> Essayez de changer de port USB ou de le débrancher et de le rebrancher
* Un client `Rebocap` peut déjà être en cours d'exécution, ce qui fait que le port est occupé, ou un autre programme peut utiliser le port
> Le symptôme est que le bouton `Connect` est cliquable, mais que la connexion échoue. À ce stade, assurez-vous que les autres clients `Rebocap` sont complètement fermés, et il est recommandé de débrancher et de rebrancher le récepteur. Vérifiez également le gestionnaire des tâches pour d'autres processus `Rebocap` et terminez-les de force si vous en trouvez.
* Assurez-vous que le port série fonctionne correctement et qu'aucun autre logiciel de port série virtuel n'est installé. Certains utilisateurs peuvent rencontrer une défaillance du pilote après l'installation de périphériques de port série virtuels.
> Par exemple, si le pilote `com0com` est installé, il doit être désinstallé, puis le récepteur doit être débranché et rebranché.
* Assurez-vous que le pilote n'a pas été remplacé. Vous pouvez suivre les étapes indiquées dans l'image ci-dessous pour annuler la mise à jour du pilote du port série du récepteur. S'il ne parvient toujours pas à se connecter, débranchez le récepteur et réinsérez-le.
  > Si la calibration ne peut pas être effectuée après la connexion et que la couleur de la lumière RGB ne peut pas être modifiée, vous pouvez également essayer de restaurer le pilote.

    ![Restaurer le pilote du récepteur](../../../../../static/img/rollback_driver-en.gif)


</details>

### Signal faible ou instable après connexion
* Si vous utilisez un ordinateur de bureau, ne placez pas le récepteur derrière le châssis.
* Essayez de maintenir une zone dégagée de plus de 5 cm à côté du récepteur, par exemple, n'insérez pas de clé USB à côté du récepteur. Si possible, l'utilisation d'un câble d'extension peut aider à améliorer le signal.

# Calibration
Veuillez vous référer à l'image ci-dessous pour les instructions de port. La position de port spécifique varie d'une personne à l'autre. Pour les principes et les détails, veuillez vous référer au [chapitre précédent](instroction_for_straps#tracker_position_recomendation).

:::info Assurez-vous de tester 15 points pour la première utilisation


Si les résultats du test sont médiocres, il peut y avoir les raisons suivantes :
1. Problèmes de champ magnétique ; veuillez [vous référer ici](../QA/magnet) pour des solutions spécifiques.
2. Le gyroscope peut nécessiter une calibration ; veuillez [vous référer ici](../ui_help_doc/control/config#gyrocalibrate).
3. Problèmes liés au port et à la traction ; veuillez [lire attentivement et vous référer ici](instroction_for_straps#tracker_position_on_body).

:::


<a id="pose_calibration"></a>

### Calibration de la pose
Cliquez sur le bouton Calibration de pose dans l'interface du logiciel. La référence de calibration de pose est indiquée dans l'image ci-dessous, et il y a des invites d'image correspondantes dans le logiciel. Assurez-vous de lire tous les points clés et les spécifications d'action.

- **Points clés de la calibration**
  * Après avoir cliqué sur Calibration de pose, entrez immédiatement dans la pose en A (A-Pose) et restez immobile.
    > Le système commencera à détecter si la personne est immobile 2 secondes après avoir cliqué. Veillez à contrôler l'amplitude du balancement d'avant en arrière, en minimisant les mouvements autant que possible pour terminer l'initialisation de chaque capteur. La durée de détection est de 10 secondes ; dès qu'il détecte que vous avez été immobile pendant les 2 dernières secondes, il entrera immédiatement dans le programme de calibration.
  * Pendant la période de bips rapides pour chaque action, le système enregistrera les données de pose correspondantes.
    > Assurez-vous de rester immobile pendant la période de bips rapides. Il est recommandé de changer d'action 1 seconde après la fin des bips rapides.
  * Après avoir changé d'action, veuillez rester immobile et attendre que le bip rapide retentisse. Il est recommandé de terminer le processus de changement dans les 2 secondes.
  * Pendant le processus de changement d'action, ne bougez pas vos pieds.
    > Les deux pieds doivent rester strictement immobiles pendant la calibration, sans aucun mouvement.

- **Spécifications des actions**
  * **Pose en A (A-Pose)**
    
    Les deux jambes doivent être verticales et aussi parallèles que possible, avec environ la distance d'un poing entre les pieds. Les deux bras doivent être tendus vers le bas, non pliés, paumes tournées vers soi, dos droit et regardant droit devant.
    > Si vous sentez que les pieds sont rapprochés après la calibration et que les pieds du personnage virtuel sont croisés, réduisez la distance entre les pieds pendant la calibration.
    > 
    > Si vous sentez que les pieds sont rapprochés après la calibration et que la distance entre les pieds du personnage virtuel est trop grande, augmentez la distance entre les pieds pendant la calibration.
  * **Pose en T (T-Pose)**
    
    Les deux jambes doivent rester cohérentes avec la pose en A, et les deux bras doivent être étendus vers l'extérieur, alignés avec les épaules, et les deux mains doivent être en ligne droite, paumes tournées vers le bas.
  * **Pose en S (S-Pose)**
    
    Les deux jambes doivent être légèrement pliées vers l'avant à environ 30 degrés, sans flexion excessive. Les deux bras doivent être étendus vers l'avant, perpendiculaires au haut du corps, parallèles aux épaules, et les deux bras doivent être parallèles.
    > Si les bras ne portent pas de trackers, les mouvements des bras peuvent être ignorés.
  * **Pose en B (B-Pose)**
    
    Le haut du corps doit se pencher en avant à 30 degrés, et les mouvements des mains ne doivent pas être pris en compte.
    > La pose en B (B-Pose) signifie Blend-Pose, principalement utilisée pour calibrer les angles de cap des trackers de la taille, de la poitrine et de la tête.

Les images de gauche à droite sont : `APose` `TPose` `SPose` `BPose`
<div align="center">
<img src="/img/apose.png" alt="left" width="22%" />
<img src="/img/tpose.png" alt="left" width="22%" />
<img src="/img/spose.png" alt="left" width="22%" />
<img src="/img/bpose.png" alt="left" width="22%" />
</div>

<a id="third_party"></a>

# Intégration de logiciels
### Intégration SteamVr [référez-vous ici](../third_party_software_access/steamvr/README)
- Intégration VRChat [référez-vous ici](../third_party_software_access/steamvr/vrchat)
- Tutoriel d'intégration de la communauté [https://kdocs.cn/l/cbZLGg2QeEHk](https://kdocs.cn/l/cbZLGg2QeEHk), si le lien est inaccessible, veuillez <a href="/img/files/RebocapVRchatTutorialEnglish.pdf"  target="_blank" download="RebocapVRchatTutorialEnglish.pdf">télécharger le fichier PDF</a> pour le visualiser (le fichier hors ligne peut ne pas être mis à jour rapidement)


### Intégration des utilisateurs du protocole VMC [référez-vous ici](../third_party_software_access/VMC/README)
- Intégration warudo [référez-vous ici](../third_party_software_access/VMC/warudo)

# Éléments indispensables à connaître
Pour éviter divers problèmes lors de l'utilisation (tels que des trackers s'inclinant inexplicablement) et pour garantir une meilleure expérience de capture de mouvement, veuillez vous assurer de lire les instructions suivantes.

### Calibration du matériel
- [Calibration du champ magnétique](../ui_help_doc/control/config#magnetcalibrate)
- [Calibration du gyroscope](../ui_help_doc/control/config#gyrocalibrate)

### Comment définir la configuration de capture de mouvement dans le logiciel
- Pour la configuration du champ magnétique, veuillez lire les [Instructions relatives au champ magnétique](../QA/magnet)
- Pour d'autres configurations, vous pouvez cliquer sur l'icône de point d'interrogation dans le coin supérieur droit de chaque panneau de configuration

### Meilleure façon de lier les sangles
Si vous avez ignoré [la section précédente](instroction_for_straps), veuillez la lire pendant votre temps libre, ou assurez-vous de la lire attentivement si vous rencontrez des problèmes.

:::info Points importants soulignés à nouveau


Il est souligné à nouveau ici que la méthode de liaison du tracker sur la semelle est cruciale. Essayez de ne pas utiliser de sangles pour éviter que le tracker ne soit affecté par le frottement entre la sangle et le sol, ce qui pourrait avoir un impact sur l'effet global de la capture de mouvement. Veuillez vous référer à la section précédente pour plus de détails.

:::



<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>