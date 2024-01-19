import { html } from 'lit';
import { property, query, queryAssignedElements, state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import debounce from '../../utils/debounce';
import observeResize from '../../utils/observeResize';
import { dropdownMenuStyles } from './pharos-dropdown-menu.css';
import type { PharosDropdownMenuItem } from './pharos-dropdown-menu-item';
import type { PharosDropdownMenuNavLink } from '../dropdown-menu-nav/pharos-dropdown-menu-nav-link';

import { OverlayElement } from '../base/overlay-element';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import FocusMixin from '../../utils/mixins/focus';
import { FocusTrap } from '@ithaka/focus-trap';

import type { Placement, PositioningStrategy } from '../base/overlay-element';
import { autoUpdate, computePosition, flip, offset } from '../base/overlay-element';
import { loopWrapIndex } from '../../utils/math';
export type { Placement, PositioningStrategy };

const _allMenuItemsSelector = '[data-pharos-component="PharosDropdownMenuItem"]';

/**
 * Pharos dropdown menu component.
 *
 * @tag pharos-dropdown-menu
 *
 * @slot - Contains the menu items.
 *
 * @fires pharos-dropdown-menu-select - Fires when an item is about to be selected - cancelable
 * @fires pharos-dropdown-menu-selected - Fires when an item has been selected
 * @fires pharos-dropdown-menu-opened - Fires when the dropdown menu is opened
 * @fires pharos-dropdown-menu-closed - Fires when the dropdown menu is closed
 *
 */
export class PharosDropdownMenu extends ScopedRegistryMixin(FocusMixin(OverlayElement)) {
  static elementDefinitions = {
    'focus-trap': FocusTrap,
  };

  /**
   * Indicates if the dropdown should display a checkmark on the selected item.
   * @attr show-selected
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-selected' })
  public showSelected = false;

  /**
   * Indicates if the menu width should equal its trigger's width.
   * @attr full-width
   */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  public fullWidth = false;

  /**
   * Indicates the menu item is displayed on a dark background.
   * @attr is-on-background
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-on-background' })
  public isOnBackground = false;

  @state()
  private _navMenu = false;

  @query('.dropdown-menu__list')
  private _menu!: HTMLUListElement;

  @queryAssignedElements({ selector: _allMenuItemsSelector })
  private _allMenuItems!: NodeListOf<PharosDropdownMenuItem>;

  @queryAssignedElements({ selector: `${_allMenuItemsSelector}:not([disabled])` })
  private _activeMenuItems!: NodeListOf<PharosDropdownMenuItem>;

  @state()
  private _targetWidth = 0;

  private _triggers!: HTMLElement[];
  private _currentTrigger: Element | null = null;
  private _hasHover = false;
  private _moveFocusToLast = false;
  private _enterByKey = false;
  private _cleanup?: { (): void } = undefined;

  private _observeResizeTrigger: Handle | null = null;

  private _resizeObserver: ResizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    const { offsetWidth } = entries[0].target as HTMLElement;
    const borderLeft = parseInt(
      window.getComputedStyle(this._menu, null).getPropertyValue('border-left-width'),
      10
    );
    const borderRight = parseInt(
      window.getComputedStyle(this._menu, null).getPropertyValue('border-right-width'),
      10
    );
    this._targetWidth = offsetWidth - (borderLeft + borderRight);
  });

  constructor() {
    super();
    this.placement = 'bottom-end';
    this._handleClick = this._handleClick.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
    this._handleTriggerClick = this._handleTriggerClick.bind(this);
    this._handleTriggerHover = this._handleTriggerHover.bind(this);
    this._handleTriggerKeydown = this._handleTriggerKeydown.bind(this);
  }

  public static override get styles(): CSSResultArray {
    return [dropdownMenuStyles];
  }

  public removeAllTriggers(): void {
    this._removeTriggerListeners();
  }

  public async openWithTrigger(trigger: HTMLElement): Promise<void> {
    if (this._currentTrigger !== trigger) {
      await new Promise((r) => setTimeout(r, 100));
      this.removeAllTriggers();
      this._addTriggerElement(trigger);
      this._currentTrigger = trigger;
      this.open = true;
    }
  }

  protected override firstUpdated(): void {
    this.addEventListener('click', this._handleMenuClick);
    this.addEventListener('keydown', this._handleMenuKeydown);
    this._addTriggerListeners();
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);
  }

  private _emitVisibilityChange() {
    const details = {
      bubbles: true,
      composed: true,
    };

    if (this.open) {
      this.dispatchEvent(new CustomEvent('pharos-dropdown-menu-opened', details));
    } else {
      this.dispatchEvent(new CustomEvent('pharos-dropdown-menu-closed', details));
    }
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('open')) {
      if (this._currentTrigger && this._navMenu) {
        (this._currentTrigger as PharosDropdownMenuNavLink).isActive = this.open;
      }

      if (this.open) {
        this._setupMenu();
      }

      if (!this._hasHover || this._enterByKey) {
        if (this.open) {
          debounce(() => {
            this._focusContents();
          }, 1)();
        } else if (!this._navMenu) {
          this._returnTriggerFocus();
        }
      }

      if (!this.open) {
        this._currentTrigger = null;
        this._enterByKey = false;
        this._resetItemsState();
        if (this._cleanup) {
          this._cleanup();
        }
      }

      this._setHoverListeners();
      this._setupResizeObserver();
      this._emitVisibilityChange();
    }

    super.updated(changedProperties);
  }

  override connectedCallback(): void {
    super.connectedCallback && super.connectedCallback();
    document.addEventListener('click', this._handleClick);
    document.addEventListener('keydown', this._handleKeydown);

    this._addTriggerListeners();
  }

  private _removeTriggerListeners(): void {
    this._triggers.forEach((trigger) => {
      trigger.removeEventListener('click', this._handleTriggerClick);
      trigger.removeEventListener('keydown', this._handleTriggerKeydown);

      if (trigger.hasAttribute('data-dropdown-menu-hover')) {
        trigger.removeEventListener('mouseenter', this._handleTriggerHover);
        trigger.removeEventListener('mouseleave', this._handleTriggerHover);
      }
    });
    this._triggers = [];
  }

  override disconnectedCallback(): void {
    document.removeEventListener('click', this._handleClick);
    document.removeEventListener('keydown', this._handleKeydown);
    this._removeTriggerListeners();

    super.disconnectedCallback && super.disconnectedCallback();
  }

  private _dropdownId(): string {
    return this.getAttribute('id') || '';
  }

  private _addTriggerListeners(): void {
    this._triggers = Array.prototype.slice.call(
      document.querySelectorAll(`[data-dropdown-menu-id="${this._dropdownId()}"]`)
    );

    this._triggers.forEach((trigger) => {
      this._setupTriggerElement(trigger);
    });
  }

  private _addTriggerElement(trigger: HTMLElement): void {
    this._setupTriggerElement(trigger);
    this._triggers.push(trigger);
  }

  private _setupTriggerElement(trigger: HTMLElement) {
    trigger.addEventListener('click', this._handleTriggerClick);
    trigger.addEventListener('keydown', this._handleTriggerKeydown);

    if (trigger.hasAttribute('data-dropdown-menu-hover')) {
      trigger.addEventListener('mouseenter', this._handleTriggerHover);
      trigger.addEventListener('mouseleave', this._handleTriggerHover);
    }
  }

  private _setupMenu(): void {
    const yOffset = this._navMenu ? 0 : 8;
    const placement = this.placement === 'auto' ? 'bottom-start' : this.placement;
    if (this._currentTrigger) {
      this._cleanup = autoUpdate(this._currentTrigger, this, () => {
        if (this._currentTrigger && this._menu) {
          computePosition(this._currentTrigger, this._menu, {
            placement: this._navMenu ? 'bottom-start' : placement,
            strategy: this.strategy,
            middleware: [
              offset(yOffset),
              flip({
                fallbackPlacements: this._filteredFallbackPlacements,
              }),
            ],
          }).then(({ x, y }) => {
            Object.assign(this._menu.style, {
              left: `${x}px`,
              top: `${y}px`,
            });
          });
          if (this.isOnBackground) {
            this._allMenuItems.forEach((menuItem) => {
              menuItem.isOnBackground = true;
            });
          }
        }
      });
    }
  }

  private async _handleTriggerClick(event: MouseEvent): Promise<void> {
    const trigger = event.currentTarget as Element;
    const otherTriggerClicked = this._currentTrigger && this._currentTrigger !== trigger;
    this._currentTrigger = trigger;

    if (this._hasHover && this.open) {
      return;
    } else if (!otherTriggerClicked) {
      this.open = !this.open;
    } else {
      this.open = false;
      await this.updateComplete;
      debounce(() => {
        this._currentTrigger = trigger;
        this.open = true;
      }, 150)();
    }
  }

  private _handleTriggerKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'Spacebar':
        if ((event.target as Element)?.hasAttribute('data-dropdown-menu-hover')) {
          event.preventDefault();
          this._openMenu(event);
        }
        break;
      case 'Down':
      case 'ArrowDown':
        event.preventDefault();
        this._openMenu(event);
        break;
      case 'Up':
      case 'ArrowUp':
        event.preventDefault();
        this._moveFocusToLast = true;
        this._openMenu(event);
        break;
    }
  }

  private async _handleTriggerHover(event: MouseEvent): Promise<void> {
    if (event.type === 'mouseenter') {
      const otherTriggerClicked = this._currentTrigger && this._currentTrigger !== event.target;
      this._currentTrigger = event.target as Element;
      this._hasHover = true;

      if (otherTriggerClicked) {
        this.open = false;
        await this.updateComplete;
        this._currentTrigger = event.target as Element;
      }
    } else if (event.type === 'mouseleave') {
      this._hasHover = false;
    }
    debounce(() => {
      this._setOpen();
    }, 150)();
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if ((event.key === 'Escape' || event.key === 'Esc') && this.open) {
      event.stopPropagation();
      this.open = false;
      if (this._navMenu) {
        this._returnTriggerFocus();
      }
    }
  }

  private _handleClick(event: MouseEvent): void {
    const targetClicked = this._triggers.find(
      (trigger) => trigger === (event.target as Element)?.closest(trigger.tagName)
    );
    const menuClicked =
      this === (event.target as Element)?.closest('[data-pharos-component="PharosDropdownMenu"]');
    if (!targetClicked && !menuClicked && this.open) {
      event.stopPropagation();
      this.open = false;
    }
  }

  private _setOpen(): void {
    this.open = this._hasHover;
  }

  private _handleHover(event: MouseEvent): void {
    if (event.type === 'mouseenter') {
      this._hasHover = true;
    } else if (event.type === 'mouseleave') {
      this._hasHover = false;
    }
    debounce(() => {
      this._setOpen();
    }, 150)();
  }

  private async _focusContents(): Promise<void> {
    if (this._moveFocusToLast) {
      this._focusLastItem();
    } else {
      this._focusFirstItem();
    }
  }

  private _focusFirstItem(): void {
    const item: PharosDropdownMenuItem | null = this._activeMenuItems[0];
    (item || this).focus();
  }

  private _focusLastItem(): void {
    const items: PharosDropdownMenuItem[] = Array.prototype.slice.call(this._activeMenuItems);
    if (items.length) {
      items[items.length - 1].focus();
      this._moveFocusToLast = false;
    } else {
      this.focus();
    }
  }

  private _returnTriggerFocus(): void {
    if (this._currentTrigger && typeof (this._currentTrigger as HTMLElement).focus === 'function') {
      (this._currentTrigger as HTMLElement).focus();
    }
  }

  private _handleMenuClick(event: MouseEvent): void {
    const clickedItem: PharosDropdownMenuItem | null = (event.target as Element)?.closest(
      _allMenuItemsSelector
    );

    if (clickedItem) {
      this._handleItemClick(clickedItem);
    }
  }

  private _handleItemClick(clickedItem: PharosDropdownMenuItem): void {
    const items: PharosDropdownMenuItem[] = Array.prototype.slice.call(this._allMenuItems);
    const details = {
      bubbles: true,
      composed: true,
      detail: clickedItem,
    };

    if (
      this.dispatchEvent(
        new CustomEvent('pharos-dropdown-menu-select', {
          ...details,
          cancelable: true,
        })
      )
    ) {
      this.open = false;
      this.dispatchEvent(new CustomEvent('pharos-dropdown-menu-selected', details));

      debounce(() => {
        items.forEach((item) => {
          item.selected = item === clickedItem;
        });
      }, 150)();
    }
  }

  private _handleMenuKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Down':
      case 'ArrowDown':
        event.preventDefault();
        this._handleNavigation(true);
        break;
      case 'Up':
      case 'ArrowUp':
        event.preventDefault();
        this._handleNavigation(false);
        break;
      case 'Escape':
      case 'Esc':
        event.preventDefault();
        this._handleKeydown(event);
        break;
    }

    event.stopPropagation();
  }

  private _handleNavigation(moveForward: boolean): void {
    const current = this.ownerDocument.activeElement;

    const items: PharosDropdownMenuItem[] = Array.prototype.slice.call(this._activeMenuItems);

    const nextItemIndex = loopWrapIndex(items, (item) => item === current, moveForward);
    items[nextItemIndex]?.focus();
  }

  private _setupResizeObserver(): void {
    if (this.open && this.fullWidth && this._currentTrigger) {
      this._releaseObserver();
      this._observeResizeTrigger = observeResize(
        this._resizeObserver,
        this._currentTrigger as Element
      );
    } else {
      this._releaseObserver();
    }
  }

  private _releaseObserver(): void {
    if (this._observeResizeTrigger) {
      this._observeResizeTrigger = this._observeResizeTrigger.release();
    }
  }

  private _setHoverListeners(): void {
    if (this._currentTrigger?.hasAttribute('data-dropdown-menu-hover') && this.open) {
      this.addEventListener('mouseenter', this._handleHover);
      this.addEventListener('mouseleave', this._handleHover);
    } else {
      this.removeEventListener('mouseenter', this._handleHover);
      this.removeEventListener('mouseleave', this._handleHover);
    }
  }

  private _openMenu(event: Event): void {
    this._enterByKey = true;
    this._handleTriggerClick(event as MouseEvent);
  }

  private _resetItemsState(): void {
    const items: PharosDropdownMenuItem[] = Array.prototype.slice.call(this._allMenuItems);

    debounce(() => {
      items.forEach((item) => (item['_active'] = false));
    }, 150)();
  }

  private _hasItems(): boolean {
    return this._allMenuItems.length > 0;
  }

  private _handleSlotChange(): void {
    const items: PharosDropdownMenuItem[] = Array.prototype.slice.call(this._allMenuItems);

    items.forEach((item, index) => {
      item['_first'] = index === 0;
      item['_last'] = index === items.length - 1;
    });
  }

  private _renderSlot(): TemplateResult {
    return html`<slot @slotchange=${this._handleSlotChange}></slot>`;
  }

  private _renderList(): TemplateResult {
    return html`
      <ul
        class="dropdown-menu__list"
        style=${styleMap(this.fullWidth ? { width: `${this._targetWidth}px` } : {})}
        role="menu"
        tabindex=${this._hasItems() ? '-1' : '0'}
      >
        ${this._hasItems()
          ? this._renderSlot()
          : html`<li role="menuitem">${this._renderSlot()}</li>`}
      </ul>
    `;
  }

  protected override render(): TemplateResult {
    return this._navMenu
      ? html`${this._renderList()}`
      : html`<focus-trap>${this._renderList()}</focus-trap>`;
  }
}
