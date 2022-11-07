let config = require('../main');

config.stories.push({
  directory: '../../packages/pharos',
  files: '**/*.@(wc|docs|pages).stories.@(js|jsx|mdx|ts)',
});

module.exports = config;
