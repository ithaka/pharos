import { mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';

import path, { dirname, join } from 'path';

const config = {
  stories: [],
  addons: [
    { name: '@storybook/addon-a11y' },
    { name: '@storybook/addon-docs' },
    { name: '@storybook/addon-links' },
  ],
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
      plugins: [react()],
      optimizeDeps: {
        exclude: ['fsevents'],
        include: [
          '@storybook/web-components',
          '@vitejs/plugin-react',
          'lit/directives/style-map.js',
          'uuid',
        ],
      },
    });
  },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
