import type { Locale } from "@/content";
import { getContent } from "@/content";
import { fontVars } from "@/app/fonts";
import { ContactProvider } from "@/components/contact/ContactProvider";
import { KeywordProvider } from "@/components/keywords/KeywordProvider";
import { isTodo } from "@/lib/todo";
import "@/app/globals.css";

/** <html>/<body> shared by both root layouts (es at "/", en at "/en"). */
export function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const c = getContent(locale);
  return (
    <html lang={locale} className={fontVars}>
      <body>
        <a href="#contenido" className="skip-link">
          {c.ui.skipToContent}
        </a>
        <ContactProvider
          ui={c.ui.contact}
          closeLabel={c.ui.close}
          email={isTodo(c.person.email) ? null : c.person.email}
          links={c.person.links}
        >
          <KeywordProvider locale={locale} keywords={c.keywords} ui={c.ui.keywords} cta={c.ui.cta}>
            {children}
          </KeywordProvider>
        </ContactProvider>
      </body>
    </html>
  );
}
