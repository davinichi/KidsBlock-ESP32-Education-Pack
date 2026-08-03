# QUICK_START_JA

## KidsBlock ESP32 Education Pack Version 0.5 Preview

**10分でEducation Packを始めよう！**

------------------------------------------------------------------------

# 1. はじめに

このガイドでは、KidsBlock ESP32 Education Pack をインストールし、
最初のプログラムを作成するまでの流れを説明します。

所要時間：約10分

------------------------------------------------------------------------

# 2. 必要なもの

-   Windows 10 / 11
-   KidsBlock Desktop
-   ESP32開発ボード
-   USBケーブル

------------------------------------------------------------------------

# 3. Education Packのインストール

1.  Education Pack のZIPファイルを展開します。
2.  `install.bat` を右クリックし、「管理者として実行」を選択します。
3.  「Installation completed successfully.」と表示されれば完了です。
4.  KidsBlock を起動します。

------------------------------------------------------------------------

# 4. ライブラリを確認する

KidsBlock の拡張機能一覧を開きます。

次のライブラリが表示されることを確認してください。

### Communication

-   WiFi Simple
-   HTTP Server
-   ThingSpeak
-   BLE UART 3
-   ESP-NOW ESP32

### Other

-   Environment
-   NTP Clock
-   KBSD ESP32
-   Data Processing
-   ESP32 System Information

------------------------------------------------------------------------

# 5. 最初のプログラム

最初は LED の点滅やシリアルモニタへの表示など、簡単なプログラムで
コンパイルと書き込みができることを確認してください。

その後、次の順番で教材を試すことをおすすめします。

1.  Environment（温湿度・WBGT）
2.  NTP Clock（日時取得）
3.  HTTP Server（ブラウザ表示）
4.  ThingSpeak（クラウド通信）
5.  BLE UART 3
6.  ESP-NOW ESP32
7.  KBSD ESP32
8.  Data Processing
9.  ESP32 System Information

------------------------------------------------------------------------

# 6. サンプル教材

Education Pack では次のような教材を作成できます。

-   温湿度計
-   WBGT警報器
-   IoT環境モニター
-   HTTPブラウザ監視
-   ThingSpeakクラウド通信
-   BLE通信
-   ESP-NOW通信
-   microSDデータロガー
-   NTP時計

------------------------------------------------------------------------

# 7. トラブルシューティング

## ライブラリが表示されない

-   KidsBlock を再起動してください。
-   install.bat を再実行してください。

## コンパイルできない

-   ESP32 Arduino Core
    が正しくインストールされていることを確認してください。
-   使用するボードが ESP32 に設定されていることを確認してください。

## HTTP Server が表示されない

-   ESP32 が Wi-Fi に接続されていることを確認してください。
-   シリアルモニタに表示される URL へアクセスしてください。

------------------------------------------------------------------------

# 8. 次に読むドキュメント

-   README_JA.md
-   LIBRARIES_JA.md
-   EXAMPLES_JA.md
-   FAQ_JA.md

Education Pack
は、教育現場で安心して利用できることを最優先に開発しています。
