#include "KidsBlock_BME280.h"

bool KidsBlock_BME280::begin(uint8_t address, TwoWire *wire) {
    _address = address;
    _wire = wire;
    if (_wire == nullptr) return false;
    if (chipID() != 0x60) return false;

    readCalibration();

    // Humidity oversampling x1 (must be written before ctrl_meas)
    write8(0xF2, 0x01);
    // Temperature x1, pressure x1, normal mode
    write8(0xF4, 0x27);
    // Standby 1000 ms, filter off
    write8(0xF5, 0xA0);
    delay(10);
    return true;
}

uint8_t KidsBlock_BME280::chipID() {
    return read8(0xD0);
}

uint8_t KidsBlock_BME280::read8(uint8_t reg) {
    _wire->beginTransmission(_address);
    _wire->write(reg);
    if (_wire->endTransmission(false) != 0) return 0;
    if (_wire->requestFrom((int)_address, 1) != 1) return 0;
    return _wire->read();
}

uint16_t KidsBlock_BME280::read16LE(uint8_t reg) {
    uint8_t lsb = read8(reg);
    uint8_t msb = read8(reg + 1);
    return (uint16_t)msb << 8 | lsb;
}

int16_t KidsBlock_BME280::readS16LE(uint8_t reg) {
    return (int16_t)read16LE(reg);
}

uint32_t KidsBlock_BME280::read24(uint8_t reg) {
    _wire->beginTransmission(_address);
    _wire->write(reg);
    if (_wire->endTransmission(false) != 0) return 0;
    if (_wire->requestFrom((int)_address, 3) != 3) return 0;
    uint32_t value = (uint32_t)_wire->read() << 16;
    value |= (uint32_t)_wire->read() << 8;
    value |= _wire->read();
    return value;
}

void KidsBlock_BME280::write8(uint8_t reg, uint8_t value) {
    _wire->beginTransmission(_address);
    _wire->write(reg);
    _wire->write(value);
    _wire->endTransmission();
}

void KidsBlock_BME280::readCalibration() {
    dig_T1 = read16LE(0x88);
    dig_T2 = readS16LE(0x8A);
    dig_T3 = readS16LE(0x8C);

    dig_P1 = read16LE(0x8E);
    dig_P2 = readS16LE(0x90);
    dig_P3 = readS16LE(0x92);
    dig_P4 = readS16LE(0x94);
    dig_P5 = readS16LE(0x96);
    dig_P6 = readS16LE(0x98);
    dig_P7 = readS16LE(0x9A);
    dig_P8 = readS16LE(0x9C);
    dig_P9 = readS16LE(0x9E);

    dig_H1 = read8(0xA1);
    dig_H2 = readS16LE(0xE1);
    dig_H3 = read8(0xE3);

    uint8_t e4 = read8(0xE4);
    uint8_t e5 = read8(0xE5);
    uint8_t e6 = read8(0xE6);
    int16_t h4 = (int16_t)(((uint16_t)e4 << 4) | (e5 & 0x0F));
    int16_t h5 = (int16_t)(((uint16_t)e6 << 4) | (e5 >> 4));
    if (h4 & 0x0800) h4 |= 0xF000;
    if (h5 & 0x0800) h5 |= 0xF000;
    dig_H4 = h4;
    dig_H5 = h5;
    dig_H6 = (int8_t)read8(0xE7);
}

int32_t KidsBlock_BME280::readRawTemperature() {
    return (int32_t)(read24(0xFA) >> 4);
}

int32_t KidsBlock_BME280::readRawPressure() {
    return (int32_t)(read24(0xF7) >> 4);
}

int32_t KidsBlock_BME280::readRawHumidity() {
    _wire->beginTransmission(_address);
    _wire->write(0xFD);
    if (_wire->endTransmission(false) != 0) return 0;
    if (_wire->requestFrom((int)_address, 2) != 2) return 0;
    return ((int32_t)_wire->read() << 8) | _wire->read();
}

void KidsBlock_BME280::updateTFine() {
    int32_t adc_T = readRawTemperature();
    int32_t var1 = ((((adc_T >> 3) - ((int32_t)dig_T1 << 1))) * (int32_t)dig_T2) >> 11;
    int32_t var2 = (((((adc_T >> 4) - (int32_t)dig_T1) * ((adc_T >> 4) - (int32_t)dig_T1)) >> 12) * (int32_t)dig_T3) >> 14;
    _tFine = var1 + var2;
}

float KidsBlock_BME280::readTemperature() {
    updateTFine();
    int32_t temperature = (_tFine * 5 + 128) >> 8;
    return temperature / 100.0f;
}

float KidsBlock_BME280::readPressure() {
    updateTFine();
    int32_t adc_P = readRawPressure();
    int64_t var1 = (int64_t)_tFine - 128000;
    int64_t var2 = var1 * var1 * (int64_t)dig_P6;
    var2 += (var1 * (int64_t)dig_P5) << 17;
    var2 += ((int64_t)dig_P4) << 35;
    var1 = ((var1 * var1 * (int64_t)dig_P3) >> 8) + ((var1 * (int64_t)dig_P2) << 12);
    var1 = (((((int64_t)1) << 47) + var1) * (int64_t)dig_P1) >> 33;
    if (var1 == 0) return NAN;

    int64_t pressure = 1048576 - adc_P;
    pressure = (((pressure << 31) - var2) * 3125) / var1;
    var1 = ((int64_t)dig_P9 * (pressure >> 13) * (pressure >> 13)) >> 25;
    var2 = ((int64_t)dig_P8 * pressure) >> 19;
    pressure = ((pressure + var1 + var2) >> 8) + ((int64_t)dig_P7 << 4);
    return (float)pressure / 256.0f;
}

float KidsBlock_BME280::readHumidity() {
    updateTFine();
    int32_t adc_H = readRawHumidity();
    int32_t v = _tFine - 76800;
    v = (((((adc_H << 14) - ((int32_t)dig_H4 << 20) - ((int32_t)dig_H5 * v)) + 16384) >> 15) *
         (((((((v * (int32_t)dig_H6) >> 10) * (((v * (int32_t)dig_H3) >> 11) + 32768)) >> 10) + 2097152) *
            (int32_t)dig_H2 + 8192) >> 14));
    v = v - (((((v >> 15) * (v >> 15)) >> 7) * (int32_t)dig_H1) >> 4);
    if (v < 0) v = 0;
    if (v > 419430400) v = 419430400;
    return (float)(v >> 12) / 1024.0f;
}
