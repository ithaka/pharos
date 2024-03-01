import { PharosTable } from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';

export default {
  title: 'Components/Table',
  component: PharosTable,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('table') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (args) => (
    <PharosTable
      columns={args.columns}
      rowData={args.rowData}
      hidePagination={args.hidePagination}
      totalResults={5}
      pageSizeOptions={[2, 4]}
    ></PharosTable>
  ),
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
