#include <WiFi.h>
#include <NTPClock.h>

const char* ssid = "";
const char* password = "";
NTPClock ntpClock;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  ntpClock.begin("ntp.nict.jp", 9, 60000);
}

void loop() {
  ntpClock.update();
  if (ntpClock.isTimeValid()) {
    Serial.print(ntpClock.dateString());
    Serial.print(" ");
    Serial.println(ntpClock.timeString());
  }
  delay(1000);
}
