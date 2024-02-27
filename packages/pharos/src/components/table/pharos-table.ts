import { PharosElement } from '../base/pharos-element';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { html, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { property } from 'lit/decorators.js';
import { tableStyles } from './pharos-table.css';
import { PharosSelect } from '../select/pharos-select';
import { PharosPagination } from '../pagination/pharos-pagination';

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
   * Coloumn definition.
   * @attr columns
   * sample column:
   * [
   *  {
   *    name: ID
   *    field: id
   *  },
   *  {
   *    name: Message
   *    field: message
   *  }
   * ]
   */
  @property({ type: Array, reflect: true, attribute: 'columns' })
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public columns: any[] = [];

  /**
   * Row data.
   * @attr row-data
   * sample row:
   * [
   *  {
   *    id: 1,
   *    message: first one
   *  },
   *  {
   *    id: 2,
   *    message: second one
   *  }
   * ]
   */
  @property({ type: Array, reflect: true, attribute: 'row-data' })
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public rowData: any[] = [];

  @property({ type: Boolean, reflect: true, attribute: 'hide-pagination' })
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public hidePagination: boolean = true;

  @property({ type: Number, reflect: true, attribute: 'total-number' })
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public totalResults: number = 0;

  @state()
  private _pageSize = 2;

  @state()
  private _currentPage = 1;

  protected override firstUpdated(): void {
    this._pageSize = this.hidePagination ? this.rowData.length : 2;
    this.totalResults = this.hidePagination ? this.rowData.length : this.totalResults;
  }

  protected override updated(): void {
    this._pageSize = this.hidePagination ? this.rowData.length : 2;
    this.totalResults = this.hidePagination ? this.rowData.length : this.totalResults;
  }

  public static override get styles(): CSSResultArray {
    return [tableStyles];
  }

  private _onPageSizeChange(event: Event): void {
    this._pageSize = Number((event.composedPath()[0] as Element).value);
  }

  private _renderTableHeader(): TemplateResult[] {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    return this.columns.map((column: any) => html`<th>${column.name}</th>`);
  }

  private _renderTableRows(): TemplateResult[] {
    const currentDisplayingData = this.rowData.slice(
      this._pageStartNumber() - 1,
      this._pageEndNumber()
    );
    return currentDisplayingData.map((row: any) => {
      const arr: TemplateResult[] = [];
      this.columns.forEach((column: any) => {
        arr.push(html`<td>${row[column.field]}</td>`);
      });
      return html`<tr>
        ${arr}
      </tr>`;
    });
  }

  private _renderPagination(): TemplateResult | typeof nothing {
    return !this.hidePagination
      ? html`<div class="table-controls">
          <div class="item-per-page-wrapper">
            <span>Items per page</span>
            <pharos-select
              class="item-per-page-selector"
              value="${this._pageSize}"
              @change=${this._onPageSizeChange}
            >
              <option value="2">2</option>
              <option value="3">3</option>
            </pharos-select>
            <span
              >(Displaying ${this._pageStartNumber()}-${this._pageEndNumber()} of
              ${this.rowData.length})</span
            >
          </div>
          <pharos-pagination
            current-page="${this._currentPage}"
            total-results="${this.totalResults}"
            page-size="${this._pageSize}"
            @prev-page="${this._onPrevPage}"
            @next-page="${this._onNextPage}"
          ></pharos-pagination>
        </div>`
      : nothing;
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

  protected override render(): TemplateResult {
    return html`
      <table class="table">
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
