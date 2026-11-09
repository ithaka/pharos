import { setCustomElementsManifest } from '@storybook/web-components';
import type { Preview } from '@storybook/web-components';

import customElementsManifest from '../../packages/pharos/custom-elements.json';
import '../styleConfig';
import sharedPreview from '../preview';

setCustomElementsManifest(customElementsManifest);

const preview: Preview = {
  ...sharedPreview,
  tags: ['autodocs'],
  argTypesEnhancers: [
    // Hide internal members documented in the manifest from the docs tables
    ({ argTypes }) =>
      Object.fromEntries(
        Object.entries(argTypes).filter(
          ([name]) => !name.startsWith('_') && name !== 'elementDefinitions'
        )
      ),
  ],
  afterEach: ({ canvasElement }) => {
    // Each story module registers the components it renders; fail loudly if one was missed
    const undefinedTags = [
      ...new Set([...canvasElement.querySelectorAll(':not(:defined)')].map((el) => el.localName)),
    ];
    if (undefinedTags.length) {
      throw new Error(
        `Custom elements not defined: ${undefinedTags.join(', ')}. Import the component classes and register them with registerStorybookComponents in the module that renders them.`
      );
    }
  },
};
export default preview;
