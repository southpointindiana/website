# AGENTS.md — instructions for AI assistants

This file is for any AI coding assistant (Claude, ChatGPT/Codex, Gemini, Cursor,
Copilot, …) working on this repository. Read it fully before making changes.
Humans: see `README.md`.

## What this is

The public website for **South Point Church** (New Albany, Indiana),
<https://www.southpointindiana.org>. It is a small static site built with
[Astro](https://astro.build) and hosted on Cloudflare Pages. There is no
backend, database, or CMS: every page is generated from the files in this repo.

The people asking you for changes are often church staff and volunteers, not
programmers. Explain what you changed in plain language, and tell them how to
preview it.

## Commands

Node.js 22 or newer is required (`nix develop` provides it if Nix is installed).

| Command           | What it does                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `npm install`     | Install dependencies (first time, or after `package.json` changes)  |
| `npm run dev`     | Live preview at <http://localhost:4321>; reloads as files change     |
| `npm run build`   | Build the production site into `dist/`. **Must pass before you finish.** |
| `npm run preview` | Serve the built `dist/` folder locally                              |

There are no automated tests. `npm run build` is the check: it validates
content, links to images, and TypeScript in `.astro` files.

## Where things live

```
src/
  data/site.ts            ← SINGLE SOURCE OF TRUTH: service times, address, phone,
                            email, external links, nav menu, leaders, affiliations
  content/ministries/*.md ← one Markdown file per ministry (text + frontmatter)
  content.config.ts       ← allowed frontmatter fields for ministries
  pages/                  ← one file per URL
    index.astro             /                       (home)
    about.astro             /about
    ministries/index.astro  /ministries             (renders content/ministries/*.md)
    ministries/manger-shop.astro  /ministries/manger-shop
    pray.astro              /pray
    404.astro               not-found page
  layouts/Base.astro      ← <head>, header, footer, fonts — wraps every page
  components/             ← Header, Footer, PageHero, Mission, Sermons
  styles/global.css       ← design tokens (colors, type, spacing) + shared classes
  assets/                 ← images processed by Astro (logo, icons, photos)
public/                   ← files copied as-is (favicon, _redirects, robots.txt)
```

## How to make common changes

- **Change a service time, address, phone, email, or external link** → edit
  `src/data/site.ts` only. It flows to every page, the header, and the footer.
- **Edit a ministry's text or schedule** → edit its file in
  `src/content/ministries/`. Body is Markdown; `when:` is a list of times.
- **Add a ministry** → copy an existing `.md` file in that folder, change the
  frontmatter (`title`, `order`, `summary`, optional `audience`, `when`, `page`).
  It appears on `/ministries` and the home page automatically. The filename
  becomes the anchor link (`youth.md` → `/ministries#youth`).
- **Add or change a leader** → edit `leaders` in `src/data/site.ts` and put a
  square photo at `src/assets/leaders/<photo>.jpg` (the `photo` value, no extension).
- **Add a nav link** → edit `nav` in `src/data/site.ts`.
- **Add a page** → create `src/pages/<name>.astro`, wrap it in
  `<Base title="…">`, start with `<PageHero>`, then add it to `nav` if wanted.
  Copy `src/pages/pray.astro` as a minimal example.
- **Change a color, font, or spacing** → edit the tokens at the top of
  `src/styles/global.css`.
- **Rename or remove a URL** → add a line to `public/_redirects` so old links
  keep working.

## Rules

1. **Never hard-code church facts** (times, address, phone, links) in pages or
   components. Import them from `src/data/site.ts`.
2. **Do not change doctrine or meaning.** Statements of belief, the mission,
   and the vision were written by the elders. You may fix typos and tighten
   wording when asked, but never add, remove, or reinterpret theological
   content on your own, and never invent facts (events, times, names, staff).
   If information is missing, ask.
3. **Stay on brand.** Use the design tokens (`var(--orange)`, `var(--ink)`, …);
   do not introduce new colors or fonts. Brand: orange `#F68D30`, logo gray
   `#77787B`, Lexend for headings, Lato for body, and slanted
   (parallelogram) shapes echoing the logo artwork. Do not redraw or
   recolor the logo.
4. **Readable text.** Brand orange is too light for body-size text on white.
   Use `--orange-ink` for orange text and links; use dark text (`--ink`) on
   orange backgrounds.
5. **Fluid, not fixed.** Sizes use the `clamp()`-based tokens (`--text-*`,
   `--space-*`) and grids use `.grid-auto` / `auto-fit`, so layouts adapt
   smoothly to any screen. Avoid fixed pixel widths and avoid adding new
   breakpoints unless a layout truly needs one. Check every change at phone
   width (~390px) and desktop width (~1360px).
6. **Keep it simple and static.** No UI frameworks (React, Vue, Tailwind…), no
   server code, no client-side JavaScript beyond tiny progressive enhancements,
   no new dependencies without asking the user first.
7. **Images** go in `src/assets/` and are rendered with Astro's `<Image>`
   component (automatic resizing and WebP). Always write meaningful `alt` text
   for photos; use `alt=""` for decoration. Resize large originals to
   ≤ 2000px before committing. Only use photos the church has provided, and
   ask before publishing photos of children.
8. **Accessibility.** Semantic HTML, one `<h1>` per page, headings in order,
   visible keyboard focus, respect `prefers-reduced-motion` (already handled
   globally for `.reveal` and transitions).
9. **Styles**: shared pieces in `global.css`; page-specific styles in that
   file's own `<style>` block (Astro scopes them automatically).
10. **Before you finish**: run `npm run build` and make sure it succeeds, then
    summarise for the user what changed and which pages to look at.

## Shared building blocks

CSS classes from `global.css`: `.wrap` (centered container; `.narrow`),
`.section` (vertical band; `.tint`, `.cream`), `.grid-auto` (responsive grid,
tune with `style="--min: 16rem"`), `.stack`, `.heading`, `.eyebrow`, `.btn`
(`.ghost`, `.dark`), `.btn-row`, `.card`, `.chip` / `.chips`, `.prose`,
`.lead`, `.muted`, `.reveal` (fade-up on scroll), `.sr-only`.

Components: `<PageHero title eyebrow>` (inner-page title band),
`<Mission text>` (highlights the words grow / serve / go),
`<Sermons tone>` (embedded YouTube player showing the channel's newest uploads;
used on the home and About pages).

## Deployment

Pushing to the `main` branch publishes the live site via Cloudflare Pages
(build command `npm run build`, output directory `dist`). Every other branch
and pull request gets its own preview URL from Cloudflare. Prefer working on a
branch and letting the user review the preview link before merging to `main`.
Do not commit `dist/` or `node_modules/`.
