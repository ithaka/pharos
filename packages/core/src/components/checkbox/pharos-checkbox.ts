import { html, property, query } from 'lit-element';
import type { TemplateResult, CSSResultArray } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { checkboxStyles } from './pharos-checkbox.css';
import { designTokens } from '../../styles/variables.css';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { customElement } from '../../utils/decorators';
import {
  PHAROS_ASSET_ICON_DASH_SMALL,
  PHAROS_ASSET_ICON_CHECKMARK_SMALL,
} from '../../styles/icons';

import { FormElement } from '../base/form-element';
import FormMixin from '../../utils/mixins/form';

const LINKS = `a[href],pharos-link[href]`;
const matchesFunc = 'matches' in Element.prototype ? 'matches' : 'msMatchesSelector';

/**
 * Pharos checkbox component.
 *
 * @element pharos-checkbox
 *
 * @slot label - Contains the label content.
 * @slot message - Contains message content to show below the input.
 *
 * @fires change - Fires when the value has changed
 */
@customElement('pharos-checkbox')
export class PharosCheckbox extends FormMixin(FormElement) {
  /**
   * Indicates if checkbox is checked.
   * @attr checked
   */
  @property({ type: Boolean, reflect: true })
  public checked = false;

  /**
   * Indicates if checkbox is indeterminate.
   * @attr indeterminate
   */
  @property({ type: Boolean, reflect: true })
  public indeterminate = false;

  /**
   * Indicates the value for the input.
   * @attr value
   */
  @property({ type: String, reflect: true })
  public value = '';

  /**
   * Used when the background is dark.
   * @attr dark
   */
  @property({ type: Boolean, reflect: true })
  public dark = false;

  @query('#checkbox-element')
  private _checkbox!: HTMLInputElement;

  public static get styles(): CSSResultArray {
    return [designTokens, super.styles, checkboxStyles];
  }

  protected firstUpdated(): void {
    this._checkbox.defaultChecked = this.checked;
  }

  public onChange(): void {
    this.indeterminate = false;
    this.checked = this._checkbox.checked;

    this.dispatchEvent(
      new Event('change', {
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleFormdata(event: CustomEvent): void {
    const { formData } = event;
    if (!this.disabled && this.checked) {
      formData.append(this.name, this.value || 'on');
    }
  }

  _handleFormReset(): void {
    this.checked = this._checkbox.defaultChecked;
  }

  private _handleClick(event: Event): void {
    if (!(event.target as Element)[matchesFunc](LINKS)) {
      event.preventDefault();
      event.stopPropagation();
      this._checkbox.click();
      this._checkbox.focus();
    }
  }

  private _renderPath(): string {
    if (this.indeterminate) {
      return atob(PHAROS_ASSET_ICON_DASH_SMALL);
    } else {
      return atob(PHAROS_ASSET_ICON_CHECKMARK_SMALL);
    }
  }

  private _handleMousedown(event: MouseEvent): void {
    if (!(event.target as Element)[matchesFunc](LINKS)) {
      event.preventDefault();
    }
  }

  protected render(): TemplateResult {
    return html`
      <input
        id="checkbox-element"
        name=${this.name}
        type="checkbox"
        .value=${this.value}
        .checked=${this.checked}
        .indeterminate=${this.indeterminate}
        ?required="${this.required}"
        ?disabled=${this.disabled}
        aria-required="${this.required}"
        aria-invalid="${this.invalidated}"
        aria-describedby="${ifDefined(this.messageId)}"
        @change=${this.onChange}
      />
      <div class="input-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          class="input__icon"
          role="img"
          aria-label="checkbox"
          focusable="false"
          @click="${this._handleClick}"
          @mousedown=${this._handleMousedown}
        >
          <rect x="3" y="3" width="18" height="18" rx="3" class="focus" />
          <rect x="4" y="4" width="16" height="16" rx="2" class="box" />
          <rect x="5" y="5" width="14" height="14" rx="1" class="hover" />
          <svg
            x="4"
            y="4"
            class=${classMap({
              [`checkmark`]: !this.indeterminate,
              [`dash`]: this.indeterminate,
            })}
          >
            ${unsafeSVG(this._renderPath())}
          </svg>
        </svg>
        <label
          for="checkbox-element"
          @click="${this._handleClick}"
          @mousedown=${this._handleMousedown}
        >
          <slot name="label"></slot>
          ${this.requiredIndicator}
        </label>
      </div>
      ${this.messageContent}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-checkbox': PharosCheckbox;
  }
}
