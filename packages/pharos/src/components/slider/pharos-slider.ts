import { html } from 'lit';
import { property, query } from 'lit/decorators.js';
import type { PropertyValues, TemplateResult, CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { styleMap } from 'lit/directives/style-map.js';
import { sliderStyles } from './pharos-slider.css';
import type { PharosSliderOption } from './pharos-slider-option';

import FormMixin from '../../utils/mixins/form';
import { FormElement } from '../base/form-element';

const _allOptionsSelector = '[data-pharos-component="PharosSliderOption"]';

// Matches the defaults of a native range input
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;

// Tolerance for comparing values produced by floating point step math, e.g. 0.1 + 0.2
const EPSILON = 1e-9;

const isSameValue = (a: number, b: number): boolean => Math.abs(a - b) < EPSILON;

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
 * @cssprop {Length} --pharos-slider-option-max-width - The width at which option labels wrap, unless the slider is too narrow to fit them. Defaults to 5.5rem.
 *
 * @fires input - Fires when the value changes while the user is interacting with the slider
 * @fires change - Fires when the value has changed
 */
export class PharosSlider extends FormMixin(FormElement) {
  /**
   * The value of the slider. Clamped to the range and snapped to the nearest step,
   * defaulting to the midpoint of the range.
   * @attr value
   */
  @property({ type: Number, reflect: true })
  public value?: number;

  /**
   * The minimum value of the slider. Defaults to the lowest option value, or 0 without options.
   * @attr min
   */
  @property({ type: Number, reflect: true })
  public min?: number;

  /**
   * The maximum value of the slider. Defaults to the highest option value, or 100 without options.
   * @attr max
   */
  @property({ type: Number, reflect: true })
  public max?: number;

  /**
   * The granularity the value must adhere to.
   * @attr step
   */
  @property({ type: Number, reflect: true })
  public step?: number;

  /**
   * Formats the value announced by assistive technology when it does not match an option.
   */
  @property({ attribute: false })
  public valueFormatter?: (value: number) => string;

  @query('#input-element')
  private _input!: HTMLInputElement;

  private _defaultValue?: number;

  private _valueBeforeInteraction?: number;

  public static override get styles(): CSSResultArray {
    return [super.styles, sliderStyles];
  }

  protected override firstUpdated(): void {
    this._defaultValue = this.value;
  }

  private get _options(): PharosSliderOption[] {
    return [...this.children].filter((child) =>
      child.matches(_allOptionsSelector)
    ) as PharosSliderOption[];
  }

  private get _optionValues(): number[] {
    return this._options
      .map((option) => option.value)
      .filter((value): value is number => value != null);
  }

  private get _min(): number {
    const values = this._optionValues;
    return this.min ?? (values.length ? Math.min(...values) : DEFAULT_MIN);
  }

  private get _max(): number {
    const values = this._optionValues;
    return this.max ?? (values.length ? Math.max(...values) : DEFAULT_MAX);
  }

  protected override update(changedProperties: PropertyValues): void {
    this._validate();
    this.value = this._sanitize(this.value);
    super.update(changedProperties);
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    const min = this._min;
    const max = this._max;
    const options = this._options;
    options.forEach((option) => {
      const value = option.value as number;
      // Options at the ends of the track line up with its edges, all others center on their stop
      const anchor = isSameValue(value, min) ? 0 : isSameValue(value, max) ? 1 : 0.5;
      const align = ['left', 'center', 'right'][anchor * 2];

      option.selected = this.value !== undefined && isSameValue(value, this.value);
      option.style.setProperty(
        '--pharos-slider-option-position',
        String(this._position(value, min, max))
      );
      option.style.setProperty('--pharos-slider-option-anchor', String(anchor));
      option.style.setProperty('--pharos-slider-option-align', align);
      option.style.setProperty('--pharos-slider-option-count', String(options.length));
    });
  }

  private _handleSlotChange(): void {
    this.requestUpdate();
  }

  private _validate(): void {
    const { step } = this;
    const min = this._min;
    const max = this._max;

    if (step == null) {
      throw new Error(`step is a required attribute.`);
    }
    if (step <= 0) {
      throw new Error(`${step} is not a valid step. The step must be greater than 0.`);
    }
    if (min >= max) {
      throw new Error(`The min (${min}) must be less than the max (${max}).`);
    }

    const seen: number[] = [];
    this._options.forEach((option) => {
      const { value } = option;
      if (value == null) {
        throw new Error(`pharos-slider-option is missing its required value attribute.`);
      }
      if (value < min || value > max) {
        throw new Error(
          `${value} is not a valid option value. Option values must be between the min (${min}) and max (${max}).`
        );
      }
      const steps = (value - min) / step;
      if (!isSameValue(steps, Math.round(steps))) {
        throw new Error(
          `${value} is not a valid option value. Option values must fall on a step of ${step} from the min (${min}).`
        );
      }
      if (seen.some((seenValue) => isSameValue(seenValue, value))) {
        throw new Error(
          `${value} is not a valid option value. Each option must have a unique value.`
        );
      }
      seen.push(value);
    });
  }

  /**
   * Clamp a value to the range and snap it to the nearest step, matching how a native
   * range input sanitizes its value. Without a value, it defaults to the midpoint.
   */
  private _sanitize(value?: number): number {
    const min = this._min;
    const max = this._max;
    const step = this.step as number;

    const target = Math.min(Math.max(value ?? min + (max - min) / 2, min), max);
    // Ties round up, as they do natively
    let snapped = min + Math.round((target - min) / step) * step;
    if (snapped > max + EPSILON) {
      snapped -= step;
    }
    // Drop floating point noise, e.g. 0.30000000000000004
    return parseFloat(snapped.toPrecision(12));
  }

  private get _selectedOption(): PharosSliderOption | undefined {
    const { value } = this;
    return value === undefined
      ? undefined
      : this._options.find((option) => isSameValue(option.value as number, value));
  }

  /**
   * The position of a value along the track as a fraction from 0 to 1,
   * matching where the native range input places its thumb.
   */
  private _position(value: number, min: number, max: number): number {
    return (value - min) / (max - min);
  }

  private _handleInput(): void {
    if (this._valueBeforeInteraction === undefined) {
      this._valueBeforeInteraction = this.value;
    }
    this.value = Number(this._input.value);
  }

  private _handleChange(): void {
    const previousValue = this._valueBeforeInteraction ?? this.value;
    this._valueBeforeInteraction = undefined;
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
    this._valueBeforeInteraction = undefined;
    this._dispatchChange(previousValue);
  }

  private _dispatchChange(previousValue?: number): void {
    const notCancelled = this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          target: this._input, // pass the native range input in the event
        },
      })
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
    const options = this._options;
    const min = this._min;
    const max = this._max;
    const value = this.value as number;
    const selected = this._selectedOption;
    const valueText = selected
      ? [selected.label, selected.description].filter(Boolean).join(', ')
      : this.valueFormatter?.(value);

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
        min=${min}
        max=${max}
        step=${ifDefined(this.step)}
        .value=${live(String(value))}
        ?disabled=${this.disabled}
        aria-valuetext=${ifDefined(valueText)}
        aria-invalid=${this.invalidated}
        aria-describedby=${ifDefined(this.messageId)}
        style=${styleMap({ '--pharos-slider-fill': String(this._position(value, min, max)) })}
        @input=${this._handleInput}
        @change=${this._handleChange}
      />
      <div
        class=${classMap({ slider__options: true, 'slider__options--empty': !options.length })}
        aria-hidden="true"
        @click=${this._handleOptionClick}
      >
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
      ${this.messageContent}
    `;
  }
}
