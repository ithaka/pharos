import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC } from 'react';
import {
  PharosHeading,
  PharosLink,
  PharosToggleButton,
  PharosToggleButtonGroup,
} from '@ithaka/pharos/lib/react-components';

const ToggleButtonGroupPage: FC = () => {
  return (
    <>
      <PageSection
        isHeader
        title="Toggle Button Group"
        storyBookType="components"
        description="Toggle button groups present related actions together to allow the user to select from mutually exclusive options."
      ></PageSection>{' '}
      <PageSection title="Usage">
        <p>
          Within a toggle button group, only one option can be selected at a time. Selecting one
          option deselects all others.
        </p>
        <p>
          Use a toggle button group as a switch between different views. For example, use the
          component to allow users to switch between a list view and gallery view.
        </p>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>
                Group items within a toggle button group that are related and have a logical
                connection to each other
              </li>
              <li>
                Think about whether your toggle button group needs text and an icon, text only, or
                an icon only
              </li>
              <li>Use short and concise text for the labels (if applicable)</li>
              <li>
                Place the toggle button group in close proximity (ideally just above) to the area it
                controls
              </li>
            </ul>
          }
          Dont={
            <ul>
              <li>Don't group items that aren't clearly related</li>
              <li>Don't use an icon-only toggle if the actions aren't clearly understood</li>
              <li>Don't use a toggle button group if there are more than three options</li>
              <li>Avoid wrapping the toggle button group onto more than a single row.</li>
            </ul>
          }
        />
      </PageSection>
      <PageSection title="Content guidelines">
        <p>
          If using labels, they should be concise and descriptive, using no more than three words.
        </p>
        <PageSection subSectionLevel={1} title="States">
          <PharosHeading level={4} preset="1--bold">
            Default
          </PharosHeading>
          <p>Indicates that the user can interact with the button.</p>
          <PharosHeading level={4} preset="1--bold">
            Selected
          </PharosHeading>
          <p>Indicates that the button is selected.</p>
          <PharosHeading level={4} preset="1--bold">
            Disabled
          </PharosHeading>
          <p>Indicates that the user is unable to interact with the button.</p>
        </PageSection>
      </PageSection>
      <PageSection title="Variants">
        <PageSection title="Icon + Text" subSectionLevel={1}>
          <PharosToggleButtonGroup>
            <PharosToggleButton id="gallery-mode-button" icon-left="view-gallery">
              Gallery
            </PharosToggleButton>
            <PharosToggleButton id="list-mode-button" icon-left="view-list">
              List
            </PharosToggleButton>
          </PharosToggleButtonGroup>
        </PageSection>
        <PageSection title="Text only" subSectionLevel={1}>
          <PharosToggleButtonGroup>
            <PharosToggleButton id="gallery-mode-button">Gallery</PharosToggleButton>
            <PharosToggleButton id="list-mode-button">List</PharosToggleButton>
          </PharosToggleButtonGroup>
        </PageSection>
        <PageSection title="Icon only" subSectionLevel={1}>
          <PharosToggleButtonGroup>
            <PharosToggleButton id="gallery-mode-button" icon-left="view-gallery" />
            <PharosToggleButton id="list-mode-button" icon-left="view-list" />
          </PharosToggleButtonGroup>
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
          </ul>
        </PageSection>
        <PageSection title="Code expectations" subSectionLevel={1}>
          <ul>
            <li>
              There is a <code>role="group"</code> attribute on the parent element
              <ul>
                <li>
                  If the toggle button group is part of a toolbar use <code>role="toolbar"</code>
                </li>
              </ul>
            </li>
            <li>
              Use the semantic <code> &lt;button&gt; </code> on all grouped elements under the
              parent element
            </li>
            <li>
              If the button needs additional information in order to be understood by assistive
              technologies, use an <code>aria-label</code> attribute to convey this information
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection title="Screen reader" subSectionLevel={2}>
            <ul>
              <li>Reads: "Button name (or aria-label), button"</li>
            </ul>
          </PageSection>
          <PageSection title="Keyboard" subSectionLevel={2}>
            <ul>
              <li>
                <kbd>Tab</kbd>: advances to the next element
              </li>
              <li>
                <kbd>Shift</kbd> + <kbd>Tab</kbd>: goes to the previous element
              </li>
              <li>
                <kbd>Enter</kbd> or <kbd>Space</kbd>: activates the element in focus
              </li>
            </ul>
          </PageSection>
        </PageSection>
      </PageSection>
    </>
  );
};
export default ToggleButtonGroupPage;
