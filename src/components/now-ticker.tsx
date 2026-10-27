import { Marquee } from "@/components/magicui/marquee";
import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import Link from "next/link";

type BlogPost = Awaited<ReturnType<typeof getBlogPosts>>[number];
type NowItem = (typeof DATA.now.items)[number];

async function latestPostTitle(): Promise<string | undefined> {
  const posts: BlogPost[] = await getBlogPosts();
  const latest: BlogPost | undefined = posts.sort(
    (a: BlogPost, b: BlogPost): number =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  )[0];
  return latest?.metadata.title;
}

// A thin strip of what I'm up to, built from DATA.now plus the latest post.
// The whole strip is one link to /now, so the marquee's hidden copy holds no
// focusable links; screen readers read the visible copy as the link text.
export default async function NowTicker() {
  const postTitle: string | undefined = await latestPostTitle();
  const items: { label: string; text: string }[] = [
    ...DATA.now.items.map(({ label, text }: NowItem) => ({ label, text })),
    ...(postTitle ? [{ label: "Latest post", text: postTitle }] : []),
  ];

  return (
    <Link
      href="/now"
      className="block rounded-lg border bg-muted/40 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      <Marquee duration={60} className="[--gap:2rem]">
        {items.map(({ label, text }) => (
          <span key={label} className="whitespace-nowrap">
            <span className="font-semibold text-foreground">{label}:</span> {text}
          </span>
        ))}
      </Marquee>
    </Link>
  );
}
