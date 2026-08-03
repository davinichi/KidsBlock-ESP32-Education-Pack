/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addMsg (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales.en, {
        ESP32_SYSTEM_INFO_CATEGORY: 'ESP32 System Information',
        ESP32_SYSTEM_INFO_CHIP_MODEL: 'ESP32 chip model',
        ESP32_SYSTEM_INFO_CHIP_REVISION: 'ESP32 chip revision',
        ESP32_SYSTEM_INFO_CHIP_CORES: 'ESP32 CPU core count',
        ESP32_SYSTEM_INFO_CPU_FREQUENCY: 'ESP32 CPU frequency (MHz)',
        ESP32_SYSTEM_INFO_ARDUINO_CORE: 'Arduino ESP32 Core version',
        ESP32_SYSTEM_INFO_ESP_IDF: 'ESP-IDF version',
        ESP32_SYSTEM_INFO_MAC: 'ESP32 Wi-Fi MAC address',
        ESP32_SYSTEM_INFO_FLASH_SIZE: 'ESP32 flash size (bytes)',
        ESP32_SYSTEM_INFO_FLASH_SPEED: 'ESP32 flash speed (MHz)',
        ESP32_SYSTEM_INFO_SKETCH_SIZE: 'ESP32 sketch size (bytes)',
        ESP32_SYSTEM_INFO_FREE_SKETCH: 'ESP32 free sketch space (bytes)',
        ESP32_SYSTEM_INFO_HEAP_SIZE: 'ESP32 total heap (bytes)',
        ESP32_SYSTEM_INFO_FREE_HEAP: 'ESP32 free heap (bytes)',
        ESP32_SYSTEM_INFO_MIN_FREE_HEAP: 'ESP32 minimum free heap (bytes)',
        ESP32_SYSTEM_INFO_MAX_ALLOC_HEAP: 'ESP32 largest free heap block (bytes)',
        ESP32_SYSTEM_INFO_PSRAM_SIZE: 'ESP32 PSRAM size (bytes)',
        ESP32_SYSTEM_INFO_FREE_PSRAM: 'ESP32 free PSRAM (bytes)',
        ESP32_SYSTEM_INFO_UPTIME: 'ESP32 uptime (seconds)',
        ESP32_SYSTEM_INFO_PRINT: 'print ESP32 system information to serial monitor'
    });
    Object.assign(Blockly.ScratchMsgs.locales['ja'], {
        ESP32_SYSTEM_INFO_CATEGORY: 'ESP32システム情報',
        ESP32_SYSTEM_INFO_CHIP_MODEL: 'ESP32のチップモデル',
        ESP32_SYSTEM_INFO_CHIP_REVISION: 'ESP32のチップリビジョン',
        ESP32_SYSTEM_INFO_CHIP_CORES: 'ESP32のCPUコア数',
        ESP32_SYSTEM_INFO_CPU_FREQUENCY: 'ESP32のCPU周波数（MHz）',
        ESP32_SYSTEM_INFO_ARDUINO_CORE: 'Arduino ESP32 Coreのバージョン',
        ESP32_SYSTEM_INFO_ESP_IDF: 'ESP-IDFのバージョン',
        ESP32_SYSTEM_INFO_MAC: 'ESP32のWi-Fi MACアドレス',
        ESP32_SYSTEM_INFO_FLASH_SIZE: 'ESP32のフラッシュ容量（バイト）',
        ESP32_SYSTEM_INFO_FLASH_SPEED: 'ESP32のフラッシュ速度（MHz）',
        ESP32_SYSTEM_INFO_SKETCH_SIZE: 'ESP32のスケッチ使用容量（バイト）',
        ESP32_SYSTEM_INFO_FREE_SKETCH: 'ESP32の空きスケッチ領域（バイト）',
        ESP32_SYSTEM_INFO_HEAP_SIZE: 'ESP32のヒープ総量（バイト）',
        ESP32_SYSTEM_INFO_FREE_HEAP: 'ESP32の空きヒープ（バイト）',
        ESP32_SYSTEM_INFO_MIN_FREE_HEAP: 'ESP32の最小空きヒープ（バイト）',
        ESP32_SYSTEM_INFO_MAX_ALLOC_HEAP: 'ESP32の最大連続空き領域（バイト）',
        ESP32_SYSTEM_INFO_PSRAM_SIZE: 'ESP32のPSRAM容量（バイト）',
        ESP32_SYSTEM_INFO_FREE_PSRAM: 'ESP32の空きPSRAM（バイト）',
        ESP32_SYSTEM_INFO_UPTIME: 'ESP32の稼働時間（秒）',
        ESP32_SYSTEM_INFO_PRINT: 'ESP32のシステム情報をシリアルに表示する'
    });
    return Blockly;
}

exports = addMsg;
