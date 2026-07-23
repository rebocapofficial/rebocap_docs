import os

files = [
  'ui_help_doc/control/connect.html',
  'ui_help_doc/control/cap_param.html',
  'ui_help_doc/control/skeleton_setting.html',
  'ui_help_doc/control/config.html',
  'tutorial/software_install.html'
]
locales = {'zh-Hans': 'zh_cn', 'en': 'en_US', 'ja': 'ja_JP', 'zh-Hant': 'zh_TW'}
static_dir = os.path.join(os.path.dirname(__file__), '../static')

for docusaurus_locale, legacy_locale in locales.items():
  for f in files:
    target_path = f.replace('.html', '')
    if docusaurus_locale == 'en':
      target_url = '/docs/{}'.format(target_path)
    else:
      target_url = '/{}/docs/{}'.format(docusaurus_locale, target_path)
    
    html = """<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0; url={0}" />
    <script>
        window.location.replace('{0}' + window.location.hash);
    </script>
</head>
<body>
    <p>Redirecting to <a href="{0}">{0}</a>...</p>
</body>
</html>""".format(target_url)
    
    dest_path = os.path.join(static_dir, legacy_locale, f)
    try:
      os.makedirs(os.path.dirname(dest_path))
    except OSError:
      pass
    with open(dest_path, 'w') as outfile:
      outfile.write(html)

print('Done creating hardcoded static redirects')
