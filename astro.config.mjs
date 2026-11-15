// Astro configuration. Docs: https://docs.astro.build/en/reference/configuration-reference/
import { defineConfig } from 'astro/config';
import { getBuildInfo } from './build-info.mjs';

const buildInfo = getBuildInfo();

export default defineConfig({
  // Used for canonical URLs and social-share tags.
  site: 'https://www.southpointindiana.org',
  // Plain static HTML output (the default), served by Cloudflare as static files.
  output: 'static',
  vite: {
    // Build-time constants, read in src/data/build.ts for the footer.
    define: {
      __BUILD_HASH__: JSON.stringify(buildInfo.hash),
      __BUILD_TIME__: JSON.stringify(buildInfo.iso),
    },
  },
});
