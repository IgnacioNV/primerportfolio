"use client";

import { useId, useRef, useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import type { SiteContent } from "@/content";
import { validateAll, validateField, type ContactFields, type FieldError } from "@/lib/contact";
import styles from "./ContactForm.module.css";

type Props = {
  ui: SiteContent["ui"]["contact"];
  email: string | null;
  /** Focus the first field on mount (drawer). */
  autoFocus?: boolean;
};

type Status = "idle" | "sending" | "success" | "error" | "rate";

/** Wall clock, read only inside event handlers (fill-time check for spam). */
const now = () => Date.now();

const EMPTY: ContactFields = { firstName: "", lastName: "", email: "", company: "", phone: "", message: "" };

/**
 * The one contact form, used in the drawer and inline in the closing section.
 * Errors appear when you leave a field (not only on submit), in plain language.
 */
export function ContactForm({ ui, email, autoFocus = false }: Props) {
  const uid = useId();
  const [values, setValues] = useState<ContactFields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFields, FieldError>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honey, setHoney] = useState("");
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  const markStart = () => {
    if (!startedAt.current) startedAt.current = now();
  };

  const set = (name: keyof ContactFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    markStart();
    const v = e.target.value;
    setValues((s) => ({ ...s, [name]: v }));
    // Once a field has shown an error, re-check it live so the error clears as you fix it.
    if (touched[name]) setErrors((s) => ({ ...s, [name]: validateField(name, v) ?? undefined }));
  };

  const blur = (name: keyof ContactFields) => () => {
    setTouched((s) => ({ ...s, [name]: true }));
    setErrors((s) => ({ ...s, [name]: validateField(name, values[name]) ?? undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const all = validateAll(values);
    setErrors(all);
    setTouched({ firstName: true, lastName: true, email: true, message: true });
    const first = Object.keys(all)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honey, elapsed: startedAt.current ? now() - startedAt.current : 0 }),
      });
      if (res.status === 429) return setStatus("rate");
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) return setStatus("error");
      setStatus("success");
      setValues(EMPTY);
      setTouched({});
    } catch {
      setStatus("error");
    }
  };

  const field = (name: keyof ContactFields, opts: { type?: string; optional?: boolean; autoComplete?: string; textarea?: boolean }) => {
    const id = `${uid}-${name}`;
    const err = errors[name];
    const errId = `${id}-err`;
    const common = {
      id,
      name,
      value: values[name],
      onChange: set(name),
      onBlur: blur(name),
      "aria-invalid": err ? true : undefined,
      "aria-describedby": err ? errId : undefined,
      required: !opts.optional,
      autoComplete: opts.autoComplete,
    };
    return (
      <div className={`${styles.field} ${opts.textarea ? styles.full : ""}`}>
        <label htmlFor={id}>
          {ui.fields[name]} {opts.optional && <span className={styles.optional}>({ui.optional})</span>}
        </label>
        {opts.textarea ? (
          <textarea {...common} rows={5} placeholder={ui.messagePlaceholder} />
        ) : (
          <input {...common} type={opts.type ?? "text"} autoFocus={autoFocus && name === "firstName"} />
        )}
        {err && (
          <p id={errId} className={styles.error}>
            {ui.errors[err]}
          </p>
        )}
      </div>
    );
  };

  if (status === "success") {
    return (
      <div className={styles.success} role="status" aria-live="polite" data-sent>
        <Check size={22} aria-hidden /> {ui.success}
      </div>
    );
  }

  return (
    <form ref={formRef} className={styles.form} onSubmit={submit} noValidate onFocus={markStart}>
      {field("firstName", { autoComplete: "given-name" })}
      {field("lastName", { autoComplete: "family-name" })}
      {field("email", { type: "email", autoComplete: "email" })}
      {field("company", { optional: true, autoComplete: "organization" })}
      {field("phone", { type: "tel", optional: true, autoComplete: "tel" })}
      {field("message", { textarea: true })}

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div className={styles.hp} aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden value={honey} onChange={(e) => setHoney(e.target.value)} />
        </label>
      </div>

      <div className={styles.footer}>
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? <Loader2 size={18} className={styles.spin} aria-hidden /> : <Send size={16} aria-hidden />}
          {status === "sending" ? ui.sending : ui.submit}
        </button>
        <p className={styles.status} role="status" aria-live="polite">
          {status === "error" &&
            (email ? (
              <>
                {ui.errorPrefix}{" "}
                <a className="link" href={`mailto:${email}?subject=${encodeURIComponent(ui.subject)}`}>
                  {email}
                </a>
                .
              </>
            ) : (
              ui.errorFallback
            ))}
          {status === "rate" && ui.errors.rateLimited}
        </p>
      </div>
    </form>
  );
}
