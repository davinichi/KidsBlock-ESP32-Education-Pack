/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addBlocks (Blockly) {
  const color = '#1769AA';
  const itemOptions = [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8']];
  const controlOptions = [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8']];
  const stateOptions = [['HIGH', 'HIGH'], ['LOW', 'LOW']];

  Blockly.Blocks.httpserver_begin = {
    init: function () {
      this.jsonInit({message0: Blockly.Msg.HTTPSERVER_BEGIN, args0: [{type: 'input_value', name: 'TITLE'}], colour: color, extensions: ['shape_statement']});
    }
  };

  Blockly.Blocks.httpserver_device_name = {
    init: function () {
      this.jsonInit({message0: Blockly.Msg.HTTPSERVER_DEVICE_NAME, args0: [{type: 'input_value', name: 'NAME'}], colour: color, extensions: ['shape_statement']});
    }
  };

  Blockly.Blocks.httpserver_interval = {
    init: function () {
      this.jsonInit({message0: Blockly.Msg.HTTPSERVER_INTERVAL, args0: [{type: 'input_value', name: 'MS'}], colour: color, extensions: ['shape_statement']});
    }
  };

  Blockly.Blocks.httpserver_register_item = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.HTTPSERVER_REGISTER_ITEM,
        args0: [{type: 'field_dropdown', name: 'ITEM', options: itemOptions}, {type: 'input_value', name: 'LABEL'}, {type: 'input_value', name: 'UNIT'}],
        colour: color,
        extensions: ['shape_statement']
      });
    }
  };

  Blockly.Blocks.httpserver_update_item = {
    init: function () {
      this.jsonInit({message0: Blockly.Msg.HTTPSERVER_UPDATE_ITEM, args0: [{type: 'field_dropdown', name: 'ITEM', options: itemOptions}, {type: 'input_value', name: 'VALUE'}], colour: color, extensions: ['shape_statement']});
    }
  };

  Blockly.Blocks.httpserver_clear_item = {
    init: function () {
      this.jsonInit({message0: Blockly.Msg.HTTPSERVER_CLEAR_ITEM, args0: [{type: 'field_dropdown', name: 'ITEM', options: itemOptions}], colour: color, extensions: ['shape_statement']});
    }
  };

  Blockly.Blocks.httpserver_register_gpio = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.HTTPSERVER_REGISTER_GPIO,
        args0: [
          {type: 'field_dropdown', name: 'CONTROL', options: controlOptions},
          {type: 'input_value', name: 'LABEL'},
          {type: 'input_value', name: 'HIGH_LABEL'},
          {type: 'input_value', name: 'LOW_LABEL'},
          {type: 'field_dropdown', name: 'STATE', options: stateOptions}
        ],
        colour: color,
        extensions: ['shape_statement']
      });
    }
  };

  Blockly.Blocks.httpserver_set_gpio = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.HTTPSERVER_SET_GPIO,
        args0: [{type: 'field_dropdown', name: 'CONTROL', options: controlOptions}, {type: 'field_dropdown', name: 'STATE', options: stateOptions}],
        colour: color,
        extensions: ['shape_statement']
      });
    }
  };

  Blockly.Blocks.httpserver_gpio_state = {
    init: function () {
      this.jsonInit({message0: Blockly.Msg.HTTPSERVER_GPIO_STATE, args0: [{type: 'field_dropdown', name: 'CONTROL', options: controlOptions}, {type: 'field_dropdown', name: 'STATE', options: stateOptions}], colour: color, extensions: ['output_boolean']});
    }
  };

  Blockly.Blocks.httpserver_clear_gpio = {
    init: function () {
      this.jsonInit({message0: Blockly.Msg.HTTPSERVER_CLEAR_GPIO, args0: [{type: 'field_dropdown', name: 'CONTROL', options: controlOptions}], colour: color, extensions: ['shape_statement']});
    }
  };


  Blockly.Blocks.httpserver_exclusive_group_label = {
    init: function () {
      this.jsonInit({message0: Blockly.Msg.HTTPSERVER_EXCLUSIVE_GROUP_LABEL, args0: [{type: 'input_value', name: 'LABEL'}], colour: color, extensions: ['shape_statement']});
    }
  };

  Blockly.Blocks.httpserver_register_exclusive = {
    init: function () {
      this.jsonInit({message0: Blockly.Msg.HTTPSERVER_REGISTER_EXCLUSIVE, args0: [{type: 'field_dropdown', name: 'OPTION', options: controlOptions}, {type: 'input_value', name: 'LABEL'}], colour: color, extensions: ['shape_statement']});
    }
  };

  Blockly.Blocks.httpserver_select_exclusive = {
    init: function () {
      this.jsonInit({message0: Blockly.Msg.HTTPSERVER_SELECT_EXCLUSIVE, args0: [{type: 'field_dropdown', name: 'OPTION', options: controlOptions}], colour: color, extensions: ['shape_statement']});
    }
  };

  Blockly.Blocks.httpserver_exclusive_selected = {
    init: function () {
      this.jsonInit({message0: Blockly.Msg.HTTPSERVER_EXCLUSIVE_SELECTED, args0: [{type: 'field_dropdown', name: 'OPTION', options: controlOptions}], colour: color, extensions: ['output_boolean']});
    }
  };

  Blockly.Blocks.httpserver_exclusive_number = {
    init: function () {
      this.jsonInit({message0: Blockly.Msg.HTTPSERVER_EXCLUSIVE_NUMBER, colour: color, extensions: ['output_number']});
    }
  };

  Blockly.Blocks.httpserver_handle = {
    init: function () {
      this.jsonInit({message0: Blockly.Msg.HTTPSERVER_HANDLE, colour: color, extensions: ['shape_statement']});
    }
  };

  Blockly.Blocks.httpserver_url = {
    init: function () {
      this.jsonInit({message0: Blockly.Msg.HTTPSERVER_URL, colour: color, output: 'String'});
    }
  };

  Blockly.Blocks.httpserver_is_running = {
    init: function () {
      this.jsonInit({message0: Blockly.Msg.HTTPSERVER_IS_RUNNING, colour: color, output: 'Boolean'});
    }
  };

  // Compatibility blocks for Ver.2.0.x projects. They are not shown in the toolbox.
  Blockly.Blocks.httpserver_set_values = {
    init: function () {
      this.jsonInit({message0: Blockly.Msg.HTTPSERVER_SET_VALUES, args0: [{type: 'input_value', name: 'TEMP'}, {type: 'input_value', name: 'HUMI'}], colour: color, extensions: ['shape_statement']});
    }
  };

  Blockly.Blocks.httpserver_set_values_wbgt = {
    init: function () {
      this.jsonInit({message0: Blockly.Msg.HTTPSERVER_SET_VALUES_WBGT, args0: [{type: 'input_value', name: 'TEMP'}, {type: 'input_value', name: 'HUMI'}, {type: 'input_value', name: 'WBGT'}], colour: color, extensions: ['shape_statement']});
    }
  };

  return Blockly;
}

exports = addBlocks;
