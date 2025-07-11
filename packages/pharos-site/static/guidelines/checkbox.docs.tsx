import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { PharosCheckbox, PharosHeading, PharosLink } from '@ithaka/pharos/lib/react-components';
import Canvas from '../../src/components/Canvas';
import { FC } from 'react';

const CheckboxPage: FC = () => {
  return (
    <>
      <PageSection
        title="Checkbox"
        description="Checkboxes present items in a list of one or more options where the user can have several different combinations of selections."
        isHeader
        storyBookType="forms"
      >
        <PharosCheckbox>
          <span slot="label">I am a checkbox</span>
        </PharosCheckbox>
      </PageSection>
      <PageSection
        topMargin
        title="Usage"
        description="The checkbox component is used to provide multiple options the user can select, including all or none. They work independently from each other, therefore checking an additional box does not affect the other selections. Checkboxes are not mutually exclusive."
      >
        <PageSection title="Alignment" subSectionLevel={1}>
          <p>
            Labels for checkboxes are placed to the right of the checkbox. If there's a checkbox
            group, the options can be vertically or horizontally stacked, depending on the use case
            and UI needs. Vertically stacking the checkboxes is preferable for better readability.
          </p>
        </PageSection>
        <PageSection title="Placement" subSectionLevel={1}>
          <p>
            Checkboxes in JSTOR are often used when faceting results so users can narrow their
            focus, or on forms. They can be placed within pages or modals.
          </p>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>Use checkboxes when users need to choose "yes" or "no" per option</li>
              <li>
                Checkboxes should work independently from each other, unless there are checkboxes to
                control groups
              </li>
              <li>Checkboxes should always include a label</li>
              <li>Use checkboxes when choices are not mutually exclusive</li>
              <li>The list of choices should be in a logical order</li>
            </ul>
          }
          Dont={
            <ul>
              <li>Don't use checkboxes when there are no choices or a choice is non-binary</li>
              <li>
                Don't use where only one choice in a group is allowed. Consider using the radio
                button component instead
              </li>
              <li>
                Don't make checkboxes affect other checkboxes unless for bulk selection actions
              </li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
        <PageSection title="Group labels (optional)" subSectionLevel={1}>
          <ul>
            <li>
              For a grouping of checkboxes, you can include a heading to provide even greater
              clarity. This is especially helpful if there multiple groups on a page, form or
              experience.
            </li>
            <li>Use Sentence case for group labels.</li>
          </ul>
        </PageSection>
        <PageSection title="Labels" subSectionLevel={1}>
          <ul>
            <li>
              Labels are descriptive and succinct. They should provide further clarity for the user.
            </li>
            <li>Labels should not end in punctuation.</li>
            <li>Use Sentence case for labels.</li>
            <li>
              Avoid using negative language as it can be counterintuitive. For example, "I agree to
              the terms" instead of "I don't agree to the terms."
            </li>
            <li>
              Long labels may wrap to a second line, but consider rewording the label if it gets too
              long.
            </li>
            <li>Labels should not be truncated.</li>
          </ul>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Variants">
        <PageSection
          title="isOnBackground"
          subSectionLevel={1}
          description="In cases where the background containing the checkbox will be a dark color or, in cases where the theme of the page/component would be dark, use the isOnBackground variant checkbox."
        >
          <div
            style={{
              background: 'var(--pharos-color-marble-gray-10)',
              padding: 'var(--pharos-spacing-1-x)',
            }}
          >
            <Canvas>
              <PharosCheckbox isOnBackground>
                <span slot="label">Checkbox label</span>
              </PharosCheckbox>
            </Canvas>
          </div>
        </PageSection>
      </PageSection>
      <PageSection title="States">
        <PageSection title="Default" subSectionLevel={1}>
          <p>Indicates that the checkbox is interactable.</p>
          <Canvas>
            <PharosCheckbox>
              <span slot="label">Checkbox label</span>
            </PharosCheckbox>
          </Canvas>
        </PageSection>
        <PageSection title="Disabled" subSectionLevel={1}>
          <p>Indicates that the checkbox should not be interactable.</p>
          <Canvas>
            <PharosCheckbox disabled>
              <span slot="label">Checkbox label</span>
            </PharosCheckbox>
          </Canvas>
        </PageSection>
        <PageSection title="Required" subSectionLevel={1}>
          <p>
            Indicates that the user must specify a value for the input before the form can be
            submitted.
          </p>
          <Canvas>
            <PharosCheckbox required>
              <span slot="label">Checkbox label</span>
            </PharosCheckbox>
          </Canvas>
        </PageSection>
        <PageSection title="Error" subSectionLevel={1}>
          <p>Indicates that an error occurred within the checkbox.</p>
          <Canvas>
            <PharosCheckbox
              required
              invalidated
              message="This field is required, please make a selection."
            >
              <span slot="label">Checkbox label</span>
            </PharosCheckbox>
          </Canvas>
        </PageSection>
        <PageSection title="Checked" subSectionLevel={1}>
          <p>Indicates that the checkbox is selected and will submit a checked value of true.</p>
          <Canvas>
            <PharosCheckbox checked>
              <span slot="label">Checkbox label</span>
            </PharosCheckbox>
          </Canvas>
        </PageSection>
        <PageSection title="Unchecked" subSectionLevel={1}>
          <p>
            Indicates that the checkbox is not selected and will submit an unchecked value of false.
          </p>
          <Canvas>
            <PharosCheckbox>
              <span slot="label">Checkbox label</span>
            </PharosCheckbox>
          </Canvas>
        </PageSection>
        <PageSection title="Indeterminate" subSectionLevel={1}>
          <p>
            A state that serves a visual purpose while masking the actual value of the checkbox.
          </p>
          <Canvas>
            <PharosCheckbox indeterminate checked>
              <span slot="label">Checkbox label</span>
            </PharosCheckbox>
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
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Importance">
          Checkboxes help users to understand the relationship between selections in a form element
          or filter. A checkbox grouping also will typically allow users to select more than one
          item in the grouping.
        </PageSection>
        <PageSection subSectionLevel={1} title="Code expectations">
          <ul>
            <li> The checkbox has the role "checkbox". </li>
            <li>
              When the checkbox is selected, the ARIA state is set to{' '}
              <code>aria-checked="true"</code> and when it is deselected{' '}
              <code>aria-checked="false"</code>.
            </li>
            <li>
              Provide a <code>fieldset</code> that surrounds the entire grouping of checkboxes.
              Also, provide a <code>legend</code>, which is a description for the grouping.{' '}
              <PharosLink
                href="https://www.w3.org/WAI/tutorials/forms/grouping/#checkboxes"
                target="_blank"
              >
                Here's an example.
              </PharosLink>
            </li>
            <li>
              Some assistive technology reads the legend text for each fieldset, so it should be
              brief and descriptive. This helps someone using assistive technology to understand the
              question they are answering with the group of checkboxes
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Screen reader">
            <ul>
              <li>
                Reads: "item name, state (checked or unchecked), checkbox, fieldset name,
                group"{' '}
              </li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Keyboard">
            <ul>
              <li>
                The <kbd>Space</kbd> key can be used to select and deselect each checkbox when it
                has focus.
              </li>
              <li>
                Users can navigate between checkbox inputs by pressing <kbd>Tab</kbd> or{' '}
                <kbd>Shift</kbd>-<kbd>Tab</kbd>.
              </li>
              <li>Checkboxes identified as `disabled` attribute are ignored in the tab order.</li>
            </ul>
          </PageSection>
        </PageSection>
      </PageSection>
    </>
  );
};
export default CheckboxPage;
