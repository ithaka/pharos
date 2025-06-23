import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC } from 'react';
import { PharosHeading, PharosLink, PharosTextInput } from '@ithaka/pharos/lib/react-components';
import Canvas from '../../src/components/Canvas';

const TextInputPage: FC = () => {
  return (
    <>
      <PageSection
        isHeader
        storyBookType="forms"
        title="Text input"
        description="Text inputs enable users to supply data as part of a form or a query string for search."
      >
        <PharosTextInput>
          <span slot="label">I am an input</span>
        </PharosTextInput>
      </PageSection>
      <PageSection topMargin title="Usage">
        <p>
          Inputs are used for forms or inputting data to get a result, so the design and
          implementation should be as concise as possible. Carefully consider the need for each text
          input and what value the data will provide.
        </p>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>Labels should clearly indicate what kind of input is expected from the user</li>
              <li>
                Labels should describe the purpose of the form control and must be used for all text
                inputs
              </li>
              <li>
                Placeholder text should be concise, and demonstrate the expected type of data,
                rather than an explanatory message
              </li>
            </ul>
          }
          Dont={
            <ul>
              <li>Don't use when users are choosing from a set of options</li>
              <li>Don't use placeholder text as a replacement for labels</li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
        <PageSection subSectionLevel={1} title="Labels">
          <ul>
            <li>
              The input label needs to help the user understand what is expected of them, but it
              doesn't need to be instructive
            </li>
            <li>Labels are placed above the input text field</li>
            <li>Labels are to be written in sentence case and should only be 1-3 words long</li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Placeholder text">
          <p>
            Placeholder text is shown inside the text input to help users know what information they
            can enter.
          </p>
          <ul>
            <li>Field placeholder text is used for supplementary information</li>
            <li>The text should be written as examples instead of instructions</li>
          </ul>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Variants">
        <PageSection subSectionLevel={1} title="Text">
          <p>
            The text variant is a single-line text field for generic text, used when there isn't a
            more specific input type available for collecting a value.
          </p>
          <Canvas>
            <PharosTextInput type="text" placeholder="text"></PharosTextInput>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Password">
          <p>
            A password input is a single-line text field whose value is obscured, used when you need
            to protect the user's content from being read.
          </p>
          <Canvas>
            <PharosTextInput type="password" value="password"></PharosTextInput>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Email">
          <p>
            The email type provides validation to ensure proper formatting of an email address. Use
            the email variant to prompt the user to enter or edit an email address without typos or
            invalid formats.
          </p>
          <Canvas>
            <PharosTextInput type="email" value="name@provider.com"></PharosTextInput>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Search">
          <p>
            A search input allows the user to enter search queries. Line-breaks are automatically
            removed from the input value. They may include a delete or "clear" icon in supporting
            browsers that can be used to clear the field.
          </p>
          <Canvas>
            <PharosTextInput type="search" value="my query"></PharosTextInput>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Number">
          <p>
            The number input provides some functionality used to collect a numerical value. Usually
            a set of up and down buttons are also provided to adjust the value up and down. On some
            devices, it displays a numeric keypad when active.
          </p>
          <Canvas>
            <PharosTextInput type="number" value="1234"></PharosTextInput>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="URL">
          <p>
            The URL input allows users to enter a valid URL. Using this type, you get automatic
            validation that the entered text is in the correct form. This can help avoid cases in
            which the user mistypes the website's address or provides an invalid one.
          </p>
          <Canvas>
            <PharosTextInput type="url" value="https://pharos.jstor.org/"></PharosTextInput>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Tel">
          <p>
            The tel input allows the user to enter or edit a telephone number. It displays a
            telephone keypad in some devices with dynamic keypads. The input value is not
            automatically validated due to the various global formats.
          </p>
          <Canvas>
            <PharosTextInput type="tel" value="9999999999"></PharosTextInput>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Hidden">
          <p>
            A hidden input does not display a value to the user, but is submitted to the server.
            This can be used when you want to include data the user doesn't need to see or edit,
            such as a unique security token.
          </p>
          <Canvas>
            <PharosTextInput type="hidden" value="HiddenValue"></PharosTextInput>
          </Canvas>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="State">
        <PageSection subSectionLevel={1} title="Default">
          <p>Indicates that the user can interact with the text field.</p>
          <Canvas>
            <PharosTextInput>
              <span slot="label">Text input label</span>
            </PharosTextInput>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Disabled">
          <p>Indicates that the user is unable to interact with the text field.</p>
          <Canvas>
            <PharosTextInput disabled>
              <span slot="label">Text input label</span>
            </PharosTextInput>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Required">
          <p>
            Indicates that the user must specify a value for the input before the form can be
            submitted.
          </p>
          <Canvas>
            <PharosTextInput required>
              <span slot="label">Text input label</span>
            </PharosTextInput>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Read-only">
          <p>Indicates that the field cannot be edited by the user.</p>
          <Canvas>
            <PharosTextInput readonly>
              <span slot="label">Text input label</span>
            </PharosTextInput>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Error">
          <p>Indicates that an error occurred with the supplied value in the text field.</p>
          <Canvas>
            <PharosTextInput required invalidated message="This field is required">
              <span slot="label">Text input label</span>
            </PharosTextInput>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Validated">
          <p>Indicates that the input has been validated.</p>
          <Canvas>
            <PharosTextInput required value="I have text" validated>
              <span slot="label">Text input label</span>
            </PharosTextInput>
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
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html">
                1.3.1 Info and Relationships
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions">
                3.3.2 Labels or Instructions A
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html">
                2.4.6 Headings and Labels
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
          Inputs allow the user to complete many different tasks. This can include filling out a
          form or submitting a search
        </PageSection>
        <ul>
          <PharosHeading level={'3'} preset={'2'}>
            Accessibility best practices for labels
          </PharosHeading>
          <li>Labels must be visible when an input gets focus</li>
          <li>Labels must be announced to the screen reader on focus</li>
          <li>Use sentence case</li>
        </ul>
        <PageSection subSectionLevel={1} title="Code expectations">
          <ul>
            <li>
              According to
              <PharosLink href="https://www.w3.org/WAI/tutorials/forms/labels/">W3</PharosLink>,
              there are 3 ways to approach input groups:
            </li>
            <li>
              Visual label:
              <ul>
                <li> &lt;label for="fieldname"&gt; Field Name: &lt;/label&gt; </li>
                <li>
                  &lt;input id="fieldname" type="text" autocomplete="fieldname"&gt;
                  <ul>
                    <li> Matching for and id names associate the label with its form control </li>
                    <li> Form control can only have one associated &lt;label&gt; </li>
                    <li>
                      This allows user to click the label and focus will be put into the field,
                      ensuring that the label is associated with the input
                    </li>
                  </ul>
                </li>
                <li>
                  We can also use an aria-label on the input to give the user more information about
                  the field
                </li>
              </ul>
            </li>
          </ul>
          The next two methods should ONLY be used when purpose can be determined with no visual
          label (such as a "Search" button next to the input).
          <ul>
            <li>
              Visually hidden label:
              <ul>
                <li>
                  {' '}
                  &lt;label for="fieldname" class="visuallyhidden"&gt;Field name:
                  &lt;/label&gt;{' '}
                </li>
                <li> &lt;input type="text" name="fieldname" id="fieldname"&gt; </li>
                <li>
                  &lt;button type="submit"&gt; Button Name &lt;/button&gt;
                  <ul>
                    <li>Allows assistive technology to understand a visually hidden label</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              Aria-label:
              <ul>
                <li> &lt;input type="text" name="fieldname" aira-label="Field Name"&gt; </li>
                <li> &lt;button type="submit"&gt; Button Name &lt;/button&gt; </li>
              </ul>
            </li>
          </ul>
          *NOTE: If the text input is a required field include the <code>aria-required</code>{' '}
          property and indicate that it is a required field. Use the validation message for input
          errors
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Screen reader">
            <ul>
              <li>
                Reads: "Field name, edit text"
                <ul>
                  <li>
                    If autocomplete is enabled: "Field name, edit text with autofill menu, required
                    (if applicable)"
                  </li>
                  <li>
                    Aria label example: "designated aria-label, edit text, required (if applicable)"
                  </li>
                </ul>
              </li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Keyboard">
            <ul>
              <li>
                <kbd>Enter</kbd> key: submits the input
              </li>
              <li>
                Input (and applicable controls such as a button) should be included in the logical
                tab order
              </li>
            </ul>
          </PageSection>
        </PageSection>
      </PageSection>
    </>
  );
};
export default TextInputPage;
