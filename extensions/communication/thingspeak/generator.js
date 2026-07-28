/* eslint-disable func-style */
function addGenerator (Blockly) {
  const prepare = function () {
    Blockly.Arduino.includes_.include_kbthingspeak = '#include <KBThingSpeak.h>';
    Blockly.Arduino.definitions_.define_kbthingspeak = 'KBThingSpeak kbThingSpeak;';
  };
  const val = (block, name, fallback) => Blockly.Arduino.valueToCode(block, name, Blockly.Arduino.ORDER_NONE) || fallback;

  // Existing send generators (unchanged)
  Blockly.Arduino.thingspeak_begin = function (block) {
    prepare();
    return `kbThingSpeak.begin(${val(block, 'CHANNEL', '0')}, ${val(block, 'APIKEY', '""')});\n`;
  };
  for (let n = 1; n <= 8; n++) {
    Blockly.Arduino[`thingspeak_send${n}`] = function (block) {
      prepare();
      const args = [];
      for (let i = 1; i <= n; i++) args.push(`String(${val(block, `FIELD${i}`, '0')})`);
      return `kbThingSpeak.send${n}(${args.join(', ')});\n`;
    };
  }
  Blockly.Arduino.thingspeak_last_entry = function () {
    prepare();
    return ['kbThingSpeak.lastEntryNumber()', Blockly.Arduino.ORDER_ATOMIC];
  };
  Blockly.Arduino.thingspeak_success = function () {
    prepare();
    return ['kbThingSpeak.lastSendSucceeded()', Blockly.Arduino.ORDER_ATOMIC];
  };

  // New read generators. Input names exactly match blocks.js and toolbox.js.
  Blockly.Arduino.thingspeak_read_latest = function (block) {
    prepare();
    const channel = val(block, 'READ_CHANNEL', '0');
    const field = val(block, 'READ_FIELD', '1');
    const readKey = val(block, 'READ_APIKEY', '""');
    return [`kbThingSpeak.readLatestField(${channel}, ${field}, ${readKey})`, Blockly.Arduino.ORDER_ATOMIC];
  };
  Blockly.Arduino.thingspeak_read_success = function () {
    prepare();
    return ['kbThingSpeak.lastReadSucceeded()', Blockly.Arduino.ORDER_ATOMIC];
  };
  Blockly.Arduino.thingspeak_read_http_code = function () {
    prepare();
    return ['kbThingSpeak.lastReadHttpCode()', Blockly.Arduino.ORDER_ATOMIC];
  };
  Blockly.Arduino.thingspeak_read_error = function () {
    prepare();
    return ['kbThingSpeak.lastReadError()', Blockly.Arduino.ORDER_ATOMIC];
  };

  return Blockly;
}
exports = addGenerator;
