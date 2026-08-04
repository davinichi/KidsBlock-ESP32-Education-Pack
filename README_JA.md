# KidsBlock ESP32 Education Pack

## Version 0.5 Preview

**ESP32プログラミング教育のための統合開発パッケージ**

## 概要

KidsBlock ESP32 Education Pack は、ESP32を利用したプログラミング教育を支援する統合開発パッケージです。

センサー、データ処理、保存、Wi-Fi、Bluetooth Low Energy（BLE）、ESP-NOW、クラウド通信など、IoT学習に必要な機能をKidsBlockのブロックプログラミングで扱えるように設計しています。

生成されるプログラムはArduino C++コードです。ブロックプログラミングからテキストプログラミングへ、段階的に学習を発展させることができます。

本パッケージは、小学校・中学校・高等学校・高等専門学校などの教育現場での利用を想定し、**分かりやすさ・安定性・実用性**を重視して開発しています。

## 主な特長

- ESP32向けの教育用統合開発パッケージ
- 少ないブロックでセンサー・通信・保存を利用可能
- Arduino C++コードを自動生成
- Wi-Fi、BLE、ESP-NOW、ThingSpeakに対応
- microSDへの保存と文字列処理に対応
- 教育現場での確実な運用を重視

## IoT教材の基本的な流れ

```text
センサー
   ↓
データ処理
   ↓
保存
   ↓
通信
   ↓
表示・活用
```

## 製作できる教材例

- 温湿度計
- WBGT警報器
- IoT環境モニター
- HTTPブラウザ監視・操作
- ThingSpeakクラウド通信
- BLE通信
- ESP-NOWによるESP32間通信
- microSDデータロガー
- NTP時計
- ESP32システム情報表示

## 収録ライブラリ（10種類）

### Communication

| ライブラリ | 概要 |
|---|---|
| WiFi Simple | 不要なTCPサーバーを起動しない、シンプルなWi-Fi接続 |
| HTTP Server | ブラウザでのデータ表示、ON・OFFボタン、ラジオボタン |
| ThingSpeak | ThingSpeakへのデータ送信・取得 |
| BLE UART 3 | BLEによる文字列通信 |
| ESP-NOW ESP32 | ESP32間のブロードキャスト・個別通信 |

### Other

| ライブラリ | 概要 |
|---|---|
| Environment | 湿球温度、簡易WBGT、警戒レベルなどの環境計算 |
| NTP Clock | NTPサーバーから日時を取得 |
| KBSD ESP32 | microSDカードの検査、読み書き、行単位読込 |
| Data Processing | CSV分解、文字列結合、部分文字列などのデータ処理 |
| ESP32 System Information | MACアドレス、チップ、メモリなどの情報取得 |

## 動作環境

- Windows 10 / Windows 11
- KidsBlock Desktop
- ESP32 Arduino Core 3.2.0
- ESP32 / ESP32-S3

## インストール

詳しい手順は [INSTALL_JA.md](INSTALL_JA.md) を参照してください。

すぐに試す場合は [QUICK_START_JA.md](QUICK_START_JA.md) を参照してください。

## ドキュメント

- `README_JA.md`：概要
- `QUICK_START_JA.md`：短時間で使い始める手順
- `INSTALL_JA.md`：インストールと更新
- `LIBRARIES_JA.md`：各ライブラリの概要
- `EXAMPLES_JA.md`：教材例
- `RELEASE_NOTES.md`：v0.5 Previewの更新内容
- `CHANGELOG.md`：変更履歴
- `CONTENTS.md`：収録ファイル
- `LICENSE_JA.md`：Preview版ライセンス

## ライセンス

本パッケージは、プログラミング教育の普及を目的として無償で公開しています。

学校・教育機関・個人学習・非営利活動で利用できます。教材への活用や改良も歓迎します。ただし、本パッケージそのものの販売や、作者の許可のない有償再配布は認めていません。

詳しくは [LICENSE_JA.md](LICENSE_JA.md) を参照してください。

第三者ライブラリには、それぞれのライセンスが適用されます。

## Preview版・ライセンス・免責事項

Version 0.5 Previewは、Version 1.0公開前の評価・実証用プレリリースです。

十分な確認を行っていますが、すべてのPC、KidsBlock、ESP32、周辺機器、ネットワーク環境で正常に動作することを保証するものではありません。

本パッケージのインストールまたは利用によって生じた、PC、KidsBlock、開発環境、プログラム、保存データ、接続機器などの不具合・損失・損害について、作者は責任を負いません。重要なデータは事前にバックアップし、利用者の責任で使用してください。

インストールを続行した場合、[LICENSE_JA.md](LICENSE_JA.md)の利用条件と免責事項に同意したものとみなされます。同意できない場合は、インストールおよび利用を中止してください。


## Version 0.5 Previewについて

Version 0.5 Previewは、Version 1.0公開前の最終プレリリースです。

Version 1.0までは新機能の追加を原則として行わず、次の内容を優先します。

- インストールの確実性
- 実機での動作確認
- 不具合修正
- ドキュメント整備
- 教育現場での実証

© 2026 Toshikazu SHIMADA
