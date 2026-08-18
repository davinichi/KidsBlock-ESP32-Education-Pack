/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addBlocks (Blockly) {
    const color = '#42CCFF';
    const bmeIconUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNDAiIGhlaWdodD0iMTYwIiB2aWV3Qm94PSIwIDAgMjQwIDE2MCI+CiAgPHJlY3QgeD0iOCIgeT0iOCIgd2lkdGg9IjIyNCIgaGVpZ2h0PSIxNDQiIHJ4PSIxNiIgZmlsbD0iIzAwYTBlOSIvPgogIDxyZWN0IHg9IjU0IiB5PSI0MiIgd2lkdGg9IjEzMiIgaGVpZ2h0PSI3NiIgcng9IjgiIGZpbGw9IiNmZmZmZmYiLz4KICA8dGV4dCB4PSIxMjAiIHk9Ijg4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzAiIGZpbGw9IiMwMGEwZTkiPkJNRTI4MDwvdGV4dD4KICA8dGV4dCB4PSIxMjAiIHk9IjExMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNTU1NTU1Ij5URU1QIC8gUkggLyBoUGE8L3RleHQ+Cjwvc3ZnPgo=';

    Blockly.Blocks.BME280_init = {
        init: function () {
            this.jsonInit({
                message0: '%1',
                message1: Blockly.Msg.BME280_INIT,
                args0: [
                    {
                        type: 'field_image',
                        src: bmeIconUrl,
                        width: 50,
                        height: 30
                    }
                ],
                args1: [
                    {
                        type: 'field_dropdown',
                        name: 'ADDRESS',
                        options: [
                            ['0x76', '0x76'],
                            ['0x77', '0x77']
                        ]
                    }
                ],
                colour: color,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.BME280_temperature = {
        init: function () {
            this.jsonInit({
                message0: '%1',
                message1: Blockly.Msg.BME280_TEMPERATURE,
                args0: [{type: 'field_image', src: bmeIconUrl, width: 50, height: 30}],
                colour: color,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.BME280_humidity = {
        init: function () {
            this.jsonInit({
                message0: '%1',
                message1: Blockly.Msg.BME280_HUMIDITY,
                args0: [{type: 'field_image', src: bmeIconUrl, width: 50, height: 30}],
                colour: color,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.BME280_pressure = {
        init: function () {
            this.jsonInit({
                message0: '%1',
                message1: Blockly.Msg.BME280_PRESSURE,
                args0: [{type: 'field_image', src: bmeIconUrl, width: 50, height: 30}],
                colour: color,
                extensions: ['output_number']
            });
        }
    };

    return Blockly;
}

exports = addBlocks;
