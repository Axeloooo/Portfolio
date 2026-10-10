import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { markdownToHTML } from "@/data/blog";

const PROJECTS_DIR: string = path.join(process.cwd(), "content", "projects");

export type ProjectFact = {
  label: string;
  value: string;
};

export type ProjectMetadata = {
  title: string;
  summary: string;
  dates: string;
  type: string;
  role: string;
  stack: string[];
  repo: string;
  facts?: ProjectFact[];
  links?: { label: string; href: string }[];
  image?: string;
  diagram?: string;
};

export type ProjectSection = {
  heading: string;
  html: string;
};

export type Project = {
  sections: ProjectSection[];
  metadata: ProjectMetadata;
  slug: string;
};

const TODO_MARKER: RegExp = /<strong>(TODO \(Axel\):?)<\/strong>/g;

async function renderSection(markdown: string): Promise<string> {
  const html: string = await markdownToHTML(markdown);
  return html.replace(TODO_MARKER, '<mark class="todo">$1</mark>');
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const filePath: string = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  const source: string = fs.readFileSync(filePath, "utf-8");
  const { content, data }: { content: string; data: unknown } = matter(source);

  const chunks: string[] = content.split(/^## /m).slice(1);
  const sections: ProjectSection[] = await Promise.all(
    chunks.map(async (chunk: string): Promise<ProjectSection> => {
      const newline: number = chunk.indexOf("\n");
      return {
        heading: chunk.slice(0, newline).trim(),
        html: await renderSection(chunk.slice(newline + 1).trim()),
      };
    }),
  );

  return { sections, metadata: data as ProjectMetadata, slug };
}

export function getProjectSlugs(): string[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file: string): boolean => path.extname(file) === ".mdx")
    .map((file: string): string => path.basename(file, ".mdx"));
}
