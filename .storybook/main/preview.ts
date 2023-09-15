import { setCustomElements } from '@storybook/web-components';

import customElements from '../../packages/pharos/custom-elements.json';
import '../styleConfig';
import '../initComponents';

setCustomElements(customElements);

export { preview } from '../preview';
