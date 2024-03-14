import { mergeConfig } from 'vite';
import path from 'path';

const config = {
  stories: [],
  addons: ['@storybook/addon-a11y', '@storybook/addon-essentials', '@storybook/addon-links'],
  features: {
    storyStoreV7: true,
  },
  docs: {
    autodocs: true,
  },
  async babel(config, { configType }) {
    config = {
      ...config,
      configFile: false,
      plugins: [
        '@babel/plugin-transform-shorthand-properties',
        '@babel/plugin-transform-block-scoping',
        ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
        '@babel/plugin-transform-classes',
        '@babel/plugin-transform-arrow-functions',
        '@babel/plugin-transform-parameters',
        '@babel/plugin-transform-destructuring',
        '@babel/plugin-transform-spread',
        '@babel/plugin-transform-for-of',
        'babel-plugin-macros',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        ['@emotion', { sourceMap: true, autoLabel: 'always' }],
      ],
      presets: [
        ['@babel/preset-env', { shippedProposals: true, useBuiltIns: 'usage', corejs: '3' }],
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'automatic' }],
      ],
    };
    return config;
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      esbuild: {
        keepNames: true,
      },
      resolve: {
        alias: {
          '@lib': path.resolve(__dirname, '../packages/pharos/lib'),
          '@config': path.resolve(__dirname, './'),
        },
      },
      optimizeDeps: {
        include: [
          '@storybook/addon-viewport',
          '@storybook/blocks',
          '@storybook/theming/create',
          '@storybook/web-components',
          'lit/directives/style-map.js',
          'uuid',
        ],
      },
    });
  },
};
export default config;
