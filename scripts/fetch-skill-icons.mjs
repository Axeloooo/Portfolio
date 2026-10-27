// Downloads the skill logos into public/skills/ and writes src/data/skill-icons.ts.
// Sources are pinned, so re-running produces identical files.
//
//   node scripts/fetch-skill-icons.mjs

import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SIMPLE_ICONS_VERSION = "16.36.0";
const DEVICON_VERSION = "2.16.0";
const SIMPLE_ICONS_CDN = `https://cdn.jsdelivr.net/npm/simple-icons@${SIMPLE_ICONS_VERSION}`;
const DEVICON_CDN = `https://cdn.jsdelivr.net/gh/devicons/devicon@v${DEVICON_VERSION}/icons`;

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public", "skills");
const MANIFEST = join(ROOT, "src", "data", "skill-icons.ts");

// Single-color logos below 3:1 contrast (WCAG non-text) against the dark
// theme's background (--background in globals.css) are flagged to render white.
const DARK_BACKGROUND_LUMINANCE = 0.0027;
const MIN_CONTRAST = 3;

// name: the skill as written in DATA.skills.
// simpleIcons: Simple Icons slug. devicon: icon path under devicon's icons/.
// lucide: a lucide-react icon for skills without a brand logo.
// darkMode: "tile" puts a multi-color logo with dark parts on a light tile.
const SKILLS = [
  { name: "C", simpleIcons: "c" },
  { name: "C++", simpleIcons: "cplusplus" },
  { name: "C#", devicon: "csharp/csharp-original" },
  { name: "Java", devicon: "java/java-original" },
  { name: "JavaScript", simpleIcons: "javascript" },
  { name: "TypeScript", simpleIcons: "typescript" },
  { name: "Python", simpleIcons: "python" },
  { name: "Go", simpleIcons: "go" },
  { name: "Rust", simpleIcons: "rust" },
  { name: "Dart", simpleIcons: "dart" },
  { name: "SQL", lucide: "DatabaseIcon" },
  { name: "Solidity", simpleIcons: "solidity" },
  { name: "Azure", devicon: "azure/azure-original" },
  { name: "AWS", devicon: "amazonwebservices/amazonwebservices-original-wordmark", darkMode: "tile" },
  { name: "GCP", simpleIcons: "googlecloud" },
  { name: "BigQuery", simpleIcons: "googlebigquery" },
  { name: "Blockchain", lucide: "BlocksIcon" },
  { name: "Ethereum", simpleIcons: "ethereum" },
  { name: "IPFS", simpleIcons: "ipfs" },
  { name: "Kubernetes", simpleIcons: "kubernetes" },
  { name: "Docker", simpleIcons: "docker" },
  { name: "Helm", simpleIcons: "helm" },
  { name: "Argo CD", simpleIcons: "argo" },
  { name: "Terraform", simpleIcons: "terraform" },
  { name: "Linux", simpleIcons: "linux" },
  { name: "Kafka", simpleIcons: "apachekafka" },
  { name: "RabbitMQ", simpleIcons: "rabbitmq" },
  { name: "Redis", simpleIcons: "redis" },
  { name: "MySQL", simpleIcons: "mysql" },
  { name: "PostgreSQL", simpleIcons: "postgresql" },
  { name: ".NET", simpleIcons: "dotnet" },
  { name: "Spring Boot", simpleIcons: "springboot" },
  { name: "Express", simpleIcons: "express" },
  { name: "Django", simpleIcons: "django" },
  { name: "FastAPI", simpleIcons: "fastapi" },
  { name: "React", simpleIcons: "react" },
  { name: "React Native", simpleIcons: "react" },
  { name: "Next.js", simpleIcons: "nextdotjs" },
  { name: "Vue.js", simpleIcons: "vuedotjs" },
  { name: "Redux", simpleIcons: "redux" },
  { name: "Expo", simpleIcons: "expo" },
  { name: "Flutter", simpleIcons: "flutter" },
  { name: "Vite", simpleIcons: "vite" },
  { name: "Tailwind", simpleIcons: "tailwindcss" },
  { name: "gRPC", lucide: "NetworkIcon" }, // Devicon's gRPC is an unreadable wordmark at icon size
  { name: "PyTorch", simpleIcons: "pytorch" },
  { name: "CUDA", simpleIcons: "nvidia" },
  { name: "TensorRT-LLM", simpleIcons: "nvidia" },
  { name: "LLM", lucide: "BrainCircuitIcon" },
  { name: "Gemini", simpleIcons: "googlegemini" },
  { name: "LangChain", simpleIcons: "langchain" },
  { name: "LangGraph", simpleIcons: "langgraph" },
  { name: "Triton", lucide: "CpuIcon" },
  { name: "Jenkins", simpleIcons: "jenkins" },
  { name: "GitHub Actions", simpleIcons: "githubactions" },
  { name: "pytest", simpleIcons: "pytest" },
  { name: "Vitest", simpleIcons: "vitest" },
  { name: "Playwright", devicon: "playwright/playwright-original" },
  { name: "Stripe", simpleIcons: "stripe" },
];

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`);
  return res.text();
}

function fileSlug(name) {
  return name
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/#/g, "sharp")
    .replace(/\./g, "dot")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function luminance(hex) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function escapeXml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

// Simple Icons ship one path in a 24x24 viewBox with no fill; add the brand color.
function simpleIconSvg(source, name, hex) {
  const path = source.match(/<path[^>]*\/>/)?.[0];
  if (!path) throw new Error(`No path in Simple Icons SVG for ${name}`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" fill="#${hex}"><title>${escapeXml(name)}</title>${path}</svg>\n`;
}

// Devicon ships multi-color logos in a 128x128 viewBox; scale them into 24x24.
function deviconSvg(source, name) {
  const inner = source.match(/<svg[^>]*>([\s\S]*)<\/svg>/)?.[1];
  // Some logos reference gradients through xlink:href, which needs its namespace.
  const xlink = /xlink:/.test(inner ?? "") ? ' xmlns:xlink="http://www.w3.org/1999/xlink"' : "";
  if (!inner || !/viewBox="0 0 128 128"/.test(source)) {
    throw new Error(`Unexpected Devicon SVG for ${name}`);
  }
  const body = inner.replace(/\s*\n\s*/g, " ").trim();
  return `<svg xmlns="http://www.w3.org/2000/svg"${xlink} viewBox="0 0 24 24" role="img"><title>${escapeXml(name)}</title><g transform="scale(0.1875)">${body}</g></svg>\n`;
}

async function main() {
  const data = JSON.parse(await fetchText(`${SIMPLE_ICONS_CDN}/data/simple-icons.json`));
  const icons = Array.isArray(data) ? data : data.icons;
  const hexBySlug = new Map(icons.filter((i) => i.slug).map((i) => [i.slug, i.hex]));

  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const entries = [];
  for (const skill of SKILLS) {
    if (skill.lucide) {
      entries.push({ name: skill.name, lucide: skill.lucide });
      continue;
    }
    const file = `${fileSlug(skill.name)}.svg`;
    let svg;
    let darkMode = skill.darkMode;
    if (skill.simpleIcons) {
      const hex = hexBySlug.get(skill.simpleIcons);
      if (!hex) throw new Error(`Simple Icons has no "${skill.simpleIcons}"`);
      svg = simpleIconSvg(await fetchText(`${SIMPLE_ICONS_CDN}/icons/${skill.simpleIcons}.svg`), skill.name, hex);
      const contrast = (luminance(hex) + 0.05) / (DARK_BACKGROUND_LUMINANCE + 0.05);
      if (!darkMode && contrast < MIN_CONTRAST) darkMode = "invert";
    } else {
      svg = deviconSvg(await fetchText(`${DEVICON_CDN}/${skill.devicon}.svg`), skill.name);
    }
    await writeFile(join(OUT_DIR, file), svg);
    entries.push({ name: skill.name, src: `/skills/${file}`, ...(darkMode && { darkMode }) });
  }

  await writeFile(join(OUT_DIR, "README.md"), README);
  await writeFile(MANIFEST, manifest(entries));
  const written = (await readdir(OUT_DIR)).filter((f) => f.endsWith(".svg")).length;
  console.log(`Wrote ${written} logos to public/skills and ${entries.length} entries to src/data/skill-icons.ts`);
}

function manifest(entries) {
  const lines = entries.map(({ name, ...icon }) => {
    const fields = Object.entries(icon).map(([key, value]) => `${key}: ${JSON.stringify(value)}`);
    return `  ${JSON.stringify(name)}: { ${fields.join(", ")} },`;
  });
  return `// Generated by scripts/fetch-skill-icons.mjs. Do not edit by hand.

// src: a logo in public/skills. darkMode "invert" renders a low-contrast logo
// white on the dark theme (brightness-0 invert); "tile" puts a logo with dark
// parts on a light tile.
// lucide: a lucide-react icon name for skills without a brand logo.
export type SkillIcon =
  | { src: string; darkMode?: "invert" | "tile" }
  | { lucide: "BlocksIcon" | "BrainCircuitIcon" | "CpuIcon" | "DatabaseIcon" | "NetworkIcon" };

export const SKILL_ICONS: Record<string, SkillIcon> = {
${lines.join("\n")}
};
`;
}

const README = `# Skill logos

Generated by \`scripts/fetch-skill-icons.mjs\`; re-run it instead of editing these files.

- Most logos come from [Simple Icons](https://simpleicons.org) ${SIMPLE_ICONS_VERSION} (CC0-1.0), with each brand's color added as the fill.
- C#, Java, Azure, AWS and Playwright come from [Devicon](https://devicon.dev) v${DEVICON_VERSION} (MIT), scaled to a 24×24 viewBox.
- SQL, Blockchain, LLM, Triton and gRPC (whose logo is an unreadable wordmark at this size) use [Lucide](https://lucide.dev) icons (ISC) in the app.

All logos are trademarks of their respective owners and are used only to identify the technologies.
`;

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
