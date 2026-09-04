/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addMsg (Blockly) {
  const en = {
    ST7789_CATEGORY: 'ST7789 TFT', ST7789_BEGIN: 'initialize ST7789 TFT 170x320',
    ST7789_FILL_SCREEN: 'fill screen %1', ST7789_ROTATION: 'set screen rotation %1', ST7789_BACKLIGHT: 'backlight %1',
    ST7789_TEXT: 'draw text X %1 Y %2 text %3 size %4 color %5',
    ST7789_NUMBER: 'draw number X %1 Y %2 value %3 decimal places %4 size %5 color %6',
    ST7789_LINE: 'draw line X0 %1 Y0 %2 X1 %3 Y1 %4 color %5',
    ST7789_RECT: 'draw rectangle X %1 Y %2 width %3 height %4 color %5',
    ST7789_FILL_RECT: 'fill rectangle X %1 Y %2 width %3 height %4 color %5',
    ST7789_CIRCLE: 'draw circle X %1 Y %2 radius %3 color %4', ST7789_COLOR: 'color %1',
    ST7789_RGB: 'RGB color R %1 G %2 B %3', ST7789_COLOR_BLACK: 'black', ST7789_COLOR_WHITE: 'white',
    ST7789_COLOR_RED: 'red', ST7789_COLOR_GREEN: 'green', ST7789_COLOR_BLUE: 'blue', ST7789_COLOR_YELLOW: 'yellow',
    ST7789_COLOR_CYAN: 'cyan', ST7789_COLOR_MAGENTA: 'magenta'
  };
  const ja = {
    ST7789_CATEGORY: 'ST7789 TFT', ST7789_BEGIN: 'ST7789 TFT 170x320 を初期化する',
    ST7789_FILL_SCREEN: '画面を %1 で塗りつぶす', ST7789_ROTATION: '画面の向きを %1 にする', ST7789_BACKLIGHT: 'バックライトを %1 にする',
    ST7789_TEXT: 'X %1 Y %2 に文字 %3 を サイズ %4 色 %5 で表示する',
    ST7789_NUMBER: 'X %1 Y %2 に数値 %3 を 小数 %4 桁 サイズ %5 色 %6 で表示する',
    ST7789_LINE: 'X0 %1 Y0 %2 から X1 %3 Y1 %4 へ 色 %5 の線を描く',
    ST7789_RECT: 'X %1 Y %2 幅 %3 高さ %4 色 %5 の四角形を描く',
    ST7789_FILL_RECT: 'X %1 Y %2 幅 %3 高さ %4 色 %5 の四角形を塗りつぶす',
    ST7789_CIRCLE: 'X %1 Y %2 半径 %3 色 %4 の円を描く', ST7789_COLOR: '色 %1',
    ST7789_RGB: 'RGB色 赤 %1 緑 %2 青 %3', ST7789_COLOR_BLACK: '黒', ST7789_COLOR_WHITE: '白',
    ST7789_COLOR_RED: '赤', ST7789_COLOR_GREEN: '緑', ST7789_COLOR_BLUE: '青', ST7789_COLOR_YELLOW: '黄',
    ST7789_COLOR_CYAN: 'シアン', ST7789_COLOR_MAGENTA: 'マゼンタ'
  };
  Object.assign(Blockly.ScratchMsgs.locales.en, en);
  Object.assign(Blockly.ScratchMsgs.locales.ja, ja);
  Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], en);
  return Blockly;
}
exports = addMsg;
