ThingSpeak KidsBlock Ver.1.1
===========================

概要
----
WiFiSimpleでWi-Fi接続したESP32から、ThingSpeakのField1～Field4へ値を送信します。
外部のThingSpeak Arduinoライブラリは不要です。

導入
----
古い thingspeak フォルダーがある場合は削除してください。
ZIP内の thingspeak フォルダーをKidsBlockの拡張フォルダーへコピーし、KidsBlockを再起動します。

使用順序
--------
最初だけ：
1. Wi-Fiに接続
2. Wi-Fiに接続できるまで待つ
3. ThingSpeakを開始（Channel ID、Write API Key）

ずっと：
1. ThingSpeakへ送信
2. 20秒待つ

ブロック
--------
・ThingSpeakを開始
・Field1を送信
・Field1～Field2を送信
・Field1～Field3を送信
・Field1～Field4を送信
・最後の送信に成功した
・最後のエントリー番号

注意
----
Write API Keyを使用してください。Read API Keyでは送信できません。
「最後のエントリー番号」が1以上なら送信成功、0なら失敗です。
Channel IDは教材上の設定確認用として保持しますが、実際の書き込み先はWrite API Keyで決まります。

【Ver.1.1追加】
Field1～Field8までを一度に送信するブロックを追加しました。
ThingSpeakの最短送信間隔を守って使用してください。
