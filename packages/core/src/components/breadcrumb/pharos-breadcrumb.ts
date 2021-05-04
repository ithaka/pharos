import { html, LitElement } from 'lit-element';
import type { TemplateResult, CSSResultArray } from 'lit-element';
import { breadcrumbStyles } from './pharos-breadcrumb.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';

import FocusMixin from '../../utils/mixins/focus';

/**
 * Pharos breadcrumb component - Used in tandem with pharos-breadcrumb-item to
 * create a navigation element which will allow users to visit higher hierarchal
 * content. This component is the "container" for pharos-breadcrumb-item
 * component, which handles mainly the layout of the breadcrumb.
 *
 * i.e. Language / Characters / Letters / Letter A
 *
 * @element pharos-breadcrumb
 *
 * @slot - Contains pharos-breadcrumb-items
 *
 */
@customElement('pharos-breadcrumb')
export class PharosBreadcrumb extends FocusMixin(LitElement) {
  public static get styles(): CSSResultArray {
    return [designTokens, breadcrumbStyles];
  }

  private _handleSlotchange(): void {
    const items = this.querySelectorAll('pharos-breadcrumb-item');
    items.forEach((item, index) => {
      item['_last'] = false;

      if (index === items.length - 1) {
        item['_last'] = true;
      }
    });
  }

  protected render(): TemplateResult {
    return html`<nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <slot @slotchange=${this._handleSlotchange}></slot>
      </ol>
    </nav>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-breadcrumb': PharosBreadcrumb;
  }
}
