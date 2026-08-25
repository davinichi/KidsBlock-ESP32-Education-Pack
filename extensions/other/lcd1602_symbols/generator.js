/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
  const addSymbolData = function () {
    Blockly.Arduino.definitions_.lcd1602_symbols_data = `uint8_t lcd1602CharDegC[8] = {
  0b01000,
  0b10100,
  0b01000,
  0b00111,
  0b01000,
  0b01000,
  0b01000,
  0b00111
};
uint8_t lcd1602CharGmLeft[8] = {
  0b00000,
  0b01110,
  0b10000,
  0b10110,
  0b10010,
  0b01110,
  0b00010,
  0b00100
};
uint8_t lcd1602CharGmRight[8] = {
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

  Blockly.Arduino.lcd1602_symbols_register = function () {
    addSymbolData();
    return `lcd.createChar(5, lcd1602CharDegC);\nlcd.createChar(6, lcd1602CharGmLeft);\nlcd.createChar(7, lcd1602CharGmRight);\n`;
  };

  Blockly.Arduino.lcd1602_symbols_degree_c = function () {
    return ['String((char)5)', Blockly.Arduino.ORDER_FUNCTION_CALL];
  };

  Blockly.Arduino.lcd1602_symbols_gm3 = function () {
    return ['String((char)6) + String((char)7)', Blockly.Arduino.ORDER_ADDITIVE];
  };

  return Blockly;
}
exports = addGenerator;
