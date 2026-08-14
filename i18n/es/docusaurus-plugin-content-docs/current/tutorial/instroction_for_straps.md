---
sidebar_position: 2
title: "Instalación del rastreador en la correa"
---

## Instalación del rastreador en la correa
<a id="tracker_common_install_method"></a>

### Método de instalación común del rastreador
**Puntos clave:**
1. El lado afelpado de la correa debe mirar hacia la parte inferior del rastreador.
2. Para usuarios de complexión más pequeña, si la correa es demasiado larga, mover el rastreador cerca de la hebilla puede aliviar significativamente este problema.

<div>
<video id="video" controls loop preload="metadata" width="60%">
      <source id="mp4" src="/img/tracker_normal.mp4" type="video/mp4" />
</video>
</div>

<br /><br />
> Para las correas de cintura y pecho, primero debe desabrochar el lado triangular, luego instalar el rastreador en la correa antes de abrochar la hebilla. Consulte el video a continuación para obtener más detalles.
  <div>
  <video id="video" controls loop preload="metadata" width="60%">
        <source id="mp4" src="/img/root_normal.mp4" type="video/mp4" />
  </video>
  </div>

<a id="tracker_complex_install_method"></a>

### Método de instalación compleja del rastreador
:::info Explicación de la comparación


En comparación con el método común, el método complejo es más engorroso y requiere más tiempo, pero es más estable, con una fuerza más fuerte ejercida por la correa en el rastreador. El método específico se muestra en la figura.

:::


<div>
<video id="video" controls loop preload="metadata" width="60%">
      <source id="mp4" src="/img/tracker_complex.mp4" type="video/mp4" />
</video>
</div>

<br /><br />
> Para las correas de cintura y pecho, al usar el método complejo, se necesita una correa auxiliar adicional. Consulte el video a continuación para obtener más detalles.
  <div>
  <video id="video" controls loop preload="metadata" width="60%">
        <source id="mp4" src="/img/root_complex.mp4" type="video/mp4" />
  </video>
  </div>

## Instalación de liberación rápida en la correa
> La liberación rápida es opcional en China continental (solo para usuarios con liberación rápida)
### Método de instalación común de liberación rápida
**Puntos clave**
1. El lado afelpado debe mirar hacia la parte inferior del rastreador.
2. El lado afelpado debe estar debajo de la liberación rápida, no directamente contra el rastreador. La primera imagen a la izquierda es el ejemplo correcto, y la segunda imagen correspondiente es el ejemplo incorrecto.
3. De manera similar, para usuarios de complexión más pequeña, si la correa es demasiado larga, el rastreador se puede mover cerca de la hebilla para reducir el problema de que la correa sea demasiado larga, [igual que la instalación del rastreador](#tracker_common_install_method).

<div>
<video id="video" controls loop preload="metadata" width="60%">
      <source id="mp4" src="/img/kuaichai_normal.mp4" type="video/mp4" />
</video>
</div>

<br /><br />
> Para las correas de cintura y pecho, primero debe desabrochar el lado triangular, luego instalar la liberación rápida, [igual que la instalación del rastreador](#tracker_common_install_method).

<a id="quick_fix_complex_install"></a>

### Método de instalación compleja de liberación rápida
:::info Explicación de la comparación


En comparación con el método común, el proceso es más engorroso y toma relativamente más tiempo, pero es más estable, con una fuerza más fuerte ejercida por la correa en el rastreador. El método específico se muestra en la figura.

:::


<div>
<video id="video" controls loop preload="metadata" width="60%">
      <source id="mp4" src="/img/kuaichai_complex.mp4" type="video/mp4" />
</video>
</div>


<br /><br />
> Para las correas de cintura y pecho, primero debe desbloquear la hebilla triangular y luego instalar la liberación rápida, [igual que la instalación del rastreador](#tracker_complex_install_method).

## Longitudes de correa recomendadas para diferentes partes del cuerpo
> Estas son solo recomendaciones y no son absolutas. Todos pueden ajustarse de manera flexible de acuerdo con su propia situación.

| Longitud de la correa | Parte del cuerpo |
|:-----:|:--------:|
| 100cm | Cintura, Pecho |
| 60cm  | Pierna superior, Cabeza |
| 40cm  | Pierna inferior, Brazo superior, Planta del pie |
| 25cm  | Brazo inferior, Mano |

<a id="follow_mode"></a>

## Modos de uso del rastreador
> Después de habilitar `AI Engine`, se recomienda atar el sensor de la pierna inferior a unos 5 cm por encima del tobillo.

### Modos compatibles con PC
* Uso completo de 15 puntos
  > Soporta `AI Engine` (ambos modelos soportados) y sin AI Engine
* Uso de 13 puntos (sin planta del pie)
  > Cambia automáticamente a `AI Engine` y es el modelo `no foot`
* Modo de cuerpo superior
  > Ambos brazos, pecho, cintura (opcional), se recomienda deshabilitar `AI Engine`
* Modo de un solo brazo
  > Un total de 3 puntos para un brazo y la mano correspondiente
* Modo de cuerpo completo de 6 puntos
  > Puede ser compatible en el futuro, pendiente

### Modos compatibles con VR
> Todos los modos de VR admiten la habilitación de `AI Engine`

* Modo VR 10 puntos
  > 6 puntos en piernas, pecho, cintura, brazo superior izquierdo, brazo superior derecho
* Modo VR 8 puntos
  > 6 puntos en piernas, pecho, cintura
* Modo VR 6 puntos
  > En comparación con VR de 8 puntos, elimina dos rastreadores de plantas de los pies
* Modo VR 5 puntos
  > Pierna superior izquierda, pierna inferior izquierda, pierna superior derecha, pierna inferior derecha, cintura
* Modo VR 3 puntos
  > Soporte futuro, en desarrollo
### Agregar nodos de hombro
- Puede reemplazar los nodos de las manos a los hombros, pero la solución de unión de la correa debe resolverla usted mismo. Actualmente, las correas oficiales son difíciles de soportar en el hombro.
- En el modo PC, bajo el modo de uso de 13 puntos de cuerpo completo, las consideraciones futuras pueden incluir agregar un interruptor para reemplazar la planta del pie con el hombro.

<a id="tracker_position_on_body"></a>

## Partes específicas del cuerpo para rastreadores
### Introducción al principio de posicionamiento del rastreador
Los rastreadores de sensores inerciales son sensores de dirección, no sensores de posición, por lo que cualquier deformación física cambiará la dirección del esqueleto virtual. Nuestra posición se calcula en función de la dirección de cada hueso del cuerpo y la longitud del esqueleto virtual, por lo que el software no puede percibir realmente la posición relativa del nodo usado en el hueso.

<a id="tracker_position_recomendation"></a>

### Posiciones recomendadas de uso del rastreador
Actualmente, no hay posiciones específicas recomendadas. Cualquier posición, siempre que se use en el hueso correspondiente, se puede calibrar y usar para la captura de movimiento. Sin embargo, la distribución de los tipos de cuerpo varía, lo que lleva a efectos inconsistentes en diferentes posiciones. Por lo tanto, el uso en diferentes posiciones puede resultar en diferencias significativas en el efecto. Aquí, solo proporcionamos pautas de uso y explicaciones, y se necesita más experimentación para comprender el impacto de las diferentes posiciones.

> Explicación del principio: los rastreadores son sensores de dirección, no sensores de posición, por lo que cualquier deformación física cambiará la dirección del esqueleto virtual. Los principios básicos de uso son los siguientes:

* <p>Los rastreadores deben alinearse con la dirección del hueso tanto como sea posible, en lugar de cambiar con el cuerpo</p>. Evite colocar los rastreadores en áreas propensas a la deformación física, como los músculos y las áreas de grasa fácilmente deformables. Para impactos específicos, consulte [Análisis de ejemplo de deformación](#example_for_deformation). Aunque hay [algoritmos de compensación](../ui_help_doc), se recomienda encarecidamente probar mejores posiciones usted mismo para reducir el impacto de la deformación física.
* Evite la deformación de la dirección del sensor causada por el tirón de la correa, como usar pantalones largos no ajustados, donde sentarse puede tirar de la correa y causar deformación, lo que lleva a un cruce severo de piernas del personaje virtual.
* Evite la deformación de la dirección del sensor causada por la respiración, como usar en el pecho y el vientre.
* Evite que los sensores queden suspendidos en la correa, como en la cintura y el pecho. Si está atado a la espalda, puede causar fácilmente sacudidas del sensor.
* Si no usa la calibración avanzada (Advanced Calibration), se recomienda que las superficies superiores de los rastreadores del pecho, la cintura y la cabeza sean paralelas a la parte delantera del cuerpo, en lugar de colocarse en el costado, ya sea en la parte delantera o trasera.
* **Evite la fricción con el suelo en la correa de la planta del pie, ya que esto afecta en gran medida el efecto**. Si usa una correa en la planta del pie, es mejor estar descalzo y colocar la correa en el hueco de la planta del pie, o al usar zapatos, <p>use cordones para asegurar el sensor en lugar de usar una correa</p>.

:::info Puntos principales para ajustar y probar


1. Rastreador de pierna superior: Para algunas personas, usar el rastreador de pierna superior entre 5 y 8 cm por encima de la rodilla en la parte delantera es mejor, mientras que otros descubren que usarlo en los lados de la pierna superior en la posición media es mejor. Tenga en cuenta el impacto del tirón de los pantalones en la correa.
2. Rastreador de pie: La estabilidad del rastreador de pie determina directamente la calidad de seguimiento general. Asegúrese de que el rastreador de la planta del pie no se vea afectado por el tirón de la correa. Se recomienda usar cordones de los zapatos directamente para asegurarlo. Un método simple es simplemente enrollar el rastreador en los cordones, como se muestra en la imagen de la izquierda a continuación. Un método más complejo requiere que usted mismo asegure el rastreador o la liberación rápida a los cordones.
3. Rastreador de cintura: En general, se recomienda colocar el rastreador de cintura en la parte posterior del cuerpo (si se usa para dormir, se puede colocar en la parte frontal del cuerpo, luego use la calibración avanzada (Advanced Calibration)). Se desaconseja encarecidamente colocarlo en el vientre.
4. Rastreadores de cintura y pecho: El uso de la liberación rápida aumenta la altura del centro de gravedad. Relativamente hablando, no usar la liberación rápida es más estable. Además, el uso del [método de unión complejo](#quick_fix_complex_install) para las correas es más estable.

:::


#### Ejemplo de uso simple con encuadernación de cordones en los pies
<div>
<video id="video" controls preload="metadata" width="40%">
      <source id="mp4" src="/img/foot_bind.mp4" type="video/mp4" />
</video>
</div>

<a id="example_for_deformation"></a>

### Análisis de ejemplo de casos de deformación
Dado que el muslo es relativamente susceptible a la influencia, aquí hay algunos análisis de casos afectados para el muslo.
- Nota especial: La dirección del esqueleto virtual es la misma que la dirección del sensor. Si el sensor está inclinado, el esqueleto virtual también se inclinará.

> Tomando como ejemplo el uso en la parte frontal de la pierna superior, en situaciones de pie y sentado, la distribución del cuerpo humano cambiará. Normalmente, al estar de pie, asumiendo que hay un ángulo de 20 grados entre el rastreador y la pierna superior, después de sentarse, debido a la influencia de la gravedad, más grasa corporal o tejido muscular se hundirá naturalmente, haciendo que el ángulo disminuya. Esto varía de persona a persona, como se muestra en la figura a continuación.
>
> <img src="/img/upleg_front.png" alt="Illustration of body deformation when wearing on the front while standing and sitting" width="50%" />
> 
> Ilustración de tracción de la entrepierna cuando se usa en la parte delantera
> 
> <img src="/img/crotch_pulling.png" alt="Illustration of deformation due to crotch pulling" width="50%" />
> 
> Tomando como ejemplo el uso en la parte exterior de la pierna superior, después de sentarse, debido a la compresión de la parte inferior del muslo por el asiento, el tejido corporal puede acumularse en ambos lados, aumentando el ángulo entre el sensor y el hueso del muslo, lo que puede llevar fácilmente a cruzar las piernas, como se muestra en la figura a continuación.
> 
> <img src="/img/upleg_side.png" alt="Illustration of deformation when wearing on the side of the thigh" width="50%" />



:::info Correa ancha


Una correa ancha con un ancho de 5 cm (la correa de configuración oficial es de 2.5 cm de ancho) puede aumentar la estabilidad general, especialmente para grandes movimientos, como reducir significativamente las oscilaciones en las direcciones de la cintura y el pecho.

:::



<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>