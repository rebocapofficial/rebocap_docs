---
sidebar_position: 1
title: "Prend-il en charge Mac et Linux"
---
## Prend-il en charge Mac et Linux
> Actuellement non pris en charge, Linux ne sera pas pris en charge à l'avenir, Mac pourrait être pris en charge

## Prend-il en charge les appareils autonomes
> Projets futurs de prendre en charge Quest & Pico, en fonction de la prise en charge par l'appareil des récepteurs USB (c'est-à-dire des récepteurs de signaux dédiés)

<a id="audio"></a>

## L'initialisation audio a échoué
> Vérifiez les problèmes de pilote de périphérique audio

<a id="poor_signal"></a>

## Comment gérer une mauvaise qualité de signal
> Tout d'abord, vérifiez la [force du signal](../ui_help_doc/info#hardware_detail) pour vous assurer qu'il n'y a pas de fortes interférences de signal ou d'obstructions près du récepteur et du tracker, comme ne pas placer le récepteur à l'arrière du châssis et éviter les clés USB près du récepteur.
>
> Deuxièmement, assurez-vous que la charge du `CPU` n'est pas trop élevée ou que le `CPU` n'est pas en mode d'économie d'énergie. Essayez de maintenir la charge du `CPU` à 70 % au maximum et éliminez les problèmes de faible fréquence du `CPU`, comme un mauvais refroidissement d'ordinateur portable, qui peut faire chuter la fréquence en dessous de `2.5GHz`.

<a id="not_static"></a>

## Personne non détectée comme immobile pendant la calibration
> En général, maintenir `Apose` peut impliquer un certain balancement d'avant en arrière. Veuillez essayer de le contrôler. Pour des instructions de calibration détaillées, veuillez [vous référer ici](../tutorial/connect_and_use#pose_calibration).

<a id="send_failed"></a>

## Échec de l'envoi des données de calibration
> Assurez-vous qu'il n'y a pas de problèmes de force du signal et vérifiez d'abord le pilote du récepteur `USB`. Ceci est généralement causé par des problèmes de pilote `USB`. Pour des solutions spécifiques, [veuillez voir ici](../tutorial/connect_and_use#how_to_solve_cannot_connect).

<a id="need_calibrate_gyro"></a>

## Les gyroscopes de certains nœuds peuvent nécessiter une calibration
> Ces informations sont principalement une indication, car le fait que la personne ne soit pas immobile peut également entraîner une détection incorrecte des informations d'immobilité du gyroscope (capteur de vitesse angulaire sur le tracker). L'essentiel est de vérifier les données du gyroscope lorsque le tracker est placé de manière absolument immobile sur le sol. Hormis quelques valeurs aberrantes, la plupart du temps, des valeurs inférieures à 0,3 sont normales. Sinon, une calibration est recommandée. En mode 6 axes, il est recommandé de calibrer le gyroscope avant chaque utilisation. Pour les méthodes de calibration spécifiques, veuillez [voir ici](../ui_help_doc/control/config#gyro_calibrate).

<a id="vr_height"></a>

## En mode VR, la hauteur demandée lors de la calibration ne correspond pas à la hauteur de la personne
> L'appareil Rebocap lui-même n'a pas la capacité de mesurer la taille. La mesure de la taille est entièrement basée sur les données fournies par le casque. Pour plus de détails, veuillez [voir ici](../ui_help_doc/control/connect#vrpannel).

<a id="port_open_failed"></a>

## Échec du démarrage du port de diffusion
> Le port est occupé, ou il y a un processus résiduel d'une instance `rebocap` précédente. Assurez-vous qu'un seul `rebocap` est en cours d'exécution et qu'il n'y a qu'un seul processus `rebocap` dans le gestionnaire des tâches.

<a id="connect_failed"></a>

## Connexion du connecteur anormale
1. Éliminez l'occupation du port. Plus précisément, assurez-vous qu'une seule instance du client `rebocap` est en cours d'exécution et qu'aucun autre logiciel n'occupe le port.

2. Anomalie du pilote. Pour plus de détails, [veuillez voir ici](../tutorial/connect_and_use#how_to_solve_cannot_connect).

<a id="steamvr_connect"></a>

## SteamVR ne peut pas se connecter
> Veuillez [voir ici](../third_party_software_access/steamvr/README#vr_cannot_connect).

## Ajustement du squelette inefficace
> Veuillez [voir ici](../ui_help_doc/control/skeleton_setting#skeleton_not_valid).

<a id="firmware_version"></a>

## La version du micrologiciel doit être mise à jour
> Veuillez [voir ici](../ui_help_doc/control/config#firmware_update) pour mettre à jour le micrologiciel directement.

<a id="cal_exception"></a>

## Exception de calibration
- Considérez que le mode de port ne répond pas aux exigences, [veuillez voir ici](../tutorial/instroction_for_straps#followmode).
- Considérez des anomalies de pilote sous-jacentes, nécessitant une restauration du pilote et un rebranchement du récepteur, [veuillez voir ici](../tutorial/connect_and_use#how_to_solve_cannot_connect) (les méthodes spécifiques doivent être consultées dans la section développée).

<a id="error_puts_on"></a>

## Le port ne répond pas aux exigences
- Assurez-vous que les points portés sont allumés sur les parties correspondantes de la personne dans le diagramme en haut à gauche de l'interface utilisateur.
- Assurez-vous que la fonction de remplacement n'est pas activée. Pour des méthodes d'activation et de désactivation spécifiques, [veuillez voir ici](../ui_help_doc/remap#trackerreplace).
- Assurez-vous que le mode de port répond aux exigences, [veuillez voir ici](../tutorial/instroction_for_straps#followmode).

<a id="height_error"></a>

## Anomalie de Hauteur du Casque
- Si la taille détectée est inférieure à 10 cm, cela est probablement dû à une anomalie du pilote SteamVR, possiblement causée par un nom de système Unicode, signifiant un nom de système non anglais. Cela sera corrigé à l'avenir. Actuellement, vous pouvez essayer de résoudre ce problème en modifiant l'emplacement d'installation ([référez-vous ici](../third_party_software_access/steamvr/#other_notes)). Si le problème persiste, [contactez le forum](https://forum.rebocap.site), et notre personnel technique vous assistera.
- Si la hauteur du casque ne correspond pas à la vôtre, vous pouvez d'abord [vérifier ici](../ui_help_doc/control/connect#vr_pannel), ou vous pouvez consulter les articles du forum :
  - [Version Chinoise](https://forum.rebocap.site/t/rebocap/52/1)
  - [Version Anglaise](https://forum.rebocap.site/t/how-to-solve-the-abnormal-height-detection-in-rebocap/53/1)
  - [Version Japonaise](https://forum.rebocap.site/t/rebocap/54)

## Problèmes de Tremblement
  - Pour les tremblements liés au champ magnétique, vous pouvez [modifier le niveau anti-magnétique](../ui_help_doc/control/config#update_reject_mag_and_strenth) à 12, puis passer en [mode anti-magnétique](../ui_help_doc/control/connect#calibrate).
  - Un tremblement ou scintillement des épaules nécessite une mise à jour vers la dernière version.
  - Pour l'oscillation de la taille après un saut et un atterrissage, il est recommandé d'éliminer les problèmes de sangle, de vous assurer que le tracker n'est pas fermement attaché à la taille, ou d'acheter une sangle large, ou d'utiliser une méthode de fixation complexe, et d'éviter un relâchement rapide pour abaisser le centre de gravité du tracker par rapport à la sangle.

<a id="freq_change_note"></a>

## Problèmes de Modification du Canal de Communication
- Le canal de communication peut basculer d'avant en arrière entre le canal par défaut et le canal 1. Cependant, pendant le processus de basculement, seul le canal du tracker connecté basculera. Si vous changez de canal sans tracker connecté, seul le canal de communication du récepteur changera, ce qui entraînera une incohérence des canaux de communication. Vous devrez rebasculer pour vous connecter.
- Si une erreur de basculement de canal de communication se produit, vous pouvez essayer de basculer à nouveau jusqu'à ce qu'ils correspondent.
- Si vous constatez que vous ne parvenez pas à vous connecter, vous pouvez également essayer de basculer de canal d'avant en arrière pour voir si vous pouvez vous connecter avec succès.
- Si vous ne parvenez toujours pas à basculer avec succès, vous pouvez utiliser la fonction de réinitialisation physique du canal de communication. Vous pouvez réinitialiser le canal de communication à l'aide du boîtier de charge, [voir ici pour plus de détails](../ui_help_doc/control/config#change_channel). De plus, cliquez sur réinitialiser le canal dans le logiciel (s'il ne peut pas être cliqué, le récepteur est déjà réglé sur le canal par défaut).


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>