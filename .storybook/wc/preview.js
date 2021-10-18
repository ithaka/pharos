import { setCustomElementsManifest } from '@storybook/web-components';
import { Canvas } from '@storybook/addon-docs';

import customElementsManifest from '../../packages/pharos/custom-elements.json';
import a11yConfig from '../a11yConfig';
import '../styleConfig';
import theme from '../theme';
import '../../packages/pharos/src/test/initComponents';

window.process = window.process || {};
window.process.env = window.process.env || {};
window.process.env.NODE_ENV = window.process.env.NODE_ENV || 'production';

setCustomElementsManifest(customElementsManifest);

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
};
