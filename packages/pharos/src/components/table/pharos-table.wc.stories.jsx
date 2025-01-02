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
    >
      <storybook-pharos-table-header>
        <storybook-pharos-table-row>
          <storybook-pharos-table-header-cell>Item</storybook-pharos-table-header-cell>
          <storybook-pharos-table-header-cell>Filename</storybook-pharos-table-header-cell>
          <storybook-pharos-table-header-cell>Expired Date</storybook-pharos-table-header-cell>
          <storybook-pharos-table-header-cell>Created On</storybook-pharos-table-header-cell>
          <storybook-pharos-table-header-cell>University</storybook-pharos-table-header-cell>
        </storybook-pharos-table-row>
      </storybook-pharos-table-header>
      <storybook-pharos-table-body>
        <storybook-pharos-table-row>
          <storybook-pharos-table-cell>1</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>12345.jpg</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>2020-1-1</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>2010-1-1</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>University of Michigan</storybook-pharos-table-cell>
        </storybook-pharos-table-row>
        <storybook-pharos-table-row>
          <storybook-pharos-table-cell>2</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>123456.jpg</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>2020-1-1</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>2010-1-1</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>University of Michigan</storybook-pharos-table-cell>
        </storybook-pharos-table-row>
        <storybook-pharos-table-row>
          <storybook-pharos-table-cell>3</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>123456.jpg</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>2020-1-1</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>2010-1-1</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>University of Michigan</storybook-pharos-table-cell>
        </storybook-pharos-table-row>
        <storybook-pharos-table-row>
          <storybook-pharos-table-cell>4</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>123456.jpg</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>2020-1-1</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>2010-1-1</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>University of Michigan</storybook-pharos-table-cell>
        </storybook-pharos-table-row>
        <storybook-pharos-table-row>
          <storybook-pharos-table-cell>5</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>123456.jpg</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>2020-1-1</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>2010-1-1</storybook-pharos-table-cell>
          <storybook-pharos-table-cell>University of Michigan</storybook-pharos-table-cell>
        </storybook-pharos-table-row>
        <storybook-pharos-table-row>
          <storybook-pharos-table-cell>
              <strong>Testing this thing!</strong>
            </storybook-pharos-table-cell>
            <storybook-pharos-table-cell>
              Round robin
            </storybook-pharos-table-cell>
            <storybook-pharos-table-cell>
              <storybook-pharos-checkbox>
                <span slot="label">I am a label</span>
              </storybook-pharos-checkbox>
            </storybook-pharos-table-cell>
            <storybook-pharos-table-cell>
              </storybook-pharos-button></storybook-pharos-table-cell>
            <storybook-pharos-table-cell>
              <storybook-pharos-button variant="primary">
                <div class="banana">Test</div>
              </storybook-pharos-button>
            </storybook-pharos-table-cell>
        </storybook-pharos-table-row>
      </storybook-pharos-table-body>
    </storybook-pharos-table>
  `,
  args: {
    ...defaultArgs,
    showPagination: false,
  },
};

// export const WithPagination = {
//   render: ({ columns, rowData, showPagination }) => html`
//     <storybook-pharos-table
//       .columns="${columns}"
//       .rowData="${rowData}"
//       .showPagination="${showPagination}"
//       .totalResults="${5}"
//       .pageSizeOptions="${[2, 4]}"
//       caption="An example table"
//     />
//   `,
//   args: {
//     ...defaultArgs,
//     showPagination: true,
//   },
// };

// export const WithHiddenCaption = {
//   render: ({ columns, rowData, showPagination }) => html`
//     <storybook-pharos-table
//       .columns="${columns}"
//       .rowData="${rowData}"
//       .showPagination="${showPagination}"
//       caption="An example table"
//       .hideCaption="${true}"
//     />
//   `,
//   args: {
//     ...defaultArgs,
//     showPagination: false,
//   },
// };

// export const WithStickyHeader = {
//   render: ({ columns, rowData }) => html`
//     <storybook-pharos-table
//       .columns="${columns}"
//       .rowData="${[...rowData, ...rowData, ...rowData, ...rowData]}"
//       .hasStickyHeader="${true}"
//       caption="A sticky header example"
//     />
//   `,
//   args: {
//     ...defaultArgs,
//     showPagination: true,
//   },
// };
