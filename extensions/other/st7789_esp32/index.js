const ST7789ESP32 = formatMessage => ({
  name: formatMessage({
    id: 'ST7789ESP32',
    default: 'ST7789 TFT ESP32',
    description: 'ST7789 170x320 TFT display blocks for ESP32'
  }),
  extensionId: 'ST7789ESP32',
  version: '0.1.0-test',
  type: 'arduino',
  supportDevice: ['arduinoEsp32'],
  author: 'davinichi',
  iconURL: 'asset/st7789.svg',
  description: formatMessage({
    id: 'ST7789ESP32.description',
    default: 'Blocks for the integrated 1.9 inch 170x320 ST7789 TFT ESP32 board',
    description: 'Description of ST7789 TFT ESP32 extension'
  }),
  featured: true,
  blocks: 'blocks.js',
  generator: 'generator.js',
  toolbox: 'toolbox.js',
  msg: 'msg.js',
  library: 'lib',
  tags: ['display'],
  helpLink: ''
});

module.exports = ST7789ESP32;
