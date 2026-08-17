#ifndef ENVIRONMENT_H
#define ENVIRONMENT_H

#include <Arduino.h>

float wetBulbTemperature(float tempC, float humidity);
float calcSimpleWBGT(float tempC, float humidity);
float calcAbsoluteHumidity(float tempC, float humidity);

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
