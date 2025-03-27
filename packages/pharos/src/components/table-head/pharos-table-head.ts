import { html, type CSSResultArray, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosElement } from '../base/pharos-element';
import { tableHeadStyles } from './pharos-table-head.css';

/**
 * Pharos table head component.
 *
 * @tag pharos-table-head
 *
 *
 */
export class PharosTableHead extends ScopedRegistryMixin(PharosElement) {
  @property({ type: Boolean, reflect: true, attribute: 'sticky' })
  public sticky: boolean = false;

  @property({ type: Boolean, reflect: true, attribute: 'active' })
  public active: boolean = false;

  public static override get styles(): CSSResultArray {
    return [tableHeadStyles];
  }

  protected override firstUpdated(): void {
    this.setAttribute('role', 'rowgroup');
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
