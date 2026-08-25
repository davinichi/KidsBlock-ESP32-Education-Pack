const espnow_esp32 = formatMessage => ({
    name: formatMessage({
        id: 'espnow_esp32',
        default: 'ESP-NOW ESP32',
        description: 'ESP-NOW ESP32'
    }),
    extensionId: 'espnow_esp32',
    version: '1.2.0',
    type: 'arduino',
    supportDevice: ['arduinoEsp32', 'arduinoEsp32S3'],
    author: 'davinichi',
    iconURL: `asset/espnow_esp32.svg`,
    description: formatMessage({
        id: 'espnow_esp32.description',
        default: 'Send and receive text directly between ESP32 boards using ESP-NOW. Empty destination sends to all devices.',
        description: 'Description of ESP-NOW ESP32'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    msg: 'msg.js',
    library: 'lib',
    tags: ['communication'],
    helpLink: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/api/espnow.html'
});

module.exports = espnow_esp32;
