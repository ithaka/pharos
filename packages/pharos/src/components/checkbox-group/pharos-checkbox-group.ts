import { html } from 'lit';
import { property } from 'lit/decorators.js';
import type { PropertyValues, TemplateResult, CSSResultArray } from 'lit';
import { checkboxGroupStyles } from './pharos-checkbox-group.css';
import type { PharosCheckbox } from '../checkbox/pharos-checkbox';
import { FormElement } from '../base/form-element';

/**
 * Pharos checkbox group component.
 *
 * @slot legend - Contains the fieldset legend content.
 * @slot - Contains the set of checkboxes (the default slot).
 * @slot message - Contains message content to show below the group.
 *
 * @fires change - Fires when the value has changed
 */
export class PharosCheckboxGroup extends FormElement {
  /**
   * Dictate if checkboxes should be displayed horizontally
   * @attr horizontal
   */
  @property({ type: Boolean, reflect: true })
  public horizontal = false;

  /**
   * Indicates the selected checkboxes for the group
   * @readonly
   */
  @property({ type: Array, attribute: false })
  public get value(): string[] {
    return [...this.children]
      .filter((child) => !child.slot && (child as PharosCheckbox).checked)
      .map((box) => (box as PharosCheckbox).value);
  }

  public static override get styles(): CSSResultArray {
    return [super.styles, checkboxGroupStyles];
  }

  protected override firstUpdated(): void {
    this._setBoxes();

    const boxes = this.querySelectorAll('pharos-checkbox') as NodeListOf<PharosCheckbox>;
    boxes.forEach((box) => {
      box.addEventListener('change', (event: Event) => {
        event.stopPropagation();

        this.dispatchEvent(
          new Event('change', {
            bubbles: true,
            composed: true,
          })
        );
      });
    });
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (
      changedProperties.has('name') ||
      changedProperties.has('disabled') ||
      changedProperties.has('invalidated') ||
      changedProperties.has('validated')
    ) {
      this._setBoxes();
    }
  }

  private _setBoxes(): void {
    const boxes = this.querySelectorAll('pharos-checkbox') as NodeListOf<PharosCheckbox>;
    boxes.forEach((box) => {
      box.name = this.name;
      box.disabled = this.disabled;
      box.validated = this.validated;
      box.invalidated = this.invalidated;
    });
  }

  protected override render(): TemplateResult {
    const labels = ['legend'];
    if (this.messageId) {
      labels.push(this.messageId);
    }

    return html`
      <fieldset
        class="checkbox-group checkbox-group--${this.horizontal ? 'horizontal' : 'vertical'}"
        aria-invalid="${this.invalidated}"
        aria-labelledby="${labels.join(' ')}"
      >
        <legend id="legend" class="checkbox-group__legend">
          <slot name="legend"></slot>
          ${this.requiredIndicator}
        </legend>
        <div class="checkbox-group__checkboxes">
          <slot></slot>
        </div>
        ${this.messageContent}
      </fieldset>
    `;
  }
}
