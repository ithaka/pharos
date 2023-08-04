import { fixture, expect, aTimeout } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosTabs } from './pharos-tabs';
import type { PharosTab } from './pharos-tab';
import type { PharosTabPanel } from './pharos-tab-panel';

describe('pharos-tabs', () => {
  let component: PharosTabs, componentLastTabSelected: PharosTabs;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-tabs>
        <test-pharos-tab id="tab-1" data-panel-id="panel-1">Tab 1</test-pharos-tab>
        <test-pharos-tab id="tab-2" data-panel-id="panel-2">Tab 2</test-pharos-tab>
        <test-pharos-tab id="tab-3" data-panel-id="panel-3">Tab 3</test-pharos-tab>
        <test-pharos-tab-panel id="panel-1" slot="panel">Panel 1</test-pharos-tab-panel>
        <test-pharos-tab-panel id="panel-2" slot="panel">Panel 2</test-pharos-tab-panel>
        <test-pharos-tab-panel id="panel-3" slot="panel">Panel 3</test-pharos-tab-panel>
      </test-pharos-tabs>
    `);

    componentLastTabSelected = await fixture(html`
      <test-pharos-tabs selected-tab="2">
        <test-pharos-tab id="tab-4" data-panel-id="panel-4">Tab 1</test-pharos-tab>
        <test-pharos-tab id="tab-5" data-panel-id="panel-5">Tab 2</test-pharos-tab>
        <test-pharos-tab id="tab-6" data-panel-id="panel-6">Tab 3</test-pharos-tab>
        <test-pharos-tab-panel id="panel-4" slot="panel">Panel 1</test-pharos-tab-panel>
        <test-pharos-tab-panel id="panel-5" slot="panel">Panel 2</test-pharos-tab-panel>
        <test-pharos-tab-panel id="panel-6" slot="panel">Panel 3</test-pharos-tab-panel>
      </test-pharos-tabs>
    `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('renders a tablist by default', async () => {
    const tablistDiv = component.renderRoot.querySelector('[role="tablist"]') as HTMLDivElement;
    expect(tablistDiv).not.to.be.null;
  });

  it('has a slot to contain the tab elements', async () => {
    const tablist = component.renderRoot.querySelector('[role="tablist"]') as HTMLDivElement;
    expect(tablist.children[0]).to.be.a.instanceOf(HTMLSlotElement);
  });

  it('has 3 tabs within the slot', async () => {
    const tabs = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    expect(tabs.length).to.be.eq(3);
  });

  it('selects the first tab if no selection is defined', async () => {
    const tabs = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    const panels = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab-panel`)
    ) as PharosTabPanel[];

    expect(tabs[0].selected).to.be.true;
    expect(tabs[1].selected).to.be.false;
    expect(tabs[2].selected).to.be.false;

    expect(panels[0].selected).to.be.true;
    expect(panels[1].selected).to.be.false;
    expect(panels[2].selected).to.be.false;
  });

  it('selects the defined tab', async () => {
    const tabs = Array.prototype.slice.call(
      componentLastTabSelected.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    const panels = Array.prototype.slice.call(
      componentLastTabSelected.querySelectorAll(`test-pharos-tab-panel`)
    ) as PharosTabPanel[];

    await Promise.all(Array.from(tabs).map((tab) => tab.updateComplete));
    await Promise.all(Array.from(panels).map((panel) => panel.updateComplete));

    expect(tabs[0].selected).to.be.false;
    expect(tabs[1].selected).to.be.false;
    expect(tabs[2].selected).to.be.true;

    expect(panels[0].selected).to.be.false;
    expect(panels[1].selected).to.be.false;
    expect(panels[2].selected).to.be.true;
  });

  it('changes the focus right with the right arrow key', async () => {
    const tabs = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    tabs[0].focus();
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Right' }));
    await component.updateComplete;
    await aTimeout(1);

    expect(document.activeElement === tabs[1]).to.be.true;
  });

  it('changes the focus left with the left arrow key', async () => {
    const tabs = Array.prototype.slice.call(
      componentLastTabSelected.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    tabs[2].focus();
    componentLastTabSelected.dispatchEvent(new KeyboardEvent('keydown', { key: 'Left' }));
    await componentLastTabSelected.updateComplete;
    await aTimeout(1);

    expect(document.activeElement === tabs[1]).to.be.true;
  });

  it('changes the selection with keyboard', async () => {
    const tabs = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    tabs[0].focus();
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Right' }));
    await component.updateComplete;
    await aTimeout(1);
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;
    await aTimeout(1);

    expect(tabs[0].selected).to.be.false;
    expect(tabs[1].selected).to.be.true;
    expect(tabs[2].selected).to.be.false;
  });

  it('wraps focus to the last tab when left arrow is hit on the first tab', async () => {
    const tabs = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    tabs[0].focus();
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Left' }));
    await component.updateComplete;
    await aTimeout(1);

    expect(document.activeElement === tabs[2]).to.be.true;
  });

  it('wraps focus to the first tab when left arrow is hit on the last tab', async () => {
    const tabs = Array.prototype.slice.call(
      componentLastTabSelected.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    tabs[2].focus();
    componentLastTabSelected.dispatchEvent(new KeyboardEvent('keydown', { key: 'Right' }));
    await componentLastTabSelected.updateComplete;
    await aTimeout(1);

    expect(document.activeElement === tabs[0]).to.be.true;
  });

  it('changes the selected tab on click', async () => {
    const tabs = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    tabs[1].click();
    await component.updateComplete;
    await aTimeout(1);

    expect(tabs[0].selected).to.be.false;
    expect(tabs[1].selected).to.be.true;
    expect(tabs[2].selected).to.be.false;
  });

  it('shows the first panel by default', async () => {
    const panels = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab-panel`)
    ) as PharosTabPanel[];

    expect(panels[0].selected).to.be.true;
    expect(panels[1].selected).to.be.false;
    expect(panels[2].selected).to.be.false;
  });

  it('changes the panel with keyboard selection', async () => {
    const tabs = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    const panels = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab-panel`)
    ) as PharosTabPanel[];

    tabs[0].focus();
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Right' }));
    await component.updateComplete;
    await aTimeout(1);
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;
    await aTimeout(1);

    expect(panels[0].selected).to.be.false;
    expect(panels[1].selected).to.be.true;
    expect(panels[2].selected).to.be.false;
  });

  it('changes the visible panel on click', async () => {
    const tabs = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    const panels = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab-panel`)
    ) as PharosTabPanel[];

    tabs[1].click();
    await component.updateComplete;
    await aTimeout(1);

    expect(panels[0].selected).to.be.false;
    expect(panels[1].selected).to.be.true;
    expect(panels[2].selected).to.be.false;
  });

  it('does not receive key events from tab panels', async () => {
    let count = 0;
    const onKeydown = (): void => {
      count++;
    };
    component = await fixture(html`
      <test-pharos-tabs @keydown=${onKeydown}>
        <test-pharos-tab id="tab-1" data-panel-id="panel-1">Tab 1</test-pharos-tab>
        <test-pharos-tab id="tab-2" data-panel-id="panel-2">Tab 2</test-pharos-tab>
        <test-pharos-tab id="tab-3" data-panel-id="panel-3">Tab 3</test-pharos-tab>
        <test-pharos-tab-panel id="panel-1" slot="panel"
          ><input type="text"
        /></test-pharos-tab-panel>
        <test-pharos-tab-panel id="panel-2" slot="panel">Panel 2</test-pharos-tab-panel>
        <test-pharos-tab-panel id="panel-3" slot="panel">Panel 3</test-pharos-tab-panel>
      </test-pharos-tabs>
    `);
    const input = component.querySelector('input') as HTMLInputElement;
    input?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }));
    await component.updateComplete;
    expect(count).to.equal(0);
  });

  it('does not render panel separator', async () => {
    const spanElement = component.renderRoot.querySelector('.panel-separator') as HTMLDivElement;

    expect(spanElement).to.be.null;
  });

  it('renders panel separator', async () => {
    component = await fixture(html`
      <test-pharos-tabs panel-separator>
        <test-pharos-tab id="tab-1" data-panel-id="panel-1">Tab 1</test-pharos-tab>
        <test-pharos-tab id="tab-2" data-panel-id="panel-2">Tab 2</test-pharos-tab>
        <test-pharos-tab id="tab-3" data-panel-id="panel-3">Tab 3</test-pharos-tab>
        <test-pharos-tab-panel id="panel-1" slot="panel">Panel 1</test-pharos-tab-panel>
        <test-pharos-tab-panel id="panel-2" slot="panel">Panel 2</test-pharos-tab-panel>
        <test-pharos-tab-panel id="panel-3" slot="panel">Panel 3</test-pharos-tab-panel>
      </test-pharos-tabs>
    `);

    const spanElement = component.renderRoot.querySelector('.panel-separator') as HTMLDivElement;

    expect(spanElement).not.to.be.null;
  });
});
