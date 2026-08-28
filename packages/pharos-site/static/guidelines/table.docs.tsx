import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { PharosLink, PharosTable } from '@ithaka/pharos/lib/react-components';
import Canvas from '../../src/components/Canvas';
import { FC } from 'react';

const columns = [
  { name: 'Item', field: 'item' },
  { name: 'Filename', field: 'filename' },
  { name: 'Created on', field: 'created_on' },
];

const rowData = [
  { item: 1, filename: '123456.jpg', created_on: '2020-1-1' },
  { item: 2, filename: '234567.jpg', created_on: '2021-3-4' },
  { item: 3, filename: '345678.jpg', created_on: '2022-6-9' },
];

const TablePage: FC = () => {
  return (
    <>
      <PageSection
        title="Table"
        isHeader
        storyBookType="components"
        description="Tables organize and display data in rows and columns, making it easy for users to scan,
        compare, and take action on structured information."
      >
        <PharosTable caption="Example table" columns={columns} rowData={rowData} />
      </PageSection>
      <PageSection topMargin title="Usage">
        <PageSection title="Overview" subSectionLevel={1} lessMargin>
          <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
            <p>
              Tables display data as a grid of rows and columns, providing structure that helps
              users scan and compare related pieces of information. Columns are defined by a{' '}
              <code>columns</code> specification, and the table's content is provided via a{' '}
              <code>row-data</code> array.
            </p>
            <p>
              Tables support optional pagination, a sticky header, and a caption to describe the
              purpose of the data being presented.
            </p>
          </div>
        </PageSection>
        <PageSection title="When to Use" subSectionLevel={1} lessMargin>
          <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
            <ul>
              <li>
                To display structured, tabular data that benefits from row and column alignment
              </li>
              <li>When users need to scan, compare, or sort many related data points at once</li>
              <li>When a dataset is large enough to require pagination</li>
            </ul>
          </div>
        </PageSection>
      </PageSection>
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>Use clear, concise column headers that describe the data beneath them</li>
              <li>Provide a caption that describes the purpose of the table</li>
              <li>Use pagination for large datasets to improve performance and scannability</li>
              <li>
                Use a sticky header for tables with many rows so column headers stay visible while
                scrolling
              </li>
            </ul>
          }
          Dont={
            <ul>
              <li>Don't use a table for small amounts of unrelated content</li>
              <li>
                Don't overload a single table with too many columns—consider splitting data across
                multiple tables or views
              </li>
            </ul>
          }
        />
      </PageSection>
      <PageSection title="Content guidelines">
        <PageSection title="Caption" subSectionLevel={1} lessMargin>
          The caption should briefly describe what the table contains. It's visually hidden by
          default using the <code>hide-caption</code> attribute, but remains available to assistive
          technology to provide context about the table's purpose.
        </PageSection>
        <PageSection title="Column headers" subSectionLevel={1} lessMargin>
          Column headers should be short, descriptive, and written in Sentence case.
        </PageSection>
      </PageSection>
      <PageSection title="Variants">
        <PageSection title="With pagination" subSectionLevel={1} lessMargin>
          <p>
            Use the <code>show-pagination</code> attribute along with <code>page-size-options</code>{' '}
            and <code>total-results</code> for large datasets that should be paged through rather
            than fully rendered at once.
          </p>
          <Canvas>
            <PharosTable
              caption="Example table with pagination"
              columns={columns}
              rowData={rowData}
              showPagination
              totalResults={rowData.length}
              pageSizeOptions={[1, 2, 3]}
            />
          </Canvas>
        </PageSection>
        <PageSection title="Sticky header" subSectionLevel={1} lessMargin>
          <p>
            Use the <code>has-sticky-header</code> attribute to keep the column headers visible
            while scrolling through a long table.
          </p>
        </PageSection>
      </PageSection>
      <PageSection title="Accessibility">
        <PageSection subSectionLevel={1} title="Relevant WCAG guidelines">
          <ul>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html">
                1.3.1 Info and Relationships A
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/tutorials/tables/">
                W3C Tables Tutorial
              </PharosLink>
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Importance">
          Proper table markup with headers and a caption allows assistive technology users to
          understand the relationships between column headers and the data cells beneath them, and
          to navigate the table efficiently.
        </PageSection>
        <PageSection subSectionLevel={1} title="Code expectations">
          <ul>
            <li>
              The table is rendered using semantic <code>table</code>, <code>thead</code>,{' '}
              <code>tbody</code>, <code>tr</code>, and <code>th</code>/<code>td</code> elements.
            </li>
            <li>
              The <code>caption</code> attribute provides an accessible description of the table,
              even when visually hidden via <code>hide-caption</code>.
            </li>
            <li>Column headers are associated with their data cells using scope attributes.</li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Screen reader">
            <ul>
              <li>
                Announces the table caption, followed by the column header and value when navigating
                into a data cell.
              </li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Keyboard">
            <ul>
              <li>
                <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd>: moves focus between interactive
                elements within the table, such as pagination controls
              </li>
            </ul>
          </PageSection>
        </PageSection>
      </PageSection>
    </>
  );
};
export default TablePage;
