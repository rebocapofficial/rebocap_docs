---
sidebar_position: 4
title: "Configuración de Hardware"
---
<a id="hardware_config"></a>

# Configuración de Hardware
<img src="/img/config_hardware-en.png" alt="Panel de Configuración de Hardware" />

<a id="firmware_update"></a>

### 1. Actualización de Firmware
- Versión Actual: El número de versión del primer rastreador encendido. Si las versiones son inconsistentes, el registro mostrará información diferente sobre la versión del rastreador durante la calibración. Si compraste antes de diciembre de 2023 y no has actualizado el firmware, el número de versión aquí podría ser confuso.
- Versión Disponible: Obtiene el número de versión disponible del servidor para prevenir problemas con versiones específicas después de su lanzamiento, permitiendo a los usuarios revertir la versión. Actualmente, `preview` solo tiene la versión `v4`. Al hacer clic en el ícono de actualización a la derecha, se volverá a obtener.
- Actualizar Firmware
    > Actualiza el firmware a la versión seleccionada. Asegúrate de que los rastreadores conectados tengan suficiente batería y estén todos conectados correctamente, con un 100% de señal en el lado inferior izquierdo (las fluctuaciones en la calidad de la señal durante el proceso de actualización son normales). A continuación se muestra el progreso de la actualización. Una vez completada la actualización, todas las luces se pondrán blancas. Si ocurre un error de actualización o la luz RGB no está blanca después de la actualización, puedes actualizar nuevamente. Después de actualizar, necesitas reiniciar el rastreador para que surta efecto. Puedes reiniciar presionando el botón del rastreador o apagando y encendiendo el rastreador nuevamente.

:::info Las actualizaciones de firmware se pueden repetir, pero no se recomienda seguir actualizando si ya se actualizó correctamente.

:::


<a id="firmware_update"></a>

### 2. Actualización de Firmware del Receptor
- El método de actualización y la descripción son los mencionados anteriormente.

### 3. Calibración (Calibration) del Rastreador

<a id="gyro_calibrate"></a>

#### Calibración del Giroscopio (Gyroscope Calibration)
La calibración del giroscopio (Gyroscope Calibration) es relativamente sencilla. Después de encender el rastreador, colócalo inmóvil en el suelo para calibrarlo. Ten en cuenta que debe estar absolutamente quieto, sin vibraciones, como por ejemplo manteniéndolo alejado de las torres de los ordenadores de escritorio (por las vibraciones causadas por los ventiladores).

:::info Generalmente, los giroscopios no necesitan calibración repetida. Si hay una diferencia de temperatura significativa, la calibración puede ser necesaria. También se recomienda calibrar al usar 6 ejes.

:::


<a id="magnet_calibrate"></a>

#### Calibración del Campo Magnético (Magnetic Field Calibration)
La calibración del campo magnético (Magnetic Field Calibration) es relativamente engorrosa y requiere tiempo. **¡Sin embargo, entender la calibración del campo magnético (Magnetic Field Calibration) es esencial!!!!!!**

:::info Por qué es necesaria la Calibración del Campo Magnético (Magnetic Field Calibration)


La duración de la batería se degradará con el uso, causando cambios en los elementos internos de la batería. Durante la carga, un número muy pequeño de componentes puede transportar cantidades microscópicas de elementos de hierro, lo que también puede causar magnetización. Por lo tanto, el campo magnético de la propia placa de circuito PCB puede cambiar. La calibración del campo magnético (Magnetic Field Calibration) se usa principalmente para eliminar el campo magnético transportado por el propio sensor, lo cual se denomina desviación magnética en el documento.

:::


:::info Cómo determinar si hay Desviación Magnética (es decir, cuándo es necesaria la Calibración del Campo Magnético (Magnetic Field Calibration))


Puedes voltear el sensor en un punto fijo en el espacio por sus seis lados y observar la magnitud del valor del campo magnético del sensor. Si la diferencia está dentro de 2uT, la desviación magnética generalmente es pequeña, o [la diferencia relativa del campo magnético está dentro de 0.1](../info#detail_information).

**El punto de rotación elegido debe estar lejos de cualquier fuente de campo magnético, como pulseras magnéticas, teléfonos, ordenadores, auriculares, diademas, metales magnéticos, etc.**

:::


Cómo calibrar el campo magnético:
  - Coloca el rastreador en la caja de carga, **de manera intercalada, con los contactos de carga hacia arriba**. Los contactos de carga se refieren a los tres puntos de metal amarillo en el rastreador (es decir, la dirección de colocación es opuesta a cuando se carga).
    > Se pueden colocar un máximo de **8** a la vez, y deben colocarse **de forma intercalada**, con los **contactos de carga hacia arriba**, de lo contrario, ¡el campo magnético que lleva la caja se calibrará en el rastreador!!!
  - No lo coloques sobre la mesa durante la calibración. **Se recomienda calibrar en un punto fijo en el aire**, es decir, intenta rotar la caja de carga alrededor de un punto fijo en el espacio.
    > Ten en cuenta que incluso las mesas de madera a menudo tienen tornillos o clavos de hierro.
  - Un total de 6 lados. Después de hacer clic en calibración de campo magnético, asegúrate de rotar la caja siguiendo las instrucciones de texto, intentando rotar a una velocidad uniforme. En el total de 6 lados, reserva aproximadamente 6 segundos para el tiempo de rotación de cada lado y aproximadamente 1 segundo para cambiar al siguiente lado. Asegúrate de completar dentro del tiempo especificado, de lo contrario, afectará el efecto de la calibración.
    > En casos extremos, si solo se rotan 3 lados dentro del tiempo especificado, el efecto general se deteriorará después de la calibración. Puedes consultar la sección "Cómo determinar si hay Desviación Magnética" anterior para verificar los resultados de la calibración.

A continuación hay un video de calibración que puedes ver con anticipación. La rotación no distingue entre sentido horario o antihorario.
<div>
<video id="video" controls preload="metadata" width="45%">
      <source id="mp4" src="/img/mag_calibrate.mp4" type="video/mp4" />
</video>
</div>

:::info A continuación se muestra un video de demostración creado en colaboración con miembros de la comunidad. Se recomienda verlo en su totalidad para la primera calibración del campo magnético (Magnetic Field Calibration).


[Video de Demostración de la Calibración del Campo Magnético (Magnetic Field Calibration)](https://www.youtube.com/watch?v=JXry5wZhmtc)
<iframe src="https://www.youtube.com/embed/JXry5wZhmtc" title="Rebocap Magnetic  Calibration" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

:::



<a id="change_channel"></a>

### 4. Modificación del Canal de Comunicación
- La mayoría de los usuarios no necesitan usar esto, ya que el canal de comunicación predeterminado es suficiente para la mayoría de las personas. Esto aborda principalmente la necesidad de algunos usuarios de usar dos conjuntos de dispositivos simultáneamente en el mismo espacio.
    > Para aquellos con requisitos más altos, se lanzará una versión comercial del software en el futuro, dirigida principalmente a empresas y múltiples locutores que interactúan en el mismo escenario. Junto con canales de comunicación libres, soporta hasta 10 dispositivos en el mismo espacio. Si hay mayores necesidades de personalización, también puedes contactarnos directamente por correo electrónico.

- Descripción de Funciones
  - El botón izquierdo es el botón de reinicio de canal, que es el canal de comunicación predeterminado de fábrica. El lado derecho ofrece canales libres seleccionables, y no se recomiendan los cambios frecuentes de canal.
  - Se recomienda conectar todos los sensores antes de modificar el canal; de lo contrario, los rastreadores a los que no se les haya modificado el canal no podrán emparejarse con el receptor.
  - Si el emparejamiento falla y no estás seguro de cómo conectarlos, puedes usar la caja de carga para restablecer el canal del rastreador. El canal del receptor se puede restablecer utilizando el botón de reinicio de canal izquierdo (si el receptor ya está en el canal predeterminado, el botón izquierdo no se podrá hacer clic).

- Método para Restablecer el Canal con la Caja de Carga
  > Coloca el rastreador en la caja de carga, manteniendo la dirección consistente con la carga, luego haz clic en el botón de la caja de carga para encender todos los rastreadores. Mantén presionado el botón de la caja de carga durante 8 segundos y luego suelta. Cuando la luz azul del rastreador parpadee, mantén presionado por otros 8 segundos y suelta. Una luz verde parpadeando significa que el rastreador en la caja de carga ha restablecido con éxito el canal de comunicación.

- Si solo el receptor no puede conectarse, [por favor consulta aquí](../../tutorial/connect_and_use#how_to_solve_cannot_connect)

### 5. Actualizar el Color RGB del Rastreador
Actualiza el color `RGB` en el rastreador. Si deseas que diferentes rastreadores tengan colores diferentes, puedes encenderlos uno por uno y actualizar. El icono de la izquierda es un ejemplo de color, pero debido a las diferencias entre los colores de la pantalla RGB y los colores de la luz real, prevalecerá el color final de la luz RGB.


:::warning Recordatorio sobre el Consumo de Energía


Cuanto mayor sea el valor en RGB, más brillante será la luz y más rápido será el consumo de energía. ¡Cuantas más luces haya, más rápido será el consumo de energía! Por ejemplo, la luz blanca es la más brillante y consume energía más rápido, resultando en la vida útil de batería más corta.

:::


<a id="update_reject_mag_and_strenth"></a>

### 6. Actualizar la Resistencia Magnética del Rastreador y la Potencia de Emisión de la Señal
- Generalmente se recomienda ajustar la resistencia magnética a 12 y no cambiarla (el rango de valores es 1~12). Otros valores pueden causar inestabilidad severa en el rastreador.
- El rango ajustable para la potencia de emisión es de 1~18, donde 18 corresponde a 9.1dbm y 1 corresponde a -8dbm. En 18, la potencia de emisión es mayor. Generalmente, ajustarlo a 1 afectará la distancia de comunicación, pero la vida de la batería correspondiente se puede extender en 1~2 horas.

<a id="system_config"></a>

# Panel de Configuración del Sistema
<img src="/img/config_software-en.png" alt="Panel de Configuración del Sistema" />

### 1. Diagnóstico de Grabación de Datos
Se utiliza para proporcionar comentarios a los desarrolladores de `rebocap` con los datos cifrados originales de las acciones, facilitando a los desarrolladores el diagnóstico de problemas basados en las acciones grabadas y mejorando la calidad de la captura de movimiento. De forma predeterminada, el sistema comenzará a grabar datos automáticamente después de la calibración de la acción, pero no se guardarán. Los usuarios pueden hacer clic para comenzar a grabar y luego hacer clic para detener la grabación; los datos se guardarán automáticamente en el directorio `<rebocap_install_dir>/data/record_data/`.

### 2. Selección del Idioma del Sistema
Selecciona el idioma; el sistema elegirá automáticamente el idioma local. Si no es compatible, se puede utilizar el inglés de forma predeterminada.

Nota: Actualmente, otros idiomas se traducen automáticamente del chino. Si tienes alguna pregunta, puedes proporcionar comentarios para mejorar en el foro.

### 3. Colores del Tema
La versión actual admite temas en blanco y negro, siendo el tema blanco el que aún se está mejorando y se planean mejoras adicionales.

### 4. Teclas de Acceso Rápido del Sistema
Facilita a los usuarios la asignación de teclas de acceso rápido. Actualmente, solo admite operaciones en realidad virtual, y se añadirá funcionalidad de grabación en el futuro.

Después de hacer clic, simplemente introduce la tecla de acceso rápido en el teclado para vincularla. Ten en cuenta que solo puede comenzar con una de las siguientes cuatro teclas de función: `win, ctrl, shift, alt`, y admite un máximo de combinaciones de dos teclas de función, que deben emparejarse con un carácter normal, como `a~z`.

<a id="websocket_broadcast"></a>

### 5. Transmisión de WebSocket
Todos los SDK, complementos, etc., utilizan la transmisión WebSocket de `rebocap`. Si deseas cambiar el número de puerto, puedes cerrar la transmisión, modificarla y luego volver a abrirla.

:::danger Puerto Ocupado


Si el puerto predeterminado 7690 está ocupado, el puerto aquí se incrementará automáticamente en 1. ¡Si ves que el complemento no se puede conectar, comprueba si el número de puerto aquí ha cambiado!

:::


### 6. Interruptor de Renderizado 3D
Se utiliza para encender o apagar la ventana de vista previa 3D. Apagarla puede ahorrar rendimiento, pero no es conveniente para la depuración de la captura de movimiento.

### 7. Interruptor para Usar la Barra de Título del Sistema
El uso de la barra de título del sistema puede resultar en una inconsistencia de estilo general, pero el rendimiento generalmente será un poco mejor.

### 8. Actualización de Software
Función reservada, función de actualización en caliente no completada.


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>