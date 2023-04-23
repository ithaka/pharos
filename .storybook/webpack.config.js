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

  const TARGET_ENV = 'esnext';

  // https://github.com/evanw/esbuild/issues/1354#issuecomment-855452057
  // https://www.typescriptlang.org/tsconfig#useDefineForClassFields
  const TS_CONFIG_OPTIONS = {
    tsconfigRaw: {
      compilerOptions: {
        useDefineForClassFields: false,
      },
    },
  };

  config.module.rules.forEach((rule) => {
    if (
      /babel-loader/i.test(rule.loader) ||
      /babel-loader/i.test(rule.use?.loader) ||
      (rule.use?.length === 1 && rule.use?.some((use) => /babel-loader/i.test(use.loader)))
    ) {
      delete rule.use;
      rule.loader = 'esbuild-loader';
      rule.options = {
        target: TARGET_ENV,
        ...TS_CONFIG_OPTIONS,
      };
    }
  });

  config.module.rules[0].options = {
    loader: 'tsx',
    target: TARGET_ENV,
    ...TS_CONFIG_OPTIONS,
  };

  if (config.mode === 'production') {
    config.optimization.minimizer = [
      new ESBuildMinifyPlugin({
        target: TARGET_ENV,
        keepNames: true,
        ...TS_CONFIG_OPTIONS,
      }),
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
