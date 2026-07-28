/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addBlocks (Blockly) {
  const color = '#0FBD8C';

  Blockly.Blocks.wifisimple_connect = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.WIFISIMPLE_CONNECT,
        args0: [
          {type: 'input_value', name: 'SSID'},
          {type: 'input_value', name: 'PASSWORD'}
        ],
        colour: color,
        extensions: ['shape_statement']
      });
    }
  };

  Blockly.Blocks.wifisimple_wait = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.WIFISIMPLE_WAIT,
        colour: color,
        extensions: ['shape_statement']
      });
    }
  };

  Blockly.Blocks.wifisimple_disconnect = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.WIFISIMPLE_DISCONNECT,
        colour: color,
        extensions: ['shape_statement']
      });
    }
  };

  Blockly.Blocks.wifisimple_is_connected = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.WIFISIMPLE_IS_CONNECTED,
        colour: color,
        output: 'Boolean'
      });
    }
  };

  Blockly.Blocks.wifisimple_ip = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.WIFISIMPLE_IP,
        colour: color,
        output: 'String'
      });
    }
  };

  Blockly.Blocks.wifisimple_ssid = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.WIFISIMPLE_SSID,
        colour: color,
        output: 'String'
      });
    }
  };

  Blockly.Blocks.wifisimple_rssi = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.WIFISIMPLE_RSSI,
        colour: color,
        extensions: ['output_number']
      });
    }
  };

  return Blockly;
}

exports = addBlocks;
