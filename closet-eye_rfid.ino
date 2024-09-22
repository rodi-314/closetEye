#include <Arduino.h>
#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

#include <SPI.h>
#include <MFRC522.h>

// Insert your network credentials
#define WIFI_SSID "WIFI_SSID"
#define WIFI_PASSWORD "WIFI_PASSWORD"

// Insert Firebase project API Key
#define API_KEY "API_KEY"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "DATABASE_URL"

// Pins
#define RST_PIN 22
#define SS_PIN 21
#define BUZZER_PIN 13
#define GREEN_LED_PIN 33
#define RED_LED_PIN 26
#define YELLOW_LED_PIN 27

// Note frequencies
#define A4 440
#define CSHARP5 554
#define E5 659
#define A5 880
#define NOTE_DELAY 250

#define DB_POLLING_FREQ 1000

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance

bool signupOK = false;
unsigned long sendDataPrevMillis = 0;
bool registrationMode = false;
bool registrationComplete = true;
String inventoryPath = "/inventory/";
String inPath = "/in";
String wearsPath = "/wears";

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(GREEN_LED_PIN, OUTPUT);
  pinMode(RED_LED_PIN, OUTPUT);
  pinMode(YELLOW_LED_PIN, OUTPUT);

  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("ok");
    signupOK = true;
  } else {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback;  //see addons/TokenHelper.h

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  SPI.begin();                        // Init SPI bus
  mfrc522.PCD_Init();                 // Init MFRC522
  delay(5);                           // Optional delay. Some board do need more time after init to be ready, see Readme
  mfrc522.PCD_DumpVersionToSerial();  // Show details of PCD - MFRC522 Card Reader details
}

bool waitForTag() {
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
    return true;
  }
  return false;
}

uint64_t readTagUID() {
  uint64_t tag_uid = 0;
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    tag_uid = tag_uid << 8;
    tag_uid += mfrc522.uid.uidByte[i];
  }
  Serial.println(tag_uid);
  return tag_uid;
}

void registerTone() {
  digitalWrite(YELLOW_LED_PIN, HIGH);
  tone(BUZZER_PIN, A5);
  delay(NOTE_DELAY);
  tone(BUZZER_PIN, A4);
  delay(NOTE_DELAY / 4);
  noTone(BUZZER_PIN);
  delay(NOTE_DELAY / 4);
  tone(BUZZER_PIN, A4);
  delay(NOTE_DELAY / 4);
  noTone(BUZZER_PIN);
  delay(NOTE_DELAY / 4);
  tone(BUZZER_PIN, A4);
  delay(NOTE_DELAY * 2);
  noTone(BUZZER_PIN);
  digitalWrite(YELLOW_LED_PIN, LOW);
}

void scanInTone() {
  digitalWrite(GREEN_LED_PIN, HIGH);
  tone(BUZZER_PIN, A4);
  delay(NOTE_DELAY);
  tone(BUZZER_PIN, CSHARP5);
  delay(NOTE_DELAY);
  tone(BUZZER_PIN, E5);
  delay(NOTE_DELAY);
  tone(BUZZER_PIN, A5);
  delay(NOTE_DELAY * 2);
  noTone(BUZZER_PIN);
  digitalWrite(GREEN_LED_PIN, LOW);
}

void scanOutTone() {
  digitalWrite(RED_LED_PIN, HIGH);
  tone(BUZZER_PIN, A5);
  delay(NOTE_DELAY);
  tone(BUZZER_PIN, E5);
  delay(NOTE_DELAY);
  tone(BUZZER_PIN, CSHARP5);
  delay(NOTE_DELAY);
  tone(BUZZER_PIN, A4);
  delay(NOTE_DELAY * 2);
  noTone(BUZZER_PIN);
  digitalWrite(RED_LED_PIN, LOW);
}

void loop() {
  if (!(Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > DB_POLLING_FREQ || sendDataPrevMillis == 0))) {
    return;
  }
  sendDataPrevMillis = millis();

  // Read /registration/mode
  if (Firebase.RTDB.getBool(&fbdo, "/registration/mode")) {
    if (fbdo.dataType() == "boolean") {
      registrationMode = fbdo.boolData();
    }
  } else {
    Serial.println(fbdo.errorReason());
  }

  // Registration mode
  if (registrationMode) {
    if (registrationComplete) {
      // Set /registration/complete to false
      if (Firebase.RTDB.setBool(&fbdo, "/registration/complete", false)) {
        Serial.println("PASSED: Set /registration/complete to false");
      } else {
        Serial.println("FAILED: Set /registration/complete to false");
        Serial.println("REASON: " + fbdo.errorReason());
      }
      registrationComplete = false;
    }

    if (waitForTag()) {
      return;
    }

    uint64_t tag_uid = readTagUID();

    // Update /registration/tag_uid
    if (Firebase.RTDB.setInt(&fbdo, "/registration/tag_uid", tag_uid)) {
      Serial.println("PASSED: Update /registration/tag_uid");
    } else {
      Serial.println("FAILED: Update /registration/tag_uid");
      Serial.println("REASON: " + fbdo.errorReason());
    }

    // Initialise /inventory/tag_uid/in
    if (Firebase.RTDB.setBool(&fbdo, inventoryPath + tag_uid + inPath, false)) {
      Serial.println("PASSED: Initialise /inventory/tag_uid/in");
    } else {
      Serial.println("FAILED: Initialise /inventory/tag_uid/in");
      Serial.println("REASON: " + fbdo.errorReason());
    }

    // Initialise /inventory/tag_uid/wears
    if (Firebase.RTDB.setInt(&fbdo, inventoryPath + tag_uid + wearsPath, 0)) {
      Serial.println("PASSED: Initialise /inventory/tag_uid/wears");
    } else {
      Serial.println("FAILED: Initialise /inventory/tag_uid/wears");
      Serial.println("REASON: " + fbdo.errorReason());
    }

    // Set /registration/complete to true
    if (Firebase.RTDB.setBool(&fbdo, "/registration/complete", true)) {
      Serial.println("PASSED: Set /registration/complete to true");
    } else {
      Serial.println("FAILED: Set /registration/complete to true");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    registrationComplete = true;

    // Set /registration/mode to false
    if (Firebase.RTDB.setBool(&fbdo, "/registration/mode", false)) {
      Serial.println("PASSED: Set /registration/mode to false");
    } else {
      Serial.println("FAILED: Set /registration/mode to false");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    registrationMode = false;

    registerTone();

    // Normal mode
  } else {

    if (waitForTag()) {
      return;
    }

    uint64_t tag_uid = readTagUID();

    // Read /inventory/tag_uid/in
    if (Firebase.RTDB.getBool(&fbdo, inventoryPath + tag_uid + inPath)) {
      if (fbdo.dataType() == "boolean") {
        bool item_in = fbdo.boolData();

        // Update /inventory/tag_uid/in
        if (Firebase.RTDB.setBool(&fbdo, inventoryPath + tag_uid + inPath, !item_in)) {
          Serial.println("PASSED: Update /inventory/tag_uid/in");
        } else {
          Serial.println("FAILED: Update /inventory/tag_uid/in");
          Serial.println("REASON: " + fbdo.errorReason());
        }

        // Read & Update /inventory/tag_uid/wears
        if (item_in) {
          scanOutTone();
          // Read /inventory/tag_uid/wears
          if (Firebase.RTDB.getInt(&fbdo, inventoryPath + tag_uid + wearsPath)) {
            if (fbdo.dataType() == "int") {
              unsigned long wears = fbdo.intData();

              // Update /inventory/tag_uid/wears
              if (Firebase.RTDB.setInt(&fbdo, inventoryPath + tag_uid + wearsPath, wears + 1)) {
                Serial.println("PASSED: Update /inventory/tag_uid/wears");
              } else {
                \.println("FAILED: Update /inventory/tag_uid/wears");
                Serial.println("REASON: " + fbdo.errorReason());
              }
            }
          } else {
            Serial.println(fbdo.errorReason());
          }
        } else {
          scanInTone();
        }
      }
    } else {
      Serial.println(fbdo.errorReason());
    }
  }
}