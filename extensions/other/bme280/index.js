const esp32bme280 = formatMessage => ({
    name: formatMessage({
        id: 'bme280 sensor',
        default: 'BME280 sensor for ESP32'
    }),
    extensionId: 'esp32bme280',
    version: '1.0.0',
    supportDevice: ['arduinoEsp32', 'arduinoEsp32S3'],
    author: 'davinichi',
    iconURL: `asset/bme280.svg`,
    description: formatMessage({
        id: 'esp32bme280.description',
        default: 'BME280 temperature, humidity and pressure sensor for ESP32 via I2C'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    msg: 'msg.js',
    library: 'lib',
    tags: ['sensor']
});

module.exports = esp32bme280;
