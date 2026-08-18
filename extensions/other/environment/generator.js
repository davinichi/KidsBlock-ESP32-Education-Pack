/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
  const addLibrary = function () {
    Blockly.Arduino.includes_.include_environment = '#include <Environment.h>';
  };

  const addLcdSymbolData = function () {
    // The standard KidsBlock LCD1602 extension owns the lcd object,
    // I2C address, lcd.begin(), backlight() and cursor positioning.
    // Environment only defines CGRAM bitmap data.
    Blockly.Arduino.definitions_.environment_lcd1602_symbol_data = `uint8_t environmentCharDegC[8] = {
  0b01000,
  0b10100,
  0b01000,
  0b00111,
  0b01000,
  0b01000,
  0b01000,
  0b00111
};
uint8_t environmentCharGmLeft[8] = {
  0b00000,
  0b01110,
  0b10000,
  0b10110,
  0b10010,
  0b01110,
  0b00010,
  0b00100
};
uint8_t environmentCharGmRight[8] = {
  0b01011,
  0b10101,
  0b10111,
  0b10101,
  0b10101,
  0b10101,
  0b00000,
  0b00000
};`;
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

  // Command block: the user places this once AFTER the standard LCD1602
  // initialization block. createChar() must run after lcd.begin().
  Blockly.Arduino.environment_lcd1602_register_symbols = function () {
    addLcdSymbolData();
    return `lcd.createChar(5, environmentCharDegC);\nlcd.createChar(6, environmentCharGmLeft);\nlcd.createChar(7, environmentCharGmRight);\n`;
  };

  // Data blocks only return character codes. They intentionally do NOT
  // initialize the LCD or register CGRAM data.
  Blockly.Arduino.environment_lcd1602_symbol_degree_c = function () {
    return ['String((char)5)', Blockly.Arduino.ORDER_FUNCTION_CALL];
  };

  Blockly.Arduino.environment_lcd1602_symbol_gm3 = function () {
    return ['String((char)6) + String((char)7)', Blockly.Arduino.ORDER_ADDITIVE];
  };

  return Blockly;
}

exports = addGenerator;
