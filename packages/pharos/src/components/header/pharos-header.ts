import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
import { headerStyles } from './pharos-header.css';

/**
 * Pharos header component.
 *
 * @slot top - Content to be shown at the top of the nav.
 * @slot start - Content to be shown at the start of the nav.
 * @slot center - Content to be shown at the center of the nav.
 * @slot end - Content to be shown at the end of the nav.
 *
 */
export class PharosHeader extends PharosElement {
  componentName = 'PharosHeader';

  public static override get styles(): CSSResultArray {
    return [headerStyles];
  }

  protected override render(): TemplateResult {
    return html`
      <header id="header-element">
        <div class="header__top">
          <slot name="top"></slot>
        </div>
        <div class="header__container">
          <div class="header__content">
            <div class="header__content--start">
              <slot name="start"></slot>
            </div>
            <div class="header__content--center">
              <slot name="center"></slot>
            </div>
            <div class="header__content--end">
              <slot name="end"></slot>
            </div>
          </div>
        </div>
      </header>
    `;
  }
}
