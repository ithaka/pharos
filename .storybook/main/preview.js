import { setCustomElements } from '@storybook/web-components';

import customElements from '../../packages/pharos/custom-elements.json';
import '../styleConfig';
import '../../packages/pharos/src/test/initComponents';

window.process = window.process || {};
window.process.env = window.process.env || {};
window.process.env.NODE_ENV = window.process.env.NODE_ENV || 'production';

setCustomElements(customElements);

export { parameters } from '../parameters';
