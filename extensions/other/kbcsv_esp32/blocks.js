/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addBlocks (Blockly) {
    const color = '#FF9F43';
    const itemOptions = [
        ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'],
        ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8']
    ];

    Blockly.Blocks.kbcsv_set_header_rows = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBCSV_SET_HEADER_ROWS,
                args0: [{type: 'input_value', name: 'rows'}],
                colour: color,
                extensions: ['shape_statement']
            });
        }
    };

    /* Kept for compatibility with saved projects. Not shown in the toolbox. */
    Blockly.Blocks.kbcsv_reset_line = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBCSV_RESET_LINE,
                colour: color,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.kbcsv_split = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBCSV_SPLIT,
                args0: [{type: 'input_value', name: 'data'}],
                colour: color,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.kbcsv_text = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBCSV_TEXT,
                args0: [{
                    type: 'field_dropdown',
                    name: 'item',
                    options: itemOptions
                }],
                colour: color,
                /* KidsBlock 2.0.5 uses this value shape for String results. */
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.kbcsv_number = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBCSV_NUMBER,
                args0: [{
                    type: 'field_dropdown',
                    name: 'item',
                    options: itemOptions
                }],
                colour: color,
                extensions: ['output_number']
            });
        }
    };

    /* Kept for compatibility and advanced use. Not shown in the toolbox. */
    Blockly.Blocks.kbcsv_count = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBCSV_COUNT,
                colour: color,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.kbcsv_success = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBCSV_SUCCESS,
                colour: color,
                extensions: ['output_boolean']
            });
        }
    };

    Blockly.Blocks.kbdata_text_left = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBDATA_TEXT_LEFT,
                args0: [
                    {type: 'input_value', name: 'text'},
                    {type: 'input_value', name: 'count'}
                ],
                colour: color,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.kbdata_text_right = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBDATA_TEXT_RIGHT,
                args0: [
                    {type: 'input_value', name: 'text'},
                    {type: 'input_value', name: 'count'}
                ],
                colour: color,
                extensions: ['output_number']
            });
        }
    };


    Blockly.Blocks.kbdata_text_length = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBDATA_TEXT_LENGTH,
                args0: [
                    {type: 'input_value', name: 'text'}
                ],
                colour: color,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.kbdata_text_from = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBDATA_TEXT_FROM,
                args0: [
                    {type: 'input_value', name: 'text'},
                    {type: 'input_value', name: 'start'}
                ],
                colour: color,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.kbdata_text_mid = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBDATA_TEXT_MID,
                args0: [
                    {type: 'input_value', name: 'text'},
                    {type: 'input_value', name: 'start'},
                    {type: 'input_value', name: 'count'}
                ],
                colour: color,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.kbdata_text_join = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBDATA_TEXT_JOIN,
                args0: [
                    {type: 'input_value', name: 'text1'},
                    {type: 'input_value', name: 'text2'}
                ],
                colour: color,
                extensions: ['output_number']
            });
        }
    };


    Blockly.Blocks.kbdata_text_join_separator = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.KBDATA_TEXT_JOIN_SEPARATOR,
                args0: [
                    {type: 'input_value', name: 'text1'},
                    {type: 'input_value', name: 'text2'},
                    {type: 'input_value', name: 'separator'}
                ],
                colour: color,
                extensions: ['output_number']
            });
        }
    };

    return Blockly;
}

exports = addBlocks;
