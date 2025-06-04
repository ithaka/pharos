import { html, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { multiselectDropdownStyles } from './pharos-multiselect-dropdown.css';

import { FormElement } from '../base/form-element';
import FormMixin from '../../utils/mixins/form';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosIcon } from '../icon/pharos-icon';
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

  @query('#multiselect-dropdown__search-input')
  private _input!: HTMLInputElement;

  @state()
  private _searchValue = '';

  // Indicates whether the dropdown is currently open
  @state()
  private _open = false;

  // The currently selected (but not applied) options
  @state()
  private pendingOptions: String[] = [];

  // The options that match the current search input
  @state()
  private matchingOptions: HTMLOptionElement[] = [];

  public static override get styles(): CSSResultArray {
    return [super.styles, multiselectDropdownStyles];
  }

  private _handleSearchInput(): void {
    this._searchValue = this._input.value;
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
  }
  private _handleSelectAllClicked(event: Event): void {
    const selectAllCheckbox = event.target as PharosCheckbox;

    if (!selectAllCheckbox.checked) {
      const matchingOptionTexts = this.matchingOptions.map((option) => option.text.trim());
      const newOptions = matchingOptionTexts.filter(
        (optionText) => !this.pendingOptions.includes(optionText)
      );
      this.pendingOptions = [...this.pendingOptions, ...newOptions];
    } else {
      this.pendingOptions = [...this.pendingOptions].filter(
        (pendingOption) =>
          !this.matchingOptions.some((option) => option.text.trim() === pendingOption)
      );
    }
  }

  private _handleSearchInputKeydown(event: KeyboardEvent): void {
    event.stopPropagation();

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        this._selectHighlightedOption();
        break;
      case 'Escape':
      case 'Esc':
        event.preventDefault();
        this._handleInputClear();
        break;
      case 'Down':
      case 'ArrowDown':
        event.preventDefault();
        this._handleComboboxNavigation(true);
        break;
      case 'Up':
      case 'ArrowUp':
        event.preventDefault();
        this._handleComboboxNavigation(false);
        break;
    }
  }

  private async _handleComboboxNavigation(moveForward: boolean): Promise<void> {
    if (this.matchingOptions.length === 0) {
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

  private _selectHighlightedOption(): void {
    const highlightedOption = this.renderRoot.querySelector(
      '.multiselect-dropdown__option[highlighted]'
    ) as HTMLLIElement;

    if (highlightedOption) {
      highlightedOption.click();
    }
  }

  private _handleInputClear(): void {
    this._searchValue = '';
  }

  _handleFormdata(event: CustomEvent): void {
    const { formData } = event;
    if (!this.disabled) {
      formData.append(this.name, this.selectedOptions.join(','));
    }
  }

  _handleFormReset(): void {
    this.selectedOptions = [];
    this.pendingOptions = [];
    this._searchValue = '';
  }

  private _getButtonDisplayText(): string {
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

  // Dropdown handlers
  private _closeDropdown(): void {
    this._searchValue = '';
    this._open = false;
  }

  private _handleDropdownButtonClick(): void {
    if (this._open) {
      this._closeDropdown();
    } else {
      this._open = true;
    }
    this.pendingOptions = this.selectedOptions;
  }

  // Control button handlers
  private _handleApplyClick(): void {
    this.selectedOptions = [...this.pendingOptions];
    this._closeDropdown();
  }

  private _handleCancelClick(): void {
    this.pendingOptions = [];
    this._closeDropdown();
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

  // private _renderList(): TemplateResult | typeof nothing {
  //   const queryToCompare = this.looseMatch
  //     ? this._normalizeString(this._searchValue)
  //     : this._searchValue;
  //   const regex = new RegExp(queryToCompare, 'gi');
  //   this.matchingOptions = this.options.filter((child) => {
  //     const childText = this.looseMatch ? this._normalizeString(child.text) : child.text;
  //     return childText.match(regex);
  //   });

  //   const allMatchingSelected =
  //     this.matchingOptions.length > 0 &&
  //     this.matchingOptions.every((option) => this.pendingOptions.includes(option.text.trim()));

  //   const allMatchingIndeterminate =
  //     this.pendingOptions.length > 0 &&
  //     !allMatchingSelected &&
  //     this.matchingOptions.some((option) => this.pendingOptions.includes(option.text.trim()));

  //   const selectAllText = allMatchingSelected
  //     ? `Deselect ${this.matchingOptions.length}`
  //     : `Select all ${this.matchingOptions.length}`;
  //   return html`
  //     <ul
  //       aria-labelledby="input-label"
  //       role="combobox"
  //       id="multiselect-dropdown-list"
  //       class="multiselect-dropdown__list"
  //     >
  //       ${this.matchingOptions.length > 1
  //         ? html`<li
  //             class=${classMap({
  //               'multiselect-dropdown__option': true,
  //               'multiselect-dropdown__select-all': true,
  //             })}
  //             role="option"
  //             aria-selected="${allMatchingSelected}"
  //           >
  //             <pharos-checkbox
  //               class="multiselect-dropdown__option__checkbox"
  //               @click=${(event: Event) => this._handleSelectAllClicked(event)}
  //               ?checked=${allMatchingSelected}
  //               ?indeterminate="${allMatchingIndeterminate}"
  //             >
  //               <span slot="label"> ${selectAllText} </span>
  //             </pharos-checkbox>
  //           </li>`
  //         : nothing}
  //       ${this.matchingOptions.length
  //         ? this.matchingOptions.map((child, index) => {
  //             const option = child as HTMLOptionElement;
  //             const exactMatch = this._searchValue === option.value;

  //             const optionText = this._searchValue
  //               ? option.text.replace(regex, (str) => {
  //                   const classes = exactMatch
  //                     ? 'multiselect-dropdown__mark multiselect-dropdown__mark--selected'
  //                     : 'multiselect-dropdown__mark';

  //                   return `<mark class="${classes}">${str}</mark>`;
  //                 })
  //               : option.text;

  //             const isSelected = this.pendingOptions.includes(option.text.trim());
  //             return html`
  //               <li
  //                 id="${`result-item-${index}`}"
  //                 class=${classMap({
  //                   [`multiselect-dropdown__option`]: true,
  //                   [`multiselect-dropdown__option--selected`]: isSelected,
  //                   [`multiselect-dropdown__option--disabled`]: option.disabled,
  //                 })}
  //                 role="option"
  //                 aria-selected="${isSelected}"
  //                 aria-disabled="${option.disabled}"
  //                 aria-label="${option.text}"
  //                 @click=${(event: Event) => this._handleOptionClick(option, event)}
  //                 @keydown=${(event: KeyboardEvent) => {
  //                   if (event.key === 'space') {
  //                     this._handleOptionClick(option, event);
  //                   }
  //                 }}
  //                 @mousedown=${(event: MouseEvent) => {
  //                   event.preventDefault();
  //                 }}
  //               >
  //                 ${html`
  //                   <pharos-checkbox
  //                     class="multiselect-dropdown__option__checkbox"
  //                     ?checked=${isSelected}
  //                   >
  //                     <span slot="label">${unsafeHTML(optionText)} </span>
  //                   </pharos-checkbox>
  //                 `}
  //               </li>
  //             `;
  //           })
  //         : html`<li class="multiselect-dropdown__option">No results found</li>`}
  //     </ul>
  //     <div aria-live="polite" role="status" class="visually-hidden">
  //       ${this.matchingOptions.length
  //         ? `${this.matchingOptions.length} results available.`
  //         : `No results found`}
  //     </div>
  //   `;
  // }

  private renderDropdownPanel(): TemplateResult | typeof nothing {
    if (!this._open) {
      return nothing;
    }

    const queryToCompare = this.looseMatch
      ? this._normalizeString(this._searchValue)
      : this._searchValue;
    const regex = new RegExp(queryToCompare, 'gi');
    this.matchingOptions = this.options.filter((child) => {
      const childText = this.looseMatch ? this._normalizeString(child.text) : child.text;
      return childText.match(regex);
    });

    const allMatchingSelected =
      this.matchingOptions.length > 0 &&
      this.matchingOptions.every((option) => this.pendingOptions.includes(option.text.trim()));

    const allMatchingIndeterminate =
      this.pendingOptions.length > 0 &&
      !allMatchingSelected &&
      this.matchingOptions.some((option) => this.pendingOptions.includes(option.text.trim()));

    const selectAllText = allMatchingSelected
      ? `Deselect ${this.matchingOptions.length}`
      : `Select all ${this.matchingOptions.length}`;

    return html`
      <div class="multiselect-dropdown__input-wrapper">
        <div class="multiselect-dropdown__input-container">
          <label
            for="multiselect-dropdown__search-input"
            class="multiselect-dropdown__search-input-label"
            id="input-label"
          >
            <slot name="label"></slot>
          </label>
          <div class="multiselect-dropdown__search-input-wrapper">
            <input
              id="multiselect-dropdown__search-input"
              class="multiselect-dropdown__search-input ${this._displayValue
                ? 'multiselect-dropdown__search-input--populated'
                : null}"
              name="${this.name}"
              type="text"
              .value="${this._searchValue}"
              role="listbox"
              aria-expanded="${true}"
              aria-controls="multiselect-dropdown-list"
              aria-autocomplete="list"
              aria-activedescendant=""
              aria-describedby="${ifDefined(this.messageId)}"
              @input=${this._handleSearchInput}
              @keydown=${this._handleSearchInputKeydown}
            />
            <pharos-icon
              class="multiselect-dropdown__search-icon"
              name="search"
              a11y-title="Search"
            ></pharos-icon>
          </div>
          <ul
            aria-labelledby="input-label"
            role="combobox"
            id="multiselect-dropdown-list"
            class="multiselect-dropdown__list"
          >
            ${this.matchingOptions.length > 1
              ? html`<li
                  class=${classMap({
                    'multiselect-dropdown__option': true,
                    'multiselect-dropdown__select-all': true,
                  })}
                  role="option"
                  aria-selected="${allMatchingSelected}"
                >
                  <pharos-checkbox
                    class="multiselect-dropdown__option__checkbox"
                    @click=${(event: Event) => this._handleSelectAllClicked(event)}
                    @keydown=${(event: KeyboardEvent) => {
                      if (event.key === 'space') {
                        this._handleSelectAllClicked(event);
                      }
                    }}
                    ?checked=${allMatchingSelected}
                    ?indeterminate="${allMatchingIndeterminate}"
                  >
                    <span slot="label"> ${selectAllText} </span>
                  </pharos-checkbox>
                </li>`
              : nothing}
            ${this.matchingOptions.length
              ? this.matchingOptions.map((child, index) => {
                  const option = child as HTMLOptionElement;
                  const exactMatch = this._searchValue === option.value;

                  const optionText = this._searchValue
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
        </div>
        <div class="multiselect-dropdown__button-container">
          <pharos-button type="button" variant="secondary" @click=${this._handleCancelClick}>
            Cancel
          </pharos-button>
          <pharos-button type="button" variant="primary" @click=${this._handleApplyClick}>
            Apply
          </pharos-button>
        </div>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="multiselect-dropdown">
        <span id="button-label" class="multiselect-dropdown__button-label">
          <slot name="label"></slot>
        </span>
        <button
          id="button-element"
          class="multiselect-dropdown__button"
          aria-labelledby="button-label"
          aria-expanded="${this._open}"
          aria-haspopup="true"
          type="button"
          @click=${this._handleDropdownButtonClick}
        >
          ${this._getButtonDisplayText()}
          <pharos-icon
            name="chevron-down"
            a11y-hidden="true"
            class="multiselect-dropdown__icon"
          ></pharos-icon>
        </button>
        ${this.renderDropdownPanel()}
      </div>
    `;
  }
}
