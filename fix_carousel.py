import io
import re

file_path = 'i18n/zh-Hans/docusaurus-plugin-content-docs/current/rebocap-tutorials/steamvr_guide.md'
with io.open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace any multi-line or single-line MediaCarousel with a prettier-ignored version
pattern = re.compile(r'<MediaCarousel\s+items=\s*\{[^}]+\}\s*/>', re.DOTALL)
replacement = u'''<!-- prettier-ignore -->
<MediaCarousel items={['/img/steamvr_guide/steamvr_windows.jpg', '/img/steamvr_guide/steamvr_windows.jpg', '/img/steamvr_guide/test_video.mp4']} />'''

content = pattern.sub(replacement, content)

with io.open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)