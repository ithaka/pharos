/**
 * Build-time consistency check between `navigation.ts` and the site's pages —
 * both the routes under `src/pages` and the entries of each content collection.
 *
 * Nothing otherwise verifies that the hardcoded nav lists line up with the
 * filesystem, so a typo in `navigation.ts` silently ships a sidenav link to a
 * 404, and a new page that nobody adds to `navigation.ts` is reachable only by
 * direct URL. Both are build failures here.
 *
 * The page list is read with `node:fs` rather than `import.meta.glob`. A glob
 * makes every matched page a dependency of whichever module calls it — and
 * because this runs from the sidenav, which is on every page, that pulled each
 * page's `<style is:global>` block into a shared bundle and inlined all of them
 * into all 63 pages. Reading the directory is inert by comparison.
 */
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

import { toSlug } from './textConvert';
import {
  brandExpressionPages,
  componentPages,
  contentStyleGuidePages,
  contributingPages,
  designTokenPages,
  stylePages,
} from './navigation';

/**
 * Resolved from the working directory, not `import.meta.url`: this module is
 * bundled into `dist/.prerender/` before it runs, so a URL relative to itself
 * points into the build output rather than at the source tree. Both `astro
 * build` and `astro dev` run from the package root.
 */
const PAGES_DIR = join(process.cwd(), 'src', 'pages');

/**
 * Collections are not routes on disk, so `PAGES_DIR` cannot see them. Each
 * collection is rendered by a `[...slug]` route and contributes one href per
 * entry, keyed by the directory it lives in.
 */
const CONTENT_DIR = join(process.cwd(), 'src', 'content');

/** Collection directory -> the URL prefix its `[...slug]` route renders at. */
const collectionRoots: Record<string, string> = { components: '/components' };

/** Hrefs rendered by the sidenav that are not derived from `navigation.ts`. */
const standaloneHrefs = ['/getting-started', '/help', '/faqs'];

/**
 * Pages that are deliberately not in the sidenav: `/` is the home page, linked
 * from the logo, and `/404` is never linked.
 */
const unlinkedByDesign = new Set(['/', '/404']);

const sections: [string, readonly string[]][] = [
  ['contributing', contributingPages],
  ['brand-expressions', brandExpressionPages],
  ['content-style-guide', contentStyleGuidePages],
  ['components', componentPages],
  ['design-tokens', designTokenPages],
  ['styles', stylePages],
];

/** Every routable page under `src/pages`, as an href. */
const collectPageHrefs = (dir = PAGES_DIR, prefix = ''): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      return collectPageHrefs(join(dir, entry.name), `${prefix}/${entry.name}`);
    }
    if (!/\.(astro|mdx)$/.test(entry.name)) {
      return [];
    }
    const base = entry.name.replace(/\.(astro|mdx)$/, '');
    /*
     * A `[...slug]` route is a renderer for a collection, not a page of its
     * own. Its entries are enumerated by `collectCollectionHrefs`; counting
     * the route file too would add a literal `/components/[...slug]` href
     * that no nav entry can ever match.
     */
    if (base.startsWith('[')) {
      return [];
    }
    return [base === 'index' ? prefix || '/' : `${prefix}/${base}`];
  });

/**
 * Every collection entry, as the href its `[...slug]` route renders it at.
 *
 * Kept separate from `collectPageHrefs` because the mapping differs: a page's
 * href follows its path under `src/pages`, whereas a collection entry's href
 * is its slug appended to the route that renders the collection.
 */
const collectCollectionHrefs = (): string[] =>
  Object.entries(collectionRoots).flatMap(([dir, root]) =>
    readdirSync(join(CONTENT_DIR, dir), { withFileTypes: true })
      .filter((entry) => entry.isFile() && /\.mdx?$/.test(entry.name))
      .map((entry) => `${root}/${entry.name.replace(/\.mdx?$/, '')}`)
  );

/**
 * Throws if `navigation.ts` and `src/pages` disagree in either direction.
 * Called once from `Sidenav.astro`.
 */
export const assertNavigationMatchesPages = (): void => {
  const pageHrefs = new Set([...collectPageHrefs(), ...collectCollectionHrefs()]);

  const navHrefs = new Set([
    ...standaloneHrefs,
    ...sections.flatMap(([root, pages]) => pages.map((page) => `/${root}/${toSlug(page)}`)),
  ]);

  const missing = [...navHrefs].filter((href) => !pageHrefs.has(href));
  if (missing.length > 0) {
    throw new Error(
      `navigation.ts lists ${missing.length} entr${missing.length === 1 ? 'y' : 'ies'} ` +
        `with no matching page under src/pages, so the sidenav would link to a 404: ` +
        `${missing.sort().join(', ')}.`
    );
  }

  const orphans = [...pageHrefs].filter(
    (href) => !navHrefs.has(href) && !unlinkedByDesign.has(href)
  );
  if (orphans.length > 0) {
    throw new Error(
      `${orphans.length} page(s) exist under src/pages but are absent from ` +
        `navigation.ts, so nothing links to them: ${orphans.sort().join(', ')}. ` +
        `Add them to navigation.ts (order there is the sidenav order), or add them ` +
        `to unlinkedByDesign in src/lib/assertNavigation.ts if that is intended.`
    );
  }
};
