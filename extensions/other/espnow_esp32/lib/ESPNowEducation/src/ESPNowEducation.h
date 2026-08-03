#ifndef ESP_NOW_EDUCATION_H
#define ESP_NOW_EDUCATION_H

#include <Arduino.h>
#include <WiFi.h>
#include <esp_now.h>
#include <esp_idf_version.h>

class ESPNowEducation {
public:
  ESPNowEducation();

  bool begin();
  bool send(const String &message, const String &destinationMac = "");

  bool hasNewData();
  String receivedText() const;
  String senderMac() const;
  bool lastSendSucceeded() const;
  bool isReady() const;

private:
  static const size_t MAX_TEXT_BYTES = 240;
  static ESPNowEducation *instance_;

  bool ready_;
  volatile bool newData_;
  volatile bool lastSendSuccess_;
  char receivedText_[MAX_TEXT_BYTES + 1];
  char senderMac_[18];
  mutable portMUX_TYPE mux_;

  bool parseMac(const String &text, uint8_t mac[6]) const;
  bool ensurePeer(const uint8_t mac[6]);
  void storeReceived(const uint8_t mac[6], const uint8_t *data, int len);
  static void formatMac(const uint8_t mac[6], char out[18]);

  static void onSendStatic(const uint8_t *mac, esp_now_send_status_t status);
#if ESP_IDF_VERSION_MAJOR >= 5
  static void onReceiveStatic(const esp_now_recv_info_t *info, const uint8_t *data, int len);
#else
  static void onReceiveStatic(const uint8_t *mac, const uint8_t *data, int len);
#endif
};

#endif
