import { html, fixture, expect } from '@open-wc/testing';
import './pharos-sidenav-section';
import './pharos-sidenav-link';
import type { PharosSidenavSection } from './pharos-sidenav-section';

describe('pharos-sidenav-section', () => {
  let component: PharosSidenavSection;

  beforeEach(async () => {
    component = await fixture(
      html`
        <pharos-sidenav-section>
          <pharos-sidenav-link href="#">Link</pharos-sidenav-link>
        </pharos-sidenav-section>
      `
    );
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('renders a heading when a label is provided', async () => {
    component.label = 'test';
    await component.updateComplete;

    const heading = component.renderRoot.querySelector('pharos-heading[preset="legend"]');
    expect(heading).not.to.be.null;
  });

  it('renders a divider when showDivider is passed', async () => {
    component.showDivider = true;
    await component.updateComplete;

    const divider = component.renderRoot.querySelector('hr.section__divider');
    expect(divider).not.to.be.null;
  });
});
