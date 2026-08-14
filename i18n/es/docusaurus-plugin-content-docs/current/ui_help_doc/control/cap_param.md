---
sidebar_position: 2
title: "Compensación de la pierna superior"
---

<a id="up_leg_com"></a>

# Compensación de la pierna superior
<img src="/img/cap_param_up_leg-en.png" alt="Upper Leg Compensation Panel" />

1. **Aplicar compensación**

    Habilita la función de compensación. Esta compensación se utiliza principalmente para contrarrestar las deformaciones causadas por los cambios en la forma del cuerpo o el tirón de las correas.

2. **Calcular automáticamente durante la calibración (Calibration)**

    Calcula en base a la deformación durante la postura S (S-Pose). Para obtener mejores resultados, se recomienda ajustar después de sentarse y usar el ajuste manual. Debido a los cambios en la posición de uso o a la fuerza desigual causada por la fricción de la correa, los resultados de la calibración automática pueden variar cada vez.

3. **Compensación lateral**

   * Esta compensación se utiliza principalmente para contrarrestar la inclinación lateral causada por los cambios en la forma del cuerpo al sentarse o acostarse. No compensa los problemas causados por campos magnéticos. Los problemas causados por cambios en la forma del cuerpo suelen ser simétricos, y esta compensación se aplica tanto a la pierna superior izquierda como a la derecha.
   * Para el ajuste manual, puede sentarse y abrir la ventana de vista previa 3D para ajustar. No se recomienda ajustar mientras mira su rastreador en realidad virtual (VR).
   * Algunas desviaciones pueden ser causadas por campos magnéticos, consulte aquí.

:::info ¡¡¡Nota!!!


Se recomienda que los usuarios encuentren la mejor posición de sujeción antes de ajustar la compensación. Cuanto menor sea el valor de compensación, mejor. Al probar las posiciones de sujeción, se recomienda no usar pantalones largos y probar con la correa directamente contra la piel (si algunas personas son alérgicas a la superficie de la correa, se puede colocar un pañuelo debajo). Según los comentarios actuales, algunas personas obtienen mejores resultados cuando se colocan en la parte exterior de las piernas, mientras que otras obtienen mejores resultados cuando se colocan directamente por encima de las rodillas. ¡Consulte los resultados finales de la prueba!

Desactive la compensación, luego pruebe completamente la mejor posición de sujeción antes de habilitar el mecanismo de compensación para obtener mejores resultados.

:::


4. **Compensación de altura**

   - Se utiliza principalmente para compensar las diferencias de altura de las piernas al sentarse, como cuando la pierna izquierda está más alta que la pierna derecha. Para obtener mejores resultados, se recomienda ajustar manualmente después de sentarse hasta que ambos pies estén a la misma altura.
   - Hay dos razones para las diferencias de altura de las piernas:
     * Durante la calibración en postura A (A-pose), los ángulos de las dos piernas son inconsistentes (las diferencias en las longitudes de las piernas izquierda y derecha pueden causar esto fácilmente), como cuando la rodilla izquierda es empujada hacia atrás mientras la rodilla derecha está ligeramente hacia adelante, lo que lleva a diferencias en la altura de las piernas.
     * Diferencias significativas en la distribución muscular entre las dos piernas también pueden causar diferencias en la altura de las piernas.

5. **Compensación de rotación**

   - El mecanismo para la compensación de rotación es similar al de la compensación de altura, excepto que la compensación de altura se utiliza para igualar las piernas al mismo valor, mientras que la compensación de rotación aplica el mismo ángulo a ambas piernas.
   - Compense después de sentarse. Cuanto mayor sea el valor de compensación, más alta será la posición de la cadera del personaje.
      > Por qué se necesita esta compensación: Principalmente porque los tejidos del cuerpo humano exhiben una cierta fluidez y se ven fácilmente afectados por la gravedad, especialmente cuando se usan en la parte delantera. La alineación relativa entre el sensor y el esqueleto puede cambiar. Por ejemplo, después de sentarse, la pierna superior está paralela al suelo y la cadera y la rodilla están a la misma altura. Sin embargo, si observa de cerca el personaje virtual, es posible que note que la cadera del personaje virtual está más baja que la rodilla del personaje virtual. En este punto, puede ajustar el valor de compensación para mantener la coherencia con la realidad.

6. **Rango lineal**
   
   La lógica para calcular la compensación. Por ejemplo, si el valor de compensación es 10 y el rango lineal se establece en 25 grados, entonces cuando el muslo está ligeramente doblado en relación con la postura A (A-pose) y el ángulo de flexión es de 12.5 grados, el valor de compensación dado es 5. Si el ángulo de flexión es de 25 grados, el valor de compensación dado es 10. Si el ángulo de flexión es de 90 grados, el valor de compensación se mantiene en 10. En la mayoría de los casos, el rango lineal es de 25~45 grados. Puede ajustarlo de acuerdo a su situación.

7. **Ángulo predeterminado de la pierna superior**
   
   Esto modifica principalmente el ángulo entre la pierna superior de la persona real y el suelo durante la calibración. El valor predeterminado es verticalmente hacia abajo con un ángulo de 0. Esta función es conveniente para usuarios con piernas ligeramente en forma de X o en forma de O, o para aquellos que prefieren una mayor distancia entre las piernas durante la calibración.

   Cuanto mayor sea el valor, más separadas estarán las piernas del personaje virtual. Tenga en cuenta que esto es diferente de la compensación lateral; este ajuste también tendrá efecto al estar de pie. Para la pierna inferior, según la experiencia, ajústelo a la mitad del valor de la pierna superior.

<a id="lower_leg_com"></a>

# Compensación de la pierna inferior
La función es la misma que la compensación de la pierna superior. Para un uso específico, consulte la compensación de la pierna superior. Sin embargo, tenga en cuenta que al sentarse, el ángulo de desviación de la pierna inferior en relación con la postura A (A-pose) es muy pequeño, por lo que la compensación generalmente no es necesaria al sentarse. Puede verificar el efecto de compensación cuando la pierna inferior se dobla hacia atrás o al acostarse.

<img src="/img/cap_param_down_leg-en.png" alt="Lower Leg Compensation Panel" />

<a id="other_com"></a>

# IK, hombro y otras compensaciones
### Parámetros IK

El IK actual se utiliza principalmente para recalcular las piernas, mejorando la estabilidad de las piernas y, por lo tanto, aumentando la estabilidad general.

<img src="/img/cap_param_ik-en.png" alt="Shoulder and Other Compensation Panel" />

1. **Interruptor IK vertical**

   Cuando está habilitado, minimizará el temblor vertical del personaje, aunque actualmente no se puede evitar por completo. La futura optimización fuera de línea puede abordar este problema.

2. **Interruptor IK horizontal**

   Cuando está habilitado, si los pies del personaje permanecen inmóviles y hay un movimiento angular en las piernas y la cintura, los pies del personaje virtual intentarán permanecer quietos simultáneamente. De lo contrario, debido a diferentes esqueletos, es posible que solo un pie permanezca quieto mientras el otro se mueve ligeramente.

3. **Peso IK**

   Cuanto mayor sea el peso IK, mayor será la fuerza de intervención IK. Los valores más bajos tienden a mantener los ángulos originales, y la velocidad de los incrementos del ángulo de ajuste IK será más lenta. Puede comparar el efecto con el IK desactivado.

4. **Ángulo de flexión de la pierna**
   
   Aumentar el grado de flexión de la pierna expande el rango de resolución IK, mejorando la estabilidad general. Sin embargo, la posición predeterminada de la pierna estará doblada, generalmente ajustada a alrededor de 3~4.

5. **Flexibilidad de la cintura**

   Cuanto mayor sea el valor, más flexible será el movimiento de la cintura, pero puede diferir del movimiento en la vida real. Ajuste en consecuencia.

### Parámetros de restricción del brazo

<img src="/img/cap_param_ik_arm-en.png" alt="手臂约束参数" />

1. Restricción de postura A (A-Pose)

   Se utiliza principalmente para evitar que los brazos en postura A se acerquen demasiado al cuerpo. Esto está diseñado para usuarios que realizan transmisiones, ya que muchos modelos de transmisores tienen hombros muy estrechos, y si los brazos virtuales coinciden exactamente con los brazos reales, se producirá un recorte (clipping) obvio. Puede ajustar el rango de restricción del brazo de acuerdo con el marcador `3` en la imagen; cuanto mayor sea el valor, más lejos se mantendrán los brazos del cuerpo.

2. Restricción de aplausos

   Se utiliza principalmente para ajustar el cruce de manos al aplaudir. Debido a que muchos personajes virtuales tienen brazos muy largos, las manos del personaje virtual inevitablemente se cruzarán cuando una persona real aplauda. Esta configuración ayuda a aliviar, aunque no a eliminar por completo, este problema. Puede ajustar el valor de `4` de acuerdo a su situación real; cuanto mayor sea el valor, mayor será la distancia entre las palmas. Solo tiene efecto cuando las palmas están dentro del rango del ancho de los hombros.

### Vinculación del hombro

La compensación de vinculación del hombro se utiliza principalmente para la compensación cuando no hay puntos de hombro. Compensa automáticamente la rotación del hueso del hombro en función del ángulo de rotación del brazo superior, haciendo que los hombros se vean menos rígidos. Sin embargo, no se pueden compensar acciones específicas como encogerse de hombros.

<img src="/img/cap_param_shoulder_link-en.png" alt="Shoulder and Other Compensation Panel" />

1. Habilitar o no la compensación de vinculación del hombro
2. Valor de compensación de vinculación hacia arriba y hacia abajo, es decir, la compensación de vinculación cuando el brazo se baja y se levanta, con dirección de compensación constante
3. Valor de compensación de vinculación hacia adelante y hacia atrás, es decir, la compensación de vinculación cuando el brazo se mueve hacia adelante y hacia atrás, con dirección de compensación constante
4. Rango de compensación lineal, similar al rango de compensación lineal para la pierna superior. En general, establecer el rango de compensación del hombro entre 70 y 90 grados es más apropiado. Puede ajustarlo de acuerdo a su situación real.

### Sensibilidad del hombro de la pieza de repuesto

Esta sección se utiliza principalmente para la compensación de sensibilidad al reemplazar la posición del antebrazo o la mano en el hombro. Debido a las correas, a menudo el sensor en el hombro no puede seguir completamente el movimiento del hombro, lo que resulta en cierto desplazamiento y una representación de ángulo menos pronunciada. Por lo tanto, se aumenta la sensibilidad para compensar las diferencias causadas por las correas. Si se utiliza un traje ajustado y el sensor del hombro está completamente adherido, establezca la sensibilidad en 1.0.

La lógica de cálculo específica es: Valor de rotación aplicado = Valor de rotación detectado * Sensibilidad

<img src="/img/cap_param_shoulder_sensitive-en.png" alt="Shoulder Sensitivity" />


### Otros

Se utiliza para restringir rotaciones anormales

<img src="/img/cap_param_other-en.png" alt="Other Constraints" />


1. **Restricción de inclinación del pecho y la cintura**
   
   Esto se utiliza principalmente para corregir los problemas de inclinación del personaje causados por la desalineación de la correa. Es eficaz al estar de pie y se corrige automáticamente. Sin embargo, si el personaje está sentado con una inclinación, también puede corregirse, lo que provocará una inclinación cuando el personaje se ponga de pie. Tenga en cuenta que doblar la cintura no se considera inclinación; la inclinación se refiere a inclinarse hacia los lados del cuerpo.

   La corrección es un proceso gradual en tiempo real que requiere algo de tiempo y solo ocurre cuando está inmovil.

2. **Restricción de inclinación de la cabeza**

   Similar a la restricción de inclinación del pecho y la cintura, considerando que la cabeza a menudo se inclina de forma natural, lo que puede provocar un comportamiento de corrección incorrecto, no se recomienda habilitar esto.

3. **Restricción de tobillo**

   Esto restringe principalmente la rotación del tobillo. Generalmente, el tobillo tiene solo un grado de libertad en relación con la pierna inferior, siendo los otros dos grados de libertad más pequeños. Considerando que las condiciones del campo magnético cerca del piso suelen ser deficientes para la mayoría de los usuarios, la restricción del tobillo está habilitada de forma predeterminada para limitar por la fuerza las otras dos direcciones. Si el entorno del campo magnético cerca del piso del usuario es bueno, como al aire libre en la tierra, la restricción del tobillo se puede desactivar para tener más libertad.

4. **Corrección de pecho en VR**

   La corrección del pecho difiere de la restricción de inclinación del pecho y lumbar, ya que solo se aplica en el modo `VR`. Es eficaz cuando la parte superior del cuerpo está erguida, acostada o boca abajo (no es eficaz al estar acostado de lado). Ajusta el ángulo de guiñada (yaw) para forzar que el pecho se enderece, lo que puede provocar una ligera rotación del pecho. Al estar de pie, ajusta la autorrotación y al acostarse, ajusta la inclinación de izquierda a derecha. Solo se recomienda para uso con 6 ejes o al dormir en un colchón de resortes.


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>