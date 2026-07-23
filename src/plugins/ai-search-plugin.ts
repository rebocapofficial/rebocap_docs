import path from 'path';
import fs from 'fs';
import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

export default function aiSearchPlugin(): any {
  return {
    name: 'ai-search-plugin',
    configureWebpack(config: any, isServer: boolean): any {
      if (isServer) return {};
      return {
        devServer: {
          setupMiddlewares: (middlewares: any, devServer: any) => {
            if (!devServer) return middlewares;

            const staticImgPath = path.join(__dirname, '../../static/img');

            // Serve directly from disk to bypass baseUrl routing issues
            devServer.app.use('/img', express.static(staticImgPath));
            devServer.app.use('/static/img', express.static(staticImgPath));

            devServer.app.use(express.json());

            // 内存 Rate Limiter (防恶意刷接口/防滥用)
            const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
            const MAX_REQUESTS_PER_MIN = 8; // 单 IP 每分钟最多 8 次提问

            devServer.app.post('/api/ai-search', async (req: any, res: any) => {
              try {
                // 1. IP 频率限制检查
                const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
                const now = Date.now();
                const record = rateLimitMap.get(clientIp as string);

                if (record && now < record.resetTime) {
                  if (record.count >= MAX_REQUESTS_PER_MIN) {
                    const waitSeconds = Math.ceil((record.resetTime - now) / 1000);
                    return res.status(429).json({
                      error: `提问过于频繁，为防止 API 滥用，请等待 ${waitSeconds} 秒后重试。`
                    });
                  }
                  record.count += 1;
                } else {
                  rateLimitMap.set(clientIp as string, { count: 1, resetTime: now + 60 * 1000 });
                }

                let apiKey = process.env.DEEPSEEK_API_KEY;
                if (!apiKey) {
                  const keyPath = path.join(__dirname, '../../deepseek的api_使用这个api但不要把这个文件上传到git.txt');
                  if (fs.existsSync(keyPath)) {
                    apiKey = fs.readFileSync(keyPath, 'utf-8').trim();
                  }
                }

                if (!apiKey) {
                  return res.status(500).json({ error: 'DeepSeek API Key 未配置' });
                }

                let { query, contextDocs } = req.body || {};

                // 2. 输入安全防护：限制提问文本长度（最多 300 字符）
                if (!query || typeof query !== 'string' || !query.trim()) {
                  return res.status(400).json({ error: '请输入有效的提问内容' });
                }
                query = query.trim().slice(0, 300);

                let systemMessage = `你是一个专业、严谨、图文联动且绝对诚实的 REBOCAP 官方文档 AI 搜索技术支持专家。

【防幻觉与忠实度最严禁令】：
1. 绝对忠实于知识库：你的回答必须 100% 严格基于【参考文档知识库】中的文字。如果【参考文档知识库】中未明确提及“在线自动升级”、“软件内自动更新”或某种特定操作步骤，你【绝对禁止】凭借大模型通用常识凭空编造或补充通用软件升级步骤！
2. REBOCAP 固件更新特例：REBOCAP 固件是附存在软件安装包中的（非联网/非软件内在线自动升级），请严格照搬参考文档中的“检查固件”说明。
3. 图文与视频联动呈现：如果【参考文档知识库】中包含图片（例如 \`![图片描述](/img/...)\`）或视频 HTML 标记（例如 \`<video...><source src="..." /></video>\`），请在解答对应的操作步骤时，**必须把这些图片或视频语法照原样嵌入到相应步骤下方**，以便前端直接渲染为可播放视频窗口。
4. 简洁直接：单次搜索直接给出答案，**绝对不要**在结尾添加“欢迎进一步提问”、“如果您还有其他问题”等任何寒暄或客套话。`;

                let docsToUse = Array.isArray(contextDocs) ? [...contextDocs] : [];

                // 本地开发模式或 Pagefind 未找到结果时的本地 Markdown 智能分词/打分检索
                if (docsToUse.length === 0 && query) {
                  const searchDirs = [
                    path.join(__dirname, '../../i18n/zh-Hans/docusaurus-plugin-content-docs/current'),
                    path.join(__dirname, '../../docs')
                  ];

                  const cleanQuery = query.toLowerCase().trim();
                  const termsSet = new Set<string>();
                  termsSet.add(cleanQuery);
                  cleanQuery.split(/\s+/).forEach(w => { if (w) termsSet.add(w); });
                  const stripped = cleanQuery.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '');
                  for (let len = 2; len <= 4; len++) {
                    for (let i = 0; i <= stripped.length - len; i++) {
                      termsSet.add(stripped.slice(i, i + len));
                    }
                  }
                  const terms = Array.from(termsSet).filter(t => t.length >= 2);

                  const allMdFiles: string[] = [];
                  const scanDir = (dir: string) => {
                    if (!fs.existsSync(dir)) return;
                    const entries = fs.readdirSync(dir, { withFileTypes: true });
                    for (const entry of entries) {
                      const fullP = path.join(dir, entry.name);
                      if (entry.isDirectory()) {
                        scanDir(fullP);
                      } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
                        allMdFiles.push(fullP);
                      }
                    }
                  };
                  searchDirs.forEach(d => scanDir(d));

                  const scoredDocs: { score: number; doc: any }[] = [];
                  for (const filePath of allMdFiles) {
                    const raw = fs.readFileSync(filePath, 'utf-8');
                    const lowerRaw = raw.toLowerCase();
                    let score = 0;

                    terms.forEach(term => {
                      if (lowerRaw.includes(term)) {
                        score += term.length * term.length;
                      }
                    });

                    if (score > 0) {
                      const titleMatch = raw.match(/^title:\s*["']?([^"'\n]+)["']?/m) || raw.match(/^#+\s+(.+)/m);
                      const title = titleMatch ? titleMatch[1].trim() : path.basename(filePath);

                      const normalized = raw
                        .replace(/(\.\.\/)+static\/img\//g, '/img/')
                        .replace(/\/static\/img\//g, '/img/')
                        .replace(/static\/img\//g, '/img/');

                      let docUrl = '#';
                      if (filePath.includes('docusaurus-plugin-content-docs')) {
                        const rel = path.relative(path.join(__dirname, '../../i18n/zh-Hans/docusaurus-plugin-content-docs/current'), filePath).replace(/\\/g, '/').replace(/\.mdx?$/, '');
                        docUrl = `/zh-Hans/docs/${rel.replace(/\/(README|index)$/, '')}`;
                      } else {
                        const rel = path.relative(path.join(__dirname, '../../docs'), filePath).replace(/\\/g, '/').replace(/\.mdx?$/, '');
                        docUrl = `/zh-Hans/docs/${rel.replace(/\/(README|index)$/, '')}`;
                      }

                      // 智能精准切片：在长文档中定位关键字所在位置，前后截取包含图片与步骤的完整段落（防截断）
                      let bestPos = -1;
                      for (const term of terms) {
                        const pos = lowerRaw.indexOf(term);
                        if (pos !== -1) {
                          bestPos = pos;
                          break;
                        }
                      }

                      let extractedContent = normalized;
                      if (bestPos !== -1 && normalized.length > 3500) {
                        const start = Math.max(0, bestPos - 300);
                        const end = Math.min(normalized.length, bestPos + 3200);
                        extractedContent = (start > 0 ? '...\n' : '') + normalized.slice(start, end) + (end < normalized.length ? '\n...' : '');
                      } else {
                        extractedContent = normalized.slice(0, 3500);
                      }

                      scoredDocs.push({
                        score,
                        doc: {
                          title,
                          url: docUrl,
                          content: extractedContent
                        }
                      });
                    }
                  }

                  scoredDocs.sort((a, b) => b.score - a.score);
                  docsToUse = scoredDocs.slice(0, 3).map(item => item.doc);
                }

                let userPrompt = `【参考文档知识库】:\n`;
                if (docsToUse.length > 0) {
                  for (let i = 0; i < docsToUse.length; i++) {
                    const doc = docsToUse[i];
                    let enrichedContent = doc.content;
                    if (doc.url && doc.url !== '#') {
                      try {
                        const docUrl = `http://${req.get('host')}${doc.url}`;
                        const htmlRes = await axios.get(docUrl);
                        const $ = cheerio.load(htmlRes.data);
                        const article = $('article');
                        if (article.length > 0) {
                          let extracted = '';
                          article.find('h1, h2, h3, h4, p, li, img').each((_: any, el: any) => {
                            const tag = el.tagName.toLowerCase();
                            if (tag === 'img') {
                              let src = $(el).attr('src');
                              const alt = $(el).attr('alt') || '图片';
                              if (src) {
                                if (src.includes('/static/img/')) src = src.replace('/static/img/', '/img/');
                                extracted += `\n![${alt}](${src})\n`;
                              }
                            } else if (tag.match(/^h[1-6]$/)) {
                              const level = tag.replace('h', '');
                              extracted += `\n${'#'.repeat(parseInt(level))} ${$(el).text().trim()}\n`;
                            } else if (tag === 'li') {
                              extracted += `- ${$(el).text().trim()}\n`;
                            } else {
                              extracted += `${$(el).text().trim()}\n`;
                            }
                          });
                          enrichedContent = extracted.slice(0, 3000);
                        }
                      } catch (e: any) {
                        console.warn('Failed to fetch rich content for', doc.url, e.message);
                      }
                    }
                    userPrompt += `[参考文档 ${i + 1}] 页面/章节: ${doc.title || ''} (链接: ${doc.url || ''})\n${enrichedContent}\n\n`;
                  }
                } else {
                  userPrompt += `（重要提示：在当前的 REBOCAP 官方文档库中未搜寻到相关的操作小节，请严格遵循【绝对防脑补】原则，诚实回答未查找到相关说明，切勿编造通用行业步骤）\n\n`;
                }
                userPrompt += `【用户提问】:\n${query}`;

                const response = await axios.post('https://api.deepseek.com/chat/completions', {
                  model: 'deepseek-chat',
                  messages: [
                    { role: 'system', content: systemMessage },
                    { role: 'user', content: userPrompt }
                  ],
                  temperature: 0.0
                }, {
                  headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                  },
                  timeout: 30000
                });

                const answer = response.data?.choices?.[0]?.message?.content || '未获取到有效回答';
                return res.json({
                  answer,
                  sources: docsToUse.map((d: any) => ({ title: d.title, url: d.url }))
                });
              } catch (err: any) {
                console.error('AI Search Error:', err?.response?.data || err.message);
                return res.status(500).json({ error: err?.response?.data?.error?.message || err.message || 'DeepSeek API 调用失败' });
              }
            });

            return middlewares;
          },
        },
      };
    },
  };
}
