import { Fragment } from "react";
import type { KeywordId } from "@/content";
import { Keyword } from "@/components/keywords/Keyword";

const TOKEN = /\[\[([a-z]+):([^\]]+)\]\]/g;

/** Plain text with inline keywords: "Fui [[liderazgo:capitán]]". */
export function RichText({ children }: { children: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of children.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push(<Fragment key={`t${i}`}>{children.slice(last, i)}</Fragment>);
    out.push(
      <Keyword key={`k${i}`} id={m[1] as KeywordId}>
        {m[2]}
      </Keyword>,
    );
    last = i + m[0].length;
  }
  if (last < children.length) out.push(<Fragment key="end">{children.slice(last)}</Fragment>);
  return <>{out}</>;
}

/** The same text without keyword markup (for metadata, aria labels…). */
export const plain = (s: string) => s.replace(TOKEN, "$2");
