import { html, LitElement } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
import { breadcrumbStyles } from './pharos-breadcrumb.css';
import type { PharosBreadcrumbItem } from './pharos-breadcrumb-item';

import FocusMixin from '../../utils/mixins/focus';

/**
 * Pharos breadcrumb component - Used in tandem with pharos-breadcrumb-item to
 * create a navigation element which will allow users to visit higher hierarchal
 * content. This component is the "container" for pharos-breadcrumb-item
 * component, which handles mainly the layout of the breadcrumb.
 *
 * i.e. Language / Characters / Letters / Letter A
 *
 * @slot - Contains pharos-breadcrumb-items
 *
 */
export class PharosBreadcrumb extends FocusMixin(LitElement) {
  public static override get styles(): CSSResultArray {
    return [breadcrumbStyles];
  }

  private _handleSlotchange(): void {
    const items = this.querySelectorAll(
      'pharos-breadcrumb-item'
    ) as NodeListOf<PharosBreadcrumbItem>;
    items.forEach((item, index) => {
      item['_last'] = false;

      if (index === items.length - 1) {
        item['_last'] = true;
      }
    });
  }

  protected override render(): TemplateResult {
    return html`<nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <slot @slotchange=${this._handleSlotchange}></slot>
      </ol>
    </nav>`;
  }
}
