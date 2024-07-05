import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';

<>
  <PageSection
    isHeader
    storyBookType="forms"
    title="Input Group"
    description="Input groups allow users to provide information as part of a form in combination with a button,
      icon, or select element on either side of the text input for extra functionality."
  ></PageSection>
  <PharosHeading level={2}>Examples</PharosHeading>
  ```jsx live
  <PharosInputGroup name="my-input-group">
    <span slot="label">Search</span>
    <PharosButton
      name="search-button"
      icon="search"
      variant="subtle"
      a11yLabel="search"
    ></PharosButton>
  </PharosInputGroup>
  ```{' '}
  <PageSection topMargin title="Usage">
    <p>
      Use an input group when additional functionality is required for a text input, such as a way
      to clear the field or to visually indicate the type of input.
    </p>
  </PageSection>{' '}
  <PageSection title="Best practices">
    <BestPractices
      Do={
        <ul>
          <li>
            Add buttons or a select when you want the user to perform additional actions related to
            their input
          </li>
          <li>Prepend elements if they require interaction first before proceeding to the input</li>
        </ul>
      }
      Dont={
        <ul>
          <li>Don't add more than two elements to an input group</li>
        </ul>
      }
    />
  </PageSection>{' '}
  <PageSection title="Content guidelines">
    <PageSection subSectionLevel={1} title="Labels">
      <ul>
        <li>
          The input label needs to be helpful in telling the user what is expected of them, but they
          do not need to be instructive
        </li>
        <li>Labels are placed above the input text field</li>
        <li>Labels are to be written in sentence case and should only be 1-3 words long</li>
      </ul>
    </PageSection>
    <PageSection subSectionLevel={1} title="Placeholder text">
      <p>
        Placeholder text is shown inside the text input to help users know what information they can
        enter.
      </p>
      <ul>
        <li>Field placeholder text is used for supplementary information</li>
        <li>The text should be written as examples instead of instructions</li>
      </ul>
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
          <PharosLink href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/ensure-compat-rsv.html">
            4.1.2 Name, Role, Value
          </PharosLink>
        </li>
      </ul>
    </PageSection>
    <PageSection subSectionLevel={1} title="Importance">
      Inputs allow the user to complete many different tasks. This can include filling out a form or
      submitting a search
    </PageSection>
    <PageSection subSectionLevel={1} title="Code expectations">
      <p>Via W3 there are 3 ways to approach input groups:</p>
      <ul>
        <li>
          Visual label:
          <ul>
            <li>
              <code>&lt;label for="fieldname"&gt;Field name:&lt;/label&gt;</code>
            </li>
            <li>
              <code>&lt;input type="text" id="fieldname" autocomplete="fieldname"&gt;</code>
              <ul>
                <li>
                  Matching <code>for</code> and <code>id</code> names associate the label with its
                  form control
                </li>
                <li>
                  Form control can only have one associated <code>&lt;label&gt;</code>
                </li>
                <li>
                  This allows user to click the label and focus will be put into the field, ensuring
                  that the label is associated with the input
                </li>
              </ul>
            </li>
            <li>
              We can also use an aria-label on the input to give the user more information about the
              field
            </li>
          </ul>
        </li>
        <p>
          The next two methods should ONLY be used when purpose can be determined with no visual
          label (such as a "Search" button next to the input).
        </p>
        <li>
          Visually hidden label:
          <ul>
            <li>
              <code>
                &lt;label for="fieldname" class="visuallyhidden"&gt;Field name:&lt;/label&gt;
              </code>
            </li>
            <li>
              <code>&lt;input type="text" name="fieldname" id="fieldname"&gt;</code>
            </li>
            <li>
              <code>&lt;button type="submit"&gt;Button Name&lt;/button&gt;</code>
              <ul>
                <li>Allows assistive technology to understand a visually hidden label</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          Aria-label:
          <ul>
            <li>
              <code>&lt;input type="text" name="fieldname" aria-label="Field Name"&gt;</code>
            </li>
            <li>
              <code>&lt;button type="submit"&gt;Button Name&lt;/button&gt;</code>
            </li>
          </ul>
        </li>
      </ul>
    </PageSection>
    <PageSection subSectionLevel={1} title="Expected actions">
      <PageSection subSectionLevel={2} title="Screen reader">
        <ul>
          <li>
            Reads: "Field name, edit text"
            <ul>
              <li>If autocomplete is enabled: "Field name, edit text with autofill menu"</li>
              <li>Aria label example: "designated aria-label, edit text"</li>
            </ul>
          </li>
        </ul>
      </PageSection>
      <PageSection subSectionLevel={2} title="Keyboard">
        <ul>
          <li>
            <kbd>Enter</kbd> submits the input
          </li>
          <li>
            Input (and applicable controls such as a button) should be included in the logical tab
            order
          </li>
        </ul>
      </PageSection>
    </PageSection>
  </PageSection>
</>;
