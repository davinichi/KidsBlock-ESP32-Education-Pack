ESP-NOW ESP32 Ver.1.1.0 Experimental LR

KidsBlock ESP32 Education Pack向けのESP-NOW文字列通信拡張です。

主な機能
- ESP-NOWの初期化
- 文字列送信
- 送信先MACアドレスが空欄の場合はブロードキャスト送信
- MACアドレスを入力した場合は個別送信
- 新しいデータの受信判定
- 受信文字列の取得
- 送信元MACアドレスの取得
- 最後の送信結果の確認

注意
- 初期版はESP-NOW単独利用を基本とします。
- 送受信するESP32は同じWi-Fiチャンネルで動作する必要があります。
- 文字列は最大240バイトです。
- 「新しいデータを受信した」ブロックは、確認すると受信フラグを解除します。
- ブロードキャスト送信は、個々の受信機への到達を保証しません。


実験機能: Long Range mode
- 「ESP-NOWを始める」ブロックで「通常 / Long Range」を選択できます。
- Long RangeではWIFI_PROTOCOL_LRを使用します。
- 比較実験では送信側・中継器・受信側を同じモードにしてください。
- Long RangeはEspressif独自方式です。通常Wi-Fi機器との互換用途では使用しません。
- この版は次期バージョン検討用の実験版で、v0.5への反映を意図していません。


実験機能: ESP-NOW PHYレート指定
- 「ESP-NOWのPHYレートを ... に設定する」ブロックを追加しました。
- 選択肢: 1 Mbps (Normal) / 500 kbps (LR) / 250 kbps (LR)
- 必ず「ESP-NOWを ... モードで始める」の後に置いてください。
- Normal比較: 送信側 Normal開始 -> PHY 1 Mbps、受信側 Normal開始
- LR 500k比較: 送信側 Long Range開始 -> PHY 500 kbps、受信側 Long Range開始
- LR 250k比較: 送信側 Long Range開始 -> PHY 250 kbps、受信側 Long Range開始
- PHYレートは主に送信側へ設定します。双方向通信なら両側へ設定してください。
- 現行ESP32-WROOM環境での実験用です。
