/* eslint-disable func-style */
function addBlocks (Blockly) {
  const color = '#00A4A6';
  const statement = (type, message, names) => {
    Blockly.Blocks[type] = {init: function () {
      this.jsonInit({
        message0: Blockly.Msg[message],
        args0: names.map(name => ({type: 'input_value', name})),
        colour: color,
        extensions: ['shape_statement']
      });
    }};
  };

  // Existing send blocks (unchanged)
  statement('thingspeak_begin', 'THINGSPEAK_BEGIN', ['CHANNEL', 'APIKEY']);
  statement('thingspeak_send1', 'THINGSPEAK_SEND1', ['FIELD1']);
  statement('thingspeak_send2', 'THINGSPEAK_SEND2', ['FIELD1', 'FIELD2']);
  statement('thingspeak_send3', 'THINGSPEAK_SEND3', ['FIELD1', 'FIELD2', 'FIELD3']);
  statement('thingspeak_send4', 'THINGSPEAK_SEND4', ['FIELD1', 'FIELD2', 'FIELD3', 'FIELD4']);
  statement('thingspeak_send5', 'THINGSPEAK_SEND5', ['FIELD1', 'FIELD2', 'FIELD3', 'FIELD4', 'FIELD5']);
  statement('thingspeak_send6', 'THINGSPEAK_SEND6', ['FIELD1', 'FIELD2', 'FIELD3', 'FIELD4', 'FIELD5', 'FIELD6']);
  statement('thingspeak_send7', 'THINGSPEAK_SEND7', ['FIELD1', 'FIELD2', 'FIELD3', 'FIELD4', 'FIELD5', 'FIELD6', 'FIELD7']);
  statement('thingspeak_send8', 'THINGSPEAK_SEND8', ['FIELD1', 'FIELD2', 'FIELD3', 'FIELD4', 'FIELD5', 'FIELD6', 'FIELD7', 'FIELD8']);

  Blockly.Blocks.thingspeak_last_entry = {init: function () {
    this.jsonInit({message0: Blockly.Msg.THINGSPEAK_LAST_ENTRY, colour: color, extensions: ['output_number']});
  }};
  Blockly.Blocks.thingspeak_success = {init: function () {
    this.jsonInit({message0: Blockly.Msg.THINGSPEAK_SUCCESS, colour: color, output: 'Boolean'});
  }};

  // New reporter block: it returns a numeric value and fits into variable assignment,
  // Serial print, calculations, comparisons, etc.
  Blockly.Blocks.thingspeak_read_latest = {init: function () {
    this.jsonInit({
      message0: Blockly.Msg.THINGSPEAK_READ_LATEST,
      args0: [
        {type: 'input_value', name: 'READ_CHANNEL'},
        {type: 'input_value', name: 'READ_FIELD'},
        {type: 'input_value', name: 'READ_APIKEY'}
      ],
      colour: color,
      extensions: ['output_number']
    });
  }};
  Blockly.Blocks.thingspeak_read_success = {init: function () {
    this.jsonInit({message0: Blockly.Msg.THINGSPEAK_READ_SUCCESS, colour: color, output: 'Boolean'});
  }};
  Blockly.Blocks.thingspeak_read_http_code = {init: function () {
    this.jsonInit({message0: Blockly.Msg.THINGSPEAK_READ_HTTP_CODE, colour: color, extensions: ['output_number']});
  }};
  Blockly.Blocks.thingspeak_read_error = {init: function () {
    this.jsonInit({message0: Blockly.Msg.THINGSPEAK_READ_ERROR, colour: color, output: 'String'});
  }};

  return Blockly;
}
exports = addBlocks;
