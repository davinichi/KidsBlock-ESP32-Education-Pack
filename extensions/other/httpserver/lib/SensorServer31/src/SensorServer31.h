#ifndef SENSOR_SERVER31_H
#define SENSOR_SERVER31_H

#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>

class SensorServer31 {
public:
  static const uint8_t MAX_ITEMS = 8;
  static const uint8_t MAX_GPIO_CONTROLS = 4;

  SensorServer31();
  ~SensorServer31();
  void begin(const String& title = "ESP32 HTTP Server", uint16_t port = 80);
  void setDeviceName(const String& name);
  void setUpdateInterval(unsigned long milliseconds);

  bool registerItem(uint8_t itemNumber, const String& label, const String& unit = "");
  bool updateItem(uint8_t itemNumber, const String& value);
  bool clearItem(uint8_t itemNumber);
  void clearAllItems();

  bool registerBrowserControl(uint8_t controlNumber, const String& label, const String& highButtonLabel, const String& lowButtonLabel, bool initialState = false) {
    if (controlNumber < 1 || controlNumber > MAX_GPIO_CONTROLS) return false;
    const int index = static_cast<int>(controlNumber - 1);
    gpioControls_[index].label = label;
    gpioControls_[index].highButtonLabel = highButtonLabel;
    gpioControls_[index].lowButtonLabel = lowButtonLabel;
    gpioControls_[index].pin = -1;
    gpioControls_[index].state = initialState;
    gpioControls_[index].registered = true;
    return true;
  }
  bool setBrowserControlState(uint8_t controlNumber, bool state) {
    if (controlNumber < 1 || controlNumber > MAX_GPIO_CONTROLS) return false;
    const int index = static_cast<int>(controlNumber - 1);
    if (!gpioControls_[index].registered) return false;
    gpioControls_[index].state = state;
    return true;
  }
  bool browserControlState(uint8_t controlNumber) const {
    if (controlNumber < 1 || controlNumber > MAX_GPIO_CONTROLS) return false;
    const int index = static_cast<int>(controlNumber - 1);
    if (!gpioControls_[index].registered) return false;
    return gpioControls_[index].state;
  }

  // Compatibility with early Ver.3.0 generated code.
  bool registerGpioControl(uint8_t controlNumber, int pin, const String& label, bool initialState = false);
  bool setGpioState(uint8_t controlNumber, bool state);
  bool gpioState(uint8_t controlNumber) const;
  bool clearGpioControl(uint8_t controlNumber);
  void clearAllGpioControls();

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

  struct GpioControl {
    String label;
    String highButtonLabel;
    String lowButtonLabel;
    int pin;
    bool state;
    bool registered;
  };

  WebServer* server_;
  String title_;
  String deviceName_;
  DisplayItem items_[MAX_ITEMS];
  GpioControl gpioControls_[MAX_GPIO_CONTROLS];
  bool running_;
  unsigned long updateIntervalMs_;

  int itemIndex(uint8_t itemNumber) const;
  int gpioIndex(uint8_t controlNumber) const;
  void registerRoutes();
  void handleRoot();
  void handleJson();
  void handleGpio();
  String makeHtml() const;
  String makeJson() const;
  static String htmlEscape(const String& text);
  static String jsonEscape(const String& text);
};

#endif
