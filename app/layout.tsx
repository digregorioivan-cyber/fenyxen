import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FenyXen",
  description: "Pay equity compliance platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}

