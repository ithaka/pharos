import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosHeader } from './pharos-header';

describe('pharos-header', () => {
  let component: PharosHeader;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-header>
        <test-pharos-link slot="start" href="/" id="jstor-logo">
          <img alt="JSTOR Home" width="65" height="90" />
        </test-pharos-link>
        <div slot="center">
          <test-pharos-dropdown-menu-nav label="main navigation">
            <test-pharos-dropdown-menu-nav-link
              href="/action/showAdvancedSearch"
              id="adv-search-link"
              >Advanced Search</test-pharos-dropdown-menu-nav-link
            >
            <test-pharos-dropdown-menu-nav-category
              id="browse-link"
              data-dropdown-menu-id="browse-menu"
              data-dropdown-menu-hover
              >
                <span slot="category">Browse</span>
              </test-pharos-dropdown-menu-nav-category
            >
            <test-pharos-dropdown-menu id="browse-menu">
              <test-pharos-dropdown-menu-item link="/subjects"
                >by Subject</test-pharos-dropdown-menu-item
              >
              <test-pharos-dropdown-menu-item link="/action/showJournals?browseType=title"
                >by Title</test-pharos-dropdown-menu-item
              >
              <test-pharos-dropdown-menu-item link="/publishers">by Publisher</pharos-dropdown-menu-item>
            </test-pharos-dropdown-menu>
            <test-pharos-dropdown-menu-nav-category
              id="tools-link"
              data-dropdown-menu-id="tools-menu"
              data-dropdown-menu-hover
              >
                <span slot="category">Browse</span>
              </test-pharos-dropdown-menu-nav-category
            >
            <test-pharos-dropdown-menu id="tools-menu">
              <test-pharos-dropdown-menu-item link="/account/workspace"
                >Workspace</test-pharos-dropdown-menu-item
              >
              <test-pharos-dropdown-menu-item link="/analyze"
                >Text Analyzer</test-pharos-dropdown-menu-item
              >
              <test-pharos-dropdown-menu-item link="/understand"
                >The JSTOR Understanding Series</test-pharos-dropdown-menu-item
              >
              <test-pharos-dropdown-menu-item link="/dfr"
                >Data for Research</test-pharos-dropdown-menu-item
              >
            </test-pharos-dropdown-menu>
          </test-pharos-dropdown-menu-nav>
        </div>
        <div slot="end" style="display: grid; grid-template-rows: 1fr 1fr; row-gap: 1.5rem">
          <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 0.5rem">
            <test-pharos-link href="#" target="_blank">Log In</test-pharos-link>
            <test-pharos-link href="#" target="_blank">Register</test-pharos-link>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 0.5rem">
            <test-pharos-link href="//about.jstor.org" target="_blank">About</test-pharos-link>
            <test-pharos-link href="//support.jstor.org" target="_blank">Support</test-pharos-link>
          </div>
        </div>
      </test-pharos-header>
    `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });
});
