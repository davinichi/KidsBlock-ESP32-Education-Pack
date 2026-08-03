/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addBlocks (Blockly) {
    const color = '#4E6E81';
    // KidsBlock 2.0.5では、文字列・数値とも丸形の値ブロックとして表示します。

    Blockly.Blocks.esp32_system_info_chip_model = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_CHIP_MODEL, colour: color, extensions: ['output_number']}); }
    };
    Blockly.Blocks.esp32_system_info_chip_revision = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_CHIP_REVISION, colour: color, extensions: ['output_number']}); }
    };
    Blockly.Blocks.esp32_system_info_chip_cores = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_CHIP_CORES, colour: color, extensions: ['output_number']}); }
    };
    Blockly.Blocks.esp32_system_info_cpu_frequency = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_CPU_FREQUENCY, colour: color, extensions: ['output_number']}); }
    };
    Blockly.Blocks.esp32_system_info_arduino_core = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_ARDUINO_CORE, colour: color, extensions: ['output_number']}); }
    };
    Blockly.Blocks.esp32_system_info_esp_idf = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_ESP_IDF, colour: color, extensions: ['output_number']}); }
    };
    Blockly.Blocks.esp32_system_info_mac = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_MAC, colour: color, extensions: ['output_number']}); }
    };
    Blockly.Blocks.esp32_system_info_flash_size = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_FLASH_SIZE, colour: color, extensions: ['output_number']}); }
    };
    Blockly.Blocks.esp32_system_info_flash_speed = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_FLASH_SPEED, colour: color, extensions: ['output_number']}); }
    };
    Blockly.Blocks.esp32_system_info_sketch_size = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_SKETCH_SIZE, colour: color, extensions: ['output_number']}); }
    };
    Blockly.Blocks.esp32_system_info_free_sketch = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_FREE_SKETCH, colour: color, extensions: ['output_number']}); }
    };
    Blockly.Blocks.esp32_system_info_heap_size = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_HEAP_SIZE, colour: color, extensions: ['output_number']}); }
    };
    Blockly.Blocks.esp32_system_info_free_heap = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_FREE_HEAP, colour: color, extensions: ['output_number']}); }
    };
    Blockly.Blocks.esp32_system_info_min_free_heap = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_MIN_FREE_HEAP, colour: color, extensions: ['output_number']}); }
    };
    Blockly.Blocks.esp32_system_info_max_alloc_heap = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_MAX_ALLOC_HEAP, colour: color, extensions: ['output_number']}); }
    };
    Blockly.Blocks.esp32_system_info_psram_size = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_PSRAM_SIZE, colour: color, extensions: ['output_number']}); }
    };
    Blockly.Blocks.esp32_system_info_free_psram = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_FREE_PSRAM, colour: color, extensions: ['output_number']}); }
    };
    Blockly.Blocks.esp32_system_info_uptime = {
        init: function () { this.jsonInit({message0: Blockly.Msg.ESP32_SYSTEM_INFO_UPTIME, colour: color, extensions: ['output_number']}); }
    };

    // Ver.1.0.0 projects can still be opened. This block is not shown in the toolbox.
    Blockly.Blocks.esp32_system_info_print = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESP32_SYSTEM_INFO_PRINT,
                colour: color,
                extensions: ['shape_statement']
            });
        }
    };

    return Blockly;
}

exports = addBlocks;
