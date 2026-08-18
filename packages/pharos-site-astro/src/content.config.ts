/**
 * Content collections.
 *
 * `components` holds the 32 component reference pages, which share one
 * structure: a title, a standfirst, and a body that opens with a live demo.
 * As loose pages under `src/pages/components/` nothing verified that shape —
 * a page missing `description` rendered with no standfirst, and a typo'd key
 * was silently ignored. The schema below makes both a build failure.
 *
 * The loader points at `src/content/components/` rather than the old
 * `src/pages/` location so the files stop being routes in their own right;
 * `src/pages/components/[...slug].astro` renders them instead.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const components = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/components' }),
  schema: z.object({
    /** Document title, the page's `<h1>`, and the sidenav label's source. */
    title: z.string(),
    /** The standfirst under the title, and the page's meta description. */
    description: z.string(),
  }),
});

export const collections = { components };
