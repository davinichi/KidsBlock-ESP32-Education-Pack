/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
  const addLibrary = function () {
    Blockly.Arduino.includes_.include_environment = '#include <Environment.h>';
  };

  const addLcdSymbolHelpers = function () {
    Blockly.Arduino.includes_.include_environment_lcd1602_symbols = '#include <LiquidCrystal_I2C.h>';

    // Use CGRAM 5, 6 and 7 to reduce the chance of colliding with user characters.
    Blockly.Arduino.definitions_.environment_lcd1602_symbol_data = `uint8_t environmentCharDegC[8] = {
  0b01000,
  0b10100,
  0b01000,
  0b00011,
  0b00100,
  0b00100,
  0b00100,
  0b00011
};
uint8_t environmentCharGmLeft[8] = {
  0b01110,
  0b10000,
  0b10110,
  0b10010,
  0b01110,
  0b00010,
  0b01100,
  0b00001
};
uint8_t environmentCharGmRight[8] = {
  0b10000,
  0b01011,
  0b00101,
  0b10111,
  0b11101,
  0b10111,
  0b10101,
  0b10111
};`;

    // Register custom characters once during setup. The standard KidsBlock
    // LCD1602 block owns lcd.begin(), lcd.backlight(), I2C address and cursor.
    Blockly.Arduino.setups_.environment_lcd1602_symbols = `lcd.createChar(5, environmentCharDegC);
lcd.createChar(6, environmentCharGmLeft);
lcd.createChar(7, environmentCharGmRight);`;
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

  Blockly.Arduino.environment_lcd1602_symbol_degree_c = function () {
    addLcdSymbolHelpers();
    return ['String((char)5)', Blockly.Arduino.ORDER_FUNCTION_CALL];
  };

  Blockly.Arduino.environment_lcd1602_symbol_gm3 = function () {
    addLcdSymbolHelpers();
    return ['String((char)6) + String((char)7)', Blockly.Arduino.ORDER_ADDITIVE];
  };

  return Blockly;
}

exports = addGenerator;
