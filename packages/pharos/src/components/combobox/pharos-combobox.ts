import { html, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import type { PropertyValues, TemplateResult, CSSResultArray } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { comboboxStyles } from './pharos-combobox.css';
import debounce from '../../utils/debounce';
import { highlightTextMatches } from '../../utils/highlightTextMatches';

import { FormElement } from '../base/form-element';
import FormMixin from '../../utils/mixins/form';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosIcon } from '../icon/pharos-icon';
import { PharosTooltip } from '../tooltip/pharos-tooltip';
import { PharosButton } from '../button/pharos-button';
import { loopWrapIndex } from '../../utils/math';

/**
 * Pharos combobox component.
 *
 * @tag pharos-combobox
 *
 * @slot label - Contains the label content.
 * @slot - Contains the available options for the combobox (the default slot).
 * @slot message - Contains message content to show below the input.
 *
 * @fires input - Fires when the value has changed via user input
 * @fires change - Fires when a selection has been made or cleared
 *
 * @cssprop {Color} --pharos-combobox-color-text-hover - Hovered combobox option font color.
 * @cssprop {Color} --pharos-combobox-color-text-selected - Selected combobox option font color.
 * @cssprop {Color} --pharos-combobox-color-icon-clear - Fill color for clear icon.
 * @cssprop {Color} --pharos-combobox-color-icon-dropdown - Fill color for dropdown icon.
 * @cssprop {Color} --pharos-combobox-color-icon-checkmark - Fill color for checkmark icon.
 * @cssprop {Color} --pharos-combobox-color-icon-focus - Fill color for focused icon.
 * @cssprop {Color} --pharos-combobox-size-height-list - Height of the dropdown list.
 * @cssprop {Color} --pharos-combobox-size-height-clear - Height of the clear button.
 */
export class PharosCombobox extends ScopedRegistryMixin(FormMixin(FormElement)) {
  static elementDefinitions = {
    'pharos-icon': PharosIcon,
    'pharos-tooltip': PharosTooltip,
    'pharos-button': PharosButton,
  };

  /**
   * Indicates the value for the input.
   * @attr value
   */
  @property({ type: String, reflect: true })
  public value = '';

  /**
   * Display text when input is empty
   * @attr placeholder
   */
  @property({ type: String, reflect: true })
  public placeholder = '';

  /**
   * Indicates if the dropdown is open.
   * @attr open
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  @property({ type: Boolean, reflect: true, attribute: 'search-mode' })
  public searchMode = false;

  /**
   * Use loose matching when comparing input value to options.
   * @attr looseMatch
   */
  @property({ type: Boolean, reflect: true, attribute: 'loose-match' })
  public looseMatch = false;

  /**
   * The list of options available in the combobox dropdown list
   * @readonly
   */
  @property({ attribute: false, reflect: false })
  public get options(): HTMLOptionElement[] {
    return [...this.children].filter((child) => !child.slot) as HTMLOptionElement[];
  }

  /**
   * The index of the selected option, if any
   * @readonly
   */
  @property({ attribute: false, reflect: false })
  public get selectedIndex(): number {
    return this.options.findIndex((o) => o.value === this.value);
  }

  @query('#input-element')
  private _input!: HTMLInputElement;

  @query('.combobox__button')
  private _button!: HTMLButtonElement;

  @state()
  private _displayValue = '';

  private _noResults = false;
  private _query = '';
  private _defaultValue = '';

  private _childrenObserver: MutationObserver = new MutationObserver(
    (mutationsList: MutationRecord[]) => {
      this.requestUpdate();

      if (
        mutationsList.some((record) =>
          [...record.addedNodes].some((node) => node instanceof HTMLOptionElement)
        )
      ) {
        this._setDisplayValue();
      }
    }
  );

  public static override get styles(): CSSResultArray {
    return [super.styles, comboboxStyles];
  }

  protected override firstUpdated(): void {
    this._setDisplayValue();
    this._input.defaultValue = this._displayValue;
    this._defaultValue = this.value;

    this._childrenObserver.observe(this, { subtree: true, childList: true });
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('open') && !this.open) {
      this._query = '';
      this._input.setAttribute('aria-activedescendant', '');
    }
    if (changedProperties.has('value')) {
      this._setDisplayValue();
    }
  }

  override disconnectedCallback(): void {
    this._childrenObserver.disconnect();
    super.disconnectedCallback && super.disconnectedCallback();
  }

  public onChange(event: Event): void {
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, detail: event }));
  }

  public onInput(): void {
    if (this.searchMode) {
      this.value = this._input.value;
    }

    this._displayValue = this._input.value;
    this._query = this._input.value;
    this.open = true;
  }

  private _renderList(): TemplateResult | typeof nothing {
    if (this.open) {
      const queryToCompare = this.looseMatch ? this._normalizeString(this._query) : this._query;
      const regex = new RegExp(queryToCompare, 'gi');
      const matchingOptions = this.options.filter((child) => {
        if (this.searchMode) {
          return child;
        }

        const childText = this.looseMatch ? this._normalizeString(child.text) : child.text;
        return childText.match(regex);
      });
      this._noResults = matchingOptions.length === 0;

      if (this.searchMode && !matchingOptions.length) {
        return html``;
      }

      return html`
        <ul aria-labelledby="input-label" role="listbox" id="combobox-list" class="combobox__list">
          ${matchingOptions.length
            ? matchingOptions.map((child, index) => {
                const option = child as HTMLOptionElement;
                const exactMatch = this.value === option.value;
                const highlightClass = exactMatch
                  ? 'combobox__mark combobox__mark--selected'
                  : 'combobox__mark';

                const optionText =
                  this._query && !this.searchMode
                    ? highlightTextMatches(option.text, regex, highlightClass)
                    : document.createTextNode(option.text);

                return html`
                  <li
                    id=${`result-item-${index}`}
                    class=${classMap({
                      [`combobox__option`]: true,
                      [`combobox__option--selected`]: exactMatch,
                      [`combobox__option--disabled`]: option.disabled,
                    })}
                    role="option"
                    aria-selected="false"
                    aria-disabled=${option.disabled}
                    aria-label=${option.text}
                    @click=${(event: Event) => this._handleOptionClick(option, event)}
                    @mousedown=${(event: MouseEvent) => {
                      event.preventDefault();
                    }}
                  >
                    ${optionText}
                    ${exactMatch && !this.searchMode
                      ? html`
                          <pharos-icon
                            class="combobox__option__icon"
                            name="checkmark"
                            a11y-hidden="true"
                          ></pharos-icon>
                        `
                      : nothing}
                  </li>
                `;
              })
            : html`<li class="combobox__option">No results found</li>`}
        </ul>
        <div aria-live="polite" role="status" class="visually-hidden">
          ${matchingOptions.length
            ? `${matchingOptions.length} results available.`
            : `No results found`}
        </div>
      `;
    }
    return nothing;
  }

  private _renderClearButton(): TemplateResult | typeof nothing {
    const classes = this.searchMode
      ? 'combobox__clear-button combobox__clear-button--search'
      : 'combobox__clear-button';
    if (this._displayValue) {
      return html`
        <pharos-button
          data-tooltip-id="clear-tooltip"
          type="button"
          class=${classes}
          variant="subtle"
          icon="close"
          ?disabled=${this.disabled}
          a11y-label="Clear option"
          @click=${this._handleClearClick}
          @mousedown=${this._handleClearClick}
        >
        </pharos-button>
        <pharos-tooltip id="clear-tooltip" placement="bottom">Clear option</pharos-tooltip>
      `;
    }
    return nothing;
  }

  private _renderIconButton(): TemplateResult {
    if (this.searchMode) {
      return html`
        <pharos-button
          icon="search"
          type="button"
          variant="subtle"
          class="search__button"
          a11y-label="Search"
          ?disabled=${this.disabled}
          @click=${this.onChange}
        ></pharos-button>
      `;
    } else {
      return html`
        <button
          tabindex="-1"
          type="button"
          class="combobox__button"
          aria-label="Dropdown"
          ?disabled=${this.disabled}
          @click=${this._handleButtonClick}
          @blur=${this._handleButtonBlur}
        >
          <pharos-icon class="combobox__icon" name="chevron-down" a11y-hidden="true"></pharos-icon>
        </button>
      `;
    }
  }

  private _handleOptionClick(option: HTMLOptionElement, event: Event): void {
    if (option.disabled) {
      event.preventDefault();
      return;
    }
    this.value = option.value;
    this._displayValue = option.text.trim();
    this.open = false;
    this.onChange(event);
  }

  private _closeDropdown(): void {
    debounce(() => {
      this.open = false;
    }, 100)();
  }

  private _handleButtonClick(event: MouseEvent): void {
    event.preventDefault();
    this._input.focus();
    this.open = true;
  }

  private _handleButtonBlur(event: FocusEvent): void {
    if (event.relatedTarget !== this._input) {
      this._closeDropdown();
    }
  }

  private _handleClearClick(event: MouseEvent): void {
    event.preventDefault();
    this._handleInputClear(event);
    this._input.focus();
  }

  private _handleInputBlur(event: FocusEvent): void {
    this._setDisplayValue(true);
    if (event.relatedTarget !== this._button) {
      this._closeDropdown();
    }
  }

  private _handleInputKeydown(event: KeyboardEvent): void {
    event.stopPropagation();

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        this._selectHighlightedOption(event);
        break;
      case 'Escape':
      case 'Esc':
        event.preventDefault();
        this._handleInputClear(event);
        break;
      case 'Down':
      case 'ArrowDown':
        event.preventDefault();
        this._handleNavigation(true);
        break;
      case 'Up':
      case 'ArrowUp':
        event.preventDefault();
        this._handleNavigation(false);
        break;
    }
  }

  private async _handleNavigation(moveForward: boolean): Promise<void> {
    if (!this.open) {
      this.open = true;
      await this.updateComplete;
    }

    if (this._noResults) {
      return;
    }

    const options: HTMLLIElement[] = Array.prototype.slice
      .call(this.renderRoot.querySelectorAll('.combobox__option'))
      .filter((option) => option.getAttribute('aria-disabled') !== 'true');
    const values = options.map((option) => option.innerText.trim());

    const highlightedOption = this.renderRoot.querySelector(
      '.combobox__option[highlighted]'
    ) as HTMLLIElement;

    const nextOptionIndex = loopWrapIndex(
      values,
      (v) => v === highlightedOption?.innerText.trim(),
      moveForward
    );
    highlightedOption?.removeAttribute('highlighted');
    highlightedOption?.setAttribute('aria-selected', 'false');

    const nextOption = options[nextOptionIndex];

    nextOption.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    nextOption.setAttribute('highlighted', '');
    nextOption.setAttribute('aria-selected', 'true');
    this._input.setAttribute('aria-activedescendant', nextOption.id);
  }

  private _selectHighlightedOption(event: Event): void {
    const highlightedOption = this.renderRoot.querySelector(
      '.combobox__option[highlighted]'
    ) as HTMLLIElement;

    if (highlightedOption) {
      highlightedOption.click();
    } else {
      this.open = false;
    }

    if (this.searchMode) {
      this.onChange(event);
    }
  }

  private _handleInputClear(event: Event): void {
    this.open = false;
    this.value = '';
    this._displayValue = '';
    this.onChange(event);
  }

  _handleFormdata(event: CustomEvent): void {
    const { formData } = event;
    if (!this.disabled) {
      formData.append(this.name, this.value);
    }
  }

  _handleFormReset(): void {
    this.value = this._defaultValue;
    this._displayValue = this._input.defaultValue;
  }

  private _setDisplayValue(blurred = false) {
    if (this.value && this.selectedIndex >= 0) {
      this._displayValue = this.options[this.selectedIndex].text.trim();
    } else if (this.value === '' && !blurred) {
      this._displayValue = '';
    }
  }

  private _handleInputClick(): void {
    this.open = !this.open;
  }

  /**
   * Normalizes a string in the following order:
   *
   * 1 - Applies https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
   *     with the 'NFKD' parameters for compatibility
   * 2 - Removes all diacritic characters using a global regex
   * 3 - Lower case all characters
   *
   */
  private _normalizeString(textString: string) {
    return textString
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  protected override render(): TemplateResult {
    return html`
      <label for="input-element" id="input-label">
        <slot name="label"></slot>
        ${this.requiredIndicator}
      </label>
      <div class="input-wrapper">
        <input
          id="input-element"
          class="input-element ${this._displayValue ? 'input-element--populated' : null}"
          name=${this.name}
          type="text"
          .value=${this._displayValue}
          ?required=${this.required}
          ?disabled=${this.disabled}
          placeholder=${this.placeholder}
          role="combobox"
          aria-expanded=${this.open}
          aria-controls="combobox-list"
          aria-autocomplete="list"
          aria-activedescendant=""
          aria-required=${this.required}
          aria-invalid=${this.invalidated}
          aria-describedby=${ifDefined(this.messageId)}
          @input=${this.onInput}
          @change=${this.onChange}
          @blur=${this._handleInputBlur}
          @keydown=${this._handleInputKeydown}
          @click=${this._handleInputClick}
        />
        ${this._renderClearButton()} ${this._renderIconButton()} ${this._renderList()}
      </div>
      ${this.messageContent}
    `;
  }
}
