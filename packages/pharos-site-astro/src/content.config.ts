/**
 * Content collections. `components` holds the component reference pages, which
 * `src/pages/components/[...slug].astro` renders.
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
