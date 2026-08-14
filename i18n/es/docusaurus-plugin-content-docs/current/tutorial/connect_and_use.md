---
sidebar_position: 4
title: "Guía de Conexión"
sidebar_label: "Guía de Conexión"
---

# Guía de Conexión
1. Enciende el tracker que deseas conectar
   > Los modos de combinación de trackers compatibles se pueden encontrar en el [capítulo anterior](instroction_for_straps#follow_mode)
2. Inserta el receptor en el puerto USB de la computadora
3. Abre el software Rebocap y haz clic en conectar

![Conectar Receptor](../../../../../static/img/connect-en.gif)

<a id="how_to_solve_cannot_connect"></a>

### Razones para Fallo de Conexión y Soluciones
<details>
<summary>Haz clic aquí para expandir y ver las razones específicas del fallo de conexión o de transmisión de datos</summary>


* Puede haber un problema con el puerto USB, por ejemplo, los puertos USB de algunas computadoras de usuarios acumulan polvo, lo que puede provocar conexiones inestables.
> Intenta cambiar el puerto USB o desenchufarlo y volver a enchufarlo
* Un cliente `Rebocap` ya puede estar ejecutándose, lo que causa que el puerto esté ocupado, o algún otro programa puede estar utilizando el puerto
> El síntoma es que se puede hacer clic en el botón de `Conectar` (Connect), pero la conexión falla. En este punto, asegúrate de que otros clientes `Rebocap` estén completamente cerrados, y se recomienda desenchufar y volver a enchufar el receptor. Además, verifica en el administrador de tareas si hay otros procesos `Rebocap` y finalízalos de manera forzada si los encuentras.
* Asegúrate de que el puerto serie funcione correctamente y que no haya otro software de puerto serie virtual instalado. Algunos usuarios pueden experimentar fallos en los controladores después de instalar dispositivos de puerto serie virtual.
> Por ejemplo, si el controlador `com0com` está instalado, es necesario desinstalarlo y, a continuación, desenchufar y volver a enchufar el receptor.
* Asegúrate de que el controlador no haya sido reemplazado. Puedes seguir los pasos mostrados en la imagen a continuación para revertir el controlador del puerto serie del receptor. Si aún no se puede conectar, desenchufa el receptor y vuelve a insertarlo.
  > Si no se puede realizar la calibración después de la conexión, y el color de la luz RGB no se puede cambiar, también puedes intentar revertir el controlador.

    ![Revertir Controlador del Receptor](../../../../../static/img/rollback_driver-en.gif)


</details>

### Señal Débil o Inestable Después de la Conexión
* Si utilizas una computadora de escritorio, no coloques el receptor detrás del chasis.
* Intenta mantener un área abierta de más de 5 cm junto al receptor, por ejemplo, no insertes una unidad USB junto al receptor. Si es posible, utilizar un cable de extensión puede ayudar a mejorar la señal.

# Calibración (Calibration)
Por favor, consulta la imagen a continuación para ver las instrucciones de uso. La posición de uso específica varía de persona a persona. Para principios y detalles, por favor, consulta el [capítulo anterior](instroction_for_straps#tracker_position_recomendation).

:::info Asegúrate de probar 15 puntos para el primer uso


Si los resultados de la prueba son deficientes, puede haber las siguientes razones:
1. Problemas de campo magnético; por favor [consulta aquí](../QA/magnet) para soluciones específicas.
2. Es posible que el giroscopio necesite calibración; por favor [consulta aquí](../ui_help_doc/control/config#gyrocalibrate).
3. Problemas con el uso y el estiramiento; por favor [lee detenidamente y consulta aquí](instroction_for_straps#tracker_position_on_body).

:::


<a id="pose_calibration"></a>

### Calibración (Calibration) de Postura
Haz clic en el botón de Calibración de Postura (Pose Calibration) en la interfaz del software. La referencia de calibración de postura se muestra en la imagen de abajo, y hay sugerencias de imágenes correspondientes en el software. Asegúrate de leer todos los puntos clave y especificaciones de acción.

- **Puntos Clave de Calibración (Calibration)**
  * Después de hacer clic en Calibración de Postura, entra inmediatamente en la postura A (A-Pose) y permanece quieto.
    > El sistema comenzará a detectar si la persona está quieta 2 segundos después de hacer clic. Ten cuidado de controlar la amplitud de balanceo hacia adelante y hacia atrás, minimizando el movimiento tanto como sea posible para completar la inicialización de cada sensor. La duración de la detección es de 10 segundos; siempre que detecte que has estado quieto durante los últimos 2 segundos, entrará inmediatamente en el programa de calibración.
  * Durante el período de pitido rápido para cada acción, el sistema registrará los datos de postura correspondientes.
    > Asegúrate de permanecer quieto durante el período de pitido rápido. Se recomienda cambiar de acción 1 segundo después de que termine el pitido rápido.
  * Después de cambiar de acción, por favor, permanece quieto y espera a que suene el pitido rápido. Se recomienda completar el proceso de cambio en 2 segundos.
  * Durante el proceso de cambio de acción, no muevas los pies.
    > Ambos pies deben permanecer estrictamente quietos durante la calibración, sin ningún tipo de movimiento.

- **Especificaciones de Acción**
  * **A-Pose**
    
    Ambas piernas deben estar verticales y lo más paralelas posible, con aproximadamente un puño de distancia entre los pies. Ambos brazos deben estar rectos hacia abajo, no doblados, con las palmas orientadas hacia uno mismo, la espalda recta y mirando hacia el frente.
    > Si sientes que los pies están cerrados después de la calibración y los pies del personaje virtual están cruzados, reduce la distancia entre los pies durante la calibración.
    > 
    > Si sientes que los pies están cerrados después de la calibración y la distancia entre los pies del personaje virtual es demasiado grande, aumenta la distancia entre los pies durante la calibración.
  * **T-Pose**
    
    Ambas piernas deben permanecer consistentes con la A-Pose, y ambos brazos deben extenderse hacia afuera, alineados con los hombros, y ambas manos deben estar en línea recta, con las palmas hacia abajo.
  * **S-Pose**
    
    Ambas piernas deben doblarse ligeramente hacia adelante unos 30 grados, sin doblarse en exceso. Ambos brazos deben extenderse hacia adelante, perpendiculares a la parte superior del cuerpo, paralelos a los hombros, y ambos brazos deben estar paralelos.
    > Si los brazos no llevan trackers, los movimientos del brazo se pueden ignorar.
  * **B-Pose**
    
    La parte superior del cuerpo debe inclinarse hacia adelante a 30 grados, y los movimientos de las manos no necesitan ser considerados.
    > B-Pose significa postura combinada (Blend-Pose), utilizada principalmente para calibrar los ángulos de dirección de los trackers de la cintura, el pecho y la cabeza.

Las imágenes de izquierda a derecha son: `APose` `TPose` `SPose` `BPose`
<div align="center">
<img src="/img/apose.png" alt="left" width="22%" />
<img src="/img/tpose.png" alt="left" width="22%" />
<img src="/img/spose.png" alt="left" width="22%" />
<img src="/img/bpose.png" alt="left" width="22%" />
</div>

<a id="third_party"></a>

# Integración de Software
### Integración con SteamVR [consulta aquí](../third_party_software_access/steamvr/README)
- Integración con VRChat [consulta aquí](../third_party_software_access/steamvr/vrchat)
- Tutorial de integración de la comunidad [https://kdocs.cn/l/cbZLGg2QeEHk](https://kdocs.cn/l/cbZLGg2QeEHk), si el enlace es inaccesible, por favor <a href="/img/files/RebocapVRchatTutorialEnglish.pdf"  target="_blank" download="RebocapVRchatTutorialEnglish.pdf">descarga el archivo PDF</a> para verlo (el archivo sin conexión podría no actualizarse de inmediato)


### Integración de Usuarios del Protocolo VMC [consulta aquí](../third_party_software_access/VMC/README)
- Integración con warudo [consulta aquí](../third_party_software_access/VMC/warudo)

# Puntos Que Debes Saber
Para evitar varios problemas durante el uso (como trackers que se inclinan inexplicablemente) y para garantizar una mejor experiencia de captura de movimiento, asegúrate de leer las siguientes instrucciones.

### Calibración (Calibration) de Hardware
- [Calibración (Calibration) de Campo Magnético](../ui_help_doc/control/config#magnetcalibrate)
- [Calibración del Giroscopio (Gyroscope Calibration)](../ui_help_doc/control/config#gyrocalibrate)

### Cómo Establecer la Configuración de Captura de Movimiento en el Software
- Para la configuración del campo magnético, por favor lee las [Instrucciones Relacionadas con el Campo Magnético](../QA/magnet)
- Para otras configuraciones, puedes hacer clic en el icono de interrogación en la esquina superior derecha de cada panel de configuración

### Mejor Forma de Atar las Correas
Si te saltaste [la sección anterior](instroction_for_straps), por favor léela durante tu tiempo libre, o asegúrate de leerla detenidamente si encuentras algún problema.

:::info Puntos Importantes a Recalcar


Se enfatiza nuevamente aquí que el método de sujeción del tracker en la planta del pie es crucial. Intenta no utilizar correas para evitar que el tracker se vea afectado por la fricción entre la correa y el suelo, lo que podría afectar el efecto de captura de movimiento general. Por favor, consulta la sección anterior para más detalles.

:::



<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>