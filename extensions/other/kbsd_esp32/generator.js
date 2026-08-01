/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
    function includeSD () {
        Blockly.Arduino.includes_.include_kbsd = '#include <SD.h>\n#include <SPI.h>\n';
    }

    function addReadFunction () {
        Blockly.Arduino.definitions_.kbsd_read_value_function = `String kbsdReadFile(const char *path) {
  File file = SD.open(path, FILE_READ);
  if (!file) return "";

  String result = "";
  while (file.available()) {
    result += (char)file.read();
  }
  file.close();
  return result;
}`;
    }

    function addLineReaderSupport () {
        Blockly.Arduino.definitions_.kbsd_line_file = 'File kbsdLineFile;';
        Blockly.Arduino.definitions_.kbsd_line_read_function = `String kbsdReadNextLine() {
  if (!kbsdLineFile) return "";

  String line = kbsdLineFile.readStringUntil('\\n');
  if (line.endsWith("\\r")) {
    line.remove(line.length() - 1);
  }
  return line;
}`;
    }

    function addListFunction () {
        Blockly.Arduino.definitions_.kbsd_list_function = `void kbsdListDir(File dir, uint8_t levels) {
  while (true) {
    File entry = dir.openNextFile();
    if (!entry) break;
    if (entry.isDirectory()) {
      Serial.print("[フォルダ] ");
      Serial.println(entry.name());
      if (levels > 0) kbsdListDir(entry, levels - 1);
    } else {
      Serial.print("[ファイル] ");
      Serial.print(entry.name());
      Serial.print("  サイズ：");
      Serial.print((unsigned long)entry.size());
      Serial.println(" バイト");
    }
    entry.close();
  }
}`;
    }

    function addDiagnoseFunction () {
        addListFunction();
        Blockly.Arduino.definitions_.kbsd_diagnose_function = `void kbsdDiagnose(uint8_t csPin) {
  Serial.println("================================");
  Serial.println(" KBSD Ver.2.1 SDカード診断");
  Serial.println("================================");
  Serial.print("CSピン：");
  Serial.println(csPin);
  Serial.println("SDカードを初期化しています...");

  if (!SD.begin(csPin)) {
    Serial.println("× SDカードの初期化に失敗しました。");
    Serial.println();
    Serial.println("次の項目を確認してください。");
    Serial.println("・SDカードが挿入されているか");
    Serial.println("・CSピン番号が正しいか");
    Serial.println("・MOSI、MISO、SCK、CSの配線が正しいか");
    Serial.println("・電源とGNDが正しく接続されているか");
    Serial.println("================================");
    return;
  }

  uint8_t cardType = SD.cardType();
  if (cardType == CARD_NONE) {
    Serial.println("× SDカードが挿入されていません。");
    Serial.println("================================");
    return;
  }

  Serial.println("○ SDカードを認識しました。");
  Serial.println();
  Serial.print("カード種類：");
  if (cardType == CARD_MMC) {
    Serial.println("MMCカード");
  } else if (cardType == CARD_SD) {
    Serial.println("SDSCカード");
  } else if (cardType == CARD_SDHC) {
    Serial.println("SDHCカード");
  } else {
    Serial.println("不明");
  }

  Serial.print("カード容量：");
  Serial.print((unsigned long long)(SD.cardSize() / (1024ULL * 1024ULL)));
  Serial.println(" MB");
  Serial.print("総容量　　：");
  Serial.print((unsigned long long)(SD.totalBytes() / (1024ULL * 1024ULL)));
  Serial.println(" MB");
  Serial.print("使用容量　：");
  Serial.print((unsigned long long)(SD.usedBytes() / (1024ULL * 1024ULL)));
  Serial.println(" MB");
  Serial.print("空き容量　：");
  Serial.print((unsigned long long)((SD.totalBytes() - SD.usedBytes()) / (1024ULL * 1024ULL)));
  Serial.println(" MB");

  Serial.println();
  Serial.println("--------------------------------");
  Serial.println("ファイル一覧");
  Serial.println("--------------------------------");
  File root = SD.open("/");
  if (!root) {
    Serial.println("× ルートフォルダを開けませんでした。");
  } else if (!root.isDirectory()) {
    Serial.println("× ルートがフォルダではありません。");
    root.close();
  } else {
    kbsdListDir(root, 2);
    root.close();
  }
  Serial.println("--------------------------------");
  Serial.println("○ SDカードは正常です。");
  Serial.println("================================");
}`;
    }

    Blockly.Arduino.kbsd_init = function (block) {
        const cs = Blockly.Arduino.valueToCode(block, 'cs', Blockly.Arduino.ORDER_ATOMIC) || '12';
        includeSD();
        Blockly.Arduino.setups_.kbsd_begin = 'SD.begin(' + cs + ');';
        return '';
    };

    Blockly.Arduino.kbsd_diagnose = function (block) {
        const cs = Blockly.Arduino.valueToCode(block, 'cs', Blockly.Arduino.ORDER_ATOMIC) || '5';
        includeSD();
        addDiagnoseFunction();
        return 'kbsdDiagnose(' + cs + ');\n';
    };

    Blockly.Arduino.kbsd_list = function () {
        includeSD();
        addListFunction();
        return '{\n  File kbsdRoot = SD.open("/");\n  if (kbsdRoot) { kbsdListDir(kbsdRoot, 5); kbsdRoot.close(); }\n}\n';
    };

    Blockly.Arduino.kbsd_type = function () {
        includeSD();
        return ['SD.cardType()', Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.kbsd_var = function (block) {
        includeSD();
        const unit = this.getFieldValue('unit');
        const values = {
            CARD: '(SD.cardSize() / 1024.0 / 1024.0)',
            TOTAL: '(SD.totalBytes() / 1024.0 / 1024.0)',
            USED: '(SD.usedBytes() / 1024.0 / 1024.0)',
            FREE: '((SD.totalBytes() - SD.usedBytes()) / 1024.0 / 1024.0)'
        };
        return [values[unit], Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.kbsd_judge = function (block) {
        includeSD();
        const file = Blockly.Arduino.valueToCode(block, 'file', Blockly.Arduino.ORDER_ATOMIC) || '"/file.txt"';
        return ['SD.exists(' + file + ')', Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.kbsd_delete = function (block) {
        includeSD();
        const file = Blockly.Arduino.valueToCode(block, 'file', Blockly.Arduino.ORDER_ATOMIC) || '"/file.txt"';
        return 'SD.remove(' + file + ');\n';
    };

    Blockly.Arduino.kbsd_read = function (block) {
        includeSD();
        const file = Blockly.Arduino.valueToCode(block, 'file', Blockly.Arduino.ORDER_ATOMIC) || '"/file.txt"';
        Blockly.Arduino.definitions_.kbsd_file = 'File datafile;';
        return 'datafile = SD.open(' + file + ', FILE_READ);\n' +
            '  if(datafile){\n' +
            '   while(datafile.available()) { Serial.write(datafile.read()); }\n' +
            '   datafile.close();\n' +
            '  }\n';
    };

    Blockly.Arduino.kbsd_read_value = function (block) {
        includeSD();
        addReadFunction();
        const file = Blockly.Arduino.valueToCode(block, 'file', Blockly.Arduino.ORDER_ATOMIC) || '"/file.txt"';
        return ['kbsdReadFile(' + file + ')', Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.kbsd_line_open = function (block) {
        includeSD();
        addLineReaderSupport();
        const file = Blockly.Arduino.valueToCode(block, 'file', Blockly.Arduino.ORDER_ATOMIC) || '"/file.txt"';
        return 'if (kbsdLineFile) kbsdLineFile.close();\n' +
            'kbsdLineFile = SD.open(' + file + ', FILE_READ);\n';
    };

    Blockly.Arduino.kbsd_line_available = function () {
        includeSD();
        addLineReaderSupport();
        return ['(kbsdLineFile && kbsdLineFile.available())', Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.kbsd_line_read = function () {
        includeSD();
        addLineReaderSupport();
        return ['kbsdReadNextLine()', Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.kbsd_line_close = function () {
        includeSD();
        addLineReaderSupport();
        return 'if (kbsdLineFile) kbsdLineFile.close();\n';
    };

    Blockly.Arduino.kbsd_write = function (block) {
        includeSD();
        const file = Blockly.Arduino.valueToCode(block, 'file', Blockly.Arduino.ORDER_ATOMIC) || '"/file.txt"';
        const data = Blockly.Arduino.valueToCode(block, 'data', Blockly.Arduino.ORDER_ATOMIC) || '""';
        const unit = this.getFieldValue('unit');
        Blockly.Arduino.definitions_.kbsd_file = 'File datafile;';
        return 'datafile = SD.open(' + file + ', FILE_APPEND);\n' +
            '  if(datafile){\n' +
            '   datafile.print(' + data + ');\n' +
            '   ' + unit + '\n' +
            '   datafile.close();\n' +
            '  }\n';
    };

    return Blockly;
}

exports = addGenerator;
