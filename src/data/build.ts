// Which version of the site is this? Read from git when the site is built, and
// shown faintly in the footer so anyone can tell which commit is live.
// (Shows the most recent commit; uncommitted local edits are not reflected.)
import { execSync } from 'node:child_process';

function readGit(): { hash: string; date: Date } | null {
  try {
    // %h = short hash, %cI = commit time in ISO 8601
    const out = execSync('git log -1 --format=%h%n%cI', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    const [hash, iso] = out.split('\n');
    const date = new Date(iso);
    return hash && !Number.isNaN(date.getTime()) ? { hash, date } : null;
  } catch {
    // git unavailable: fall back to the hash Cloudflare Pages provides, if any.
    const sha = process.env.CF_PAGES_COMMIT_SHA;
    return sha ? { hash: sha.slice(0, 7), date: new Date() } : null;
  }
}

const info = readGit();

export const build = info && {
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
