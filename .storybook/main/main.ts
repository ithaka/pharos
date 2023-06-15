import type { StorybookConfig } from '@storybook/react-vite';
import config from '../main';

const fullConfig: StorybookConfig = {
  ...config,
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: [...config.stories, '../../packages/pharos/**/*.docs.stories.mdx'],
  refs: (config, { configType }) => {
    const isDevelopment = configType === 'DEVELOPMENT';
    return {
      'web-components': {
        title: 'Web Components',
        url: isDevelopment ? 'http://localhost:9000' : 'https://pharos.jstor.org/storybooks/wc/',
      },
      react: {
        title: 'React',
        url: isDevelopment ? 'http://localhost:9001' : 'https://pharos.jstor.org/storybooks/react/',
      },
    };
  },
};

export default fullConfig;
