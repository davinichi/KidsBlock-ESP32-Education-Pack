const ThingSpeak = formatMessage => ({
  name: formatMessage({
    id: 'ThingSpeak',
    default: 'ThingSpeak',
    description: 'ThingSpeak blocks'
  }),
  extensionId: 'ThingSpeak',
  version: '1.2.2',
  type: 'arduino',
  supportDevice: ['arduinoEsp32', 'arduinoEsp8266'],
  author: 'davinichi',
  iconURL: 'asset/thingspeak.svg',
  description: formatMessage({
    id: 'ThingSpeak.description',
    default: 'Send values to and read the latest value from ThingSpeak after Wi-Fi connection',
    description: 'Description of ThingSpeak extension'
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
module.exports = ThingSpeak;
