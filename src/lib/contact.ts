/* Shared by the form (client) and the API route (server). */

export type ContactFields = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  message: string;
};

export type FieldError = "required" | "email" | "messageMin";

export const MESSAGE_MIN = 10;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(name: keyof ContactFields, value: string): FieldError | null {
  const v = value.trim();
  switch (name) {
    case "firstName":
    case "lastName":
      return v ? null : "required";
    case "email":
      if (!v) return "required";
      return EMAIL.test(v) ? null : "email";
    case "message":
      if (!v) return "required";
      return v.length >= MESSAGE_MIN ? null : "messageMin";
    default:
      return null; // company, phone: optional, free format
  }
}

export function validateAll(f: ContactFields): Partial<Record<keyof ContactFields, FieldError>> {
  const errors: Partial<Record<keyof ContactFields, FieldError>> = {};
  (Object.keys(f) as (keyof ContactFields)[]).forEach((k) => {
    const e = validateField(k, f[k] ?? "");
    if (e) errors[k] = e;
  });
  return errors;
}
