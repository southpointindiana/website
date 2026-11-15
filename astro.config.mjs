// Astro configuration. Docs: https://docs.astro.build/en/reference/configuration-reference/
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Used for canonical URLs and social-share tags.
  site: 'https://www.southpointindiana.org',
  // Plain static HTML output (the default) — exactly what Cloudflare Pages serves.
  output: 'static',
});
