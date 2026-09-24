"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { SiteContent } from "@/content";
import { ContactForm } from "./ContactForm";
import styles from "./ContactDrawer.module.css";

type Ctx = { open: () => void; isOpen: boolean };
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
  children: React.ReactNode;
};

/**
 * Every "Charlemos" opens the same form in a panel: a drawer from the right
 * on desktop, a sheet from the bottom on mobile. Built on <dialog>: focus moves
 * in, Esc closes, and focus returns to the button that opened it.
 */
export function ContactProvider({ ui, closeLabel, email, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const open = useCallback(() => {
    const d = ref.current;
    if (!d || d.open) return;
    d.showModal();
    setIsOpen(true);
    requestAnimationFrame(() => d.querySelector<HTMLElement>("input[name='firstName']")?.focus());
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClick = (e: MouseEvent) => {
      if (e.target === d) d.close(); // click on the backdrop
    };
    const onClose = () => {
      setIsOpen(false);
      // A sent form starts fresh next time.
      if (d.querySelector("[data-sent]")) setFormKey((k) => k + 1);
    };
    d.addEventListener("click", onClick);
    d.addEventListener("close", onClose);
    return () => {
      d.removeEventListener("click", onClick);
      d.removeEventListener("close", onClose);
    };
  }, []);

  return (
    <ContactContext.Provider value={{ open, isOpen }}>
      {children}
      <dialog ref={ref} className={styles.drawer} aria-labelledby="contact-title">
        <div className={styles.inner}>
          <header className={styles.head}>
            <h2 id="contact-title" className={styles.title}>
              {ui.title}
            </h2>
            <button type="button" className={styles.close} onClick={() => ref.current?.close()} aria-label={closeLabel}>
              <X size={20} aria-hidden />
            </button>
          </header>
          <p className={styles.body}>{ui.body}</p>
          <ContactForm key={formKey} ui={ui} email={email} />
        </div>
      </dialog>
    </ContactContext.Provider>
  );
}
