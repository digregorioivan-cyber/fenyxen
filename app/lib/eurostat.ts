// Simple Eurostat client for sdg_05_20 (unadjusted gender pay gap) – year 2023
// Notes:
// - Uses the new Dissemination API v1.0 (JSON). If the API blocks the request
//   (CORS or rate-limit), the caller should keep fallbacks from local data.ts.
// - Returns % values per ISO2 country code for EU27.
// Docs / context: Eurostat Statistics Explained & dataset sdg_05_20.

export type EurostatPoint = {
  geo: string;      // e.g., "DE"
  time: string;     // "2023"
  value: number;    // percentage (can be negative)
};

// EU27 ISO2 (order is not relevant)
export const EU27 = [
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV",
  "LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE",
] as const;

const API =
  "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/sdg_05_20";

export async function fetchEU27GPG2023(): Promise<Record<string, number>> {
  // Build query: filter year 2023 and EU27 countries
  const params = new URLSearchParams();
  params.set("time", "2023");
  // join EU27 as comma-sep list accepted by API
  params.set("geo", EU27.join(","));
  // Request only the headline (no breakdown dims involved for sdg_05_20)
  const url = `${API}?${params.toString()}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Eurostat API error ${res.status}`);

  // API returns a compact JSON structure: series + value arrays.
  // We map it to a simple { "DE": 18.0, ... } object.
  const json = await res.json();

  // The newer API uses a tidy structure under "value"/"dimension" OR an array of observations.
  // We’ll support both common shapes gracefully.

  // Shape A: { value: [{ geo, time, value }, ...] }
  if (Array.isArray(json?.value)) {
    const out: Record<string, number> = {};
    for (const row of json.value as any[]) {
      if (row?.geo && row?.time === "2023" && typeof row?.value === "number") {
        out[row.geo] = row.value;
      }
    }
    if (Object.keys(out).length) return out;
  }

  // Shape B: { dimension: { geo: { category: { index: {DE: 0, ...}}}, time: {...}}, value: { "0": 18.0, ... } }
  const dim = json?.dimension;
  const values = json?.value;
  if (dim?.geo?.category?.index && dim?.time?.category?.index && values) {
    const geoIndex: Record<string, number> = dim.geo.category.index;
    const timeIndex: Record<string, number> = dim.time.category.index;
    const idxTime = timeIndex["2023"];
    const out: Record<string, number> = {};
    for (const code of EU27) {
      const idxGeo = geoIndex[code];
      if (idxGeo == null || idxTime == null) continue;
      const key = String(idxGeo * Object.keys(timeIndex).length + idxTime);
      const v = values[key];
      if (typeof v === "number") out[code] = v;
    }
    if (Object.keys(out).length) return out;
  }

  throw new Error("Eurostat API: unexpected JSON shape");
}
