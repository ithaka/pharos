import { beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosTabs } from './pharos-tabs';
import type { PharosTab } from './pharos-tab';
import type { PharosTabPanel } from './pharos-tab-panel';

describe('pharos-tabs', () => {
  let component: PharosTabs,
    componentLastTabSelected: PharosTabs,
    componentWithNestedTabs: PharosTabs;

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

    componentWithNestedTabs = await fixture(html`
      <test-pharos-tabs>
        <test-pharos-tab id="tab-1" data-panel-id="panel-1">Tab 1</test-pharos-tab>
        <test-pharos-tab id="tab-2" data-panel-id="panel-2">
          <test-pharos-tabs>
            <test-pharos-tab id="tab-2-1" data-panel-id="panel-2-1">Nested tab 1</test-pharos-tab>
            <test-pharos-tab id="tab-2-2" data-panel-id="panel-2-2">Nested tab 2</test-pharos-tab>
            <test-pharos-tab-panel id="panel-2-1" slot="panel"
              >Nested panel 1</test-pharos-tab-panel
            >
            <test-pharos-tab-panel id="panel-2-2" slot="panel"
              >Nested panel 2</test-pharos-tab-panel
            >
          </test-pharos-tabs>
        </test-pharos-tab>
        <test-pharos-tab id="tab-3" data-panel-id="panel-3">Tab 3</test-pharos-tab>
        <test-pharos-tab-panel id="panel-1" slot="panel">Panel 1</test-pharos-tab-panel>
        <test-pharos-tab-panel id="panel-2" slot="panel">Panel 2</test-pharos-tab-panel>
        <test-pharos-tab-panel id="panel-3" slot="panel">Panel 3</test-pharos-tab-panel>
      </test-pharos-tabs>
    `);
  });

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('renders a tablist by default', async () => {
    const tablistDiv = component.renderRoot.querySelector('[role="tablist"]') as HTMLDivElement;
    expect(tablistDiv).not.toBeNull();
  });

  it('has a slot to contain the tab elements', async () => {
    const tablist = component.renderRoot.querySelector('[role="tablist"]') as HTMLDivElement;
    expect(tablist.children[0]).toBeInstanceOf(HTMLSlotElement);
  });

  it('has 3 tabs within the slot', async () => {
    const tabs = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    expect(tabs.length).toBe(3);
  });

  it('selects the first tab if no selection is defined', async () => {
    const tabs = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    const panels = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab-panel`)
    ) as PharosTabPanel[];

    expect(tabs[0].selected).toBe(true);
    expect(tabs[1].selected).toBe(false);
    expect(tabs[2].selected).toBe(false);

    expect(panels[0].selected).toBe(true);
    expect(panels[1].selected).toBe(false);
    expect(panels[2].selected).toBe(false);
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

    expect(tabs[0].selected).toBe(false);
    expect(tabs[1].selected).toBe(false);
    expect(tabs[2].selected).toBe(true);

    expect(panels[0].selected).toBe(false);
    expect(panels[1].selected).toBe(false);
    expect(panels[2].selected).toBe(true);
  });

  it('changes the focus right with the right arrow key', async () => {
    const tabs = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    tabs[0].focus();
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Right' }));
    await component.updateComplete;
    await vi.waitFor(() => expect(document.activeElement === tabs[1]).toBe(true));
  });

  it('changes the focus left with the left arrow key', async () => {
    const tabs = Array.prototype.slice.call(
      componentLastTabSelected.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    tabs[2].focus();
    componentLastTabSelected.dispatchEvent(new KeyboardEvent('keydown', { key: 'Left' }));
    await componentLastTabSelected.updateComplete;
    await vi.waitFor(() => expect(document.activeElement === tabs[1]).toBe(true));
  });

  it('changes the selection with keyboard', async () => {
    const tabs = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    tabs[0].focus();
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Right' }));
    await component.updateComplete;
    await vi.waitFor(() => expect(document.activeElement === tabs[1]).toBe(true));
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;

    await vi.waitFor(() => {
      expect(tabs[0].selected).toBe(false);
      expect(tabs[1].selected).toBe(true);
      expect(tabs[2].selected).toBe(false);
    });
  });

  it('wraps focus to the last tab when left arrow is hit on the first tab', async () => {
    const tabs = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    tabs[0].focus();
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Left' }));
    await component.updateComplete;
    await vi.waitFor(() => expect(document.activeElement === tabs[2]).toBe(true));
  });

  it('wraps focus to the first tab when left arrow is hit on the last tab', async () => {
    const tabs = Array.prototype.slice.call(
      componentLastTabSelected.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    tabs[2].focus();
    componentLastTabSelected.dispatchEvent(new KeyboardEvent('keydown', { key: 'Right' }));
    await componentLastTabSelected.updateComplete;
    await vi.waitFor(() => expect(document.activeElement === tabs[0]).toBe(true));
  });

  it('changes the selected tab on click', async () => {
    const tabs = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    tabs[1].click();
    await component.updateComplete;

    await vi.waitFor(() => {
      expect(tabs[0].selected).toBe(false);
      expect(tabs[1].selected).toBe(true);
      expect(tabs[2].selected).toBe(false);
    });
  });

  it('changes only the selected nested tab on click', async () => {
    const topLevelTabs = Array.prototype.slice.call(
      componentWithNestedTabs.querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    const nestedTabs = Array.prototype.slice.call(
      topLevelTabs[1].querySelectorAll(`test-pharos-tab`)
    ) as PharosTab[];

    topLevelTabs[1].click();
    nestedTabs[1].click();
    await component.updateComplete;

    await vi.waitFor(() => {
      expect(topLevelTabs[0].selected).toBe(false);
      expect(topLevelTabs[1].selected).toBe(true);
      expect(topLevelTabs[2].selected).toBe(false);
      expect(nestedTabs[0].selected).toBe(false);
      expect(nestedTabs[1].selected).toBe(true);
    });
  });

  it('shows the first panel by default', async () => {
    const panels = Array.prototype.slice.call(
      component.querySelectorAll(`test-pharos-tab-panel`)
    ) as PharosTabPanel[];

    expect(panels[0].selected).toBe(true);
    expect(panels[1].selected).toBe(false);
    expect(panels[2].selected).toBe(false);
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
    await vi.waitFor(() => expect(document.activeElement === tabs[1]).toBe(true));
    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;

    await vi.waitFor(() => {
      expect(panels[0].selected).toBe(false);
      expect(panels[1].selected).toBe(true);
      expect(panels[2].selected).toBe(false);
    });
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

    await vi.waitFor(() => {
      expect(panels[0].selected).toBe(false);
      expect(panels[1].selected).toBe(true);
      expect(panels[2].selected).toBe(false);
    });
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
    expect(count).toBe(0);
  });

  it('does not render panel separator', async () => {
    const spanElement = component.renderRoot.querySelector('.panel-separator') as HTMLDivElement;

    expect(spanElement).toBeNull();
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

    expect(spanElement).not.toBeNull();
  });

  it('has no bottom padding or margin on the tab-list when compact is set ', async () => {
    component = await fixture(html`
      <test-pharos-tabs compact>
        <test-pharos-tab id="tab-1" data-panel-id="panel-1">Tab 1</test-pharos-tab>
        <test-pharos-tab id="tab-2" data-panel-id="panel-2">Tab 2</test-pharos-tab>
        <test-pharos-tab id="tab-3" data-panel-id="panel-3">Tab 3</test-pharos-tab>
        <test-pharos-tab-panel id="panel-1" slot="panel">Panel 1</test-pharos-tab-panel>
        <test-pharos-tab-panel id="panel-2" slot="panel">Panel 2</test-pharos-tab-panel>
        <test-pharos-tab-panel id="panel-3" slot="panel">Panel 3</test-pharos-tab-panel>
      </test-pharos-tabs>
    `);

    const tabList = component.renderRoot.querySelector('.tab__list') as HTMLDivElement;
    const styles = window.getComputedStyle(tabList);

    expect(styles.marginBottom).toBe('0px');
    expect(styles.paddingBottom).toBe('0px');
  });
});
