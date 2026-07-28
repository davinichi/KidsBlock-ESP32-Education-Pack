/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
  const prepare = function () {
    Blockly.Arduino.includes_.include_ntpclock = '#include <NTPClock.h>';
    Blockly.Arduino.definitions_.define_ntpclock = 'NTPClock ntpClock;';
  };

  Blockly.Arduino.ntpclock_begin = function (block) {
    prepare();
    const server = Blockly.Arduino.valueToCode(block, 'SERVER', Blockly.Arduino.ORDER_NONE) || '"ntp.nict.jp"';
    const offset = Blockly.Arduino.valueToCode(block, 'OFFSET', Blockly.Arduino.ORDER_NONE) || '9';
    const interval = Blockly.Arduino.valueToCode(block, 'INTERVAL', Blockly.Arduino.ORDER_NONE) || '60000';
    return `ntpClock.begin(${server}, ${offset}, ${interval});\n`;
  };

  Blockly.Arduino.ntpclock_update = function () {
    prepare();
    return 'ntpClock.update();\n';
  };

  Blockly.Arduino.ntpclock_force_update = function () {
    prepare();
    return 'ntpClock.forceUpdate();\n';
  };

  const valueGenerators = {
    ntpclock_epoch: 'ntpClock.epoch()',
    ntpclock_year: 'ntpClock.year()',
    ntpclock_month: 'ntpClock.month()',
    ntpclock_day: 'ntpClock.day()',
    ntpclock_hour: 'ntpClock.hour()',
    ntpclock_minute: 'ntpClock.minute()',
    ntpclock_second: 'ntpClock.second()',
    ntpclock_date_text: 'ntpClock.dateString()',
    ntpclock_time_text: 'ntpClock.timeString()',
    ntpclock_is_valid: 'ntpClock.isTimeValid()'
  };

  Object.keys(valueGenerators).forEach(type => {
    Blockly.Arduino[type] = function () {
      prepare();
      return [valueGenerators[type], Blockly.Arduino.ORDER_ATOMIC];
    };
  });

  return Blockly;
}

exports = addGenerator;
