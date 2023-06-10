import { setCustomElementsManifest } from '@storybook/web-components';

import customElementsManifest from '../../packages/pharos/custom-elements.json';
import '../styleConfig';
import '../initComponents';

setCustomElementsManifest(customElementsManifest);

export { preview } from '../preview';
