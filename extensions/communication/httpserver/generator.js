/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
  const prepare = function () {
    Blockly.Arduino.includes_.include_httpserver = '#include <SensorServer.h>';
    Blockly.Arduino.definitions_.define_httpserver = 'SensorServer kbHttpServer;';
  };

  Blockly.Arduino.httpserver_begin = function (block) {
    prepare();
    const title = Blockly.Arduino.valueToCode(block, 'TITLE', Blockly.Arduino.ORDER_NONE) || '"ESP32 HTTP Server"';
    return `kbHttpServer.begin(${title});\n`;
  };

  Blockly.Arduino.httpserver_device_name = function (block) {
    prepare();
    const name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_NONE) || '"ESP32-01"';
    return `kbHttpServer.setDeviceName(${name});\n`;
  };

  Blockly.Arduino.httpserver_interval = function (block) {
    prepare();
    const ms = Blockly.Arduino.valueToCode(block, 'MS', Blockly.Arduino.ORDER_NONE) || '3000';
    return `kbHttpServer.setUpdateInterval(${ms});\n`;
  };

  Blockly.Arduino.httpserver_register_item = function (block) {
    prepare();
    const item = block.getFieldValue('ITEM') || '1';
    const label = Blockly.Arduino.valueToCode(block, 'LABEL', Blockly.Arduino.ORDER_NONE) || `"項目${item}"`;
    const unit = Blockly.Arduino.valueToCode(block, 'UNIT', Blockly.Arduino.ORDER_NONE) || '""';
    return `kbHttpServer.registerItem(${item}, ${label}, ${unit});\n`;
  };

  Blockly.Arduino.httpserver_update_item = function (block) {
    prepare();
    const item = block.getFieldValue('ITEM') || '1';
    const value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE) || '0';
    return `kbHttpServer.updateItem(${item}, String(${value}));\n`;
  };

  Blockly.Arduino.httpserver_clear_item = function (block) {
    prepare();
    const item = block.getFieldValue('ITEM') || '1';
    return `kbHttpServer.clearItem(${item});\n`;
  };

  Blockly.Arduino.httpserver_handle = function () {
    prepare();
    return 'kbHttpServer.handleClient();\n';
  };

  Blockly.Arduino.httpserver_url = function () {
    prepare();
    return ['kbHttpServer.url()', Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.httpserver_is_running = function () {
    prepare();
    return ['kbHttpServer.isRunning()', Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.httpserver_set_values = function (block) {
    prepare();
    const temp = Blockly.Arduino.valueToCode(block, 'TEMP', Blockly.Arduino.ORDER_NONE) || '0';
    const humi = Blockly.Arduino.valueToCode(block, 'HUMI', Blockly.Arduino.ORDER_NONE) || '0';
    return `kbHttpServer.setValues(${temp}, ${humi});\n`;
  };

  Blockly.Arduino.httpserver_set_values_wbgt = function (block) {
    prepare();
    const temp = Blockly.Arduino.valueToCode(block, 'TEMP', Blockly.Arduino.ORDER_NONE) || '0';
    const humi = Blockly.Arduino.valueToCode(block, 'HUMI', Blockly.Arduino.ORDER_NONE) || '0';
    const wbgt = Blockly.Arduino.valueToCode(block, 'WBGT', Blockly.Arduino.ORDER_NONE) || '0';
    return `kbHttpServer.setValues(${temp}, ${humi}, ${wbgt});\n`;
  };

  return Blockly;
}

exports = addGenerator;
