Environment extension Ver.1.5.0

Changes from 1.4.1:
- Removed Environment-specific LCD1602 display/position/I2C blocks.
- Added two String reporter blocks for use as the value of KidsBlock's standard LCD1602 display block:
  * LCD1602 symbol ℃
  * LCD1602 symbol g/m³ (2 cells)
- Environment no longer calls LCD begin/backlight/setCursor or configures the I2C address.
- LCD coordinates remain entirely controlled by the standard LCD1602 block (0-based).
- Custom characters use CGRAM slots 5, 6 and 7 and are registered lazily when the reporter value is evaluated.

Important compatibility note:
The generator expects the standard KidsBlock LCD1602 extension's LiquidCrystal_I2C object to be named `lcd`.
If your installed LCD extension uses a different object name, its generator.js is needed to adapt this reference exactly.
