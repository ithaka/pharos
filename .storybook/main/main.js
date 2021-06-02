let config = require('../main');

config.stories.push('../../packages/pharos/**/*.docs.stories.mdx');

config.refs = {
  webComponents: {
    title: 'Web Components',
    url: 'https://pharos-storybooks.netlify.app/wc',
  },
  react: {
    title: 'React',
    url: 'https://pharos-storybooks.netlify.app/react',
  },
};

module.exports = config;
