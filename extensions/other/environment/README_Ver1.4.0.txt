Environment Ver.1.4.0 for KidsBlock

Added LCD1602 display blocks:
- Display temperature with selectable decimal places (0-3) and a 1-cell custom ℃ symbol.
- Display absolute humidity with selectable decimal places (0-3) and a compact 2-cell custom g/m^3 icon.
- Select LCD row (1/2), column, and I2C address (0x27/0x3F).

LCD1602 CGRAM usage:
- Slot 0: ℃
- Slot 1: left half of compact g/m^3 icon
- Slot 2: right half of compact g/m^3 icon

The LCD blocks automatically generate LiquidCrystal_I2C initialization and createChar() setup code.
They are LCD1602-specific; the custom characters are not used by Serial.print().

Existing calculation blocks and APIs remain compatible with Ver.1.3.0.
