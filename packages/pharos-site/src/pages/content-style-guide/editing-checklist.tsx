import PageSection from '../../components/statics/PageSection';
import pdf from '../../../static/files/content-style-guide/Content_Style_Guide_Editing_checklist.pdf';
import BestPractices from '../../components/statics/BestPractices';
import { PharosButton } from '@ithaka/pharos/lib/react-components';
import { FC } from 'react';

const EditingChecklistPage: FC = () => {
  return (
    <>
      <PageSection
        title="Editing checklist"
        description="Check your writing against these 10 points for clear and concise copy."
        isHeader
      >
        <PharosButton iconLeft="download" href={pdf}>
          Download PDF
        </PharosButton>
      </PageSection>

      <PageSection title="1. Use simple words">
        <p>Short, simple words are preferable to fancy ones.</p>
        <BestPractices
          Do="Use the new Publishers dashboard to monitor downloads."
          Dont="You can now utilize the new Publishers dashboard to monitor download activity."
        />
      </PageSection>

      <PageSection title="2. Main point first">
        <p>
          When you are describing a goal and the action needed to achieve it, start the sentence
          with the goal.
        </p>
        <BestPractices
          Do="To save the item to your Workspace, log in to your account"
          Dont="Log in to your account to save the item to your Workspace"
        />
      </PageSection>

      <PageSection title="3. Be concise">
        <p>It's worth saying again: The way we write is simple and direct.</p>
        <BestPractices Do="Save changes?" Dont="Would you like to save your changes?" />
      </PageSection>

      <PageSection title="4. Be positive">
        <p>Emphasize the action a user can take, not the action they can't.</p>
        <BestPractices
          Do="To sign in, you must be an authorized user."
          Dont="You're not authorized to view this page."
        />
      </PageSection>

      <PageSection title="5. Avoid jargon, idioms, and slang">
        <p>
          Communications need to be understood by users the world over. Even the most common
          expressions in the US aren't always understandable in other countries. "Catch you later"
          for "goodbye" or "no problem" instead of "you're welcome" can lead to confusion. Jargon
          and internal terminology are also to be avoided.
        </p>
        <BestPractices Do="Video is loading" Dont="Buffering…" />
      </PageSection>

      <PageSection title="6. Be consistent">
        <p>
          Use the same wording to refer to the same items and actions; don't talk about the archive
          in one paragraph and switch to database in the next.
        </p>
        <BestPractices
          Do="Click here to download the PDF. If the PDF is large, it may take some time for the download to start."
          Dont="Click here to download the PDF. If the document is large, it may take some time for the file transfer to start."
        />
      </PageSection>

      <PageSection title="7. Stay active">
        <p>
          Avoid passive voice. Use active verbs and direct forms of speech whenever possible. It's
          clearer and sounds more personal. Things aren't done, we do things. It's clearer, and it
          sounds better.
        </p>
        <BestPractices
          Do="We are extending expanded access through December 31."
          Dont="Expanded access has been extended through December 31."
        />
      </PageSection>

      <PageSection title="8. Avoid negative constructions">
        <BestPractices
          Do="Sign up to access the content."
          Dont="You cannot access the content without signing up."
        />
      </PageSection>

      <PageSection title="9. Use contractions">
        <p>Contractions sound more conversational.</p>
        <BestPractices
          Do="Don't hesitate to reach out."
          Dont="Do not hesitate to get in touch with us."
        />
      </PageSection>

      <PageSection title="10. Read it aloud">
        <p>
          If it doesn't sound right, it doesn't read right either. It's also a good way to catch
          typos and errors.
        </p>
      </PageSection>
    </>
  );
};
export default EditingChecklistPage;
