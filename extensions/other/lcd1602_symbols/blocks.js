/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addBlocks (Blockly) {
  const color = '#5C8DFF';

  Blockly.Blocks.lcd1602_symbols_register = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.LCD1602_SYMBOLS_REGISTER,
        colour: color,
        previousStatement: null,
        nextStatement: null
      });
    }
  };

  Blockly.Blocks.lcd1602_symbols_degree_c = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.LCD1602_SYMBOLS_DEGREE_C,
        colour: color,
        output: 'String'
      });
    }
  };

  Blockly.Blocks.lcd1602_symbols_gm3 = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.LCD1602_SYMBOLS_GM3,
        colour: color,
        output: 'String'
      });
    }
  };

  return Blockly;
}
exports = addBlocks;
