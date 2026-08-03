# インストールガイド

## KidsBlock ESP32 Education Pack Version 0.5 Preview

## 1. インストール前の確認

- KidsBlockを終了してください。
- 配布ZIPを必ず展開してください。ZIP内から直接実行しないでください。
- 通常、管理者権限は不要です。
- インターネット接続は不要です。

## 2. インストール手順

1. `KidsBlock-ESP32-Education-Pack-v0.5-Preview.zip`を展開します。
2. 展開したフォルダを開きます。
3. `install.bat`を実行します。
4. パッケージ検証とコピーが完了するまで待ちます。

正常終了例：

```text
Installation completed successfully.
Installed 10 extensions.
Version: 0.5-Preview
```

インストール結果は`install_result.txt`へ保存されます。

## 3. インストール先

インストーラーは、KidsBlockの環境を検出して必要な場所へ拡張をコピーします。

主な保存先：

```text
%APPDATA%\KidsBlock\Data\external-resources\extensions\arduino\other
```

KidsBlock Desktop側が検出された場合は、必要に応じてDesktop側にも反映されます。

## 4. インストール後の確認

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

## 5. 更新

新しい版へ更新する場合も、KidsBlockを終了してから新しい版の`install.bat`を実行します。

同名拡張はバックアップ後に更新されます。

## 6. アンインストール

配布フォルダに`uninstall.bat`が含まれている場合は、それを実行してください。

バックアップから復元する場合は、アンインストーラーの表示内容を確認して操作してください。

## 7. トラブルシューティング

### 拡張が表示されない

- KidsBlockを再起動する
- `install.bat`を再実行する
- AppDataの拡張フォルダを確認する
- 古い同名拡張が`sensor`や`communication`に残っていないか確認する

### Package verification failed

配布物のファイルと`manifest.json`が一致していません。ZIPを再度ダウンロードし、新しいフォルダへ展開してください。展開後のファイルは編集しないでください。

### PowerShellの実行が拒否される

ファイルのプロパティで「許可する」を選択するか、必要なファイルに対して次を実行します。

```powershell
Unblock-File .\tools\install.ps1
```

### コンパイルできない

- 使用ボードを確認する
- ESP32 Arduino Core 3.2.0を確認する
- 必要な初期化ブロックが配置されているか確認する
- コンパイルログに表示される使用ライブラリの版と保存先を確認する

## 8. 授業前の推奨確認

- すべてのPCでインストールを完了する
- 10拡張が表示されることを確認する
- 使用するESP32ボードを統一する
- サンプルプログラムをコンパイルする
- USBケーブルがデータ通信対応であることを確認する
