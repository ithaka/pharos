import type { StorybookConfig } from '@storybook/web-components-vite';
import type { Plugin } from 'vite';
import { minifyHTMLLiterals } from 'minify-html-literals';
import config from '../main';

/**
 * Stories import components from src, where icon imports have no file extension
 * (lib gets `.js` added by `build:replace:dynamic`). Vite only bundles variable
 * dynamic imports that include an extension, so add `.ts` for the Storybook build.
 */
const iconImportExtension = (): Plugin => ({
  name: 'pharos-icon-import-extension',
  enforce: 'pre',
  transform(code, id) {
    if (!id.includes('/packages/pharos/src/components/')) return null;
    const pattern = /`\.\.\/\.\.\/styles\/icons\/\$\{([^}]+)\}`/g;
    if (!pattern.test(code)) return null;
    return code.replace(pattern, '`../../styles/icons/${$1}.ts`');
  },
});

/**
 * The published package minifies the HTML template literals, this
 * applies the same minification here to keep Storybook rendering identical to lib.
 */
const componentHtmlMinify = (): Plugin => ({
  name: 'pharos-component-html-minify',
  enforce: 'pre',
  transform(code, id) {
    const [path] = id.split('?');
    if (
      !path.includes('/packages/pharos/src/components/') ||
      !path.endsWith('.ts') ||
      /\.(css|stories|test)\.ts$|\/storyArgs\.ts$/.test(path)
    ) {
      return null;
    }
    const result = minifyHTMLLiterals(code, { fileName: path });
    return result ? { code: result.code, map: result.map } : null;
  },
});

const fullConfig: StorybookConfig = {
  ...config,
  async viteFinal(viteConfig) {
    const merged = await config.viteFinal(viteConfig);
    return {
      ...merged,
      plugins: [iconImportExtension(), componentHtmlMinify(), ...(merged.plugins ?? [])],
    };
  },
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  stories: [
    ...config.stories,
    {
      directory: '../../packages/pharos/docs',
      files: '**/*.docs.mdx',
    },
    {
      directory: '../../packages/pharos',
      files: '**/*.@(wc|pages).stories.ts',
    },
  ],
};

export default fullConfig;
