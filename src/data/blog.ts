import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export type CaseStudyFact = {
  label: string;
  value: string;
};

export type CaseStudySection = {
  heading: string;
  html: string;
};

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  // Case study fields: a post with a `diagram` renders with the case study layout.
  dates?: string;
  type?: string;
  role?: string;
  stack?: string[];
  repo?: string;
  facts?: CaseStudyFact[];
  links?: { label: string; href: string }[];
  diagram?: string;
};

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

async function splitSections(markdown: string): Promise<CaseStudySection[]> {
  const chunks: string[] = markdown.split(/^## /m).slice(1);
  return Promise.all(
    chunks.map(async (chunk: string): Promise<CaseStudySection> => {
      const newline: number = chunk.indexOf("\n");
      return {
        heading: chunk.slice(0, newline).trim(),
        html: await markdownToHTML(chunk.slice(newline + 1).trim()),
      };
    })
  );
}

export async function getPost(slug: string) {
  const filePath = path.join("content", `${slug}.mdx`);
  let source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data } = matter(source);
  const metadata = data as Metadata;
  const content = await markdownToHTML(rawContent);
  const sections: CaseStudySection[] | undefined = metadata.diagram
    ? await splitSections(rawContent)
    : undefined;
  return {
    source: content,
    sections,
    metadata,
    slug,
  };
}

async function getAllPosts(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      let slug = path.basename(file, path.extname(file));
      let { metadata, source } = await getPost(slug);
      return {
        metadata,
        slug,
        source,
      };
    })
  );
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), "content"));
}
