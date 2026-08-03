/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addToolbox () {
    return `
<category name="%{BKY_ESP32_SYSTEM_INFO_CATEGORY}" id="ESP32_SYSTEM_INFO_CATEGORY" colour="#4E6E81" secondaryColour="#4E6E81">
    <block type="esp32_system_info_chip_model" id="esp32_system_info_chip_model"></block>
    <block type="esp32_system_info_chip_revision" id="esp32_system_info_chip_revision"></block>
    <block type="esp32_system_info_chip_cores" id="esp32_system_info_chip_cores"></block>
    <block type="esp32_system_info_cpu_frequency" id="esp32_system_info_cpu_frequency"></block>
    <block type="esp32_system_info_arduino_core" id="esp32_system_info_arduino_core"></block>
    <block type="esp32_system_info_esp_idf" id="esp32_system_info_esp_idf"></block>
    <block type="esp32_system_info_mac" id="esp32_system_info_mac"></block>
    <block type="esp32_system_info_flash_size" id="esp32_system_info_flash_size"></block>
    <block type="esp32_system_info_flash_speed" id="esp32_system_info_flash_speed"></block>
    <block type="esp32_system_info_sketch_size" id="esp32_system_info_sketch_size"></block>
    <block type="esp32_system_info_free_sketch" id="esp32_system_info_free_sketch"></block>
    <block type="esp32_system_info_heap_size" id="esp32_system_info_heap_size"></block>
    <block type="esp32_system_info_free_heap" id="esp32_system_info_free_heap"></block>
    <block type="esp32_system_info_min_free_heap" id="esp32_system_info_min_free_heap"></block>
    <block type="esp32_system_info_max_alloc_heap" id="esp32_system_info_max_alloc_heap"></block>
    <block type="esp32_system_info_psram_size" id="esp32_system_info_psram_size"></block>
    <block type="esp32_system_info_free_psram" id="esp32_system_info_free_psram"></block>
    <block type="esp32_system_info_uptime" id="esp32_system_info_uptime"></block>
</category>`;
}

exports = addToolbox;
