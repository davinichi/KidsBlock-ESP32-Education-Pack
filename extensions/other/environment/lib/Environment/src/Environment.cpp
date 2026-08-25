#include "Environment.h"
#include <math.h>

static float clampHumidity(float humidity) {
  if (humidity < 0.0f) return 0.0f;
  if (humidity > 100.0f) return 100.0f;
  return humidity;
}

static float saturationVaporPressureHpa(float tempC) {
  // Magnus formula, hPa.
  return 6.112f * exp((17.67f * tempC) / (tempC + 243.5f));
}

float discomfortIndex(float tempC, float humidity) {
  humidity = clampHumidity(humidity);
  return 0.81f * tempC + 0.01f * humidity * (0.99f * tempC - 14.3f) + 46.3f;
}

float heatIndexC(float tempC, float humidity) {
  humidity = clampHumidity(humidity);
  const float tempF = tempC * 9.0f / 5.0f + 32.0f;

  // NWS procedure: simple Steadman approximation first.
  float hiF = 0.5f * (tempF + 61.0f + ((tempF - 68.0f) * 1.2f) + (humidity * 0.094f));
  hiF = (hiF + tempF) * 0.5f;

  // Apply Rothfusz regression when the preliminary value reaches 80 F.
  if (hiF >= 80.0f) {
    const float t2 = tempF * tempF;
    const float rh2 = humidity * humidity;
    hiF = -42.379f
        + 2.04901523f * tempF
        + 10.14333127f * humidity
        - 0.22475541f * tempF * humidity
        - 0.00683783f * t2
        - 0.05481717f * rh2
        + 0.00122874f * t2 * humidity
        + 0.00085282f * tempF * rh2
        - 0.00000199f * t2 * rh2;

    if (humidity < 13.0f && tempF >= 80.0f && tempF <= 112.0f) {
      float term = (17.0f - fabs(tempF - 95.0f)) / 17.0f;
      if (term < 0.0f) term = 0.0f;
      hiF -= ((13.0f - humidity) / 4.0f) * sqrt(term);
    } else if (humidity > 85.0f && tempF >= 80.0f && tempF <= 87.0f) {
      hiF += ((humidity - 85.0f) / 10.0f) * ((87.0f - tempF) / 5.0f);
    }
  }

  return (hiF - 32.0f) * 5.0f / 9.0f;
}

float dewPointTemperature(float tempC, float humidity) {
  humidity = clampHumidity(humidity);
  // Avoid log(0). 0.1% RH is used only as a numerical floor.
  if (humidity < 0.1f) humidity = 0.1f;
  const float gamma = log(humidity / 100.0f) + (17.67f * tempC) / (243.5f + tempC);
  return (243.5f * gamma) / (17.67f - gamma);
}

float humidex(float tempC, float humidity) {
  const float dewPointC = dewPointTemperature(tempC, humidity);
  const float dewPointK = dewPointC + 273.15f;
  const float e = 6.11f * exp(5417.7530f * ((1.0f / 273.15f) - (1.0f / dewPointK)));
  return tempC + 0.5555f * (e - 10.0f);
}

float wetBulbTemperature(float tempC, float humidity) {
  humidity = clampHumidity(humidity);

  // Stull (2011) empirical approximation at standard sea-level pressure.
  return tempC * atan(0.151977f * sqrt(humidity + 8.313659f))
       + atan(tempC + humidity)
       - atan(humidity - 1.676331f)
       + 0.00391838f * pow(humidity, 1.5f) * atan(0.023101f * humidity)
       - 4.686035f;
}

float calcSimpleWBGT(float tempC, float humidity) {
  // Simple indoor/no-solar estimate. This is not a formal WBGT measurement.
  const float wetBulb = wetBulbTemperature(tempC, humidity);
  return 0.7f * wetBulb + 0.3f * tempC;
}

float vaporPressureKPa(float tempC, float humidity) {
  humidity = clampHumidity(humidity);
  return (saturationVaporPressureHpa(tempC) * (humidity / 100.0f)) / 10.0f;
}

float vaporPressureDeficitKPa(float tempC, float humidity) {
  humidity = clampHumidity(humidity);
  const float svpKPa = saturationVaporPressureHpa(tempC) / 10.0f;
  return svpKPa * (1.0f - humidity / 100.0f);
}

float calcAbsoluteHumidity(float tempC, float humidity) {
  humidity = clampHumidity(humidity);
  const float vaporPressureHpa = saturationVaporPressureHpa(tempC) * (humidity / 100.0f);
  return 216.7f * vaporPressureHpa / (tempC + 273.15f);
}

float temperatureHumidityIndex(float tempC, float humidity) {
  const float dewPointC = dewPointTemperature(tempC, humidity);
  // Example THI form often used for dairy-cattle heat-stress education.
  return tempC + 0.36f * dewPointC + 41.2f;
}

float calcEnvironmentIndex(EnvironmentIndexType type, float tempC, float humidity) {
  switch (type) {
    case ENV_INDEX_DI:
      return discomfortIndex(tempC, humidity);
    case ENV_INDEX_HEAT_INDEX:
      return heatIndexC(tempC, humidity);
    case ENV_INDEX_HUMIDEX:
      return humidex(tempC, humidity);
    case ENV_INDEX_DEW_POINT:
      return dewPointTemperature(tempC, humidity);
    case ENV_INDEX_ABSOLUTE_HUMIDITY:
      return calcAbsoluteHumidity(tempC, humidity);
    case ENV_INDEX_WET_BULB:
      return wetBulbTemperature(tempC, humidity);
    case ENV_INDEX_VPD:
      return vaporPressureDeficitKPa(tempC, humidity);
    case ENV_INDEX_VAPOR_PRESSURE:
      return vaporPressureKPa(tempC, humidity);
    case ENV_INDEX_THI:
      return temperatureHumidityIndex(tempC, humidity);
    case ENV_INDEX_ESTIMATED_WBGT:
      return calcSimpleWBGT(tempC, humidity);
    default:
      return NAN;
  }
}
