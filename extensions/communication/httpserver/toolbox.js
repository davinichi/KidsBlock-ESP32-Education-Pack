/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addToolbox () {
  return `
    <category name="%{BKY_HTTPSERVER_CATEGORY}" id="HTTPServer" colour="#1769AA" secondaryColour="#0D4775">
      <block type="httpserver_begin">
        <value name="TITLE"><shadow type="text"><field name="TEXT">環境モニター</field></shadow></value>
      </block>
      <block type="httpserver_device_name">
        <value name="NAME"><shadow type="text"><field name="TEXT">ENV-01</field></shadow></value>
      </block>
      <block type="httpserver_interval">
        <value name="MS"><shadow type="math_number"><field name="NUM">3000</field></shadow></value>
      </block>
      <sep gap="24"/>
      <block type="httpserver_register_item">
        <value name="LABEL"><shadow type="text"><field name="TEXT">温度</field></shadow></value>
        <value name="UNIT"><shadow type="text"><field name="TEXT">℃</field></shadow></value>
      </block>
      <block type="httpserver_update_item">
        <value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
      </block>
      <block type="httpserver_clear_item"/>
      <sep gap="24"/>
      <block type="httpserver_handle"/>
      <block type="httpserver_url"/>
      <block type="httpserver_is_running"/>
    </category>`;
}

exports = addToolbox;
