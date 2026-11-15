// Which version of the site is this? Read from git when the site is built, and
// shown faintly in the footer so anyone can tell which commit is live.
// (Shows the most recent commit; uncommitted local edits are not reflected.)
import { execSync } from 'node:child_process';

function readGit(): { hash: string | null; date: Date } {
  try {
    // %h = short hash, %cI = commit time in ISO 8601
    const out = execSync('git log -1 --format=%h%n%cI', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    const [hash, iso] = out.split('\n');
    const date = new Date(iso);
    if (hash && !Number.isNaN(date.getTime())) return { hash, date };
  } catch {
    // git is not usable in this build environment; fall through.
  }
  // Fallback: the commit hash that Cloudflare's build systems expose as an
  // environment variable (Pages, then Workers Builds), with the build time
  // standing in for the commit time. If no hash is available either, the
  // footer shows just the time.
  const sha = process.env.CF_PAGES_COMMIT_SHA || process.env.WORKERS_CI_COMMIT_SHA;
  return { hash: sha ? sha.slice(0, 7) : null, date: new Date() };
}

const info = readGit();

export const build = {
  hash: info.hash,
  iso: info.date.toISOString(),
  /** e.g. "Nov 15, 2026, 3:57 PM ET" (church local time) */
  label:
    new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'America/New_York',
    }).format(info.date) + ' ET',
};
