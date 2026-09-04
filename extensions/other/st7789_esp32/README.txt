ST7789 TFT ESP32 - TEST EXTENSION 0.1.0
KidsBlock ESP32 Education Pack v0.7 development test
Author: davinichi

Target board:
- ESP32-WROOM-32 + integrated 1.9 inch ST7789 TFT
- Resolution: 170 x 320
- SPI pins fixed by board:
  MOSI GPIO23
  SCLK GPIO18
  CS   GPIO15
  DC   GPIO2
  RST  GPIO4
  BL   GPIO32

Important:
- The board seller description may mention I2C, but the supplied pin mapping is SPI.
- This test library uses a common 170x320 ST7789 panel offset of X=35, Y=0.
- If the picture is shifted or clipped, adjust _xStart/_yStart in KBST7789.cpp after real-device testing.
- The built-in compact text renderer supports ASCII letters (displayed as uppercase), numbers, and common symbols. Japanese characters are not supported in this test version.
