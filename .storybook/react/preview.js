import { Canvas } from '@storybook/addon-docs/blocks';

import a11yConfig from '../a11yConfig';
import '../styleConfig';
import theme from '../theme';

export const parameters = {
  a11y: a11yConfig,
  controls: { expanded: true },
  docs: {
    inlineStories: true,
    theme: theme,
    components: {
      Canvas: Canvas,
    },
    source: {
      type: 'code',
    },
  },
};
