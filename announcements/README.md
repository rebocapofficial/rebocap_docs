# 公告数据（运营手册）

这个目录是公告系统的**唯一事实来源**。网页上的浮卡、公告总览页、铃铛红点都从这里生成，
以后客户端软件也会读同一份数据。

## 文件结构

```
announcements/
├── en.json        # 英文（默认语言，缺项时其他语言会回退到这里）
├── zh-Hans.json   # 简体中文
├── zh-Hant.json   # 繁体中文
├── ja.json
├── es.json
├── fr.json
├── ko.json
└── ru.json
```

8 个文件**必须保持相同的 id 集合**，`npm run announce:check` 会强制校验。

## 发一条新公告

1. 在 **8 个语言文件**的 `items` 里加同一个对象（`id` 必须完全一致）；
2. 跑 `npm run announce:check`，通过后再提交；
3. 推送后由 `deploy.sh` 自动构建，页面和浮卡一起生效。

```json
{
  "id": "2026-12-10-v9-firmware",
  "type": "notice",
  "level": "important",
  "backfill": false,
  "pinned": false,
  "publishAt": "2026-12-10T10:00:00+08:00",
  "expireAt": null,
  "title": "接收器 V9 固件发布",
  "summary": "V9 修复了 V8 的断连问题，可以升级。",
  "body": [
    "适用：所有 V6 / V7 / V8 接收器。",
    "方式：在客户端「检查固件」中升级。",
    "注意：升级过程中不要拔掉 USB。"
  ],
  "link": { "label": "查看固件说明", "href": "/zh-Hans/docs/tutorial/software_install#software-download" }
}
```

## 字段

| 字段 | 必填 | 说明 |
| :-- | :-- | :-- |
| `id` | ✅ | `YYYY-MM-DD-slug`。**发布后绝对不要改**，已读状态和客户端去重都靠它 |
| `type` | ✅ | `version` 版本更新 / `notice` 重要通知 / `maintenance` 维护 / `event` 活动 |
| `level` | ✅ | `normal` / `important` / `critical`。`critical` 才会自动弹居中弹窗，慎用 |
| `backfill` | ✅ | `true` = 补录的历史条目：进列表，但**不计入红点、不弹浮卡** |
| `pinned` | | 置顶，列表最前 |
| `publishAt` | ✅ | 必须带时区，如 `2026-12-10T10:00:00+08:00`，不要写裸日期 |
| `expireAt` | | 过期时间；到点后构建期自动过滤掉（也可以手动下线） |
| `title` | ✅ | ≤ 20 字，带版本号或日期 |
| `summary` | ✅ | ≤ 60 字，一句话说清「发生了什么 + 我该做什么」 |
| `body` | ✅ | 3–5 条，每条 ≤ 40 字；第一条现象，最后一条下一步 |
| `link.href` | ✅ | **必须带语言前缀**：`/zh-Hans/docs/...`、`/ja/docs/...`；英文 `/docs/...` |

## 语言文件里的 `ui`

`ui` 是页面自身用到的界面文案（筛选按钮、空状态、关闭、月份格式），加新语言时才需要动。

## 本地预览

```bash
npm start -- --locale zh-Hans
# 打开 http://localhost:3000/zh-Hans/docs/announcements
```

> 注意：本仓库的 `sidebars.ts` 依赖 `DOCUSAURUS_CURRENT_LOCALE`，直接 `npm start`
> 会报 “Missing sidebar translations for undefined”，必须带 `--locale` 参数。

## 常见问题

- **公告页显示 8 条，但只有 6 条？** 检查 `expireAt` 和 `backfill`。
- **浮卡不出现？** 已经读过、或今天点过「不再提示」、或本次会话已经提示过——清一下站点存储即可复位。
- **改了文案但页面没变？** 开发服务器要重启；生产环境需要重新构建部署。
- **链接跳错语言？** `link.href` 少了 `/zh-Hans` 这类前缀，`announce:check` 会直接报错。
