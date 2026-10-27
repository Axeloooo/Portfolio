import { DATA } from "@/data/resume";

// Links the chat may render. Everything else in a reply stays plain text, so
// the model can't send visitors to a URL it made up.
export const SECTION_IDS: readonly string[] = [
  "about",
  "education",
  "work",
  "research",
  "leadership",
  "skills",
  "projects",
  "certificates",
  "contact",
];

const SITE_ORIGIN: string = "https://axelsanchez.me";
const GITHUB_PREFIX: string = "https://github.com/Axeloooo/";
// Contact links come from DATA so they stay in sync with the site.
export const CONTACT_LINKS: readonly string[] = [
  `mailto:${DATA.contact.email}`,
  DATA.contact.social.LinkedIn.url,
  DATA.contact.social.GitHub.url,
];

const withoutTrailingSlash = (url: string): string => url.replace(/\/+$/, "");

export type ChatLink = { href: string; external: boolean };

export function allowedLink(url: string): ChatLink | null {
  const href: string = url.startsWith(SITE_ORIGIN) ? url.slice(SITE_ORIGIN.length) || "/" : url;
  if (CONTACT_LINKS.some((link: string): boolean => withoutTrailingSlash(link) === withoutTrailingSlash(href))) {
    return { href, external: !href.startsWith("mailto:") };
  }
  const repoPath: string = href.slice(GITHUB_PREFIX.length);
  if (href.startsWith(GITHUB_PREFIX) && /^[\w.-]+(\/[\w.-]+)*$/.test(repoPath) && !repoPath.split("/").includes("..")) {
    return { href, external: true };
  }
  // The PDF opens in a new tab like the site's Download Resume button.
  if (href === "/Resume.pdf") return { href, external: true };
  if (
    href === "/" ||
    /^\/blog\/[a-z0-9-]+$/.test(href) ||
    SECTION_IDS.some((id: string): boolean => href === `/#${id}`)
  ) {
    return { href, external: false };
  }
  return null;
}
