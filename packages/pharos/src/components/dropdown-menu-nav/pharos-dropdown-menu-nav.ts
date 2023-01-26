import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { dropdownMenuNavStyles } from './pharos-dropdown-menu-nav.css';
import type { PharosDropdownMenuNavLink } from './pharos-dropdown-menu-nav-link';
import type { PharosDropdownMenuNavCategory } from './pharos-dropdown-menu-nav-category';
import type { PharosDropdownMenu } from '../dropdown-menu/pharos-dropdown-menu';

import FocusMixin from '../../utils/mixins/focus';

/**
 * Pharos dropdown menu nav component.
 *
 * @tag pharos-dropdown-menu-nav
 *
 * @slot - Contains the pharos-links and associated pharos-dropdown-menu.
 *
 */
export class PharosDropdownMenuNav extends FocusMixin(PharosElement) {
  /**
   * Indicates the aria label to apply to the nav.
   * @attr label
   */
  @property({ type: String, reflect: true })
  public label?: string;

  @queryAssignedElements({ selector: '[data-pharos-component="PharosDropdownMenuNavLink"]' })
  private _allLinks!: NodeListOf<PharosDropdownMenuNavLink | PharosDropdownMenuNavCategory>;

  @queryAssignedElements({ selector: '[data-pharos-component="PharosDropdownMenu"]' })
  private _allMenus!: NodeListOf<PharosDropdownMenu>;

  public static override get styles(): CSSResultArray {
    return [dropdownMenuNavStyles];
  }

  protected override firstUpdated(): void {
    this.addEventListener('focus', () => this._closeAllMenus());
  }

  private _closeAllMenus(
    link: PharosDropdownMenuNavLink | PharosDropdownMenuNavCategory | undefined = undefined
  ) {
    const menu: PharosDropdownMenu | null = this.querySelector(
      '[data-pharos-component="PharosDropdownMenu"][open]'
    );
    if (menu && menu.id !== link?.getAttribute('data-dropdown-menu-id')) {
      menu.open = false;
    }
  }

  private _handleSlotChange(): void {
    this._allLinks.forEach((link) => {
      link.addEventListener('focusin', () => this._closeAllMenus());
      link.addEventListener('mouseenter', () => this._closeAllMenus(link));
    });
    this._allMenus.forEach((menu) => {
      menu['_navMenu'] = true;
      menu.addEventListener('focusout', (event: FocusEvent) => {
        if (
          event.relatedTarget &&
          !(event.relatedTarget as Element).closest(
            '[data-pharos-component="PharosDropdownMenuNav"]'
          )
        ) {
          this._closeAllMenus();
        }
      });
    });
  }

  protected override render(): TemplateResult {
    return html`
      <nav class="dropdown-menu-nav__container" aria-label=${ifDefined(this.label)}>
        <slot @slotchange=${this._handleSlotChange}></slot>
      </nav>
    `;
  }
}
