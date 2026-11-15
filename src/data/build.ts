// Which version of the site is this? Shown faintly in the footer so anyone can
// tell which commit is live. The two constants are filled in at build time by
// astro.config.mjs (see build-info.mjs for where they come from).
// (Shows the most recent commit; uncommitted local edits are not reflected.)
declare const __BUILD_HASH__: string | null;
declare const __BUILD_TIME__: string;

export const build = {
  /** Short commit hash, or null if it could not be determined. */
  hash: __BUILD_HASH__,
  iso: __BUILD_TIME__,
  /** e.g. "Nov 15, 2026, 3:57 PM ET" (church local time) */
  label:
    new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'America/New_York',
    }).format(new Date(__BUILD_TIME__)) + ' ET',
};
