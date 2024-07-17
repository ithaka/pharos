import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import gridElements from '@images/components/layout/grid_elements.png';
import { FC } from 'react';
import { PharosHeading, PharosLink } from '@ithaka/pharos/lib/react-components';

const LayoutPage: FC = () => {
  return (
    <>
      <PageSection
        title="Layout"
        description="The layout component uses a flexible, responsive grid to create organized and consistent user experiences."
        isHeader
      >
        <PharosLink
          href="https://pharos.jstor.org/storybook/?path=/story/webcomponents_components-layout--one-column"
          target="_blank"
        >
          See in Storybook
        </PharosLink>
      </PageSection>{' '}
      <PageSection title="Usage">
        <PageSection title="About the Grid" subSectionLevel={1}>
          <p>
            The Pharos layout component hinges on the structure of a responsive grid. A grid is like
            the invisible glue that holds a design and experience together.
          </p>
          <PharosHeading level={4} preset="1--bold">
            Organizes
          </PharosHeading>
          <p>
            The grid creates organized, consistent product layouts by providing a standard for
            positioning elements.
          </p>
          <PharosHeading level={4} preset="1--bold">
            Improves efficiency
          </PharosHeading>
          <p>
            The grid speeds up designer-to-developer workflow by improving consistency of design
            implementations.
          </p>
          <PharosHeading level={4} preset="1--bold">
            Creates shared standardization
          </PharosHeading>
          <p>
            The grid lays out and aligns content by applying standard spacing between elements on a
            page or within a component.
          </p>
        </PageSection>
        <PageSection title="Elements of the grid" subSectionLevel={1}>
          <img
            src={gridElements}
            alt="The elements consist of a gutter, column and margin"
            className="pharos-storybook__image"
          />
          <PharosHeading level="4" preset="1--bold">
            Column
          </PharosHeading>
          <p>
            There's a maximum of 12 columns in the Pharos grid, as seen in the layout component.
            Columns segment the content visually and help bring organization to the page and create
            visual hierarchy. The column structure in the layout component optimizes for the screen
            size, and maintains design integrity across breakpoints. We reduce the number of columns
            at smaller breakpoints to maintain consistent gutter spacing at each breakpoint.
          </p>
          <PharosHeading level={4} preset="1--bold">
            Margin
          </PharosHeading>
          <p>
            Creates an invisible frame around content and allows for visual breathing room. The
            margins change depending on the variant needs for the layout component.
          </p>
          <PharosHeading level={4} preset="1--bold">
            Gutter
          </PharosHeading>
          <p>
            Gutters are the spaces between the columns. In Pharos, gutters remain consistent across
            all breakpoints. They provide enough spacing between content and columns without being
            too efficient, giving great emphasis to the content. We believe simpler, well-spaced,
            and well-designed layouts make the content easier to understand.
          </p>
          <PharosHeading level={4} preset="1--bold">
            Breakpoints
          </PharosHeading>
          <p>
            Pharos has a set of standard breakpoints to maintain layout integrity across screen
            sizes. For best results, create and test designs and code at each of these standard
            breakpoints to create the best layout for the screen's real estate.
          </p>
        </PageSection>
        <PageSection title="How it works" subSectionLevel={1}>
          <p>
            The grid uses CSS grid to structure content in columns and rows to layout and align the
            content. An outer grid is used to establish the margins defined for each preset on the
            various breakpoints. A second inner grid is used to establish the columns and gutters.
          </p>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Grid principles">
        <PageSection title="The grid supports the needs of typography" subSectionLevel={1}>
          <PharosHeading level={4} preset="1--bold">
            Prioritize ideal line-length
          </PharosHeading>
          <p>
            When displaying copy in a layout, it should be read easily and comfortably. Overly long
            and overly short widths of text tire the user. The right width is essential to create an
            even and pleasant reading experience. On the web, 45 to 85 characters is optimal per
            line, with 65 characters being the ideal amount.
          </p>
          <PharosHeading level={4} preset="1--bold">
            Well-proportioned margins
          </PharosHeading>
          <p>
            Margins can determine the maximum width of a block of text. If margins are too small,
            the reader can feel that the page is "overfull". If margins are too large, it's
            difficult to avoid a sense of extravagance.
          </p>
          <PharosHeading level={4} preset="1--bold">
            Spacing paired with font choices can create a useful rhythm
          </PharosHeading>
          <p>
            We use our two typeface families to enable a visual rhythm on our pages, most
            specifically with our search results. Our titles are set in our serif font and the
            metadata is set in our san-serif font. We pair this approach with adequate spacing
            between results to create better scannability between items and predictability.
          </p>
        </PageSection>
        <PageSection title="Employ whitespace intentionally" subSectionLevel={1}>
          <p>
            A grid organizes space as much as it does the content that's in it. Intentional spacing
            helps establish focus, order, and emphasis, guiding the user through a page or an
            experience. Without enough whitespace, the composition can appear chaotic and
            unorganized.
          </p>
        </PageSection>
        <PageSection title="Establish purpose with layout" subSectionLevel={1}>
          <PharosHeading level={4} preset="1--bold">
            Elevate the content
          </PharosHeading>
          <p>
            We want our users to be able to focus on what they're searching for and
            reading/evaluating. So we aim to have our content amplify that experience rather than
            distract from it. Images should have sufficient spacing around them to give them greater
            focus on the item itself, apart from the surrounding images.
          </p>
          <PharosHeading level={4} preset="1--bold">
            Maintain layout integrity across screen sizes
          </PharosHeading>
          <p>
            Layouts should be intentionally designed and optimized for each of our standard
            breakpoints. While designing, the integrity and structure of the page's layout should be
            maintained as best as possible across the screen sizes.
          </p>
          <PharosHeading level={4} preset="1--bold">
            Layout selection
          </PharosHeading>
          <p>
            Select the best layout for the needs of the page, JSTOR has a few layouts (as described
            below) for our experiences.
          </p>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>Create designs at each of our standard breakpoints</li>
              <li>Layouts adhere to the columns, not specified widths, wherever possible</li>
              <li>Designs follow grid principles</li>
            </ul>
          }
          Dont={
            <ul>
              <li>
                Stray from the standard layouts and breakpoints, re-evaluate the layouts if a need
                arises
              </li>
              <li>Create new gutter sizes</li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Breakpoints">
        <div>
          <table
            className="typography-table-example"
            style={{ borderCollapse: 'collapse', width: '100%' }}
          >
            <caption className="visually-hidden">Chart of available Pharos Breakpoints</caption>
            <thead>
              <tr>
                <th
                  className="typography-table-example"
                  style={{ backgroundColor: 'var(--pharos-color-marble-gray-94)' }}
                >
                  WIDTH
                </th>
                <th
                  className="typography-table-example"
                  style={{ backgroundColor: 'var(--pharos-color-marble-gray-94)' }}
                >
                  NAMES
                </th>
                <th
                  className="typography-table-example"
                  style={{ backgroundColor: 'var(--pharos-color-marble-gray-94)' }}
                >
                  COLUMNS
                </th>
                <th
                  className="typography-table-example"
                  style={{ backgroundColor: 'var(--pharos-color-marble-gray-94)' }}
                >
                  GUTTER
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="typography-table-example">360px</td>
                <td className="typography-table-example">S</td>
                <td className="typography-table-example">4</td>
                <td className="typography-table-example">
                  48px / <strong>3-x</strong>
                </td>
              </tr>
              <tr>
                <td className="typography-table-example">768px</td>
                <td className="typography-table-example">M</td>
                <td className="typography-table-example">8</td>
                <td className="typography-table-example">
                  48px / <strong>3-x</strong>
                </td>
              </tr>
              <tr>
                <td className="typography-table-example">1056px</td>
                <td className="typography-table-example">L</td>
                <td className="typography-table-example">12</td>
                <td className="typography-table-example">
                  48px / <strong>3-x</strong>
                </td>
              </tr>
              <tr>
                <td className="typography-table-example">1360px</td>
                <td className="typography-table-example">XL</td>
                <td className="typography-table-example">12</td>
                <td className="typography-table-example">
                  48px / <strong>3-x</strong>
                </td>
              </tr>
              <tr>
                <td className="typography-table-example">1584px</td>
                <td className="typography-table-example">Max</td>
                <td className="typography-table-example">12</td>
                <td className="typography-table-example">
                  48px / <strong>3-x</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </PageSection>{' '}
      <PageSection title="Variants">
        <PageSection title="One column" subSectionLevel={1}>
          <p>
            The one column layout is used on a majority of JSTOR's product pages. The page's content
            has a max-width at each breakpoint, but the layout is still fluid. The page's content is
            horizontally centered in the browser.
          </p>
        </PageSection>
        <PageSection title="Two column" subSectionLevel={1}>
          <p>
            The two column layout has a fluid width, the page's content using this layout uses 100%
            of the screen's width. It's used to separate two large sections of content into separate
            layouts on the page. It's to be used sparingly, mostly with content viewing experiences.
          </p>
        </PageSection>
        <PageSection title="One column with sidenav" subSectionLevel={1}>
          <p>
            Use this layout when a page or experience needs a sidenav and a focused layout. It has a
            fluid width, with consistent margins throughout the breakpoints.
          </p>
        </PageSection>
        <PageSection title="One column with sidenav and comfy spacing" subSectionLevel={1}>
          <p>This layout has extra spacing in the margins to have a more spacious experience.</p>
        </PageSection>
      </PageSection>
      <PageSection title="Accessibility">
        <ul>
          <li>
            <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html">
              1.3.1 Info and Relationships A
            </PharosLink>
          </li>
          <li>
            <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/meaningful-sequence">
              1.3.2 Meaningful Sequence
            </PharosLink>
          </li>
          <li>
            <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html">
              2.4.3 Focus Order
            </PharosLink>
          </li>
        </ul>
        <PageSection title="Visual expectations" subSectionLevel={1}>
          <ul>
            <li>Focus goes in the logical reading order, left to right, top to bottom</li>
            <li>
              All content and functionality (or its equivalent) can be accessed regardless of screen
              size or orientation
            </li>
          </ul>
        </PageSection>
        <PageSection title="Code expectations" subSectionLevel={1}>
          <ul>
            <li>
              Grid layout sections should use semantic html
              <ul>
                <li>
                  Ex: sections such as "header", "footer", "nav", "aside", "main" and "article"
                </li>
              </ul>
            </li>
          </ul>
        </PageSection>
        <PageSection title="Screen reader" subSectionLevel={1}>
          <ul>
            <li>All content is read in the logical reading order</li>
          </ul>
        </PageSection>
        <PageSection title="Keyboard" subSectionLevel={1}>
          <ul>
            <li>
              <kbd>Tab</kbd>: goes to next element
            </li>
            <li>
              <kbd>Shift</kbd> + <kbd>Tab</kbd>: goes to previous element
            </li>
          </ul>
        </PageSection>
      </PageSection>
    </>
  );
};
export default LayoutPage;
