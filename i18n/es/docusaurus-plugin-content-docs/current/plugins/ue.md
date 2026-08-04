---
sidebar_position: 3
title: "Descarga del Plugin de UE"
---
# Descarga del Plugin de UE

A continuación se encuentran los enlaces de descarga. Para el desarrollo del código fuente de UE, puedes compilarlo tú mismo. Actualmente, el plugin solo es aplicable a la versión `UE5`.

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin.zip">código fuente del plugin de ue</a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_51_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_52.zip">compilación previa del plugin de ue 5.1 </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_52_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_52.zip">compilación previa del plugin de ue 5.2 </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_53_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_53.zip">compilación previa del plugin de ue 5.3 </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_54_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_54.zip">compilación previa del plugin de ue 5.4 </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_55_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_55.zip">compilación previa del plugin de ue 5.5 </a>

<a href="/img/ue_plugin/rebocap_unreal_engine_plugin_prebuild_56_v2.zip" target="_blank" download="rebocap_unreal_engine_plugin_prebuild_56.zip">compilación previa del plugin de ue 5.6 </a>


# Instrucciones de Uso de UE

1. **Crear un nuevo proyecto en UE**

   Se aceptan proyectos tanto Blueprint como C++. Si necesitas desarrollar más el plugin, debes crear un proyecto en `C++`, importar el personaje (la pose predeterminada del personaje debe ser `T-Pose`, no `A-Pose`, de lo contrario, el rendimiento de los brazos será anormal), luego abre la carpeta del proyecto, crea una nueva carpeta `Plugins folder` y luego coloca `rebocap_unreal_engine_plugin` en `Plugins`. Por ejemplo, si creas un proyecto `testV3`, la estructura general del directorio es la siguiente:

    <div align="center">
    <img src="/img/ue_plugin/ue1.png" alt="pic_left" width="80%" />
    </div>

2. **Reabre UE y se compilará automáticamente [el código fuente está liberado, por lo que debería ser compatible con todas las versiones]**

    > Cuando desarrolles y depures aún más el plugin, puedes usar Rider para abrir directamente `[name].uproject` para el desarrollo y una fácil depuración.
    > 
    > Puedes usar Rider para compilar y comprobar errores de compilación. Si usas UE para compilar automáticamente y ocurren errores, verifica `Saved/Logs/[name].Log`. El `Log` generado por `UE` generalmente tiene problemas de codificación china, y es posible que debas ajustar la codificación del sistema a `UTF-8` para verlo correctamente.

3. **Pasos de Vinculación del Esqueleto**

    - Haz clic en el activo del personaje Skeleton Mesh, haz clic derecho para crear un nuevo blueprint de animación, y haz doble clic para editar el blueprint de animación. [Si no está claro, se recomienda ver el video]
    - Haz clic derecho para buscar `Rebocap`, selecciona `Rebocap Body Pose` y crea un nodo, y conecta a la persona pequeña en el lado derecho del nodo al `Result` de la pose de salida.
    - En la esquina inferior izquierda de la página de edición de blueprint, haz clic en el signo más para crear una nueva variable. Es necesario buscar el tipo de variable, busca `Rebocap`, selecciona `RebocapMapData`, referencia de clase, luego arrastra la variable al nodo `RetargetAsset` que acabas de crear en el blueprint, y se generará automáticamente un nodo de variable. Luego haz clic en el botón de compilar en la esquina superior izquierda.
    - Haz clic en el nodo de la variable recién creada, luego en el valor predeterminado a la derecha, haz clic en el signo más para crear un nuevo activo `Map`, que saltará automáticamente a una nueva página. En la nueva página, el usuario debe completar el mapeo del esqueleto por sí mismo. Nota, se recomienda completar los 24 nodos, puedes completar según los nombres de los huesos de `Avatar`.
         > Los nombres de los huesos se pueden seleccionar automáticamente haciendo clic en la primera persona esqueleto azul claro en la barra superior de la página del blueprint para ver los puntos correspondientes de cada hueso. Los 24 nodos en `Rebocap` son puntos estándar del esqueleto humano, y los nombres de los huesos en `Rebocap` se nombran a partir del punto de inicio del hueso. Por ejemplo, en `VRM`, el hueso llamado `LeftUpperLeg` comienza en la cadera, por lo que en `Rebocap` se llama `L_Hip`, el punto de inicio de `LeftFoot` es el tobillo, por lo que el nombre correspondiente es `L_Ankle`, y `L_Foot` en `Rebocap` corresponde a la zona de los dedos del pie. En el sistema de nombres de UE, generalmente se le llama `ball`.
         >
      > `L Collar` el hueso del hombro izquierdo
      > 
      > `L Shoulder` el hueso del brazo superior izquierdo
      > 
      > `L Elbow` el hueso del brazo inferior izquierdo
      > 
      > `L Wrist` el hueso de la palma de la mano izquierda
      > 
      > `L Hand` el hueso del dedo medio izquierdo [no se impulsará]
      > 
      > Si hay muchos huesos, puedes elegir huesos apropiados para el mapeo. Por ejemplo, si hay 6 espinas (spines), puedes elegir tres de ellas alternativamente.
      
   - Regresa a la página del blueprint abierta anteriormente (el mapeo del esqueleto seleccionado debe guardarse y compilarse para que surta efecto) y establece el valor del nodo de la variable en el activo `Map` recién creado.
   - Compila nuevamente y verifica si hay `Warnings`. Generalmente, solo debería haber 3 `Warnings`. Si hay un error en un `map` de esqueleto, un `warning` indicará que no se encontró un hueso determinado.
   - Cierra la ventana de edición del blueprint de animación, haz clic en el menú superior `Window->Virtual Production->Live Link`, luego selecciona `Source->Rebocap Source->conn` [`port` es el número de puerto, si el número de puerto de transmisión en `Rebocap` ha cambiado, debe modificarse aquí]. Si el cliente `Rebocap` está abierto, `connect` estará en estado `ok`; de lo contrario, estará en estado `bad`. Además, el usuario solo comenzará a transmitir datos después de la calibración de movimiento.

   <div align="center">
   <img src="/img/ue_plugin/ue2.png" alt="pic_left" width="80%" />
   <img src="/img/ue_plugin/ue3.png" alt="pic_left" width="80%" />
   </div>

4. **Descripción del Código**

   El código principal relacionado con el control de movimiento está en `Source\rebocap\Private\rebocap_pose_node.cpp`, mientras que otro código periférico relacionado incluye llamadas `dll` y `livelink`. La función `Init_Foot_Vertices_And_SkeletalData` se utiliza para obtener la posición esquelética predeterminada y los puntos `vert` del personaje, calculando seis puntos en las plantas de ambos pies para el contacto con el suelo [6 puntos por cada pie]. Dado que esto se calcula automáticamente, puede no ser lo suficientemente preciso; los usuarios pueden encontrar los seis puntos en las plantas de sus pies y pasarlos para una precisión potencialmente mayor.
   
   PD: Tamaños de pie más grandes pueden hacer que el personaje rebote hacia arriba y hacia abajo. Por un ejemplo extremo, si un personaje tiene pies de 2 metros de largo pero solo mide 2 metros de alto, cuando se pone de puntillas y aterriza, si necesita mantener los dedos de los pies tocando el suelo, el personaje definitivamente se moverá hacia arriba y hacia abajo.

5. **Instrucciones de Empaquetado**

   - Desarrolladores
      > Para los desarrolladores que necesitan empaquetar, pueden descargar la última versión del plugin (las versiones anteriores no se pueden ejecutar después del empaquetado). El modo `runtime` ha agregado la gestión de la conexión `Livelink`. Puedes referirte a los métodos `ConnectLiveLink` y `DisconnectLiveLink` en el archivo `Plugins/rebocap_unreal_engine_plugin/Source/rebocap_runtime/Private/RebocapLivelinkManagerDemoWidget.cpp` para su implementación. Si necesitas desactivar la interfaz de usuario incorporada del plugin, puedes modificar `Plugins/rebocap_unreal_engine_plugin/Source/rebocap_runtime/rebocap_runtime.Build.cs`, comentar la definición de macro `USE_REBOCAP_LIVELINK_MANAGER_DEMO`, y compilarlo tú mismo. A los desarrolladores que colocan el plugin en sus propios proyectos se les aconseja agregar la gestión de interfaz de usuario para las conexiones `livelink` ellos mismos.
   - Usuarios de Blueprint
      Se han agregado nodos de Blueprint para administrar `Livelink`, con los nombres de nodo: `Connect to Rebocap Livelink Source`, `Disconnect to Rebocap Livelink Source`
      <img src="/img/ue_plugin/ue4.png" alt="pic_left" width="80%" />

**Nota**:
1. Si estás usando la conexión `livelink` en el `Editor`, puede causar que el canal `livelink` esté ocupado, lo que resulta en un fallo al conectar exitosamente en el modo `game`. Se recomienda reiniciar el `Editor` y volver a intentarlo.
2. Para el modo `runtime` (es decir, modo `standalone o game`, que se ejecuta después de empaquetar), dado que aún no se ha encontrado un método para obtener vértices de malla en el modo `runtime`, el registro automático del esqueleto no incluye las plantas de los pies después de empaquetar, y el rendimiento de las plantas será un poco peor que en el modo `Editor`. Este problema se abordará en el futuro.


### Demostración de Operación en Video
No hay sonido aquí, es de uso temporal, se añadirán más adelante.

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/ue_plugin/ue_user_guide.mp4" type="video/mp4" />
</video>
</div>

### Meta Human (o personaje predeterminado Apose) modificado a TPose (conversión de APose a TPose)

> Nota: El A-pose debe coincidir con el estándar oficial; de lo contrario, se recomienda ajustar manualmente los ángulos tú mismo. Convierte el Apose en un archivo temporal de ángulo Tpose y guárdalo. Para detalles específicos, consulta el tutorial dentro del archivo comprimido a continuación.

<a href="/img/files/metahuman_change_tpose.zip" target="_blank" download="ue_ht_tpose.zip">Descargar</a>


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>