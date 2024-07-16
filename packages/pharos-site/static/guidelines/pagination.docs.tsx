import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import CodeBlock from '@components/CodeBlock';
import { FC } from 'react';
import { PharosHeading, PharosLink, PharosPagination } from '@ithaka/pharos/lib/react-components';

const PaginationPage: FC = () => {
  return (
    <>
      <PageSection
        isHeader
        storyBookType="components"
        title="Pagination"
        description="Pagination allows users to move through a list or set of items that have been split into different pages."
      >
        <PharosPagination totalResults={1146} pageSize={25} currentPage={2}></PharosPagination>
      </PageSection>
      <PageSection topMargin title="Usage">
        <p>
          Pagination splits content into smaller chunks across several pages, making it easier to
          consume.
        </p>
        <p>
          Pagination only includes navigational elements for paging through the content and does not
          manipulate data or control the display of the content. It is used only to provide
          navigation and to indicate the current page and number of pages.
        </p>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>To be used only for lists with more than 25 items</li>
              <li>
                Place pagination below the set of items it paginates through, aligned to the right
                side of the content being displayed
              </li>
              <li>
                When the first page is selected the "Previous" button is not displayed and,
                similarly, when the last page is selected the "Next" button is not displayed
              </li>
            </ul>
          }
          Dont={
            <ul>
              <li>Don't use pagination on a transactional service or a form</li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Variants">
        <PageSection title="Basic" subSectionLevel={1} lessMargin>
          Use the basic variant to navigate to different pages of large lists of items, and indicate
          which page you are currently viewing.
        </PageSection>
      </PageSection>
      <PageSection title="Accessibility">
        <PageSection title="Relevant WCAG guidelines" subSectionLevel={1} lessMargin>
          <ul>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html">
                1.3.1 Info and Relationships A
              </PharosLink>
            </li>
          </ul>
        </PageSection>
        <PageSection title="Importance" subSectionLevel={1} lessMargin>
          Pagination allows users to navigate multiple pages that are grouped together.
        </PageSection>
        <PageSection title="Code expectations" subSectionLevel={1} lessMargin>
          <ul>
            <li>
              Everything should be wrapped in the <code>&lt;nav&gt;</code> tag
            </li>
            <li>
              <code>&lt;nav&gt;</code> should also have a <code>role="navigation"</code> to ensure
              that all assistive technologies will be given the information
            </li>
            <li>
              You should add an aria-label that denotes this <code>&lt;nav&gt;</code> element as
              pagination
            </li>
            <li>
              List elements should be given an aria-label that gives more information. This should
              include "previous/next" and the page number.
            </li>
          </ul>
          <CodeBlock className="language-html">
            <nav role="navigation" aria-label="pagination navigation">
              <ul>
                <li>
                  <a href="/example-page" aria-label="Go to previous/next page 1">
                    1
                  </a>
                </li>
              </ul>
            </nav>
          </CodeBlock>
        </PageSection>
        <PageSection title="Expected actions" subSectionLevel={1} lessMargin>
          <div style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}>
            <PharosHeading level={4} preset={'1--bold'}>
              Screen reader
            </PharosHeading>
            <ul>
              <li>
                Reads "Pagination navigation, go to (previous/next) page 1, list 1 of X, link"
              </li>
            </ul>
          </div>
          <PharosHeading level={4} preset={'1--bold'}>
            Keyboard
          </PharosHeading>
          <ul>
            <li>
              <kbd>Tab</kbd>: goes to next pagination number
            </li>
            <li>
              <kbd>Shift</kbd> + <kbd>Tab</kbd>: goes to the previous pagination number
            </li>
            <li>
              <kbd>Enter</kbd>: goes to selected page
            </li>
          </ul>
        </PageSection>
      </PageSection>
    </>
  );
};
export default PaginationPage;
