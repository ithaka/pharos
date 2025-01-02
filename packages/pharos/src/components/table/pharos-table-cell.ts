import { html, type CSSResultArray, type TemplateResult } from 'lit';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosElement } from '../base/pharos-element';
import { tableCellStyles } from './pharos-table-cell.css';

/**
 * Pharos table Cell Row component.
 *
 * @tag pharos-table
 *
 *
 */
export class PharosTableCell extends ScopedRegistryMixin(PharosElement) {
  constructor() {
    super();
    this.role = 'cell';
  }

  public static override get styles(): CSSResultArray {
    return [tableCellStyles];
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
