import type {VideoGuideData} from '@site/src/components/VideoGuide/types';

/**
 * UE 插件使用说明（测试片：ue插件_无声.mp4，1920x1080 / 30fps / 409.4 s）
 * 时间点由用户按 30fps 时间码给定，这里换算成秒（帧 / 30）。
 *
 * 换算对照：
 *   00:00:33:15 = 33.5     00:00:53:05 = 53.167
 *   00:01:28:08 = 88.267   00:01:45:27 = 105.9    00:02:15:28 = 135.933
 *   00:02:43:03 = 163.1    00:03:31:27 = 211.9    00:04:01:29 = 241.967
 *   00:04:25:16 = 265.533  00:04:53:10 = 293.333  00:04:54:09 = 294.3
 *   00:05:04:00 = 304      00:05:25:19 = 325.633  00:06:09:28 = 369.933
 *
 * 多语言约定：
 * - 时间点、章节 id、配图与步骤 id 只写一份（STRUCT / CHAPTERS），8 种语言共用；
 * - 只有章节标题与卡片文案按语言写在 TEXTS 里，避免 8 份结构漂移；
 * - 新增语言只需补一条 TEXTS，找不到时回退 en。
 */

type Section = {id: string; start: number; end: number};

const CHAPTERS: Section[] = [
  {id: 'install', start: 0, end: 33.5},
  {id: 'check', start: 33.5, end: 88.267},
  {id: 'blueprint', start: 88.267, end: 105.9},
  {id: 'mapping', start: 105.9, end: 241.967},
  {id: 'tpose', start: 241.967, end: 294.3},
  {id: 'connect', start: 294.3, end: 369.933},
  {id: 'done', start: 369.933, end: 409.37},
];

type Step = {id: string; chapterId: string; start: number; end: number; image: string};

const STEPS: Step[] = [
  {id: '01', chapterId: 'install', start: 0, end: 33.5, image: '01_install_plugins'},
  {id: '02', chapterId: 'check', start: 33.5, end: 53.167, image: '02_plugin_list'},
  {id: '03', chapterId: 'check', start: 53.167, end: 88.267, image: '02_1_livelink'},
  {id: '04', chapterId: 'blueprint', start: 88.267, end: 105.9, image: '03_anim_blueprint'},
  {id: '05', chapterId: 'mapping', start: 105.9, end: 135.933, image: '04_variable_class'},
  {id: '06', chapterId: 'mapping', start: 135.933, end: 163.1, image: '05_map_asset'},
  {id: '07', chapterId: 'mapping', start: 163.1, end: 241.967, image: '06_bone_mapping'},
  {id: '08', chapterId: 'tpose', start: 241.967, end: 265.533, image: '07_a2t_node'},
  {id: '09', chapterId: 'tpose', start: 265.533, end: 294.3, image: '08_a2t_details'},
  {id: '10', chapterId: 'connect', start: 294.3, end: 304, image: '09_body_pose_node'},
  {id: '11', chapterId: 'connect', start: 304, end: 369.933, image: '10_node_chain'},
  {id: '12', chapterId: 'done', start: 369.933, end: 409.37, image: '11_connected'},
];

/** 章节标题 7 条 + 步骤 [标题, 正文] 12 条 */
type Texts = {title?: string; chapters: string[]; steps: [string, string][]};

const TEXTS: Record<string, Texts> = {
  'zh-Hans': {
    title: 'UE 插件使用说明',
    chapters: ['安装插件', '检查插件', '创建动画蓝图', '设置骨骼映射', '调整为 T-Pose', '设置动捕连接', '完成'],
    steps: [
      ['把 rebocap 放进 Plugins', '把插件压缩包解压，将里面的 rebocap 文件夹整个放进工程根目录的 Plugins 文件夹里；工程里没有 Plugins 文件夹的话，新建一个。'],
      ['插件列表里看到 Rebocap', '重启编辑器，打开 编辑 → 插件，列表里能看到 Rebocap - blueprint control（版本 V3）就说明装好了。'],
      ['LiveLink 里查看连接端口', '在 LiveLink 中可以看到对应 Rebocap 的连接端口。'],
      ['创建动画蓝图', '在内容浏览器里右键角色的骨骼网格体，选择 创建 → 动画蓝图，新建或进入这个角色的动画蓝图。'],
      ['新建变量并设为类引用', '在左侧变量栏点 + 新建一个变量，类型搜索 Rebocap，选择 Rebocap Map Data，再选 类引用（Class Reference）。'],
      ['新建 Map Data 资产', '把变量拖进图表并编译一次，右侧 默认值 里点 +，新建一个 Map Data 资产。'],
      ['逐项填写骨骼映射', '在映射窗口里逐项填入角色对应的骨骼名称。选择骨骼预设 可以一键填入 UE 默认命名；如果角色骨骼命名不同，打开骨架窗口查看后复制过来。'],
      ['是否需要 A-Pose 转 T-Pose', '角色本身就是 T-Pose 的话，可以跳过这一步。'],
      ['识别骨骼与手动指定资产', '该节点能自动识别一些常见骨骼，也可以手动指定 Retarget Asset；'],
      ['添加 Rebocap Body Pose 节点', '在动画图表里右键搜索 reb，添加 Rebocap Body Pose 节点。'],
      ['节点前后级与共用 Map Data', '如果用了 A-Pose to T-Pose 节点，请把它放在 Body Pose 的前一级；两个节点的 Retarget Asset 接同一个 Map Data。'],
      ['编译后两边动作一致', '点击编译后，Rebocap 软件提示接收到骨架数据，且两边的 3D 预览动作一致，就说明连接成功。'],
    ],
  },
  en: {
    title: 'UE plugin walkthrough',
    chapters: ['Install the plugin', 'Check the plugin', 'Create an Anim Blueprint', 'Set up bone mapping', 'Adjust to T-Pose', 'Connect the mocap', 'Done'],
    steps: [
      ['Put rebocap into Plugins', 'Unzip the plugin package and drop the whole rebocap folder into the Plugins folder at the root of your project. Create the folder if it does not exist.'],
      ['The plugin shows up in the list', 'Restart the editor and open Edit → Plugins; finding Rebocap - blueprint control (V3) means the install worked.'],
      ['Check the port in LiveLink', 'LiveLink shows the matching Rebocap connection port.'],
      ['Create an Anim Blueprint', 'In the Content Browser, right-click the Skeleton Mesh and choose Create → Anim Blueprint, then create or open the Animation Blueprint.'],
      ['Add the variable as a class reference', 'In the Variables panel click +, search the type for Rebocap, pick Rebocap Map Data and choose Class Reference.'],
      ['Create the Map Data asset', 'Drag the variable into the graph and compile once, then click + under Default Value to create a Map Data asset.'],
      ['Fill in the bone mapping', 'Fill in the bone names one by one. Select Bone Preset fills UE default names in one click; if your rig differs, copy the names from the Skeleton window.'],
      ['Do you need A-Pose to T-Pose?', 'If the rig is already T-Pose you can skip this step.'],
      ['Auto-detect bones or pick an asset', 'The node recognises common skeletons automatically and also accepts a manual Retarget Asset.'],
      ['Add the Rebocap Body Pose node', 'In the AnimGraph, right-click and search reb, then add a Rebocap Body Pose node.'],
      ['Chain order and shared Map Data', 'Put A-Pose to T-Pose one step before Body Pose and feed both nodes the same Map Data in Retarget Asset.'],
      ['Both sides move in sync', 'After compiling, Rebocap reports that skeleton data was received and both 3D previews move in sync — the connection works.'],
    ],
  },
  'zh-Hant': {
    title: 'UE 外掛使用說明',
    chapters: ['安裝外掛', '檢查外掛', '建立動畫藍圖', '設定骨骼映射', '調整為 T-Pose', '設定動捕連線', '完成'],
    steps: [
      ['把 rebocap 放進 Plugins', '把外掛壓縮檔解開，將裡面的 rebocap 資料夾整個放進專案根目錄的 Plugins 資料夾；專案裡沒有 Plugins 資料夾的話，請自行新增一個。'],
      ['清單中看到 Rebocap', '重新啟動編輯器，開啟 編輯 → 外掛，清單中能看到 Rebocap - blueprint control（版本 V3）就表示安裝完成。'],
      ['在 LiveLink 檢視連線埠', '在 LiveLink 中可以看到對應的 Rebocap 連線埠。'],
      ['建立動畫藍圖', '在內容瀏覽器中對骨骼網格體按右鍵，選擇 建立 → 動畫藍圖，新建或進入該角色的動畫藍圖。'],
      ['新增變數並設為類別參照', '在左側變數欄按 + 新增變數，類型搜尋 Rebocap，選擇 Rebocap Map Data，再選 類別參照（Class Reference）。'],
      ['建立 Map Data 資產', '把變數拖進圖表並編譯一次，右側 預設值 按 +，建立一個 Map Data 資產。'],
      ['逐項填入骨骼映射', '在映射視窗中逐項填入角色對應的骨骼名稱。選擇骨骼預設 可一鍵填入 UE 預設命名；若命名不同，請開啟骨架視窗查看後複製。'],
      ['是否需要 A-Pose 轉 T-Pose', '角色本身已是 T-Pose 的話，可跳過這一步。'],
      ['自動辨識骨骼或手動指定資產', '此節點能自動辨識部分常見骨骼，也可手動指定 Retarget Asset。'],
      ['加入 Rebocap Body Pose 節點', '在動畫圖表中按右鍵搜尋 reb，加入 Rebocap Body Pose 節點。'],
      ['節點順序與共用 Map Data', '若使用 A-Pose to T-Pose 節點，請放在 Body Pose 前一級；兩個節點的 Retarget Asset 接同一份 Map Data。'],
      ['編譯後兩邊動作一致', '按下編譯後，Rebocap 提示已接收到骨架資料，且兩邊 3D 預覽動作一致，就表示連線成功。'],
    ],
  },
  ja: {
    title: 'UE プラグイン使用手順',
    chapters: ['プラグインの導入', 'プラグインの確認', 'アニメーションブループリント作成', 'ボーンマッピング設定', 'T-Pose への調整', 'モーキャプ接続', '完了'],
    steps: [
      ['rebocap を Plugins に配置', 'プラグインの圧縮ファイルを展開し、中の rebocap フォルダーをプロジェクト直下の Plugins フォルダーへ入れます。Plugins がない場合は新規作成します。'],
      ['プラグイン一覧に Rebocap が出る', 'エディターを再起動し、編集 → プラグイン を開きます。Rebocap - blueprint control（V3）が表示されていれば導入完了です。'],
      ['LiveLink で接続ポートを確認', 'LiveLink に Rebocap の接続ポートが表示されます。'],
      ['アニメーションブループリントを作成', 'コンテンツブラウザーでスケルタルメッシュを右クリックし、作成 → アニメーションブループリント を選んで作成します。'],
      ['変数を追加してクラス参照に設定', '変数パネルで + を押し、型を Rebocap で検索して Rebocap Map Data を選び、クラス参照 にします。'],
      ['Map Data アセットを作成', '変数をグラフへドラッグして一度コンパイルし、既定値 の + から Map Data アセットを作成します。'],
      ['ボーンマッピングを入力', 'マッピング画面でキャラクターのボーン名を順に入力します。ボーンプリセットを選択 で UE 既定名を一括入力できます。'],
      ['A-Pose から T-Pose への変換は必要か', 'キャラクターが既に T-Pose ならこの手順は不要です。'],
      ['骨格の自動認識とアセット指定', 'このノードは一般的な骨格を自動認識し、Retarget Asset を手動指定することもできます。'],
      ['Rebocap Body Pose ノードを追加', 'アニメーショングラフで右クリックし、reb で検索して Rebocap Body Pose を追加します。'],
      ['ノードの順序と Map Data の共有', 'A-Pose to T-Pose を使う場合は Body Pose の前段に置き、両方の Retarget Asset に同じ Map Data を指定します。'],
      ['コンパイル後に両側の動きが一致', 'コンパイル後、Rebocap 側に骨格データ受信の表示が出て、両方の 3D プレビューが同じ動きになれば接続成功です。'],
    ],
  },
  es: {
    title: 'Guía del plugin de UE',
    chapters: ['Instalar el plugin', 'Comprobar el plugin', 'Crear el Animation Blueprint', 'Configurar el mapeo de huesos', 'Ajustar a T-Pose', 'Conectar la captura', 'Listo'],
    steps: [
      ['Copiar rebocap a Plugins', 'Descomprime el paquete y coloca la carpeta rebocap dentro de la carpeta Plugins en la raíz del proyecto; créala si no existe.'],
      ['El plugin aparece en la lista', 'Reinicia el editor y abre Editar → Plugins; si ves Rebocap - blueprint control (V3), la instalación está lista.'],
      ['Comprobar el puerto en LiveLink', 'LiveLink muestra el puerto de conexión de Rebocap.'],
      ['Crear el Animation Blueprint', 'En el Content Browser haz clic derecho en el Skeleton Mesh y elige Crear → Animation Blueprint.'],
      ['Añadir la variable como Class Reference', 'En el panel Variables pulsa +, busca el tipo Rebocap, elige Rebocap Map Data y marca Class Reference.'],
      ['Crear el asset Map Data', 'Arrastra la variable al grafo y compila una vez; luego pulsa + en Default Value para crear el asset Map Data.'],
      ['Rellenar el mapeo de huesos', 'Rellena los nombres de hueso uno a uno. Select Bone Preset rellena los nombres por defecto de UE; si tu esqueleto difiere, cópialos desde la ventana Skeleton.'],
      ['¿Hace falta A-Pose to T-Pose?', 'Si el personaje ya está en T-Pose puedes saltarte este paso.'],
      ['Detección automática o asset manual', 'El nodo reconoce esqueletos habituales y también acepta un Retarget Asset manual.'],
      ['Añadir el nodo Rebocap Body Pose', 'En el AnimGraph haz clic derecho, busca reb y añade Rebocap Body Pose.'],
      ['Orden de nodos y Map Data compartido', 'Coloca A-Pose to T-Pose antes de Body Pose y asigna el mismo Map Data en Retarget Asset a ambos nodos.'],
      ['Ambos lados se mueven igual', 'Tras compilar, Rebocap indica que recibió los datos del esqueleto y ambas vistas 3D se mueven igual: la conexión funciona.'],
    ],
  },
  fr: {
    title: 'Guide du plugin UE',
    chapters: ['Installer le plugin', 'Vérifier le plugin', 'Créer l\u2019Animation Blueprint', 'Configurer le mapping des os', 'Passer en T-Pose', 'Connecter la capture', 'Terminé'],
    steps: [
      ['Placer rebocap dans Plugins', 'Décompressez l\u2019archive et placez le dossier rebocap dans le dossier Plugins à la racine du projet ; créez-le s\u2019il n\u2019existe pas.'],
      ['Le plugin apparaît dans la liste', 'Redémarrez l\u2019éditeur et ouvrez Édition → Plugins ; si Rebocap - blueprint control (V3) apparaît, l\u2019installation est terminée.'],
      ['Vérifier le port dans LiveLink', 'LiveLink affiche le port de connexion Rebocap correspondant.'],
      ['Créer l\u2019Animation Blueprint', 'Dans le Content Browser, faites un clic droit sur le Skeleton Mesh et choisissez Créer → Animation Blueprint.'],
      ['Ajouter la variable en Class Reference', 'Dans le panneau Variables, cliquez sur +, cherchez le type Rebocap, choisissez Rebocap Map Data puis Class Reference.'],
      ['Créer l\u2019asset Map Data', 'Glissez la variable dans le graphe et compilez une fois, puis cliquez sur + dans Default Value pour créer l\u2019asset Map Data.'],
      ['Renseigner le mapping des os', 'Renseignez les noms d\u2019os un par un. Select Bone Preset remplit les noms par défaut d\u2019UE ; si votre squelette diffère, copiez-les depuis la fenêtre Skeleton.'],
      ['Faut-il passer par A-Pose to T-Pose ?', 'Si le personnage est déjà en T-Pose, cette étape est inutile.'],
      ['Détection automatique ou asset manuel', 'Le nœud reconnaît les squelettes courants et accepte aussi un Retarget Asset manuel.'],
      ['Ajouter le nœud Rebocap Body Pose', 'Dans l\u2019AnimGraph, faites un clic droit, cherchez reb et ajoutez Rebocap Body Pose.'],
      ['Ordre des nœuds et Map Data partagé', 'Placez A-Pose to T-Pose avant Body Pose et donnez le même Map Data dans Retarget Asset aux deux nœuds.'],
      ['Les deux côtés bougent ensemble', 'Après compilation, Rebocap indique avoir reçu les données du squelette et les deux aperçus 3D bougent ensemble : la connexion fonctionne.'],
    ],
  },
  ko: {
    title: 'UE 플러그인 사용 안내',
    chapters: ['플러그인 설치', '플러그인 확인', '애니메이션 블루프린트 생성', '본 매핑 설정', 'T-Pose 조정', '모션 캡처 연결', '완료'],
    steps: [
      ['rebocap을 Plugins에 넣기', '플러그인 압축을 풀고 rebocap 폴더를 프로젝트 루트의 Plugins 폴더에 넣습니다. Plugins 폴더가 없으면 새로 만듭니다.'],
      ['플러그인 목록에서 Rebocap 확인', '에디터를 다시 시작하고 편집 → 플러그인을 엽니다. Rebocap - blueprint control(V3)이 보이면 설치가 완료된 것입니다.'],
      ['LiveLink에서 연결 포트 확인', 'LiveLink에서 Rebocap 연결 포트를 확인할 수 있습니다.'],
      ['애니메이션 블루프린트 생성', '콘텐츠 브라우저에서 스켈레탈 메시를 마우스 오른쪽 버튼으로 클릭하고 생성 → 애니메이션 블루프린트를 선택합니다.'],
      ['변수를 클래스 참조로 추가', '변수 패널에서 +를 눌러 유형을 Rebocap으로 검색하고 Rebocap Map Data를 선택한 뒤 클래스 참조로 설정합니다.'],
      ['Map Data 에셋 생성', '변수를 그래프로 끌어 놓고 한 번 컴파일한 뒤 기본값에서 +를 눌러 Map Data 에셋을 만듭니다.'],
      ['본 매핑 입력', '매핑 창에서 캐릭터의 본 이름을 하나씩 입력합니다. 본 프리셋 선택으로 UE 기본 이름을 한 번에 채울 수 있습니다.'],
      ['A-Pose to T-Pose가 필요한가', '캐릭터가 이미 T-Pose라면 이 단계는 건너뜁니다.'],
      ['본 자동 인식 또는 에셋 지정', '이 노드는 일반적인 골격을 자동으로 인식하며 Retarget Asset을 직접 지정할 수도 있습니다.'],
      ['Rebocap Body Pose 노드 추가', '애니메이션 그래프에서 마우스 오른쪽 버튼을 누르고 reb를 검색해 Rebocap Body Pose를 추가합니다.'],
      ['노드 순서와 Map Data 공유', 'A-Pose to T-Pose를 Body Pose 앞 단계에 두고 두 노드의 Retarget Asset에 같은 Map Data를 지정합니다.'],
      ['컴파일 후 양쪽 동작 일치', '컴파일 후 Rebocap에 스켈레톤 데이터 수신 표시가 뜨고 양쪽 3D 미리보기가 같은 동작을 하면 연결 성공입니다.'],
    ],
  },
  ru: {
    title: 'Руководство по плагину UE',
    chapters: ['Установка плагина', 'Проверка плагина', 'Создание Animation Blueprint', 'Настройка маппинга костей', 'Переход в T-Pose', 'Подключение захвата', 'Готово'],
    steps: [
      ['Скопировать rebocap в Plugins', 'Распакуйте архив и положите папку rebocap в папку Plugins в корне проекта; если её нет, создайте.'],
      ['Плагин появился в списке', 'Перезапустите редактор и откройте Правка → Плагины; если в списке есть Rebocap - blueprint control (V3), установка прошла.'],
      ['Проверить порт в LiveLink', 'В LiveLink виден соответствующий порт подключения Rebocap.'],
      ['Создать Animation Blueprint', 'В Content Browser нажмите правой кнопкой на Skeleton Mesh и выберите Создать → Animation Blueprint.'],
      ['Добавить переменную как Class Reference', 'В панели Variables нажмите +, найдите тип Rebocap, выберите Rebocap Map Data и укажите Class Reference.'],
      ['Создать ассет Map Data', 'Перетащите переменную в граф и один раз скомпилируйте, затем нажмите + в Default Value и создайте ассет Map Data.'],
      ['Заполнить маппинг костей', 'Заполните имена костей по порядку. Select Bone Preset подставляет стандартные имена UE; если скелет отличается, скопируйте имена из окна Skeleton.'],
      ['Нужен ли A-Pose to T-Pose', 'Если персонаж уже в T-Pose, этот шаг можно пропустить.'],
      ['Автоопределение костей или ассет вручную', 'Нод распознаёт типовые скелеты и также принимает Retarget Asset вручную.'],
      ['Добавить нод Rebocap Body Pose', 'В AnimGraph нажмите правой кнопкой, найдите reb и добавьте Rebocap Body Pose.'],
      ['Порядок нодов и общий Map Data', 'Поставьте A-Pose to T-Pose перед Body Pose и укажите одинаковый Map Data в Retarget Asset у обоих нодов.'],
      ['Обе стороны двигаются одинаково', 'После компиляции Rebocap сообщает о получении данных скелета, и оба 3D-превью двигаются одинаково — подключение работает.'],
    ],
  },
};

const IMG_BASE = '/img/ue_plugin/guide/';

function build(locale: string): VideoGuideData {
  const t = TEXTS[locale] ?? TEXTS.en;
  return {
    title: t.title,
    chapters: CHAPTERS.map((c, i) => ({id: c.id, title: t.chapters[i] ?? c.id, start: c.start, end: c.end})),
    steps: STEPS.map((s, i) => {
      const [title, text] = t.steps[i] ?? [s.id, ''];
      return {
        id: s.id,
        chapterId: s.chapterId,
        start: s.start,
        end: s.end,
        title,
        image: `${IMG_BASE}${s.image}.png`,
        text,
      };
    }),
    options: {layout: 'below', showAllSteps: true},
  };
}

export const ueV3ByLocale: Record<string, VideoGuideData> = Object.fromEntries(
  Object.keys(TEXTS).map((locale) => [locale, build(locale)]),
);

/** 默认导出（中文），保留旧引用 */
export const ueV3: VideoGuideData = build('zh-Hans');
