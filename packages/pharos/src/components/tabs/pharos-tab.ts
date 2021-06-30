import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { tabStyles } from './pharos-tab.css';
import { customElement } from '../../utils/decorators';

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
@customElement('pharos-tab')
export class PharosTab extends LitElement {
  /**
   * Indicates if the tab is selected.
   * @attr selected
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  @state()
  private _focused = false;

  public static get styles(): CSSResultArray {
    return [tabStyles];
  }

  protected firstUpdated(): void {
    this.addEventListener('click', this._handleClick);

    this.setAttribute('role', 'tab');
    this.setAttribute('aria-selected', 'false');
    this.setAttribute('tabindex', '-1');

    this.dataset.text = this.textContent || '';
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('selected')) {
      this._focused = this.selected;
      this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
    }
    if (changedProperties.has('_focused')) {
      this.setAttribute('tabindex', this._focused ? '0' : '-1');
    }
  }

  private _handleClick(): void {
    const details = {
      bubbles: true,
      composed: true,
    };
    this.selected = true;
    this.dispatchEvent(new CustomEvent('pharos-tab-selected', details));
  }

  protected render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-tab': PharosTab;
  }
}
