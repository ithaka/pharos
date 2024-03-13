import { PharosElement } from '../base/pharos-element';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { property } from 'lit/decorators.js';
import { tableStyles } from './pharos-table.css';
import { PharosSelect } from '../select/pharos-select';
import { PharosPagination } from '../pagination/pharos-pagination';

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

  @property({ type: Boolean, reflect: true, attribute: 'hide-pagination' })
  public hidePagination: boolean = true;

  @property({ type: Number, reflect: true, attribute: 'total-results' })
  public totalResults: number = 0;

  @property({ type: Array, reflect: true, attribute: 'page-size-options' })
  public pageSizeOptions: number[] = [50, 100];

  @property({ type: String, reflect: true, attribute: 'caption' })
  public caption: string = '';

  @property({ type: String, reflect: true, attribute: 'hide-caption' })
  public hideCaptionVisually: boolean = false;

  @state()
  private _pageSize = 50;

  @state()
  private _currentPage = 1;

  protected override firstUpdated(): void {
    this._pageSize = this.hidePagination ? this.rowData.length : this.pageSizeOptions[0];
    this.totalResults =
      this.hidePagination || !this.totalResults ? this.rowData.length : this.totalResults;
  }

  protected override updated(): void {
    if (!this.caption) {
      throw new Error(
        'Table must have an accessible name. Please provide a caption for the table using the `caption` attribute. You can hide the caption visually by setting the `hide-caption-visually` property.'
      );
    }
    this._pageSize = this.hidePagination ? this.rowData.length : this._pageSize;
    this.totalResults =
      this.hidePagination || !this.totalResults ? this.rowData.length : this.totalResults;
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

  private _renderTableHeader(): (TemplateResult | undefined)[] {
    return this.columns.map((column: ColumnSpecification) => {
      if (column.name) {
        return html`<th scope="col">${column.name}</th>`;
      } else {
        return html`<tb></tb>`;
      }
    });
  }

  private _renderTableRows(): TemplateResult[] {
    const currentDisplayingData = this.rowData.slice(
      this._pageStartNumber() - 1,
      this._pageEndNumber()
    );
    return currentDisplayingData.map((row: RowData) => {
      const arr: TemplateResult[] = [];
      this.columns.forEach((column: ColumnSpecification) => {
        arr.push(html`<td>${row[column.field]}</td>`);
      });
      return html`<tr>
        ${arr}
      </tr>`;
    });
  }

  private _renderPageSizeOptions(): TemplateResult[] {
    return this.pageSizeOptions.map(
      (option: number) => html`<option value="${option}">${option}</option>`
    );
  }

  private _renderPagination(): TemplateResult | typeof nothing {
    return !this.hidePagination
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
      <table class="table">
        <caption
          class="${classMap({
            [`visually-hidden`]: this.hideCaption,
          })}"
        >
          ${this.caption}
        </caption>
        <thead>
          <tr>
            ${this._renderTableHeader()}
          </tr>
        </thead>
        <tbody>
          ${this._renderTableRows()}
        </tbody>
      </table>
      ${this._renderPagination()}
    `;
  }
}
