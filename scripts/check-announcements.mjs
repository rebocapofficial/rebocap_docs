/**
 * 公告数据门禁：8 个语言文件必须结构一致、id 对齐、字段合法。
 * 接入 npm run build，任一项不通过就阻断部署。
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const DIR = 'announcements';
const LOCALES = ['en', 'zh-Hans', 'zh-Hant', 'ja', 'es', 'fr', 'ko', 'ru'];
const TYPES = new Set(['version', 'notice', 'maintenance', 'event']);
const LEVELS = new Set(['normal', 'important', 'critical']);

const errors = [];
const warnings = [];

const read = (locale) => {
  const file = path.join(DIR, `${locale}.json`);
  if (!fs.existsSync(file)) {
    errors.push(`缺失语言文件：${file}`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    errors.push(`${file} 不是合法 JSON：${err.message}`);
    return null;
  }
};

const data = Object.fromEntries(LOCALES.map((locale) => [locale, read(locale)]));

const base = data.en;
if (base) {
  const ids = new Set();
  for (const item of base.items || []) {
    if (!item.id) errors.push('en: 存在没有 id 的条目');
    if (ids.has(item.id)) errors.push(`en: id 重复 ${item.id}`);
    ids.add(item.id);
    if (!TYPES.has(item.type)) errors.push(`${item.id}: type 非法 ${item.type}`);
    if (!LEVELS.has(item.level)) errors.push(`${item.id}: level 非法 ${item.level}`);
    if (!item.publishAt || Number.isNaN(Date.parse(item.publishAt))) {
      errors.push(`${item.id}: publishAt 不是可解析的时间`);
    }
    if (item.expireAt && Number.isNaN(Date.parse(item.expireAt))) {
      errors.push(`${item.id}: expireAt 不是可解析的时间`);
    }
    if (!item.title || !item.summary) errors.push(`${item.id}: 缺少 title / summary`);
    if (!Array.isArray(item.body) || item.body.length === 0) errors.push(`${item.id}: body 为空`);
    if (!item.link?.href?.startsWith('/')) errors.push(`${item.id}: link.href 必须以 / 开头`);
    if (item.summary && item.summary.length > 160) warnings.push(`en/${item.id}: summary 偏长（${item.summary.length}）`);
    if (item.body && item.body.length > 6) warnings.push(`${item.id}: body 条目偏多（${item.body.length} 条）`);
  }

  for (const locale of LOCALES) {
    const file = data[locale];
    if (!file) continue;
    const localeIds = (file.items || []).map((item) => item.id);
    const missing = [...ids].filter((id) => !localeIds.includes(id));
    const extra = localeIds.filter((id) => !ids.has(id));
    if (missing.length) errors.push(`${locale}: 缺少条目 ${missing.join(', ')}`);
    if (extra.length) errors.push(`${locale}: 多出条目 ${extra.join(', ')}`);

    if (!file.ui) errors.push(`${locale}: 缺少 ui 文案`);
    else {
      for (const key of ['all', 'version', 'notice', 'maintenance', 'event', 'empty', 'close', 'details', 'pill', 'monthFormat']) {
        if (!file.ui[key]) errors.push(`${locale}: ui.${key} 为空`);
      }
    }

    // 非英文链接必须带自己的语言前缀，否则会跳到别的语言
    if (locale !== 'en') {
      for (const item of file.items || []) {
        if (item.link?.href && !item.link.href.startsWith(`/${locale}/`)) {
          errors.push(`${locale}/${item.id}: link.href 缺少 /${locale}/ 前缀`);
        }
      }
    }

    // 文案长度提醒：中文按字数，其他语言按字符数
    const limit = locale.startsWith('zh') ? 80 : 160;
    for (const item of file.items || []) {
      if (item.summary && item.summary.length > limit) {
        warnings.push(`${locale}/${item.id}: summary 偏长（${item.summary.length}）`);
      }
    }
  }
}

for (const warning of warnings) console.warn(`⚠️  ${warning}`);

if (errors.length) {
  console.error('\n❌ 公告数据校验失败：');
  for (const error of errors) console.error(`   - ${error}`);
  process.exit(1);
}

console.log(`✅ 公告数据校验通过：${LOCALES.length} 个语言 × ${base.items.length} 条`);
