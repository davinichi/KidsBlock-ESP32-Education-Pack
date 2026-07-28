#ifndef NTP_CLOCK_H
#define NTP_CLOCK_H

#include <Arduino.h>
#include <time.h>

class NTPClock {
public:
  NTPClock();

  void begin(const char* server = "ntp.nict.jp", float offsetHours = 9.0f,
             unsigned long updateIntervalMs = 60000UL);
  void begin(const String& server, float offsetHours = 9.0f,
             unsigned long updateIntervalMs = 60000UL);
  bool update();
  bool forceUpdate();

  unsigned long epoch();
  int year();
  int month();
  int day();
  int hour();
  int minute();
  int second();
  String dateString();
  String timeString();
  bool isTimeValid();

private:
  String _server;
  long _offsetSeconds;
  unsigned long _updateIntervalMs;
  unsigned long _lastRetryMs;
  unsigned long _epoch;
  int _year;
  int _month;
  int _day;
  int _hour;
  int _minute;
  int _second;
  bool _valid;

  bool synchronize(unsigned long timeoutMs);
  void refreshValues();
};

#endif
