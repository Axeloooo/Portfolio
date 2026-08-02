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

## Git Workflow & Releases

Branch model: feature branches → `devel` → `main`. Both `devel` and `main` are protected by a repository ruleset (no direct pushes, no force-pushes, no branch deletion, PRs required).

Versioning is fully automated by `semantic-release` (config in `release.config.js`, workflow in `.github/workflows/release.yml`), which only runs on pushes to `main` and reads commit messages via `@semantic-release/commit-analyzer` (Angular preset) to decide the version bump.

**This means every PR into `devel` or `main` must be merged with "Squash and merge", never "Rebase and merge" or "Create a merge commit".** Rebase/merge-commit strategies leave multiple non-squashed commits (or, in the case of GitHub's rebase-and-merge, commits whose signature gets silently dropped on replay) in the history instead of one clean, conventional-commit-formatted entry — this has already caused a signature-verification incident on `devel` that had to be fixed by rewriting history.

The PR title becomes the squash commit message and must follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat: ...` → minor bump
- `fix: ...` → patch bump
- `feat!: ...` or a `BREAKING CHANGE:` footer → major bump
- `chore:`, `docs:`, `refactor:`, etc. → no release

`.github/workflows/ci.yml` (lint + build) runs on every PR targeting `main` or `devel`.
