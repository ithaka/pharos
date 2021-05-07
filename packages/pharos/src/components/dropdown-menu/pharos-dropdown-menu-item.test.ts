import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import type { SinonSpy } from 'sinon';
import './pharos-dropdown-menu';
import './pharos-dropdown-menu-item';
import { PharosIcon } from '../icon/pharos-icon';
import type { PharosDropdownMenuItem } from './pharos-dropdown-menu-item';

describe('pharos-dropdown-menu-item', () => {
  let component: PharosDropdownMenuItem;

  beforeEach(async () => {
    component = await fixture(html`
      <pharos-dropdown-menu-item>I am an item</pharos-dropdown-menu-item>
    `);
  });

  it('is accessible', async () => {
    const parentNode = document.createElement('pharos-dropdown-menu');
    component = await fixture(
      html` <pharos-dropdown-menu-item>I am an item</pharos-dropdown-menu-item> `,
      { parentNode }
    );
    await expect(component).to.be.accessible();
  });

  it('is accessible when disabled', async () => {
    const parentNode = document.createElement('pharos-dropdown-menu');
    component = await fixture(
      html` <pharos-dropdown-menu-item disabled>I am an item</pharos-dropdown-menu-item> `,
      { parentNode }
    );
    await expect(component).to.be.accessible();
  });

  it('renders as a button by default', async () => {
    const button = component.renderRoot.querySelector(
      '.dropdown-menu-item__button'
    ) as HTMLButtonElement;
    expect(button).not.to.be.null;
  });

  it('renders as a link when the link attribute is set', async () => {
    const href = 'https://www.google.com';
    component.link = href;
    await component.updateComplete;
    const link = component.renderRoot.querySelector(
      '.dropdown-menu-item__link'
    ) as HTMLAnchorElement;
    expect(link).not.to.be.null;
    expect(link.getAttribute('href')).to.equal(href);
  });

  it('renders an icon when the icon attribute is set', async () => {
    component.icon = 'download';
    await component.updateComplete;
    const icon = component.renderRoot.querySelector('.dropdown-menu-item__icon');
    expect(icon).not.to.be.null;
    expect(icon instanceof PharosIcon).to.be.true;
    expect(icon?.getAttribute('name')).to.equal('download');
  });

  it('has a slot to contain a description of the item', async () => {
    component = await fixture(html`
      <pharos-dropdown-menu-item>
        I am an item
        <span slot="description">I am a description</span>
      </pharos-dropdown-menu-item>
    `);

    const itemDescription = component.renderRoot.querySelector('.dropdown-menu-item__description');
    expect(itemDescription).not.to.be.null;
  });

  it('renders a checkmark when selected and its parent menu has showSelected', async () => {
    const parentNode = document.createElement('pharos-dropdown-menu');
    parentNode.showSelected = true;
    component = await fixture(
      html` <pharos-dropdown-menu-item selected>I am an item</pharos-dropdown-menu-item> `,
      { parentNode }
    );

    const checkmark = component.renderRoot.querySelector('.dropdown-menu-item__icon--selected');
    expect(checkmark).not.to.be.null;
    expect(checkmark instanceof PharosIcon).to.be.true;
    expect(checkmark?.getAttribute('name')).to.equal('checkmark');
  });

  it('renders active state on mousedown', async () => {
    component.dispatchEvent(new MouseEvent('mousedown'));
    await component.updateComplete;
    const activeItem = component.renderRoot.querySelector('.dropdown-menu-item--active');
    expect(activeItem).to.not.be.null;
  });

  it('clears active state on mouseup', async () => {
    component.dispatchEvent(new MouseEvent('mousedown'));
    await component.updateComplete;
    component.dispatchEvent(new MouseEvent('mouseup'));
    await component.updateComplete;
    const activeItem = component.renderRoot.querySelector('.dropdown-menu-item--active');
    expect(activeItem).to.be.null;
  });

  it('cannot be clicked when disabled', async () => {
    const event = new MouseEvent('click');
    const clickSpy: SinonSpy = sinon.spy(event, 'preventDefault');
    component.disabled = true;
    await component.updateComplete;
    component.dispatchEvent(event);
    expect(clickSpy.callCount).to.equal(1);
  });
});
