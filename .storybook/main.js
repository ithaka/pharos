module.exports = {
  features: {
    previewCsfV3: true,
  },
  core: {
    builder: 'webpack5',
  },
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        sourceLoaderOptions: {
          parser: 'typescript',
          injectStoryParameters: false,
        },
        transcludeMarkdown: true,
      },
    },
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-controls',
    '@storybook/addon-google-analytics',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    '@storybook/addon-storysource',
    '@storybook/addon-backgrounds',
  ],
  stories: [],
  staticDirs: ['../assets'],
};
