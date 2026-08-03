/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
    function addMacSupport () {
        Blockly.Arduino.includes_.esp32_system_info_arduino = '#include <Arduino.h>';
        Blockly.Arduino.includes_.esp32_system_info_mac = '#include <esp_mac.h>';
        Blockly.Arduino.definitions_.esp32_system_info_mac_function = `String kbEsp32SystemInfoMac() {
  uint8_t mac[6] = {0};
  esp_read_mac(mac, ESP_MAC_WIFI_STA);
  char text[18];
  snprintf(text, sizeof(text), "%02X:%02X:%02X:%02X:%02X:%02X",
           mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
  return String(text);
}`;
    }

    function addCoreVersionSupport () {
        Blockly.Arduino.includes_.esp32_system_info_arduino = '#include <Arduino.h>';
        Blockly.Arduino.definitions_.esp32_system_info_core_version_function = `String kbEsp32SystemInfoCoreVersion() {
#ifdef ESP_ARDUINO_VERSION_STR
  return String(ESP_ARDUINO_VERSION_STR);
#else
  return String("取得できません");
#endif
}`;
    }

    Blockly.Arduino.esp32_system_info_chip_model = function () {
        return ['String(ESP.getChipModel())', Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.esp32_system_info_chip_revision = function () {
        return ['ESP.getChipRevision()', Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.esp32_system_info_chip_cores = function () {
        return ['ESP.getChipCores()', Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.esp32_system_info_cpu_frequency = function () {
        return ['ESP.getCpuFreqMHz()', Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.esp32_system_info_arduino_core = function () {
        addCoreVersionSupport();
        return ['kbEsp32SystemInfoCoreVersion()', Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.esp32_system_info_esp_idf = function () {
        return ['String(ESP.getSdkVersion())', Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.esp32_system_info_mac = function () {
        addMacSupport();
        return ['kbEsp32SystemInfoMac()', Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.esp32_system_info_flash_size = function () {
        return ['ESP.getFlashChipSize()', Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.esp32_system_info_flash_speed = function () {
        return ['(ESP.getFlashChipSpeed() / 1000000UL)', Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.esp32_system_info_sketch_size = function () {
        return ['ESP.getSketchSize()', Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.esp32_system_info_free_sketch = function () {
        return ['ESP.getFreeSketchSpace()', Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.esp32_system_info_heap_size = function () {
        return ['ESP.getHeapSize()', Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.esp32_system_info_free_heap = function () {
        return ['ESP.getFreeHeap()', Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.esp32_system_info_min_free_heap = function () {
        return ['ESP.getMinFreeHeap()', Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.esp32_system_info_max_alloc_heap = function () {
        return ['ESP.getMaxAllocHeap()', Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.esp32_system_info_psram_size = function () {
        return ['ESP.getPsramSize()', Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.esp32_system_info_free_psram = function () {
        return ['ESP.getFreePsram()', Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.esp32_system_info_uptime = function () {
        return ['(millis() / 1000UL)', Blockly.Arduino.ORDER_ATOMIC];
    };

    // Compatibility generator for Ver.1.0.0 saved projects.
    Blockly.Arduino.esp32_system_info_print = function () {
        addMacSupport();
        addCoreVersionSupport();
        Blockly.Arduino.definitions_.esp32_system_info_print_compat = `void kbEsp32PrintBytes(const char *label, uint64_t bytes) {
  Serial.print(label);
  Serial.print(bytes);
  Serial.print(" バイト (");
  Serial.print((double)bytes / 1024.0, 1);
  Serial.println(" KB)");
}

void kbEsp32PrintSystemInfo() {
  Serial.println("================================");
  Serial.println(" ESP32 システム情報 Ver.1.1.2");
  Serial.println("================================");
  Serial.print("チップモデル         : "); Serial.println(ESP.getChipModel());
  Serial.print("チップリビジョン     : "); Serial.println(ESP.getChipRevision());
  Serial.print("CPUコア数            : "); Serial.println(ESP.getChipCores());
  Serial.print("CPU周波数            : "); Serial.print(ESP.getCpuFreqMHz()); Serial.println(" MHz");
  Serial.print("Arduino ESP32 Core   : "); Serial.println(kbEsp32SystemInfoCoreVersion());
  Serial.print("ESP-IDF              : "); Serial.println(ESP.getSdkVersion());
  Serial.print("Wi-Fi STA MAC        : "); Serial.println(kbEsp32SystemInfoMac());
  Serial.println("--------------------------------");
  kbEsp32PrintBytes("フラッシュ容量       : ", ESP.getFlashChipSize());
  Serial.print("フラッシュ速度       : "); Serial.print(ESP.getFlashChipSpeed() / 1000000UL); Serial.println(" MHz");
  kbEsp32PrintBytes("スケッチ使用容量     : ", ESP.getSketchSize());
  kbEsp32PrintBytes("空きスケッチ領域     : ", ESP.getFreeSketchSpace());
  Serial.println("--------------------------------");
  kbEsp32PrintBytes("ヒープ総量           : ", ESP.getHeapSize());
  kbEsp32PrintBytes("現在の空きヒープ     : ", ESP.getFreeHeap());
  kbEsp32PrintBytes("起動後の最小空き     : ", ESP.getMinFreeHeap());
  kbEsp32PrintBytes("最大連続空き領域     : ", ESP.getMaxAllocHeap());
  Serial.println("--------------------------------");
  kbEsp32PrintBytes("PSRAM容量            : ", ESP.getPsramSize());
  kbEsp32PrintBytes("PSRAM空き容量        : ", ESP.getFreePsram());
  Serial.print("稼働時間             : "); Serial.print(millis() / 1000UL); Serial.println(" 秒");
  Serial.println("================================");
}`;
        return 'kbEsp32PrintSystemInfo();\n';
    };

    return Blockly;
}

exports = addGenerator;
