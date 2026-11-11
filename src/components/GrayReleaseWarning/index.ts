type WarningCopy = {
  label: string;
  title: string;
  message: string;
  cancel: string;
  continue: string;
};

const copyByLocale: Record<string, WarningCopy> = {
  en: {
    label: 'Gray release',
    title: 'Before downloading the gray release',
    message:
      'This is a test version, and its stability has not been established. You may encounter bugs or unexpected behavior. Please choose carefully. If you are new to Rebocap, we recommend starting with the stable Release version.',
    cancel: 'Cancel',
    continue: 'Continue download',
  },
  'zh-Hans': {
    label: '灰度版本',
    title: '下载灰度版本前请注意',
    message:
      '这是测试版本，稳定性尚无法确定，使用中可能遇到问题。请谨慎选择。特别是新手，建议优先使用稳定的正式版（Release），了解相关风险后再尝试灰度版本。',
    cancel: '暂不下载',
    continue: '仍要下载',
  },
  'zh-Hant': {
    label: '灰度版本',
    title: '下載灰度版本前請留意',
    message:
      '這是測試版本，穩定性尚無法確定，使用時可能遇到問題。請謹慎選擇。新手建議優先使用穩定的正式版（Release），了解相關風險後再嘗試灰度版本。',
    cancel: '暫不下載',
    continue: '仍要下載',
  },
  ja: {
    label: 'グレーテスト版',
    title: 'グレーテスト版をダウンロードする前に',
    message:
      'これはテスト版であり、安定性は確認されていません。使用中に不具合や予期しない動作が発生する可能性があります。慎重に選択してください。Rebocapを初めて使う方は、まず安定版（Release）をお使いください。',
    cancel: 'キャンセル',
    continue: 'ダウンロードを続行',
  },
  fr: {
    label: 'Version en déploiement progressif',
    title: 'Avant de télécharger cette version',
    message:
      'Il s’agit d’une version de test dont la stabilité n’est pas garantie. Des bugs ou des comportements inattendus peuvent survenir. Choisissez-la avec prudence. Si vous débutez avec Rebocap, nous vous conseillons de commencer par la version Release stable.',
    cancel: 'Annuler',
    continue: 'Continuer le téléchargement',
  },
  es: {
    label: 'Versión de prueba gradual',
    title: 'Antes de descargar esta versión',
    message:
      'Esta es una versión de prueba y no se puede garantizar su estabilidad. Puede presentar errores o comportamientos inesperados. Elija con cuidado. Si está empezando a usar Rebocap, recomendamos comenzar con la versión estable (Release).',
    cancel: 'Cancelar',
    continue: 'Continuar descarga',
  },
  ru: {
    label: 'Тестовая версия с поэтапным выпуском',
    title: 'Перед загрузкой этой версии',
    message:
      'Это тестовая версия, стабильность которой не гарантируется. Возможны ошибки и непредвиденное поведение. Выбирайте ее с осторожностью. Если вы только начинаете пользоваться Rebocap, рекомендуем сначала установить стабильную версию Release.',
    cancel: 'Отмена',
    continue: 'Продолжить загрузку',
  },
  ko: {
    label: '그레이 테스트 버전',
    title: '그레이 버전을 다운로드하기 전에 확인하세요',
    message:
      '이 버전은 테스트 버전이며 안정성이 보장되지 않습니다. 사용 중 오류나 예상치 못한 동작이 발생할 수 있으니 신중하게 선택하세요. Rebocap을 처음 사용하는 경우 안정적인 정식 버전(Release)을 먼저 사용하는 것을 권장합니다.',
    cancel: '취소',
    continue: '계속 다운로드',
  },
};

const previewCopyByLocale: Record<string, WarningCopy> = {
  en: {
    label: 'Preview version',
    title: 'Before downloading a preview version',
    message:
      'This is a preview/test version that has not been extensively tested, so its stability is not guaranteed. It may contain bugs or behave unexpectedly. Please choose carefully, especially if you are new to Rebocap.',
    cancel: 'Cancel',
    continue: 'Continue download',
  },
  'zh-Hans': {
    label: '预览版本',
    title: '下载预览版本前请注意',
    message:
      '此版本为预览/测试版本，尚未经过大规模测试，稳定性无法保证，使用中可能出现问题或异常行为。请谨慎选择，尤其是新手。',
    cancel: '暂不下载',
    continue: '仍要下载',
  },
  'zh-Hant': {
    label: '預覽版本',
    title: '下載預覽版本前請留意',
    message:
      '此版本為預覽／測試版本，尚未經過大規模測試，穩定性無法保證，使用時可能出現問題或異常行為。請謹慎選擇，尤其是新手。',
    cancel: '暫不下載',
    continue: '仍要下載',
  },
  ja: {
    label: 'プレビュー版',
    title: 'プレビュー版をダウンロードする前に',
    message:
      'これはプレビュー／テスト版であり、大規模なテストは行われていないため、安定性は保証されません。不具合や予期しない動作が発生する可能性があります。特に初めて使う方は、慎重にご検討ください。',
    cancel: 'キャンセル',
    continue: 'ダウンロードを続行',
  },
  fr: {
    label: 'Version de prévisualisation',
    title: 'Avant de télécharger cette version',
    message:
      'Cette version de prévisualisation/test n’a pas été testée à grande échelle ; sa stabilité n’est donc pas garantie. Des bugs ou des comportements inattendus peuvent survenir. Choisissez-la avec prudence, surtout si vous débutez avec Rebocap.',
    cancel: 'Annuler',
    continue: 'Continuer le téléchargement',
  },
  es: {
    label: 'Versión de vista previa',
    title: 'Antes de descargar esta versión',
    message:
      'Esta versión de vista previa/prueba no se ha probado a gran escala, por lo que no se puede garantizar su estabilidad. Puede presentar errores o comportamientos inesperados. Elija con cuidado, especialmente si está empezando a usar Rebocap.',
    cancel: 'Cancelar',
    continue: 'Continuar descarga',
  },
  ru: {
    label: 'Предварительная версия',
    title: 'Перед загрузкой предварительной версии',
    message:
      'Эта предварительная тестовая версия не прошла масштабное тестирование, поэтому ее стабильность не гарантируется. Возможны ошибки и непредвиденное поведение. Выбирайте ее с осторожностью, особенно если вы только начинаете пользоваться Rebocap.',
    cancel: 'Отмена',
    continue: 'Продолжить загрузку',
  },
  ko: {
    label: '프리뷰 버전',
    title: '프리뷰 버전을 다운로드하기 전에 확인하세요',
    message:
      '이 프리뷰/테스트 버전은 대규모 테스트를 거치지 않아 안정성이 보장되지 않습니다. 사용 중 오류나 예상치 못한 동작이 발생할 수 있으니 신중하게 선택하세요. 특히 Rebocap을 처음 사용하는 경우 주의해 주세요.',
    cancel: '취소',
    continue: '계속 다운로드',
  },
};

function getCopy(isPreview: boolean): WarningCopy {
  const locale = document.documentElement.lang || 'en';
  const copyByCurrentLocale = isPreview ? previewCopyByLocale : copyByLocale;
  return copyByCurrentLocale[locale] ?? copyByCurrentLocale[locale.split('-')[0]] ?? copyByCurrentLocale.en;
}

function createDialog(): HTMLDialogElement {
  const dialog = document.createElement('dialog');
  dialog.className = 'gray-release-dialog';
  dialog.setAttribute('aria-labelledby', 'gray-release-warning-title');
  dialog.setAttribute('aria-describedby', 'gray-release-warning-message');

  const content = document.createElement('div');
  content.className = 'gray-release-dialog-content';

  const label = document.createElement('p');
  label.className = 'gray-release-dialog-label';

  const title = document.createElement('h2');
  title.id = 'gray-release-warning-title';
  title.className = 'gray-release-dialog-title';

  const message = document.createElement('p');
  message.id = 'gray-release-warning-message';
  message.className = 'gray-release-dialog-message';

  const actions = document.createElement('div');
  actions.className = 'gray-release-dialog-actions';

  const cancel = document.createElement('button');
  cancel.type = 'button';
  cancel.className = 'gray-release-dialog-cancel';
  cancel.addEventListener('click', () => dialog.close());

  const continueLink = document.createElement('a');
  continueLink.className = 'gray-release-dialog-continue';
  continueLink.addEventListener('click', () => dialog.close());

  actions.append(cancel, continueLink);
  content.append(label, title, message, actions);
  dialog.append(content);

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.body.append(dialog);
  return dialog;
}

export function installGrayReleaseWarning(): () => void {
  let dialog: HTMLDialogElement | null = null;
  let trigger: HTMLAnchorElement | null = null;

  const handleClose = () => trigger?.focus();

  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    const downloadLink = target?.closest<HTMLAnchorElement>(
      'a[data-gray-release-download], a[data-preview-download]',
    );
    if (!downloadLink) return;

    const copy = getCopy(downloadLink.hasAttribute('data-preview-download'));
    if (!dialog) {
      if (typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) {
        if (!window.confirm(`${copy.title}\n\n${copy.message}`)) event.preventDefault();
        return;
      }
      dialog = createDialog();
      dialog.addEventListener('close', handleClose);
    }

    event.preventDefault();
    trigger = downloadLink;

    dialog.querySelector('.gray-release-dialog-label')!.textContent = copy.label;
    dialog.querySelector('.gray-release-dialog-title')!.textContent = copy.title;
    dialog.querySelector('.gray-release-dialog-message')!.textContent = copy.message;
    dialog.querySelector<HTMLButtonElement>('.gray-release-dialog-cancel')!.textContent = copy.cancel;

    const continueLink = dialog.querySelector<HTMLAnchorElement>('.gray-release-dialog-continue')!;
    continueLink.textContent = copy.continue;
    continueLink.href = downloadLink.href;
    const targetAttr = downloadLink.getAttribute('target');
    if (targetAttr) continueLink.target = targetAttr;
    else continueLink.removeAttribute('target');
    const downloadAttr = downloadLink.getAttribute('download');
    if (downloadAttr !== null) continueLink.setAttribute('download', downloadAttr);
    else continueLink.removeAttribute('download');

    dialog.showModal();
  };

  document.addEventListener('click', handleClick, true);
  return () => {
    document.removeEventListener('click', handleClick, true);
    dialog?.removeEventListener('close', handleClose);
    dialog?.remove();
  };
}
