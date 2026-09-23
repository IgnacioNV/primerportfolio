"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Mail, X } from "lucide-react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import type { SiteContent } from "@/content";
import styles from "./ContactModal.module.css";

type Ctx = { open: () => void };
const ContactContext = createContext<Ctx | null>(null);

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact outside ContactProvider");
  return ctx;
}

type Props = {
  ui: SiteContent["ui"]["contact"];
  closeLabel: string;
  email: string | null;
  links: { label: string; href: string }[];
  children: React.ReactNode;
};

/**
 * "Charlemos" opens a small modal instead of a bare mailto: — many recruiters
 * use webmail with no mail client configured, and mailto: silently does nothing.
 * The modal offers: copy the email (always works), open mail with a prefilled
 * subject, or go to LinkedIn. Built on <dialog>: focus trap and Esc for free.
 */
export function ContactProvider({ ui, closeLabel, email, links, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);

  const open = useCallback(() => {
    setCopied(false);
    ref.current?.showModal();
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    // Click on the backdrop closes it.
    const onClick = (e: MouseEvent) => {
      if (e.target === d) d.close();
    };
    d.addEventListener("click", onClick);
    return () => d.removeEventListener("click", onClick);
  }, []);

  const copy = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked: the address is visible and selectable anyway */
    }
  };

  return (
    <ContactContext.Provider value={{ open }}>
      {children}
      <dialog ref={ref} className={styles.dialog} aria-labelledby="contact-title">
        <div className={styles.inner}>
          <button type="button" className={styles.close} onClick={() => ref.current?.close()} aria-label={closeLabel}>
            <X size={20} aria-hidden />
          </button>
          <h2 id="contact-title" className={styles.title}>
            {ui.title}
          </h2>
          <p className={styles.body}>{ui.body}</p>

          {email ? (
            <div className={styles.emailRow}>
              <span className={styles.email}>{email}</span>
              <button type="button" className="btn btn-primary btn-small" onClick={copy} aria-live="polite">
                {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
                {copied ? ui.copied : ui.copy}
              </button>
            </div>
          ) : (
            <p className={styles.body}>{ui.noEmail}</p>
          )}

          <ul className={styles.links}>
            {email && (
              <li>
                <a href={`mailto:${email}?subject=${encodeURIComponent(ui.subject)}`} className="btn btn-ghost btn-small">
                  <Mail size={16} aria-hidden /> {ui.write}
                </a>
              </li>
            )}
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noreferrer" className="btn btn-ghost btn-small">
                  {l.label === "GitHub" && <BrandIcon name="github" size={16} />} {l.label}
                  <ArrowUpRight size={16} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </ContactContext.Provider>
  );
}
