import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosSidenavSection } from './pharos-sidenav-section';

describe('pharos-sidenav-section', () => {
  let component: PharosSidenavSection;

  beforeEach(async () => {
    component = await fixture(
      html`
        <test-pharos-sidenav-section>
          <test-pharos-sidenav-link href="#">Link</test-pharos-sidenav-link>
        </test-pharos-sidenav-section>
      `
    );
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('renders a heading when a label is provided', async () => {
    component.label = 'test';
    await component.updateComplete;

    const heading = component.renderRoot.querySelector(
      '[data-pharos-component="PharosHeading"][preset="legend"]'
    );
    expect(heading).not.to.be.null;
  });

  it('renders a divider when showDivider is passed', async () => {
    component.showDivider = true;
    await component.updateComplete;

    const divider = component.renderRoot.querySelector('hr.section__divider');
    expect(divider).not.to.be.null;
  });
});
