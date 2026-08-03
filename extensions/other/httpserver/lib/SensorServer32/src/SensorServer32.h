#ifndef SENSOR_SERVER32_H
#define SENSOR_SERVER32_H

#define SENSOR_SERVER32_VERSION "3.3.1"

#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>

class SensorServer32 {
public:
  static const uint8_t MAX_ITEMS = 8;
  static const uint8_t MAX_BROWSER_CONTROLS = 8;
  static const uint8_t MAX_EXCLUSIVE_OPTIONS = 8;

  SensorServer32();
  ~SensorServer32();
  void begin(const String& title = "ESP32 HTTP Server", uint16_t port = 80);
  void setDeviceName(const String& name);
  void setUpdateInterval(unsigned long milliseconds);

  bool registerItem(uint8_t itemNumber, const String& label, const String& unit = "");
  bool updateItem(uint8_t itemNumber, const String& value);
  bool clearItem(uint8_t itemNumber);
  void clearAllItems();

  bool registerBrowserControl(uint8_t controlNumber, const String& label,
                              const String& highButtonLabel,
                              const String& lowButtonLabel,
                              bool initialState = false);
  bool setBrowserControlState(uint8_t controlNumber, bool state);
  bool browserControlState(uint8_t controlNumber) const;
  bool clearBrowserControl(uint8_t controlNumber);
  void clearAllBrowserControls();

  void setExclusiveGroupLabel(const String& label);
  bool registerExclusiveOption(uint8_t optionNumber, const String& label);
  bool selectExclusiveOption(uint8_t optionNumber);
  bool exclusiveOptionSelected(uint8_t optionNumber) const;
  uint8_t selectedExclusiveOption() const;
  void clearAllExclusiveOptions();

  // Compatibility with Ver.3.0 generated code.
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

  struct BrowserControl {
    String label;
    String highButtonLabel;
    String lowButtonLabel;
    int pin;
    bool state;
    bool registered;
  };

  struct ExclusiveOption {
    String label;
    bool registered;
  };

  WebServer* server_;
  String title_;
  String deviceName_;
  DisplayItem items_[MAX_ITEMS];
  BrowserControl browserControls_[MAX_BROWSER_CONTROLS];
  ExclusiveOption exclusiveOptions_[MAX_EXCLUSIVE_OPTIONS];
  String exclusiveGroupLabel_;
  uint8_t selectedExclusiveOption_;
  bool running_;
  unsigned long updateIntervalMs_;

  int itemIndex(uint8_t itemNumber) const;
  int browserControlIndex(uint8_t controlNumber) const;
  int exclusiveOptionIndex(uint8_t optionNumber) const;
  void registerRoutes();
  void handleRoot();
  void handleJson();
  void handleBrowserControl();
  void handleExclusiveOption();
  String makeHtml() const;
  String makeJson() const;
  static String htmlEscape(const String& text);
  static String jsonEscape(const String& text);
};

#endif
