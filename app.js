/* ============================================================
 *  SmartEnergy · Solar Monitor
 *  Tabs: Overview / Monitoring / Analytics / Energy / Developer
 * ============================================================ */

// ============================================================
//  1. CONFIG  (edit these)
// ============================================================
const SUPABASE_URL      = "https://oacpdzphwojhnyuhoeqe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hY3BkenBod29qaG55dWhvZXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4MzkzMzAsImV4cCI6MjA5OTQxNTMzMH0.CtgC01UX3aIqx7p0QZCWC_ymmT2OeZsj6K4Y3Q8dkFM";


const DEVICE_ID         = "meter_01";
const REFRESH_MS        = 5000;
const TARIFF            = 8.0;      // cost per kWh
const CURRENCY          = "BDT";
const MAX_POWER_W       = 2000;     // gauge full-scale
const DAILY_BUDGET_KWH  = 10;       // for the "Energy Balance Today" gauge
const CO2_PER_KWH       = 0.70;     // kg CO2 saved per kWh (grid factor)
const CO2_PER_KM        = 0.12;     // kg CO2 per km (car), for the km equivalent

// ---- Developer profile ----
const DEVELOPER = {
  name: "Md. Mehedi Hasan",
  role: "Embedded Systems Engineer · IoT Specialist",
  initials: "MH",
  photo: "https://lh3.googleusercontent.com/sitesv/AA5AbUDgkRCOq8Vz4Nln3qvHBeYLpB0pLmNxosAltPLOFptup-moCo4DJHky6WelH6WTlGJxMc7-vFNTDS6uEkl3Sv_5ExC9XyLd_nogHKQJllVfKBQgZfL2oTwN2I6VPqfDmbOGQLOieEJwOhqu38RCVUtKMNb_Ro5aY2wMdzBSHVgWMUng4MI_47Cc-uneinTUXGVk4rpFxNfdH0jo5nAxsK9cb8PClVJE2BPWIv1OAT8=w1280",
  bio: "A multi-disciplinary engineer and researcher with deep expertise in Embedded Systems, " +
       "IoT, and Software Development. Hands-on experience building real microcontroller-based " +
       "systems, sensor networks, and cloud-connected IoT solutions. Also an active researcher, " +
       "event organizer, and educator — with published research, multiple awards, and a rich " +
       "portfolio of lectures and projects.",
  links: [
    { label: "GitHub", url: "https://github.com/Mehedi-Hasan-soft-web-support" },
  ],
};

// ---- Projects (name, tag, links, optional status) ----
const GH = "https://github.com/Mehedi-Hasan-soft-web-support/";
const PROJECTS = [
  { n: "Clap Switch (Custom ATmega328P)", tag: "Custom MCU", status: "Demo pending", links: [] },
  { n: "IR Remote Controlled LED Lighting System", tag: "Arduino", status: "Demo pending", links: [] },
  { n: "Real-Time Smoke Detection System", tag: "IoT", links: [{ l: "Live", u: "https://mehedi-hasan-soft-web-support.github.io/smoke.github.io/" }] },
  { n: "Home Automation using PIR Sensor & Arduino UNO R3", tag: "Automation", links: [{ l: "Video", u: "https://www.youtube.com/watch?v=ylutRmqeahs&t=4s" }] },
  { n: "Poultry Farm Environment Monitoring (ESP32 + ThingSpeak)", tag: "ESP32 · Cloud", links: [{ l: "Code", u: GH+"Poultry-Farm-Environment-Monitoring-System-using-ESP32-and-ThingSpeak" }, { l: "Live", u: "https://me497d.github.io/PoultryAirSense/index.html" }] },
  { n: "Plant Growth Monitoring (Humidity, Temp & Light)", tag: "Sensors", links: [{ l: "Code", u: GH+"Plant-Growth-Monitoring-System-Using-humidity-tempareture-and-Light-intensive-value-" }] },
  { n: "Embedded Voting Machine (Coupon Auth + ThingSpeak)", tag: "Embedded", links: [{ l: "Code", u: GH+"Embedded-Voting-Machine-with-Coupon-Authentication-and-ThingSpeak-Cloud-Integration" }] },
  { n: "Arduino Logic Gate Simulator with OLED Display", tag: "Arduino", links: [{ l: "Code", u: GH+"logic-Gate-Simulator-using-Arduino-Nano" }] },
  { n: "Arduino Radar", tag: "Arduino", links: [{ l: "Code", u: GH+"Arduino-Raddar" }] },
  { n: "Dual-Ultrasonic-Sensor-Based Relay Control System", tag: "Arduino", links: [{ l: "Code", u: GH+"Dual-Ultrasonic-Sensor-Based-Relay-Control-System" }] },
  { n: "RFID Attendance System (Arduino UNO R3)", tag: "RFID", links: [{ l: "Code", u: GH+"RFID-Attendence-System-Using-Arduino-UNO-R3-" }] },
  { n: "Arduino-Based Smart Home Automation System", tag: "Automation", links: [{ l: "Post", u: "https://www.facebook.com/share/p/1E9gTmgTb3/" }] },
  { n: "Fire Detection System (custom ATmega328P chip)", tag: "Custom MCU", links: [{ l: "Code", u: GH+"Fire-Detection-System--with-custom-Arduino/tree/main" }] },
  { n: "ESP32 BLE Presentation Remote with OLED", tag: "ESP32 · BLE", links: [{ l: "Code", u: GH+"ESP32-BLE-Presentation-Remote-OLED/tree/main" }] },
  { n: "Soil-Air-Monitor (ESP32, DHT11, DS18B20, BH1750, ThingSpeak)", tag: "ESP32 · Cloud", links: [{ l: "Code", u: GH+"soil-air-monitor" }] },
  { n: "ESP32 Plant Growth Monitoring (Light Dependency, Cloud)", tag: "ESP32", links: [{ l: "Code", u: GH+"ESP32-Based-Plant-Growth-Light-Dependency-Sensor-with-Cloud-Monitoring" }] },
  { n: "ESP32-CAM Telegram Multi-User Photo Streamer", tag: "ESP32-CAM", links: [{ l: "Code", u: GH+"ESP32-CAM-Telegram-Multi-User-Photo-Streamer" }] },
  { n: "RFID Attendance + ThingSpeak Cloud & Custom Website", tag: "RFID · Web", links: [{ l: "Code", u: GH+"RFID-Bassed-attendence-system-with-thinkspeak-cloud-" }] },
  { n: "IoT Teacher Portal with RFID & MySQL Integration", tag: "IoT · Web", links: [{ l: "Code", u: GH+"IoT-Teacher-Portal-with-RFID-and-MySQL-Integration/tree/main" }] },
  { n: "IoT Poultry Brooding Temperature Control (ESP32)", tag: "ESP32 · IoT", links: [{ l: "Code", u: GH+"IoT-Based-Poultry-Brooding-Temperature-Control-System-Using-ESP32/tree/main" }] },
  { n: "Arduino Real-Time Time & Temperature", tag: "Arduino", links: [{ l: "Code", u: GH+"Arduino-based-Real-time-Time-and-Tempareture-/tree/main" }] },
  { n: "SmartBrooder", tag: "IoT", links: [{ l: "Code", u: GH+"SmartBrooder" }] },
  { n: "Blynk with DHT11 & LED Control", tag: "Blynk", links: [{ l: "Code", u: GH+"Handbook/blob/main/Blynk_with_DHT11_and_LED_control.ino" }] },
  { n: "OnathSeba: Smart Food Distribution for Street Children", tag: "IoT · AI", links: [{ l: "Code", u: GH+"SmartBrooder" }] },
  { n: "Multinode Gateway Earthquake Detection System", tag: "ESP32 · Gateway", links: [{ l: "Code", u: GH+"ESP32-based-IoT-gateway-/tree/main" }] },
  { n: "XiaoZhi Talking AI Robot (ESP32 + Custom PCB)", tag: "AI · PCB", links: [{ l: "Post", u: "https://www.facebook.com/groups/658139796738196/permalink/918813270670846/" }] },
  { n: "ESP32 Internal Health Monitoring (Custom Library)", tag: "Research", status: "In research", links: [] },
  { n: "Blockchain-Based IoT Network Development", tag: "Research", status: "In research", links: [] },
  { n: "IFTTT-Based Water TDS Quality Monitor", tag: "IoT", links: [{ l: "Code", u: GH+"IFTTT-Based-Water-TDS-Quality-Monitor/tree/main" }] },
  { n: "TinyML Edge-AI Environmental Monitoring Prototype", tag: "TinyML", status: "Prototype", links: [] },
  { n: "ESP32 OLED Robot Face — 35 Modes (Games + Clock + Animations)", tag: "ESP32 · Display", links: [{ l: "Code", u: GH+"ESP32-OLED-Robot-Face-35-Modes-Smart-Display-Games-Clock-Animations-/tree/main" }] },
  { n: "IoT Arrhythmia Detection & Prediction System", tag: "IoT · Health", links: [{ l: "Code", u: GH+"IoT-based-Arrhythmia-detection-and-prediction-system" }] },
  { n: "BLE-Based Smart Attendance System (Secret Algorithm)", tag: "BLE", status: "Private", links: [] },
  { n: "HydroWatch: ESP32 Smart Water Monitoring (Cloud)", tag: "ESP32 · Cloud", links: [{ l: "Code", u: GH+"IoT-Based-Hydroponic-plant-Monitoring-and-Water-Quality-Analysis-" }] },
  { n: "RGB Picture Printing on Rounded SPI OLED Display", tag: "Display", links: [{ l: "Code", u: GH+"RGB-picture-printing-magic-on-Rounded-SPI-OLED-Display" }] },
  { n: "ESP32-CAM Web-Based Surveillance System", tag: "ESP32-CAM", links: [{ l: "Code", u: GH+"ESP32-Cam-Custom-web-server" }] },
  { n: "ESP32 LoRa Bridge Communication System", tag: "LoRa · Research", status: "Research", links: [] },
  { n: "Prossash: IoT Nebulizer & Patient Tracking System", tag: "IoT · Health", links: [{ l: "Code", u: GH+"Prossas" }] },
];

// ============================================================
//  2. Helpers
// ============================================================
const el  = (id) => document.getElementById(id);
const fmt = (v, d = 1) => (v == null || isNaN(v)) ? "--" : Number(v).toFixed(d);
const headers = { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` };
const CO = { orange: "#f2531a", gold: "#f5b301", teal: "#2bb3a3", ink: "#1c1b18",
             muted: "#8b867c", track: "#eae4d8", grid: "rgba(0,0,0,.06)" };

el("footDevice").textContent = DEVICE_ID;
el("ovCur").textContent = CURRENCY;
el("ovMax").textContent = MAX_POWER_W;
el("ovTariff").textContent = `${TARIFF} ${CURRENCY}/kWh`;

let currentRange = "daily";
const allCharts = [];
function newChart(id, cfg) { const c = new Chart(el(id), cfg); allCharts.push(c); return c; }

// ============================================================
//  3. Charts
// ============================================================
const gradFill = (ctx, hex) => { const c = ctx.chart.ctx, g = c.createLinearGradient(0,0,0,220);
  g.addColorStop(0, hex + "55"); g.addColorStop(1, hex + "05"); return g; };
const noAxes = { x: { display: false }, y: { display: false } };
const baseLine = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };

const ovPowerBar = newChart("ovPowerBar", { type: "bar",
  data: { labels: [], datasets: [{ data: [], backgroundColor: CO.orange, borderRadius: 3, barPercentage: .9 }] },
  options: { ...baseLine, scales: noAxes } });

const ovBalance = newChart("ovBalance", { type: "doughnut",
  data: { datasets: [{ data: [1,1], backgroundColor: [CO.orange, CO.gold], borderWidth: 0, cutout: "72%" }] },
  options: { responsive: true, maintainAspectRatio: false, rotation: -90, circumference: 180,
             plugins: { legend: { display: false }, tooltip: { enabled: false } } } });

const ovTotalLine = newChart("ovTotalLine", { type: "line",
  data: { labels: [], datasets: [{ data: [], borderColor: CO.orange, borderWidth: 2, tension: .4,
          pointRadius: 0, fill: true, backgroundColor: (c) => gradFill(c, "#f2531a") }] },
  options: { ...baseLine, scales: { x: { display: false }, y: { grid: { color: CO.grid }, ticks: { color: CO.muted } } } } });

const monLive = newChart("monLive", { type: "line",
  data: { labels: [], datasets: [{ data: [], borderColor: CO.orange, borderWidth: 2, tension: .4,
          pointRadius: 0, fill: true, backgroundColor: (c) => gradFill(c, "#f2531a") }] },
  options: { ...baseLine, scales: { x: { grid: { display: false }, ticks: { color: CO.muted, maxTicksLimit: 8 } },
             y: { grid: { color: CO.grid }, ticks: { color: CO.muted }, beginAtZero: true } } } });

const gauge = (id, color) => newChart(id, { type: "doughnut",
  data: { datasets: [{ data: [0,1], backgroundColor: [color, CO.track], borderWidth: 0, cutout: "75%" }] },
  options: { responsive: true, maintainAspectRatio: false, rotation: -90,
             plugins: { legend: { display: false }, tooltip: { enabled: false } } } });
const monLoad = gauge("monLoad", CO.orange);
const monPf   = gauge("monPf", CO.teal);

const anMain = newChart("anMain", {
  data: { labels: [], datasets: [
    { type: "bar", label: "Energy (kWh)", data: [], yAxisID: "y", backgroundColor: CO.orange, borderRadius: 5, barPercentage: .6 },
    { type: "line", label: "Avg Power (W)", data: [], yAxisID: "y2", borderColor: CO.gold, borderWidth: 2, tension: .4, pointRadius: 0 },
  ]},
  options: { responsive: true, maintainAspectRatio: false, interaction: { mode: "index", intersect: false },
    plugins: { legend: { labels: { color: CO.muted, boxWidth: 12, font: { size: 11 } } } },
    scales: { x: { grid: { display: false }, ticks: { color: CO.muted, maxTicksLimit: 14 } },
      y:  { position: "left", grid: { color: CO.grid }, ticks: { color: CO.muted }, beginAtZero: true },
      y2: { position: "right", grid: { drawOnChartArea: false }, ticks: { color: CO.gold }, beginAtZero: true } } } });

const anVolt = newChart("anVolt", { type: "line",
  data: { labels: [], datasets: [{ data: [], borderColor: CO.teal, borderWidth: 2, tension: .4, pointRadius: 0,
          fill: true, backgroundColor: (c) => gradFill(c, "#2bb3a3") }] },
  options: { ...baseLine, scales: { x: { grid: { display: false }, ticks: { color: CO.muted, maxTicksLimit: 12 } },
             y: { grid: { color: CO.grid }, ticks: { color: CO.muted } } } } });

const anDist = newChart("anDist", { type: "bar",
  data: { labels: ["Night","Morning","Afternoon","Evening"], datasets: [{ data: [0,0,0,0],
          backgroundColor: [CO.teal, CO.gold, CO.orange, "#8b5cf6"], borderRadius: 6, barPercentage: .6 }] },
  options: { ...baseLine, scales: { x: { grid: { display: false }, ticks: { color: CO.muted } },
             y: { grid: { color: CO.grid }, ticks: { color: CO.muted }, beginAtZero: true } } } });

const enCost = newChart("enCost", { type: "bar",
  data: { labels: [], datasets: [{ data: [], backgroundColor: CO.gold, borderRadius: 5, barPercentage: .6 }] },
  options: { ...baseLine, scales: { x: { grid: { display: false }, ticks: { color: CO.muted, maxTicksLimit: 14 } },
             y: { grid: { color: CO.grid }, ticks: { color: CO.muted }, beginAtZero: true } } } });

const enCum = newChart("enCum", { type: "line",
  data: { labels: [], datasets: [{ data: [], borderColor: CO.orange, borderWidth: 2, tension: .3, pointRadius: 0,
          fill: true, backgroundColor: (c) => gradFill(c, "#f2531a") }] },
  options: { ...baseLine, scales: { x: { grid: { display: false }, ticks: { color: CO.muted, maxTicksLimit: 14 } },
             y: { grid: { color: CO.grid }, ticks: { color: CO.muted } } } } });

// ============================================================
//  4. Fetch
// ============================================================
async function fetchLatest(limit = 30) {
  const url = `${SUPABASE_URL}/rest/v1/readings?device_id=eq.${DEVICE_ID}&order=created_at.desc&limit=${limit}`;
  const res = await fetch(url, { headers }); if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json();
}
async function fetchSince(iso) {
  const url = `${SUPABASE_URL}/rest/v1/readings?device_id=eq.${DEVICE_ID}&created_at=gte.${iso}&order=created_at.asc&limit=5000`;
  const res = await fetch(url, { headers }); if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json();
}

// ============================================================
//  5. Live (Overview + Monitoring)
// ============================================================
function setStatus(on) {
  el("statusDot").className = "dot " + (on ? "online" : "offline");
  el("statusText").textContent = on ? "Online" : "Offline";
}

async function refreshLive() {
  let rows;
  try { rows = await fetchLatest(); } catch (e) { console.error(e); return setStatus(false); }
  if (!rows.length) return setStatus(false);
  const r = rows[0];
  const asc = [...rows].reverse();

  // hero
  el("heroPower").textContent  = fmt(r.power, 0) + " W";
  el("heroEnergy").textContent = fmt(r.energy, 2) + " kWh";
  el("heroPf").textContent     = fmt(r.power_factor, 2);

  // total energy progress
  const load = Math.max(0, Math.min(MAX_POWER_W, r.power || 0));
  const pct = Math.round(load / MAX_POWER_W * 100);
  el("ovProgress").style.width = pct + "%";
  el("ovProgressTxt").textContent = pct + "%";
  el("ovTime").textContent = new Date(r.created_at).toLocaleTimeString();
  el("ovStatus").textContent = "Live";

  // current power triple + bar
  const pows = asc.map((x) => x.power || 0);
  el("cpNow").textContent  = fmt(r.power, 0);
  el("cpPeak").textContent = fmt(Math.max(...pows), 0);
  el("cpAvg").textContent  = fmt(pows.reduce((a,b)=>a+b,0)/pows.length, 0);
  ovPowerBar.data.labels = pows.map((_,i)=>i);
  ovPowerBar.data.datasets[0].data = pows; ovPowerBar.update();

  // total line
  ovTotalLine.data.labels = asc.map((x)=> new Date(x.created_at).toLocaleTimeString());
  ovTotalLine.data.datasets[0].data = pows; ovTotalLine.update();

  // cost + CO2 (from cumulative energy)
  const energy = r.energy || 0;
  el("ovCost").textContent = (energy * TARIFF).toFixed(2);
  const co2 = energy * CO2_PER_KWH;
  el("ovCo2").textContent = fmt(co2, 1) + " kg";
  el("ovCo2Km").textContent = fmt(co2 / CO2_PER_KM, 0);

  // monitoring tiles
  el("mV").textContent = fmt(r.voltage,1); el("mA").textContent = fmt(r.current,3);
  el("mW").textContent = fmt(r.power,1);   el("mE").textContent = fmt(r.energy,3);
  el("mF").textContent = fmt(r.frequency,1); el("mPf").textContent = fmt(r.power_factor,2);
  el("monTime").textContent = "updated " + new Date(r.created_at).toLocaleTimeString();

  monLive.data.labels = ovTotalLine.data.labels; monLive.data.datasets[0].data = pows; monLive.update();
  monLoad.data.datasets[0].data = [load, MAX_POWER_W-load]; monLoad.update();
  el("monLoadPct").textContent = pct + "%";
  const pf = Math.max(0, Math.min(1, r.power_factor || 0));
  monPf.data.datasets[0].data = [pf, 1-pf]; monPf.update();
  el("monPfVal").textContent = fmt(r.power_factor, 2);

  // data table
  el("tbl").querySelector("tbody").innerHTML = rows.slice(0,15).map((x)=>`
    <tr><td>${new Date(x.created_at).toLocaleString()}</td>
    <td>${fmt(x.voltage,1)}</td><td>${fmt(x.current,3)}</td><td>${fmt(x.power,1)}</td>
    <td>${fmt(x.energy,3)}</td><td>${fmt(x.frequency,1)}</td><td>${fmt(x.power_factor,2)}</td></tr>`).join("");
  el("rowCount").textContent = `Showing latest ${Math.min(rows.length,15)} readings`;

  setStatus(true);
}

// ============================================================
//  6. Aggregate (Analytics + Energy + today's balance)
// ============================================================
function rangeCfg(range) {
  const n = new Date();
  if (range === "daily")
    return { start: new Date(n.getFullYear(), n.getMonth(), n.getDate()), buckets: 24,
             caption: "Today · hourly", label: (i)=>`${i}:00`, index: (d)=>d.getHours() };
  if (range === "monthly")
    return { start: new Date(n.getFullYear(), n.getMonth(), 1),
             buckets: new Date(n.getFullYear(), n.getMonth()+1, 0).getDate(),
             caption: "This month · daily", label: (i)=>`${i+1}`, index: (d)=>d.getDate()-1 };
  const M = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return { start: new Date(n.getFullYear(),0,1), buckets: 12,
           caption: "This year · monthly", label: (i)=>M[i], index: (d)=>d.getMonth() };
}

async function loadAnalysis(range) {
  const cfg = rangeCfg(range);
  el("anCaption").textContent = cfg.caption;
  let rows = [];
  try { rows = await fetchSince(cfg.start.toISOString()); } catch (e) { return console.error(e); }

  const eMin = Array(cfg.buckets).fill(null), eMax = Array(cfg.buckets).fill(null);
  const pSum = Array(cfg.buckets).fill(0), pCnt = Array(cfg.buckets).fill(0);
  const vSum = Array(cfg.buckets).fill(0), vCnt = Array(cfg.buckets).fill(0);
  const cumLast = Array(cfg.buckets).fill(null);
  const part = [ {s:0,c:0},{s:0,c:0},{s:0,c:0},{s:0,c:0} ]; // night/morning/afternoon/evening

  rows.forEach((x) => {
    const d = new Date(x.created_at), i = cfg.index(d);
    if (i>=0 && i<cfg.buckets) {
      if (x.energy!=null){ if(eMin[i]==null||x.energy<eMin[i])eMin[i]=x.energy;
        if(eMax[i]==null||x.energy>eMax[i])eMax[i]=x.energy; cumLast[i]=x.energy; }
      if (x.power!=null){ pSum[i]+=x.power; pCnt[i]++; }
      if (x.voltage!=null){ vSum[i]+=x.voltage; vCnt[i]++; }
    }
    if (x.power!=null){ const h=d.getHours(); const p = h<6?0:h<12?1:h<18?2:3; part[p].s+=x.power; part[p].c++; }
  });

  const energyBk = eMin.map((mn,i)=> mn==null?0:Math.max(0, eMax[i]-mn));
  const avgPowBk = pSum.map((s,i)=> pCnt[i]?s/pCnt[i]:0);
  const avgVoltBk = vSum.map((s,i)=> vCnt[i]?s/vCnt[i]:0);
  // forward-fill cumulative
  let last=null; const cum = cumLast.map((v)=>{ if(v!=null)last=v; return last; });

  const labels = Array.from({length:cfg.buckets},(_,i)=>cfg.label(i));
  anMain.data.labels = labels;
  anMain.data.datasets[0].data = energyBk.map(v=>+v.toFixed(3));
  anMain.data.datasets[1].data = avgPowBk.map(v=>+v.toFixed(1)); anMain.update();
  anVolt.data.labels = labels; anVolt.data.datasets[0].data = avgVoltBk.map(v=>+v.toFixed(1)); anVolt.update();
  anDist.data.datasets[0].data = part.map(p=> p.c? +(p.s/p.c).toFixed(1):0); anDist.update();

  enCost.data.labels = labels; enCost.data.datasets[0].data = energyBk.map(v=>+(v*TARIFF).toFixed(2)); enCost.update();
  enCum.data.labels = labels; enCum.data.datasets[0].data = cum.map(v=> v==null?null:+v.toFixed(3)); enCum.update();

  // summary
  const total = rows.length ? Math.max(0,(rows.at(-1).energy||0)-(rows[0].energy||0)) : 0;
  const allP = rows.map(x=>x.power).filter(v=>v!=null);
  const allV = rows.map(x=>x.voltage).filter(v=>v!=null);
  const avgP = allP.length? allP.reduce((a,b)=>a+b,0)/allP.length : 0;
  const avgV = allV.length? allV.reduce((a,b)=>a+b,0)/allV.length : 0;
  el("sumEnergy").textContent = fmt(total,3)+" kWh";
  el("sumAvg").textContent = fmt(avgP,0)+" W";
  el("sumPeak").textContent = fmt(allP.length?Math.max(...allP):0,0)+" W";
  el("sumVolt").textContent = fmt(avgV,1)+" V";
  el("sumCost").textContent = (total*TARIFF).toFixed(2)+" "+CURRENCY;
}

// today's balance gauge (Overview)
async function loadTodayBalance() {
  const start = new Date(); start.setHours(0,0,0,0);
  let rows = [];
  try { rows = await fetchSince(start.toISOString()); } catch (e) { return; }
  const consumed = rows.length ? Math.max(0,(rows.at(-1).energy||0)-(rows[0].energy||0)) : 0;
  const remaining = Math.max(0, DAILY_BUDGET_KWH - consumed);
  ovBalance.data.datasets[0].data = [consumed, remaining || 0.001];
  ovBalance.data.datasets[0].backgroundColor = [CO.orange, CO.track];
  ovBalance.update();
  el("ovBalKwh").textContent = fmt(consumed,2)+" kWh";
}

// ============================================================
//  7. Delete
// ============================================================
let pending = null;
const openModal = (t,m,a)=>{ el("modalTitle").textContent=t; el("modalMsg").textContent=m; pending=a; el("modal").classList.add("show"); };
const closeModal = ()=>{ el("modal").classList.remove("show"); pending=null; };
function toast(msg, ok=true){ const t=el("toast"); t.textContent=msg; t.className="toast show"; setTimeout(()=>t.className="toast",3000); }
async function del(filter){
  const res = await fetch(`${SUPABASE_URL}/rest/v1/readings?device_id=eq.${DEVICE_ID}${filter}`,
    { method:"DELETE", headers:{...headers, Prefer:"return=minimal"} });
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
}
el("delAllBtn").onclick = ()=> openModal("Delete ALL data?",
  `Permanently removes every reading for "${DEVICE_ID}". This cannot be undone.`, ()=>del(""));
el("delOldBtn").onclick = ()=> { const c=new Date(Date.now()-30*864e5).toISOString();
  openModal("Clear old data?","Removes all readings older than 30 days.", ()=>del(`&created_at=lt.${c}`)); };
el("modalCancel").onclick = closeModal;
el("modal").onclick = (e)=>{ if(e.target===el("modal")) closeModal(); };
el("modalConfirm").onclick = async ()=>{ if(!pending) return; const a=pending; closeModal();
  try { await a(); toast("Data deleted",true); await refreshAll(); }
  catch(e){ console.error(e); toast("Delete failed — check RLS delete policy",false); } };

// ============================================================
//  8. Developer tab render
// ============================================================
const PROJ_GRAD = [
  "linear-gradient(135deg,#f2531a,#ff9a3d)",
  "linear-gradient(135deg,#f5b301,#ff7a3d)",
  "linear-gradient(135deg,#2bb3a3,#1f8f9e)",
  "linear-gradient(135deg,#8b5cf6,#6366f1)",
  "linear-gradient(135deg,#ef4444,#f2531a)",
];
function projIcon(s) {
  s = s.toLowerCase();
  if (/cam|surveillance|camera|photo/.test(s)) return " ";
  if (/rfid/.test(s)) return " ";
  if (/robot|talking|xiaozhi/.test(s)) return " ";
  if (/arrhythmia|nebulizer|patient|health/.test(s)) return " ";
  if (/water|hydro|tds/.test(s)) return " ";
  if (/plant|soil|agri|growth/.test(s)) return " ";
  if (/poultry|brooder|brooding|farm/.test(s)) return " ";
  if (/fire/.test(s)) return " ";
  if (/smoke/.test(s)) return " ";
  if (/lora|gateway|earthquake|radar/.test(s)) return " ";
  if (/vote|voting/.test(s)) return " ";
  if (/oled|display|rgb|robot face/.test(s)) return " ";
  if (/ble|bluetooth|presentation/.test(s)) return "  ";
  if (/research|blockchain|tinyml|edge/.test(s)) return " ";
  if (/home|automation|clap|relay|ir /.test(s)) return " ";
  if (/light|led/.test(s)) return " ";
  return " ";
}
function renderDeveloper() {
  el("navAvatar").textContent = DEVELOPER.initials || "D";
  const photo = DEVELOPER.photo
    ? `<img src="${DEVELOPER.photo}" alt="${DEVELOPER.name}" referrerpolicy="no-referrer" onerror="this.parentElement.innerHTML='${DEVELOPER.initials}'">`
    : (DEVELOPER.initials || "D");
  el("devProfile").innerHTML = `
    <div class="dev-photo">${photo}</div>
    <div class="dev-info">
      <h2>${DEVELOPER.name}</h2>
      <div class="dev-role">${DEVELOPER.role}</div>
      <p class="dev-bio">${DEVELOPER.bio}</p>
      <div class="dev-links">${DEVELOPER.links.map(l=>`<a href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a>`).join("")}</div>
    </div>`;

  const cap = document.querySelector("#page-developer .page-head p");
  if (cap) cap.textContent = `${PROJECTS.length} projects · embedded systems, IoT & research`;

  el("projects").innerHTML = PROJECTS.map((p, i) => {
    const icon = projIcon(p.n + " " + (p.tag || ""));
    const foot = (p.links && p.links.length)
      ? `<div class="proj-links">${p.links.map(k=>`<a href="${k.u}" target="_blank" rel="noopener">${k.l} ↗</a>`).join("")}</div>`
      : (p.status ? `<span class="proj-status">${p.status}</span>` : "");
    return `<div class="proj">
      <div class="proj-banner" style="background:${PROJ_GRAD[i % PROJ_GRAD.length]}">
        <span class="proj-num">#${i+1}</span><span class="proj-emoji">${icon}</span>
      </div>
      <div class="proj-body">
        <h4>${p.n}</h4>
        ${p.tag ? `<span class="proj-tag">${p.tag}</span>` : ""}
        ${foot}
      </div>
    </div>`;
  }).join("");
}

// ============================================================
//  9. Tabs
// ============================================================
document.querySelectorAll(".tab-btn").forEach((b) => {
  b.onclick = () => {
    document.querySelectorAll(".tab-btn").forEach(x=>x.classList.remove("active"));
    document.querySelectorAll(".tab-page").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    el("page-" + b.dataset.tab).classList.add("active");
    setTimeout(()=> allCharts.forEach(c=>c.resize()), 30);   // fix canvas size on show
  };
});
document.querySelectorAll("#rangeSeg .seg").forEach((b)=>{
  b.onclick = ()=>{ document.querySelectorAll("#rangeSeg .seg").forEach(x=>x.classList.remove("active"));
    b.classList.add("active"); currentRange=b.dataset.range; loadAnalysis(currentRange); };
});

// ============================================================
//  10. Boot
// ============================================================
async function refreshAll(){ await refreshLive(); await loadAnalysis(currentRange); await loadTodayBalance(); }
renderDeveloper();
refreshAll();
setInterval(refreshLive, REFRESH_MS);
setInterval(()=>{ loadAnalysis(currentRange); loadTodayBalance(); }, 30000);
