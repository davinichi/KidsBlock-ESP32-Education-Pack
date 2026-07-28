#include "SensorServer.h"

SensorServer::SensorServer()
  : server_(nullptr),
    title_("ESP32 HTTP Server"),
    deviceName_("ESP32-01"),
    running_(false),
    updateIntervalMs_(3000) {
  clearAllItems();
}

SensorServer::~SensorServer() {
  if (server_ != nullptr) {
    server_->stop();
    delete server_;
    server_ = nullptr;
  }
}

void SensorServer::begin(const String& title, uint16_t port) {
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

void SensorServer::setDeviceName(const String& name) {
  deviceName_ = name;
}

void SensorServer::setUpdateInterval(unsigned long milliseconds) {
  updateIntervalMs_ = constrain(milliseconds, 1000UL, 60000UL);
}

int SensorServer::itemIndex(uint8_t itemNumber) const {
  if (itemNumber < 1 || itemNumber > MAX_ITEMS) return -1;
  return static_cast<int>(itemNumber - 1);
}

bool SensorServer::registerItem(uint8_t itemNumber, const String& label, const String& unit) {
  const int index = itemIndex(itemNumber);
  if (index < 0) return false;
  items_[index].label = label;
  items_[index].unit = unit;
  items_[index].registered = true;
  return true;
}

bool SensorServer::updateItem(uint8_t itemNumber, const String& value) {
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

bool SensorServer::clearItem(uint8_t itemNumber) {
  const int index = itemIndex(itemNumber);
  if (index < 0) return false;
  items_[index].label = "";
  items_[index].value = "";
  items_[index].unit = "";
  items_[index].registered = false;
  return true;
}

void SensorServer::clearAllItems() {
  for (uint8_t i = 0; i < MAX_ITEMS; ++i) {
    items_[i].label = "";
    items_[i].value = "";
    items_[i].unit = "";
    items_[i].registered = false;
  }
}

void SensorServer::setValues(float temperature, float humidity) {
  registerItem(1, "温度", "℃");
  registerItem(2, "湿度", "%");
  updateItem(1, String(temperature, 1));
  updateItem(2, String(humidity, 1));
  clearItem(3);
}

void SensorServer::setValues(float temperature, float humidity, float wbgt) {
  registerItem(1, "温度", "℃");
  registerItem(2, "湿度", "%");
  registerItem(3, "WBGT", "℃");
  updateItem(1, String(temperature, 1));
  updateItem(2, String(humidity, 1));
  updateItem(3, String(wbgt, 1));
}

void SensorServer::handleClient() {
  if (server_ != nullptr && running_) {
    server_->handleClient();
    delay(2);
  }
}

String SensorServer::ipAddress() const {
  if (WiFi.status() != WL_CONNECTED) return "0.0.0.0";
  return WiFi.localIP().toString();
}

String SensorServer::url() const {
  return String("http://") + ipAddress() + "/";
}

bool SensorServer::isRunning() const {
  return running_;
}

void SensorServer::registerRoutes() {
  server_->on("/", HTTP_GET, [this]() { handleRoot(); });
  server_->on("/data", HTTP_GET, [this]() { handleJson(); });
  server_->on("/api", HTTP_GET, [this]() { handleJson(); });
  server_->onNotFound([this]() {
    server_->send(404, "text/plain; charset=utf-8", "404 Not Found");
  });
}

void SensorServer::handleRoot() {
  server_->sendHeader("Cache-Control", "no-store");
  server_->send(200, "text/html; charset=utf-8", makeHtml());
}

void SensorServer::handleJson() {
  server_->sendHeader("Access-Control-Allow-Origin", "*");
  server_->sendHeader("Cache-Control", "no-store");
  server_->send(200, "application/json; charset=utf-8", makeJson());
}

String SensorServer::makeJson() const {
  String json;
  json.reserve(1100);
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
  json += "\"rssi\":" + String(WiFi.status() == WL_CONNECTED ? WiFi.RSSI() : 0) + ',';
  json += "\"uptime\":" + String(millis() / 1000UL);
  json += '}';
  return json;
}

String SensorServer::makeHtml() const {
  String html;
  html.reserve(6200);
  html += F("<!doctype html><html lang='ja'><head><meta charset='utf-8'>");
  html += F("<meta name='viewport' content='width=device-width,initial-scale=1'>");
  html += "<title>" + htmlEscape(title_) + "</title>";
  html += F("<style>body{font-family:system-ui,-apple-system,sans-serif;margin:0;background:#eef3f7;color:#17324d}.wrap{max-width:780px;margin:auto;padding:20px}.head{background:#1769aa;color:white;padding:22px;border-radius:18px}.head h1{font-size:1.45rem;margin:0 0 6px}.head p{margin:0;opacity:.9}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:16px}.card{background:white;border-radius:18px;padding:20px;box-shadow:0 4px 18px #0001}.label{font-size:.95rem;color:#607d8b;overflow-wrap:anywhere}.value{font-size:2rem;font-weight:700;margin-top:6px;overflow-wrap:anywhere}.unit{font-size:1rem;font-weight:500;margin-left:4px}.full{grid-column:1/-1}.foot{text-align:center;color:#607d8b;margin-top:18px;font-size:.9rem}.ok{color:#1b7f3a}.ng{color:#b3261e}.empty{text-align:center;color:#607d8b}@media(max-width:520px){.grid{grid-template-columns:1fr}.full{grid-column:auto}}</style></head><body><div class='wrap'>");
  html += "<div class='head'><h1>" + htmlEscape(title_) + "</h1><p id='device'>" + htmlEscape(deviceName_) + "</p></div>";
  html += F("<div id='items' class='grid'><div class='card full empty'>表示項目を登録してください</div></div><div class='grid'><div class='card full'><div class='label'>通信状態</div><div id='status' class='value ok' style='font-size:1.35rem'>接続中</div><div id='info' class='label'></div></div></div><div class='foot'>ESP32 HTTP Server / 最大8項目</div></div>");
  html += F("<script>const esc=s=>String(s).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',\"'\":'&#39;'}[c]));async function u(){try{const r=await fetch('/data?t='+Date.now(),{cache:'no-store'});if(!r.ok)throw 0;const d=await r.json();document.getElementById('device').textContent=d.device;const box=document.getElementById('items');if(!d.items.length){box.innerHTML='<div class=\"card full empty\">表示項目を登録してください</div>'}else{box.innerHTML=d.items.map(x=>'<div class=\"card\"><div class=\"label\">'+esc(x.label)+'</div><div class=\"value\">'+esc(x.value||'--')+'<span class=\"unit\">'+esc(x.unit)+'</span></div></div>').join('')}document.getElementById('status').textContent='接続中';document.getElementById('status').className='value ok';document.getElementById('info').textContent='Wi-Fi RSSI: '+d.rssi+' dBm / 稼働時間: '+d.uptime+' 秒';}catch(e){document.getElementById('status').textContent='更新できません';document.getElementById('status').className='value ng';}}u();setInterval(u,");
  html += String(updateIntervalMs_);
  html += F(");</script></body></html>");
  return html;
}

String SensorServer::htmlEscape(const String& text) {
  String out = text;
  out.replace("&", "&amp;");
  out.replace("<", "&lt;");
  out.replace(">", "&gt;");
  out.replace("\"", "&quot;");
  out.replace("'", "&#39;");
  return out;
}

String SensorServer::jsonEscape(const String& text) {
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
