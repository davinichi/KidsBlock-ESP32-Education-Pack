/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addBlocks (Blockly) {
  const color = '#9966FF';

  const statement = (type, message, args) => {
    Blockly.Blocks[type] = {init: function () {
      this.jsonInit({
        message0: Blockly.Msg[message],
        args0: args || [],
        colour: color,
        extensions: ['shape_statement']
      });
    }};
  };

  statement('st7789_begin', 'ST7789_BEGIN');
  statement('st7789_fill_screen', 'ST7789_FILL_SCREEN', [
    {type: 'field_dropdown', name: 'COLOR', options: [
      ['%{BKY_ST7789_COLOR_BLACK}', '0x0000'], ['%{BKY_ST7789_COLOR_WHITE}', '0xFFFF'],
      ['%{BKY_ST7789_COLOR_RED}', '0xF800'], ['%{BKY_ST7789_COLOR_GREEN}', '0x07E0'],
      ['%{BKY_ST7789_COLOR_BLUE}', '0x001F'], ['%{BKY_ST7789_COLOR_YELLOW}', '0xFFE0'],
      ['%{BKY_ST7789_COLOR_CYAN}', '0x07FF'], ['%{BKY_ST7789_COLOR_MAGENTA}', '0xF81F']
    ]}
  ]);
  statement('st7789_rotation', 'ST7789_ROTATION', [
    {type: 'field_dropdown', name: 'ROTATION', options: [['0°', '0'], ['90°', '1'], ['180°', '2'], ['270°', '3']]}
  ]);
  statement('st7789_backlight', 'ST7789_BACKLIGHT', [
    {type: 'field_dropdown', name: 'STATE', options: [['ON', '1'], ['OFF', '0']]}
  ]);
  statement('st7789_text', 'ST7789_TEXT', [
    {type: 'input_value', name: 'X'}, {type: 'input_value', name: 'Y'},
    {type: 'input_value', name: 'TEXT'}, {type: 'input_value', name: 'SIZE'},
    {type: 'input_value', name: 'COLOR'}
  ]);
  statement('st7789_number', 'ST7789_NUMBER', [
    {type: 'input_value', name: 'X'}, {type: 'input_value', name: 'Y'},
    {type: 'input_value', name: 'VALUE'}, {type: 'input_value', name: 'DIGITS'},
    {type: 'input_value', name: 'SIZE'}, {type: 'input_value', name: 'COLOR'}
  ]);
  statement('st7789_line', 'ST7789_LINE', [
    {type: 'input_value', name: 'X0'}, {type: 'input_value', name: 'Y0'},
    {type: 'input_value', name: 'X1'}, {type: 'input_value', name: 'Y1'}, {type: 'input_value', name: 'COLOR'}
  ]);
  statement('st7789_rect', 'ST7789_RECT', [
    {type: 'input_value', name: 'X'}, {type: 'input_value', name: 'Y'},
    {type: 'input_value', name: 'W'}, {type: 'input_value', name: 'H'}, {type: 'input_value', name: 'COLOR'}
  ]);
  statement('st7789_fill_rect', 'ST7789_FILL_RECT', [
    {type: 'input_value', name: 'X'}, {type: 'input_value', name: 'Y'},
    {type: 'input_value', name: 'W'}, {type: 'input_value', name: 'H'}, {type: 'input_value', name: 'COLOR'}
  ]);
  statement('st7789_circle', 'ST7789_CIRCLE', [
    {type: 'input_value', name: 'X'}, {type: 'input_value', name: 'Y'},
    {type: 'input_value', name: 'R'}, {type: 'input_value', name: 'COLOR'}
  ]);

  Blockly.Blocks.st7789_color = {init: function () {
    this.jsonInit({
      message0: Blockly.Msg.ST7789_COLOR,
      args0: [{type: 'field_dropdown', name: 'COLOR', options: [
        ['%{BKY_ST7789_COLOR_BLACK}', '0x0000'], ['%{BKY_ST7789_COLOR_WHITE}', '0xFFFF'],
        ['%{BKY_ST7789_COLOR_RED}', '0xF800'], ['%{BKY_ST7789_COLOR_GREEN}', '0x07E0'],
        ['%{BKY_ST7789_COLOR_BLUE}', '0x001F'], ['%{BKY_ST7789_COLOR_YELLOW}', '0xFFE0'],
        ['%{BKY_ST7789_COLOR_CYAN}', '0x07FF'], ['%{BKY_ST7789_COLOR_MAGENTA}', '0xF81F']
      ]}],
      colour: color,
      extensions: ['output_number']
    });
  }};

  Blockly.Blocks.st7789_rgb = {init: function () {
    this.jsonInit({
      message0: Blockly.Msg.ST7789_RGB,
      args0: [{type: 'input_value', name: 'R'}, {type: 'input_value', name: 'G'}, {type: 'input_value', name: 'B'}],
      colour: color,
      extensions: ['output_number']
    });
  }};

  return Blockly;
}
exports = addBlocks;
