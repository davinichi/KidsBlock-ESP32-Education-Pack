/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
  const addLibrary = function () {
    Blockly.Arduino.includes_.include_environment = '#include <Environment.h>';
  };

  const addLcd1602 = function (address) {
    const suffix = address === '0x3F' ? '3f' : '27';
    const lcdName = `environmentLcd${suffix}`;

    Blockly.Arduino.includes_.include_environment_lcd1602 = '#include <LiquidCrystal_I2C.h>';
    Blockly.Arduino.definitions_[`environment_lcd1602_${suffix}`] = `LiquidCrystal_I2C ${lcdName}(${address}, 16, 2);`;

    // CGRAM slot 0: degree + C (℃)
    Blockly.Arduino.definitions_.environment_lcd1602_char_deg_c = `uint8_t environmentCharDegC[8] = {\n  0b01000,\n  0b10100,\n  0b01000,\n  0b00011,\n  0b00100,\n  0b00100,\n  0b00100,\n  0b00011\n};`;

    // CGRAM slots 1 and 2: compact two-cell g/m^3 icon.
    // Left cell emphasizes "g" and starts the slash; right cell completes
    // the slash and combines "m" with a small superscript 3.
    Blockly.Arduino.definitions_.environment_lcd1602_char_gm_left = `uint8_t environmentCharGmLeft[8] = {\n  0b01110,\n  0b10000,\n  0b10110,\n  0b10010,\n  0b01110,\n  0b00010,\n  0b01100,\n  0b00001\n};`;
    Blockly.Arduino.definitions_.environment_lcd1602_char_gm_right = `uint8_t environmentCharGmRight[8] = {\n  0b10000,\n  0b01011,\n  0b00101,\n  0b10111,\n  0b11101,\n  0b10111,\n  0b10101,\n  0b10111\n};`;

    Blockly.Arduino.setups_[`environment_lcd1602_setup_${suffix}`] = `${lcdName}.begin();\n${lcdName}.backlight();\n${lcdName}.createChar(0, environmentCharDegC);\n${lcdName}.createChar(1, environmentCharGmLeft);\n${lcdName}.createChar(2, environmentCharGmRight);`;

    return lcdName;
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

  Blockly.Arduino.environment_lcd1602_temperature = function (block) {
    const value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE) || '0';
    const decimals = block.getFieldValue('DECIMALS') || '1';
    const row = block.getFieldValue('ROW') || '0';
    const col = Blockly.Arduino.valueToCode(block, 'COL', Blockly.Arduino.ORDER_NONE) || '0';
    const address = block.getFieldValue('ADDRESS') || '0x27';
    const lcdName = addLcd1602(address);
    return `${lcdName}.setCursor(${col}, ${row});\n${lcdName}.print((float)(${value}), ${decimals});\n${lcdName}.write((uint8_t)0);\n`;
  };

  Blockly.Arduino.environment_lcd1602_absolute_humidity = function (block) {
    const value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_NONE) || '0';
    const decimals = block.getFieldValue('DECIMALS') || '1';
    const row = block.getFieldValue('ROW') || '0';
    const col = Blockly.Arduino.valueToCode(block, 'COL', Blockly.Arduino.ORDER_NONE) || '0';
    const address = block.getFieldValue('ADDRESS') || '0x27';
    const lcdName = addLcd1602(address);
    return `${lcdName}.setCursor(${col}, ${row});\n${lcdName}.print((float)(${value}), ${decimals});\n${lcdName}.write((uint8_t)1);\n${lcdName}.write((uint8_t)2);\n`;
  };

  return Blockly;
}

exports = addGenerator;
