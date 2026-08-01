/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addBlocks (Blockly) {
    const color = '#42CCFF';

    Blockly.Blocks.kbsd_init = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBSD_INIT,
                args0: [{type: 'input_value', name: 'cs'}],
                colour: color,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.kbsd_diagnose = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBSD_DIAGNOSE,
                args0: [{type: 'input_value', name: 'cs'}],
                colour: color,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.kbsd_list = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBSD_LIST,
                colour: color,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.kbsd_type = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBSD_TYPE,
                colour: color,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.kbsd_var = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBSD_VAR,
                args0: [{
                    type: 'field_dropdown',
                    name: 'unit',
                    options: [
                        ['Card Size (MB)', 'CARD'],
                        ['Total (MB)', 'TOTAL'],
                        ['Used (MB)', 'USED'],
                        ['Free (MB)', 'FREE']
                    ]
                }],
                colour: color,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.kbsd_judge = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBSD_JUDGE,
                args0: [{type: 'input_value', name: 'file'}],
                colour: color,
                extensions: ['output_boolean']
            });
        }
    };

    Blockly.Blocks.kbsd_delete = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBSD_DELETE,
                args0: [{type: 'input_value', name: 'file'}],
                colour: color,
                extensions: ['shape_statement']
            });
        }
    };

    /* Ver.1.3 compatibility block. Not shown in the Ver.2.1 toolbox. */
    Blockly.Blocks.kbsd_read = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBSD_READ_SERIAL,
                args0: [{type: 'input_value', name: 'file'}],
                colour: color,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.kbsd_read_value = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBSD_READ_VALUE,
                args0: [{type: 'input_value', name: 'file'}],
                colour: color,
                /* output_number is used because it is confirmed to load in KidsBlock 2.0.5.
                   The generated C++ value is String and can be assigned to a variable. */
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.kbsd_line_open = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBSD_LINE_OPEN,
                args0: [{type: 'input_value', name: 'file'}],
                colour: color,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.kbsd_line_available = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBSD_LINE_AVAILABLE,
                colour: color,
                /* Boolean output allows connection to if/not/operator blocks. */
                extensions: ['output_boolean']
            });
        }
    };

    Blockly.Blocks.kbsd_line_read = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBSD_LINE_READ,
                colour: color,
                /* KidsBlock 2.0.5 compatibility: generated value is String. */
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.kbsd_line_close = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBSD_LINE_CLOSE,
                colour: color,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.kbsd_write = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBSD_WRITE,
                args0: [
                    {type: 'input_value', name: 'file'},
                    {type: 'input_value', name: 'data'},
                    {
                        type: 'field_dropdown',
                        name: 'unit',
                        options: [['Yes', 'datafile.println("");'], ['No', '']]
                    }
                ],
                colour: color,
                extensions: ['shape_statement']
            });
        }
    };

    return Blockly;
}

exports = addBlocks;
