import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';

import a11yConfig from './a11yConfig';
import theme from './theme';

const preview = {
  parameters: {
    a11y: a11yConfig,
    controls: { expanded: true },
    docs: {
      theme: theme,
    },
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
        ...INITIAL_VIEWPORTS,
      },
    },
    backgrounds: {
      default: 'White',
      values: [
        {
          name: 'White',
          value: '#FFFFFF',
        },
        {
          name: 'Black',
          value: '#000000',
        },
      ],
    },
  },
};

export default preview;
