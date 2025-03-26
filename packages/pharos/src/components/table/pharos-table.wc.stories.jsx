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

const getSampleTextRow = (rowId) =>
  html`<storybook-pharos-table-row>
    <storybook-pharos-table-cell>${rowId}</storybook-pharos-table-cell>
    <storybook-pharos-table-cell>123456.jpg</storybook-pharos-table-cell>
    <storybook-pharos-table-cell>2020-1-1</storybook-pharos-table-cell>
    <storybook-pharos-table-cell>2010-1-1</storybook-pharos-table-cell>
    <storybook-pharos-table-cell>University of Michigan</storybook-pharos-table-cell>
  </storybook-pharos-table-row>`;

const sampleNonTextRow = html` <storybook-pharos-table-row>
  <storybook-pharos-table-cell> JSTOR </storybook-pharos-table-cell>
  <storybook-pharos-table-cell>
    <img
      src="https://pharos.jstor.org/static/home-get-started-d81656133e781b09087ec08d63f0fe18.svg"
      alt="JSTOR LOGO"
    />
  </storybook-pharos-table-cell>
  <storybook-pharos-table-cell style="max-width:20rem;">
    <div
      style="display: flex; flex-direction: column;  justify-content: space-between;max-width: 30rem;height: 100%;"
    >
      <div>
        JSTOR provides access to more than 12 million
        <storybook-pharos-link href="https://about.jstor.org/librarians/journals/"
          >journal articles</storybook-pharos-link
        >,
        <storybook-pharos-link href="https://about.jstor.org/librarians/books/"
          >books</storybook-pharos-link
        >,
        <storybook-pharos-link href="https://about.jstor.org/librarians/artstor/"
          >images</storybook-pharos-link
        >, and
        <storybook-pharos-link href="https://about.jstor.org/librarians/primary-sources/"
          >primary sources</storybook-pharos-link
        >
        in 75 disciplines.
      </div>
      <div>Established: 1994</div>
    </div>
  </storybook-pharos-table-cell>
  <storybook-pharos-table-cell>
    <storybook-pharos-checkbox name="item_archived">
      <span slot="label">This item is archived</span>
    </storybook-pharos-checkbox>
  </storybook-pharos-table-cell>
  <storybook-pharos-table-cell>
    <storybook-pharos-toggle-button-group>
      <storybook-pharos-toggle-button
        icon="view-list"
        a11y-label="view list"
        id="view-list-button"
      ></storybook-pharos-toggle-button
      ><storybook-pharos-toggle-button
        icon="view-gallery"
        a11y-label="view gallery"
        id="view-gallery-button"
      ></storybook-pharos-toggle-button
      ><storybook-pharos-toggle-button
        icon="image"
        a11y-label="view presentation"
        id="view-presentation-button"
      ></storybook-pharos-toggle-button>
    </storybook-pharos-toggle-button-group>
  </storybook-pharos-table-cell>
</storybook-pharos-table-row>`;

export const Base = {
  render: ({ columns, showPagination }) => html`
    <storybook-pharos-table
      .columns="${columns}"
      .showPagination="${showPagination}"
      caption="An example table"
    >
      <storybook-pharos-table-body>
        ${Array.from({ length: 5 }, (_, index) => getSampleTextRow(index + 1))}
      </storybook-pharos-table-body>
    </storybook-pharos-table>
  `,
  args: {
    ...defaultArgs,
    showPagination: false,
  },
};

export const HTMLContent = {
  render: ({ showPagination }) => html`
    <storybook-pharos-table
      .columns="${[
        {
          name: 'Title',
          field: 'title',
        },
        {
          name: 'Thumbnail',
          field: 'thumbnail',
        },
        {
          name: 'Description',
          field: 'description',
        },
        {
          name: 'Archived',
          field: 'archived',
        },
        {
          name: 'Actions',
          field: 'actions',
        },
      ]}"
      .showPagination="${showPagination}"
      caption="An example table"
    >
      <storybook-pharos-table-body>
        ${Array.from({ length: 10 }, () => sampleNonTextRow)}
      </storybook-pharos-table-body>
    </storybook-pharos-table>
  `,
  args: {
    ...defaultArgs,
    showPagination: false,
  },
};

export const HiddenCaption = {
  render: ({ columns, showPagination }) => html`
    <storybook-pharos-table
      .columns="${columns}"
      .showPagination="${showPagination}"
      caption="An example table"
      .hideCaption="${true}"
    >
      <storybook-pharos-table-body>
        ${Array.from({ length: 10 }, (_, index) => getSampleTextRow(index + 1))}
      </storybook-pharos-table-body>
    </storybook-pharos-table>
  `,
  args: {
    ...defaultArgs,
    showPagination: false,
  },
};

export const StickyHeader = {
  render: ({ columns }) => html`
    <storybook-pharos-table
      .columns="${columns}"
      .hasStickyHeader="${true}"
      caption="A sticky header example"
    >
      <storybook-pharos-table-body>
        ${Array.from({ length: 20 }, (_, index) => getSampleTextRow(index + 1))}
      </storybook-pharos-table-body>
    </storybook-pharos-table>
  `,
  args: {
    ...defaultArgs,
    showPagination: true,
  },
};

export const RowData = {
  render: ({ columns, rowData, showPagination }) => html`
    <storybook-pharos-table
      .columns="${columns}"
      .rowData="${[
        {
          item: 1,
          filename: '123456.jpg',
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
      ]}"
      .showPagination="${showPagination}"
      caption="An example table using a data array"
    />
  `,
  args: {
    ...defaultArgs,
    showPagination: false,
  },
};

export const RowDataWithPagination = {
  render: ({ columns, showPagination }) => html`
    <storybook-pharos-table
      .columns="${columns}"
      .rowData="${[
        {
          item: 1,
          filename: '123456.jpg',
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
      ]}"
      .showPagination="${showPagination}"
      .totalResults="${10}"
      .pageSizeOptions="${[2, 4]}"
      caption="An example table using a data array with pagination"
    />
  `,
  args: {
    ...defaultArgs,
    showPagination: true,
  },
};

export const TableWithCustomHeader = {
  render: ({ showPagination }) => html`
    <storybook-pharos-table .showPagination="${showPagination}" caption="An example table">
      <storybook-pharos-table-header slot="table-header"
        >Custom header 1</storybook-pharos-table-header
      >
      <storybook-pharos-table-header slot="table-header"
        >Custom header 2</storybook-pharos-table-header
      >
      <storybook-pharos-table-header slot="table-header"
        >Custom header 3</storybook-pharos-table-header
      >
      <storybook-pharos-table-body>
        ${Array.from({ length: 5 }, (_, index) => getSampleTextRow(index + 1))}
      </storybook-pharos-table-body>
    </storybook-pharos-table>
  `,
  args: {
    ...defaultArgs,
    showPagination: false,
  },
};
