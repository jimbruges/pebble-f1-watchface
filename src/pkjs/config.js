module.exports = [
  {
    "type": "heading",
    "defaultValue": "F1 Track Watchface"
  },
  {
    "type": "text",
    "defaultValue": "Two cars race around an F1 circuit as your hour and minute hands."
  },
  {
    "type": "section",
    "items": [
      {
        "type": "heading",
        "defaultValue": "Circuit"
      },
      {
        "type": "toggle",
        "messageKey": "FOLLOW_CALENDAR",
        "label": "Follow race calendar",
        "description": "Automatically show the next scheduled Grand Prix's track. Turn off to pin a fixed circuit below.",
        "defaultValue": true
      },
      {
        "type": "select",
        "messageKey": "FIXED_TRACK",
        "label": "Fixed circuit",
        "description": "Used only when 'Follow race calendar' is off.",
        "defaultValue": "silverstone8",
        "options": [
          { "label": "ADELAIDE", "value": "adelaide" },
          { "label": "AIDA", "value": "aida" },
          { "label": "AIN DIAB", "value": "aindiab" },
          { "label": "AINTREE", "value": "aintree" },
          { "label": "ANDERSTORP", "value": "anderstorp" },
          { "label": "AUSTIN", "value": "austin" },
          { "label": "AVUS", "value": "avus" },
          { "label": "BAHRAIN", "value": "bahrain" },
          { "label": "BAHRAIN II", "value": "bahrain2" },
          { "label": "BAHRAIN III", "value": "bahrain3" },
          { "label": "BAKU", "value": "baku" },
          { "label": "BRANDS HATCH", "value": "brandshatch" },
          { "label": "BRANDS HATCH II", "value": "brandshatch2" },
          { "label": "BREMGARTEN", "value": "bremgarten" },
          { "label": "BUDDH", "value": "buddh" },
          { "label": "BUENOS AIRES", "value": "buenosaires" },
          { "label": "BUENOS AIRES II", "value": "buenosaires2" },
          { "label": "BUENOS AIRES III", "value": "buenosaires3" },
          { "label": "BUENOS AIRES IV", "value": "buenosaires4" },
          { "label": "BUGATTI", "value": "bugatti" },
          { "label": "CAESARS PALACE", "value": "caesarspalace" },
          { "label": "CATALUNYA", "value": "catalunya" },
          { "label": "CATALUNYA II", "value": "catalunya2" },
          { "label": "CATALUNYA III", "value": "catalunya3" },
          { "label": "CATALUNYA IV", "value": "catalunya4" },
          { "label": "CATALUNYA V", "value": "catalunya5" },
          { "label": "CATALUNYA VI", "value": "catalunya6" },
          { "label": "CLERMONT FERRAND", "value": "clermontferrand" },
          { "label": "DALLAS", "value": "dallas" },
          { "label": "DETROIT", "value": "detroit" },
          { "label": "DETROIT II", "value": "detroit2" },
          { "label": "DIJON", "value": "dijon" },
          { "label": "DIJON II", "value": "dijon2" },
          { "label": "DONINGTON", "value": "donington" },
          { "label": "EAST LONDON", "value": "eastlondon" },
          { "label": "ESTORIL", "value": "estoril" },
          { "label": "ESTORIL II", "value": "estoril2" },
          { "label": "FUJI", "value": "fuji" },
          { "label": "FUJI II", "value": "fuji2" },
          { "label": "HOCKENHEIM", "value": "hockenheim" },
          { "label": "HOCKENHEIM II", "value": "hockenheim2" },
          { "label": "HOCKENHEIM III", "value": "hockenheim3" },
          { "label": "HOCKENHEIM IV", "value": "hockenheim4" },
          { "label": "HUNGARORING", "value": "hungaroring" },
          { "label": "HUNGARORING II", "value": "hungaroring2" },
          { "label": "HUNGARORING III", "value": "hungaroring3" },
          { "label": "IMOLA", "value": "imola" },
          { "label": "IMOLA II", "value": "imola2" },
          { "label": "IMOLA III", "value": "imola3" },
          { "label": "INDIANAPOLIS", "value": "indianapolis" },
          { "label": "INDIANAPOLIS II", "value": "indianapolis2" },
          { "label": "INTERLAGOS", "value": "interlagos" },
          { "label": "INTERLAGOS II", "value": "interlagos2" },
          { "label": "ISTANBUL", "value": "istanbul" },
          { "label": "JACAREPAGUA", "value": "jacarepagua" },
          { "label": "JARAMA", "value": "jarama" },
          { "label": "JARAMA II", "value": "jarama2" },
          { "label": "JEDDAH", "value": "jeddah" },
          { "label": "JEREZ", "value": "jerez" },
          { "label": "JEREZ II", "value": "jerez2" },
          { "label": "KYALAMI", "value": "kyalami" },
          { "label": "KYALAMI II", "value": "kyalami2" },
          { "label": "LAS VEGAS", "value": "lasvegas" },
          { "label": "LONG BEACH", "value": "longbeach" },
          { "label": "LONG BEACH II", "value": "longbeach2" },
          { "label": "LONG BEACH III", "value": "longbeach3" },
          { "label": "LUSAIL", "value": "lusail" },
          { "label": "MADRID", "value": "madrid" },
          { "label": "MAGNY COURS", "value": "magnycours" },
          { "label": "MAGNY COURS II", "value": "magnycours2" },
          { "label": "MAGNY COURS III", "value": "magnycours3" },
          { "label": "MARINA BAY", "value": "marinabay" },
          { "label": "MARINA BAY II", "value": "marinabay2" },
          { "label": "MARINA BAY III", "value": "marinabay3" },
          { "label": "MARINA BAY IV", "value": "marinabay4" },
          { "label": "MELBOURNE", "value": "melbourne" },
          { "label": "MELBOURNE II", "value": "melbourne2" },
          { "label": "MEXICO CITY", "value": "mexicocity" },
          { "label": "MEXICO CITY II", "value": "mexicocity2" },
          { "label": "MEXICO CITY III", "value": "mexicocity3" },
          { "label": "MIAMI", "value": "miami" },
          { "label": "MONACO", "value": "monaco" },
          { "label": "MONACO II", "value": "monaco2" },
          { "label": "MONACO III", "value": "monaco3" },
          { "label": "MONACO IV", "value": "monaco4" },
          { "label": "MONACO V", "value": "monaco5" },
          { "label": "MONACO VI", "value": "monaco6" },
          { "label": "MONSANTO", "value": "monsanto" },
          { "label": "MONT TREMBLANT", "value": "monttremblant" },
          { "label": "MONTJUIC", "value": "montjuic" },
          { "label": "MONTREAL", "value": "montreal" },
          { "label": "MONTREAL II", "value": "montreal2" },
          { "label": "MONTREAL III", "value": "montreal3" },
          { "label": "MONTREAL IV", "value": "montreal4" },
          { "label": "MONTREAL V", "value": "montreal5" },
          { "label": "MONTREAL VI", "value": "montreal6" },
          { "label": "MONZA", "value": "monza" },
          { "label": "MONZA II", "value": "monza2" },
          { "label": "MONZA III", "value": "monza3" },
          { "label": "MONZA IV", "value": "monza4" },
          { "label": "MONZA V", "value": "monza5" },
          { "label": "MONZA VI", "value": "monza6" },
          { "label": "MONZA VII", "value": "monza7" },
          { "label": "MOSPORT", "value": "mosport" },
          { "label": "MUGELLO", "value": "mugello" },
          { "label": "NIVELLES", "value": "nivelles" },
          { "label": "NURBURGRING", "value": "nurburgring" },
          { "label": "NURBURGRING II", "value": "nurburgring2" },
          { "label": "NURBURGRING III", "value": "nurburgring3" },
          { "label": "NURBURGRING IV", "value": "nurburgring4" },
          { "label": "PAUL RICARD", "value": "paulricard" },
          { "label": "PAUL RICARD II", "value": "paulricard2" },
          { "label": "PAUL RICARD III", "value": "paulricard3" },
          { "label": "PEDRALBES", "value": "pedralbes" },
          { "label": "PESCARA", "value": "pescara" },
          { "label": "PHOENIX", "value": "phoenix" },
          { "label": "PHOENIX II", "value": "phoenix2" },
          { "label": "PORTIMAO", "value": "portimao" },
          { "label": "PORTO", "value": "porto" },
          { "label": "REIMS", "value": "reims" },
          { "label": "REIMS II", "value": "reims2" },
          { "label": "RIVERSIDE", "value": "riverside" },
          { "label": "ROUEN", "value": "rouen" },
          { "label": "ROUEN II", "value": "rouen2" },
          { "label": "SEBRING", "value": "sebring" },
          { "label": "SEPANG", "value": "sepang" },
          { "label": "SHANGHAI", "value": "shanghai" },
          { "label": "SILVERSTONE", "value": "silverstone" },
          { "label": "SILVERSTONE II", "value": "silverstone2" },
          { "label": "SILVERSTONE III", "value": "silverstone3" },
          { "label": "SILVERSTONE IV", "value": "silverstone4" },
          { "label": "SILVERSTONE V", "value": "silverstone5" },
          { "label": "SILVERSTONE VI", "value": "silverstone6" },
          { "label": "SILVERSTONE VII", "value": "silverstone7" },
          { "label": "SILVERSTONE VIII", "value": "silverstone8" },
          { "label": "SOCHI", "value": "sochi" },
          { "label": "SPA", "value": "spa" },
          { "label": "SPA II", "value": "spa2" },
          { "label": "SPA III", "value": "spa3" },
          { "label": "SPA IV", "value": "spa4" },
          { "label": "SPIELBERG", "value": "spielberg" },
          { "label": "SPIELBERG II", "value": "spielberg2" },
          { "label": "SPIELBERG III", "value": "spielberg3" },
          { "label": "SUZUKA", "value": "suzuka" },
          { "label": "SUZUKA II", "value": "suzuka2" },
          { "label": "VALENCIA", "value": "valencia" },
          { "label": "WATKINS GLEN", "value": "watkinsGlen" },
          { "label": "WATKINS GLEN II", "value": "watkinsGlen2" },
          { "label": "WATKINS GLEN III", "value": "watkinsGlen3" },
          { "label": "YAS MARINA", "value": "yasmarina" },
          { "label": "YAS MARINA II", "value": "yasmarina2" },
          { "label": "YEONGAM", "value": "yeongam" },
          { "label": "ZANDVOORT", "value": "zandvoort" },
          { "label": "ZANDVOORT II", "value": "zandvoort2" },
          { "label": "ZANDVOORT III", "value": "zandvoort3" },
          { "label": "ZANDVOORT IV", "value": "zandvoort4" },
          { "label": "ZANDVOORT V", "value": "zandvoort5" },
          { "label": "ZELTWEG", "value": "zeltweg" },
          { "label": "ZOLDER", "value": "zolder" },
          { "label": "ZOLDER II", "value": "zolder2" }
        ]
      }
    ]
  },
  {
    "type": "section",
    "items": [
      {
        "type": "heading",
        "defaultValue": "Display"
      },
      {
        "type": "toggle",
        "messageKey": "SHOW_TIME",
        "label": "Show time",
        "defaultValue": true
      },
      {
        "type": "toggle",
        "messageKey": "SHOW_DATE",
        "label": "Show date",
        "defaultValue": true
      },
      {
        "type": "select",
        "messageKey": "DATE_FORMAT",
        "label": "Date format",
        "defaultValue": "1",
        "options": [
          { "label": "DD/MM", "value": "0" },
          { "label": "DD MMM", "value": "1" },
          { "label": "MM/DD", "value": "2" },
          { "label": "MMM DD", "value": "3" },
          { "label": "Day DD", "value": "4" }
        ]
      },
      {
        "type": "select",
        "messageKey": "DATE_FONT",
        "label": "Date font",
        "defaultValue": "2",
        "options": [
          { "label": "Gothic 18", "value": "0" },
          { "label": "Gothic 24 Bold", "value": "1" },
          { "label": "Gothic 28 Bold", "value": "2" },
          { "label": "Roboto Condensed 21", "value": "3" }
        ]
      },
      {
        "type": "toggle",
        "messageKey": "SHOW_SECONDS",
        "label": "Add a seconds car",
        "description": "Adds a third car that laps once per minute as a seconds hand. Uses more battery.",
        "defaultValue": true
      },
      {
        "type": "select",
        "messageKey": "SHOW_RACE_NAME",
        "label": "Track name display",
        "defaultValue": "1",
        "options": [
          { "label": "Off", "value": "0" },
          { "label": "Track name", "value": "1" },
          { "label": "Country name", "value": "2" }
        ]
      },
      {
        "type": "select",
        "messageKey": "RACE_NAME_FONT",
        "label": "Track name font",
        "defaultValue": "2",
        "options": [
          { "label": "Gothic 18 Bold", "value": "0" },
          { "label": "Gothic 24 Bold", "value": "1" },
          { "label": "Gothic 28 Bold", "value": "2" },
          { "label": "Roboto Condensed 21", "value": "3" }
        ]
      },
      {
        "type": "toggle",
        "messageKey": "SHOW_RACE_INDICATOR",
        "label": "Show FP/Q/GP indicator",
        "defaultValue": true
      },
      {
        "type": "toggle",
        "messageKey": "SHOW_BATTERY",
        "label": "Show battery indicator",
        "defaultValue": false
      },
      {
        "type": "toggle",
        "messageKey": "SHOW_ANALOG",
        "label": "Show analog hands",
        "description": "Draws clock hands from the centre to each car on the track.",
        "defaultValue": true
      },
      {
        "type": "select",
        "messageKey": "TIME_MODE",
        "label": "Digital Style",
        "defaultValue": "3",
        "options": [
          { "label": "Digital (bottom)", "value": "0" },
          { "label": "Split corners (H left, M right)", "value": "3" }
        ]
      },
      {
        "type": "select",
        "messageKey": "TIME_FONT",
        "label": "Time font",
        "defaultValue": "0",
        "options": [
          { "label": "Bold 30", "value": "0" },
          { "label": "Bold 42", "value": "1" },
          { "label": "Gothic 28 Bold", "value": "2" },
          { "label": "Leco 26 Bold", "value": "3" },
          { "label": "Leco 36", "value": "4" },
          { "label": "Roboto Condensed 21", "value": "5" }
        ]
      },
      {
        "type": "toggle",
        "messageKey": "RACE_ON_HOUR",
        "label": "Race on the hour",
        "description": "All cars race around the track for 1–12 laps (matching the hour) when the hour changes.",
        "defaultValue": false
      },
      {
        "type": "toggle",
        "messageKey": "VIBRATE_ON_HOUR",
        "label": "Vibrate on the hour",
        "description": "Short pulse when the hour changes.",
        "defaultValue": false
      },
      {
        "type": "toggle",
        "messageKey": "RACE_NOW",
        "label": "Race now!",
        "description": "Trigger a race animation on the watch matching the current hour.",
        "defaultValue": false
      }
    ]
  },
  {
    "type": "section",
    "items": [
      {
        "type": "heading",
        "defaultValue": "Extra Cars"
      },
      {
        "type": "toggle",
        "messageKey": "SHOW_BATTERY_CAR",
        "label": "Battery car",
        "description": "Shows battery percentage: 100% at start line, 0% at finish.",
        "defaultValue": false
      },
      {
        "type": "color",
        "messageKey": "BATTERY_CAR_COLOR",
        "label": "Battery car colour",
        "defaultValue": "0000FF"
      },
      {
        "type": "toggle",
        "messageKey": "SHOW_STEPS_CAR",
        "label": "Steps car",
        "description": "Shows daily step progress toward goal. Flames when goal is beaten!",
        "defaultValue": false
      },
      {
        "type": "color",
        "messageKey": "STEPS_CAR_COLOR",
        "label": "Steps car colour",
        "defaultValue": "00FFAA"
      },
      {
        "type": "toggle",
        "messageKey": "SHOW_SLEEP_CAR",
        "label": "Sleep car",
        "description": "Shows last night's sleep toward 8-hour goal.",
        "defaultValue": false
      },
      {
        "type": "color",
        "messageKey": "SLEEP_CAR_COLOR",
        "label": "Sleep car colour",
        "defaultValue": "AA00FF"
      }
    ]
  },
  {
    "type": "section",
    "items": [
      {
        "type": "heading",
        "defaultValue": "Colours"
      },
      {
        "type": "color",
        "messageKey": "BG_COLOR",
        "label": "Background",
        "defaultValue": "00AA00"
      },
      {
        "type": "color",
        "messageKey": "TRACK_COLOR",
        "label": "Track surface",
        "defaultValue": "000000"
      },
      {
        "type": "color",
        "messageKey": "HOUR_COLOR",
        "label": "Hour car",
        "defaultValue": "FFFF00"
      },
      {
        "type": "color",
        "messageKey": "MINUTE_COLOR",
        "label": "Minute car",
        "defaultValue": "FF0000"
      },
      {
        "type": "color",
        "messageKey": "SECOND_COLOR",
        "label": "Second car",
        "defaultValue": "00FFFF"
      },
      {
        "type": "color",
        "messageKey": "TEXT_COLOR",
        "label": "Text (time, date, name)",
        "defaultValue": "FFFFFF"
      },
      {
        "type": "toggle",
        "messageKey": "RANDOM_RACE_COLOURS",
        "label": "Random race colours",
        "description": "Randomise the background and contrasting text colour for each race animation.",
        "defaultValue": false
      },
      {
        "type": "toggle",
        "messageKey": "INVERT",
        "label": "Invert screen",
        "description": "Swap the background and text colours for a light-on-dark or dark-on-light look.",
        "defaultValue": false
      }
    ]
  },
  {
    "type": "button",
    "messageKey": "RESET_DEFAULTS",
    "label": "Reset to Defaults"
  },
  {
    "type": "submit",
    "defaultValue": "Save Settings"
  }
];

