let config = require('../main');

config.stories.push('../../packages/pharos/**/*.docs.stories.mdx');

config.refs = (config, { configType }) => {
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
      url: 'https://pharos.jstor.org/storybooks/wc',
    },
    react: {
      title: 'React',
      url: 'https://pharos.jstor.org/storybooks/react',
    },
  };
};

module.exports = config;
