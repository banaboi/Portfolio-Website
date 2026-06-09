# Security

This is a static-rendered Next.js (App Router) portfolio and blog. It has no
API routes, no server-side forms, no authentication, and no database. All
content is author-authored markdown in `posts/`, committed to the repo — there
is no visitor-controlled input surface.

## Implemented controls

### HTTP response headers (`next.config.ts`)

- **Content-Security-Policy** — `default-src 'self'`; strict `frame-ancestors`,
  `object-src 'none'`, `base-uri`, and `form-action`. `script-src`/`style-src`
  allow `'unsafe-inline'` because Next's App Router emits inline hydration
  scripts and mermaid emits inline SVG `<style>`; a nonce is intentionally not
  used so pages stay statically cacheable (acceptable given no untrusted input).
- **Strict-Transport-Security** — `max-age=63072000; includeSubDomains`
  (`preload` deliberately omitted; see the comment in `next.config.ts`).
- **X-Content-Type-Options** `nosniff`, **X-Frame-Options** `DENY`,
  **Referrer-Policy** `strict-origin-when-cross-origin`.
- **Cross-Origin-Opener-Policy** `same-origin`, **Cross-Origin-Resource-Policy**
  `same-site` (so social crawlers can still fetch the OG image).
- **Permissions-Policy** disables camera/mic/geolocation/payment/usb/sensors and
  opts out of the Topics/FLoC advertising APIs.
- **X-Permitted-Cross-Domain-Policies** `none`; `X-Powered-By` disabled.

### Rendering

- Markdown is rendered with `react-markdown` v9 **without `rehype-raw`**, so raw
  HTML in posts is escaped, not executed. `javascript:`/`data:` URIs in links
  are stripped by react-markdown's built-in URL sanitizer.
- Mermaid diagrams render with `securityLevel: "strict"`.
- The single JSON-LD `dangerouslySetInnerHTML` sink (`components/JsonLd.tsx`)
  escapes `<`, `>`, `&`, and U+2028/U+2029 to prevent `</script>` breakout.

### Data & build

- `lib/posts.ts` is `server-only`; draft posts are filtered out when
  `NODE_ENV === "production"` and `noindex` posts are excluded from the sitemap.
- No secrets are required or embedded; no `NEXT_PUBLIC_` values are used. `.env*`
  files are git-ignored and untracked.
- Production browser source maps are disabled.
- External links use `rel="noopener noreferrer"`. Fonts are self-hosted by
  `next/font`; there are no third-party scripts, CDNs, or analytics.

### CI / supply chain

- `.github/workflows/ci.yml` runs type-check, lint, Prettier, and tests with
  coverage on every push/PR. It uses least-privilege `permissions: contents:
  read` and pins actions to commit SHAs.
- Dependencies are installed from a committed lockfile via `npm ci`. Dependabot
  (`.github/dependabot.yml`) tracks npm and GitHub Actions updates weekly.

## Maintenance

- Run `npm audit` regularly; apply `npm audit fix` for in-range patches.
- If a contact form, comments, or any other untrusted-input feature is ever
  added, revisit the CSP `script-src` (move to a nonce) and add input
  validation, rate limiting, and spam protection at that point.

## Reporting a vulnerability

Email **lukebanicevic@gmail.com** with details and reproduction steps.
