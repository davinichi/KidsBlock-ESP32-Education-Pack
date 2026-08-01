#include "NTPClock.h"

NTPClock::NTPClock()
    : _server("ntp.nict.jp"), _offsetSeconds(9L * 3600L),
      _updateIntervalMs(60000UL), _lastRetryMs(0), _epoch(0),
      _year(1970), _month(1), _day(1), _hour(0), _minute(0),
      _second(0), _valid(false) {}

void NTPClock::begin(const char* server, float offsetHours,
                     unsigned long updateIntervalMs) {
  _server = (server != nullptr && server[0] != '\0') ? server : "ntp.nict.jp";
  _offsetSeconds = static_cast<long>(offsetHours * 3600.0f);
  _updateIntervalMs = updateIntervalMs > 0 ? updateIntervalMs : 60000UL;

  configTime(_offsetSeconds, 0, _server.c_str());
  _lastRetryMs = millis();
  synchronize(5000UL);
  refreshValues();
}

void NTPClock::begin(const String& server, float offsetHours,
                     unsigned long updateIntervalMs) {
  begin(server.c_str(), offsetHours, updateIntervalMs);
}

bool NTPClock::update() {
  refreshValues();
  if (_valid) return true;

  const unsigned long nowMs = millis();
  if (nowMs - _lastRetryMs >= _updateIntervalMs) {
    _lastRetryMs = nowMs;
    return synchronize(1500UL);
  }
  return false;
}

bool NTPClock::forceUpdate() {
  configTime(_offsetSeconds, 0, _server.c_str());
  _lastRetryMs = millis();
  return synchronize(5000UL);
}

unsigned long NTPClock::epoch() {
  refreshValues();
  return _epoch;
}

int NTPClock::year() { refreshValues(); return _year; }
int NTPClock::month() { refreshValues(); return _month; }
int NTPClock::day() { refreshValues(); return _day; }
int NTPClock::hour() { refreshValues(); return _hour; }
int NTPClock::minute() { refreshValues(); return _minute; }
int NTPClock::second() { refreshValues(); return _second; }

String NTPClock::dateString() {
  refreshValues();
  char buffer[11];
  snprintf(buffer, sizeof(buffer), "%04d/%02d/%02d", _year, _month, _day);
  return String(buffer);
}

String NTPClock::timeString() {
  refreshValues();
  char buffer[9];
  snprintf(buffer, sizeof(buffer), "%02d:%02d:%02d", _hour, _minute, _second);
  return String(buffer);
}

bool NTPClock::isTimeValid() {
  refreshValues();
  return _valid;
}

bool NTPClock::synchronize(unsigned long timeoutMs) {
  struct tm timeInfo;
  const bool ok = getLocalTime(&timeInfo, timeoutMs);
  refreshValues();
  return ok && _valid;
}

void NTPClock::refreshValues() {
  const time_t now = time(nullptr);
  _valid = now >= 1577836800;

  if (!_valid) {
    _epoch = 0;
    _year = 1970;
    _month = 1;
    _day = 1;
    _hour = 0;
    _minute = 0;
    _second = 0;
    return;
  }

  _epoch = static_cast<unsigned long>(now);
  struct tm timeInfo;
  localtime_r(&now, &timeInfo);
  _year = timeInfo.tm_year + 1900;
  _month = timeInfo.tm_mon + 1;
  _day = timeInfo.tm_mday;
  _hour = timeInfo.tm_hour;
  _minute = timeInfo.tm_min;
  _second = timeInfo.tm_sec;
}
