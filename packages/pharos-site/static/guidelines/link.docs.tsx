import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC } from 'react';
import { PharosHeading, PharosLink } from '@ithaka/pharos/lib/react-components';
import Canvas from '../../src/components/Canvas';

const LinkPage: FC = () => {
  return (
    <>
      <PageSection
        isHeader
        storyBookType="components"
        title="Link"
        description="Links enable users to navigate to a different place or to additional information."
      >
        <PharosLink href="#">I am a link</PharosLink>
      </PageSection>
      <PageSection topMargin title="Usage">
        Use links to allow users to navigate to another page within the application, navigate to a
        different site or jump to an element on the current page. Links within paragraphs or other
        bodies of text should only link the text that describes where users would go when they click
        the link. Links that aren't in full sentences should be a noun or start with a verb followed
        by a noun. They should not be punctuated, except if they end with a question mark.
      </PageSection>{' '}
      <PageSection topMargin title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>Give links text that clearly describes their destination or purpose.</li>
              <li>For consistency, use the same text for links that navigate to the same place.</li>
            </ul>
          }
          Dont={
            <ul>
              <li>
                Use links for actions, such as "Close", "Cancel", or "Save". These patterns are best
                suited for buttons in most cases.
              </li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
        <PageSection subSectionLevel={1} title="Text">
          Try to keep link text short and concise. It should accurately describe what the user can
          expect when they click the link. Use meaningful text and avoid terms such as "click here"
          or the URL itself.
        </PageSection>
        <PageSection subSectionLevel={1} title="Screen reader text">
          When needed, use an aria-label to further clarify the purpose of the link when navigating
          on the current page.
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Variants">
        <PageSection subSectionLevel={1} title="Primary">
          <p>These appear with an underline and should be used in most cases.</p>
          <Canvas>
            <PharosLink href="#">I am a link</PharosLink>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Subtle">
          <p>
            These appear without an underline and are best to use in areas lower in your
            application's hierarchy such as a footer.
          </p>
          <Canvas>
            <PharosLink href="#" subtle>
              I am subtle
            </PharosLink>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="On background">
          <p>
            Use the On Background variant when a link needs to be placed over a AAA compliant,
            colored background.
          </p>
          <Canvas>
            <div style={{ backgroundColor: 'black', padding: '1rem' }}>
              <PharosLink href="#" isOnBackground>
                On a background
              </PharosLink>
            </div>
          </Canvas>
        </PageSection>
      </PageSection>
      <PageSection title="Accessibility">
        <PageSection subSectionLevel={1} title="Relevant WCAG guidelines">
          <ul>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html">
                1.3.1 Info and Relationships
              </PharosLink>
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Importance">
          <p>
            Links allow users to go to different areas of the site or interact with different
            elements.
          </p>
        </PageSection>
        <PageSection subSectionLevel={1} title="Visual expectations">
          <p>Link styling should allow users to see that they are interactive.</p>
          <ul>
            <li>
              - Ex. Underline or some other styling that would allow them to stand out in a
              paragraph
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Code expectations">
          <ul>
            <li>
              Links should be clear even without surrounding context. No vague or naming that is not
              unique such as "Click here"
            </li>
            <li>
              <code>&lt;a href=""&gt;</code> tag that includes the link in the ""
            </li>
            <li>
              <code>&lt;title="This link opens in a new window"&gt;</code> (if applicable) should be
              added as well
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Screen reader">
            <p>Reads "Link name, Link", "This link opens in a new window"</p>
            <ul>
              <li> Note: the new window message is only if applicable</li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Keyboard">
            <kbd>Enter</kbd> key: activates the link
          </PageSection>
        </PageSection>
      </PageSection>
    </>
  );
};
export default LinkPage;
