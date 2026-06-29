var Clay = require('pebble-clay');
var clayConfig = require('./config');
var clay = new Clay(clayConfig, null, { autoHandleEvents: true });

// ---------------------------------------------------------------------------
// 2025 Formula 1 calendar.
// Each entry: track key (must match the C side), display name, and the race
// DATE (UTC, the Sunday GP). "Next race" = first event whose date is today
// or in the future; the current race weekend stays shown through race day.
// ---------------------------------------------------------------------------
var F1_CALENDAR = [
  { track: 'melbourne2',  name: 'MELBOURNE',     country: 'AUSTRALIA',      date: '2026-03-08' },
  { track: 'shanghai',    name: 'SHANGHAI',       country: 'CHINA',          date: '2026-03-15' },
  { track: 'suzuka2',     name: 'SUZUKA',         country: 'JAPAN',          date: '2026-03-29' },
  { track: 'miami',       name: 'MIAMI',          country: 'USA',            date: '2026-05-03' },
  { track: 'montreal6',   name: 'MONTREAL',       country: 'CANADA',         date: '2026-05-24' },
  { track: 'monaco6',     name: 'MONACO',         country: 'MONACO',         date: '2026-06-07' },
  { track: 'catalunya6',  name: 'BARCELONA',      country: 'SPAIN',          date: '2026-06-14' },
  { track: 'spielberg3',  name: 'SPIELBERG',      country: 'AUSTRIA',        date: '2026-06-28' },
  { track: 'silverstone8',name: 'SILVERSTONE',    country: 'UK',             date: '2026-07-05' },
  { track: 'spa4',        name: 'SPA',            country: 'BELGIUM',        date: '2026-07-19' },
  { track: 'hungaroring3',name: 'HUNGARORING',    country: 'HUNGARY',        date: '2026-07-26' },
  { track: 'zandvoort5',  name: 'ZANDVOORT',      country: 'NETHERLANDS',    date: '2026-08-23' },
  { track: 'monza7',      name: 'MONZA',          country: 'ITALY',          date: '2026-09-06' },
  { track: 'madrid',      name: 'MADRID',         country: 'SPAIN',          date: '2026-09-13' },
  { track: 'baku',        name: 'BAKU',           country: 'AZERBAIJAN',     date: '2026-09-26' },
  { track: 'marinabay4',  name: 'MARINA BAY',     country: 'SINGAPORE',      date: '2026-10-11' },
  { track: 'austin',      name: 'AUSTIN',         country: 'USA',            date: '2026-10-25' },
  { track: 'mexicocity3', name: 'MEXICO CITY',    country: 'MEXICO',         date: '2026-11-01' },
  { track: 'interlagos2', name: 'INTERLAGOS',     country: 'BRAZIL',         date: '2026-11-08' },
  { track: 'lasvegas',    name: 'LAS VEGAS',      country: 'USA',            date: '2026-11-21' },
  { track: 'lusail',      name: 'LUSAIL',         country: 'QATAR',          date: '2026-11-29' },
  { track: 'yasmarina2',  name: 'YAS MARINA',     country: 'UAE',            date: '2026-12-06' }
];

// Tracks the C side knows. If the calendar names a circuit the C side lacks
// (e.g. 'japan'), fall back to a visually similar known track so we always
// show something sensible.
var KNOWN_TRACKS = {
  adelaide:1, aida:1, aindiab:1, aintree:1, anderstorp:1, austin:1,
  avus:1, bahrain:1, bahrain2:1, bahrain3:1, baku:1, brandshatch:1,
  brandshatch2:1, bremgarten:1, buddh:1, buenosaires:1, buenosaires2:1, buenosaires3:1,
  buenosaires4:1, bugatti:1, caesarspalace:1, catalunya:1, catalunya2:1, catalunya3:1,
  catalunya4:1, catalunya5:1, catalunya6:1, clermontferrand:1, dallas:1, detroit:1,
  detroit2:1, dijon:1, dijon2:1, donington:1, eastlondon:1, estoril:1,
  estoril2:1, fuji:1, fuji2:1, hockenheim:1, hockenheim2:1, hockenheim3:1,
  hockenheim4:1, hungaroring:1, hungaroring2:1, hungaroring3:1, imola:1, imola2:1,
  imola3:1, indianapolis:1, indianapolis2:1, interlagos:1, interlagos2:1, istanbul:1,
  jacarepagua:1, jarama:1, jarama2:1, jeddah:1, jerez:1, jerez2:1,
  kyalami:1, kyalami2:1, lasvegas:1, longbeach:1, longbeach2:1, longbeach3:1,
  lusail:1, madrid:1, magnycours:1, magnycours2:1, magnycours3:1, marinabay:1,
  marinabay2:1, marinabay3:1, marinabay4:1, melbourne:1, melbourne2:1, mexicocity:1,
  mexicocity2:1, mexicocity3:1, miami:1, monaco:1, monaco2:1, monaco3:1,
  monaco4:1, monaco5:1, monaco6:1, monsanto:1, monttremblant:1, montjuic:1,
  montreal:1, montreal2:1, montreal3:1, montreal4:1, montreal5:1, montreal6:1,
  monza:1, monza2:1, monza3:1, monza4:1, monza5:1, monza6:1,
  monza7:1, mosport:1, mugello:1, nivelles:1, nurburgring:1, nurburgring2:1,
  nurburgring3:1, nurburgring4:1, paulricard:1, paulricard2:1, paulricard3:1, pedralbes:1,
  pescara:1, phoenix:1, phoenix2:1, portimao:1, porto:1, reims:1,
  reims2:1, riverside:1, rouen:1, rouen2:1, sebring:1, sepang:1,
  shanghai:1, silverstone:1, silverstone2:1, silverstone3:1, silverstone4:1, silverstone5:1,
  silverstone6:1, silverstone7:1, silverstone8:1, sochi:1, spa:1, spa2:1,
  spa3:1, spa4:1, spielberg:1, spielberg2:1, spielberg3:1, suzuka:1,
  suzuka2:1, valencia:1, watkinsGlen:1, watkinsGlen2:1, watkinsGlen3:1, yasmarina:1,
  yasmarina2:1, yeongam:1, zandvoort:1, zandvoort2:1, zandvoort3:1, zandvoort4:1,
  zandvoort5:1, zeltweg:1, zolder:1, zolder2:1
};

function resolveTrackKey(key) {
  if (KNOWN_TRACKS[key]) return key;
  return 'monaco';
}

// Returns {track, name} for the next (or current) race relative to today.
// Comparison is by month/day only so the schedule stays useful every season
// even when the stored year is in the past. The current race weekend stays
// shown through its race day.
function getNextRace() {
  var today = new Date();
  var todayMd = (today.getMonth() + 1) * 100 + today.getDate(); // MMDD as int

  for (var i = 0; i < F1_CALENDAR.length; i++) {
    var parts = F1_CALENDAR[i].date.split('-');
    var md = parseInt(parts[1], 10) * 100 + parseInt(parts[2], 10);
    if (md >= todayMd) {
      return F1_CALENDAR[i];
    }
  }
  // Past the last race of the year -> show next season's opener
  return F1_CALENDAR[0];
}

// Returns 'FP', 'Q', or 'GP' if today falls within a race weekend (Fri/Sat/Sun).
// Returns '' if today is not a race weekend day.
function getRaceIndicator(race) {
  var today = new Date();
  var parts = race.date.split('-');
  var raceDay = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  var diff = today.getTime() - raceDay.getTime();
  var dayMs = 86400000;
  // Sunday (race day) = 0, Saturday = -1, Friday = -2
  var dayOffset = Math.round(diff / dayMs);
  if (dayOffset === 0) return 'GP';
  if (dayOffset === -1) return 'Q';
  if (dayOffset === -2) return 'FP';
  return '';
}

function sendNextRace() {
  var race = getNextRace();
  var indicator = getRaceIndicator(race);
  var dict = {
    'NEXT_RACE_TRACK': resolveTrackKey(race.track),
    'NEXT_RACE_NAME': race.name,
    'NEXT_RACE_COUNTRY': race.country,
    'RACE_INDICATOR': indicator
  };
  Pebble.sendAppMessage(dict,
    function() { console.log('F1: sent next race ' + race.name + ' (' + dict.NEXT_RACE_TRACK + ')' + (indicator ? ' [' + indicator + ']' : '')); },
    function(e) { console.log('F1: send next race failed: ' + JSON.stringify(e)); });
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------
Pebble.addEventListener('ready', function() {
  console.log('F1 Track pkjs ready');
  sendNextRace();
});

// When the watch asks (or on any inbound message) refresh the next race
Pebble.addEventListener('appmessage', function(e) {
  console.log('F1: appmessage from watch');
  // Reset to defaults button
  if (e.payload && e.payload.RESET_DEFAULTS) {
    console.log('F1: Reset to defaults');
    Pebble.sendAppMessage({
      FOLLOW_CALENDAR: 1,
      FIXED_TRACK: 'silverstone8',
      SHOW_TIME: 1,
      SHOW_DATE: 1,
      DATE_FORMAT: '1',
      DATE_FONT: '2',
      SHOW_SECONDS: 1,
      SHOW_RACE_NAME: '1',
      RACE_NAME_FONT: '2',
      SHOW_RACE_INDICATOR: 1,
      SHOW_BATTERY: 0,
      SHOW_ANALOG: 1,
      TIME_MODE: '3',
      TIME_FONT: '0',
      RACE_ON_HOUR: 1,
      VIBRATE_ON_HOUR: 0,
      RANDOM_RACE_COLOURS: 0,
      INVERT: 0,
      SHOW_BATTERY_CAR: 0,
      SHOW_STEPS_CAR: 0,
      SHOW_SLEEP_CAR: 0,
      BG_COLOR: 0x00AA00,
      TRACK_COLOR: 0x000000,
      HOUR_COLOR: 0x000000,
      MINUTE_COLOR: 0x000000,
      SECOND_COLOR: 0x000000,
      TEXT_COLOR: 0xFFFFFF
    }, function() {
      console.log('F1: Defaults sent');
    }, function(err) {
      console.log('F1: Failed to send defaults: ' + err);
    });
    return;
  }
  sendNextRace();
});

// Clay handles 'showConfiguration' and 'webviewclosed' for the config UI.
// Clay forwards the chosen settings to the watch automatically; we also
// (re)send the next-race info so the calendar stays current after a save.
Pebble.addEventListener('webviewclosed', function(e) {
  if (e && !e.response) return;
  setTimeout(sendNextRace, 800);
});
