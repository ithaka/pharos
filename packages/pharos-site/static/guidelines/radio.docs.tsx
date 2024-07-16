import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC } from 'react';
import { PharosHeading, PharosLink, PharosRadioButton } from '@ithaka/pharos/lib/react-components';
import Canvas from '../../src/components/Canvas';

const RadioButtonPage: FC = () => {
  return (
    <>
      <PageSection
        isHeader
        storyBookType="forms"
        title="Radio button"
        description="Radio buttons present items in a list of two or more options where the user can select only one option at a time."
      >
        <PharosRadioButton>
          <span slot="label">I am a radio</span>
        </PharosRadioButton>
      </PageSection>
      <PageSection topMargin title="Usage">
        <p>
          Radio buttons are normally presented in radio groups (a collection of radio buttons which
          will be grouped by the radio button group component). Only one radio button in a group can
          be selected at a time.
        </p>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>Use a label to provide context for radio buttons</li>
              <li>Include two or more mutually exclusive items in a group</li>
              <li>Use when users need to see the available options at a glance</li>
              <li>Use horizontally oriented only if there are a few options</li>
            </ul>
          }
          Dont={
            <ul>
              <li>
                Don't use radio buttons when there are either no choices or multiple choices per
                group
              </li>
              <li>Don't display a set of radio buttons without a default selection</li>
              <li>
                Don't use radio buttons if the list of choices gets long. (The select component may
                be better suited)
              </li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
        <PageSection subSectionLevel={1} title="Labels">
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
      <PageSection title="States">
        <PageSection subSectionLevel={1} title="Default">
          <p>Indicates that the user can interact with the radio button.</p>
          <Canvas>
            <PharosRadioButton>
              <span slot="label">Radio label</span>
            </PharosRadioButton>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Checked">
          <p>Indicates the value used for the radio group.</p>
          <Canvas>
            <PharosRadioButton checked>
              <span slot="label">Radio label</span>
            </PharosRadioButton>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Disabled">
          <p>Indicates that the user can interact with the radio button.</p>
          <Canvas>
            <PharosRadioButton disabled>
              <span slot="label">Radio label</span>
            </PharosRadioButton>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Error">
          <p>Indicates that an error has occured with the radio button.</p>
          <Canvas>
            <PharosRadioButton
              required
              invalidated
              message="This field is required, please make a selection"
            >
              <span slot="label">Radio label</span>
            </PharosRadioButton>
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
          <ul>
            <li>
              Uses aria-checked attribute to make sure the information communicated to assistive
              technology is the same as the visual state. (e.g. img element)
            </li>
            <li>Use disabled prop to prevent the checkbox from interaction</li>
            <li>Do we allow for help text? </li>
            <li>
              Let's look at the
              <PharosLink href="https://www.w3.org/TR/wai-aria-practices-1.1/#radiobutton">
                WCAG guidelines
              </PharosLink>
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Code expectations">
          <ul>
            <li>
              Provide a <code>fieldset</code> that surrounds the entire grouping of radio buttons.
              Also, provide a<code>legend</code>, which is a description for the grouping.
              <PharosLink href="https://www.w3.org/TR/wai-aria-practices-1.1/#naming_with_legends">
                Here's an example.
              </PharosLink>
            </li>
            <li>
              Some assistive technology read the legend ("title" prop for radio group) for each
              fieldset. It should be brief and descriptive to help someone using assistive
              technology quickly understand the question they are answering with the group of radio
              buttons.
            </li>
            <li>Each radio button element has a role of "radio".</li>
            <li>
              If a radio button is checked, the radio element has "aria-checked" set to{' '}
              <code>true</code>. If it is not checked, it has "aria-checked" set to{' '}
              <code>false</code>.
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Screen reader">
            <ul>
              <li>
                Reads the label, the option, checked or unchecked and X out of X.
                <ul>
                  <li>
                    For example:
                    <ul>
                      <li>
                        Download file as:
                        <ul>
                          <li>.doc</li>
                          <li> .pdf </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    The above example (with focus on the .doc and is NOT checked) should read as
                    "Download file as, .doc, unchecked, 1 of 2"
                    <ul>
                      <li>
                        <PharosLink href="https://www.youtube.com/watch?v=X__fAJDyBjo">
                          Example
                        </PharosLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Keyboard">
            <ul>
              <li>
                <kbd>Space</kbd> checks the focused radio button, if it is not already checked.
              </li>
              <li>
                <kbd>↑</kbd> / <kbd>←</kbd> move the indicator/focus to the radio button
                <strong>before</strong> the current selected
              </li>
              <li>
                <kbd>↓</kbd> / <kbd>→</kbd> move the indicator/focus to the radio button
                <strong>after</strong> the current selected
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
export default RadioButtonPage;
