/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addMsg (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales.en, {
        KBCSV_CATEGORY: 'Data Processing',
        KBCSV_SET_HEADER_ROWS: 'set CSV header rows to %1',
        KBCSV_RESET_LINE: 'reset CSV line number to 1',
        KBCSV_SPLIT: 'split CSV data %1 into up to 8 items',
        KBCSV_TEXT: 'CSV item %1 as text',
        KBCSV_NUMBER: 'CSV item %1 as number',
        KBCSV_COUNT: 'number of CSV items',
        KBCSV_SUCCESS: 'CSV split succeeded?',
        KBDATA_TEXT_LEFT: 'take %2 characters from the left of text %1',
        KBDATA_TEXT_RIGHT: 'take %2 characters from the right of text %1',
        KBDATA_TEXT_LENGTH: 'number of characters in text %1',
        KBDATA_TEXT_FROM: 'take text %1 from character %2 to the end',
        KBDATA_TEXT_MID: 'take %3 characters from character %2 of text %1',
        KBDATA_TEXT_JOIN: 'join text %1 and %2',
        KBDATA_TEXT_JOIN_SEPARATOR: 'join text %1 and %2 with %3'
    });
    Object.assign(Blockly.ScratchMsgs.locales['ja'], {
        KBCSV_CATEGORY: 'データ処理',
        KBCSV_SET_HEADER_ROWS: 'CSVの見出し行数を %1 にする',
        KBCSV_RESET_LINE: 'CSVの行番号を1に戻す',
        KBCSV_SPLIT: 'CSVデータ %1 を8項目までに分ける',
        KBCSV_TEXT: 'CSVの %1 番目の文字',
        KBCSV_NUMBER: 'CSVの %1 番目の数値',
        KBCSV_COUNT: 'CSVの項目数',
        KBCSV_SUCCESS: 'CSVの分解は成功した',
        KBDATA_TEXT_LEFT: '文字列 %1 の左から %2 文字を取り出す',
        KBDATA_TEXT_RIGHT: '文字列 %1 の右から %2 文字を取り出す',
        KBDATA_TEXT_LENGTH: '文字列 %1 の文字数',
        KBDATA_TEXT_FROM: '文字列 %1 の左から %2 文字目以降を取り出す',
        KBDATA_TEXT_MID: '文字列 %1 の左から %2 文字目から %3 文字を取り出す',
        KBDATA_TEXT_JOIN: '文字列 %1 と %2 をつなぐ',
        KBDATA_TEXT_JOIN_SEPARATOR: '文字列 %1 と %2 を %3 でつなぐ'
    });
    return Blockly;
}

exports = addMsg;
