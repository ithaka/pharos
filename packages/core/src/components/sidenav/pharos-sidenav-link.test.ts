import { html, fixture, expect } from '@open-wc/testing';
import './pharos-sidenav-link';
import type { PharosSidenavLink } from './pharos-sidenav-link';

describe('pharos-sidenav-link', () => {
  let component: PharosSidenavLink;

  beforeEach(async () => {
    component = await fixture(html` <pharos-sidenav-link href="#">Link</pharos-sidenav-link> `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('renders an external link icon when the link is external', async () => {
    component.external = true;
    await component.updateComplete;

    const icon = component.renderRoot.querySelector('pharos-icon[name="link-external"]');
    expect(icon).not.to.be.null;
  });
});
