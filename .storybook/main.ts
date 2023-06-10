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
      assetsInclude: ['**/*.md'],
      resolve: {
        alias: {
          '@lib': path.resolve(__dirname, '../packages/pharos/lib'),
          '@config': path.resolve(__dirname, './'),
        },
      },
      optimizeDeps: {
        include: [
          '@storybook/addon-viewport',
          '@storybook/theming/create',
          '@storybook/web-components',
        ],
      },
    });
  },
};
export default config;
