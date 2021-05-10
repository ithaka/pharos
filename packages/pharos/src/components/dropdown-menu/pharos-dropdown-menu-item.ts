import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { nothing } from 'lit-html';
import { classMap } from 'lit/directives/class-map.js';
import { dropdownMenuItemStyles } from './pharos-dropdown-menu-item.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';
import type { PharosDropdownMenu } from './pharos-dropdown-menu';

import FocusMixin from '../../utils/mixins/focus';
import '../icon/pharos-icon';
import type { IconName } from '../icon/pharos-icon';

export type { IconName };

/**
 * Pharos dropdown menu item component.
 *
 * @element pharos-dropdown-menu-item
 *
 * @slot description - Content that describes the item.
 * @slot - Contains the content of dropdown item.
 *
 */
@customElement('pharos-dropdown-menu-item')
export class PharosDropdownMenuItem extends FocusMixin(LitElement) {
  /**
   * The icon to be used for the item
   * @attr icon
   * @type {IconName | undefined}
   */
  @property({ type: String, reflect: true })
  public icon?: IconName;

  /**
   * Indicates if the item is currently selected.
   * @attr selected
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  /**
   * Indicates the target URL of the link. Setting this attribute renders the item as a link.
   * @attr link
   */
  @property({ type: String, reflect: true })
  public link = '';

  /**
   * Indicates where to display the linked URL.
   * @attr target
   */
  @property({ type: String, reflect: true })
  public target: '_blank' | '_parent' | '_self' | '_top' = '_self';

  /**
   * Indicates if the item is disabled.
   * @attr disabled
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  @state()
  private _last = false;

  @state()
  private _active = false;

  @state()
  private _menu!: PharosDropdownMenu;

  public static get styles(): CSSResultArray {
    return [designTokens, dropdownMenuItemStyles];
  }

  protected firstUpdated(): void {
    this.addEventListener('click', this._handleClick);
    this.addEventListener('mousedown', this._handleMousedown);
    this.addEventListener('mouseup', this._handleMouseup);

    this._menu = this.closest('pharos-dropdown-menu') as PharosDropdownMenu;
  }

  private _handleClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private _handleMousedown(event: MouseEvent): void {
    event.preventDefault();
    if (!this.disabled) {
      this.focus();
      this._active = true;
    }
  }

  private _handleMouseup(): void {
    if (!this.disabled) {
      this._active = false;
    }
  }

  private _renderIcon(): TemplateResult | typeof nothing {
    if (this.icon) {
      return html`
        <pharos-icon class="dropdown-menu-item__icon" name="${this.icon}"></pharos-icon>
      `;
    }
    return nothing;
  }

  private _renderCheckmark(): TemplateResult | typeof nothing {
    if (this._menu?.showSelected && this.selected) {
      return html`
        <pharos-icon
          class="${classMap({
            [`dropdown-menu-item__icon--selected`]: true,
          })}"
          name="checkmark"
        ></pharos-icon>
      `;
    }
    return nothing;
  }

  private _renderDescription(): TemplateResult | typeof nothing {
    const descriptionSlot = [...this.children].filter((child) => child.slot === 'description');
    const content = descriptionSlot.length
      ? html` <div class="dropdown-menu-item__description">
          <slot name="description"></slot>
        </div>`
      : nothing;
    return content;
  }

  protected get itemContent(): TemplateResult {
    return html`
      ${this._renderIcon()}
      <div class="dropdown-menu-item__text">
        <slot></slot>
        ${this._renderDescription()}
      </div>
      ${this._renderCheckmark()}
    `;
  }

  protected render(): TemplateResult {
    return html`
      <li
        class="${classMap({
          [`dropdown-menu-item`]: true,
          [`dropdown-menu-item--last`]: this._last,
          [`dropdown-menu-item--selected`]: this._menu?.showSelected && this.selected,
          [`dropdown-menu-item--active`]: this._active,
        })}"
        role=${this.link ? 'none' : 'menuitem'}
      >
        ${this.link
          ? html`<a
              role="menuitem"
              href="${this.link}"
              target="${this.target}"
              class="dropdown-menu-item__link"
            >
              ${this.itemContent}
            </a> `
          : html`<button ?disabled=${this.disabled} class="dropdown-menu-item__button">
              ${this.itemContent}
            </button>`}
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-dropdown-menu-item': PharosDropdownMenuItem;
  }
}
