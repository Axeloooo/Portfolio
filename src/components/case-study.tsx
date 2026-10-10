import { MermaidDiagram } from "@/components/mermaid-diagram";
import { Badge } from "@/components/ui/badge";
import type {
  CaseStudyFact,
  CaseStudySection,
  Metadata,
} from "@/data/blog";
import Link from "next/link";

function renderSection(
  section: CaseStudySection,
  metadata: Metadata,
): JSX.Element {
  return (
    <section key={section.heading} className="min-w-0">
      <h2 className="mb-2 text-base font-medium tracking-tight">
        {section.heading}
      </h2>
      {section.heading.toLowerCase().startsWith("architecture") &&
        metadata.diagram && (
          <div className="mb-3">
            <MermaidDiagram
              chart={metadata.diagram}
              label={`${metadata.title} architecture diagram`}
            />
          </div>
        )}
      <div
        className="prose prose-sm max-w-none [overflow-wrap:anywhere] dark:prose-invert prose-p:my-2 prose-ul:my-2 prose-li:my-0.5"
        dangerouslySetInnerHTML={{ __html: section.html }}
      />
    </section>
  );
}

export function CaseStudy({
  metadata,
  sections,
}: {
  metadata: Metadata;
  sections: CaseStudySection[];
}): JSX.Element {
  const [first, ...rest]: CaseStudySection[] = sections;
  const facts: CaseStudyFact[] = [
    ...(metadata.dates ? [{ label: "Dates", value: metadata.dates }] : []),
    ...(metadata.type ? [{ label: "Type", value: metadata.type }] : []),
    ...(metadata.role ? [{ label: "Role", value: metadata.role }] : []),
    ...(metadata.facts ?? []),
  ];

  return (
    <>
      <Link
        href="/#projects"
        className="text-sm text-muted-foreground hover:underline"
      >
        &larr; All projects
      </Link>

      <header className="mt-4 space-y-3">
        <h1 className="font-medium text-2xl tracking-tighter">
          {metadata.title}
        </h1>
        <p className="text-sm text-muted-foreground max-w-[60ch]">
          {metadata.summary}
        </p>
        <div className="flex flex-wrap gap-1">
          {(metadata.stack ?? []).map(
            (tech: string): JSX.Element => (
              <Badge
                key={tech}
                variant="secondary"
                className="px-1.5 py-0 text-[11px]"
              >
                {tech}
              </Badge>
            ),
          )}
        </div>
      </header>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_200px]">
        {first && renderSection(first, metadata)}
        <aside>
          <dl className="space-y-3 rounded-lg border p-3 text-xs">
            {facts.map(
              (fact: CaseStudyFact): JSX.Element => (
                <div key={fact.label}>
                  <dt className="text-muted-foreground">{fact.label}</dt>
                  <dd className="mt-0.5 font-medium">{fact.value}</dd>
                </div>
              ),
            )}
            <div>
              <dt className="text-muted-foreground">Links</dt>
              <dd className="mt-0.5 flex flex-col gap-1 font-medium">
                {metadata.repo && (
                  <Link
                    href={metadata.repo}
                    target="_blank"
                    className="hover:underline"
                  >
                    Source on GitHub
                  </Link>
                )}
                {metadata.links?.map(
                  (link: { label: string; href: string }): JSX.Element => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      className="hover:underline"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      <div className="mt-6 space-y-6">
        {rest.map(
          (section: CaseStudySection): JSX.Element =>
            renderSection(section, metadata),
        )}
      </div>
    </>
  );
}
