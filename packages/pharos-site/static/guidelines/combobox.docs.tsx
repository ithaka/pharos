import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC } from 'react';
import { PharosCombobox, PharosHeading, PharosLink } from '@ithaka/pharos/lib/react-components';
import Canvas from '../../src/components/Canvas';

const ComboboxPage: FC = () => {
  return (
    <>
      <PageSection
        title="Combobox"
        description="Comboboxes combine text inputs and dropdowns. The text input is used for filtering the options,
    while the dropdown allows the selecting of options."
        isHeader
        istoryBookType="forms"
      >
        <PharosCombobox>
          <span slot="label">I am a combobox</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </PharosCombobox>
      </PageSection>
      <PageSection topMargin title="Usage">
        <p>
          Clicking the dropdown arrow button will show all items. Typing in the text input will
          filter the list.
        </p>
        <p>Entering custom values is **not** currently supported.</p>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>
                Make sure the label clearly indicates to the user what kind of input is expected of
                them
              </li>
              <li>
                Labels need to describe the purpose of the form control and must be used for all
                text inputs
              </li>
              <li>
                Placeholder text should be a word or short phrase that demonstrates the expected
                type of data, rather than an explanatory message
              </li>
              <li>Options shown in the dropdown are short and concise</li>
            </ul>
          }
          Dont={
            <ul>
              <li>Do not use placeholder text as a replacement for labels</li>
              <li>Do not use for a short list of options, use a select component instead</li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
        <PageSection subSectionLevel={1} title="Labels">
          <ul>
            <li>
              The label needs to be helpful in telling the user what is expected of them, but they
              do not need to be instructive
            </li>
            <li>Labels are placed above the Combobox</li>
            <li>Labels are to be written in sentence case and should only be 1-3 words long</li>
          </ul>
        </PageSection>
        <PageSection
          subSectionLevel={1}
          title="Placeholder text"
          description="Placeholder text is shown inside the text input to help users know what information they can enter."
        >
          <ul>
            <li>Field placeholder text is used for supplementary information</li>
            <li>The text should be written as examples instead of instructions</li>
          </ul>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="States">
        <PageSection
          subSectionLevel={1}
          title="Default"
          description="The default state - when no other state attribute is assigned to the Combobox."
        >
          <Canvas>
            <PharosCombobox>
              <span slot="label">Combobox label</span>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </PharosCombobox>
          </Canvas>
        </PageSection>
        <PageSection
          subSectionLevel={1}
          title="Disabled"
          description="Display this state when the Combobox is non-interactive."
        >
          <Canvas>
            <PharosCombobox disabled>
              <span slot="label">Combobox label</span>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </PharosCombobox>
          </Canvas>
        </PageSection>
        <PageSection
          subSectionLevel={1}
          title="Required"
          description="This state signifies a mandatory response from the user."
        >
          <Canvas>
            <PharosCombobox required>
              <span slot="label">Combobox label</span>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </PharosCombobox>
          </Canvas>
        </PageSection>
        <PageSection
          subSectionLevel={1}
          title="Error"
          description="Display this state when a user has encountered an error with their input. This could be if they didn't fill out a required field, or the information provided does not meet validation requirements."
        >
          <Canvas>
            <PharosCombobox
              required
              invalidated
              message="This field is required, please make a selection"
            >
              <span slot="label">Combobox label</span>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </PharosCombobox>
          </Canvas>
        </PageSection>
      </PageSection>
      <PageSection title="Accessibility">
        <PageSection subSectionLevel={1} title="Relevant WCAG guidelines">
          <ul>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose">
                1.3.5 Identify Input Purpose AA
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/name-role-value">
                4.1.2 Name, Role, Value A
              </PharosLink>
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Importance">
          <ul>
            <li>
              Combo boxes are used as a text field that has a list of pre-populated dropdown
              options. For this specific example, we are looking at a combobox with autocomplete.
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Code expectations">
          <ul>
            <li>
              <PharosLink href="https://w3c.github.io/aria-practices/examples/combobox/combobox-autocomplete-list.html">
                Example
              </PharosLink>
              of a combobox with an autocomplete dropdown list (via w3c)
            </li>
            <li>
              The ComboBox uses the <code>aria-expanded</code>, <code>aria-selected</code>,
              <code>aria-disabled</code>, <code>aria-haspopup</code>, <code>aria-owns</code>,
              <code>aria-activedescendant</code> and <code>aria-hidden</code> properties on the
              nested elements depending on the current state of the component and its options.
            </li>
            <li>
              The ComboBox uses the <code>listbox</code> role. Each item from the popup list has an
              <code>option</code> role.
            </li>
            <li>
              To move the focus to the current keyboard navigation position, the component uses the
              <code>aria-activedescendant</code> approach.
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Accessibility best practices for labels:">
            <ul>
              <li> Labels must be visible when an input gets focus </li>
              <li> Labels must be announced to the screen reader on focus</li>
              <li> Use sentence case</li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Screen reader">
            <ul>
              <li>Reads: "label it is given, popup combobox"</li>
              <li>
                When expanded it reads: "element name, 1 (or respective number), of X ("X"
                representing total number).
              </li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Keyboard">
            <ul>
              <li>
                On textbook
                <ul>
                  <li>
                    <kbd>Down</kbd> arrow
                    <ul>
                      <li> Opens dropdown if nothing is typed in</li>
                      <li> If something is typed in it will put focus on the first suggestion </li>
                    </ul>
                  </li>
                  <li>
                    <kbd>Alt</kbd> + <kbd>down</kbd> arrow
                    <ul>
                      <li> Opens selection list without changing focus</li>
                    </ul>
                  </li>
                  <li>
                    <kbd>Up</kbd> arrow
                    <ul>
                      <li>If field is populated, moves focus to the last selection</li>
                      <li>
                        If nothing is in field, first opens the list of selections then goes to the
                        bottom
                      </li>
                    </ul>
                  </li>
                  <li>
                    <kbd>Enter</kbd>
                    <ul>
                      <li>Selects the suggestion/closes the box </li>
                    </ul>
                  </li>
                  <li>
                    <kbd>Esc </kbd>
                    <ul>
                      <li>loses the box if the suggestion box is expanded </li>
                    </ul>
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
export default ComboboxPage;
