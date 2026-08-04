---
sidebar_position: 5
title: "Mise en route & Guide rapide"
---

# Mise en route & Guide rapide

Bienvenue sur Rebocap ! Si vous recevez et utilisez les trackers Rebocap pour la première fois, nous vous recommandons de choisir le guide étape par étape de déballage et de configuration correspondant à votre kit de trackers.

---

## 🚀 1. Démarrage rapide par Kit

Veuillez sélectionner le tutoriel correspondant à votre kit d'équipement. Les guides couvrent le processus complet, y compris l'inspection du paquet, la mise en place des sangles, les mises à jour logicielles et matérielles, la calibration et la connexion à SteamVR :

<div style="display: flex; gap: 16px; flex-wrap: wrap; margin: 20px 0;">
  <a href="/docs/rebocap-tutorials/6-set-unboxing" style="flex: 1; min-width: 260px; padding: 16px 20px; border: 1px solid var(--ifm-color-primary-light); border-radius: 8px; text-decoration: none; background-color: var(--ifm-card-background-color, #f8f9fa);">
    <h3 style="margin: 0 0 8px 0; color: var(--ifm-color-primary);">📦 Kit de 6 Trackers : Du déballage à l'utilisation</h3>
    <p style="margin: 0; font-size: 0.9em; color: var(--ifm-font-color-base);">Comprend l'inspection du paquet, la configuration des sangles, le logiciel/firmware, la calibration du gyroscope/champ magnétique et la configuration SteamVR.</p>
  </a>

  <a href="/docs/rebocap-tutorials/15-set-unboxing" style="flex: 1; min-width: 260px; padding: 16px 20px; border: 1px solid var(--ifm-color-primary-light); border-radius: 8px; text-decoration: none; background-color: var(--ifm-card-background-color, #f8f9fa);">
    <h3 style="margin: 0 0 8px 0; color: var(--ifm-color-primary);">📦 Kit de 15 Trackers : Du déballage à l'utilisation</h3>
    <p style="margin: 0; font-size: 0.9em; color: var(--ifm-font-color-base);">Comprend l'installation des attaches rapides et sangles larges, le placement sur tout le corps, le logiciel/firmware, le guide de calibration et les paramètres avancés.</p>
  </a>
</div>

---

## ⚠️ 2. Avis Important (Calibration du champ magnétique)

- La calibration du champ magnétique est cruciale pour garantir la précision du suivi spatial. Il est recommandé de procéder à une calibration magnétique **après la première charge**, ou chaque fois que vous **déménagez dans un nouvel environnement**.
- Pour des instructions détaillées sur la calibration et les précautions, voir : 👉 **[Guide de QA & Calibration du champ magnétique](../QA/magnet)**

:::danger Précautions pour la Calibration du Champ Magnétique
- La calibration du champ magnétique doit être maîtrisée, et les précautions sont très importantes. Si les précautions ne sont pas respectées, la précision de la calibration sera compromise.
- La calibration magnétique peut être effectuée à plusieurs reprises à tout moment. Si vous constatez une dérive, essayez d'abord de recalibrer le champ magnétique.
:::

---

## 🎮 3. Connexion à des logiciels et jeux externes

Après avoir terminé la calibration initiale, vous pouvez transmettre des données de mouvement vers des logiciels et jeux externes :

- **SteamVR / VRChat** : Veuillez vous référer au 👉 **[Guide SteamVR](../rebocap-tutorials/steamvr_guide)** nouvellement créé (couvre les paramètres de limite SteamVR, la visibilité des nœuds et le dépannage de la connexion).
- **Animation 3D & Plugins Directs** : Si vous vous connectez à Blender, Unity, UE ou un logiciel Vtuber, voir 👉 **[Plugins Directs & Intégration d'applications](../plugins/plugins)**.

---

## 📺 4. Tutoriel Vidéo & Support Communautaire

Les tutoriels vidéo sont des options supplémentaires ; la documentation textuelle fournit un dépannage et des explications plus détaillés.

:::info Tutoriel Vidéo pour la Première Utilisation
Ci-dessous se trouve le tutoriel vidéo pour la première utilisation, créé en collaboration avec des membres de la communauté. Il est recommandé d'activer le son et de le regarder complètement avant de procéder :

[Tutoriel Vidéo de Première Utilisation (Bilibili)](https://www.bilibili.com/video/BV1vb66Y2EeD)
<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=113758953276032&bvid=BV1vb66Y2EeD&cid=27665304028&p=1&autoplay=0&muted=0&danmaku=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 100%; height: 400px; margin-top: 10px;"></iframe>
:::

:::danger Dépannage & Conseils de Performance
Pour des performances de capture de mouvement optimales ou si vous rencontrez des problèmes, assurez-vous de lire le tutoriel textuel détaillé :
- L'orientation du tracker de pied et la tension de la sangle ont un impact significatif sur le contact au sol et les performances antidérapantes ;
- Dans des environnements avec de fortes interférences magnétiques, vérifiez s'il est nécessaire d'activer le mode antimagnétique ;
- Lorsque les trackers de pied ne sont pas portés, vérifiez s'il faut activer l'AI Engine pour la prédiction automatique des poses ;
- Pour d'autres questions, n'hésitez pas à demander dans le [Support & Communauté](../README#community).
:::

---

### 📂 Examen Rapide des Sujets Individuels
Si vous devez consulter des modules de base spécifiques séparément :
- [Vérification du Matériel & des Accessoires](hardware_check)
- [Guide d'utilisation et de port des sangles](instroction_for_straps)
- [Téléchargement & Installation du Logiciel](software_install)
- [Guide de Connexion de Base](connect_and_use)