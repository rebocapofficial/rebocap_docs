---
sidebar_position: 4
title: "Téléchargement du Package de Démonstration Unity"
---

# Téléchargement du Package de Démonstration Unity

Le plugin Unity est principalement destiné aux développeurs. Les développeurs peuvent consulter le code spécifique pour un développement secondaire. Ci-dessous le lien de téléchargement.

<a href="/img/files/rebocap_unity_sdk_v4.unitypackage" target="_blank" download="rebocap_unity_sdk_v4.unitypackage">rebocap unity sdk v4</a>


Journal des modifications du sdk unity v4
> Correction de bugs d'animation dans certains cas, prend en charge les os des importations FBX

Journal des modifications du sdk unity v3
> Correction du bug où des erreurs d'empaquetage et d'exécution se produisaient en mode backend il2cpp

:::info Remarque : Vous devez d'abord installer le package `VRM` : [`UniVRM`](https://github.com/vrm-c/UniVRM/releases/tag/v0.117.0)

:::



# Exemple de Remplacement de Personnage Modèle VRM dans Unity

Faites glisser le rebocap_unity_sdk.unitypackage dans un projet vide, ouvrez la DemoScene dans le répertoire `RebocapSdk`, puis faites glisser un nouveau VRM dans la scène. Faites glisser l'objet VRM sous l'objet `Terrain`, et liez la variable Animator du script `Drive Demo`.

Après avoir exécuté la scène, cliquez sur le bouton `Connect`. Il se connectera automatiquement au client `Rebocap` et enregistrera automatiquement le squelette. Notez qu'une calibration de mouvement est requise avant la sortie de mouvement.

:::info Remarque


La liaison de personnage dans le projet de démonstration utilise VRM, en suivant le squelette standard `Humanoid`. En principe, tous les squelettes suivant le standard `Humanoid` peuvent être directement glissés et remplacés.

:::


### Exemple Vidéo de Remplacement de Personnage

Voici un enregistrement d'écran de l'ancienne version du client (pour un visionnage temporaire, il sera remplacé plus tard). La nouvelle version est fondamentalement la même. Après avoir cliqué sur connecter, vérifiez si le squelette a été importé avec succès dans le client `Rebocap`.

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/unity_replace_vrm.mp4" type="video/mp4" />
</video>
</div>


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>