---
sidebar_position: 1
title: "Описание интерфейса SDK"
---
# Описание интерфейса SDK
В настоящее время DLL предоставляет в общей сложности 8 портов, и каждый SDK является оболочкой для интерфейса DLL. Вы можете обратиться к заголовочному файлу `include/rebocap_ws_sdk/rebocap_ws_sdk.h` в cpp SDK для получения подробностей.

Тип выходного значения SDK - кватернион, который поддерживает вывод в несколько координатных пространств [по умолчанию правосторонняя система координат OpenGL, Blender, Unity, UE], единица измерения смещения - метры.

Python SDK еще не интегрировал интерфейс `rebocap_ws_sdk_calculate_foot_vertex`.

### Описание интерфейса
* rebocap_ws_sdk_new
```
    Создает экземпляр SDK. Параметры включают:
    1. Координатное пространство, конкретные поддерживаемые пространства можно найти в каждом SDK, здесь не расписывается.
    2. Использовать ли глобальную систему координат. Передача 0 приведет к использованию локальной системы координат, которая является относительной по отношению к системе координат родительской кости. Все вращения относятся к вращению T-pose. Если вам непонятно вращение, вы можете обратиться к исходному коду Blender, Unity и UE, где вращение Unity относительно легче понять.
    
    Возвращаемое значение:
    Возвращает указатель на экземпляр объекта SDK.
```

* rebocap_ws_sdk_release
```
Освобождает объект экземпляра SDK. Передаваемый параметр - указатель на экземпляр.
```
* rebocap_ws_sdk_open
```
Открывает WebSocket-клиент и подключается к порту WebSocket. Конкретное использование и описание возвращаемых значений смотрите в коде SDK.
```
* rebocap_ws_sdk_close
```
Закрывает WebSocket-клиент и отключается. Для конкретного использования смотрите SDK.
```
* rebocap_ws_sdk_set_pose_msg_callback
```
Регистрирует обратный вызов (callback) сообщения. Здесь данные будут выводиться из WebSocket только после того, как пользователь выполнит калибровку движения. Частота кадров составляет 60 кадров в секунду. Для конкретного использования смотрите код SDK. 
Пожалуйста, обратитесь к названиям 24 костей для порядка суставов.
```
* rebocap_ws_sdk_set_exception_close_callback
```
Регистрирует обратный вызов для аварийного закрытия WebSocket. Для конкретного использования смотрите код SDK.
```
* rebocap_ws_sdk_get_last_msg
```
Помимо формы обратного вызова, вы также можете напрямую получить последнее сообщение о действии здесь. Формат данных совпадает с форматом обратного вызова.
```
* rebocap_ws_sdk_calculate_foot_vertex
```
    Этот интерфейс в основном используется для регистрации точек контакта стопы и скелета тела в Rebocap. 
    Вам нужно передать данные скелета тела (положения каждого сустава, в том же порядке, что и последовательность SMPL). 
    Если вам нужно, чтобы DLL автоматически вычисляла положения точек контакта, вам нужно передать сетку стопы (foot mesh). Вы также можете передать информацию о положении точек контакта стопы (3 точки спереди и сзади для каждой стопы, в общей сложности 12 точек), в этом случае DLL не будет автоматически вычислять, а будет использовать переданные значения. 
    Обратите внимание, что единица измерения здесь — метры, координаты — глобальные координаты, и вам нужно использовать систему координат OpenGL. Если нет, вам нужно передать параметры преобразования. Для конкретного использования обратитесь к демо Unity и использованию плагина UE.
    
    Этот интерфейс относительно сложен. Пользователи должны обладать достаточными навыками разработки или быть в состоянии полностью понять код в демо Unity или код плагина UE. Версия на Python не раскрывает этот интерфейс. При необходимости вы можете инкапсулировать интерфейс Python из CPP SDK или исходной DLL.
    
    Большинство пользователей могут загружать модели VRM в клиент Rebocap для разработки плагинов, достигая того же эффекта. Для понимания точек контакта стопы вы можете обратиться к документации по интеграции Blender по экспорту скелетов.
```

### Названия 24 костей
Соответствующие стандартные названия Mixamo и SMPL следующие, всего 24 кости. Для справки, кость с индексом 0 соответствует бедрам (hips), что является узлом талии.
Среди них суставы, соответствующие левым и правым пальцам ног и рук, не имеют соответствующих узлов трекера, поэтому локальное вращение на выходе равно 0. Если используется глобальное вращение, выходные значения вращения будут соответствовать родительскому узлу.

- Соответствующие названия Mixamo
```python
joints_mixamo = [
        "mixamorig:Hips",
        "mixamorig:LeftUpLeg",
        "mixamorig:RightUpLeg",
        "mixamorig:Spine",
        "mixamorig:LeftLeg",
        "mixamorig:RightLeg",
        "mixamorig:Spine1",
        "mixamorig:LeftFoot",
        "mixamorig:RightFoot",
        "mixamorig:Spine2",
        "mixamorig:LeftToeBase",
        "mixamorig:RightToeBase",
        "mixamorig:Neck",
        "mixamorig:LeftShoulder",
        "mixamorig:RightShoulder",
        "mixamorig:Head",
        "mixamorig:LeftArm",
        "mixamorig:RightArm",
        "mixamorig:LeftForeArm",
        "mixamorig:RightForeArm",
        "mixamorig:LeftHand",
        "mixamorig:RightHand",
        "mixamorig:LeftHandIndex1",
        "mixamorig:RightHandIndex1"
]
```
- Соответствующие стандартные названия SMPL
```python
joints_smpl = [
    "Pelvis",
    "L_Hip",
    "R_Hip",
    "Spine1",
    "L_Knee",
    "R_Knee",
    "Spine2",
    "L_Ankle",
    "R_Ankle",
    "Spine3",
    "L_Foot",
    "R_Foot",
    "Neck",
    "L_Collar",
    "R_Collar",
    "Head",
    "L_Shoulder",
    "R_Shoulder",
    "L_Elbow",
    "R_Elbow",
    "L_Wrist",
    "R_Wrist",
    "L_Hand",
    "R_Hand"
]
```


# Скачать SDK
### Python SDK
> Совместимо с python3.6~python3.14

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="/img/files/rebocap_python_sdk_v3.zip" download="rebocap_python_sdk_v3.zip">
<span class="os-switch-download-main">Скачать Python SDK v3</span>
<span class="os-switch-download-meta">Python 3.6 – 3.14</span>
<span class="os-switch-download-date">Дата обновления: 2026.11.18</span>
</a>
</div>

Содержание обновления Python sdk v3:
> Поддержка Python обновлена до 3.14
> 
> Внутренние доработки кода для большей стабильности

<details class="plain-details"><summary>Предыдущие версии (v2)</summary>
<div style="margin-top: 10px;">
<p><strong>Python SDK v2</strong> (совместимо с python3.6~python3.12): <a href="/img/files/rebocap_ws_sdk_python_v2.zip" download="rebocap_python_sdk_v2.zip">скачать</a></p>
<p>исправлено взаимоблокирование <code>get_last_msg</code>; добавлены все версии python</p>
</div>
</details>

### C# SDK
> Пожалуйста, обратитесь к README.md в загруженном файле
> 
> Для использования вы можете обратиться к проекту Unity

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="/img/files/csharp_sdk_with_demo_v2.zip" download="rebocap_csharp_sdk_v2.zip">
<span class="os-switch-download-main">Скачать C# SDK v2</span>
<span class="os-switch-download-meta">C# · демо Unity</span>
<span class="os-switch-download-date">Дата обновления: 2024.06.03</span>
</a>
</div>

Содержание обновления C# sdk v2:
> Исправлена проблема взаимоблокировки, вызванная интерфейсом `get_last_msg`


### CPP SDK
> Пожалуйста, обратитесь к README.md в загруженном файле
> 
> Для использования вы можете обратиться к проекту UE

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="/img/files/rebocap_cpp_sdk_v03.zip" download="rebocap_cpp_sdk_v3.zip">
<span class="os-switch-download-main">Скачать CPP SDK v3</span>
<span class="os-switch-download-meta">C++ · пример UE</span>
<span class="os-switch-download-date">Дата обновления: 2024.06.05</span>
</a>
</div>

Содержание обновления C++ sdk v3:
> Исправлена проблема взаимоблокировки, вызванная интерфейсом `get_last_msg`


### Linux SDK
> Для Linux x86_64 · SDK C++ и SDK Python 3.12.<br />Минимальная система: Ubuntu 22.04 (glibc 2.35 и новее)
> 
> Подробности см. в README внутри скачанного файла

<div class="os-switch-downloads sdk-downloads">
<a class="os-switch-download" href="/img/files/rebocap-ws-sdk-linux-ubuntu22-py312.tar.gz" download="rebocap_ws_sdk_linux_ubuntu22_py312.tar.gz">
<span class="os-switch-download-main">Скачать Linux SDK</span>
<span class="os-switch-download-meta">Ubuntu 22.04+ · C++ и Python 3.12</span>
<span class="os-switch-download-date">Дата обновления: 2026.11.08</span>
</a>
</div>

Состав linux sdk:
> `cpp/`: библиотека C++ `librebocap_ws_sdk_cpp.so`, заголовок `rebocap_ws_sdk_cpp.h` и пример
> `lib/librebocap_ws_sdk.so`: разделяемая библиотека с C ABI для привязок к другим языкам
> `python/rebocap_ws_sdk/`: обёртка Python и локальное расширение, с примером

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>