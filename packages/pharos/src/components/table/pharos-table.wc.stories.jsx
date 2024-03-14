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
  render: ({ columns, rowData, showPagination }) => html`
    <storybook-pharos-table
      .columns="${columns}"
      .rowData="${rowData}"
      .showPagination="${showPagination}"
      caption="An example table"
    />
  `,
  args: {
    ...defaultArgs,
    showPagination: false,
  },
};

export const WithPagination = {
  render: ({ columns, rowData, showPagination }) => html`
    <storybook-pharos-table
      .columns="${columns}"
      .rowData="${rowData}"
      .showPagination="${showPagination}"
      .totalResults="${5}"
      .pageSizeOptions="${[2, 4]}"
      caption="An example table"
    />
  `,
  args: {
    ...defaultArgs,
    showPagination: true,
  },
};
