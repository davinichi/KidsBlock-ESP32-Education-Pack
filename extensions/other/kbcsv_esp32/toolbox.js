/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addToolbox () {
    return `
<category name="%{BKY_KBCSV_CATEGORY}" id="KBCSV_CATEGORY" colour="#FF9F43" secondaryColour="#FF9F43">
    <block type="kbcsv_set_header_rows" id="kbcsv_set_header_rows">
        <value name="rows"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
    </block>
    <block type="kbcsv_split" id="kbcsv_split">
        <value name="data"><shadow type="text"><field name="TEXT">2026/08/01,10:30:00,28.5,65.2</field></shadow></value>
    </block>
    <block type="kbcsv_text" id="kbcsv_text"></block>
    <block type="kbcsv_number" id="kbcsv_number"></block>
    <block type="kbcsv_success" id="kbcsv_success"></block>
    <sep gap="24"></sep>
    <block type="kbdata_text_left" id="kbdata_text_left">
        <value name="text"><shadow type="text"><field name="TEXT">ABC富山県</field></shadow></value>
        <value name="count"><shadow type="math_number"><field name="NUM">3</field></shadow></value>
    </block>
    <block type="kbdata_text_right" id="kbdata_text_right">
        <value name="text"><shadow type="text"><field name="TEXT">ABC富山県</field></shadow></value>
        <value name="count"><shadow type="math_number"><field name="NUM">3</field></shadow></value>
    </block>
    <block type="kbdata_text_length" id="kbdata_text_length">
        <value name="text"><shadow type="text"><field name="TEXT">ABC富山県</field></shadow></value>
    </block>
    <block type="kbdata_text_from" id="kbdata_text_from">
        <value name="text"><shadow type="text"><field name="TEXT">2026/08/01</field></shadow></value>
        <value name="start"><shadow type="math_number"><field name="NUM">6</field></shadow></value>
    </block>
    <block type="kbdata_text_mid" id="kbdata_text_mid">
        <value name="text"><shadow type="text"><field name="TEXT">ABCDEFG</field></shadow></value>
        <value name="start"><shadow type="math_number"><field name="NUM">3</field></shadow></value>
        <value name="count"><shadow type="math_number"><field name="NUM">2</field></shadow></value>
    </block>

    <block type="kbdata_text_join_separator" id="kbdata_text_join_separator">
        <value name="text1"><shadow type="text"><field name="TEXT">25.6</field></shadow></value>
        <value name="text2"><shadow type="text"><field name="TEXT">60</field></shadow></value>
        <value name="separator"><shadow type="text"><field name="TEXT">,</field></shadow></value>
    </block>

</category>`;
}

exports = addToolbox;
