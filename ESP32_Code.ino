/*
 * ============================================================
 *  IoT-Based Smart Energy Meter
 *  Board : ESP32 Dev Module
 *  Sensor: PZEM-004T v3.0 (Modbus RTU over UART)
 *  Display: 16x2 LCD with I2C backpack (PCF8574)
 *  Cloud : Supabase (PostgreSQL REST API)
 * ============================================================
 *
 *  LIBRARIES TO INSTALL (Arduino IDE -> Library Manager):
 *    - "PZEM004Tv30"        by Jakub Mandula
 *    - "LiquidCrystal I2C"  by Frank de Brabander
 *    (WiFi, HTTPClient, WiFiClientSecure, Wire come with the ESP32 core)
 *
 *  BOARD SETUP:
 *    Tools -> Board -> ESP32 Arduino -> "ESP32 Dev Module"
 * ============================================================
 */

#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <PZEM004Tv30.h>

// ------------------------------------------------------------
//  1. USER CONFIGURATION  (edit these)
// ------------------------------------------------------------
const char* WIFI_SSID     = "Me";
const char* WIFI_PASSWORD = "mehedi113";

// From Supabase -> Project Settings -> API
// !!! IMPORTANT: this URL MUST end with /rest/v1/readings  !!!
const char* SUPABASE_URL  = "https://oacpdzphwojhnyuhoeqe.supabase.co/rest/v1/readings";
const char* SUPABASE_KEY  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hY3BkenBod29qaG55dWhvZXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4MzkzMzAsImV4cCI6MjA5OTQxNTMzMH0.CtgC01UX3aIqx7p0QZCWC_ymmT2OeZsj6K4Y3Q8dkFM";   // the "anon public" key

const char* DEVICE_ID     = "meter_01";                 // label for this meter

const unsigned long SEND_INTERVAL_MS = 10000;           // upload every 10 s
const unsigned long LCD_ROTATE_MS    = 3000;            // change LCD screen every 3 s

// Set true to push FAKE data when no PZEM is connected.
// Use this to test the Supabase link by itself, then set back to false.
const bool SEND_TEST_DATA_IF_NO_SENSOR = false;

// ------------------------------------------------------------
//  2. HARDWARE PINS
// ------------------------------------------------------------
#define PZEM_RX_PIN 16   // ESP32 GPIO16 (RX2) <- PZEM TX
#define PZEM_TX_PIN 17   // ESP32 GPIO17 (TX2) -> PZEM RX

#define LCD_ADDR 0x27    // if screen stays blank/blocky try 0x3F

PZEM004Tv30 pzem(Serial2, PZEM_RX_PIN, PZEM_TX_PIN);
LiquidCrystal_I2C lcd(LCD_ADDR, 16, 2);

// ------------------------------------------------------------
//  3. GLOBAL STATE
// ------------------------------------------------------------
struct Reading {
  float voltage;
  float current;
  float power;
  float energy;
  float frequency;
  float pf;
  bool  valid;
};

Reading latest = {0, 0, 0, 0, 0, 0, false};

unsigned long lastSend   = 0;
unsigned long lastRotate = 0;
int lcdScreen = 0;   // 0 = V/I, 1 = P/E, 2 = Freq/PF

// ------------------------------------------------------------
//  4. SETUP
// ------------------------------------------------------------
void setup() {
  Serial.begin(115200);
  delay(200);

  Wire.begin(21, 22);          // SDA, SCL
  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Smart Energy");
  lcd.setCursor(0, 1);
  lcd.print("Meter  Booting..");

  connectWiFi();
}

// ------------------------------------------------------------
//  5. MAIN LOOP
// ------------------------------------------------------------
void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
  }

  readSensor();

  if (millis() - lastRotate >= LCD_ROTATE_MS) {
    lastRotate = millis();
    lcdScreen = (lcdScreen + 1) % 3;
    updateLCD();
  }

  if (millis() - lastSend >= SEND_INTERVAL_MS) {
    lastSend = millis();
    if (latest.valid) {
      sendToSupabase(latest);
    } else if (SEND_TEST_DATA_IF_NO_SENSOR) {
      Reading t = { 230.0, 0.500, 115.0, 1.234, 50.0, 0.98, true };
      Serial.println("[UPLOAD] No sensor -> sending TEST data.");
      sendToSupabase(t);
    } else {
      Serial.println("[UPLOAD] Skipped - no valid sensor reading yet.");
    }
  }

  delay(200);
}

// ------------------------------------------------------------
//  6. WIFI
// ------------------------------------------------------------
void connectWiFi() {
  Serial.printf("[WiFi] Connecting to %s", WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int tries = 0;
  while (WiFi.status() != WL_CONNECTED && tries < 40) {
    delay(500);
    Serial.print(".");
    tries++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.printf("\n[WiFi] Connected. IP: %s\n", WiFi.localIP().toString().c_str());
  } else {
    Serial.println("\n[WiFi] Failed - will retry in loop.");
  }
}

// ------------------------------------------------------------
//  7. READ PZEM-004T
// ------------------------------------------------------------
void readSensor() {
  float v  = pzem.voltage();
  float i  = pzem.current();
  float p  = pzem.power();
  float e  = pzem.energy();
  float f  = pzem.frequency();
  float pf = pzem.pf();

  if (isnan(v) || isnan(i) || isnan(p) || isnan(e) || isnan(f) || isnan(pf)) {
    latest.valid = false;
    Serial.println("[PZEM] No reading (check PZEM wiring / AC power).");
    return;
  }

  latest.voltage   = v;
  latest.current   = i;
  latest.power     = p;
  latest.energy    = e;   // kWh (cumulative since last reset)
  latest.frequency = f;
  latest.pf        = pf;
  latest.valid     = true;

  Serial.printf("[PZEM] V=%.1fV I=%.3fA P=%.1fW E=%.3fkWh F=%.1fHz PF=%.2f\n",
                v, i, p, e, f, pf);
}

// ------------------------------------------------------------
//  8. LCD DISPLAY (rotates through 3 screens)
// ------------------------------------------------------------
void updateLCD() {
  lcd.clear();

  if (!latest.valid) {
    lcd.setCursor(0, 0);
    lcd.print("Sensor error");
    lcd.setCursor(0, 1);
    lcd.print("Check PZEM/AC");
    return;
  }

  char l0[17];
  char l1[17];

  switch (lcdScreen) {
    case 0:
      snprintf(l0, sizeof(l0), "Volt: %6.1f V", latest.voltage);
      snprintf(l1, sizeof(l1), "Curr: %6.3f A", latest.current);
      break;
    case 1:
      snprintf(l0, sizeof(l0), "Pwr : %6.1f W", latest.power);
      snprintf(l1, sizeof(l1), "Enr : %5.3fkWh", latest.energy);
      break;
    default:
      snprintf(l0, sizeof(l0), "Freq: %6.1fHz", latest.frequency);
      snprintf(l1, sizeof(l1), "PF  : %6.2f", latest.pf);
      break;
  }

  lcd.setCursor(0, 0);
  lcd.print(l0);
  lcd.setCursor(0, 1);
  lcd.print(l1);
}

// ------------------------------------------------------------
//  9. UPLOAD TO SUPABASE
// ------------------------------------------------------------
void sendToSupabase(const Reading& r) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[UPLOAD] No WiFi - skipping.");
    return;
  }

  WiFiClientSecure client;
  client.setInsecure();   // skip TLS cert check (fine for a student project)

  HTTPClient https;
  https.setTimeout(8000);

  if (!https.begin(client, SUPABASE_URL)) {
    Serial.println("[UPLOAD] https.begin() failed - check the URL.");
    return;
  }

  https.addHeader("Content-Type", "application/json");
  https.addHeader("apikey", SUPABASE_KEY);
  https.addHeader("Authorization", String("Bearer ") + SUPABASE_KEY);
  https.addHeader("Prefer", "return=minimal");

  char body[256];
  snprintf(body, sizeof(body),
    "{\"device_id\":\"%s\",\"voltage\":%.2f,\"current\":%.3f,"
    "\"power\":%.2f,\"energy\":%.3f,\"frequency\":%.2f,\"power_factor\":%.2f}",
    DEVICE_ID, r.voltage, r.current, r.power, r.energy, r.frequency, r.pf);

  Serial.print("[UPLOAD] POST -> "); Serial.println(SUPABASE_URL);
  Serial.print("[UPLOAD] Body -> "); Serial.println(body);

  int code = https.POST(String(body));
  String resp = https.getString();

  Serial.printf("[UPLOAD] HTTP %d\n", code);
  if (resp.length()) { Serial.print("[UPLOAD] Resp -> "); Serial.println(resp); }

  if (code == 200 || code == 201 || code == 204) {
    Serial.println("[UPLOAD] OK - row inserted.");
  } else {
    Serial.println("[UPLOAD] FAILED. Common causes:");
    Serial.println("   401 / 403 -> RLS: run the 'anon can insert readings' policy in Supabase");
    Serial.println("   404       -> URL must end with /rest/v1/readings, or table name wrong");
    Serial.println("   400       -> column name mismatch in the JSON body");
    Serial.println("   -1 / -11  -> WiFi/TLS/DNS problem");
  }

  https.end();
}
