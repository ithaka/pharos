let config = require('../main');

config.stories.push({
  directory: '../../packages/pharos',
  files: '**/*.@(react|docs|pages).stories.@(js|jsx|mdx|tsx)',
});

module.exports = config;
