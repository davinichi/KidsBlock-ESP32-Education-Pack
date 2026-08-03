# QUICK START

## KidsBlock ESP32 Education Pack Version 0.5 Preview

**約10分で使い始めるためのガイド**

## 1. 必要なもの

- Windows 10 / 11
- KidsBlock Desktop
- ESP32またはESP32-S3
- データ通信に対応したUSBケーブル
- Education Packの配布ZIP

## 2. インストール

1. KidsBlockを終了します。
2. ZIPファイルを展開します。
3. 展開先の`install.bat`を実行します。
4. 次の表示を確認します。

```text
Installation completed successfully.
Installed 10 extensions.
Version: 0.5-Preview
```

通常は管理者権限を必要としません。Windowsの設定によって実行を止められた場合は、ファイルのプロパティで「許可する」を選択してください。

## 3. 拡張機能の確認

KidsBlockを起動し、次の10拡張が表示されることを確認します。

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

拡張フォルダは`other`配下へインストールされますが、KidsBlock上の表示カテゴリーは各拡張の`tags`設定に従います。

## 4. 最初の動作確認

最初にKidsBlock標準ブロックでLED点滅を行い、ボード選択・コンパイル・書込みを確認してください。

その後は次の順序を推奨します。

1. ESP32 System InformationでMACアドレスなどを表示
2. Environmentで環境計算
3. WiFi SimpleでWi-Fi接続
4. HTTP Serverでブラウザ表示
5. ESP-NOWでESP32間通信
6. KBSDとData Processingで保存・解析

## 5. 問題が起きたとき

- KidsBlockを完全に終了してから`install.bat`を再実行する
- KidsBlockを再起動する
- 選択したESP32ボードを確認する
- シリアルモニターの通信速度を確認する
- 古い拡張フォルダが別カテゴリーに残っていないか確認する

詳細は`INSTALL_JA.md`を参照してください。
