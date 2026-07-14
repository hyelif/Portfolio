---
title: WearLink
description: "Personal hobby ompanion apps that connect iPhone with Wear OS smartwatches capture health data, notifications, and more."
tags:
  - Swift
  - SwiftUI
  - Kotlin
  - Wear OS
  - iOS
  - Bluetooth
  - HealthKit
techStack:
  - Swift
  - Kotlin
  - iOS
  - Android
  - Bluetooth
  - HealthKit
  - JSON
---

## Overview

**WearLink** bridges the gap between iPhone and Wear OS, two different ecosystems that don't natively talk to each other. The project consists of two companion apps:

- **iOS app** (Swift/SwiftUI): receives health data and notifications from the watch
- **Wear OS app** (Kotlin/Jetpack Compose): captures sensor data and relays notifications

[GitHub Repository](https://github.com/hyelif/Wear-Link-Companion-Apps.git)

## Key Features

### Health Data Sync
Real-time heart rate, step count, and activity data flows from the Wear OS watch to the iPhone app via Bluetooth LE. The iOS app stores and visualizes trends using HealthKit.

### Notification Relay
Phone notifications are forwarded to the watch, so you never miss an alert: even when your phone is in your pocket.

### Cross-Platform Architecture
A custom BLE protocol handles the communication layer, with JSON payloads optimized for low-power transmission.

## What I Learned

Building WearLink taught me a lot about:

- Bluetooth LE on both iOS and Android: very different APIs for the same spec
- Wear OS UI patterns (grid navigation, curved text, ambient mode)
- HealthKit authorization flows and data types
- Battery optimization for continuous sensor reading on a watch

## Status

Active development. Core BLE communication is working; health data sync is in progress.
