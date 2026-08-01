/* eslint-disable func-style */
function addMsg (Blockly) {
  const ja = {
    BLEUART3_CATEGORY: 'BLE UART 3',
    BLEUART3_BEGIN_PERIPHERAL: 'BLE送信側を開始 デバイス名 %1',
    BLEUART3_BEGIN_CENTRAL: 'BLE受信側を開始 端末名 %1',
    BLEUART3_SCAN: 'BLE機器を %1 秒検索 名前の先頭 %2',
    BLEUART3_DEVICE_COUNT: '検索したBLE機器数',
    BLEUART3_DEVICE_NAME: 'BLE機器 %1 番の名前',
    BLEUART3_DEVICE_ADDRESS: 'BLE機器 %1 番のアドレス',
    BLEUART3_DEVICE_RSSI: 'BLE機器 %1 番の電波強度',
    BLEUART3_CONNECT: 'BLE機器 %1 番に接続',
    BLEUART3_DISCONNECT: 'BLE接続を切断',
    BLEUART3_SEND_TEXT: 'BLEで文字を送信 %1',
    BLEUART3_CONNECTED: 'BLEが接続されている',
    BLEUART3_LAST_SEND: '最後のBLE送信に成功した',
    BLEUART3_RECEIVED: 'BLEデータを受信した',
    BLEUART3_RECEIVED_TEXT: 'BLE受信文字列',
    BLEUART3_FIELD: 'BLE受信項目（文字） %1',
    BLEUART3_FIELD_NUMBER: 'BLE受信項目（数値） %1',
    BLEUART3_CLEAR: 'BLE受信データを消去'
  };
  const en = {
    BLEUART3_CATEGORY: 'BLE UART 3',
    BLEUART3_BEGIN_PERIPHERAL: 'start BLE peripheral name %1',
    BLEUART3_BEGIN_CENTRAL: 'start BLE central local name %1',
    BLEUART3_SCAN: 'scan BLE for %1 seconds name prefix %2',
    BLEUART3_DEVICE_COUNT: 'number of found BLE devices',
    BLEUART3_DEVICE_NAME: 'name of BLE device %1',
    BLEUART3_DEVICE_ADDRESS: 'address of BLE device %1',
    BLEUART3_DEVICE_RSSI: 'RSSI of BLE device %1',
    BLEUART3_CONNECT: 'connect to BLE device %1',
    BLEUART3_DISCONNECT: 'disconnect BLE',
    BLEUART3_SEND_TEXT: 'send BLE text %1',
    BLEUART3_CONNECTED: 'BLE is connected',
    BLEUART3_LAST_SEND: 'last BLE send succeeded',
    BLEUART3_RECEIVED: 'BLE data received',
    BLEUART3_RECEIVED_TEXT: 'BLE received text',
    BLEUART3_FIELD: 'BLE received field as text %1',
    BLEUART3_FIELD_NUMBER: 'BLE received field as number %1',
    BLEUART3_CLEAR: 'clear BLE received data'
  };
  for (let n = 1; n <= 8; n++) {
    ja[`BLEUART3_SEND${n}`] = `BLEでCSV形式の${n}項目を送信 ` +
      Array.from({length: n}, (_, i) => `値${i + 1} %${i + 1}`).join(' ');
    en[`BLEUART3_SEND${n}`] = `send ${n} CSV values ` +
      Array.from({length: n}, (_, i) => `value${i + 1} %${i + 1}`).join(' ');
  }
  Object.assign(Blockly.ScratchMsgs.locales.ja, ja);
  Object.assign(Blockly.ScratchMsgs.locales.en, en);
  Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], en);
  return Blockly;
}
exports = addMsg;
