import { Instrument_Sans, Instrument_Serif } from "next/font/google";

export const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
export const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// Mono labels use the system monospace (SF Mono / Menlo / Consolas): one less font to download.
export const fontVars = `${sans.variable} ${serif.variable}`;
