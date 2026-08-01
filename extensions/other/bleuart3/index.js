const BLEUART3 = formatMessage => ({
  name: formatMessage({
    id: 'BLEUART3',
    default: 'BLE UART 3',
    description: 'BLE UART 3 blocks'
  }),
  extensionId: 'BLEUART3',
  version: '3.0.1',
  type: 'arduino',
  supportDevice: ['arduinoEsp32'],
  author: 'davinichi',
  iconURL: 'asset/bleuart.svg',
  description: formatMessage({
    id: 'BLEUART3.description',
    default: 'BLE UART peripheral, scan, select, connect and receive for ESP32',
    description: 'Description'
  }),
  featured: true,
  blocks: 'blocks.js',
  generator: 'generator.js',
  toolbox: 'toolbox.js',
  msg: 'msg.js',
  library: 'lib',
  tags: ['communication', 'other'],
  helpLink: ''
});

module.exports = BLEUART3;
