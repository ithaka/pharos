import { html, fixture, expect } from '@open-wc/testing';
import '../dropdown-menu/pharos-dropdown-menu';
import '../dropdown-menu/pharos-dropdown-menu-item';
import './pharos-dropdown-menu-nav';
import './pharos-dropdown-menu-nav-link';
import type { PharosDropdownMenuNav } from './pharos-dropdown-menu-nav';
import type { PharosDropdownMenuNavLink } from './pharos-dropdown-menu-nav-link';
import type { PharosDropdownMenu } from '../dropdown-menu/pharos-dropdown-menu';
import type { PharosDropdownMenuItem } from '../dropdown-menu/pharos-dropdown-menu-item';

describe('pharos-dropdown-menu-nav', () => {
  let component: PharosDropdownMenuNav;

  beforeEach(async () => {
    component = await fixture(html`
      <pharos-dropdown-menu-nav>
        <pharos-dropdown-menu-nav-link
          href="#"
          id="smurfs-link"
          data-dropdown-menu-id="smurfs-menu"
          data-dropdown-menu-hover
          >Smurfs</pharos-dropdown-menu-nav-link
        >
        <pharos-dropdown-menu id="smurfs-menu" data-dropdown-menu-hover>
          <pharos-dropdown-menu-item>Papa</pharos-dropdown-menu-item>
          <pharos-dropdown-menu-item>Clumsy</pharos-dropdown-menu-item>
          <pharos-dropdown-menu-item>Smurfette</pharos-dropdown-menu-item>
        </pharos-dropdown-menu>
        <pharos-dropdown-menu-nav-link
          href="#"
          id="tmnt-link"
          data-dropdown-menu-id="tmnt-menu"
          data-dropdown-menu-hover
          >Ninja Turtles</pharos-dropdown-menu-nav-link
        >
        <pharos-dropdown-menu id="tmnt-menu">
          <pharos-dropdown-menu-item>Leonardo</pharos-dropdown-menu-item>
          <pharos-dropdown-menu-item>Donatello</pharos-dropdown-menu-item>
          <pharos-dropdown-menu-item>Raphael</pharos-dropdown-menu-item>
          <pharos-dropdown-menu-item>Michelangelo</pharos-dropdown-menu-item>
          <pharos-dropdown-menu-item>Master Splinter</pharos-dropdown-menu-item>
        </pharos-dropdown-menu>
        <pharos-dropdown-menu-nav-link href="#" id="other-link"
          >Link to Other</pharos-dropdown-menu-nav-link
        >
      </pharos-dropdown-menu-nav>
    `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('closes an open menu when focus moves to another link', async () => {
    const menu = component.querySelector('#smurfs-menu') as PharosDropdownMenu;
    menu.open = true;
    await menu.updateComplete;

    const link = component.querySelector('#tmnt-link') as PharosDropdownMenuNavLink;
    link.dispatchEvent(new Event('focusin'));
    await component.updateComplete;

    expect(menu?.open).to.be.false;
  });

  it('closes an open menu when another link is hovered', async () => {
    const menu = component.querySelector('#smurfs-menu') as PharosDropdownMenu;
    menu.open = true;
    await menu.updateComplete;

    const link = component.querySelector('#tmnt-link') as PharosDropdownMenuNavLink;
    link.dispatchEvent(new Event('mouseenter'));
    await component.updateComplete;

    expect(menu?.open).to.be.false;
  });

  it('closes an open menu when focus moves to an element outside the nav', async () => {
    const menu = component.querySelector('#smurfs-menu') as PharosDropdownMenu;
    menu.open = true;
    await menu.updateComplete;

    const item = menu.querySelector('pharos-dropdown-menu-item') as PharosDropdownMenuItem;
    item.focus();
    await component.updateComplete;

    const button = document.createElement('button');
    document.body.appendChild(button);
    button.focus();
    await component.updateComplete;

    expect(menu?.open).to.be.false;
  });
});
