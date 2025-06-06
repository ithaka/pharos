import { html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { radioButtonStyles } from './pharos-radio-button.css';
import { FormElement } from '../base/form-element';
import FormMixin from '../../utils/mixins/form';

const LINKS = `a[href],pharos-link[href],[data-pharos-component='PharosLink'][href]`;

/**
 * Pharos radio button component.
 *
 * @tag pharos-radio-button
 *
 * @slot label - Contains the label content.
 * @slot message - Contains message content to show below the input.
 *
 * @fires change - Fires when the value has changed
 */
export class PharosRadioButton extends FormMixin(FormElement) {
  /**
   * Indicates if radio is checked.
   * @attr checked
   */
  @property({ type: Boolean, reflect: true })
  public checked = false;

  /**
   * Indicates the value for the input.
   * @attr value
   */
  @property({ type: String, reflect: true })
  public value = '';

  @query('#radio-element')
  private _radio!: HTMLInputElement;

  public static override get styles(): CSSResultArray {
    return [super.styles, radioButtonStyles];
  }

  protected override firstUpdated(): void {
    this._radio.defaultChecked = this.checked;
  }

  public onChange(): void {
    this.checked = this._radio.checked;

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
      formData.append(this.name, this.value);
    }
  }

  _handleFormReset(): void {
    this.checked = this._radio.defaultChecked;
  }

  private _handleClick(event: Event): void {
    if (!(event.target as Element).matches(LINKS)) {
      event.preventDefault();
      event.stopPropagation();
      this._radio.click();
      this._radio.focus();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <input
        id="radio-element"
        name=${this.name}
        type="radio"
        .value=${this.value}
        .checked=${this.checked}
        ?required=${this.required}
        ?disabled=${this.disabled}
        @change=${this.onChange}
        aria-describedby=${ifDefined(this.messageId)}
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
          aria-hidden="true"
          focusable="false"
          @click=${this._handleClick}
        >
          <circle cx="50%" cy="50%" r="9" class="focus" />
          <circle cx="50%" cy="50%" r="8" class="outer" />
          <circle cx="50%" cy="50%" r="7" class="hover" />
          <circle cx="50%" cy="50%" r="5" class="inner" />
        </svg>
        <label for="radio-element" @click=${this._handleClick}>
          <slot name="label"></slot>
          ${this.requiredIndicator}
        </label>
      </div>
      ${this.messageContent}
    `;
  }
}
