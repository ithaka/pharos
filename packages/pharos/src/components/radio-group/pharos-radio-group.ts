import { html } from 'lit';
import { property } from 'lit/decorators.js';
import type { PropertyValues, TemplateResult, CSSResultArray } from 'lit';
import { radioGroupStyles } from './pharos-radio-group.css';
import type { PharosRadioButton } from '../radio-button/pharos-radio-button';
import { customElement } from '../../utils/decorators';

import { FormElement } from '../base/form-element';

/**
 * Pharos radio group component.
 *
 * @tag pharos-radio-group
 *
 * @slot legend - Contains the fieldset legend content.
 * @slot - Contains the set of radio buttons (the default slot).
 * @slot message - Contains message content to show below the group.
 *
 * @fires change - Fires when the value has changed
 */
@customElement('pharos-radio-group')
export class PharosRadioGroup extends FormElement {
  /**
   * Dictate if radio buttons should be displayed horizontally
   * @attr horizontal
   */
  @property({ type: Boolean, reflect: true })
  public horizontal = false;

  /**
   * Indicates the selected radio for the group
   * @readonly
   */
  @property({ type: String, attribute: false })
  public get value(): string {
    return ([...this.children].find(
      (child) => !child.slot && (child as PharosRadioButton).checked
    ) as PharosRadioButton)?.value;
  }

  private _clicked = false;

  public static get styles(): CSSResultArray {
    return [super.styles, radioGroupStyles];
  }

  protected firstUpdated(): void {
    this._setRadios();
    this._addFocusListeners();

    const radios = this.querySelectorAll('pharos-radio-button') as NodeListOf<PharosRadioButton>;
    radios.forEach((radio) => {
      radio.addEventListener('change', (event: Event) => {
        event.stopPropagation();

        const target = event.target as PharosRadioButton;
        target.focus();

        this._updateSelection(target.value);
        this._clicked = false;

        this.dispatchEvent(
          new Event('change', {
            bubbles: true,
            composed: true,
          })
        );
      });
    });

    this.addEventListener('keydown', this._handleKeydown);
  }

  protected update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (
      changedProperties.has('name') ||
      changedProperties.has('disabled') ||
      changedProperties.has('invalidated') ||
      changedProperties.has('validated')
    ) {
      this._setRadios();
    }
  }

  private _handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Down':
      case 'Right':
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        this._handleArrowKeys(true);
        break;
      case 'Up':
      case 'Left':
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        this._handleArrowKeys(false);
        break;
    }
  }

  private _handleArrowKeys(moveForward: boolean): void {
    const radios = Array.prototype.slice.call(
      this.querySelectorAll('pharos-radio-button:not([disabled])')
    ) as PharosRadioButton[];
    const values = radios.map((radio) => radio.value);

    const focusedRadio = document.activeElement as PharosRadioButton;
    let index = values.findIndex((v) => v === focusedRadio.value);

    if (moveForward) {
      // move forward/loop
      index = index === values.length - 1 ? 0 : index + 1;
    } else {
      // move backwards/loop
      index = index === 0 ? values.length - 1 : index - 1;
    }

    const checkedRadio = radios[index];
    checkedRadio['_radio'].click();
    checkedRadio['_radio'].focus();
  }

  private _updateSelection(value: string): void {
    const previouslyChecked = this.querySelector(
      `pharos-radio-button[checked]:not([value="${value}"])`
    ) as PharosRadioButton;

    if (previouslyChecked) {
      previouslyChecked.checked = false;
    }
  }

  private _setRadios(): void {
    const radios = this.querySelectorAll('pharos-radio-button') as NodeListOf<PharosRadioButton>;
    radios.forEach((radio) => {
      radio.name = this.name;
      radio.disabled = this.disabled;
      radio.validated = this.validated;
      radio.invalidated = this.invalidated;
    });
  }

  private _addFocusListeners(): void {
    const radios = this.querySelectorAll('pharos-radio-button') as NodeListOf<PharosRadioButton>;
    radios.forEach((radio) => {
      // Disregard focus from clicks
      radio.addEventListener('mousedown', () => {
        this._clicked = true;
      });

      // Ensure focus is delegated to the selected radio when focus enters the group
      radio.addEventListener('focusin', (event: FocusEvent) => {
        const checkedRadio = this.querySelector(
          `pharos-radio-button[checked]`
        ) as PharosRadioButton;

        const withinGroup =
          (event.relatedTarget as HTMLElement)?.tagName === (event.target as HTMLElement)?.tagName;

        if (!this._clicked && !withinGroup && !radio.checked && checkedRadio) {
          event.preventDefault();
          if (checkedRadio !== document.activeElement) {
            checkedRadio['_radio'].focus();
          }
        }
      });
    });
  }

  protected render(): TemplateResult {
    const labels = ['legend'];
    if (this.messageId) {
      labels.push(this.messageId);
    }

    return html`
      <fieldset
        class="radio-group radio-group--${this.horizontal ? 'horizontal' : 'vertical'}"
        aria-required="${this.required}"
        aria-invalid="${this.invalidated}"
        aria-labelledby="${labels.join(' ')}"
        role="radiogroup"
      >
        <legend id="legend" class="radio-group__legend">
          <slot name="legend"></slot>
          ${this.requiredIndicator}
        </legend>
        <div class="radio-group__radios">
          <slot></slot>
        </div>
        ${this.messageContent}
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-radio-group': PharosRadioGroup;
  }
}
