import { PharosTable } from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import { defaultArgs } from './storyArgs';

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
    ></PharosTable>
  ),
  args: {
    ...defaultArgs,
    hidePagination: true,
  },
};

export const WithPagination = {
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
    ...defaultArgs,
    hidePagination: false,
  },
};
