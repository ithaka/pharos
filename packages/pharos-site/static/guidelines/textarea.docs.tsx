import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC } from 'react';
import Canvas from '../../src/components/Canvas';
import { PharosHeading, PharosTextarea } from '@ithaka/pharos/lib/react-components';

const TextareaPage: FC = () => {
  return (
    <>
      <PageSection
        isHeader
        title="Textarea"
        storyBookType="forms"
        description="A text area allows users to enter long, freeform text that can be on multiple lines."
      ></PageSection>
      <PharosHeading level={2} preset="5">
        Examples
      </PharosHeading>
      {/* ```jsx live
  <PharosTextarea>
    <span slot="label">I am a textarea</span>
  </PharosTextarea>
  ```{' '} */}
      <PageSection topMargin title="Usage">
        <p>
          Textarea allows users to enter a sizeable amount of free-form text, like leaving feedback,
          adding a description, creating a note, and more. If an input requires users to write
          longer forms of text, use a textarea instead of a single text-input field.
        </p>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>Labels should clearly indicate input expectations of the user</li>
              <li>Labels should describe purpose and must be used for all textarea inputs</li>
              <li>
                Placeholder text should be a word or short phrase that demonstrates the expected
                type of data, rather than an explanatory message
              </li>
            </ul>
          }
          Dont={
            <ul>
              <li>Don't use placeholder text as a replacement for labels</li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
        <PageSection subSectionLevel={1} title="Labels">
          <ul>
            <li>The textarea label should help users understand input expectations</li>
            <li>Labels are placed above the textarea</li>
            <li>Labels are to be written in sentence case and should only be 1-3 words long</li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Placeholder text">
          <p>
            Placeholder text is shown inside the textarea to help users know what information they
            can enter.
          </p>
          <ul>
            <li>Field placeholder text is used for supplementary information</li>
            <li>The text should be written as examples instead of instructions</li>
          </ul>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="State">
        <PageSection subSectionLevel={1} title="Default">
          <p>Indicates that the user can interact with the text area.</p>
          <Canvas>
            <PharosTextarea>
              <span slot="label">Textarea label</span>
            </PharosTextarea>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Disabled">
          <p>Indicates that the user is unable to interact with the text area.</p>
          <Canvas>
            <PharosTextarea disabled>
              <span slot="label">Textarea label</span>
            </PharosTextarea>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Required">
          <p>
            Indicates that the user must specify a value for the input before the form can be
            submitted.
          </p>
          <Canvas>
            <PharosTextarea required>
              <span slot="label">Textarea label</span>
            </PharosTextarea>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Read-only">
          <p>Indicates that the field cannot be edited by the user.</p>
          <Canvas>
            <PharosTextarea readonly>
              <span slot="label">Textarea label</span>
            </PharosTextarea>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Error">
          <p>Indicates that an error occurred with the supplied value in the text area.</p>
          <Canvas>
            <PharosTextarea required invalidated message="This field is required">
              <span slot="label">Textarea label</span>
            </PharosTextarea>
          </Canvas>
        </PageSection>
      </PageSection>
      <PageSection title="Accessibility">
        <ul>
          <li>
            Every textarea must have a label. A textarea without a label is ambiguous and not
            accessible
          </li>
          <li>
            In cases where context is sufficient and a label could be hidden, make sure to have the
            design reviewed
          </li>
        </ul>
        <PageSection subSectionLevel={1} title="Accessibility best practices for labels">
          <li>Labels must be visible when an input gets focus</li>
          <li>Labels must be announced to the screen reader on focus</li>
          <li>Use sentence case</li>
          <li>
            If the text input is a required field include the aria-required property and indicate
            that it is a required field and use the validation message for input errors.
          </li>
        </PageSection>
      </PageSection>
    </>
  );
};
export default TextareaPage;
