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
      directory: '../../packages/pharos',
      files: '**/*.@(wc|docs|pages).stories.@(js|jsx|mdx|ts)',
    },
  ],
};

export default fullConfig;
