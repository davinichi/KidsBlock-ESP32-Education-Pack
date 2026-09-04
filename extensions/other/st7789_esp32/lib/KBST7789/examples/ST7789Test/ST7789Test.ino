#include <KBST7789.h>
KBST7789 tft;
void setup() {
  tft.begin();
  tft.fillScreen(0x0000);
  tft.drawText(10, 20, "HELLO ESP32", 0xFFFF, 2);
  tft.drawNumber(10, 50, 26.4, 1, 0xFFE0, 2);
  tft.drawRect(5, 5, 160, 100, 0x07FF);
}
void loop() {}
