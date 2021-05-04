import { html, LitElement, property } from 'lit-element';
import type { TemplateResult, CSSResultArray } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { dropdownMenuNavStyles } from './pharos-dropdown-menu-nav.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';
import type { PharosDropdownMenuNavLink } from './pharos-dropdown-menu-nav-link';
import type { PharosDropdownMenu } from '../dropdown-menu/pharos-dropdown-menu';

import FocusMixin from '../../utils/mixins/focus';

/**
 * Pharos dropdown menu nav component.
 *
 * @element pharos-dropdown-menu-nav
 *
 * @slot - Contains the pharos-links and associated pharos-dropdown-menu.
 *
 */
@customElement('pharos-dropdown-menu-nav')
export class PharosDropdownMenuNav extends FocusMixin(LitElement) {
  /**
   * Indicates the aria label to apply to the nav.
   * @attr label
   */
  @property({ type: String, reflect: true })
  public label?: string;

  private _allLinks!: NodeListOf<PharosDropdownMenuNavLink>;
  private _allMenus!: NodeListOf<PharosDropdownMenu>;

  public static get styles(): CSSResultArray {
    return [designTokens, dropdownMenuNavStyles];
  }

  protected firstUpdated(): void {
    this.addEventListener('focus', () => this._closeAllMenus());
  }

  private _closeAllMenus(link: PharosDropdownMenuNavLink | undefined = undefined) {
    const menu = this.querySelector('pharos-dropdown-menu[open]') as PharosDropdownMenu;
    if (menu && menu.id !== link?.getAttribute('data-dropdown-menu-id')) {
      menu.open = false;
    }
  }

  private _handleSlotChange(): void {
    this._allLinks = this.querySelectorAll('pharos-dropdown-menu-nav-link');
    this._allMenus = this.querySelectorAll('pharos-dropdown-menu');

    this._allLinks.forEach((link) => {
      link.addEventListener('focusin', () => this._closeAllMenus());
      link.addEventListener('mouseenter', () => this._closeAllMenus(link));
    });
    this._allMenus.forEach((menu) => {
      menu['_navMenu'] = true;
      menu.addEventListener('focusout', (event: FocusEvent) => {
        if (
          event.relatedTarget &&
          !(event.relatedTarget as Element).closest('pharos-dropdown-menu-nav')
        ) {
          this._closeAllMenus();
        }
      });
    });
  }

  protected render(): TemplateResult {
    return html`
      <nav class="dropdown-menu-nav__container" aria-label=${ifDefined(this.label)}>
        <slot @slotchange=${this._handleSlotChange}></slot>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-dropdown-menu-nav': PharosDropdownMenuNav;
  }
}
