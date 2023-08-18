import { PharosPopover } from '../../react-components/popover/pharos-popover';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';

export default {
  title: 'Components/Popover',
  component: PharosPopover,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: {
      page: configureDocsPage('popover'),
    },
  },
};

export const Base = {
  render: (args) => <PharosPopover />,
  args: {},
};
