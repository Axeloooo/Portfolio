import { Marquee } from "@/components/magicui/marquee";
import { SKILL_ICONS, type SkillIcon } from "@/data/skill-icons";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { BlocksIcon, BrainCircuitIcon, CpuIcon, DatabaseIcon, NetworkIcon, type LucideIcon } from "lucide-react";
import Image from "next/image";

type LucideName = Extract<SkillIcon, { lucide: string }>["lucide"];

const LUCIDE_ICONS: Record<LucideName, LucideIcon> = {
  BlocksIcon,
  BrainCircuitIcon,
  CpuIcon,
  DatabaseIcon,
  NetworkIcon,
};

function SkillLogo({ name }: { name: string }) {
  const icon: SkillIcon | undefined = SKILL_ICONS[name];
  if (!icon) return null;
  if ("lucide" in icon) {
    const Icon: LucideIcon = LUCIDE_ICONS[icon.lucide];
    return <Icon aria-hidden className="size-5 text-muted-foreground" />;
  }
  return (
    <Image
      src={icon.src}
      alt=""
      width={20}
      height={20}
      loading="lazy"
      unoptimized
      className={cn(
        "size-5",
        // Low-contrast logos turn white on the dark theme; dark wordmarks get a light tile.
        icon.darkMode === "invert" && "dark:brightness-0 dark:invert",
        icon.darkMode === "tile" && "dark:rounded-sm dark:bg-white dark:p-px"
      )}
    />
  );
}

function SkillPill({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap rounded-lg border bg-background px-3 py-1.5 text-sm">
      <SkillLogo name={name} />
      {name}
    </span>
  );
}

// Two rows scrolling in opposite directions; the list is split in half.
export default function SkillsMarquee() {
  const skills: readonly string[] = DATA.skills;
  const half: number = Math.ceil(skills.length / 2);
  const rows: (readonly string[])[] = [skills.slice(0, half), skills.slice(half)];

  return (
    <div className="flex flex-col gap-2">
      {rows.map((row: readonly string[], index: number) => (
        <Marquee key={index} reverse={index === 1} duration={50}>
          {row.map((skill: string) => (
            <SkillPill key={skill} name={skill} />
          ))}
        </Marquee>
      ))}
    </div>
  );
}
