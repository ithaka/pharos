import { html } from 'lit';
import { query, state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { inputGroupStyles } from './pharos-input-group.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';
import { PharosTextInput } from '../text-input/pharos-text-input';
import type { TextInputType, TextInputAutocomplete } from '../text-input/pharos-text-input';
import { PharosSpacingThreeQuartersX } from '../../styles/variables';

export type { TextInputType, TextInputAutocomplete };

/**
 * Pharos input group component.
 *
 * @element pharos-input-group
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

  public static get styles(): CSSResultArray {
    return [designTokens, super.styles, inputGroupStyles];
  }

  protected firstUpdated(): void {
    this.addEventListener('focus', this._adjustPadding);
    this.addEventListener('blur', this._adjustPadding);
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('_prependGroupWidth')) {
      super[
        '_input'
      ].style.paddingLeft = `calc(${PharosSpacingThreeQuartersX} + ${this._prependGroupWidth}px)`;
    }
    if (changedProperties.has('_appendGroupWidth')) {
      super[
        '_input'
      ].style.paddingRight = `calc(${PharosSpacingThreeQuartersX} + ${this._appendGroupWidth}px)`;
    }
  }

  protected get prependContent(): TemplateResult {
    return html`
      <div class="input-group input-group--prepend">
        <slot name="prepend" @slotchange=${this._updatePrependPadding}></slot>
      </div>
    `;
  }

  protected get appendContent(): TemplateResult {
    return html`
      <div class="input-group input-group--append">
        <slot @slotchange=${this._updateAppendPadding}></slot>
      </div>
    `;
  }

  private async _updateAppendPadding(): Promise<void> {
    await this.updateComplete;
    this._appendGroupWidth = this._appendGroup.getBoundingClientRect().width;
  }

  private async _updatePrependPadding(): Promise<void> {
    await this.updateComplete;
    this._prependGroupWidth = this._prependGroup.getBoundingClientRect().width;
  }

  private _adjustPadding(event: FocusEvent) {
    const amount = event.type === 'focus' ? -1 : 1;
    super['_input'].style.paddingLeft = `${
      parseInt(
        window.getComputedStyle(super['_input'], null).getPropertyValue('padding-left'),
        10
      ) + amount
    }px`;
    super['_input'].style.paddingRight = `${
      parseInt(
        window.getComputedStyle(super['_input'], null).getPropertyValue('padding-right'),
        10
      ) + amount
    }px`;
  }

  protected render(): TemplateResult {
    return html` ${super.render()} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-input-group': PharosInputGroup;
  }
}
