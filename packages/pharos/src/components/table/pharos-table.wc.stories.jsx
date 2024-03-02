import { html } from 'lit';
import { defaultArgs } from './storyArgs';

import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Table',
  component: 'pharos-table',
  parameters: {
    docs: { page: configureDocsPage('table') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: ({ columns, rowData, hidePagination }) =>
    html`
      <storybook-pharos-table
        .columns="${columns}"
        .rowData="${rowData}"
        .hidePagination="${hidePagination}"
      />
    `,
  args: {
    ...defaultArgs,
    hidePagination: true,
  },
};

export const WithPagination = {
  render: ({ columns, rowData, hidePagination }) =>
    html`
      <storybook-pharos-table
        .columns="${columns}"
        .rowData="${rowData}"
        .hidePagination="${hidePagination}"
        .totalResults="${5}"
        .pageSizeOptions="${[2, 4]}"
      />
    `,
  args: {
    ...defaultArgs,
    hidePagination: false,
  },
};
