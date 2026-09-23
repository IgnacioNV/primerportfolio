import type { Metadata, Viewport } from "next";
import { RootDocument } from "@/components/site/RootDocument";
import { homeMetadata } from "@/lib/metadata";

export const metadata: Metadata = homeMetadata("en");
export const viewport: Viewport = { themeColor: "#f1efe9" };

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
