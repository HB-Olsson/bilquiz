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
  {
    navn: "Tesla Model Y",
    bilde: "🔋",
    beskrivelse: "Romslig elektrisk SUV med topp teknologi, lang rekkevidde og høy sikkerhetsvurdering.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "elektrisk") p += 3;
      if (s.teknologi === "høy") p += 3;
      if (s.sikkerhet === "høy") p += 2;
      if (s.budsjett === "høy") p += 2;
      if (s.passasjerer === "4" || s.passasjerer === "5+") p += 2;
      if (s.parkering === "garasje") p += 2;
      if (s.bagasje === "stor" || s.bagasje === "middels") p += 1;
      return p;
    },
  },
  {
    navn: "Volkswagen ID.3",
    bilde: "⚡",
    beskrivelse: "Elektrisk kompaktbil med god rekkevidde, lavt forbruk og moderne interiør.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "elektrisk" || s.prioritet === "miljø") p += 3;
      if (s.bruk === "by" || s.bruk === "variert") p += 2;
      if (s.budsjett === "middels") p += 2;
      if (s.parkering === "garasje") p += 2;
      if (s.passasjerer !== "5+") p += 1;
      if (s.teknologi === "høy" || s.teknologi === "middels") p += 1;
      return p;
    },
  },
  {
    navn: "Toyota RAV4 Hybrid",
    bilde: "🏔️",
    beskrivelse: "Robust hybrid-SUV med firehjulsdrift. Takler by, landevei og terreng.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "hybrid" || s.drivlinje === "ingen") p += 2;
      if (s.bruk === "terreng" || s.bruk === "variert") p += 3;
      if (s.tilhenger === "ja" || s.tilhenger === "iblant") p += 2;
      if (s.bagasje === "stor") p += 2;
      if (s.budsjett === "middels" || s.budsjett === "høy") p += 1;
      if (s.sikkerhet === "høy") p += 1;
      return p;
    },
  },
  {
    navn: "Volvo XC60",
    bilde: "🛡️",
    beskrivelse: "Skandinavisk komfort og markedets beste sikkerhet. Ideell for familier på langturer.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.sikkerhet === "høy") p += 3;
      if (s.prioritet === "komfort") p += 3;
      if (s.bruk === "familie") p += 2;
      if (s.budsjett !== "lav") p += 2;
      if (s.passasjerer === "4" || s.passasjerer === "5+") p += 1;
      if (s.design === "elegant") p += 1;
      return p;
    },
  },
  {
    navn: "BMW 3-serie",
    bilde: "🏎️",
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
    navn: "Skoda Octavia",
    bilde: "👨‍👩‍👧",
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
    navn: "Toyota Yaris Hybrid",
    bilde: "🚗",
    beskrivelse: "Kompakt, pålitelig og svært billig i drift. Perfekt for bykjøring og korte turer.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.bruk === "by") p += 3;
      if (s.kjørelengde === "lav") p += 2;
      if (s.budsjett === "lav") p += 3;
      if (s.passasjerer === "1" || s.passasjerer === "2") p += 2;
      if (s.drivlinje === "hybrid" || s.drivlinje === "ingen") p += 1;
      if (s.prioritet === "økonomi" || s.prioritet === "miljø") p += 1;
      return p;
    },
  },
  {
    navn: "Dacia Jogger",
    bilde: "💶",
    beskrivelse: "Lavest pris på markedet med overraskende mye plass. Opp til 7 seter.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.budsjett === "lav") p += 4;
      if (s.prioritet === "økonomi") p += 3;
      if (s.passasjerer === "5+") p += 3;
      if (s.design === "praktisk") p += 1;
      return p;
    },
  },
  {
    navn: "Polestar 2",
    bilde: "🌿",
    beskrivelse: "Stilren elektrisk sedan med fokus på bærekraft, design og kjøreglede.",
    poeng: (s: Svar) => {
      let p = 0;
      if (s.drivlinje === "elektrisk") p += 2;
      if (s.prioritet === "miljø") p += 3;
      if (s.design === "sporty" || s.design === "elegant") p += 2;
      if (s.teknologi === "høy") p += 2;
      if (s.budsjett === "middels" || s.budsjett === "høy") p += 2;
      if (s.parkering === "garasje") p += 1;
      return p;
    },
  },
  {
    navn: "Ford Ranger",
    bilde: "🛻",
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
      <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">{anbefaling.bilde}</div>
          <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide mb-1">
            Vår anbefaling til deg
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{anbefaling.navn}</h1>
          <p className="text-gray-500 mb-8">{anbefaling.beskrivelse}</p>
          <button
            onClick={startPåNytt}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition w-full"
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
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full">
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Spørsmål {steg + 1} av {questions.length}</span>
            <span>{Math.round(fremgang)}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${fremgang}%` }}
            />
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">{q.spørsmål}</h2>
        <div className="flex flex-col gap-3">
          {q.valg.map((v) => (
            <button
              key={v.verdi}
              onClick={() => velg(v.verdi)}
              className="text-left border border-gray-200 rounded-xl px-5 py-4 font-medium text-gray-700 hover:border-blue-500 hover:bg-blue-50 transition"
            >
              {v.tekst}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
