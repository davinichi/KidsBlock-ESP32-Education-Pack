#include "KBST7789.h"
#include <math.h>

#define ST77XX_SWRESET 0x01
#define ST77XX_SLPOUT  0x11
#define ST77XX_COLMOD  0x3A
#define ST77XX_MADCTL  0x36
#define ST77XX_CASET   0x2A
#define ST77XX_RASET   0x2B
#define ST77XX_RAMWR   0x2C
#define ST77XX_INVON   0x21
#define ST77XX_NORON   0x13
#define ST77XX_DISPON  0x29
#define MADCTL_MY 0x80
#define MADCTL_MX 0x40
#define MADCTL_MV 0x20
#define MADCTL_RGB 0x00

KBST7789::KBST7789() : _width(TFT_WIDTH), _height(TFT_HEIGHT), _rotation(0), _xStart(35), _yStart(0), _spi(&SPI) {}

void KBST7789::begin() {
  pinMode(PIN_CS, OUTPUT); pinMode(PIN_DC, OUTPUT); pinMode(PIN_RST, OUTPUT); pinMode(PIN_BL, OUTPUT);
  digitalWrite(PIN_CS, HIGH); digitalWrite(PIN_BL, HIGH);
  _spi->begin(PIN_SCLK, -1, PIN_MOSI, PIN_CS);
  digitalWrite(PIN_RST, HIGH); delay(10); digitalWrite(PIN_RST, LOW); delay(20); digitalWrite(PIN_RST, HIGH); delay(120);
  writeCommand(ST77XX_SWRESET); delay(150);
  writeCommand(ST77XX_SLPOUT); delay(120);
  writeCommand(ST77XX_COLMOD); writeData(0x55); delay(10);
  writeCommand(ST77XX_INVON);
  writeCommand(ST77XX_NORON); delay(10);
  setRotation(0);
  writeCommand(ST77XX_DISPON); delay(100);
  fillScreen(0x0000);
}

void KBST7789::backlight(bool on) { digitalWrite(PIN_BL, on ? HIGH : LOW); }
uint16_t KBST7789::color565(uint8_t r, uint8_t g, uint8_t b) const { return (uint16_t)((r & 0xF8) << 8) | (uint16_t)((g & 0xFC) << 3) | (b >> 3); }

void KBST7789::writeCommand(uint8_t cmd) {
  _spi->beginTransaction(SPISettings(40000000, MSBFIRST, SPI_MODE0)); digitalWrite(PIN_CS, LOW); digitalWrite(PIN_DC, LOW);
  _spi->transfer(cmd); digitalWrite(PIN_CS, HIGH); _spi->endTransaction();
}
void KBST7789::writeData(uint8_t data) {
  _spi->beginTransaction(SPISettings(40000000, MSBFIRST, SPI_MODE0)); digitalWrite(PIN_CS, LOW); digitalWrite(PIN_DC, HIGH);
  _spi->transfer(data); digitalWrite(PIN_CS, HIGH); _spi->endTransaction();
}
void KBST7789::writeData16(uint16_t data) {
  _spi->beginTransaction(SPISettings(40000000, MSBFIRST, SPI_MODE0)); digitalWrite(PIN_CS, LOW); digitalWrite(PIN_DC, HIGH);
  _spi->transfer(data >> 8); _spi->transfer(data & 0xFF); digitalWrite(PIN_CS, HIGH); _spi->endTransaction();
}

void KBST7789::setRotation(uint8_t r) {
  _rotation = r & 3; uint8_t madctl = MADCTL_RGB;
  switch (_rotation) {
    case 0: madctl = MADCTL_MX | MADCTL_MY | MADCTL_RGB; _width = 170; _height = 320; _xStart = 35; _yStart = 0; break;
    case 1: madctl = MADCTL_MY | MADCTL_MV | MADCTL_RGB; _width = 320; _height = 170; _xStart = 0; _yStart = 35; break;
    case 2: madctl = MADCTL_RGB; _width = 170; _height = 320; _xStart = 35; _yStart = 0; break;
    default: madctl = MADCTL_MX | MADCTL_MV | MADCTL_RGB; _width = 320; _height = 170; _xStart = 0; _yStart = 35; break;
  }
  writeCommand(ST77XX_MADCTL); writeData(madctl);
}

void KBST7789::setAddrWindow(int16_t x, int16_t y, int16_t w, int16_t h) {
  uint16_t x0 = x + _xStart, x1 = x0 + w - 1, y0 = y + _yStart, y1 = y0 + h - 1;
  writeCommand(ST77XX_CASET); writeData16(x0); writeData16(x1);
  writeCommand(ST77XX_RASET); writeData16(y0); writeData16(y1);
  writeCommand(ST77XX_RAMWR);
}

void KBST7789::fillRect(int16_t x, int16_t y, int16_t w, int16_t h, uint16_t color) {
  if (w <= 0 || h <= 0 || x >= _width || y >= _height || x + w <= 0 || y + h <= 0) return;
  if (x < 0) { w += x; x = 0; } if (y < 0) { h += y; y = 0; }
  if (x + w > _width) w = _width - x; if (y + h > _height) h = _height - y;
  setAddrWindow(x, y, w, h);
  uint32_t count = (uint32_t)w * h;
  _spi->beginTransaction(SPISettings(40000000, MSBFIRST, SPI_MODE0)); digitalWrite(PIN_CS, LOW); digitalWrite(PIN_DC, HIGH);
  uint8_t hi = color >> 8, lo = color & 0xFF;
  while (count--) { _spi->transfer(hi); _spi->transfer(lo); }
  digitalWrite(PIN_CS, HIGH); _spi->endTransaction();
}
void KBST7789::fillScreen(uint16_t color) { fillRect(0, 0, _width, _height, color); }
void KBST7789::drawPixel(int16_t x, int16_t y, uint16_t color) { if (x < 0 || y < 0 || x >= _width || y >= _height) return; fillRect(x, y, 1, 1, color); }
void KBST7789::drawRect(int16_t x, int16_t y, int16_t w, int16_t h, uint16_t c) { fillRect(x,y,w,1,c); fillRect(x,y+h-1,w,1,c); fillRect(x,y,1,h,c); fillRect(x+w-1,y,1,h,c); }

void KBST7789::drawLine(int16_t x0, int16_t y0, int16_t x1, int16_t y1, uint16_t c) {
  int16_t dx = abs(x1-x0), sx = x0 < x1 ? 1 : -1, dy = -abs(y1-y0), sy = y0 < y1 ? 1 : -1, err = dx + dy;
  while (true) { drawPixel(x0,y0,c); if (x0==x1 && y0==y1) break; int16_t e2=2*err; if(e2>=dy){err+=dy;x0+=sx;} if(e2<=dx){err+=dx;y0+=sy;} }
}
void KBST7789::drawCircle(int16_t x0, int16_t y0, int16_t r, uint16_t c) {
  int16_t f=1-r, ddF_x=1, ddF_y=-2*r, x=0, y=r;
  drawPixel(x0,y0+r,c); drawPixel(x0,y0-r,c); drawPixel(x0+r,y0,c); drawPixel(x0-r,y0,c);
  while(x<y){ if(f>=0){y--;ddF_y+=2;f+=ddF_y;} x++;ddF_x+=2;f+=ddF_x;
    drawPixel(x0+x,y0+y,c);drawPixel(x0-x,y0+y,c);drawPixel(x0+x,y0-y,c);drawPixel(x0-x,y0-y,c);
    drawPixel(x0+y,y0+x,c);drawPixel(x0-y,y0+x,c);drawPixel(x0+y,y0-x,c);drawPixel(x0-y,y0-x,c); }
}

void KBST7789::glyph(char c, uint8_t o[5]) const {
  for (int i=0;i<5;i++) o[i]=0; if(c>='a'&&c<='z') c-=32;
  switch(c) {
    case 'A':{uint8_t a[5]={0x7E,0x11,0x11,0x11,0x7E};memcpy(o,a,5);}break; case 'B':{uint8_t a[5]={0x7F,0x49,0x49,0x49,0x36};memcpy(o,a,5);}break;
    case 'C':{uint8_t a[5]={0x3E,0x41,0x41,0x41,0x22};memcpy(o,a,5);}break; case 'D':{uint8_t a[5]={0x7F,0x41,0x41,0x22,0x1C};memcpy(o,a,5);}break;
    case 'E':{uint8_t a[5]={0x7F,0x49,0x49,0x49,0x41};memcpy(o,a,5);}break; case 'F':{uint8_t a[5]={0x7F,0x09,0x09,0x09,0x01};memcpy(o,a,5);}break;
    case 'G':{uint8_t a[5]={0x3E,0x41,0x49,0x49,0x7A};memcpy(o,a,5);}break; case 'H':{uint8_t a[5]={0x7F,0x08,0x08,0x08,0x7F};memcpy(o,a,5);}break;
    case 'I':{uint8_t a[5]={0x00,0x41,0x7F,0x41,0x00};memcpy(o,a,5);}break; case 'J':{uint8_t a[5]={0x20,0x40,0x41,0x3F,0x01};memcpy(o,a,5);}break;
    case 'K':{uint8_t a[5]={0x7F,0x08,0x14,0x22,0x41};memcpy(o,a,5);}break; case 'L':{uint8_t a[5]={0x7F,0x40,0x40,0x40,0x40};memcpy(o,a,5);}break;
    case 'M':{uint8_t a[5]={0x7F,0x02,0x0C,0x02,0x7F};memcpy(o,a,5);}break; case 'N':{uint8_t a[5]={0x7F,0x04,0x08,0x10,0x7F};memcpy(o,a,5);}break;
    case 'O':{uint8_t a[5]={0x3E,0x41,0x41,0x41,0x3E};memcpy(o,a,5);}break; case 'P':{uint8_t a[5]={0x7F,0x09,0x09,0x09,0x06};memcpy(o,a,5);}break;
    case 'Q':{uint8_t a[5]={0x3E,0x41,0x51,0x21,0x5E};memcpy(o,a,5);}break; case 'R':{uint8_t a[5]={0x7F,0x09,0x19,0x29,0x46};memcpy(o,a,5);}break;
    case 'S':{uint8_t a[5]={0x46,0x49,0x49,0x49,0x31};memcpy(o,a,5);}break; case 'T':{uint8_t a[5]={0x01,0x01,0x7F,0x01,0x01};memcpy(o,a,5);}break;
    case 'U':{uint8_t a[5]={0x3F,0x40,0x40,0x40,0x3F};memcpy(o,a,5);}break; case 'V':{uint8_t a[5]={0x1F,0x20,0x40,0x20,0x1F};memcpy(o,a,5);}break;
    case 'W':{uint8_t a[5]={0x7F,0x20,0x18,0x20,0x7F};memcpy(o,a,5);}break; case 'X':{uint8_t a[5]={0x63,0x14,0x08,0x14,0x63};memcpy(o,a,5);}break;
    case 'Y':{uint8_t a[5]={0x03,0x04,0x78,0x04,0x03};memcpy(o,a,5);}break; case 'Z':{uint8_t a[5]={0x61,0x51,0x49,0x45,0x43};memcpy(o,a,5);}break;
    case '0':{uint8_t a[5]={0x3E,0x51,0x49,0x45,0x3E};memcpy(o,a,5);}break; case '1':{uint8_t a[5]={0x00,0x42,0x7F,0x40,0x00};memcpy(o,a,5);}break;
    case '2':{uint8_t a[5]={0x42,0x61,0x51,0x49,0x46};memcpy(o,a,5);}break; case '3':{uint8_t a[5]={0x21,0x41,0x45,0x4B,0x31};memcpy(o,a,5);}break;
    case '4':{uint8_t a[5]={0x18,0x14,0x12,0x7F,0x10};memcpy(o,a,5);}break; case '5':{uint8_t a[5]={0x27,0x45,0x45,0x45,0x39};memcpy(o,a,5);}break;
    case '6':{uint8_t a[5]={0x3C,0x4A,0x49,0x49,0x30};memcpy(o,a,5);}break; case '7':{uint8_t a[5]={0x01,0x71,0x09,0x05,0x03};memcpy(o,a,5);}break;
    case '8':{uint8_t a[5]={0x36,0x49,0x49,0x49,0x36};memcpy(o,a,5);}break; case '9':{uint8_t a[5]={0x06,0x49,0x49,0x29,0x1E};memcpy(o,a,5);}break;
    case '.': o[2]=0x60; break; case ':': o[2]=0x36; break; case '-': o[1]=o[2]=o[3]=0x08; break; case '+': o[2]=0x3E;o[1]=o[3]=0x08; break;
    case '%':{uint8_t a[5]={0x63,0x13,0x08,0x64,0x63};memcpy(o,a,5);}break; case '/':{uint8_t a[5]={0x20,0x10,0x08,0x04,0x02};memcpy(o,a,5);}break;
    case '_': for(int i=0;i<5;i++)o[i]=0x40; break; case '=': o[1]=o[2]=o[3]=0x14; break; case '?':{uint8_t a[5]={0x02,0x01,0x51,0x09,0x06};memcpy(o,a,5);}break;
    default: break;
  }
}
void KBST7789::drawChar(int16_t x,int16_t y,char c,uint16_t color,uint8_t size){ if(size<1)size=1; uint8_t g[5];glyph(c,g); for(int i=0;i<5;i++)for(int j=0;j<7;j++)if(g[i]&(1<<j))fillRect(x+i*size,y+j*size,size,size,color); }
void KBST7789::drawText(int16_t x,int16_t y,const String &text,uint16_t color,uint8_t size){ int16_t cx=x; for(size_t i=0;i<text.length();i++){char c=text[i]; if(c=='\n'){cx=x;y+=8*size;continue;} drawChar(cx,y,c,color,size); cx+=6*size; if(cx+5*size>_width){cx=x;y+=8*size;} } }
void KBST7789::drawNumber(int16_t x,int16_t y,double value,uint8_t digits,uint16_t color,uint8_t size){ drawText(x,y,String(value, static_cast<unsigned int>(digits)),color,size); }
