Environment v1.5.1

LCD1602 symbol block integration update:
- Uses the standard KidsBlock LCD object: lcd
- Does NOT initialize Wire/I2C or the LCD
- Does NOT set the cursor
- Registers CGRAM symbols once in setup() via lcd.createChar()
- Symbol reporter blocks only return display data:
  * degree C: CGRAM slot 5 (1 LCD cell)
  * g/m3 compact icon: CGRAM slots 6 + 7 (2 LCD cells)
- Intended to be passed to the standard LCD1602 display/print block.

Expected setup order after standard LCD initialization:
  lcd.begin();
  lcd.backlight();
  lcd.createChar(5, environmentCharDegC);
  lcd.createChar(6, environmentCharGmLeft);
  lcd.createChar(7, environmentCharGmRight);
