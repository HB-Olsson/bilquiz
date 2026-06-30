"use client";
import { useState } from "react";

const questions = [
  {
    id: "bruk",
    spørsmål: "Hva skal bilen hovedsakelig brukes til?",
    valg: [
      { tekst: "Daglig pendling i by", verdi: "by" },
      { tekst: "Familietur og langturer", verdi: "familie" },
      { tekst: "Friluft og terreng", verdi: "terreng" },
      { tekst: "Litt av alt", verdi: "variert" },
    ],
  },
  {
    id: "kjørelengde",
    spørsmål: "Hvor mye kjører du omtrent per år?",
    valg: [
      { tekst: "Under 10 000 km", verdi: "lav" },
      { tekst: "10 000 – 20 000 km", verdi: "middels" },
      { tekst: "Over 20 000 km", verdi: "høy" },
    ],
  },
  {
    id: "parkering",
    spørsmål: "Hvordan parkerer du hjemme?",
    valg: [
      { tekst: "Garasje eller fast parkeringsplass med lademulighet", verdi: "garasje" },
      { tekst: "Gateparkering uten lademulighet", verdi: "gate" },
      { tekst: "Varierer", verdi: "varierer" },
    ],
  },
  {
    id: "passasjerer",
    spørsmål: "Hvor mange personer skal bilen typisk frakte?",
    valg: [
      { tekst: "Bare meg", verdi: "1" },
      { tekst: "2 personer", verdi: "2" },
      { tekst: "3–4 personer", verdi: "4" },
      { tekst: "5 eller flere", verdi: "5+" },
    ],
  },
  {
    id: "tilhenger",
    spørsmål: "Trenger du å trekke tilhenger eller campingvogn?",
    valg: [
      { tekst: "Ja, regelmessig", verdi: "ja" },
      { tekst: "Av og til", verdi: "iblant" },
      { tekst: "Nei", verdi: "nei" },
    ],
  },
  {
    id: "bagasje",
    spørsmål: "Hvor mye bagasjeplass trenger du?",
    valg: [
      { tekst: "Lite — bare det daglige", verdi: "liten" },
      { tekst: "Passe — utstyr og handlevarer", verdi: "middels" },
      { tekst: "Mye — sport, barnevogn, last", verdi: "stor" },
    ],
  },
  {
    id: "budsjett",
    spørsmål: "Hva er budsjettet ditt?",
    valg: [
      { tekst: "Under 300 000 kr", verdi: "lav" },
      { tekst: "300 000 – 500 000 kr", verdi: "middels" },
      { tekst: "Over 500 000 kr", verdi: "høy" },
    ],
  },
  {
    id: "drivlinje",
    spørsmål: "Hvilken drivlinje foretrekker du?",
    valg: [
      { tekst: "Fullelektrisk", verdi: "elektrisk" },
      { tekst: "Hybrid", verdi: "hybrid" },
      { tekst: "Bensin eller diesel", verdi: "fossil" },
      { tekst: "Ingen preferanse", verdi: "ingen" },
    ],
  },
  {
    id: "prioritet",
    spørsmål: "Hva er viktigst for deg i en bil?",
    valg: [
      { tekst: "Lave kostnader", verdi: "økonomi" },
      { tekst: "Komfort og plass", verdi: "komfort" },
      { tekst: "Kjøreglede og ytelse", verdi: "ytelse" },
      { tekst: "Miljø og bærekraft", verdi: "miljø" },
    ],
  },
  {
    id: "sikkerhet",
    spørsmål: "Hvor viktig er sikkerhet og førerassistanse?",
    valg: [
      { tekst: "Topp prioritet — vil ha det beste", verdi: "høy" },
      { tekst: "Viktig, men ikke avgjørende", verdi: "middels" },
      { tekst: "Bryr meg ikke spesielt", verdi: "lav" },
    ],
  },
  {
    id: "teknologi",
    spørsmål: "Hva tenker du om teknologi og digitale funksjoner?",
    valg: [
      { tekst: "Vil ha det nyeste — stor skjerm, OTA-oppdateringer", verdi: "høy" },
      { tekst: "Standard er greit", verdi: "middels" },
      { tekst: "Foretrekker enkelt og oversiktlig", verdi: "lav" },
    ],
  },
  {
    id: "design",
    spørsmål: "Hva beskriver din ideelle bildesign?",
    valg: [
      { tekst: "Sporty og dynamisk", verdi: "sporty" },
      { tekst: "Klassisk og elegant", verdi: "elegant" },
      { tekst: "Praktisk og nøytral", verdi: "praktisk" },
    ],
  },
];

type Svar = Record<string, string>;

const biler = [
  // --- Budsjettsegment ---
  {
    navn: "Dacia Sandero",
    bilde: "💶",
    finn: "https://www.finn.no/car/used/search.html?q=Dacia+Sandero",
    beskrivelse: "Europas billigste nye bil. Enkel, pålitelig og svært billig å eie.",

    poeng: (s: Svar) => {
      let p = 0;
      if (s.budsjett === "lav") p += 5;
      if (s.prioritet === "økonomi") p += 4;
      if (s.passasjerer === "1" || s.passasjerer === "2") p += 2;
      if (s.drivlinje === "fossil" || s.drivlinje === "ingen") p += 1;
      if (s.teknologi === "lav") p += 1;
      return p;
    },
  },
  {
    navn: "Dacia Jogger",
    bilde: "👨‍👩‍👧",
    finn: "https://www.finn.no/car/used/search.html?q=Dacia+Jogger",
    beskrivelse: "Lavest pris med overraskende mye plass — opp til 7 seter.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.budsjett === "lav") p += 4;
      if (s.prioritet === "økonomi") p += 3;
      if (s.passasjerer === "5+") p += 4;
      if (s.bagasje === "stor") p += 2;
      if (s.design === "praktisk") p += 1;
      return p;
    },
  },
  {
    navn: "Dacia Duster",
    bilde: "🏕️",
    finn: "https://www.finn.no/car/used/search.html?q=Dacia+Duster",
    beskrivelse: "Rimelig SUV med solid terrengkapasitet og god bakkeklaring.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.budsjett === "lav") p += 3;
      if (s.bruk === "terreng") p += 3;
      if (s.prioritet === "økonomi") p += 2;
      if (s.drivlinje === "fossil" || s.drivlinje === "ingen") p += 1;
      if (s.tilhenger === "iblant") p += 1;
      return p;
    },
  },
  {
    navn: "Renault Clio",
    bilde: "🚗",
    finn: "https://www.finn.no/car/used/search.html?q=Renault+Clio",
    beskrivelse: "Fransk småbil med sjarm — komfortabel, stilren og lettkjørt i by.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.bruk === "by") p += 3;
      if (s.budsjett === "lav") p += 3;
      if (s.passasjerer === "1" || s.passasjerer === "2") p += 2;
      if (s.kjørelengde === "lav") p += 2;
      if (s.design === "elegant") p += 1;
      return p;
    },
  },
  {
    navn: "Hyundai i20",
    bilde: "🚙",
    finn: "https://www.finn.no/car/used/search.html?q=Hyundai+i20",
    beskrivelse: "Moderne småbil med god utrustning til en fornuftig pris.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.budsjett === "lav") p += 3;
      if (s.bruk === "by") p += 2;
      if (s.passasjerer === "1" || s.passasjerer === "2") p += 2;
      if (s.teknologi === "middels") p += 2;
      if (s.prioritet === "økonomi") p += 2;
      return p;
    },
  },
  {
    navn: "Volkswagen Polo",
    bilde: "🐢",
    finn: "https://www.finn.no/car/used/search.html?q=Volkswagen+Polo",
    beskrivelse: "Tysk kvalitet i kompakt format. Stødig, trygg og godt utstyrt.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.bruk === "by") p += 2;
      if (s.budsjett === "lav") p += 2;
      if (s.sikkerhet === "middels" || s.sikkerhet === "høy") p += 2;
      if (s.passasjerer === "1" || s.passasjerer === "2") p += 2;
      if (s.teknologi === "middels") p += 1;
      return p;
    },
  },
  {
    navn: "Skoda Fabia",
    bilde: "🧩",
    finn: "https://www.finn.no/car/used/search.html?q=Skoda+Fabia",
    beskrivelse: "Overraskende romslig kompaktbil med tsjekk kvalitet og god pris.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.budsjett === "lav") p += 3;
      if (s.bagasje === "middels") p += 2;
      if (s.prioritet === "økonomi") p += 2;
      if (s.bruk === "by" || s.bruk === "variert") p += 1;
      return p;
    },
  },
  {
    navn: "Toyota Yaris Hybrid",
    bilde: "🌱",
    finn: "https://www.finn.no/car/used/search.html?q=Toyota+Yaris",
    beskrivelse: "Kompakt og svært billig i drift. Perfekt for bykjøring med hybridmotor.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.bruk === "by") p += 3;
      if (s.kjørelengde === "lav") p += 2;
      if (s.budsjett === "lav") p += 3;
      if (s.passasjerer === "1" || s.passasjerer === "2") p += 2;
      if (s.drivlinje === "hybrid" || s.drivlinje === "ingen") p += 2;
      if (s.prioritet === "økonomi" || s.prioritet === "miljø") p += 1;
      return p;
    },
  },

  // --- Mellomklasse ---
  {
    navn: "Volkswagen Golf",
    bilde: "🏌️",
    finn: "https://www.finn.no/car/used/search.html?q=Volkswagen+Golf",
    beskrivelse: "Tidløs allrounder — god på alt, svak på ingenting.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.bruk === "variert") p += 3;
      if (s.budsjett === "middels") p += 2;
      if (s.passasjerer === "2" || s.passasjerer === "4") p += 2;
      if (s.teknologi === "middels") p += 2;
      if (s.sikkerhet === "middels") p += 1;
      return p;
    },
  },
  {
    navn: "Toyota Corolla",
    bilde: "🚘",
    finn: "https://www.finn.no/car/used/search.html?q=Toyota+Corolla",
    beskrivelse: "Verdens mest solgte bil. Pålitelig, komfortabel og rimelig å eie.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "hybrid" || s.drivlinje === "ingen") p += 2;
      if (s.prioritet === "økonomi") p += 2;
      if (s.bruk === "variert" || s.bruk === "familie") p += 2;
      if (s.budsjett === "middels") p += 2;
      if (s.kjørelengde === "høy") p += 2;
      return p;
    },
  },
  {
    navn: "Mazda 3",
    bilde: "🎨",
    finn: "https://www.finn.no/car/used/search.html?q=Mazda+3",
    beskrivelse: "Prisbelønnet design, førsteklasses interiør og presis kjøreopplevelse.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.design === "elegant" || s.design === "sporty") p += 3;
      if (s.prioritet === "ytelse") p += 2;
      if (s.budsjett === "middels") p += 2;
      if (s.passasjerer === "2" || s.passasjerer === "4") p += 1;
      if (s.teknologi === "middels") p += 1;
      return p;
    },
  },
  {
    navn: "Skoda Octavia",
    bilde: "🧳",
    finn: "https://www.finn.no/car/used/search.html?q=Skoda+Octavia",
    beskrivelse: "Mye bil for pengene — romslig, praktisk og pålitelig for hele familien.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.prioritet === "økonomi") p += 3;
      if (s.passasjerer === "4" || s.passasjerer === "5+") p += 2;
      if (s.bagasje === "stor" || s.bagasje === "middels") p += 2;
      if (s.budsjett === "lav" || s.budsjett === "middels") p += 2;
      if (s.design === "praktisk") p += 1;
      return p;
    },
  },
  {
    navn: "Hyundai Tucson",
    bilde: "🌄",
    finn: "https://www.finn.no/car/used/search.html?q=Hyundai+Tucson",
    beskrivelse: "Moderne SUV med slående design, god plass og hybrid som standard.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.bruk === "familie" || s.bruk === "variert") p += 2;
      if (s.budsjett === "middels") p += 2;
      if (s.drivlinje === "hybrid" || s.drivlinje === "ingen") p += 2;
      if (s.bagasje === "stor") p += 2;
      if (s.design === "sporty") p += 1;
      return p;
    },
  },
  {
    navn: "Kia Sportage",
    bilde: "🦁",
    finn: "https://www.finn.no/car/used/search.html?q=Kia+Sportage",
    beskrivelse: "Robust og godt utstyrt SUV med lang garanti og god verdi.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.budsjett === "middels") p += 2;
      if (s.bruk === "familie" || s.bruk === "variert") p += 2;
      if (s.sikkerhet === "høy") p += 2;
      if (s.bagasje === "middels" || s.bagasje === "stor") p += 2;
      if (s.teknologi === "middels") p += 1;
      return p;
    },
  },
  {
    navn: "Nissan Qashqai",
    bilde: "🗺️",
    finn: "https://www.finn.no/car/used/search.html?q=Nissan+Qashqai",
    beskrivelse: "SUV-en som startet segmentet. Komfortabel, romslig og praktisk.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.bruk === "familie" || s.bruk === "variert") p += 2;
      if (s.budsjett === "middels") p += 2;
      if (s.drivlinje === "hybrid" || s.drivlinje === "ingen") p += 2;
      if (s.prioritet === "komfort") p += 2;
      if (s.passasjerer === "4") p += 1;
      return p;
    },
  },
  {
    navn: "Peugeot 3008",
    bilde: "🦁",
    finn: "https://www.finn.no/car/used/search.html?q=Peugeot+3008",
    beskrivelse: "Franske luksusfølelser til mellomklassepris — nyskapende interiør.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.design === "elegant") p += 3;
      if (s.prioritet === "komfort") p += 2;
      if (s.budsjett === "middels") p += 2;
      if (s.teknologi === "høy") p += 2;
      if (s.bruk === "familie") p += 1;
      return p;
    },
  },
  {
    navn: "Ford Kuga Hybrid",
    bilde: "🦅",
    finn: "https://www.finn.no/car/used/search.html?q=Ford+Kuga",
    beskrivelse: "Allsidig hybrid-SUV med god plass og lavt forbruk på langturer.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "hybrid") p += 3;
      if (s.bruk === "familie" || s.bruk === "variert") p += 2;
      if (s.kjørelengde === "høy") p += 2;
      if (s.budsjett === "middels") p += 2;
      if (s.bagasje === "middels") p += 1;
      return p;
    },
  },
  {
    navn: "Mazda CX-5",
    bilde: "🌊",
    finn: "https://www.finn.no/car/used/search.html?q=Mazda+CX-5",
    beskrivelse: "Premiumfølelse uten premiumprislapp — romslig, stilren og stødig.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.design === "elegant") p += 2;
      if (s.prioritet === "komfort") p += 2;
      if (s.budsjett === "middels") p += 2;
      if (s.bruk === "familie") p += 2;
      if (s.bagasje === "middels" || s.bagasje === "stor") p += 1;
      return p;
    },
  },
  {
    navn: "Toyota RAV4 Hybrid",
    bilde: "🏔️",
    finn: "https://www.finn.no/car/used/search.html?q=Toyota+RAV4",
    beskrivelse: "Robust hybrid-SUV med firehjulsdrift. Takler by, landevei og lettere terreng.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "hybrid" || s.drivlinje === "ingen") p += 2;
      if (s.bruk === "terreng" || s.bruk === "variert") p += 3;
      if (s.tilhenger === "ja" || s.tilhenger === "iblant") p += 2;
      if (s.bagasje === "stor") p += 2;
      if (s.budsjett === "middels" || s.budsjett === "høy") p += 1;
      return p;
    },
  },
  {
    navn: "Kia Niro EV",
    bilde: "🍃",
    finn: "https://www.finn.no/car/used/search.html?q=Kia+Niro",
    beskrivelse: "Kompakt elektrisk SUV med lang rekkevidde og praktisk design.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "elektrisk") p += 3;
      if (s.prioritet === "miljø") p += 3;
      if (s.budsjett === "middels") p += 2;
      if (s.bruk === "by" || s.bruk === "variert") p += 2;
      if (s.parkering === "garasje") p += 1;
      return p;
    },
  },

  // --- Elektrisk mellomklasse ---
  {
    navn: "Volkswagen ID.3",
    bilde: "⚡",
    finn: "https://www.finn.no/car/used/search.html?q=Volkswagen+ID.3",
    beskrivelse: "Elektrisk kompaktbil med god rekkevidde, lavt forbruk og moderne interiør.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "elektrisk" || s.prioritet === "miljø") p += 3;
      if (s.bruk === "by" || s.bruk === "variert") p += 2;
      if (s.budsjett === "middels") p += 2;
      if (s.parkering === "garasje") p += 2;
      if (s.passasjerer !== "5+") p += 1;
      return p;
    },
  },
  {
    navn: "Volkswagen ID.4",
    bilde: "🔌",
    finn: "https://www.finn.no/car/used/search.html?q=Volkswagen+ID.4",
    beskrivelse: "Elektrisk familieSUV med lang rekkevidde og romslig interiør.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "elektrisk") p += 3;
      if (s.bruk === "familie") p += 2;
      if (s.passasjerer === "4" || s.passasjerer === "5+") p += 2;
      if (s.budsjett === "middels" || s.budsjett === "høy") p += 2;
      if (s.parkering === "garasje") p += 1;
      return p;
    },
  },
  {
    navn: "Hyundai Ioniq 6",
    bilde: "🚀",
    finn: "https://www.finn.no/car/used/search.html?q=Hyundai+Ioniq+6",
    beskrivelse: "Aerodynamisk elektrisk sedan med rekordlang rekkevidde og lynrask lading.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "elektrisk") p += 3;
      if (s.kjørelengde === "høy") p += 3;
      if (s.design === "sporty") p += 2;
      if (s.teknologi === "høy") p += 2;
      if (s.budsjett === "middels" || s.budsjett === "høy") p += 1;
      return p;
    },
  },
  {
    navn: "Kia EV6",
    bilde: "🌀",
    finn: "https://www.finn.no/car/used/search.html?q=Kia+EV6",
    beskrivelse: "Elektrisk crossover med spektakulært design og lynrask lading.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "elektrisk") p += 3;
      if (s.design === "sporty") p += 3;
      if (s.prioritet === "ytelse") p += 2;
      if (s.teknologi === "høy") p += 2;
      if (s.budsjett === "middels" || s.budsjett === "høy") p += 1;
      return p;
    },
  },
  {
    navn: "Polestar 2",
    bilde: "🌿",
    finn: "https://www.finn.no/car/used/search.html?q=Polestar+2",
    beskrivelse: "Stilren elektrisk sedan med fokus på bærekraft, design og kjøreglede.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "elektrisk") p += 2;
      if (s.prioritet === "miljø") p += 3;
      if (s.design === "elegant") p += 2;
      if (s.teknologi === "høy") p += 2;
      if (s.budsjett === "middels" || s.budsjett === "høy") p += 2;
      return p;
    },
  },

  // --- Premium ---
  {
    navn: "Tesla Model 3",
    bilde: "⚡",
    finn: "https://www.finn.no/car/used/search.html?q=Tesla+Model+3",
    beskrivelse: "Elektrisk sedan med enestående teknologi og ytelse. Ingen kompromisser.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "elektrisk") p += 3;
      if (s.teknologi === "høy") p += 3;
      if (s.prioritet === "ytelse") p += 2;
      if (s.budsjett === "middels" || s.budsjett === "høy") p += 2;
      if (s.parkering === "garasje") p += 1;
      return p;
    },
  },
  {
    navn: "Tesla Model Y",
    bilde: "🔋",
    finn: "https://www.finn.no/car/used/search.html?q=Tesla+Model+Y",
    beskrivelse: "Romslig elektrisk SUV med topp teknologi, lang rekkevidde og høy sikkerhetsvurdering.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "elektrisk") p += 3;
      if (s.teknologi === "høy") p += 3;
      if (s.sikkerhet === "høy") p += 2;
      if (s.budsjett === "høy") p += 2;
      if (s.passasjerer === "4" || s.passasjerer === "5+") p += 2;
      if (s.parkering === "garasje") p += 1;
      return p;
    },
  },
  {
    navn: "Volvo XC40 Recharge",
    bilde: "🛡️",
    finn: "https://www.finn.no/car/used/search.html?q=Volvo+XC40",
    beskrivelse: "Kompakt elektrisk SUV fra Volvo — skandinavisk design møter nullutslipp.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "elektrisk") p += 3;
      if (s.sikkerhet === "høy") p += 3;
      if (s.design === "elegant") p += 2;
      if (s.budsjett === "høy") p += 2;
      if (s.bruk === "by" || s.bruk === "variert") p += 1;
      return p;
    },
  },
  {
    navn: "Volvo XC60",
    bilde: "🌲",
    finn: "https://www.finn.no/car/used/search.html?q=Volvo+XC60",
    beskrivelse: "Markedets beste sikkerhet, nordisk komfort og plug-in hybrid som standard.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.sikkerhet === "høy") p += 3;
      if (s.prioritet === "komfort") p += 3;
      if (s.bruk === "familie") p += 2;
      if (s.budsjett !== "lav") p += 2;
      if (s.design === "elegant") p += 1;
      return p;
    },
  },
  {
    navn: "BMW 3-serie",
    bilde: "🏎️",
    finn: "https://www.finn.no/car/used/search.html?q=BMW+3-serie",
    beskrivelse: "Kjøreglede i toppklasse med elegant design og kraftig motor.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.prioritet === "ytelse") p += 4;
      if (s.design === "sporty" || s.design === "elegant") p += 2;
      if (s.budsjett !== "lav") p += 2;
      if (s.kjørelengde === "høy") p += 1;
      if (s.teknologi === "høy") p += 1;
      return p;
    },
  },
  {
    navn: "BMW iX3",
    bilde: "⚡",
    finn: "https://www.finn.no/car/used/search.html?q=BMW+iX3",
    beskrivelse: "Elektrisk BMW SUV med kjent kjøredynamikk og premium interiør.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "elektrisk") p += 3;
      if (s.prioritet === "ytelse") p += 3;
      if (s.design === "sporty" || s.design === "elegant") p += 2;
      if (s.budsjett === "høy") p += 2;
      if (s.teknologi === "høy") p += 1;
      return p;
    },
  },
  {
    navn: "Audi A4",
    bilde: "💎",
    finn: "https://www.finn.no/car/used/search.html?q=Audi+A4",
    beskrivelse: "Tysk presisjon og luksus i mellomklassen — diskret, rask og godt utstyrt.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.design === "elegant") p += 3;
      if (s.prioritet === "ytelse" || s.prioritet === "komfort") p += 2;
      if (s.budsjett === "høy") p += 3;
      if (s.teknologi === "høy") p += 1;
      if (s.kjørelengde === "høy") p += 1;
      return p;
    },
  },
  {
    navn: "Audi Q4 e-tron",
    bilde: "🔷",
    finn: "https://www.finn.no/car/used/search.html?q=Audi+Q4",
    beskrivelse: "Elektrisk SUV med Audis kjente kvalitetsfølelse og romslig interiør.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "elektrisk") p += 3;
      if (s.design === "elegant") p += 2;
      if (s.budsjett === "høy") p += 3;
      if (s.prioritet === "komfort") p += 2;
      if (s.teknologi === "høy") p += 1;
      return p;
    },
  },
  {
    navn: "Mercedes C-klasse",
    bilde: "⭐",
    finn: "https://www.finn.no/car/used/search.html?q=Mercedes+C-klasse",
    beskrivelse: "Luksuriøs sedan med toppmoderne teknologi og uovertruffen komfort.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.prioritet === "komfort") p += 3;
      if (s.design === "elegant") p += 3;
      if (s.budsjett === "høy") p += 3;
      if (s.teknologi === "høy") p += 2;
      if (s.sikkerhet === "høy") p += 1;
      return p;
    },
  },
  {
    navn: "Mercedes EQA",
    bilde: "🌟",
    finn: "https://www.finn.no/car/used/search.html?q=Mercedes+EQA",
    beskrivelse: "Kompakt elektrisk Mercedes med luksusinteriør og trygg rekkevidde.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "elektrisk") p += 3;
      if (s.design === "elegant") p += 2;
      if (s.budsjett === "høy") p += 2;
      if (s.prioritet === "komfort") p += 2;
      if (s.parkering === "garasje") p += 1;
      return p;
    },
  },

  // --- Stor / luksus ---
  {
    navn: "Volvo XC90",
    bilde: "👑",
    finn: "https://www.finn.no/car/used/search.html?q=Volvo+XC90",
    beskrivelse: "Flaggskipet fra Volvo — 7 seter, topp sikkerhet og tidløs skandinavisk luksus.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.passasjerer === "5+") p += 4;
      if (s.sikkerhet === "høy") p += 3;
      if (s.prioritet === "komfort") p += 2;
      if (s.budsjett === "høy") p += 3;
      if (s.design === "elegant") p += 1;
      return p;
    },
  },
  {
    navn: "BMW X5",
    bilde: "🦈",
    finn: "https://www.finn.no/car/used/search.html?q=BMW+X5",
    beskrivelse: "Stor premium SUV med kraftige motorer og luksus i alle detaljer.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.budsjett === "høy") p += 3;
      if (s.prioritet === "ytelse") p += 3;
      if (s.passasjerer === "5+") p += 2;
      if (s.tilhenger === "ja" || s.tilhenger === "iblant") p += 2;
      if (s.design === "sporty" || s.design === "elegant") p += 1;
      return p;
    },
  },
  {
    navn: "Audi Q7",
    bilde: "🔶",
    finn: "https://www.finn.no/car/used/search.html?q=Audi+Q7",
    beskrivelse: "Stor, romslig luksus-SUV med 7 seter og imponerende utstyrsnivå.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.passasjerer === "5+") p += 4;
      if (s.budsjett === "høy") p += 3;
      if (s.design === "elegant") p += 2;
      if (s.prioritet === "komfort") p += 2;
      if (s.bagasje === "stor") p += 1;
      return p;
    },
  },
  {
    navn: "Mercedes GLE",
    bilde: "🏛️",
    finn: "https://www.finn.no/car/used/search.html?q=Mercedes+GLE",
    beskrivelse: "Overlegen komfort og teknologi i en stor, sofistikert SUV.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.budsjett === "høy") p += 3;
      if (s.prioritet === "komfort") p += 3;
      if (s.design === "elegant") p += 2;
      if (s.passasjerer === "5+") p += 2;
      if (s.teknologi === "høy") p += 2;
      return p;
    },
  },

  // --- Terreng og arbeid ---
  {
    navn: "Ford Ranger",
    bilde: "🛻",
    finn: "https://www.finn.no/car/used/search.html?q=Ford+Ranger",
    beskrivelse: "Kraftig pickup med høy trekkkapasitet. Bygget for hardt arbeid og terreng.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.tilhenger === "ja") p += 4;
      if (s.bruk === "terreng") p += 3;
      if (s.bagasje === "stor") p += 2;
      if (s.drivlinje === "fossil" || s.drivlinje === "ingen") p += 1;
      return p;
    },
  },
  {
    navn: "Toyota Hilux",
    bilde: "🪨",
    finn: "https://www.finn.no/car/used/search.html?q=Toyota+Hilux",
    beskrivelse: "Verdens mest pålitelige pickup. Uslitelig i alle terreng og forhold.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.bruk === "terreng") p += 4;
      if (s.tilhenger === "ja") p += 3;
      if (s.drivlinje === "fossil" || s.drivlinje === "ingen") p += 2;
      if (s.bagasje === "stor") p += 2;
      if (s.prioritet === "økonomi") p -= 1;
      return p;
    },
  },
  {
    navn: "Volkswagen Transporter",
    bilde: "🚐",
    finn: "https://www.finn.no/car/used/search.html?q=Volkswagen+Transporter",
    beskrivelse: "Klassisk varebil med mye plass, stor nyttelast og god komfort for sjåføren.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.bagasje === "stor") p += 4;
      if (s.passasjerer === "5+") p += 3;
      if (s.tilhenger === "ja") p += 2;
      if (s.drivlinje === "fossil" || s.drivlinje === "ingen") p += 1;
      if (s.prioritet === "økonomi") p += 1;
      return p;
    },
  },
  {
    navn: "Mitsubishi L200",
    bilde: "🏗️",
    finn: "https://www.finn.no/car/used/search.html?q=Mitsubishi+L200",
    beskrivelse: "Japansk pickup med imponerende terrengegenskaper og høy trekkevne.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.bruk === "terreng") p += 3;
      if (s.tilhenger === "ja") p += 3;
      if (s.drivlinje === "fossil" || s.drivlinje === "ingen") p += 2;
      if (s.budsjett === "middels") p += 1;
      if (s.bagasje === "stor") p += 1;
      return p;
    },
  },
];

function finnAnbefaling(svar: Svar) {
  const rangert = [...biler].sort((a, b) => b.poeng(svar) - a.poeng(svar));
  return rangert[0];
}

export default function Home() {
  const [steg, setSteg] = useState(0);
  const [svar, setSvar] = useState<Svar>({});
  const [ferdig, setFerdig] = useState(false);

  function velg(verdi: string) {
    const nyttSvar = { ...svar, [questions[steg].id]: verdi };
    setSvar(nyttSvar);
    if (steg + 1 < questions.length) {
      setSteg(steg + 1);
    } else {
      setFerdig(true);
    }
  }

  function startPåNytt() {
    setSteg(0);
    setSvar({});
    setFerdig(false);
  }

  if (ferdig) {
    const anbefaling = finnAnbefaling(svar);
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-6">{anbefaling.bilde}</div>
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">
            Vår anbefaling
          </p>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">{anbefaling.navn}</h1>
          <p className="text-slate-500 leading-relaxed mb-8">{anbefaling.beskrivelse}</p>
          <a
            href={anbefaling.finn}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-slate-900 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-slate-700 transition-colors w-full text-center mb-3 cursor-pointer"
          >
            Se annonser på Finn.no →
          </a>
          <button
            onClick={startPåNytt}
            className="w-full text-slate-400 px-6 py-3 rounded-2xl font-medium hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Ta quizen på nytt
          </button>
        </div>
      </main>
    );
  }

  const q = questions[steg];
  const fremgang = (steg / questions.length) * 100;

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 max-w-md w-full">
        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>{steg + 1} av {questions.length}</span>
            <span>{Math.round(fremgang)}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5">
            <div
              className="bg-slate-900 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${fremgang}%` }}
            />
          </div>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-6 leading-snug">{q.spørsmål}</h2>
        <div className="flex flex-col gap-2">
          {q.valg.map((v) => (
            <button
              key={v.verdi}
              onClick={() => velg(v.verdi)}
              className="text-left border border-slate-200 rounded-2xl px-5 py-4 font-medium text-slate-700 hover:border-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {v.tekst}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
