#include "SensorServer32.h"

SensorServer32::SensorServer32()
  : server_(nullptr),
    title_("ESP32 HTTP Server"),
    deviceName_("ESP32-01"),
    exclusiveGroupLabel_("モード選択"),
    selectedExclusiveOption_(0),
    running_(false),
    updateIntervalMs_(3000) {
  clearAllItems();
  clearAllBrowserControls();
  clearAllExclusiveOptions();
}

SensorServer32::~SensorServer32() {
  if (server_ != nullptr) {
    server_->stop();
    delete server_;
    server_ = nullptr;
  }
}

void SensorServer32::begin(const String& title, uint16_t port) {
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

void SensorServer32::setDeviceName(const String& name) { deviceName_ = name; }
void SensorServer32::setUpdateInterval(unsigned long milliseconds) {
  updateIntervalMs_ = constrain(milliseconds, 1000UL, 60000UL);
}

int SensorServer32::itemIndex(uint8_t n) const {
  return (n >= 1 && n <= MAX_ITEMS) ? static_cast<int>(n - 1) : -1;
}
int SensorServer32::browserControlIndex(uint8_t n) const {
  return (n >= 1 && n <= MAX_BROWSER_CONTROLS) ? static_cast<int>(n - 1) : -1;
}
int SensorServer32::exclusiveOptionIndex(uint8_t n) const {
  return (n >= 1 && n <= MAX_EXCLUSIVE_OPTIONS) ? static_cast<int>(n - 1) : -1;
}

bool SensorServer32::registerItem(uint8_t n, const String& label, const String& unit) {
  const int i=itemIndex(n); if(i<0) return false;
  items_[i].label=label; items_[i].unit=unit; items_[i].registered=true; return true;
}
bool SensorServer32::updateItem(uint8_t n, const String& value) {
  const int i=itemIndex(n); if(i<0) return false;
  if(!items_[i].registered){ items_[i].label=String("項目")+n; items_[i].unit=""; items_[i].registered=true; }
  items_[i].value=value; return true;
}
bool SensorServer32::clearItem(uint8_t n) {
  const int i=itemIndex(n); if(i<0) return false;
  items_[i].label=""; items_[i].value=""; items_[i].unit=""; items_[i].registered=false; return true;
}
void SensorServer32::clearAllItems(){ for(uint8_t i=0;i<MAX_ITEMS;++i){ items_[i].label=""; items_[i].value=""; items_[i].unit=""; items_[i].registered=false; } }

bool SensorServer32::registerBrowserControl(uint8_t n,const String& label,const String& highLabel,const String& lowLabel,bool initialState){
  const int i=browserControlIndex(n); if(i<0) return false;
  browserControls_[i].label=label; browserControls_[i].highButtonLabel=highLabel; browserControls_[i].lowButtonLabel=lowLabel;
  browserControls_[i].pin=-1; browserControls_[i].state=initialState; browserControls_[i].registered=true; return true;
}
bool SensorServer32::setBrowserControlState(uint8_t n,bool state){ const int i=browserControlIndex(n); if(i<0||!browserControls_[i].registered)return false; browserControls_[i].state=state; return true; }
bool SensorServer32::browserControlState(uint8_t n) const { const int i=browserControlIndex(n); return i>=0&&browserControls_[i].registered&&browserControls_[i].state; }
bool SensorServer32::clearBrowserControl(uint8_t n){ const int i=browserControlIndex(n); if(i<0)return false; browserControls_[i].label=""; browserControls_[i].highButtonLabel=""; browserControls_[i].lowButtonLabel=""; browserControls_[i].pin=-1; browserControls_[i].state=false; browserControls_[i].registered=false; return true; }
void SensorServer32::clearAllBrowserControls(){ for(uint8_t i=0;i<MAX_BROWSER_CONTROLS;++i){ browserControls_[i].label=""; browserControls_[i].highButtonLabel=""; browserControls_[i].lowButtonLabel=""; browserControls_[i].pin=-1; browserControls_[i].state=false; browserControls_[i].registered=false; } }

void SensorServer32::setExclusiveGroupLabel(const String& label){ exclusiveGroupLabel_=label; }
bool SensorServer32::registerExclusiveOption(uint8_t n,const String& label){
  const int i=exclusiveOptionIndex(n); if(i<0)return false; exclusiveOptions_[i].label=label; exclusiveOptions_[i].registered=true; return true;
}
bool SensorServer32::selectExclusiveOption(uint8_t n){
  const int i=exclusiveOptionIndex(n); if(i<0||!exclusiveOptions_[i].registered)return false; selectedExclusiveOption_=n; return true;
}
bool SensorServer32::exclusiveOptionSelected(uint8_t n) const { return selectedExclusiveOption_==n && exclusiveOptionIndex(n)>=0 && exclusiveOptions_[n-1].registered; }
uint8_t SensorServer32::selectedExclusiveOption() const { return selectedExclusiveOption_; }
void SensorServer32::clearAllExclusiveOptions(){ for(uint8_t i=0;i<MAX_EXCLUSIVE_OPTIONS;++i){ exclusiveOptions_[i].label=""; exclusiveOptions_[i].registered=false; } selectedExclusiveOption_=0; }

bool SensorServer32::registerGpioControl(uint8_t n,int pin,const String& label,bool initialState){ const bool ok=registerBrowserControl(n,label,"HIGH","LOW",initialState); if(ok) browserControls_[n-1].pin=pin; return ok; }
bool SensorServer32::setGpioState(uint8_t n,bool state){ return setBrowserControlState(n,state); }
bool SensorServer32::gpioState(uint8_t n) const { return browserControlState(n); }
bool SensorServer32::clearGpioControl(uint8_t n){ return clearBrowserControl(n); }
void SensorServer32::clearAllGpioControls(){ clearAllBrowserControls(); }

void SensorServer32::setValues(float t,float h){ registerItem(1,"温度","℃"); registerItem(2,"湿度","%"); updateItem(1,String(t,1)); updateItem(2,String(h,1)); clearItem(3); }
void SensorServer32::setValues(float t,float h,float w){ registerItem(1,"温度","℃"); registerItem(2,"湿度","%"); registerItem(3,"WBGT","℃"); updateItem(1,String(t,1)); updateItem(2,String(h,1)); updateItem(3,String(w,1)); }

void SensorServer32::handleClient(){ if(server_&&running_){ server_->handleClient(); delay(2); } }
String SensorServer32::ipAddress() const { return WiFi.status()==WL_CONNECTED ? WiFi.localIP().toString() : "0.0.0.0"; }
String SensorServer32::url() const { return String("http://")+ipAddress()+"/"; }
bool SensorServer32::isRunning() const { return running_; }

void SensorServer32::registerRoutes(){
  server_->on("/",HTTP_GET,[this](){handleRoot();});
  server_->on("/data",HTTP_GET,[this](){handleJson();});
  server_->on("/api",HTTP_GET,[this](){handleJson();});
  server_->on("/control",HTTP_GET,[this](){handleBrowserControl();});
  server_->on("/gpio",HTTP_GET,[this](){handleBrowserControl();});
  server_->on("/exclusive",HTTP_GET,[this](){handleExclusiveOption();});
  server_->onNotFound([this](){server_->send(404,"text/plain; charset=utf-8","404 Not Found");});
}
void SensorServer32::handleRoot(){
  server_->sendHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  server_->sendHeader("Pragma", "no-cache");
  server_->sendHeader("Expires", "0");
  server_->send(200, "text/html; charset=utf-8", makeHtml());
}
void SensorServer32::handleJson(){
  server_->sendHeader("Access-Control-Allow-Origin", "*");
  server_->sendHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  server_->sendHeader("Pragma", "no-cache");
  server_->sendHeader("Expires", "0");
  server_->send(200, "application/json; charset=utf-8", makeJson());
}
void SensorServer32::handleBrowserControl(){
  if(!server_->hasArg("control")||!server_->hasArg("state")){server_->send(400,"application/json; charset=utf-8","{\"ok\":false,\"message\":\"missing parameter\"}");return;}
  const int n=server_->arg("control").toInt(), s=server_->arg("state").toInt();
  if(n<1||n>MAX_BROWSER_CONTROLS||(s!=0&&s!=1)){server_->send(400,"application/json; charset=utf-8","{\"ok\":false,\"message\":\"invalid parameter\"}");return;}
  if(!setBrowserControlState(n,s==1)){server_->send(404,"application/json; charset=utf-8","{\"ok\":false,\"message\":\"control not registered\"}");return;}
  server_->sendHeader("Cache-Control","no-store"); server_->send(200,"application/json; charset=utf-8",String("{\"ok\":true,\"control\":")+n+",\"state\":"+s+"}");
}
void SensorServer32::handleExclusiveOption(){
  if(!server_->hasArg("option")){server_->send(400,"application/json; charset=utf-8","{\"ok\":false,\"message\":\"missing parameter\"}");return;}
  const int n=server_->arg("option").toInt();
  if(n<1||n>MAX_EXCLUSIVE_OPTIONS){server_->send(400,"application/json; charset=utf-8","{\"ok\":false,\"message\":\"invalid parameter\"}");return;}
  if(!selectExclusiveOption(n)){server_->send(404,"application/json; charset=utf-8","{\"ok\":false,\"message\":\"option not registered\"}");return;}
  server_->sendHeader("Cache-Control","no-store"); server_->send(200,"application/json; charset=utf-8",String("{\"ok\":true,\"selected\":")+n+"}");
}

String SensorServer32::makeJson() const {
  String j; j.reserve(2600); j="{\"device\":\""+jsonEscape(deviceName_)+"\",\"items\":["; bool first=true;
  for(uint8_t i=0;i<MAX_ITEMS;++i){if(!items_[i].registered)continue;if(!first)j+=',';first=false;j+="{\"number\":"+String(i+1)+",\"label\":\""+jsonEscape(items_[i].label)+"\",\"value\":\""+jsonEscape(items_[i].value)+"\",\"unit\":\""+jsonEscape(items_[i].unit)+"\"}";}
  j+="],\"controls\":["; first=true;
  for(uint8_t i=0;i<MAX_BROWSER_CONTROLS;++i){if(!browserControls_[i].registered)continue;if(!first)j+=',';first=false;j+="{\"number\":"+String(i+1)+",\"label\":\""+jsonEscape(browserControls_[i].label)+"\",\"highLabel\":\""+jsonEscape(browserControls_[i].highButtonLabel)+"\",\"lowLabel\":\""+jsonEscape(browserControls_[i].lowButtonLabel)+"\",\"state\":"+String(browserControls_[i].state?1:0)+"}";}
  j+="],\"exclusive\":{\"label\":\""+jsonEscape(exclusiveGroupLabel_)+"\",\"selected\":"+String(selectedExclusiveOption_)+",\"options\":["; first=true;
  for(uint8_t i=0;i<MAX_EXCLUSIVE_OPTIONS;++i){if(!exclusiveOptions_[i].registered)continue;if(!first)j+=',';first=false;j+="{\"number\":"+String(i+1)+",\"label\":\""+jsonEscape(exclusiveOptions_[i].label)+"\"}";}
  j+="]},\"rssi\":"+String(WiFi.status()==WL_CONNECTED?WiFi.RSSI():0)+",\"uptime\":"+String(millis()/1000UL)+"}"; return j;
}

String SensorServer32::makeHtml() const {
  String h;
  h.reserve(15000);

  h += F("<!doctype html><html lang='ja'><head><meta charset='utf-8'>");
  h += F("<meta name='viewport' content='width=device-width,initial-scale=1'>");
  h += F("<meta http-equiv='Cache-Control' content='no-store, no-cache, must-revalidate, max-age=0'>");
  h += F("<meta http-equiv='Pragma' content='no-cache'><meta http-equiv='Expires' content='0'>");
  h += "<title>" + htmlEscape(title_) + "</title>";
  h += F(R"HTML(<style>
body{font-family:system-ui,-apple-system,sans-serif;margin:0;background:#eef3f7;color:#17324d}
.wrap{max-width:850px;margin:auto;padding:20px}
.head{background:#1769aa;color:white;padding:22px;border-radius:18px}
.head h1{font-size:1.45rem;margin:0 0 6px}.head p{margin:0;opacity:.9}
.section{font-size:1.1rem;font-weight:700;margin:22px 2px 10px}
.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.card{background:white;border-radius:18px;padding:20px;box-shadow:0 4px 18px #0001}
.label{font-size:.95rem;color:#607d8b;overflow-wrap:anywhere}
.value{font-size:2rem;font-weight:700;margin-top:6px;overflow-wrap:anywhere}
.unit{font-size:1rem;font-weight:500;margin-left:4px}.full{grid-column:1/-1}
.foot{text-align:center;color:#607d8b;margin-top:18px;font-size:.9rem}
.ok{color:#1b7f3a}.ng{color:#b3261e}
.control-title{font-size:1.25rem;font-weight:700}.control-meta{font-size:.86rem;color:#607d8b;margin:5px 0 14px}
.buttons{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.radio-buttons{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.btn{border:0;border-radius:12px;padding:13px;font-size:1rem;font-weight:700;cursor:pointer;background:#e6edf3;color:#17324d}
.on{background:#d9f7e3;color:#176b35}.off{background:#fde2df;color:#9b2018}
.selected{outline:3px solid #1769aa;background:#dbeafe}.btn:disabled{opacity:.55}
@media(max-width:600px){.grid{grid-template-columns:1fr}.full{grid-column:auto}.radio-buttons{grid-template-columns:repeat(2,minmax(0,1fr))}}
</style></head><body><div class='wrap'>)HTML");

  h += "<div class='head'><h1>" + htmlEscape(title_) + "</h1><p id='device'>" + htmlEscape(deviceName_) + "</p></div>";
  h += F("<section id='itemsArea' hidden><div class='section'>表示データ</div><div id='items' class='grid'></div></section>");
  h += F("<section id='controlsArea' hidden><div class='section'>ON・OFFボタン</div><div id='controls' class='grid'></div></section>");
  h += F("<section id='radioArea' hidden><div class='section'>ラジオボタン</div><div id='radio' class='grid'></div></section>");
  h += F("<div class='section'>通信状態</div><div class='grid'><div class='card full'>");
  h += F("<div id='status' class='value ok' style='font-size:1.35rem'>接続中</div><div id='info' class='label'></div></div></div>");
  h += F("<div class='foot'>ESP32 HTTP Server Ver.");
  h += SENSOR_SERVER32_VERSION;
  h += F(" / 表示8項目・ON・OFFボタン8系統・ラジオボタン8項目</div></div>");

  h += F(R"HTML(<script>
'use strict';
function esc(v){return String(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
var busy=false;
function request(url,done){
  var x=new XMLHttpRequest();
  x.onreadystatechange=function(){if(x.readyState===4){done(x.status,x.responseText);}};
  x.open('GET',url,true);
  x.setRequestHeader('Cache-Control','no-cache');
  x.send();
}
function setDisabled(v){var b=document.querySelectorAll('.btn');for(var i=0;i<b.length;i++){b[i].disabled=v;}}
function setControl(n,s){
  if(busy)return;busy=true;setDisabled(true);
  request('/control?control='+n+'&state='+s+'&t='+Date.now(),function(st){busy=false;setDisabled(false);if(st===200){update();}else{alert('ON・OFFボタンを変更できませんでした');}});
}
function setRadio(n){
  if(busy)return;busy=true;setDisabled(true);
  request('/exclusive?option='+n+'&t='+Date.now(),function(st){busy=false;setDisabled(false);if(st===200){update();}else{alert('ラジオボタンを変更できませんでした');}});
}
function update(){
  request('/data?t='+Date.now(),function(st,text){
    try{
      if(st!==200)throw new Error('HTTP '+st);
      var d=JSON.parse(text);
      var itemData=Array.isArray(d.items)?d.items:[];
      var controlData=Array.isArray(d.controls)?d.controls:[];
      var radioData=d.exclusive||{label:'モード選択',selected:0,options:[]};
      var options=Array.isArray(radioData.options)?radioData.options:[];

      document.getElementById('device').textContent=d.device||'';
      document.getElementById('itemsArea').hidden=(itemData.length===0);
      document.getElementById('controlsArea').hidden=(controlData.length===0);
      document.getElementById('radioArea').hidden=(options.length===0);

      document.getElementById('items').innerHTML=itemData.map(function(x){
        return '<div class="card"><div class="label">'+esc(x.label)+'</div><div class="value">'+esc(x.value||'--')+'<span class="unit">'+esc(x.unit||'')+'</span></div></div>';
      }).join('');

      document.getElementById('controls').innerHTML=controlData.map(function(x){
        return '<div class="card"><div class="control-title">'+esc(x.label)+'</div><div class="control-meta">現在: '+(x.state?'HIGH':'LOW')+'</div><div class="buttons">'
          +'<button class="btn on '+(x.state?'selected':'')+'" onclick="setControl('+x.number+',1)">'+esc(x.highLabel||'ON')+'</button>'
          +'<button class="btn off '+(!x.state?'selected':'')+'" onclick="setControl('+x.number+',0)">'+esc(x.lowLabel||'OFF')+'</button></div></div>';
      }).join('');

      document.getElementById('radio').innerHTML=options.length
        ? '<div class="card full"><div class="control-title">'+esc(radioData.label||'モード選択')+'</div><div class="control-meta">選択番号: '+(radioData.selected||0)+'</div><div class="radio-buttons">'
          +options.map(function(x){return '<button class="btn '+((radioData.selected===x.number)?'selected':'')+'" onclick="setRadio('+x.number+')">'+esc(x.label)+'</button>';}).join('')
          +'</div></div>'
        : '';

      document.getElementById('status').textContent='接続中';
      document.getElementById('status').className='value ok';
      document.getElementById('info').textContent='Wi-Fi RSSI: '+(d.rssi||0)+' dBm / 稼働時間: '+(d.uptime||0)+' 秒';
    }catch(e){
      document.getElementById('status').textContent='更新できません';
      document.getElementById('status').className='value ng';
      document.getElementById('info').textContent='受信データを確認してください';
    }
  });
}
update();
setInterval(update, )HTML");
  h += String(updateIntervalMs_);
  h += F(R"HTML();
</script></body></html>)HTML");
  return h;
}

String SensorServer32::htmlEscape(const String& text){ String o=text;o.replace("&","&amp;");o.replace("<","&lt;");o.replace(">","&gt;");o.replace("\"","&quot;");o.replace("'","&#39;");return o; }
String SensorServer32::jsonEscape(const String& text){ String o;o.reserve(text.length()+8);for(size_t i=0;i<text.length();++i){char c=text.charAt(i);if(c=='\\'||c=='\"'){o+='\\';o+=c;}else if(c=='\n')o+="\\n";else if(c=='\r')o+="\\r";else if(c=='\t')o+="\\t";else o+=c;}return o; }
