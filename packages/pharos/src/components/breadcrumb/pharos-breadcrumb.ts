import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import { queryAssignedElements } from 'lit/decorators.js';
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
 * @tag pharos-breadcrumb
 *
 * @slot - Contains pharos-breadcrumb-items
 *
 */
export class PharosBreadcrumb extends FocusMixin(PharosElement) {
  @queryAssignedElements({ selector: '[data-pharos-component="PharosBreadcrumbItem"]' })
  private _allBreadcrumbItems!: NodeListOf<PharosBreadcrumbItem>;

  public static override get styles(): CSSResultArray {
    return [breadcrumbStyles];
  }

  private _handleSlotchange(): void {
    this._allBreadcrumbItems.forEach((item, index) => {
      item['_last'] = index === this._allBreadcrumbItems.length - 1;
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
