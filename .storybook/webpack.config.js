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
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
    fallback: {
      crypto: false,
      path: false,
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

  config.module.rules[1].exclude = /node_modules/;

  // Return the altered config
  return config;
};
