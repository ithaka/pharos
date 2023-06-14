import config from '../main';

const fullConfig = {
  ...config,
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  stories: ['../../packages/pharos/**/*.docs.stories.mdx'],
  refs: (config, { configType }) => {
    if (configType === 'DEVELOPMENT') {
      return {
        webComponents: {
          title: 'Web Components',
          url: 'http://localhost:9000',
        },
        react: {
          title: 'React',
          url: 'http://localhost:9001',
        },
      };
    }
    return {
      webComponents: {
        title: 'Web Components',
        url: 'https://pharos-storybooks.netlify.app/wc/',
      },
      react: {
        title: 'React',
        url: 'https://pharos-storybooks.netlify.app/react/',
      },
    };
  },
};

export default fullConfig;
