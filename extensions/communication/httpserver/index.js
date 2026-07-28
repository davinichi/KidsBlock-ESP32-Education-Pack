const HTTPServer = formatMessage => ({
  name: formatMessage({
    id: 'HTTPServer',
    default: 'HTTP Server',
    description: 'ESP32 HTTP server blocks'
  }),
  extensionId: 'HTTPServer',
  version: '2.1.0',
  type: 'arduino',
  supportDevice: ['arduinoEsp32'],
  author: 'davinichi',
  iconURL: 'asset/sensorserver.svg',
  description: formatMessage({
    id: 'HTTPServer.description',
    default: 'Show up to eight freely named values on an ESP32 browser page',
    description: 'Description of HTTP Server extension'
  }),
  featured: true,
  blocks: 'blocks.js',
  generator: 'generator.js',
  toolbox: 'toolbox.js',
  msg: 'msg.js',
  library: 'lib',
  tags: ['communication', 'wifi', 'http', 'server', 'sensor'],
  helpLink: ''
});

module.exports = HTTPServer;
