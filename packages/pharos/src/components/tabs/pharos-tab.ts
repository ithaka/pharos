import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';

import { PharosElement } from '../base/pharos-element';
import { tabStyles } from './pharos-tab.css';

/**
 * Pharos tab component.
 *
 * @tag pharos-tab
 *
 * @slot - Contains the content of the tab.
 *
 * @fires pharos-tab-selected - Fires when the tab is selected.
 *
 */
export class PharosTab extends PharosElement {
  /**
   * Indicates if the tab is selected.
   * @attr selected
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  @state()
  private _focused = false;

  public static override get styles(): CSSResultArray {
    return [tabStyles];
  }

  protected override firstUpdated(): void {
    this.addEventListener('click', this._handleClick);

    this.setAttribute('role', 'tab');
    this.setAttribute('aria-selected', 'false');
    this.setAttribute('tabindex', '-1');

    this.dataset.text = this.textContent || '';
  }

  protected override async updated(changedProperties: PropertyValues): Promise<void> {
    if (changedProperties.has('selected')) {
      this._focused = this.selected;
      this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
    }

    if (changedProperties.has('_focused')) {
      this.setAttribute('tabindex', this._focused ? '0' : '-1');
    }
  }

  private _triggerSelectedEvent() {
    const details = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('pharos-tab-selected', details));
  }

  private _handleClick(): void {
    if (!this.selected) {
      this._triggerSelectedEvent();
    }
  }

  protected override render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
