---
sidebar_position: 5
title: "Primeros pasos y Guía rápida"
---

# Primeros pasos y Guía rápida

¡Bienvenido a Rebocap! Si está recibiendo y usando los trackers de Rebocap por primera vez, le recomendamos elegir la guía paso a paso de desempaquetado y configuración correspondiente a su conjunto de trackers.

---

## 🚀 1. Inicio rápido por conjunto

Por favor, seleccione el tutorial correspondiente a su conjunto de equipos. Las guías cubren el proceso completo, incluyendo la inspección del paquete, la colocación de las correas, las actualizaciones de software y firmware, la calibración y la conexión a SteamVR:

<div style="display: flex; gap: 16px; flex-wrap: wrap; margin: 20px 0;">
  <a href="/docs/rebocap-tutorials/6-set-unboxing" style="flex: 1; min-width: 260px; padding: 16px 20px; border: 1px solid var(--ifm-color-primary-light); border-radius: 8px; text-decoration: none; background-color: var(--ifm-card-background-color, #f8f9fa);">
    <h3 style="margin: 0 0 8px 0; color: var(--ifm-color-primary);">📦 Conjunto de 6 trackers: Del desempaquetado al uso</h3>
    <p style="margin: 0; font-size: 0.9em; color: var(--ifm-font-color-base);">Incluye inspección del paquete, configuración de correas, software/firmware, calibración de giroscopio/magnética y configuración de SteamVR.</p>
  </a>

  <a href="/docs/rebocap-tutorials/15-set-unboxing" style="flex: 1; min-width: 260px; padding: 16px 20px; border: 1px solid var(--ifm-color-primary-light); border-radius: 8px; text-decoration: none; background-color: var(--ifm-card-background-color, #f8f9fa);">
    <h3 style="margin: 0 0 8px 0; color: var(--ifm-color-primary);">📦 Conjunto de 15 trackers: Del desempaquetado al uso</h3>
    <p style="margin: 0; font-size: 0.9em; color: var(--ifm-font-color-base);">Incluye instalación de correas de liberación rápida y anchas, colocación en cuerpo completo, software/firmware, guía de calibración y ajustes avanzados.</p>
  </a>
</div>

---

## ⚠️ 2. Aviso importante (Calibración del campo magnético)

- La calibración del campo magnético es crucial para asegurar la precisión del seguimiento espacial. Se recomienda realizar la calibración magnética **después de la primera carga**, o siempre que se **mueva a un nuevo entorno de habitación**.
- Para obtener instrucciones de calibración detalladas y precauciones, consulte: 👉 **[Preguntas frecuentes y Guía de calibración del campo magnético](../QA/magnet)**

:::danger Precauciones para la calibración del campo magnético
- La calibración del campo magnético debe dominarse, y las precauciones son muy importantes. Si no se siguen las precauciones, la precisión de la calibración se verá comprometida.
- La calibración del campo magnético se puede realizar repetidamente en cualquier momento. Si experimenta desviación (drift), intente volver a calibrar el campo magnético primero.
:::

---

## 🎮 3. Conexión a software externo y juegos

Después de completar la calibración inicial, puede transmitir datos de movimiento a software externo y juegos:

- **SteamVR / VRChat**: Por favor, consulte la 👉 **[Guía de SteamVR](../rebocap-tutorials/steamvr_guide)** de reciente creación (cubre los ajustes de límites de SteamVR, visibilidad de nodos y solución de problemas de conexión).
- **Animación 3D y Plugins directos**: Si se conecta a Blender, Unity, UE o software de Vtuber, consulte 👉 **[Plugins directos e integración de aplicaciones](../plugins/plugins)**.

---

## 📺 4. Videotutorial y Soporte de la comunidad

Los videotutoriales son opciones complementarias; la documentación en texto proporciona explicaciones y soluciones de problemas más detalladas.

:::info Videotutorial de primer uso
A continuación se muestra el videotutorial de primer uso creado en colaboración con los miembros de la comunidad. Se recomienda encender el sonido y verlo completamente antes de operar:

[Videotutorial de primer uso (Bilibili)](https://www.bilibili.com/video/BV1vb66Y2EeD)
<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=113758953276032&bvid=BV1vb66Y2EeD&cid=27665304028&p=1&autoplay=0&muted=0&danmaku=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 100%; height: 400px; margin-top: 10px;"></iframe>
:::

:::danger Consejos de rendimiento y solución de problemas
Para un rendimiento óptimo de la captura de movimiento o si encuentra problemas, asegúrese de leer el tutorial detallado en texto:
- La orientación de los trackers de los pies y la tensión de las correas impactan significativamente en el contacto con el suelo y el rendimiento antideslizante;
- En entornos con fuerte interferencia magnética, verifique si es necesario habilitar el modo antimagnético;
- Cuando no se usen los trackers de los pies, verifique si debe habilitar el motor de IA (AI Engine) para la predicción automática de poses;
- Para más preguntas, no dude en preguntar en la sección de [Comunidad y Soporte](../README#community).
:::

---

### 📂 Revisión rápida de temas individuales
Si necesita consultar módulos básicos específicos por separado:
- [Revisión de hardware y accesorios](hardware_check)
- [Uso de correas y guía de colocación](instroction_for_straps)
- [Descarga e instalación de software](software_install)
- [Guía básica de conexión](connect_and_use)