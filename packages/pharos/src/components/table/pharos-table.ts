import { PharosElement } from '../base/pharos-element';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { query, queryAssignedElements, state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { property } from 'lit/decorators.js';
import { tableStyles } from './pharos-table.css';
import { PharosSelect } from '../select/pharos-select';
import { PharosPagination } from '../pagination/pharos-pagination';
import { PharosTableRow } from '../table-row/pharos-table-row';
import { PharosTableCell } from '../table-cell/pharos-table-cell';
import { PharosTableColumnHeader } from '../table-column-header/pharos-table-column-header';
import { PharosTableHead } from '../table-head/pharos-table-head';

export type ColumnSpecification = {
  name: string;
  field: string;
};

export type RowData = {
  [key: string]: unknown;
};

/**
 * Pharos table component.
 *
 * @tag pharos-table
 *
 * @fires pharos-table-prev-page - Fires when the table goes to previous page
 * @fires pharos-table-next-page - Fires when the table goes to next page
 *
 */
export class PharosTable extends ScopedRegistryMixin(PharosElement) {
  static elementDefinitions = {
    'pharos-select': PharosSelect,
    'pharos-pagination': PharosPagination,
    'pharos-table-row': PharosTableRow,
    'pharos-table-cell': PharosTableCell,
    'pharos-table-column-header': PharosTableColumnHeader,
    'pharos-table-head': PharosTableHead,
  };

  /**
   * Column specification.
   * @attr columns
   * sample column:
   * [
   *  {
   *    name: "ID"
   *    field: "id"
   *  },
   *  {
   *    name: "Message"
   *    field: "message"
   *  }
   * ]
   */
  @property({ type: Array, reflect: true, attribute: 'columns' })
  public columns: ColumnSpecification[] = [];

  /**
   * Row data.
   * @attr row-data
   * Example:
   * [
   *  {
   *    id: 1,
   *    message: "first one"
   *  },
   *  {
   *    id: 2,
   *    message: "second one"
   *  }
   * ]
   */
  @property({ type: Array, reflect: true, attribute: 'row-data' })
  public rowData: RowData[] = [];

  @property({ type: Boolean, reflect: true, attribute: 'show-pagination' })
  public showPagination: boolean = false;

  @property({ type: Number, reflect: true, attribute: 'total-results' })
  public totalResults: number = 0;

  @property({ type: Array, reflect: true, attribute: 'page-size-options' })
  public pageSizeOptions: number[] = [50, 100];

  @property({ type: String, reflect: true, attribute: 'caption' })
  public caption: string = '';

  @property({ type: Boolean, reflect: true, attribute: 'hide-caption' })
  public hideCaption: boolean = false;

  @property({ type: Boolean, reflect: true, attribute: 'has-sticky-header' })
  public hasStickyHeader: boolean = false;

  @query('[data-pharos-component="PharosTableHead"]')
  private _tableHeadElement!: PharosTableHead;

  @queryAssignedElements({ selector: '[data-pharos-component="PharosTableHead"]' })
  private _slottedTableHeadElements!: PharosTableHead[];

  @state()
  private _pageSize = 50;

  @state()
  private _currentPage = 1;

  @state()
  private header: PharosTableHead | null = null;

  @state()
  private observer: IntersectionObserver | null = null;

  protected override firstUpdated(): void {
    this._pageSize = !this.showPagination ? this.rowData.length : this.pageSizeOptions[0];
    this.totalResults = !this.totalResults ? this.rowData.length : this.totalResults;
    this.header = this._tableHeadElement || this._slottedTableHeadElements[0];
  }

  protected override updated(): void {
    if (this._tableHeadElement || this._slottedTableHeadElements.length > 0) {
      const head = this._tableHeadElement || this._slottedTableHeadElements[0];
      head.sticky = this.hasStickyHeader;
      if (!this.observer && this.hasStickyHeader) {
        // Wait for the header height to be calculated before adding the observer
        const headerHeight = head.getBoundingClientRect().height;
        if (headerHeight) {
          this._initHeaderObserver(headerHeight);
        }
      }
    }
    if (!this.caption) {
      throw new Error(
        'Table must have an accessible name. Please provide a caption for the table using the `caption` attribute. You can hide the caption visually by setting the `hide-caption` property.'
      );
    }
    this._pageSize = !this.showPagination ? this.rowData.length : this._pageSize;
    this.totalResults = !this.totalResults ? this.rowData.length : this.totalResults;
  }

  private _toggleElevatedStickyHeader = (elevated: boolean) => {
    if (this.header) {
      this.header.elevated = elevated;
    }
  };

  private _initHeaderObserver(height: number): void {
    if (!this.header) {
      throw new Error('No table header found, cannot initialize observer');
    }

    this.observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          this._toggleElevatedStickyHeader(entry.isIntersecting);
        });
      },
      {
        root: this.shadowRoot?.querySelector('.table'),
        // Negative top rootMargin to offset the viewbox used for intersection calculations by the height of the current header
        rootMargin: `-${height}px 0px 0px 0px`,
        threshold: [0.5],
      }
    );
    this.observer.observe(this.header);
  }

  override disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  public static override get styles(): CSSResultArray {
    return [tableStyles];
  }

  private _onPageSizeChange(event: Event): void {
    this._pageSize = Number((event.composedPath()[0] as HTMLInputElement).value);
  }

  private _pageStartNumber(): number {
    return (this._currentPage - 1) * this._pageSize + 1;
  }

  private _pageEndNumber(): number {
    return Math.min(this.rowData.length, this._currentPage * this._pageSize);
  }

  private _onPrevPage(): void {
    this._currentPage = Math.max(this._currentPage - 1, 0);
    this.dispatchEvent(new CustomEvent('pharos-table-prev-page'));
  }

  private _onNextPage(): void {
    this._currentPage = Math.min(this._currentPage + 1, this.rowData.length);
    this.dispatchEvent(new CustomEvent('pharos-table-next-page'));
  }

  private _renderTableRows(): TemplateResult[] {
    if (this.rowData.length === 0) {
      return [html`<slot></slot>`];
    } else {
      const currentDisplayingData = this.rowData.slice(
        this._pageStartNumber() - 1,
        this._pageEndNumber()
      );
      return currentDisplayingData.map((row: RowData) => {
        const arr: TemplateResult[] = [];
        this.columns.forEach((column: ColumnSpecification) => {
          arr.push(html`<pharos-table-cell>${row[column.field]}</pharos-table-cell>`);
        });
        return html`<pharos-table-row> ${arr} </pharos-table-row>`;
      });
    }
  }

  private _renderPageSizeOptions(): TemplateResult[] {
    return this.pageSizeOptions.map(
      (option: number) => html`<option value="${option}">${option}</option>`
    );
  }

  private _renderTableHeader(): TemplateResult {
    return html` ${this.columns.length === 0
      ? nothing
      : html`<pharos-table-head>
          <pharos-table-row>
            ${this.columns.map(
              (column: ColumnSpecification) =>
                html`<pharos-table-column-header>${column.name}</pharos-table-column-header>`
            )}
          </pharos-table-row>
        </pharos-table-head>`}`;
  }

  private _renderPagination(): TemplateResult | typeof nothing {
    return this.showPagination
      ? html`<div class="table-controls">
          <div class="item-per-page-wrapper">
            <span>Items per page</span>
            <pharos-select
              hide-label
              name="pharos-table-page-size-select"
              class="item-per-page-selector"
              @change=${this._onPageSizeChange}
            >
              <span slot="label">page size</span>
              ${this._renderPageSizeOptions()}
            </pharos-select>
            <span class="page-number-display"
              >(Displaying ${this._pageStartNumber()}-${this._pageEndNumber()} of
              ${this.rowData.length})</span
            >
          </div>
          <pharos-pagination
            class="pagination"
            current-page="${this._currentPage}"
            total-results="${this.totalResults}"
            page-size="${this._pageSize}"
            @prev-page="${this._onPrevPage}"
            @next-page="${this._onNextPage}"
          ></pharos-pagination>
        </div>`
      : nothing;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="table" role="table" aria-describedby="table-caption">
        <div
          id="table-caption"
          class=${classMap({
            'table-caption': true,
            ['visually-hidden']: this.hideCaption,
          })}
        >
          ${this.caption}
        </div>
        ${this._renderTableHeader()} ${this._renderTableRows()}
      </div>
      ${this._renderPagination()}
    `;
  }
}
