import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC } from 'react';
import { PharosHeading, PharosLink, PharosProgressBar } from '@ithaka/pharos/lib/react-components';

const ProgressBarPage: FC = () => {
  return (
    <>
      <PageSection
        isHeader
        title="Progress Bar"
        storyBookType="components"
        description="The progress bar visually represents progress of a particular process. It shows how much of the
      task has been completed and how much is remaining."
      >
        <PharosProgressBar value={75}>
          <div slot="title">A Title</div>
          <div slot="description">Doing something...</div>
        </PharosProgressBar>
      </PageSection>
      <PageSection topMargin title="Usage">
        <p>
          This component can be used to visually represent the completion of a task, such as
          importing or uploading files or when a process time can be calculated and takes longer
          than 10 seconds.
        </p>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>
                Give users an indication of how much of the task has completed and how much is left
              </li>
              <li>Display the file being uploaded to reinforce that action a user is taking</li>
            </ul>
          }
          Dont={
            <ul>
              <li>
                Use a progress bar as a placeholder to indicate page, section or content loading,
                use a skeleton loader or loading spinner instead
              </li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
        <PageSection subSectionLevel={1} title="Progress descriptions">
          <ul>
            <li>
              If the progress bar calls for descriptions, these should be written as short sentence
              fragments
            </li>
            <li>Written in sentence case of the processes</li>
            <li>The copy should be concise and human sounding </li>
            <li>When the process is complete "Done!" should be in the description</li>
            <li>
              Three dots should be present at the end of each statement to help indicate progress
              e.g., "Extracting the headers…"
            </li>
          </ul>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="States">
        <PharosProgressBar value={25}>
          <div slot="title">Title.xls</div>
          <div slot="description">Processing</div>
        </PharosProgressBar>
        <PharosProgressBar value={50}>
          <div slot="title">Title.xls</div>
          <div slot="description">Extracting headers...</div>
        </PharosProgressBar>
        <PharosProgressBar value={75}>
          <div slot="title">Title.xls</div>
          <div slot="description">Mapping your fields...</div>
        </PharosProgressBar>
        <PharosProgressBar value={100}>
          <div slot="title">Title.xls</div>
          <div slot="description">Done!</div>
        </PharosProgressBar>
      </PageSection>{' '}
      <PageSection title="Variants">
        <p>
          The progress bar can be used with the file name and description text of the processes,
          just the filename, or just the progress bar itself. Use the progress bar alone when a
          filename and processes are unknown.
        </p>
        <PageSection subSectionLevel={1} title="File Name only">
          <PharosProgressBar value={100}>
            <div slot="title">Title.xls</div>
          </PharosProgressBar>
        </PageSection>
        <PageSection subSectionLevel={1} title="No Title">
          <PharosProgressBar value={100}></PharosProgressBar>
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
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Importance">
          <p>
            For screen reader users, a progress bar will inform the user how far they are into a
            certain process
          </p>
        </PageSection>
        <PageSection subSectionLevel={1} title="Code expectations">
          Via{' '}
          <PharosLink href="https://dequeuniversity.com/library/aria/progress-bar-bounded">
            Deque
          </PharosLink>
          :
          <ul>
            <li>
              We want to use the HTML &lt;Progress&gt; element. Within this element, there should
              be:
              <ul>
                <li>role="progressbar"</li>
                <li>aria-valuemin="0"</li>
                <li>aria-valuemax="100"</li>
                <li>aria-label="description of what the progress bar is for"</li>
              </ul>
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Screen reader">
            <ul>
              <li>Keep them updated with the status of a process</li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Screenreader specifics">
            <ul>
              <li>Reads: "percent/value that is currently given to progress bar"</li>
              <li>On completion can give an update such as "complete"</li>
            </ul>
            <div style={{ fontWeight: 'bold' }}>Keyboard</div>
            <div>
              The progress bar should be in the tax index so that users can get the information when
              in focus, even if the information is announced automatically.
            </div>
          </PageSection>
        </PageSection>
      </PageSection>
    </>
  );
};
export default ProgressBarPage;
