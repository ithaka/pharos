import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';

<>
  <PageSection
    title="Dropdown Menu Nav"
    description="The dropdown menu nav provides users an overview of your site's page hierarchy."
    isHeader
    storyBookType="components"
  ></PageSection>
  <PharosHeading level={2}>Examples</PharosHeading>
  ```jsx live
  <>
    <PharosButton id="my-button" data-dropdown-menu-id="my-menu" icon-right="chevron-down">
      Click Me
    </PharosButton>
    <PharosDropdownMenu id="my-menu">
      <PharosDropdownMenuItem>Menu item 1</PharosDropdownMenuItem>
      <PharosDropdownMenuItem>Menu item 2</PharosDropdownMenuItem>
      <PharosDropdownMenuItem>Menu item 3</PharosDropdownMenuItem>
    </PharosDropdownMenu>
  </>
  ```{' '}
  <PageSection
    topMargin
    title="Usage"
    description="Dropdown menu navs include a list of links that move users between sections of the application."
  />{' '}
  <PageSection title="Best practices">
    <BestPractices
      Do={
        <ul>
          <li>Ensure all links and menu items navigate to a URL</li>
          <li>
            Group navigation menu items together in a Pharos dropdown menu based on related
            categories
          </li>
        </ul>
      }
      Dont={
        <ul>
          <li>Open links in the nav from a new browser tab</li>
          <li>Include links that navigate the user to a different site</li>
        </ul>
      }
    />
  </PageSection>{' '}
  <PageSection title="Content guidelines">
    <p>
      The navigation menu acts as a table of contents for your site. The content of links should
      reflect this hierarchy. The primary links representing main sections of the site should first
      be listed. If applicable, add submenus to links with additional related sections with a list
      of links pertaining to that group.
    </p>
  </PageSection>
  <PageSection
    title="Accessibility"
    description={
      <PharosLink href="https://www.w3.org/WAI/tutorials/menus/flyout/">
        W3 Dropdown Menus
      </PharosLink>
    }
  >
    <PageSection subSectionLevel={1} title="Relevant WCAG guidelines">
      <ul>
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
    <PageSection
      subSectionLevel={1}
      title="Importance"
      description="Dropdowns all users to better understand how menu items are related based on their grouping"
    />
    <PageSection
      subSectionLevel={1}
      title="Visual expectations"
      description="Dropdowns include some indication that they are expandable/interactable"
    />
    <PageSection
      subSectionLevel={1}
      title="Code expectations"
      description={
        <ul>
          <li>Dropdown list item has aria-haspopup="true" and aria-expanded="false"</li>
          <li>There is another list within the dropdown that contains all its child elements</li>
        </ul>
      }
    />
    <code>
      <nav role="navigation" aria-label="global">
        <ul>
          <li>
            <a href="...">Advanced Search</a>
          </li>
          <li className="...">
            <a href="..." aria-haspopup="true" aria-expanded="false">
              Browse
            </a>
            <ul>
              <li>
                <a href="...">By Subject</a>
              </li>
              <li>
                <a href="...">By Title</a>
              </li>
              <li>
                <a href="...">By Collections</a>
              </li>
              <li>
                <a href="...">By Publisher</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </code>
    <PageSection subSectionLevel={1} title="Expected actions">
      <PageSection
        subSectionLevel={2}
        title="Screen reader"
        description='Reads "dropdown name, collapsed, menu item"'
      />
      <PageSection subSectionLevel={2} title="Keyboard">
        <ul>
          <li>
            <kbd>Tab</kbd> moves focus onto the dropdown. When dropdown is expanded, focus will go
            to next menu item
          </li>
          <li>
            <kbd>Shift</kbd>+<kbd>Tab</kbd> When dropdown is expanded, moves focus to the previous
            menu item
          </li>
          <li>
            <kbd>Enter</kbd> opens dropdown, interacts with selection when focus is on a menu item
          </li>
          <li>
            <kbd>←</kbd> / <kbd>→</kbd> moves focus left and right if there is more than one
            dropdown (such as the global navigation on JSTOR)
          </li>
          <li>
            <kbd>↑</kbd> / <kbd>↓</kbd> moves focus up and down when the dropdown is expanded
          </li>
          <li>
            <kbd>↓</kbd> can also be used to expand a dropdown
          </li>
        </ul>
      </PageSection>
    </PageSection>
  </PageSection>
</>;
