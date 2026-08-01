/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addMsg (Blockly) {
  Object.assign(Blockly.ScratchMsgs.locales.en, {
    HTTPSERVER_CATEGORY: 'HTTP Server',
    HTTPSERVER_BEGIN: 'start HTTP server page title %1',
    HTTPSERVER_DEVICE_NAME: 'set HTTP server device name to %1',
    HTTPSERVER_INTERVAL: 'set browser update interval to %1 milliseconds',
    HTTPSERVER_REGISTER_ITEM: 'register HTTP server item %1 label %2 unit %3',
    HTTPSERVER_UPDATE_ITEM: 'update HTTP server item %1 value to %2',
    HTTPSERVER_CLEAR_ITEM: 'clear HTTP server item %1',
    HTTPSERVER_REGISTER_GPIO: 'register browser control %1 name %2 HIGH button %3 LOW button %4 initial state %5',
    HTTPSERVER_SET_GPIO: 'set browser control %1 output to %2',
    HTTPSERVER_GPIO_STATE: 'browser control %1 is %2',
    HTTPSERVER_CLEAR_GPIO: 'clear browser control %1',
    HTTPSERVER_HANDLE: 'process browser access',
    HTTPSERVER_URL: 'HTTP server URL',
    HTTPSERVER_IS_RUNNING: 'HTTP server is running',
    HTTPSERVER_SET_VALUES: 'write temperature %1 C humidity %2 %% to HTTP server',
    HTTPSERVER_SET_VALUES_WBGT: 'write temperature %1 C humidity %2 %% WBGT %3 C to HTTP server'
  });

  Object.assign(Blockly.ScratchMsgs.locales.ja, {
    HTTPSERVER_CATEGORY: 'HTTPサーバー',
    HTTPSERVER_BEGIN: 'HTTPサーバーを開始する 画面タイトル %1',
    HTTPSERVER_DEVICE_NAME: 'HTTPサーバーの端末名を %1 にする',
    HTTPSERVER_INTERVAL: 'ブラウザ画面の更新間隔を %1 ミリ秒にする',
    HTTPSERVER_REGISTER_ITEM: 'HTTPサーバーの項目 %1 を登録する 項目名 %2 単位 %3',
    HTTPSERVER_UPDATE_ITEM: 'HTTPサーバーの項目 %1 の値を %2 に更新する',
    HTTPSERVER_CLEAR_ITEM: 'HTTPサーバーの項目 %1 を消去する',
    HTTPSERVER_REGISTER_GPIO: 'ブラウザ操作 %1 を登録する 名前 %2 HIGHボタン %3 LOWボタン %4 初期状態 %5',
    HTTPSERVER_SET_GPIO: 'ブラウザ操作 %1 の出力を %2 にする',
    HTTPSERVER_GPIO_STATE: 'ブラウザ操作 %1 は %2',
    HTTPSERVER_CLEAR_GPIO: 'ブラウザ操作 %1 を消去する',
    HTTPSERVER_HANDLE: 'ブラウザからのアクセスを処理する',
    HTTPSERVER_URL: 'HTTPサーバーのURL',
    HTTPSERVER_IS_RUNNING: 'HTTPサーバーが動作中',
    HTTPSERVER_SET_VALUES: 'HTTPサーバーへ 温度 %1 ℃ 湿度 %2 %% を書き込む',
    HTTPSERVER_SET_VALUES_WBGT: 'HTTPサーバーへ 温度 %1 ℃ 湿度 %2 %% WBGT %3 ℃ を書き込む'
  });

  Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], {
    HTTPSERVER_CATEGORY: 'HTTP服务器',
    HTTPSERVER_BEGIN: '启动HTTP服务器 页面标题 %1',
    HTTPSERVER_DEVICE_NAME: '设置HTTP服务器设备名称为 %1',
    HTTPSERVER_INTERVAL: '设置浏览器更新间隔为 %1 毫秒',
    HTTPSERVER_REGISTER_ITEM: '注册HTTP服务器项目 %1 名称 %2 单位 %3',
    HTTPSERVER_UPDATE_ITEM: '将HTTP服务器项目 %1 的值更新为 %2',
    HTTPSERVER_CLEAR_ITEM: '清除HTTP服务器项目 %1',
    HTTPSERVER_REGISTER_GPIO: '注册浏览器控制 %1 名称 %2 HIGH按钮 %3 LOW按钮 %4 初始状态 %5',
    HTTPSERVER_SET_GPIO: '将浏览器控制 %1 输出设为 %2',
    HTTPSERVER_GPIO_STATE: '浏览器控制 %1 为 %2',
    HTTPSERVER_CLEAR_GPIO: '清除浏览器控制 %1',
    HTTPSERVER_HANDLE: '处理浏览器访问',
    HTTPSERVER_URL: 'HTTP服务器URL',
    HTTPSERVER_IS_RUNNING: 'HTTP服务器正在运行',
    HTTPSERVER_SET_VALUES: '向HTTP服务器写入温度 %1 C 湿度 %2 %%',
    HTTPSERVER_SET_VALUES_WBGT: '向HTTP服务器写入温度 %1 C 湿度 %2 %% WBGT %3 C'
  });

  return Blockly;
}

exports = addMsg;
