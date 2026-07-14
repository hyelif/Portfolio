---
title: Getting Started with Wear OS Development
description: "What I learned building my first Wear OS app: setup, emulator quirks, and UI patterns that are different from phone apps."
date: 2026-06-15
tags:
  - Wear OS
  - Kotlin
  - Android
---

## Setting Up

Wear OS development starts the same as any Android project, but there are a few differences worth knowing upfront.

### Emulator

The Wear OS emulator is... particular. It runs at a fixed resolution and doesn't resize well. You'll want to use the **Wear OS Large Round** or **Small Round** device config.

Key tip: the emulator's bezel gestures (swipe from edge) are how you navigate: there's no back button like on phones.

### Project Structure

A Wear OS app is a module inside a standard Android project:

```
app/
├── src/main/
│   ├── java/.../
│   └── res/
wear/
├── src/main/
│   ├── java/.../
│   └── res/
```

The `wear` module targets `wearable` APIs and uses `WearableActivity` or Compose for Wear.

## UI Patterns

### Grid Navigation

Wear OS uses a scrolling grid, not a list. Cards are arranged in a 2-column layout that scrolls vertically. Each card is a `Card` composable:

```kotlin
ScalingLazyColumn {
    item {
        Card(...) { Text("Heart Rate") }
    }
}
```

### Curved Text

Text along the edge of a round screen looks great but is easy to mess up. Use `CurvedText` from the Wear Compose library.

### Ambient Mode

When the watch goes into low-power mode (screen dims, updates slow down), your app needs an ambient layout. This means:

- Grayscale colors
- No animations
- Minimal text
- Thinner strokes

## BLE on Wear OS

Bluetooth on Wear OS is similar to phone Android, but the device role is usually **peripheral** (advertising), not central. The watch advertises its presence, and the phone connects to it.

Key classes:

- `BluetoothLeAdvertiser`: start/stop advertising
- `BluetoothGattServer`: respond to phone requests
- `BluetoothGattCharacteristic`: data payloads

## Final Thoughts

Wear OS is fun but niche. The emulator is the biggest friction point: test on real hardware as early as possible. The Compose for Wear library is solid and improving fast.
