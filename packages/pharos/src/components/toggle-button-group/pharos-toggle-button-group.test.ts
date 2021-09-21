import { fixture, expect, aTimeout } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosToggleButtonGroup } from './pharos-toggle-button-group';
import type { PharosToggleButton } from './pharos-toggle-button';

describe('pharos-toggle-button-group', () => {
  let component: PharosToggleButtonGroup, componentLastButtonSelected: PharosToggleButton;

  beforeEach(async () => {
    component = await fixture(html`
      <pharos-toggle-button-group>
        <pharos-toggle-button id="button-1">Button 1</pharos-toggle-button>
        <pharos-toggle-button id="button-2">Button 2</pharos-toggle-button>
        <pharos-toggle-button id="button-3">Button 3</pharos-toggle-button>
      </pharos-toggle-button-group>
    `);

    componentLastButtonSelected = await fixture(html`
      <pharos-toggle-button-group>
        <pharos-toggle-button id="button-4">Button 4</pharos-toggle-button>
        <pharos-toggle-button id="button-5">Button 5</pharos-toggle-button>
        <pharos-toggle-button id="button-6" selected>Button 6</pharos-toggle-button>
      </pharos-toggle-button-group>
    `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('renders a group by default', async () => {
    const toggleButtonGroup = component.renderRoot.querySelector(
      '[role="group"]'
    ) as HTMLDivElement;
    expect(toggleButtonGroup).not.to.be.null;
  });

  it('has a slot to contain the toggle button elements', async () => {
    const toggleButtonGroup = component.renderRoot.querySelector(
      '[role="group"]'
    ) as HTMLDivElement;
    expect(toggleButtonGroup.children[0]).to.be.an.instanceOf(HTMLSlotElement);
  });

  it('has 3 toggle buttons within the slot', async () => {
    const toggleButtons = Array.prototype.slice.call(
      component.querySelectorAll(`pharos-toggle-button`)
    ) as PharosToggleButton[];

    expect(toggleButtons.length).to.be.eq(3);
  });

  it('selects the first toggle button if no selection is defined', async () => {
    const toggleButtons = Array.prototype.slice.call(
      component.querySelectorAll(`pharos-toggle-button`)
    ) as PharosToggleButton[];

    expect(toggleButtons[0].selected).to.be.true;
    expect(toggleButtons[1].selected).to.be.false;
    expect(toggleButtons[2].selected).to.be.false;
  });

  it('selects the defined toggle button', async () => {
    const toggleButtons = Array.prototype.slice.call(
      componentLastButtonSelected.querySelectorAll(`pharos-toggle-button`)
    ) as PharosToggleButton[];

    expect(toggleButtons[0].selected).to.be.false;
    expect(toggleButtons[1].selected).to.be.false;
    expect(toggleButtons[2].selected).to.be.true;
  });

  it('changes the focus right with the right arrow key', async () => {
    const toggleButtons = Array.prototype.slice.call(
      component.querySelectorAll(`pharos-toggle-button`)
    ) as PharosToggleButton[];

    toggleButtons[1].focus();
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Right' }));
    await component.updateComplete;
    await aTimeout(1);

    expect(document.activeElement === toggleButtons[2]).to.be.true;
  });

  it('changes the focus left with the left arrow key', async () => {
    const toggleButtons = Array.prototype.slice.call(
      componentLastButtonSelected.querySelectorAll(`pharos-toggle-button`)
    ) as PharosToggleButton[];

    toggleButtons[1].focus();
    componentLastButtonSelected.dispatchEvent(new KeyboardEvent('keydown', { key: 'Left' }));
    await componentLastButtonSelected.updateComplete;
    await aTimeout(1);

    expect(document.activeElement === toggleButtons[0]).to.be.true;
  });

  it('changes the selection with keyboard', async () => {
    const toggleButtons = Array.prototype.slice.call(
      component.querySelectorAll(`pharos-toggle-button`)
    ) as PharosToggleButton[];

    toggleButtons[1].focus();
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Right' }));
    await component.updateComplete;
    await aTimeout(1);
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;
    await aTimeout(1);

    expect(toggleButtons[0].selected).to.be.false;
    expect(toggleButtons[1].selected).to.be.false;
    expect(toggleButtons[2].selected).to.be.true;
  });

  it('wraps focus to the last toggle button when left arrow is hit on the first button', async () => {
    const toggleButtons = Array.prototype.slice.call(
      component.querySelectorAll(`pharos-toggle-button`)
    ) as PharosToggleButton[];

    toggleButtons[1].focus();
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;
    await aTimeout(1);
    toggleButtons[0].focus();
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Left' }));
    await component.updateComplete;
    await aTimeout(1);

    expect(document.activeElement === toggleButtons[2]).to.be.true;
  });

  it('wraps focus to the first button when left arrow is hit on the last button', async () => {
    const toggleButtons = Array.prototype.slice.call(
      componentLastButtonSelected.querySelectorAll(`pharos-toggle-button`)
    ) as PharosToggleButton[];

    toggleButtons[1].focus();
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;
    await aTimeout(1);
    toggleButtons[2].focus();
    componentLastButtonSelected.dispatchEvent(new KeyboardEvent('keydown', { key: 'Right' }));
    await componentLastButtonSelected.updateComplete;
    await aTimeout(1);

    expect(document.activeElement === toggleButtons[0]).to.be.true;
  });

  it('changes the selected button on click', async () => {
    const toggleButtons = Array.prototype.slice.call(
      component.querySelectorAll(`pharos-toggle-button`)
    ) as PharosToggleButton[];

    toggleButtons[1].click();
    await component.updateComplete;
    await aTimeout(1);

    expect(toggleButtons[0].selected).to.be.false;
    expect(toggleButtons[1].selected).to.be.true;
    expect(toggleButtons[2].selected).to.be.false;
  });
});
