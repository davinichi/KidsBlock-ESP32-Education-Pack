# 教材・サンプル例

## KidsBlock ESP32 Education Pack Version 0.6 Preview

## レベル1：基本操作

### LED点滅

標準ブロックでGPIO出力、待機、繰返しを確認します。

### ESP32システム情報

ESP32 System Informationの値ブロックを標準のシリアル表示ブロックへ接続し、MACアドレスやメモリを確認します。

## レベル2：センサーと計算

### 温湿度計

温湿度センサーから値を取得し、シリアルモニターやLCDへ表示します。

### WBGT警報器

Environmentで簡易WBGTを計算し、LEDやブザーで警報します。

## レベル3：時刻・保存・データ処理

### NTP時計

WiFi SimpleとNTP Clockを組み合わせ、日時を表示します。

### microSDデータロガー

KBSD ESP32でセンサーデータを保存します。Data ProcessingでCSV文字列を作成・分解できます。

## レベル4：通信

### HTTP環境モニター

WiFi SimpleとHTTP Serverを使い、温度・湿度・WBGTをブラウザへ表示します。

### ブラウザからLEDを操作

HTTP ServerのON・OFFボタンを条件に、標準GPIOブロックでLEDを制御します。

### サーボ角度の選択

HTTP Serverのラジオボタンを使い、最大8種類の角度や動作モードを選択します。

### ThingSpeakクラウド記録

センサーデータをThingSpeakへ送信し、グラフで確認します。

### BLE通信

BLE UART 3でセンサーデータや文字列を送受信します。

### ESP-NOW環境データ通信

送信側で温度・湿度・WBGTを文字列として送信し、受信側でCSV分解してLCDへ表示します。

送信先MACアドレスを空欄にすると、ブロードキャスト通信になります。

## レベル5：総合教材

### IoT環境モニター

次の機能を組み合わせます。

- Environment：環境計算
- NTP Clock：時刻
- KBSD ESP32：保存
- HTTP Server：ブラウザ表示・操作
- ThingSpeak：クラウド記録
- ESP-NOW：複数端末間通信
- Data Processing：文字列・CSV処理
