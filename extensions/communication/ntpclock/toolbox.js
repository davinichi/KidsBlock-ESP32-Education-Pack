/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addToolbox () {
  return `
    <category name="%{BKY_NTPCLOCK_CATEGORY}" id="NTPClock" colour="#4C97FF" secondaryColour="#3373CC">
      <block type="ntpclock_begin">
        <value name="SERVER"><shadow type="text"><field name="TEXT">ntp.nict.jp</field></shadow></value>
        <value name="OFFSET"><shadow type="math_number"><field name="NUM">9</field></shadow></value>
        <value name="INTERVAL"><shadow type="math_number"><field name="NUM">60000</field></shadow></value>
      </block>
      <block type="ntpclock_update"/>
      <sep gap="24"/>
      <block type="ntpclock_is_valid"/>
      <block type="ntpclock_epoch"/>
      <sep gap="24"/>
      <block type="ntpclock_year"/>
      <block type="ntpclock_month"/>
      <block type="ntpclock_day"/>
      <block type="ntpclock_hour"/>
      <block type="ntpclock_minute"/>
      <block type="ntpclock_second"/>
      <sep gap="24"/>
      <block type="ntpclock_date_text"/>
      <block type="ntpclock_time_text"/>
    </category>`;
}

exports = addToolbox;
