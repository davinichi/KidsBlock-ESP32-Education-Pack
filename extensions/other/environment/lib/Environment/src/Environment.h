#ifndef ENVIRONMENT_H
#define ENVIRONMENT_H

#include <Arduino.h>

enum EnvironmentIndexType {
  ENV_INDEX_DI = 0,
  ENV_INDEX_HEAT_INDEX,
  ENV_INDEX_HUMIDEX,
  ENV_INDEX_DEW_POINT,
  ENV_INDEX_ABSOLUTE_HUMIDITY,
  ENV_INDEX_WET_BULB,
  ENV_INDEX_VPD,
  ENV_INDEX_VAPOR_PRESSURE,
  ENV_INDEX_THI,
  ENV_INDEX_ESTIMATED_WBGT
};

float calcEnvironmentIndex(EnvironmentIndexType type, float tempC, float humidity);
float discomfortIndex(float tempC, float humidity);
float heatIndexC(float tempC, float humidity);
float humidex(float tempC, float humidity);
float dewPointTemperature(float tempC, float humidity);
float wetBulbTemperature(float tempC, float humidity);
float calcSimpleWBGT(float tempC, float humidity);
float calcAbsoluteHumidity(float tempC, float humidity);
float vaporPressureKPa(float tempC, float humidity);
float vaporPressureDeficitKPa(float tempC, float humidity);
float temperatureHumidityIndex(float tempC, float humidity);

inline int wbgtLevel(float wbgt) {
  if (wbgt >= 31.0f) return 4;
  if (wbgt >= 28.0f) return 3;
  if (wbgt >= 25.0f) return 2;
  if (wbgt >= 21.0f) return 1;
  return 0;
}

inline const char* wbgtLevelText(float wbgt) {
  switch (wbgtLevel(wbgt)) {
    case 4: return "危険";
    case 3: return "厳重警戒";
    case 2: return "警戒";
    case 1: return "注意";
    default: return "ほぼ安全";
  }
}

#endif
