---
sidebar_position: 1
title: "¿Soporta Mac y Linux?"
---
## ¿Soporta Mac y Linux?
> Actualmente no compatible, Linux no será compatible en el futuro, Mac podría ser compatible

## ¿Soporta dispositivos independientes (standalone)?
> Planes futuros para soportar Quest y Pico, dependiendo del soporte del dispositivo para receptores USB (es decir, receptores de señal dedicados)

<a id="audio"></a>

## La inicialización de audio falló
> Verifique problemas de controladores del dispositivo de audio

<a id="poor_signal"></a>

## Cómo lidiar con la mala calidad de la señal
> En primer lugar, verifique la [fuerza de la señal](../ui_help_doc/info#hardware_detail) para asegurarse de que no haya interferencias de señales fuertes u obstrucciones cerca del receptor y el rastreador, como no colocar el receptor en la parte posterior del chasis, y evitar unidades USB cerca del receptor.
>
> En segundo lugar, asegúrese de que la carga de la `CPU` no sea demasiado alta o que la `CPU` no esté en modo de ahorro de energía. Trate de mantener la carga de la `CPU` dentro del 70%, y descarte problemas de baja frecuencia de `CPU`, como enfriamiento deficiente de la computadora portátil, que puede causar que la frecuencia baje a menos de `2.5GHz`.

<a id="not_static"></a>

## Persona no detectada como estacionaria durante la calibración (Calibration)
> Generalmente, mantener `Apose` puede involucrar algo de balanceo de ida y vuelta. Por favor intente controlarlo. Para instrucciones detalladas de calibración, por favor [consulte aquí](../tutorial/connect_and_use#pose_calibration).

<a id="send_failed"></a>

## Error al enviar datos de calibración (Calibration)
> Asegúrese de que no haya problemas con la fuerza de la señal, y primero verifique el controlador del receptor `USB`. Esto es causado usualmente por problemas del controlador `USB`. Para soluciones específicas, [consulte aquí](../tutorial/connect_and_use#how_to_solve_cannot_connect).

<a id="need_calibrate_gyro"></a>

## Es posible que los giroscopios de algunos nodos necesiten calibración (Calibration)
> Esta información es principalmente un aviso, ya que la persona al no estar estacionaria también puede conducir a una detección incorrecta de la información estacionaria del giroscopio (sensor de velocidad angular en el rastreador). La clave es verificar los datos del giroscopio cuando el rastreador se coloca absolutamente quieto en el suelo. Aparte de algunos valores atípicos, la mayoría de las veces, los valores dentro de 0.3 son normales. De lo contrario, se recomienda la calibración. En el modo de 6 ejes, se recomienda calibrar el giroscopio antes de cada uso. Para métodos de calibración específicos, [consulte aquí](../ui_help_doc/control/config#gyro_calibrate).

<a id="vr_height"></a>

## En el modo VR, la altura solicitada durante la calibración (Calibration) no coincide con la altura personal
> El dispositivo Rebocap en sí no tiene la capacidad de medir la altura. La medición de altura se basa completamente en los datos proporcionados por los auriculares (headset). Para detalles, por favor [consulte aquí](../ui_help_doc/control/connect#vrpannel).

<a id="port_open_failed"></a>

## Error de inicio del puerto de transmisión
> El puerto está ocupado o hay un proceso residual de una instancia anterior de `rebocap`. Asegúrese de que solo se esté ejecutando un `rebocap` y de que solo haya un proceso `rebocap` en el administrador de tareas.

<a id="connect_failed"></a>

## Conexión del conector anormal
1. Elimine la ocupación del puerto. Específicamente, asegúrese de que solo se esté ejecutando una instancia del cliente `rebocap`, y que no haya ningún otro software ocupando el puerto.

2. Anomalía del controlador. Para detalles, [por favor consulte aquí](../tutorial/connect_and_use#how_to_solve_cannot_connect).

<a id="steamvr_connect"></a>

## SteamVR no se puede conectar
> Por favor [consulte aquí](../third_party_software_access/steamvr/README#vr_cannot_connect).

## Ajuste de esqueleto ineficaz
> Por favor [consulte aquí](../ui_help_doc/control/skeleton_setting#skeleton_not_valid).

<a id="firmware_version"></a>

## La versión del firmware necesita actualizarse
> Por favor [consulte aquí](../ui_help_doc/control/config#firmware_update) para actualizar el firmware directamente.

<a id="cal_exception"></a>

## Excepción de calibración (Calibration)
- Considere que el modo de uso no cumple con los requisitos, [por favor consulte aquí](../tutorial/instroction_for_straps#followmode).
- Considere las anomalías subyacentes del controlador, que requieren un retroceso del controlador y volver a conectar el receptor, [por favor consulte aquí](../tutorial/connect_and_use#how_to_solve_cannot_connect) (se necesitan ver métodos específicos en la sección ampliada).

<a id="error_puts_on"></a>

## El uso no cumple los requisitos
- Asegúrese de que los puntos desgastados se iluminen en las partes correspondientes de la persona en el diagrama superior izquierdo de la interfaz de usuario.
- Asegúrese de que la función de reemplazo no esté habilitada. Para métodos específicos de habilitación y deshabilitación, [por favor consulte aquí](../ui_help_doc/remap#trackerreplace).
- Asegúrese de que el modo de uso cumpla con los requisitos, [por favor consulte aquí](../tutorial/instroction_for_straps#followmode).

<a id="height_error"></a>

## Anormalidad en la Altura de los Auriculares
- Si la altura detectada está por debajo de los 10 cm, es probable que se deba a una anomalía en el controlador de SteamVR, posiblemente causada por un nombre de sistema Unicode, es decir, un nombre de sistema que no esté en inglés. Esto se solucionará en el futuro. Actualmente, puede intentar resolver este problema cambiando la ubicación de instalación ([consulte aquí](../third_party_software_access/steamvr/#other_notes)). Si el problema persiste, [contacte al foro](https://forum.rebocap.site), y nuestro personal técnico lo asistirá.
- Si la altura de los auriculares no coincide con la suya, primero puede [revisar aquí](../ui_help_doc/control/connect#vr_pannel), o puede mirar las publicaciones del foro:
  - [Versión China](https://forum.rebocap.site/t/rebocap/52/1)
  - [Versión en Inglés](https://forum.rebocap.site/t/how-to-solve-the-abnormal-height-detection-in-rebocap/53/1)
  - [Versión Japonesa](https://forum.rebocap.site/t/rebocap/54)

## Problemas de Temblor
  - Para los temblores relacionados con el campo magnético, puede [cambiar el nivel antimagnético](../ui_help_doc/control/config#update_reject_mag_and_strenth) a 12, y luego cambiar a [modo antimagnético](../ui_help_doc/control/connect#calibrate).
  - El temblor o parpadeo del hombro requiere actualizar a la última versión.
  - Para la oscilación de la cintura después de saltar y aterrizar, se recomienda descartar problemas de las correas, asegurarse de que el rastreador no esté firmemente adherido a la cintura, o comprar una correa ancha, o usar un método de sujeción complejo, y evitar la liberación rápida para bajar el centro de gravedad del rastreador con respecto a la correa.

<a id="freq_change_note"></a>

## Problemas de Modificación del Canal de Comunicación
- El canal de comunicación puede alternar entre el canal predeterminado y el canal 1. Sin embargo, durante el proceso de cambio, solo el canal del rastreador conectado cambiará. Si cambia de canal sin un rastreador conectado, solo el canal de comunicación del receptor cambiará, lo que provocará una falta de coincidencia en los canales de comunicación. Deberá volver atrás para conectar.
- Si se produce un error de cambio de canal de comunicación, puede intentar cambiar de nuevo hasta que coincidan.
- Si descubre que no puede conectarse, también puede intentar cambiar de canal de un lado a otro para ver si puede conectarse correctamente.
- Si aún no puede cambiar correctamente, puede usar la función de reinicio físico del canal de comunicación. Puede reiniciar el canal de comunicación utilizando la caja de carga, [vea aquí para más detalles](../ui_help_doc/control/config#change_channel). Además, haga clic en el canal de reinicio en el software (si no se puede hacer clic, el receptor ya está configurado en el canal predeterminado).


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>