import { configure, setCustomElements } from '@storybook/web-components';
import { Canvas } from '@storybook/addon-docs/blocks';

import customElements from '../../packages/pharos/custom-elements.json';
import a11yConfig from '../a11yConfig';
import '../styleConfig';
import theme from '../theme';

window.process = window.process || {};
window.process.env = window.process.env || {};
window.process.env.NODE_ENV = window.process.env.NODE_ENV || 'production';

setCustomElements(customElements);

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

// force full reload to not re-register web components
const req = require.context(
  '../../packages/pharos',
  true,
  /\.(wc|docs|pages)\.stories\.(js|mdx|ts)$/
);
configure(req, module);
if (module.hot) {
  module.hot.accept(req.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, null, currentLocationHref);
    window.location.reload();
  });
}
