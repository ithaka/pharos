import { html, LitElement } from 'lit-element';
import type { TemplateResult, CSSResultArray } from 'lit-element';
import { tabsStyles } from './pharos-tabs.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';
import type { PharosTab } from './pharos-tab';
import type { PharosTabPanel } from './pharos-tab-panel';

const matchesFunc = 'matches' in Element.prototype ? 'matches' : 'msMatchesSelector';

/**
 * Pharos tabs component.
 *
 * @element pharos-tabs
 *
 * @slot - Contains the tabs.
 * @slot panel - Contains the panel to be shown for a tab.
 *
 */
@customElement('pharos-tabs')
export class PharosTabs extends LitElement {
  public static get styles(): CSSResultArray {
    return [designTokens, tabsStyles];
  }

  protected firstUpdated(): void {
    this.addEventListener('pharos-tab-selected', this._handleTabSelected);
    this.addEventListener('keydown', this._handleKeydown);
    this.addEventListener('focusout', this._handleFocusout);

    const tabs = this.querySelectorAll(`pharos-tab`) as NodeListOf<PharosTab>;

    tabs.forEach((tab) => {
      const panel = this._queryPanelByTab(tab);

      tab.setAttribute('aria-controls', panel.id);
      panel.setAttribute('aria-labelledby', tab.id);
    });

    this._selectInitialTab(tabs);
  }

  private _selectInitialTab(tabs: NodeListOf<PharosTab>): void {
    const selected = this.querySelector(`pharos-tab[selected]`) as PharosTab,
      selectedTab: PharosTab = selected ? selected : tabs[0],
      selectedPanel: PharosTabPanel = this._queryPanelByTab(selectedTab);

    selectedTab.selected = true;
    selectedPanel.selected = true;
  }

  private _queryPanelByTab(tab: PharosTab): PharosTabPanel {
    const panelId: string | undefined = tab.dataset.panelId;

    return this.querySelector(`#${panelId}`) as PharosTabPanel;
  }

  private _handleTabSelected(event: Event): void {
    const selected = event.target as PharosTab;
    const previous = this.querySelector(
      `pharos-tab[selected]:not([id="${selected.id}"])`
    ) as PharosTab;

    if (previous) {
      previous.selected = false;
      const panel = this.querySelector(
        `pharos-tab-panel[id="${previous.getAttribute('aria-controls')}"]`
      ) as PharosTabPanel;
      panel.selected = false;
    }

    const panel = this.querySelector(
      `pharos-tab-panel[id="${selected.getAttribute('aria-controls')}"]`
    ) as PharosTabPanel;
    panel.selected = true;
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
    const tabs = Array.prototype.slice.call(this.querySelectorAll(`pharos-tab`)) as PharosTab[];
    const ids = tabs.map((tab) => tab.id);

    const focused = document.activeElement as PharosTab;
    if (!focused[matchesFunc]('pharos-tab')) {
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
    if (event.relatedTarget && (event.relatedTarget as Element)[matchesFunc]('pharos-tab')) {
      return;
    }
    const tabs = this.querySelectorAll(`pharos-tab`) as NodeListOf<PharosTab>;
    tabs.forEach((tab) => {
      if (tab.hasAttribute('selected')) {
        tab['_focused'] = true;
      } else {
        tab['_focused'] = false;
      }
    });
  }

  protected render(): TemplateResult {
    return html`
      <div class="tab__list" role="tablist">
        <slot></slot>
      </div>
      <div class="tab__panels">
        <slot name="panel"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-tabs': PharosTabs;
  }
}
