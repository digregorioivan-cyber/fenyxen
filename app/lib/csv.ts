// /app/lib/csv.ts
// Loader CSV molto semplice (locale, dal folder /public).
// Ritorna un array di righe con { code, value, source, href, year }.

export type CsvRow = {
  code: string;
  value: number | null;
  source: string;
  href: string;
  year: string;
};

export async function loadLocalCSV(path: string): Promise<CsvRow[]> {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) return [];
  const text = await res.text();

  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const header = lines[0].split(",").map((s) => s.trim());
  const idx = (k: string) => header.indexOf(k);

  const out: CsvRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(","); // semplice, senza CSV avanzato
    const raw = (j: number) => (j >= 0 && j < cols.length ? cols[j].trim() : "");
    const v = raw(idx("value"));
    out.push({
      code: raw(idx("code")),
      value: v ? Number(v) : null,
      source: raw(idx("source")),
      href: raw(idx("href")),
      year: raw(idx("year")),
    });
  }
  return out;
}
