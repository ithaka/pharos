import { html, type CSSResultArray, type TemplateResult } from 'lit';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosElement } from '../base/pharos-element';
import { tableRowStyles } from './pharos-table-row.css';

/**
 * Pharos table row component.
 *
 * @tag pharos-table
 *
 *
 */
export class PharosTableRow extends ScopedRegistryMixin(PharosElement) {
  public static override get styles(): CSSResultArray {
    return [tableRowStyles];
  }

  protected override firstUpdated(): void {
    this.setAttribute('role', 'row');
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
