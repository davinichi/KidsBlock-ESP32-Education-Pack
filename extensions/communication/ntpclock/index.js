const NTPClock = formatMessage => ({
  name: formatMessage({
    id: 'NTPClock',
    default: 'NTP Clock',
    description: 'NTP clock blocks'
  }),
  extensionId: 'NTPClock',
  version: '1.2.0',
  type: 'arduino',
  supportDevice: [
    'arduinoEsp32',
    'arduinoEsp8266'
  ],
  author: 'davinichi',
  iconURL: 'asset/ntpclock.svg',
  description: formatMessage({
    id: 'NTPClock.description',
    default: 'Get date and time from an NTP server after Wi-Fi connection',
    description: 'Description of NTP Clock extension'
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

module.exports = NTPClock;
