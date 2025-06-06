import { html } from 'lit';
import { property, query } from 'lit/decorators.js';
import type { PropertyValues, TemplateResult, CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { textareaStyles } from './pharos-textarea.css';

import { FormElement } from '../base/form-element';
import FormMixin from '../../utils/mixins/form';

export type TextAreaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export type TextAreaWrap = 'soft' | 'hard';

const RESIZES = ['none', 'vertical', 'horizontal', 'both'];

const WRAPS = ['soft', 'hard'];

/**
 * Pharos text input component.
 *
 * @tag pharos-textarea
 *
 * @slot label - Contains the label content.
 * @slot message - Contains message content to show below the input.
 *
 * @fires input - Fires when the value has changed
 * @fires change - Fires when the element loses focus, after the content has changed
 *
 * @cssprop {Length} --pharos-textarea-size-text-base - Text input font size.
 */
export class PharosTextarea extends FormMixin(FormElement) {
  /**
   * Indicates textarea value.
   * @attr value
   */
  @property({ type: String, reflect: true })
  public value = '';

  /**
   * Indicates width of text area.
   * @attr cols
   */
  @property({ type: Number, reflect: true })
  public cols = 20;

  /**
   * Sends the direction the text is read with the name.
   * @attr dirname
   */
  @property({ type: String, reflect: true })
  public dirname = '';

  /**
   * Defines the maximum number of characters the user can enter
   * @attr maxlength
   */
  @property({ type: Number, reflect: true })
  public maxlength?: number;

  /**
   * Defines the minimum number of characters the user can enter
   * @attr minlength
   */
  @property({ type: Number, reflect: true })
  public minlength?: number;

  /**
   * Display text when textarea is empty
   * @attr placeholder
   */
  @property({ type: String, reflect: true })
  public placeholder = '';

  /**
   * Indicates if textarea is readonly.
   * @attr readonly
   */
  @property({ type: Boolean, reflect: true })
  public readonly = false;

  /**
   * Indicates how many rows should the textarea be.
   * @attr rows
   */
  @property({ type: Number, reflect: true })
  public rows = 2;

  /**
   * Makes the text area resizeable
   * @attr resize
   */
  @property({ type: String, reflect: true })
  public resize: TextAreaResize = 'both';

  /**
   * Indicate whether the sumbitted value should be wrapped (Include new lines)
   * @attr wrap
   */
  @property({ type: String, reflect: true })
  public wrap: TextAreaWrap = 'soft';

  /**
   * Pattern to validate the textarea against
   * @attr pattern
   */
  @property({ type: String, reflect: true })
  public pattern?: string;

  @query('#textarea-element')
  private _textarea!: HTMLTextAreaElement;

  public static override get styles(): CSSResultArray {
    return [super.styles, textareaStyles];
  }

  protected override firstUpdated(): void {
    this._textarea.defaultValue = this.value;
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (changedProperties.has('resize') && !RESIZES.includes(this.resize)) {
      throw new Error(
        `${this.resize} is not a valid resize value. Valid values are: ${RESIZES.join(', ')}`
      );
    }
    if (changedProperties.has('wrap') && !WRAPS.includes(this.wrap)) {
      throw new Error(
        `${this.wrap} is not a valid wrap value. Valid values are: ${WRAPS.join(', ')}`
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
    this.value = this._textarea.value;
  }

  _handleFormdata(event: CustomEvent): void {
    const { formData } = event;
    if (!this.disabled) {
      formData.append(this.name, this.value);
    }
  }

  _handleFormReset(): void {
    this.value = this._textarea.defaultValue;
  }

  protected override render(): TemplateResult {
    return html`
      <label for="textarea-element">
        <slot name="label"></slot>
        ${this.requiredIndicator}
      </label>
      <div class="textarea-wrapper">
        <textarea
          id="textarea-element"
          class=${classMap({
            [`textarea`]: true,
            [`textarea--resize-${this.resize}`]: this.resize,
          })}
          cols=${ifDefined(this.cols)}
          rows=${ifDefined(this.rows)}
          dirname=${ifDefined(this.dirname)}
          name=${this.name}
          .value=${this.value}
          ?required=${this.required}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          placeholder=${this.placeholder}
          maxlength=${ifDefined(this.maxlength)}
          minlength=${ifDefined(this.minlength)}
          .wrap=${this.wrap}
          aria-required=${this.required}
          aria-invalid=${this.invalidated}
          aria-describedby=${ifDefined(this.messageId)}
          @change=${this.onChange}
          @input=${this.onInput}
        ></textarea>
      </div>
      ${this.messageContent}
    `;
  }
}
