#include <Environment.h>

void setup() {
  Serial.begin(115200);

  const float temperature = 24.8f;
  const float humidity = 44.4f;
  const float wetBulb = wetBulbTemperature(temperature, humidity);
  const float wbgt = calcSimpleWBGT(temperature, humidity);

  Serial.print("Wet bulb: ");
  Serial.println(wetBulb, 1);
  Serial.print("WBGT: ");
  Serial.println(wbgt, 1);
  Serial.print("Level number: ");
  Serial.println(wbgtLevel(wbgt));
  Serial.print("Level text: ");
  Serial.println(wbgtLevelText(wbgt));
}

void loop() {
}
