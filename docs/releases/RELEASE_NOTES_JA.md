# KidsBlock ESP32 Education Pack

# リリースノート

## Version 0.5 Preview

**公開日：2026-08-05**

---

# 概要

Version 0.5 Preview は、Version 1.0公開前の最終プレリリースです。

本バージョンでは新機能の追加よりも、

- 安定性
- 互換性
- インストール環境
- ドキュメント

の改善を重点的に行いました。

今後は教育現場での実証を通じて品質向上を図り、Version 1.0の公開を目指します。

## Preview版の利用条件

Version 0.5 Previewは、教育現場での評価・実証を目的としたプレリリースです。

インストール時にライセンスと免責事項が表示され、利用者が`Y`を入力して同意した場合にのみインストールを開始します。

本バージョンは、すべての環境での動作を保証するものではありません。重要なデータをバックアップし、利用者の責任で使用してください。詳細は`LICENSE_JA.md`を参照してください。


---

# 新規追加ライブラリ

## ESP-NOW ESP32

ESP32同士をWi-Fiルーターなしで直接通信できるESP-NOWライブラリを追加しました。

主な機能

- ブロードキャスト通信
- 個別通信
- 文字列送信
- 文字列受信
- 送信元MACアドレス取得
- 通信状態の取得

---

## ESP32 System Information

ESP32本体のシステム情報を取得するライブラリを追加しました。

取得できる情報

- チップモデル
- CPU情報
- MACアドレス
- フラッシュメモリ
- ヒープメモリ
- PSRAM情報
- SDK Version
- Arduino Core Version
- 稼働時間

---

# 機能改善

## HTTP Server

ブラウザからの操作機能を強化しました。

追加・改善内容

- 最大8項目の表示
- ON・OFFボタン
- ラジオボタン
- 自動非表示
- 通信状態表示
- 表示レイアウト改善
- ブラウザ互換性向上

---

## Data Processing

CSV処理ライブラリを

**Data Processing**

へ名称変更しました。

CSV処理に加え、

- 文字列結合
- 部分文字列取得
- 文字列長取得

など、データ処理機能を強化しました。

---

## インストーラー

インストール環境を全面的に改善しました。

改善内容

- SHA-256検証
- manifest管理
- 自動バックアップ
- PowerShell対応
- 更新処理改善

---

## リリースツール

リリース作成ツールを改善しました。

- ZIP生成
- manifest自動生成
- SHA-256生成
- 配布形式の統一

---

# ドキュメント

Version 0.5 Previewでは、ドキュメントを全面的に見直しました。

整備した主な文書

- README
- QUICK START
- INSTALL
- LIBRARIES
- EXAMPLES
- LICENSE
- CHANGELOG

---

# 収録ライブラリ

### Communication

- WiFi Simple
- HTTP Server
- ThingSpeak
- BLE UART 3
- ESP-NOW ESP32

### Other

- Environment
- NTP Clock
- KBSD ESP32
- Data Processing
- ESP32 System Information

合計 **10ライブラリ**

---

# Version 1.0に向けて

Version 0.5 Previewは、Version 1.0公開前の最終プレリリースです。

今後は新機能の追加を原則として行わず、

- 教育現場での実証
- 不具合修正
- 品質向上
- ドキュメント整備

を中心に進めます。

---

# ご協力のお願い

教育現場で利用された皆様からの

- ご意見
- ご要望
- 不具合報告

を歓迎します。

いただいたフィードバックをVersion 1.0へ反映し、より安心して利用できる教育向けESP32開発環境を目指します。