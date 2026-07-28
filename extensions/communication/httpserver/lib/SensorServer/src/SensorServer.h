#ifndef SENSOR_SERVER_H
#define SENSOR_SERVER_H

#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>

class SensorServer {
public:
  static const uint8_t MAX_ITEMS = 8;

  SensorServer();
  ~SensorServer();
  void begin(const String& title = "ESP32 HTTP Server", uint16_t port = 80);
  void setDeviceName(const String& name);
  void setUpdateInterval(unsigned long milliseconds);

  bool registerItem(uint8_t itemNumber, const String& label, const String& unit = "");
  bool updateItem(uint8_t itemNumber, const String& value);
  bool clearItem(uint8_t itemNumber);
  void clearAllItems();

  // Compatibility with Ver.2.0.x fixed sensor blocks.
  void setValues(float temperature, float humidity);
  void setValues(float temperature, float humidity, float wbgt);

  void handleClient();
  String ipAddress() const;
  String url() const;
  bool isRunning() const;

private:
  struct DisplayItem {
    String label;
    String value;
    String unit;
    bool registered;
  };

  WebServer* server_;
  String title_;
  String deviceName_;
  DisplayItem items_[MAX_ITEMS];
  bool running_;
  unsigned long updateIntervalMs_;

  int itemIndex(uint8_t itemNumber) const;
  void registerRoutes();
  void handleRoot();
  void handleJson();
  String makeHtml() const;
  String makeJson() const;
  static String htmlEscape(const String& text);
  static String jsonEscape(const String& text);
};

#endif
