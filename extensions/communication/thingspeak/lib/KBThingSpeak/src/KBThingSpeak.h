#ifndef KB_THING_SPEAK_H
#define KB_THING_SPEAK_H

#include <Arduino.h>

class KBThingSpeak {
public:
  KBThingSpeak();

  // Existing send API (kept for backward compatibility)
  void begin(unsigned long channelId, const char* writeApiKey);
  void begin(unsigned long channelId, const String& writeApiKey);
  int send1(const String& field1);
  int send2(const String& field1, const String& field2);
  int send3(const String& field1, const String& field2, const String& field3);
  int send4(const String& field1, const String& field2, const String& field3, const String& field4);
  int send5(const String& field1, const String& field2, const String& field3, const String& field4, const String& field5);
  int send6(const String& field1, const String& field2, const String& field3, const String& field4, const String& field5, const String& field6);
  int send7(const String& field1, const String& field2, const String& field3, const String& field4, const String& field5, const String& field6, const String& field7);
  int send8(const String& field1, const String& field2, const String& field3, const String& field4, const String& field5, const String& field6, const String& field7, const String& field8);
  int lastEntryNumber() const;
  bool lastSendSucceeded() const;

  // Read the latest value of one ThingSpeak field.
  // Public channels may use an empty Read API Key.
  // Returns NAN if the read fails.
  float readLatestField(unsigned long channelId, int fieldNumber, const char* readApiKey);
  float readLatestField(unsigned long channelId, int fieldNumber, const String& readApiKey);
  bool lastReadSucceeded() const;
  int lastReadHttpCode() const;
  String lastReadError() const;

private:
  unsigned long _channelId;
  String _writeApiKey;
  int _lastEntry;

  bool _lastReadOk;
  int _lastReadCode;
  String _lastReadError;

  int sendValues(const String values[], int count);
  static String urlEncode(const String& value);
  static int parseHttpStatusCode(const String& statusLine);
};

#endif
