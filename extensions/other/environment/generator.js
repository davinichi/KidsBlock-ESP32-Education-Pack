/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
  const addLibrary = function () {
    Blockly.Arduino.includes_.include_environment = '#include <Environment.h>';
  };

  Blockly.Arduino.environment_wet_bulb = function (block) {
    addLibrary();
    const temp = Blockly.Arduino.valueToCode(block, 'TEMP', Blockly.Arduino.ORDER_NONE) || '0';
    const humidity = Blockly.Arduino.valueToCode(block, 'HUMIDITY', Blockly.Arduino.ORDER_NONE) || '0';
    return [`wetBulbTemperature(${temp}, ${humidity})`, Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.environment_simple_wbgt = function (block) {
    addLibrary();
    const temp = Blockly.Arduino.valueToCode(block, 'TEMP', Blockly.Arduino.ORDER_NONE) || '0';
    const humidity = Blockly.Arduino.valueToCode(block, 'HUMIDITY', Blockly.Arduino.ORDER_NONE) || '0';
    return [`calcSimpleWBGT(${temp}, ${humidity})`, Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.environment_absolute_humidity = function (block) {
    addLibrary();
    const temp = Blockly.Arduino.valueToCode(block, 'TEMP', Blockly.Arduino.ORDER_NONE) || '0';
    const humidity = Blockly.Arduino.valueToCode(block, 'HUMIDITY', Blockly.Arduino.ORDER_NONE) || '0';
    return [`calcAbsoluteHumidity(${temp}, ${humidity})`, Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.environment_wbgt_level = function (block) {
    addLibrary();
    const wbgt = Blockly.Arduino.valueToCode(block, 'WBGT', Blockly.Arduino.ORDER_NONE) || '0';
    return [`wbgtLevel(${wbgt})`, Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.environment_wbgt_level_text = function (block) {
    addLibrary();
    const wbgt = Blockly.Arduino.valueToCode(block, 'WBGT', Blockly.Arduino.ORDER_NONE) || '0';
    return [`wbgtLevelText(${wbgt})`, Blockly.Arduino.ORDER_ATOMIC];
  };

  return Blockly;
}

exports = addGenerator;
