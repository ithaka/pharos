import { html } from 'lit';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { popoverStyles } from './pharos-popover.css';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import FocusMixin from '../../utils/mixins/focus';
import { OverlayElement } from '../base/overlay-element';
import { FocusTrap } from '@ithaka/focus-trap';
import { query, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import debounce from '../../utils/debounce';
import { autoUpdate, computePosition, flip, offset } from '../base/overlay-element';
import type { Placement, PositioningStrategy } from '../base/overlay-element';
import focusable from '../../utils/focusable';
import { PharosSheet } from '../sheet/pharos-sheet';
export type { Placement, PositioningStrategy };

const FOCUS_ELEMENT = `[data-popover-focus]`;

/**
 * Pharos popover component.
 *
 * @tag pharos-popover
 * @slot - Contains the popover contents.
 *
 * @fires pharos-popover-opened - Fires when the popover is opened
 * @fires pharos-popover-closed - Fires when the popover is closed
 *
 */
export class PharosPopover extends ScopedRegistryMixin(FocusMixin(OverlayElement)) {
  static elementDefinitions = {
    'focus-trap': FocusTrap,
    'pharos-sheet': PharosSheet,
  };

  /**
   * Indicates the menu item is displayed on a dark background.
   * @attr on-background
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-on-background' })
  public isOnBackground = false;

  /**
   * Indicates the aria label to apply to the dialog.
   * @attr label
   */
  @property({ type: String, reflect: true })
  public label?: string;

  /**
   * Indicates the aria label to apply to the dialog.
   * @attr label
   */
  @property({ type: String, reflect: true, attribute: 'labelled-by' })
  public labelledBy?: string;

  /**
   * Indicates the breakpoint to switch to pharos sheet, 0 means never switch to sheet.
   * @attr mobile-breakpoint
   */
  @property({ type: String, reflect: true, attribute: 'mobile-breakpoint' })
  public mobileBreakpoint = 768;

  @query('.popover')
  private _popover!: HTMLUListElement;

  private _triggers!: HTMLElement[];
  private _currentTrigger: Element | null = null;
  private _hasHover = false;
  private _enterByKey = false;
  private _cleanup?: { (): void } = undefined;

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
    return [popoverStyles];
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
    this.addEventListener('keydown', this._handlePopoverKeydown);
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
      this.dispatchEvent(new CustomEvent('pharos-popover-opened', details));
    } else {
      this.dispatchEvent(new CustomEvent('pharos-popover-closed', details));
    }
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._setupPopover();
      }

      if (!this._currentTrigger?.hasAttribute('data-popover-hover') || this._enterByKey) {
        if (this.open) {
          debounce(() => {
            this._focusContents();
          }, 1)();
        } else {
          this._returnTriggerFocus();
        }
      }

      if (!this.open) {
        this._currentTrigger = null;
        this._enterByKey = false;
        if (this._cleanup) {
          this._cleanup();
        }
      }

      this._setHoverListeners();
      this._setTriggerAttributes();
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
      trigger.removeAttribute('aria-haspopup');
      trigger.removeAttribute('aria-controls');

      if (trigger.hasAttribute('data-popover-hover')) {
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

  private _popoverId(): string {
    return this.getAttribute('id') || '';
  }

  private _addTriggerListeners(): void {
    this._triggers = Array.prototype.slice.call(
      document.querySelectorAll(`[data-popover-id="${this._popoverId()}"]`)
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
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-controls', this._popoverId());

    if (trigger.hasAttribute('data-popover-hover')) {
      trigger.addEventListener('mouseenter', this._handleTriggerHover);
      trigger.addEventListener('mouseleave', this._handleTriggerHover);
    }
  }

  private _setupPopover(): void {
    const placement = this.placement === 'auto' ? 'bottom-start' : this.placement;
    if (this._currentTrigger) {
      this._cleanup = autoUpdate(this._currentTrigger, this, () => {
        if (this._currentTrigger && this._popover) {
          computePosition(this._currentTrigger, this._popover, {
            placement: placement,
            strategy: this.strategy,
            middleware: [
              offset(8),
              flip({
                fallbackPlacements: this._filteredFallbackPlacements,
              }),
            ],
          }).then(({ x, y }) => {
            Object.assign(this._popover.style, {
              left: `${x}px`,
              top: `${y}px`,
            });
          });
        }
      });
    }
  }

  private _openSheetForMobile(): void {
    if (window.innerWidth > this.mobileBreakpoint || this.mobileBreakpoint === 0) return;
    const sheet = this.shadowRoot?.querySelector(`pharos-sheet`) as PharosSheet;
    sheet.setAttribute('open', 'true');
  }

  private _closeSheetForMobile(): void {
    if (window.innerWidth > this.mobileBreakpoint || this.mobileBreakpoint === 0) return;
    const sheet = this.shadowRoot?.querySelector(`pharos-sheet`) as PharosSheet;
    sheet.setAttribute('open', 'false');
  }

  private _toggleSheetForMobile(): void {
    if (this.open) {
      this._closeSheetForMobile();
    } else {
      this._openSheetForMobile();
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
      this._toggleSheetForMobile();
    } else {
      this.open = false;
      this._closeSheetForMobile();
      await this.updateComplete;
      debounce(() => {
        this._currentTrigger = trigger;
        this.open = true;
        this._openSheetForMobile();
      }, 150)();
    }
  }

  private _handleTriggerKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'Spacebar':
        if ((event.target as Element)?.hasAttribute('data-popover-hover')) {
          event.preventDefault();
          this._openPopover(event);
        }
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
    }
  }

  private _handleClick(event: MouseEvent): void {
    const targetClicked = this._triggers.find(
      (trigger) => trigger === (event.target as Element)?.closest(trigger.tagName)
    );
    const popoverClicked =
      this === (event.target as Element)?.closest('[data-pharos-component="PharosPopover"]');
    if (!targetClicked && !popoverClicked && this.open) {
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
    const focusElement = this.querySelector(FOCUS_ELEMENT);
    if (focusElement) {
      await 0;
      (focusElement as HTMLElement).focus();
    } else {
      const tabbable = this.querySelector(focusable);
      if (tabbable) {
        await 0;
        (tabbable as HTMLElement).focus();
      }
    }
  }

  private _returnTriggerFocus(): void {
    if (this._currentTrigger && typeof (this._currentTrigger as HTMLElement).focus === 'function') {
      (this._currentTrigger as HTMLElement).focus();
    }
  }

  private _handlePopoverKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
      case 'Esc':
        event.preventDefault();
        this._handleKeydown(event);
        break;
    }

    event.stopPropagation();
  }

  private _setHoverListeners(): void {
    if (this._currentTrigger?.hasAttribute('data-popover-hover') && this.open) {
      this.addEventListener('mouseenter', this._handleHover);
      this.addEventListener('mouseleave', this._handleHover);
    } else {
      this.removeEventListener('mouseenter', this._handleHover);
      this.removeEventListener('mouseleave', this._handleHover);
    }
  }

  private _setTriggerAttributes(): void {
    if (this.open) {
      this._currentTrigger?.setAttribute('aria-expanded', 'true');
    } else {
      this._triggers?.forEach((trigger) => {
        if (trigger !== this._currentTrigger) {
          trigger.removeAttribute('aria-expanded');
        }
      });
    }
  }

  private _openPopover(event: Event): void {
    this._enterByKey = true;
    this._handleTriggerClick(event as MouseEvent);
  }

  private _renderSheet(): TemplateResult {
    return html`<pharos-sheet
      aria-label=${ifDefined(this.label)}
      aria-labelledby="${ifDefined(this.labelledBy)}"
    >
      <slot></slot>
    </pharos-sheet>`;
  }

  protected override render(): TemplateResult {
    if (this.mobileBreakpoint && window.innerWidth < this.mobileBreakpoint) {
      return this._renderSheet();
    } else {
      return html` <focus-trap>
        <div
          class="popover"
          role="dialog"
          aria-label=${ifDefined(this.label)}
          aria-labelledby="${ifDefined(this.labelledBy)}"
        >
          <slot></slot>
        </div>
      </focus-trap>`;
    }
  }
}
