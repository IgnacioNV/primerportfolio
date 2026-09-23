import { getContent } from "@/content";
import { Header } from "@/components/Header";
import { ProcessNav } from "@/components/ProcessNav";
import { Lens } from "@/components/Lens";
import { Intro } from "@/components/Intro";
import { Thinking } from "@/components/Thinking";
import { Work } from "@/components/Work";
import { Lab } from "@/components/Lab";
import { Path } from "@/components/Path";
import { Method } from "@/components/Method";
import { Next } from "@/components/Next";

/*
 * The page reads as a process, top to bottom:
 * 00 Look → 01 Think → 02 Make → 03 Try → 04 Trace → 05 Next
 * (who I am → how I think → what I made → what I try → where I come from → where I'm going)
 */
export default function Home() {
  const c = getContent("en");

  return (
    <>
      <Header name={c.person.name} city={c.person.city} timezone={c.person.timezone} />
      <ProcessNav items={c.nav} />

      <main>
        <section id="look">
          <Lens {...c.hero} />
          <Intro person={c.person} intro={c.intro} />
        </section>

        <section id="think" className="section">
          <Thinking thinking={c.thinking} work={c.work} />
        </section>

        <section id="make" className="section">
          <Work work={c.work} />
        </section>

        <section id="try" className="section night">
          <Lab lab={c.lab} />
        </section>

        <section id="trace" className="section">
          <Path path={c.path} />
          <Method method={c.method} />
        </section>

        <section id="next" className="section">
          <Next next={c.next} person={c.person} footer={c.footer} />
        </section>
      </main>
    </>
  );
}
