import { Canvas } from '@storybook/addon-docs';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import a11yConfig from './a11yConfig';
import theme from './theme';

export const parameters = {
  a11y: a11yConfig,
  controls: { expanded: true },
  docs: {
    inlineStories: true,
    theme: theme,
    components: {
      Canvas: Canvas,
    },
  },
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      ...INITIAL_VIEWPORTS,
    },
  },
  backgrounds: {
    default: 'White',
    values: [
      {
        name: 'White',
        value: '#FFFFFF',
      },
      {
        name: 'Black',
        value: '#000000',
      },
    ],
  },
};
