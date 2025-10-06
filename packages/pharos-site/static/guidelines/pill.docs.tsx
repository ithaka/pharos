import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC } from 'react';
import Canvas from '../../src/components/Canvas';
import { PharosPill, PharosLink } from '@ithaka/pharos/lib/react-components';

const PillPage: FC = () => {
  return (
    <>
      <PageSection
        title="Pill"
        description="A pill is used to display discrete information, create categorization, and label items. They can be interactive (dismissible) or informative."
        isHeader
        storyBookType="components"
      >
        <Canvas>
          <PharosPill>Email address</PharosPill>
          <PharosPill dismissible>Topic: Art History</PharosPill>
        </Canvas>
      </PageSection>
      <PageSection title="Usage">
        <p>
          Pills are used to represent a discrete piece of information (e.g. email address, username,
          role name) that the user can interact with, often in an input or a list format.
        </p>
        <PageSection subSectionLevel={1} title="When to use pills">
          <ul>
            <li>When you want to add/remove discrete items to a list</li>
            <li>When you need to apply dynamic filters</li>
            <li>When you want to display tags or labels on an item</li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="When not to use pills">
          <ul>
            <li>
              When you need multiple interactions for a single entity, consider a card or a tile
            </li>
            <li>When you need to display long explanatory text, consider using a caption</li>
          </ul>
        </PageSection>
      </PageSection>
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>Stack pills if screen width is constrained</li>
              <li>Limit pill text to 1-2 words and reflect a discrete name for the data</li>
            </ul>
          }
          Dont={
            <ul>
              <li>Do not wrap contents inside the pill</li>
              <li>Do not use a pill to replace a button</li>
              <li>Do not use a pill to navigate to another page</li>
            </ul>
          }
        />
      </PageSection>
      <PageSection title="Content guidelines">
        <PageSection subSectionLevel={1} title="Pill groups">
          <ul>
            <li>
              Avoid mixing and matching colors unless the different color of the pill conveys
              important meaning about the data inside
            </li>
            <li>
              If including an icon on the left-hand side, make certain the icon is consistent for
              all data in the same category. As an example, when including a mail icon next to an email address,
              all pills with email addresses should include the mail icon.
            </li>
            <li>
              If mixing interactive and informative pills, organize these into a list in the page
              hierarchy
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Pill content">
          <ul>
            <li>
              Text should generally be 1-2 words long and reflect a discrete name for the data;
              avoid sentences.
            </li>
            <li>
              Text should not be wrapped inside the pill. Set a <code>max-width</code> on the pill or pill
              container element to truncate long text with an ellipsis.
            </li>
          </ul>
        </PageSection>
      </PageSection>
      <PageSection title="Size">
        <p>
          In general, pills should use the base size. The small size should only be used when there
          is limited space on compact displays.
        </p>
        <Canvas>
          <PharosPill>Base pill</PharosPill>
          <PharosPill size="small">Small pill</PharosPill>
        </Canvas>
      </PageSection>
      <PageSection title="Dismissible">
        <p>
          The <code>dismissible</code> attribute makes pills interactive with a close button. These
          pills are semantically buttons that can be activated by clicking or keyboard interaction.
          When dismissed, they fire the <code>pharos-pill-dismissed</code> event.
        </p>
        <Canvas>
          <PharosPill>Informational pill</PharosPill>
          <PharosPill dismissible>Dismissible pill</PharosPill>
        </Canvas>
      </PageSection>
      <PageSection title="Preset">
        <p>
          The <code>preset</code> attribute controls the color styles of the pill. There are nine
          preset options available, which can be used to categorize or differentiate pills. Preset 1
          is the default style.
        </p>
        <PageSection subSectionLevel={1} title="Presets">
          <Canvas>
            <PharosPill preset="1">Preset 1 (default)</PharosPill>
            <PharosPill preset="2">Preset 2</PharosPill>
            <PharosPill preset="3">Preset 3</PharosPill>
            <PharosPill preset="4">Preset 4</PharosPill>
            <PharosPill preset="5">Preset 5</PharosPill>
            <PharosPill preset="6">Preset 6</PharosPill>
            <PharosPill preset="7">Preset 7</PharosPill>
            <PharosPill preset="8">Preset 8</PharosPill>
            <PharosPill preset="9">Preset 9</PharosPill>
          </Canvas>
        </PageSection>
      </PageSection>
      <PageSection title="Icon left">
        <p>
          The <code>icon-left</code> attribute adds a Pharos icon to the left side of the pill
          content. Use this to further categorize the type of pill being displayed. Make certain the
          icon is consistent for all data in the same category.
        </p>
        <Canvas>
          <PharosPill iconLeft="email">user@example.com</PharosPill>
          <PharosPill dismissible iconLeft="email">
            user@example.com
          </PharosPill>
        </Canvas>
      </PageSection>
      <PageSection title="Disabled">
        <p>
          The <code>disabled</code> attribute should only be used with dismissible pills. Use this
          state when a dismissible pill cannot be interacted with at the current time.
        </p>
        <Canvas>
          <PharosPill dismissible disabled>
            Disabled pill
          </PharosPill>
        </Canvas>
      </PageSection>
      <PageSection title="Accessibility">
        <PageSection subSectionLevel={1} title="What's built in">
          <ul>
            <li>
              Interactive pills (dismissible) are semantically buttons that have focus applied to
              the entire pill
            </li>
            <li>
              Informative pills are div elements that do not receive focus, as they are not
              interactive
            </li>
            <li>Variants use predefined color schemes that meet contrast requirements</li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Considerations">
          <PageSection subSectionLevel={2} title="Design">
            <ul>
              <li>
                Always pair error states with an icon to rely on more than color alone to signify errors
              </li>
              <li>
                Ensure color choices convey meaning consistently across the interface, not just
                aesthetic variety
              </li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Development">
            <ul>
              <li>
                For dismissible pills, clicking any part of it will remove it. Ensure that focus is
                properly managed after removing elements that were previously in focus (e.g., move
                focus to the logically next element or to start of section)
              </li>
              <li>
                When grouping pills, organize them in a list to convey their discrete nature to
                assistive technologies
              </li>
            </ul>
          </PageSection>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Screen reader">
            <ul>
              <li>Informational pills are read as regular text content: "[pill text]"</li>
              <li>Dismissible pills are read as: "Dismiss [pill text], button"</li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Keyboard">
            <ul>
              <li>
                <strong>Tab:</strong> Moves focus to the next dismissible pill (informational pills
                are not focusable)
              </li>
              <li>
                <strong>Enter or Space:</strong> Dismisses the focused pill and fires the{' '}
                <code>pharos-pill-dismissed</code> event
              </li>
            </ul>
          </PageSection>
        </PageSection>
        <PageSection subSectionLevel={1} title="Relevant WCAG guidelines">
          <ul>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">
                1.3.1 Info and Relationships A
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG22/Understanding/use-of-color">
                1.4.1 Use of Color A
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum">
                2.5.8 Target Size (Minimum) AA
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">
                4.1.2 Name, Role, Value A
              </PharosLink>
            </li>
          </ul>
        </PageSection>
      </PageSection>
    </>
  );
};
export default PillPage;
