import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { sidenavMenuStyles } from './pharos-sidenav-menu.css';
import type { PharosSidenavLink } from './pharos-sidenav-link';

import FocusMixin from '../../utils/mixins/focus';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosIcon } from '../icon/pharos-icon';

/**
 * Pharos sidenav menu component.
 *
 * @slot - Contains the items of the menu (the default slot).
 *
 */
export class PharosSidenavMenu extends ScopedRegistryMixin(FocusMixin(PharosElement)) {
  static elementDefinitions = {
    'pharos-icon': PharosIcon,
  };

  /**
   * Indicates the label of the menu.
   * @attr label
   */
  @property({ type: String, reflect: true })
  public label?: string;

  /**
   * Indicates the menu is expanded
   * @attr expanded
   */
  @property({ type: Boolean, reflect: true })
  public expanded = false;

  private _allLinks!: NodeListOf<PharosSidenavLink>;

  public static override get styles(): CSSResultArray {
    return [sidenavMenuStyles];
  }

  protected override firstUpdated(): void {
    this._allLinks = this.querySelectorAll('[data-pharos-component="PharosSidenavLink"]');
    this._allLinks.forEach((link) => {
      link.menuItem = true;
      link.setAttribute('role', 'menuitem');
    });

    this.addEventListener('keydown', this._handleKeydown);
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if ((event.key === 'Escape' || event.key === 'Esc') && this.expanded) {
      event.stopPropagation();
      this.expanded = false;
      this.focus();
    }
  }

  private _handleClick(): void {
    this.expanded = !this.expanded;
  }

  private _renderIcon(): TemplateResult {
    if (this.expanded) {
      return html` <pharos-icon class="button__icon" name="chevron-up"></pharos-icon> `;
    }
    return html` <pharos-icon class="button__icon" name="chevron-down"></pharos-icon> `;
  }

  private _renderMenu(): TemplateResult {
    return html`
      <div
        class="${classMap({
          [`menu__container`]: true,
          [`menu__container--show`]: this.expanded,
        })}"
        aria-hidden="${!this.expanded}"
      >
        <ul role="menu" class="menu__list">
          <slot></slot>
        </ul>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      <button
        id="button-element"
        aria-haspopup="true"
        aria-expanded="${this.expanded}"
        @click=${this._handleClick}
      >
        ${this.label}${this._renderIcon()}
      </button>
      ${this._renderMenu()}
    `;
  }
}
