---
sidebar_position: 2
title: "Скачать плагин Blender"
---
# Скачать плагин Blender

Нажмите на ссылку ниже для прямой загрузки:
- **Blender Plugin Beta 9**
<a href="/img/files/rebocap_blender_plugin_v9.zip" target="_blank" download="rebocap_blender_plugin_v9.zip">blender with python 3.6~3.12</a>
Обновления:
- Совместим с Blender 4.4 и выше
- Исправлена ошибка с остатками процесса в плагине rebocap
- Исправлена ошибка экспорта скелета для стабилизации ног в сценариях драйвера в реальном времени.
- Поддерживаются все версии Python 3, например, он может поддерживать Blender 4.1
- Поддержка прямой привязки скелета Mixamo
- Исправлена ошибка с драйверами модели fbx
- Исправлена ошибка с осью записи анимации
- Добавлена функция выбора адсорбции костей


# Обучающее видео по Blender
Примечание: Здесь нет звука.

<div>
<video id="video" controls preload="metadata" width="100%">
      <source id="mp4" src="/img/for_blender_install/blender_usage.mp4" type="video/mp4" />
</video>
</div>

# Установка плагина Blender

Шаги установки:
Откройте `Edit->Preference`, выберите `Add-ons` во всплывающей панели, нажмите `Install` справа, выберите загруженный `rebocap_blender_plugin.zip`, а затем нажмите Install Add-on для установки. После установки вам нужно отметить его галочкой для активации. Введите rebocap, как показано на рисунке, и отметьте плагин для успешной установки.

<div align="center">
    <img src="/img/for_blender_install/blender_1.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_2.png" alt="pic_right" width="45%" />
</div>

После успешной установки соответствующее меню плагина должно появиться с правой стороны, как показано на рисунке.
    > Примечание, если вы не видите меню, есть маленькая стрелка, указывающая влево, на которую вы можете нажать, чтобы увидеть его.

<div align="center">
    <img src="/img/for_blender_install/blender_3.png" alt="pic_left" width="25%" />
</div>

:::info Что делать, если установка не удалась


Если некоторым пользователям не удается установить плагин, найдите исходное место установки плагина Blender и напрямую распакуйте `rebocap_blender_plugin.zip` в каталог установки blender. Место установки плагина по умолчанию: `C:\Users\<ваше_имя_пользователя>\AppData\Roaming\Blender Foundation\Blender\<номер_версии>\scripts\addons`, где `ваше_имя_пользователя` - ваше имя пользователя, а `номер_версии` - номер версии установленного вами Blender.

:::


![Схема расположения установки Blender](../../../../../static/img/for_blender_install/blender_23.png)

# Привязка скелета
1. Автоматическая привязка скелета VRM
2. При использовании спецификации скелета Mixamo с FBX автоматическая привязка может быть достигнута в прямом режиме, что означает, что в прямом режиме можно управлять всеми аватарами Mixamo.
  > Однако 12 фиксированных точек на подошвах ног нужно выбирать вручную (это можно проигнорировать, если требования к эффекту ног невысоки).

:::danger Внимание!!!


Вы должны открыть клиент rebocap и откалибровать движение перед нажатием `connect`, иначе вам может потребоваться перезапустить blender для продолжения захвата движения в реальном времени.

Привязанным скелетом персонажа управляет узел бедра (hip). Если узел бедра не является корневой костью, или если узел бедра невозможно переместить (некоторые скелеты принудительно связывают бедро с корнем, и локальное смещение бедра не может быть изменено), тогда ягодицы персонажа могут оставаться на месте.

:::


Советы: Для масштабирования fbx в метры, пожалуйста, обратитесь к позиции на рисунке ниже и измените `scale` на 0.01
<div align="center">
    <img src="/img/for_blender_install/fbx_change_meter.png" alt="pic_left" width="25%" />
</div>

### Включение режима разработчика
Откройте `Edit->Preference`, выберите `Interface` слева, а затем установите флажок `Developer Extras`

<div align="center">
    <img src="/img/for_blender_install/blender_4.png" alt="pic_left" width="45%" />
</div>

### Импорт персонажа

Взяв персонажа в формате `VRM` в качестве примера, загрузите плагин VRM [здесь](https://github.com/saturday06/VRM-Addon-for-Blender/releases/download/2_20_24/VRM_Addon_for_Blender-2_20_24.zip).

Для персонажей в формате FBX рекомендуется использовать плагин [`better fbx`](https://blendermarket.com/products/better-fbx-importer--exporter) для импорта.

<div align="center">
    <img src="/img/for_blender_install/blender_5.png" alt="pic_left" width="45%" />
</div>

### Выбор целевого персонажа в плагине

После импорта откройте `REBOCAP_CONNECTION`, выберите `Armature` справа [опция `Drive Type` не появится, если она не выбрана], затем выберите `retarget` в меню `REBOCAP_CONNECTION` и выберите этого персонажа как `Source`. Вы можете перетащить `Armature` прямо в поле `Source`.

<div align="center">
    <img src="/img/for_blender_install/blender_6.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_7.png" alt="pic_left" width="45%" />
</div>

После выбора Source появится следующее меню:

<div align="center">
    <img src="/img/for_blender_install/blender_8.png" alt="pic_left" width="45%" />
</div>

### Привязка костей

Каждую кость необходимо сопоставить с соответствующей костью целевого персонажа. [Здесь указаны только английские части, пожалуйста, переведите, если неясно]

Pelvis - это ягодицы, Spine - кость над ягодицами, Chest имеет два раздела, у некоторых персонажей только один раздел Chest, и в этом случае вы можете привязать к любому из них. Если у целевого персонажа две кости, выберите ту, которая ближе к Chest. Все четыре кости Leg должны быть привязаны, Toe необязательно.

Для персонажей в формате VRM вы можете нажать Auto Detect после импорта, и оно автоматически заполнится. Для других форматов пользователям необходимо вручную найти соответствующие названия костей и выбрать их.

<div align="center">
    <img src="/img/for_blender_install/blender_9.png" alt="pic_left" width="80%" />
</div>

### Получение ID вершин подошвы обуви

Этот шаг немного сложнее и его можно пропустить, если вас не слишком беспокоит эффект. Основная цель - получить границу подошвы обуви, чтобы персонаж ходил вдоль этой границы. Однако, если обувь слишком велика, это может вызвать вертикальную вибрацию при смене ног.

1. Первый шаг - включить режим разработчика, который был упомянут в начале документа.

2. Переключитесь в режим объекта (Object Mode), затем снимите выделение с Bone и нажмите на ногу персонажа, чтобы выбрать Mesh.

    <div align="center">
    <img src="/img/for_blender_install/blender_10.png" alt="pic_left" width="80%" />
    </div>
    <div align="center">
    <img src="/img/for_blender_install/blender_11.png" alt="pic_left" width="80%" />
    </div>

3. Нажмите, чтобы выбрать персонажа, убедитесь, что выбрана часть обуви, затем переключитесь в режим редактирования (EditMode).

    <div align="center">
    <img src="/img/for_blender_install/blender_12.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_13.png" alt="pic_left" width="45%" />
    </div>
    <div align="center">
    <img src="/img/for_blender_install/blender_14.png" alt="pic_left" width="80%" />
    </div>


4. Откройте Indices, что отличается между Blender 3.6 и Blender 4.0.

    <div align="center">
    <img src="/img/for_blender_install/blender_15.png" alt="pic_left" width="45%" />
    <img src="/img/for_blender_install/blender_16.png" alt="pic_left" width="45%" />
    </div>

5. Выберите вершины и запишите соответствующие значения.

    Всего нужно записать 12 вершин: левая, центральная и правая часть передней части стопы каждой ноги, и левая, центральная и правая часть пятки. Обратите внимание, что это левое и правое направление самого персонажа. При поиске вы можете повернуть персонажа спиной к себе для более легкой идентификации.

    Во время выбора точек, так как вам нужно выбрать Mesh, меню справа не будет видно. Вы должны записать это самостоятельно в порядке: левая, центральная и правая части передней стопы, и левая, центральная и правая части пятки.

    Вот некоторые основные операции в Blender:
    > shift + щелчок колесиком мыши - для перетаскивания
   > 
    > ctrl + щелчок колесиком мыши - для масштабирования
   > 
    > щелчок колесиком мыши - для изменения вида

6. После записи переключитесь из режима `Edit` обратно в режим `Object`, выберите `Armature`, а затем заполните ID стопы.

    <div align="center">
    <img src="/img/for_blender_install/blender_21.png" alt="pic_left" width="80%" />
    </div>

#### Пример объяснения привязки ID вершин подошвы
Например, три вершины левой передней части стопы персонажа ниже:
8863 8860 8862

 <div align="center">
 <img src="/img/for_blender_install/blender_17.png" alt="pic_left" width="60%" />
 </div>
 <div align="center">
 <img src="/img/for_blender_install/blender_18.png" alt="pic_left" width="32%" />
 <img src="/img/for_blender_install/blender_19.png" alt="pic_left" width="32%" />
 <img src="/img/for_blender_install/blender_20.png" alt="pic_left" width="32%" />
 </div>


<a id="skeleton_export"></a>

# Экспорт скелета
После привязки всех ключевых костей появится кнопка сохранения костей. Нажмите экспорт и выберите место для сохранения.

 <div align="center">
 <img src="/img/for_blender_install/blender_22.png" alt="pic_left" width="60%" />
 </div>

Затем импортируйте его в Rebocap, [смотрите здесь](../ui_help_doc/control/skeleton_setting#skeleton_import)


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>