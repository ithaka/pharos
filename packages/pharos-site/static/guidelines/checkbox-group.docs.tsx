import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import {
  PharosCheckbox,
  PharosCheckboxGroup,
  PharosLink,
} from '@ithaka/pharos/lib/react-components';
import Canvas from '../../src/components/Canvas';
import { FC } from 'react';

const CheckboxGroupPage: FC = () => {
  return (
    <>
      <PageSection
        title="Checkbox group"
        description="Checkbox groups present a set of related checkboxes together, along with a shared legend and optional message, so users can select any number of options within a set."
        isHeader
        storyBookType="forms"
      >
        <PharosCheckboxGroup>
          <span slot="legend">Checkbox group header</span>
          <PharosCheckbox value="1">
            <span slot="label">Checkbox 1</span>
          </PharosCheckbox>
          <PharosCheckbox value="2">
            <span slot="label">Checkbox 2</span>
          </PharosCheckbox>
        </PharosCheckboxGroup>
      </PageSection>
      <PageSection
        topMargin
        title="Usage"
        description="The checkbox group component wraps a set of checkboxes in a fieldset with a shared legend. It provides a consistent way to lay out related checkboxes, collect their combined value, and display a single validation message for the group."
      >
        <PageSection title="Alignment" subSectionLevel={1}>
          <p>
            By default, checkboxes within a group are stacked vertically. Use the{' '}
            <code>horizontal</code> attribute to lay the checkboxes out side by side when there are
            only a few short options.
          </p>
        </PageSection>
        <PageSection title="Placement" subSectionLevel={1}>
          <p>
            Checkbox groups are often used when faceting results so users can narrow their focus, or
            on forms where users may select multiple related options at once.
          </p>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>Use a checkbox group whenever two or more related checkboxes appear together</li>
              <li>Provide a concise legend that describes the group as a whole</li>
              <li>Keep the list of choices in a logical order</li>
              <li>Use the group-level message to communicate a single validation error</li>
            </ul>
          }
          Dont={
            <ul>
              <li>
                Don't use a checkbox group for a single, standalone checkbox—use the checkbox
                component directly instead
              </li>
              <li>
                Don't use where only one choice is allowed. Consider the radio group component
                instead
              </li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
        <PageSection title="Group legend" subSectionLevel={1}>
          <ul>
            <li>
              The legend should briefly describe what the grouping of checkboxes represents. This is
              especially helpful if there are multiple groups on a page, form, or experience.
            </li>
            <li>Use Sentence case for the group legend.</li>
          </ul>
        </PageSection>
        <PageSection title="Checkbox labels" subSectionLevel={1}>
          <ul>
            <li>
              Labels for the checkboxes within the group should be descriptive and succinct, and
              should not end in punctuation.
            </li>
            <li>Use Sentence case for individual checkbox labels.</li>
          </ul>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Variants">
        <PageSection title="Horizontal" subSectionLevel={1} lessMargin>
          <p>Use the horizontal layout when there are only a few short, related options.</p>
          <Canvas>
            <PharosCheckboxGroup horizontal>
              <span slot="legend">Checkbox group header</span>
              <PharosCheckbox value="1">
                <span slot="label">Checkbox 1</span>
              </PharosCheckbox>
              <PharosCheckbox value="2">
                <span slot="label">Checkbox 2</span>
              </PharosCheckbox>
            </PharosCheckboxGroup>
          </Canvas>
        </PageSection>
      </PageSection>
      <PageSection title="States">
        <PageSection title="Default" subSectionLevel={1}>
          <p>Indicates that the checkboxes in the group are interactable.</p>
          <Canvas>
            <PharosCheckboxGroup>
              <span slot="legend">Checkbox group header</span>
              <PharosCheckbox value="1">
                <span slot="label">Checkbox 1</span>
              </PharosCheckbox>
              <PharosCheckbox value="2">
                <span slot="label">Checkbox 2</span>
              </PharosCheckbox>
            </PharosCheckboxGroup>
          </Canvas>
        </PageSection>
        <PageSection title="Disabled" subSectionLevel={1}>
          <p>Indicates that the group of checkboxes should not be interactable.</p>
          <Canvas>
            <PharosCheckboxGroup disabled>
              <span slot="legend">Checkbox group header</span>
              <PharosCheckbox value="1">
                <span slot="label">Checkbox 1</span>
              </PharosCheckbox>
              <PharosCheckbox value="2">
                <span slot="label">Checkbox 2</span>
              </PharosCheckbox>
            </PharosCheckboxGroup>
          </Canvas>
        </PageSection>
        <PageSection title="Required" subSectionLevel={1}>
          <p>
            Indicates that the user must select at least one option in the group before the form can
            be submitted.
          </p>
          <Canvas>
            <PharosCheckboxGroup required>
              <span slot="legend">Checkbox group header</span>
              <PharosCheckbox value="1">
                <span slot="label">Checkbox 1</span>
              </PharosCheckbox>
              <PharosCheckbox value="2">
                <span slot="label">Checkbox 2</span>
              </PharosCheckbox>
            </PharosCheckboxGroup>
          </Canvas>
        </PageSection>
        <PageSection title="Error" subSectionLevel={1}>
          <p>Indicates that an error occurred within the checkbox group.</p>
          <Canvas>
            <PharosCheckboxGroup
              required
              invalidated
              message="This field is required, please make a selection."
            >
              <span slot="legend">Checkbox group header</span>
              <PharosCheckbox value="1">
                <span slot="label">Checkbox 1</span>
              </PharosCheckbox>
              <PharosCheckbox value="2">
                <span slot="label">Checkbox 2</span>
              </PharosCheckbox>
            </PharosCheckboxGroup>
          </Canvas>
        </PageSection>
      </PageSection>
      <PageSection title="Accessibility">
        <PageSection subSectionLevel={1} title="Relevant WCAG guidelines">
          <ul>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/name-role-value">
                4.1.2 Name, Role, Value A
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html">
                1.3.1 Info and Relationships A
              </PharosLink>
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Importance">
          Grouping related checkboxes together with a shared legend helps users, especially those
          using assistive technology, understand how the individual options relate to one another.
        </PageSection>
        <PageSection subSectionLevel={1} title="Code expectations">
          <ul>
            <li>
              The group is rendered as a <code>fieldset</code> with a <code>legend</code> describing
              the grouping.{' '}
              <PharosLink
                href="https://www.w3.org/WAI/tutorials/forms/grouping/#checkboxes"
                target="_blank"
              >
                Here's an example.
              </PharosLink>
            </li>
            <li>
              Some assistive technology reads the legend text for each fieldset, so it should be
              brief and descriptive.
            </li>
            <li>
              Checkboxes identified with the <code>disabled</code> attribute are ignored in the tab
              order.
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Screen reader">
            <ul>
              <li>Reads the fieldset's legend followed by each checkbox's label and state.</li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Keyboard">
            <ul>
              <li>
                The <kbd>Space</kbd> key can be used to select and deselect each checkbox when it
                has focus.
              </li>
              <li>
                Users can navigate between checkboxes by pressing <kbd>Tab</kbd> or <kbd>Shift</kbd>
                -<kbd>Tab</kbd>.
              </li>
            </ul>
          </PageSection>
        </PageSection>
      </PageSection>
    </>
  );
};
export default CheckboxGroupPage;
