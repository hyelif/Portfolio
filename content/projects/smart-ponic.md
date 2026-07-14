---
title: Smart Communication Framework (SmartPonic)
description: "Full-stack IoT framework for hydroponics monitoring ESP32 firmware, LoRa mesh, Laravel dashboard, Flutter app, and Telegram bot."
tags:
  - ESP32
  - LoRa
  - C++
  - Laravel
  - Vue 3
  - Flutter
  - PHP
  - Turso
  - Telegram Bot
  - IoT
  - AES Encryption
techStack:
  - C++
  - PHP
  - Dart
  - Laravel
  - Vue 3
  - Flutter
  - Tailwind CSS
  - Chart.js
  - Inertia.js
  - Turso
  - SQLite
  - ESP32
  - LoRa
  - Arduino
  - Telegram
  - Linux
  - JSON
  - Postman
---

## Overview

**SmartPonic** is a full-stack IoT communication framework for monitoring and controlling microcontroller-based projects specifically hydroponics/aquaponics sensor networks. ESP32 nodes communicate over 433 MHz LoRa radio, data flows through a gateway to a Laravel cloud backend, and is accessible via a Vue 3 dashboard, Flutter mobile app, and Telegram bot.

[GitHub Repository](https://github.com/hyelif/Smart-Communication-Framework.git)

## Architecture

The system follows a **star topology**:

1. **Sensor Nodes** (ESP32) collect environmental data (temperature, humidity, pH, TDS, turbidity, water temp, rain) and transmit via LoRa
2. **HQ Gateway** (ESP32) receives LoRa packets, decrypts with AES-128-CTR, forwards to cloud API with HMAC signing
3. **Cloud Backend** (Laravel + Turso) ingests data, serves REST APIs
4. **Web Dashboard** (Vue 3 + Inertia) provides real-time monitoring and analytics
5. **Mobile App** (Flutter) offers on-the-go monitoring and NFC-based device provisioning
6. **Telegram Bot** enables remote monitoring and relay control via chat commands

## Key Features

### Firmware
- LoRa mesh network with Adaptive Data Rate (SF7-SF10)
- Custom binary packet protocol (23-byte header + encrypted payload)
- AES-128-CTR end-to-end encryption
- Store-and-forward retry queue (up to 12 packets)
- Deep sleep power saving (configurable intervals)
- NFC provisioning for device setup

### Cloud Backend
- HMAC-authenticated telemetry ingestion endpoint
- Relay command queue for remote device control
- 10+ dashboard API endpoints with caching
- Threshold-based alerting with severity levels
- Excel export with multi-sheet reports

### Web Dashboard
- Real-time sensor cards, signal charts, trend charts
- 24 Vue components for monitoring and control
- Dark mode, responsive layout

### Mobile App
- Cross-platform (iOS via Sideload, Android via local installation)
- NFC read/write for device provisioning
- Device management, calibration, configuration

### Telegram Bot
- Full command set: status, nodes, readings, alerts, relay control
- Freshness monitoring with STALE/OFFLINE alerts
- Approval workflow for relay commands

## Status

Active development on the `dev-optimization` branch. Core LoRa communication, encryption, cloud ingestion, and dashboard are functional.
