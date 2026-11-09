import type { StorybookConfig } from '@storybook/web-components-vite';
import type { Plugin } from 'vite';
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

const fullConfig: StorybookConfig = {
  ...config,
  async viteFinal(viteConfig) {
    const merged = await config.viteFinal(viteConfig);
    return { ...merged, plugins: [iconImportExtension(), ...(merged.plugins ?? [])] };
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
