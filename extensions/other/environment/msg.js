/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addMsg (Blockly) {
  Object.assign(Blockly.ScratchMsgs.locales.en, {
    ENVIRONMENT_CATEGORY: 'Environment',
    ENVIRONMENT_WET_BULB: 'wet-bulb temperature: temperature %1 °C humidity %2 %%',
    ENVIRONMENT_SIMPLE_WBGT: 'simple WBGT: temperature %1 °C humidity %2 %%',
    ENVIRONMENT_WBGT_LEVEL: 'warning level number for WBGT %1',
    ENVIRONMENT_WBGT_LEVEL_TEXT: 'warning level text for WBGT %1'
  });

  Object.assign(Blockly.ScratchMsgs.locales.ja, {
    ENVIRONMENT_CATEGORY: '環境計算',
    ENVIRONMENT_WET_BULB: '温度 %1 ℃ 湿度 %2 ％ の湿球温度',
    ENVIRONMENT_SIMPLE_WBGT: '温度 %1 ℃ 湿度 %2 ％ のWBGT',
    ENVIRONMENT_WBGT_LEVEL: 'WBGT %1 の警戒レベル番号',
    ENVIRONMENT_WBGT_LEVEL_TEXT: 'WBGT %1 の警戒レベル'
  });

  Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], {
    ENVIRONMENT_CATEGORY: '环境计算',
    ENVIRONMENT_WET_BULB: '温度 %1 ℃ 湿度 %2 %% 的湿球温度',
    ENVIRONMENT_SIMPLE_WBGT: '温度 %1 ℃ 湿度 %2 %% 的WBGT',
    ENVIRONMENT_WBGT_LEVEL: 'WBGT %1 的警戒等级编号',
    ENVIRONMENT_WBGT_LEVEL_TEXT: 'WBGT %1 的警戒等级'
  });

  return Blockly;
}

exports = addMsg;
