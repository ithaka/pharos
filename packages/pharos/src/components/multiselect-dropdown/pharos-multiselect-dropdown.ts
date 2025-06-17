import { html, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { multiselectDropdownStyles } from './pharos-multiselect-dropdown.css';

import { FormElement } from '../base/form-element';
import FormMixin from '../../utils/mixins/form';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosIcon } from '../icon/pharos-icon';
import { PharosButton } from '../button/pharos-button';
import { loopWrapIndex } from '../../utils/math';
import { PharosCheckbox } from '../checkbox/pharos-checkbox';
import { PharosTextInput } from '../text-input/pharos-text-input';
import checkmarkSmall from '../../styles/icons/checkmark-small';
import dashSmall from '../../styles/icons/dash-small';

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
  @property({ type: Array })
  public selectedOptions: HTMLOptionElement[] = [];

  /**
   * How long the dropdown list should be displayed.
   * @attr displayCharacterCount
   */
  @property({
    type: Number,
    reflect: true,
    useDefault: false,
    attribute: 'display-character-count',
  })
  public displayCharacterCount: number = 40;

  /**
   * Use loose matching when comparing search value to options.
   * @attr looseMatch
   */
  @property({ type: Boolean, reflect: true, attribute: 'loose-match', useDefault: false })
  public looseMatch = false;

  /**
   * Add an option to select/deselect all options in the dropdown list.
   * @attr hideSelectAll
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-select-all' })
  public hideSelectAll = false;

  /**
   * The list of options available in the multiselect-dropdown dropdown list
   * @readonly
   */
  @property({ attribute: false, reflect: false })
  public get options(): HTMLOptionElement[] {
    return [...this.children].filter((child) => !child.slot) as HTMLOptionElement[];
  }

  @query('#button-element')
  private _dropdown_button!: HTMLButtonElement;

  @query('#multiselect-dropdown__search-input')
  private _searchInput!: HTMLInputElement;

  @query('#multiselect-dropdown-list')
  private _list!: HTMLInputElement;

  @state()
  private _searchValue = '';

  // Indicates whether the dropdown is currently open
  @state()
  private _open = false;

  // The currently selected (but not applied) options
  @state()
  private _pendingOptions: HTMLOptionElement[] = [];

  // The options that match the current search input
  @state()
  private _matchingOptions: HTMLOptionElement[] = [];

  // Flag set if combobox items have been scrolled below the top of the list
  @state()
  private _isScrolling = false;

  // An IntersectionObserver to monitor the scroll state of the dropdown list
  @state()
  private _scrollObserver: IntersectionObserver | null = null;

  public override firstUpdated(): void {
    this._setupScrollObserver();
    this.selectedOptions = this.options.filter((option) => option.selected);
    this._pendingOptions = [...this.selectedOptions];
  }

  public override updated(changedProperties: Map<string, any>): void {
    super.updated(changedProperties);
    if (changedProperties.has('_open')) {
      if (this._open) {
        this._updateScrollObserver();
        this._searchInput.focus();
      } else if (changedProperties.get('_open') === true) {
        // Only if the dropdown is closing, not on first render
        this._scrollObserver?.disconnect();
        this._dropdown_button.focus();
      }
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._teardownScrollObserver();
  }

  public onChange(): void {
    this.dispatchEvent(
      new Event('change', {
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Sets up the IntersectionObserver to monitor the scroll state of the dropdown list.
   * It toggles the `_isScrolling` state based on whether the first item
   * in the list is fully visible within the scrollable container (`this._list`).
   */
  private _setupScrollObserver(): void {
    if ('IntersectionObserver' in window) {
      this._scrollObserver = new IntersectionObserver(
        (entries) => {
          const firstItem = entries[0];
          if (firstItem) {
            this._isScrolling = !firstItem.isIntersecting;
          }
        },
        { root: this._list, threshold: 1 }
      );
    }
  }

  private _teardownScrollObserver(): void {
    if (this._scrollObserver) {
      this._scrollObserver.disconnect();
      this._scrollObserver = null;
    }
  }

  private _updateScrollObserver(): void {
    if (this._scrollObserver && this._list) {
      const firstOption = this._list.querySelector('.multiselect-dropdown__option');
      if (firstOption) {
        this._scrollObserver.observe(firstOption);
      }
    }
  }

  private _setHighlightedOption(id: string): void {
    const currentlyHighlightedOption = this.renderRoot.querySelector(
      '.multiselect-dropdown__option[highlighted]'
    ) as HTMLLIElement;
    if (currentlyHighlightedOption) {
      currentlyHighlightedOption.removeAttribute('highlighted');
    }

    const optionToHighlight = this.renderRoot.querySelector(
      `.multiselect-dropdown__option[id="${id}"]`
    ) as HTMLLIElement;
    optionToHighlight.setAttribute('highlighted', '');
    this._searchInput.setAttribute('aria-activedescendant', id);
  }

  public static override get styles(): CSSResultArray {
    return [super.styles, multiselectDropdownStyles];
  }

  private _handleSearchInput(): void {
    this._searchValue = this._searchInput.value;
  }

  private _handleOptionClick(option: HTMLOptionElement, event: Event): void {
    console.log('Option clicked:', option);
    if (option.disabled) {
      event.preventDefault();
      return;
    }
    this._setHighlightedOption((event.currentTarget as HTMLLIElement)?.id);

    if (this._pendingOptions.includes(option)) {
      this._pendingOptions = [
        ...this._pendingOptions.filter((pendingOption) => {
          return pendingOption !== option;
        }),
      ];
    } else {
      this._pendingOptions = [...this._pendingOptions, option];
    }
  }
  private _handleSelectAllClicked(): void {
    const selectAllOption = this.renderRoot.querySelector(
      '.multiselect-dropdown__select-all'
    ) as HTMLLIElement;

    this._setHighlightedOption(selectAllOption.id);

    if (selectAllOption.getAttribute('aria-selected') === 'true') {
      this._pendingOptions = [...this._pendingOptions].filter(
        (pendingOption) => !this._matchingOptions.includes(pendingOption)
      );
      selectAllOption.setAttribute('aria-selected', 'false');
    } else {
      const newOptions = this._matchingOptions.filter(
        (option) => !this._pendingOptions.includes(option)
      );
      this._pendingOptions = [...this._pendingOptions, ...newOptions];
      selectAllOption.setAttribute('aria-selected', 'true');
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
        this._closeDropdown();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this._handleComboboxNavigation(true);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this._handleComboboxNavigation(false);
        break;
    }
  }

  private async _handleComboboxNavigation(moveForward: boolean): Promise<void> {
    if (this._matchingOptions.length === 0) {
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

    const nextOption = options[nextOptionIndex];

    nextOption.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    this._setHighlightedOption(nextOption.id);
  }

  private _selectHighlightedOption(): void {
    const highlightedOption = this.renderRoot.querySelector(
      '.multiselect-dropdown__option[highlighted]'
    ) as HTMLLIElement;

    if (highlightedOption) {
      highlightedOption.click();
    }
  }

  _handleFormdata(event: CustomEvent): void {
    const { formData } = event;
    if (!this.disabled) {
      for (const option of this.selectedOptions) {
        formData.append(this.name, option.value);
      }
    }
  }

  _handleFormReset(): void {
    this.selectedOptions = this.options.filter((option) => option.selected);
    this._pendingOptions = [];
    this._searchValue = '';
  }

  private _getButtonDisplayText(): string {
    if (this.selectedOptions.length === 0) {
      return 'None Selected';
    }
    if (this.selectedOptions.length === this.options.length) {
      return 'All Selected';
    }
    const selectedOptionsText = this.selectedOptions.map((option) => option.text).join(', ');
    if (selectedOptionsText.length <= this.displayCharacterCount) {
      return selectedOptionsText;
    } else {
      return `${this.selectedOptions.length} Selected`;
    }
  }

  private _closeDropdown(): void {
    this._searchValue = '';
    this._open = false;
    this._dropdown_button.focus();
  }

  private _toggleDropdown(): void {
    if (this._open) {
      this._closeDropdown();
    } else {
      this._open = true;
    }
    this._pendingOptions = this.selectedOptions;
  }

  private _handleDropdownButtonClick(): void {
    if (this.disabled) {
      return;
    }
    this._toggleDropdown();
  }

  private _handleDropdownKeydown(event: KeyboardEvent): void {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    if (event.key === 'Enter' || event.key === 'Space') {
      this._handleDropdownButtonClick();
    }
  }

  private _handleApplyClick(): void {
    this.selectedOptions = [...this._pendingOptions];
    this._closeDropdown();
    this.onChange();
  }

  private _handleCancelClick(): void {
    this._pendingOptions = [];
    this._closeDropdown();
    this.onChange();
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

  /**
   * Renders the checkbox icon used in the dropdown options from an svg
   *
   * The checkboxes displayed next to each option in this component are purely
   * decorative and serve as visual indicators of selection state. They are not
   * interactive elements themselves, so we can't use the pharos-checkbox
   * component. Instead, we render the checkbox icon using a SVG (like
   * pharos-checkbox does internally) to ensure it is accessible and
   * styled correctly.
   * */
  private _renderCheckboxIcon(
    checked: boolean = false,
    indeterminate: boolean = false
  ): TemplateResult | typeof nothing {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        class="input__icon"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" class="focus"></rect>
        <rect x="4" y="4" width="16" height="16" rx="2" class="box"></rect>
        <rect x="5" y="5" width="14" height="14" rx="1" class="hover"></rect>
        <svg
          x="4"
          y="4"
          class=${classMap({
            [`checkmark`]: checked,
            [`dash`]: indeterminate,
          })}
        >
          ${unsafeSVG(indeterminate ? atob(dashSmall) : atob(checkmarkSmall))}
        </svg>
      </svg>
    `;
  }

  private _renderDropdownPanel(): TemplateResult | typeof nothing {
    if (!this._open) {
      return nothing;
    }

    const queryToCompare = this.looseMatch
      ? this._normalizeString(this._searchValue)
      : this._searchValue;
    const regex = new RegExp(queryToCompare, 'gi');
    this._matchingOptions = this.options.filter((child) => {
      const childText = this.looseMatch ? this._normalizeString(child.text) : child.text;
      return childText.match(regex);
    });

    const allMatchingSelected: boolean =
      this._matchingOptions.length > 0 &&
      this._matchingOptions.every((option) => this._pendingOptions.includes(option));

    const allMatchingIndeterminate: boolean =
      this._pendingOptions.length > 0 &&
      !allMatchingSelected &&
      this._matchingOptions.some((option) => this._pendingOptions.includes(option));

    const selectAllText = allMatchingSelected
      ? `Deselect ${this._matchingOptions.length}`
      : `Select all ${this._matchingOptions.length}`;

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
          <div
            class=${classMap({
              'multiselect-dropdown__search-input-wrapper': true,
              'multiselect-dropdown__search-input-wrapper--scrolling': this._isScrolling,
            })}
          >
            <input
              id="multiselect-dropdown__search-input"
              class=${classMap({
                'multiselect-dropdown__search-input': true,
                'multiselect-dropdown__search-input--populated': this._searchValue.length > 0,
              })}
              name="${this.name}"
              type="text"
              .value="${this._searchValue}"
              role="combobox"
              aria-expanded="${true}"
              aria-controls="multiselect-dropdown-list"
              aria-autocomplete="list"
              aria-activedescendant=""
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
            aria-multiselectable="true"
            role="listbox"
            tabindex="-1"
            id="multiselect-dropdown-list"
            class="multiselect-dropdown__list"
          >
            ${this._matchingOptions.length > 1 && !this.hideSelectAll
              ? html`<li
                  class="multiselect-dropdown__option multiselect-dropdown__select-all"
                  id="result-item-select-all"
                  role="option"
                  aria-selected="${allMatchingSelected}"
                  aria-label="${selectAllText}"
                  @click=${this._handleSelectAllClicked}
                  @mousedown=${(event: MouseEvent) => {
                    // Prevent stealing focus from the input
                    event.preventDefault();
                  }}
                >
                  <div
                    class=${classMap({
                      [`multiselect-dropdown__option-checkmark-wrapper`]: true,
                      [`multiselect-dropdown__option-checkmark-wrapper--checked`]:
                        allMatchingSelected,
                      [`multiselect-dropdown__option-checkmark-wrapper--indeterminate`]:
                        allMatchingIndeterminate,
                    })}
                  >
                    ${this._renderCheckboxIcon(allMatchingSelected, allMatchingIndeterminate)}
                  </div>
                  <div class="multiselect-dropdown__option-label">${selectAllText}</div>
                </li>`
              : nothing}
            ${this._matchingOptions.length
              ? this._matchingOptions.map((child, index) => {
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

                  const isSelected = this._pendingOptions.includes(option);
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
                      @mousedown=${(event: MouseEvent) => {
                        // Prevent stealing focus from the input
                        event.preventDefault();
                      }}
                    >
                      <div
                        class=${classMap({
                          [`multiselect-dropdown__option-checkmark-wrapper`]: true,
                          [`multiselect-dropdown__option-checkmark-wrapper--checked`]: isSelected,
                        })}
                      >
                        ${this._renderCheckboxIcon(isSelected)}
                      </div>
                      <div class="multiselect-dropdown__option-label">
                        ${unsafeHTML(optionText)}
                      </div>
                    </li>
                  `;
                })
              : html`<li class="multiselect-dropdown__no-options">No results found</li>`}
          </ul>
          <div aria-live="polite" role="status" class="multiselect-dropdown__aria-live-container">
            ${this._matchingOptions.length
              ? `${this._matchingOptions.length} results available.`
              : `No results found`}
          </div>
        </div>
        <div class="multiselect-dropdown__button-container">
          <pharos-button
            type="button"
            id="cancel-button"
            variant="secondary"
            @click=${this._handleCancelClick}
            @keydown=${(event: KeyboardEvent) => {
              if (event.key === 'Escape' || event.key === 'Esc') {
                this._closeDropdown();
              }
            }}
          >
            Cancel
          </pharos-button>
          <pharos-button
            type="button"
            id="apply-button"
            variant="primary"
            @click=${this._handleApplyClick}
            @keydown=${(event: KeyboardEvent) => {
              if (event.key === 'Escape' || event.key === 'Esc') {
                this._closeDropdown();
              }
            }}
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
        <div id="button-label" class="multiselect-dropdown__button-label">
          <slot name="label"></slot>
        </div>
        <button
          id="button-element"
          class="multiselect-dropdown__button"
          ?disabled="${this.disabled}"
          aria-labelledby="button-label button-element"
          aria-expanded="${this._open}"
          aria-haspopup="true"
          aria-describedby="${ifDefined(this.messageId)}"
          type="button"
          @click=${this._handleDropdownButtonClick}
          @keydown=${this._handleDropdownKeydown}
        >
          ${this._getButtonDisplayText()}
          <pharos-icon
            name="chevron-down"
            a11y-hidden="true"
            class="multiselect-dropdown__icon"
          ></pharos-icon>
        </button>
        ${this._renderDropdownPanel()}
      </div>
      ${this.messageContent}
    `;
  }
}
