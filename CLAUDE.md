# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run start    # Start production server
```

No test suite is configured.

## Architecture

This is a **Next.js 14 App Router** portfolio site built with TypeScript, Tailwind CSS, and shadcn/ui.

### Content Data Layer

All portfolio content lives in a single file: `src/data/resume.tsx`. This exports a `DATA` object containing personal info, work experience, education, skills, projects, and social links. **This is the primary file to edit when updating portfolio content.**

### Page Structure

- `src/app/page.tsx` — Home page assembling all portfolio sections (hero, work, education, projects, skills, contact)
- `src/app/blog/page.tsx` — Blog listing
- `src/app/blog/[slug]/page.tsx` — Individual blog posts rendered from MDX
- `src/app/layout.tsx` — Root layout with theme providers and analytics

### Blog System

Blog posts are `.mdx` files in `content/`. The `src/data/blog.ts` utility handles parsing frontmatter (via `gray-matter`) and converting markdown to HTML using a remark/rehype pipeline with `rehype-pretty-code` (Shiki) for syntax highlighting.

### Component Layers

- `src/components/ui/` — shadcn/ui primitives (do not edit directly; regenerate via shadcn CLI)
- `src/components/magicui/` — Custom animation components (`BlurFade`, `BlurFadeText`, `Dock`)
- `src/components/` — Feature components (`ProjectCard`, `ResumeCard`, `HackathonCard`, etc.)

### Styling

- Tailwind CSS with HSL CSS variables for theming (defined in `src/app/globals.css`)
- Dark mode via `class` strategy with `next-themes`
- Theme-aware favicons handled by `src/components/favicon-switcher.tsx`

### Path Alias

`@/*` maps to `src/*` — use this for all internal imports.
