KidsBlock ESP32 BME280 Extension v1.0.0

対象:
- ESP32-WROOM / arduinoEsp32
- ESP32-S3 / arduinoEsp32S3

配線:
- BME280 VCC -> 3.3V
- BME280 GND -> GND
- BME280 SDA -> GPIO21
- BME280 SCL -> GPIO22

I2Cアドレス:
- 初期値 0x76
- ブロックのドロップダウンで 0x77 も選択可能

ブロック:
1. BME280を初期化 アドレス [0x76]
2. BME280 温度 (℃)
3. BME280 湿度 (%)
4. BME280 気圧 (hPa)

使い方:
- プログラム開始時に「BME280を初期化」ブロックを1回置いてください。
- その後、温度・湿度・気圧ブロックを表示/計算ブロックの入力として使用できます。

生成される主なArduinoコード:
#include <Wire.h>
#include <KidsBlock_BME280.h>
KidsBlock_BME280 bme280;

setup内:
Wire.begin(21, 22);
bme280.begin(0x76, &Wire);

値:
bme280.readTemperature()
bme280.readHumidity()
bme280.readPressure() / 100.0F

注意:
- 初期化ブロックを必ず値取得ブロックより先に使用してください。
- BME280のチップIDは0x60を想定しています。
- BMP280は湿度センサーを持たないため、この拡張では対象外です。
