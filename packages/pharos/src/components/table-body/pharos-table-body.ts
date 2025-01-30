import { html, type CSSResultArray, type TemplateResult } from 'lit';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosElement } from '../base/pharos-element';
import { tableBodyStyles } from './pharos-table-body.css';

/**
 * Pharos table body component.
 *
 * @tag pharos-table
 *
 *
 */
export class PharosTableBody extends ScopedRegistryMixin(PharosElement) {
  public static override get styles(): CSSResultArray {
    return [tableBodyStyles];
  }

  protected override firstUpdated(): void {
    this.setAttribute('role', 'rowgroup');
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
