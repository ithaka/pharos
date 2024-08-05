import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import CodeBlock from '@components/CodeBlock';
import { FC } from 'react';
import { PharosLink, PharosLoadingSpinner } from '@ithaka/pharos/lib/react-components';

const LoadingSpinnerPage: FC = () => {
  return (
    <>
      <PageSection
        isHeader
        storyBookType="components"
        title="Loading Spinner"
        description="Loading spinners indicate that a page, section, or content is loading."
      >
        <div
          style={{
            height: '5rem',
            width: '5rem',
            border: '1px solid black',
            position: 'relative',
          }}
        >
          <PharosLoadingSpinner />
        </div>
      </PageSection>
      <PageSection topMargin title="Usage">
        <p>
          Loading spinners should be placed over pages or their sections that need to load before
          the user can continue with their experience.
        </p>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>
                Use loading spinners to indicate progress when the time remaining can't be
                determined
              </li>
            </ul>
          }
          Dont={
            <ul>
              <li>
                Don't use loading spinners to indicate an action the user took is being processed or
                when the time remaining is known. Use the progress bar instead.
              </li>
            </ul>
          }
        />
      </PageSection>
      <PageSection title="Accessibility">
        <PageSection title="Relevant WCAG guidelines" subSectionLevel={1} lessMargin>
          <ul>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html">
                4.1.3 Status Messages
              </PharosLink>
            </li>
          </ul>
        </PageSection>
        <PageSection title="Importance" subSectionLevel={1} lessMargin>
          Loading spinners visually (and audibly) inform the user that something is in the process
          of loading
        </PageSection>
        <PageSection title="Code expectations" subSectionLevel={1} lessMargin>
          <ul>
            <li>Role = "alert"</li>
            <li>
              Add an aria-live = "assertive" to the loading <code>&lt;div&gt;</code> element
            </li>
            <li>
              Add a visually hidden <code>&lt;p&gt;</code> tag that has a message for assistive
              technology within that div
              <ul>
                <li>Ex. "content is loading"</li>
              </ul>
            </li>
            <li>
              Add visually hidden text, triggered by Javascript to announce when content has loaded
              <ul>
                <li>Ex. "content has loaded"</li>
              </ul>
            </li>
            <li>
              <PharosLink href="https://codepen.io/stuartjnelson/pen/xWyLGR" target="_blank">
                Example to reference
              </PharosLink>
              : (Side note that styling in example can be changed. The example is provided to
              demonstrate the screen reader interaction)
            </li>
          </ul>
          <CodeBlock
            language="html"
            code={`
            <div
              id="loading-spinner"
              className="loading-spinner js-loading-spinner"
              role="alert"
              aria-live="assertive"
            >
              <p className="vh js-loading-spinner-copy">Content is loading...</p>
            </div>
          `}
          />
        </PageSection>
        <PageSection title="Screen reader" subSectionLevel={1} lessMargin>
          <ul>
            <li>When spinner is active - audible message: "Content is loading"</li>
            <li>When content is done loading - audible message: "Content is loaded"</li>
          </ul>
        </PageSection>
        <PageSection title="Keyboard" subSectionLevel={1} lessMargin>
          <ul>
            <li>
              No specific keyboard commands since aria-live announces "assertive" automatically
            </li>
          </ul>
        </PageSection>
      </PageSection>
    </>
  );
};
export default LoadingSpinnerPage;
