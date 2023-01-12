import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { tabsStyles } from './pharos-tabs.css';

import type { PharosTab } from './pharos-tab';
import type { PharosTabPanel } from './pharos-tab-panel';
import { loopWrapIndex } from '../../utils/math';

const _allTabsSelector = '[data-pharos-component="PharosTab"]';
const _allTabPanelsSelector = '[data-pharos-component="PharosTabPanel"]';

/**
 * Pharos tabs component.
 *
 * @tag pharos-tabs
 *
 * @slot - Contains the tabs.
 * @slot panel - Contains the panel to be shown for a tab.
 *
 * @fires pharos-tabs-tab-selected - Fires when the tab is selected.
 *
 */
export class PharosTabs extends PharosElement {
  /**
   * If should display a panel separator.
   * @attr panel-separator
   */
  @property({ type: Boolean, reflect: true, attribute: 'panel-separator' })
  public panelSeparator = false;

  /**
   * Indicates if the tab is selected-tab.
   * @attr selected-tab
   */
  @property({ type: Number, reflect: true, attribute: 'selected-tab' })
  public selectedTab = 0;

  @query('.tab__list')
  private _tabList!: HTMLElement;

  @state()
  private _overflowingLeft = false;

  @state()
  private _overflowingRight = false;

  @queryAssignedElements({ selector: _allTabsSelector })
  private _tabs!: NodeListOf<PharosTab>;

  public static override get styles(): CSSResultArray {
    return [tabsStyles];
  }

  protected override async firstUpdated(): Promise<void> {
    this.addEventListener('pharos-tab-selected', (e) =>
      this._handleTabSelected(e.target as PharosTab)
    );
    this.addEventListener('keydown', this._handleKeydown);
    this.addEventListener('focusout', this._handleFocusout);

    for (const tab of this._tabs) {
      const panel = this._queryPanelByTab(tab);
      tab.setAttribute('aria-controls', panel?.id || '');
      panel?.setAttribute('aria-labelledby', tab.id);
      await tab.updateComplete;
      await panel?.updateComplete;
    }

    this._selectInitialTab();
    this._watchTablistScrolling();
    this._watchResize();
  }

  protected override async updated(changedProperties: PropertyValues): Promise<void> {
    if (changedProperties.has('selectedTab') && this._tabs[this.selectedTab]) {
      this._handleTabSelected(this._tabs[this.selectedTab]);
    }
  }

  private _tabOverflowObserver!: IntersectionObserver;
  private _tabListResizeObserver!: ResizeObserver;

  private _watchTablistScrolling(): void {
    this._tabOverflowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === this._tabs[0]) {
            this._overflowingLeft = entry.intersectionRatio < 1;
          }

          if (entry.target === this._tabs[this._tabs.length - 1]) {
            this._overflowingRight = entry.intersectionRatio < 1;
          }
        });
      },
      {
        root: this._tabList,
        rootMargin: '1px',
        threshold: 1,
      }
    );
    this._tabOverflowObserver.observe(this._tabs[0]);
    this._tabOverflowObserver.observe(this._tabs[this._tabs.length - 1]);
  }

  private _makeTabVisible(tab: PharosTab) {
    this._tabList.scroll({ left: tab.offsetLeft - 3 * 16, behavior: 'smooth' });
  }

  private _watchResize(): void {
    this._tabListResizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === this._tabList) {
          this._makeTabVisible(this._tabs[this.selectedTab]);
        }
      });
    });
    this._tabListResizeObserver.observe(this._tabList);
  }

  override disconnectedCallback() {
    this._tabOverflowObserver.disconnect();
    this._tabListResizeObserver.disconnect();
    super.disconnectedCallback();
  }

  private _selectInitialTab(): void {
    const selectedTab: PharosTab = this._tabs[this.selectedTab];
    selectedTab.selected = true;
    this._makeTabVisible(selectedTab);

    const selectedPanel: PharosTabPanel | null = this.querySelector(
      `${_allTabPanelsSelector}[id="${selectedTab.getAttribute('aria-controls')}"]`
    );
    if (selectedPanel) {
      selectedPanel.selected = true;
    }
  }

  private _queryPanelByTab(tab: PharosTab): PharosTabPanel | null {
    const panelId: string | undefined = tab.dataset.panelId;

    return this.querySelector(`#${panelId}`);
  }

  private _findTabIndex(tabToFind: PharosTab): number {
    return Array.from(this._tabs).findIndex((tab: PharosTab) => tab.id === tabToFind.id);
  }

  private _handleTabSelected(selectedTab: PharosTab): void {
    const details = {
      bubbles: true,
      composed: true,
      detail: selectedTab,
    };
    this.dispatchEvent(new CustomEvent('pharos-tabs-tab-selected', details));

    this.selectedTab = this._findTabIndex(selectedTab);
    selectedTab.selected = true;
    this._makeTabVisible(selectedTab);

    const previousTab: PharosTab | null = this.querySelector(
      `${_allTabsSelector}[selected]:not([id="${selectedTab.id}"])`
    );

    if (previousTab && previousTab != selectedTab) {
      previousTab.selected = false;
      const previousPanel: PharosTabPanel | null = this.querySelector(
        `${_allTabPanelsSelector}[id="${previousTab.getAttribute('aria-controls')}"]`
      );

      if (previousPanel) {
        previousPanel.selected = false;
      }
    }

    const selectedPanel: PharosTabPanel | null = this.querySelector(
      `${_allTabPanelsSelector}[id="${selectedTab.getAttribute('aria-controls')}"]`
    );
    if (selectedPanel) {
      selectedPanel.selected = true;
    }
  }

  private _handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Right':
      case 'ArrowRight':
        event.preventDefault();
        this._handleArrowKeys(true);
        break;
      case 'Left':
      case 'ArrowLeft':
        event.preventDefault();
        this._handleArrowKeys(false);
        break;
      case 'Enter':
      case ' ':
      case 'Spacebar':
        event.preventDefault();
        this._handleEnterKey();
        break;
    }
  }

  private async _handleArrowKeys(moveForward: boolean): Promise<void> {
    const tabs: PharosTab[] = Array.prototype.slice.call(this._tabs);
    const ids = tabs.map((tab) => tab.id);

    const focused = document.activeElement as PharosTab;
    if (!focused.matches(_allTabsSelector)) {
      return;
    }

    const nextTabIndex = loopWrapIndex(ids, (v) => v === focused.id, moveForward);

    focused['_focused'] = false;
    const moveFocusTo = tabs[nextTabIndex];
    moveFocusTo['_focused'] = true;

    await moveFocusTo.updateComplete;
    moveFocusTo.focus();
    this._makeTabVisible(moveFocusTo);
  }

  private _handleEnterKey(): void {
    const focused = document.activeElement as PharosTab;
    focused.click();
  }

  private _handleFocusout(event: FocusEvent): void {
    if (event.relatedTarget && (event.relatedTarget as Element).matches(_allTabsSelector)) {
      return;
    }

    this._tabs.forEach((tab) => {
      tab['_focused'] = tab.hasAttribute('selected');
    });
  }
  private _renderPanelSeparator() {
    return this.panelSeparator ? html`<span class="panel-separator"></span>` : null;
  }

  private _renderTabList() {
    return html`
      <div
        class="${classMap({
          ['cloak']: true,
          ['cloak--cloak-left']: this._overflowingLeft,
          ['cloak--cloak-right']: this._overflowingRight,
        })}"
      >
        <div class="tab__list" role="tablist">
          <slot></slot>
          ${this._renderPanelSeparator()}
        </div>
      </div>
    `;
  }

  private _renderTabPanels() {
    return html`
      <div class="tab__panels">
        <slot name="panel"></slot>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    return html` ${this._renderTabList()} ${this._renderTabPanels()} `;
  }
}
