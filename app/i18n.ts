"use client";

import { useMemo, useState } from "react";

/** ==========
 *  Costanti
 *  ========== */
export const EU_CODES = [
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT",
  "LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE"
];

export const BEYOND_CODES = ["UK","CH","JP","AU","CA","US"];

/** Autoselezione lingua da ?country= (accetta codici o nomi) */
export const COUNTRY_LANG: Record<string, string> = {
  // codici
  FR: "fr", BE: "fr", DE: "de", IT: "it", ES: "es", NL: "nl", AT: "de", CH: "de",
  UK: "en", IE: "en", US: "en", CA: "en", AU: "en", JP: "en",
  // nomi (retrocompatibilità)
  France: "fr", Belgium: "fr", Germany: "de", Italy: "it", Spain: "es", Netherlands: "nl",
  Austria: "de", Switzerland: "de", UK: "en", Ireland: "en", US: "en",
  Canada: "en", Australia: "en", Japan: "en"
};

/** =================
 *  Dizionari i18n
 *  ================= */
type Dict = Record<string, string>;
export const I18N: Record<string, Dict> = {
  en: {
    brand: "FenyXen",
    // Navbar
    nav_why: "Why Now",
    nav_how: "How It Works",
    nav_diff: "Why FenyXen",
    nav_eu: "EU",
    nav_beyond: "Beyond EU",
    nav_charts: "Charts",
    nav_interest: "Interest",
    // Hero
    hero_title: "One Platform for Pay Equity Compliance",
    hero_sub:
      "FenyXen unifies analysis, remediation and audit trail for EU members — and separately UK · CH · JP · AU · CA · US.",
    coverage_matrix: "Coverage Matrix",
    footnote_cov:
      "* EU members aligned to Directive (EU) 2023/970; UK · CH · JP · AU · CA · US supported separately.",
    // Stats
    stat_eu_members: "EU members",
    stat_beyond: "Beyond EU",
    stat_audit_ready: "Audit-ready",
    stat_gdpr_light: "GDPR-light",
    stat_gdpr_light_note: "No forms",
    // Why Now
    why_title: "Why Now",
    why_p:
      "Directive (EU) 2023/970 transposition by 7 June 2026. UK annual publication. AU WGEA. CH Logib. JP disclosure. CA/US federal/state regimes.",
    why_li1: "Clear timeline → build now, compliant before 2026.",
    why_li2: "Burden of proof → traceability and signed dossiers.",
    why_li3: "Multiple stakeholders → HR, Legal, ER, Unions, Authorities.",
    deadlines_snapshot: "Deadlines Snapshot",
    deadlines_scope_col: "Scope",
    deadlines_th: "Threshold",
    deadlines_what: "What",
    deadlines_when: "When",
    deadlines_scope_eu: "EU (Members)",
    deadlines_scope_uk: "UK",
    deadlines_scope_au: "AU (WGEA)",
    deadlines_scope_ch: "CH (Logib)",
    deadlines_scope_jp: "JP",
    deadlines_scope_ca: "CA (Federal)",
    deadlines_scope_us: "US (CA example)",
    deadlines_eu_th: "100+/150+/250+",
    deadlines_eu_what: "Reporting + JPA ≥5%",
    deadlines_eu_when: "Transposition by 7 Jun 2026; first reports 2027",
    deadlines_uk_th: "≥250",
    deadlines_uk_what: "GPG publish (6 metrics)",
    deadlines_uk_when: "Snapshot 5 Apr / 31 Mar; publish +12m",
    deadlines_au_th: "≥100",
    deadlines_au_what: "WGEA report + public gaps",
    deadlines_au_when: "Annual window",
    deadlines_ch_th: "≥100",
    deadlines_ch_what: "Equal pay analysis + verify",
    deadlines_ch_when: "Cyclic (law-defined)",
    deadlines_jp_th: "≥301 (disclosure)",
    deadlines_jp_what: "Pay gap disclosure",
    deadlines_jp_when: "~3 months post FY",
    deadlines_ca_th: "≥10 (federally regulated)",
    deadlines_ca_what: "Plan + Annual Statement",
    deadlines_ca_when: "Annual; 5y review",
    deadlines_us_th: "≥100",
    deadlines_us_what: "Pay Data Report",
    deadlines_us_when: "Annual",
    // How it works
    how_title: "How It Works",
    how_desc:
      "From ingestion to signed audit packs: FenyXen operationalizes compliance with defensible analytics and a clear trail of decisions.",
    how_s1_t: "Connect Data",
    how_s1_d:
      "HRIS, Payroll, ATS or CSV. Validation, lineage and quality checks included.",
    how_s2_t: "Equal Value",
    how_s2_d:
      "Job evaluation with transparent factors; cluster roles for like-for-like analyses.",
    how_s3_t: "Gap Engine",
    how_s3_d:
      "Headline and adjusted gaps (regression/quantile), significance tests, diagnostics.",
    how_s4_t: "Remediate",
    how_s4_d:
      "What-if budgets, owners and timelines — close critical gaps within 6 months.",
    how_s5_t: "Audit Pack",
    how_s5_d:
      "Evidence Locker with versioning, access logs, signed exports for inspections.",
    // Differentials
    diff_title: "Why FenyXen",
    diff_p:
      "Built to satisfy regulators and convince boards. Enterprise security, explainability, and repeatability baked in.",
    diff_i1_t: "Audit-grade",
    diff_i1_d:
      "Evidence Locker + signed exports. Support for EU JPA, UK GOV.UK, AU WGEA, CH Logib, JP, CA, US-CA.",
    diff_i2_t: "JPA Workflow (EU)",
    diff_i2_d:
      "Trigger at ≥5% unexplained gap. Orchestrate stakeholders, measures and timelines.",
    diff_i3_t: "Global Library",
    diff_i3_d:
      "Adapters & templates for EU members + UK, CH, JP, AU, CA, US (state-aware).",
    diff_i4_t: "Vendor-agnostic",
    diff_i4_d:
      "Works with your stack. Connects securely to HRIS, payroll and data platforms.",
    audit_ready: "Audit-Ready by Design",
    audit_li1:
      "Evidence Locker: versioning, access logs, signed exports",
    audit_li2: "Model Cards: parameters, diagnostics, reproducibility",
    audit_li3: "Joint Pay Assessment (EU): orchestration",
    kpi_sample: "Sample KPI (demo)",
    kpi_caption: "to close critical gaps ≥5%",
    // EU
    eu_title: "European Union — Directive (EU) 2023/970",
    eu_p:
      "Applies to EU Member States. Reporting cadence by size, Joint Pay Assessment at ≥5% unexplained gap, full audit trail.",
    eu_b1: "Transposition by 7 June 2026",
    eu_b2:
      "First reporting windows from 2027 (250+ annual; 150–249 every 3 years; 100–149 from 2031)",
    eu_b3: "JPA workflow and inspection-proof evidence",
    eu_note: "* EU is the main perimeter; non-EU handled in a dedicated section.",
    // Beyond EU
    beyond_title: "Beyond EU — Supported Jurisdictions",
    beyond_p:
      "Not covered by the Directive but supported with native modules: UK (GPG), CH (Logib), JP (disclosure), AU (WGEA), CA (federal/provinces), US (state regimes).",
    beyond_note:
      "* Reporting models and deadlines differ by jurisdiction.",
    // Charts
    charts_title: "Official snapshots",
    charts_note:
      "Official sources, updated. Indicators are not perfectly comparable across jurisdictions.",
    charts_label_eu: "EU (2023) — Unadjusted gender pay gap",
    charts_label_uk: "UK (Apr 2024) — Gap among all employees",
    charts_label_ca: "Canada (2024) — Women earn 87¢ per $1",
    charts_label_us: "US (2024, all ages) — Gap",
    charts_label_au: "Australia (2024) — Employer gaps published",
    // Interest & footer
    interest_title: "Are you interested in our platform?",
    interest_p:
      "Help us validate the need for FenyXen. One click is enough — no forms, GDPR-safe.",
    interest_yes: "I’m Interested",
    interest_no: "Not for me",
    interest_email: "Contact us via Email",
    privacy_note:
      "Click events are measured via privacy-friendly analytics only. No personal data is stored by this site.",
    foot_legal:
      "EU Directive 2023/970 (EU members) · Plus: UK · CH · JP · AU · CA · US",
    // Country names
    country_AT: "Austria", country_BE: "Belgium", country_BG: "Bulgaria",
    country_HR: "Croatia", country_CY: "Cyprus", country_CZ: "Czechia",
    country_DK: "Denmark", country_EE: "Estonia", country_FI: "Finland",
    country_FR: "France", country_DE: "Germany", country_GR: "Greece",
    country_HU: "Hungary", country_IE: "Ireland", country_IT: "Italy",
    country_LV: "Latvia", country_LT: "Lithuania", country_LU: "Luxembourg",
    country_MT: "Malta", country_NL: "Netherlands", country_PL: "Poland",
    country_PT: "Portugal", country_RO: "Romania", country_SK: "Slovakia",
    country_SI: "Slovenia", country_ES: "Spain", country_SE: "Sweden",
    country_UK: "UK", country_CH: "Switzerland", country_JP: "Japan",
    country_AU: "Australia", country_CA: "Canada", country_US: "US"
  },

  it: {
    brand: "FenyXen",
    nav_why: "Perché ora",
    nav_how: "Come funziona",
    nav_diff: "Perché FenyXen",
    nav_eu: "UE",
    nav_beyond: "Oltre UE",
    nav_charts: "Grafici",
    nav_interest: "Interesse",
    hero_title:
      "Un’unica piattaforma per la compliance sulla parità retributiva",
    hero_sub:
      "FenyXen unifica analisi, remediation e audit trail per i Paesi UE — e, in moduli separati, UK · CH · JP · AU · CA · US.",
    coverage_matrix: "Matrice di copertura",
    footnote_cov:
      "* I Paesi UE seguono la Direttiva (UE) 2023/970; UK · CH · JP · AU · CA · US sono gestiti separatamente.",
    stat_eu_members: "Stati membri UE",
    stat_beyond: "Oltre UE",
    stat_audit_ready: "Audit-ready",
    stat_gdpr_light: "GDPR-light",
    stat_gdpr_light_note: "Nessun form",
    why_title: "Perché ora",
    why_p:
      "Direttiva (UE) 2023/970: trasposizione entro 7 giugno 2026. UK: pubblicazione annuale. AU: WGEA. CH: Logib. JP: disclosure. CA/US: regimi federali/statali.",
    why_li1:
      "Timeline chiara → costruire ora, essere compliant prima del 2026.",
    why_li2: "Onere della prova → tracciabilità ed export firmati.",
    why_li3:
      "Stakeholder multipli → HR, Legal, Rel. Industriali, Sindacati, Autorità.",
    deadlines_snapshot: "Panoramica scadenze",
    deadlines_scope_col: "Ambito",
    deadlines_th: "Soglia",
    deadlines_what: "Cosa",
    deadlines_when: "Quando",
    deadlines_scope_eu: "UE (Stati membri)",
    deadlines_scope_uk: "UK",
    deadlines_scope_au: "AU (WGEA)",
    deadlines_scope_ch: "CH (Logib)",
    deadlines_scope_jp: "JP",
    deadlines_scope_ca: "CA (Federale)",
    deadlines_scope_us: "US (es. California)",
    deadlines_eu_th: "100+/150+/250+",
    deadlines_eu_what: "Reporting + JPA ≥5%",
    deadlines_eu_when:
      "Trasposizione entro 7 giu 2026; prime finestre 2027",
    deadlines_uk_th: "≥250",
    deadlines_uk_what: "Pubblicazione GPG (6 metriche)",
    deadlines_uk_when: "Snapshot 5 apr / 31 mar; pubblica +12m",
    deadlines_au_th: "≥100",
    deadlines_au_what: "WGEA report + gap pubblici",
    deadlines_au_when: "Finestra annuale",
    deadlines_ch_th: "≥100",
    deadlines_ch_what: "Analisi equal pay + verifica",
    deadlines_ch_when: "Ciclico (per legge)",
    deadlines_jp_th: "≥301 (disclosure)",
    deadlines_jp_what: "Disclosure pay gap",
    deadlines_jp_when: "~3 mesi post FY",
    deadlines_ca_th: "≥10 (reg. federale)",
    deadlines_ca_what: "Piano + dichiarazione annuale",
    deadlines_ca_when: "Annuale; revisione 5 anni",
    deadlines_us_th: "≥100",
    deadlines_us_what: "Pay Data Report",
    deadlines_us_when: "Annuale",
    how_title: "Come funziona",
    how_desc:
      "Dall’ingestione ai pacchetti d’audit firmati: FenyXen rende operativa la compliance con analytics difendibili e tracciabilità delle decisioni.",
    how_s1_t: "Collega i dati",
    how_s1_d:
      "HRIS, Payroll, ATS o CSV. Inclusi validazione, lineage e controlli qualità.",
    how_s2_t: "Lavoro di pari valore",
    how_s2_d:
      "Job evaluation con fattori trasparenti; cluster di ruoli per analisi like-for-like.",
    how_s3_t: "Gap Engine",
    how_s3_d:
      "Gap headline e adjusted (regressione/quantile), test di significatività, diagnostiche.",
    how_s4_t: "Rimedi",
    how_s4_d:
      "Budget what-if, owner e timeline — chiusura gap critici entro 6 mesi.",
    how_s5_t: "Audit Pack",
    how_s5_d:
      "Evidence Locker con versioning, access logs, export firmati per ispezioni.",
    diff_title: "Perché FenyXen",
    diff_p:
      "Progettata per soddisfare i regulator e convincere i board. Sicurezza enterprise, spiegabilità e ripetibilità integrate.",
    diff_i1_t: "Audit-grade",
    diff_i1_d:
      "Evidence Locker + export firmati. Supporto per JPA UE, GOV.UK, WGEA, Logib, JP, CA, US-CA.",
    diff_i2_t: "Workflow JPA (UE)",
    diff_i2_d:
      "Trigger a ≥5% gap non spiegato. Orchestrazione di stakeholder, misure e timeline.",
    diff_i3_t: "Libreria globale",
    diff_i3_d:
      "Adapter e template per Stati UE + UK, CH, JP, AU, CA, US (state-aware).",
    diff_i4_t: "Vendor-agnostic",
    diff_i4_d:
      "Funziona con il tuo stack. Connessioni sicure a HRIS, payroll e data platform.",
    audit_ready: "Audit-Ready by Design",
    audit_li1:
      "Evidence Locker: versioning, access logs, export firmati",
    audit_li2: "Model Cards: parametri, diagnostica, riproducibilità",
    audit_li3: "Joint Pay Assessment (UE): orchestrazione",
    kpi_sample: "KPI di esempio (demo)",
    kpi_caption: "per chiudere i gap critici ≥5%",
    eu_title: "Unione Europea — Direttiva (UE) 2023/970",
    eu_p:
      "Si applica agli Stati membri. Cadenze per dimensione, JPA a ≥5% gap non giustificato, audit trail completo.",
    eu_b1: "Trasposizione entro 7 giugno 2026",
    eu_b2:
      "Finestre dal 2027 (250+ annuale; 150–249 ogni 3 anni; 100–149 dal 2031)",
    eu_b3: "Workflow JPA ed evidenze a prova di ispezione",
    eu_note:
      "* L’UE è il perimetro principale; non-UE in sezione dedicata.",
    beyond_title: "Oltre UE — Giurisdizioni supportate",
    beyond_p:
      "Non coperte dalla Direttiva ma supportate con moduli nativi: UK (GPG), CH (Logib), JP (disclosure), AU (WGEA), CA (federale/province), US (statali).",
    beyond_note:
      "* I modelli di reporting e le scadenze differiscono per giurisdizione.",
    charts_title: "Snapshot ufficiali",
    charts_note:
      "Fonti ufficiali aggiornate. Gli indicatori non sono pienamente comparabili tra giurisdizioni.",
    charts_label_eu: "UE (2023) — Gender pay gap non aggiustato",
    charts_label_uk: "UK (apr 2024) — Gap tra tutti i dipendenti",
    charts_label_ca: "Canada (2024) — Le donne guadagnano 87¢ per $1",
    charts_label_us: "USA (2024, tutte le età) — Gap",
    charts_label_au: "Australia (2024) — Gap pubblicati per datore",
    interest_title: "Ti interessa la nostra piattaforma?",
    interest_p:
      "Aiutaci a validare il bisogno. Un clic basta — niente form, GDPR-safe.",
    interest_yes: "Mi interessa",
    interest_no: "Non fa per me",
    interest_email: "Contattaci via Email",
    privacy_note:
      "I click vengono misurati con analytics privacy-friendly. Non archiviamo dati personali su questo sito.",
    foot_legal:
      "Direttiva (UE) 2023/970 (Stati membri) · Plus: UK · CH · JP · AU · CA · US",
    // Paesi
    country_AT: "Austria", country_BE: "Belgio", country_BG: "Bulgaria",
    country_HR: "Croazia", country_CY: "Cipro", country_CZ: "Cechia",
    country_DK: "Danimarca", country_EE: "Estonia", country_FI: "Finlandia",
    country_FR: "Francia", country_DE: "Germania", country_GR: "Grecia",
    country_HU: "Ungheria", country_IE: "Irlanda", country_IT: "Italia",
    country_LV: "Lettonia", country_LT: "Lituania", country_LU: "Lussemburgo",
    country_MT: "Malta", country_NL: "Paesi Bassi", country_PL: "Polonia",
    country_PT: "Portogallo", country_RO: "Romania", country_SK: "Slovacchia",
    country_SI: "Slovenia", country_ES: "Spagna", country_SE: "Svezia",
    country_UK: "Regno Unito", country_CH: "Svizzera", country_JP: "Giappone",
    country_AU: "Australia", country_CA: "Canada", country_US: "Stati Uniti"
  },

  fr: {
    brand: "FenyXen",
    nav_why: "Pourquoi maintenant",
    nav_how: "Fonctionnement",
    nav_diff: "Pourquoi FenyXen",
    nav_eu: "UE",
    nav_beyond: "Hors UE",
    nav_charts: "Graphiques",
    nav_interest: "Intérêt",
    hero_title:
      "Une plateforme pour la conformité à l’égalité salariale",
    hero_sub:
      "FenyXen unifie analyse, remédiation et piste d’audit pour l’UE — et, séparément, UK · CH · JP · AU · CA · US.",
    coverage_matrix: "Matrice de couverture",
    footnote_cov:
      "* Les membres UE sont alignés sur la Directive (UE) 2023/970 ; UK · CH · JP · AU · CA · US sont traités séparément.",
    stat_eu_members: "États membres UE",
    stat_beyond: "Hors UE",
    stat_audit_ready: "Audit-ready",
    stat_gdpr_light: "GDPR-light",
    stat_gdpr_light_note: "Sans formulaires",
    why_title: "Pourquoi maintenant",
    why_p:
      "Transposition d’ici le 7 juin 2026. UK publication annuelle. AU WGEA. CH Logib. JP disclosure. CA/US régimes fédéraux/états.",
    why_li1:
      "Calendrier clair → construire maintenant, conformité avant 2026.",
    why_li2: "Charge de la preuve → traçabilité et exports signés.",
    why_li3:
      "Multiples parties prenantes → RH, Juridique, IRP, Syndicats, Autorités.",
    deadlines_snapshot: "Aperçu des échéances",
    deadlines_scope_col: "Périmètre",
    deadlines_th: "Seuil",
    deadlines_what: "Quoi",
    deadlines_when: "Quand",
    deadlines_scope_eu: "UE (États membres)",
    deadlines_scope_uk: "R.-U.",
    deadlines_scope_au: "AU (WGEA)",
    deadlines_scope_ch: "CH (Logib)",
    deadlines_scope_jp: "JP",
    deadlines_scope_ca: "CA (Fédéral)",
    deadlines_scope_us: "US (ex. Californie)",
    deadlines_eu_th: "100+/150+/250+",
    deadlines_eu_what: "Reporting + JPA ≥5%",
    deadlines_eu_when:
      "Transposition d’ici 7 juin 2026 ; premiers rapports 2027",
    deadlines_uk_th: "≥250",
    deadlines_uk_what: "Publication GPG (6 métriques)",
    deadlines_uk_when:
      "Snapshot 5 avr / 31 mar ; publier +12m",
    deadlines_au_th: "≥100",
    deadlines_au_what: "WGEA rapport + écarts publics",
    deadlines_au_when: "Annuel",
    deadlines_ch_th: "≥100",
    deadlines_ch_what: "Analyse equal pay + vérif",
    deadlines_ch_when: "Cyclique (légal)",
    deadlines_jp_th: "≥301 (disclosure)",
    deadlines_jp_what: "Publication écart salarial",
    deadlines_jp_when: "~3 mois après clôture",
    deadlines_ca_th: "≥10 (fédéral)",
    deadlines_ca_what: "Plan + Déclaration annuelle",
    deadlines_ca_when: "Annuel ; revue 5 ans",
    deadlines_us_th: "≥100",
    deadlines_us_what: "Pay Data Report",
    deadlines_us_when: "Annuel",
    how_title: "Fonctionnement",
    how_desc:
      "De l’ingestion aux packs d’audit signés : FenyXen rend la conformité opérationnelle avec des analyses opposables et une traçabilité claire.",
    how_s1_t: "Connecter les données",
    how_s1_d:
      "HRIS, Paie, ATS ou CSV. Validation, lignage et contrôles qualité inclus.",
    how_s2_t: "Travail de valeur égale",
    how_s2_d:
      "Évaluation des emplois avec facteurs transparents ; regroupement des rôles pour analyses like-for-like.",
    how_s3_t: "Gap Engine",
    how_s3_d:
      "Écarts bruts et ajustés (régression/quantile), tests de significativité, diagnostics.",
    how_s4_t: "Remédiation",
    how_s4_d:
      "Budgets what-if, responsables et délais — fermeture des écarts critiques en ≤ 6 mois.",
    how_s5_t: "Audit Pack",
    how_s5_d:
      "Evidence Locker avec versioning, logs d’accès, exports signés pour inspections.",
    diff_title: "Pourquoi FenyXen",
    diff_p:
      "Conçue pour satisfaire les régulateurs et convaincre les conseils. Sécurité, explicabilité et répétabilité intégrées.",
    diff_i1_t: "Audit-grade",
    diff_i1_d:
      "Evidence Locker + exports signés. Support JPA UE, GOV.UK, WGEA, Logib, JP, CA, US-CA.",
    diff_i2_t: "Workflow JPA (UE)",
    diff_i2_d:
      "Déclenchement à ≥5% d’écart inexpliqué. Orchestration des parties prenantes, mesures et délais.",
    diff_i3_t: "Bibliothèque globale",
    diff_i3_d:
      "Adaptateurs & modèles pour États UE + UK, CH, JP, AU, CA, US (state-aware).",
    diff_i4_t: "Vendor-agnostic",
    diff_i4_d:
      "Fonctionne avec votre stack. Connexions sécurisées aux HRIS, paie et plateformes de données.",
    audit_ready: "Audit-Ready by Design",
    audit_li1:
      "Evidence Locker : versioning, logs d’accès, exports signés",
    audit_li2: "Model Cards : paramètres, diagnostics, reproductibilité",
    audit_li3: "JPA (UE) : orchestration",
    kpi_sample: "KPI d’exemple (demo)",
    kpi_caption: "pour fermer les écarts critiques ≥5%",
    eu_title: "Union européenne — Directive (UE) 2023/970",
    eu_p:
      "S’applique aux États membres. Cadence par taille, JPA à ≥5%, piste d’audit complète.",
    eu_b1: "Transposition d’ici 7 juin 2026",
    eu_b2:
      "Premières fenêtres 2027 (250+ annuel ; 150–249 tous les 3 ans ; 100–149 dès 2031)",
    eu_b3: "Workflow JPA et preuves opposables",
    eu_note:
      "* L’UE est le périmètre principal ; hors UE en section dédiée.",
    beyond_title: "Hors UE — Juridictions supportées",
    beyond_p:
      "Non couvertes par la Directive mais prises en charge nativement : UK (GPG), CH (Logib), JP (disclosure), AU (WGEA), CA (fédéral/provinces), US (états).",
    beyond_note:
      "* Les modèles de reporting et les échéances diffèrent selon la juridiction.",
    charts_title: "Instantanés officiels",
    charts_note:
      "Sources officielles, mises à jour. Les indicateurs ne sont pas pleinement comparables entre juridictions.",
    charts_label_eu: "UE (2023) — Écart salarial non ajusté",
    charts_label_uk: "R.-U. (avr 2024) — Écart tous salariés",
    charts_label_ca: "Canada (2024) — Les femmes gagnent 87¢ par $1",
    charts_label_us: "États-Unis (2024, tous âges) — Écart",
    charts_label_au: "Australie (2024) — Écarts publiés par employeur",
    interest_title: "Intéressé par notre plateforme ?",
    interest_p:
      "Aidez-nous à valider le besoin. Un clic suffit — sans formulaire.",
    interest_yes: "Je suis intéressé",
    interest_no: "Pas pour moi",
    interest_email: "Contactez-nous par email",
    privacy_note:
      "Nous mesurons uniquement les clics via des analytics respectueux de la vie privée. Aucune donnée personnelle n’est stockée par ce site.",
    foot_legal:
      "Directive (UE) 2023/970 (États membres) · Plus : UK · CH · JP · AU · CA · US",
    // Pays
    country_AT: "Autriche", country_BE: "Belgique", country_BG: "Bulgarie",
    country_HR: "Croatie", country_CY: "Chypre", country_CZ: "Tchéquie",
    country_DK: "Danemark", country_EE: "Estonie", country_FI: "Finlande",
    country_FR: "France", country_DE: "Allemagne", country_GR: "Grèce",
    country_HU: "Hongrie", country_IE: "Irlande", country_IT: "Italie",
    country_LV: "Lettonie", country_LT: "Lituanie", country_LU: "Luxembourg",
    country_MT: "Malte", country_NL: "Pays-Bas", country_PL: "Pologne",
    country_PT: "Portugal", country_RO: "Roumanie", country_SK: "Slovaquie",
    country_SI: "Slovénie", country_ES: "Espagne", country_SE: "Suède",
    country_UK: "Royaume-Uni", country_CH: "Suisse", country_JP: "Japon",
    country_AU: "Australie", country_CA: "Canada", country_US: "États-Unis"
  },
};

/** ==========
 *  Hook i18n
 *  ========== */
export function useI18n() {
  const url = new URL(
    typeof window !== "undefined" ? window.location.href : "http://local"
  );
  const qpLang = url.searchParams.get("lang")?.toLowerCase();
  const qpCountry = url.searchParams.get("country");
  const browser = (
    (typeof navigator !== "undefined" && navigator.language) ||
    "en"
  ).slice(0, 2);

  const initial =
    qpLang && I18N[qpLang]
      ? qpLang
      : qpCountry && COUNTRY_LANG[qpCountry]
      ? COUNTRY_LANG[qpCountry]
      : I18N[browser]
      ? browser
      : "en";

  const [lang, setLang] = useState(initial);
  const dict = useMemo(() => I18N[lang] || I18N.en, [lang]);
  const t = useMemo(() => (k: string) => dict[k] ?? I18N.en[k] ?? k, [dict]);

  return { lang, setLang, t };
}

/** Nome del paese localizzato (da codice ISO o extra) */
export function tCountry(t: (k: string) => string, code: string) {
  return t(`country_${code}`);
}
