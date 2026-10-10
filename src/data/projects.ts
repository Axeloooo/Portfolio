import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { markdownToHTML } from "@/data/blog";

const PROJECTS_DIR: string = path.join(process.cwd(), "content", "projects");

export type ProjectMetadata = {
  title: string;
  summary: string;
  dates?: string;
  image?: string;
};

export type Project = {
  source: string;
  metadata: ProjectMetadata;
  slug: string;
};

export async function getProject(slug: string): Promise<Project | undefined> {
  const filePath: string = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  const source: string = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data }: { content: string; data: unknown } =
    matter(source);
  return {
    source: await markdownToHTML(rawContent),
    metadata: data as ProjectMetadata,
    slug,
  };
}

export function getProjectSlugs(): string[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file: string): boolean => path.extname(file) === ".mdx")
    .map((file: string): string => path.basename(file, ".mdx"));
}
