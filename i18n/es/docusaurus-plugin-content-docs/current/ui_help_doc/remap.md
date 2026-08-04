---
sidebar_position: 3
title: "Visión General del Sensor"
---

# Visión General del Sensor

Como se muestra en la figura a continuación, el color verde indica que el sensor está conectado a la articulación correspondiente, mientras que el gris indica que no está conectado. El lado izquierdo de la imagen representa el lado izquierdo del cuerpo humano; por ejemplo, en la imagen de abajo, el sensor en el pie izquierdo no está conectado, y el sensor en la parte inferior de la pierna derecha tampoco está conectado.

![img.png](../../../../../static/img/2d_view.png)

<a id="tracker_replace"></a>

## Función de Reemplazo de Sensor
Aquí, puedes arrastrar y soltar los puntos de los sensores para reorganizarlos.

:::warning Después del reemplazo, si no se activa, provocará un fallo de calibración


Muchos usuarios arrastran accidentalmente los sensores, por ejemplo, arrastrando la mano izquierda a la parte superior de la pierna izquierda, pero si la mano izquierda no está activada durante la calibración, ¡indicará un fallo de calibración porque la parte superior de la pierna izquierda no está activada! 
Después de arrastrar, los puntos reemplazados no serán efectivos independientemente de si están activados o no.

:::


### Demostración de Arrastrar y Soltar
> Haz clic y mantén presionado el botón izquierdo del ratón en un nodo, luego arrástralo a la posición objetivo.
<div>
<video id="video" controls autoplay loop preload="metadata" width="35%">
      <source id="mp4" src="/img/remap_config.mp4" type="video/mp4" />
</video>
</div>


### Puntos que pueden reemplazar otras partes del cuerpo
   * Mano Izquierda   (Nodo 13)
   * Mano Derecha   (Nodo 14)
   * Antebrazo Izquierdo (Nodo 11)
   * Antebrazo Derecho (Nodo 12)


### Partes que se pueden reemplazar
   Todas


### Función Especial
   * Reemplazar con la posición del hombro
    > Si quieres que el área del hombro sea más flexible, puedes reemplazarla con la posición del hombro, pero tiene requisitos más altos para las correas, que deben resolverse de forma independiente.


### Ejemplo de Reemplazo
Como se muestra en la figura a continuación, los cuatro puntos de las manos izquierda y derecha han sido reemplazados, reemplazando las siguientes partes:
* Hombro Izquierdo
* Hombro Derecho
* Pierna Inferior Izquierda
  > La pierna inferior izquierda no se activó después del reemplazo, por lo que ocurrirá un fallo de calibración!!!
* Pierna Inferior Derecha

![img.png](../../../../../static/img/2d_view_replace.png)


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>