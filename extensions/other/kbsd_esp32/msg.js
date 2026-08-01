/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addMsg (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales.en, {
        KBSD_CATEGORY: 'KBSD ESP32',
        KBSD_INIT: 'initialize SD card CS pin %1',
        KBSD_DIAGNOSE: 'diagnose SD card CS pin %1',
        KBSD_LIST: 'list files in SD card',
        KBSD_TYPE: 'SD card type',
        KBSD_VAR: 'SD card %1',
        KBSD_JUDGE: '%1 exists?',
        KBSD_DELETE: 'delete %1',
        KBSD_READ_SERIAL: 'read %1 to serial monitor',
        KBSD_READ_VALUE: 'read SD file %1',
        KBSD_LINE_OPEN: 'open SD file %1 for line reading',
        KBSD_LINE_AVAILABLE: 'SD file has next line?',
        KBSD_LINE_READ: 'read next line from SD file',
        KBSD_LINE_CLOSE: 'close line-reading SD file',
        KBSD_WRITE: 'write SD file %1 data %2 newline %3'
    });
    Object.assign(Blockly.ScratchMsgs.locales['ja'], {
        KBSD_CATEGORY: 'KBSD ESP32',
        KBSD_INIT: 'SDカードを初期化 CSピン %1',
        KBSD_DIAGNOSE: 'SDカードを診断 CSピン %1',
        KBSD_LIST: 'SDカードのファイル一覧を表示',
        KBSD_TYPE: 'SDカードの種類',
        KBSD_VAR: 'SDカード %1',
        KBSD_JUDGE: '%1 ファイルは存在する?',
        KBSD_DELETE: '%1 を削除',
        KBSD_READ_SERIAL: '%1 をシリアルモニターへ読み出す',
        KBSD_READ_VALUE: 'SDファイル %1 の内容を読む',
        KBSD_LINE_OPEN: 'SDファイル %1 を1行読み出し用に開く',
        KBSD_LINE_AVAILABLE: 'SDファイルに次の行がある',
        KBSD_LINE_READ: 'SDファイルの次の1行を読む',
        KBSD_LINE_CLOSE: '1行読み出し中のSDファイルを閉じる',
        KBSD_WRITE: 'SDファイル %1 にデータ %2 を書き込む 改行 %3'
    });
    return Blockly;
}

exports = addMsg;
