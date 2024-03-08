import { PharosElement } from '../base/pharos-element';
import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { paginationStyles } from './pharos-pagination.css';

import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosIcon } from '../icon/pharos-icon';
import { PharosLink } from '../link/pharos-link';

/**
 * Pharos pagination component.
 *
 * @tag pharos-pagination
 *
 * @fires prev-page - Fires when the previous page link is clicked
 * @fires next-page - Fires when the next page link is clicked
 */
export class PharosPagination extends ScopedRegistryMixin(PharosElement) {
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
  }

  private _handleClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const targetElement = event.currentTarget as Element;
    let eventType: string;

    if (targetElement.classList.contains('prev')) {
      eventType = 'prev-page';
    } else if (targetElement.classList.contains('next')) {
      eventType = 'next-page';
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

  private _renderPrevLink(): TemplateResult | typeof nothing {
    if (this.currentPage > 1) {
      return html`
        <pharos-link
          class="pagination__link prev"
          bold
          subtle
          flex
          href=""
          @click="${this._handleClick}"
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
          @click="${this._handleClick}"
        >
          Next
          <pharos-icon name="chevron-right" a11y-hidden="true"></pharos-icon>
        </pharos-link>
      `;
    }
    return nothing;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="pagination__wrapper" role="navigation" aria-label="pagination">
        ${this._renderPrevLink()}
        <span class="pagination__info">${this.currentPage} of ${this.totalPages}</span>
        ${this._renderNextLink()}
      </div>
    `;
  }
}
