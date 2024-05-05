import {
  ArrowLeftRight,
  Atom,
  Factory,
  Heater,
  Sun,
  Thermometer,
  UtilityPole,
  Waves,
  Wind,
} from "lucide-react";

export type Datasets = keyof typeof datasets;

export const datasets = {
  windProduction: {
    id: 181,
    name: "Tuulivoiman tuotanto",
    description:
      "Tuulivoiman hetkellinen tuotantoteho Fingridin käytönvalvontajärjestelmän mittaustiedoista. Noin kaksi prosenttia tuotantokapasiteetista on arvioitua, sillä mittaustietoa ei ole saatavilla. Tieto päivitetään 3 minuutin välein.",
    revalidate: 60 * 3,
    icon: Wind,
  },
  windCapacity: {
    id: 268,
    name: "Tuulivoiman kapasiteetti",
    description:
      "Tämä on Fingridin tuulivoimaennusteissa käytetty Suomen voimajärjestelmään liitetyn tuulivoiman kokonaiskapasiteetti. Tieto perustuu Fingridille toimitettuihin tuulipuistojen nimellistehoihin.Tämän kokonaiskapasiteettitiedon avulla voi esimerkiksi laskea tuntikohtaisen tuulivoiman tuotantoasteen vertaamalla siihen toteutunutta tuulivoimatuotantoa toisesta Fingridin julkaisemasta aikasarjasta. Tätä kokonaiskapasiteettia ei kuitenkaan tule pitää virallisena Suomen tuulivoimakapasiteetin määränä, sillä sen päivitys tehdään manuaalisesti.",
    revalidate: 60 * 60 * 24,
    icon: Wind,
  },
  solarProduction: {
    id: 248,
    name: "Aurinkosähkön tuotanto",
    description:
      "15 minuutin välein päivittyvä aurinkovoiman tuotantoennuste seuraavalle 36 tunnille. Aurinkovoimaennusteet perustuvat sääennusteisiin ja arvioihin Suomeen asennettujen aurinkopaneelien kokonaistuotantotehosta sekä niiden sijainneista. Fingrid on arvioinut aurinkopaneeleiden kokonaistuotantotehon Energiaviraston jakeluverkkoyhtiöiltä saadun vuosittaisen kapasiteettitiedon ja aurinkopaneeleiden asennusten kasvuennusteiden mukaan. Paneelien maantieteellinen sijainti on arvioitu hyvin karkeasti kapasiteetin ilmoittaneen verkkoyhtiöiden perusteella.",
    revalidate: 60 * 15,
    icon: Sun,
  },
  solarCapacity: {
    id: 267,
    name: "Aurinkosähkön kapasiteetti",
    description:
      "Tämä on Fingridin aurinkovoimaennusteissa käytetty Suomen voimajärjestelmään liitetyn aurinkovoiman kokonaiskapasiteetti. Tieto perustuu Energiaviraston keräämään jakeluverkkojen pientuotantotilastoon. Lisäksi sitä päivitetään Fingridille toimitettuihin tietoihin perustuvien arvioiden avulla.Tämän kokonaiskapasiteettitiedon avulla voi esimerkiksi laskea tuntikohtaisen aurinkovoiman tuotantoasteen vertaamalla siihen ennustettua aurinkovoimatuotantoa toisesta Fingridin julkaisemasta aikasarjasta. Tätä kokonaiskapasiteettia ei kuitenkaan tule pitää virallisena Suomen aurinkovoimakapasiteetin määränä, sillä sen päivitys tehdään manuaalisesti sekä arvioita hyödyntäen.",
    revalidate: 60 * 60,
    icon: Sun,
  },
  totalProduction: {
    id: 192,
    name: "Kokonaistuotanto",
    description:
      "Sähkön kokonaistuotanto Suomessa. Tieto perustuu Fingridin käytönvalvontajärjestelmän reaaliaikaisiin mittauksiin. Tieto päivittyy 3 minuutin välein.",
    revalidate: 60 * 3,
    icon: Factory,
  },
  totalConsumption: {
    id: 193,
    name: "Kokonaiskulutus",
    description:
      "Suomen sähkön kokonaiskulutus on laskettu tuotannon ja tuonnin/viennin perusteella. Tieto päivittyy 3 minuutin välein. Tuotantotiedot ja tuonti-/vientitiedot perustuvat Fingridin käytönvalvontajärjestelmän reaaliaikaisiin mittauksiin.",
    revalidate: 60 * 3,
    icon: Heater,
  },
  importExport: {
    id: 194,
    name: "Tuonti ja vienti",
    description:
      "Sähkön nettotuonti Suomeen ja nettovienti Suomesta. Tieto päivittyy 3 minuutin välein. Tuotantotiedot ja tuonti/vienti perustuvat Fingridin käytönvalvontajärjestelmän reaaliaikaisiin mittauksiin.",
    revalidate: 60 * 3,
    icon: ArrowLeftRight,
  },
  hydroProduction: {
    id: 191,
    name: "Vesivoiman tuotanto",
    description:
      "Vesivoiman tuotanto perustuu Fingridin käytönvalvontajärjestelmän reaaliaikaisiin mittauksiin. Tieto päivittyy 3 minuutin välein.",
    revalidate: 60 * 3,
    icon: Waves,
  },
  nuclearProduction: {
    id: 188,
    name: "Ydinvoiman tuotanto",
    description:
      "Ydinvoiman tuotantoteho perustuu Fingridin käytönvalvontajärjestelmän reaaliaikaisiin mittauksiin. Tieto päivittyy 3 minuutin välein.",
    revalidate: 60 * 3,
    icon: Atom,
  },
  industryProduction: {
    id: 202,
    name: "Teollisuuden sähköntuotanto",
    description:
      "Teollisuuden sähkön yhteistuotanto perustuu Fingridin käytönvalvontajärjestelmän reaaliaikaisiin mittauksiin. Tieto päivittyy 3 minuutin välein.Yhteistuotantoon kuuluvat teollisuuden voimalaitokset, joissa tuotetaan sekä sähköä että kaukolämpöä tai prosessihöyryä.",
    revalidate: 60 * 3,
    icon: Factory,
  },
  reserveProduction: {
    id: 183,
    name: "Tehoreservi",
    description:
      "Tehoreservin tuotanto perustuu Fingridin käytönvalvontajärjestelmän reaaliaikaisiin mittauksiin. Sisältää tehoreservin aktivoinnit ja koekäytöt. Tieto päivitetään 3 minuutin välein.",
    revalidate: 60 * 3,
    icon: UtilityPole,
  },
  temperatureHelsinki: {
    id: 178,
    name: "Lämpötila Helsingissä",
    description:
      "Mittaus Tammiston sähköasemalla, ulkoilman lämpötila. Tieto päivitetään 3 minuutin välein.",
    revalidate: 60 * 3,
    icon: Thermometer,
  },
  temperatureJyvaskyla: {
    id: 179,
    name: "Lämpötila Jyväskylässä",
    description:
      "Mittaus Petäjäveden sähköasemalla, ulkoilman lämpötila. Tieto päivitetään 3 minuutin välein.",
    revalidate: 60 * 3,
    icon: Thermometer,
  },
  temperatureOulu: {
    id: 196,
    name: "Lämpötila Oulussa",
    description:
      "Mittaus Leväsuon sähköasemalla, ulkoilman lämpötila. Tieto päivitetään 3 minuutin välein.",
    revalidate: 60 * 3,
    icon: Thermometer,
  },
  temperatureRovanemi: {
    id: 185,
    name: "Lämpötila Rovaniemellä",
    description:
      "Mittaus Valajaskosken sähköasemalla, ulkoilman lämpötila. Tieto päivitetään 3 minuutin välein.",
    revalidate: 60 * 3,
    icon: Thermometer,
  },
} as const;
