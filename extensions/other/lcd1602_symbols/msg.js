/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addMsg (Blockly) {
  Object.assign(Blockly.ScratchMsgs.locales.en, {
    LCD1602_SYMBOLS_CATEGORY: 'LCD1602 Symbols',
    LCD1602_SYMBOLS_REGISTER: 'register LCD1602 custom symbols',
    LCD1602_SYMBOLS_DEGREE_C: 'LCD1602 symbol ℃',
    LCD1602_SYMBOLS_GM3: 'LCD1602 symbol g/m³ (2 cells)'
  });

  Object.assign(Blockly.ScratchMsgs.locales.ja, {
    LCD1602_SYMBOLS_CATEGORY: 'LCD1602 記号',
    LCD1602_SYMBOLS_REGISTER: 'LCD1602特殊記号を登録',
    LCD1602_SYMBOLS_DEGREE_C: 'LCD1602記号 ℃',
    LCD1602_SYMBOLS_GM3: 'LCD1602記号 g/m³（2文字）'
  });

  Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], {
    LCD1602_SYMBOLS_CATEGORY: 'LCD1602 符号',
    LCD1602_SYMBOLS_REGISTER: '注册LCD1602自定义符号',
    LCD1602_SYMBOLS_DEGREE_C: 'LCD1602符号 ℃',
    LCD1602_SYMBOLS_GM3: 'LCD1602符号 g/m³（2字符）'
  });

  return Blockly;
}
exports = addMsg;
