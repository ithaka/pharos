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
 * @fires change - Fires when the value has changed
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

  private _defaultChecked = false;

  public static override get styles(): CSSResultArray {
    return [switchStyles];
  }

  protected override firstUpdated(): void {
    this._defaultChecked = this.checked;
  }

  private _handleClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this._switch.click();
  }

  public onChange(): void {
    /**
     * The native checkbox state has already changed, so invert it
     */
    const originalCheckedState = !this._switch.checked;

    this.checked = this._switch.checked;
    console.log('onChange', this.checked);

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
    this.checked = this._defaultChecked;
  }

  protected override render(): TemplateResult {
    return html`
      <div>
        <input
          id="switch-element"
          class="switch__input"
          name=${this.name}
          type="checkbox"
          role="switch"
          .value=${this.value}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.onChange}
        />
        <div class="input-wrapper">
          <label for="switch-element" class="switch__label" @click="${this._handleClick}">
            <slot name="label"></slot>
          </label>
          <span class="switch__control" aria-hidden="true" @click="${this._handleClick}"></span>
        </div>
      </div>
    `;
  }
}
