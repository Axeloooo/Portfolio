import { getProject, getProjectSlugs, type Project } from "@/data/projects";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getProjectSlugs().map((slug: string): { slug: string } => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const project: Project | undefined = await getProject(params.slug);
  if (!project) return undefined;
  const { title, summary: description, image } = project.metadata;
  const ogImage: string = image
    ? `${DATA.url}${image}`
    : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${DATA.url}/projects/${project.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const project: Project | undefined = await getProject(params.slug);
  if (!project) notFound();

  const match: (typeof DATA.projects)[number] | undefined = DATA.projects.find(
    (p): boolean => p.href === `/projects/${project.slug}`,
  );

  return (
    <section id="project">
      <Link
        href="/#projects"
        className="text-sm text-muted-foreground hover:underline"
      >
        &larr; All projects
      </Link>
      <h1 className="title mt-4 font-medium text-2xl tracking-tighter max-w-[650px]">
        {project.metadata.title}
      </h1>
      <div className="mt-2 mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-600 dark:text-neutral-400">
        {project.metadata.dates && <p>{project.metadata.dates}</p>}
        {match?.links.map(
          (link): JSX.Element => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              className="inline-flex items-center gap-1 hover:underline"
            >
              {link.icon}
              {link.type}
            </Link>
          ),
        )}
      </div>
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: project.source }}
      ></article>
    </section>
  );
}
