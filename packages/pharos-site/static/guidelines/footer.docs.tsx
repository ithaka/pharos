import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC } from 'react';
import {
  PharosButton,
  PharosFooter,
  PharosIcon,
  PharosLink,
} from '@ithaka/pharos/lib/react-components';

const FooterPage: FC = () => {
  return (
    <>
      <PageSection
        isHeader
        title="Footer"
        description="Footers are used as a container for site navigational elements and disclaimers."
        storyBookType="organisms"
      >
        <PharosFooter>
          <ul slot="links-group">
            <li>
              <PharosLink id="subject-link" isOnBackground subtle href="/subjects" target="_blank">
                By Subject
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="title-link"
                isOnBackground
                subtle
                href="/action/showJournals?browseType=title"
                target="_blank"
              >
                By Title
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="collections-link"
                isOnBackground
                subtle
                href="/site/collection-list"
                target="_blank"
              >
                By Collections
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="publisher-link"
                isOnBackground
                subtle
                href="/publishers"
                target="_blank"
              >
                By Publisher
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="adv-search-link"
                isOnBackground
                subtle
                href="/action/showAdvancedSearch"
                target="_blank"
              >
                Advanced Search
              </PharosLink>
            </li>
            <li>
              <PharosLink id="dfr-link" isOnBackground subtle href="/dfr" target="_blank">
                Data for Research
              </PharosLink>
            </li>
          </ul>
          <ul slot="links-group">
            <li>
              <PharosLink
                id="access-link"
                isOnBackground
                subtle
                href="https://support.jstor.org/hc/en-us/articles/360000313328-Need-Help-Logging-in-To-JSTOR"
                target="_blank"
              >
                Get Access
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="support-link"
                isOnBackground
                subtle
                href="https://support.jstor.org"
                target="_blank"
              >
                Support
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="libguides-link"
                isOnBackground
                subtle
                href="https://guides.jstor.org"
                target="_blank"
              >
                LibGuides
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="research-link"
                isOnBackground
                subtle
                href="https://guides.jstor.org/researchbasics"
                target="_blank"
              >
                Research Basics
              </PharosLink>
            </li>
          </ul>
          <ul slot="links-group">
            <li>
              <PharosLink
                id="about-link"
                isOnBackground
                subtle
                href="https://about.jstor.org"
                target="_blank"
              >
                About JSTOR
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="mission-link"
                isOnBackground
                subtle
                href="https://about.jstor.org/mission-history/"
                target="_blank"
              >
                Mission and History
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="in-jstor-link"
                isOnBackground
                subtle
                href="https://about.jstor.org/whats-in-jstor/"
                target="_blank"
              >
                What's in JSTOR
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="get-jstor-link"
                isOnBackground
                subtle
                href="https://about.jstor.org/get-jstor/"
                target="_blank"
              >
                Get JSTOR
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="news-link"
                isOnBackground
                subtle
                href="https://about.jstor.org/news/"
                target="_blank"
              >
                News
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="webinars-link"
                isOnBackground
                subtle
                href="https://about.jstor.org/webinars/"
                target="_blank"
              >
                Webinars
              </PharosLink>
            </li>
          </ul>
          <ul slot="links-group">
            <li>
              <PharosLink
                id="labs-link"
                isOnBackground
                subtle
                href="https://labs.jstor.org/"
                target="_blank"
              >
                JSTOR Labs
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="daily-link"
                isOnBackground
                subtle
                href="https://daily.jstor.org/"
                target="_blank"
              >
                JSTOR Daily
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="careers-link"
                isOnBackground
                subtle
                href="https://www.ithaka.org/careers/"
                target="_blank"
              >
                Careers
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="contact-link"
                isOnBackground
                subtle
                href="/contact-us/"
                target="_blank"
              >
                Contact Us
              </PharosLink>
            </li>
          </ul>
          <ul slot="button-links">
            <li>
              <PharosButton
                id="for-librarians-link"
                variant="secondary"
                isOnBackground
                href="https://about.jstor.org/librarians/"
                target="_blank"
              >
                For Librarians
              </PharosButton>
            </li>
            <li>
              <PharosButton
                id="for-publishers-link"
                variant="secondary"
                isOnBackground
                href="https://about.jstor.org/publishers/"
                target="_blank"
              >
                For Publishers
              </PharosButton>
            </li>
          </ul>
          <ul slot="social-links">
            <li>
              <PharosLink
                id="twitter-link"
                href="https://twitter.com/JSTOR"
                target="_blank"
                a11yLabel="twitter - This link opens in a new window"
              >
                <PharosIcon name="twitter" a11yHidden="true"></PharosIcon>
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="facebook-link"
                href="https://www.facebook.com/JSTOR.org"
                target="_blank"
                a11yLabel="facebook - This link opens in a new window"
              >
                <PharosIcon name="facebook" a11yHidden="true"></PharosIcon>
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="instagram-link"
                href="https://www.instagram.com/jstor_org"
                target="_blank"
                a11yLabel="instagram - This link opens in a new window"
              >
                <PharosIcon name="instagram" a11yHidden="true"></PharosIcon>
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="youtube-link"
                href="https://www.youtube.com/channel/UCQM-7sUBV6Z-PVas0S4k0lw"
                target="_blank"
                a11yLabel="youtube - This link opens in a new window"
              >
                <PharosIcon name="youtube" a11yHidden="true"></PharosIcon>
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="linkedin-link"
                href="https://www.linkedin.com/company/ithaka"
                target="_blank"
                a11yLabel="linkedin - This link opens in a new window"
              >
                <PharosIcon name="linkedin" a11yHidden="true"></PharosIcon>
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="tumblr-link"
                href="https://jstor.tumblr.com"
                target="_blank"
                a11yLabel="tumblr - This link opens in a new window"
              >
                <PharosIcon name="tumblr" a11yHidden="true"></PharosIcon>
              </PharosLink>
            </li>
          </ul>
          <span id="misson-text" slot="mission-statement">
            JSTOR is part of
            <PharosLink isOnBackground href="https://www.ithaka.org">
              ITHAKA
            </PharosLink>
            , a not-for-profit organization helping the academic community use digital technologies
            to preserve the scholarly record and to advance research and teaching in sustainable
            ways.
          </span>
          <span id="copyright-text" slot="copyright-statement">
            &copy;2000-${new Date().getFullYear()} ITHAKA. All Rights Reserved. JSTOR&reg;, the
            JSTOR logo, JPASS&reg;, Artstor&reg;, Reveal Digital&trade; and ITHAKA&reg; are
            registered trademarks of ITHAKA.
          </span>
          <ul slot="legal-links">
            <li>
              <PharosLink
                id="terms-link"
                isOnBackground
                subtle
                href="https://about.jstor.org/terms"
                target="_blank"
              >
                Terms & Conditions of Use
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="privacy-link"
                isOnBackground
                subtle
                href="https://www.ithaka.org/privacypolicy"
                target="_blank"
              >
                Privacy Policy
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="cookie-link"
                isOnBackground
                subtle
                href="https://www.ithaka.org/cookies"
                target="_blank"
              >
                Cookie Policy
              </PharosLink>
            </li>
            <li>
              <PharosLink
                id="accessibility-link"
                isOnBackground
                subtle
                href="https://about.jstor.org/accessibility"
                target="_blank"
              >
                Accessibility
              </PharosLink>
            </li>
          </ul>
        </PharosFooter>
      </PageSection>
      <PageSection
        topMargin
        title="Usage"
        description="The footer contains links to various pages on the platform and information about copyright data.
      It is not sectioning content and does not introduce a new section in the outline of a page."
      />{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>
                Use On Background, subtle links as these are best suited for navigational elements
                on darker, accessible backgrounds
              </li>
              <li>Ensure grouped links are related in the kinds of pages they link out to</li>
              <li>Use icons with links to social media pages</li>
              <li>Use text approved by Legal for the mission and copyright statements</li>
            </ul>
          }
          Dont={
            <ul>
              <li>Include links to specific content on the platform</li>
            </ul>
          }
        />
      </PageSection>
      <PageSection
        title="Content guidelines"
        description="Footers contain site-wide information, such as copyright information, mission statements, links
      to pages and legal disclaimers."
      >
        <PageSection subSectionLevel={1} title="Relevant WCAG guidelines">
          <ul>
            <li>
              <PharosLink href="https://www.w3.org/WAI/tutorials/page-structure/regions/#page-footer">
                W3 Page Regions
              </PharosLink>
            </li>
            <li>
              Use the semantic <code>&lt;footer&gt;</code> element to create this region
            </li>
            <li>
              <code>&lt;footer&gt;</code> element should have a <code>role="contentinfo"</code>
            </li>
          </ul>
        </PageSection>
      </PageSection>
    </>
  );
};
export default FooterPage;
