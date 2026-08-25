/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addBlocks (Blockly) {
  const color = '#2EAF7D';

  Blockly.Blocks.environment_index = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.ENVIRONMENT_INDEX,
        args0: [
          {
            type: 'field_dropdown',
            name: 'INDEX',
            options: [
              [Blockly.Msg.ENVIRONMENT_INDEX_DI, 'ENV_INDEX_DI'],
              [Blockly.Msg.ENVIRONMENT_INDEX_HEAT_INDEX, 'ENV_INDEX_HEAT_INDEX'],
              [Blockly.Msg.ENVIRONMENT_INDEX_HUMIDEX, 'ENV_INDEX_HUMIDEX'],
              [Blockly.Msg.ENVIRONMENT_INDEX_DEW_POINT, 'ENV_INDEX_DEW_POINT'],
              [Blockly.Msg.ENVIRONMENT_INDEX_ABSOLUTE_HUMIDITY, 'ENV_INDEX_ABSOLUTE_HUMIDITY'],
              [Blockly.Msg.ENVIRONMENT_INDEX_WET_BULB, 'ENV_INDEX_WET_BULB'],
              [Blockly.Msg.ENVIRONMENT_INDEX_VPD, 'ENV_INDEX_VPD'],
              [Blockly.Msg.ENVIRONMENT_INDEX_VAPOR_PRESSURE, 'ENV_INDEX_VAPOR_PRESSURE'],
              [Blockly.Msg.ENVIRONMENT_INDEX_THI, 'ENV_INDEX_THI'],
              [Blockly.Msg.ENVIRONMENT_INDEX_ESTIMATED_WBGT, 'ENV_INDEX_ESTIMATED_WBGT']
            ]
          },
          {type: 'input_value', name: 'TEMP'},
          {type: 'input_value', name: 'HUMIDITY'}
        ],
        colour: color,
        extensions: ['output_number']
      });
    }
  };

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

  return Blockly;
}

exports = addBlocks;
