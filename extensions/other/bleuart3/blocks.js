/* eslint-disable func-style */
function addBlocks (Blockly) {
  const color = '#4B63C6';
  const statement = (type, message, names) => {
    Blockly.Blocks[type] = {init: function () {this.jsonInit({message0: Blockly.Msg[message], args0: names.map(name => ({type: 'input_value', name})), colour: color, extensions: ['shape_statement']});}};
  };
  const reporter = (type, message, names, output) => {
    Blockly.Blocks[type] = {init: function () {this.jsonInit({message0: Blockly.Msg[message], args0: names.map(name => ({type: 'input_value', name})), colour: color, output: output || null});}};
  };
  statement('bleuart3_begin_peripheral', 'BLEUART3_BEGIN_PERIPHERAL', ['NAME']);
  statement('bleuart3_begin_central', 'BLEUART3_BEGIN_CENTRAL', ['NAME']);
  statement('bleuart3_scan', 'BLEUART3_SCAN', ['SECONDS', 'PREFIX']);
  reporter('bleuart3_device_count', 'BLEUART3_DEVICE_COUNT', [], 'Number');
  reporter('bleuart3_device_name', 'BLEUART3_DEVICE_NAME', ['INDEX'], 'String');
  reporter('bleuart3_device_address', 'BLEUART3_DEVICE_ADDRESS', ['INDEX'], 'String');
  reporter('bleuart3_device_rssi', 'BLEUART3_DEVICE_RSSI', ['INDEX'], 'Number');
  statement('bleuart3_connect', 'BLEUART3_CONNECT', ['INDEX']);
  statement('bleuart3_disconnect', 'BLEUART3_DISCONNECT', []);
  statement('bleuart3_send_text', 'BLEUART3_SEND_TEXT', ['TEXT']);
  for (let n=1;n<=8;n++) statement(`bleuart3_send${n}`, `BLEUART3_SEND${n}`, Array.from({length:n},(_,i)=>`VALUE${i+1}`));
  reporter('bleuart3_connected', 'BLEUART3_CONNECTED', [], 'Boolean');
  reporter('bleuart3_last_send', 'BLEUART3_LAST_SEND', [], 'Boolean');
  reporter('bleuart3_received', 'BLEUART3_RECEIVED', [], 'Boolean');
  reporter('bleuart3_received_text', 'BLEUART3_RECEIVED_TEXT', [], 'String');
  reporter('bleuart3_field', 'BLEUART3_FIELD', ['NUMBER'], 'String');
  reporter('bleuart3_field_number', 'BLEUART3_FIELD_NUMBER', ['NUMBER'], 'Number');
  statement('bleuart3_clear', 'BLEUART3_CLEAR', []);
  return Blockly;
}
exports = addBlocks;
