// /app/api/eurostat/route.ts
// Restituisce i valori Eurostat sdg_05_20 (GPG "unadjusted") per i 27 paesi UE – anno 2023.
// Output: { data: { "AT": 18.0, "IT": 5.0, ... }, year: "2023", source: "sdg_05_20" }
// Nota: chiamata server-side (Next route handler) per evitare CORS in client.

import { NextResponse } from "next/server";

const EU27 = [
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV",
  "LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE",
];

export async function GET() {
  const base =
    "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/sdg_05_20";
  const params = new URLSearchParams();
  params.set("time", "2023");
  params.set("geo", EU27.join(","));
  const url = `${base}?${params.toString()}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Eurostat HTTP ${res.status}` },
        { status: res.status }
      );
    }
    const json = await res.json();

    // Supporto a due possibili shape di risposta.
    const out: Record<string, number> = {};
    if (Array.isArray(json?.value)) {
      for (const row of json.value as any[]) {
        if (row?.geo && row?.time === "2023" && typeof row?.value === "number") {
          out[row.geo] = row.value;
        }
      }
    } else if (json?.dimension?.geo?.category?.index && json?.dimension?.time?.category?.index && json?.value) {
      const geoIndex: Record<string, number> = json.dimension.geo.category.index;
      const timeIndex: Record<string, number> = json.dimension.time.category.index;
      const tIdx = timeIndex["2023"];
      const values = json.value;
      const timeCount = Object.keys(timeIndex).length;
      for (const code of EU27) {
        const gIdx = geoIndex[code];
        if (gIdx == null || tIdx == null) continue;
        const key = String(gIdx * timeCount + tIdx);
        const v = values[key];
        if (typeof v === "number") out[code] = v;
      }
    } else {
      return NextResponse.json({ error: "Unexpected JSON shape" }, { status: 502 });
    }

    return NextResponse.json({
      data: out,
      year: "2023",
      source: "sdg_05_20",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Fetch failed" }, { status: 502 });
  }
}
