import { html, type CSSResultArray, type TemplateResult } from 'lit';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosElement } from '../base/pharos-element';
import { tableHeaderStyles } from './pharos-table-header.css';

/**
 * Pharos table Head component.
 *
 * @tag pharos-table
 *
 *
 */
export class PharosTableHeader extends ScopedRegistryMixin(PharosElement) {
  constructor() {
    super();
    this.role = 'rowgroup';
  }

  public static override get styles(): CSSResultArray {
    return [tableHeaderStyles];
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
