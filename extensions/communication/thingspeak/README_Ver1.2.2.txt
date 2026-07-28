KBThingSpeak Ver.1.2.2
======================

既存の送信ブロックとの互換性を維持し、ThingSpeakの最新値を取得する
数値レポーターブロックを追加した版です。

追加ブロック
------------
1. ThingSpeakの最新値 チャンネルID [ ] Field [ ] Read API Key [ ]
   - 数値レポーターブロック
   - 変数への代入、シリアル表示、計算式などに使用できます。
   - 公開チャンネルではRead API Keyを空欄にできます。

2. 最後のThingSpeak読み出しに成功した
3. 最後のThingSpeak読み出しHTTPコード
4. 最後のThingSpeak読み出しエラー

期待される生成コード例
----------------------
temp = kbThingSpeak.readLatestField(123456, 1, "READ_API_KEY");

注意
----
読み出し失敗時はNANを返します。
Wi-Fi接続後に使用してください。
