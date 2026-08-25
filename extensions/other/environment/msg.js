/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addMsg (Blockly) {
  Object.assign(Blockly.ScratchMsgs.locales.en, {
    ENVIRONMENT_CATEGORY: 'Environment',
    ENVIRONMENT_INDEX: 'environment index %1 from temperature %2 °C humidity %3 %%',
    ENVIRONMENT_INDEX_DI: 'Discomfort Index (DI)',
    ENVIRONMENT_INDEX_HEAT_INDEX: 'Heat Index',
    ENVIRONMENT_INDEX_HUMIDEX: 'Humidex',
    ENVIRONMENT_INDEX_DEW_POINT: 'Dew point (Td)',
    ENVIRONMENT_INDEX_ABSOLUTE_HUMIDITY: 'Absolute humidity (AH)',
    ENVIRONMENT_INDEX_WET_BULB: 'Wet-bulb temperature (Tw)',
    ENVIRONMENT_INDEX_VPD: 'VPD',
    ENVIRONMENT_INDEX_VAPOR_PRESSURE: 'Vapor pressure (VP)',
    ENVIRONMENT_INDEX_THI: 'THI',
    ENVIRONMENT_INDEX_ESTIMATED_WBGT: 'Estimated WBGT (simple)',
    ENVIRONMENT_WET_BULB: 'wet-bulb temperature: temperature %1 °C humidity %2 %%',
    ENVIRONMENT_SIMPLE_WBGT: 'simple WBGT: temperature %1 °C humidity %2 %%',
    ENVIRONMENT_ABSOLUTE_HUMIDITY: 'absolute humidity: temperature %1 °C humidity %2 %% (g/m³)',
    ENVIRONMENT_WBGT_LEVEL: 'warning level number for WBGT %1',
    ENVIRONMENT_WBGT_LEVEL_TEXT: 'warning level text for WBGT %1',
    ENVIRONMENT_LCD1602_REGISTER_SYMBOLS: 'register LCD1602 special symbols',
    ENVIRONMENT_LCD1602_SYMBOL_DEGREE_C: 'LCD1602 symbol ℃',
    ENVIRONMENT_LCD1602_SYMBOL_GM3: 'LCD1602 symbol g/m³ (2 cells)'
  });

  Object.assign(Blockly.ScratchMsgs.locales.ja, {
    ENVIRONMENT_CATEGORY: '環境計算',
    ENVIRONMENT_INDEX: '環境指数 %1 ：温度 %2 ℃ 湿度 %3 ％ から計算',
    ENVIRONMENT_INDEX_DI: '不快指数 DI',
    ENVIRONMENT_INDEX_HEAT_INDEX: 'Heat Index',
    ENVIRONMENT_INDEX_HUMIDEX: 'Humidex',
    ENVIRONMENT_INDEX_DEW_POINT: '露点温度 Td',
    ENVIRONMENT_INDEX_ABSOLUTE_HUMIDITY: '絶対湿度 AH',
    ENVIRONMENT_INDEX_WET_BULB: '湿球温度 Tw',
    ENVIRONMENT_INDEX_VPD: 'VPD（飽差）',
    ENVIRONMENT_INDEX_VAPOR_PRESSURE: '水蒸気圧 VP',
    ENVIRONMENT_INDEX_THI: 'THI（温湿度指数）',
    ENVIRONMENT_INDEX_ESTIMATED_WBGT: '推定WBGT（簡易）',
    ENVIRONMENT_WET_BULB: '温度 %1 ℃ 湿度 %2 ％ の湿球温度',
    ENVIRONMENT_SIMPLE_WBGT: '温度 %1 ℃ 湿度 %2 ％ のWBGT',
    ENVIRONMENT_ABSOLUTE_HUMIDITY: '温度 %1 ℃ 湿度 %2 ％ の絶対湿度 (g/m³)',
    ENVIRONMENT_WBGT_LEVEL: 'WBGT %1 の警戒レベル番号',
    ENVIRONMENT_WBGT_LEVEL_TEXT: 'WBGT %1 の警戒レベル',
    ENVIRONMENT_LCD1602_REGISTER_SYMBOLS: 'LCD1602特殊記号を登録',
    ENVIRONMENT_LCD1602_SYMBOL_DEGREE_C: 'LCD1602記号 ℃',
    ENVIRONMENT_LCD1602_SYMBOL_GM3: 'LCD1602記号 g/m³（2文字）'
  });

  Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], {
    ENVIRONMENT_CATEGORY: '环境计算',
    ENVIRONMENT_INDEX: '环境指数 %1：温度 %2 ℃ 湿度 %3 %% 计算',
    ENVIRONMENT_INDEX_DI: '不适指数 DI',
    ENVIRONMENT_INDEX_HEAT_INDEX: 'Heat Index',
    ENVIRONMENT_INDEX_HUMIDEX: 'Humidex',
    ENVIRONMENT_INDEX_DEW_POINT: '露点温度 Td',
    ENVIRONMENT_INDEX_ABSOLUTE_HUMIDITY: '绝对湿度 AH',
    ENVIRONMENT_INDEX_WET_BULB: '湿球温度 Tw',
    ENVIRONMENT_INDEX_VPD: 'VPD',
    ENVIRONMENT_INDEX_VAPOR_PRESSURE: '水汽压 VP',
    ENVIRONMENT_INDEX_THI: 'THI',
    ENVIRONMENT_INDEX_ESTIMATED_WBGT: '估算WBGT（简易）',
    ENVIRONMENT_WET_BULB: '温度 %1 ℃ 湿度 %2 %% 的湿球温度',
    ENVIRONMENT_SIMPLE_WBGT: '温度 %1 ℃ 湿度 %2 %% 的WBGT',
    ENVIRONMENT_ABSOLUTE_HUMIDITY: '温度 %1 ℃ 湿度 %2 %% 的绝对湿度 (g/m³)',
    ENVIRONMENT_WBGT_LEVEL: 'WBGT %1 的警戒等级编号',
    ENVIRONMENT_WBGT_LEVEL_TEXT: 'WBGT %1 的警戒等级',
    ENVIRONMENT_LCD1602_REGISTER_SYMBOLS: '注册LCD1602特殊符号',
    ENVIRONMENT_LCD1602_SYMBOL_DEGREE_C: 'LCD1602符号 ℃',
    ENVIRONMENT_LCD1602_SYMBOL_GM3: 'LCD1602符号 g/m³（2字符）'
  });

  return Blockly;
}

exports = addMsg;
