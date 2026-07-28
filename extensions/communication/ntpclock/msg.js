/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addMsg (Blockly) {
  Object.assign(Blockly.ScratchMsgs.locales.en, {
    NTPCLOCK_CATEGORY: 'NTP Clock',
    NTPCLOCK_BEGIN: 'start and synchronize NTP clock server %1 time difference %2 hours update interval %3 ms',
    NTPCLOCK_UPDATE: 'update NTP clock',
    NTPCLOCK_FORCE_UPDATE: 'force update NTP clock',
    NTPCLOCK_IS_VALID: 'NTP time is available',
    NTPCLOCK_EPOCH: 'UNIX time',
    NTPCLOCK_YEAR: 'current year',
    NTPCLOCK_MONTH: 'current month',
    NTPCLOCK_DAY: 'current day',
    NTPCLOCK_HOUR: 'current hour',
    NTPCLOCK_MINUTE: 'current minute',
    NTPCLOCK_SECOND: 'current second',
    NTPCLOCK_DATE_TEXT: 'current date',
    NTPCLOCK_TIME_TEXT: 'current time'
  });

  Object.assign(Blockly.ScratchMsgs.locales.ja, {
    NTPCLOCK_CATEGORY: 'NTP時計',
    NTPCLOCK_BEGIN: 'NTP時計を開始して時刻を取得 サーバー %1 時差 %2 時間 更新間隔 %3 ミリ秒',
    NTPCLOCK_UPDATE: 'NTP時計を更新する',
    NTPCLOCK_FORCE_UPDATE: 'NTP時計を強制更新する',
    NTPCLOCK_IS_VALID: 'NTP時刻を取得できた',
    NTPCLOCK_EPOCH: 'UNIX時刻',
    NTPCLOCK_YEAR: '現在の年',
    NTPCLOCK_MONTH: '現在の月',
    NTPCLOCK_DAY: '現在の日',
    NTPCLOCK_HOUR: '現在の時',
    NTPCLOCK_MINUTE: '現在の分',
    NTPCLOCK_SECOND: '現在の秒',
    NTPCLOCK_DATE_TEXT: '現在の年月日',
    NTPCLOCK_TIME_TEXT: '現在の時刻'
  });

  Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], {
    NTPCLOCK_CATEGORY: 'NTP时钟',
    NTPCLOCK_BEGIN: '启动并同步NTP时钟 服务器 %1 时差 %2 小时 更新间隔 %3 毫秒',
    NTPCLOCK_UPDATE: '更新NTP时钟',
    NTPCLOCK_FORCE_UPDATE: '强制更新NTP时钟',
    NTPCLOCK_IS_VALID: '已取得NTP时间',
    NTPCLOCK_EPOCH: 'UNIX时间',
    NTPCLOCK_YEAR: '当前年份',
    NTPCLOCK_MONTH: '当前月份',
    NTPCLOCK_DAY: '当前日期',
    NTPCLOCK_HOUR: '当前小时',
    NTPCLOCK_MINUTE: '当前分钟',
    NTPCLOCK_SECOND: '当前秒',
    NTPCLOCK_DATE_TEXT: '当前年月日',
    NTPCLOCK_TIME_TEXT: '当前时间'
  });

  return Blockly;
}

exports = addMsg;
