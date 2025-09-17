// app/i18n.ts
// i18n centrale per FenyXen — SOLO EN e IT, senza chiavi duplicate.
// Rilevazione: ?lang= / ?country= / Accept-Language -> fallback EN.

export const SUPPORTED_LOCALES = ["en", "it"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

// ---------- utils ----------
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

// ---------- mappe paese -> locale ----------
// Una sola chiave per codice/paese (NO duplicati)
export const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  // UE (semplificato: EN o IT per ora)
  AT: "en", BE: "en", BG: "en", HR: "en", CY: "en", CZ: "en",
  DK: "en", EE: "en", FI: "en", FR: "en", DE: "en", GR: "en",
  HU: "en", IE: "en", IT: "it", LT: "en", LU: "en", LV: "en",
  MT: "en", NL: "en", PL: "en", PT: "en", RO: "en", SE: "en",
  SI: "en", SK: "en", ES: "en",

  // Beyond EU
  GB: "en", CH: "en", US: "en", CA: "en", AU: "en", JP: "en",
};

// nomi paese -> locale (retrocompatibilità stringhe libere)
export const NAME_TO_LOCALE: Record<string, Locale> = {
  Austria: "en",
  Belgium: "en",
  Bulgaria: "en",
  Croatia: "en",
  Cyprus: "en",
  Czechia: "en",
  "Czech Republic": "en",
  Denmark: "en",
  Estonia: "en",
  Finland: "en",
  France: "en",
  Germany: "en",
  Greece: "en",
  Hungary: "en",
  Ireland: "en",
  Italy: "it",
  Latvia: "en",
  Lithuania: "en",
  Luxembourg: "en",
  Malta: "en",
  Netherlands: "en",
  Poland: "en",
  Portugal: "en",
  Romania: "en",
  Slovakia: "en",
  Slovenia: "en",
  Spain: "en",
  Sweden: "en",

  Switzerland: "en",
  "United Kingdom": "en",
  UK: "en",
  "United States": "en",
  US: "en",
  Canada: "en",
  Australia: "en",
  Japan: "en",
};

// ---------- rilevazione locale ----------
export type DetectInput = {
  langParam?: string | null;
  countryParam?: string | null;        // ISO2 (IT) o nome ("Italy")
  acceptLanguageHeader?: string | null;
};

export function detectLocale({ langParam, countryParam, acceptLanguageHeader }: DetectInput): Locale {
  // 1) query ?lang=
  const fromParam = asLocale(langParam);
  if (fromParam) return fromParam;

  // 2) query ?country=
  const c = countryParam?.trim();
  if (c) {
    const iso2 = c.toUpperCase();
    if (COUNTRY_TO_LOCALE[iso2]) return COUNTRY_TO_LOCALE[iso2];
    if (NAME_TO_LOCALE[c]) return NAME_TO_LOCALE[c];
  }

  // 3) Accept-Language
  const first = primaryTag(acceptLanguageHeader || undefined);
  const byHeader = asLocale(first);
  if (byHeader) return byHeader;

  // 4) fallback
  return DEFAULT_LOCALE;
}

// ---------- dizionari (EN/IT) ----------
type DeepStringRecord = Record<string, string | DeepStringRecord>;

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
      "FenyXen helps you comply with the EU Directive (EU) 2023/970 and beyond (UK, CH, JP, AU, CA, US). Vendor-agnostic, audit-ready, privacy-first.",
    ctaPrimary: "I’m interested",
    ctaSecondary: "Not for me",
  },
  coverageMatrix: {
    title: "EU Coverage (27 Member States)",
    subtitle:
      "Data-driven compliance with official sources. CSV-driven setup: update data without touching code.",
    columns: { country: "Country", status: "Status", source: "Source" },
    status: { live: "Live", beta: "Beta", planned: "Planned" },
  },
  whyNow: {
    title: "Why Now",
    bullets: [
      "Binding regulation with penalties and reversed burden of proof.",
      "Reporting timeline (2026–2027) aligns with budget cycles.",
      "Executive demand for defensible, audit-ready analytics.",
    ],
  },
  howItWorks: {
    title: "How It Works",
    steps: [
      "Upload/connect HR & Payroll data (CSV/SFTP/API).",
      "Compute unadjusted gap and robust statistical analysis.",
      "Generate audit-ready reports and remediation playbooks.",
      "Track progress via dashboards and alerts.",
    ],
  },
  differentials: {
    title: "Why FenyXen",
    items: [
      "Regulatory-grade job evaluation & audit trail.",
      "Statistics beyond averages: regression, significance, explainability.",
      "CSV-driven config and multilingual UI.",
      "Privacy-friendly analytics (Plausible / Cloudflare).",
    ],
  },
  euSection: {
    title: "EU Directive (EU) 2023/970",
    note:
      "We track Member State transposition & reporting cadence. Sources: Eurostat and official portals.",
  },
  beyondEUSection: {
    title: "Beyond EU",
    countries: "United Kingdom, Switzerland, Japan, Australia, Canada, United States",
  },
  chartsSection: {
    title: "Data & Charts",
    subtitle: "Recent, official metrics (Eurostat, ONS, WGEA, StatCan, Pew, etc.).",
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
      "Compliance guidata dai dati con fonti ufficiali. Configurazione CSV: aggiorni i dati senza toccare il codice.",
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
      "Carica/collega dati HR & Payroll (CSV/SFTP/API).",
      "Calcolo gap non aggiustato e analisi statistiche robuste.",
      "Report audit-ready e piani di remediation.",
      "Monitoraggio con dashboard e alert.",
    ],
  },
  differentials: {
    title: "Perché FenyXen",
    items: [
      "Job evaluation e audit trail a livello regolatorio.",
      "Oltre le medie: regressione, significatività, spiegabilità.",
      "Config CSV e UI multilingua.",
      "Analytics privacy-friendly (Plausible / Cloudflare).",
    ],
  },
  euSection: {
    title: "Direttiva (UE) 2023/970",
    note:
      "Tracciamo trasposizione e cadenza di reporting per ogni Stato Membro. Fonti: Eurostat e portali ufficiali.",
  },
  beyondEUSection: {
    title: "Oltre l’UE",
    countries: "Regno Unito, Svizzera, Giappone, Australia, Canada, Stati Uniti",
  },
  chartsSection: {
    title: "Dati & Grafici",
    subtitle: "Metriche recenti e ufficiali (Eurostat, ONS, WGEA, StatCan, Pew, ecc.).",
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

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
};

const DICTS: Record<Locale, DeepStringRecord> = { en, it };
export type Dictionary = typeof en;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const l = asLocale(locale) ?? DEFAULT_LOCALE;
  return DICTS[l] as Dictionary;
}

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

export const coerceToLocale = (value?: string | null): Locale =>
  detectLocale({ langParam: value });
