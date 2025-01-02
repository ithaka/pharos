import { html, type CSSResultArray, type TemplateResult } from 'lit';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosElement } from '../base/pharos-element';
import { tableHeaderCellStyles } from './pharos-table-header-cell.css';

/**
 * Pharos table Cell Row component.
 *
 * @tag pharos-table
 *
 *
 */
export class PharosTableHeaderCell extends ScopedRegistryMixin(PharosElement) {
  constructor() {
    super();
    this.role = 'columnheader';
  }
  public static override get styles(): CSSResultArray {
    return [tableHeaderCellStyles];
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
