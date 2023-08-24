import { PharosCoachMark } from '../../react-components/coach-mark/pharos-coach-mark';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';

export default {
  title: 'Components/CoachMark',
  component: PharosCoachMark,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: {
      page: configureDocsPage('coach-mark'),
    },
  },
};

export const Base = {
  render: (args) => <PharosCoachMark />,
  args: {},
};
