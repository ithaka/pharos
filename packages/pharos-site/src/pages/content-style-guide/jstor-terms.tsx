import { FC } from 'react';
import PageSection from '../../components/statics/PageSection';
import BestPractices from '../../components/statics/BestPractices';

const JstorTermsPage: FC = () => {
  return (
    <>
      <PageSection
        title="JSTOR terms"
        description="Consistency is key in branding. It helps our users remember our products and services, and it makes our brand easily recognizable across our many channels and touch points."
        isHeader
      ></PageSection>

      <PageSection title="Organization and products" moreTitleSpace>
        <PageSection title="ITHAKA" subSectionLevel={1} lessMargin>
          <p>
            ITHAKA should always be spelled in all capital letters. ITHAKA is described as an
            "organization," not a company. We are a not-for-profit (believe it or not, there is a
            legal difference between a nonprofit and a not-for-profit).
          </p>
        </PageSection>
        <PageSection title="JSTOR" subSectionLevel={1} lessMargin>
          <p>
            Use "library," "platform," or simply "JSTOR" as a proper noun. JSTOR is a digital
            library; a research and teaching platform; a not-for-profit service.
          </p>
          <p>As with a website, you find elements "on" JSTOR. Not "at" or "in."</p>
          <p>
            Don't use jstor.org when you mean JSTOR the service, only use it when you are pointing
            to the page, and always spell the URL in lowercase.
          </p>
        </PageSection>
        <PageSection title="JSTOR Forum" subSectionLevel={1} lessMargin>
          <p>
            Always call it JSTOR Forum on the first mention; you may just call it Forum after that.
          </p>
        </PageSection>
        <PageSection title="Artstor" subSectionLevel={1} lessMargin>
          <p>
            As we prepare for the integration of Artstor into the JSTOR platform, we are no longer
            referring to the Artstor Digital Library (ADL); it is now simply Artstor.
          </p>
          <p>
            Some categories of Artstor include Artstor Public Collections (capitalized since it's a
            proper name), which are freely available collections contributed by institutions using
            JSTOR Forum, and Open Artstor, Creative Commons-licensed collections aggregated from
            museums, libraries and archives.
          </p>
          <p>
            Artstor Image Workspace (AIW) is an internal way to refer to the platform (in
            distinction to the collections); don't use this term externally.
          </p>
        </PageSection>
      </PageSection>

      <PageSection title="Individual access programs">
        <p style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
          We offer a few different individual access programs for independent researchers.
        </p>
        <PageSection title="Free online reading" subSectionLevel={1}>
          <p>
            Free online reading enables any user with a JSTOR account to read a number of articles
            free each month. This access program is often referred to internally as register &amp;
            read.
          </p>
          <BestPractices
            Do="Journals on JSTOR span hundreds of years and more than 50 disciplines."
            Dont="JSTOR's journals span hundreds of years and more than 50 disciplines."
          />
        </PageSection>
        <PageSection title="JPASS" subSectionLevel={1}>
          <p>
            JPASS offers monthly or annual access to 2,000+ journals on JSTOR and the Struggles for
            Freedom: Southern Africa primary sources collection. When referring to the JPASS
            program, say "JPASS" or "JPASS plans." When referencing an individual's JPASS
            subscription, refer to it as their "JPASS plan."
          </p>
          <BestPractices
            Do="We offer an auto-renew option for the JPASS monthly plan."
            Dont="Buy your JPASS now!"
          />
        </PageSection>
        <PageSection title="PSS" subSectionLevel={1}>
          <p>
            Independent researchers can purchase lifetime access to individual articles and issues
            through Publisher Sales Service (PSS). PSS is most frequently used internally.
          </p>
          <BestPractices Do="Purchase article" Dont="Buy this article through PSS." />
        </PageSection>
      </PageSection>

      <PageSection title="Books at JSTOR">
        <p>
          JSTOR offers the following ebook acquisition models: Demand-Driven Acquisition (DDA),
          Evidence-Based Acquisition (EBA), and individual title acquisition (sometimes referred
          internally as Pick 'n' Mix). Our DDA payment models are deposit and pay-as-you-go.
        </p>
        <p>
          Do not abbreviate as "Books @ JSTOR" or "B@J. Use the word "books" when talking about
          high-level descriptions of Books at JSTOR. Use "ebooks" on descriptions and more granular
          explanations.
        </p>
        <BestPractices
          Do={
            <>
              <span>Do you know about our books program?</span>
              <p>We have over 50,000 ebooks in the Books at JSTOR program.</p>
            </>
          }
          Dont="Check out our B@JSTOR program to learn all about our e-Books."
        />
        <PageSection title="Ebook" subSectionLevel={1}>
          <p>
            We use the compound word ebook (except when talking about Books at JSTOR at a higher
            level). When using at the beginning of a sentence and in title case headings, capitalize
            the e.
          </p>
          <BestPractices Do="Ebooks preserved in Portico" Dont="Portico preserves e-Books" />
        </PageSection>
      </PageSection>

      <PageSection title="Other terms" moreTitleSpace>
        <PageSection title="Collections" subSectionLevel={1}>
          <p>
            Capitalize "collection" when it is used in the title of a collection (e.g., "the Arts
            &amp; Sciences I Collection"), but not when it is used more generally to refer to groups
            of titles (e.g., "archival journal collections on JSTOR"). For all Arts &amp; Sciences
            collections, an ampersand (&amp;) should always be used—never the word "and."
          </p>
          <p>
            We refer to Open Community Collections as an initiative, and it's composed of
            collections that are made freely available to everyone. The institutions that provide
            the content are referred to as contributors.
          </p>
        </PageSection>
        <PageSection title="Content on JSTOR" subSectionLevel={1}>
          <p>
            Avoid using the possessive in relation to content on JSTOR. JSTOR does not publish its
            own content, but rather provides a platform for it.
          </p>
          <BestPractices
            Do="Journals on JSTOR span hundreds of years and more than 50 disciplines."
            Dont="JSTOR's journals span hundreds of years and more than 50 disciplines."
          />
        </PageSection>
        <PageSection title="JSTOR Support" subSectionLevel={1}>
          <p>
            We refer to our "Partner and User Services" team as "JSTOR Support" externally. If you
            are directing users to get in touch with our support team, say contact JSTOR Support and
            link the full phrase.
          </p>
        </PageSection>
        <PageSection title="Participant" subSectionLevel={1}>
          <p>
            Institutions that provide access to content on JSTOR are called "participants," not
            customers, clients, etc.
          </p>
          <p>Use "participant" and its variants when referring to an institution.</p>
          <BestPractices
            Do="Participants include small institutions, large universities, and secondary schools."
            Dont="Our clients are anyone from high schools to large institutions."
          />
        </PageSection>
        <PageSection title="User" subSectionLevel={1}>
          <p>Use the term "user" when referring to an individual.</p>
          <BestPractices
            Do="JSTOR offers more than 6,000 Open Access ebooks at no cost to users."
            Dont="JSTOR is offering expanded access to participants through June 31, 2021."
          />
        </PageSection>
        <PageSection title="User accounts" subSectionLevel={1}>
          <p>For the most part, we refer to accounts for which users register as JSTOR accounts.</p>
        </PageSection>
      </PageSection>
    </>
  );
};
export default JstorTermsPage;
