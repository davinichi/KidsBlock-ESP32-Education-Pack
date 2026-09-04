#pragma once
#include <Arduino.h>
#include <SPI.h>

class KBST7789 {
public:
  static const int16_t TFT_WIDTH = 170;
  static const int16_t TFT_HEIGHT = 320;
  static const int8_t PIN_MOSI = 23;
  static const int8_t PIN_SCLK = 18;
  static const int8_t PIN_CS = 15;
  static const int8_t PIN_DC = 2;
  static const int8_t PIN_RST = 4;
  static const int8_t PIN_BL = 32;

  KBST7789();
  void begin();
  void backlight(bool on);
  void setRotation(uint8_t r);
  int16_t width() const { return _width; }
  int16_t height() const { return _height; }
  uint16_t color565(uint8_t r, uint8_t g, uint8_t b) const;
  void fillScreen(uint16_t color);
  void drawPixel(int16_t x, int16_t y, uint16_t color);
  void drawLine(int16_t x0, int16_t y0, int16_t x1, int16_t y1, uint16_t color);
  void drawRect(int16_t x, int16_t y, int16_t w, int16_t h, uint16_t color);
  void fillRect(int16_t x, int16_t y, int16_t w, int16_t h, uint16_t color);
  void drawCircle(int16_t x0, int16_t y0, int16_t r, uint16_t color);
  void drawText(int16_t x, int16_t y, const String &text, uint16_t color = 0xFFFF, uint8_t size = 1);
  void drawNumber(int16_t x, int16_t y, double value, uint8_t digits = 1, uint16_t color = 0xFFFF, uint8_t size = 1);

private:
  int16_t _width;
  int16_t _height;
  uint8_t _rotation;
  uint16_t _xStart;
  uint16_t _yStart;
  SPIClass *_spi;

  void writeCommand(uint8_t cmd);
  void writeData(uint8_t data);
  void writeData16(uint16_t data);
  void setAddrWindow(int16_t x, int16_t y, int16_t w, int16_t h);
  void drawChar(int16_t x, int16_t y, char c, uint16_t color, uint8_t size);
  void glyph(char c, uint8_t out[5]) const;
};
