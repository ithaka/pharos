import { html } from 'lit';
import { action } from '@storybook/addon-actions';

import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';

export default {
  title: 'Components/Pagination',
  component: 'pharos-pagination',
  parameters: {
    docs: { page: configureDocsPage('pagination') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (args) =>
    html`
      <pharos-pagination
        total-results=${args.totalResults}
        page-size=${args.pageSize}
        current-page=${args.currentPage}
        @prev-page="${(e) => action('Prev Page')(JSON.stringify(e))}"
        @next-page="${(e) => action('Next Page')(JSON.stringify(e))}"
      ></pharos-pagination>
    `,
  args: defaultArgs,
};

export const Events = {
  ...Base,
  parameters: { options: { selectedPanel: 'addon-actions' } },
};
