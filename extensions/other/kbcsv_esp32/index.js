const kbcsv_esp32 = formatMessage => ({
    name: formatMessage({
        id: 'kbcsv_esp32',
        default: 'Data Processing ESP32',
        description: 'Data Processing ESP32'
    }),
    extensionId: 'kbcsv_esp32',
    version: '1.5.0',
    type: 'arduino',
    supportDevice: ['arduinoEsp32', 'arduinoEsp32S3'],
    author: 'Davinichi',
    iconURL: `asset/kbcsv_esp32.jpg`,
    description: formatMessage({
        id: 'kbcsv_esp32.description',
        default: 'Process CSV data and join UTF-8 text with any separator or extract text by length, position, left, or right for ESP32',
        description: 'Description of Data Processing ESP32'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    msg: 'msg.js',
    library: 'lib',
    tags: ['other'],
    helpLink: 'https://docs.arduino.cc/language-reference/en/variables/data-types/string/'
});

module.exports = kbcsv_esp32;
