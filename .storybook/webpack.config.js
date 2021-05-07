const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.resolve = {
    alias: {
      '@lib': path.resolve(__dirname, '../packages/pharos/lib'),
      '@docs': path.resolve(__dirname, '../packages/pharos-site/static'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
    fallback: {
      crypto: false,
    },
  };

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          implementation: require('sass'),
        },
      },
    ],
  });

  // Need to transpile for IE11
  const babelLoaderRule = config.module.rules.find(
    (item) => item.use && item.use.some && item.use.some((use) => /babel-loader/i.test(use.loader))
  );
  if (babelLoaderRule) {
    config.module.rules.unshift({
      use: babelLoaderRule.use,
      include: [path.dirname(require.resolve('@ithaka/focus-trap'))],
    });
  }

  // Return the altered config
  return config;
};
