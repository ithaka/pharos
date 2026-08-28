import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';

import { rehypeUnwrapPharosParagraphs } from './src/lib/rehypeUnwrapPharosParagraphs.ts';

const resolve = (path) => fileURLToPath(new URL(path, import.meta.url));

// https://astro.build
export default defineConfig({
  site: 'https://pharos.jstor.org',
  trailingSlash: 'never',
  build: {
    // Emit `/about.html` rather than `/about/index.html` to keep URLs
    // extensionless and slash-free.
    format: 'file',
  },
  integrations: [mdx()],
  markdown: {
    processor: unified({
      // disable GitHub Flavored Markdown to prevent links in examples being double linked
      gfm: false,
      // Smartypants would rewrite straight quotes and dashes into typographic
      // ones ("they're" -> "they’re"), changing the copy, so it stays off.
      smartypants: false,
      // Drops the `<p>` CommonMark puts around a Pharos element's content, so
      // examples render correctly
      rehypePlugins: [rehypeUnwrapPharosParagraphs],
    }),
  },
  vite: {
    // Pharos stamps `data-pharos-component` from `constructor.name` and styles
    // itself through it (`[data-pharos-component="PharosIcon"]`). Mangling that
    // name unmatches the selector and breaks the styles
    esbuild: {
      keepNames: true,
    },
    build: {
      minify: 'esbuild',
    },
    resolve: {
      alias: {
        '@components': resolve('./src/components'),
        '@layouts': resolve('./src/layouts'),
        '@images': resolve('./src/images'),
        '@lib': resolve('./src/lib'),
      },
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
