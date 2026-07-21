import { beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import { PharosIcon } from '../icon/pharos-icon';
import type { PharosDropdownMenuItem } from './pharos-dropdown-menu-item';

describe('pharos-dropdown-menu-item', () => {
  let component: PharosDropdownMenuItem;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-dropdown-menu-item>I am an item</test-pharos-dropdown-menu-item>
    `);
  });

  it('is accessible', async () => {
    const parentNode = document.createElement('test-pharos-dropdown-menu');
    component = await fixture(
      html` <test-pharos-dropdown-menu-item>I am an item</test-pharos-dropdown-menu-item> `,
      { parentNode }
    );
    await expect(component).toBeAccessible();
  });

  it('is accessible when disabled', async () => {
    const parentNode = document.createElement('test-pharos-dropdown-menu');
    component = await fixture(
      html`
        <test-pharos-dropdown-menu-item disabled>I am an item</test-pharos-dropdown-menu-item>
      `,
      { parentNode }
    );
    await expect(component).toBeAccessible();
  });

  it('renders as a button by default', async () => {
    const button = component.renderRoot.querySelector(
      '.dropdown-menu-item__button'
    ) as HTMLButtonElement;
    expect(button).not.toBeNull();
  });

  it('renders as a link when the link attribute is set', async () => {
    const href = 'https://www.google.com';
    component.link = href;
    await component.updateComplete;
    const link = component.renderRoot.querySelector(
      '.dropdown-menu-item__link'
    ) as HTMLAnchorElement;
    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe(href);
  });

  it('passes rel attribute from dropdown menu item to anchor tag', async () => {
    const href = 'https://www.google.com';
    component.link = href;
    component.setAttribute('rel', 'noopener');
    await component.updateComplete;
    const link = component.renderRoot.querySelector(
      '.dropdown-menu-item__link'
    ) as HTMLAnchorElement;
    expect(link).not.toBeNull();
    expect(link.getAttribute('rel')).toBe('noopener');
  });

  it('renders an icon when the icon attribute is set', async () => {
    component.icon = 'download';
    await component.updateComplete;
    const icon = component.renderRoot.querySelector('.dropdown-menu-item__icon');
    expect(icon).not.toBeNull();
    expect(icon instanceof PharosIcon).toBe(true);
    expect(icon?.getAttribute('name')).toBe('download');
  });

  it('has a slot to contain a description of the item', async () => {
    component = await fixture(html`
      <test-pharos-dropdown-menu-item>
        I am an item
        <span slot="description">I am a description</span>
      </test-pharos-dropdown-menu-item>
    `);

    const itemDescription = component.renderRoot.querySelector('.dropdown-menu-item__description');
    expect(itemDescription).not.toBeNull();
  });

  it('renders a checkmark when selected and its parent menu has showSelected', async () => {
    const parentNode = document.createElement('test-pharos-dropdown-menu');
    parentNode.showSelected = true;
    component = await fixture(
      html`
        <test-pharos-dropdown-menu-item selected>I am an item</test-pharos-dropdown-menu-item>
      `,
      { parentNode }
    );

    const checkmark = component.renderRoot.querySelector('.dropdown-menu-item__icon--selected');
    expect(checkmark).not.toBeNull();
    expect(checkmark instanceof PharosIcon).toBe(true);
    expect(checkmark?.getAttribute('name')).toBe('checkmark');
  });

  it('renders active state on mousedown', async () => {
    component.dispatchEvent(new MouseEvent('mousedown'));
    await component.updateComplete;
    const activeItem = component.renderRoot.querySelector('.dropdown-menu-item--active');
    expect(activeItem).not.toBeNull();
  });

  it('clears active state on mouseup', async () => {
    component.dispatchEvent(new MouseEvent('mousedown'));
    await component.updateComplete;
    component.dispatchEvent(new MouseEvent('mouseup'));
    await component.updateComplete;
    const activeItem = component.renderRoot.querySelector('.dropdown-menu-item--active');
    expect(activeItem).toBeNull();
  });

  it('cannot be clicked when disabled', async () => {
    const event = new MouseEvent('click');
    const clickSpy = vi.spyOn(event, 'preventDefault');
    component.disabled = true;
    await component.updateComplete;
    component.dispatchEvent(event);
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('does not propagate a click event when disabled with click handler present', async () => {
    const event = new MouseEvent('click');
    component = await fixture(html`
      <test-pharos-dropdown-menu-item disabled @click=${() => alert('clicked')}
        >I am an item</test-pharos-dropdown-menu-item
      >
    `);
    await component.updateComplete;
    const clickSpy = vi.spyOn(event, 'preventDefault');
    const propagationSpy = vi.spyOn(event, 'stopPropagation');
    component.dispatchEvent(event);
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(propagationSpy).toHaveBeenCalledTimes(1);
  });
});
