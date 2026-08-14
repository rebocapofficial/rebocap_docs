---
sidebar_position: 1
title: "Consejos"
---

# Consejos
Leer esta página sin haber revisado el tutorial no tiene sentido. [¡Por favor, lee el tutorial primero!](../tutorial/README)!!!!

# Pasos para la Integración con SteamVR
1. Para el primer uso, asegúrate de reiniciar SteamVR después de abrir el software. Una luz indicadora verde en la esquina superior izquierda del panel VR indica que la integración de VR ha sido exitosa. [Si no puedes conectarte, consulta aquí](#vr_cannot_connect)
2. Lleva al menos 8 puntos de seguimiento (trackers), luego haz clic en calibración de acción. Durante la calibración de Apose, el visor debe llevarse correctamente [especialmente cuando se escucha el pitido rápido]. Para [procedimientos de calibración específicos, por favor consulta aquí](../../tutorial/connect_and_use#pose_calibration)
    > Se deben llevar los muslos, las pantorrillas, la cintura y el pecho. Si no se llevan las plantas de los pies, ¡solo se puede usar el [modo de seguimiento](../../ui_help_doc/control/connect#vr_pannel)!
3. Después de una calibración normal, revisa el tracker en la interfaz predeterminada de SteamVR. ¡Asegúrate de apagar SteamVR Home; de lo contrario, no podrás ver el tracker!
    > Aquí se recomienda que si surge algún problema, primero cambies a la interfaz predeterminada de SteamVR para verificar si la posición del tracker cumple con las expectativas. En otro software, como VRC, debido a la intervención de IK y muchas configuraciones, no representa la posición original del tracker.
   - Para saber cómo apagar SteamVR Home y cambiar a un fondo blanco, consulta aquí
      <div align="center">
       <img src="/img/steamvr_shutdown_home2-en.png" alt="left" width="39%" />
       <img src="/img/steamvr_shutdown_home3-en.png" alt="left" width="39%" />
       </div>

4. Después de ponerte el visor, comprueba si la posición del tracker cumple con las expectativas
    > Aquí puedes abrir la función de diagnóstico para copiar un conjunto de trackers para una visualización más fácil.

5. Si encuentras errores o problemas como la desaparición del tracker, puedes reiniciar. Se recomienda reiniciar el cliente rebocap y SteamVR.
    > ¡También es muy recomendable proporcionar comentarios en el foro! Puede ser un problema de SteamVR o un problema de rebocap. Si es un problema de rebocap, intentaremos encontrar el problema y actualizarlo.

6. Si la diferencia de altura indicada por la calibración de VR es demasiado grande, [por favor, consulta aquí](../../ui_help_doc/control/connect#vr_pannel)

A continuación se muestra un ejemplo de integración en SteamVR. ¡La vibración severa del nodo de la cabeza es causada por fluctuaciones (jitter) en los datos de salida de posicionamiento del visor!
  <div>
  <video id="video" controls preload="metadata" width="100%">
        <source id="mp4" src="/img/steamvr_example.mp4" type="video/mp4" />
  </video>
  </div>


<a id="how_to_solve_tracker_slant"></a>

### Qué hacer si el tracker está inclinado
Si el personaje parece normal en la vista previa 3D, pero el tracker está inclinado en relación consigo mismo, es probable que haya tres razones:
- El área de seguridad de la máquina todo en uno (all-in-one) no está desactivada, y el usuario está cerca o fuera del límite de seguridad.
  > Más del 90% de los problemas de los usuarios provienen de este punto.
- Un movimiento excesivo causa desplazamiento. En principio, se corregirá automáticamente; permanecer quieto durante 1-2 segundos es suficiente.
:::danger Correa para el pie


Si se usa una correa en las plantas de los pies, es muy probable que se produzca un desplazamiento. [Para detalles específicos, por favor consulta aquí](../../tutorial/instroction_for_straps#tracker_position_on_body)

:::

- La `ovr advanced setting` ha modificado el ángulo de dirección; se recomienda restablecerlo a 0.
- La transformación de coordenadas espaciales no se puede leer. [Por favor, consulta aquí](#other_notes)

Si la vista previa 3D ya está inclinada, sigue los diagnósticos a continuación:
- Es probable que haya ocurrido una desviación magnética, o el entorno del campo magnético sea deficiente. Si es el primer uso o un problema ocasional en usos posteriores, se recomienda realizar primero una calibración del campo magnético (Magnetic Field Calibration). [Para métodos de calibración específicos, consulta aquí](../../ui_help_doc/control/config#magnet_calibrate)
- Descarta la posibilidad de que la correa esté inclinada y comprueba si algún tracker individual se ha quedado sin batería o se ha apagado inesperadamente.
- Si hay problemas como piernas cruzadas u otros problemas en las piernas, lee detenidamente la [sección de correas](../../tutorial/instroction_for_straps) y la [sección de calibración de acción](../../tutorial/connect_and_use#pose_calibration) en el tutorial.
- Si el problema aún no se puede resolver, por favor descarta la interferencia del campo magnético y recomendamos encarecidamente leer [este artículo](../../QA/magnet) a fondo.

<a id="vr_cannot_connect"></a>

# VR no puede conectarse
El controlador de `VR` se instalará automática y silenciosamente en el directorio `steamvr`. Si notas que el icono en la esquina superior izquierda del panel de `VR` no se vuelve verde, puedes seguir estos pasos para solucionar problemas.

1. Comprueba si `steamvr` se está ejecutando.
2. Comprueba si el receptor `rebocap` está conectado y en un [estado de conexión](../../ui_help_doc/control/connect#status).
3. Comprueba si el plugin de `rebocap` en `steamvr` está bloqueado. Al mismo tiempo, puedes comprobar si el plugin de `rebocap` está instalado.

   <div align="center">
    <img src="/img/steamvr_mask1-en.png" alt="left" width="9%" />
    <img src="/img/steamvr_mask2-en.png" alt="left" width="29%" />
    <img src="/img/steamvr_mask3-en.png" alt="left" width="29%" />
    </div>

4. Si el plugin de `steamvr` no está instalado en el tercer paso, por favor cópialo e instálalo manualmente de la siguiente manera:
- Localiza el directorio de instalación de `steamvr`, la ubicación de instalación predeterminada es `C:\Program Files (x86)\Steam\steamapps\common\SteamVR`, y la ubicación del plugin está en el directorio `driver` bajo el directorio `steamvr`.
  > Si has cambiado la ubicación de instalación de `SteamVR`, por favor búscalo tú mismo.
- Copia `rebocap_driver` al directorio del plugin de `steamvr`. El directorio `rebocap_driver` se encuentra en el directorio `data` del directorio de instalación de `rebocap`, como se muestra en la imagen de la izquierda. La ruta final extraída se muestra en la imagen de la derecha.
   <div align="center">
    <img src="/img/steamvr_plugin0.png" alt="left" width="45%" />
    <img src="/img/steamvr_plugin.png" alt="left" width="50%" />
    </div>

<a id="other_notes"></a>

### Otras Notas
:::info ¡Atención para Usuarios con Nombres de Sistema No Ingleses!


Si tu sistema usa un nombre que no está en inglés, puede hacer que la transformación de coordenadas en `steamvr` sea inaccesible, lo que resulta en posiciones finales incorrectas, con el personaje flotando o cayendo al piso en steamvr. En este momento, el sistema a menudo muestra lo siguiente al inicio: excepción del plugin de rebocap steamvr, no se puede encontrar el sistema de coordenadas espaciales. En este caso, steamvr solo se puede reconocer si está instalado en uno de los dos siguientes directorios:

`C:\Program Files (x86)\Steam\steamapps\common\SteamVR`

`D:\Steam\steamapps\common\SteamVR`

:::



<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>