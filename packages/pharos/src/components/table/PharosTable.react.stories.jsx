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
      showPagination={args.showPagination}
      caption={'An example table'}
    ></PharosTable>
  ),
  args: {
    ...defaultArgs,
    showPagination: false,
  },
};

export const WithPagination = {
  render: (args) => (
    <PharosTable
      columns={args.columns}
      rowData={args.rowData}
      showPagination={args.showPagination}
      totalResults={5}
      pageSizeOptions={[2, 4]}
      caption={'An example table'}
    ></PharosTable>
  ),
  args: {
    ...defaultArgs,
    showPagination: true,
  },
};
