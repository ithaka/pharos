import config from '../main';

const fullConfig = {
  ...config,
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: [
    {
      directory: '../../packages/pharos',
      files: '**/*.@(react|docs|pages).stories.@(js|jsx|mdx|tsx)',
    },
  ],
};

export default fullConfig;
