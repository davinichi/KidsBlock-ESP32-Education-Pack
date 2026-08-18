/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
    Blockly.Arduino.BME280_init = function (block) {
        const address = block.getFieldValue('ADDRESS') || '0x76';

        Blockly.Arduino.includes_.include_bme280 = '#include <Wire.h>\n#include <KidsBlock_BME280.h>\n';
        Blockly.Arduino.definitions_.var_declare_bme280 = 'KidsBlock_BME280 bme280;\n';
        Blockly.Arduino.setups_.bme280_wire_setup = 'Wire.begin(21, 22);';
        Blockly.Arduino.setups_.bme280_sensor_setup = `bme280.begin(${address}, &Wire);`;
        return '';
    };

    Blockly.Arduino.BME280_temperature = function () {
        return ['bme280.readTemperature()', Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.BME280_humidity = function () {
        return ['bme280.readHumidity()', Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.BME280_pressure = function () {
        return ['bme280.readPressure() / 100.0F', Blockly.Arduino.ORDER_MULTIPLICATIVE];
    };

    return Blockly;
}

exports = addGenerator;
