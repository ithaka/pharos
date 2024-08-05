import { FC, Fragment } from 'react';
import PageSection from '../../components/statics/PageSection';
import BestPractices from '../../components/statics/BestPractices';
import { PharosLink } from '@ithaka/pharos/lib/react-components';

const WebElementsPage: FC = () => {
  return (
    <>
      <PageSection
        title="Web elements"
        description="Web elements are the components on a page that users interact with, such as forms, dropdown menus, and error messages, as well as the items that help guide them through the content, like headers and hyperlinks."
        isHeader
      ></PageSection>

      <PageSection title="General">
        <p>
          Perhaps more than any other writing on our sites, web elements call for clarity and
          conciseness. They should help our users complete whatever they are there to do without
          confusing or distracting them.
        </p>
      </PageSection>

      <PageSection title="Alerts" subSectionLevel={1}>
        <p>
          Alerts should be as specific as possible, explaining what the issue is, what actions the
          user can take, and whenever possible, how long we expect the issue will take (such as in
          the case of expected updates or maintenance). Use sentence case and appropriate
          punctuation.
        </p>
      </PageSection>

      <PageSection title="Calls to action (CTAs)" subSectionLevel={1}>
        <p>
          CTAs such as buttons should suggest the action the user would take in the fewest words
          possible. Be clear and concise and write in sentence case.
        </p>
        <BestPractices Do="Cite" Dont="Click here to copy or download citation" />
      </PageSection>

      <PageSection title="Dropdown menus" subSectionLevel={1}>
        <p>
          Keep the content on dropdown menus brief, no longer than three words. When using the term,
          use it as an adjective preceding a word like 'menu'. Use as a noun sparingly.
        </p>
        <BestPractices Do="Open the dropdown menu" Dont="Tap the dropdown" />
      </PageSection>

      <PageSection title="Error messages" subSectionLevel={1}>
        <p>
          Error messages should be specific about what went wrong, then suggest what to do next,
          including a link to the appropriate Support page if available. Don't include error codes
          in the message.
        </p>
        <p>
          If the user made an error, the messaging should provide a reason for the error, a
          recommended next step, and a way to contact us, if needed. If there are multiple errors,
          summarize them in a logical order.
        </p>
        <BestPractices
          Do={
            <Fragment>
              <span>Please correct the following highlighted fields before continuing:</span>
              <ul>
                <li>Username</li>
                <li>Password</li>
                <li>Terms and Conditions</li>
              </ul>
            </Fragment>
          }
          Dont="You left multiple fields below blank. In order to continue, you must fill them in."
        />
        <p>
          If there is a system error or something went wrong on our end, be apologetic, take the
          blame, provide a reason for the alert, and a way to contact us.
        </p>
        <BestPractices
          Do={
            <span>
              Sorry, there was an issue processing your report. Please try again. If the issue
              persists, <PharosLink href="#">contact JSTOR Support</PharosLink>.
            </span>
          }
          Dont="We cannot currently fulfill API requests at this time."
        />
        <p>
          If the error message is a single sentence, don't add a period at the end. If it is more
          than one sentence, punctuate normally.
        </p>
        <BestPractices Do="Password does not meet requirements" />
        <BestPractices
          Do={
            <span>
              Sorry, we couldn't create your folder. Please try again later. If the issue persists,{' '}
              <PharosLink href="#">contact JSTOR Support</PharosLink>.
            </span>
          }
        />
        <p>
          Error messaging should be action oriented. Be as specific as possible when writing field
          validation errors.
        </p>
        <BestPractices Do="Enter an email address" Dont="This field is required." />
      </PageSection>

      <PageSection title="Forms" subSectionLevel={1}>
        <p>
          Form titles should describe the purpose of the form concisely. As with headings and
          subheadings, use sentence case.
        </p>
        <p>
          Labels are written in sentence case, and they should not end in punctuation. Labels are
          concise with no more than three words. Avoid punctuation and articles ("the," "a," "an").
          Choose nouns over verbs.
        </p>
        <BestPractices
          Do={<label style={{}}>Role</label>}
          Dont={<label style={{}}>Choose a role.</label>}
        />
        <p>As with labels, also use sentence case for checkboxes and radio button fields.</p>
      </PageSection>

      <PageSection title="Headings and subheadings" subSectionLevel={1}>
        <p>
          Organize your content with headings and subheadings to identify sections and groupings of
          content and make it easy for readers to scan. Headings are also important for
          accessibility, as they are used to navigate the page.
        </p>
        <p>
          The heading and subheadings should provide a glimpse of the most important aspect of the
          information that follows. Organize them by size (i.e. H1 &gt; H2 &gt; H3) corresponding to
          the content they're covering (main topic &gt; aspect of that topic &gt; finer points).
        </p>
        <p>
          Wherever possible, write headlines in sentence case — studies indicate that sentence case
          is easier to read, plus title case can come across as heavy and overly serious.
        </p>
      </PageSection>

      <PageSection title="Links" subSectionLevel={1}>
        <p>
          Don't use URLs unless there's a compelling reason (such as an easy-to-memorize link like
          jstor.org/open). If you do use an URL, don't include "https://www."
        </p>
        <p>
          Don't use "here" or "on this page" as a link. The link text should accurately describe
          what the user can expect when they click the link. It's good practice for accessibility,
          and it makes for better copy.
        </p>
        <BestPractices
          Do={
            <span>
              Your reports are <PharosLink href="#">available for download</PharosLink>.
            </span>
          }
          Dont={
            <span>
              You can download your report <PharosLink href="#">here</PharosLink>.
            </span>
          }
        />
        <BestPractices Dont="You can download your report at https://www.jstor.org/showLogin?redirect=/librarians." />
      </PageSection>

      <PageSection title="Lists" subSectionLevel={1}>
        <p>
          Lists are easier to scan than blocks of text; use them to present steps, groups, or sets
          of information. Start with a brief introduction to give context.
        </p>
        <p>
          Capitalize the first word of each item, but only use punctuation if any of the list items
          is a complete sentence. Number lists only when the order is important, otherwise use
          bullet points. Make the list items parallel in structure—don't change the subject in the
          list.
        </p>
        <BestPractices
          Do={
            <Fragment>
              <span>How to participate:</span>
              <ol>
                <li>Choose your content</li>
                <li>Find your classification</li>
                <li>Request a quote</li>
                <li>Sign and submit the agreement</li>
              </ol>
            </Fragment>
          }
          Dont={
            <Fragment>
              <span>
                We offer collections of the latest book titles in core disciplines that are highly
                used on JSTOR, as listed below:
              </span>
              <ol>
                <li>History</li>
                <li>Language and Literature</li>
                <li>Political Science</li>
                <li>JSTOR collections provide perpetual access with no recurring fees</li>
              </ol>
            </Fragment>
          }
        />
      </PageSection>

      <PageSection title="Navigation menus" subSectionLevel={1}>
        <p>Menu headings and items should be clear and concise. Use one to three words.</p>
        <BestPractices Do="Browse" Dont="Browse Content on JSTOR" />
        <BestPractices Do="Support" Dont="Visit our Support Site" />
      </PageSection>

      <PageSection title="Placeholder text" subSectionLevel={1}>
        <p>
          In text inputs, placeholder text is shown inside the text input to help users know what
          information they can enter. Field placeholder text is used for supplementary information.
          The text should be written as examples instead of instructions.
        </p>
        <BestPractices Do="Sample University" Dont="Enter the name of your institution" />
        <p>
          For selects (dropdown inputs), without a default option, the placeholder text should start
          with 'Select' and follow with the label text.
        </p>
        <BestPractices Do="Select a role" Dont="Type your role here." />
      </PageSection>

      <PageSection title="Accessibility">
        <p>
          Our job, always, is to help. Keep the user in mind and the particular needs we're
          addressing in each message. Our copy is focused on getting the user to take a specific
          action; help them understand what our product can do for them and how to do it.
        </p>
      </PageSection>

      <PageSection title="Aria-label/writing for assistive technology" subSectionLevel={1}>
        <p>
          Make the visual label and the accessible name the same when possible; otherwise, have the
          visible label text at the beginning of the accessible name.
        </p>
        <p>
          Make labels visible, unique, and descriptive, as having the same label for different items
          makes it difficult for speech software to understand which one the user is requesting.
        </p>
      </PageSection>

      <PageSection title="Alt text" subSectionLevel={1}>
        <p>
          Alt text should describe an image, graph, or chart briefly. While alt text is good for
          search engine optimization (SEO), our main focus is to help those who can't see the images
          on our website.
        </p>
        <p>
          Consider three aspects in the description: object (the main focus), action (what is
          happening), and context (the environment in which you find the object and action).
        </p>
        <p>
          Don't start with "image of…" Avoid describing the gender, age, or race of subjects in
          images, unless it's necessary to understand the content. If the image is just decorative,
          leave the alt tag blank so screen-readers will skip it.
        </p>
        <BestPractices
          Do="Three students looking at a tablet in a library."
          Dont="Image of a young Asian man in a museum"
        />
        <BestPractices Do="Chart representing the 12% growth of journal articles in 2019" />
      </PageSection>

      <PageSection title="Consistent identification" subSectionLevel={1}>
        <p>
          Make interactive elements consistent in identification and functionality. Don't label a
          search button "submit" on one page and "find" on another.
        </p>
      </PageSection>

      <PageSection title="Directional language" subSectionLevel={1}>
        <p>
          Avoid using phrases like "above," "below," "on the right," etc. or describing an element
          by color.
        </p>
        <BestPractices Do="Click Continue" Dont="Click the large red button below" />
      </PageSection>

      <div>
        <p>
          For more on writing accessible content, visit the{' '}
          <PharosLink href="https://www.w3.org/WAI/standards-guidelines/wcag/">
            Web Content Accessibility Guidelines (WCAG)
          </PharosLink>
          .
        </p>
      </div>
    </>
  );
};
export default WebElementsPage;
