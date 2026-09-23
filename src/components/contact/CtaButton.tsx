"use client";

import { ArrowRight } from "lucide-react";
import { useContact } from "./ContactProvider";

type Props = { label: string; aria?: string; className?: string; arrow?: boolean; small?: boolean };

/** "Charlemos" — the one primary action on the site. */
export function CtaButton({ label, aria, className = "", arrow = true, small = false }: Props) {
  const { open } = useContact();
  return (
    <button
      type="button"
      className={`btn btn-primary ${small ? "btn-small" : ""} ${className}`}
      onClick={open}
      aria-label={aria}
      aria-haspopup="dialog"
    >
      {label}
      {arrow && <ArrowRight size={18} aria-hidden />}
    </button>
  );
}
