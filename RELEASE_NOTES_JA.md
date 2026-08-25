# KidsBlock ESP32 Education Pack

# リリースノート

## Version 0.6 Preview

**公開日：2026-08-25**

## 概要

Version 0.6 Previewは、Version 1.0に向けて複数のテスターによる評価・実証を進めるためのPreview版です。収録拡張を10種類から12種類へ拡張し、環境計算とESP-NOWの実験機能を強化しました。

## 新規追加

### BME280
- I2C接続で温度・湿度・気圧を取得

### LCD1602 Symbols
- LCD1602用特殊記号をEnvironmentから分離
- 他の教材・ブロックでも再利用できる共通表示機能として独立

## Environment
- 温度・湿度から10種類の環境指数を選択して計算するブロックを追加
- 既存プロジェクトとの整合性のため、湿球温度と推定WBGTの個別ブロックを保持
- LCD1602記号機能はLCD1602 Symbolsへ分離

## ESP-NOW ESP32
- Normal / Long Rangeモード切替
- PHYレート設定
- 最後に受信したRSSIの取得
- Long RangeおよびPHYレート関連機能は、複数テスターによるPreview評価を継続

## 収録ライブラリ

### Communication
- WiFi Simple
- HTTP Server
- ThingSpeak
- BLE UART 3
- ESP-NOW ESP32

### Sensor
- BME280

### Display
- LCD1602 Symbols

### Other
- Environment
- NTP Clock
- KBSD ESP32
- Data Processing
- ESP32 System Information

合計 **12ライブラリ**

## Version 1.0に向けて

教育現場や実環境でのテスト、不具合修正、互換性、インストールの確実性、ドキュメント整備を継続します。ESP-NOWのLong RangeおよびPHYレートについても、複数の環境・テスターによる結果を集めて評価します。
