# KidsBlock ESP32 Education Pack

KidsBlock ESP32 Education Pack は、小学校から高校までのプログラミング教育やものづくり教室で活用できるIoT教材を提供することを目的としたオープンソースプロジェクトです。

Wi-Fi通信、NTP時計、センサー、クラウド連携、Webブラウザ表示など、IoT学習に必要な機能をKidsBlock上で簡単に利用できる拡張ライブラリと教材を提供します。

教育現場で「作って終わり」ではなく、「測る・つなぐ・見える化する・活用する」までを体験できる教材づくりを目指しています。

---

## 主な機能

### SimpleWiFi

ESP32をWi-Fiへ接続するための機能です。

- Wi-Fiへの接続
- 接続状態の確認
- IPアドレスの取得

### NTPClock

インターネット上のNTPサーバーから日時を取得するための機能です。

- 日付の取得
- 時刻の取得
- 曜日の取得
- 日本標準時（JST）への対応

### Environment

温度と湿度を使った環境学習のための機能です。

- 温度
- 湿度
- 湿球温度
- WBGT（暑さ指数）
- WBGT警戒レベル

### HTTP Server

ESP32で取得したセンサー値などを、Webブラウザに表示するための機能です。

- 最大8項目のデータ表示
- Webブラウザからの確認
- センサー値のリアルタイム表示

### ThingSpeak

ESP32で取得したデータをThingSpeakへ送信・取得するための機能です。

- 最大8フィールドのデータ送信
- 保存済みデータの取得
- クラウドへのデータ蓄積
- グラフによるデータの可視化

---

## 対応環境

### 開発環境

KidsBlockを使用してプログラムを作成します。

- Windows 10 / 11
- macOS

### 表示・利用環境

HTTP ServerやThingSpeakを利用したデータ表示は、次のような端末のWebブラウザから確認できます。

- Windows PC
- Chromebook
- iPad
- Androidタブレット
- スマートフォン

---

## インストール方法

### Windows

1. このリポジトリをダウンロードします。
2. KidsBlockを終了します。
3. `install.bat` を実行します。
4. インストール完了後、KidsBlockを起動します。
5. 追加された拡張ブロックを確認します。

アンインストールする場合は、KidsBlockを終了してから `uninstall.bat` を実行してください。

> **注意**
>
> 現在はPreview版です。インストール前に、KidsBlockの関連フォルダや作成済みプロジェクトをバックアップすることを推奨します。

---

## 収録内容

```text
KidsBlock-ESP32-Education-Pack
├─ README.md
├─ CONTENTS.txt
├─ VERSION.txt
├─ manifest.json
├─ install.bat
├─ uninstall.bat
├─ extensions
│  ├─ communication
│  │  ├─ httpserver
│  │  ├─ ntpclock
│  │  ├─ thingspeak
│  │  └─ wifisimple
│  └─ sensor
│     └─ environment
└─ tools
   ├─ install.ps1
   └─ uninstall.ps1
```

---

## 学習できること

このEducation Packでは、次のようなIoTの基本的な流れを体験できます。

```text
センサーで測る
      ↓
ESP32で考える
      ↓
Wi-Fiでつなぐ
      ↓
ブラウザやクラウドで見る
      ↓
データを活用する
```

教材例として、次のような活動を想定しています。

- Wi-Fi接続の体験
- インターネット時計の製作
- 温湿度計の製作
- WBGT警報器の製作
- センサー値のWebブラウザ表示
- ThingSpeakを使ったクラウド記録
- 記録したデータのグラフ化と比較

---

## 開発状況

現在は **Preview Version** として公開しています。

教育現場やものづくり教室での実践を通して、次の点を確認しながら改善を進めます。

- インストールの分かりやすさ
- ブロックの使いやすさ
- サンプル教材の分かりやすさ
- 長時間動作の安定性
- WindowsおよびmacOSでの動作
- 授業や教室での活用方法

---

## 今後の予定

今後、次のような機能や教材の追加を検討しています。

- BLE通信
- GPS
- Firebase
- Google Sheets
- Ambient
- MQTT
- microSDカード
- BME280
- AHT20
- 授業用ワークシート
- 指導者向け資料
- サンプルプロジェクト

---

## ご意見・ご提案

このプロジェクトは、教育現場やものづくり教室での活用を通して改善していくことを目指しています。

不具合、改善案、教材としてのご意見などがありましたら、GitHubのIssuesからお知らせください。

---

## KidsBlockについて

KidsBlockは、香港のKEYESTUDIOが開発しているブロックプログラミング環境です。

本プロジェクトは、KidsBlockでESP32を使ったIoT学習を行いやすくするための拡張機能と教材を提供するものです。

---

## ライセンス

ライセンスは現在検討中です。

正式なライセンスが決定するまでは、ソースコードや教材の再配布・改変・商用利用について、事前にプロジェクト管理者へお問い合わせください。
