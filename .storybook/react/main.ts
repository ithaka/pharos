import type { StorybookConfig } from '@storybook/react-vite';
import config from '../main';

const fullConfig: StorybookConfig = {
  ...config,
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: [
    ...config.stories,
    {
      directory: '../../packages/pharos',
      files: '**/*.@(react|pages).stories.@(js|jsx|mdx|tsx)',
    },
    {
      directory: '../../packages/pharos',
      files: '**/*.docs.mdx',
    },
  ],
};

export default fullConfig;
