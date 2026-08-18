/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addToolbox () {
  return `
    <category name="%{BKY_ENVIRONMENT_CATEGORY}" id="Environment" colour="#2EAF7D" secondaryColour="#248A63">
      <block type="environment_wet_bulb">
        <value name="TEMP"><shadow type="math_number"><field name="NUM">25</field></shadow></value>
        <value name="HUMIDITY"><shadow type="math_number"><field name="NUM">60</field></shadow></value>
      </block>
      <block type="environment_simple_wbgt">
        <value name="TEMP"><shadow type="math_number"><field name="NUM">25</field></shadow></value>
        <value name="HUMIDITY"><shadow type="math_number"><field name="NUM">60</field></shadow></value>
      </block>
      <block type="environment_absolute_humidity">
        <value name="TEMP"><shadow type="math_number"><field name="NUM">25</field></shadow></value>
        <value name="HUMIDITY"><shadow type="math_number"><field name="NUM">60</field></shadow></value>
      </block>
      <sep gap="24"/>
      <block type="environment_lcd1602_symbol_degree_c"/>
      <block type="environment_lcd1602_symbol_gm3"/>
      <sep gap="24"/>
    </category>`;
}

exports = addToolbox;
