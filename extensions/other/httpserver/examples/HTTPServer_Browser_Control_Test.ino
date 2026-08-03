#include <WiFi.h>
#include <SensorServer32.h>

SensorServer32 server;

void setup() {
  Serial.begin(115200);
  // Wi-Fi接続後に使用してください。
  server.registerBrowserControl(1, "LED", "点灯", "消灯", false);
  server.setExclusiveGroupLabel("サーボ角度");
  server.registerExclusiveOption(1, "0度");
  server.registerExclusiveOption(2, "90度");
  server.registerExclusiveOption(3, "180度");
  server.selectExclusiveOption(1);
  server.begin("IoTコントローラー");
}

void loop() {
  server.handleClient();
}
