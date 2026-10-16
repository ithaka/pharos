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
      // Smartypants would rewrite straight quotes and dashes into typographic ones
      smartypants: false,
      rehypePlugins: [rehypeUnwrapPharosParagraphs],
    }),
  },
  vite: {
    // An empty inline config stops Vite searching upwards and finding the repo
    // root's `postcss.config.js`, which errors here.
    css: { postcss: {} },

    // Pharos uses `data-pharos-component` from `constructor.name` for styling, so mangling
    // the name breaks some css  selectors
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
      // Externalized, Pharos' Lit elements interact with `customElements` during SSR.
      //
      // `cookie` is bundled because Astro's prerender entry imports it from
      // `dist/`, outside this workspace's `node_modules`. Left external, Node
      // resolves the CommonJS copy hoisted to the repo root instead of the ESM
      // v2 one Astro needs, and the build fails on a missing `parseCookie`.
      noExternal: ['@ithaka/pharos', 'cookie'],
    },
  },
});
