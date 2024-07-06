import type { StorybookConfig } from '@storybook/web-components-vite';
import config from '../main';

const fullConfig: StorybookConfig = {
  ...config,
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  stories: [...config.stories, '../../packages/pharos/**/*.docs.tsx'],
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
