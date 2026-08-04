---
sidebar_position: 1
title: "Consejos"
---

# Consejos
Leer esta página sin haber pasado por el tutorial no tiene sentido, [¡por favor, lee el tutorial primero!](../tutorial/README)!!!!

<a id="vmc_instroction"></a>

# Uso de VMC
El protocolo VMC es muy fácil de usar. Después de la calibración, puedes habilitar el protocolo VMC, [consulta los detalles aquí](../../ui_help_doc/control/connect#cal_pc_panel), y luego configurar la recepción en otro software. VMC es un protocolo universal de captura de movimiento, [consulta los detalles aquí](https://protocol.vmc.info/english.html).

Si eres un streamer y no estás seguro de si tu software admite `rebocap`, comprueba si tu software admite el protocolo VMC. Si tu software no lo admite, puedes contactar al desarrollador para usar nuestro [SDK](../../SDK/README) provisto para la integración, o usar directamente nuestros [plugins](../../plugins/plugins) provistos para la integración.

:::info Notas para Usuarios del Protocolo VMC


Se recomienda encarecidamente a los usuarios del protocolo VMC que carguen el esqueleto. Si es un modelo VRM, puedes cargar directamente el esqueleto en rebocap, [aquí está la introducción a la carga de esqueletos](../../ui_help_doc/control/skeleton_setting#skeleton_import). Para los usuarios de otros formatos, pueden utilizar el [plugin de Blender para exportar el esqueleto](../../plugins/blender#skeleton_export). El archivo exportado es un archivo JSON y se puede modificar manualmente.

Si no tienes claro cómo hacer ninguna de las dos cosas, necesitas saber la altura del esqueleto de tu personaje virtual y ajustar la configuración de la escala VMC. Configúralo de manera que la altura en rebocap * vmc_scale = altura del personaje virtual actual, pero este efecto generalmente no es ideal.

:::


### Cómo Integrar en Otro Software
Generalmente, puedes abrir directamente la configuración de VMC. Por favor, consulta la documentación del otro software para más detalles.

1. Dado que algunos streamers que utilizan `warudo` no están familiarizados con warudo en sí, aquí hay un ejemplo utilizando `warudo`, [mira aquí](warudo)


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>