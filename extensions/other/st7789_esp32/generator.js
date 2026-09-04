/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
  const prepare = function () {
    Blockly.Arduino.includes_.include_kbst7789 = '#include <KBST7789.h>';
    Blockly.Arduino.definitions_.define_kbst7789 = 'KBST7789 kbTft;';
  };
  const val = (block, name, fallback) => Blockly.Arduino.valueToCode(block, name, Blockly.Arduino.ORDER_NONE) || fallback;

  Blockly.Arduino.st7789_begin = function () {
    prepare();
    return 'kbTft.begin();\n';
  };
  Blockly.Arduino.st7789_fill_screen = function (block) {
    prepare();
    return `kbTft.fillScreen(${block.getFieldValue('COLOR')});\n`;
  };
  Blockly.Arduino.st7789_rotation = function (block) {
    prepare();
    return `kbTft.setRotation(${block.getFieldValue('ROTATION')});\n`;
  };
  Blockly.Arduino.st7789_backlight = function (block) {
    prepare();
    return `kbTft.backlight(${block.getFieldValue('STATE') === '1' ? 'true' : 'false'});\n`;
  };
  Blockly.Arduino.st7789_text = function (block) {
    prepare();
    return `kbTft.drawText(${val(block, 'X', '0')}, ${val(block, 'Y', '0')}, String(${val(block, 'TEXT', '""')}), ${val(block, 'COLOR', '0xFFFF')}, ${val(block, 'SIZE', '1')});\n`;
  };
  Blockly.Arduino.st7789_number = function (block) {
    prepare();
    return `kbTft.drawNumber(${val(block, 'X', '0')}, ${val(block, 'Y', '0')}, ${val(block, 'VALUE', '0')}, ${val(block, 'DIGITS', '1')}, ${val(block, 'COLOR', '0xFFFF')}, ${val(block, 'SIZE', '1')});\n`;
  };
  Blockly.Arduino.st7789_line = function (block) {
    prepare();
    return `kbTft.drawLine(${val(block, 'X0', '0')}, ${val(block, 'Y0', '0')}, ${val(block, 'X1', '0')}, ${val(block, 'Y1', '0')}, ${val(block, 'COLOR', '0xFFFF')});\n`;
  };
  Blockly.Arduino.st7789_rect = function (block) {
    prepare();
    return `kbTft.drawRect(${val(block, 'X', '0')}, ${val(block, 'Y', '0')}, ${val(block, 'W', '10')}, ${val(block, 'H', '10')}, ${val(block, 'COLOR', '0xFFFF')});\n`;
  };
  Blockly.Arduino.st7789_fill_rect = function (block) {
    prepare();
    return `kbTft.fillRect(${val(block, 'X', '0')}, ${val(block, 'Y', '0')}, ${val(block, 'W', '10')}, ${val(block, 'H', '10')}, ${val(block, 'COLOR', '0xFFFF')});\n`;
  };
  Blockly.Arduino.st7789_circle = function (block) {
    prepare();
    return `kbTft.drawCircle(${val(block, 'X', '0')}, ${val(block, 'Y', '0')}, ${val(block, 'R', '10')}, ${val(block, 'COLOR', '0xFFFF')});\n`;
  };
  Blockly.Arduino.st7789_color = function (block) {
    return [block.getFieldValue('COLOR'), Blockly.Arduino.ORDER_ATOMIC];
  };
  Blockly.Arduino.st7789_rgb = function (block) {
    prepare();
    return [`kbTft.color565(${val(block, 'R', '0')}, ${val(block, 'G', '0')}, ${val(block, 'B', '0')})`, Blockly.Arduino.ORDER_ATOMIC];
  };
  return Blockly;
}
exports = addGenerator;
