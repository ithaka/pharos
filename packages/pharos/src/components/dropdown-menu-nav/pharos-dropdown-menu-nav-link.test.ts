import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosDropdownMenuNavLink } from './pharos-dropdown-menu-nav-link';

describe('pharos-dropdown-menu-nav-link', () => {
  let component: PharosDropdownMenuNavLink;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-dropdown-menu-nav-link
        href="#"
        id="smurfs-link"
        data-dropdown-menu-id="smurfs-menu"
        data-dropdown-menu-hover
        >Smurfs</test-pharos-dropdown-menu-nav-link
      >
    `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });
});
