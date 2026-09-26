"use client";

import { ArrowUp } from "lucide-react";
import { scrollToTop } from "@/lib/scrollTop";

/** Scrolls to the top and moves focus to the start of the page. */
export function BackToTop({ label, className }: { label: string; className?: string }) {
  return (
    <a
      href="#hero"
      onClick={(e) => {
        e.preventDefault();
        scrollToTop();
      }}
      className={className}
    >
      <ArrowUp size={14} aria-hidden /> {label}
    </a>
  );
}
