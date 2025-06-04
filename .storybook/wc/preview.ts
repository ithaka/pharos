import { setCustomElementsManifest } from '@storybook/web-components';

import customElementsManifest from '../../packages/pharos/custom-elements.json';
import '../styleConfig';
import '../initComponents';
import sharedPreview from '../preview';

setCustomElementsManifest(customElementsManifest);

const preview = {
  ...sharedPreview,
  tags: ['autodocs'],
};
export default preview;
