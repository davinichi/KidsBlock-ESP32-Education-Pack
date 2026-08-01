#include <WiFi.h>
#include <SensorServer31.h>

SensorServer31 kbHttpServer;
const int LED_PIN = 23;

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);

  // WiFi.begin("SSID", "PASSWORD");
  // Wi-Fi接続完了後に実行してください。

  kbHttpServer.registerBrowserControl(1, "LED", "点灯", "消灯", LOW);
  kbHttpServer.begin("IoTコントローラー");
}

void loop() {
  kbHttpServer.handleClient();
  digitalWrite(LED_PIN, kbHttpServer.browserControlState(1) ? HIGH : LOW);
}
