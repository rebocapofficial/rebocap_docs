const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '../build');

// Map Docusaurus locales to legacy software locales
const LOCALE_MAP = {
  'zh-Hans': 'zh_cn',
  'en': 'en_US',
  'ja': 'ja_JP',
  'zh-Hant': 'zh_TW'
};

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function generateRedirectHtml(targetUrl) {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Redirecting...</title>
    <!-- Fallback if JS is disabled -->
    <meta http-equiv="refresh" content="0; url=${targetUrl}" />
    <script>
        // JS redirect preserves the hash (e.g. #status)
        window.location.replace('${targetUrl}' + window.location.hash);
    </script>
</head>
<body>
    <p>Redirecting to <a href="${targetUrl}">${targetUrl}</a>...</p>
</body>
</html>`;
}

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  }
}

function processLocale(docusaurusLocale, legacyLocale) {
  // English is at build/docs, others are at build/<locale>/docs
  const docsBasePath = docusaurusLocale === 'en' 
    ? path.join(BUILD_DIR, 'docs') 
    : path.join(BUILD_DIR, docusaurusLocale, 'docs');

  if (!fs.existsSync(docsBasePath)) {
    console.warn(`[Redirects] Warning: Docs path not found for locale ${docusaurusLocale}: ${docsBasePath}`);
    return;
  }

  const generatedCount = { count: 0 };

  walkDir(docsBasePath, (filePath) => {
    if (filePath.endsWith('index.html')) {
      const relativeToDocs = path.relative(docsBasePath, filePath);
      // convert Windows backslashes to forward slashes and remove index.html
      const urlPath = relativeToDocs.replace(/\\/g, '/').replace(/\/index\.html$/, '').replace(/^index\.html$/, '');
      
      // Target URL in Docusaurus
      // e.g. /zh-Hans/docs/ui_help_doc/control/connect
      // Note: we might want to prevent trailing slash if it's not the root
      let cleanUrlPath = urlPath === '' ? '' : `/${urlPath}`;
      const targetUrl = docusaurusLocale === 'en' 
        ? `/docs${cleanUrlPath}` 
        : `/${docusaurusLocale}/docs${cleanUrlPath}`;

      // Destination for the legacy html file
      // e.g. build/zh_cn/ui_help_doc/control/connect.html
      let destFile;
      if (urlPath === '') {
         destFile = path.join(BUILD_DIR, legacyLocale, 'index.html');
      } else {
         destFile = path.join(BUILD_DIR, legacyLocale, `${urlPath}.html`);
      }

      ensureDirSync(path.dirname(destFile));
      fs.writeFileSync(destFile, generateRedirectHtml(targetUrl));
      generatedCount.count++;
    }
  });

  console.log(`[Redirects] Generated ${generatedCount.count} redirect files for ${legacyLocale} -> ${docusaurusLocale}`);
}

function main() {
  console.log('[Redirects] Starting generation of legacy redirect files...');
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('[Redirects] Error: Build directory does not exist. Run this script after Docusaurus build.');
    process.exit(1);
  }

  for (const [docusaurusLocale, legacyLocale] of Object.entries(LOCALE_MAP)) {
    processLocale(docusaurusLocale, legacyLocale);
  }
  
  console.log('[Redirects] Done!');
}

main();
