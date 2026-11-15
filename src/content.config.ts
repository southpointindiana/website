// Defines the "ministries" content collection: one Markdown file per ministry
// in src/content/ministries/. The frontmatter fields are validated below, so a
// typo in a field name fails the build with a clear message instead of
// silently publishing a broken page.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const ministries = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/ministries' }),
  schema: z.object({
    /** Display name, e.g. "Kids Ministry". */
    title: z.string(),
    /** Sort position on the Ministries page (lowest first). */
    order: z.number(),
    /** Who it is for, e.g. "Nursery – 5th grade". */
    audience: z.string().optional(),
    /** Meeting times, one per line. */
    when: z.array(z.string()).default([]),
    /** One-sentence teaser used on cards. */
    summary: z.string(),
    /** Optional dedicated page for this ministry (e.g. "/ministries/manger-shop"). */
    page: z.string().optional(),
  }),
});

export const collections = { ministries };
