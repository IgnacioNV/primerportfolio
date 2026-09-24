"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useContact } from "./ContactProvider";
import { useRegisterCta } from "./ctaPresence";

type Props = {
  label: string;
  aria?: string;
  className?: string;
  arrow?: boolean;
  small?: boolean;
  /** In-page CTAs register their visibility; the nav and floating buttons don't. */
  track?: boolean;
};

/** "Charlemos" — the one primary action on the site. Opens the contact form. */
export function CtaButton({ label, aria, className = "", arrow = true, small = false, track = true }: Props) {
  const { open } = useContact();
  const ref = useRef<HTMLButtonElement>(null);
  useRegisterCta(ref, track);
  return (
    <button
      ref={ref}
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
