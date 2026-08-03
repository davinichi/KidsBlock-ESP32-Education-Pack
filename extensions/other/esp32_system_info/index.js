const esp32_system_info = formatMessage => ({
    name: formatMessage({
        id: 'esp32_system_info',
        default: 'ESP32 System Information',
        description: 'ESP32 System Information'
    }),
    extensionId: 'esp32_system_info',
    version: '1.1.2',
    type: 'arduino',
    supportDevice: ['arduinoEsp32', 'arduinoEsp32S3'],
    author: 'Davinichi',
    iconURL: `asset/esp32_system_info.jpg`,
    description: formatMessage({
        id: 'esp32_system_info.description',
        default: 'Get ESP32 chip, memory, flash, SDK, uptime, and MAC address information as rounded value blocks',
        description: 'Description of ESP32 System Information'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    msg: 'msg.js',
    tags: ['other'],
    helpLink: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/'
});

module.exports = esp32_system_info;
