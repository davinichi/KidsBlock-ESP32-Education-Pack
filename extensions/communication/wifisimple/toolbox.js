/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addToolbox () {
  return `
    <category name="%{BKY_WIFISIMPLE_CATEGORY}" id="WiFiSimple" colour="#0FBD8C" secondaryColour="#0B8E69">
      <block type="wifisimple_connect">
        <value name="SSID"><shadow type="text"><field name="TEXT">Wi-Fi SSID</field></shadow></value>
        <value name="PASSWORD"><shadow type="text"><field name="TEXT">password</field></shadow></value>
      </block>
      <block type="wifisimple_wait"/>
      <block type="wifisimple_disconnect"/>
      <sep gap="24"/>
      <block type="wifisimple_is_connected"/>
      <block type="wifisimple_ip"/>
      <block type="wifisimple_ssid"/>
      <block type="wifisimple_rssi"/>
    </category>`;
}

exports = addToolbox;
