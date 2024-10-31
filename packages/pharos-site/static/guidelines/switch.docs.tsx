import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { PharosSwitch, PharosHeading, PharosLink } from '@ithaka/pharos/lib/react-components';
import Canvas from '../../src/components/Canvas';
import { FC } from 'react';

const SwitchPage: FC = () => {
  return (
    <>
      <PageSection
        title="Switch"
        description="Switch are stylized toggles, similar to checkboxes, to indicate a boolean value."
        isHeader
        storyBookType="forms"
      >
        <PharosSwitch>
          <span slot="label">I am a switch</span>
        </PharosSwitch>
      </PageSection>
      <PageSection
        topMargin
        title="Usage"
        description="The switch component is used to toggle if a control is enabled or disabled. The value of the switch is persisted at the moment the control is updated, without a separate save mechanism."
      >
        <PageSection title="Alignment" subSectionLevel={1}>
          <p>Labels for switches are placed to the left of the switch.</p>
        </PageSection>
        <PageSection title="Placement" subSectionLevel={1}>
          <p>
            Switches in JSTOR are often used when enabling or disabling features on the site. Their
            larger size and clear on/off state make them easy to use and understand.
          </p>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>
                Use switches when users need to choose "yes" or "no" per option, with no
                indeterminate state
              </li>
              <li>
                Switches should work independently from each other, unless there are switches to
                control groups
              </li>
              <li>Switches should always include a label</li>
              <li>Use switches when choices are not mutually exclusive</li>
              <li>The list of choices should be in a logical order</li>
              <li>Value of the switch should be persisted when the control is changed</li>
            </ul>
          }
          Dont={
            <ul>
              <li>Don't use switches when there are no choices or a choice is non-binary</li>
              <li>
                Don't use where only one choice in a group is allowed. Consider using the radio
                button component instead
              </li>
              <li>
                Don't make switches affect other switches unless there is a clear hierarchy of
                controls (aka master switch and sub-switches)
              </li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
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
      <PageSection title="States">
        <PageSection title="Default" subSectionLevel={1}>
          <p>Indicates that the switch is interactable.</p>
          <Canvas>
            <PharosSwitch>
              <span slot="label">Switch label</span>
            </PharosSwitch>
          </Canvas>
        </PageSection>
        <PageSection title="Disabled" subSectionLevel={1}>
          <p>Indicates that the switch should not be interactable.</p>
          <Canvas>
            <PharosSwitch disabled>
              <span slot="label">Switch label</span>
            </PharosSwitch>
          </Canvas>
        </PageSection>
        <PageSection title="Checked" subSectionLevel={1}>
          <p>Indicates that the switch is selected and will submit a checked value of true.</p>
          <Canvas>
            <PharosSwitch checked>
              <span slot="label">Switch label</span>
            </PharosSwitch>
          </Canvas>
        </PageSection>
        <PageSection title="Unchecked" subSectionLevel={1}>
          <p>
            Indicates that the switch is not selected and will submit an unchecked value of false.
          </p>
          <Canvas>
            <PharosSwitch>
              <span slot="label">Switch label</span>
            </PharosSwitch>
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
          Switches help users to understand the relationship between selections in a form element or
          filter. A switch grouping also will typically allow users to select more than one item in
          the grouping.
        </PageSection>
        <PageSection subSectionLevel={1} title="Code expectations">
          <ul>
            <li> The switch has the role "switch". </li>
            <li>
              When the switch is selected, the ARIA state is set to <code>aria-checked="true"</code>{' '}
              and when it is deselected <code>aria-checked="false"</code>.
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Screen reader">
            <ul>
              <li>Reads: "item name, state (checked or unchecked), switch, group" </li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Keyboard">
            <ul>
              <li>
                The <kbd>Space</kbd> key can be used to select and deselect each switch when it has
                focus.
              </li>
              <li>
                Users can navigate between switch inputs by pressing <kbd>Tab</kbd> or{' '}
                <kbd>Shift</kbd>-<kbd>Tab</kbd>.
              </li>
              <li>Switches identified as `disabled` attribute are ignored in the tab order.</li>
            </ul>
          </PageSection>
        </PageSection>
      </PageSection>
    </>
  );
};
export default SwitchPage;
