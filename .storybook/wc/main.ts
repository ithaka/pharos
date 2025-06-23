import type { StorybookConfig } from '@storybook/web-components-vite';
import config from '../main';

const fullConfig: StorybookConfig = {
  ...config,
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
