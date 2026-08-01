/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
  const prepare = function () {
    Blockly.Arduino.includes_.include_httpserver = '#include <SensorServer31.h>';
    Blockly.Arduino.definitions_.define_httpserver = 'SensorServer31 kbHttpServer;';
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
  Blockly.Arduino.httpserver_register_gpio = function (block) {
    prepare();
    const control = block.getFieldValue('CONTROL') || '1';
    const label = Blockly.Arduino.valueToCode(block, 'LABEL', Blockly.Arduino.ORDER_NONE) || `"GPIO操作${control}"`;
    const highLabel = Blockly.Arduino.valueToCode(block, 'HIGH_LABEL', Blockly.Arduino.ORDER_NONE) || '"ON"';
    const lowLabel = Blockly.Arduino.valueToCode(block, 'LOW_LABEL', Blockly.Arduino.ORDER_NONE) || '"OFF"';
    const state = block.getFieldValue('STATE') || 'LOW';
    return `kbHttpServer.registerBrowserControl(${control}, ${label}, ${highLabel}, ${lowLabel}, ${state});\n`;
  };
  Blockly.Arduino.httpserver_set_gpio = function (block) {
    prepare();
    const control = block.getFieldValue('CONTROL') || '1';
    const state = block.getFieldValue('STATE') || 'LOW';
    return `kbHttpServer.setGpioState(${control}, ${state});\n`;
  };
  Blockly.Arduino.httpserver_gpio_state = function (block) {
    prepare();
    const control = block.getFieldValue('CONTROL') || '1';
    const state = block.getFieldValue('STATE') || 'HIGH';
    return [`(kbHttpServer.browserControlState(${control}) == ${state})`, Blockly.Arduino.ORDER_RELATIONAL];
  };
  Blockly.Arduino.httpserver_clear_gpio = function (block) {
    prepare();
    const control = block.getFieldValue('CONTROL') || '1';
    return `kbHttpServer.clearGpioControl(${control});\n`;
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
