/* eslint-disable func-style */
function addMsg (Blockly) {
  Object.assign(Blockly.ScratchMsgs.locales.en, {
    THINGSPEAK_CATEGORY: 'ThingSpeak',
    THINGSPEAK_BEGIN: 'start ThingSpeak channel ID %1 Write API Key %2',
    THINGSPEAK_SEND1: 'send to ThingSpeak Field1 %1',
    THINGSPEAK_SEND2: 'send to ThingSpeak Field1 %1 Field2 %2',
    THINGSPEAK_SEND3: 'send to ThingSpeak Field1 %1 Field2 %2 Field3 %3',
    THINGSPEAK_SEND4: 'send to ThingSpeak Field1 %1 Field2 %2 Field3 %3 Field4 %4',
    THINGSPEAK_SEND5: 'send to ThingSpeak Field1 %1 Field2 %2 Field3 %3 Field4 %4 Field5 %5',
    THINGSPEAK_SEND6: 'send to ThingSpeak Field1 %1 Field2 %2 Field3 %3 Field4 %4 Field5 %5 Field6 %6',
    THINGSPEAK_SEND7: 'send to ThingSpeak Field1 %1 Field2 %2 Field3 %3 Field4 %4 Field5 %5 Field6 %6 Field7 %7',
    THINGSPEAK_SEND8: 'send to ThingSpeak Field1 %1 Field2 %2 Field3 %3 Field4 %4 Field5 %5 Field6 %6 Field7 %7 Field8 %8',
    THINGSPEAK_LAST_ENTRY: 'last ThingSpeak entry number',
    THINGSPEAK_SUCCESS: 'last ThingSpeak send succeeded',
    THINGSPEAK_READ_LATEST: 'latest ThingSpeak value channel ID %1 Field %2 Read API Key %3',
    THINGSPEAK_READ_SUCCESS: 'last ThingSpeak read succeeded',
    THINGSPEAK_READ_HTTP_CODE: 'last ThingSpeak read HTTP code',
    THINGSPEAK_READ_ERROR: 'last ThingSpeak read error'
  });
  Object.assign(Blockly.ScratchMsgs.locales.ja, {
    THINGSPEAK_CATEGORY: 'ThingSpeak',
    THINGSPEAK_BEGIN: 'ThingSpeakを開始 チャンネルID %1 Write API Key %2',
    THINGSPEAK_SEND1: 'ThingSpeakへ送信 Field1 %1',
    THINGSPEAK_SEND2: 'ThingSpeakへ送信 Field1 %1 Field2 %2',
    THINGSPEAK_SEND3: 'ThingSpeakへ送信 Field1 %1 Field2 %2 Field3 %3',
    THINGSPEAK_SEND4: 'ThingSpeakへ送信 Field1 %1 Field2 %2 Field3 %3 Field4 %4',
    THINGSPEAK_SEND5: 'ThingSpeakへ送信 Field1 %1 Field2 %2 Field3 %3 Field4 %4 Field5 %5',
    THINGSPEAK_SEND6: 'ThingSpeakへ送信 Field1 %1 Field2 %2 Field3 %3 Field4 %4 Field5 %5 Field6 %6',
    THINGSPEAK_SEND7: 'ThingSpeakへ送信 Field1 %1 Field2 %2 Field3 %3 Field4 %4 Field5 %5 Field6 %6 Field7 %7',
    THINGSPEAK_SEND8: 'ThingSpeakへ送信 Field1 %1 Field2 %2 Field3 %3 Field4 %4 Field5 %5 Field6 %6 Field7 %7 Field8 %8',
    THINGSPEAK_LAST_ENTRY: '最後のThingSpeakエントリー番号',
    THINGSPEAK_SUCCESS: '最後のThingSpeak送信に成功した',
    THINGSPEAK_READ_LATEST: 'ThingSpeakの最新値 チャンネルID %1 Field %2 Read API Key %3',
    THINGSPEAK_READ_SUCCESS: '最後のThingSpeak読み出しに成功した',
    THINGSPEAK_READ_HTTP_CODE: '最後のThingSpeak読み出しHTTPコード',
    THINGSPEAK_READ_ERROR: '最後のThingSpeak読み出しエラー'
  });
  Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], {
    THINGSPEAK_CATEGORY: 'ThingSpeak',
    THINGSPEAK_BEGIN: '启动ThingSpeak 频道ID %1 Write API Key %2',
    THINGSPEAK_SEND1: '发送到ThingSpeak Field1 %1',
    THINGSPEAK_SEND2: '发送到ThingSpeak Field1 %1 Field2 %2',
    THINGSPEAK_SEND3: '发送到ThingSpeak Field1 %1 Field2 %2 Field3 %3',
    THINGSPEAK_SEND4: '发送到ThingSpeak Field1 %1 Field2 %2 Field3 %3 Field4 %4',
    THINGSPEAK_SEND5: '发送到ThingSpeak Field1 %1 Field2 %2 Field3 %3 Field4 %4 Field5 %5',
    THINGSPEAK_SEND6: '发送到ThingSpeak Field1 %1 Field2 %2 Field3 %3 Field4 %4 Field5 %5 Field6 %6',
    THINGSPEAK_SEND7: '发送到ThingSpeak Field1 %1 Field2 %2 Field3 %3 Field4 %4 Field5 %5 Field6 %6 Field7 %7',
    THINGSPEAK_SEND8: '发送到ThingSpeak Field1 %1 Field2 %2 Field3 %3 Field4 %4 Field5 %5 Field6 %6 Field7 %7 Field8 %8',
    THINGSPEAK_LAST_ENTRY: '最后的ThingSpeak条目编号',
    THINGSPEAK_SUCCESS: '最后一次ThingSpeak发送成功',
    THINGSPEAK_READ_LATEST: 'ThingSpeak最新值 频道ID %1 Field %2 Read API Key %3',
    THINGSPEAK_READ_SUCCESS: '最后一次ThingSpeak读取成功',
    THINGSPEAK_READ_HTTP_CODE: '最后一次ThingSpeak读取HTTP代码',
    THINGSPEAK_READ_ERROR: '最后一次ThingSpeak读取错误'
  });
  return Blockly;
}
exports = addMsg;
