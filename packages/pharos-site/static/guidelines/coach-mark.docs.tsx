import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC } from 'react';
import { PharosCoachMark, PharosHeading, PharosLink } from '@ithaka/pharos/lib/react-components';

const CoachMarkPage: FC = () => {
  return (
    <>
      <PageSection
        title="Coach Mark"
        description="Coach marks highlight new or unique features, direct users in the right direction, or guide users during onboarding."
        isHeader
        storyBookType="components"
      >
        <>
          <div
            style={{
              border: '1px solid #eae8e1',
              padding: '20px',
              margin: '200px auto',
              width: 'fit-content',
            }}
            data-coach-mark="example-coachmark"
          >
            Lorem Ipsum
          </div>
          <PharosCoachMark
            id="example-coachmark"
            hide={false}
            side="bottom"
            alignment="start"
            header="Coach Mark"
            delay="short"
            variant="dark"
          >
            This is an example Coach Mark
          </PharosCoachMark>
        </>
      </PageSection>
      <PageSection
        topMargin
        title="Usage"
        description="Coach marks can appear automatically, after a delay, to focus the user's attention on a single primary action or in response to an action."
      >
        <PageSection title="Examples" subSectionLevel={1}>
          <ul>
            <li>When a user visits a page for the first time</li>
            <li>When a new feature is added</li>
            <li>Inform a user after they activated a process</li>
          </ul>
        </PageSection>
        <PageSection title="Placement" subSectionLevel={1}>
          <p>
            There are 12 placement options available. Coach marks can be placed top, bottom, left or
            right of the target (e.g. button, icon, link, etc.) and the caret (triangle) can be
            placed at the start, center or end of the coach mark.
          </p>
          <p>
            <strong>Where should I place a coach mark? </strong>
          </p>
          <p>
            The coach mark should be in close proximity to the feature that it highlights. There are
            2 preferred placement options out of a total of the available 12. A coachmark should be
            placed either on the top or bottom of a feature with the caret (triangle) appearing in
            the center. The other placement options should only be used so that important features
            or information is not hidden.
          </p>
        </PageSection>
        <PageSection title="Types" subSectionLevel={1}>
          <ol>
            <li>
              Informational: Focuses the attention of the user on a section of the page or process
              taking place.
            </li>
            <li>Instructional: Highlights a feature or action.</li>
          </ol>
        </PageSection>
        <PageSection title="Light vs Dark" subSectionLevel={1}>
          <p>
            The dark coach mark variant is the default state. Most of the backgrounds on JSTOR are
            white and should use the dark coach mark for contrast. Consider using the light coach
            mark variant when the coach mark will appear over dark backgrounds.
          </p>
        </PageSection>
      </PageSection>
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>
                Use coach marks to focus attention to important functionality and feedback in
                context
              </li>
              <li>Display coach marks on a page once per session</li>
              <li>
                Consider a coach mark to promote new features, functionality, or other changes to
                layout and patterns that may disorient the user
              </li>
            </ul>
          }
          Dont={
            <ul>
              <li>
                Do not repetitively display the same coach mark. You should be able to track whether
                the user has dismissed the coach mark and be confident it will not reappear
              </li>
              <li>
                Do not overuse the coach mark and consider where else in the user's journey they may
                be interacting with coach marks within the product
              </li>
              <li>
                Do not add more than one coach mark to a page. If features need explanation consider
                a tool tip or other passive communication devices (badges, external links, etc)
              </li>
            </ul>
          }
        />
      </PageSection>
      <PageSection title="Content guidelines">
        <p>
          The coach mark headline and body copy should be informative, actionable, and concise. It
          should Include the minimum amount of information that users need to know. It should not
          repeat what is already visibly available to the user in the interface. For example, you
          should not use "Workspace" as a headline if the coach mark is targeting a "Workspace"
          navigation link. Rather you would expect something actionable like.. "Find what you
          saved". Content should be written in sentence case. Refer to
          <PharosLink href="https://pharos.jstor.org/content-style-guide/voice-and-tone">
            Voice and Tone guidelines
          </PharosLink>
          for more guidance.
        </p>
      </PageSection>
      <PageSection title="Accessibility">
        <PageSection subSectionLevel={1} title="Relevant WCAG guidelines">
          <ul>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html">
                4.1.3 Status Messages
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html">
                1.3.1 Info and Relationships A
              </PharosLink>
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Code expectations">
          <ul>
            <li>Button contains "aria-haspopup="dialog"</li>
          </ul>
        </PageSection>
      </PageSection>
    </>
  );
};
export default CoachMarkPage;
