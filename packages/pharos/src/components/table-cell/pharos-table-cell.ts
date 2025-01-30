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

    const resizeObserver = new ResizeObserver(() => {
      // Using a slot inside `display: table-cell` breaks the height calculation, so we need to set it manually
      const style = getComputedStyle(this);
      const height =
        this.getBoundingClientRect().height -
        parseFloat(style.paddingTop) -
        parseFloat(style.paddingBottom) -
        parseFloat(style.borderBlockWidth);

      this.style.height = `${height}px`;

      resizeObserver.disconnect();
    });

    resizeObserver.observe(this);
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
