#include "SensorServer31.h"

SensorServer31::SensorServer31()
  : server_(nullptr),
    title_("ESP32 HTTP Server"),
    deviceName_("ESP32-01"),
    running_(false),
    updateIntervalMs_(3000) {
  clearAllItems();
  clearAllGpioControls();
}

SensorServer31::~SensorServer31() {
  if (server_ != nullptr) {
    server_->stop();
    delete server_;
    server_ = nullptr;
  }
}

void SensorServer31::begin(const String& title, uint16_t port) {
  title_ = title;
  if (running_ && server_ != nullptr) return;

  if (server_ != nullptr) {
    server_->stop();
    delete server_;
  }

  server_ = new WebServer(port);
  registerRoutes();
  server_->begin();
  running_ = true;
  Serial.print("HTTP server started: ");
  Serial.println(url());
}

void SensorServer31::setDeviceName(const String& name) {
  deviceName_ = name;
}

void SensorServer31::setUpdateInterval(unsigned long milliseconds) {
  updateIntervalMs_ = constrain(milliseconds, 1000UL, 60000UL);
}

int SensorServer31::itemIndex(uint8_t itemNumber) const {
  if (itemNumber < 1 || itemNumber > MAX_ITEMS) return -1;
  return static_cast<int>(itemNumber - 1);
}

int SensorServer31::gpioIndex(uint8_t controlNumber) const {
  if (controlNumber < 1 || controlNumber > MAX_GPIO_CONTROLS) return -1;
  return static_cast<int>(controlNumber - 1);
}

bool SensorServer31::registerItem(uint8_t itemNumber, const String& label, const String& unit) {
  const int index = itemIndex(itemNumber);
  if (index < 0) return false;
  items_[index].label = label;
  items_[index].unit = unit;
  items_[index].registered = true;
  return true;
}

bool SensorServer31::updateItem(uint8_t itemNumber, const String& value) {
  const int index = itemIndex(itemNumber);
  if (index < 0) return false;
  if (!items_[index].registered) {
    items_[index].label = String("項目") + itemNumber;
    items_[index].unit = "";
    items_[index].registered = true;
  }
  items_[index].value = value;
  return true;
}

bool SensorServer31::clearItem(uint8_t itemNumber) {
  const int index = itemIndex(itemNumber);
  if (index < 0) return false;
  items_[index].label = "";
  items_[index].value = "";
  items_[index].unit = "";
  items_[index].registered = false;
  return true;
}

void SensorServer31::clearAllItems() {
  for (uint8_t i = 0; i < MAX_ITEMS; ++i) {
    items_[i].label = "";
    items_[i].value = "";
    items_[i].unit = "";
    items_[i].registered = false;
  }
}







bool SensorServer31::registerGpioControl(uint8_t controlNumber, int pin, const String& label, bool initialState) {
  const bool ok = registerBrowserControl(controlNumber, label, "HIGH", "LOW", initialState);
  if (!ok) return false;
  const int index = gpioIndex(controlNumber);
  gpioControls_[index].pin = pin;
  return true;
}

bool SensorServer31::setGpioState(uint8_t controlNumber, bool state) {
  return setBrowserControlState(controlNumber, state);
}

bool SensorServer31::gpioState(uint8_t controlNumber) const {
  return browserControlState(controlNumber);
}

bool SensorServer31::clearGpioControl(uint8_t controlNumber) {
  const int index = gpioIndex(controlNumber);
  if (index < 0) return false;
  gpioControls_[index].label = "";
  gpioControls_[index].highButtonLabel = "";
  gpioControls_[index].lowButtonLabel = "";
  gpioControls_[index].pin = -1;
  gpioControls_[index].state = false;
  gpioControls_[index].registered = false;
  return true;
}

void SensorServer31::clearAllGpioControls() {
  for (uint8_t i = 0; i < MAX_GPIO_CONTROLS; ++i) {
    gpioControls_[i].label = "";
    gpioControls_[i].highButtonLabel = "";
    gpioControls_[i].lowButtonLabel = "";
    gpioControls_[i].pin = -1;
    gpioControls_[i].state = false;
    gpioControls_[i].registered = false;
  }
}

void SensorServer31::setValues(float temperature, float humidity) {
  registerItem(1, "温度", "℃");
  registerItem(2, "湿度", "%");
  updateItem(1, String(temperature, 1));
  updateItem(2, String(humidity, 1));
  clearItem(3);
}

void SensorServer31::setValues(float temperature, float humidity, float wbgt) {
  registerItem(1, "温度", "℃");
  registerItem(2, "湿度", "%");
  registerItem(3, "WBGT", "℃");
  updateItem(1, String(temperature, 1));
  updateItem(2, String(humidity, 1));
  updateItem(3, String(wbgt, 1));
}

void SensorServer31::handleClient() {
  if (server_ != nullptr && running_) {
    server_->handleClient();
    delay(2);
  }
}

String SensorServer31::ipAddress() const {
  if (WiFi.status() != WL_CONNECTED) return "0.0.0.0";
  return WiFi.localIP().toString();
}

String SensorServer31::url() const {
  return String("http://") + ipAddress() + "/";
}

bool SensorServer31::isRunning() const {
  return running_;
}

void SensorServer31::registerRoutes() {
  server_->on("/", HTTP_GET, [this]() { handleRoot(); });
  server_->on("/data", HTTP_GET, [this]() { handleJson(); });
  server_->on("/api", HTTP_GET, [this]() { handleJson(); });
  server_->on("/gpio", HTTP_GET, [this]() { handleGpio(); });
  server_->onNotFound([this]() {
    server_->send(404, "text/plain; charset=utf-8", "404 Not Found");
  });
}

void SensorServer31::handleRoot() {
  server_->sendHeader("Cache-Control", "no-store");
  server_->send(200, "text/html; charset=utf-8", makeHtml());
}

void SensorServer31::handleJson() {
  server_->sendHeader("Access-Control-Allow-Origin", "*");
  server_->sendHeader("Cache-Control", "no-store");
  server_->send(200, "application/json; charset=utf-8", makeJson());
}

void SensorServer31::handleGpio() {
  if (!server_->hasArg("control") || !server_->hasArg("state")) {
    server_->send(400, "application/json; charset=utf-8", "{\"ok\":false,\"message\":\"missing parameter\"}");
    return;
  }

  const int controlNumber = server_->arg("control").toInt();
  const int stateNumber = server_->arg("state").toInt();
  if (controlNumber < 1 || controlNumber > MAX_GPIO_CONTROLS || (stateNumber != 0 && stateNumber != 1)) {
    server_->send(400, "application/json; charset=utf-8", "{\"ok\":false,\"message\":\"invalid parameter\"}");
    return;
  }

  if (!setBrowserControlState(static_cast<uint8_t>(controlNumber), stateNumber == 1)) {
    server_->send(404, "application/json; charset=utf-8", "{\"ok\":false,\"message\":\"control not registered\"}");
    return;
  }

  String response = "{\"ok\":true,\"control\":" + String(controlNumber) + ",\"state\":" + String(stateNumber) + "}";
  server_->sendHeader("Cache-Control", "no-store");
  server_->send(200, "application/json; charset=utf-8", response);
}

String SensorServer31::makeJson() const {
  String json;
  json.reserve(1700);
  json = "{";
  json += "\"device\":\"" + jsonEscape(deviceName_) + "\",";
  json += "\"items\":[";
  bool first = true;
  for (uint8_t i = 0; i < MAX_ITEMS; ++i) {
    if (!items_[i].registered) continue;
    if (!first) json += ',';
    first = false;
    json += "{\"number\":" + String(i + 1);
    json += ",\"label\":\"" + jsonEscape(items_[i].label) + "\"";
    json += ",\"value\":\"" + jsonEscape(items_[i].value) + "\"";
    json += ",\"unit\":\"" + jsonEscape(items_[i].unit) + "\"}";
  }
  json += "],";
  json += "\"controls\":[";
  first = true;
  for (uint8_t i = 0; i < MAX_GPIO_CONTROLS; ++i) {
    if (!gpioControls_[i].registered) continue;
    if (!first) json += ',';
    first = false;
    json += "{\"number\":" + String(i + 1);
    json += ",\"label\":\"" + jsonEscape(gpioControls_[i].label) + "\"";
    json += ",\"highLabel\":\"" + jsonEscape(gpioControls_[i].highButtonLabel) + "\"";
    json += ",\"lowLabel\":\"" + jsonEscape(gpioControls_[i].lowButtonLabel) + "\"";
    json += ",\"state\":" + String(gpioControls_[i].state ? 1 : 0) + "}";
  }
  json += "],";
  json += "\"rssi\":" + String(WiFi.status() == WL_CONNECTED ? WiFi.RSSI() : 0) + ',';
  json += "\"uptime\":" + String(millis() / 1000UL);
  json += '}';
  return json;
}

String SensorServer31::makeHtml() const {
  String html;
  html.reserve(9000);
  html += F("<!doctype html><html lang='ja'><head><meta charset='utf-8'>");
  html += F("<meta name='viewport' content='width=device-width,initial-scale=1'>");
  html += "<title>" + htmlEscape(title_) + "</title>";
  html += F("<style>body{font-family:system-ui,-apple-system,sans-serif;margin:0;background:#eef3f7;color:#17324d}.wrap{max-width:780px;margin:auto;padding:20px}.head{background:#1769aa;color:white;padding:22px;border-radius:18px}.head h1{font-size:1.45rem;margin:0 0 6px}.head p{margin:0;opacity:.9}.section{font-size:1.1rem;font-weight:700;margin:22px 2px 10px}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.card{background:white;border-radius:18px;padding:20px;box-shadow:0 4px 18px #0001}.label{font-size:.95rem;color:#607d8b;overflow-wrap:anywhere}.value{font-size:2rem;font-weight:700;margin-top:6px;overflow-wrap:anywhere}.unit{font-size:1rem;font-weight:500;margin-left:4px}.full{grid-column:1/-1}.foot{text-align:center;color:#607d8b;margin-top:18px;font-size:.9rem}.ok{color:#1b7f3a}.ng{color:#b3261e}.empty{text-align:center;color:#607d8b}.control-title{font-size:1.25rem;font-weight:700}.control-meta{font-size:.86rem;color:#607d8b;margin:5px 0 14px}.buttons{display:grid;grid-template-columns:1fr 1fr;gap:10px}.btn{border:0;border-radius:12px;padding:13px;font-size:1rem;font-weight:700;cursor:pointer}.on{background:#d9f7e3;color:#176b35}.off{background:#fde2df;color:#9b2018}.selected{outline:3px solid #1769aa}.btn:disabled{opacity:.55;cursor:wait}@media(max-width:520px){.grid{grid-template-columns:1fr}.full{grid-column:auto}}</style></head><body><div class='wrap'>");
  html += "<div class='head'><h1>" + htmlEscape(title_) + "</h1><p id='device'>" + htmlEscape(deviceName_) + "</p></div>";
  html += F("<div class='section'>表示データ</div><div id='items' class='grid'><div class='card full empty'>表示項目を登録してください</div></div><div class='section'>ブラウザ操作</div><div id='controls' class='grid'><div class='card full empty'>操作ボタンを登録してください</div></div><div class='section'>通信状態</div><div class='grid'><div class='card full'><div id='status' class='value ok' style='font-size:1.35rem'>接続中</div><div id='info' class='label'></div></div></div><div class='foot'>ESP32 HTTP Server Ver.3.1.2 / 表示8項目・ブラウザ操作4系統</div></div>");
  html += F("<script>const esc=s=>String(s).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',\"'\":'&#39;'}[c]));let busy=false;async function setGpio(n,s){if(busy)return;busy=true;document.querySelectorAll('.btn').forEach(b=>b.disabled=true);try{const r=await fetch('/gpio?control='+n+'&state='+s+'&t='+Date.now(),{cache:'no-store'});if(!r.ok)throw 0;await update();}catch(e){alert('ブラウザ操作を変更できませんでした');}finally{busy=false;document.querySelectorAll('.btn').forEach(b=>b.disabled=false);}}async function update(){try{const r=await fetch('/data?t='+Date.now(),{cache:'no-store'});if(!r.ok)throw 0;const d=await r.json();document.getElementById('device').textContent=d.device;const items=document.getElementById('items');items.innerHTML=d.items.length?d.items.map(x=>'<div class=\"card\"><div class=\"label\">'+esc(x.label)+'</div><div class=\"value\">'+esc(x.value||'--')+'<span class=\"unit\">'+esc(x.unit)+'</span></div></div>').join(''):'<div class=\"card full empty\">表示項目を登録してください</div>';const controls=document.getElementById('controls');controls.innerHTML=d.controls.length?d.controls.map(x=>'<div class=\"card\"><div class=\"control-title\">'+esc(x.label)+'</div><div class=\"control-meta\">現在: '+(x.state?'HIGH':'LOW')+'</div><div class=\"buttons\"><button class=\"btn on '+(x.state?'selected':'')+'\" onclick=\"setGpio('+x.number+',1)\">'+esc(x.highLabel||'HIGH')+'</button><button class=\"btn off '+(!x.state?'selected':'')+'\" onclick=\"setGpio('+x.number+',0)\">'+esc(x.lowLabel||'LOW')+'</button></div></div>').join(''):'<div class=\"card full empty\">操作ボタンを登録してください</div>';document.getElementById('status').textContent='接続中';document.getElementById('status').className='value ok';document.getElementById('info').textContent='Wi-Fi RSSI: '+d.rssi+' dBm / 稼働時間: '+d.uptime+' 秒';}catch(e){document.getElementById('status').textContent='更新できません';document.getElementById('status').className='value ng';}}update();setInterval(update,");
  html += String(updateIntervalMs_);
  html += F(");</script></body></html>");
  return html;
}

String SensorServer31::htmlEscape(const String& text) {
  String out = text;
  out.replace("&", "&amp;");
  out.replace("<", "&lt;");
  out.replace(">", "&gt;");
  out.replace("\"", "&quot;");
  out.replace("'", "&#39;");
  return out;
}

String SensorServer31::jsonEscape(const String& text) {
  String out;
  out.reserve(text.length() + 8);
  for (size_t i = 0; i < text.length(); ++i) {
    const char c = text.charAt(i);
    if (c == '\\' || c == '"') {
      out += '\\'; out += c;
    } else if (c == '\n') out += "\\n";
    else if (c == '\r') out += "\\r";
    else if (c == '\t') out += "\\t";
    else out += c;
  }
  return out;
}
