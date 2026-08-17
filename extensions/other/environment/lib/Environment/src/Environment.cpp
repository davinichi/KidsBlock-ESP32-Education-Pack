#include "Environment.h"
#include <math.h>

float wetBulbTemperature(float tempC, float humidity) {
  // Keep humidity in the physical range and avoid invalid square roots.
  if (humidity < 0.0f) humidity = 0.0f;
  if (humidity > 100.0f) humidity = 100.0f;

  return tempC * atan(0.151977f * sqrt(humidity + 8.313659f))
       + atan(tempC + humidity)
       - atan(humidity - 1.676331f)
       + 0.00391838f * pow(humidity, 1.5f) * atan(0.023101f * humidity)
       - 4.686035f;
}

float calcSimpleWBGT(float tempC, float humidity) {
  const float wetBulb = wetBulbTemperature(tempC, humidity);
  return 0.7f * wetBulb + 0.3f * tempC;
}

float calcAbsoluteHumidity(float tempC, float humidity) {
  // Clamp relative humidity to the physical range.
  if (humidity < 0.0f) humidity = 0.0f;
  if (humidity > 100.0f) humidity = 100.0f;

  // Saturation vapor pressure (hPa), Magnus formula.
  const float saturationVaporPressure =
      6.112f * exp((17.67f * tempC) / (tempC + 243.5f));

  // Actual vapor pressure (hPa).
  const float vaporPressure = saturationVaporPressure * (humidity / 100.0f);

  // Absolute humidity (g/m^3).
  return 216.7f * vaporPressure / (tempC + 273.15f);
}
