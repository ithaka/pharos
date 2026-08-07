import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

const resolve = (path) => fileURLToPath(new URL(path, import.meta.url));

// https://astro.build
export default defineConfig({
  site: 'https://pharos.jstor.org',
  // Matches the Gatsby site's `trailingSlash: 'never'` so URLs are identical.
  trailingSlash: 'never',
  build: {
    // Emit `/about.html` rather than `/about/index.html` to keep extensionless,
    // slash-free URLs consistent with the Gatsby output.
    format: 'file',
  },
  integrations: [mdx()],
  markdown: {
    // Gatsby rendered page text verbatim. Astro's smartypants would rewrite
    // straight quotes and dashes into typographic ones ("they're" -> "they’re"),
    // which would change the copy, so it stays off.
    //
    // This emits a deprecation warning pointing at a `satteri()` processor, but
    // that export does not exist in the installed @astrojs/markdown-remark
    // (7.2.1) — it belongs to a later release. Revisit when that package is
    // upgraded; until then this option is what keeps the copy byte-identical.
    smartypants: false,
  },
  vite: {
    resolve: {
      alias: {
        '@components': resolve('./src/components'),
        '@layouts': resolve('./src/layouts'),
        '@images': resolve('./public/images'),
        '@lib': resolve('./src/lib'),
      },
      // The Pharos workspace package is symlinked; preserve that so a single
      // copy of Lit is used and custom elements register only once.
      preserveSymlinks: false,
    },
    ssr: {
      // Pharos ships Lit-based custom elements that must not be externalized,
      // otherwise `customElements` is touched during SSR.
      //
      // `cookie` is bundled because Astro's prerender entry imports it from
      // `dist/`, which sits outside this workspace's `node_modules`. Left
      // external, Node resolves the older CommonJS `cookie` hoisted to the repo
      // root by Gatsby/express instead of the ESM v2 copy Astro requires, and
      // the build fails on the missing `parseCookie` named export.
      noExternal: ['@ithaka/pharos', 'cookie'],
    },
  },
});
