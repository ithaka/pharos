import { Footer } from '../../pages/shared/wc/footer';
import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Organisms/Footer',
  component: 'pharos-footer',
  parameters: {
    docs: { page: configureDocsPage('footer') },
    layout: 'fullscreen',
  },
};

export const Base = {
  render: () => Footer(),
  parameters: {
    chromatic: { viewports: [320, 1024, 1200] },
  },
};
