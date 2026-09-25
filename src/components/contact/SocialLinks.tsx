import type { SiteContent } from "@/content";
import { BrandIcon } from "@/components/ui/BrandIcon";
import styles from "./SocialLinks.module.css";

/** LinkedIn / GitHub as icons: the URL is never shown; the name is in aria-label. */
export function SocialLinks({ links }: { links: SiteContent["person"]["links"] }) {
  return (
    <ul className={styles.list}>
      {links.map((l) => (
        <li key={l.href}>
          <a href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.aria} title={l.label} className={styles.link}>
            <BrandIcon name={l.icon} size={22} />
          </a>
        </li>
      ))}
    </ul>
  );
}
