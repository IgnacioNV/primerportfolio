import Image from "next/image";
import portrait from "@/assets/img/portrait.jpg";
import type { SiteContent } from "@/content";
import { Reveal } from "./Reveal";
import { Text } from "./Text";
import styles from "./Intro.module.css";

export function Intro({ person, intro }: Pick<SiteContent, "person" | "intro">) {
  return (
    <div className={styles.intro}>
      <div className={styles.grid}>
        <Reveal className={styles.statement}>
          <p className={styles.name}>
            {person.name}, {person.age}.
          </p>
          <p className={styles.body}>
            <Text>{intro.statement}</Text>
          </p>
        </Reveal>

        <Reveal as="figure" delay={120} className={styles.figure}>
          <Image src={portrait} alt={`Portrait of ${person.name}`} sizes="(min-width: 900px) 28vw, 70vw" placeholder="blur" />
          <figcaption className="mono">
            <Text>{intro.photoCaption}</Text>
          </figcaption>
        </Reveal>
      </div>

      <Reveal as="dl" delay={200} className={styles.facts}>
        {intro.facts.map((f) => (
          <div key={f.k}>
            <dt className="mono">{f.k}</dt>
            <dd>
              <Text>{f.v}</Text>
            </dd>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
