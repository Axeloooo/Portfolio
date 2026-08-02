# Portfolio

[![CI](https://github.com/Axeloooo/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Axeloooo/Portfolio/actions/workflows/ci.yml)
[![Release](https://github.com/Axeloooo/Portfolio/actions/workflows/release.yml/badge.svg)](https://github.com/Axeloooo/Portfolio/actions/workflows/release.yml)
[![GitHub Tag](https://img.shields.io/github/v/tag/Axeloooo/Portfolio)](https://github.com/Axeloooo/Portfolio/tags)
[![GitHub Issues](https://img.shields.io/github/issues/Axeloooo/Portfolio)](https://github.com/Axeloooo/Portfolio/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Axeloooo/Portfolio)](https://github.com/Axeloooo/Portfolio/pulls)
[![Contributors](https://img.shields.io/github/contributors/Axeloooo/Portfolio)](https://github.com/Axeloooo/Portfolio/graphs/contributors)
[![Repo Size](https://img.shields.io/github/repo-size/Axeloooo/Portfolio)](https://github.com/Axeloooo/Portfolio)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue)](LICENSE)

My personal portfolio website built with Next.js, showcasing my work experience, projects, skills, and blog.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Commands](#commands)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

| Category       | Technology                              |
| -------------- | --------------------------------------- |
| Framework      | Next.js 14 (App Router)                 |
| Language       | TypeScript 5                            |
| Styling        | Tailwind CSS, shadcn/ui                 |
| Animations     | Framer Motion                           |
| Content        | MDX (blog posts)                        |
| Analytics      | Vercel Analytics & Speed Insights       |
| CI/CD          | GitHub Actions, Semantic Release        |

## Getting Started

**Prerequisites:** Node.js LTS

```bash
npm install
npm run dev
```

The development server starts at `http://localhost:3000`.

## Commands

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start development server     |
| `npm run build`   | Build for production         |
| `npm run start`   | Start production server      |
| `npm run lint`    | Run ESLint                   |

## Contributing

This repo uses [Conventional Commits](https://www.conventionalcommits.org/) and [semantic-release](https://semantic-release.gitbook.io/) to automate versioning and GitHub releases from `main`.

1. Branch off `devel` (e.g. `feature/my-change`, `fix/my-bug`).
2. Open a PR into `devel`. The CI workflow (lint + build) runs automatically.
3. **Always merge with "Squash and merge"** — never "Rebase and merge" or "Create a merge commit". Every PR must land as a single commit so semantic-release can read the history correctly.
4. Give the PR a [Conventional Commits](https://www.conventionalcommits.org/) title, since it becomes the squash commit message:
   - `feat: ...` → minor version bump
   - `fix: ...` → patch version bump
   - `feat!: ...` or a `BREAKING CHANGE:` footer → major version bump
   - `chore:`, `docs:`, `refactor:`, etc. → no release
5. When `devel` is ready to ship, open a PR from `devel` into `main` and squash-merge it the same way. The push to `main` triggers the release workflow, which runs semantic-release to tag a version and publish a GitHub release from the commit history.

`main` and `devel` are both protected branches: direct pushes, force-pushes, and branch deletion are blocked, and all changes must go through a reviewed PR.

## License

Licensed under the [Apache License, Version 2.0](LICENSE).
