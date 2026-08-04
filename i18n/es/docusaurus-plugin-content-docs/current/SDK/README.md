---
sidebar_position: 1
title: "Descripción de la Interfaz del SDK"
---
# Descripción de la Interfaz del SDK
Actualmente, la DLL expone un total de 8 puertos, y cada SDK es un contenedor (wrapper) alrededor de la interfaz de la DLL. Puedes consultar el archivo de cabecera `include/rebocap_ws_sdk/rebocap_ws_sdk.h` en el SDK de cpp para más detalles.

El tipo de valor de salida del SDK es un cuaternión, que admite múltiples salidas de espacio de coordenadas [sistema de coordenadas diestro de OpenGL por defecto, Blender, Unity, UE], con la unidad de desplazamiento en metros.

El SDK de Python aún no ha integrado la interfaz `rebocap_ws_sdk_calculate_foot_vertex`.

### Descripción de la Interfaz
* rebocap_ws_sdk_new
```
    Crea una instancia del SDK. Los parámetros incluyen:
    1. Espacio de coordenadas, los espacios específicos admitidos se pueden encontrar en cada SDK, no se detallan aquí.
    2. Si se utiliza el sistema de coordenadas global. Pasar 0 utilizará el sistema de coordenadas local, que es relativo al sistema de coordenadas del hueso padre. Todas las rotaciones son relativas a la rotación de la postura T (T-pose). Si no tienes clara la rotación, puedes consultar el código fuente de Blender, Unity y UE, donde la rotación de Unity es relativamente más fácil de entender.
    
    Valor de retorno:
    Devuelve un puntero a la instancia del objeto SDK.
```

* rebocap_ws_sdk_release
```
Libera el objeto de la instancia del SDK. El parámetro pasado es el puntero de la instancia.
```
* rebocap_ws_sdk_open
```
Abre el cliente WebSocket y se conecta al puerto WebSocket. Para el uso específico y descripciones de los valores de retorno, por favor consulta el código del SDK.
```
* rebocap_ws_sdk_close
```
Cierra el cliente WebSocket y se desconecta. Para uso específico, consulta el SDK.
```
* rebocap_ws_sdk_set_pose_msg_callback
```
Registra una devolución de llamada (callback) de mensaje. Aquí, los datos solo se enviarán desde el WebSocket después de que el usuario realice la calibración de acción. La velocidad de fotogramas es de 60 fotogramas por segundo. Para un uso específico, consulta el código del SDK.
Por favor, consulta los nombres de los 24 huesos para el orden de las articulaciones.
```
* rebocap_ws_sdk_set_exception_close_callback
```
Registra una devolución de llamada para el cierre anormal de WebSocket. Para el uso específico, consulta el código del SDK.
```
* rebocap_ws_sdk_get_last_msg
```
Además de la forma de devolución de llamada, también puedes obtener directamente el último mensaje de acción aquí. El formato de los datos es coherente con la devolución de llamada.
```
* rebocap_ws_sdk_calculate_foot_vertex
```
    Esta interfaz se utiliza principalmente para registrar los puntos de contacto del pie y el esqueleto del cuerpo en Rebocap.
    Necesitas pasar los datos del esqueleto del cuerpo (las posiciones de cada articulación, en el mismo orden que la secuencia SMPL).
    Si necesitas que la DLL calcule automáticamente las posiciones de los puntos de contacto, debes pasar la malla del pie (foot mesh). También puedes pasar la información de la posición del punto de contacto del pie (3 puntos en la parte delantera y trasera de cada pie, un total de 12 puntos), en cuyo caso la DLL no calculará automáticamente, sino que utilizará los valores pasados.
    Ten en cuenta que la unidad aquí es metros, las coordenadas son coordenadas globales y necesitas usar el sistema de coordenadas de OpenGL. Si no es así, necesitas pasar parámetros de conversión. Para un uso específico, por favor consulta la demo de Unity y el uso del plugin de UE.
    
    Esta interfaz es relativamente compleja. Los usuarios deben tener suficientes capacidades de desarrollo o ser capaces de comprender completamente el código en la demo de Unity o el código del plugin de UE. La versión de Python no expone esta interfaz. Si es necesario, puedes encapsular la interfaz de Python desde el SDK de CPP o la DLL original.
    
    La mayoría de los usuarios pueden subir modelos VRM al cliente Rebocap para el desarrollo de plugins, logrando el mismo efecto. Para entender los puntos de contacto del pie, puedes consultar la documentación de integración de Blender sobre la exportación de esqueletos.
```

### 24 Nombres de Huesos
Los correspondientes nombres estándar de Mixamo y SMPL son los siguientes, sumando un total de 24 huesos. Como referencia, el hueso en el índice 0 corresponde a las caderas, que es el nodo de la cintura.
Entre ellos, las articulaciones correspondientes a los dedos de los pies y de las manos, izquierda y derecha, no tienen nodos de seguimiento correspondientes, por lo que la rotación local de salida es 0. Si se utiliza la rotación global, los valores de rotación de salida serán coherentes con el nodo padre.

- Nombres correspondientes de Mixamo
```python
joints_mixamo = [
        "mixamorig:Hips",
        "mixamorig:LeftUpLeg",
        "mixamorig:RightUpLeg",
        "mixamorig:Spine",
        "mixamorig:LeftLeg",
        "mixamorig:RightLeg",
        "mixamorig:Spine1",
        "mixamorig:LeftFoot",
        "mixamorig:RightFoot",
        "mixamorig:Spine2",
        "mixamorig:LeftToeBase",
        "mixamorig:RightToeBase",
        "mixamorig:Neck",
        "mixamorig:LeftShoulder",
        "mixamorig:RightShoulder",
        "mixamorig:Head",
        "mixamorig:LeftArm",
        "mixamorig:RightArm",
        "mixamorig:LeftForeArm",
        "mixamorig:RightForeArm",
        "mixamorig:LeftHand",
        "mixamorig:RightHand",
        "mixamorig:LeftHandIndex1",
        "mixamorig:RightHandIndex1"
]
```
- Nombres correspondientes estándar de SMPL
```python
joints_smpl = [
    "Pelvis",
    "L_Hip",
    "R_Hip",
    "Spine1",
    "L_Knee",
    "R_Knee",
    "Spine2",
    "L_Ankle",
    "R_Ankle",
    "Spine3",
    "L_Foot",
    "R_Foot",
    "Neck",
    "L_Collar",
    "R_Collar",
    "Head",
    "L_Shoulder",
    "R_Shoulder",
    "L_Elbow",
    "R_Elbow",
    "L_Wrist",
    "R_Wrist",
    "L_Hand",
    "R_Hand"
]
```


# Descarga del SDK
### SDK de Python
> Compatible con python3.6~python3.12

<a href="/img/files/rebocap_ws_sdk_python_v2.zip" target="_blank" download="rebocap_python_sdk_v2.zip">descargar sdk de python v2</a>

Contenido de la actualización de Python sdk v2:
> Se solucionó el problema de interbloqueo causado por la interfaz `get_last_msg`
> Se agregó compatibilidad con todas las versiones de `python`

### SDK de C#
> Por favor, consulta el README.md en el archivo descargado
> 
> Para su uso, puedes consultar el proyecto de Unity

<a href="/img/files/csharp_sdk_with_demo_v2.zip" target="_blank" download="rebocap_csharp_sdk_v2.zip">descargar sdk de csharp v2</a>

Contenido de la actualización de C# sdk v2:
> Se solucionó el problema de interbloqueo causado por la interfaz `get_last_msg`


### SDK de CPP
> Por favor, consulta el README.md en el archivo descargado
> 
> Para su uso, puedes consultar el proyecto de UE

<a href="/img/files/rebocap_cpp_sdk_v03.zip" target="_blank" download="rebocap_cpp_sdk_v3.zip">descargar sdk de cpp v3</a>

Contenido de la actualización de C++ sdk v3:
> Se solucionó el problema de interbloqueo causado por la interfaz `get_last_msg`


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>