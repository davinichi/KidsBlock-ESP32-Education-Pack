# Release Notes

## Version 0.6 Preview

**Preview release for expanded field testing**

Version 0.6 Preview expands the Education Pack from 10 to 12 extensions and opens additional ESP-NOW and environmental-function testing to multiple testers.

## New extensions

### BME280
- Temperature, humidity, and atmospheric-pressure acquisition over I2C

### LCD1602 Symbols
- Reusable LCD1602 custom-symbol functions separated from Environment

## Major improvements

### Environment
- One selector block for ten environmental indices
- Individual wet-bulb temperature and estimated WBGT blocks retained for compatibility

### ESP-NOW ESP32
- Normal / Long Range mode switching
- Explicit PHY-rate setting for experiments
- Last-received RSSI retrieval
- Long Range and PHY-rate behavior remain under Preview evaluation

## Included extensions

Communication: WiFi Simple, HTTP Server, ThingSpeak, BLE UART 3, ESP-NOW ESP32

Sensor: BME280

Display: LCD1602 Symbols

Other: Environment, NTP Clock, KBSD ESP32, Data Processing, ESP32 System Information

**Total: 12 extensions**

## Release policy

Version 0.6 Preview is intended for broader field testing. Feedback on ESP-NOW behavior, environmental calculations, installation reliability, compatibility, and educational use will be reflected in development toward Version 1.0.
