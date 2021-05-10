import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import type { PropertyValues, TemplateResult, CSSResultArray } from 'lit';
import { nothing } from 'lit-html';
import { formElementStyles } from './form-element.css';

import FocusMixin from '../../utils/mixins/focus';

/**
 * The base form element class to house shared properties, styles, and methods.
 *
 * @cssprop {Color} --pharos-form-element-color-text-base - Form element font color.
 * @cssprop {Color} --pharos-form-element-color-text-required - Required indicator color.
 * @cssprop {Color} --pharos-form-element-color-text-invalid - Invalidated form element text color.
 * @cssprop {Color} --pharos-form-element-color-background-disabled - Background color when form element is disabled.
 * @cssprop {Color} --pharos-form-element-color-border-base - Form element border color.
 * @cssprop {Color} --pharos-form-element-color-border-focus - Focused form element border color.
 * @cssprop {Color} --pharos-form-element-color-border-invalid - Invalidated form element border color.
 */
export class FormElement extends FocusMixin(LitElement) {
  /**
   * Name for the form element.
   * @attr name
   */
  @property({ type: String, reflect: true })
  public name = '';

  /**
   * Indicates if input is required.
   * @attr required
   */
  @property({ type: Boolean, reflect: true })
  public required = false;

  /**
   * Indicates if input is disabled.
   * @attr disabled
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Indicates an invalidated state.
   * @attr invalidated
   */
  @property({ type: Boolean, reflect: true })
  public invalidated = false;

  /**
   * Indicates a validated state.
   * @attr validated
   */
  @property({ type: Boolean, reflect: true })
  public validated = false;

  /**
   * The message to display below the input.
   * @attr message
   */
  @property({ type: String, reflect: true })
  public message = '';

  /**
   * Indicates if the label should be hidden.
   * @attr hide-label
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-label' })
  public hideLabel = false;

  public static get styles(): CSSResultArray {
    return [formElementStyles];
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('validated') && this.validated) {
      this.removeAttribute('invalidated');
    } else if (changedProperties.has('invalidated') && this.invalidated) {
      this.removeAttribute('validated');
    }
  }

  protected get requiredIndicator(): TemplateResult | typeof nothing {
    const content = this.required
      ? html`<span class="required-indicator"
          >*<span class="required-indicator__text">required</span></span
        >`
      : nothing;

    return content;
  }

  protected get messageContent(): TemplateResult | typeof nothing {
    const messageSlot = [...this.children].filter((child) => child.slot === 'message');
    const content =
      this.message || messageSlot.length
        ? html`<div id="message" class="input-message">
            ${this.message ? html`<div class="input-message__text">${this.message}</div>` : nothing}
            <slot name="message"></slot>
          </div>`
        : nothing;
    return content;
  }

  protected get messageId(): string | undefined {
    const messageSlot = [...this.children].filter((child) => child.slot === 'message');
    return this.message || messageSlot.length ? 'message' : undefined;
  }
}
