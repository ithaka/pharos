import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC, ReactElement, useEffect, useState } from 'react';

import Canvas from '../../src/components/Canvas';

const DropdownMenuPage: FC = () => {
  const Pharos =
    typeof document !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;
  const [PageContent, setPageContent] = useState<ReactElement | null>(null);
  // An internal dependency of Pharos references document, so we need to set the page content in a useEffect to build it with SSR
  useEffect(() => {
    const {
      PharosDropdownMenuNav,
      PharosHeading,
      PharosDropdownMenuNavLink,
      PharosLink,
      PharosDropdownMenu,
      PharosDropdownMenuItem,
    } = Pharos;

    setPageContent(
      <>
        <PageSection
          isHeader
          title="Dropdown Menu"
          description="Dropdown menus present a list of menu items from which a user can choose from."
          storyBookType="components"
        >
          <PharosDropdownMenuNav>
            <PharosDropdownMenuNavLink
              href="#"
              id="smurfs-link"
              data-dropdown-menu-id="smurfs-menu"
              data-dropdown-menu-hover
              target="_blank"
            >
              Smurfs
            </PharosDropdownMenuNavLink>
            <PharosDropdownMenu id="smurfs-menu" data-dropdown-menu-hover>
              <PharosDropdownMenuItem link="/papa">Papa</PharosDropdownMenuItem>
              <PharosDropdownMenuItem link="/slumsy">Clumsy</PharosDropdownMenuItem>
              <PharosDropdownMenuItem link="/smurfette">Smurfette</PharosDropdownMenuItem>
            </PharosDropdownMenu>
            <PharosDropdownMenuNavLink
              href="#"
              id="tmnt-link"
              data-dropdown-menu-id="tmnt-menu"
              data-dropdown-menu-hover
              target="_blank"
            >
              Ninja Turtles
            </PharosDropdownMenuNavLink>
            <PharosDropdownMenu id="tmnt-menu">
              <PharosDropdownMenuItem link="/leonardo">Leonardo</PharosDropdownMenuItem>
              <PharosDropdownMenuItem link="/donatello">Donatello</PharosDropdownMenuItem>
              <PharosDropdownMenuItem link="/raphael">Raphael</PharosDropdownMenuItem>
              <PharosDropdownMenuItem link="/michelangelo">Michelangelo</PharosDropdownMenuItem>
            </PharosDropdownMenu>
            <PharosDropdownMenuNavLink href="#" id="other-link" target="_blank">
              Link to Other
            </PharosDropdownMenuNavLink>
          </PharosDropdownMenuNav>
        </PageSection>
        <PageSection topMargin title="Usage">
          <p>
            Dropdown menus are used with dropdown menu items to create options presented to the
            user. The dropdown menu can be triggered by matching the{' '}
            <code>data-dropdown-menu-id</code> on an element to the <code>id</code> of the dropdown
            menu. They are best used when more than two options are presented to the user, and can
            also be used to organize content.
          </p>
        </PageSection>{' '}
        <PageSection title="Best practices">
          <BestPractices
            Do={
              <ul>
                <li>Keep the label in view so that a user can read it</li>
                <li>Display menu items which are categorically similar per dropdown menu</li>
                <li>Disable menu items that aren't available</li>
                <li>Designate only a one menu item as the selected item</li>
              </ul>
            }
            Dont={
              <ul>
                <li>Don't change options in a single menu</li>
                <li>
                  Don't use dropdown menus in cases when data is commonly known and easier to type
                </li>
                <li>
                  Don't use dropdown menus when the list of options causes the user to scroll (Use
                  selects)
                </li>
              </ul>
            }
          />
        </PageSection>{' '}
        <PageSection title="Content guidelines">
          <PageSection title="Label" subSectionLevel={1}>
            <ul>
              <li>
                The label needs to be helpful in telling the user what is expected of them, but they
                do not need to be instructive
              </li>
              <li>Labels are to be written in sentence case and should only be 1-3 words long</li>
            </ul>
          </PageSection>
          <PageSection title="Item" subSectionLevel={1}>
            <ul>
              <li>Menu item text should be short and concise</li>
            </ul>
          </PageSection>
        </PageSection>{' '}
        <PageSection title="States">
          <PageSection title="Item" subSectionLevel={1}>
            <div>
              <PharosHeading level="4" preset="1--bold">
                Default
              </PharosHeading>
              <p>The default state of a menu item</p>
              <Canvas>
                <PharosDropdownMenuItem>Default</PharosDropdownMenuItem>
              </Canvas>
            </div>
            <div>
              <PharosHeading level={4} preset="1--bold">
                Disabled
              </PharosHeading>
              <p>Use when the option is unavailable to the user</p>
              <Canvas>
                <PharosDropdownMenuItem disabled>Disabled</PharosDropdownMenuItem>
              </Canvas>
            </div>
            <div>
              <PharosHeading level={4} preset="1--bold">
                Selected
              </PharosHeading>
              <p>Displays the item as the selected option</p>
              <Canvas>
                <PharosDropdownMenuItem selected>Selected</PharosDropdownMenuItem>
              </Canvas>
            </div>
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
              <PharosLink href="https://www.w3.org/WAI/tutorials/menus/flyout/">
                W3 - Fly-out Menus
              </PharosLink>
            </li>
          </ul>
          <PageSection title="Importance" subSectionLevel={1}>
            Provides users with options to select from a group of related items
          </PageSection>
          <PageSection title="Visual expectations" subSectionLevel={1}>
            A trigger (link or button) that causes a menu to show under it with a list of options to
            pick from.
          </PageSection>
          <PageSection title="Code expectations" subSectionLevel={1}>
            <ul>
              <li>Dropdown list item has aria-haspopup="true" and aria-expanded="false"</li>
              <li>
                There is another list within the dropdown that contains all its child elements
              </li>
            </ul>
          </PageSection>
          <PageSection title="Screen reader" subSectionLevel={1}>
            <ul>
              <li>Reads "dropdown name, collapsed, menu item"</li>
            </ul>
          </PageSection>
          <PageSection title="Keyboard" subSectionLevel={1}>
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
              <li>
                <kbd>&#8594;</kbd> <kbd>&#8592;</kbd>: moves focus left and right if there is more
                than one dropdown (such as the global navigation on JSTOR)
              </li>
              <li>
                <kbd>&#8593;</kbd> <kbd>&#8595;</kbd>: moves focus up and down when the dropdown is
                expanded
              </li>
              <li>
                <kbd>&#8595;</kbd>: can also be used to expand a dropdown
              </li>
            </ul>
          </PageSection>
        </PageSection>
      </>
    );
  }, [Pharos]);

  return PageContent;
};
export default DropdownMenuPage;
