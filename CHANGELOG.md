# Changelog

All notable changes to KidsBlock ESP32 Education Pack are documented here.

## v0.5 Preview — 2026-08

### Added

- ESP-NOW ESP32
- ESP32 System Information
- Japanese Quick Start, library guide, examples, installation guide, and preview license

### Changed

- Expanded the package from 8 to 10 extensions
- Renamed and expanded the CSV-oriented extension as Data Processing
- Updated HTTP Server with ON/OFF controls and radio-button controls
- Improved browser rendering and conditional section display
- Updated installer for ten extensions
- Added automatic manifest generation and ZIP verification to the release process
- Standardized documentation on Version 0.5 Preview and ten extensions

### Fixed

- Package verification failures caused by stale manifest hashes
- PowerShell pipeline return-value issue in the installer
- HTTP Server browser rendering issues
- HTTP Server JSON and JavaScript generation issues
- Old extension-version and category inconsistencies

## v0.3 Preview — 2026-07-31

### Changed

- Consolidated eight extension folders under `extensions/other`
- Set the CSV header-row default to 1
- Retained the KBSD SD-card diagnostic block
- Updated installer, verification manifest, backup, and uninstall support

## v0.2 Preview

### Added

- Expanded installer and Education Pack packaging for field testing

## v0.1 Preview — 2026-07-29

### Added

- Initial public preview
- Environment
- NTP Clock
- ThingSpeak
- Wi-Fi support
- Initial documentation and installer
