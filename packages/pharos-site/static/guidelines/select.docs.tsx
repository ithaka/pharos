import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';

<>
  <PageSection
    isHeader
    storyBookType="forms"
    title="Select"
    description="A select allows users to choose one option from a list in a form."
  ></PageSection>
  <PharosHeading level={2}>Examples</PharosHeading>
  ```jsx live
  <PharosSelect>
    <span slot="label">I am a select</span>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </PharosSelect>
  ```{' '}
  <PageSection topMargin title="Usage">
    <p>
      Select inputs allow users to submit data from a list of options. Although the select component
      itself is styled to align with the brand, the options components within it are left to be
      styled by the browser.
    </p>
  </PageSection>{' '}
  <PageSection title="Best practices">
    <p>
      Select is a type of input that is used in forms, where a user is submitting data and chooses
      one option from a list.
    </p>
    <BestPractices
      Do={
        <ul>
          <li>
            Use when you have 6 or more pre-defined, mutually exclusive options for the user to
            choose from (instead of radio buttons)
          </li>
          <li>Have a default selection when possible</li>
          <li>
            Use "Select" as the default placeholder option if there's no logical default option
          </li>
          <li>Labels should be concise</li>
        </ul>
      }
      Dont={
        <ul>
          <li>Don't use a select for navigational needs. A dropdown menu will suffice</li>
          <li>Don't use wordy labels for the options, aim for 1-3 words</li>
        </ul>
      }
    />
  </PageSection>{' '}
  <PageSection title="Content guidelines">
    <PageSection subSectionLevel={1} title="Labels">
      <ul>
        <li>Write labels succinctly so they're no more than 3 words</li>
        <li>Write in sentence case</li>
        <li>Avoid punctuation and articles ("the," "a," "an")</li>
      </ul>
    </PageSection>
    <PageSection subSectionLevel={1} title="Select options">
      <ul>
        <li>Start with "Select" as a placeholder if there isn't a default option</li>
        <li>Options should be related to intended functionality if presenting a list of actions</li>
        <li>List options alphabetically or in a logical order (like frequency of use)</li>
        <li>Write in sentence case</li>
        <li>Avoid punctuation and articles ("the," "a," "an")</li>
      </ul>
    </PageSection>
  </PageSection>{' '}
  <PageSection title="States">
    <PageSection subSectionLevel={1} title="Default">
      <p>Indicates that the user can interact with the select component.</p>
      <Canvas>
        <PharosSelect>
          <span slot="label">Select label</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </PharosSelect>
      </Canvas>
    </PageSection>
    <PageSection subSectionLevel={1} title="Disabled">
      <p>Indicates that the user is unable to interact with the select component.</p>
      <Canvas>
        <PharosSelect disabled>
          <span slot="label">Select label</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </PharosSelect>
      </Canvas>
    </PageSection>
    <PageSection subSectionLevel={1} title="Required">
      <p>Indicates that the select dropdown requires the user to make a selection.</p>
      <Canvas>
        <PharosSelect required>
          <span slot="label">Select label</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </PharosSelect>
      </Canvas>
    </PageSection>
    <PageSection subSectionLevel={1} title="Error">
      <p>Indicates that an error occurred within the select dropdown.</p>
      <Canvas>
        <PharosSelect
          required
          invalidated
          message="This field is required, please make a selection"
        >
          <span slot="label">Select label</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </PharosSelect>
      </Canvas>
    </PageSection>
  </PageSection>{' '}
  <PageSection title="Validation">
    <p>
      Real-time validation helps to streamline the process and keep data clean when the user is
      filling out forms.
    </p>
  </PageSection>
  <PageSection title="Accessibility">
    <PageSection subSectionLevel={1} title="Relevant WCAG Guidelines">
      <ul>
        <li>
          <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html">
            1.3.1 Info and Relationships A
          </PharosLink>
        </li>
        <li>
          <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/keyboard">
            2.1.1 Keyboard
          </PharosLink>
        </li>
      </ul>
    </PageSection>
    <PageSection subSectionLevel={1} title="Importance">
      <ul>
        <li>
          Select allows all users to better understand how form items are related based on their
          grouping
        </li>
      </ul>
    </PageSection>
    <PageSection subSectionLevel={1} title="Visual expectations">
      <ul>
        <li> Select include some indication that they are expandable/interactable</li>
      </ul>
    </PageSection>
    <PageSection subSectionLevel={1} title="Code expectations">
      <ul>
        <li> Select list item has aria-haspopup="true" and aria-expanded="false"</li>
        <li>
          There is another list of &lt;option&gt; elements with the &lt;select&gt; element on its
          child elements
        </li>
        <li> Will have aria-required="true" if applicable </li>
      </ul>
    </PageSection>
    <PageSection subSectionLevel={1} title="Expected actions">
      <PageSection subSectionLevel={2} title="Screen reader">
        <ul>
          <li>Reads "option name, menu popup collapsed, button, required (if applicable)" </li>
        </ul>
      </PageSection>
      <PageSection subSectionLevel={2} title="Keyboard">
        <ul>
          <li>
            <kbd>Enter</kbd>: selects option (which collapses select)
          </li>
          <li>
            <kbd>up</kbd>/<kbd>down</kbd> arrows: moves focus up and down (which expands the select)
          </li>
        </ul>
      </PageSection>
    </PageSection>
  </PageSection>
</>;
