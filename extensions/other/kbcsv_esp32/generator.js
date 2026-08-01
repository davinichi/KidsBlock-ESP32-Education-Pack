/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
    function addCsvSupport () {
        Blockly.Arduino.definitions_.kbcsv_storage = `String kbcsvValues[8];
int kbcsvItemCount = 0;
bool kbcsvParseSucceeded = false;
int kbcsvHeaderRows = 0;
unsigned long kbcsvCurrentLine = 0;`;

        Blockly.Arduino.definitions_.kbcsv_support_functions = `void kbcsvClearResult() {
  for (int i = 0; i < 8; i++) {
    kbcsvValues[i] = "";
  }
  kbcsvItemCount = 0;
  kbcsvParseSucceeded = false;
}

void kbcsvSetHeaderRows(int rows) {
  kbcsvHeaderRows = (rows < 0) ? 0 : rows;
}

void kbcsvResetLineNumber() {
  kbcsvCurrentLine = 0;
  kbcsvClearResult();
}

void kbcsvSplit(const String &source) {
  kbcsvClearResult();
  kbcsvCurrentLine++;

  if (kbcsvCurrentLine <= (unsigned long)kbcsvHeaderRows) return;
  if (source.length() == 0) return;

  String value = "";
  bool inQuotes = false;

  for (unsigned int i = 0; i <= source.length(); i++) {
    char c = (i < source.length()) ? source.charAt(i) : ',';

    if (c == '"') {
      if (inQuotes && i + 1 < source.length() && source.charAt(i + 1) == '"') {
        value += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c == ',' && !inQuotes) {
      if (kbcsvItemCount < 8) {
        value.trim();
        kbcsvValues[kbcsvItemCount] = value;
      }
      kbcsvItemCount++;
      value = "";
    } else {
      value += c;
    }
  }

  kbcsvParseSucceeded = (!inQuotes && kbcsvItemCount >= 1 && kbcsvItemCount <= 8);
}`;
    }

    function addUtf8TextSupport () {
        Blockly.Arduino.definitions_.kbdata_utf8_support = `int kbdataUtf8CharBytes(unsigned char firstByte) {
  if ((firstByte & 0x80) == 0x00) return 1;
  if ((firstByte & 0xE0) == 0xC0) return 2;
  if ((firstByte & 0xF0) == 0xE0) return 3;
  if ((firstByte & 0xF8) == 0xF0) return 4;
  return 1;
}

int kbdataUtf8Length(const String &text) {
  int chars = 0;
  int byteIndex = 0;
  const int byteLength = text.length();

  while (byteIndex < byteLength) {
    int bytes = kbdataUtf8CharBytes((unsigned char)text.charAt(byteIndex));
    if (byteIndex + bytes > byteLength) bytes = 1;
    byteIndex += bytes;
    chars++;
  }
  return chars;
}

String kbdataLeft(const String &text, int count) {
  if (count <= 0 || text.length() == 0) return "";

  int chars = 0;
  int byteIndex = 0;
  const int byteLength = text.length();

  while (byteIndex < byteLength && chars < count) {
    int bytes = kbdataUtf8CharBytes((unsigned char)text.charAt(byteIndex));
    if (byteIndex + bytes > byteLength) bytes = 1;
    byteIndex += bytes;
    chars++;
  }
  return text.substring(0, byteIndex);
}

String kbdataRight(const String &text, int count) {
  if (count <= 0 || text.length() == 0) return "";

  const int totalChars = kbdataUtf8Length(text);
  if (count >= totalChars) return text;

  const int skipChars = totalChars - count;
  int chars = 0;
  int byteIndex = 0;
  const int byteLength = text.length();

  while (byteIndex < byteLength && chars < skipChars) {
    int bytes = kbdataUtf8CharBytes((unsigned char)text.charAt(byteIndex));
    if (byteIndex + bytes > byteLength) bytes = 1;
    byteIndex += bytes;
    chars++;
  }
  return text.substring(byteIndex);
}

int kbdataUtf8ByteIndex(const String &text, int charIndex) {
  if (charIndex <= 0) return 0;

  int chars = 0;
  int byteIndex = 0;
  const int byteLength = text.length();

  while (byteIndex < byteLength && chars < charIndex) {
    int bytes = kbdataUtf8CharBytes((unsigned char)text.charAt(byteIndex));
    if (byteIndex + bytes > byteLength) bytes = 1;
    byteIndex += bytes;
    chars++;
  }
  return byteIndex;
}

String kbdataFrom(const String &text, int startPosition) {
  if (text.length() == 0) return "";
  if (startPosition <= 1) return text;

  const int totalChars = kbdataUtf8Length(text);
  if (startPosition > totalChars) return "";

  const int startByte = kbdataUtf8ByteIndex(text, startPosition - 1);
  return text.substring(startByte);
}

String kbdataMid(const String &text, int startPosition, int count) {
  if (text.length() == 0 || count <= 0) return "";
  if (startPosition <= 0) startPosition = 1;

  const int totalChars = kbdataUtf8Length(text);
  if (startPosition > totalChars) return "";

  const int startByte = kbdataUtf8ByteIndex(text, startPosition - 1);
  const int endCharIndex = (startPosition - 1) + count;
  const int endByte = kbdataUtf8ByteIndex(text, endCharIndex);
  return text.substring(startByte, endByte);
}`;
    }

    Blockly.Arduino.kbcsv_set_header_rows = function (block) {
        addCsvSupport();
        const rows = Blockly.Arduino.valueToCode(block, 'rows', Blockly.Arduino.ORDER_ATOMIC) || '0';
        return 'kbcsvSetHeaderRows((int)(' + rows + '));\n';
    };

    Blockly.Arduino.kbcsv_reset_line = function () {
        addCsvSupport();
        return 'kbcsvResetLineNumber();\n';
    };

    Blockly.Arduino.kbcsv_split = function (block) {
        addCsvSupport();
        const data = Blockly.Arduino.valueToCode(block, 'data', Blockly.Arduino.ORDER_ATOMIC) || '""';
        return 'kbcsvSplit(String(' + data + '));\n';
    };

    Blockly.Arduino.kbcsv_text = function (block) {
        addCsvSupport();
        const item = Number(this.getFieldValue('item')) - 1;
        return ['kbcsvValues[' + item + ']', Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.kbcsv_number = function (block) {
        addCsvSupport();
        const item = Number(this.getFieldValue('item')) - 1;
        return ['kbcsvValues[' + item + '].toFloat()', Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.kbcsv_count = function () {
        addCsvSupport();
        return ['kbcsvItemCount', Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.kbcsv_success = function () {
        addCsvSupport();
        return ['kbcsvParseSucceeded', Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.kbdata_text_left = function (block) {
        addUtf8TextSupport();
        const text = Blockly.Arduino.valueToCode(block, 'text', Blockly.Arduino.ORDER_ATOMIC) || '""';
        const count = Blockly.Arduino.valueToCode(block, 'count', Blockly.Arduino.ORDER_ATOMIC) || '0';
        return ['kbdataLeft(String(' + text + '), (int)(' + count + '))', Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.kbdata_text_right = function (block) {
        addUtf8TextSupport();
        const text = Blockly.Arduino.valueToCode(block, 'text', Blockly.Arduino.ORDER_ATOMIC) || '""';
        const count = Blockly.Arduino.valueToCode(block, 'count', Blockly.Arduino.ORDER_ATOMIC) || '0';
        return ['kbdataRight(String(' + text + '), (int)(' + count + '))', Blockly.Arduino.ORDER_ATOMIC];
    };


    Blockly.Arduino.kbdata_text_length = function (block) {
        addUtf8TextSupport();
        const text = Blockly.Arduino.valueToCode(block, 'text', Blockly.Arduino.ORDER_ATOMIC) || '""';
        return ['kbdataUtf8Length(String(' + text + '))', Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.kbdata_text_from = function (block) {
        addUtf8TextSupport();
        const text = Blockly.Arduino.valueToCode(block, 'text', Blockly.Arduino.ORDER_ATOMIC) || '""';
        const start = Blockly.Arduino.valueToCode(block, 'start', Blockly.Arduino.ORDER_ATOMIC) || '1';
        return ['kbdataFrom(String(' + text + '), (int)(' + start + '))', Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.kbdata_text_mid = function (block) {
        addUtf8TextSupport();
        const text = Blockly.Arduino.valueToCode(block, 'text', Blockly.Arduino.ORDER_ATOMIC) || '""';
        const start = Blockly.Arduino.valueToCode(block, 'start', Blockly.Arduino.ORDER_ATOMIC) || '1';
        const count = Blockly.Arduino.valueToCode(block, 'count', Blockly.Arduino.ORDER_ATOMIC) || '0';
        return ['kbdataMid(String(' + text + '), (int)(' + start + '), (int)(' + count + '))', Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.kbdata_text_join = function (block) {
        const text1 = Blockly.Arduino.valueToCode(block, 'text1', Blockly.Arduino.ORDER_ATOMIC) || '""';
        const text2 = Blockly.Arduino.valueToCode(block, 'text2', Blockly.Arduino.ORDER_ATOMIC) || '""';
        return ['String(' + text1 + ') + String(' + text2 + ')', Blockly.Arduino.ORDER_ADDITIVE];
    };


    Blockly.Arduino.kbdata_text_join_separator = function (block) {
        const text1 = Blockly.Arduino.valueToCode(block, 'text1', Blockly.Arduino.ORDER_ATOMIC) || '""';
        const text2 = Blockly.Arduino.valueToCode(block, 'text2', Blockly.Arduino.ORDER_ATOMIC) || '""';
        const separator = Blockly.Arduino.valueToCode(block, 'separator', Blockly.Arduino.ORDER_ATOMIC) || '""';
        return ['String(' + text1 + ') + String(' + separator + ') + String(' + text2 + ')', Blockly.Arduino.ORDER_ADDITIVE];
    };

    return Blockly;
}

exports = addGenerator;
