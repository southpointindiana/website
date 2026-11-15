# South Point Church website

Source for <https://www.southpointindiana.org>: a fast, static site built with
[Astro](https://astro.build) and hosted free on Cloudflare Workers.

> **Status: design sketch.** This is a first draft of the redesign. The live
> site is still the Google Sites version until the domain is pointed here.

## Preview it on your computer

You need [Node.js](https://nodejs.org) 22 or newer (or run `nix develop` if you
use Nix).

```sh
npm install     # first time only
npm run dev     # live preview
```

Open <http://localhost:4321>. The page refreshes by itself whenever a file is
saved, so you (or your AI assistant) can see changes instantly. To view it on
your phone over the same Wi-Fi, run `npm run dev -- --host` and open the
"Network" address it prints.

## Editing with an AI assistant

This repo is set up to be edited with AI tools (Claude, ChatGPT/Codex, Gemini,
Cursor, Copilot, …). The instructions they need are in [`AGENTS.md`](AGENTS.md),
which most tools read automatically. If yours doesn't, start with: *"Read
AGENTS.md first."* Then ask in plain language, for example:

- "Change the Wednesday gathering to 7pm."
- "Add a new ministry called Seniors that meets the second Tuesday at 11am."
- "Replace Dan's photo with the file I just put in my Downloads folder."
- "Add a page about baptism and link it in the menu."

## Editing by hand

| To change…                                   | Edit…                              |
| -------------------------------------------- | ---------------------------------- |
| Service times, address, phone, email, links  | `src/data/site.ts`                 |
| Leaders and affiliations                     | `src/data/site.ts`                 |
| A ministry's description or schedule         | `src/content/ministries/<name>.md` |
| Home / About / Pray wording                  | `src/pages/*.astro`                |
| Colors, fonts, spacing                       | top of `src/styles/global.css`     |
| Photos and logo                              | `src/assets/`                      |

## Publishing (Cloudflare Workers)

The site is published by Cloudflare as a **Worker** named `southpointwebsite`
that serves static files. It is connected to this GitHub repository.

- Current address: <https://southpointwebsite.frosty-bonus-ddf3.workers.dev>
- Every push to the `main` branch publishes the site in about a minute.
- The bottom of every page shows "Updated <time> · <commit>", so you can tell
  which version is live.

Cloudflare build settings (dashboard → **Workers & Pages** → `southpointwebsite`
→ **Settings → Build**):

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy` (keep this; it is what publishes the site)

`wrangler.jsonc` tells Cloudflare where the built site is and to show our own
"page not found" page. `public/_redirects` keeps the old Google Sites addresses
(`/home`, `/about-us_1`) working.

**Going live on the real domain:** in the Worker's **Settings → Domains &
Routes**, add `www.southpointindiana.org` as a custom domain and follow the DNS
instructions. Until then the domain still shows the Google Sites version.
