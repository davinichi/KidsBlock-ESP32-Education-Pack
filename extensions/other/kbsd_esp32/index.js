const kbsd_esp32 = formatMessage => ({
    name: formatMessage({
        id: 'kbsd_esp32',
        default: 'KBSD ESP32',
        description: 'KBSD ESP32'
    }),
    extensionId: 'kbsd_esp32',
    version: '2.1.0',
    type: 'arduino',
    supportDevice: ['arduinoEsp32','arduinoEsp32S3'],
    author: 'Davinichi',
    iconURL: `asset/kbsd_esp32.jpg`,
    description: formatMessage({
        id: 'kbsd_esp32.description',
        default: 'microSD card blocks with line-by-line reading and Japanese diagnostics for ESP32',
        description: 'Description of KBSD ESP32'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    msg: 'msg.js',
    library: 'lib',
    tags: ['sensor'],
    helpLink: 'https://www.arduino.cc/reference/en/libraries/sd/'
});

module.exports = kbsd_esp32;
