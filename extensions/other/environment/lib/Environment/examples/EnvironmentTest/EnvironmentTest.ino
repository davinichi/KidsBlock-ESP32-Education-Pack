#include <Environment.h>

void setup() {
  Serial.begin(115200);

  const float temperature = 30.0f;
  const float humidity = 70.0f;

  Serial.print("DI: ");
  Serial.println(calcEnvironmentIndex(ENV_INDEX_DI, temperature, humidity), 1);
  Serial.print("Heat Index C: ");
  Serial.println(calcEnvironmentIndex(ENV_INDEX_HEAT_INDEX, temperature, humidity), 1);
  Serial.print("Humidex: ");
  Serial.println(calcEnvironmentIndex(ENV_INDEX_HUMIDEX, temperature, humidity), 1);
  Serial.print("Dew point C: ");
  Serial.println(calcEnvironmentIndex(ENV_INDEX_DEW_POINT, temperature, humidity), 1);
  Serial.print("Absolute humidity g/m3: ");
  Serial.println(calcEnvironmentIndex(ENV_INDEX_ABSOLUTE_HUMIDITY, temperature, humidity), 1);
  Serial.print("Wet bulb C: ");
  Serial.println(calcEnvironmentIndex(ENV_INDEX_WET_BULB, temperature, humidity), 1);
  Serial.print("VPD kPa: ");
  Serial.println(calcEnvironmentIndex(ENV_INDEX_VPD, temperature, humidity), 2);
  Serial.print("Vapor pressure kPa: ");
  Serial.println(calcEnvironmentIndex(ENV_INDEX_VAPOR_PRESSURE, temperature, humidity), 2);
  Serial.print("THI: ");
  Serial.println(calcEnvironmentIndex(ENV_INDEX_THI, temperature, humidity), 1);
  Serial.print("Estimated WBGT C: ");
  Serial.println(calcEnvironmentIndex(ENV_INDEX_ESTIMATED_WBGT, temperature, humidity), 1);
}

void loop() {
}
