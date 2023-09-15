import { fixture, expect, nextFrame } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosFooter } from './pharos-footer';

describe('pharos-footer', () => {
  let component: PharosFooter;

  beforeEach(async () => {
    component = await fixture(html`
      <pharos-footer>
        <ul slot="links-group">
          <li>
            <pharos-link on-background subtle href="/subjects" target="_blank"
              >By Subject</pharos-link
            >
          </li>
          <li>
            <pharos-link
              on-background
              subtle
              href="/action/showJournals?browseType=title"
              target="_blank"
              >By Title</pharos-link
            >
          </li>
          <li>
            <pharos-link on-background subtle href="/site/collection-list" target="_blank"
              >By Collections</pharos-link
            >
          </li>
          <li>
            <pharos-link on-background subtle href="/publishers" target="_blank"
              >By Publisher</pharos-link
            >
          </li>
          <li>
            <pharos-link on-background subtle href="/action/showAdvancedSearch" target="_blank"
              >Advanced Search</pharos-link
            >
          </li>
          <li>
            <pharos-link on-background subtle href="/dfr" target="_blank"
              >Data for Research</pharos-link
            >
          </li>
        </ul>
        <ul slot="links-group">
          <li>
            <pharos-link
              on-background
              subtle
              href="https://support.jstor.org/hc/en-us/articles/360000313328-Need-Help-Logging-in-To-JSTOR"
              target="_blank"
              >Get Access</pharos-link
            >
          </li>
          <li>
            <pharos-link on-background subtle href="https://support.jstor.org" target="_blank"
              >Support</pharos-link
            >
          </li>
          <li>
            <pharos-link on-background subtle href="https://guides.jstor.org" target="_blank"
              >LibGuides</pharos-link
            >
          </li>
          <li>
            <pharos-link
              on-background
              subtle
              href="https://guides.jstor.org/researchbasics"
              target="_blank"
              >Research Basics</pharos-link
            >
          </li>
        </ul>
        <ul slot="links-group">
          <li>
            <pharos-link on-background subtle href="https://about.jstor.org" target="_blank"
              >About JSTOR</pharos-link
            >
          </li>
          <li>
            <pharos-link
              on-background
              subtle
              href="https://about.jstor.org/mission-history/"
              target="_blank"
              >Mission and History</pharos-link
            >
          </li>
          <li>
            <pharos-link
              on-background
              subtle
              href="https://about.jstor.org/whats-in-jstor/"
              target="_blank"
              >What's in JSTOR</pharos-link
            >
          </li>
          <li>
            <pharos-link
              on-background
              subtle
              href="https://about.jstor.org/get-jstor/"
              target="_blank"
              >Get JSTOR</pharos-link
            >
          </li>
          <li>
            <pharos-link on-background subtle href="https://about.jstor.org/news/" target="_blank"
              >News</pharos-link
            >
          </li>
          <li>
            <pharos-link
              on-background
              subtle
              href="https://about.jstor.org/webinars/"
              target="_blank"
              >Webinars</pharos-link
            >
          </li>
        </ul>
        <ul slot="links-group">
          <li>
            <pharos-link on-background subtle href="https://labs.jstor.org/" target="_blank"
              >JSTOR Labs</pharos-link
            >
          </li>
          <li>
            <pharos-link on-background subtle href="https://daily.jstor.org/" target="_blank"
              >JSTOR Daily</pharos-link
            >
          </li>
          <li>
            <pharos-link on-background subtle href="https://www.ithaka.org/careers/" target="_blank"
              >Careers</pharos-link
            >
          </li>
          <li>
            <pharos-link on-background subtle href="/contact-us/" target="_blank"
              >Contact Us</pharos-link
            >
          </li>
        </ul>
        <ul slot="button-links">
          <li>
            <pharos-button
              variant="secondary"
              on-background
              href="https://about.jstor.org/librarians/"
              target="_blank"
              >For Librarians</pharos-button
            >
          </li>
          <li>
            <pharos-button
              variant="secondary"
              on-background
              href="https://about.jstor.org/publishers/"
              target="_blank"
              >For Publishers</pharos-button
            >
          </li>
        </ul>
        <ul slot="social-links">
          <li>
            <pharos-link
              href="https://twitter.com/JSTOR"
              target="_blank"
              label="twitter - This link opens in a new window"
            >
              <pharos-icon name="twitter"></pharos-icon>
            </pharos-link>
          </li>
          <li>
            <pharos-link
              href="https://www.facebook.com/JSTOR.org"
              target="_blank"
              label="facebook - This link opens in a new window"
            >
              <pharos-icon name="facebook"></pharos-icon>
            </pharos-link>
          </li>
          <li>
            <pharos-link
              href="https://www.instagram.com/jstor_org"
              target="_blank"
              label="instagram - This link opens in a new window"
            >
              <pharos-icon name="instagram"></pharos-icon>
            </pharos-link>
          </li>
          <li>
            <pharos-link
              href="https://www.youtube.com/channel/UCQM-7sUBV6Z-PVas0S4k0lw"
              target="_blank"
              label="youtube - This link opens in a new window"
            >
              <pharos-icon name="youtube"></pharos-icon>
            </pharos-link>
          </li>
          <li>
            <pharos-link
              href="https://www.linkedin.com/company/ithaka"
              target="_blank"
              label="linkedin - This link opens in a new window"
            >
              <pharos-icon name="linkedin"></pharos-icon>
            </pharos-link>
          </li>
          <li>
            <pharos-link
              href="https://jstor.tumblr.com"
              target="_blank"
              label="tumblr - This link opens in a new window"
            >
              <pharos-icon name="tumblr"></pharos-icon>
            </pharos-link>
          </li>
        </ul>
        <span slot="mission-statement"
          >JSTOR is part of
          <pharos-link on-background href="https://www.ithaka.org">ITHAKA</pharos-link>, a
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
            <pharos-link on-background subtle href="https://about.jstor.org/terms" target="_blank"
              >Terms & Conditions of Use</pharos-link
            >
          </li>
          <li>
            <pharos-link
              on-background
              subtle
              href="https://www.ithaka.org/privacypolicy"
              target="_blank"
              >Privacy Policy</pharos-link
            >
          </li>
          <li>
            <pharos-link on-background subtle href="https://www.ithaka.org/cookies" target="_blank"
              >Cookie Policy</pharos-link
            >
          </li>
          <li>
            <pharos-link
              on-background
              subtle
              href="https://about.jstor.org/accessibility"
              target="_blank"
              >Accessibility</pharos-link
            >
          </li>
        </ul>
        <div slot="google-widget" id="google_translate_element" aria-hidden="true"></div>
      </pharos-footer>
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

    expect(translateButton.querySelector('pharos-icon[name="google"]')).not.to.be.null;
    expect(translateButton.querySelector('pharos-icon[name="chevron-down"]')).not.to.be.null;
  });
});
