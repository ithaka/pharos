import { fixture, expect, nextFrame } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosFooter } from './pharos-footer';

describe('pharos-footer', () => {
  let component: PharosFooter;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-footer>
        <ul slot="links-group">
          <li>
            <test-pharos-link on-background subtle href="/subjects" target="_blank"
              >By Subject</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link
              on-background
              subtle
              href="/action/showJournals?browseType=title"
              target="_blank"
              >By Title</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link on-background subtle href="/site/collection-list" target="_blank"
              >By Collections</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link on-background subtle href="/publishers" target="_blank"
              >By Publisher</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link on-background subtle href="/action/showAdvancedSearch" target="_blank"
              >Advanced Search</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link on-background subtle href="/dfr" target="_blank"
              >Data for Research</test-pharos-link
            >
          </li>
        </ul>
        <ul slot="links-group">
          <li>
            <test-pharos-link
              on-background
              subtle
              href="https://support.jstor.org/hc/en-us/articles/360000313328-Need-Help-Logging-in-To-JSTOR"
              target="_blank"
              >Get Access</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link on-background subtle href="https://support.jstor.org" target="_blank"
              >Support</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link on-background subtle href="https://guides.jstor.org" target="_blank"
              >LibGuides</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link
              on-background
              subtle
              href="https://guides.jstor.org/researchbasics"
              target="_blank"
              >Research Basics</test-pharos-link
            >
          </li>
        </ul>
        <ul slot="links-group">
          <li>
            <test-pharos-link on-background subtle href="https://about.jstor.org" target="_blank"
              >About JSTOR</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link
              on-background
              subtle
              href="https://about.jstor.org/mission-history/"
              target="_blank"
              >Mission and History</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link
              on-background
              subtle
              href="https://about.jstor.org/whats-in-jstor/"
              target="_blank"
              >What's in JSTOR</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link
              on-background
              subtle
              href="https://about.jstor.org/get-jstor/"
              target="_blank"
              >Get JSTOR</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link
              on-background
              subtle
              href="https://about.jstor.org/news/"
              target="_blank"
              >News</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link
              on-background
              subtle
              href="https://about.jstor.org/webinars/"
              target="_blank"
              >Webinars</test-pharos-link
            >
          </li>
        </ul>
        <ul slot="links-group">
          <li>
            <test-pharos-link on-background subtle href="https://labs.jstor.org/" target="_blank"
              >JSTOR Labs</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link on-background subtle href="https://daily.jstor.org/" target="_blank"
              >JSTOR Daily</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link
              on-background
              subtle
              href="https://www.ithaka.org/careers/"
              target="_blank"
              >Careers</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link on-background subtle href="/contact-us/" target="_blank"
              >Contact Us</test-pharos-link
            >
          </li>
        </ul>
        <ul slot="button-links">
          <li>
            <test-pharos-button
              variant="secondary"
              on-background
              href="https://about.jstor.org/librarians/"
              target="_blank"
              >For Librarians</test-pharos-button
            >
          </li>
          <li>
            <test-pharos-button
              variant="secondary"
              on-background
              href="https://about.jstor.org/publishers/"
              target="_blank"
              >For Publishers</test-pharos-button
            >
          </li>
        </ul>
        <ul slot="social-links">
          <li>
            <test-pharos-link
              href="https://twitter.com/JSTOR"
              target="_blank"
              label="twitter - This link opens in a new window"
            >
              <test-pharos-icon name="twitter"></test-pharos-icon>
            </test-pharos-link>
          </li>
          <li>
            <test-pharos-link
              href="https://www.facebook.com/JSTOR.org"
              target="_blank"
              label="facebook - This link opens in a new window"
            >
              <test-pharos-icon name="facebook"></test-pharos-icon>
            </test-pharos-link>
          </li>
          <li>
            <test-pharos-link
              href="https://www.instagram.com/jstor_org"
              target="_blank"
              label="instagram - This link opens in a new window"
            >
              <test-pharos-icon name="instagram"></test-pharos-icon>
            </test-pharos-link>
          </li>
          <li>
            <test-pharos-link
              href="https://www.youtube.com/channel/UCQM-7sUBV6Z-PVas0S4k0lw"
              target="_blank"
              label="youtube - This link opens in a new window"
            >
              <test-pharos-icon name="youtube"></test-pharos-icon>
            </test-pharos-link>
          </li>
          <li>
            <test-pharos-link
              href="https://www.linkedin.com/company/ithaka"
              target="_blank"
              label="linkedin - This link opens in a new window"
            >
              <test-pharos-icon name="linkedin"></test-pharos-icon>
            </test-pharos-link>
          </li>
          <li>
            <test-pharos-link
              href="https://jstor.tumblr.com"
              target="_blank"
              label="tumblr - This link opens in a new window"
            >
              <test-pharos-icon name="tumblr"></test-pharos-icon>
            </test-pharos-link>
          </li>
        </ul>
        <span slot="mission-statement"
          >JSTOR is part of
          <test-pharos-link on-background href="https://www.ithaka.org">ITHAKA</test-pharos-link>, a
          not-for-profit organization helping the academic community use digital technologies to
          preserve the scholarly record and to advance research and teaching in sustainable
          ways.</span
        >
        <span slot="copyright-statement"
          >&copy;2000-${new Date().getFullYear()} ITHAKA. All Rights Reserved. JSTOR&reg;, the JSTOR
          logo, JPASS&reg;, Artstor&reg;, Reveal Digital&trade; and ITHAKA&reg; are registered
          trademarks of ITHAKA.</span
        >
        <ul slot="legal-links">
          <li>
            <test-pharos-link
              on-background
              subtle
              href="https://about.jstor.org/terms"
              target="_blank"
              >Terms & Conditions of Use</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link
              on-background
              subtle
              href="https://www.ithaka.org/privacypolicy"
              target="_blank"
              >Privacy Policy</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link
              on-background
              subtle
              href="https://www.ithaka.org/cookies"
              target="_blank"
              >Cookie Policy</test-pharos-link
            >
          </li>
          <li>
            <test-pharos-link
              on-background
              subtle
              href="https://about.jstor.org/accessibility"
              target="_blank"
              >Accessibility</test-pharos-link
            >
          </li>
        </ul>
        <div slot="google-widget" id="google_translate_element" aria-hidden="true"></div>
      </test-pharos-footer>
    `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('adds Pharos icons to the Google translate widget when rendered', async () => {
    const widget = component['_widgetNodes'][0] as HTMLDivElement;
    const translateElement = document.createElement('div');
    const translateButton = document.createElement('div');
    const googleIcon = document.createElement('img');

    translateButton.classList.add('goog-te-gadget-simple');
    googleIcon.classList.add('goog-te-gadget-icon');

    translateButton.appendChild(googleIcon);
    translateElement.appendChild(translateButton);
    widget.appendChild(translateElement);

    await component.updateComplete;
    await nextFrame();

    expect(translateButton.querySelector('test-pharos-icon[name="google"]')).not.to.be.null;
    expect(translateButton.querySelector('test-pharos-icon[name="chevron-down"]')).not.to.be.null;
  });
});
