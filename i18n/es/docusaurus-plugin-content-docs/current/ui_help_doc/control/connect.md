---
sidebar_position: 1
title: "Panel de Estado"
---
El panel se divide en cuatro subpaneles. El panel `PC VR` se muestra según la selección:

- Estado
> Se utiliza para conectar el receptor y mostrar el estado de conexión del receptor.

- Calibración General
> Se utiliza para la calibración de movimiento y la configuración de parámetros clave durante la calibración de movimiento.

- PC
> Se utiliza para la configuración de parámetros comunes y el control en la captura de movimiento general de PC.

- VR
> Se utiliza para la configuración de parámetros comunes y el control bajo la captura de movimiento de SteamVR.

<a id="status"></a>

# Panel de Estado
<img src="/img/connect_status-en.png" alt="Status Panel" />

1. Visualización de Estado

    Indica el estado de conexión; el icono es verde cuando está conectado.

2. Botón de Conexión

    La fuente es gris cuando no se puede conectar, lo que indica que el receptor no está insertado. La fuente es blanca cuando se puede conectar. Si tienes problemas de conexión, [consulta aquí](../../tutorial/connect_and_use#how_to_solve_cannot_connect).

3. Botón de Apagado

    Haz clic para apagar todo. Para apagar un sensor específico, abre los detalles del sensor para apagarlo ([consulta aquí](../info#close_single_tracker)), o colócalo en la caja de carga para apagarlo ([consulta aquí](../../tutorial/hardware_check#hardware_button_instroction)).

4. Interruptor de Modo de Captura de Movimiento, cambia según tu escenario de uso

    Solo los usuarios que usan SteamVR necesitan cambiar al modo VR. Para escenarios regulares como la grabación de animaciones o transmisiones en vivo que no sean de VR, cambia al modo PC. Ten en cuenta que si se cambia al modo VR y la VR no está conectada, cambiará automáticamente al modo PC.

    Si la VR no se puede conectar, [consulta aquí](../../third_party_software_access/steamvr/README#vr_cannot_connect).

5. Interruptor de Registros (Logs)

    En el modo de vista previa 3D, el interruptor está disponible. Los registros no se muestran de forma predeterminada. El icono de la derecha borra los registros. Si [la vista previa 3D está cerrada](../view#how_to_close_3d_preview), los registros se muestran de forma predeterminada y no se pueden cerrar.

6. Botón de Documento de Ayuda

7. Alternador de Ajustes Avanzados  
   Una vez habilitado, se mostrarán todas las funciones avanzadas, que incluyen: operaciones de exportación e importación de configuración, reemplazo de sensores de pie con sensores de hombro, funcionalidad de doble toque del sensor, salida de capacidades de rastreador virtual de SteamVR en el lado de la `PC`, modificación de canal de comunicación, intensidad de transmisión de señal, ajuste de resistencia magnética, etc. **¡Antes de usar estas funciones, asegúrate de leer la documentación de ayuda correspondiente!**

8. Exportar, Guardar y Restaurar Configuración Predeterminada para Todas las Configuraciones  
   Función avanzada, procede con precaución. ¡Se recomienda hacer una copia de seguridad de la configuración actual antes de usar esta función!  

<a id="calibrate"></a>

# Panel de Calibración General
<img src="/img/connect_calibrate-en.png" alt="Calibration Panel" />

1. **Botón de Calibración**
   
   La calibración general requiere adoptar tres posturas: A-Pose, S-Pose, T-Pose. Para obtener detalles sobre los elementos esenciales del movimiento y la calibración, [consulta aquí](../../tutorial/connect_and_use#pose_calibration).
   
   Si la calibración falla, las posibles razones incluyen:
    *    El uso no se ajusta al modo de uso, [consulta aquí](../../tutorial/instroction_for_straps#follow_mode).
    *    Reemplazo accidental de puntos, [consulta aquí](../remap#tracker_replace).
    *    Problemas con el controlador USB, [consulta aquí](../../tutorial/connect_and_use#how_to_solve_cannot_connect).

2. **Botón de Calibración Avanzada**

   En comparación con el botón de calibración, esto agrega la postura B-Pose, principalmente para la calibración del ángulo de guiñada de los nodos de la cabeza, el pecho y la cintura. Otras funciones son consistentes con `Calibración`.

3. **Interruptor de Modo de Seis Ejes**

   Si el entorno magnético del usuario es deficiente, se puede habilitar el modo de seis ejes. Antes de habilitar el modo de seis ejes, se recomienda calibrar el giroscopio. El modo de seis ejes significa que no se utilizan los datos del sensor del magnetómetro, por lo que no se ve afectado por ningún entorno magnético, pero puede causar deriva del giroscopio, que se manifiesta como una desviación del ángulo de guiñada durante largos períodos de uso.
   
   ### Manifestación de Desviación del Ángulo de Guiñada (Inclinación del Ángulo de Guiñada) {#head_angle_slant_behavior}
      
      * Inclinarse de pie, como el pecho, da como resultado una rotación automática.
      * Inclinarse hacia adelante da como resultado doblarse hacia el lado frontal en lugar de hacia el frente.
      * Mientras se está acostado, si las piernas están alineadas con el cuerpo, la inclinación significa que las piernas forman un ángulo horizontal con el cuerpo, como ambas piernas inclinadas hacia la derecha.
   
   Para la identificación del entorno magnético, [consulta aquí](../../QA/magnet).

4. **Interruptor de Modo Antimagnético**

   - Para situaciones en las que los puntos individuales en el entorno del campo magnético son deficientes, se puede activar el modo antimagnético.
   - Si deseas que el sensor siga más rápido cuando el cuerpo se balancea ligeramente, se puede activar el modo antimagnético.
     > Por ejemplo, en el caso de balancearse de izquierda a derecha, el modo antimagnético seguirá más rápido en comparación con el modo no antimagnético. El modo no antimagnético sigue más lento con un ligero balanceo, pero no se ve significativamente afectado bajo un balanceo grande.
   
:::info Cuándo desactivar el modo antimagnético


* Para los usuarios que bailan vigorosamente, se recomienda desactivar el modo antimagnético y tampoco usar el modo de 6 ejes. Se aconseja a los usuarios de baile que realicen su actividad en un buen entorno magnético.

&emsp;&emsp;&emsp;&emsp;Por supuesto, en el futuro, también podríamos lanzar una versión profesional del sensor con un mejor rendimiento del giroscopio, que posiblemente cuente con un modo de baile vigoroso sin usar un magnetómetro. Mantente atento.
* Si el campo magnético general es muy caótico, como cerca de transformadores, o la habitación tiene altavoces grandes, y el rango de radiación del campo magnético es amplio, o se usa en una cama de muelles de hierro, se recomienda activar el modo de 6 ejes.

:::


   El interruptor antimagnético es recordado por el rastreador, lo que significa que cada vez que se enciende y se apaga, el resultado se almacena en el rastreador, no en la configuración del software.

5. **Interruptor de Filtro**

   Se utiliza para suavizar la vibración del movimiento. Por lo general, se recomienda activarlo. Si notas que cierta parte todavía vibra, verifica lo siguiente:
      * Primero, verifica si el uso causa vibración, como si el rastreador estuviera suspendido
      * Verifica el nivel antimagnético, generalmente se recomienda establecerlo en 12. Si se produce vibración, ajusta a 12 y vuelve a probar. Para el ajuste, [consulta aquí](config#update_reject_mag_and_strenth)

6. **Interruptor de Calibración Simétrica**

   Este interruptor es efectivo solo durante la calibración, principalmente para eliminar errores de medición del ángulo de guiñada magnético (la medición del ángulo de guiñada magnético se basa en acciones de calibración, que tienen errores, y el campo magnético en sí fluctúa, causando errores de medición). Por lo general, se recomienda habilitarlo [el modo de 6 ejes lo desactivará automáticamente]. Su función específica es promediar los ángulos de guiñada de los rastreadores izquierdo y derecho en la misma posición horizontal durante la calibración. Por ejemplo, si la dirección de pie actual de la pierna superior izquierda mide un ángulo de guiñada de 10 grados y la pierna superior derecha mide 20 grados, se utilizará un promedio de 15 grados.

   Solo cuando ambas piernas están a la misma altura horizontal y hay una diferencia significativa en la dirección del encabezado del campo magnético, es necesario apagarlo. Generalmente, si hay una gran diferencia de campo magnético a la misma altura, indica un entorno magnético pobre, y se recomienda usar 6 ejes.
   
   Para la identificación del entorno magnético, [consulta aquí](../../QA/magnet)

7. **Botón de Reinicio**
   
   ¡Restablece los parámetros del panel actual a los parámetros predeterminados! ¡Las funciones posteriores del panel son las mismas y no se repetirán!

8. **Botón de Documento de Ayuda**

9. **IK de Suelo (Ground IK)**
   > Se utiliza para ajustar el desequilibrio de ambos pies, como cuando al sentarse, un pie está en el suelo y el otro pie está a 2 cm del suelo. También puede aliviar el problema de oscilación hacia arriba y hacia abajo durante el proceso de cambio de pie.

10. **Reemplazar Pies por Hombros**
   > Configuración avanzada, cuando está habilitada, los pies serán reemplazados automáticamente por hombros, con el pie izquierdo correspondiente al hombro izquierdo y el pie derecho al hombro derecho. Después de habilitarlo, debes activar el `Motor de IA` (`AI Engine`).

11. **Configurar qué puntos de seis ejes habilitan la funcionalidad de seis ejes**
   > En el modo de seis ejes predeterminado, todos los puntos tienen la función de seis ejes habilitada. Si desmarcas un punto, ese punto utilizará un modo que no es de seis ejes.

<a id="cal_pc_panel"></a>

# Panel de PC
Estas configuraciones no afectan a los usuarios del modo VR, por lo que los usuarios de VR pueden omitir esta sección.

<img src="/img/connect_pc.png" alt="PC Panel" />

1. **Almacenamiento en Búfer de Fotogramas**

   Por defecto, el modo PC mantiene dos fotogramas de búfer (~34 ms). El búfer mejora la estabilidad; por ejemplo, puede reducir la deriva. Si solo capturas la parte superior del cuerpo, puedes desactivarlo para un seguimiento más en tiempo real. El almacenamiento en búfer de fotogramas se desactiva automáticamente cuando el `Motor de IA` (`AI Engine`) está habilitado.

2. **Modo Espejo**

   Reflejo de izquierda a derecha, útil para streamers; funciona como un espejo, volteando la imagen horizontalmente.

3. **Motor de IA (AI Engine)**
   > Después de habilitarlo, el desplazamiento general del personaje y el contacto del pie son decididos por un modelo de `IA` en lugar de los algoritmos y la heurística tradicionales.
   > La versión para PC del motor de IA proporciona dos modelos: uno que requiere sensores en ambos pies (`con pie` o `with foot`) y otro que funciona sin sensores de pie (`sin pie` o `no foot`).
   > Si seleccionas el modelo `con pie` cuando no hay sensores de pie presentes, automáticamente volverá a `sin pie`, mientras que el modelo `sin pie` todavía funciona cuando hay sensores de pie disponibles.

4. **Posición, Orientación y Postura**

   - El origen de la captura de movimiento inercial puede derivar con el tiempo. Puedes restablecer el origen (es decir, la posición inicial) directamente y también establecer un intervalo de restablecimiento automático. El valor predeterminado es 0 minutos, lo que significa que no hay restablecimiento automático. Si lo configuras en `n` minutos, el desplazamiento del personaje se restablecerá cada `n` minutos
   
   - Puedes bloquear el movimiento en el plano horizontal del personaje y/o el movimiento en el eje vertical. Los streamers a menudo necesitan estas dos características
   
   - Puedes ajustar manualmente la posición de referencia y la dirección a la que se enfrenta el personaje. El valor predeterminado es el origen. Esto es útil para la animación o el streaming: por ejemplo, si la habitación de un streamer es demasiado pequeña para mirar a la pantalla en un `T-Pose`, primero puede calibrar y luego cambiar la orientación.
   - La posición está en el orden `x y z` usando un sistema de coordenadas de la mano derecha, lo que representa el desplazamiento global. El eje `x` positivo apunta a la derecha de la pantalla, la `y` positiva apunta hacia arriba y la `z` positiva apunta fuera de la pantalla hacia el usuario. El valor máximo es de 99.9 m. El ángulo representa la dirección hacia la que se enfrenta el personaje.
   
   - Pose Freeze (Congelar Postura) está diseñado para los streamers que necesitan mantener una postura fija para manejar tareas diversas o evitar exponer su postura real. Cuando está habilitado, la pose se congela en el momento en que enciendes el interruptor; apagarlo restaura la captura de movimiento en tiempo real.

5. **Salida de Protocolo Externo**

   **Salida VMC**
   Los usuarios del protocolo VMC necesitarán esto. Si una aplicación de terceros se conecta a través de VMC, habilita la salida VMC.
   - Puedes cambiar el número de puerto después de deshabilitar la salida y luego habilitarlo nuevamente
   - La escala VMC es principalmente para ajustar esqueletos. Si el esqueleto impulsado en rebocap no coincide con el esqueleto de destino, puedes ver pies deslizantes, pies flotantes o pies debajo del piso. Ajustar la escala aquí puede mitigar esto. Sin embargo, si estás utilizando un modelo VRM, te recomendamos encarecidamente que cargues el modelo VRM y mantengas este valor en 1.0. Si estás utilizando otros modelos y deseas mejores resultados, también te sugerimos que cargues el esqueleto; el esqueleto se puede exportar a través del complemento de Blender; para obtener más detalles, consulta el [Uso del Plugin de Blender](../../plugins/blender#skeleton_export)

   **Salida VR** (Avanzado)
   > Cuando está habilitado y SteamVR está conectado, los rastreadores virtuales se envían automáticamente a SteamVR. Si necesitas cambiar los nodos de salida del rastreador, cambia temporalmente al panel `VR`, ajusta la configuración de salida de VR y luego vuelve a cambiar. Las posiciones de salida aquí son los puntos de seguimiento en el esqueleto virtual actual y no se ven afectadas por el HMD (visor).
   > La comunidad ha proporcionado instrucciones para usar SteamVR sin un HMD. El equipo oficial no asume ninguna responsabilidad por las consecuencias. Solo en chino; utiliza la función de traducción de tu navegador para otros idiomas: https://forum.rebocap.site/t/vmt-rebocap/240

6. **Grabación y Reproducción sin conexión**
   
   **Grabación**
   > Flujo de trabajo básico: Iniciar Grabación → Detener Grabación → Exportar Movimiento. Aquí se pueden exportar tres formatos: fbx, bvh y dae. El soporte para la animación `MMD` está planeado para el futuro.
   > Entre ellos, fbx6 es el formato FBX heredado; muchos programas modernos ya no lo admiten.
   > 
   > El esqueleto FBX exportado es compatible con `Mixamo` y se puede importar directamente a `Blender` y otro software 3D. El movimiento de la raíz (root motion) y la adición de un `T-Pose` son opcionales. Por defecto, la captura de movimiento mueve el nodo de la cadera; con el movimiento de la raíz habilitado, el nodo raíz se mueve en su lugar. Si deseas que la animación comience con el `T-Pose` predeterminado, habilita esa opción.
   > 
   > Si necesitas crear animaciones con el FBX, asegúrate de usar datos de rotación en lugar de las direcciones absolutas de los huesos contenidas en el FBX exportado. Más adelante invitaremos a los miembros de la comunidad a grabar tutoriales sobre cómo usar datos de captura de movimiento para hacer animaciones.

   **Reproducción sin conexión**
   > Propósito: Cargar y reproducir archivos de grabación en bruto `.rebo_anim` exportados sin conexión
   > Uso: Haz clic en Carga Sin Conexión, selecciona el archivo de grabación en bruto y la reproducción comenzará automáticamente. Se comporta de la misma manera que el modo en línea. Antes de cargar, puedes cambiar el esqueleto del usuario, elegir si usar `IK`, si habilitar el `Motor de IA`, etc., y los cambios surten efecto de inmediato.
   > La velocidad de reproducción es ajustable, pero esto cambiará la velocidad de fotogramas de salida del SDK; actualmente no hay ninguna estrategia de remuestreo o interpolación. Puedes pausar, reproducir, hacer bucles, etc. Después de que finaliza el clip, la etiqueta del botón de estado de reproducción no se actualiza: presiona el botón de reproducción dos veces para volver a reproducir.
   > Las grabaciones son a 60 fps, por lo que puedes calcular el número de fotograma objetivo por duración; por ejemplo, para saltar a los 10.5 s, salta al fotograma 630. Cambiar el número de fotograma busca inmediatamente.

:::info Uso de los datos predeterminados oficiales

Si los usuarios desean saber si su propio software puede ser compatible, o simplemente desean verificar el efecto, pueden usar los datos sin conexión. En la etapa actual, los datos sin conexión son un video de baile; se recomienda cargar el esqueleto con anticipación, cambiar al `Motor de IA`, usar el modo `con pie` y activar `IK de Suelo`.
Debido a que el intérprete usó el rastreador en el estómago en lugar de la cadera durante la grabación, se recomienda que en los parámetros de captura de movimiento, bajo la configuración `IK`, la Flexibilidad de la Cintura se establezca en 1.3, el Peso IK en 1.4 y la Inclinación de la Pierna a alrededor de 3.5.

:::


7. **Calibración de Doble Toque – Pecho**
    
    Después de habilitar esta opción, tocar dos veces el sensor puede activar la función. Tocar dos veces el sensor del pecho se usa para restablecer el origen.
    
    Nota: ¡Doble toque significa tocar el sensor en sí, no presionar el botón del sensor dos veces! ¡No presiones accidentalmente el botón! El intervalo entre los toques no debe ser mayor de 0.45 s ni menor de 0.2 s, y debes tocar con cierta fuerza.

8. **Calibración de Doble Toque – Cintura**

   Después de habilitar esta opción, tocar dos veces el sensor puede activar la función. Tocar dos veces el sensor del pecho restablece el origen, mientras que tocar dos veces el sensor de la cintura activa la Calibración de Movimiento.



<a id="vr_pannel"></a>

# Panel VR
<img src="/img/connect_vr.png" alt="VR Panel" />

1. **Indicador de estado de conexión de SteamVR**

   Si la conexión es exitosa, el indicador se vuelve verde; de lo contrario, no está conectado. Si la conexión falla, consulta [aquí](../../third_party_software_access/steamvr/README#vr_cannot_connect).

2. **Restablecimiento de guiñada (Yaw reset)**

   Al realizar un restablecimiento de guiñada, asegúrate de que todo el cuerpo no tenga un ángulo lateral; solo gira alrededor del eje lateral del cuerpo. Por ejemplo, mientras estás de pie, mantente en una postura en A (A-pose); cuando te pongas en cuclillas, mantén las rodillas apuntando hacia adelante; al acostarte, mantén el cuerpo en línea recta. **En la actualidad, la calibración de guiñada no surte efecto en los brazos**; el soporte para los brazos se considerará más adelante.

   Esta función se utiliza principalmente para recalibrar cuando la guiñada se desvía. Para la manifestación de la deriva de guiñada, consulta [aquí](#head_angle_slant_behavior). Si aún encuentras deriva después de la calibración, considera los siguientes tres factores:
      * La correa en sí está inclinada.
      * **El límite del guardián (guardian) no se ha desactivado**: desactiva el límite del guardián del visor independiente.
      * Se utilizó una herramienta como VRC Toolkit para modificar el ángulo de guiñada; restablécelo a 0.

   El interruptor de "Omisión rápida" (Quick skip) aquí se usa principalmente para acortar el tiempo requerido para la calibración de guiñada. Cuando está apagado, se muestra un mensaje de cuenta regresiva; cuando está encendido, no se muestra ninguna cuenta regresiva.

3. **Información de posición del visor (Headset)**

   Muestra la posición del visor en centímetros. El segundo valor es la altura y el valor más a la derecha es el ángulo de inclinación del visor.

4. **Prevenir el deslizamiento del pie**

   Cuando Prevenir Deslizamiento del Pie está desactivado, el seguimiento corporal es impulsado completamente por la posición del visor, por lo que los pies no permanecerán fijos en el suelo; por lo tanto, el deslizamiento del pie es inevitable en el modo predeterminado, aunque mantener el esqueleto virtual consistente con el cuerpo real puede mitigarlo.

   Además, cuando la altura del pie del avatar es mayor a unos 20 cm, el cálculo interno volverá automáticamente al modo predeterminado. Cuando Prevenir Deslizamiento del Pie está encendido, las suelas se adhieren forzosamente al piso, produciendo resultados más naturales en movimientos no rápidos, y generalmente se recomienda para cualquier cosa que no sea un baile intenso.

5. **IK de colisión con el suelo (Ground collision IK)**

   > Se utiliza para corregir el desequilibrio de los pies; por ejemplo, después de sentarse un pie está en el suelo mientras el otro está 2 cm por encima del suelo, y para reducir la oscilación vertical cuando los pies cambian los puntos de contacto.
   
6. **Re-centrado automático**

   El re-centrado automático se activa cuando el usuario permanece completamente quieto durante aproximadamente 1 segundo. El "Umbral de re-centrado" se refiere a la distancia entre la postura actual y la postura del "modo de seguimiento" (es decir, impulsado completamente por el visor). Cuando la distancia de cualquier rastreador virtual excede el umbral, se activa el re-centrado. Por lo tanto, si el umbral se establece muy bajo, el re-centrado ocurrirá con frecuencia y observarás pequeños cambios instantáneos en el rastreador.

   Después del re-centrado, los rastreadores se ajustan inmediatamente a las posiciones definidas por el modo de seguimiento. Si el resultado aún se ve mal, cambia al modo de seguimiento para verificar; la causa puede ser un ángulo de guiñada incorrecto o una correa inclinada.

7. **El Pecho | La Cintura siguen al Visor**

    Por defecto, si la opción contra el deslizamiento de los pies está habilitada, las posiciones de todos los nodos se determinan conjuntamente por el visor y las plantas de los pies. Después de encender este interruptor, las posiciones de los nodos del pecho y la cintura se determinan solo por la posición del visor.

8. **Rastreadores virtuales**
   
   Controla qué rastreadores virtuales se muestran; puedes configurarlos según sea necesario. Por ejemplo, los rastreadores de brazo están habilitados de forma predeterminada; puedes hacer clic aquí para desactivarlos. Si el modo VRC está habilitado, los rastreadores de la pierna superior y la pierna inferior se fusionan y se colocan en la posición de la rodilla. Los jugadores pueden decidir si habilitar esto según sus propias necesidades. Habilitar el modo VRC no da necesariamente mejores resultados en VRC; esta opción mueve principalmente los rastreadores virtuales a ubicaciones que coinciden mejor con los puntos de cálculo de VRC IK, pero el efecto final depende de muchos factores, como si el esqueleto virtual coincide con la persona real.

9. **Ocultar automáticamente al apagar**

   Oculta automáticamente los sensores que no se están utilizando. Hay un caso especial: si la función "Fusionar nodos de pierna" está habilitada, los sensores de los pies están exentos de ocultarse.

10. **Fusionar nodos de pierna**

   Fusiona los rastreadores virtuales de la parte superior e inferior de las piernas en la articulación de la rodilla. Esta también es la ubicación del rastreador recomendada de forma predeterminada en VRC, ¡pero no necesariamente produce mejores resultados dentro de VRC!

11. **Diagnóstico de posicionamiento**

   Esta función ayuda a evaluar el rendimiento del posicionamiento del rastreador. Cuando está habilitada, duplica un nuevo conjunto de rastreadores virtuales directamente frente a ti; la unidad de distancia es en centímetros, y la distancia se puede ajustar con el control deslizante. Para ver los rastreadores virtuales, ¡se recomienda cambiar al entorno predeterminado de SteamVR! En software de terceros como Reborn o VRC, los rastreadores virtuales generalmente no son visibles a menos que se use un modo especial.

12. **Altura del Suelo Virtual**

   Se usa principalmente para abordar el problema de que, cuando subes a plataformas más altas que el nivel del suelo (por ejemplo, después de ponerte el dispositivo) o desciendes a plataformas más bajas que el nivel del suelo, el suelo virtual todavía se calcula de acuerdo con la altura del piso original, lo que resulta en efectos deficientes. En otros casos, también puedes ajustar este valor según las necesidades reales. Por ejemplo, algunos jugadores pueden establecer la altura del suelo virtual ligeramente por encima del suelo real (alrededor de 3 a 5 cm), dando al solucionador IK más espacio y produciendo un mejor efecto general.

13. **Motor de IA (AI Engine)**

   Después de encender el Motor de IA, se admite el seguimiento de 5 puntos: dos rastreadores en los tobillos (se recomienda aproximadamente 5 cm por encima de la articulación del tobillo), dos rastreadores en los muslos y un rastreador en la cintura. Esta es la configuración mínima requerida. Se pueden usar otros rastreadores de acuerdo con las necesidades reales. Si no se usan ciertos rastreadores, el modelo de IA predecirá la orientación de la planta del pie y los nodos del pecho.

14. **Alternador de función "Locomoción en el lugar y Reemplazar posición"**

    Ambas características están implementadas en el complemento de rebocap interceptando las señales del controlador interno de SteamVR. No tienen ningún impacto en las herramientas de transmisión oficiales como `steam link` y `pico connect`, pero para la transmisión VD (VirtualDesktop) evitarán que VD cambie del modo de controlador al modo de seguimiento de dedos. Cada vez que este interruptor se habilite o deshabilite, debes reiniciar SteamVR para que surta efecto.  
    > Si esta función está desactivada, no podrás utilizar las funciones de Locomoción en el lugar (In-place Locomotion) o Reemplazar Posición del Controlador (Replace Controller Position).

15. **Área de configuración de Locomoción en el lugar**

    Esta característica requiere que la opción de arriba "Locomoción en el lugar y Reemplazar posición" esté habilitada. Mientras te encuentras en locomoción en el lugar, el complemento secuestra los datos del joystick del controlador (puedes elegir el joystick izquierdo o el derecho) y simula la entrada del joystick mediante pasos en el lugar, lo que permite que el personaje del juego camine dando pasos en el lugar. Esto puede reducir en gran medida el mareo por movimiento causado por la locomoción del joystick (proporciona un cierto nivel de engaño cortical). Durante la marcha en el lugar, la dirección de marcha predeterminada es hacia adelante; el joystick correspondiente sigue controlando la dirección de marcha; por ejemplo, puedes caminar hacia atrás. La velocidad de los pasos se puede ajustar a través del multiplicador de movimiento, y la velocidad angular de tus propios pasos afecta directamente a la velocidad de avance.  
    > De forma predeterminada, una vez que la función de locomoción en el lugar está habilitada, el joystick en el controlador correspondiente se vuelve inactivo. Sin embargo, agregamos un interruptor que restaura la funcionalidad del joystick cuando no se detecta ningún paso en el lugar, lo que puede aumentar la posibilidad de mareo.

16. **Calibrar el ángulo de guiñada del brazo**

    Cuando está habilitado, si los nodos del brazo están activos, al presionar el botón de calibración de guiñada también se corregirá el ángulo de guiñada de los brazos. Durante la calibración, recomendamos colocar los brazos de forma simétrica y natural contra los costados (aproximadamente en un ángulo de 10 a 25 grados desde el pecho). Siéntete libre de experimentar con la colocación del brazo para encontrar la posición de calibración que se sienta mejor.

17. **Reemplazar posición del controlador**

    Esta función también requiere que la opción "Locomoción en el lugar y Reemplazar posición" esté habilitada. Una vez habilitada, y con los dos nodos de salida de la mano encendidos, los puntos del rastreador de rebocap anularán los puntos de salida del controlador. Los controladores deben permanecer conectados durante este proceso. El propósito principal es resolver la pérdida de seguimiento cuando los controladores entran en los puntos ciegos visuales del visor (HMD).  
    > Nota: Para algunos controladores, el ángulo de lanzamiento de rayos no está alineado con la dirección del controlador. En este caso, debes editar `data/replace_controller_angle.txt` para compensar. Por ejemplo, los controladores `pico` requieren un valor de 25 (girando el rayo hacia adelante 25 grados). Ajusta esto en función de la dirección del controlador en T-pose. Después de cada modificación, desactiva y vuelve a activar esta función para que el cambio surta efecto.

18. **Doble Toque al Pecho (Función Avanzada)**

    Cuando está habilitado, tocar dos veces el sensor del pecho activa la función de Calibración de Guiñada.  

    Nota: ¡Doble toque significa tocar el sensor en sí, no presionar dos veces el botón del sensor! ¡No presiones el botón por error! El intervalo máximo entre toques es de 0.45 s y el mínimo es de 0.2 s, y se requiere una cierta cantidad de fuerza. Durante el sueño, puede ocurrir una activación accidental; se recomienda deshabilitar esta función en ese caso.

19. **Doble Toque a la Cintura (Función Avanzada)**

    El uso es el mismo que el del Doble Toque al Pecho. Tocar dos veces activa la función de Calibración de Movimiento.

<a id="vr_auto_height"></a>

##### Altura Automática de VR (VR Auto Height)
   Esta opción se ha movido a la sección Esqueleto y está habilitada de forma predeterminada. La altura automática infiere la altura del usuario a partir de la altura del visor (HMD). Sin embargo, la medición de altura del HMD se ve fácilmente afectada por el entorno del usuario y la propia precisión de medición del HMD. La fórmula actual es: `altura = visor * 1.05`.

   En otras palabras, mirar hacia arriba o hacia abajo durante la calibración afectará la medición de altura. En general, trata de mantener el error de medición dentro de ±3 cm. Si el error es grande, considera calibrar la distancia entre el HMD y el suelo.

:::danger Explicación del Error de Medición


¡Los grandes errores de medición de altura no tienen nada que ver con el dispositivo rebocap o el software rebocap en sí! Rebocap simplemente lee la altura reportada por el HMD y la multiplica por 1.05 para estimar la altura del usuario. ¡Si el error es grande, generalmente es causado por el error de medición de altura del HMD!

Los errores de medición de HMD generalmente se pueden resolver calibrando la altura del suelo. Si el error aún es significativo, es probable que se deba a factores ambientales (los HMD independientes generalmente se basan en el entorno capturado por sus cámaras para la medición). Encontrar un área relativamente abierta en la habitación puede aliviar el problema.

:::


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>