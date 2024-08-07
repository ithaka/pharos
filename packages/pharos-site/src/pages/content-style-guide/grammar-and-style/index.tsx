import PageSection from '../../../components/statics/PageSection';
import BestPractices from '../../../components/statics/BestPractices';
import { PharosLink } from '@ithaka/pharos/lib/react-components';
import { FC } from 'react';

const GrammarAndStylePage: FC = () => {
  return (
    <>
      <PageSection title="Grammar and Style" isHeader>
        <div
          style={{
            marginBottom: 'var(--pharos-spacing-5-x)',
            fontSize: 'var(--pharos-type-scale-6)',
            lineHeight: '2rem',
          }}
        >
          <p>
            This is our house style; for anything not covered here we follow the{' '}
            <PharosLink href="https://www.chicagomanualofstyle.org/home.html" target="_blank">
              Chicago Manual of Style
            </PharosLink>
            .
          </p>
        </div>
      </PageSection>

      <PageSection title="Actions" subSectionLevel={1}>
        <div>
          <p>These are the actions that people take as they use our sites:</p>
          <ul>
            {[
              'They "visit" or "go to" a webpage',
              'They "open" a drop-down menu.',
              'They "select" a subpage, tab, or dropdown menu item.',
              'They "select" a button or link.',
            ].map((string, index) => (
              <li key={index} style={{ listStyle: 'none' }}>
                {string}
              </li>
            ))}
          </ul>
          <p>
            Try device-agnostic words that describe the action, irrespective of the interface. When
            in doubt, use "select." Don't use "navigate" or "navigate to."
          </p>
        </div>
      </PageSection>

      <PageSection title="Acronyms" subSectionLevel={1}>
        <p>
          If there's a chance your reader won't recognize an abbreviation or acronym, spell it out
          the first time you mention it and follow with the acronym in parenthesis. After that, you
          can just use the acronym.
        </p>
        <ul>
          <ul>
            {['First: Single Sign-On (SSO)', 'Second: SSO'].map((string, index) => (
              <li key={index} style={{ listStyle: 'none' }}>
                {string}
              </li>
            ))}
          </ul>
        </ul>
        <p>
          If the acronym is only used once in the copy, consider skipping it altogether and just use
          the full term.
        </p>
      </PageSection>

      <PageSection title="Ampersands" subSectionLevel={1}>
        <p>
          Don't use ampersands unless they're part of an official title (e.g. Register &amp; Read or
          Language &amp; Literature). Instead use "and."
        </p>
      </PageSection>

      <PageSection title="Commas" subSectionLevel={1}>
        <p>
          Use a comma before a conjunction (e.g. "and," "or," and "but") when it joins two
          independent clauses.
        </p>
        <BestPractices
          Do="We believe education is key to the well-being of individuals and society, and we work to make it more effective and affordable."
          Dont="We believe education is key to the well-being of individuals, and society."
        />
      </PageSection>

      <PageSection title="Dates" subSectionLevel={1}>
        <p>
          When specific dates are expressed, cardinal numbers are used (e.g., November 5). Do not
          write "November 5th." Wherever possible, spell out the full month or shorten it to three
          characters (i.e. Nov 5). Where appropriate, represent dates or date ranges numerically as
          YYYY-MM-DD to align with the COUNTER 5 standard (i.e. in reporting and tables).
        </p>
        <BestPractices
          Do="Join us on November 19 for the final session."
          Dont="Sign up for a webinar on 5/11/2020."
        />
      </PageSection>

      <PageSection title="Email addresses" subSectionLevel={1}>
        <p>
          When referencing contact information, ask for an email address. An "email" is the
          correspondence sent to that address.
        </p>
      </PageSection>

      <PageSection title="Exclamation marks" subSectionLevel={1}>
        <p>
          Use exclamation points sparingly and only for positive messages; never use exclamation
          marks in feature announcements, error messages, or alerts. Also, don't use them more than
          once in a message, and never more than one exclamation mark at a time.
        </p>
        <BestPractices
          Do="Thanks for your participation!"
          Dont="Your username/password are wrong!!"
        />
      </PageSection>

      <PageSection title="Ellipses (...)" subSectionLevel={1}>
        <p>
          There are two main uses for ellipses in the product: to show that an action is in progress
          (e.g. "Loading…" "Connecting…" "Uploading…"), and to shorten words when the text gets too
          long (a.k.a. truncation).
        </p>
      </PageSection>

      <PageSection title="Home page" subSectionLevel={1}>
        <p>Two words. Not "homepage."</p>
      </PageSection>

      <PageSection title="Login, log in, log in to" subSectionLevel={1}>
        <p>
          "Log in" is the verb and "login" is the noun. That is, use "log in" when describing the
          action, "login" when describing an account. Also: you "log in to" your JSTOR account, not
          "log into."
        </p>
      </PageSection>

      <PageSection title="Numbers" subSectionLevel={1}>
        <p>
          The numbers zero through nine should be spelled out. Use numerals for all higher numbers
          unless the number is the first word in the sentence. In numbers of more than three digits,
          use a comma after every third digit from right to left (e.g. 1,537,000).
        </p>
      </PageSection>

      <PageSection title="Content on JSTOR" subSectionLevel={1}>
        <p>
          Both when quoting something and when using quotation marks for other reasons (such as an
          article title), punctuation goes within the quotation marks.
        </p>
        <BestPractices
          Do={`"The Open Community Collections initiative is a great opportunity for our organization," said Stephen Brooks.`}
          Dont={`You can download "Proposals Relating to the Education of Youth in Pennsylvania", written by Benjamin Franklin.`}
        />
      </PageSection>

      <PageSection title="Single space after periods" subSectionLevel={1}>
        <p>
          Double spacing after periods is a leftover from writing on typewriters, and it's no longer
          necessary.
        </p>
      </PageSection>

      <PageSection title="Time" subSectionLevel={1}>
        <p>
          We are communicating with users around the world, so always indicate the time zone we're
          referring to (usually ET or EST, but it depends on the area we are targeting). Use
          uppercase "AM" and "PM" with one space after the numerical time.
        </p>
      </PageSection>
    </>
  );
};
export default GrammarAndStylePage;
