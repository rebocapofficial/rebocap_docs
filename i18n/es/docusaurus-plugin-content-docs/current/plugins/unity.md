---
sidebar_position: 4
title: "Descarga del Paquete Demo de Unity"
---

# Descarga del Paquete Demo de Unity

El plugin de Unity está destinado principalmente a desarrolladores. Los desarrolladores pueden ver el código específico para el desarrollo secundario. A continuación se muestra el enlace de descarga.

<a href="/img/files/rebocap_unity_sdk_v4.unitypackage" target="_blank" download="rebocap_unity_sdk_v4.unitypackage">rebocap unity sdk v4</a>


registro de cambios de unity sdk v4
> Arreglados los fallos de animación en ciertos casos, soporta huesos de importaciones de FBX

registro de cambios de unity sdk v3
> Se corrigió el error en el que ocurrían errores de empaquetado y ejecución en el modo backend il2cpp

:::info Nota: Debes instalar primero el paquete `VRM`: [`UniVRM`](https://github.com/vrm-c/UniVRM/releases/tag/v0.117.0)

:::



# Ejemplo de Personaje de Modelo VRM de Cambio de Unity

Arrastra el rebocap_unity_sdk.unitypackage en un proyecto vacío, abre DemoScene en el directorio `RebocapSdk`, luego arrastra un nuevo VRM a la escena. Arrastra el objeto VRM bajo el objeto `Terrain` y vincula la variable Animator del script `Drive Demo`.

Después de ejecutar la escena, haz clic en el botón `Connect`. Se conectará automáticamente al cliente `Rebocap` y registrará automáticamente el esqueleto. Ten en cuenta que la calibración de movimiento es necesaria antes de la salida de movimiento.

:::info Nota


La vinculación del personaje en el proyecto Demo usa VRM, siguiendo el esqueleto estándar `Humanoid`. En principio, todos los esqueletos que sigan el estándar `Humanoid` se pueden arrastrar y reemplazar directamente.

:::


### Ejemplo de Reemplazo de Personaje de Operación de Video

Aquí hay una grabación de pantalla de la antigua versión del cliente (para visualización temporal, será reemplazada más adelante). La nueva versión es básicamente la misma. Después de hacer clic en conectar, verifica si el esqueleto se ha importado correctamente al cliente `Rebocap`.

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/unity_replace_vrm.mp4" type="video/mp4" />
</video>
</div>


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>