import { html, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import type { PropertyValues, TemplateResult, CSSResultArray } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { textInputStyles } from './pharos-text-input.css';

import { FormElement } from '../base/form-element';
import FormMixin from '../../utils/mixins/form';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosIcon } from '../icon/pharos-icon';

export type TextInputType =
  | 'email'
  | 'hidden'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url';

export type TextInputAutocomplete = 'on' | 'off';

const TYPES = ['email', 'hidden', 'number', 'password', 'search', 'tel', 'text', 'url'];

const SUBMITTABLE = [
  'input[type="submit"]:not([disabled])',
  'button[type="submit"]:not([disabled])',
  '[data-pharos-component="PharosButton"][type="submit"]:not([disabled])',
];

const BLOCKING = [
  '[data-pharos-component="PharosTextInput"]',
  '[data-pharos-component="PharosInputGroup"]',
  'input[type="text"]',
  'input[type="search"]',
  'input[type="url"]',
  'input[type="tel"]',
  'input[type="email"]',
  'input[type="password"]',
  'input[type="date"]',
  'input[type="month"]',
  'input[type="week"]',
  'input[type="time"]',
  'input[type="datetime-local"]',
  'input[type="number"]',
];

/**
 * Pharos text input component.
 *
 * @tag pharos-text-input
 *
 * @slot label - Contains the label content.
 * @slot message - Contains message content to show below the input.
 *
 * @fires input - Fires when the value has changed
 * @fires change - Fires when the element loses focus, after the content has changed
 *
 * @cssprop {Length} --pharos-text-input-size-height-base - Text input height.
 * @cssprop {Color} --pharos-text-input-color-icon-valid - Fill color for valid state icon.
 * @cssprop {Color} --pharos-text-input-color-icon-invalid - Fill color for invalidated state icon.
 */
export class PharosTextInput extends ScopedRegistryMixin(FormMixin(FormElement)) {
  static elementDefinitions = {
    'pharos-icon': PharosIcon,
  };

  /**
   * Indicates input value.
   * @attr value
   */
  @property({ type: String, reflect: true })
  public value = '';

  /**
   * Indicates the type of input.
   * @attr type
   */
  @property({ type: String, reflect: true })
  public type: TextInputType = 'text';

  /**
   * Indicates if input is readonly.
   * @attr readonly
   */
  @property({ type: Boolean, reflect: true })
  public readonly = false;

  /**
   * Indicates if autocomplete is enabled
   * @attr autocomplete
   * @type {TextInputAutocomplete | undefined}
   */
  @property({ type: String, reflect: true })
  public autocomplete?: TextInputAutocomplete;

  /**
   * Display text when input is empty
   * @attr placeholder
   */
  @property({ type: String, reflect: true })
  public placeholder = '';

  /**
   * Defines the minimum number of characters the user can enter
   * @attr minlength
   */
  @property({ type: Number, reflect: true })
  public minlength?: number;

  /**
   * Defines the maximum number of characters the user can enter
   * @attr maxlength
   */
  @property({ type: Number, reflect: true })
  public maxlength?: number;

  /**
   * Pattern to validate the input against
   * @attr pattern
   */
  @property({ type: String, reflect: true })
  public pattern?: string;

  /**
   * Indicates the input is on a AA compliant background.
   * @attr on-background
   */
  @property({ type: Boolean, reflect: true, attribute: 'on-background' })
  public onBackground = false;

  @query('#input-element')
  protected _input!: HTMLInputElement;

  @query('.input__icon')
  protected _inputIcon!: HTMLInputElement;

  public static override get styles(): CSSResultArray {
    return [super.styles, textInputStyles];
  }

  protected override firstUpdated(): void {
    this._input.defaultValue = this.value;
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (changedProperties.has('type') && !TYPES.includes(this.type)) {
      throw new Error(
        `${this.type} is not a valid text input type. Valid types are: ${TYPES.join(', ')}`
      );
    }
  }

  public onChange(): void {
    this.dispatchEvent(
      new Event('change', {
        bubbles: true,
        composed: true,
      })
    );
  }

  public onInput(): void {
    this.value = this._input.value;
  }

  private _renderIcons(): TemplateResult | typeof nothing {
    if (this.invalidated) {
      return html` <pharos-icon class="input__icon" name="exclamation"></pharos-icon> `;
    } else if (this.validated) {
      return html` <pharos-icon class="input__icon" name="checkmark"></pharos-icon> `;
    }
    return nothing;
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const form = this.closest('form');
      const submitElement = form?.querySelector(SUBMITTABLE.join(','));

      if (submitElement) {
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          composed: true,
        });
        submitElement.dispatchEvent(clickEvent);
      } else {
        const blockingElements = form?.querySelectorAll(BLOCKING.join(','));
        if (blockingElements && blockingElements.length <= 1) {
          form?.submit();
        }
      }
    }
  }

  _handleFormdata(event: CustomEvent): void {
    const { formData } = event;
    if (!this.disabled) {
      formData.append(this.name, this.value);
    }
  }

  _handleFormReset(): void {
    this.value = this._input.defaultValue;
  }

  protected get prependContent(): TemplateResult | typeof nothing {
    return nothing;
  }

  protected get appendContent(): TemplateResult | typeof nothing {
    return nothing;
  }

  protected override render(): TemplateResult {
    return html`
      <label for="input-element">
        <slot name="label"></slot>
        ${this.requiredIndicator}
      </label>
      <div class="input-wrapper">
        ${this.prependContent}
        <input
          id="input-element"
          name="${this.name}"
          .type="${this.type}"
          .value=${this.value}
          ?required="${this.required}"
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          placeholder="${this.placeholder}"
          autocomplete="${ifDefined(this.autocomplete)}"
          maxlength=${ifDefined(this.maxlength)}
          minlength=${ifDefined(this.minlength)}
          pattern=${ifDefined(this.pattern)}
          aria-required="${this.required}"
          aria-invalid="${this.invalidated}"
          aria-describedby="${ifDefined(this.messageId)}"
          @change=${this.onChange}
          @input=${this.onInput}
          @keydown=${this._handleKeydown}
        />
        ${this._renderIcons()} ${this.appendContent}
      </div>
      ${this.messageContent}
    `;
  }
}
