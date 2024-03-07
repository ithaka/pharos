import { PharosElement } from '../base/pharos-element';
import { html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { dropdownMenuItemStyles } from './pharos-dropdown-menu-item.css';
import type { PharosDropdownMenu } from './pharos-dropdown-menu';

import FocusMixin from '../../utils/mixins/focus';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosIcon } from '../icon/pharos-icon';

import type { IconName } from '../icon/pharos-icon';
export type { IconName };

/**
 * Pharos dropdown menu item component.
 *
 * @tag pharos-dropdown-menu-item
 *
 * @slot description - Content that describes the item.
 * @slot - Contains the content of dropdown item.
 *
 */
export class PharosDropdownMenuItem extends ScopedRegistryMixin(FocusMixin(PharosElement)) {
  static elementDefinitions = {
    'pharos-icon': PharosIcon,
  };

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
   * Indicates the relationship of the resource to the current document.
   * @attr rel
   */
  @property({ type: String, reflect: true })
  public rel?: string;

  /**
   * Indicates if the item is disabled.
   * @attr disabled
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Indicates the menu item is displayed on a dark background.
   * @attr is-on-background
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-on-background' })
  public isOnBackground = false;

  @state()
  private _first = false;

  @state()
  private _last = false;

  @state()
  private _active = false;

  @state()
  private _menu!: PharosDropdownMenu;

  public static override get styles(): CSSResultArray {
    return [dropdownMenuItemStyles];
  }

  protected override firstUpdated(): void {
    this.addEventListener('click', this._handleClick);
    this.addEventListener('mousedown', this._handleMousedown);
    this.addEventListener('mouseup', this._handleMouseup);

    this._menu = this.closest('[data-pharos-component="PharosDropdownMenu"]') as PharosDropdownMenu;
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
        <pharos-icon
          class="dropdown-menu-item__icon"
          name="${this.icon}"
          a11y-hidden="{true}"
        ></pharos-icon>
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
          a11y-hidden="true"
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

  protected override render(): TemplateResult {
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
              rel=${ifDefined(this.rel)}
              class="dropdown-menu-item__link"
            >
              ${this.itemContent}
            </a> `
          : html`<button
              ?disabled=${this.disabled}
              class="${classMap({
                [`dropdown-menu-item__button`]: true,
                [`dropdown-menu-item__button--first`]: this._first,
                [`dropdown-menu-item__button--last`]: this._last,
              })}"
            >
              ${this.itemContent}
            </button>`}
      </li>
    `;
  }
}
