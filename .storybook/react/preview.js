import { Canvas } from '@storybook/addon-docs';

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
};
