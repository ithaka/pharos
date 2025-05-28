import { html, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import type { PropertyValues, TemplateResult, CSSResultArray } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { multiselectDropdownStyles } from './pharos-multiselect-dropdown.css';
// import debounce from '../../utils/debounce';

import { FormElement } from '../base/form-element';
import FormMixin from '../../utils/mixins/form';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosIcon } from '../icon/pharos-icon';
import { PharosTooltip } from '../tooltip/pharos-tooltip';
import { PharosButton } from '../button/pharos-button';
import { loopWrapIndex } from '../../utils/math';
import { PharosCheckbox } from '../checkbox/pharos-checkbox';
import { PharosTextInput } from '../text-input/pharos-text-input';

/**
 * Pharos multiselect-dropdown component.
 *
 * @tag pharos-multiselect-dropdown
 *
 * @slot label - Contains the label content.
 * @slot - Contains the available options for the multiselect-dropdown (the default slot).
 * @slot message - Contains message content to show below the input.
 *
 * @fires input - Fires when the value has changed via user input
 * @fires change - Fires when a selection has been made or cleared
 *
 * @cssprop {Color} --pharos-multiselect-dropdown-color-text-hover - Hovered multiselect-dropdown option font color.
 * @cssprop {Color} --pharos-multiselect-dropdown-color-text-selected - Selected multiselect-dropdown option font color.
 * @cssprop {Color} --pharos-multiselect-dropdown-color-icon-clear - Fill color for clear icon.
 * @cssprop {Color} --pharos-multiselect-dropdown-color-icon-dropdown - Fill color for dropdown icon.
 * @cssprop {Color} --pharos-multiselect-dropdown-color-icon-checkmark - Fill color for checkmark icon.
 * @cssprop {Color} --pharos-multiselect-dropdown-color-icon-focus - Fill color for focused icon.
 * @cssprop {Color} --pharos-multiselect-dropdown-size-height-list - Height of the dropdown list.
 * @cssprop {Color} --pharos-multiselect-dropdown-size-height-clear - Height of the clear button.
 */
export class PharosMultiselectDropdown extends ScopedRegistryMixin(FormMixin(FormElement)) {
  static elementDefinitions = {
    'pharos-icon': PharosIcon,
    'pharos-tooltip': PharosTooltip,
    'pharos-button': PharosButton,
    'pharos-checkbox': PharosCheckbox,
    'pharos-text-input': PharosTextInput,
  };

  /**
   * Contains the currently selected options.
   * @attr selectedOptions
   */
  @property({ type: Array, reflect: true })
  public selectedOptions: String[] = [];

  /**
   * How long the dropdown list should be displayed.
   * @attr displayCharacterCount
   */
  @property({ type: Number, reflect: true })
  public displayCharacterCount: number = 40;
  /**
   * Indicates the value for the input.
   * @attr value
   */
  @property({ type: String, reflect: true })
  public searchValue = '';

  /**
   * Display text when input is empty
   * @attr placeholder
   */
  @property({ type: String, reflect: true })
  public placeholder = '';

  /**
   * Use loose matching when comparing input value to options.
   * @attr looseMatch
   */
  @property({ type: Boolean, reflect: true, attribute: 'loose-match' })
  public looseMatch = false;

  /**
   * The list of options available in the multiselect-dropdown dropdown list
   * @readonly
   */
  @property({ attribute: false, reflect: false })
  public get options(): HTMLOptionElement[] {
    return [...this.children].filter((child) => !child.slot) as HTMLOptionElement[];
  }

  @query('#input-element')
  private _input!: HTMLInputElement;

  // @query('.multiselect-dropdown__button')
  // private _button!: HTMLButtonElement;

  @state()
  private _noResults = false;
  private _query = '';
  private _defaultValue = '';

  @state()
  private _open = false;

  @state()
  private pendingOptions: String[] = [];

  @state()
  private matchingOptions: HTMLOptionElement[] = [];

  // private _childrenObserver: MutationObserver = new MutationObserver(
  //   (mutationsList: MutationRecord[]) => {
  //     this.requestUpdate();
  //   }
  // );

  public static override get styles(): CSSResultArray {
    return [super.styles, multiselectDropdownStyles];
  }

  protected override firstUpdated(): void {
    // this._input.defaultValue = this._displayValue;
    this._defaultValue = this.searchValue;

    // this._childrenObserver.observe(this, { subtree: true, childList: true });
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    // if (changedProperties.has('value')) {
    //   // this._setDisplayValue();
    // }
  }

  // override disconnectedCallback(): void {
  // this._childrenObserver.disconnect();
  //   super.disconnectedCallback && super.disconnectedCallback();
  // }

  public onChange(event: Event): void {
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, detail: event }));
  }

  public onInput(): void {
    this.searchValue = this._input.value;
    this._query = this._input.value;
  }

  private _renderList(): TemplateResult | typeof nothing {
    const queryToCompare = this.looseMatch ? this._normalizeString(this._query) : this._query;
    const regex = new RegExp(queryToCompare, 'gi');
    this.matchingOptions = this.options.filter((child) => {
      const childText = this.looseMatch ? this._normalizeString(child.text) : child.text;
      return childText.match(regex);
    });
    this._noResults = this.matchingOptions.length === 0;

    // if (this.searchMode && !matchingOptions.length) {
    //   return html``;
    // }

    const allMatchingSelected =
      this.matchingOptions.length > 0 &&
      this.matchingOptions.every((option) => this.pendingOptions.includes(option.text.trim()));

    return html`
      <ul
        aria-labelledby="input-label"
        role="listbox"
        id="multiselect-dropdown-list"
        class="multiselect-dropdown__list"
      >
        <li
          class=${classMap({
            'multiselect-dropdown__option': true,
            'multiselect-dropdown__selectall': true,
          })}
          role="option"
          aria-selected="${allMatchingSelected}"
          aria-label="Select/Deselect All"
        >
          <pharos-checkbox
            class="multiselect-dropdown__option__checkbox"
            @click=${(event: Event) => this._handleSelectAllClick(event)}
            ?checked=${allMatchingSelected}
            ?indeterminate="${this.pendingOptions.length > 0 &&
            !allMatchingSelected &&
            this.matchingOptions.some((option) =>
              this.pendingOptions.includes(option.text.trim())
            )}"
          >
            <span slot="label">Select/Deselect All</span>
          </pharos-checkbox>
        </li>
        ${this.matchingOptions.length
          ? this.matchingOptions.map((child, index) => {
              const option = child as HTMLOptionElement;
              const exactMatch = this.searchValue === option.value;

              const optionText = this._query
                ? option.text.replace(regex, (str) => {
                    const classes = exactMatch
                      ? 'multiselect-dropdown__mark multiselect-dropdown__mark--selected'
                      : 'multiselect-dropdown__mark';

                    return `<mark class="${classes}">${str}</mark>`;
                  })
                : option.text;

              const isSelected = this.pendingOptions.includes(option.text.trim());
              return html`
                <li
                  id="${`result-item-${index}`}"
                  class=${classMap({
                    [`multiselect-dropdown__option`]: true,
                    [`multiselect-dropdown__option--selected`]: isSelected,
                    [`multiselect-dropdown__option--disabled`]: option.disabled,
                  })}
                  role="option"
                  aria-selected="${isSelected}"
                  aria-disabled="${option.disabled}"
                  aria-label="${option.text}"
                  @click=${(event: Event) => this._handleOptionClick(option, event)}
                  @keydown=${(event: KeyboardEvent) => {
                    if (event.key === 'space') {
                      this._handleOptionClick(option, event);
                    }
                  }}
                  @mousedown=${(event: MouseEvent) => {
                    event.preventDefault();
                  }}
                >
                  ${html`
                    <pharos-checkbox
                      class="multiselect-dropdown__option__checkbox"
                      ?checked=${isSelected}
                    >
                      <span slot="label">${unsafeHTML(optionText)} </span>
                    </pharos-checkbox>
                  `}
                </li>
              `;
            })
          : html`<li class="multiselect-dropdown__option">No results found</li>`}
      </ul>
      <div aria-live="polite" role="status" class="visually-hidden">
        ${this.matchingOptions.length
          ? `${this.matchingOptions.length} results available.`
          : `No results found`}
      </div>
    `;
  }

  private _renderClearButton(): TemplateResult | typeof nothing {
    const classes = 'multiselect-dropdown__clear-button multiselect-dropdown__clear-button--search';
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
  }

  private _handleDropdownButtonClick(): void {
    if (this._open) {
      this._open = false;
      this.searchValue = '';
    } else {
      this._open = true;
    }
    this.pendingOptions = this.selectedOptions;
  }

  private _handleOptionClick(option: HTMLOptionElement, event: Event): void {
    if (option.disabled) {
      event.preventDefault();
      return;
    }

    if (this.pendingOptions.includes(option.text.trim())) {
      this.pendingOptions = [
        ...this.pendingOptions.filter((pendingOption) => {
          return pendingOption !== option.text.trim();
        }),
      ];
    } else {
      this.pendingOptions = [...this.pendingOptions, option.text.trim()];
    }
    this.onChange(event);
  }
  private _handleSelectAllClick(event: Event): void {
    const selectAllCheckbox = event.target as HTMLInputElement;
    if (!selectAllCheckbox.checked) {
      this.pendingOptions = [
        ...this.pendingOptions,
        ...this.matchingOptions.map((option) => option.text.trim()),
      ];
    } else {
      this.pendingOptions = [...this.pendingOptions].filter(
        (pendingOption) =>
          !this.matchingOptions.some((option) => option.text.trim() === pendingOption)
      );
    }
    this.onChange(event);
  }

  // private _handleClearClick(event: MouseEvent): void {
  //   event.preventDefault();
  //   this._handleInputClear(event);
  //   this._input.focus();
  // }

  // private _handleInputBlur(): void {
  //   this._setDisplayValue(true);
  // }

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
    if (this._noResults) {
      return;
    }

    const options: HTMLLIElement[] = Array.prototype.slice
      .call(this.renderRoot.querySelectorAll('.multiselect-dropdown__option'))
      .filter((option) => option.getAttribute('aria-disabled') !== 'true');
    const values = options.map((option) => option.innerText.trim());

    const highlightedOption = this.renderRoot.querySelector(
      '.multiselect-dropdown__option[highlighted]'
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
      '.multiselect-dropdown__option[highlighted]'
    ) as HTMLLIElement;

    if (highlightedOption) {
      highlightedOption.click();
    }

    // if (this.searchMode) {
    this.onChange(event);
    // }
  }

  private _handleInputClear(event: Event): void {
    this.searchValue = '';
    this.onChange(event);
  }

  _handleFormdata(event: CustomEvent): void {
    const { formData } = event;
    if (!this.disabled) {
      formData.append(this.name, this.selectedOptions.join(','));
    }
  }

  _handleFormReset(): void {
    this.value = this._defaultValue;
    this._displayValue = this._input.defaultValue;
  }

  _getButtonDisplayText(): string {
    if (this.selectedOptions.length === 0) {
      return 'None Selected';
    }
    if (this.selectedOptions.length === this.options.length) {
      return 'All Selected';
    }
    const selectedOptionsText = this.selectedOptions.join(', ');
    if (selectedOptionsText.length <= this.displayCharacterCount) {
      return selectedOptionsText;
    } else {
      return `${this.selectedOptions.length} Selected`;
    }
  }

  _handleApplyClick(): void {
    this.selectedOptions = [...this.pendingOptions];
    this._open = false;
    this.searchValue = '';
    this._query = '';
  }

  _handleCancelClick(): void {
    this.pendingOptions = [];
    this._open = false;
    this.searchValue = '';
    this._query = '';
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

  protected renderInternal(): TemplateResult | typeof nothing {
    if (!this._open) {
      return nothing;
    }
    return html`
      <div class="multiselect-dropdown__input-container">
        <label for="input-element" id="input-label">
          <slot name="label"></slot>
          ${this.requiredIndicator}
        </label>
        <div class="input-wrapper">
          <input
            id="input-element"
            class="input-element ${this._displayValue ? 'input-element--populated' : null}"
            name="${this.name}"
            type="text"
            .value="${this.searchValue}"
            ?required="${this.required}"
            ?disabled="${this.disabled}"
            placeholder="${this.placeholder}"
            role="combobox"
            aria-expanded="${true}"
            aria-controls="multiselect-dropdown-list"
            aria-autocomplete="list"
            aria-activedescendant=""
            aria-required="${this.required}"
            aria-invalid="${this.invalidated}"
            aria-describedby="${ifDefined(this.messageId)}"
            @input=${this.onInput}
            @change=${this.onChange}
            @blur=${this._handleInputBlur}
            @keydown=${this._handleInputKeydown}
            @click=${this._handleInputClick}
          />
          ${this._renderClearButton()} ${this._renderIconButton()} ${this._renderList()}
        </div>
        ${this.messageContent}
        <div class="multiselect-dropdown__button-container" style="margin-top:16rem;">
          <pharos-button
            type="button"
            variant="secondary"
            @click=${this._handleCancelClick}
            @mousedown=${this._handleCancelClick}
          >
            Cancel
          </pharos-button>
          <pharos-button
            type="button"
            variant="primary"
            @click=${this._handleApplyClick}
            @mousedown=${this._handleApplyClick}
          >
            Apply
          </pharos-button>
        </div>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="multiselect-dropdown">
        <pharos-button
          variant="secondary"
          icon-right="chevron-down"
          @click=${this._handleDropdownButtonClick}
        >
          ${this._getButtonDisplayText()}
        </pharos-button>
        ${this.renderInternal()}
      </div>
    `;
  }
}
