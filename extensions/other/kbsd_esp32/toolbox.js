/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addToolbox () {
    return `
<category name="%{BKY_KBSD_CATEGORY}" id="KBSD_CATEGORY" colour="#42CCFF" secondaryColour="#42CCFF">
    <block type="kbsd_init" id="kbsd_init">
        <value name="cs"><shadow type="math_number"><field name="NUM">5</field></shadow></value>
    </block>
    <block type="kbsd_diagnose" id="kbsd_diagnose">
        <value name="cs"><shadow type="math_number"><field name="NUM">5</field></shadow></value>
    </block>
    <block type="kbsd_judge" id="kbsd_judge">
        <value name="file"><shadow type="text"><field name="TEXT">/file.txt</field></shadow></value>
    </block>
    <block type="kbsd_delete" id="kbsd_delete">
        <value name="file"><shadow type="text"><field name="TEXT">/file.txt</field></shadow></value>
    </block>
    <block type="kbsd_line_open" id="kbsd_line_open">
        <value name="file"><shadow type="text"><field name="TEXT">/file.txt</field></shadow></value>
    </block>
    <block type="kbsd_line_available" id="kbsd_line_available"></block>
    <block type="kbsd_line_read" id="kbsd_line_read"></block>
    <block type="kbsd_line_close" id="kbsd_line_close"></block>
    <block type="kbsd_write" id="kbsd_write">
        <value name="file"><shadow type="text"><field name="TEXT">/file.txt</field></shadow></value>
        <value name="data"><shadow type="text"><field name="TEXT">hello,world</field></shadow></value>
    </block>
</category>`;
}

exports = addToolbox;
