// /app/data.ts
// Dati centralizzati per le card "headline" dei grafici.
// Manteniamo 7 card: EU, UK, CA, US, AU, CH, JP.
// Nota: CH e JP usano metriche diverse da Eurostat; la metrica è mostrata in card.

export type StatItem = {
  code: string;               // "EU", ISO2 o sigla paese
  value: number | null;       // percentuale (es. 12.3) o null per "—"
  source: string;             // stringa visibile della fonte
  href: string;               // link alla fonte ufficiale
  year: string;               // anno/periodo mostrato in card
  metric?: string;            // nota metrica aggiuntiva (es. "FSO, mean, private sector")
};

// UE — media 2023 (Eurostat sdg_05_20)
export const EU_AGGREGATE: StatItem = {
  code: "EU",
  value: 12.0,
  source: "Eurostat (accessed Sep 2025)",
  href: "https://ec.europa.eu/eurostat/statistics-explained/index.php/Gender_pay_gap_statistics",
  year: "2023",
  metric: "Unadjusted GPG (hourly pay)",
};

// UK — ONS Apr 2024 (tutti i dipendenti)
export const UK_CARD: StatItem = {
  code: "UK",
  value: 13.1,
  source: "ONS (published Oct 2024)",
  href: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2024",
  year: "Apr 2024",
  metric: "All employees, median hourly",
};

// Canada — Pay Equity Commissioner 2024
export const CA_CARD: StatItem = {
  code: "CA",
  value: 13.0,
  source: "Pay Equity Commissioner (Jun 2025)",
  href: "https://www.chrc-ccdp.gc.ca/resources/publications/pay-equity-commissioners-2024-2025-annual-report",
  year: "2024",
  metric: "Women earn 87¢ per $1",
};

// USA — Pew Research 2024
export const US_CARD: StatItem = {
  code: "US",
  value: 15.0,
  source: "Pew Research (Mar 2025)",
  href: "https://www.pewresearch.org/short-reads/2025/03/04/gender-pay-gap-in-us-has-narrowed-slightly-over-2-decades/",
  year: "2024",
  metric: "All workers (annual earnings)",
};

// Australia — WGEA 2024 (employer gaps)
export const AU_CARD: StatItem = {
  code: "AU",
  value: 19.0,
  source: "WGEA (Mar 2025)",
  href: "https://www.wgea.gov.au/publications/employer-gender-pay-gaps-report",
  year: "2024",
  metric: "Employer gaps published",
};

// Svizzera — FSO (Ufficio federale di statistica), settore privato totale, 2022
// Metrica: Gender pay gap (mean). La FSO pubblica anche il gap mediano (~9.5% nel 2022),
// ma qui usiamo il dato 'mean' del settore privato (serie principale FSO).
export const CH_CARD: StatItem = {
  code: "CH",
  value: 17.5,
  source: "FSO (private sector, 2022)",
  href: "https://www.bfs.admin.ch/bfs/en/home/statistics/work-income/wages-income-employment-labour-costs/earnings-structure/wage-gap.html",
  year: "2022",
  metric: "Gender pay gap (mean), private sector total",
};

// Giappone — OECD, definizione: differenza tra median earnings (full-time), 2022
export const JP_CARD: StatItem = {
  code: "JP",
  value: 22.1,
  source: "OECD (Gender wage gap, 2022)",
  href: "https://www.oecd.org/en/data/indicators/gender-wage-gap.html",
  year: "2022",
  metric: "Median earnings gap, full-time (OECD)",
};

// Collezione unica per la sezione grafici (ordine desiderato)
export const TOP_CARDS: StatItem[] = [
  EU_AGGREGATE,
  UK_CARD,
  CA_CARD,
  US_CARD,
  AU_CARD,
  CH_CARD,
  JP_CARD,
];

// Per compatibilità con altre sezioni
export const BEYOND_DATA = [UK_CARD, CA_CARD, US_CARD, AU_CARD, CH_CARD, JP_CARD];

// placeholder legacy (non più usato nella ChartsSection)
export const EU_DATA: StatItem[] = [];
