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
          { "label": "ADELAIDE (1985-1995)", "value": "adelaide" },
          { "label": "AIDA (1994-1995)", "value": "aida" },
          { "label": "AIN DIAB (1958)", "value": "aindiab" },
          { "label": "AINTREE (1955-1962)", "value": "aintree" },
          { "label": "ANDERSTORP (1973-1978)", "value": "anderstorp" },
          { "label": "AUSTIN (2012-2026)", "value": "austin" },
          { "label": "AVUS (1959)", "value": "avus" },
          { "label": "BAHRAIN (2004-2026)", "value": "bahrain" },
          { "label": "BAHRAIN II (2010)", "value": "bahrain2" },
          { "label": "BAHRAIN III (2020)", "value": "bahrain3" },
          { "label": "BAKU (2016-2026)", "value": "baku" },
          { "label": "BRANDS HATCH (1964-1974)", "value": "brandshatch" },
          { "label": "BRANDS HATCH II (1976-1986)", "value": "brandshatch2" },
          { "label": "BREMGARTEN (1950-1954)", "value": "bremgarten" },
          { "label": "BUDDH (2011-2013)", "value": "buddh" },
          { "label": "BUENOS AIRES (1953-1960)", "value": "buenosaires" },
          { "label": "BUENOS AIRES II (1972-1973)", "value": "buenosaires2" },
          { "label": "BUENOS AIRES III (1974-1981)", "value": "buenosaires3" },
          { "label": "BUENOS AIRES IV (1995-1998)", "value": "buenosaires4" },
          { "label": "BUGATTI (1967)", "value": "bugatti" },
          { "label": "CAESARS PALACE (1981-1982)", "value": "caesarspalace" },
          { "label": "CATALUNYA (1991-1994)", "value": "catalunya" },
          { "label": "CATALUNYA II (1995-2003)", "value": "catalunya2" },
          { "label": "CATALUNYA III (2004-2006)", "value": "catalunya3" },
          { "label": "CATALUNYA IV (2007-2020)", "value": "catalunya4" },
          { "label": "CATALUNYA V (2021-2022)", "value": "catalunya5" },
          { "label": "CATALUNYA VI (2023-2026)", "value": "catalunya6" },
          { "label": "CLERMONT FERRAND (1965-1972)", "value": "clermontferrand" },
          { "label": "DALLAS (1984)", "value": "dallas" },
          { "label": "DETROIT (1982)", "value": "detroit" },
          { "label": "DETROIT II (1983-1988)", "value": "detroit2" },
          { "label": "DIJON (1974)", "value": "dijon" },
          { "label": "DIJON II (1977-1984)", "value": "dijon2" },
          { "label": "DONINGTON (1993)", "value": "donington" },
          { "label": "EAST LONDON (1962-1965)", "value": "eastlondon" },
          { "label": "ESTORIL (1984-1993)", "value": "estoril" },
          { "label": "ESTORIL II (1994-1996)", "value": "estoril2" },
          { "label": "FUJI (1976-1977)", "value": "fuji" },
          { "label": "FUJI II (2007-2008)", "value": "fuji2" },
          { "label": "HOCKENHEIM (1970-1981)", "value": "hockenheim" },
          { "label": "HOCKENHEIM II (1982-1991)", "value": "hockenheim2" },
          { "label": "HOCKENHEIM III (1992-2001)", "value": "hockenheim3" },
          { "label": "HOCKENHEIM IV (2002-2019)", "value": "hockenheim4" },
          { "label": "HUNGARORING (1986-1988)", "value": "hungaroring" },
          { "label": "HUNGARORING II (1989-2002)", "value": "hungaroring2" },
          { "label": "HUNGARORING III (2003-2026)", "value": "hungaroring3" },
          { "label": "IMOLA (1980-1994)", "value": "imola" },
          { "label": "IMOLA II (1995-2006)", "value": "imola2" },
          { "label": "IMOLA III (2020-2025)", "value": "imola3" },
          { "label": "INDIANAPOLIS (1950-1960)", "value": "indianapolis" },
          { "label": "INDIANAPOLIS II (2000-2007)", "value": "indianapolis2" },
          { "label": "INTERLAGOS (1973-1980)", "value": "interlagos" },
          { "label": "INTERLAGOS II (1990-2026)", "value": "interlagos2" },
          { "label": "ISTANBUL (2005-2021)", "value": "istanbul" },
          { "label": "JACAREPAGUA (1978-1989)", "value": "jacarepagua" },
          { "label": "JARAMA (1968-1979)", "value": "jarama" },
          { "label": "JARAMA II (1981)", "value": "jarama2" },
          { "label": "JEDDAH (2021-2026)", "value": "jeddah" },
          { "label": "JEREZ (1986-1990)", "value": "jerez" },
          { "label": "JEREZ II (1994-1997)", "value": "jerez2" },
          { "label": "KYALAMI (1967-1985)", "value": "kyalami" },
          { "label": "KYALAMI II (1992-1993)", "value": "kyalami2" },
          { "label": "LAS VEGAS (2023-2026)", "value": "lasvegas" },
          { "label": "LONG BEACH (1976-1981)", "value": "longbeach" },
          { "label": "LONG BEACH II (1982)", "value": "longbeach2" },
          { "label": "LONG BEACH III (1983)", "value": "longbeach3" },
          { "label": "LUSAIL (2021-2026)", "value": "lusail" },
          { "label": "MADRID (2026)", "value": "madrid" },
          { "label": "MAGNY COURS (1991)", "value": "magnycours" },
          { "label": "MAGNY COURS II (1992-2002)", "value": "magnycours2" },
          { "label": "MAGNY COURS III (2003-2008)", "value": "magnycours3" },
          { "label": "MARINA BAY (2008-2012)", "value": "marinabay" },
          { "label": "MARINA BAY II (2013-2014)", "value": "marinabay2" },
          { "label": "MARINA BAY III (2015-2022)", "value": "marinabay3" },
          { "label": "MARINA BAY IV (2023-2026)", "value": "marinabay4" },
          { "label": "MELBOURNE (1996-2019)", "value": "melbourne" },
          { "label": "MELBOURNE II (2022-2026)", "value": "melbourne2" },
          { "label": "MEXICO CITY (1963-1970)", "value": "mexicocity" },
          { "label": "MEXICO CITY II (1986-1992)", "value": "mexicocity2" },
          { "label": "MEXICO CITY III (2015-2026)", "value": "mexicocity3" },
          { "label": "MIAMI (2022-2026)", "value": "miami" },
          { "label": "MONACO (1950)", "value": "monaco" },
          { "label": "MONACO II (1955-1972)", "value": "monaco2" },
          { "label": "MONACO III (1973-1975)", "value": "monaco3" },
          { "label": "MONACO IV (1976-1985)", "value": "monaco4" },
          { "label": "MONACO V (1986-2002)", "value": "monaco5" },
          { "label": "MONACO VI (2003-2026)", "value": "monaco6" },
          { "label": "MONSANTO (1959)", "value": "monsanto" },
          { "label": "MONT TREMBLANT (1968-1970)", "value": "monttremblant" },
          { "label": "MONTJUIC (1969-1975)", "value": "montjuic" },
          { "label": "MONTREAL (1978)", "value": "montreal" },
          { "label": "MONTREAL II (1979-1986)", "value": "montreal2" },
          { "label": "MONTREAL III (1988-1993)", "value": "montreal3" },
          { "label": "MONTREAL IV (1994-1995)", "value": "montreal4" },
          { "label": "MONTREAL V (1996-2001)", "value": "montreal5" },
          { "label": "MONTREAL VI (2002-2026)", "value": "montreal6" },
          { "label": "MONZA (1950-1954)", "value": "monza" },
          { "label": "MONZA II (1955-1961)", "value": "monza2" },
          { "label": "MONZA III (1957-1971)", "value": "monza3" },
          { "label": "MONZA IV (1972-1973)", "value": "monza4" },
          { "label": "MONZA V (1974-1975)", "value": "monza5" },
          { "label": "MONZA VI (1976-1999)", "value": "monza6" },
          { "label": "MONZA VII (2000-2026)", "value": "monza7" },
          { "label": "MOSPORT (1967-1977)", "value": "mosport" },
          { "label": "MUGELLO (2020)", "value": "mugello" },
          { "label": "NIVELLES (1972-1974)", "value": "nivelles" },
          { "label": "NURBURGRING (1951-1976)", "value": "nurburgring" },
          { "label": "NURBURGRING II (1984-1985)", "value": "nurburgring2" },
          { "label": "NURBURGRING III (1995-2001)", "value": "nurburgring3" },
          { "label": "NURBURGRING IV (2002-2020)", "value": "nurburgring4" },
          { "label": "PAUL RICARD (1971-1985)", "value": "paulricard" },
          { "label": "PAUL RICARD II (1986-1990)", "value": "paulricard2" },
          { "label": "PAUL RICARD III (2018-2022)", "value": "paulricard3" },
          { "label": "PEDRALBES (1951-1954)", "value": "pedralbes" },
          { "label": "PESCARA (1957)", "value": "pescara" },
          { "label": "PHOENIX (1989-1990)", "value": "phoenix" },
          { "label": "PHOENIX II (1991)", "value": "phoenix2" },
          { "label": "PORTIMAO (2020-2021)", "value": "portimao" },
          { "label": "PORTO (1958-1960)", "value": "porto" },
          { "label": "REIMS (1950-1951)", "value": "reims" },
          { "label": "REIMS II (1953-1966)", "value": "reims2" },
          { "label": "RIVERSIDE (1960)", "value": "riverside" },
          { "label": "ROUEN (1952)", "value": "rouen" },
          { "label": "ROUEN II (1957-1968)", "value": "rouen2" },
          { "label": "SEBRING (1959)", "value": "sebring" },
          { "label": "SEPANG (1999-2017)", "value": "sepang" },
          { "label": "SHANGHAI (2004-2026)", "value": "shanghai" },
          { "label": "SILVERSTONE (1950-1973)", "value": "silverstone" },
          { "label": "SILVERSTONE II (1975-1985)", "value": "silverstone2" },
          { "label": "SILVERSTONE III (1987-1990)", "value": "silverstone3" },
          { "label": "SILVERSTONE IV (1991-1993)", "value": "silverstone4" },
          { "label": "SILVERSTONE V (1994-1995)", "value": "silverstone5" },
          { "label": "SILVERSTONE VI (1996)", "value": "silverstone6" },
          { "label": "SILVERSTONE VII (1997-2009)", "value": "silverstone7" },
          { "label": "SILVERSTONE VIII (2010-2026)", "value": "silverstone8" },
          { "label": "SOCHI (2014-2021)", "value": "sochi" },
          { "label": "SPA (1950-1970)", "value": "spa" },
          { "label": "SPA II (1983-2002)", "value": "spa2" },
          { "label": "SPA III (2004-2005)", "value": "spa3" },
          { "label": "SPA IV (2007-2026)", "value": "spa4" },
          { "label": "SPIELBERG (1970-1976)", "value": "spielberg" },
          { "label": "SPIELBERG II (1977-1987)", "value": "spielberg2" },
          { "label": "SPIELBERG III (1997-2026)", "value": "spielberg3" },
          { "label": "SUZUKA (1987-2002)", "value": "suzuka" },
          { "label": "SUZUKA II (2003-2026)", "value": "suzuka2" },
          { "label": "VALENCIA (2008-2012)", "value": "valencia" },
          { "label": "WATKINS GLEN (1961-1970)", "value": "watkinsGlen" },
          { "label": "WATKINS GLEN II (1971-1974)", "value": "watkinsGlen2" },
          { "label": "WATKINS GLEN III (1975-1980)", "value": "watkinsGlen3" },
          { "label": "YAS MARINA (2009-2020)", "value": "yasmarina" },
          { "label": "YAS MARINA II (2021-2026)", "value": "yasmarina2" },
          { "label": "YEONGAM (2010-2013)", "value": "yeongam" },
          { "label": "ZANDVOORT (1952-1971)", "value": "zandvoort" },
          { "label": "ZANDVOORT II (1973-1978)", "value": "zandvoort2" },
          { "label": "ZANDVOORT III (1979)", "value": "zandvoort3" },
          { "label": "ZANDVOORT IV (1980-1985)", "value": "zandvoort4" },
          { "label": "ZANDVOORT V (2021-2026)", "value": "zandvoort5" },
          { "label": "ZELTWEG (1964)", "value": "zeltweg" },
          { "label": "ZOLDER (1973)", "value": "zolder" },
          { "label": "ZOLDER II (1975-1984)", "value": "zolder2" }
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
