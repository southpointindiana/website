# South Point Church website

Source for <https://www.southpointindiana.org>: a fast, static site built with
[Astro](https://astro.build) and hosted free on Cloudflare Pages.

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

## Publishing (Cloudflare Pages)

One-time setup:

1. Push this repository to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**
   and pick the repository.
3. Build settings: framework preset **Astro**, build command `npm run build`,
   output directory `dist`. Node version comes from `.nvmrc` (22).
4. When you're ready to go live, add `www.southpointindiana.org` under
   **Custom domains** and follow the DNS instructions.

After that:

- Every push to `main` publishes the live site in about a minute.
- Every other branch or pull request gets its own **preview link**
  (`<branch>.<project>.pages.dev`) to share for review before it goes live.

`public/_redirects` keeps the old Google Sites addresses (`/home`,
`/about-us_1`) working.
