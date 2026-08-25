const LCD1602Symbols = formatMessage => ({
  name: formatMessage({
    id: 'LCD1602Symbols',
    default: 'LCD1602 Symbols',
    description: 'LCD1602 custom symbol blocks'
  }),
  extensionId: 'LCD1602Symbols',
  version: '1.0.0',
  type: 'arduino',
  supportDevice: [
    'arduinoUno',
    'arduinoLeonardo',
    'arduinoMega2560',
    'arduinoEsp32',
    'arduinoEsp8266'
  ],
  author: 'davinichi',
  iconURL: 'asset/lcd1602_symbols.svg',
  description: formatMessage({
    id: 'LCD1602Symbols.description',
    default: 'Reusable custom symbols for LCD1602 displays',
    description: 'Description of LCD1602 Symbols extension'
  }),
  featured: true,
  blocks: 'blocks.js',
  generator: 'generator.js',
  toolbox: 'toolbox.js',
  msg: 'msg.js',
  tags: ['display'],
  helpLink: ''
});
module.exports = LCD1602Symbols;
