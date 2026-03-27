import { useState, useEffect, useRef } from "react";

// ─── 270 WORDS PER LEVEL ─────────────────────────────────────────────────────
const VOCAB_POOL = {
  A1: [
    {de:"Hallo",en:"Hello"},{de:"Danke",en:"Thank you"},{de:"Bitte",en:"Please"},
    {de:"Ja",en:"Yes"},{de:"Nein",en:"No"},{de:"Haus",en:"House"},
    {de:"Wasser",en:"Water"},{de:"Essen",en:"Food"},{de:"Mann",en:"Man"},
    {de:"Frau",en:"Woman"},{de:"Kind",en:"Child"},{de:"Auto",en:"Car"},
    {de:"Hund",en:"Dog"},{de:"Katze",en:"Cat"},{de:"Buch",en:"Book"},
    {de:"Schule",en:"School"},{de:"Tag",en:"Day"},{de:"Nacht",en:"Night"},
    {de:"Arbeit",en:"Work"},{de:"Zeit",en:"Time"},{de:"Geld",en:"Money"},
    {de:"Freund",en:"Friend"},{de:"Familie",en:"Family"},{de:"Stadt",en:"City"},
    {de:"Land",en:"Country"},{de:"Straße",en:"Street"},{de:"Tisch",en:"Table"},
    {de:"Stuhl",en:"Chair"},{de:"Tür",en:"Door"},{de:"Fenster",en:"Window"},
    {de:"Brot",en:"Bread"},{de:"Milch",en:"Milk"},{de:"Apfel",en:"Apple"},
    {de:"Küche",en:"Kitchen"},{de:"Bett",en:"Bed"},{de:"Lampe",en:"Lamp"},
    {de:"Uhr",en:"Clock"},{de:"Telefon",en:"Phone"},{de:"Schlüssel",en:"Key"},
    {de:"Brief",en:"Letter"},{de:"Zeitung",en:"Newspaper"},{de:"Musik",en:"Music"},
    {de:"Film",en:"Movie"},{de:"Sport",en:"Sport"},{de:"Sonne",en:"Sun"},
    {de:"Regen",en:"Rain"},{de:"Baum",en:"Tree"},{de:"Blume",en:"Flower"},
    {de:"Berg",en:"Mountain"},{de:"Meer",en:"Sea"},{de:"Fluss",en:"River"},
    {de:"Rot",en:"Red"},{de:"Blau",en:"Blue"},{de:"Grün",en:"Green"},
    {de:"Weiß",en:"White"},{de:"Schwarz",en:"Black"},{de:"Groß",en:"Big"},
    {de:"Klein",en:"Small"},{de:"Gut",en:"Good"},{de:"Schlecht",en:"Bad"},
    {de:"Neu",en:"New"},{de:"Alt",en:"Old"},{de:"Warm",en:"Warm"},
    {de:"Kalt",en:"Cold"},{de:"Schnell",en:"Fast"},{de:"Langsam",en:"Slow"},
    {de:"Heute",en:"Today"},{de:"Morgen",en:"Tomorrow"},{de:"Gestern",en:"Yesterday"},
    {de:"Kaufen",en:"To buy"},{de:"Trinken",en:"To drink"},{de:"Schlafen",en:"To sleep"},
    {de:"Lesen",en:"To read"},{de:"Schreiben",en:"To write"},{de:"Kommen",en:"To come"},
    {de:"Gehen",en:"To go"},{de:"Sehen",en:"To see"},{de:"Hören",en:"To hear"},
    {de:"Sprechen",en:"To speak"},{de:"Kochen",en:"To cook"},{de:"Spielen",en:"To play"},
    {de:"Lernen",en:"To learn"},{de:"Helfen",en:"To help"},{de:"Finden",en:"To find"},
    {de:"Geben",en:"To give"},{de:"Nehmen",en:"To take"},{de:"Öffnen",en:"To open"},
    {de:"Schließen",en:"To close"},{de:"Suchen",en:"To search"},{de:"Denken",en:"To think"},
    {de:"Wissen",en:"To know"},{de:"Lieben",en:"To love"},{de:"Brauchen",en:"To need"},
    {de:"Haben",en:"To have"},{de:"Sein",en:"To be"},{de:"Werden",en:"To become"},
    {de:"Machen",en:"To make"},{de:"Sagen",en:"To say"},{de:"Fragen",en:"To ask"},
    {de:"Antworten",en:"To answer"},{de:"Zeigen",en:"To show"},{de:"Bringen",en:"To bring"},
    {de:"Stehen",en:"To stand"},{de:"Sitzen",en:"To sit"},{de:"Laufen",en:"To run"},
    {de:"Fliegen",en:"To fly"},{de:"Fahren",en:"To drive"},{de:"Schwimmen",en:"To swim"},
    {de:"Aufstehen",en:"To get up"},{de:"Anziehen",en:"To put on"},{de:"Waschen",en:"To wash"},
    {de:"Verkaufen",en:"To sell"},{de:"Bezahlen",en:"To pay"},{de:"Schicken",en:"To send"},
    {de:"Vogel",en:"Bird"},{de:"Pferd",en:"Horse"},{de:"Kuh",en:"Cow"},
    {de:"Schwein",en:"Pig"},{de:"Schaf",en:"Sheep"},{de:"Wald",en:"Forest"},
    {de:"Gras",en:"Grass"},{de:"Feld",en:"Field"},{de:"Himmel",en:"Sky"},
    {de:"Mond",en:"Moon"},{de:"Stern",en:"Star"},{de:"Schnee",en:"Snow"},
    {de:"Eis",en:"Ice"},{de:"Wind",en:"Wind"},{de:"Feuer",en:"Fire"},
    {de:"Erde",en:"Earth"},{de:"Sand",en:"Sand"},{de:"Käse",en:"Cheese"},
    {de:"Ei",en:"Egg"},{de:"Fleisch",en:"Meat"},{de:"Gemüse",en:"Vegetables"},
    {de:"Obst",en:"Fruit"},{de:"Suppe",en:"Soup"},{de:"Kuchen",en:"Cake"},
    {de:"Kaffee",en:"Coffee"},{de:"Tee",en:"Tea"},{de:"Saft",en:"Juice"},
    {de:"Bier",en:"Beer"},{de:"Wein",en:"Wine"},{de:"Zucker",en:"Sugar"},
    {de:"Salz",en:"Salt"},{de:"Öl",en:"Oil"},{de:"Butter",en:"Butter"},
    {de:"Mehl",en:"Flour"},{de:"Kopf",en:"Head"},{de:"Hand",en:"Hand"},
    {de:"Fuß",en:"Foot"},{de:"Auge",en:"Eye"},{de:"Ohr",en:"Ear"},
    {de:"Nase",en:"Nose"},{de:"Mund",en:"Mouth"},{de:"Arm",en:"Arm"},
    {de:"Bein",en:"Leg"},{de:"Rücken",en:"Back"},{de:"Herz",en:"Heart"},
    {de:"Bauch",en:"Stomach"},{de:"Sofa",en:"Sofa"},{de:"Schrank",en:"Cupboard"},
    {de:"Spiegel",en:"Mirror"},{de:"Dusche",en:"Shower"},{de:"Badewanne",en:"Bathtub"},
    {de:"Kühlschrank",en:"Fridge"},{de:"Ofen",en:"Oven"},{de:"Messer",en:"Knife"},
    {de:"Gabel",en:"Fork"},{de:"Löffel",en:"Spoon"},{de:"Teller",en:"Plate"},
    {de:"Tasse",en:"Cup"},{de:"Glas",en:"Glass"},{de:"Topf",en:"Pot"},
    {de:"Eins",en:"One"},{de:"Zwei",en:"Two"},{de:"Drei",en:"Three"},
    {de:"Vier",en:"Four"},{de:"Fünf",en:"Five"},{de:"Zehn",en:"Ten"},
    {de:"Hundert",en:"Hundred"},{de:"Jahr",en:"Year"},{de:"Minute",en:"Minute"},
    {de:"Mutter",en:"Mother"},{de:"Vater",en:"Father"},{de:"Bruder",en:"Brother"},
    {de:"Schwester",en:"Sister"},{de:"Oma",en:"Grandma"},{de:"Opa",en:"Grandpa"},
    {de:"Sohn",en:"Son"},{de:"Tochter",en:"Daughter"},{de:"Ehemann",en:"Husband"},
    {de:"Ehefrau",en:"Wife"},{de:"Baby",en:"Baby"},{de:"Junge",en:"Boy"},
    {de:"Mädchen",en:"Girl"},{de:"Arzt",en:"Doctor"},{de:"Bus",en:"Bus"},
    {de:"Zug",en:"Train"},{de:"Fahrrad",en:"Bicycle"},{de:"Taxi",en:"Taxi"},
    {de:"Schiff",en:"Ship"},{de:"Brücke",en:"Bridge"},{de:"Park",en:"Park"},
    {de:"Garten",en:"Garden"},{de:"Markt",en:"Market"},{de:"Laden",en:"Shop"},
    {de:"Bank",en:"Bank"},{de:"Post",en:"Post office"},{de:"Hotel",en:"Hotel"},
    {de:"Restaurant",en:"Restaurant"},{de:"Fisch",en:"Fish"},{de:"Waschmaschine",en:"Washing machine"},
  ],
  A2: [
    {de:"Bahnhof",en:"Train station"},{de:"Flugzeug",en:"Airplane"},{de:"Krankenhaus",en:"Hospital"},
    {de:"Apotheke",en:"Pharmacy"},{de:"Supermarkt",en:"Supermarket"},{de:"Schlafzimmer",en:"Bedroom"},
    {de:"Badezimmer",en:"Bathroom"},{de:"Treppe",en:"Staircase"},{de:"Nachricht",en:"Message"},
    {de:"Gespräch",en:"Conversation"},{de:"Antwort",en:"Answer"},{de:"Frage",en:"Question"},
    {de:"Meinung",en:"Opinion"},{de:"Entscheidung",en:"Decision"},{de:"Erfahrung",en:"Experience"},
    {de:"Möglichkeit",en:"Possibility"},{de:"Gesundheit",en:"Health"},{de:"Krankheit",en:"Illness"},
    {de:"Gefühl",en:"Feeling"},{de:"Hoffnung",en:"Hope"},{de:"Traum",en:"Dream"},
    {de:"Erfolg",en:"Success"},{de:"Schwierigkeit",en:"Difficulty"},{de:"Hilfe",en:"Help"},
    {de:"Veranstaltung",en:"Event"},{de:"Reise",en:"Journey"},{de:"Urlaub",en:"Vacation"},
    {de:"Wetter",en:"Weather"},{de:"Frühling",en:"Spring"},{de:"Sommer",en:"Summer"},
    {de:"Herbst",en:"Autumn"},{de:"Winter",en:"Winter"},{de:"Geburtstag",en:"Birthday"},
    {de:"Geschenk",en:"Gift"},{de:"Feier",en:"Celebration"},{de:"Einladung",en:"Invitation"},
    {de:"Nachbar",en:"Neighbour"},{de:"Kollege",en:"Colleague"},{de:"Chef",en:"Boss"},
    {de:"Beruf",en:"Profession"},{de:"Gehalt",en:"Salary"},{de:"Vertrag",en:"Contract"},
    {de:"Bewerbung",en:"Application"},{de:"Ausbildung",en:"Training"},{de:"Studium",en:"Studies"},
    {de:"Universität",en:"University"},{de:"Prüfung",en:"Exam"},{de:"Unterricht",en:"Lesson"},
    {de:"Hausaufgabe",en:"Homework"},{de:"Fehler",en:"Mistake"},{de:"Übung",en:"Exercise"},
    {de:"Wörterbuch",en:"Dictionary"},{de:"Sprache",en:"Language"},{de:"Satz",en:"Sentence"},
    {de:"Thema",en:"Topic"},{de:"Beispiel",en:"Example"},{de:"Aufgabe",en:"Task"},
    {de:"Lösung",en:"Solution"},{de:"Problem",en:"Problem"},{de:"Idee",en:"Idea"},
    {de:"Plan",en:"Plan"},{de:"Termin",en:"Appointment"},{de:"Adresse",en:"Address"},
    {de:"Formular",en:"Form"},{de:"Rechnung",en:"Invoice"},{de:"Preis",en:"Price"},
    {de:"Rabatt",en:"Discount"},{de:"Kasse",en:"Checkout"},{de:"Einkauf",en:"Shopping"},
    {de:"Qualität",en:"Quality"},{de:"Größe",en:"Size"},{de:"Kleidung",en:"Clothing"},
    {de:"Hemd",en:"Shirt"},{de:"Hose",en:"Trousers"},{de:"Schuhe",en:"Shoes"},
    {de:"Tasche",en:"Bag"},{de:"Brille",en:"Glasses"},{de:"Jacke",en:"Jacket"},
    {de:"Kleid",en:"Dress"},{de:"Rock",en:"Skirt"},{de:"Mantel",en:"Coat"},
    {de:"Mütze",en:"Beanie"},{de:"Handschuhe",en:"Gloves"},{de:"Stiefel",en:"Boots"},
    {de:"Frühstück",en:"Breakfast"},{de:"Mittagessen",en:"Lunch"},{de:"Abendessen",en:"Dinner"},
    {de:"Mahlzeit",en:"Meal"},{de:"Rezept",en:"Recipe"},{de:"Zutaten",en:"Ingredients"},
    {de:"Abfahrt",en:"Departure"},{de:"Ankunft",en:"Arrival"},{de:"Flughafen",en:"Airport"},
    {de:"Fahrkarte",en:"Ticket"},{de:"Reisepass",en:"Passport"},{de:"Gepäck",en:"Luggage"},
    {de:"Zimmer",en:"Room"},{de:"Reservierung",en:"Reservation"},{de:"Stadtplan",en:"City map"},
    {de:"Sehenswürdigkeit",en:"Attraction"},{de:"Führung",en:"Tour"},{de:"Freude",en:"Joy"},
    {de:"Trauer",en:"Sadness"},{de:"Angst",en:"Fear"},{de:"Ärger",en:"Anger"},
    {de:"Überraschung",en:"Surprise"},{de:"Stolz",en:"Pride"},{de:"Neugier",en:"Curiosity"},
    {de:"Geduld",en:"Patience"},{de:"Mut",en:"Courage"},{de:"Vertrauen",en:"Trust"},
    {de:"Respekt",en:"Respect"},{de:"Zufriedenheit",en:"Satisfaction"},{de:"Computer",en:"Computer"},
    {de:"Internet",en:"Internet"},{de:"Webseite",en:"Website"},{de:"Passwort",en:"Password"},
    {de:"App",en:"App"},{de:"Kamera",en:"Camera"},{de:"Drucker",en:"Printer"},
    {de:"Bildschirm",en:"Screen"},{de:"Tastatur",en:"Keyboard"},{de:"Maus",en:"Mouse"},
    {de:"Gewitter",en:"Thunderstorm"},{de:"Nebel",en:"Fog"},{de:"Sturm",en:"Storm"},
    {de:"Sonnenschein",en:"Sunshine"},{de:"Temperatur",en:"Temperature"},{de:"Klima",en:"Climate"},
    {de:"Umwelt",en:"Environment"},{de:"Natur",en:"Nature"},{de:"Tier",en:"Animal"},
    {de:"Pflanze",en:"Plant"},{de:"Boden",en:"Ground"},{de:"Gemeinde",en:"Community"},
    {de:"Verein",en:"Club"},{de:"Mitglied",en:"Member"},{de:"Bürger",en:"Citizen"},
    {de:"Ausweis",en:"ID card"},{de:"Versicherung",en:"Insurance"},{de:"Steuer",en:"Tax"},
    {de:"Konto",en:"Account"},{de:"Fußball",en:"Football"},{de:"Tennis",en:"Tennis"},
    {de:"Radfahren",en:"Cycling"},{de:"Wandern",en:"Hiking"},{de:"Tanzen",en:"Dancing"},
    {de:"Malen",en:"Painting"},{de:"Gärtnern",en:"Gardening"},{de:"Tablette",en:"Tablet"},
    {de:"Impfung",en:"Vaccination"},{de:"Allergie",en:"Allergy"},{de:"Schmerz",en:"Pain"},
    {de:"Fieber",en:"Fever"},{de:"Husten",en:"Cough"},{de:"Unfall",en:"Accident"},
    {de:"Zeugnis",en:"Certificate"},{de:"Abschluss",en:"Degree"},{de:"Praktikum",en:"Internship"},
    {de:"Besprechung",en:"Meeting"},{de:"Bericht",en:"Report"},{de:"Präsentation",en:"Presentation"},
    {de:"Monat",en:"Month"},{de:"Woche",en:"Week"},{de:"Stunde",en:"Hour"},
  ],
  B1: [
    {de:"Gesellschaft",en:"Society"},{de:"Entwicklung",en:"Development"},{de:"Zusammenhang",en:"Connection"},
    {de:"Verantwortung",en:"Responsibility"},{de:"Gerechtigkeit",en:"Justice"},{de:"Freiheit",en:"Freedom"},
    {de:"Gleichgewicht",en:"Balance"},{de:"Einfluss",en:"Influence"},{de:"Wirkung",en:"Effect"},
    {de:"Beziehung",en:"Relationship"},{de:"Voraussetzung",en:"Prerequisite"},{de:"Herausforderung",en:"Challenge"},
    {de:"Ursache",en:"Cause"},{de:"Folge",en:"Consequence"},{de:"Merkmal",en:"Characteristic"},
    {de:"Umgebung",en:"Surroundings"},{de:"Verhalten",en:"Behaviour"},{de:"Bewusstsein",en:"Awareness"},
    {de:"Überzeugung",en:"Conviction"},{de:"Erkenntnis",en:"Insight"},{de:"Annahme",en:"Assumption"},
    {de:"Beschreibung",en:"Description"},{de:"Vergleich",en:"Comparison"},{de:"Grundlage",en:"Foundation"},
    {de:"Ausnahme",en:"Exception"},{de:"Maßnahme",en:"Measure"},{de:"Zusammenarbeit",en:"Cooperation"},
    {de:"Unterstützung",en:"Support"},{de:"Umsetzung",en:"Implementation"},{de:"Durchführung",en:"Execution"},
    {de:"Beitrag",en:"Contribution"},{de:"Wachstum",en:"Growth"},{de:"Wandel",en:"Transformation"},
    {de:"Fortschritt",en:"Progress"},{de:"Rückschlag",en:"Setback"},{de:"Ergebnis",en:"Result"},
    {de:"Ziel",en:"Goal"},{de:"Strategie",en:"Strategy"},{de:"Konzept",en:"Concept"},
    {de:"Ansatz",en:"Approach"},{de:"Methode",en:"Method"},{de:"Prozess",en:"Process"},
    {de:"Struktur",en:"Structure"},{de:"Rahmen",en:"Framework"},{de:"Bereich",en:"Field"},
    {de:"Ebene",en:"Level"},{de:"Aspekt",en:"Aspect"},{de:"Faktor",en:"Factor"},
    {de:"Rolle",en:"Role"},{de:"Funktion",en:"Function"},{de:"Pflicht",en:"Duty"},
    {de:"Recht",en:"Right"},{de:"Gesetz",en:"Law"},{de:"Regel",en:"Rule"},
    {de:"Wert",en:"Value"},{de:"Prinzip",en:"Principle"},{de:"Haltung",en:"Stance"},
    {de:"Standpunkt",en:"Viewpoint"},{de:"Perspektive",en:"Perspective"},{de:"Argument",en:"Argument"},
    {de:"Begründung",en:"Justification"},{de:"Kritik",en:"Criticism"},{de:"Diskussion",en:"Discussion"},
    {de:"Konflikt",en:"Conflict"},{de:"Kompromiss",en:"Compromise"},{de:"Einigung",en:"Agreement"},
    {de:"Verständnis",en:"Understanding"},{de:"Kommunikation",en:"Communication"},{de:"Schlussfolgerung",en:"Conclusion"},
    {de:"Hypothese",en:"Hypothesis"},{de:"Forschung",en:"Research"},{de:"Untersuchung",en:"Investigation"},
    {de:"Analyse",en:"Analysis"},{de:"Bewertung",en:"Assessment"},{de:"Verbesserung",en:"Improvement"},
    {de:"Anpassung",en:"Adaptation"},{de:"Reaktion",en:"Reaction"},{de:"Auswirkung",en:"Impact"},
    {de:"Risiko",en:"Risk"},{de:"Chance",en:"Opportunity"},{de:"Zusammenfassung",en:"Summary"},
    {de:"Theorie",en:"Theory"},{de:"Sichtweise",en:"Point of view"},{de:"Debatte",en:"Debate"},
    {de:"Lösung",en:"Solution"},{de:"Fähigkeit",en:"Ability"},{de:"Kenntnis",en:"Knowledge"},
    {de:"Bedeutung",en:"Significance"},{de:"Einschätzung",en:"Judgement"},{de:"Nachweis",en:"Evidence"},
    {de:"Behauptung",en:"Claim"},{de:"Stellungnahme",en:"Statement"},{de:"Auffassung",en:"View"},
    {de:"Absicht",en:"Intention"},{de:"Zweck",en:"Purpose"},{de:"Notwendigkeit",en:"Necessity"},
    {de:"Bereitschaft",en:"Willingness"},{de:"Eigenschaft",en:"Trait"},{de:"Zustand",en:"Condition"},
    {de:"Demokratie",en:"Democracy"},{de:"Politik",en:"Politics"},{de:"Regierung",en:"Government"},
    {de:"Wirtschaft",en:"Economy"},{de:"Globalisierung",en:"Globalisation"},{de:"Integration",en:"Integration"},
    {de:"Minderheit",en:"Minority"},{de:"Mehrheit",en:"Majority"},{de:"Teilnahme",en:"Participation"},
    {de:"Bürgerrecht",en:"Civil right"},{de:"Menschenrecht",en:"Human right"},{de:"Gleichheit",en:"Equality"},
    {de:"Diskriminierung",en:"Discrimination"},{de:"Vorurteil",en:"Prejudice"},{de:"Toleranz",en:"Tolerance"},
    {de:"Nachhaltigkeit",en:"Sustainability"},{de:"Klimawandel",en:"Climate change"},{de:"Umweltverschmutzung",en:"Pollution"},
    {de:"Energieverbrauch",en:"Energy consumption"},{de:"Recycling",en:"Recycling"},{de:"Naturschutz",en:"Conservation"},
    {de:"Artenvielfalt",en:"Biodiversity"},{de:"Lebensraum",en:"Habitat"},{de:"Karriere",en:"Career"},
    {de:"Kompetenz",en:"Competence"},{de:"Qualifikation",en:"Qualification"},{de:"Weiterbildung",en:"Further training"},
    {de:"Leistung",en:"Performance"},{de:"Initiative",en:"Initiative"},{de:"Engagement",en:"Commitment"},
    {de:"Motivation",en:"Motivation"},{de:"Teamarbeit",en:"Teamwork"},{de:"Projekt",en:"Project"},
    {de:"Wohlbefinden",en:"Well-being"},{de:"Lebensqualität",en:"Quality of life"},{de:"Ernährung",en:"Nutrition"},
    {de:"Bewegung",en:"Exercise"},{de:"Erholung",en:"Recovery"},{de:"Schlafmangel",en:"Sleep deprivation"},
    {de:"Sucht",en:"Addiction"},{de:"Prävention",en:"Prevention"},{de:"Bildungssystem",en:"Education system"},
    {de:"Lehrplan",en:"Curriculum"},{de:"Kreativität",en:"Creativity"},{de:"Kulturerbe",en:"Cultural heritage"},
    {de:"Tradition",en:"Tradition"},{de:"Vielfalt",en:"Diversity"},{de:"Austausch",en:"Exchange"},
    {de:"Berichterstattung",en:"Reporting"},{de:"Glaubwürdigkeit",en:"Credibility"},{de:"Quelle",en:"Source"},
    {de:"Manipulation",en:"Manipulation"},{de:"Transparenz",en:"Transparency"},{de:"Öffentlichkeit",en:"Public sphere"},
    {de:"Reichweite",en:"Reach"},{de:"Digitalisierung",en:"Digitalisation"},{de:"Automatisierung",en:"Automation"},
    {de:"Datenschutz",en:"Data protection"},{de:"Vernetzung",en:"Networking"},{de:"Innovation",en:"Innovation"},
    {de:"Technologie",en:"Technology"},{de:"Wirklichkeit",en:"Reality"},{de:"Wahrheit",en:"Truth"},
    {de:"Irrtum",en:"Error"},{de:"Missverständnis",en:"Misunderstanding"},{de:"Priorität",en:"Priority"},
  ],
};

const LEVEL_COLORS = {
  A1: { bg:"#f0fdf4", accent:"#166534", soft:"#bbf7d0", text:"#14532d", badge:"#16a34a" },
  A2: { bg:"#eff6ff", accent:"#1e40af", soft:"#bfdbfe", text:"#1e3a8a", badge:"#2563eb" },
  B1: { bg:"#fdf2f8", accent:"#86198f", soft:"#f5d0fe", text:"#701a75", badge:"#a21caf" },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function buildRound(words) {
  const ten = words.slice(0, 10);
  return { words: ten, deWords: shuffle(ten.map(w=>w.de)), enWords: shuffle(ten.map(w=>w.en)) };
}

// ═══════════════════════════════════════════════════════════════════════════════
// FLASHCARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
function FlashcardMode({ level, colors, onBack, usedKeys }) {
  const pool = VOCAB_POOL[level];
  const used = usedKeys.current[level];

  function getCards() {
    let unseen = pool.filter(w => !used.has("fc_" + w.de));
    if (unseen.length < 20) { 
      // reset flashcard tracking only
      pool.forEach(w => used.delete("fc_" + w.de));
      unseen = [...pool];
    }
    const picked = shuffle(unseen).slice(0, 20);
    picked.forEach(w => used.add("fc_" + w.de));
    return picked;
  }

  const [cards, setCards]           = useState(() => getCards());
  const [index, setIndex]           = useState(0);
  const [flipped, setFlipped]       = useState(false);
  const [showFront, setShowFront]   = useState(true); // de→en or en→de
  const [known, setKnown]           = useState([]);
  const [almost, setAlmost]         = useState([]);
  const [nope, setNope]             = useState([]);
  const [queue, setQueue]           = useState(null); // null = first pass
  const [done, setDone]             = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [direction, setDirection]   = useState("de"); // "de" show German, guess English; "en" vice versa

  const card = queue ? queue[index] : cards[index];
  const total = queue ? queue.length : cards.length;

  function flip() {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => { setFlipped(f => !f); setIsFlipping(false); }, 150);
  }

  function rate(result) {
    const cur = card;
    const nextIndex = index + 1;
    if (result === "know")   setKnown(p => [...p, cur]);
    if (result === "almost") setAlmost(p => [...p, cur]);
    if (result === "nope")   setNope(p => [...p, cur]);

    setFlipped(false);
    setTimeout(() => {
      if (nextIndex >= total) {
        // Build next queue from nope + almost
        const repeat = [...(result === "nope" ? [cur] : []), ...(result === "almost" ? [cur] : [])];
        const prevNope   = result === "nope"   ? [] : nope;
        const prevAlmost = result === "almost" ? [] : almost;
        const repeatAll  = shuffle([...prevNope, ...prevAlmost, ...repeat]);
        if (repeatAll.length === 0) {
          setDone(true);
        } else {
          setQueue(repeatAll);
          setIndex(0);
        }
      } else {
        setIndex(nextIndex);
      }
    }, 180);
  }

  function restart() {
    const fresh = getCards();
    setCards(fresh);
    setIndex(0);
    setFlipped(false);
    setKnown([]); setAlmost([]); setNope([]);
    setQueue(null);
    setDone(false);
  }

  const frontWord = direction === "de" ? card?.de : card?.en;
  const backWord  = direction === "de" ? card?.en : card?.de;
  const frontLang = direction === "de" ? "Deutsch" : "English";
  const backLang  = direction === "de" ? "English" : "Deutsch";

  const passNum = queue ? 2 : 1;

  if (done) {
    const pct = Math.round((known.length / (known.length + almost.length + nope.length + 1e-9)) * 100);
    return (
      <div style={{ ...S.page, background: colors.bg }}>
        <div style={S.summaryWrap}>
          <div style={S.trophyIcon}>🎓</div>
          <h2 style={{ ...S.summaryTitle, color: colors.accent }}>Deck Complete!</h2>
          <p style={{ ...S.summarySub, color: colors.text }}>You reviewed all cards</p>
          <div style={S.statsRow}>
            {[["✅ Know it", known.length], ["🌀 Almost", almost.length], ["❌ Nope", nope.length]].map(([label,val]) => (
              <div key={label} style={{ ...S.statBox, borderColor: colors.soft }}>
                <span style={{ ...S.statNum, color: colors.accent }}>{val}</span>
                <span style={{ ...S.statLabel }}>{label}</span>
              </div>
            ))}
          </div>
          <button onClick={restart} style={{ ...S.btn, background: colors.accent, marginBottom: 12 }}>
            🔀 New Deck
          </button>
          <button onClick={onBack} style={{ ...S.btnOutline, borderColor: colors.accent, color: colors.accent }}>
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...S.page, background: colors.bg }}>
      {/* Header */}
      <div style={S.header}>
        <button onClick={onBack} style={{ ...S.backBtn, color: colors.accent }}>← Back</button>
        <span style={{ ...S.lvlPill, background: colors.badge }}>{level}</span>
        <span style={{ ...S.roundLabel, color: colors.text }}>
          {queue ? `Repeat pass · ${index+1}/${total}` : `Card ${index+1} / ${total}`}
        </span>
      </div>

      {/* Progress */}
      <div style={S.progressOuter}>
        <div style={{ ...S.progressInner, width:`${((index)/total)*100}%`, background: colors.badge }} />
      </div>

      {/* Direction toggle */}
      <div style={S.fcToggleRow}>
        <span style={{ ...S.fcToggleLabel, color: colors.text }}>Show:</span>
        <button
          onClick={() => { setDirection("de"); setFlipped(false); }}
          style={{ ...S.fcToggleBtn, background: direction==="de" ? colors.accent : "#fff",
            color: direction==="de" ? "#fff" : colors.text, borderColor: colors.accent }}>
          DE → EN
        </button>
        <button
          onClick={() => { setDirection("en"); setFlipped(false); }}
          style={{ ...S.fcToggleBtn, background: direction==="en" ? colors.accent : "#fff",
            color: direction==="en" ? "#fff" : colors.text, borderColor: colors.accent }}>
          EN → DE
        </button>
      </div>

      {/* Card */}
      <div style={S.fcScene} onClick={flip}>
        <div style={{
          ...S.fcCard,
          borderColor: colors.soft,
          boxShadow: `0 8px 32px ${colors.accent}22`,
          transform: isFlipping ? "scale(0.96)" : "scale(1)",
          transition: "transform 0.15s ease",
        }}>
          <div style={{ ...S.fcLangBadge, background: flipped ? colors.badge : colors.accent }}>
            {flipped ? backLang : frontLang}
          </div>
          <div style={{ ...S.fcWord, color: colors.accent }}>
            {flipped ? backWord : frontWord}
          </div>
          {!flipped && (
            <div style={{ ...S.fcHint, color: colors.text }}>Tap to reveal</div>
          )}
          {flipped && (
            <div style={{ ...S.fcHint, color: colors.text }}>How well did you know it?</div>
          )}
        </div>
      </div>

      {/* Rating buttons — only shown after flip */}
      {flipped ? (
        <div style={S.fcRatingRow}>
          <button onClick={() => rate("nope")} style={{ ...S.fcRateBtn, background:"#fef2f2", borderColor:"#fca5a5", color:"#991b1b" }}>
            ❌<br/><span style={S.fcRateLabel}>Nope</span>
          </button>
          <button onClick={() => rate("almost")} style={{ ...S.fcRateBtn, background:"#fffbeb", borderColor:"#fcd34d", color:"#92400e" }}>
            🌀<br/><span style={S.fcRateLabel}>Almost</span>
          </button>
          <button onClick={() => rate("know")} style={{ ...S.fcRateBtn, background:"#f0fdf4", borderColor:"#86efac", color:"#166534" }}>
            ✅<br/><span style={S.fcRateLabel}>Know it!</span>
          </button>
        </div>
      ) : (
        <div style={S.fcRatingRow}>
          <button onClick={flip} style={{ ...S.btn, background: colors.accent, maxWidth:280, margin:"0 auto" }}>
            Reveal Answer
          </button>
        </div>
      )}

      {/* Legend */}
      <div style={{ ...S.fcLegend, color: colors.text }}>
        ✅ {known.length} &nbsp;·&nbsp; 🌀 {almost.length} &nbsp;·&nbsp; ❌ {nope.length}
        {queue && <span style={{ marginLeft:12, fontStyle:"italic" }}>Repeat pass — {total} cards to review</span>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MATCHING GAME COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
function MatchingGame({ level, colors, onBack, usedKeys }) {
  const pool = VOCAB_POOL[level];
  const used = usedKeys.current[level];

  function getThirty() {
    let unseen = pool.filter(w => !used.has(w.de));
    if (unseen.length < 30) { used.clear(); unseen = [...pool]; }
    const thirty = shuffle(unseen).slice(0, 30);
    thirty.forEach(w => used.add(w.de));
    return thirty;
  }

  const [sessionWords]  = useState(() => getThirty());
  const [queue, setQueue]           = useState(() => shuffle([...sessionWords]));
  const [mistakePool, setMistakePool] = useState([]);
  const [round, setRound]           = useState(() => buildRound(shuffle([...sessionWords])));
  const [selectedDe, setSelectedDe] = useState(null);
  const [selectedEn, setSelectedEn] = useState(null);
  const [matched, setMatched]       = useState([]);
  const [wrongFlash, setWrongFlash] = useState([]);
  const [roundResults, setRoundResults] = useState([]);
  const [roundDone, setRoundDone]   = useState(false);
  const [totalCorrect, setTotalCorrect]   = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [completedWords, setCompletedWords] = useState([]);
  const [done, setDone]             = useState(false);

  function launchRound(q, mistakes) {
    const mistakeSample = mistakes.slice(0, 3);
    const remaining = q.filter(w => !mistakeSample.find(m => m.de === w.de));
    const p = [...mistakeSample, ...remaining].slice(0, 10);
    setRound(buildRound(p));
    setSelectedDe(null); setSelectedEn(null);
    setMatched([]); setWrongFlash([]);
    setRoundResults([]); setRoundDone(false);
  }

  useEffect(() => {
    if (!selectedDe || !selectedEn || !round) return;
    const correct = round.words.find(w => w.de === selectedDe && w.en === selectedEn);
    setTotalAttempts(p => p+1);
    if (correct) {
      setTotalCorrect(p => p+1);
      const nm = [...matched, selectedDe];
      setMatched(nm);
      setRoundResults(p => [...p, {de:selectedDe, en:selectedEn, correct:true}]);
      setSelectedDe(null); setSelectedEn(null);
      if (nm.length === round.words.length) setTimeout(() => setRoundDone(true), 400);
    } else {
      setWrongFlash([selectedDe, selectedEn]);
      setRoundResults(p => [...p, {de:selectedDe, en:selectedEn, correct:false}]);
      setTimeout(() => { setWrongFlash([]); setSelectedDe(null); setSelectedEn(null); }, 700);
    }
  }, [selectedDe, selectedEn]);

  function nextRound() {
    const wrongDe    = roundResults.filter(r => !r.correct).map(r => r.de);
    const wrongWords = round.words.filter(w => wrongDe.includes(w.de));
    const correctDe  = round.words.filter(w => !wrongDe.includes(w.de)).map(w => w.de);
    const newQueue   = queue.filter(w => !correctDe.includes(w.de));
    const newCompleted = [...completedWords, ...round.words.filter(w => !wrongDe.includes(w.de))];
    const newMistakes  = [...new Map([...mistakePool, ...wrongWords].map(w=>[w.de,w])).values()];
    setQueue(newQueue); setCompletedWords(newCompleted); setMistakePool(newMistakes);
    if (newQueue.length === 0 && newMistakes.length === 0) setDone(true);
    else launchRound(newQueue, newMistakes);
  }

  const getDeState = word => {
    if (matched.includes(word)) return "matched";
    if (wrongFlash.includes(word)) return "wrong";
    if (selectedDe === word) return "selected";
    return "idle";
  };
  const getEnState = word => {
    const parentDe = round?.words.find(w => w.en === word)?.de;
    if (matched.includes(parentDe)) return "matched";
    if (wrongFlash.includes(word)) return "wrong";
    if (selectedEn === word) return "selected";
    return "idle";
  };

  const progress = (completedWords.length / sessionWords.length) * 100;
  const roundNum = Math.ceil(completedWords.length / 10) + 1;

  if (done) {
    const pct = totalAttempts > 0 ? Math.round((totalCorrect/totalAttempts)*100) : 100;
    return (
      <div style={{ ...S.page, background: colors.bg }}>
        <div style={S.summaryWrap}>
          <div style={S.trophyIcon}>🏆</div>
          <h2 style={{ ...S.summaryTitle, color: colors.accent }}>Level {level} Complete!</h2>
          <p style={{ ...S.summarySub, color: colors.text }}>All 30 words mastered</p>
          <div style={S.statsRow}>
            {[["Accuracy",pct+"%"],["Correct",totalCorrect],["Tries",totalAttempts]].map(([label,val]) => (
              <div key={label} style={{ ...S.statBox, borderColor: colors.soft }}>
                <span style={{ ...S.statNum, color: colors.accent }}>{val}</span>
                <span style={S.statLabel}>{label}</span>
              </div>
            ))}
          </div>
          <button onClick={onBack} style={{ ...S.btn, background: colors.accent, marginBottom:12 }}>← Back to Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...S.page, background: colors.bg }}>
      <div style={S.header}>
        <button onClick={onBack} style={{ ...S.backBtn, color: colors.accent }}>← Back</button>
        <span style={{ ...S.lvlPill, background: colors.badge }}>{level}</span>
        <span style={{ ...S.roundLabel, color: colors.text }}>Round {roundNum}</span>
      </div>
      <div style={S.progressOuter}>
        <div style={{ ...S.progressInner, width:`${progress}%`, background: colors.badge }} />
      </div>
      <div style={{ ...S.progressText, color: colors.text }}>{completedWords.length} / {sessionWords.length} mastered</div>

      {!roundDone ? (
        <>
          <p style={{ ...S.instruction, color: colors.text }}>Tap a German word, then its English match</p>
          <div style={S.columns}>
            <div style={S.col}>
              <div style={{ ...S.colHeader, background: colors.accent }}>Deutsch</div>
              {round?.deWords.map(word => (
                <button key={word} disabled={getDeState(word)==="matched"}
                  onClick={() => getDeState(word)!=="matched" && setSelectedDe(word)}
                  style={wordBtn(getDeState(word), colors)}>{word}</button>
              ))}
            </div>
            <div style={S.col}>
              <div style={{ ...S.colHeader, background: colors.accent }}>English</div>
              {round?.enWords.map(word => {
                const st = getEnState(word);
                return (
                  <button key={word} disabled={st==="matched"}
                    onClick={() => st!=="matched" && setSelectedEn(word)}
                    style={wordBtn(st, colors)}>{word}</button>
                );
              })}
            </div>
          </div>
          <div style={{ ...S.matchCount, color: colors.text }}>{matched.length} / {round?.words.length} matched</div>
        </>
      ) : (
        <div style={S.roundDonePanel}>
          <div style={S.roundDoneIcon}>✅</div>
          <h3 style={{ ...S.roundDoneTitle, color: colors.accent }}>Round Complete!</h3>
          <div style={S.resultsList}>
            {round?.words.map(w => {
              const wasWrong = roundResults.some(r => r.de === w.de && !r.correct);
              return (
                <div key={w.de} style={{ ...S.resultRow, borderColor: colors.soft }}>
                  <span style={S.resultDe}>{w.de}</span>
                  <span style={{ color: colors.text, fontSize:13 }}>→</span>
                  <span style={S.resultEn}>{w.en}</span>
                  <span style={{ marginLeft:"auto" }}>{wasWrong ? "🔄" : "⭐"}</span>
                </div>
              );
            })}
          </div>
          <p style={{ ...S.repeatNote, color: colors.text }}>🔄 = will repeat &nbsp;⭐ = mastered</p>
          <button onClick={nextRound} style={{ ...S.btn, background: colors.accent }}>
            {queue.length===0 && mistakePool.length===0 ? "Finish! 🎉" : "Next Round →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODE SELECTION SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function ModeSelect({ level, colors, onMode, onBack }) {
  const modes = [
    { id:"flashcard", icon:"🃏", title:"Flashcards", desc:"Flip cards, self-rate, and repeat until you know them all" },
    { id:"match",     icon:"🔗", title:"Word Match",  desc:"Connect German words to their English translations in pairs" },
  ];
  return (
    <div style={{ ...S.page, background: colors.bg }}>
      <div style={S.homeWrap}>
        <button onClick={onBack} style={{ ...S.backBtn, color: colors.accent, marginBottom:16 }}>← Back</button>
        <span style={{ ...S.lvlPill, background: colors.badge, display:"inline-block", marginBottom:12 }}>{level}</span>
        <h2 style={{ ...S.homeTitle, fontSize:30, marginBottom:8 }}>Choose a mode</h2>
        <p style={{ ...S.homeSub, fontSize:14, marginBottom:28 }}>How would you like to practise?</p>
        <div style={S.levelGrid}>
          {modes.map(m => (
            <button key={m.id} onClick={() => onMode(m.id)}
              style={{ ...S.levelCard, background:"#fff", borderColor: colors.soft, flexDirection:"column", alignItems:"flex-start", padding:"20px 22px", gap:8 }}>
              <span style={{ fontSize:32 }}>{m.icon}</span>
              <span style={{ ...S.lvlName, color: colors.accent, fontSize:18 }}>{m.title}</span>
              <span style={{ ...S.lvlDesc, color: colors.text, fontSize:13, opacity:1 }}>{m.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function GermanGame() {
  const [screen, setScreen] = useState("home"); // home | modeselect | flashcard | match
  const [level, setLevel]   = useState(null);
  const usedKeys = useRef({ A1: new Set(), A2: new Set(), B1: new Set() });
  const colors = level ? LEVEL_COLORS[level] : LEVEL_COLORS.A1;

  if (screen === "home") {
    return (
      <div style={S.page}>
        <div style={S.homeWrap}>
          <div style={S.flag}>🇩🇪</div>
          <h1 style={S.homeTitle}>Wortschatz</h1>
          <p style={S.homeSub}>Learn German vocabulary through play</p>
          <div style={S.levelGrid}>
            {["A1","A2","B1"].map(lvl => {
              const c = LEVEL_COLORS[lvl];
              const meta = { A1:["Beginner","Everyday basics"], A2:["Elementary","Common situations"], B1:["Intermediate","Abstract concepts"] };
              const seen = [...usedKeys.current[lvl]].filter(k => !k.startsWith("fc_")).length;
              return (
                <button key={lvl} onClick={() => { setLevel(lvl); setScreen("modeselect"); }}
                  style={{ ...S.levelCard, background: c.bg, borderColor: c.soft }}>
                  <span style={{ ...S.lvlBadge, background: c.badge }}>{lvl}</span>
                  <div style={S.lvlTextBlock}>
                    <span style={{ ...S.lvlName, color: c.text }}>{lvl} — {meta[lvl][0]}</span>
                    <span style={{ ...S.lvlDesc, color: c.accent }}>{meta[lvl][1]}</span>
                  </div>
                  <span style={{ ...S.lvlCount, color: c.text }}>{seen}/270 seen</span>
                </button>
              );
            })}
          </div>
          <p style={S.homeHint}>270 words per level · 2 game modes · no repeats until all seen</p>
        </div>
      </div>
    );
  }

  if (screen === "modeselect") {
    return <ModeSelect level={level} colors={colors}
      onMode={mode => setScreen(mode === "flashcard" ? "flashcard" : "match")}
      onBack={() => setScreen("home")} />;
  }

  if (screen === "flashcard") {
    return <FlashcardMode key={level+"fc"} level={level} colors={colors}
      usedKeys={usedKeys} onBack={() => setScreen("modeselect")} />;
  }

  return <MatchingGame key={level+"match"} level={level} colors={colors}
    usedKeys={usedKeys} onBack={() => setScreen("modeselect")} />;
}

// ─── WORD BUTTON STYLE ────────────────────────────────────────────────────────
function wordBtn(state, colors) {
  const base = {
    display:"block", width:"100%", textAlign:"center",
    padding:"9px 6px", marginBottom:7, borderRadius:10,
    fontSize:13, fontFamily:"Georgia, serif",
    cursor:"pointer", transition:"all 0.15s ease",
    border:"2px solid", fontWeight:600, lineHeight:1.3,
  };
  if (state==="matched")  return { ...base, background:"#f0fdf4", borderColor:"#86efac", color:"#166534", cursor:"default", opacity:0.5 };
  if (state==="wrong")    return { ...base, background:"#fef2f2", borderColor:"#fca5a5", color:"#991b1b", transform:"scale(0.97)" };
  if (state==="selected") return { ...base, background:colors.accent, borderColor:colors.accent, color:"#fff", transform:"scale(1.04)", boxShadow:`0 4px 14px ${colors.accent}44` };
  return { ...base, background:"#fff", borderColor:colors.soft, color:colors.text };
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const S = {
  page:           { minHeight:"100vh", fontFamily:"Georgia, serif", paddingBottom:40 },
  homeWrap:       { maxWidth:460, margin:"0 auto", padding:"44px 24px", textAlign:"center" },
  flag:           { fontSize:58, marginBottom:4 },
  homeTitle:      { fontSize:44, fontWeight:700, color:"#111", margin:"0 0 8px", letterSpacing:"-1.5px" },
  homeSub:        { fontSize:16, color:"#555", marginBottom:32 },
  levelGrid:      { display:"flex", flexDirection:"column", gap:12, marginBottom:24 },
  levelCard:      { padding:"16px 20px", borderRadius:14, border:"2px solid", cursor:"pointer", display:"flex", alignItems:"center", gap:12, textAlign:"left", fontFamily:"inherit" },
  lvlBadge:       { color:"#fff", fontWeight:800, fontSize:14, padding:"4px 12px", borderRadius:20, flexShrink:0 },
  lvlTextBlock:   { display:"flex", flexDirection:"column", flex:1 },
  lvlName:        { fontWeight:700, fontSize:15 },
  lvlDesc:        { fontSize:12, opacity:0.85, marginTop:2 },
  lvlCount:       { fontSize:11, opacity:0.6, flexShrink:0 },
  homeHint:       { fontSize:13, color:"#888", lineHeight:1.8 },
  header:         { display:"flex", alignItems:"center", gap:10, padding:"16px 18px 6px" },
  backBtn:        { background:"none", border:"none", fontSize:15, cursor:"pointer", fontFamily:"inherit", fontWeight:600 },
  lvlPill:        { color:"#fff", fontWeight:800, fontSize:13, padding:"3px 12px", borderRadius:20 },
  roundLabel:     { marginLeft:"auto", fontSize:14, fontWeight:600 },
  progressOuter:  { height:6, background:"#e5e7eb", margin:"4px 18px 3px", borderRadius:3 },
  progressInner:  { height:"100%", borderRadius:3, transition:"width 0.5s ease" },
  progressText:   { fontSize:12, textAlign:"right", paddingRight:18, marginBottom:2 },
  instruction:    { textAlign:"center", fontSize:14, fontStyle:"italic", margin:"2px 0 10px" },
  columns:        { display:"flex", gap:8, padding:"0 12px" },
  col:            { flex:1, minWidth:0 },
  colHeader:      { color:"#fff", textAlign:"center", fontWeight:700, fontSize:13, padding:"6px 0", borderRadius:8, marginBottom:7 },
  matchCount:     { textAlign:"center", fontSize:14, fontWeight:600, margin:"10px 0 0" },
  roundDonePanel: { maxWidth:420, margin:"8px auto", padding:"0 18px" },
  roundDoneIcon:  { fontSize:38, textAlign:"center" },
  roundDoneTitle: { fontSize:24, fontWeight:700, textAlign:"center", margin:"4px 0 12px" },
  resultsList:    { display:"flex", flexDirection:"column", gap:5, marginBottom:10 },
  resultRow:      { display:"flex", alignItems:"center", gap:8, padding:"7px 10px", background:"#fff", borderRadius:8, border:"1px solid", fontSize:13 },
  resultDe:       { fontWeight:700, minWidth:100 },
  resultEn:       { flex:1 },
  repeatNote:     { textAlign:"center", fontSize:12, marginBottom:14 },
  btn:            { display:"block", width:"100%", color:"#fff", border:"none", borderRadius:12, padding:"14px", fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"inherit" },
  btnOutline:     { display:"block", width:"100%", background:"transparent", border:"2px solid", borderRadius:12, padding:"12px", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit", marginTop:10 },
  summaryWrap:    { maxWidth:400, margin:"0 auto", padding:"48px 24px", textAlign:"center" },
  trophyIcon:     { fontSize:60 },
  summaryTitle:   { fontSize:30, fontWeight:700, margin:"8px 0 6px" },
  summarySub:     { fontSize:15, marginBottom:24 },
  statsRow:       { display:"flex", gap:12, justifyContent:"center", marginBottom:24 },
  statBox:        { flex:1, border:"2px solid", borderRadius:12, padding:"16px 8px", background:"#fff" },
  statNum:        { display:"block", fontSize:26, fontWeight:800 },
  statLabel:      { display:"block", fontSize:11, color:"#666", marginTop:2 },
  // Flashcard-specific
  fcScene:        { display:"flex", justifyContent:"center", padding:"12px 20px 8px", cursor:"pointer" },
  fcCard:         { width:"100%", maxWidth:400, minHeight:220, border:"2px solid", borderRadius:20,
                    background:"#fff", display:"flex", flexDirection:"column", alignItems:"center",
                    justifyContent:"center", padding:"28px 24px", gap:12, userSelect:"none" },
  fcLangBadge:    { color:"#fff", fontWeight:700, fontSize:12, padding:"3px 14px", borderRadius:20, letterSpacing:"0.5px" },
  fcWord:         { fontSize:36, fontWeight:700, textAlign:"center", letterSpacing:"-0.5px", lineHeight:1.2 },
  fcHint:         { fontSize:13, fontStyle:"italic", opacity:0.6 },
  fcToggleRow:    { display:"flex", alignItems:"center", gap:8, justifyContent:"center", padding:"8px 20px 0" },
  fcToggleLabel:  { fontSize:13, fontWeight:600 },
  fcToggleBtn:    { border:"2px solid", borderRadius:20, padding:"5px 16px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"Georgia, serif" },
  fcRatingRow:    { display:"flex", gap:10, padding:"12px 20px 4px", justifyContent:"center" },
  fcRateBtn:      { flex:1, maxWidth:110, border:"2px solid", borderRadius:14, padding:"12px 4px", fontSize:20, fontWeight:700,
                    cursor:"pointer", fontFamily:"Georgia, serif", lineHeight:1.4 },
  fcRateLabel:    { fontSize:12, fontWeight:600, display:"block" },
  fcLegend:       { textAlign:"center", fontSize:13, padding:"8px 20px", opacity:0.75 },
};