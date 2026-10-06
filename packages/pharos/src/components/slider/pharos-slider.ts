import { html } from 'lit';
import { property, query } from 'lit/decorators.js';
import type { PropertyValues, TemplateResult, CSSResultArray } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { styleMap } from 'lit/directives/style-map.js';
import { sliderStyles } from './pharos-slider.css';
import type { PharosSliderOption } from './pharos-slider-option';

import FormMixin from '../../utils/mixins/form';
import ObserveChildrenMixin from '../../utils/mixins/observe-children';
import { FormElement } from '../base/form-element';

const _allOptionsSelector = '[data-pharos-component="PharosSliderOption"]';

/**
 * Pharos slider component. Built on a native range input, with optional
 * `pharos-slider-option` children that label stops along the track.
 *
 * @tag pharos-slider
 *
 * @slot label - Contains the label content.
 * @slot - Contains the slider options (the default slot).
 * @slot message - Contains message content to show below the slider.
 *
 * @fires input - Fires when the value changes while the user is interacting with the slider
 * @fires change - Fires when the value has changed
 */
export class PharosSlider extends ObserveChildrenMixin(FormMixin(FormElement)) {
  /**
   * The value of the slider. Limited to the range and set to the nearest step.
   * range. Like a native input, the value attribute sets the starting value
   * and does not change with it.
   * @attr value
   */
  // The value is read from the input, so it can't be compared before and after it is set
  @property({ type: Number, hasChanged: () => true })
  public get value(): number | undefined {
    return this._input ? Number(this._input.value) : this._requestedValue;
  }

  public set value(value: number | undefined) {
    this._requestedValue = value;
  }

  /**
   * The minimum value of the slider.
   * @attr min
   */
  @property({ type: Number, reflect: true })
  public min = 0;

  /**
   * The maximum value of the slider.
   * @attr max
   */
  @property({ type: Number, reflect: true })
  public max = 100;

  /**
   * The granularity or the slider
   * @attr step
   */
  @property({ type: Number, reflect: true })
  public step = 1;

  /**
   * Formats the value announced by assistive technology when it does not match an option.
   */
  @property({ attribute: false })
  public valueFormatter?: (value: number) => string;

  @query('#input-element')
  private _input!: HTMLInputElement;

  private _defaultValue?: number;

  // The set value, before the input limits it to the range and maps it to a
  // valid step, so it survives changes to the range
  private _requestedValue?: number;

  private _isInteracting = false;

  private _valueBeforeInteraction?: number;

  // Worked out in willUpdate, before each update
  private _options: PharosSliderOption[] = [];

  public static override get styles(): CSSResultArray {
    return [super.styles, sliderStyles];
  }

  // Limit what ObserveChildrenMixin watches so the attributes the slider sets on its
  // options don't trigger cascading updates
  protected override get _childrenObserverOptions(): MutationObserverInit {
    return {
      childList: true,
      subtree: true,
      characterData: true,
      attributeFilter: ['value', 'slot', 'data-pharos-component'],
    };
  }

  protected override firstUpdated(): void {
    this._defaultValue = this._requestedValue;
  }

  protected override willUpdate(): void {
    this._options = [...this.children].filter((child) =>
      child.matches(_allOptionsSelector)
    ) as PharosSliderOption[];
  }

  // The input has limited the value to the range and mapped it to a step by now,
  // so everything that depends on the value is set after rendering
  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    this._validate();

    const value = this.value as number;
    const selected = this._selectedOption;
    this._input.ariaValueText = selected
      ? [selected.label, selected.description].filter(Boolean).join(', ')
      : (this.valueFormatter?.(value) ?? null);
    this._input.style.setProperty('--pharos-slider-fill', String(this._position(value)));

    this._options.forEach((option) => {
      const position = this._position(option.value as number);
      // Options at the ends of the track line up with its edges, all others center on their stop
      const anchor = position === 0 || position === 1 ? position : 0.5;
      const align = position === 0 ? 'left' : position === 1 ? 'right' : 'center';

      option.selected = option.value === value;
      option.style.setProperty('--pharos-slider-option-position', String(position));
      option.style.setProperty('--pharos-slider-option-anchor', String(anchor));
      option.style.setProperty('--pharos-slider-option-align', align);
    });
  }

  // Checks each option value by setting it on the input and seeing if the input keeps it
  private _validate(): void {
    const input = this._input;
    const { value } = input;
    const seen = new Set<number>();
    this._options.forEach((option) => {
      if (option.value == null) {
        throw new Error(`pharos-slider-option is missing its required value attribute.`);
      }
      input.value = String(option.value);
      if (Number(input.value) !== option.value) {
        throw new Error(
          `${option.value} is not a valid option value. Option values must fall on a step of ${this.step} between the min (${this.min}) and max (${this.max}).`
        );
      }
      if (seen.has(option.value)) {
        throw new Error(
          `${option.value} is not a valid option value. Each option must have a unique value.`
        );
      }
      seen.add(option.value);
    });
    input.value = value;
  }

  private get _selectedOption(): PharosSliderOption | undefined {
    return this._options.find((option) => option.value === this.value);
  }

  /**
   * The position of a value along the track as a fraction from 0 to 1
   */
  private _position(value: number): number {
    return (value - this.min) / (this.max - this.min);
  }

  // By the time the input fires an event, it already has the new value, so the value before
  // it is the one that was set
  private _handleInput(): void {
    if (!this._isInteracting) {
      this._isInteracting = true;
      this._valueBeforeInteraction = this._requestedValue;
    }
    this.value = Number(this._input.value);
  }

  private _handleChange(): void {
    const previousValue = this._isInteracting ? this._valueBeforeInteraction : this._requestedValue;
    this._isInteracting = false;
    this.value = Number(this._input.value);
    this._dispatchChange(previousValue);
  }

  private _handleOptionClick(event: MouseEvent): void {
    const option = (event.target as Element).closest(_allOptionsSelector) as PharosSliderOption;
    if (this.disabled || !this._options.includes(option)) {
      return;
    }

    this._input.focus();
    if (option.value === this.value) {
      return;
    }

    const previousValue = this.value;
    this.value = option.value;
    this._input.value = String(option.value);
    this._input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    this._isInteracting = false;
    this._dispatchChange(previousValue);
  }

  private _dispatchChange(previousValue?: number): void {
    const notCancelled = this.dispatchEvent(
      new Event('change', { bubbles: true, cancelable: true, composed: true })
    );

    // If the event was prevented, the value returns to its previous state
    if (!notCancelled) {
      this.value = previousValue;
    }
  }

  _handleFormdata(event: CustomEvent): void {
    const { formData } = event;
    if (!this.disabled && this.value !== undefined) {
      formData.append(this.name, String(this.value));
    }
  }

  _handleFormReset(): void {
    this.value = this._defaultValue;
  }

  protected override render(): TemplateResult {
    return html`
      <label for="input-element">
        <slot name="label"></slot>
        ${this.requiredIndicator}
      </label>
      <input
        id="input-element"
        class="slider__input"
        type="range"
        name=${this.name}
        min=${this.min}
        max=${this.max}
        step=${this.step}
        .value=${live(this._requestedValue === undefined ? '' : String(this._requestedValue))}
        ?disabled=${this.disabled}
        aria-invalid=${this.invalidated}
        aria-describedby=${ifDefined(this.messageId)}
        @input=${this._handleInput}
        @change=${this._handleChange}
      />
      <div
        class="slider__options"
        style=${styleMap({ '--pharos-slider-option-count': String(this._options.length) })}
        aria-hidden="true"
        @click=${this._handleOptionClick}
      >
        <slot></slot>
      </div>
      ${this.messageContent}
    `;
  }
}
