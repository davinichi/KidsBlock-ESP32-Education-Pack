/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addBlocks (Blockly) {
  const color = '#1769AA';

  Blockly.Blocks.espnow_begin = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.ESPNOW_BEGIN,
        args0: [
          {
            type: 'field_dropdown',
            name: 'MODE',
            options: [
              [Blockly.Msg.ESPNOW_MODE_NORMAL, 'NORMAL'],
              [Blockly.Msg.ESPNOW_MODE_LONG_RANGE, 'LONG_RANGE']
            ]
          }
        ],
        colour: color,
        extensions: ['shape_statement']
      });
    }
  };

  Blockly.Blocks.espnow_send_text = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.ESPNOW_SEND_TEXT,
        args0: [
          {type: 'input_value', name: 'DATA'},
          {type: 'input_value', name: 'MAC'}
        ],
        colour: color,
        extensions: ['shape_statement']
      });
    }
  };

  Blockly.Blocks.espnow_has_new_data = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.ESPNOW_HAS_NEW_DATA,
        colour: color,
        extensions: ['output_boolean']
      });
    }
  };

  Blockly.Blocks.espnow_received_text = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.ESPNOW_RECEIVED_TEXT,
        colour: color,
        extensions: ['output_number']
      });
    }
  };

  Blockly.Blocks.espnow_sender_mac = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.ESPNOW_SENDER_MAC,
        colour: color,
        extensions: ['output_number']
      });
    }
  };

  Blockly.Blocks.espnow_last_send_success = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.ESPNOW_LAST_SEND_SUCCESS,
        colour: color,
        extensions: ['output_boolean']
      });
    }
  };

  Blockly.Blocks.espnow_is_ready = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.ESPNOW_IS_READY,
        colour: color,
        extensions: ['output_boolean']
      });
    }
  };

  return Blockly;
}

exports = addBlocks;
