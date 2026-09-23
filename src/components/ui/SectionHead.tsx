import { RichText } from "./RichText";
import { SplitTitle } from "./SplitTitle";
import { Reveal } from "./Reveal";

type Props = {
  index: number;
  creative: string;
  label: string;
  title: string;
  lede?: string;
};

/** "02 — Pensar / Cómo pienso" + title entering word by word + lede. */
export function SectionHead({ index, creative, label, title, lede }: Props) {
  return (
    <header className="section-head">
      <div>
        <p className="meta section-kicker">
          <span>
            {String(index).padStart(2, "0")} — {creative} <span aria-hidden>/</span> <strong>{label}</strong>
          </span>
        </p>
        <SplitTitle text={title} className="section-title" as="h2" />
      </div>
      {lede && (
        <Reveal as="p" className="section-lede" delay={150}>
          <RichText>{lede}</RichText>
        </Reveal>
      )}
    </header>
  );
}
