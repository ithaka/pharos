import { html } from 'lit';
import { query, state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { inputGroupStyles } from './pharos-input-group.css';
import { customElement } from '../../utils/decorators';
import { PharosTextInput } from '../text-input/pharos-text-input';
import type { TextInputType, TextInputAutocomplete } from '../text-input/pharos-text-input';
import { PharosSpacingOneAndAHalfX, PharosSpacingThreeQuartersX } from '../../styles/variables';

export type { TextInputType, TextInputAutocomplete };

/**
 * Pharos input group component.
 *
 * @tag pharos-input-group
 *
 * @slot - Contains the elements to be appended to the input group (the default slot).
 * @slot prepend - Contains the elements to be prepended to the input group.
 */
@customElement('pharos-input-group')
export class PharosInputGroup extends PharosTextInput {
  @query('.input-group--append')
  private _appendGroup!: HTMLDivElement;

  @query('.input-group--prepend')
  private _prependGroup!: HTMLDivElement;

  @state()
  private _appendGroupWidth = 0;

  @state()
  private _prependGroupWidth = 0;

  public static override get styles(): CSSResultArray {
    return [super.styles, inputGroupStyles];
  }

  protected override firstUpdated(): void {
    this.addEventListener('focus', this._adjustPadding);
    this.addEventListener('blur', this._adjustPadding);
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('_prependGroupWidth')) {
      this._input.style.paddingLeft = `calc(${PharosSpacingThreeQuartersX} + ${this._prependGroupWidth}px)`;
    }
    if (
      ['invalidated', 'validated', '_appendGroupWidth'].some((key) => changedProperties.has(key))
    ) {
      if (this._inputIcon) {
        this._inputIcon.style.right = `${this._appendGroupWidth}px`;
        this._input.style.paddingRight = `calc(${PharosSpacingOneAndAHalfX} + ${this._appendGroupWidth}px)`;
      } else {
        this._input.style.paddingRight = `calc(${PharosSpacingThreeQuartersX} + ${this._appendGroupWidth}px)`;
      }
    }
  }

  protected override get prependContent(): TemplateResult {
    return html`
      <div class="input-group input-group--prepend">
        <slot name="prepend" @slotchange=${this._updatePrependPadding}></slot>
      </div>
    `;
  }

  protected override get appendContent(): TemplateResult {
    return html`
      <div class="input-group input-group--append">
        <slot @slotchange=${this._updateAppendPadding}></slot>
      </div>
    `;
  }

  private async _updateAppendPadding(): Promise<void> {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    this._appendGroupWidth = this._appendGroup.getBoundingClientRect().width;
  }

  private async _updatePrependPadding(): Promise<void> {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    this._prependGroupWidth = this._prependGroup.getBoundingClientRect().width;
  }

  private _adjustPadding(event: FocusEvent) {
    const amount = this.invalidated ? 0 : event.type === 'focus' ? -1 : 1;
    this._input.style.paddingLeft = `${
      parseInt(window.getComputedStyle(this._input, null).getPropertyValue('padding-left'), 10) +
      amount
    }px`;
    this._input.style.paddingRight = `${
      parseInt(window.getComputedStyle(this._input, null).getPropertyValue('padding-right'), 10) +
      amount
    }px`;
  }

  protected override render(): TemplateResult {
    return html` ${super.render()} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-input-group': PharosInputGroup;
  }
}
