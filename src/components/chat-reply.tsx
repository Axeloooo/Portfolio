import { DATA } from "@/data/resume";
import { allowedLink, type ChatLink } from "@/lib/chat-links";
import Link from "next/link";
import type { ReactNode } from "react";

// A markdown link, a bare URL or a bare email address.
const LINK_PATTERN: RegExp =
  /\[([^\]\n]+)\]\(([^)\s]+)\)|(https?:\/\/[^\s<>()\[\]]+)|([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;
const BOLD_PATTERN: RegExp = /\*\*([^*\n]+)\*\*/g;
const LIST_ITEM: RegExp = /^\s*(?:[-*]|\d+\.)\s+/;
const LINK_CLASS: string = "font-medium underline underline-offset-2 break-words";

// Links outside the allowlist show as their text.
function withLinks(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last: number = 0;
  for (const match of Array.from(text.matchAll(LINK_PATTERN))) {
    const [, mdLabel, mdUrl, bareUrl, email] = match;
    const start: number = match.index ?? 0;
    let whole: string = match[0];
    let label: string;
    let url: string;
    if (mdUrl) {
      label = mdLabel;
      url = mdUrl;
    } else if (bareUrl) {
      // Sentence punctuation right after a URL isn't part of it.
      whole = bareUrl.replace(/[.,;:!?'"]+$/, "");
      label = url = whole;
    } else {
      whole = email.replace(/\.+$/, "");
      label = whole;
      url = `mailto:${whole}`;
    }
    parts.push(text.slice(last, start));
    last = start + whole.length;
    const link: ChatLink | null = allowedLink(url);
    const key: string = `${keyPrefix}-${start}`;
    if (!link) parts.push(label);
    else if (!link.external) {
      parts.push(
        <Link key={key} href={link.href} className={LINK_CLASS}>
          {label}
        </Link>
      );
    } else if (link.href.startsWith("mailto:")) {
      parts.push(
        <a key={key} href={link.href} className={LINK_CLASS}>
          {label}
        </a>
      );
    } else {
      parts.push(
        <a key={key} href={link.href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          {label}
        </a>
      );
    }
  }
  parts.push(text.slice(last));
  return parts;
}

function inline(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last: number = 0;
  for (const match of Array.from(text.matchAll(BOLD_PATTERN))) {
    const start: number = match.index ?? 0;
    parts.push(...withLinks(text.slice(last, start), `${keyPrefix}-${last}`));
    parts.push(
      <strong key={`${keyPrefix}-b${start}`} className="font-semibold">
        {withLinks(match[1], `${keyPrefix}-b${start}`)}
      </strong>
    );
    last = start + match[0].length;
  }
  parts.push(...withLinks(text.slice(last), `${keyPrefix}-${last}`));
  return parts;
}

// Renders the small subset of markdown the chat is told to use: paragraphs,
// bold, bullet or numbered lists, and allowlisted links.
export function ChatReply({ text }: { text: string }): JSX.Element {
  const blocks: string[] = text.split(/\n{2,}/).filter((b: string): boolean => b.trim().length > 0);
  return (
    <div className="space-y-2">
      {blocks.map((block: string, i: number): JSX.Element => {
        const lines: string[] = block.split("\n");
        if (lines.every((line: string): boolean => LIST_ITEM.test(line))) {
          const ordered: boolean = /^\s*\d+\./.test(lines[0]);
          const ListTag = ordered ? "ol" : "ul";
          return (
            <ListTag key={i} className={ordered ? "list-decimal space-y-1 pl-5" : "list-disc space-y-1 pl-5"}>
              {lines.map((line: string, j: number): JSX.Element => (
                <li key={j}>{inline(line.replace(LIST_ITEM, ""), `${i}-${j}`)}</li>
              ))}
            </ListTag>
          );
        }
        return (
          <p key={i} className="whitespace-pre-wrap">
            {inline(block, `${i}`)}
          </p>
        );
      })}
    </div>
  );
}

// Plain text for the clipboard: allowed links become "label (url)", others
// just their label, and bold markers go.
export function replyToPlainText(text: string): string {
  return text
    .replace(/\[([^\]\n]+)\]\(([^)\s]+)\)/g, (_: string, label: string, url: string): string => {
      const link: ChatLink | null = allowedLink(url);
      if (!link) return label;
      const href: string = link.href.startsWith("/") ? `${DATA.url}${link.href}` : link.href.replace(/^mailto:/, "");
      return label === href ? href : `${label} (${href})`;
    })
    .replace(BOLD_PATTERN, "$1");
}
