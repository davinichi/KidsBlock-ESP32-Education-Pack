/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addMsg (Blockly) {
  Object.assign(Blockly.ScratchMsgs.locales.en, {
    ESPNOW_CATEGORY: 'ESP-NOW',
    ESPNOW_BEGIN: 'start ESP-NOW in %1 mode',
    ESPNOW_MODE_NORMAL: 'normal',
    ESPNOW_MODE_LONG_RANGE: 'Long Range',
    ESPNOW_PRINT_PROTOCOL_INFO: 'print ESP-NOW Wi-Fi protocol diagnostic to Serial Monitor',
    ESPNOW_SEND_TEXT: 'send ESP-NOW text %1 to destination MAC %2 (blank = all)',
    ESPNOW_HAS_NEW_DATA: 'ESP-NOW received new data',
    ESPNOW_RECEIVED_TEXT: 'ESP-NOW received text',
    ESPNOW_SENDER_MAC: 'ESP-NOW sender MAC address',
    ESPNOW_LAST_RSSI: 'last ESP-NOW received RSSI (dBm)',
    ESPNOW_LAST_SEND_SUCCESS: 'last ESP-NOW send succeeded',
    ESPNOW_IS_READY: 'ESP-NOW is ready'
  });

  Object.assign(Blockly.ScratchMsgs.locales.ja, {
    ESPNOW_CATEGORY: 'ESP-NOW',
    ESPNOW_BEGIN: 'ESP-NOWを %1 モードで始める',
    ESPNOW_MODE_NORMAL: '通常',
    ESPNOW_MODE_LONG_RANGE: 'Long Range',
    ESPNOW_PRINT_PROTOCOL_INFO: 'ESP-NOWのWi-Fiモード診断をシリアルモニターに表示する',
    ESPNOW_SEND_TEXT: 'ESP-NOWで文字列 %1 を送信先MACアドレス %2 へ送る（空欄なら全員）',
    ESPNOW_HAS_NEW_DATA: 'ESP-NOWで新しいデータを受信した',
    ESPNOW_RECEIVED_TEXT: 'ESP-NOWで受信した文字列',
    ESPNOW_SENDER_MAC: 'ESP-NOWの送信元MACアドレス',
    ESPNOW_LAST_RSSI: 'ESP-NOWで最後に受信したRSSI (dBm)',
    ESPNOW_LAST_SEND_SUCCESS: 'ESP-NOWの最後の送信は成功した',
    ESPNOW_IS_READY: 'ESP-NOWを使用できる'
  });

  Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], {
    ESPNOW_CATEGORY: 'ESP-NOW',
    ESPNOW_BEGIN: '以 %1 模式启动ESP-NOW',
    ESPNOW_MODE_NORMAL: '普通',
    ESPNOW_MODE_LONG_RANGE: 'Long Range',
    ESPNOW_PRINT_PROTOCOL_INFO: '在串口监视器显示ESP-NOW Wi-Fi协议诊断',
    ESPNOW_SEND_TEXT: '使用ESP-NOW发送文本 %1 到目标MAC地址 %2（空白=全部）',
    ESPNOW_HAS_NEW_DATA: 'ESP-NOW收到新数据',
    ESPNOW_RECEIVED_TEXT: 'ESP-NOW收到的文本',
    ESPNOW_SENDER_MAC: 'ESP-NOW发送方MAC地址',
    ESPNOW_LAST_RSSI: 'ESP-NOW最后接收的RSSI (dBm)',
    ESPNOW_LAST_SEND_SUCCESS: '上次ESP-NOW发送成功',
    ESPNOW_IS_READY: 'ESP-NOW可用'
  });

  return Blockly;
}

exports = addMsg;
