---
sidebar_position: 3
title: "Téléchargement du logiciel"
---
<!-- ==================== Flag A: Install software Start ==================== -->
<div style="border-left: 6px solid #88b49c; padding-left: 20px; margin-top: 10px; margin-bottom: 20px;">

## Téléchargement {#software-download-toc}
<h2 class="tutorial-heading-flag" style="background: #88b49c; margin-top: 0; display: inline-block;">Téléchargement</h2>

Actuellement, la version disponible est `Release`. Cliquez sur le lien de téléchargement ci-dessous.<br />
La version `Beta` est une version de test publique, qui fonctionne mieux dans les zones avec de fortes interférences magnétiques, mais qui n'a pas encore été validée de manière approfondie.



**Version Stable** -  [Télécharger Rebocap V01](https://doc.rebocap.com/img/files/rebocap_release_v01.exe)


**Version Beta** - [Télécharger Rebocap V02 Beta02](https://doc.rebocap.com/img/files/rebocap_release_v02_beta02.exe)







- Sélection de la Version :\
  V01 - Convient pour les environnements avec des champs magnétiques stables, recommandé pour la danse.<br />
  V02 Beta02 - Les paramètres par défaut sont optimisés pour le kit de 6 trackers, et elle utilise un nouvel algorithme pour identifier activement les sources d'interférences fortes, maintenant l'orientation même sur des trampolines.


- Il est recommandé de l'installer sur un disque non système (ne pas installer sur le lecteur C).



<!-- ==================== Details Start ==================== -->

<details>
<summary> Vérifiez les versions de firmware prises en charge et les instructions d'utilisation.</summary>
   &emsp;&emsp; Certaines versions de firmware ont des changements majeurs d'algorithme et sont incompatibles avec les anciennes versions du logiciel. <br /> 


   &emsp;&emsp; Lors du retour à une ancienne version de logiciel, le firmware doit être rétrogradé en conséquence.<br /> 

   &emsp;&emsp;&emsp; release_v01 - ◼️tracker : V6 / V7  ,  📡récepteur : V6 / V7 <br /> 

   &emsp;&emsp;&emsp; release_v02 beta02 - ◼️tracker : V15  ,  📡récepteur : V6 / V7 <br /> 

   &emsp;&emsp;&emsp; (Non publié) release_v02 beta02.1 - ◼️tracker : V16  ,  📡récepteur : V6 / V7 / V8 <br /> 



<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

<video autoPlay loop muted playsInline width="100%" src="/img/softawre_install/show_version_log.mp4"></video>

</div>
<div style="flex: 1.5; min-width: 250px;">

**Instructions d'utilisation du firmware**<br />
- Ouvrez la fenêtre du journal pour voir la version de firmware actuelle de chaque tracker <br /> 
(la fenêtre de journal est située sous "Connecter & Éteindre" dans le logiciel).

</div>
</div>

<br/>

- Les trackers sont mis à jour sans fil 📶 — aucun câble USB n'est nécessaire.<br /> 
🚫 Ne mettez pas à jour le tracker et le récepteur en même temps.<br /> 


- Si la mise à jour échoue, il faut redémarrer le tracker et cliquer à nouveau sur mettre à jour.<br /> 
&emsp;&emsp;🟩Vert – clignotement rapide : Le tracker fonctionne normalement<br /> 
&emsp;&emsp;🟩Vert – clignotement lent : Le tracker attend le signal du récepteur<br /> 
&emsp;&emsp;🟦Bleu : Le tracker reçoit les données de firmware<br /> 
&emsp;&emsp;🟨Jaune : La mise à jour a échoué (appuyez manuellement sur le bouton 🔘 pour redémarrer, puis réessayez la mise à jour)<br /> 
&emsp;&emsp;⬜Blanc : Mise à jour réussie (généralement, redémarre automatiquement après 10s ; sinon, redémarrez manuellement)<br />

-  Lorsque la mise à jour du 📡récepteur est terminée, débranchez et rebranchez l'USB, et 🔄redémarrez le logiciel.

</details>
<!-- ==================== Details End ==================== -->






<!-- ==================== Details Start ==================== -->
<details>
<summary>Si vous utilisez la version V01 en mode VR, les paramètres suivants doivent être modifiés.</summary>

<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![v01_off_1](../../../../../static/img/unboxing/expand/v01_off_1-en.png)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong>1 - Lorsqu'il n'y a pas de capteur pour le haut du bras, désactivez manuellement les points de suivi supplémentaires.</strong><br />
Ouvrez [Configurer les nœuds de sortie 'SteamVR'] → Désactivez [Bras Supérieur Gauche/Droit]
<details className="plain-details"><summary>Détails</summary>
Le logiciel prévoyait à l'origine d'utiliser la fonction [Masquer automatiquement les articulations] pour masquer automatiquement les points de suivi inutilisés,<br />
mais il s'est avéré que cette fonction ne pouvait pas vérifier automatiquement. Cela a été corrigé dans le logiciel V02 Beta02.
</details>





</div>
</div>

<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">
<div style="flex: 1; min-width: 250px; text-align: center;">

![v01_off_2](../../../../../static/img/unboxing/expand/v01_off_2-en.png)

</div>
<div style="flex: 1.5; min-width: 250px;">
<strong>2 - Désactivez les fonctions qui peuvent se bloquer de manière incorrecte en fonctionnement global.</strong><br />
→ [Paramètres de Mouvement] → Désactivez [IK Vertical & IK Horizontal]
<details className="plain-details"><summary>Détails</summary>
Cette fonction était à l'origine une sous-fonction dans le module [Antidérapant],<br />
mais elle restait active de manière inattendue de manière globale. Cela a été corrigé dans le logiciel V02 Beta02.

</details>
</div>
</div>

</details>
<!-- ==================== Details End ==================== -->





</div>
<!-- ==================== Flag A: Install software End ==================== -->







Notes:
> Le logiciel ne prend actuellement en charge que **Windows 10** et plus.<br>
> Le logiciel doit être utilisé lorsqu'il est connecté à Internet. Si vous souhaitez l'utiliser hors ligne, veuillez vous connecter via un point d'accès mobile, démarrer le logiciel, attendre 30 secondes, puis déconnecter le réseau.<br>
(Tant que la [Fenêtre du journal] indique que la vérification réseau a réussi, vous pouvez déconnecter le réseau)

## Installation du logiciel
1. Double-cliquez sur rebocap_release_v01.exe (la version actuelle est rebocap_release_v01.exe)
2. Installez selon les étapes montrées dans la figure ci-dessous
3. Ouvrez le logiciel Rebocap
   * Ouvrir depuis le Menu Démarrer
   * Ouvrir via le raccourci bureau

![Installation Steps](../../../../../static/img/setup_steps-en.gif)

## Notes de Mise à Jour du Logiciel

### Journal des modifications

#### Mise à jour du 2026-02-04 : Rebocap Release V02 Beta02
1. Firmware mis à jour vers v15, algorithmes anti-magnétiques et 6 axes optimisés, stabilité anti-magnétique améliorée, stabilité 6 axes améliorée
   > Dans des conditions dynamiques, par ex., danser continuellement dans un mauvais environnement magnétique, les performances restent proches de celles du mode 6 axes. Avec le nouveau firmware, tant que le champ magnétique est bon, la danse dynamique peut être corrigée continuellement (l'ancien firmware dépendait de moments statiques intermittents pour la correction)
2. Ajout de la fonction d'arrêt automatique retardé, nécessite la mise à jour du firmware du récepteur.
3. Reprise de la calibration du cap (heading) et ajout de la fonction de calibration du cap sur PC :
   > Remarque : Lors de l'exécution de la calibration du cap sur PC, utilisez une pose A complète pour tout le corps ; lever les avant-bras et les paumes vers l'avant donne de meilleurs résultats. Sinon, vous pouvez exécuter directement une pose S, ou vous asseoir et étirer les bras droit devant vous fonctionne aussi）
4. Si le logiciel plante de manière inattendue et est rouvert dans les 5 minutes, les résultats de calibration précédents seront appliqués automatiquement ; pas besoin de recalibrer
5. Pendant la calibration du cap, le champ magnétique sera réinitialisé (réinitialisé directement à un champ relatif de 1.0). En d'autres termes, si vous êtes couché dans votre lit, il utilisera le champ magnétique au moment de la calibration comme référence initiale pour corriger.
6. Suppression de la restriction sur la calibration du champ magnétique ; la calibration magnétique simple (dessiner un chiffre 8) est désormais cliquable par défaut
   > Par défaut, la calibration est limitée à 8 capteurs à la fois. Si vous ajoutez le fichier : `data/__no_limit_max_nodes__` dans le répertoire data, la limite sera levée
7. Correction d'un bug où le mouvement des pieds après s'être allongé pouvait faire se séparer le squelette du personnage.

Autres mises à jour :
1. La barre de titre du logiciel affiche désormais le numéro de version
2. Correction d'un bug où la fonction pour masquer automatiquement les capteurs éteints ne prenait pas effet
3. Lorsque le mode antidérapant pour les pieds est désactivé, les pieds peuvent aller en dessous du sol, et l'IK a été retiré
4. Résolution d'un bug où la pose de l'avatar gelait après avoir débranché le récepteur
5. Ajout d'un décalage latéral VR dans les paramètres du squelette (pour les modèles dont le point de montage du HMD n'est pas centré sur le front mais légèrement sur le côté, vous pouvez ajuster selon les besoins)


#### Mise à jour du 2025-12-03 : Rebocap Release V01
**Section VR :**
1. Ajout de la fonction de marche sur place : lors d'une marche sur place, le joystick simule un mouvement vers l'avant régulier et lent, voir le document d'Aide pour plus de détails (Fonction Avancée)
2. Ajout de l'ajustement de la hauteur du sol virtuel VR, plage -100 cm~100 cm (Fonction Avancée)
3. Ajout de la fonction de remplacement de contrôleur : lorsqu'elle est activée, les trackers manuels remplacent la position et l'orientation du contrôleur, voir le document d'Aide pour plus de détails (Fonction Avancée)
4. Mise à jour du plugin SteamVR et tentative de correction du problème où les trackers sont reconnus comme des contrôleurs
5. Correction du localisateur de pied incorrect lors de l'importation d'un squelette en mode VR (affectant principalement le calcul de l'IK) qui faisait s'enfoncer les pieds de l'avatar et l'ensemble de son corps.
6. Après la réinitialisation du cap, la fonction de Recentrage Automatique sera déclenchée de manière proactive
7. Ajout d'un commutateur pour masquer automatiquement les nœuds éteints ; lorsqu'il est activé, les nœuds éteints seront masqués automatiquement
8. Restauration de la fonctionnalité VR de suivi du HMD par la poitrine/la taille

**Section PC :**
1. Mise à jour de l'algorithme de calibration de mouvement : assouplissement des exigences de posture des bras en pose T, résolution des problèmes de bras asymétriques pour certains utilisateurs
2. Ajout de l'IK pour les bras. L'IK à Mains Jointes minimise le croisement des bras lorsque les mains sont ensemble, et l'IK en Pose A résout le chevauchement sévère lorsque les épaules de l'avatar sont trop étroites et les bras sont verticaux.
3. Ajout de l'exportation de mouvement MMD et de l'importation de modèle PMX. Notez que les mouvements VMD ne contiennent pas d'IK ; vous devez retirer manuellement les contraintes IK.
4. Correction du bug où le saut de taux de trames d'animation était plafonné à 999

**Général :**
1. Interface utilisateur mise à jour : réorganisée par fonction, amélioration de la traduction de certains termes, et descriptions des fonctionnalités rendues plus conviviales
2. Ajout du bouton des Paramètres Avancés, avec les fonctions d'exportation/importation de paramètres et de Restauration des Valeurs par Défaut
3. Suppression du problème où la calibration ne pouvait pas se poursuivre en raison de l'échec de la détection de l'immobilité
4. Ajout de la fonction de connexion automatique ; plus besoin de cliquer manuellement sur le bouton de connexion désormais
5. Ajout de la mise à jour du firmware du récepteur pour résoudre les problèmes de charge CPU élevée et de perte de paquets (en particulier sur les CPU AMD)
6. Mise à jour des trackers vers le firmware v07 pour une stabilité globale améliorée
7. Ajout de la possibilité de sélectionner des nœuds spécifiques pour le mode 6 axes (Fonction Avancée)
8. Correction d'un bug où certains gyroscopes ne revenaient pas à zéro après la calibration

**Autres :**
1. Ajout d'un écran de démarrage pour éviter de longues périodes d'attente en arrière-plan  
2. Amélioration de la stabilité de la fenêtre 3D  
3. Augmentation du nombre de serveurs d'authentification à trois (Chine, Hong Kong, et États-Unis) ; l'authentification réussit tant qu'un serveur passe  
4. Correction d'un bug occasionnel où les données semblaient ne pas être envoyées pendant la calibration (elles étaient en fait envoyées avec succès)  
5. Remplacement du squelette par défaut par le squelette par défaut recommandé par la communauté et modification d'autres paramètres par défaut  
6. Ajout d'une invite de recalibration lors de l'activation ou de la désactivation du commutateur six axes  
7. Correction du problème de compensation de l'inclinaison latérale à six axes  


### À FAIRE (sans ordre particulier, seuls les points de mise à jour majeurs sont listés ici)

- Optimiser les performances de l'IK  
- Améliorer la stabilité du logiciel  
- Prendre en charge le mode VR 3 points  
- Prendre en charge le mode PC 6 points complet  
- Ajouter la documentation dans d'autres langues (à ajouter une fois la documentation stabilisée)  


### Versions Historiques
> **Remarque : Les versions antérieures à la preview05 ne prennent pas en charge le nouveau matériel publié après le 29-11-2025. Pour le nouveau matériel, veuillez télécharger la dernière version Release ou la version Beta.**
