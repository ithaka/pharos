import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC } from 'react';
import { PharosLink } from '@ithaka/pharos/lib/react-components';
import Canvas from '../../src/components/Canvas';

const SidenavPage: FC = () => {
  return (
    <>
      <PageSection
        isHeader
        storyBookType="components"
        title="Sidenav"
        description="The sidenav component is a vertical navigation layout that houses links and menus to help users
      navigate the site."
      ></PageSection>{' '}
      <PageSection title="Usage">
        <p>
          Use the sidenav to host more navigational menu options than is possible for a simpler top
          navigation layout, making it much more easily scalable. The sidenav is also easier for a
          user to scan the items, as it acts like a list, helping give users a more focused
          experience.
        </p>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>
                The primary links representing main sections of the site should be listed first
              </li>
              <li>If needed, group navigation items into sections based on related categories.</li>
              <li>Use short and concise verbiage menu option and section heading text</li>
              <li>Keep the links consistent throughout the site</li>
              <li>Sidenav Components:</li>
              <ul>
                <li>
                  Use the section sub component when trying to create groupings of menus and link
                  that are visible at all times
                </li>
                <li>
                  Use the side menu sub component inside the sidenav component when trying to create
                  a dropdown type of menu in the navigation
                </li>
                <li>Use the link sub component when trying to create a static link</li>
              </ul>
            </ul>
          }
          Dont={
            <ul>
              <li>
                Don't use icons to represent the navigation items, alone or with text, reserve icons
                for use within the UI
              </li>
              <li>
                Don't move the placement of the sidenav to the right side of the content, it should
                always be fixed to the left
              </li>
              <li>
                Do not nest or group menu options more than one level of hierarchy, we want to keep
                the navigation simple and understandable. If you find you need to nest, reconsider
                the information architecture.
              </li>
              <li>
                Don't use the sidenav component if there are less than 3 menu item options, instead
                of a top navigation layout
              </li>
              <li>Don't use any of the 3 sub components outside of the sidenav component</li>
              <li>Don't use the sidenav to display important system or site information</li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
        <p>
          A navigation menu acts as a table of contents for your site. The content of links should
          reflect this hierarchy. The primary links representing main sections of the site should
          first be listed. If applicable, add submenus to links with additional related sections
          with a list of links pertaining to that group. Also, use sentence case for primary and
          secondary navigation items.
        </p>
      </PageSection>{' '}
      <PageSection title="States">
        <PageSection subSectionLevel={1} title="Link">
          <PageSection subSectionLevel={2} title="External">
            The sidenav link sub-component has an <code>external</code> state which places the
            external icon at the end of the row and causes the link to be open in a new page/tab.
          </PageSection>
        </PageSection>
        <PageSection subSectionLevel={1} title="Section">
          <PageSection subSectionLevel={2} title="Show divider">
            The sidenav section sub-component has a <code>showDivider</code> state, which places a
            divider below the section.
          </PageSection>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Variants">
        <PageSection subSectionLevel={1} title="Mobile">
          <p>
            The sidenav component has built-in responsive design which hides the menu for any width
            lower than 1056 pixels. In order to show the menu again, use the button sub-component
            for a manual toggling experience. The navigation appears over the top of the content
            with an overlay over the underlying content.
          </p>
          <Canvas>
            <PharosLink href="#">I am a link</PharosLink>
          </Canvas>
        </PageSection>
      </PageSection>
      <PageSection title="Accessibility">
        <PageSection subSectionLevel={1} title="Relevant WCAG guidelines">
          <ul style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html">
                1.3.1 Info and Relationships A
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/consistent-navigation">
                3.2.3 Consistent Navigation AA
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/keyboard">
                2.1.1 Keyboard
              </PharosLink>
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Importance">
          <p>
            Helps users get an overview of the hierarchical content available on the site and how to
            navigate them.
          </p>
        </PageSection>
        <PageSection subSectionLevel={1} title="Visual expectations">
          <p>A vertical menu that can contain links, sections and expandable menus</p>
        </PageSection>
        <PageSection subSectionLevel={1} title="Code expectations">
          <ul>
            <li>The parent component is a nav element</li>
            <li>The menu sub-component is an unordered list</li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Screen reader">
            <p>Reads items in order from top to bottom</p>
          </PageSection>
          <PageSection subSectionLevel={2} title="Keyboard">
            <ul>
              <li>
                <kbd>Tab</kbd>: moves focus onto the dropdown. When dropdown is expanded, focus will
                go to next menu item
              </li>
              <li>
                <kbd>Shift</kbd> + <kbd>Tab</kbd>: When dropdown is expanded, moves focus to the
                previous menu item
              </li>
              <li>
                <kbd>Enter</kbd>: opens dropdown, interacts with selection when focus is on a menu
                item
              </li>
            </ul>
          </PageSection>
        </PageSection>
      </PageSection>
    </>
  );
};
export default SidenavPage;
