# Blog feature — design

**Date:** 2026-05-03
**Status:** Approved, awaiting implementation plan
**Owner:** Luke Banicevic

## Goal

Add a blog to the existing portfolio site so the owner can publish ~weekly. Posts are written as markdown files in the repo, rendered as React routes, deployed via Vercel.

## Non-goals (explicit YAGNI)

- RSS feed
- Client-side search
- Comments
- Newsletter signup
- View counts / analytics
- MDX (component embedding inside posts)

## High-level decisions

| Decision            | Choice                                                       |
| ------------------- | ------------------------------------------------------------ |
| Content source      | Markdown files in repo (`src/posts/*.md`)                    |
| Rendering pipeline  | `react-markdown` + remark/rehype plugins (no MDX)            |
| Routing             | `react-router-dom` v6, real client-side routes               |
| Tag pages           | Canonical routes at `/blog/tags/:tag` (not query params)     |
| Hosting             | Vercel (migrating from GitHub Pages)                         |
| Diagrams            | Fenced code blocks with `mermaid` language, lazy-loaded      |
| Drafts              | `draft: true` frontmatter, hidden in prod, visible in dev    |
| Reading time        | Computed at load from word count                             |

## Architecture

### Directory layout

```
src/
  posts/
    YYYY-MM-DD-<slug>.md         # post files
    YYYY-MM-DD-<slug>/           # optional folder for post-local images
      diagram.png
  pages/
    Home.tsx                     # extracted current single-page content
    BlogIndex.tsx                # /blog
    BlogPost.tsx                 # /blog/:slug
    TagPage.tsx                  # /blog/tags/:tag
    NotFound.tsx                 # 404
  lib/
    posts.ts                     # load + parse markdown, return Post[]
    readingTime.ts
    types.ts                     # Post, Frontmatter type definitions
  components/
    MarkdownRenderer.tsx         # react-markdown wrapper with plugins
    MermaidBlock.tsx             # lazy mermaid renderer for code blocks
    PostCard.tsx                 # used in BlogIndex and TagPage
    TagChip.tsx
    PrevNextLinks.tsx
  styles/
    _blog.scss                   # imported into App.scss
```

### Routes (react-router-dom v6)

| Path                  | Component   | Notes                                        |
| --------------------- | ----------- | -------------------------------------------- |
| `/`                   | `Home`      | Existing single-page content, refactored     |
| `/blog`               | `BlogIndex` | All non-draft posts, latest first            |
| `/blog/:slug`         | `BlogPost`  | 404s if slug not found                       |
| `/blog/tags/:tag`     | `TagPage`   | Posts filtered by tag                        |
| `*`                   | `NotFound`  | Unknown route                                |

Blog routes are code-split via `React.lazy` so the home bundle stays small for visitors who never click into `/blog`.

## Post format

### Frontmatter (YAML, parsed by `gray-matter`)

```yaml
---
title: "Wiring telemetry through MQTT keepalives"   # required
date: 2026-05-10                                     # required, ISO date
slug: mqtt-keepalives                                # optional; defaults to filename minus date prefix
summary: "What I learned debugging keepalives…"      # required, used on index + meta description
tags: ["mqtt", "iot"]                                # optional, lowercase, kebab-case
draft: false                                         # optional; default false
cover: ./diagram.png                                 # optional, relative to post folder
---
```

### Validation

`lib/posts.ts` throws at module-load time if any post is missing `title`, `date`, or `summary`. This fails the Vite build, so a malformed post never ships.

### Slug rules

- If frontmatter `slug` is present, use it verbatim.
- Else, derive from filename: `2026-05-10-foo-bar.md` → `foo-bar`.
- Slug never derived from title (re-titling would break URLs).

### Images

- Co-located with post: `src/posts/<slug>/image.png`.
- Referenced relatively in markdown: `![alt](./image.png)`.
- Path resolution: `lib/posts.ts` uses a second `import.meta.glob('../posts/**/*.{png,jpg,jpeg,svg,webp}', { eager: true, query: '?url' })` pass to build a `{ relativePath: resolvedUrl }` map per post. A small remark plugin (or a regex pre-pass in the loader) rewrites `./image.png` references in the body to the Vite-resolved URL before rendering. This avoids a runtime fetch and ensures hashed filenames in production.

### Drafts

`draft: true` posts are returned by `lib/posts.ts` only when `import.meta.env.PROD === false`. Production builds never include them.

## Rendering pipeline

### `lib/posts.ts`

Single source of truth. Loads all posts at build time:

```ts
const modules = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});
```

Each raw markdown string is parsed with `gray-matter`, validated, decorated with `readingTime`, and returned as `Post[]` sorted by `date` descending.

### `MarkdownRenderer`

`react-markdown` with this plugin chain:

| Plugin                       | Purpose                                                |
| ---------------------------- | ------------------------------------------------------ |
| `remark-gfm`                 | GFM tables, task lists, strikethrough, autolinks       |
| `rehype-slug`                | Add `id` to headings                                   |
| `rehype-autolink-headings`   | Click-to-anchor links on `h2`/`h3`                     |
| `rehype-highlight`           | Syntax highlighting for fenced code blocks             |

A custom `code` component override intercepts ` ```mermaid ` blocks and renders `<MermaidBlock>` instead of the default `<pre><code>`.

### `MermaidBlock`

- `mermaid` is dynamically imported the first time a `<MermaidBlock>` mounts (so posts without diagrams don't pull it in).
- On mount, calls `mermaid.render` and injects the resulting SVG into a div.
- Subscribes to the `data-theme` attribute on `<html>`; re-renders when the theme toggles, passing `themeVariables` derived from CSS custom properties.

### Reading time

`readingTime.ts` strips markdown syntax (cheap regex), counts words, divides by 200 (words/min), returns rounded integer ≥ 1. Computed once per post in `lib/posts.ts`.

## Components

### `BlogIndex`

- Heading: `// Writing` (uses existing `.sub-heading` class)
- Optional tag filter row at top — chips that link to `/blog/tags/:tag`
- List of `PostCard` components

### `PostCard`

- `date · {readingTime} min read` muted top line
- `title` (1.05rem, color `--text`)
- `summary` (0.85rem, `--text-muted`)
- Tag chips along the bottom
- Whole card is a `<Link to={/blog/:slug}>`; border darkens on hover (matches existing project card behavior)

### `BlogPost`

- Title (h1, large)
- `date · {readingTime} min read · {tags as chips}` meta line
- Body via `MarkdownRenderer`
- `<PrevNextLinks>` at bottom

If `slug` not found in posts list, renders `<NotFound>`.

### `TagPage`

- Heading: `// tag: <name>`
- List of matching `PostCard`s
- "← all posts" link to `/blog`

### `PrevNextLinks`

Posts are date-sorted; given current post, render its neighbors. No wrap-around — first post has no `prev`, latest has no `next`.

### `NotFound`

Minimal. Heading + "← back home" link. Used for both unknown routes and unknown slugs.

## Styling

All styling reuses existing tokens (`--space-*`, `--accent`, `--border`, `--text-muted`, `--bg-elev`, mono font, `// ` heading prefix). New file `src/styles/_blog.scss` imported into `App.scss`.

### Specific decisions

- Post body: `font-size: 0.95rem`, `line-height: 1.7`, `max-width: 64ch`
- Code blocks: `--bg-elev` background, `highlight.js` palette overridden to project tokens (no rainbow). Keywords use `--accent`, comments use `--text-muted`, default text uses `--text`.
- Mermaid: configured with `theme: 'base'` and `themeVariables` populated from CSS custom properties so diagrams swap on Jedi/Hope toggle.
- `h2`/`h3` inside posts use the same `// ` prefix as homepage section headings.
- Tag chips: identical class to existing `.skill-chip`.

### Nav changes

- Add `Blog` link between `Projects` and `Contact`.
- Scrollspy (`IntersectionObserver`) only runs on `/`. On blog routes, active link is determined by path match (`useLocation`), highlighting `Blog`.

## Data flow

```
.md files in src/posts/
        │
        ▼ (Vite import.meta.glob, build-time)
gray-matter → frontmatter + body
        │
        ▼
posts.ts → validate → compute readingTime → sort → Post[]
        │
        ▼ (consumed by)
BlogIndex / BlogPost / TagPage
        │
        ▼ (render)
MarkdownRenderer → react-markdown + plugins → DOM
        │
        ▼ (intercept code[lang=mermaid])
MermaidBlock → lazy import('mermaid') → SVG
```

## Error handling

| Scenario                              | Behavior                                                         |
| ------------------------------------- | ---------------------------------------------------------------- |
| Post missing required frontmatter     | Throw at build time, fail the build                              |
| Slug not found in route               | Render `<NotFound>` inside the layout                            |
| Mermaid render fails                  | Catch, render fallback `<pre>` of the original mermaid source    |
| Markdown contains broken image link   | `react-markdown` renders broken-image alt text; not fatal        |
| `lib/posts.ts` returns empty list     | `BlogIndex` renders empty-state copy ("No posts yet.")           |

## Deployment migration (GitHub Pages → Vercel)

1. Add `vercel.json` at repo root with SPA rewrite:
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
   ```
2. Connect Vercel project to GitHub repo. Auto-deploy on push to `main`.
3. Re-point custom domain (current `public/CNAME` content) to Vercel via DNS.
4. Remove from `package.json`: `predeploy`, `deploy` scripts; `gh-pages` devDep.
5. Delete `public/CNAME` (Vercel manages domain via dashboard).
6. Update `README.md` deploy section.

## Testing

Lightweight, no e2e:

- **Unit**: `lib/posts.ts` — fixture markdown string → expected `Post` shape (frontmatter parsed, reading time present, draft filtered in prod simulation)
- **Component**: `<BlogPost>` rendering a fixture post — title, date, reading time, body content visible, no broken anchor links
- Existing repo has no e2e infra; we don't add it for this feature

## Dependencies to add

| Package                      | Purpose                          |
| ---------------------------- | -------------------------------- |
| `react-router-dom`           | Routing                          |
| `react-markdown`             | Markdown rendering               |
| `gray-matter`                | Frontmatter parsing              |
| `remark-gfm`                 | GFM extensions                   |
| `rehype-slug`                | Heading IDs                      |
| `rehype-autolink-headings`   | Anchor links on headings         |
| `rehype-highlight`           | Code syntax highlighting         |
| `highlight.js`               | Highlight themes/languages       |
| `mermaid`                    | Diagram rendering (lazy-loaded)  |

## Dependencies to remove

- `gh-pages` (no longer deploying via GH Pages)

## Open items (deferred, not blocking)

- Per-post Open Graph image generation (manual `cover` field is enough for now)
- Sitemap generation script (cheap to add later)
- Pagination on `BlogIndex` (only matters past ~50 posts)

## Out-of-scope items (will not implement)

See "Non-goals" section above.
