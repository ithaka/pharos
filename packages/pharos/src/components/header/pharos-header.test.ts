import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosHeader } from './pharos-header';

describe('pharos-header', () => {
  let component: PharosHeader;

  beforeEach(async () => {
    component = await fixture(html`
      <pharos-header>
        <pharos-link slot="start" href="/" id="jstor-logo">
          <img alt="JSTOR Home" width="65" height="90" />
        </pharos-link>
        <div slot="center">
          <pharos-dropdown-menu-nav label="main navigation">
            <pharos-dropdown-menu-nav-link href="/action/showAdvancedSearch" id="adv-search-link"
              >Advanced Search</pharos-dropdown-menu-nav-link
            >
            <pharos-dropdown-menu-nav-link
              href="/subjects"
              id="browse-link"
              data-dropdown-menu-id="browse-menu"
              data-dropdown-menu-hover
              >Browse</pharos-dropdown-menu-nav-link
            >
            <pharos-dropdown-menu id="browse-menu">
              <pharos-dropdown-menu-item link="/subjects">by Subject</pharos-dropdown-menu-item>
              <pharos-dropdown-menu-item link="/action/showJournals?browseType=title"
                >by Title</pharos-dropdown-menu-item
              >
              <pharos-dropdown-menu-item link="/site/collection-list"
                >by Collections</pharos-dropdown-menu-item
              >
              <pharos-dropdown-menu-item link="/publishers">by Publisher</pharos-dropdown-menu-item>
            </pharos-dropdown-menu>
            <pharos-dropdown-menu-nav-link
              href="/account/workspace"
              id="tools-link"
              data-dropdown-menu-id="tools-menu"
              data-dropdown-menu-hover
              >Tools</pharos-dropdown-menu-nav-link
            >
            <pharos-dropdown-menu id="tools-menu">
              <pharos-dropdown-menu-item link="/account/workspace"
                >Workspace</pharos-dropdown-menu-item
              >
              <pharos-dropdown-menu-item link="/analyze">Text Analyzer</pharos-dropdown-menu-item>
              <pharos-dropdown-menu-item link="/understand"
                >The JSTOR Understanding Series</pharos-dropdown-menu-item
              >
              <pharos-dropdown-menu-item link="/dfr">Data for Research</pharos-dropdown-menu-item>
            </pharos-dropdown-menu>
          </pharos-dropdown-menu-nav>
        </div>
        <div slot="end" style="display: grid; grid-template-rows: 1fr 1fr; row-gap: 1.5rem">
          <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 0.5rem">
            <pharos-link href="#" target="_blank">Log In</pharos-link>
            <pharos-link href="#" target="_blank">Register</pharos-link>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 0.5rem">
            <pharos-link href="//about.jstor.org" target="_blank">About</pharos-link>
            <pharos-link href="//support.jstor.org" target="_blank">Support</pharos-link>
          </div>
        </div>
      </pharos-header>
    `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });
});
