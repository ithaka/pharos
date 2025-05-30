import { fixture, expect, aTimeout, elementUpdated } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosDropdownMenu } from './pharos-multiselect-dropdown';

describe('pharos-multiselect-dropdown', () => {
  let component: PharosDropdownMenu;

  const getSimpleDropdown = () => {
    return html`
      <test-pharos-multiselect-dropdown id="my-dropdown">
        <test-pharos-multiselect-dropdown-item>I am an item</test-pharos-multiselect-dropdown-item>
      </test-pharos-multiselect-dropdown>
    `;
  };

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-multiselect-dropdown id="my-dropdown">
        <test-pharos-multiselect-dropdown-item>I am item 1</test-pharos-multiselect-dropdown-item>
        <test-pharos-multiselect-dropdown-item>I am item 2</test-pharos-multiselect-dropdown-item>
        <test-pharos-multiselect-dropdown-item>I am item 3</test-pharos-multiselect-dropdown-item>
      </test-pharos-multiselect-dropdown>
    `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('is accessible when the dropdown is open', async () => {
    component.open = true;
    await component.updateComplete;

    await expect(component).to.be.accessible();
  });

  it('opens when the dropdown button is clicked', async () => {
    // const trigger = document.createElement('button');
    // trigger.setAttribute('id', 'trigger');
    // trigger.setAttribute('data-multiselect-dropharos-multiselect-dropdown-id', 'my-dropdown');
    // document.body.appendChild(trigger);
    // component = await fixture(getSimpleDropdown());
    // trigger.click();
    // await component.updateComplete;
    // expect(component.open).to.be.true;
  });

  it('opens when enter key is pressed on the dropdown button', async () => {
    // const trigger = document.createElement('button');
    // trigger.setAttribute('id', 'trigger');
    // trigger.setAttribute('data-multiselect-dropharos-multiselect-dropdown-id', 'my-dropdown');
    // trigger.setAttribute('data-multiselect-dropharos-multiselect-dropdown-hover', '');
    // document.body.appendChild(trigger);
    // component = await fixture(getSimpleDropdown());
    // trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    // await component.updateComplete;
    // expect(component.open).to.be.true;
  });

  it('opens when space key is pressed on the dropdown button', async () => {
    // const trigger = document.createElement('button');
    // trigger.setAttribute('id', 'trigger');
    // trigger.setAttribute('data-multiselect-dropharos-multiselect-dropdown-id', 'my-dropdown');
    // trigger.setAttribute('data-multiselect-dropharos-multiselect-dropdown-hover', '');
    // document.body.appendChild(trigger);
    // component = await fixture(getSimpleDropdown());
    // trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    // await component.updateComplete;
    // expect(component.open).to.be.true;
  });

  it('remains open when an another non-menu-item element inside is clicked after the dropdown opens', async () => {
    // const trigger = document.createElement('button');
    // trigger.setAttribute('id', 'trigger');
    // trigger.setAttribute('data-multiselect-dropharos-multiselect-dropdown-id', 'my-dropdown');
    // document.body.appendChild(trigger);
    // component = await fixture(getSimpleDropdown());
    // const button = document.createElement('button');
    // component.appendChild(button);
    // await elementUpdated(component);
    // trigger.click();
    // await component.updateComplete;
    // button.click();
    // await component.updateComplete;
    // expect(component.open).to.be.true;
  });

  it('can be opened dynamically', async () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleDropdown());

    await component.openWithTrigger(trigger);

    await component.updateComplete;
    expect(component.open).to.be.true;
  });

  it('fires a custom event pharos-multiselect-dropdown-opened when opened', async () => {
    component = await fixture(getSimpleDropdown());

    let wasFired = false;
    const handleOpened = (): void => {
      wasFired = true;
    };
    component.addEventListener('pharos-multiselect-dropdown-opened', handleOpened);
    component.open = true;
    await component.updateComplete;

    expect(wasFired).to.be.true;
  });

  it('fires a custom event pharos-multiselect-dropdown-closed when closed', async () => {
    component = await fixture(getSimpleDropdown());

    let wasFired = false;
    const handleClosed = (): void => {
      wasFired = true;
    };
    component.addEventListener('pharos-multiselect-dropdown-closed', handleClosed);
    component.open = true;
    await component.updateComplete;

    component.open = false;
    await component.updateComplete;
    expect(wasFired).to.be.true;
  });
});
