// import { action } from '@storybook/addon-actions';
import { html } from 'lit';

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
        .totalResults="${5}"
        .pageSizeOptions="${[2, 4]}"
      />
    `,
  args: {
    columns: [
      {
        name: 'Item',
        field: 'item',
      },
      {
        name: 'Filename',
        field: 'filename',
      },
      {
        name: 'Expired Date',
        field: 'expired_date',
      },
      {
        name: 'Created On',
        field: 'created_on',
      },
      {
        name: 'University',
        field: 'university',
      },
    ],
    rowData: [
      {
        item: 1,
        filename: '12345.jpg',
        expired_date: '2020-1-1',
        created_on: '2010-1-1',
        university: 'University of Michigan',
      },
      {
        item: 2,
        filename: '123456.jpg',
        expired_date: '2020-1-1',
        created_on: '2010-1-1',
        university: 'University of Michigan',
      },
      {
        item: 3,
        filename: '123456.jpg',
        expired_date: '2020-1-1',
        created_on: '2010-1-1',
        university: 'University of Michigan',
      },
      {
        item: 4,
        filename: '123456.jpg',
        expired_date: '2020-1-1',
        created_on: '2010-1-1',
        university: 'University of Michigan',
      },
      {
        item: 5,
        filename: '123456.jpg',
        expired_date: '2020-1-1',
        created_on: '2010-1-1',
        university: 'University of Michigan',
      },
    ],
    hidePagination: true,
  },
};
