const path = require('path');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const { ProvidePlugin } = require('webpack');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.resolve = {
    alias: {
      '@lib': path.resolve(__dirname, '../packages/pharos/lib'),
      '@config': path.resolve(__dirname, './'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
    fallback: {
      crypto: false,
      path: false,
      assert: false,
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

  // TODO: Refactor when Chromatic updates Firefox
  const TARGET_ENV = process.env.GITHUB_WORKFLOW === 'Chromatic' ? 'firefox65' : 'esnext';
  config.module.rules.forEach((rule) => {
    if (
      /babel-loader/i.test(rule.loader) ||
      /babel-loader/i.test(rule.use?.loader) ||
      (rule.use?.length === 1 && rule.use?.some((use) => /babel-loader/i.test(use.loader)))
    ) {
      delete rule.use;
      rule.loader = 'esbuild-loader';
      rule.options = { target: TARGET_ENV };
    }
  });

  config.module.rules[0].options = { loader: 'tsx', target: TARGET_ENV };

  if (config.mode === 'production') {
    config.optimization.minimizer = [
      new ESBuildMinifyPlugin({ target: TARGET_ENV, keepNames: true }),
    ];
  }

  config.plugins.push(
    new ProvidePlugin({
      React: 'react',
    })
  );

  // Return the altered config
  return config;
};
