import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { getContent } from "@/content";
import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const c = getContent("en");

export const metadata: Metadata = {
  title: { default: c.meta.title, template: `%s — ${c.meta.title}` },
  description: c.meta.description,
};

export const viewport: Viewport = {
  themeColor: "#f1efe9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={c.locale} className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
