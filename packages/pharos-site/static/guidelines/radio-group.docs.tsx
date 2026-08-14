import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC } from 'react';
import {
  PharosLink,
  PharosRadioButton,
  PharosRadioGroup,
} from '@ithaka/pharos/lib/react-components';
import Canvas from '../../src/components/Canvas';

const RadioGroupPage: FC = () => {
  return (
    <>
      <PageSection
        isHeader
        storyBookType="forms"
        title="Radio group"
        description="Radio groups present a set of mutually exclusive radio buttons together, along with a shared legend and optional message, so users can select exactly one option within a set."
      >
        <PharosRadioGroup>
          <span slot="legend">Radio group header</span>
          <PharosRadioButton value="1">
            <span slot="label">Radio button 1</span>
          </PharosRadioButton>
          <PharosRadioButton value="2">
            <span slot="label">Radio button 2</span>
          </PharosRadioButton>
        </PharosRadioGroup>
      </PageSection>
      <PageSection topMargin title="Usage">
        <p>
          The radio group component wraps a set of radio buttons in a fieldset with a shared legend.
          Only one radio button in the group can be selected at a time, and the group exposes the
          selected value along with a single validation message.
        </p>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>
                Use a radio group whenever two or more mutually exclusive options are presented
              </li>
              <li>Provide a concise legend that describes what the group of options represents</li>
              <li>Use when users need to see all available options at a glance</li>
              <li>Use the horizontal layout only if there are a few short options</li>
            </ul>
          }
          Dont={
            <ul>
              <li>Don't use radio groups when there are either no choices or only one choice</li>
              <li>Don't display a radio group without a default selection when one is expected</li>
              <li>
                Don't use a radio group if the list of choices gets long—the select component may be
                better suited
              </li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
        <PageSection subSectionLevel={1} title="Group legend">
          <ul>
            <li>
              The legend should briefly describe what the group of radio buttons represents. This is
              especially helpful when there are multiple groups on a page or form.
            </li>
            <li>Use Sentence case for the group legend.</li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Radio button labels">
          <ul>
            <li>
              Labels are descriptive and succinct. They should provide further clarity for the user.
            </li>
            <li>Labels should not end in punctuation.</li>
            <li>
              Avoid using negative language, as it can be counterintuitive. For example, "I want to
              receive a promotional email" instead of "I don't want to receive promotional email."
            </li>
          </ul>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Variants">
        <PageSection title="Horizontal" subSectionLevel={1} lessMargin>
          <p>Use the horizontal layout when there are only a few short, related options.</p>
          <Canvas>
            <PharosRadioGroup horizontal>
              <span slot="legend">Radio group header</span>
              <PharosRadioButton value="1">
                <span slot="label">Radio button 1</span>
              </PharosRadioButton>
              <PharosRadioButton value="2">
                <span slot="label">Radio button 2</span>
              </PharosRadioButton>
            </PharosRadioGroup>
          </Canvas>
        </PageSection>
      </PageSection>
      <PageSection title="States">
        <PageSection subSectionLevel={1} title="Default">
          <p>Indicates that the radio buttons in the group are interactable.</p>
          <Canvas>
            <PharosRadioGroup>
              <span slot="legend">Radio group header</span>
              <PharosRadioButton value="1">
                <span slot="label">Radio button 1</span>
              </PharosRadioButton>
              <PharosRadioButton value="2">
                <span slot="label">Radio button 2</span>
              </PharosRadioButton>
            </PharosRadioGroup>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Disabled">
          <p>Indicates that the group of radio buttons should not be interactable.</p>
          <Canvas>
            <PharosRadioGroup disabled>
              <span slot="legend">Radio group header</span>
              <PharosRadioButton value="1">
                <span slot="label">Radio button 1</span>
              </PharosRadioButton>
              <PharosRadioButton value="2">
                <span slot="label">Radio button 2</span>
              </PharosRadioButton>
            </PharosRadioGroup>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Required">
          <p>
            Indicates that the user must select an option in the group before the form can be
            submitted.
          </p>
          <Canvas>
            <PharosRadioGroup required>
              <span slot="legend">Radio group header</span>
              <PharosRadioButton value="1">
                <span slot="label">Radio button 1</span>
              </PharosRadioButton>
              <PharosRadioButton value="2">
                <span slot="label">Radio button 2</span>
              </PharosRadioButton>
            </PharosRadioGroup>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Error">
          <p>Indicates that an error occurred within the radio group.</p>
          <Canvas>
            <PharosRadioGroup
              required
              invalidated
              message="This field is required, please make a selection."
            >
              <span slot="legend">Radio group header</span>
              <PharosRadioButton value="1">
                <span slot="label">Radio button 1</span>
              </PharosRadioButton>
              <PharosRadioButton value="2">
                <span slot="label">Radio button 2</span>
              </PharosRadioButton>
            </PharosRadioGroup>
          </Canvas>
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
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions">
                3.3.2 Labels or Instructions A
              </PharosLink>
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Importance">
          Grouping related radio buttons together with a shared legend helps users, especially those
          using assistive technology, understand that the options are mutually exclusive and belong
          to the same set.
        </PageSection>
        <PageSection subSectionLevel={1} title="Code expectations">
          <ul>
            <li>
              Provide a <code>fieldset</code> that surrounds the entire grouping of radio buttons.
              Also, provide a <code>legend</code>, which is a description for the grouping.{' '}
              <PharosLink href="https://www.w3.org/TR/wai-aria-practices-1.1/#naming_with_legends">
                Here's an example.
              </PharosLink>
            </li>
            <li>
              Some assistive technology reads the legend for each fieldset, so it should be brief
              and descriptive to help someone using assistive technology quickly understand the
              question they are answering with the group of radio buttons.
            </li>
            <li>Each radio button element has a role of "radio".</li>
            <li>
              If a radio button is checked, the element has <code>aria-checked</code> set to{' '}
              <code>true</code>. If it is not checked, it has <code>aria-checked</code> set to{' '}
              <code>false</code>.
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Screen reader">
            <ul>
              <li>
                Reads the fieldset's legend, followed by each radio button's label, checked state,
                and position within the group (e.g., "1 of 2").
              </li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Keyboard">
            <ul>
              <li>
                <kbd>Space</kbd> checks the focused radio button, if it is not already checked.
              </li>
              <li>
                <kbd>↑</kbd> / <kbd>←</kbd> move the indicator/focus to the radio button{' '}
                <strong>before</strong> the current selection.
              </li>
              <li>
                <kbd>↓</kbd> / <kbd>→</kbd> move the indicator/focus to the radio button{' '}
                <strong>after</strong> the current selection.
              </li>
              <li>
                <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> moves the focus into and out of
                the radio group. When focus moves into a radio group:
                <ul>
                  <li>If a radio button is checked, focus is set on the checked button.</li>
                  <li>
                    If none of the radio buttons are checked, focus is set on the first radio button
                    in the group.
                  </li>
                </ul>
              </li>
            </ul>
          </PageSection>
        </PageSection>
      </PageSection>
    </>
  );
};
export default RadioGroupPage;
