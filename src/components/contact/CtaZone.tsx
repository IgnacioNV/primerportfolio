"use client";

import { useRef } from "react";
import { useRegisterCta } from "./ctaPresence";

/** Wraps a non-button CTA (the inline form) so it counts as a visible "Charlemos". */
export function CtaZone({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useRegisterCta(ref);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
