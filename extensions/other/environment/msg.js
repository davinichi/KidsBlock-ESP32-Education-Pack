/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addMsg (Blockly) {
  Object.assign(Blockly.ScratchMsgs.locales.en, {
    ENVIRONMENT_CATEGORY: 'Environment',
    ENVIRONMENT_WET_BULB: 'wet-bulb temperature: temperature %1 °C humidity %2 %%',
    ENVIRONMENT_SIMPLE_WBGT: 'simple WBGT: temperature %1 °C humidity %2 %%',
    ENVIRONMENT_ABSOLUTE_HUMIDITY: 'absolute humidity: temperature %1 °C humidity %2 %% (g/m³)',
    ENVIRONMENT_WBGT_LEVEL: 'warning level number for WBGT %1',
    ENVIRONMENT_WBGT_LEVEL_TEXT: 'warning level text for WBGT %1',
    ENVIRONMENT_LCD1602_TEMPERATURE: 'LCD1602 temperature %1 decimals %2 row %3 column %4 I2C %5',
    ENVIRONMENT_LCD1602_ABSOLUTE_HUMIDITY: 'LCD1602 absolute humidity %1 decimals %2 row %3 column %4 I2C %5'
  });

  Object.assign(Blockly.ScratchMsgs.locales.ja, {
    ENVIRONMENT_CATEGORY: '環境計算',
    ENVIRONMENT_WET_BULB: '温度 %1 ℃ 湿度 %2 ％ の湿球温度',
    ENVIRONMENT_SIMPLE_WBGT: '温度 %1 ℃ 湿度 %2 ％ のWBGT',
    ENVIRONMENT_ABSOLUTE_HUMIDITY: '温度 %1 ℃ 湿度 %2 ％ の絶対湿度 (g/m³)',
    ENVIRONMENT_WBGT_LEVEL: 'WBGT %1 の警戒レベル番号',
    ENVIRONMENT_WBGT_LEVEL_TEXT: 'WBGT %1 の警戒レベル',
    ENVIRONMENT_LCD1602_TEMPERATURE: 'LCD1602に温度 %1 を小数点以下 %2 桁 行 %3 列 %4 I2C %5 で表示',
    ENVIRONMENT_LCD1602_ABSOLUTE_HUMIDITY: 'LCD1602に絶対湿度 %1 を小数点以下 %2 桁 行 %3 列 %4 I2C %5 で表示'
  });

  Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], {
    ENVIRONMENT_CATEGORY: '环境计算',
    ENVIRONMENT_WET_BULB: '温度 %1 ℃ 湿度 %2 %% 的湿球温度',
    ENVIRONMENT_SIMPLE_WBGT: '温度 %1 ℃ 湿度 %2 %% 的WBGT',
    ENVIRONMENT_ABSOLUTE_HUMIDITY: '温度 %1 ℃ 湿度 %2 %% 的绝对湿度 (g/m³)',
    ENVIRONMENT_WBGT_LEVEL: 'WBGT %1 的警戒等级编号',
    ENVIRONMENT_WBGT_LEVEL_TEXT: 'WBGT %1 的警戒等级',
    ENVIRONMENT_LCD1602_TEMPERATURE: 'LCD1602显示温度 %1 小数位 %2 行 %3 列 %4 I2C %5',
    ENVIRONMENT_LCD1602_ABSOLUTE_HUMIDITY: 'LCD1602显示绝对湿度 %1 小数位 %2 行 %3 列 %4 I2C %5'
  });

  return Blockly;
}

exports = addMsg;
