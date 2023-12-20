import { fixture, expect, aTimeout } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosToggleButtonGroup } from './pharos-toggle-button-group';
import type { PharosToggleButton } from './pharos-toggle-button';

describe('pharos-toggle-button-group', () => {
  let component: PharosToggleButtonGroup;
  let componentLastButtonSelected: PharosToggleButton;
  let componentWithLabel: PharosToggleButton;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-toggle-button-group>
        <test-pharos-toggle-button id="button-1">Button 1</test-pharos-toggle-button>
        <test-pharos-toggle-button id="button-2">Button 2</test-pharos-toggle-button>
        <test-pharos-toggle-button id="button-3">Button 3</test-pharos-toggle-button>
      </test-pharos-toggle-button-group>
    `);

    componentLastButtonSelected = await fixture(html`
      <test-pharos-toggle-button-group>
        <test-pharos-toggle-button id="button-4">Button 4</test-pharos-toggle-button>
        <test-pharos-toggle-button id="button-5">Button 5</test-pharos-toggle-button>
        <test-pharos-toggle-button id="button-6" selected>Button 6</test-pharos-toggle-button>
      </test-pharos-toggle-button-group>
    `);

    componentWithLabel = await fixture(html`
      <test-pharos-toggle-button-group group-label="New options">
        <test-pharos-toggle-button id="button-7">Button 7</test-pharos-toggle-button>
        <test-pharos-toggle-button id="button-8">Button 8</test-pharos-toggle-button>
        <test-pharos-toggle-button id="button-9" selected>Button 9</test-pharos-toggle-button>
      </test-pharos-toggle-button-group>
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

  it('renders a default aria-label', async () => {
    const toggleButtonGroup = component.renderRoot.querySelector(
      '[role="group"]'
    ) as HTMLDivElement;
    expect(toggleButtonGroup.getAttribute('aria-label')).to.equal('Options');
  });

  it('renders the provided aria-label', async () => {
    const toggleButtonGroup = componentWithLabel.renderRoot.querySelector(
      '[role="group"]'
    ) as HTMLDivElement;
    expect(toggleButtonGroup.getAttribute('aria-label')).to.equal('New options');
  });

  it('has a slot to contain the toggle button elements', async () => {
    const toggleButtonGroup = component.renderRoot.querySelector(
      '[role="group"]'
    ) as HTMLDivElement;
    expect(toggleButtonGroup.children[0]).to.be.an.instanceOf(HTMLSlotElement);
  });

  it('has 3 toggle buttons within the slot', async () => {
    const toggleButtons = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-toggle-button`)
    ) as PharosToggleButton[];

    expect(toggleButtons.length).to.be.eq(3);
  });

  it('selects the first toggle button if no selection is defined', async () => {
    const toggleButtons = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-toggle-button`)
    ) as PharosToggleButton[];

    expect(toggleButtons[0].selected).to.be.true;
    expect(toggleButtons[0].a11yPressed).to.equal('true');
    expect(toggleButtons[1].selected).to.be.false;
    expect(toggleButtons[1].a11yPressed).to.equal('false');
    expect(toggleButtons[2].selected).to.be.false;
    expect(toggleButtons[2].a11yPressed).to.equal('false');
  });

  it('selects the defined toggle button', async () => {
    const toggleButtons = Array.prototype.slice.call(
      componentLastButtonSelected.querySelectorAll(`test-pharos-toggle-button`)
    ) as PharosToggleButton[];

    expect(toggleButtons[0].selected).to.be.false;
    expect(toggleButtons[0].a11yPressed).to.equal('false');
    expect(toggleButtons[1].selected).to.be.false;
    expect(toggleButtons[1].a11yPressed).to.equal('false');
    expect(toggleButtons[2].selected).to.be.true;
    expect(toggleButtons[2].a11yPressed).to.equal('true');
  });

  it('changes the focus right with the right arrow key', async () => {
    const toggleButtons = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-toggle-button`)
    ) as PharosToggleButton[];

    toggleButtons[1].focus();
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Right' }));
    await component.updateComplete;
    await aTimeout(1);

    expect(document.activeElement === toggleButtons[2]).to.be.true;
  });

  it('changes the focus left with the left arrow key', async () => {
    const toggleButtons = Array.prototype.slice.call(
      componentLastButtonSelected.querySelectorAll(`test-pharos-toggle-button`)
    ) as PharosToggleButton[];

    toggleButtons[1].focus();
    componentLastButtonSelected.dispatchEvent(new KeyboardEvent('keydown', { key: 'Left' }));
    await componentLastButtonSelected.updateComplete;
    await aTimeout(1);

    expect(document.activeElement === toggleButtons[0]).to.be.true;
  });

  it('changes the selection with keyboard', async () => {
    const toggleButtons = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-toggle-button`)
    ) as PharosToggleButton[];

    toggleButtons[1].focus();
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Right' }));
    await component.updateComplete;
    await aTimeout(1);
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;
    await aTimeout(1);

    expect(toggleButtons[0].selected).to.be.false;
    expect(toggleButtons[0].a11yPressed).to.equal('false');
    expect(toggleButtons[1].selected).to.be.false;
    expect(toggleButtons[1].a11yPressed).to.equal('false');
    expect(toggleButtons[2].selected).to.be.true;
    expect(toggleButtons[2].a11yPressed).to.equal('true');
  });

  it('wraps focus to the last toggle button when left arrow is hit on the first button', async () => {
    const toggleButtons = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-toggle-button`)
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
      componentLastButtonSelected.querySelectorAll(`test-pharos-toggle-button`)
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
      component.querySelectorAll(`test-pharos-toggle-button`)
    ) as PharosToggleButton[];

    toggleButtons[1].click();
    await component.updateComplete;
    await aTimeout(1);

    expect(toggleButtons[0].selected).to.be.false;
    expect(toggleButtons[0].a11yPressed).to.equal('false');
    expect(toggleButtons[1].selected).to.be.true;
    expect(toggleButtons[1].a11yPressed).to.equal('true');
    expect(toggleButtons[2].selected).to.be.false;
    expect(toggleButtons[2].a11yPressed).to.equal('false');
  });
});
