#include "KBThingSpeak.h"
#include <math.h>

#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif

namespace {
const char* THINGSPEAK_HOST = "api.thingspeak.com";
const uint16_t THINGSPEAK_PORT = 80;
const unsigned long HTTP_TIMEOUT_MS = 10000UL;
}

KBThingSpeak::KBThingSpeak()
    : _channelId(0),
      _lastEntry(0),
      _lastReadOk(false),
      _lastReadCode(0),
      _lastReadError("") {}

void KBThingSpeak::begin(unsigned long channelId, const char* writeApiKey) {
  _channelId = channelId;
  _writeApiKey = writeApiKey == nullptr ? "" : writeApiKey;
  _lastEntry = 0;
}

void KBThingSpeak::begin(unsigned long channelId, const String& writeApiKey) {
  begin(channelId, writeApiKey.c_str());
}

int KBThingSpeak::send1(const String& f1) {
  const String values[] = {f1}; return sendValues(values, 1);
}
int KBThingSpeak::send2(const String& f1, const String& f2) {
  const String values[] = {f1, f2}; return sendValues(values, 2);
}
int KBThingSpeak::send3(const String& f1, const String& f2, const String& f3) {
  const String values[] = {f1, f2, f3}; return sendValues(values, 3);
}
int KBThingSpeak::send4(const String& f1, const String& f2, const String& f3, const String& f4) {
  const String values[] = {f1, f2, f3, f4}; return sendValues(values, 4);
}
int KBThingSpeak::send5(const String& f1, const String& f2, const String& f3, const String& f4, const String& f5) {
  const String values[] = {f1, f2, f3, f4, f5}; return sendValues(values, 5);
}
int KBThingSpeak::send6(const String& f1, const String& f2, const String& f3, const String& f4, const String& f5, const String& f6) {
  const String values[] = {f1, f2, f3, f4, f5, f6}; return sendValues(values, 6);
}
int KBThingSpeak::send7(const String& f1, const String& f2, const String& f3, const String& f4, const String& f5, const String& f6, const String& f7) {
  const String values[] = {f1, f2, f3, f4, f5, f6, f7}; return sendValues(values, 7);
}
int KBThingSpeak::send8(const String& f1, const String& f2, const String& f3, const String& f4, const String& f5, const String& f6, const String& f7, const String& f8) {
  const String values[] = {f1, f2, f3, f4, f5, f6, f7, f8}; return sendValues(values, 8);
}

int KBThingSpeak::lastEntryNumber() const { return _lastEntry; }
bool KBThingSpeak::lastSendSucceeded() const { return _lastEntry > 0; }

float KBThingSpeak::readLatestField(unsigned long channelId, int fieldNumber, const char* readApiKey) {
  _lastReadOk = false;
  _lastReadCode = 0;
  _lastReadError = "";

  if (WiFi.status() != WL_CONNECTED) {
    _lastReadError = "Wi-Fi not connected";
    return NAN;
  }
  if (channelId == 0) {
    _lastReadError = "Invalid channel ID";
    return NAN;
  }
  if (fieldNumber < 1 || fieldNumber > 8) {
    _lastReadError = "Field must be 1-8";
    return NAN;
  }

  String path = "/channels/" + String(channelId) + "/fields/" +
                String(fieldNumber) + "/last.txt";
  const String key = readApiKey == nullptr ? "" : String(readApiKey);
  if (key.length() > 0) {
    path += "?api_key=" + urlEncode(key);
  }

  WiFiClient client;
  if (!client.connect(THINGSPEAK_HOST, THINGSPEAK_PORT)) {
    _lastReadError = "Connection failed";
    return NAN;
  }

  client.print(String("GET ") + path + " HTTP/1.1\r\n" +
               "Host: " + THINGSPEAK_HOST + "\r\n" +
               "User-Agent: KBThingSpeak/1.2.2\r\n" +
               "Connection: close\r\n\r\n");

  unsigned long start = millis();
  while (!client.available() && client.connected() && millis() - start < HTTP_TIMEOUT_MS) {
    delay(10);
  }
  if (!client.available()) {
    client.stop();
    _lastReadError = "Timeout";
    return NAN;
  }

  const String statusLine = client.readStringUntil('\n');
  _lastReadCode = parseHttpStatusCode(statusLine);

  while (client.connected() || client.available()) {
    String line = client.readStringUntil('\n');
    if (line == "\r" || line.length() == 0) break;
  }

  String body;
  start = millis();
  while ((client.connected() || client.available()) && millis() - start < HTTP_TIMEOUT_MS) {
    while (client.available()) body += static_cast<char>(client.read());
    delay(1);
  }
  client.stop();
  body.trim();

  if (_lastReadCode != 200) {
    _lastReadError = "HTTP " + String(_lastReadCode);
    return NAN;
  }
  if (body.length() == 0) {
    _lastReadError = "No data";
    return NAN;
  }

  char* endPtr = nullptr;
  const float value = strtof(body.c_str(), &endPtr);
  while (endPtr != nullptr && (*endPtr == ' ' || *endPtr == '\r' || *endPtr == '\n' || *endPtr == '\t')) {
    ++endPtr;
  }
  if (endPtr == body.c_str() || (endPtr != nullptr && *endPtr != '\0')) {
    _lastReadError = "Invalid number";
    return NAN;
  }

  _lastReadOk = true;
  return value;
}

float KBThingSpeak::readLatestField(unsigned long channelId, int fieldNumber, const String& readApiKey) {
  return readLatestField(channelId, fieldNumber, readApiKey.c_str());
}

bool KBThingSpeak::lastReadSucceeded() const { return _lastReadOk; }
int KBThingSpeak::lastReadHttpCode() const { return _lastReadCode; }
String KBThingSpeak::lastReadError() const { return _lastReadError; }

int KBThingSpeak::sendValues(const String values[], int count) {
  _lastEntry = 0;
  if (WiFi.status() != WL_CONNECTED || _writeApiKey.length() == 0) return 0;

  String path = "/update?api_key=" + urlEncode(_writeApiKey);
  for (int i = 0; i < count; ++i) {
    path += "&field" + String(i + 1) + "=" + urlEncode(values[i]);
  }

  WiFiClient client;
  if (!client.connect(THINGSPEAK_HOST, THINGSPEAK_PORT)) return 0;

  client.print(String("GET ") + path + " HTTP/1.1\r\n" +
               "Host: " + THINGSPEAK_HOST + "\r\n" +
               "Connection: close\r\n\r\n");

  unsigned long start = millis();
  while (!client.available() && client.connected() && millis() - start < HTTP_TIMEOUT_MS) delay(10);
  if (!client.available()) { client.stop(); return 0; }

  String status = client.readStringUntil('\n');
  if (parseHttpStatusCode(status) != 200) { client.stop(); return 0; }

  while (client.connected() || client.available()) {
    String line = client.readStringUntil('\n');
    if (line == "\r" || line.length() == 0) break;
  }

  String body;
  start = millis();
  while ((client.connected() || client.available()) && millis() - start < HTTP_TIMEOUT_MS) {
    while (client.available()) body += static_cast<char>(client.read());
    delay(1);
  }
  client.stop();
  body.trim();
  _lastEntry = body.toInt();
  return _lastEntry;
}

String KBThingSpeak::urlEncode(const String& value) {
  const char hex[] = "0123456789ABCDEF";
  String out;
  for (size_t i = 0; i < value.length(); ++i) {
    const unsigned char c = static_cast<unsigned char>(value[i]);
    if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') ||
        (c >= '0' && c <= '9') || c == '-' || c == '_' || c == '.' || c == '~') {
      out += static_cast<char>(c);
    } else {
      out += '%'; out += hex[(c >> 4) & 0x0F]; out += hex[c & 0x0F];
    }
  }
  return out;
}

int KBThingSpeak::parseHttpStatusCode(const String& statusLine) {
  const int firstSpace = statusLine.indexOf(' ');
  if (firstSpace < 0 || statusLine.length() < firstSpace + 4) return 0;
  return statusLine.substring(firstSpace + 1, firstSpace + 4).toInt();
}
