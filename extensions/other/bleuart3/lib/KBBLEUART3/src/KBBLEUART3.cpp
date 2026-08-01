#include "KBBLEUART3.h"
#include <cstring>
#include <vector>

namespace {
const char* SERVICE_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
const char* TX_UUID = "6E400003-B5A3-F393-E0A9-E50E24DCCA9E";
const char* RX_UUID = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E";
KBBLEUART3* gInstance = nullptr;

class ServerCallbacks final : public BLEServerCallbacks {
  void onConnect(BLEServer*) override { if (gInstance) gInstance->onPeripheralConnect(); }
  void onDisconnect(BLEServer* server) override { if (gInstance) gInstance->onPeripheralDisconnect(server); }
};

class ClientCallbacks final : public BLEClientCallbacks {
  void onConnect(BLEClient*) override {}
  void onDisconnect(BLEClient*) override { if (gInstance) gInstance->onCentralDisconnect(); }
};

class ScanCallbacks final : public BLEAdvertisedDeviceCallbacks {
  void onResult(BLEAdvertisedDevice device) override { if (gInstance) gInstance->onAdvertised(device); }
};

class RxCallbacks final : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic* characteristic) override {
    if (!gInstance || !characteristic) return;
    String value = characteristic->getValue();
    gInstance->onWrite(reinterpret_cast<const uint8_t*>(value.c_str()), value.length());
  }
};

void notifyCallback(BLERemoteCharacteristic*, uint8_t* data, size_t length, bool) {
  if (gInstance) gInstance->onNotify(data, length);
}
}

const char* KBBLEUART3::libraryVersion() { return "3.0.2"; }

KBBLEUART3::KBBLEUART3()
  : _mode(MODE_NONE), _bleInitialized(false), _server(nullptr),
    _txCharacteristic(nullptr), _rxCharacteristic(nullptr), _client(nullptr),
    _remoteTx(nullptr), _remoteRx(nullptr), _deviceCount(0), _scanPrefix(""),
    _connected(false), _lastSendOk(false), _receivedFlag(false), _receivedText("") {
  for (int i = 0; i < MAX_DEVICES; ++i) _devices[i] = nullptr;
  for (int i = 0; i < 8; ++i) _fields[i] = "";
}

bool KBBLEUART3::initialize(const String& name, Mode mode) {
  if (_mode != MODE_NONE) return _mode == mode;
  String safeName = name.length() ? name : (mode == MODE_PERIPHERAL ? "ESP32_BLE_UART" : "KidsBlock_BLE_Central");
  gInstance = this;
  BLEDevice::init(safeName.c_str());
  _bleInitialized = true;
  _mode = mode;
  return true;
}

bool KBBLEUART3::beginPeripheral(const String& deviceName) {
  if (!initialize(deviceName, MODE_PERIPHERAL)) return false;
  _server = BLEDevice::createServer();
  if (!_server) return false;
  _server->setCallbacks(new ServerCallbacks());
  BLEService* service = _server->createService(SERVICE_UUID);
  if (!service) return false;
  _txCharacteristic = service->createCharacteristic(TX_UUID, BLECharacteristic::PROPERTY_NOTIFY);
  _txCharacteristic->addDescriptor(new BLE2902());
  _rxCharacteristic = service->createCharacteristic(
      RX_UUID, BLECharacteristic::PROPERTY_WRITE | BLECharacteristic::PROPERTY_WRITE_NR);
  _rxCharacteristic->setCallbacks(new RxCallbacks());
  service->start();
  BLEAdvertising* advertising = BLEDevice::getAdvertising();
  advertising->addServiceUUID(SERVICE_UUID);
  advertising->setScanResponse(true);
  advertising->setMinPreferred(0x06);
  advertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
  _connected = false;
  return true;
}

bool KBBLEUART3::beginCentral(const String& localName) {
  return initialize(localName, MODE_CENTRAL);
}

void KBBLEUART3::clearDevices() {
  for (int i = 0; i < _deviceCount; ++i) { delete _devices[i]; _devices[i] = nullptr; }
  _deviceCount = 0;
}

bool KBBLEUART3::duplicateAddress(BLEAdvertisedDevice& device) const {
  String address(device.getAddress().toString().c_str());
  for (int i = 0; i < _deviceCount; ++i) {
    if (_devices[i] && String(_devices[i]->getAddress().toString().c_str()) == address) return true;
  }
  return false;
}

void KBBLEUART3::onAdvertised(BLEAdvertisedDevice& device) {
  if (_deviceCount >= MAX_DEVICES) return;
  if (!device.haveServiceUUID() || !device.isAdvertisingService(BLEUUID(SERVICE_UUID))) return;
  String name = device.haveName() ? String(device.getName().c_str()) : "";
  if (_scanPrefix.length() && !name.startsWith(_scanPrefix)) return;
  if (duplicateAddress(device)) return;
  _devices[_deviceCount] = new BLEAdvertisedDevice(device);
  if (_devices[_deviceCount]) ++_deviceCount;
}

int KBBLEUART3::scan(uint32_t seconds, const String& namePrefix) {
  if (_mode == MODE_NONE && !beginCentral()) return 0;
  if (_mode != MODE_CENTRAL) return 0;
  disconnect();
  clearDevices();
  _scanPrefix = namePrefix;
  BLEScan* scanner = BLEDevice::getScan();
  if (!scanner) return 0;
  scanner->setAdvertisedDeviceCallbacks(new ScanCallbacks(), true);
  scanner->setActiveScan(true);
  scanner->setInterval(100);
  scanner->setWindow(99);
  scanner->start(seconds, false);
  scanner->stop();
  scanner->clearResults();
  return _deviceCount;
}

int KBBLEUART3::deviceCount() const { return _deviceCount; }
String KBBLEUART3::deviceName(int index) const {
  if (index < 1 || index > _deviceCount || !_devices[index - 1]) return "";
  return _devices[index - 1]->haveName() ? String(_devices[index - 1]->getName().c_str()) : String("(名前なし)");
}
String KBBLEUART3::deviceAddress(int index) const {
  if (index < 1 || index > _deviceCount || !_devices[index - 1]) return "";
  return String(_devices[index - 1]->getAddress().toString().c_str());
}
int KBBLEUART3::deviceRSSI(int index) const {
  if (index < 1 || index > _deviceCount || !_devices[index - 1]) return 0;
  return _devices[index - 1]->getRSSI();
}

bool KBBLEUART3::connectIndex(int index) {
  if (_mode != MODE_CENTRAL || index < 1 || index > _deviceCount || !_devices[index - 1]) return false;
  disconnect();
  _client = BLEDevice::createClient();
  if (!_client) return false;
  _client->setClientCallbacks(new ClientCallbacks());
  if (!_client->connect(_devices[index - 1])) { delete _client; _client = nullptr; return false; }
  _client->setMTU(185);
  BLERemoteService* service = _client->getService(BLEUUID(SERVICE_UUID));
  if (!service) { disconnect(); return false; }
  _remoteTx = service->getCharacteristic(BLEUUID(TX_UUID));
  _remoteRx = service->getCharacteristic(BLEUUID(RX_UUID));
  if (!_remoteTx || !_remoteTx->canNotify()) { disconnect(); return false; }
  _remoteTx->registerForNotify(notifyCallback);
  _connected = true;
  return true;
}

void KBBLEUART3::disconnect() {
  if (_client && _client->isConnected()) _client->disconnect();
  _connected = false;
  _remoteTx = nullptr;
  _remoteRx = nullptr;
}

bool KBBLEUART3::send(const String& text) {
  _lastSendOk = false;
  if (!_connected || !text.length()) return false;
  const size_t length = text.length();
  if (_mode == MODE_PERIPHERAL && _txCharacteristic) {
    std::vector<uint8_t> buffer(text.c_str(), text.c_str() + length);
    _txCharacteristic->setValue(buffer.data(), buffer.size());
    _txCharacteristic->notify();
    _lastSendOk = true;
  } else if (_mode == MODE_CENTRAL && _remoteRx) {
    std::vector<uint8_t> buffer(text.c_str(), text.c_str() + length);
    if (_remoteRx->canWrite()) { _remoteRx->writeValue(buffer.data(), buffer.size(), true); _lastSendOk = true; }
    else if (_remoteRx->canWriteNoResponse()) { _remoteRx->writeValue(buffer.data(), buffer.size(), false); _lastSendOk = true; }
  }
  return _lastSendOk;
}

String KBBLEUART3::join(const String values[], int count) const {
  String result;
  for (int i = 0; i < count; ++i) { if (i) result += ','; result += values[i]; }
  return result;
}
#define SEND_IMPL(N, ...) bool KBBLEUART3::send##N(__VA_ARGS__)
SEND_IMPL(1, const String& a) { const String v[] = {a}; return send(join(v,1)); }
SEND_IMPL(2, const String& a,const String& b) { const String v[] = {a,b}; return send(join(v,2)); }
SEND_IMPL(3, const String& a,const String& b,const String& c) { const String v[] = {a,b,c}; return send(join(v,3)); }
SEND_IMPL(4, const String& a,const String& b,const String& c,const String& d) { const String v[] = {a,b,c,d}; return send(join(v,4)); }
SEND_IMPL(5, const String& a,const String& b,const String& c,const String& d,const String& e) { const String v[] = {a,b,c,d,e}; return send(join(v,5)); }
SEND_IMPL(6, const String& a,const String& b,const String& c,const String& d,const String& e,const String& f) { const String v[] = {a,b,c,d,e,f}; return send(join(v,6)); }
SEND_IMPL(7, const String& a,const String& b,const String& c,const String& d,const String& e,const String& f,const String& g) { const String v[] = {a,b,c,d,e,f,g}; return send(join(v,7)); }
SEND_IMPL(8, const String& a,const String& b,const String& c,const String& d,const String& e,const String& f,const String& g,const String& h) { const String v[] = {a,b,c,d,e,f,g,h}; return send(join(v,8)); }
#undef SEND_IMPL

bool KBBLEUART3::isConnected() const { return _connected; }
bool KBBLEUART3::lastSendSucceeded() const { return _lastSendOk; }
bool KBBLEUART3::received() const { return _receivedFlag; }
String KBBLEUART3::receivedText() const { return _receivedText; }
String KBBLEUART3::field(int number) const { return (number >= 1 && number <= 8) ? _fields[number - 1] : String(""); }
float KBBLEUART3::fieldNumber(int number) const { return field(number).toFloat(); }
void KBBLEUART3::clearReceived() { _receivedFlag = false; _receivedText = ""; for (int i=0;i<8;++i) _fields[i]=""; }

void KBBLEUART3::parseFields() {
  for (int i=0;i<8;++i) _fields[i]="";
  int start=0, number=0, length=_receivedText.length();
  for (int i=0; i<=length && number<8; ++i) {
    if (i==length || _receivedText.charAt(i)==',') { _fields[number++] = _receivedText.substring(start,i); start=i+1; }
  }
}
void KBBLEUART3::storeReceived(const uint8_t* data, size_t length) {
  if (!data) return;
  String value; value.reserve(length);
  for (size_t i=0;i<length;++i) value += static_cast<char>(data[i]);
  _receivedText=value; parseFields(); _receivedFlag=true;
}
void KBBLEUART3::onNotify(const uint8_t* data, size_t length) { storeReceived(data,length); }
void KBBLEUART3::onWrite(const uint8_t* data, size_t length) { storeReceived(data,length); }
void KBBLEUART3::onPeripheralConnect() { _connected=true; }
void KBBLEUART3::onPeripheralDisconnect(BLEServer* server) { _connected=false; _lastSendOk=false; delay(100); if(server) server->getAdvertising()->start(); }
void KBBLEUART3::onCentralDisconnect() { _connected=false; _lastSendOk=false; }
