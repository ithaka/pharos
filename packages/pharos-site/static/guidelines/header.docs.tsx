import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC } from 'react';

const HeaderPage: FC = () => {
  if (typeof document === 'undefined') {
    return null;
  } else {
    const {
      PharosDropdownMenu,
      PharosDropdownMenuItem,
      PharosDropdownMenuNav,
      PharosDropdownMenuNavLink,
      PharosHeader,
      PharosHeading,
      PharosLink,
    } = require('@ithaka/pharos/lib/react-components');

    return (
      <>
        <PageSection
          isHeader
          title="Header"
          description="Headers are generally used as a container for introductory content or navigational elements."
          storyBookType="organisms"
        >
          <PharosHeader>
            <PharosLink slot="start" href="/" id="jstor-logo">
              <img src="../images/jstor-logo.svg" alt="JSTOR Home" width="65" height="90" />
            </PharosLink>
            <div slot="center">
              <PharosDropdownMenuNav a11yLabel="main navigation">
                <PharosDropdownMenuNavLink href="action/showAdvancedSearch" id="adv-search-link">
                  Advanced Search
                </PharosDropdownMenuNavLink>
                <PharosDropdownMenuNavLink
                  href="/subjects"
                  id="browse-link"
                  data-dropdown-menu-id="browse-menu"
                  data-dropdown-menu-hover
                >
                  Browse
                </PharosDropdownMenuNavLink>
                <PharosDropdownMenu id="browse-menu">
                  <PharosDropdownMenuItem link="/subjects">by Subject</PharosDropdownMenuItem>
                  <PharosDropdownMenuItem link="/action/showJournals?browseType=title">
                    by Title
                  </PharosDropdownMenuItem>
                  <PharosDropdownMenuItem link="/site/collection-list">
                    by Collections
                  </PharosDropdownMenuItem>
                  <PharosDropdownMenuItem link="/publishers">by Publisher</PharosDropdownMenuItem>
                </PharosDropdownMenu>
                <PharosDropdownMenuNavLink
                  href="/account/workspace"
                  id="tools-link"
                  data-dropdown-menu-id="tools-menu"
                  data-dropdown-menu-hover
                >
                  Tools
                </PharosDropdownMenuNavLink>
                <PharosDropdownMenu id="tools-menu">
                  <PharosDropdownMenuItem link="/account/workspace">
                    Workspace
                  </PharosDropdownMenuItem>
                  <PharosDropdownMenuItem link="/analyze">Text Analyzer</PharosDropdownMenuItem>
                  <PharosDropdownMenuItem link="/understand">
                    The JSTOR Understanding Series
                  </PharosDropdownMenuItem>
                  <PharosDropdownMenuItem link="/dfr">Data for Research</PharosDropdownMenuItem>
                </PharosDropdownMenu>
              </PharosDropdownMenuNav>
            </div>
            <div
              slot="end"
              style={{ display: 'grid', gridTemplateRows: '1fr 1fr', rowGap: '1.5rem' }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  columnGap: '0.5rem',
                }}
              >
                <PharosLink href="#" target="_blank">
                  Log In
                </PharosLink>
                <PharosLink href="#" target="_blank">
                  Register
                </PharosLink>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  columnGap: '0.5rem',
                }}
              >
                <PharosLink href="//about.jstor.org" target="_blank" bold>
                  About
                </PharosLink>
                <PharosLink href="//support.jstor.org" target="_blank" bold>
                  Support
                </PharosLink>
              </div>
            </div>
          </PharosHeader>
        </PageSection>
        <PageSection topMargin title="Usage">
          <p>
            The header is placed at the top of the layout for site-wide content and contains any
            combination of a logo, headings, navigation menus and search bars. While multiple header
            elements are allowed on a single page, they can not be placed within other header,
            footer or address regions. If a header element is nested inside an article or section
            region, the header is considered a header for that region, not the whole page or site.
          </p>
          <p>
            The Pharos Header provides three slots that removes some of the intricacies of laying
            out links and navigation elements: start, center and end. The three slots correspond to
            the first, second and third column of the header, as shown below.
          </p>
          <PharosHeader>
            <div slot="start">start</div>
            <div slot="center">center</div>
            <div slot="end-bottom">end</div>
          </PharosHeader>
        </PageSection>{' '}
        <PageSection title="Best practices">
          <BestPractices
            Do={
              <ul>
                <li>
                  Use Pharos dropdown menu nav and their related components for navigation portion
                  of the header
                </li>
                <li>Use Pharos links for static links</li>
                <li>
                  Use the start, center and end props to place components in the correct spaces
                </li>
              </ul>
            }
            Dont={
              <ul>
                <li>
                  Don't place the Pharos Header component in another header, footer or address
                  region
                </li>
                <li>
                  Don't associate a header with the whole page if it is nested in a &lt;section&gt;
                  or &lt;article&gt; element
                </li>
              </ul>
            }
          />
        </PageSection>{' '}
        <PageSection title="Content guidelines">
          <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
            <PharosHeading
              level={2}
              preset="6"
              style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}
            ></PharosHeading>
            <p>
              The content contained in the header can be seen as information pertinent to all facets
              of the site. They generally serve as unifying core functionalities central to the
              purpose of the site. Hence, the header should be placed in a highly visible and
              consistent position shared across pages.
            </p>
            <p>
              Use of Pharos components is highly recommended to deliver a consistent experience
              throughout both the design and functional needs. Some Pharos components which fit
              naturally with the header are the dropdown menu nav, link and input components, as
              shown at the example at the bottom of the page.
            </p>
          </div>
        </PageSection>
        <PageSection title="Relevant WCAG guidelines">
          <ul>
            <li>
              <PharosLink href="https://www.w3.org/WAI/tutorials/page-structure/regions/">
                W3 Page Regions
              </PharosLink>
            </li>
            <li>
              <PharosLink href="w3.org/TR/wai-aria-practices/examples/landmarks/HTML5.html">
                ARIA Landmarks
              </PharosLink>
            </li>
            <li>Use semantic &lt;header&gt; element</li>
            <li>&lt;header&gt; should have a role="banner"</li>
          </ul>
        </PageSection>
      </>
    );
  }
};
export default HeaderPage;
