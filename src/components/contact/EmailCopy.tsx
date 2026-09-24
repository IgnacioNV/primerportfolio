"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** The email, clickable, with a Copy button that always works (webmail or not). */
export function EmailCopy({ email, subject, copy, copied }: { email: string; subject: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setDone(true);
      window.setTimeout(() => setDone(false), 2200);
    } catch {
      /* clipboard blocked: the address is visible and selectable */
    }
  };
  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
      <a className="link" href={`mailto:${email}?subject=${encodeURIComponent(subject)}`}>
        {email}
      </a>
      <button type="button" className="btn btn-ghost btn-small" onClick={onCopy} aria-live="polite">
        {done ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />} {done ? copied : copy}
      </button>
    </span>
  );
}
