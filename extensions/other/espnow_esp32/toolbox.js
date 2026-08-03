/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addToolbox () {
  return `
<category name="%{BKY_ESPNOW_CATEGORY}" id="ESPNOW_CATEGORY" colour="#1769AA" secondaryColour="#0D4775">
  <block type="espnow_begin" id="espnow_begin"></block>
  <block type="espnow_is_ready" id="espnow_is_ready"></block>
  <sep gap="24"/>
  <block type="espnow_send_text" id="espnow_send_text">
    <value name="DATA"><shadow type="text"><field name="TEXT">TX-01,28.5,65.0</field></shadow></value>
    <value name="MAC"><shadow type="text"><field name="TEXT"></field></shadow></value>
  </block>
  <block type="espnow_last_send_success" id="espnow_last_send_success"></block>
  <sep gap="24"/>
  <block type="espnow_has_new_data" id="espnow_has_new_data"></block>
  <block type="espnow_received_text" id="espnow_received_text"></block>
  <block type="espnow_sender_mac" id="espnow_sender_mac"></block>
</category>`;
}

exports = addToolbox;
