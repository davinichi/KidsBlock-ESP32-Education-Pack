# Release Notes

## Version 0.5 Preview

**Final preview release before Version 1.0**

Version 0.5 Preview focuses on stability, installation reliability, documentation consistency, and field testing.

## New extensions

### ESP-NOW ESP32 1.0.0

- Broadcast transmission when the destination MAC address is empty
- Unicast transmission to a specified MAC address
- String transmission and reception
- Source MAC address retrieval
- Receive and send-status condition blocks

### ESP32 System Information 1.1.2

- Chip, CPU, core, flash, heap, PSRAM, SDK, MAC address, and uptime value blocks
- Value blocks can be connected to standard output, LCD, HTTP Server, or storage blocks

## Major improvements

### HTTP Server 3.3.1

- Up to eight displayed data items
- Up to eight ON/OFF controls
- Up to eight radio-button selections
- Automatic hiding of unused sections
- Communication status always displayed
- Improved browser compatibility and cache handling
- Unified version display

### Data Processing 1.5.0

- Renamed from the former CSV-focused extension
- CSV parsing with configurable header rows
- UTF-8-aware string extraction
- String length
- Arbitrary-delimiter joining

### Installer and release tools

- SHA-256 package verification
- Automatic manifest generation
- Ten-extension installation
- Backup and update support
- Flat ZIP layout
- Verification after ZIP creation

## Included extensions

### Communication

1. WiFi Simple
2. HTTP Server
3. ThingSpeak
4. BLE UART 3
5. ESP-NOW ESP32

### Other

6. Environment
7. NTP Clock
8. KBSD ESP32
9. Data Processing
10. ESP32 System Information

## Release policy

Version 0.5 Preview is the final preview release. Until Version 1.0, development will prioritize:

- Field testing
- Bug fixes
- Installation reliability
- Documentation
- Compatibility and operational stability
