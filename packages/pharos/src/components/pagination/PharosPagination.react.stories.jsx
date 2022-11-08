import { action } from '@storybook/addon-actions';

import { PharosPagination } from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';

export default {
  title: 'Components/Pagination',
  component: PharosPagination,
  parameters: {
    docs: { page: configureDocsPage('pagination') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (args) => (
    <PharosPagination
      totalResults={args.totalResults}
      pageSize={args.pageSize}
      currentPage={args.currentPage}
      onPrev-Page={(e) => action('Prev Page')(JSON.stringify(e))}
      onNext-Page={(e) => action('Next Page')(JSON.stringify(e))}
    />
  ),
  args: defaultArgs,
};

export const Events = {
  ...Base,
  parameters: { options: { selectedPanel: 'addon-actions' } },
};
