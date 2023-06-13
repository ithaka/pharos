import config from '../main';

const fullConfig = {
  ...config,
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  stories: [
    {
      directory: '../../packages/pharos',
      files: '**/*.@(wc|docs|pages).stories.@(js|jsx|mdx|ts)',
    },
  ],
};

export default fullConfig;
