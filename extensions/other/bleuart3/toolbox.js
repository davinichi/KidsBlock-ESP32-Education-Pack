/* eslint-disable func-style */
function addToolbox () {
  return `
    <category name="%{BKY_BLEUART3_CATEGORY}" id="BLEUART3" colour="#4B63C6" secondaryColour="#34469B">
      <block type="bleuart3_begin_central"><value name="NAME"><shadow type="text"><field name="TEXT">BLE-RECEIVER</field></shadow></value></block>
      <block type="bleuart3_scan"><value name="SECONDS"><shadow type="math_number"><field name="NUM">5</field></shadow></value><value name="PREFIX"><shadow type="text"><field name="TEXT">BLE-</field></shadow></value></block>
      <block type="bleuart3_device_count"/>
      <block type="bleuart3_device_name"><value name="INDEX"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
      <block type="bleuart3_device_address"><value name="INDEX"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
      <block type="bleuart3_device_rssi"><value name="INDEX"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
      <block type="bleuart3_connect"><value name="INDEX"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
      <block type="bleuart3_disconnect"/>
      <block type="bleuart3_connected"/>
      <block type="bleuart3_received"/>
      <block type="bleuart3_received_text"/>
      <block type="bleuart3_field"><value name="NUMBER"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
      <block type="bleuart3_field_number"><value name="NUMBER"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
      <block type="bleuart3_clear"/>
      <sep gap="36"/>
      <block type="bleuart3_begin_peripheral"><value name="NAME"><shadow type="text"><field name="TEXT">BLE-01</field></shadow></value></block>
      <block type="bleuart3_send_text"><value name="TEXT"><shadow type="text"><field name="TEXT">Hello</field></shadow></value></block>
      <block type="bleuart3_send1"><value name="VALUE1"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
      <block type="bleuart3_send2"><value name="VALUE1"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="VALUE2"><shadow type="math_number"><field name="NUM">2</field></shadow></value></block>
      <block type="bleuart3_send3"><value name="VALUE1"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="VALUE2"><shadow type="math_number"><field name="NUM">2</field></shadow></value><value name="VALUE3"><shadow type="math_number"><field name="NUM">3</field></shadow></value></block>
      <block type="bleuart3_send4"><value name="VALUE1"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="VALUE2"><shadow type="math_number"><field name="NUM">2</field></shadow></value><value name="VALUE3"><shadow type="math_number"><field name="NUM">3</field></shadow></value><value name="VALUE4"><shadow type="math_number"><field name="NUM">4</field></shadow></value></block>
      <block type="bleuart3_send5"><value name="VALUE1"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="VALUE2"><shadow type="math_number"><field name="NUM">2</field></shadow></value><value name="VALUE3"><shadow type="math_number"><field name="NUM">3</field></shadow></value><value name="VALUE4"><shadow type="math_number"><field name="NUM">4</field></shadow></value><value name="VALUE5"><shadow type="math_number"><field name="NUM">5</field></shadow></value></block>
      <block type="bleuart3_send6"><value name="VALUE1"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="VALUE2"><shadow type="math_number"><field name="NUM">2</field></shadow></value><value name="VALUE3"><shadow type="math_number"><field name="NUM">3</field></shadow></value><value name="VALUE4"><shadow type="math_number"><field name="NUM">4</field></shadow></value><value name="VALUE5"><shadow type="math_number"><field name="NUM">5</field></shadow></value><value name="VALUE6"><shadow type="math_number"><field name="NUM">6</field></shadow></value></block>
      <block type="bleuart3_send7"><value name="VALUE1"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="VALUE2"><shadow type="math_number"><field name="NUM">2</field></shadow></value><value name="VALUE3"><shadow type="math_number"><field name="NUM">3</field></shadow></value><value name="VALUE4"><shadow type="math_number"><field name="NUM">4</field></shadow></value><value name="VALUE5"><shadow type="math_number"><field name="NUM">5</field></shadow></value><value name="VALUE6"><shadow type="math_number"><field name="NUM">6</field></shadow></value><value name="VALUE7"><shadow type="math_number"><field name="NUM">7</field></shadow></value></block>
      <block type="bleuart3_send8"><value name="VALUE1"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="VALUE2"><shadow type="math_number"><field name="NUM">2</field></shadow></value><value name="VALUE3"><shadow type="math_number"><field name="NUM">3</field></shadow></value><value name="VALUE4"><shadow type="math_number"><field name="NUM">4</field></shadow></value><value name="VALUE5"><shadow type="math_number"><field name="NUM">5</field></shadow></value><value name="VALUE6"><shadow type="math_number"><field name="NUM">6</field></shadow></value><value name="VALUE7"><shadow type="math_number"><field name="NUM">7</field></shadow></value><value name="VALUE8"><shadow type="math_number"><field name="NUM">8</field></shadow></value></block>
      <block type="bleuart3_last_send"/>
    </category>`;
}
exports = addToolbox;
