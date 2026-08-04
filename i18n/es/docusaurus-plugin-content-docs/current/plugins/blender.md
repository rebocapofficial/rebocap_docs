---
sidebar_position: 2
title: "Descarga del Plugin de Blender"
---
# Descarga del Plugin de Blender

Haz clic en el enlace a continuación para descargar directamente:
- **Blender Plugin Beta 9**
<a href="/img/files/rebocap_blender_plugin_v9.zip" target="_blank" download="rebocap_blender_plugin_v9.zip">blender con python 3.6~3.12</a>
Notas de actualización:
- Compatible con Blender 4.4 y superior
- Corrige el error de residuo de proceso en el plugin rebocap
- Corrige el error de exportación del esqueleto para estabilizar los pies en escenarios de conducción en tiempo real.
- Soporta todas las versiones de Python 3, por ejemplo, puede soportar Blender 4.1
- Soporta el enlace directo del esqueleto de Mixamo
- Se corrigió el error con los controladores de modelos fbx
- Se corrigió el error con el eje de grabación de animación
- Agrega la característica de selección de adsorción de huesos


# Video Tutorial de Blender
Nota: No hay sonido aquí.

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/for_blender_install/blender_usage.mp4" type="video/mp4" />
</video>
</div>

# Instalación del Plugin de Blender

Pasos de instalación:
Abre `Edit->Preference`, selecciona `Add-ons` en el panel emergente, haz clic en `Install` a la derecha, selecciona el archivo descargado `rebocap_blender_plugin.zip` y luego haz clic en Install Add-on para instalar. Después de la instalación, debes marcar la casilla para activarlo. Escribe rebocap como se muestra en la figura y marca el plugin para instalarlo correctamente.

<div align="center">
    <img src="/img/for_blender_install/blender_1.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_2.png" alt="pic_right" width="45%" />
</div>

Después de una instalación exitosa, el menú del plugin correspondiente debería aparecer en el lado derecho, como se muestra en la figura.
    > Nota, si no ves el menú, hay una pequeña flecha apuntando hacia la izquierda en la que puedes hacer clic para verlo.

<div align="center">
    <img src="/img/for_blender_install/blender_3.png" alt="pic_left" width="25%" />
</div>

:::info Qué hacer si la instalación falla


Si algunos usuarios no pueden instalarlo, busquen la ubicación de instalación original del plugin de Blender y extraigan directamente `rebocap_blender_plugin.zip` en el directorio de instalación de blender. La ubicación de instalación predeterminada del plugin es `C:\Users\<tu_nombre_de_usuario>\AppData\Roaming\Blender Foundation\Blender\<numero_de_version>\scripts\addons`, donde `tu_nombre_de_usuario` es tu nombre de usuario y `numero_de_version` es el número de versión de Blender que instalaste.

:::


![Diagrama de ubicación de instalación de Blender](../../../../../static/img/for_blender_install/blender_23.png)

# Vinculación del Esqueleto
1. Vinculación automática del esqueleto VRM
2. Si usas la especificación de esqueleto Mixamo con FBX, se puede lograr la vinculación automática en modo directo, lo que significa que en el modo directo, todos los avatares de Mixamo pueden ser controlados.
  > Sin embargo, los 12 puntos fijos en las plantas de los pies deben seleccionarse manualmente (esto puede ignorarse si los requisitos del efecto de los pies no son altos).

:::danger ¡¡¡Recordatorio!!!


Debes abrir el cliente rebocap y calibrar el movimiento antes de hacer clic en `connect`, de lo contrario es posible que debas reiniciar blender para continuar con la captura de movimiento en tiempo real.

El esqueleto del personaje vinculado es impulsado por el nodo de la cadera. Si el nodo de la cadera no es el hueso raíz, o si el nodo de la cadera no se puede mover (algunos esqueletos asocian forzosamente la cadera con la raíz, y el desplazamiento local de la cadera no se puede cambiar), entonces las nalgas del personaje pueden permanecer en su lugar.

:::


Consejos: Para escalar fbx a metros, consulta la posición en la figura a continuación y cambia `scale` a 0.01
<div align="center">
    <img src="/img/for_blender_install/fbx_change_meter.png" alt="pic_left" width="25%" />
</div>

### Habilitar el Modo de Desarrollador
Abre `Edit->Preference`, selecciona `Interface` a la izquierda y luego marca `Developer Extras`

<div align="center">
    <img src="/img/for_blender_install/blender_4.png" alt="pic_left" width="45%" />
</div>

### Importar Personaje

Tomando un personaje en formato `VRM` como ejemplo, descarga el plugin VRM [aquí](https://github.com/saturday06/VRM-Addon-for-Blender/releases/download/2_20_24/VRM_Addon_for_Blender-2_20_24.zip).

Para personajes en formato FBX, se recomienda utilizar el plugin [`better fbx`](https://blendermarket.com/products/better-fbx-importer--exporter) para la importación.

<div align="center">
    <img src="/img/for_blender_install/blender_5.png" alt="pic_left" width="45%" />
</div>

### Seleccionar Personaje Objetivo en el Plugin

Después de importar, abre `REBOCAP_CONNECTION`, selecciona `Armature` a la derecha [la opción `Drive Type` no aparecerá si no está seleccionada], luego elige `retarget` en el menú `REBOCAP_CONNECTION` y selecciona este personaje como `Source`. Puedes arrastrar directamente el `Armature` al cuadro `Source`.

<div align="center">
    <img src="/img/for_blender_install/blender_6.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_7.png" alt="pic_left" width="45%" />
</div>

Después de seleccionar Source, aparecerá el siguiente menú:

<div align="center">
    <img src="/img/for_blender_install/blender_8.png" alt="pic_left" width="45%" />
</div>

### Vinculación de Huesos

Cada hueso debe coincidir con el hueso correspondiente en el personaje objetivo. [Aquí solo se proporcionan partes en inglés, tradúcelas si no están claras]

Pelvis es las nalgas, Spine es el hueso por encima de las nalgas, Chest tiene dos secciones, algunos personajes tienen solo una sección de Chest, en cuyo caso puedes vincularlo a cualquiera de las secciones. Si el personaje objetivo tiene dos huesos, elige el que esté más cerca de Chest. Los cuatro huesos de la Pierna (Leg) deben estar vinculados, el Dedo del pie (Toe) es opcional.

Para personajes en formato VRM, puedes hacer clic directamente en Auto Detect después de importar y se completará automáticamente. Otros formatos requieren que los usuarios encuentren manualmente los nombres de los huesos correspondientes y los seleccionen.

<div align="center">
    <img src="/img/for_blender_install/blender_9.png" alt="pic_left" width="80%" />
</div>

### Obtener el ID de Vértice de la Planta del Zapato

Este paso es un poco más complicado y se puede omitir si no estás demasiado preocupado por el efecto. El propósito principal es obtener el límite de la planta del zapato para que el personaje camine a lo largo del límite. Sin embargo, si los zapatos son demasiado grandes, puede causar vibración vertical al cambiar de pie.

1. El primer paso es habilitar el modo de desarrollador, que se mencionó al principio del documento.

2. Cambia a Object Mode, luego deselecciona Bone, y haz clic en el pie del personaje para seleccionar Mesh.

    <div align="center">
    <img src="/img/for_blender_install/blender_10.png" alt="pic_left" width="80%" />
    </div>
    <div align="center">
    <img src="/img/for_blender_install/blender_11.png" alt="pic_left" width="80%" />
    </div>

3. Haz clic para seleccionar el personaje, asegúrate de que la parte del zapato esté seleccionada, luego cambia a EditMode.

    <div align="center">
    <img src="/img/for_blender_install/blender_12.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_13.png" alt="pic_left" width="45%" />
    </div>
    <div align="center">
    <img src="/img/for_blender_install/blender_14.png" alt="pic_left" width="80%" />
    </div>


4. Abre Indices, lo cual difiere entre Blender 3.6 y Blender 4.0.

    <div align="center">
    <img src="/img/for_blender_install/blender_15.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_16.png" alt="pic_left" width="45%" />
    </div>

5. Selecciona los vértices y registra los valores correspondientes.

    En total, se deben registrar 12 vértices: el izquierdo, centro y derecho del antepié de cada pie, y el izquierdo, centro y derecho del talón. Ten en cuenta que esta es la dirección izquierda y derecha del personaje en sí. Al buscar, puedes orientar la espalda del personaje hacia ti para facilitar la identificación.

    Durante la selección de puntos, dado que necesitas seleccionar el Mesh, el menú de la derecha no será visible durante la selección. Debes registrarlo tú mismo en el orden del izquierdo, centro y derecho del antepié, y el izquierdo, centro y derecho del talón.

    Aquí hay algunas operaciones básicas en Blender:
    > shift + clic en la rueda del ratón es para arrastrar
   > 
    > ctrl + clic en la rueda del ratón es para hacer zoom
   > 
    > clic en la rueda del ratón es para cambiar la vista

6. Después de grabar, cambia del modo `Edit` nuevamente al modo `Object`, selecciona `Armature` y luego completa los ID de los pies.

    <div align="center">
    <img src="/img/for_blender_install/blender_21.png" alt="pic_left" width="80%" />
    </div>

#### Ejemplo de Explicación para Vincular los ID de Vértice de la Planta
Por ejemplo, los tres vértices del antepié izquierdo del personaje a continuación son:
8863 8860 8862

 <div align="center">
 <img src="/img/for_blender_install/blender_17.png" alt="pic_left" width="60%" />
 </div>
 <div align="center">
 <img src="/img/for_blender_install/blender_18.png" alt="pic_left" width="32%" />
 <img src="/img/for_blender_install/blender_19.png" alt="pic_left" width="32%" />
 <img src="/img/for_blender_install/blender_20.png" alt="pic_left" width="32%" />
 </div>


<a id="skeleton_export"></a>

# Exportación del Esqueleto
Una vez vinculados todos los huesos clave, aparecerá un botón de guardar hueso. Haz clic en exportar y elige una ubicación para guardar.

 <div align="center">
 <img src="/img/for_blender_install/blender_22.png" alt="pic_left" width="60%" />
 </div>

Luego impórtalo a Rebocap, [consulta aquí](../ui_help_doc/control/skeleton_setting#skeleton_import)


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>