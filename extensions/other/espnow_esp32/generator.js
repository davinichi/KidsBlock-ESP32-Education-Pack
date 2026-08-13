/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
  function addSupport () {
    Blockly.Arduino.includes_.espnow_education = '#include <ESPNowEducation.h>';
    Blockly.Arduino.definitions_.espnow_education_object = 'ESPNowEducation kbEspNow;';
  }

  Blockly.Arduino.espnow_begin = function (block) {
    addSupport();
    const mode = block.getFieldValue('MODE') || 'NORMAL';
    const longRange = mode === 'LONG_RANGE' ? 'true' : 'false';
    return `kbEspNow.begin(${longRange});\n`;
  };

  Blockly.Arduino.espnow_send_text = function (block) {
    addSupport();
    const data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_NONE) || 'String("")';
    const mac = Blockly.Arduino.valueToCode(block, 'MAC', Blockly.Arduino.ORDER_NONE) || 'String("")';
    return `kbEspNow.send(String(${data}), String(${mac}));\n`;
  };

  Blockly.Arduino.espnow_has_new_data = function () {
    addSupport();
    return ['kbEspNow.hasNewData()', Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.espnow_received_text = function () {
    addSupport();
    return ['kbEspNow.receivedText()', Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.espnow_sender_mac = function () {
    addSupport();
    return ['kbEspNow.senderMac()', Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.espnow_last_send_success = function () {
    addSupport();
    return ['kbEspNow.lastSendSucceeded()', Blockly.Arduino.ORDER_ATOMIC];
  };

  Blockly.Arduino.espnow_is_ready = function () {
    addSupport();
    return ['kbEspNow.isReady()', Blockly.Arduino.ORDER_ATOMIC];
  };

  return Blockly;
}

exports = addGenerator;
