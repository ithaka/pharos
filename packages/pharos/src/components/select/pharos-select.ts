import { html } from 'lit';
import { property, query } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { selectStyles } from './pharos-select.css';

import { FormElement } from '../base/form-element';
import FormMixin from '../../utils/mixins/form';
import ObserveChildrenMixin from '../../utils/mixins/observe-children';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosIcon } from '../icon/pharos-icon';

/**
 * Pharos select component.
 *
 * @tag pharos-select
 *
 * @slot label - Contains the label content.
 * @slot - Contains the available options for the select (the default slot).
 * @slot message - Contains message content to show below the select.
 *
 * @fires change - Fires when the value has changed
 */
export class PharosSelect extends ScopedRegistryMixin(
  ObserveChildrenMixin(FormMixin(FormElement))
) {
  static elementDefinitions = {
    'pharos-icon': PharosIcon,
  };

  /**
   * Indicates the value for the select.
   * @attr value
   */
  @property({ type: String, reflect: true })
  public value = '';

  @query('#select-element')
  private _select!: HTMLSelectElement;

  private get _options(): HTMLOptionElement[] {
    return [...this.children].filter(
      (child) => !child.slot && child instanceof HTMLOptionElement
    ) as HTMLOptionElement[];
  }

  public static override get styles(): CSSResultArray {
    return [super.styles, selectStyles];
  }

  protected override firstUpdated(): void {
    if (this.value && this._options.find((o) => o.value === this.value)) {
      this._select.value = this.value;
    } else {
      this._setOption();
    }
    this._options.forEach((option) => (option.defaultSelected = option.hasAttribute('selected')));
  }

  private _setOption(): void {
    // Set value to selected option
    const selected = (this.querySelector('option[selected]') ||
      this.querySelector('option:not([disabled])')) as HTMLOptionElement;
    this.value = selected?.value;
  }

  public onChange(): void {
    this.value = this._select.value;
    this.dispatchEvent(
      new Event('change', {
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleFormdata(event: CustomEvent): void {
    const { formData } = event;
    if (!this.disabled) {
      formData.append(this.name, this.value);
    }
  }

  _handleFormReset(): void {
    this._options.forEach((option) => (option.selected = option.defaultSelected));
    this._setOption();
  }

  protected override render(): TemplateResult {
    return html`
      <label for="select-element">
        <slot name="label"></slot>
        ${this.requiredIndicator}
      </label>
      <div class="select-wrapper">
        <select
          id="select-element"
          name=${this.name}
          .value=${this.value}
          ?required=${this.required}
          ?disabled=${this.disabled}
          aria-required=${this.required}
          aria-invalid=${this.invalidated}
          aria-describedby=${ifDefined(this.messageId)}
          @change=${this.onChange}
        >
          ${[...this.children]
            .filter((child) => !child.slot)
            .map((child) => {
              return html`${unsafeHTML(child.outerHTML)}`;
            })}
        </select>
        <pharos-icon class="select__icon" name="chevron-down" a11y-hidden="true"></pharos-icon>
      </div>
      ${this.messageContent}
    `;
  }
}
