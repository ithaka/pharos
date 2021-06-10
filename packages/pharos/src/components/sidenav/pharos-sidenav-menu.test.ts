import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './pharos-sidenav-menu';
import './pharos-sidenav-link';
import type { PharosSidenavMenu } from './pharos-sidenav-menu';
import type { PharosSidenavLink } from './pharos-sidenav-link';

describe('pharos-sidenav-menu', () => {
  let component: PharosSidenavMenu;

  beforeEach(async () => {
    component = await fixture(
      html`
        <pharos-sidenav-menu label="Menu">
          <pharos-sidenav-link href="#">Link</pharos-sidenav-link>
          <pharos-sidenav-link href="#">Link 2</pharos-sidenav-link>
        </pharos-sidenav-menu>
      `
    );
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('renders a chevron down icon when not expanded', async () => {
    const icon = component.renderRoot.querySelector('pharos-icon[name="chevron-down"]');
    expect(icon).not.to.be.null;
  });

  it('renders a chevron up icon when expanded', async () => {
    component.expanded = true;
    await component.updateComplete;

    const icon = component.renderRoot.querySelector('pharos-icon[name="chevron-up"]');
    expect(icon).not.to.be.null;
  });

  it('opens the menu when the button is clicked', async () => {
    const button = component.renderRoot.querySelector('#button-element') as HTMLButtonElement;
    button.click();
    await component.updateComplete;

    const openMenu = component.renderRoot.querySelector('.menu__container--show');
    expect(openMenu).not.to.be.null;
  });

  it('sets each slotted sidenav link as a menu item', async () => {
    const allLinks = component.querySelectorAll(
      'pharos-sidenav-link'
    ) as NodeListOf<PharosSidenavLink>;

    allLinks.forEach((link) => {
      expect(link.menuItem).to.be.true;
      expect(link.getAttribute('role')).to.equal('menuitem');
    });
  });

  it('closes when the escape key is pressed and the menu is expanded', async () => {
    component.expanded = true;
    await component.updateComplete;

    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await component.updateComplete;

    expect(component.expanded).to.be.false;
  });
});
