/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addToolbox () {
  return `
    <category name="%{BKY_ST7789_CATEGORY}" id="ST7789ESP32" colour="#9966FF" secondaryColour="#774DCB">
      <block type="st7789_begin"/>
      <block type="st7789_fill_screen"/>
      <block type="st7789_rotation"/>
      <block type="st7789_backlight"/>
      <sep gap="24"/>
      <block type="st7789_text">
        <value name="X"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
        <value name="Y"><shadow type="math_number"><field name="NUM">20</field></shadow></value>
        <value name="TEXT"><shadow type="text"><field name="TEXT">HELLO</field></shadow></value>
        <value name="SIZE"><shadow type="math_number"><field name="NUM">2</field></shadow></value>
        <value name="COLOR"><shadow type="st7789_color"/></value>
      </block>
      <block type="st7789_number">
        <value name="X"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
        <value name="Y"><shadow type="math_number"><field name="NUM">50</field></shadow></value>
        <value name="VALUE"><shadow type="math_number"><field name="NUM">26.4</field></shadow></value>
        <value name="DIGITS"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
        <value name="SIZE"><shadow type="math_number"><field name="NUM">2</field></shadow></value>
        <value name="COLOR"><shadow type="st7789_color"/></value>
      </block>
      <sep gap="24"/>
      <block type="st7789_line">
        <value name="X0"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
        <value name="Y0"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
        <value name="X1"><shadow type="math_number"><field name="NUM">150</field></shadow></value>
        <value name="Y1"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
        <value name="COLOR"><shadow type="st7789_color"/></value>
      </block>
      <block type="st7789_rect">
        <value name="X"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
        <value name="Y"><shadow type="math_number"><field name="NUM">20</field></shadow></value>
        <value name="W"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
        <value name="H"><shadow type="math_number"><field name="NUM">50</field></shadow></value>
        <value name="COLOR"><shadow type="st7789_color"/></value>
      </block>
      <block type="st7789_fill_rect">
        <value name="X"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
        <value name="Y"><shadow type="math_number"><field name="NUM">80</field></shadow></value>
        <value name="W"><shadow type="math_number"><field name="NUM">100</field></shadow></value>
        <value name="H"><shadow type="math_number"><field name="NUM">50</field></shadow></value>
        <value name="COLOR"><shadow type="st7789_color"/></value>
      </block>
      <block type="st7789_circle">
        <value name="X"><shadow type="math_number"><field name="NUM">85</field></shadow></value>
        <value name="Y"><shadow type="math_number"><field name="NUM">180</field></shadow></value>
        <value name="R"><shadow type="math_number"><field name="NUM">30</field></shadow></value>
        <value name="COLOR"><shadow type="st7789_color"/></value>
      </block>
      <sep gap="24"/>
      <block type="st7789_color"/>
      <block type="st7789_rgb">
        <value name="R"><shadow type="math_number"><field name="NUM">255</field></shadow></value>
        <value name="G"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
        <value name="B"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
      </block>
    </category>`;
}
exports = addToolbox;
