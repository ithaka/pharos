import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import { tabsStyles } from './pharos-tabs.css';

import type { PharosTab } from './pharos-tab';
import type { PharosTabPanel } from './pharos-tab-panel';

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
 */
export class PharosTabs extends PharosElement {
  /**
   * If should display a panel separator.
   * @attr panel-separator
   */
  @property({ type: Boolean, reflect: true, attribute: 'panel-separator' })
  public panelSeparator = false;

  @queryAssignedElements({ selector: _allTabsSelector })
  private _tabs!: NodeListOf<PharosTab>;

  @queryAssignedElements({ selector: _allTabPanelsSelector })
  private _tabPanels!: NodeListOf<PharosTabPanel>;

  public static override get styles(): CSSResultArray {
    return [tabsStyles];
  }

  protected override async firstUpdated(): Promise<void> {
    this.addEventListener('pharos-tab-selected', this._handleTabSelected);
    this.addEventListener('keydown', this._handleKeydown);
    this.addEventListener('focusout', this._handleFocusout);

    await Promise.all(Array.from(this._tabs).map((tab) => tab.updateComplete));
    await Promise.all(Array.from(this._tabPanels).map((tab) => tab.updateComplete));

    this._tabs.forEach((tab) => {
      const panel = this._queryPanelByTab(tab);
      tab.setAttribute('aria-controls', panel?.id || '');
      panel?.setAttribute('aria-labelledby', tab.id);
    });

    this._selectInitialTab();
  }

  private _selectInitialTab(): void {
    const selected: PharosTab | null = this.querySelector(`${_allTabsSelector}[selected]`);
    const selectedTab: PharosTab = selected ? selected : this._tabs[0];
    const selectedPanel: PharosTabPanel | null = this._queryPanelByTab(selectedTab);

    selectedTab.selected = true;
    if (selectedPanel) {
      selectedPanel.selected = true;
    }
  }

  private _queryPanelByTab(tab: PharosTab): PharosTabPanel | null {
    const panelId: string | undefined = tab.dataset.panelId;
    return this.querySelector(`#${panelId}`);
  }

  private _handleTabSelected(event: Event): void {
    const selected = event.target as PharosTab;
    const previous: PharosTab | null = this.querySelector(
      `${_allTabsSelector}[selected]:not([id="${selected.id}"])`
    );

    if (previous) {
      previous.selected = false;
      const panel: PharosTabPanel | null = this.querySelector(
        `${_allTabPanelsSelector}[id="${previous.getAttribute('aria-controls')}"]`
      );

      if (panel) {
        panel.selected = false;
      }
    }

    const panel: PharosTabPanel | null = this.querySelector(
      `${_allTabPanelsSelector}[id="${selected.getAttribute('aria-controls')}"]`
    );
    if (panel) {
      panel.selected = true;
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

    let index = ids.findIndex((v) => v === focused.id);

    if (moveForward) {
      index = index === ids.length - 1 ? 0 : index + 1;
    } else {
      index = index === 0 ? ids.length - 1 : index - 1;
    }

    focused['_focused'] = false;
    const moveFocusTo = tabs[index];
    moveFocusTo['_focused'] = true;

    await moveFocusTo.updateComplete;
    moveFocusTo.focus();
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
      <div class="tab__list" role="tablist">
        <slot></slot>
        ${this._renderPanelSeparator()}
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
