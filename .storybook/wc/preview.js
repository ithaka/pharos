import { setCustomElementsManifest } from '@storybook/web-components';

import customElementsManifest from '../../packages/pharos/custom-elements.json';
import '../styleConfig';
import '../../packages/pharos/src/test/initComponents';

window.process = window.process || {};
window.process.env = window.process.env || {};
window.process.env.NODE_ENV = window.process.env.NODE_ENV || 'production';

setCustomElementsManifest(customElementsManifest);

export { parameters } from '../main/preview';
