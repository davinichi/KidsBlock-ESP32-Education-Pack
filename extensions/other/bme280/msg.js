/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addMsg (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales.en, {
        BME280_CATEGORY: 'BME280',
        BME280_INIT: 'BME280 setup address %1 (SDA 21 / SCL 22)',
        BME280_TEMPERATURE: 'BME280 temperature (C)',
        BME280_HUMIDITY: 'BME280 humidity (%)',
        BME280_PRESSURE: 'BME280 pressure (hPa)'
    });
    Object.assign(Blockly.ScratchMsgs.locales.ja, {
        BME280_CATEGORY: 'BME280 温度・湿度・気圧',
        BME280_INIT: 'BME280 を初期化 アドレス %1 (SDA 21 / SCL 22)',
        BME280_TEMPERATURE: 'BME280 温度 (℃)',
        BME280_HUMIDITY: 'BME280 湿度 (%)',
        BME280_PRESSURE: 'BME280 気圧 (hPa)'
    });
    Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], {
        BME280_CATEGORY: 'BME280 温湿度气压',
        BME280_INIT: '初始化 BME280 地址 %1 (SDA 21 / SCL 22)',
        BME280_TEMPERATURE: 'BME280 温度 (C)',
        BME280_HUMIDITY: 'BME280 湿度 (%)',
        BME280_PRESSURE: 'BME280 气压 (hPa)'
    });
    Object.assign(Blockly.ScratchMsgs.locales['zh-tw'], {
        BME280_CATEGORY: 'BME280 溫濕度氣壓',
        BME280_INIT: '初始化 BME280 位址 %1 (SDA 21 / SCL 22)',
        BME280_TEMPERATURE: 'BME280 溫度 (C)',
        BME280_HUMIDITY: 'BME280 濕度 (%)',
        BME280_PRESSURE: 'BME280 氣壓 (hPa)'
    });
    return Blockly;
}

exports = addMsg;
