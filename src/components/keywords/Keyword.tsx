"use client";

import type { KeywordId } from "@/content";

export function Keyword({ id, children }: { id: KeywordId; children: React.ReactNode }) {
  return <strong data-keyword={id}>{children}</strong>;
}
