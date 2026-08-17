/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addBlocks (Blockly) {
  const color = '#2EAF7D';

  Blockly.Blocks.environment_wet_bulb = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.ENVIRONMENT_WET_BULB,
        args0: [
          {type: 'input_value', name: 'TEMP'},
          {type: 'input_value', name: 'HUMIDITY'}
        ],
        colour: color,
        extensions: ['output_number']
      });
    }
  };

  Blockly.Blocks.environment_simple_wbgt = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.ENVIRONMENT_SIMPLE_WBGT,
        args0: [
          {type: 'input_value', name: 'TEMP'},
          {type: 'input_value', name: 'HUMIDITY'}
        ],
        colour: color,
        extensions: ['output_number']
      });
    }
  };

  Blockly.Blocks.environment_absolute_humidity = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.ENVIRONMENT_ABSOLUTE_HUMIDITY,
        args0: [
          {type: 'input_value', name: 'TEMP'},
          {type: 'input_value', name: 'HUMIDITY'}
        ],
        colour: color,
        extensions: ['output_number']
      });
    }
  };

  Blockly.Blocks.environment_wbgt_level = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.ENVIRONMENT_WBGT_LEVEL,
        args0: [
          {type: 'input_value', name: 'WBGT'}
        ],
        colour: color,
        extensions: ['output_number']
      });
    }
  };

  Blockly.Blocks.environment_wbgt_level_text = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.ENVIRONMENT_WBGT_LEVEL_TEXT,
        args0: [
          {type: 'input_value', name: 'WBGT'}
        ],
        colour: color,
        output: 'String'
      });
    }
  };

  Blockly.Blocks.environment_lcd1602_temperature = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.ENVIRONMENT_LCD1602_TEMPERATURE,
        args0: [
          {type: 'input_value', name: 'VALUE'},
          {type: 'field_dropdown', name: 'DECIMALS', options: [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3']]},
          {type: 'field_dropdown', name: 'ROW', options: [['1', '0'], ['2', '1']]},
          {type: 'input_value', name: 'COL'},
          {type: 'field_dropdown', name: 'ADDRESS', options: [['0x27', '0x27'], ['0x3F', '0x3F']]}
        ],
        colour: color,
        previousStatement: null,
        nextStatement: null
      });
    }
  };

  Blockly.Blocks.environment_lcd1602_absolute_humidity = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.ENVIRONMENT_LCD1602_ABSOLUTE_HUMIDITY,
        args0: [
          {type: 'input_value', name: 'VALUE'},
          {type: 'field_dropdown', name: 'DECIMALS', options: [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3']]},
          {type: 'field_dropdown', name: 'ROW', options: [['1', '0'], ['2', '1']]},
          {type: 'input_value', name: 'COL'},
          {type: 'field_dropdown', name: 'ADDRESS', options: [['0x27', '0x27'], ['0x3F', '0x3F']]}
        ],
        colour: color,
        previousStatement: null,
        nextStatement: null
      });
    }
  };

  return Blockly;
}

exports = addBlocks;
