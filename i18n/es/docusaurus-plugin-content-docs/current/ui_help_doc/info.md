---
sidebar_position: 2
title: "Información de la Lista de Hardware"
---

# Información de la Lista de Hardware
La información de la lista de hardware se utiliza para la vista previa global.
- Primera Columna
  > Nombre de la Pieza
- Segunda Columna
  > Número de Pieza, corresponde al número de la etiqueta detrás del sensor
- Tercera Columna
  > Nivel de Batería, el porcentaje solo se puede usar como referencia; se deriva de la conversión de voltaje. Sin embargo, la medición de voltaje no es una medición de muestreo A/D profesional, por lo que hay un cierto error y no es un porcentaje absoluto. Debe basarse en el tiempo de uso real.
- Cuarta Columna
  > Esto se refiere a la calidad de la comunicación, por ejemplo, qué porcentaje de los datos de velocidad de fotogramas de 120 se recibió correctamente en los últimos 2 segundos. **¡No la fuerza de la señal!** La fuerza de la señal se puede ver en los detalles del rastreador, medido en `dbm`. Generalmente, >-70dbm se considera buena calidad de señal; por ejemplo, -30 dbm es una señal muy fuerte.
- Quinta Columna
  > Valor absoluto del campo magnético, medido en uT. Un campo magnético consistente se muestra generalmente en verde. Si algunos valores son muy altos o muy bajos, se mostrarán en rojo. Para obtener detalles sobre cómo evaluar el campo magnético, consulta Detección y Diagnóstico del Campo Magnético

![img.png](../../../../../static/img/hardware_list_info-en.png)

<a id="hardware_detail"></a>

# Detalles de Hardware
Haz clic en un elemento de la lista para ver la información detallada del hardware.

<a id="close_single_tracker"></a>

### Apagar Individualmente
  > Puedes hacer clic en el botón de apagado para apagar este rastreador individualmente.

<a id="detail_information"></a>

### Otra Información
- Nivel de Batería
  > Porcentaje específico de batería, esto es solo para referencia general; debe considerarse el tiempo de uso real.
- Calidad de Comunicación
  > Qué porcentaje de los datos de velocidad de fotogramas de 120 se recibió correctamente en los últimos 2 segundos, ¡no la fuerza de la señal! La fuerza de la señal se puede ver en los detalles del rastreador, medido en `dbm`. Generalmente, >-70dbm se considera buena calidad de señal; por ejemplo, -30 dbm es una señal muy fuerte.
- Señal Recibida
  > La fuerza de la señal recibida por el receptor desde el sensor; >-70 dbm se considera buena calidad de señal.
- Señal Pasiva
  > La fuerza de la señal recibida por el sensor desde el receptor; >-70 dbm se considera buena calidad de señal.
- Campo Magnético Relativo
  > Este es el tamaño relativo en comparación con el espacio y el tiempo de la Pose-A durante la calibración. Un tamaño relativo que se mantenga consistentemente dentro de 1.1 generalmente se considera un buen entorno de campo magnético. En un buen entorno de campo magnético, la aplicación de algoritmos antimagnéticos es más efectiva. Para la determinación y calibración específicas del campo magnético, consulta aquí
- Aceleración
  > Aceleración después de la calibración de tres ejes, normalizada a la aceleración gravitacional actual.
- Giroscopio
  > Giroscopio después de la calibración de tres ejes. Si el rastreador está completamente estacionario y el valor aquí está a más de 0.2 de distancia del cero, se recomienda realizar la Calibración del Giroscopio

![img.png](../../../../../static/img/hardware_detail-en.png)


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>