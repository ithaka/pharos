import {
  PharosTable,
  PharosTableBody,
  PharosTableRow,
  PharosTableCell,
  PharosLink,
  PharosCheckbox,
  PharosToggleButton,
  PharosToggleButtonGroup,
} from '../../react-components';
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

const getSampleTextRow = (rowId) => (
  <PharosTableRow key={rowId}>
    <PharosTableCell>{rowId}</PharosTableCell>
    <PharosTableCell>123456.jpg</PharosTableCell>
    <PharosTableCell>2020-1-1</PharosTableCell>
    <PharosTableCell>2010-1-1</PharosTableCell>
    <PharosTableCell>University of Michigan</PharosTableCell>
  </PharosTableRow>
);

const sampleNonTextRow = (
  <PharosTableRow>
    <PharosTableCell>JSTOR</PharosTableCell>
    <PharosTableCell>
      <img
        src="https://pharos.jstor.org/static/home-get-started-d81656133e781b09087ec08d63f0fe18.svg"
        alt="JSTOR LOGO"
      />
    </PharosTableCell>
    <PharosTableCell style={{ maxWidth: '20rem' }}>
      <span>
        <span>
          JSTOR provides access to more than 12 million
          <PharosLink href="https://about.jstor.org/librarians/journals/">
            journal articles
          </PharosLink>
          ,<PharosLink href="https://about.jstor.org/librarians/books/">books</PharosLink>,
          <PharosLink href="https://about.jstor.org/librarians/artstor/">images</PharosLink>, and
          <PharosLink href="https://about.jstor.org/librarians/primary-sources/">
            primary sources
          </PharosLink>
          in 75 disciplines.
        </span>
        <span>Established: 1994</span>
      </span>
    </PharosTableCell>
    <PharosTableCell>
      <PharosCheckbox name="item_archived">
        <span slot="label">This item is archived</span>
      </PharosCheckbox>
    </PharosTableCell>
    <PharosTableCell>
      <PharosToggleButtonGroup>
        <PharosToggleButton icon="view-list" a11yLabel="view list" id="view-list-button" />
        <PharosToggleButton icon="view-gallery" a11yLabel="view gallery" id="view-gallery-button" />
        <PharosToggleButton
          icon="image"
          a11yLabel="view presentation"
          id="view-presentation-button"
        />
      </PharosToggleButtonGroup>
    </PharosTableCell>
  </PharosTableRow>
);
export const Base = {
  render: ({ columns, showPagination }) => (
    <PharosTable columns={columns} showPagination={showPagination} caption="An example table">
      <PharosTableBody>
        {Array.from({ length: 5 }, (_, index) => getSampleTextRow(index + 1))}
      </PharosTableBody>
    </PharosTable>
  ),
  args: {
    ...defaultArgs,
    showPagination: false,
  },
};

export const HTMLContent = {
  render: ({ showPagination }) => (
    <PharosTable
      columns={[
        { name: 'Title', field: 'title' },
        { name: 'Thumbnail', field: 'thumbnail' },
        { name: 'Description', field: 'description' },
        { name: 'Archived', field: 'archived' },
        { name: 'Actions', field: 'actions' },
      ]}
      showPagination={showPagination}
      caption="An example table"
    >
      <PharosTableBody>{Array.from({ length: 10 }, () => sampleNonTextRow)}</PharosTableBody>
    </PharosTable>
  ),
  args: {
    ...defaultArgs,
    showPagination: false,
  },
};

export const HiddenCaption = {
  render: ({ columns, showPagination }) => (
    <PharosTable
      columns={columns}
      showPagination={showPagination}
      caption="An example table"
      hideCaption
    >
      <PharosTableBody>
        {Array.from({ length: 10 }, (_, index) => getSampleTextRow(index + 1))}
      </PharosTableBody>
    </PharosTable>
  ),
  args: {
    ...defaultArgs,
    showPagination: false,
  },
};

export const StickyHeader = {
  render: ({ columns }) => (
    <PharosTable columns={columns} hasStickyHeader caption="A sticky header example">
      <PharosTableBody>
        {Array.from({ length: 20 }, (_, index) => getSampleTextRow(index + 1))}
      </PharosTableBody>
    </PharosTable>
  ),
  args: {
    ...defaultArgs,
    showPagination: true,
  },
};

export const RowData = {
  render: ({ columns, rowData, showPagination }) => (
    <PharosTable
      columns={columns}
      rowData={[
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
      ]}
      showPagination={showPagination}
      caption="An example table using a data array"
    />
  ),
  args: {
    ...defaultArgs,
    showPagination: false,
  },
};

export const RowDataWithPagination = {
  render: ({ columns, showPagination }) => (
    <PharosTable
      columns={columns}
      rowData={[
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
      ]}
      showPagination={showPagination}
      totalResults={10}
      pageSizeOptions={[2, 4]}
      caption="An example table using a data array with pagination"
    />
  ),
  args: {
    ...defaultArgs,
    showPagination: true,
  },
};
