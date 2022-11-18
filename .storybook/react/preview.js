import { Canvas } from '@storybook/addon-docs';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

import a11yConfig from '../a11yConfig';
import '../styleConfig';
import theme from '../theme';
import '../../packages/pharos/src/test/initComponents';

export const parameters = {
  a11y: a11yConfig,
  controls: { expanded: true },
  docs: {
    source: { type: 'dynamic' },
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
    defaultViewport: 'responsive',
  },
};
