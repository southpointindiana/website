// Works out which version of the site is being built: the latest commit's
// short hash and time. Runs once in Node when the build starts (from
// astro.config.mjs) and is handed to the pages as constants.
//
// It must run here rather than inside a page or component: on Cloudflare the
// pages can be rendered in an environment with no git, no build variables,
// and a clock frozen at 1970.
import { execSync } from 'node:child_process';

export function getBuildInfo() {
  try {
    // %h = short hash, %cI = commit time in ISO 8601
    const out = execSync('git log -1 --format=%h%n%cI', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    const [hash, iso] = out.split('\n');
    const date = new Date(iso);
    if (hash && !Number.isNaN(date.getTime())) return { hash, iso: date.toISOString() };
  } catch {
    // git is not usable in this build environment; fall through.
  }
  // Fallback: the commit hash Cloudflare exposes to builds (Workers Builds,
  // then Pages), with the build time standing in for the commit time.
  const sha = process.env.WORKERS_CI_COMMIT_SHA || process.env.CF_PAGES_COMMIT_SHA;
  return { hash: sha ? sha.slice(0, 7) : null, iso: new Date().toISOString() };
}
