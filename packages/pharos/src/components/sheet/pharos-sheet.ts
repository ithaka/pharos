import { PharosElement } from '../base/pharos-element';
import { html, nothing } from 'lit';
import { query, property, state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { sheetStyles } from './pharos-sheet.css';

import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosButton } from '../button/pharos-button';
import { PharosHeading } from '../heading/pharos-heading';
import { FocusTrap } from '@ithaka/focus-trap';

const CLOSE_BUTTONS = `[data-sheet-close],[data-pharos-component="PharosButton"]#close-button`;
const FOCUS_ELEMENT = `[data-sheet-focus]`;
const FOCUS_HANDLE = `[data-sheet-handle]`;

/**
 * Pharos sheet component.
 *
 * @tag pharos-sheet
 *
 * @slot description - Content that describes the primary message or purpose of the sheet.
 * @slot - Contains the content of the sheet body.
 *
 * @fires pharos-sheet-open - Fires when the sheet is about to open - cancelable
 * @fires pharos-sheet-opened - Fires when the sheet has opened
 * @fires pharos-sheet-expanded - Fires when the sheet has expanded
 * @fires pharos-sheet-close - Fires when the sheet is about to close - cancelable
 * @fires pharos-sheet-closed - Fires when the sheet has closed
 *
 */
export class PharosSheet extends ScopedRegistryMixin(PharosElement) {
  static elementDefinitions = {
    'pharos-button': PharosButton,
    'pharos-heading': PharosHeading,
    'focus-trap': FocusTrap,
  };

  MAX_EXPAND_PERCENTAGE = '95%';
  MIN_EXPAND_PERCENTAGE = '60%';

  /**
   * Indicates if the sheet is open.
   * @attr open
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * Indicates if the sheet is expanded.
   * @attr expanded
   */
  @property({ type: Boolean, reflect: true, attribute: 'expanded' })
  public expanded = false;

  /**
   * Indicates if the sheet is allowed to expand.
   * @attr enableExpansion
   */
  @property({ type: Boolean, reflect: true, attribute: 'enable-expansion' })
  public enableExpansion = true;

  /**
   * Indicates if the sheet contains close button.
   * @attr hasClose
   */
  @property({ type: Boolean, reflect: true, attribute: 'has-close' })
  public hasClose = false;

  /**
   * Text content for the sheet header
   * @attr header
   */
  @property({ type: String, reflect: true })
  public header = 'Sheet header';

  /**
   * Indicates the minimum height for the sheet in pixels
   * @attr minHeight
   */
  @property({ type: String, attribute: 'min-height', reflect: true })
  public minHeight = 0;

  /**
   * Indicates if the sheet omits the overlay
   * @attr omitOverlay
   */
  @property({ type: Boolean, reflect: true, attribute: 'omit-overlay' })
  public omitOverlay = false;

  /**
   * Indicates if the sheet should dock rather than close
   * @attr docked
   */
  @property({ type: Boolean, reflect: true, attribute: 'docked' })
  public docked = false;

  private _currentTrigger: Element | null = null;

  private _triggers!: NodeListOf<HTMLElement>;

  @state()
  private _minHeight = 0 || this.minHeight;
  private _startY = 0;
  private _newHeight = 0;
  private _isDragging = false;

  @query('.sheet__content')
  private _sheetContent!: HTMLDivElement;

  @query('.sheet__overlay')
  private _sheetOverlay!: HTMLDivElement;

  @query('.sheet__dialog--no-overlay')
  private _sheetDialogNoOverlay!: HTMLDivElement;

  constructor() {
    super();
    this._handleKeydown = this._handleKeydown.bind(this);
    this._handleTriggerClick = this._handleTriggerClick.bind(this);
    this._handleMouseDragging = this._handleMouseDragging.bind(this);
    this._handleTouchDragging = this._handleTouchDragging.bind(this);
    this._handleDragEnd = this._handleDragEnd.bind(this);
    this._handleMouseDragStart = this._handleMouseDragStart.bind(this);
    this._handleTouchDragStart = this._handleTouchDragStart.bind(this);
  }

  public static override get styles(): CSSResultArray {
    return [sheetStyles];
  }

  protected override firstUpdated(): void {
    this._addTriggerListeners();
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._sheetContent.style.height = this.expanded
          ? this._getMaxHeightStr()
          : this._getMinHeightStr();

        if (this.omitOverlay) {
          this._sheetDialogNoOverlay.style.height = this.expanded
            ? this._getMaxHeightStr()
            : this._getMinHeightStr();
        }

        this._focusContents();
      } else {
        this._returnTriggerFocus();
      }

      if (changedProperties.get('open') !== undefined) {
        this._emitVisibilityChange();
      }
    }
    if (changedProperties.has('expanded')) {
      this._sheetContent.style.height = this.expanded
        ? this._getMaxHeightStr()
        : this._getMinHeightStr();
    }
  }

  override connectedCallback(): void {
    super.connectedCallback && super.connectedCallback();
    document.addEventListener('keydown', this._handleKeydown);

    this._addTriggerListeners();
  }

  override disconnectedCallback(): void {
    document.removeEventListener('keydown', this._handleKeydown);
    this._triggers.forEach((trigger) => {
      trigger.removeEventListener('click', this._handleTriggerClick);
    });

    super.disconnectedCallback && super.disconnectedCallback();
  }

  private _addTriggerListeners(): void {
    const id = this.getAttribute('id');
    this._triggers = document.querySelectorAll(`[data-sheet-id="${id}"]`);
    this._triggers.forEach((trigger) => {
      trigger.addEventListener('click', this._handleTriggerClick);
    });
  }

  private _getMinHeightStr(): string {
    return this.minHeight ? `${this.minHeight}px` : this.MIN_EXPAND_PERCENTAGE;
  }

  private _getMaxHeightStr(): string {
    return this.MAX_EXPAND_PERCENTAGE;
  }

  private _closeSheet(trigger: EventTarget | null): void {
    if (this.open) {
      const details = {
        bubbles: true,
        composed: true,
        detail: trigger,
      };

      if (
        this.dispatchEvent(
          new CustomEvent('pharos-sheet-close', {
            ...details,
            cancelable: true,
          })
        )
      ) {
        this.open = false;
        this.expanded = false;
      }
    }
  }

  private _openSheet(trigger: EventTarget | null): void {
    const details = {
      bubbles: true,
      composed: true,
      detail: trigger,
    };
    if (!this.open) {
      if (
        this.dispatchEvent(new CustomEvent('pharos-sheet-open', { ...details, cancelable: true }))
      ) {
        this.open = true;
        this._sheetContent.style.height = this.expanded
          ? this._getMaxHeightStr()
          : this._getMinHeightStr();
      }
    } else if (this.docked) {
      this._sheetContent.style.height = this.MAX_EXPAND_PERCENTAGE;
      this.dispatchEvent(
        new CustomEvent('pharos-sheet-expanded', { ...details, cancelable: true })
      );
      this.expanded = true;
    }
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if ((event.key === 'Escape' || event.key === 'Esc') && this.open) {
      event.stopPropagation();
      this._closeSheet(event.target);
    }
  }

  private _handleOverlayInteraction(event: MouseEvent | TouchEvent): void {
    const interactionY = event instanceof MouseEvent ? event.clientY : event.touches?.[0].clientY;
    if (this._sheetOverlay.clientHeight - interactionY > this._sheetContent.clientHeight) {
      event.preventDefault();
      event.stopPropagation();
      this._closeSheet(event.target);
    }
  }

  private _handleDialogClick(event: MouseEvent): void {
    if ((event.target as Element).matches(CLOSE_BUTTONS) && !this.docked) {
      this._closeSheet(event.target);
    } else if (this.docked) {
      this._sheetContent.style.height = this.expanded
        ? this._getMaxHeightStr()
        : this._getMinHeightStr();
    }
  }

  private _handleMouseDragStart(event: MouseEvent): void {
    if (!this.enableExpansion) return;

    if (this._isDragging) {
      this._handleDragEnd();
      return;
    }
    this._isDragging = true;
    this._minHeight = this._sheetContent.clientHeight;
    this._startY = event.pageY;
    this._newHeight = this._minHeight;
    document.addEventListener('mousemove', this._handleMouseDragging);
    document.addEventListener('mouseup', this._handleDragEnd);
  }

  private _handleTouchDragStart(event: TouchEvent): void {
    if (!this.enableExpansion) return;
    if (this._isDragging) {
      this._handleDragEnd();
      return;
    }
    this._isDragging = true;
    this._minHeight = this._sheetContent.clientHeight;
    this._startY = event.touches?.[0].pageY;
    this._newHeight = this._minHeight;
    document.addEventListener('touchmove', this._handleTouchDragging, { passive: false } as any);
    document.addEventListener('touchend', this._handleDragEnd);
  }

  private _handleMouseDragging(event: MouseEvent): void {
    if (this._isDragging) {
      const delta = this._startY - event.pageY;
      const newHeight = this._minHeight + delta;
      this._newHeight = newHeight;
      if (this.docked && newHeight <= this._minHeight) {
        return;
      }
      if (
        this._sheetContent.style.height === this.MAX_EXPAND_PERCENTAGE &&
        event.pageY < this._startY
      ) {
        this._isDragging = false;
        return;
      }
      this._sheetContent.style.height = `${newHeight}px`;
    }
  }

  private _handleTouchDragging(event: TouchEvent): void {
    if (this._isDragging) {
      const delta = this._startY - event.touches?.[0].pageY;
      const newHeight = this._minHeight + delta;
      this._newHeight = newHeight;
      if (
        this._sheetContent.style.height === this.MAX_EXPAND_PERCENTAGE &&
        event.touches?.[0].pageY < this._startY
      ) {
        this._isDragging = false;
        return;
      }
      this._sheetContent.style.height = `${newHeight}px`;
    }
  }

  private _handleDragEnd(): void {
    if (this._isDragging) {
      const details = {
        bubbles: true,
        composed: true,
      };
      if (this._newHeight === this._minHeight) {
        this._isDragging = false;
        return;
      }
      if (this._newHeight > this._minHeight) {
        this._sheetContent.style.height = this.MAX_EXPAND_PERCENTAGE;
        this.dispatchEvent(new CustomEvent('pharos-sheet-expanded', details));
        this.expanded = true;
      } else {
        if (this.expanded) {
          this._sheetContent.style.height = this._getMinHeightStr();
          this.dispatchEvent(new CustomEvent('pharos-sheet-collapsed', details));
          this.expanded = false;
        } else if (!this.docked) {
          this._closeSheet(null);
        }
      }
    }
    this._isDragging = false;
  }

  private _handleTriggerClick(event: MouseEvent): void {
    event.preventDefault();
    this._openSheet(event.target);
  }

  private async _focusContents(): Promise<void> {
    this._currentTrigger = this.ownerDocument.activeElement;
    const focusElement = this.querySelector(FOCUS_ELEMENT);

    if (focusElement) {
      await 0;
      (focusElement as HTMLElement).focus();
    } else {
      const tabbable = this.shadowRoot?.querySelector(FOCUS_HANDLE);
      if (tabbable) {
        await 0;
        (tabbable as HTMLElement).focus();
      }
    }
  }

  private _returnTriggerFocus(): void {
    if (this._currentTrigger && typeof (this._currentTrigger as HTMLElement).focus === 'function') {
      (this._currentTrigger as HTMLElement).focus();
      this._currentTrigger = null;
    }
  }

  private _emitVisibilityChange() {
    const details = {
      bubbles: true,
      composed: true,
    };

    if (this.open && !this.docked) {
      this.dispatchEvent(new CustomEvent('pharos-sheet-opened', details));
    } else {
      this.dispatchEvent(new CustomEvent('pharos-sheet-closed', details));
    }
  }

  protected get descriptionContent(): TemplateResult | typeof nothing {
    const descriptionSlot = [...this.children].filter((child) => child.slot === 'description');
    const content = descriptionSlot.length
      ? html` <div id="description">
          <slot name="description"></slot>
        </div>`
      : nothing;
    return content;
  }

  protected get descriptionId(): string | undefined {
    const descriptionSlot = [...this.children].filter((child) => child.slot === 'description');
    return descriptionSlot.length ? 'description' : undefined;
  }

  private _renderCloseButton(): TemplateResult | typeof nothing {
    return this.hasClose
      ? html` <div class="sheet__header">
          <pharos-button
            id="close-button"
            type="button"
            variant="subtle"
            icon="close"
            a11y-label="Close sheet"
          ></pharos-button>
        </div>`
      : nothing;
  }

  protected renderSheet(): TemplateResult {
    const sheetDialog = this.omitOverlay ? 'sheet__dialog--no-overlay' : 'sheet__dialog';
    return html`
      <div
        role="dialog"
        class=${sheetDialog}
        aria-modal="true"
        aria-label=${ifDefined(this.header)}
        aria-describedby=${ifDefined(this.descriptionId)}
        @click=${this._handleDialogClick}
        @touchstart=${this._handleTouchDragStart}
        @touchend=${this._handleDragEnd}
      >
        <focus-trap>
          <div class="sheet__content">
            <div
              class="sheet__handle_wrapper"
              @mousedown=${this._handleMouseDragStart}
              @mouseup=${this._handleDragEnd}
            >
              <div class="sheet__handle" tabindex="-1" data-sheet-handle></div>
            </div>
            ${this._renderCloseButton()}
            <div class="sheet__body">
              ${this.descriptionContent}
              <slot></slot>
            </div>
          </div>
        </focus-trap>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    return this.omitOverlay
      ? this.renderSheet()
      : html`
          <div
            class="sheet__overlay"
            @touchstart=${this._handleOverlayInteraction}
            @click=${this._handleOverlayInteraction}
          >
            ${this.renderSheet()}
          </div>
        `;
  }
}
