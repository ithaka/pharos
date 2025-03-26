import { html, type CSSResultArray, type TemplateResult } from 'lit';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosElement } from '../base/pharos-element';
import { tableColumnHeaderStyles } from './pharos-table-column-header.css';

/**
 * Pharos table header component.
 *
 * @tag pharos-table
 *
 *
 */
export class PharosTableColumnHeader extends ScopedRegistryMixin(PharosElement) {
  public static override get styles(): CSSResultArray {
    return [tableColumnHeaderStyles];
  }

  protected override firstUpdated(): void {
    this.setAttribute('role', 'columnheader');
  }

  protected override render(): TemplateResult {
    return html`<div class="table-header">
      <slot></slot>
    </div>`;
  }
}
