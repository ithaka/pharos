import { PharosElement } from '../base/pharos-element';
import { html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { sheetStyles } from './pharos-sheet.css';
import focusable from '../../utils/focusable';

import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosButton } from '../button/pharos-button';
import { PharosHeading } from '../heading/pharos-heading';
import { FocusTrap } from '@ithaka/focus-trap';

const CLOSE_BUTTONS = `[data-sheet-close],[data-pharos-component="PharosButton"]#close-button`;
const FOCUS_ELEMENT = `[data-sheet-focus]`;

/**
 * Pharos sheet component.
 *
 * @tag pharos-sheet
 *
 * @slot description - Content that describes the primary message or purpose of the sheet.
 * @slot - Contains the content of the sheet body.
 * @slot footer - Contains the content of the sheet footer.
 *
 * @fires pharos-sheet-open - Fires when the sheet is about to open - cancelable
 * @fires pharos-sheet-opened - Fires when the sheet has opened
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
  @property({ type: Boolean, reflect: true })
  public expanded = false;

  /**
   * Indicates if the sheet is allowed to expand.
   * @attr enableExpansion
   */
  @property({ type: Boolean, reflect: true })
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
   * Indicates if the sheet footer should contain a divider.
   * @attr footer-divider
   */
  @property({ type: Boolean, reflect: true, attribute: 'footer-divider' })
  public footerDivider = false;

  private _currentTrigger: Element | null = null;

  private _triggers!: NodeListOf<HTMLElement>;

  @state()
  private _isFooterEmpty = true;

  private _startHeight = 0;
  private _startY = 0;
  private _isDragging = false;

  constructor() {
    super();
    this._handleKeydown = this._handleKeydown.bind(this);
    this._handleTriggerClick = this._handleTriggerClick.bind(this);
    if (this.enableExpansion) {
      this.addEventListener('touchend', this._handleDragEnd);
      this.addEventListener('mouseup', this._handleDragEnd);
      this.addEventListener('touchmove', this._handleTouchDragging);
      this.addEventListener('mousemove', this._handleMouseDragging);
    }
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
        this._focusContents();
      } else {
        this._returnTriggerFocus();
      }

      if (changedProperties.get('open') !== undefined) {
        this._emitVisibilityChange();
      }
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
      }
    }
  }

  private _openSheet(trigger: EventTarget | null): void {
    if (!this.open) {
      const details = {
        bubbles: true,
        composed: true,
        detail: trigger,
      };

      if (
        this.dispatchEvent(new CustomEvent('pharos-sheet-open', { ...details, cancelable: true }))
      ) {
        this.open = true;
      }
    }
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if ((event.key === 'Escape' || event.key === 'Esc') && this.open) {
      event.stopPropagation();
      this._closeSheet(event.target);
    }
  }

  private _handleDialogClick(event: MouseEvent): void {
    if ((event.target as Element).matches(CLOSE_BUTTONS)) {
      this._closeSheet(event.target);
    }
  }

  private _handleMouseDragStart(event: MouseEvent): void {
    if (!this.enableExpansion) return;
    this._isDragging = true;
    const sheetContent = this.shadowRoot?.querySelector(`.sheet__content`) as HTMLDivElement;
    this._startHeight = sheetContent.clientHeight;
    this._startY = event.pageY;
  }

  private _handleTouchDragStart(event: TouchEvent): void {
    if (!this.enableExpansion) return;
    this._isDragging = true;
    const sheetContent = this.shadowRoot?.querySelector(`.sheet__content`) as HTMLDivElement;
    this._startHeight = sheetContent.clientHeight;
    this._startY = event.touches?.[0].pageY;
  }

  private _handleMouseDragging(event: MouseEvent): void {
    if (this._isDragging) {
      const delta = this._startY - event.pageY;
      const newHeight = this._startHeight + delta;
      const sheetContent = this.shadowRoot?.querySelector(`.sheet__content`) as HTMLDivElement;
      sheetContent.style.height = `${newHeight}px`;
    }
  }

  private _handleTouchDragging(event: TouchEvent): void {
    if (this._isDragging) {
      const delta = this._startY - event.touches?.[0].pageY;
      const newHeight = this._startHeight + delta;
      const sheetContent = this.shadowRoot?.querySelector(`.sheet__content`) as HTMLDivElement;
      sheetContent.style.height = `${newHeight}px`;
    }
  }

  private _handleDragEnd(): void {
    if (this._isDragging) {
      this._isDragging = false;
      const sheetContent = this.shadowRoot?.querySelector(`.sheet__content`) as HTMLDivElement;
      const sheetHeight = sheetContent.clientHeight;
      if (sheetHeight > this._startHeight) {
        sheetContent.style.height = '100%';
      } else {
        sheetContent.style.height = '50%';
      }
    }
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
      const tabbable = this.shadowRoot?.querySelector(focusable);
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

    if (this.open) {
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

  private _handleFooterSlotchange(e: Event) {
    this._isFooterEmpty =
      (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length === 0;
  }

  private _renderCloseButton(): TemplateResult | typeof nothing {
    return this.hasClose
      ? html` <pharos-button
          id="close-button"
          type="button"
          variant="subtle"
          icon="close"
          label="Close sheet"
        ></pharos-button>`
      : nothing;
  }

  private _renderSheetHandle(): TemplateResult | typeof nothing {
    return this.enableExpansion
      ? html`<div class="sheet__handle" @mousedown=${this._handleMouseDragStart}></div>`
      : nothing;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sheet__overlay">
        <div
          role="dialog"
          class="sheet__dialog"
          aria-modal="true"
          aria-label=${ifDefined(this.header)}
          aria-describedby="${ifDefined(this.descriptionId)}"
          @click=${this._handleDialogClick}
          @touchstart=${this._handleTouchDragStart}
        >
          <focus-trap>
            <div class="sheet__content">
              <div class="sheet__wrapper">
                ${this._renderSheetHandle()}
                <div class="sheet__header">
                  <pharos-heading id="sheet-header" level="2" preset="2" no-margin>
                    ${this.header}
                  </pharos-heading>
                  ${this._renderCloseButton()}
                </div>
                <div class="sheet__body">
                  ${this.descriptionContent}
                  <slot></slot>
                </div>
              </div>
              <div class="sheet__footer${this._isFooterEmpty ? '--empty' : ''}">
                <slot @slotchange=${this._handleFooterSlotchange} name="footer"></slot>
              </div>
            </div>
          </focus-trap>
        </div>
      </div>
    `;
  }
}
