#ifndef KIDSBLOCK_BME280_H
#define KIDSBLOCK_BME280_H

#include <Arduino.h>
#include <Wire.h>

class KidsBlock_BME280 {
public:
    bool begin(uint8_t address = 0x76, TwoWire *wire = &Wire);
    float readTemperature();
    float readPressure();
    float readHumidity();
    uint8_t chipID();

private:
    TwoWire *_wire = nullptr;
    uint8_t _address = 0x76;
    int32_t _tFine = 0;

    uint16_t dig_T1;
    int16_t dig_T2, dig_T3;
    uint16_t dig_P1;
    int16_t dig_P2, dig_P3, dig_P4, dig_P5, dig_P6, dig_P7, dig_P8, dig_P9;
    uint8_t dig_H1, dig_H3;
    int16_t dig_H2, dig_H4, dig_H5;
    int8_t dig_H6;

    uint8_t read8(uint8_t reg);
    uint16_t read16LE(uint8_t reg);
    int16_t readS16LE(uint8_t reg);
    uint32_t read24(uint8_t reg);
    void write8(uint8_t reg, uint8_t value);
    void readCalibration();
    int32_t readRawTemperature();
    int32_t readRawPressure();
    int32_t readRawHumidity();
    void updateTFine();
};

#endif
