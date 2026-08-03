const HTTPServer = formatMessage => ({
  name: formatMessage({
    id: 'HTTPServer',
    default: 'HTTP Server',
    description: 'ESP32 HTTP server blocks'
  }),
  extensionId: 'HTTPServer',
  version: '3.3.1',
  type: 'arduino',
  supportDevice: ['arduinoEsp32'],
  author: 'Davinichi',
  iconURL: 'asset/sensorserver.svg',
  description: formatMessage({
    id: 'HTTPServer.description',
    default: 'Show up to eight values and receive up to eight ON/OFF buttons and eight radio buttons',
    description: 'Description of HTTP Server extension'
  }),
  featured: true,
  blocks: 'blocks.js',
  generator: 'generator.js',
  toolbox: 'toolbox.js',
  msg: 'msg.js',
  library: 'lib',
  tags: ['communication'],
  helpLink: ''
});

module.exports = HTTPServer;
