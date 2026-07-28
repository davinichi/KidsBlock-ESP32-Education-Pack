/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addMsg (Blockly) {
  Object.assign(Blockly.ScratchMsgs.locales.en, {
    WIFISIMPLE_CATEGORY: 'Wi-Fi Simple',
    WIFISIMPLE_CONNECT: 'connect to Wi-Fi SSID %1 password %2',
    WIFISIMPLE_WAIT: 'wait until Wi-Fi is connected',
    WIFISIMPLE_DISCONNECT: 'disconnect Wi-Fi',
    WIFISIMPLE_IS_CONNECTED: 'Wi-Fi is connected',
    WIFISIMPLE_IP: 'IP address',
    WIFISIMPLE_SSID: 'connected SSID',
    WIFISIMPLE_RSSI: 'Wi-Fi signal strength'
  });

  Object.assign(Blockly.ScratchMsgs.locales.ja, {
    WIFISIMPLE_CATEGORY: 'Wi-Fi接続',
    WIFISIMPLE_CONNECT: 'Wi-Fiに接続 SSID %1 パスワード %2',
    WIFISIMPLE_WAIT: 'Wi-Fiに接続できるまで待つ',
    WIFISIMPLE_DISCONNECT: 'Wi-Fiを切断する',
    WIFISIMPLE_IS_CONNECTED: 'Wi-Fiに接続している',
    WIFISIMPLE_IP: 'IPアドレス',
    WIFISIMPLE_SSID: '接続中のSSID',
    WIFISIMPLE_RSSI: 'Wi-Fi電波強度'
  });

  Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], {
    WIFISIMPLE_CATEGORY: 'Wi-Fi连接',
    WIFISIMPLE_CONNECT: '连接Wi-Fi SSID %1 密码 %2',
    WIFISIMPLE_WAIT: '等待Wi-Fi连接',
    WIFISIMPLE_DISCONNECT: '断开Wi-Fi',
    WIFISIMPLE_IS_CONNECTED: 'Wi-Fi已连接',
    WIFISIMPLE_IP: 'IP地址',
    WIFISIMPLE_SSID: '已连接SSID',
    WIFISIMPLE_RSSI: 'Wi-Fi信号强度'
  });

  return Blockly;
}

exports = addMsg;
