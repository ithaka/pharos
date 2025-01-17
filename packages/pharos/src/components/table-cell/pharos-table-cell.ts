import { html, type CSSResultArray, type TemplateResult } from 'lit';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosElement } from '../base/pharos-element';
import { tableCellStyles } from './pharos-table-cell.css';

/**
 * Pharos table cell component.
 *
 * @tag pharos-table
 *
 *
 */

export class PharosTableCell extends ScopedRegistryMixin(PharosElement) {
  public static override get styles(): CSSResultArray {
    return [tableCellStyles];
  }

  protected override firstUpdated(): void {
    this.setAttribute('role', 'cell');
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
