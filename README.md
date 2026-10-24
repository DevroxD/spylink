# Spylink — Security Studio Portfolio

A dark-first, editorial portfolio for a cybersecurity studio working across
penetration testing, security audits, digital forensics, and reverse engineering.
Includes a light theme you can toggle from the header.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS 4**.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Hero, capabilities, method, latest field notes, CTA |
| `/services` | Four detailed capabilities, process, engagement models, FAQ |
| `/learn` | Featured article, searchable/filterable archive, field docs, newsletter |
| `/learn/[slug]` | Article and document reader with sticky table of contents |
| `/about` | Manifesto, operator card, principles, timeline, toolkit, contact |

Also included: `not-found.tsx`, `sitemap.xml`, `robots.txt`, an SVG favicon, and a
generated Open Graph image.

## Design system

The visual language is an "ops console" theme: near-black greens, a single acid
lime accent, hairline borders, numbered sections, monospace labels, oversized
editorial type, and subtle grid/noise texture.

- **Colors** — `void`, `ink`, `panel`, `line`, `bone`, `muted`, `dim`, `acid`, `jade`
  (defined as Tailwind theme tokens in `src/app/globals.css`; a
  `[data-theme="light"]` block overrides them for the light theme)
- **Theming** — `ThemeToggle` in the header switches between dark and light,
  stores the choice in `localStorage`, and otherwise follows
  `prefers-color-scheme`. A `beforeInteractive` script applies the theme before
  first paint to avoid a flash.
- **Type** — Space Grotesk (display), Inter (body), JetBrains Mono (labels/code),
  loaded with `next/font`
- **Texture** — fixed grid field, film grain overlay, corner ticks, panel grids
- **Motion** — reveal-on-load, radar sweep, marquee, blink, and scroll cue; all
  disabled under `prefers-reduced-motion`
- **Components** — `src/components/` (header, footer, page hero, section heading,
  service cards, archive filter, threat console, CTA)

## Content

All copy and article data live in [`src/lib/content.ts`](src/lib/content.ts):
services, process, engagement models, FAQs, articles, field docs, principles,
timeline, toolkit, and certifications. Add an entry to `entries` and it will
appear in the archive, get a statically generated page, and be added to the
sitemap automatically.

## Notes

- The telemetry in the hero console is clearly labelled sample data.
- The contact and newsletter flows use `mailto:` links — there is no backend,
  database, or tracking. No cookies are set. The theme preference is the only
  value stored, and it stays in `localStorage`.
- Client-side interactivity is limited to the navigation, the archive filter,
  the FAQ disclosure, and the theme toggle, so the site stays almost entirely
  static.
