import { setCustomElements } from '@storybook/web-components';

import customElements from '../../packages/pharos/custom-elements.json';
import '../styleConfig';
import '../initComponents';
import sharedPreview from '../preview';

setCustomElements(customElements);

const preview = {
  ...sharedPreview,
  tags: ['autodocs'],
};

export default preview;
