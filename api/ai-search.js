const path = require('path');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

// 内存 Rate Limiter
const rateLimitMap = new Map();
const MAX_REQUESTS_PER_MIN = 8;

module.exports = async function handler(req, res) {
  // 设置 CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 1. IP 频率限制检查
    const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
    const now = Date.now();
    const record = rateLimitMap.get(clientIp);

    if (record && now < record.resetTime) {
      if (record.count >= MAX_REQUESTS_PER_MIN) {
        const waitSeconds = Math.ceil((record.resetTime - now) / 1000);
        return res.status(429).json({
          error: `提问过于频繁，为防止 API 滥用，请等待 ${waitSeconds} 秒后重试。`
        });
      }
      record.count += 1;
    } else {
      rateLimitMap.set(clientIp, { count: 1, resetTime: now + 60 * 1000 });
    }

    let apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      const keyPath = path.join(process.cwd(), 'deepseek的api_使用这个api但不要把这个文件上传到git.txt');
      if (fs.existsSync(keyPath)) {
        apiKey = fs.readFileSync(keyPath, 'utf-8').trim();
      }
    }

    if (!apiKey) {
      return res.status(500).json({ error: 'DeepSeek API Key 未在服务端配置。' });
    }

    let { query, contextDocs, locale } = req.body || {};

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

    // 如果前端传过来了 Pagefind / 本地打分文档，进行 Cheerio 页面提取增强
    let userPrompt = `【参考文档知识库】:\n`;
    if (docsToUse.length > 0) {
      for (let i = 0; i < docsToUse.length; i++) {
        const doc = docsToUse[i];
        let enrichedContent = doc.content;
        if (doc.url && doc.url !== '#') {
          try {
            const protocol = req.headers['x-forwarded-proto'] || 'http';
            const host = req.headers['host'];
            const docUrl = `${protocol}://${host}${doc.url}`;
            const htmlRes = await axios.get(docUrl, { timeout: 5000 });
            const $ = cheerio.load(htmlRes.data);
            const article = $('article');
            if (article.length > 0) {
              let extracted = '';
              article.find('h1, h2, h3, h4, p, li, img').each((_, el) => {
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
          } catch (e) {
            // Ignore fetch fallback
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
      sources: docsToUse.map(d => ({ title: d.title, url: d.url }))
    });
  } catch (err) {
    console.error('AI Search API Error:', err?.response?.data || err.message);
    return res.status(500).json({ error: err?.response?.data?.error?.message || err.message || 'DeepSeek API 调用失败' });
  }
};
