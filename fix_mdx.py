import io

file_path = 'i18n/zh-Hans/docusaurus-plugin-content-docs/current/rebocap-tutorials/steamvr_guide.mdx'
with io.open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '<div style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; align-items: center; margin: 15px 0;">',
    '<div style={{display: \'flex\', flexDirection: \'row\', gap: \'20px\', flexWrap: \'wrap\', alignItems: \'center\', margin: \'15px 0\'}}>'
)
content = content.replace(
    '<div style="flex: 1; min-width: 250px; text-align: center;">',
    '<div style={{flex: 1, minWidth: \'250px\', textAlign: \'center\'}}>'
)
content = content.replace(
    '<div style="flex: 1.5; min-width: 250px;">',
    '<div style={{flex: 1.5, minWidth: \'250px\'}}>'
)

with io.open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)