// /app/i18n.ts
// Centro i18n per FenyXen – landing page.
// - Locali supportati: EN, IT, FR (+ DE/ES/NL fallback a EN per ora)
// - Rilevazione: ?lang= / ?country= / Accept-Language -> fallback EN
// - Dizionari completi (en/it/fr) per: nav, hero, coverageMatrix, whyNow,
//   howItWorks, differentials, euSection, beyondEUSection, chartsSection, cta, footer
// - Nessuna chiave duplicata negli oggetti (fix build error)

export const SUPPORTED_LOCALES = ["en", "it", "fr", "de", "es", "nl"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

// ---------------------------------------------------------------------------
// Utility base

const asLocale = (v?: string | null): Locale | undefined => {
  if (!v) return undefined;
  const t = v.toLowerCase().trim();
  return (SUPPORTED_LOCALES as readonly string[]).includes(t) ? (t as Locale) : undefined;
};

const primaryTag = (acceptLanguage?: string): string | undefined => {
  if (!acceptLanguage) return undefined;
  const first = acceptLanguage.split(",")[0]?.trim();
  return first?.split("-")[0]?.toLowerCase();
};

// ---------------------------------------------------------------------------
// Mapping ISO2 -> locale (default per paese)
// (Una sola chiave per codice; niente duplicati)
export const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  // UE27 (semplificato sulle lingue attive)
  AT: "de", BE: "fr", BG: "en", HR: "en", CY: "en", CZ: "en",
  DK: "en", EE: "en", FI: "en", FR: "fr", DE: "de", GR: "en",
  HU: "en", IE: "en", IT: "it", LT: "en", LU: "fr", LV: "en",
  MT: "en", NL: "nl", PL: "en", PT: "en", RO: "en", SE: "en",
  SI: "en", SK: "en", ES: "es",

  // Oltre UE
  GB: "en",      // United Kingdom
  CH: "de",      // CH default tedesco (fr/it gestibili via UI)
  US: "en", CA: "en", AU: "en", JP: "en",
};

// Mapping NOME -> locale (retrocompatibilità con stringhe)
export const NAME_TO_LOCALE: Record<string, Locale> = {
  Austria: "de",
  Belgium: "fr",
  Bulgaria: "en",
  Croatia: "en",
  Cyprus: "en",
  Czechia: "en",
  "Czech Republic": "en",
  Denmark: "en",
  Estonia: "en",
  Finland: "en",
  France: "fr",
  Germany: "de",
  Greece: "en",
  Hungary: "en",
  Ireland: "en",
  Italy: "it",
  Latvia: "en",
  Lithuania: "en",
  Luxembourg: "fr",
  Malta: "en",
  Netherlands: "nl",
  Poland: "en",
  Portugal: "en",
  Romania: "en",
  Slovakia: "en",
  Slovenia: "en",
  Spain: "es",
  Sweden: "en",

  Switzerland: "de",
  "United Kingdom": "en",
  UK: "en",
  "United States": "en",
  US: "en",
  Canada: "en",
  Australia: "en",
  Japan: "en",
};

// ---------------------------------------------------------------------------
// Rilevazione locale

export type DetectInput = {
  langParam?: string | null;        // ?lang=it
  countryParam?: string | null;     // ?country=IT o "Italy"
  acceptLanguageHeader?: string | null; // "it-IT,it;q=0.9,en;q=0.8"
};

export function detectLocale({ langParam, countryParam, acceptLanguageHeader }: DetectInput): Locale {
  // 1) Param esplicito
  const fromParam = asLocale(langParam);
  if (fromParam) return fromParam;

  // 2) Paese (ISO2 o nome)
  const c = countryParam?.trim();
  if (c) {
    const iso2 = c.toUpperCase();
    if (COUNTRY_TO_LOCALE[iso2]) return COUNTRY_TO_LOCALE[iso2];
    const byName = NAME_TO_LOCALE[c];
    if (byName) return byName;
  }

  // 3) Accept-Language
  const headerPrimary = primaryTag(acceptLanguageHeader || undefined);
  const byHeader = asLocale(headerPrimary);
  if (byHeader) return byHeader;

  // 4) Fallback
  return DEFAULT_LOCALE;
}

// ---------------------------------------------------------------------------
// Dizionari (en/it/fr). Per de/es/nl usiamo fallback EN.

type DeepStringRecord = Record<string, string | DeepStringRecord>;

/** Dizionario inglese */
const en = {
  nav: {
    home: "Home",
    coverage: "EU Coverage",
    beyond: "Beyond EU",
    how: "How It Works",
    why: "Why Now",
    charts: "Data & Charts",
    contact: "Interest",
    language: "Language",
  },
  hero: {
    title: "Pay Equity Compliance, Done Right.",
    subtitle:
      "FenyXen helps you comply with EU Directive (EU) 2023/970 and beyond (UK, CH, JP, AU, CA, US). Vendor-agnostic, audit-ready, privacy-first.",
    ctaPrimary: "I’m interested",
    ctaSecondary: "Not for me",
  },
  coverageMatrix: {
    title: "EU Coverage (27 Member States)",
    subtitle:
      "Data-driven compliance with official sources. CSV-driven setup so you can update without changing code.",
    columns: { country: "Country", status: "Status", source: "Source" },
    status: { live: "Live", beta: "Beta", planned: "Planned" },
  },
  whyNow: {
    title: "Why Now",
    bullets: [
      "Binding regulation with penalties and reversed burden of proof.",
      "Transparent reporting timelines (2026–2027) align with budget cycles.",
      "Executive demand for defensible, audit-ready analytics.",
    ],
  },
  howItWorks: {
    title: "How It Works",
    steps: [
      "Upload or connect HR/Payroll data (CSV/SFTP/API).",
      "Compute unadjusted gap and conduct statistically robust analysis.",
      "Generate audit-ready reports and remediation playbooks.",
      "Track progress with dashboards and alerts.",
    ],
  },
  differentials: {
    title: "Why FenyXen",
    items: [
      "Regulatory-grade job evaluation & audit trail.",
      "Statistical methods beyond averages: regression, significance, explainability.",
      "CSV-driven config and multi-language UI.",
      "Privacy-friendly analytics (Plausible / Cloudflare).",
    ],
  },
  euSection: {
    title: "EU Directive (EU) 2023/970",
    note:
      "We track each Member State transposition and reporting cadence. Country data sourced from Eurostat and official portals.",
  },
  beyondEUSection: {
    title: "Beyond EU",
    countries: "United Kingdom, Switzerland, Japan, Australia, Canada, United States",
  },
  chartsSection: {
    title: "Data & Charts",
    subtitle:
      "Recent, official metrics (Eurostat, ONS, WGEA, StatCan, Pew, etc.).",
  },
  cta: {
    title: "Stay in the loop",
    interested: "I’m interested",
    notForMe: "Not for me",
    contactMail: "Contact via email",
  },
  footer: {
    rights: "© FenyXen. All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
  },
} satisfies DeepStringRecord;

/** Dizionario italiano */
const it = {
  nav: {
    home: "Home",
    coverage: "Copertura UE",
    beyond: "Oltre l’UE",
    how: "Come funziona",
    why: "Perché ora",
    charts: "Dati & Grafici",
    contact: "Interesse",
    language: "Lingua",
  },
  hero: {
    title: "Pay Equity Compliance, fatta bene.",
    subtitle:
      "FenyXen ti aiuta a rispettare la Direttiva UE (UE) 2023/970 e oltre (UK, CH, JP, AU, CA, US). Vendor-agnostic, audit-ready, privacy-first.",
    ctaPrimary: "Sono interessato",
    ctaSecondary: "Non fa per me",
  },
  coverageMatrix: {
    title: "Copertura UE (27 Stati Membri)",
    subtitle:
      "Compliance basata sui dati con fonti ufficiali. Configurazione guidata da CSV: aggiorni i dati senza cambiare il codice.",
    columns: { country: "Paese", status: "Stato", source: "Fonte" },
    status: { live: "Attivo", beta: "Beta", planned: "Pianificato" },
  },
  whyNow: {
    title: "Perché ora",
    bullets: [
      "Normativa vincolante con sanzioni e inversione dell’onere della prova.",
      "Tempistiche di reporting (2026–2027) allineate ai cicli di budget.",
      "Domanda executive per analytics difendibili e audit-ready.",
    ],
  },
  howItWorks: {
    title: "Come funziona",
    steps: [
      "Carica o collega dati HR/Payroll (CSV/SFTP/API).",
      "Calcola il gap non aggiustato e analisi statistiche robuste.",
      "Genera report audit-ready e piani di remediation.",
      "Monitora i progressi con dashboard e avvisi.",
    ],
  },
  differentials: {
    title: "Perché FenyXen",
    items: [
      "Job evaluation e audit trail a livello regolatorio.",
      "Metodi statistici oltre le medie: regressione, significatività, spiegabilità.",
      "UI multilingua e configurazione guidata da CSV.",
      "Analytics privacy-friendly (Plausible / Cloudflare).",
    ],
  },
  euSection: {
    title: "Direttiva UE (UE) 2023/970",
    note:
      "Tracciamo trasposizione e cadenza di reporting per ogni Stato Membro. Dati da Eurostat e portali ufficiali.",
  },
  beyondEUSection: {
    title: "Oltre l’UE",
    countries: "Regno Unito, Svizzera, Giappone, Australia, Canada, Stati Uniti",
  },
  chartsSection: {
    title: "Dati & Grafici",
    subtitle:
      "Metriche recenti e ufficiali (Eurostat, ONS, WGEA, StatCan, Pew, ecc.).",
  },
  cta: {
    title: "Rimani aggiornato",
    interested: "Sono interessato",
    notForMe: "Non fa per me",
    contactMail: "Contatto via email",
  },
  footer: {
    rights: "© FenyXen. Tutti i diritti riservati.",
    privacy: "Privacy",
    terms: "Termini",
  },
} satisfies DeepStringRecord;

/** Dizionario francese */
const fr = {
  nav: {
    home: "Accueil",
    coverage: "Couverture UE",
    beyond: "Au-delà de l’UE",
    how: "Comment ça marche",
    why: "Pourquoi maintenant",
    charts: "Données & Graphiques",
    contact: "Intérêt",
    language: "Langue",
  },
  hero: {
    title: "Conformité à l’égalité salariale, sans compromis.",
    subtitle:
      "FenyXen vous aide à respecter la Directive (UE) 2023/970 et au-delà (UK, CH, JP, AU, CA, US). Indépendant fournisseurs, prêt pour l’audit, confidentialité d’abord.",
    ctaPrimary: "Je suis intéressé",
    ctaSecondary: "Pas pour moi",
  },
  coverageMatrix: {
    title: "Couverture UE (27 États membres)",
    subtitle:
      "Conformité pilotée par les données avec sources officielles. Configuration basée sur CSV : mettez à jour sans modifier le code.",
    columns: { country: "Pays", status: "Statut", source: "Source" },
    status: { live: "Actif", beta: "Beta", planned: "Planifié" },
  },
  whyNow: {
    title: "Pourquoi maintenant",
    bullets: [
      "Réglementation contraignante avec sanctions et renversement de la charge de la preuve.",
      "Calendrier de reporting (2026–2027) aligné aux cycles budgétaires.",
      "Demande exécutive pour des analyses défendables et prêtes pour l’audit.",
    ],
  },
  howItWorks: {
    title: "Fonctionnement",
    steps: [
      "Importez / connectez les données RH/Paie (CSV/SFTP/API).",
      "Calculez l’écart non ajusté et menez des analyses statistiques robustes.",
      "Générez des rapports prêts pour l’audit et des plans de remédiation.",
      "Suivez les progrès via tableaux de bord et alertes.",
    ],
  },
  differentials: {
    title: "Pourquoi FenyXen",
    items: [
      "Évaluation des emplois et traçabilité au niveau réglementaire.",
      "Méthodes statistiques avancées : régression, significativité, explicabilité.",
      "Interface multilingue et configuration pilotée par CSV.",
      "Analytics respectueux de la vie privée (Plausible / Cloudflare).",
    ],
  },
  euSection: {
    title: "Directive (UE) 2023/970",
    note:
      "Nous suivons la transposition et la cadence de reporting par État membre. Données Eurostat et portails officiels.",
  },
  beyondEUSection: {
    title: "Au-delà de l’UE",
    countries: "Royaume-Uni, Suisse, Japon, Australie, Canada, États-Unis",
  },
  chartsSection: {
    title: "Données & Graphiques",
    subtitle:
      "Mesures récentes et officielles (Eurostat, ONS, WGEA, StatCan, Pew, etc.).",
  },
  cta: {
    title: "Restez informé",
    interested: "Je suis intéressé",
    notForMe: "Pas pour moi",
    contactMail: "Contact par e-mail",
  },
  footer: {
    rights: "© FenyXen. Tous droits réservés.",
    privacy: "Confidentialité",
    terms: "Conditions",
  },
} satisfies DeepStringRecord;

// ---------------------------------------------------------------------------
// Esportiamo etichette lingua e i dizionari

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
  nl: "Nederlands",
};

const DICTS: Record<Locale, DeepStringRecord> = {
  en,
  it,
  fr,
  de: en, // fallback
  es: en, // fallback (sostituisci quando pronto)
  nl: en, // fallback
};

export type Dictionary = typeof en;

// Ritorna un dizionario (sincrono ma in Promise per compatibilità API)
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const l = asLocale(locale) ?? DEFAULT_LOCALE;
  return DICTS[l] as Dictionary;
}

// Accesso a chiave con path "a.b.c"
export function t(locale: Locale, path: string, fallback = ""): string {
  const dict = DICTS[asLocale(locale) ?? DEFAULT_LOCALE];
  const parts = path.split(".");
  let cur: any = dict;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in cur) cur = (cur as any)[p];
    else return fallback;
  }
  return typeof cur === "string" ? cur : fallback;
}

// Helper: coerce qualsiasi input a Locale
export const coerceToLocale = (value?: string | null): Locale =>
  detectLocale({ langParam: value });

// ---------------------------------------------------------------------------
// Fine i18n.ts
