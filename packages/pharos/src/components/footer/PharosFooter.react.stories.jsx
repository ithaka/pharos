import { Footer } from '../../pages/shared/react/Footer';
import { PharosFooter } from '../../../lib/react-components';
import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Organisms/Footer',
  component: PharosFooter,
  parameters: {
    docs: { page: configureDocsPage('footer') },
    layout: 'fullscreen',
  },
};

export const Base = {
  render: (_) => <Footer />,
  parameters: {
    chromatic: { viewports: [320, 1024, 1200] },
  },
};
