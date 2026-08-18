/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addToolbox () {
    return `
<category name="%{BKY_BME280_CATEGORY}" id="BME280_CATEGORY" colour="#42CCFF" secondaryColour="#42CCFF">
    <block type="BME280_init">
        <field name="ADDRESS">0x76</field>
    </block>
    <block type="BME280_temperature"></block>
    <block type="BME280_humidity"></block>
    <block type="BME280_pressure"></block>
</category>`;
}

exports = addToolbox;
