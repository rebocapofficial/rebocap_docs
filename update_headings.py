import io, os

ja_path = r'i18n\ja\docusaurus-plugin-content-docs\current\rebocap-tutorials\15-set-unboxing.mdx'
hant_path = r'i18n\zh-Hant\docusaurus-plugin-content-docs\current\rebocap-tutorials\15-set-unboxing.mdx'

with io.open(ja_path, 'r', encoding='utf-8') as f:
    ja_content = f.read()

ja_old_heading = u'## <span class="tutorial-main-heading" style="background: #becbe6;">6 - トラッキングシステムの確認</span>'
ja_new_heading = u'## <span class="tutorial-main-heading" style="background: #becbe6;">6 - トラッカーシステムの実行</span>'

ja_details = u'''

<!-- ==================== 折叠页 开始 ==================== -->
<details>
<summary>キャリブレーション完了後、プレビューで機能しない場合</summary>

   &emsp;&emsp;rebocapソフトウェアを再起動してください。<br />
   &emsp;&emsp;これは通常、レシーバーのファームウェアを更新した後にソフトウェアを再起動していないことが原因です。<br />
   &emsp;&emsp;一部のWindowsシステムでは、更新されたレシーバーが2番目のデバイスとして認識されることがあります。<br />



<!-- ==================== 折叠页 结束 ==================== -->




</details>
<!-- ==================== 折叠页 结束 ==================== -->'''

ja_content = ja_content.replace(ja_old_heading, ja_new_heading)

ja_insertion_point = u'  その後、アニメーション録画、バーチャルアイドル、VRゲームなどに使用できます。\n</div>\n</div>'
if ja_insertion_point in ja_content:
    ja_content = ja_content.replace(ja_insertion_point, ja_insertion_point + ja_details)
else:
    print('Failed to find ja insertion point')

with io.open(ja_path, 'w', encoding='utf-8') as f:
    f.write(ja_content)

with io.open(hant_path, 'r', encoding='utf-8') as f:
    hant_content = f.read()

hant_old_heading = u'## <span class="tutorial-main-heading" style="background: #becbe6;">6 - 檢查追蹤系統</span>'
hant_new_heading = u'## <span class="tutorial-main-heading" style="background: #becbe6;">6 - 運行追蹤器系統</span>'

hant_details = u'''

<!-- ==================== 折叠页 开始 ==================== -->
<details>
<summary>校準完成後預覽器中不會工作</summary>

   &emsp;&emsp;重開rebocap軟體。  <br />
   &emsp;&emsp;這通常是更新接收器韌體後沒有重開軟體導致的，  <br />
   &emsp;&emsp;有些Windows系統會把更新後的接收器認成第二個設備。 <br />



<!-- ==================== 折叠页 结束 ==================== -->




</details>
<!-- ==================== 折叠页 结束 ==================== -->'''

hant_content = hant_content.replace(hant_old_heading, hant_new_heading)

hant_insertion_point = u'  由此再去針對動畫錄製、虛擬偶像、VR遊戲使用。\n</div>\n</div>'
if hant_insertion_point in hant_content:
    hant_content = hant_content.replace(hant_insertion_point, hant_insertion_point + hant_details)
else:
    print('Failed to find hant insertion point')

with io.open(hant_path, 'w', encoding='utf-8') as f:
    f.write(hant_content)
