# KidsBlock ESP32 Education Pack Ver.2.1.1（正式版）

## 収録機能

- SimpleWiFi（内部フォルダ名：`wifisimple`）
- NTPClock
- ThingSpeak（最大8フィールド）
- HTTP Server（最大8項目）
- Environment（湿球温度・WBGT・警戒レベル）

## インストール方法

1. KidsBlockを完全に終了します。
2. ZIPを任意のフォルダへ展開します。ZIPの中から直接実行しないでください。
3. `install.bat`をダブルクリックします。
4. 権限エラーが表示された場合だけ、`install.bat`を右クリックして「管理者として実行」します。
5. `Installation completed successfully.` が表示されたらKidsBlockを起動します。

既定では、次の両方へインストールします。

- `C:\KidsBlock Desktop\resources\external-resources\extensions\arduino`
- `%APPDATA%\KidsBlock\Data\external-resources\extensions\arduino`

KidsBlock本体が別の場所にある場合は、代表的な場所から自動検出します。検出できない場合、AppData側だけへ導入し、その内容をログに記録します。

## 正式版の安全機能

- 配布ファイルのSHA-256検査
- 既存フォルダの日時付きバックアップ
- 同じ内容のファイルは再コピーせず `Skipped` と記録
- インストール先ごとの完了検査
- インストール記録 `install_state.json` の保存
- ログ `install_result.txt` の保存
- アンインストール時に、直前のインストールで置き換えた内容だけを復元

バックアップと状態記録は次に保存されます。

`%APPDATA%\KidsBlock\EducationPack`

## アンインストール

KidsBlockを終了してから `uninstall.bat` を実行します。今回のインストールで置き換えた拡張はバックアップから復元し、新規追加した拡張だけを削除します。

## ログ

- インストール：`install_result.txt`
- アンインストール：`uninstall_result.txt`

エラーが発生した場合は、画面の内容とログファイルを確認してください。


## Ver.2.1.1 fix

- Fixed a PowerShell parser error in the installation log message.
