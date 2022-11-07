module.exports = {
  features: {
    previewCsfV3: true,
    storyStoreV7: true,
    babelModeV7: true,
    modernInlineRender: true,
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
  webpackFinal: async (config, { configType }) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...(config.resolve || {}).fallback,
        fs: false, // Resolve issues with GitHub Actions builds
        stream: false,
        os: false,
      },
    };
    return config;
  },
};
