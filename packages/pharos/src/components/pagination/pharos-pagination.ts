import { PharosElement } from '../base/pharos-element';
import { html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { paginationStyles } from './pharos-pagination.css';

import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosIcon } from '../icon/pharos-icon';
import { PharosLink } from '../link/pharos-link';

const VARIANTS = ['default', 'input'] as const;
export type PaginationVariant = (typeof VARIANTS)[number];

/**
 * Pharos pagination component.
 *
 * @tag pharos-pagination
 *
 * @fires first-page - Fires when the first page link is clicked
 * @fires prev-page - Fires when the previous page link is clicked
 * @fires next-page - Fires when the next page link is clicked
 * @fires last-page - Fires when the last page link is clicked
 * @fires page-input - Fires when a page number is submitted in the input variant
 */
export class PharosPagination extends ScopedRegistryMixin(PharosElement) {
  private static _inputIdCounter = 0;

  static elementDefinitions = {
    'pharos-icon': PharosIcon,
    'pharos-link': PharosLink,
  };

  /**
   * Indicates the total number of results.
   * @attr totalResults
   */
  @property({ type: Number, reflect: true, attribute: 'total-results' })
  public totalResults = 0;

  /**
   * Indicates the maximum number of results on a page.
   * @attr pageSize
   */
  @property({ type: Number, reflect: true, attribute: 'page-size' })
  public pageSize = 25;

  /**
   * Indicates the current page number.
   * @attr currentPage
   */
  @property({ type: Number, reflect: true, attribute: 'current-page' })
  public currentPage = 1;

  /**
   * Indicates the pagination variant.
   * @attr variant
   */
  @property({ type: String, reflect: true })
  public variant: PaginationVariant = 'default';

  @state()
  private _pageInputValue: string | null = null;

  private readonly _inputId = `pagination-page-number-${PharosPagination._inputIdCounter++}`;

  public static override get styles(): CSSResultArray {
    return [paginationStyles];
  }

  protected get totalPages(): number {
    return Math.ceil(this.totalResults / this.pageSize);
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (
      changedProperties.has('totalResults') &&
      (!Number.isInteger(this.totalResults) || this.totalResults < 0)
    ) {
      throw new Error(
        `totalResults value '${this.totalResults}' is invalid. Can only be a number greater than or equal to 0`
      );
    }
    if (
      changedProperties.has('pageSize') &&
      (!Number.isInteger(this.pageSize) || this.pageSize < 1)
    ) {
      throw new Error(
        `pageSize value '${this.pageSize}' is invalid. Can only be a number greater than or equal to 1`
      );
    }
    if (
      changedProperties.has('currentPage') &&
      (!Number.isInteger(this.currentPage) || this.currentPage < 1)
    ) {
      throw new Error(
        `currentPage value '${this.currentPage}' is invalid. Can only be a number greater than or equal to 1`
      );
    }
    if (changedProperties.has('currentPage')) {
      this._pageInputValue = null;
    }

    if (changedProperties.has('variant') && this.variant && !VARIANTS.includes(this.variant)) {
      throw new Error(
        `${this.variant} is not a valid Pharos pagination variant. Valid variants are: ${VARIANTS.join(', ')}`
      );
    }
  }

  private _handleClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const targetElement = event.currentTarget as Element;
    let eventType: string;

    if (targetElement.classList.contains('first')) {
      eventType = 'first-page';
    } else if (targetElement.classList.contains('prev')) {
      eventType = 'prev-page';
    } else if (targetElement.classList.contains('next')) {
      eventType = 'next-page';
    } else if (targetElement.classList.contains('last')) {
      eventType = 'last-page';
    } else {
      throw new Error(
        `Unexpected click target during pagination handling: ${targetElement.tagName}`
      );
    }

    this.dispatchEvent(
      new Event(eventType, {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _renderFirstLink(): TemplateResult | typeof nothing {
    if (this.variant === 'input' && this.currentPage > 1) {
      return html`
        <pharos-link
          class="pagination__link first"
          subtle
          flex
          href=""
          @click=${this._handleClick}
        >
          <pharos-icon name="page-first" a11y-hidden="true"></pharos-icon>
          <span class="pagination__visually-hidden">First page</span>
        </pharos-link>
      `;
    }
    return nothing;
  }

  private _renderPrevLink(): TemplateResult | typeof nothing {
    if (this.currentPage > 1) {
      return html`
        <pharos-link
          class="pagination__link prev"
          bold
          subtle
          flex
          href=""
          @click=${this._handleClick}
        >
          <pharos-icon name="chevron-left" a11y-hidden="true"></pharos-icon>
          Previous
        </pharos-link>
      `;
    }
    return nothing;
  }

  private _renderNextLink(): TemplateResult | typeof nothing {
    if (this.currentPage < this.totalPages) {
      return html`
        <pharos-link
          class="pagination__link next"
          bold
          subtle
          flex
          href=""
          @click=${this._handleClick}
        >
          Next
          <pharos-icon name="chevron-right" a11y-hidden="true"></pharos-icon>
        </pharos-link>
      `;
    }
    return nothing;
  }

  private _renderLastLink(): TemplateResult | typeof nothing {
    if (this.variant === 'input' && this.currentPage < this.totalPages) {
      return html`
        <pharos-link
          class="pagination__link last"
          subtle
          flex
          href=""
          @click=${this._handleClick}
        >
          <pharos-icon name="page-last" a11y-hidden="true"></pharos-icon>
          <span class="pagination__visually-hidden">Last page</span>
        </pharos-link>
      `;
    }
    return nothing;
  }

  private _handlePageInput(event: Event): void {
    if (this.totalPages < 1) {
      return;
    }

    const target = event.currentTarget as HTMLInputElement;
    const parsedValue = Number(target.value);
    const desiredPage = Number.isNaN(parsedValue)
      ? this.currentPage
      : Math.min(Math.max(parsedValue, 1), this.totalPages);

    target.value = desiredPage.toString();
    this._pageInputValue = target.value;

    if (desiredPage === this.currentPage) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('page-input', {
        bubbles: true,
        composed: true,
        detail: { page: desiredPage },
      })
    );
  }

  private _handlePageKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this._handlePageInput(event);
    }
  }

  private _handlePageInputChange(event: Event): void {
    const target = event.currentTarget as HTMLInputElement;
    this._pageInputValue = target.value;
  }

  private _handlePageInputBlur(): void {
    this._pageInputValue = null;
  }

  private _renderPageInput(): TemplateResult {
    const currentText = this._pageInputValue ?? this.currentPage.toString();
    const digitWidth = currentText.length + 2;

    return html`
      <div class="pagination__input-wrapper">
        <label class="pagination__visually-hidden" for=${this._inputId}>Page number</label>
        <input
          id=${this._inputId}
          class="pagination__input"
          style=${styleMap({ width: `${digitWidth}ch` })}
          name="page-number"
          type="number"
          min="1"
          max=${Math.max(this.totalPages, 1)}
          .value=${currentText}
          ?disabled=${this.totalPages < 1}
          @keydown=${this._handlePageKeydown}
          @input=${this._handlePageInputChange}
          @blur=${this._handlePageInputBlur}
        />
        <span class="pagination__input-info">of ${this.totalPages}</span>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="pagination__wrapper" role="navigation" aria-label="pagination">
        ${this.variant === 'input' ? this._renderFirstLink() : nothing}
        ${this._renderPrevLink()}
        ${this.variant === 'input'
          ? this._renderPageInput()
          : html`<span class="pagination__info">${this.currentPage} of ${this.totalPages}</span>`}
        ${this._renderNextLink()}
        ${this.variant === 'input' ? this._renderLastLink() : nothing}
      </div>
    `;
  }
}
