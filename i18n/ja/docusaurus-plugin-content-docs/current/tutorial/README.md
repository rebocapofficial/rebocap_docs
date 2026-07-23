---
sidebar_position: 5
title: "初心者ガイドとクイックスタート"
---

# 初心者ガイドとクイックスタート

Rebocapへようこそ！初めてRebocapトラッカーをお受け取りいただいた場合は、お持ちの製品セットに合わせた一括チュートリアルをご覧ください。

---

## 🚀 1. セット別クイックスタート

お持ちの機器セットに合わせて該当するチュートリアルを選択してください。開封チェック、ストラップの装着、ソフト・ファームウェアの更新、校正、SteamVRへの接続までの全工程を解説しています：

<div style="display: flex; gap: 16px; flex-wrap: wrap; margin: 20px 0;">
  <a href="/ja/docs/rebocap-tutorials/6-set-unboxing" style="flex: 1; min-width: 260px; padding: 16px 20px; border: 1px solid var(--ifm-color-primary-light); border-radius: 8px; text-decoration: none; background-color: var(--ifm-card-background-color, #f8f9fa);">
    <h3 style="margin: 0 0 8px 0; color: var(--ifm-color-primary);">📦 6点セット 開封から使用まで</h3>
    <p style="margin: 0; font-size: 0.9em; color: var(--ifm-font-color-base);">内容：同梱物チェック、ストラップの装着、ソフト・ファームウェア、ジャイロ・磁場校正、SteamVR接続など。</p>
  </a>

  <a href="/ja/docs/rebocap-tutorials/15-set-unboxing" style="flex: 1; min-width: 260px; padding: 16px 20px; border: 1px solid var(--ifm-color-primary-light); border-radius: 8px; text-decoration: none; background-color: var(--ifm-card-background-color, #f8f9fa);">
    <h3 style="margin: 0 0 8px 0; color: var(--ifm-color-primary);">📦 15点セット 開封から使用まで</h3>
    <p style="margin: 0; font-size: 0.9em; color: var(--ifm-font-color-base);">内容：クイックリリース・幅広ストラップの装着、全身の装着部位、ソフト・ファームウェア、校正図鑑、高度な設定。</p>
  </a>
</div>

---

## ⚠️ 2. 重要注意事項（磁場校正）

- 磁場校正（磁気校正）は空間トラッキングの精度を確保するための非常に重要なステップです。**初回充電完了後**や、**使用する部屋の環境を変更した際**に速やかに実施することをお勧めします。
- 詳細な校正手順と注意事項については：👉 **[磁場環境 QA / 磁場校正ガイド](../QA/magnet)** をご覧ください。

:::danger 磁場校正の注意事項
- 磁場校正は必ず習得してください。注意事項に従わずに操作した場合、校正精度に誤差が生じる可能性があります。
- 磁場校正はいつでも何度でも再校正可能です。姿勢のズレ（ドリフト）が発生した場合は、まず再校正をお試しください。
:::

---

## 🎮 3. 外部ソフトおよびゲームとの接続

基本校正が完了したら、以下のソフトやゲームにモーションデータを送信できます：

- **SteamVR / VRChat**：新しく作成された 👉 **[SteamVR 操作ガイド](../rebocap-tutorials/steamvr_guide)**（SteamVR境界設定、ノードの表示・非表示、接続トラブルシューティングを含む）をご覧ください。
- **3Dアニメーション・サードパーティプラグイン**：Blender、Unity、UE、Vtuberソフトとの連携については 👉 **[ダイレクトプラグインとアプリ連携](../plugins/plugins)** を参照してください。

---

## 📺 4. 動画チュートリアルとコミュニティサポート

動画チュートリアルは補助的な学習オプションです。詳細なトラブルシューティングや注意点についてはテキスト版ドキュメントをご確認ください。

:::info 初回使用動画チュートリアル
以下はコミュニティメンバーと協力して作成した初回使用チュートリアル動画です。音声をオンにして一度最後までご視聴の上、操作を開始することをお勧めします：

[初回使用チュートリアル動画 (Bilibili)](https://www.bilibili.com/video/BV1vb66Y2EeD)
<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=113758953276032&bvid=BV1vb66Y2EeD&cid=27665304028&p=1&autoplay=0&muted=0&danmaku=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 100%; height: 400px; margin-top: 10px;"></iframe>
:::

:::danger トラブルシューティングとパフォーマンス向上のヒント
より良好なトラッキング効果を得るため、また疑問点がある場合は、テキスト版の全詳細を必ずご確認ください：
- 足元トラッカーの装着方向や締め具合は接地性・滑り止め効果に大きく影響します。
- 強い磁気干渉がある環境では、耐磁モードを有効にする必要があります。
- 足元トラッカーを装着しない場合は、AIエンジンによる姿勢自動予測のオン/オフを確認してください。
- その他の質問は [コミュニティ・サポート](../README#community) でお気軽にお尋ねください。
:::

---

### 📂 個別トピックのクイックレビュー
特定モジュールのみを個別に参照したい場合は、以下の単体ガイドをご利用ください：
- [ハードウェア・付属品の確認](hardware_check)
- [ストラップの使用と装着ガイド](instroction_for_straps)
- [ソフトウェアのダウンロードとインストール](software_install)
- [基本接続ガイド](connect_and_use)