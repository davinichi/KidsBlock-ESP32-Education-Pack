/* eslint-disable func-style */
function addGenerator (Blockly) {
  const prepare = () => {
    Blockly.Arduino.includes_.include_kbbleuart3 = '#include <KBBLEUART3.h>';
    Blockly.Arduino.definitions_.define_kbbleuart3 = 'KBBLEUART3 kbBLEUART3;';
  };
  const val = (block,name,fallback) => Blockly.Arduino.valueToCode(block,name,Blockly.Arduino.ORDER_NONE) || fallback;
  Blockly.Arduino.bleuart3_begin_peripheral = block => {prepare(); return `kbBLEUART3.beginPeripheral(String(${val(block,'NAME','"ESP32_BLE_UART"')}));\n`;};
  Blockly.Arduino.bleuart3_begin_central = block => {prepare(); return `kbBLEUART3.beginCentral(String(${val(block,'NAME','"KidsBlock_BLE_Central"')}));\n`;};
  Blockly.Arduino.bleuart3_scan = block => {prepare(); return `kbBLEUART3.scan((uint32_t)(${val(block,'SECONDS','5')}), String(${val(block,'PREFIX','""')}));\n`;};
  Blockly.Arduino.bleuart3_device_count = () => {prepare(); return ['kbBLEUART3.deviceCount()',Blockly.Arduino.ORDER_ATOMIC];};
  Blockly.Arduino.bleuart3_device_name = block => {prepare(); return [`kbBLEUART3.deviceName((int)(${val(block,'INDEX','1')}))`,Blockly.Arduino.ORDER_ATOMIC];};
  Blockly.Arduino.bleuart3_device_address = block => {prepare(); return [`kbBLEUART3.deviceAddress((int)(${val(block,'INDEX','1')}))`,Blockly.Arduino.ORDER_ATOMIC];};
  Blockly.Arduino.bleuart3_device_rssi = block => {prepare(); return [`kbBLEUART3.deviceRSSI((int)(${val(block,'INDEX','1')}))`,Blockly.Arduino.ORDER_ATOMIC];};
  Blockly.Arduino.bleuart3_connect = block => {prepare(); return `kbBLEUART3.connectIndex((int)(${val(block,'INDEX','1')}));\n`;};
  Blockly.Arduino.bleuart3_disconnect = () => {prepare(); return 'kbBLEUART3.disconnect();\n';};
  Blockly.Arduino.bleuart3_send_text = block => {prepare(); return `kbBLEUART3.send(String(${val(block,'TEXT','""')}));\n`;};
  for (let n=1;n<=8;n++) Blockly.Arduino[`bleuart3_send${n}`] = block => {prepare(); const a=Array.from({length:n},(_,i)=>`String(${val(block,`VALUE${i+1}`,'0')})`); return `kbBLEUART3.send${n}(${a.join(', ')});\n`;};
  Blockly.Arduino.bleuart3_connected = () => {prepare(); return ['kbBLEUART3.isConnected()',Blockly.Arduino.ORDER_ATOMIC];};
  Blockly.Arduino.bleuart3_last_send = () => {prepare(); return ['kbBLEUART3.lastSendSucceeded()',Blockly.Arduino.ORDER_ATOMIC];};
  Blockly.Arduino.bleuart3_received = () => {prepare(); return ['kbBLEUART3.received()',Blockly.Arduino.ORDER_ATOMIC];};
  Blockly.Arduino.bleuart3_received_text = () => {prepare(); return ['kbBLEUART3.receivedText()',Blockly.Arduino.ORDER_ATOMIC];};
  Blockly.Arduino.bleuart3_field = block => {prepare(); return [`kbBLEUART3.field((int)(${val(block,'NUMBER','1')}))`,Blockly.Arduino.ORDER_ATOMIC];};
  Blockly.Arduino.bleuart3_field_number = block => {prepare(); return [`kbBLEUART3.fieldNumber((int)(${val(block,'NUMBER','1')}))`,Blockly.Arduino.ORDER_ATOMIC];};
  Blockly.Arduino.bleuart3_clear = () => {prepare(); return 'kbBLEUART3.clearReceived();\n';};
  return Blockly;
}
exports = addGenerator;
