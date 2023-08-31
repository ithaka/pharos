import { PharosSheet } from '../../react-components/sheet/pharos-sheet';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';

export default {
  title: 'Components/Sheet',
  component: PharosSheet,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: {
      page: configureDocsPage('sheet'),
    },
  },
};

export const Base = {
  render: (args) => <PharosSheet />,
  args: {},
};
