import type { Metadata } from "next";
import { getContent, getProject } from "@/content";
import { CasePage } from "@/components/site/CasePage";
import { plain } from "@/components/ui/RichText";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getContent("en").projects.list.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug, "en");
  return p
    ? {
        title: p.name,
        description: plain(p.problem),
        alternates: { languages: { es: `/proyectos/${slug}`, en: `/en/projects/${slug}` } },
      }
    : {};
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  return <CasePage locale="en" slug={slug} />;
}
