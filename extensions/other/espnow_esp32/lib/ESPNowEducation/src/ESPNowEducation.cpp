#include "ESPNowEducation.h"
#include <esp_wifi.h>

ESPNowEducation *ESPNowEducation::instance_ = nullptr;

ESPNowEducation::ESPNowEducation()
  : ready_(false),
    newData_(false),
    lastSendSuccess_(false),
    mux_(portMUX_INITIALIZER_UNLOCKED) {
  receivedText_[0] = '\0';
  senderMac_[0] = '\0';
}

bool ESPNowEducation::begin(bool longRange) {
  if (ready_) return true;

  WiFi.mode(WIFI_STA);
  delay(20);

  // Select the Wi-Fi protocol before ESP-NOW is initialized.
  // NORMAL: standard 802.11 b/g/n
  // LONG RANGE: Espressif proprietary LR mode
  uint8_t protocol = longRange
      ? WIFI_PROTOCOL_LR
      : (WIFI_PROTOCOL_11B | WIFI_PROTOCOL_11G | WIFI_PROTOCOL_11N);

  if (esp_wifi_set_protocol(WIFI_IF_STA, protocol) != ESP_OK) {
    ready_ = false;
    return false;
  }

  if (esp_now_init() != ESP_OK) {
    ready_ = false;
    return false;
  }

  instance_ = this;
  esp_now_register_send_cb(onSendStatic);
  esp_now_register_recv_cb(onReceiveStatic);

  const uint8_t broadcast[6] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF};
  ready_ = ensurePeer(broadcast);
  return ready_;
}

bool ESPNowEducation::send(const String &message, const String &destinationMac) {
  if (!ready_ && !begin()) return false;

  String address = destinationMac;
  address.trim();

  uint8_t destination[6];
  if (address.length() == 0) {
    memset(destination, 0xFF, sizeof(destination));
  } else if (!parseMac(address, destination)) {
    lastSendSuccess_ = false;
    return false;
  }

  if (!ensurePeer(destination)) {
    lastSendSuccess_ = false;
    return false;
  }

  size_t length = message.length();
  if (length > MAX_TEXT_BYTES) length = MAX_TEXT_BYTES;

  lastSendSuccess_ = false;
  esp_err_t result = esp_now_send(destination,
                                  reinterpret_cast<const uint8_t *>(message.c_str()),
                                  length);
  return result == ESP_OK;
}

bool ESPNowEducation::hasNewData() {
  bool result;
  portENTER_CRITICAL(&mux_);
  result = newData_;
  newData_ = false;
  portEXIT_CRITICAL(&mux_);
  return result;
}

String ESPNowEducation::receivedText() const {
  char copy[MAX_TEXT_BYTES + 1];
  portENTER_CRITICAL(&mux_);
  memcpy(copy, receivedText_, sizeof(copy));
  portEXIT_CRITICAL(&mux_);
  copy[MAX_TEXT_BYTES] = '\0';
  return String(copy);
}

String ESPNowEducation::senderMac() const {
  char copy[18];
  portENTER_CRITICAL(&mux_);
  memcpy(copy, senderMac_, sizeof(copy));
  portEXIT_CRITICAL(&mux_);
  copy[17] = '\0';
  return String(copy);
}

bool ESPNowEducation::lastSendSucceeded() const {
  return lastSendSuccess_;
}

bool ESPNowEducation::isReady() const {
  return ready_;
}

uint8_t ESPNowEducation::protocolBitmap() const {
  uint8_t protocol = 0;
  if (esp_wifi_get_protocol(WIFI_IF_STA, &protocol) != ESP_OK) {
    return 0;
  }
  return protocol;
}

void ESPNowEducation::printProtocolInfo(uint32_t baud) const {
  Serial.begin(baud);
  delay(100);

  uint8_t protocol = 0;
  esp_err_t result = esp_wifi_get_protocol(WIFI_IF_STA, &protocol);

  Serial.println();
  Serial.println("========================================");
  Serial.println(" ESP-NOW Wi-Fi Protocol Diagnostic");
  Serial.println("========================================");

  if (result != ESP_OK) {
    Serial.print("esp_wifi_get_protocol failed: ");
    Serial.println((int)result);
    Serial.println("========================================");
    return;
  }

  Serial.print("Protocol bitmap : 0x");
  if (protocol < 0x10) Serial.print('0');
  Serial.println(protocol, HEX);

  Serial.print("802.11b         : ");
  Serial.println((protocol & WIFI_PROTOCOL_11B) ? "ON" : "OFF");
  Serial.print("802.11g         : ");
  Serial.println((protocol & WIFI_PROTOCOL_11G) ? "ON" : "OFF");
  Serial.print("802.11n         : ");
  Serial.println((protocol & WIFI_PROTOCOL_11N) ? "ON" : "OFF");
  Serial.print("Long Range (LR) : ");
  Serial.println((protocol & WIFI_PROTOCOL_LR) ? "ON" : "OFF");

  Serial.print("Detected mode   : ");
  if (protocol == WIFI_PROTOCOL_LR) {
    Serial.println("LR ONLY");
  } else if ((protocol & WIFI_PROTOCOL_LR) != 0) {
    Serial.println("NORMAL + LR (mixed)");
  } else {
    Serial.println("NORMAL (no LR flag)");
  }

  Serial.println("========================================");
  Serial.println();
}

bool ESPNowEducation::parseMac(const String &text, uint8_t mac[6]) const {
  unsigned int values[6];
  int count = sscanf(text.c_str(), "%x:%x:%x:%x:%x:%x",
                     &values[0], &values[1], &values[2],
                     &values[3], &values[4], &values[5]);
  if (count != 6) {
    count = sscanf(text.c_str(), "%x-%x-%x-%x-%x-%x",
                   &values[0], &values[1], &values[2],
                   &values[3], &values[4], &values[5]);
  }
  if (count != 6) return false;

  for (int i = 0; i < 6; i++) {
    if (values[i] > 0xFF) return false;
    mac[i] = static_cast<uint8_t>(values[i]);
  }
  return true;
}

bool ESPNowEducation::ensurePeer(const uint8_t mac[6]) {
  if (esp_now_is_peer_exist(mac)) return true;

  esp_now_peer_info_t peer = {};
  memcpy(peer.peer_addr, mac, 6);
  peer.channel = 0;
  peer.encrypt = false;
  peer.ifidx = WIFI_IF_STA;

  esp_err_t result = esp_now_add_peer(&peer);
  return result == ESP_OK || result == ESP_ERR_ESPNOW_EXIST;
}

void ESPNowEducation::storeReceived(const uint8_t mac[6], const uint8_t *data, int len) {
  if (!mac || !data || len < 0) return;

  size_t copyLength = static_cast<size_t>(len);
  if (copyLength > MAX_TEXT_BYTES) copyLength = MAX_TEXT_BYTES;

  char macText[18];
  formatMac(mac, macText);

  portENTER_CRITICAL(&mux_);
  memcpy(receivedText_, data, copyLength);
  receivedText_[copyLength] = '\0';
  memcpy(senderMac_, macText, sizeof(senderMac_));
  newData_ = true;
  portEXIT_CRITICAL(&mux_);
}

void ESPNowEducation::formatMac(const uint8_t mac[6], char out[18]) {
  snprintf(out, 18, "%02X:%02X:%02X:%02X:%02X:%02X",
           mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
}

void ESPNowEducation::onSendStatic(const uint8_t *, esp_now_send_status_t status) {
  if (instance_) {
    instance_->lastSendSuccess_ = (status == ESP_NOW_SEND_SUCCESS);
  }
}

#if ESP_IDF_VERSION_MAJOR >= 5
void ESPNowEducation::onReceiveStatic(const esp_now_recv_info_t *info,
                                      const uint8_t *data,
                                      int len) {
  if (instance_ && info) {
    instance_->storeReceived(info->src_addr, data, len);
  }
}
#else
void ESPNowEducation::onReceiveStatic(const uint8_t *mac,
                                      const uint8_t *data,
                                      int len) {
  if (instance_) {
    instance_->storeReceived(mac, data, len);
  }
}
#endif
