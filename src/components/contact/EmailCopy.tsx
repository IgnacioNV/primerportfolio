"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** The email, clickable, with a Copy button that always works (webmail or not). */
export function EmailCopy({ email, subject, copy, copied }: { email: string; subject: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);
  const onCopy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      // Clipboard API blocked (permissions, older browsers): classic fallback.
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      ta.remove();
    }
    if (ok) {
      setDone(true);
      window.setTimeout(() => setDone(false), 2200);
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
