Environment Ver.1.4.1 for KidsBlock

LCD1602 compatibility fix:
- Changed LiquidCrystal_I2C initialization from init() to begin().
- Compatible with KidsBlock bundled legacy fdebrabander Arduino-LiquidCrystal-I2C-library.
- Updated bundled Environment library.properties version to 1.4.1.

LCD blocks:
- LCD1602 temperature display with selectable 0-3 decimal places and custom degree-C character.
- LCD1602 absolute-humidity display with selectable 0-3 decimal places and compact two-cell g/m^3 icon.

Existing Environment calculation blocks remain compatible.
