#ifndef KB_BLE_UART3_H
#define KB_BLE_UART3_H

#include <Arduino.h>
#if !defined(ESP32)
#error "KBBLEUART3 supports ESP32 boards only."
#endif

#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEClient.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <BLEScan.h>
#include <BLEAdvertisedDevice.h>

class KBBLEUART3 {
public:
  KBBLEUART3();
  static const char* libraryVersion();

  // Peripheral (sender/server)
  bool beginPeripheral(const String& deviceName = "ESP32_BLE_UART");

  // Central (receiver/client)
  bool beginCentral(const String& localName = "KidsBlock_BLE_Central");
  int scan(uint32_t seconds = 5, const String& namePrefix = "");
  int deviceCount() const;
  String deviceName(int index) const;
  String deviceAddress(int index) const;
  int deviceRSSI(int index) const;
  bool connectIndex(int index);
  void disconnect();

  // Send
  bool send(const String& text);
  bool send1(const String& v1);
  bool send2(const String& v1, const String& v2);
  bool send3(const String& v1, const String& v2, const String& v3);
  bool send4(const String& v1, const String& v2, const String& v3, const String& v4);
  bool send5(const String& v1, const String& v2, const String& v3, const String& v4, const String& v5);
  bool send6(const String& v1, const String& v2, const String& v3, const String& v4, const String& v5, const String& v6);
  bool send7(const String& v1, const String& v2, const String& v3, const String& v4, const String& v5, const String& v6, const String& v7);
  bool send8(const String& v1, const String& v2, const String& v3, const String& v4, const String& v5, const String& v6, const String& v7, const String& v8);

  // Status / received data
  bool isConnected() const;
  bool lastSendSucceeded() const;
  bool received() const;
  String receivedText() const;
  String field(int number) const;
  float fieldNumber(int number) const;
  void clearReceived();

  // Callback entry points
  void onPeripheralConnect();
  void onPeripheralDisconnect(BLEServer* server);
  void onCentralDisconnect();
  void onNotify(const uint8_t* data, size_t length);
  void onWrite(const uint8_t* data, size_t length);
  void onAdvertised(BLEAdvertisedDevice& device);

private:
  enum Mode { MODE_NONE, MODE_PERIPHERAL, MODE_CENTRAL };
  static const int MAX_DEVICES = 20;

  bool initialize(const String& name, Mode mode);
  String join(const String values[], int count) const;
  void storeReceived(const uint8_t* data, size_t length);
  void parseFields();
  void clearDevices();
  bool duplicateAddress(BLEAdvertisedDevice& device) const;

  Mode _mode;
  bool _bleInitialized;
  BLEServer* _server;
  BLECharacteristic* _txCharacteristic;
  BLECharacteristic* _rxCharacteristic;
  BLEClient* _client;
  BLERemoteCharacteristic* _remoteTx;
  BLERemoteCharacteristic* _remoteRx;
  BLEAdvertisedDevice* _devices[MAX_DEVICES];
  int _deviceCount;
  String _scanPrefix;
  volatile bool _connected;
  bool _lastSendOk;
  volatile bool _receivedFlag;
  String _receivedText;
  String _fields[8];
};

#endif
