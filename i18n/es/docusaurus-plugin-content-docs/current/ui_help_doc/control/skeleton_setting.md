---
sidebar_position: 3
title: "Ajuste Manual del Esqueleto"
---

<a id="manual_skeleton"></a>

# Ajuste Manual del Esqueleto
El ajuste manual del esqueleto es principalmente para usuarios que tienen mayores exigencias en cuanto a los efectos, con el objetivo de hacer que el esqueleto coincida estrechamente con su propio cuerpo para obtener mejores resultados generales (específicamente para usuarios de PC).

En escenarios de PC, si estás viendo directamente el efecto de vista previa, ajustarlo a tu tamaño corporal real produce mejores resultados. Si se usa en otro software, se recomienda subir el esqueleto. Si el esqueleto real subido coincide estrechamente con el tuyo, el efecto será mejor.

En escenarios de RV, especialmente para usuarios que bailan, ajustar el esqueleto para que coincida con tu propio cuerpo produce mejores resultados. En otras situaciones, como querer asemejar tu propia postura al estar sentado o en poses estáticas, un esqueleto objetivo más cercano es mejor, ¡pero el efecto dinámico puede empeorar relativamente! ¡El estado óptimo es cuando el esqueleto del personaje virtual y el esqueleto de la persona real son consistentes!

### Impacto del Esqueleto Inconsistente con el Tuyo
Por ejemplo: Si el esqueleto que impulsa al personaje tiene brazos notablemente más largos, asumiendo que las manos del personaje virtual llegan a la posición de la rodilla, entonces cuando las palmas de la persona real están juntas, si el personaje virtual necesita mantener la misma postura que la persona real, las posiciones de las palmas izquierda y derecha se superpondrán significativamente.

Para los usuarios de RV, si el esqueleto es inconsistente con el suyo, cuanto mayor sea el rango de movimiento y mayor la duración, más fácil será desviarse. Un ejemplo extremo es si la altura de las piernas del personaje de RV ocupa 9/10 de todo el cuerpo, y este esqueleto de personaje se sube a rebocap, entonces para evitar que los pies resbalen y la altura del personaje sea consistente con la realidad, si la persona real da un paso de 60 cm a la derecha, el personaje virtual podría dar un paso de más de 100 cm (el esqueleto virtual es mucho más largo que el de la persona real). Si la RV usa el esqueleto de la persona real, pero en VRChat usa este personaje de piernas largas, el problema es que el ángulo de movimiento de las piernas del personaje virtual es mucho menor que el ángulo de movimiento de las piernas de la persona real. En RV, el posicionamiento se basa en la posición del rastreador para inferir los ángulos de las articulaciones.

### Altura Automática de RV
Solo efectivo en modo RV, [haz clic aquí para ver la función específica](./connect#vr_auto_height)

### Cómo Ajustar el Esqueleto

<img src="/img/skeleton_adjust-en.png" alt="Manual Skeleton Adjustment Panel" />

- **Ajuste del Esqueleto del Torso Clave**

1. Para los usuarios que no deseen ajustar cuidadosamente el esqueleto, el esqueleto predeterminado es un esqueleto humano estándar con dimensiones promedio. Ajusta el control deslizante marcado como `1` en la figura de abajo, que es la proporción de escala de altura. Puedes usar los botones izquierdo y derecho para un ajuste fino, y el efecto general no será tan malo (las proporciones de cada articulación no cambiarán como resultado).
2. Para los usuarios que deseen ajustar el esqueleto para que coincida con el suyo, pueden consultar la figura a continuación y ajustar de abajo hacia arriba. El lado derecho muestra las posiciones clave de los nodos del esqueleto del personaje. Puedes ajustar de abajo hacia arriba basándote en las alturas calculadas de los nodos. Puedes usar una cinta métrica para medir la altura de cada articulación en relación con el cuerpo mientras estás de pie, y ajustar las longitudes del esqueleto 2~8 según la información de altura.

   > <img src="/img/skeleton_position-en.png" alt="Torso Adjustment" />
    
3. Para los usuarios de RV, si deseas ajustar el esqueleto para que coincida con la realidad, puedes consultar el punto 2 anterior para el ajuste. Si deseas ajustarlo más cerca del personaje virtual (no habilites el modo VRC), cada punto virtual está en la altura media del esqueleto. Ajusta según esta información. Por supuesto, también puedes subir un esqueleto del modelo tú mismo [aunque actualmente no hay capacidad de ajuste fino basado en esqueletos subidos].

- **Otros Ajustes del Esqueleto**

   Otros ajustes del esqueleto no afectarán la altura. Consulta principalmente el significado literal en el lado izquierdo de cada ajuste. Hay tres puntos a tener en cuenta:
    * Marcado como `9`, profundidad del visor de RV, el ajuste debe basarse en el uso del visor. El mejor estado es cuando el pecho se mueve menos en un estado de asentimiento.
    * Marcado como `11`, espaciado de piernas, esto se refiere al espaciado de las articulaciones de la raíz de la parte superior de la pierna. Si el personaje mantiene un ángulo de 90 grados con el suelo, puede considerarse como el espaciado del punto medio de las piernas en este momento.
    * Marcado como `12`, longitud del pie, se recomienda que la longitud del pie sea menor que en la realidad porque la articulación del dedo del pie se doblará en la realidad, pero actualmente rebocap no tiene esta articulación, por lo que generalmente se recomienda medir la distancia desde la doblez hasta el talón.

<a id="skeleton_not_valid"></a>

### El Ajuste Manual del Esqueleto No Tiene Efecto
> Por favor, comprueba si se ha aplicado la importación del esqueleto.

<a id="skeleton_import"></a>

# Importación de Esqueleto
<img src="/img/skeleton_import-en.png" alt="Skeleton Import Panel" />

### Cuándo Usar la Importación de Esqueleto

Para los usuarios que utilizan el protocolo VMC y los usuarios de Blender, se recomienda utilizar la importación de esqueleto. Para los usuarios de Reborn, Unity y UE, el SDK registrará automáticamente el esqueleto y, en general, no se necesita una importación secundaria.

Para los usuarios de RV, si deseas asemejarte más al personaje virtual objetivo en un estado estático sin considerar los efectos dinámicos, puedes usar la importación de esqueleto. (Por supuesto, si el esqueleto del personaje actual está cerca del tuyo, también puedes importarlo, y el efecto dinámico será relativamente mejor). En RV, la importación de un esqueleto escalará todo el esqueleto según la altura.

### Ventajas de la Importación de Esqueleto

Los usuarios que no usan RV y que importan esqueletos no experimentarán resbalones en los pies, pero si el esqueleto importado difiere demasiado del suyo propio, puede conducir fácilmente a un cambio de piernas poco natural al caminar.

### Cómo Importar Esqueletos
Actualmente, se admiten dos formatos para la importación: una importación de personaje de formato general `VRM` y un archivo de formato de esqueleto `.rebo_skeleton` exportado desde Blender. Para otros formatos, impórtalos a Blender tú mismo y luego usa el complemento de Blender de rebocap para exportar. Para el uso específico del complemento de Blender [por favor consulta aquí](../../plugins/blender).

### Análisis de la Información del Esqueleto de Importación

Analiza según la longitud de cada articulación. Es importante tener en cuenta que la altura total del modelo se estima multiplicando la altura del nodo del cuello (que generalmente se puede considerar como la altura de los hombros) por un coeficiente.

Si importas un esqueleto .rebo_skeleton, puedes recibir un aviso: Los datos del pie no están configurados, se utilizará la información del pie del modelo estándar. Aquí hay una introducción y explicación del principio:
> Los datos del pie se utilizan principalmente para detectar puntos de posicionamiento del pie (se pueden encontrar puntos específicos en la documentación de exportación del complemento de Blender). Por ejemplo, si te pones de puntillas, aquí se utilizará un punto de dedo del pie virtual para hacer contacto con el suelo. Si vas a subir un personaje, es mejor usar la posición de malla del dedo del pie del personaje subido; de lo contrario, puede causar que los dedos de los pies queden suspendidos o por debajo del suelo. Sin embargo, este impacto es generalmente pequeño. Si la proporción de la longitud del pie del personaje varía mucho y deseas un mejor rendimiento del pie, puedes ajustar estos puntos en detalle al exportar desde Blender.


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>