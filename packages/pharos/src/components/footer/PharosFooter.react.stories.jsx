import { Footer } from '../../pages/shared/react/Footer';
import { PharosFooter } from '../../../lib/react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';

export default {
  title: 'Organisms/Footer',
  component: PharosFooter,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('footer') },
    layout: 'fullscreen',
  },
};

export const Base = {
  render: () => <Footer />,
  parameters: {
    chromatic: { viewports: [320, 1024, 1200] },
  },
};
