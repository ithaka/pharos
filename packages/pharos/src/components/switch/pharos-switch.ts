import type { CSSResultArray, TemplateResult } from 'lit';
import { html } from 'lit';
import { switchStyles } from './pharos-switch.css';
import FormMixin from '../../utils/mixins/form';
import { FormElement } from '../base/form-element';
import { property, query } from 'lit/decorators.js';

/**
 * Pharos switch component.
 *
 * @tag pharos-switch
 *
 */
export class PharosSwitch extends FormMixin(FormElement) {
  /**
   * Indicates if checkbox is checked.
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

  @query('#switch-element')
  private _switch!: HTMLInputElement;

  public static override get styles(): CSSResultArray {
    return [switchStyles];
  }

  protected override firstUpdated(): void {
    this._switch.defaultChecked = this.checked;
  }

  private _handleClick(event: Event): void {
    console.log('handle click??', this.checked);
    event.preventDefault();
    event.stopPropagation();
    this._switch.click();
    // this._switch.focus();
  }

  public onChange(): void {
    /**
     * The native checkbox state has already changed, so invert it
     */
    const originalCheckedState = !this._switch.checked;

    this.checked = this._switch.checked;

    const notCancelled = this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          target: this._switch, // pass the native checkbox in the event
        },
      })
    );

    /**
     * if the event was prevented
     * indeterminate and checked states return to their previous values
     */
    if (!notCancelled) {
      this.checked = originalCheckedState;
    }
  }

  _handleFormdata(event: CustomEvent): void {
    const { formData } = event;
    if (!this.disabled && this.checked) {
      formData.append(this.name, this.value || 'on');
    }
  }

  _handleFormReset(): void {
    this.checked = this._switch.defaultChecked;
  }

  protected override render(): TemplateResult {
    return html`
      <div>
        <input
          id="switch-element"
          class="switch__input"
          name=${this.name}
          type="checkbox"
          .value=${this.value}
          .checked=${this.checked}
          role="switch"
          ?disabled=${this.disabled}
          @change=${this.onChange}
        />
        <div class="input-wrapper">
          <label for="switch-element" class="switch__label" @click="${this._handleClick}">
            <slot name="label"></slot>
          </label>
          <span class="switch__control" @click="${this._handleClick}"></span>
        </div>
      </div>
    `;
  }
}
