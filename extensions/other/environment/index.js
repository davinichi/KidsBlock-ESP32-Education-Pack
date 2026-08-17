const Environment = formatMessage => ({
  name: formatMessage({
    id: 'Environment',
    default: 'Environment',
    description: 'Environmental calculation blocks'
  }),
  extensionId: 'Environment',
  version: '1.4.0',
  type: 'arduino',
  supportDevice: [
    'arduinoUno',
    'arduinoLeonardo',
    'arduinoMega2560',
    'arduinoEsp32',
    'arduinoEsp8266'
  ],
  author: 'davinichi',
  iconURL: 'asset/environment.svg',
  description: formatMessage({
    id: 'Environment.description',
    default: 'Environmental calculations plus LCD1602 unit display blocks for temperature and absolute humidity',
    description: 'Description of Environment extension'
  }),
  featured: true,
  blocks: 'blocks.js',
  generator: 'generator.js',
  toolbox: 'toolbox.js',
  msg: 'msg.js',
  library: 'lib',
  tags: ['sensor', 'other'],
  helpLink: ''
});

module.exports = Environment;
