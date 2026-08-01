/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addBlocks (Blockly) {
  const color = '#4C97FF';

  Blockly.Blocks.ntpclock_begin = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.NTPCLOCK_BEGIN,
        args0: [
          {type: 'input_value', name: 'SERVER'},
          {type: 'input_value', name: 'OFFSET'},
          {type: 'input_value', name: 'INTERVAL'}
        ],
        colour: color,
        extensions: ['shape_statement']
      });
    }
  };

  Blockly.Blocks.ntpclock_update = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.NTPCLOCK_UPDATE,
        colour: color,
        extensions: ['shape_statement']
      });
    }
  };

  Blockly.Blocks.ntpclock_force_update = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.NTPCLOCK_FORCE_UPDATE,
        colour: color,
        extensions: ['shape_statement']
      });
    }
  };

  const numberBlocks = {
    ntpclock_epoch: 'NTPCLOCK_EPOCH',
    ntpclock_year: 'NTPCLOCK_YEAR',
    ntpclock_month: 'NTPCLOCK_MONTH',
    ntpclock_day: 'NTPCLOCK_DAY',
    ntpclock_hour: 'NTPCLOCK_HOUR',
    ntpclock_minute: 'NTPCLOCK_MINUTE',
    ntpclock_second: 'NTPCLOCK_SECOND'
  };

  Object.keys(numberBlocks).forEach(type => {
    Blockly.Blocks[type] = {
      init: function () {
        this.jsonInit({
          message0: Blockly.Msg[numberBlocks[type]],
          colour: color,
          extensions: ['output_number']
        });
      }
    };
  });

  Blockly.Blocks.ntpclock_date_text = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.NTPCLOCK_DATE_TEXT,
        colour: color,
        output: 'String'
      });
    }
  };

  Blockly.Blocks.ntpclock_time_text = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.NTPCLOCK_TIME_TEXT,
        colour: color,
        output: 'String'
      });
    }
  };

  Blockly.Blocks.ntpclock_is_valid = {
    init: function () {
      this.jsonInit({
        message0: Blockly.Msg.NTPCLOCK_IS_VALID,
        colour: color,
        output: 'Boolean'
      });
    }
  };

  return Blockly;
}

exports = addBlocks;
