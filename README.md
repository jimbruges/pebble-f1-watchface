# F1 Track Watchface

A Pebble smartwatch watchface featuring 160 real Formula 1 circuit tracks rendered from SVG source data. Cars race around the track following the time, with optional race animations, extra health-data cars, and a full F1 race calendar.

**Platform:** Pebble Emery (228×228)  
**SDK:** Pebble C SDK 4.17

![Screenshot](screenshots/watchface.png)

## Features

### Circuit Tracks
- 160 real F1 circuit tracks sourced from SVG data
- Tracks are centred and scaled to fit the display using arc-length parameterisation
- Each track has 45 evenly-spaced waypoints sampled from cubic bezier paths
- Tracks auto-detect winding direction and normalise to clockwise

### Time Display
- **Digital modes:** Standard (bottom) and Split Corners (HH | DD MMM | MM)
- **Analog hands:** Optional hour and minute hands drawn to the track
- **Fonts:** Bold 30, Bold 42, Gothic 28 Bold, Leco 36 Bold, Leco 42, Roboto Condensed 21
- **Seconds car:** Sweeps around the track via arc-length progress

### Cars
- **Hour car** (yellow) — positioned by clock angle
- **Minute car** (red) — positioned by minute angle, hand stops at 95% so car is visible
- **Second car** (pink) — arc-length progress from start/finish line
- **Battery car** (purple) — charge level mapped to track position
- **Steps car** (green) — daily step progress
- **Sleep car** (blue) — sleep duration progress
- Extra cars shift sideways when overlapping (overtaking effect)

### Race Animation
- Triggers on the hour change (configurable)
- Hour car laps the track from its current position
- 45 fps smooth animation with 3s per lap
- Random race colours with auto-contrasting text (optional)

### Configuration (via Clay)
- **Track selection:** Follow F1 calendar or choose any of 160 circuits
- **Display:** Time, date, seconds, battery, analog hands
- **Extra cars:** Toggle battery/steps/sleep cars with individual colours
- **Colours:** Background, track, hour, minute, second, text — all configurable
- **Date formats:** DD/MM, DD MMM, MM/DD, MMM DD, Day DD
- **Race name:** Show track name or country name above the circuit
- **Race indicator:** FP (Friday), Q (Saturday), GP (Sunday) during race weekends
- **Invert:** Swap background and text colours
- **Random race colours:** Auto-assign vibrant F1 palette during race animation
- **Reset to defaults:** One-tap reset in config page

### 2026 F1 Calendar
Auto-switches between tracks based on the race schedule:

| Round | Track | Date |
|-------|-------|------|
| 1 | Melbourne | Mar 8 |
| 2 | Shanghai | Mar 15 |
| 3 | Suzuka | Mar 29 |
| 4 | Miami | May 3 |
| 5 | Montreal | May 24 |
| 6 | Monaco | Jun 7 |
| 7 | Barcelona | Jun 14 |
| 8 | Spielberg | Jun 28 |
| 9 | Silverstone | Jul 5 |
| 10 | Spa | Jul 19 |
| 11 | Hungaroring | Jul 26 |
| 12 | Zandvoort | Aug 23 |
| 13 | Monza | Sep 6 |
| 14 | Madrid | Sep 13 |
| 15 | Baku | Sep 26 |
| 16 | Marina Bay | Oct 11 |
| 17 | Austin | Oct 25 |
| 18 | Mexico City | Nov 1 |
| 19 | Interlagos | Nov 8 |
| 20 | Las Vegas | Nov 21 |
| 21 | Lusail | Nov 29 |
| 22 | Yas Marina | Dec 6 |

## Building

### Prerequisites
- [Pebble SDK](https://developer.rebble.io/developer.pebble.com/sdk/index.html) 4.17+
- Node.js (for Clay config)

### Build
```bash
cd f1-track-watchface
pebble build
```

### Install to emulator
```bash
pebble install --emulator emery
```

### Install to watch
Connect your Pebble via Bluetooth, then:
```bash
pebble install
```

### CloudPebble
The project is also compatible with CloudPebble for in-browser development.

## Project Structure

```
f1-track-watchface/
├── src/
│   ├── c/
│   │   └── main.c              # Core watchface (4400+ lines)
│   └── pkjs/
│       ├── config.js            # Clay configuration page
│       └── index.js             # Phone-side JS (calendar, messaging)
├── build/                       # Build output (gitignored)
├── screenshots/                 # Store screenshots and GIFs
├── icon_80x80.png               # App icon
├── icon_144x144.png             # App icon (large)
├── package.json                 # Pebble project config + Clay message keys
├── wscript                      # Waf build script
└── README.md
```

## Technical Notes

- **Track geometry:** 45 waypoints per track, sampled at even arc-length intervals from SVG cubic bezier curves using a custom converter (`convert_all.py` in the parent repo)
- **Coordinate system:** Internal 100×100 space scaled to 168×168 track area on the 228×228 Emery display
- **Angle-to-track mapping:** Perpendicular-distance crossing detection with dot product direction filtering — handles non-convex tracks correctly
- **Race animation:** `app_timer` at 45 fps using `time_ms()` for sub-second precision
- **Health data:** Uses `health_service_sum()` with explicit time range from midnight
- **Settings persistence:** All settings stored via `persist_read_int`/`persist_write_int` with AppMessage updates from Clay config

## Screenshots

All 22 calendar tracks with unique background colours:

| Melbourne | Shanghai | Suzuka | Miami |
|-----------|----------|--------|-------|
| ![](screenshots/tracks/melbourne2.png) | ![](screenshots/tracks/shanghai.png) | ![](screenshots/tracks/suzuka2.png) | ![](screenshots/tracks/miami.png) |

| Monaco | Barcelona | Silverstone | Spa |
|--------|-----------|-------------|-----|
| ![](screenshots/tracks/monaco6.png) | ![](screenshots/tracks/catalunya6.png) | ![](screenshots/tracks/silverstone8.png) | ![](screenshots/tracks/spa4.png) |

| Monza | Madrid | Baku | Marina Bay |
|-------|--------|------|------------|
| ![](screenshots/tracks/monza7.png) | ![](screenshots/tracks/madrid.png) | ![](screenshots/tracks/baku.png) | ![](screenshots/tracks/marinabay4.png) |

| Austin | Mexico City | Interlagos | Las Vegas |
|--------|-------------|------------|-----------|
| ![](screenshots/tracks/austin.png) | ![](screenshots/tracks/mexicocity3.png) | ![](screenshots/tracks/interlagos2.png) | ![](screenshots/tracks/lasvegas.png) |

## License

MIT
