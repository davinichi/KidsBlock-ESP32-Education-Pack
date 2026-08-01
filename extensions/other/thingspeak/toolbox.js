/* eslint-disable func-style */
function addToolbox () {
  return `
    <category name="%{BKY_THINGSPEAK_CATEGORY}" id="ThingSpeak" colour="#00A4A6" secondaryColour="#008184">
      <block type="thingspeak_begin">
        <value name="CHANNEL"><shadow type="math_number"><field name="NUM">123456</field></shadow></value>
        <value name="APIKEY"><shadow type="text"><field name="TEXT">WRITE_API_KEY</field></shadow></value>
      </block>
      <sep gap="24"/>
      <block type="thingspeak_send1"><value name="FIELD1"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
      <block type="thingspeak_send2"><value name="FIELD1"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD2"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
      <block type="thingspeak_send3"><value name="FIELD1"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD2"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD3"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
      <block type="thingspeak_send4"><value name="FIELD1"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD2"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD3"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD4"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
      <block type="thingspeak_send5"><value name="FIELD1"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD2"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD3"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD4"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD5"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
      <block type="thingspeak_send6"><value name="FIELD1"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD2"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD3"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD4"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD5"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD6"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
      <block type="thingspeak_send7"><value name="FIELD1"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD2"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD3"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD4"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD5"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD6"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD7"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
      <block type="thingspeak_send8"><value name="FIELD1"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD2"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD3"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD4"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD5"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD6"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD7"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FIELD8"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
      <sep gap="24"/>
      <block type="thingspeak_success"/>
      <block type="thingspeak_last_entry"/>
      <sep gap="24"/>
      <block type="thingspeak_read_latest">
        <value name="READ_CHANNEL"><shadow type="math_number"><field name="NUM">123456</field></shadow></value>
        <value name="READ_FIELD"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
        <value name="READ_APIKEY"><shadow type="text"><field name="TEXT">READ_API_KEY</field></shadow></value>
      </block>
      <block type="thingspeak_read_success"/>
      <block type="thingspeak_read_http_code"/>
      <block type="thingspeak_read_error"/>
    </category>`;
}
exports = addToolbox;
