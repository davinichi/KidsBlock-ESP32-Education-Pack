/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
  const prepare = function () {
    Blockly.Arduino.includes_.include_wifisimple = '#include <WiFi.h>';
  };

  Blockly.Arduino.wifisimple_connect = function (block) {
    prepare();
    const ssid = Blockly.Arduino.valueToCode(block, 'SSID', Blockly.Arduino.ORDER_NONE) || '""';
    const password = Blockly.Arduino.valueToCode(block, 'PASSWORD', Blockly.Arduino.ORDER_NONE) || '""';
    return `WiFi.mode(WIFI_STA);\nWiFi.begin(${ssid}, ${password});\n`;
  };

  Blockly.Arduino.wifisimple_wait = function () {
    prepare();
    return 'while (WiFi.status() != WL_CONNECTED) {\n  delay(500);\n}\n';
  };

  Blockly.Arduino.wifisimple_disconnect = function () {
    prepare();
    return 'WiFi.disconnect();\n';
  };

  Blockly.Arduino.wifisimple_is_connected = function () {
    prepare();
    return ['(WiFi.status() == WL_CONNECTED)', Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.wifisimple_ip = function () {
    prepare();
    return ['WiFi.localIP().toString()', Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.wifisimple_ssid = function () {
    prepare();
    return ['WiFi.SSID()', Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.wifisimple_rssi = function () {
    prepare();
    return ['WiFi.RSSI()', Blockly.Arduino.ORDER_ATOMIC];
  };

  return Blockly;
}

exports = addGenerator;
