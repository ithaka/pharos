import { mergeConfig } from 'vite';
import path from 'path';

const config = {
  stories: [],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-styling',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
  ],
  docs: {
    autodocs: true,
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
