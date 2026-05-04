# Portfolio + Blog

Personal site at [lukebanicevic.com](https://lukebanicevic.com). Portfolio + a
markdown blog. Built with Next.js 16 (App Router) on React 19, deployed to
Vercel.

## Stack

- **Next.js 16** — App Router, React Server Components by default
- **React 19**
- **TypeScript**, strict
- **SCSS** — single global stylesheet, CSS custom properties for theming
- **Markdown** — posts in `posts/`, parsed at build time with `gray-matter` and
  rendered via `react-markdown` + `remark-gfm` + `rehype-highlight`
- **Mermaid** — fenced ` ```mermaid ` code blocks render as diagrams (lazy-loaded)
- **next/font** — JetBrains Mono, self-hosted
- **next/image** — responsive sprite + profile pic, AVIF/WebP-negotiated

Vercel hobby tier, auto-deploys on push to `main`.

## Repo layout

```
app/                # routes (Next App Router)
  layout.tsx        # root layout, metadata, font, ThemeProvider
  page.tsx          # /
  not-found.tsx
  blog/
    page.tsx        # /blog (list)
    [slug]/page.tsx # /blog/<slug>
    tags/[tag]/page.tsx
  sitemap.ts        # auto-generates /sitemap.xml
  robots.ts         # /robots.txt
  globals.scss
  icon.png          # favicon (Next convention)
  apple-icon.png
components/         # shared UI (Server + Client components)
  Nav.tsx, Footer.tsx, ThemeProvider.tsx, MarkdownRenderer.tsx, ...
lib/
  posts.ts          # fs-based markdown loader, server-only, React.cache()
  readingTime.ts
  types.ts
constants/          # static data: skills, projects
posts/              # markdown blog posts
public/
  assets/           # profile sprite, profile photo
  documents/        # resume.pdf
  theme-init.js     # FOUC-prevention, runs beforeInteractive
docs/superpowers/   # design specs + implementation plans
```

## Local dev

```
npm install
npm run dev
```

Site runs at <http://localhost:3000>.

## Scripts

| Command            | What it does                                     |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Next dev server with Turbopack on :3000          |
| `npm run build`    | Production build, prerenders all static routes   |
| `npm run start`    | Serve the production build                       |
| `npm run lint`     | ESLint via `next lint`                           |
| `npm run type-check` | `tsc --noEmit`                                 |

## Writing a post

1. Create `posts/YYYY-MM-DD-<slug>.md`.
2. Add YAML frontmatter:

   ```yaml
   ---
   title: Post title
   date: 2026-05-04
   summary: One-line preview shown on the index and in meta tags.
   tags: ["topic", "another-topic"]
   draft: false   # optional; drafts hide in prod, show in dev
   ---
   ```

3. Write markdown. Code fences with a language tag get syntax highlighting.
   Use ` ```mermaid ` for diagrams.

4. Commit + push. Vercel auto-deploys.

The slug is derived from the filename (date prefix stripped). To override,
set `slug: custom-slug` in frontmatter.

## SEO

- Per-route `<title>` + `<meta description>` + canonical via the Next Metadata
  API
- OG + Twitter card meta on every page
- JSON-LD: `Person` on `/`, `BlogPosting` on each post
- `/sitemap.xml` and `/robots.txt` generated at build
- All pages prerendered (no client-side rendering needed for crawlers)

## Theming

Two themes via CSS custom properties on `<html data-theme="...">`:

- **Dark** (Return of the Jedi) — green saber accent
- **Light** (A New Hope) — blue saber accent

Persisted in `localStorage` under `portfolio-theme`. `public/theme-init.js`
runs before paint to apply the saved or system-preferred theme, avoiding FOUC.

## Deployment

Auto-deploys on push to `main` via the GitHub integration on Vercel. Custom
domain configured in the Vercel dashboard.

## Design + plan docs

Spec and implementation plan for the blog feature live under
`docs/superpowers/`. Useful as a reference for how the project is structured
and why decisions were made.
