const WiFiSimple = formatMessage => ({
  name: formatMessage({
    id: 'WiFiSimple',
    default: 'Wi-Fi Simple',
    description: 'Simple Wi-Fi connection blocks'
  }),
  extensionId: 'WiFiSimple',
  version: '1.0.0',
  type: 'arduino',
  supportDevice: [
    'arduinoEsp32',
    'arduinoEsp8266'
  ],
  author: 'davinichi',
  iconURL: 'asset/wifisimple.svg',
  description: formatMessage({
    id: 'WiFiSimple.description',
    default: 'Connect to Wi-Fi without starting a TCP or Web server',
    description: 'Description of Wi-Fi Simple extension'
  }),
  featured: true,
  blocks: 'blocks.js',
  generator: 'generator.js',
  toolbox: 'toolbox.js',
  msg: 'msg.js',
  tags: ['communication', 'wifi'],
  helpLink: ''
});

module.exports = WiFiSimple;
