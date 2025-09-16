"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle2, Globe2, ShieldCheck, BarChart3, Sparkles, Lock,
  Workflow, Database, Timer, Building2, FileCheck2, Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n, EU_CODES, BEYOND_CODES, tCountry } from "./i18n";
import { TOP_CARDS, BEYOND_DATA, type StatItem } from "./data";

const LOGO_SRC = "/fenyxen-logo.png";

/* ---------- visuals ---------- */
function BackgroundGrid() {
  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="orb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(139, 92, 246, .35)" />
          <stop offset="40%" stopColor="rgba(59, 130, 246, .18)" />
          <stop offset="100%" stopColor="rgba(2, 6, 23, 0)" />
        </radialGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <circle cx="78%" cy="8%" r="420" fill="url(#orb)" />
      <circle cx="15%" cy="80%" r="360" fill="url(#orb)" />
    </svg>
  );
}

function SoftPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-3xl overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_0%_0%,rgba(30,41,59,.85),rgba(2,6,23,.92))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,rgba(0,0,0,0)_65%,rgba(0,0,0,.35))]" />
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full blur-3xl opacity-30"
        style={{ background: "linear-gradient(135deg,#8b5cf6,#22d3ee)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-25"
        style={{ background: "linear-gradient(135deg,#22d3ee,#0ea5e9)" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ---------- nav ---------- */
function Nav({ t, lang, setLang }:{ t:(k:string)=>string; lang:string; setLang:(l:string)=>void }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src={LOGO_SRC} alt="FenyXen logo" width={28} height={28} className="rounded-xl object-contain" priority />
            <span className="text-slate-100 text-base font-semibold tracking-tight">FenyXen</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-slate-300">
            <a href="#why" className="hover:text-white">{t("nav_why")}</a>
            <a href="#how" className="hover:text-white">{t("nav_how")}</a>
            <a href="#diff" className="hover:text-white">{t("nav_diff")}</a>
            <a href="#eu" className="hover:text-white">{t("nav_eu")}</a>
            <a href="#beyond-eu" className="hover:text-white">{t("nav_beyond")}</a>
            <a href="#charts" className="hover:text-white">{t("nav_charts")}</a>
            <a href="#interest" className="hover:text-white">{t("nav_interest")}</a>
            <button
              onClick={() => setLang(lang === "en" ? "it" : "en")}
              className="inline-flex items-center gap-1 text-xs border border-slate-700 px-2 py-1 rounded-lg hover:bg-slate-800"
            >
              <Languages className="h-3.5 w-3.5" /> {lang.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ HERO ------------------------------ */
function Hero({ t }:{t:(k:string)=>string}) {
  const stats = [
    { label: t("stat_eu_members"), value: "27" },
    { label: t("stat_beyond"), value: "6" },
    { label: t("stat_audit_ready"), value: "Yes" },
    { label: t("stat_gdpr_light"), value: t("stat_gdpr_light_note") },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 pt-24 pb-10 md:pb-12 lg:pb-14">
      <BackgroundGrid />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* H1 giustificato anche sull'ultima riga */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="justify-fill relaxed w-full text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
        >
          {t("hero_title")}
        </motion.h1>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <SoftPanel className="shadow-2xl">
            <div className="p-4 sm:p-5">
              <div className="relative mx-auto w-full max-w-[640px]">
                <div className="rounded-2xl overflow-hidden">
                  <div className="relative aspect-square">
                    <Image src={LOGO_SRC} alt="FenyXen" fill className="object-contain" priority />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_50%,rgba(2,6,23,0)_60%,rgba(2,6,23,.45))]" />
            </div>
          </SoftPanel>

          <SoftPanel>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2">
                <Globe2 className="h-5 w-5 text-slate-200" />
                <div className="text-slate-100 font-medium">{t("coverage_matrix")}</div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[...EU_CODES, ...BEYOND_CODES].map((code) => (
                  <div
                    key={code}
                    className="flex items-center gap-2 rounded-2xl border border-slate-800/70 bg-slate-900/50 px-3 py-2 text-slate-200"
                  >
                    <CheckCircle2 className="h-4 w-4 text-indigo-400" /> {tCountry(t, code)}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[11px] text-slate-400">{t("footnote_cov")}</div>
            </div>
          </SoftPanel>
        </div>

        <p className="mt-5 text-slate-300">{t("hero_sub")}</p>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <SoftPanel key={s.label}>
              <div className="p-4">
                <div className="text-2xl font-semibold text-white">{s.value}</div>
                <div className="text-sm text-slate-400">{s.label}</div>
              </div>
            </SoftPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ SEZIONI ------------------------------ */
function WhyNow({ t }:{t:(k:string)=>string}) {
  return (
    <section id="why" className="relative bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-semibold text-white">{t("why_title")}</h2>
            <p className="mt-3 text-slate-300">{t("why_p")}</p>
            <ul className="mt-4 space-y-2 text-slate-300">
              <li className="flex items-start gap-2"><Timer className="mt-0.5 h-4 w-4 text-indigo-400" /> {t("why_li1")}</li>
              <li className="flex items-start gap-2"><Lock className="mt-0.5 h-4 w-4 text-indigo-400" /> {t("why_li2")}</li>
              <li className="flex items-start gap-2"><Building2 className="mt-0.5 h-4 w-4 text-indigo-400" /> {t("why_li3")}</li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <Card className="bg-slate-900/60 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">{t("deadlines_snapshot")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-slate-300">
                        <th className="px-3 py-2 text-left">{t("deadlines_scope_col")}</th>
                        <th className="px-3 py-2 text-left">{t("deadlines_th")}</th>
                        <th className="px-3 py-2 text-left">{t("deadlines_what")}</th>
                        <th className="px-3 py-2 text-left">{t("deadlines_when")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      <tr><td className="px-3 py-2">{t("deadlines_scope_eu")}</td><td className="px-3 py-2">{t("deadlines_eu_th")}</td><td className="px-3 py-2">{t("deadlines_eu_what")}</td><td className="px-3 py-2">{t("deadlines_eu_when")}</td></tr>
                      <tr><td className="px-3 py-2">{t("deadlines_scope_uk")}</td><td className="px-3 py-2">{t("deadlines_uk_th")}</td><td className="px-3 py-2">{t("deadlines_uk_what")}</td><td className="px-3 py-2">{t("deadlines_uk_when")}</td></tr>
                      <tr><td className="px-3 py-2">{t("deadlines_scope_au")}</td><td className="px-3 py-2">{t("deadlines_au_th")}</td><td className="px-3 py-2">{t("deadlines_au_what")}</td><td className="px-3 py-2">{t("deadlines_au_when")}</td></tr>
                      <tr><td className="px-3 py-2">{t("deadlines_scope_ch")}</td><td className="px-3 py-2">{t("deadlines_ch_th")}</td><td className="px-3 py-2">{t("deadlines_ch_what")}</td><td className="px-3 py-2">{t("deadlines_ch_when")}</td></tr>
                      <tr><td className="px-3 py-2">{t("deadlines_scope_jp")}</td><td className="px-3 py-2">{t("deadlines_jp_th")}</td><td className="px-3 py-2">{t("deadlines_jp_what")}</td><td className="px-3 py-2">{t("deadlines_jp_when")}</td></tr>
                      <tr><td className="px-3 py-2">{t("deadlines_scope_ca")}</td><td className="px-3 py-2">{t("deadlines_ca_th")}</td><td className="px-3 py-2">{t("deadlines_ca_what")}</td><td className="px-3 py-2">{t("deadlines_ca_when")}</td></tr>
                      <tr><td className="px-3 py-2">{t("deadlines_scope_us")}</td><td className="px-3 py-2">{t("deadlines_us_th")}</td><td className="px-3 py-2">{t("deadlines_us_what")}</td><td className="px-3 py-2">{t("deadlines_us_when")}</td></tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ t }:{t:(k:string)=>string}) {
  const steps = [
    { icon: <Database className="h-6 w-6" />, title: t("how_s1_t"), desc: t("how_s1_d") },
    { icon: <BarChart3 className="h-6 w-6" />, title: t("how_s2_t"), desc: t("how_s2_d") },
    { icon: <Globe2 className="h-6 w-6" />, title: t("how_s3_t"), desc: t("how_s3_d") },
    { icon: <Workflow className="h-6 w-6" />, title: t("how_s4_t"), desc: t("how_s4_d") },
    { icon: <FileCheck2 className="h-6 w-6" />, title: t("how_s5_t"), desc: t("how_s5_d") },
  ];
  return (
    <section id="how" className="relative bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-white">{t("how_title")}</h2>
        <p className="justify-smart relaxed mt-3 text-slate-300">
          {t("how_desc")}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s) => (
            <Card key={s.title} className="bg-slate-900/60 border-slate-800">
              <CardContent className="p-5">
                <div className="mb-3 text-indigo-400">{s.icon}</div>
                <div className="text-white font-medium">{s.title}</div>
                <div className="mt-1 text-sm text-slate-300">{s.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Differentials({ t }:{t:(k:string)=>string}) {
  const items = [
    { icon: <ShieldCheck className="h-6 w-6" />, title: t("diff_i1_t"), desc: t("diff_i1_d") },
    { icon: <Workflow className="h-6 w-6" />, title: t("diff_i2_t"), desc: t("diff_i2_d") },
    { icon: <Globe2 className="h-6 w-6" />, title: t("diff_i3_t"), desc: t("diff_i3_d") },
    { icon: <Sparkles className="h-6 w-6" />, title: t("diff_i4_t"), desc: t("diff_i4_d") },
  ];
  return (
    <section id="diff" className="relative bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-white">{t("diff_title")}</h2>
        <p className="justify-smart relaxed mt-3 text-slate-300">
          {t("diff_p")}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((d) => (
            <Card key={d.title} className="bg-slate-900/60 border-slate-800">
              <CardContent className="p-5">
                <div className="mb-3 text-indigo-400">{d.icon}</div>
                <div className="text-white font-medium">{d.title}</div>
                <div className="mt-1 text-sm text-slate-300">{d.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function EUSection({ t }:{t:(k:string)=>string}) {
  return (
    <section id="eu" className="relative bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-semibold text-white">{t("eu_title")}</h2>
            <p className="mt-3 text-slate-300">{t("eu_p")}</p>
            <ul className="mt-4 text-slate-300 text-sm space-y-1">
              <li>• {t("eu_b1")}</li>
              <li>• {t("eu_b2")}</li>
              <li>• {t("eu_b3")}</li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {EU_CODES.map((code) => (
                <div key={code} className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2 text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-indigo-400" /> {tCountry(t, code)}
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">{t("eu_note")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeyondEUSection({ t }:{t:(k:string)=>string}) {
  return (
    <section id="beyond-eu" className="relative bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-white">{t("beyond_title")}</h2>
        <p className="justify-smart relaxed mt-3 text-slate-300">
          {t("beyond_p")}
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BEYOND_DATA.map((it) => (
            <div key={it.code} className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2 text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-indigo-400" /> {tCountry(t, it.code)}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-400">{t("beyond_note")}</p>
      </div>
    </section>
  );
}

/* ------------------------------ CHARTS ------------------------------ */
type StatItemLocal = StatItem;
function StatCard({ title, item }:{title:string; item:StatItemLocal}) {
  const width = item.value == null ? 0 : Math.min(item.value, 100);
  return (
    <Card className="bg-slate-900/60 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white text-sm">
          {title} {item.year ? `(${item.year})` : ""}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-28 w-full flex items-end gap-2">
          <div className="relative w-full h-24 bg-slate-800 rounded-xl overflow-hidden">
            <div className="h-full bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-500" style={{ width: `${width}%` }} />
          </div>
          <div className="w-16 text-right">
            <span className="text-2xl font-semibold text-white">
              {item.value == null ? "—" : item.value}
              <span className="text-sm">{item.value == null ? "" : "%"}</span>
            </span>
          </div>
        </div>
        {item.metric && <div className="mt-2 text-[11px] text-slate-400">{item.metric}</div>}
        {item.source && item.href ? (
          <a className="mt-2 inline-block text-xs text-sky-300 hover:underline" href={item.href} target="_blank" rel="noreferrer">{item.source}</a>
        ) : (
          <span className="mt-2 inline-block text-xs text-slate-400">Add official source & link</span>
        )}
      </CardContent>
    </Card>
  );
}

function ChartsSection({ t }:{t:(k:string)=>string}) {
  return (
    <section id="charts" className="relative bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-white">{t("charts_title")}</h2>
        <p className="mt-2 text-slate-300">{t("charts_note")}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOP_CARDS.map((it) => (
            <StatCard key={it.code} title={tCountry(t, it.code)} item={it} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ CTA ------------------------------ */
function InterestCTA({ t }:{t:(k:string)=>string}) {
  const [loading, setLoading] = useState(false);
  async function send(action: "yes" | "no") {
    try {
      setLoading(true);
      await fetch(`/api/interest?action=${action}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action }) });
    } catch {} finally { setLoading(false); }
  }
  return (
    <section id="interest" className="relative bg-slate-950 py-16 text-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">{t("interest_title")}</h2>
        <p className="mt-2 text-slate-300">{t("interest_p")}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button disabled={loading} onClick={() => send("yes")} className="bg-indigo-500 hover:bg-indigo-400">{t("interest_yes")}</Button>
          <Button disabled={loading} onClick={() => send("no")} variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800">{t("interest_no")}</Button>
          <Button asChild className="bg-slate-700 hover:bg-slate-600">
            <a href="mailto:info@fenyxen.com?subject=Interested%20in%20FenyXen&body=Hello%2C%20I%E2%80%99d%20like%20more%20information.%20(Company%20name%20%2F%20website)">{t("interest_email")}</a>
          </Button>
        </div>
        <p className="mt-3 text-xs text-slate-400">{t("privacy_note")}</p>
      </div>
    </section>
  );
}

/* ------------------------------ footer ------------------------------ */
function Footer({ t }:{t:(k:string)=>string}) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src={LOGO_SRC} alt="FenyXen logo" width={28} height={28} className="rounded-xl object-contain" />
            <span className="text-slate-300">© {new Date().getFullYear()} FenyXen</span>
          </div>
          <div className="text-slate-400 text-sm">{t("foot_legal")}</div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------ page ------------------------------ */
export default function Page() {
  const { lang, setLang, t } = useI18n();
  useEffect(() => {
    const onLang = (e:any) => { if (e?.detail?.lang) setLang(e.detail.lang); };
    window.addEventListener("fenyxen.lang", onLang);
    return () => window.removeEventListener("fenyxen.lang", onLang);
  }, [setLang]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Nav t={t} lang={lang} setLang={setLang} />
      <Hero t={t} />
      <WhyNow t={t} />
      <HowItWorks t={t} />
      <Differentials t={t} />
      <EUSection t={t} />
      <BeyondEUSection t={t} />
      <ChartsSection t={t} />
      <InterestCTA t={t} />
      <Footer t={t} />
    </div>
  );
}
