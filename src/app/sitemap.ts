import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  type BlogPost = Awaited<ReturnType<typeof getBlogPosts>>[number];
  const posts: BlogPost[] = await getBlogPosts();
  return [
    { url: DATA.url, changeFrequency: "monthly", priority: 1 },
    { url: `${DATA.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((post: BlogPost): MetadataRoute.Sitemap[number] => ({
      url: `${DATA.url}/blog/${post.slug}`,
      lastModified: new Date(post.metadata.publishedAt),
      priority: 0.5,
    })),
  ];
}
