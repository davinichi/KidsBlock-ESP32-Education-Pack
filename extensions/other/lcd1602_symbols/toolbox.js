/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addToolbox () {
  return `
    <category name="%{BKY_LCD1602_SYMBOLS_CATEGORY}" id="LCD1602Symbols" colour="#5C8DFF" secondaryColour="#496FCC">
      <block type="lcd1602_symbols_register"/>
      <sep gap="24"/>
      <block type="lcd1602_symbols_degree_c"/>
      <block type="lcd1602_symbols_gm3"/>
    </category>`;
}
exports = addToolbox;
