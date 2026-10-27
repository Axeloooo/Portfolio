import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: `What ${DATA.name} is focused on right now: work, learning and life.`,
};

const BLUR_FADE_DELAY = 0.04;

type NowItem = (typeof DATA.now.items)[number];

// `updated` is a plain date; format it in UTC so it never shifts a day.
const UPDATED_LABEL: string = new Date(`${DATA.now.updated}T00:00:00Z`).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export default function NowPage() {
  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-2 tracking-tighter">now</h1>
        <p className="text-xs text-muted-foreground mb-8">
          Last updated <time dateTime={DATA.now.updated}>{UPDATED_LABEL}</time>
        </p>
      </BlurFade>
      <dl className="space-y-6">
        {DATA.now.items.map((item: NowItem, id: number) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={item.label}>
            <dt className="text-sm font-semibold">{item.label}</dt>
            <dd className="text-sm text-muted-foreground mt-1">{item.text}</dd>
          </BlurFade>
        ))}
      </dl>
    </section>
  );
}
